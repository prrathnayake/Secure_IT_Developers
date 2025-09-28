import { byId } from "./utils.js";

const DEFAULT_NAMESPACE = "secure_it";
const DEFAULT_SESSION_TTL_HOURS = 72;
const AUTH_CHANGE_EVENT = "auth:change";
let authStatusTimeout;
let googleScriptPromise;
let activeGoogleContext = "login";

function getConfig() {
  return window.ENV?.auth || {};
}

function getNamespace() {
  const ns = getConfig().storageNamespace || window.ENV?.database?.name;
  return (ns || DEFAULT_NAMESPACE).replace(/[^a-z0-9_\-]/gi, "_");
}

function getSessionTtlMs() {
  const hours = Number(getConfig().sessionTtlHours || DEFAULT_SESSION_TTL_HOURS);
  return Number.isFinite(hours) ? hours * 60 * 60 * 1000 : DEFAULT_SESSION_TTL_HOURS * 60 * 60 * 1000;
}

function getGoogleConfig() {
  return window.ENV?.googleAuth || {};
}

function loadGoogleScript() {
  if (googleScriptPromise) return googleScriptPromise;
  if (window.google?.accounts?.id) {
    googleScriptPromise = Promise.resolve(window.google);
    return googleScriptPromise;
  }
  googleScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });
  return googleScriptPromise;
}

function decodeJwt(token) {
  try {
    const part = token?.split(".")?.[1];
    if (!part) return null;
    const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    try {
      return JSON.parse(decoded);
    } catch (error) {
      const json = decodeURIComponent(
        decoded
          .split("")
          .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
          .join("")
      );
      return JSON.parse(json);
    }
  } catch (error) {
    return null;
  }
}

function storageKeys() {
  const ns = getNamespace();
  return {
    customers: `${ns}_customers`,
    session: `${ns}_session`,
  };
}

function loadCustomers() {
  const { customers } = storageKeys();
  try {
    const raw = localStorage.getItem(customers);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Unable to parse stored customers", error);
    return [];
  }
}

function saveCustomers(customers) {
  const { customers: key } = storageKeys();
  localStorage.setItem(key, JSON.stringify(customers || []));
}

function loadSession() {
  const { session } = storageKeys();
  try {
    const raw = localStorage.getItem(session);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Unable to parse stored session", error);
    return null;
  }
}

function saveSession(session) {
  const { session: key } = storageKeys();
  localStorage.setItem(key, JSON.stringify(session));
}

function clearSession() {
  const { session } = storageKeys();
  localStorage.removeItem(session);
}

function hashPassword(password, salt) {
  const data = `${password}::${salt}`;
  let hash = 0;
  for (let i = 0; i < data.length; i += 1) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }
  return btoa(String(hash));
}

function findCustomerByEmail(email) {
  return loadCustomers().find(
    (customer) => customer.email.toLowerCase() === email.toLowerCase().trim()
  );
}

function buildSession(customer) {
  return {
    id: `session_${customer.id}`,
    customerId: customer.id,
    createdAt: new Date().toISOString(),
  };
}

function startSession(customer) {
  if (!customer?.id) return;
  const session = buildSession(customer);
  saveSession(session);
  notifyAuthChange({
    id: customer.id,
    name: customer.name,
    email: customer.email,
  });
}

function sessionExpired(session) {
  if (!session?.createdAt) return true;
  const created = new Date(session.createdAt).getTime();
  if (Number.isNaN(created)) return true;
  const expiresAt = created + getSessionTtlMs();
  return Date.now() > expiresAt;
}

function notifyAuthChange(customer) {
  document.dispatchEvent(
    new CustomEvent(AUTH_CHANGE_EVENT, { detail: { customer } })
  );
}

export function getCurrentCustomer() {
  const session = loadSession();
  if (!session) {
    return null;
  }
  if (sessionExpired(session)) {
    clearSession();
    notifyAuthChange(null);
    return null;
  }
  const customer = loadCustomers().find((item) => item.id === session.customerId);
  if (!customer) {
    clearSession();
    notifyAuthChange(null);
    return null;
  }
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
  };
}

export function logoutCustomer() {
  clearSession();
  notifyAuthChange(null);
}

function createCustomer({ name, email, password }) {
  const trimmedEmail = email.trim();
  const existing = findCustomerByEmail(trimmedEmail);
  if (existing) {
    return { ok: false, error: "An account with that email already exists." };
  }
  const saltSource =
    typeof crypto !== "undefined" && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const salt = saltSource.toString(16);
  const passwordHash = hashPassword(password, salt);
  const customers = loadCustomers();
  const stored = {
    id: `cust_${Date.now()}`,
    name: name.trim(),
    email: trimmedEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  customers.push(stored);
  saveCustomers(customers);
  return {
    ok: true,
    customer: {
      id: stored.id,
      name: stored.name,
      email: stored.email,
    },
  };
}

function authenticate({ email, password }) {
  const record = findCustomerByEmail(email);
  if (!record) {
    return { ok: false, error: "No account found for that email." };
  }
  const passwordHash = hashPassword(password, record.salt);
  if (passwordHash !== record.passwordHash) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }
  return {
    ok: true,
    customer: {
      id: record.id,
      name: record.name,
      email: record.email,
    },
  };
}

function upsertProviderCustomer({ name, email, provider = "google" }) {
  if (!email) {
    return { ok: false, error: "Google sign-in did not return an email address." };
  }
  const existing = findCustomerByEmail(email);
  if (existing) {
    return {
      ok: true,
      customer: {
        id: existing.id,
        name: existing.name,
        email: existing.email,
      },
    };
  }
  const saltSource =
    typeof crypto !== "undefined" && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const salt = saltSource.toString(16);
  const randomPassword =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  const passwordHash = hashPassword(randomPassword, salt);
  const customers = loadCustomers();
  const stored = {
    id: `cust_${Date.now()}`,
    name: (name || email).trim(),
    email: email.trim(),
    salt,
    passwordHash,
    provider,
    createdAt: new Date().toISOString(),
  };
  customers.push(stored);
  saveCustomers(customers);
  return {
    ok: true,
    customer: {
      id: stored.id,
      name: stored.name,
      email: stored.email,
    },
  };
}

function ensureSlots() {
  const wrap = document.querySelector(".nav-wrap");
  if (!wrap) return {};
  let actions = wrap.querySelector(".nav-actions");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "nav-actions";
    wrap.appendChild(actions);
  }
  let cartSlot = actions.querySelector("[data-cart-slot]");
  if (!cartSlot) {
    cartSlot = document.createElement("div");
    cartSlot.className = "nav-actions__slot nav-actions__slot--cart";
    cartSlot.setAttribute("data-cart-slot", "");
    actions.appendChild(cartSlot);
  }
  let authSlot = actions.querySelector("[data-auth-slot]");
  if (!authSlot) {
    authSlot = document.createElement("div");
    authSlot.className = "nav-actions__slot nav-actions__slot--auth";
    authSlot.setAttribute("data-auth-slot", "");
    actions.appendChild(authSlot);
  }
  return { actions, cartSlot, authSlot };
}

function ensureMobileActionsContainer() {
  const mobileNav = document.getElementById("mobileNav");
  if (!mobileNav) return null;
  let actions = mobileNav.querySelector("[data-mobile-actions]");
  if (!actions) {
    actions = document.createElement("div");
    actions.className = "mobile-nav__actions";
    actions.setAttribute("data-mobile-actions", "");
    mobileNav.appendChild(actions);
  }
  return actions;
}

function renderMobileAuth(customer) {
  const actions = ensureMobileActionsContainer();
  if (!actions) return;
  actions.querySelectorAll("[data-auth-nav]").forEach((item) => item.remove());
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-auth-nav", "");
  wrapper.className = "mobile-auth";
  if (customer) {
    const firstName = (customer.name || "Customer").split(" ")[0];
    const greeting = document.createElement("p");
    greeting.className = "mobile-auth__greeting nav-user";
    greeting.textContent = `Hi, ${firstName}`;
    const logout = document.createElement("button");
    logout.type = "button";
    logout.className = "btn btn-ghost";
    logout.setAttribute("data-auth-action", "logout");
    logout.textContent = "Log out";
    wrapper.append(greeting, logout);
  } else {
    const login = document.createElement("a");
    login.className = "btn btn-ghost";
    login.href = "login.html";
    login.textContent = "Log in";
    const signup = document.createElement("a");
    signup.className = "btn";
    signup.href = "signup.html";
    signup.textContent = "Create account";
    wrapper.append(login, signup);
  }
  actions.appendChild(wrapper);
}

function ensureAuthStatus() {
  let status = byId("authStatus");
  if (!status) {
    status = document.createElement("div");
    status.id = "authStatus";
    status.className = "auth-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    document.body.appendChild(status);
  }
  return status;
}

function showAuthStatus(message) {
  const status = ensureAuthStatus();
  status.textContent = message;
  status.classList.add("is-visible");
  clearTimeout(authStatusTimeout);
  authStatusTimeout = setTimeout(() => {
    status.classList.remove("is-visible");
  }, 2400);
}

function renderAuthControls() {
  const { authSlot } = ensureSlots();
  if (!authSlot) return;
  const customer = getCurrentCustomer();
  authSlot.innerHTML = "";
  if (customer) {
    const firstName = (customer.name || "Customer").split(" ")[0];
    const greeting = document.createElement("span");
    greeting.className = "nav-user";
    greeting.textContent = `Hi, ${firstName}`;
    authSlot.appendChild(greeting);
    const logout = document.createElement("button");
    logout.type = "button";
    logout.className = "btn btn-ghost";
    logout.setAttribute("data-auth-action", "logout");
    logout.textContent = "Log out";
    authSlot.appendChild(logout);
  } else {
    const login = document.createElement("a");
    login.className = "btn btn-ghost";
    login.href = "login.html";
    login.textContent = "Log in";
    authSlot.appendChild(login);
    const signup = document.createElement("a");
    signup.className = "btn";
    signup.href = "signup.html";
    signup.textContent = "Create account";
    authSlot.appendChild(signup);
  }
  renderMobileAuth(customer);
}

function safeRedirect(target) {
  if (!target) return null;
  try {
    const url = new URL(target, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return `${url.pathname.replace(/^\//, "")}${url.search}${url.hash}`;
  } catch (error) {
    return null;
  }
}

function getRedirectParam() {
  const params = new URLSearchParams(window.location.search);
  return safeRedirect(params.get("redirect"));
}

function handleSignup() {
  const form = byId("signupForm");
  if (!form) return;
  const status = byId("signupStatus");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (typeof form.reportValidity === "function" && !form.reportValidity()) {
      return;
    }
    const name = form.fullname?.value.trim();
    const email = form.email?.value.trim();
    const password = form.password?.value || "";
    const confirm = form.confirm?.value || "";
    if (!name) {
      if (status) status.textContent = "Please provide your full name.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) {
      if (status) status.textContent = "Enter a valid email address.";
      return;
    }
    if (password.length < 8) {
      if (status) status.textContent = "Password must be at least 8 characters.";
      return;
    }
    if (password !== confirm) {
      if (status) status.textContent = "Passwords do not match.";
      return;
    }
    const result = createCustomer({ name, email, password });
    if (!result.ok) {
      if (status) status.textContent = result.error;
      return;
    }
    startSession(result.customer);
    if (status) status.textContent = "Account created! Redirecting…";
    const redirect = getRedirectParam() || "checkout.html";
    setTimeout(() => {
      window.location.href = redirect;
    }, 800);
  });
}

function handleLogin() {
  const form = byId("loginForm");
  if (!form) return;
  const status = byId("loginStatus");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (typeof form.reportValidity === "function" && !form.reportValidity()) {
      return;
    }
    const email = form.email?.value.trim();
    const password = form.password?.value || "";
    const result = authenticate({ email, password });
    if (!result.ok) {
      if (status) status.textContent = result.error;
      return;
    }
    startSession(result.customer);
    if (status) status.textContent = "Login successful! Redirecting…";
    const redirect = getRedirectParam() || "pricing.html";
    setTimeout(() => {
      window.location.href = redirect;
    }, 600);
  });
}

function handleLogoutClicks() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-auth-action='logout']");
    if (!trigger) return;
    event.preventDefault();
    logoutCustomer();
    const mobileNav = document.getElementById("mobileNav");
    const mobileToggle = document.getElementById("mobileNavToggle");
    if (mobileNav?.classList.contains("is-open")) {
      mobileNav.classList.remove("is-open");
      mobileNav.setAttribute("hidden", "hidden");
      document.body.classList.remove("nav-open");
      if (mobileToggle) {
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    }
    showAuthStatus("You have been signed out.");
    if (/checkout|payment/.test(window.location.pathname)) {
      window.location.href = "login.html?redirect=checkout.html";
    }
  });
}

function handleGoogleCredential(response, context = "login") {
  const loginStatus = byId("googleLoginStatus");
  const signupStatus = byId("googleSignupStatus");
  const status = context === "signup" ? signupStatus : loginStatus;
  if (response?.error) {
    if (status) status.textContent = `Google sign-in error: ${response.error}`;
    return;
  }
  if (!response?.credential) {
    if (status) status.textContent = "Google sign-in was cancelled.";
    return;
  }
  const profile = decodeJwt(response.credential);
  if (!profile?.email) {
    if (status)
      status.textContent =
        "Google did not return an email address. Enable the email scope for your Google client.";
    return;
  }
  const fullName =
    profile.name || `${profile.given_name || ""} ${profile.family_name || ""}`.trim() || profile.email;
  const result = upsertProviderCustomer({
    name: fullName,
    email: profile.email,
    provider: "google",
  });
  if (!result.ok) {
    if (status) status.textContent = result.error || "Unable to sign in with Google.";
    return;
  }
  startSession(result.customer);
  if (status) status.textContent = "Signed in with Google. Redirecting…";
  const redirect =
    context === "signup"
      ? getRedirectParam() || "checkout.html"
      : getRedirectParam() || "pricing.html";
  setTimeout(() => {
    window.location.href = redirect;
  }, 600);
}

function initGoogleAuth() {
  const slots = [
    { container: byId("googleLogin"), status: byId("googleLoginStatus"), context: "login" },
    { container: byId("googleSignup"), status: byId("googleSignupStatus"), context: "signup" },
  ].filter((entry) => entry.container);
  if (!slots.length) return;

  const config = getGoogleConfig();
  const missingClient = !config.clientId || /replace/i.test(config.clientId);

  if (missingClient) {
    slots.forEach(({ container, status }) => {
      if (container) {
        container.innerHTML = "";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.disabled = true;
        button.textContent = "Google sign-in unavailable";
        container.appendChild(button);
      }
      if (status) {
        status.textContent =
          "Set googleAuth.clientId in assets/js/env.local.js to enable Google sign-in.";
      }
    });
    return;
  }

  slots.forEach(({ container }) => {
    if (container) container.innerHTML = "";
  });

  loadGoogleScript()
    .then((google) => {
      if (!google?.accounts?.id) {
        throw new Error("Google Identity Services are unavailable.");
      }
      google.accounts.id.initialize({
        client_id: config.clientId,
        callback: (response) => handleGoogleCredential(response, activeGoogleContext),
        auto_select: Boolean(config.autoSelect),
        cancel_on_tap_outside: true,
      });
      slots.forEach(({ container, status, context }) => {
        if (!container) return;
        google.accounts.id.renderButton(container, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: context === "signup" ? "signup_with" : "signin_with",
          logo_alignment: "center",
          click_listener: () => {
            activeGoogleContext = context;
            if (status) status.textContent = "Opening Google sign-in…";
          },
        });
        if (status) status.textContent = "";
      });
    })
    .catch((error) => {
      slots.forEach(({ status }) => {
        if (status)
          status.textContent =
            error?.message || "Google sign-in could not be initialised. Check your network connection.";
      });
    });
}

function renderDatabaseNotice() {
  const notice = byId("dbConfigNotice");
  if (!notice) return;
  const db = window.ENV?.database;
  notice.innerHTML = "";
  notice.className = "auth-db callout";
  if (!db) {
    notice.classList.add("callout--warning");
    notice.textContent =
      "Add database connection variables to assets/js/env.local.js before deploying.";
    return;
  }
  const missing = ["host", "port", "name", "user"].filter((key) => !db[key]);
  if (missing.length) {
    notice.classList.add("callout--warning");
    notice.textContent = `Database configuration incomplete: ${missing.join(", ")}. Update assets/js/env.local.js.`;
  } else {
    notice.classList.add("callout--info");
    notice.textContent =
      "Database credentials are loaded securely from your server environment.";
  }
  if (db.passwordEnvVar) {
    const hint = document.createElement("p");
    hint.className = "muted";
    hint.textContent = `Store the database password in the ${db.passwordEnvVar} environment variable.`;
    notice.appendChild(hint);
  }
}

export function requireAuth(redirectTo) {
  const customer = getCurrentCustomer();
  if (customer) return customer;
  const target = safeRedirect(redirectTo) || "checkout.html";
  const url = new URL("login.html", window.location.origin);
  url.searchParams.set("redirect", target);
  window.location.href = `${url.pathname}${url.search}`;
  return null;
}

export function initAuth() {
  ensureSlots();
  renderAuthControls();
  renderDatabaseNotice();
  handleSignup();
  handleLogin();
  handleLogoutClicks();
  initGoogleAuth();
  document.addEventListener(AUTH_CHANGE_EVENT, renderAuthControls);
  document.addEventListener(AUTH_CHANGE_EVENT, renderDatabaseNotice);
  document.addEventListener("secure-env-ready", renderDatabaseNotice);
}
