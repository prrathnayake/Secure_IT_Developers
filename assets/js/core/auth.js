import { byId } from "./utils.js";
import { isEcommerceEnabled, setSiteMode, SITE_MODE_EVENT, SITE_MODES } from "./siteMode.js";

const DEFAULT_NAMESPACE = "secure_it";
const DEFAULT_SESSION_TTL_HOURS = 72;
const AUTH_CHANGE_EVENT = "auth:change";
let authStatusTimeout;
let googleScriptPromise;
let activeGoogleContext = "login";
let googleAuthInitialized = false;
const envReadyState = {
  ready: Boolean(window.__SECURE_ENV_READY__?.ready),
  detail: window.__SECURE_ENV_READY__?.detail || null,
};

const ROLE_LABELS = {
  admin: "Admin",
  staff: "Staff",
  loyalty: "Loyalty customer",
  basic: "Basic customer",
};
const DEFAULT_ROLE = "basic";

function normalizeRole(role) {
  const value = String(role || "").toLowerCase().trim();
  if (value === "loyalty_customer" || value === "loyalty-customers") {
    return "loyalty";
  }
  if (value === "customer" || value === "basic customer") {
    return "basic";
  }
  if (ROLE_LABELS[value]) {
    return value;
  }
  return DEFAULT_ROLE;
}

function getRoleLabel(role) {
  return ROLE_LABELS[normalizeRole(role)] || ROLE_LABELS[DEFAULT_ROLE];
}

function getRoleCodes() {
  const config = window.ENV?.auth?.roleCodes;
  if (!config || typeof config !== "object") return {};
  return Object.entries(config).reduce((map, [key, value]) => {
    if (!value) return map;
    map[normalizeRole(key)] = String(value).trim();
    return map;
  }, {});
}

function resolveRole(requestedRole, accessCode) {
  const codes = getRoleCodes();
  const trimmedCode = String(accessCode || "").trim();
  if (trimmedCode) {
    const match = Object.entries(codes).find(([, code]) =>
      String(code || "").toLowerCase() === trimmedCode.toLowerCase()
    );
    if (match) {
      return normalizeRole(match[0]);
    }
  }
  const normalized = normalizeRole(requestedRole);
  if ((normalized === "admin" || normalized === "staff") && !trimmedCode) {
    return DEFAULT_ROLE;
  }
  return normalized;
}

function createRoleBadge(role) {
  const label = getRoleLabel(role);
  if (!label) return null;
  const badge = document.createElement("span");
  badge.className = "nav-user__role";
  badge.textContent = label;
  return badge;
}

function getDefaultRedirect(role, context = "login") {
  const normalized = normalizeRole(role);
  if (!isEcommerceEnabled()) return "index.html";
  if (normalized === "admin" || normalized === "staff") {
    return "index.html";
  }
  if (context === "signup") {
    return "checkout.html";
  }
  return "pricing.html";
}

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

function markEnvReady(detail) {
  envReadyState.ready = true;
  envReadyState.detail = detail || envReadyState.detail || null;
}

function getEnvReadyDetail() {
  return envReadyState.detail || {};
}

function renderGoogleStatus(slots, { buttonText, statusText }) {
  slots.forEach(({ container, status }) => {
    if (container) {
      container.innerHTML = "";
      if (buttonText) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn";
        button.disabled = true;
        button.textContent = buttonText;
        container.appendChild(button);
      }
    }
    if (status) status.textContent = statusText || "";
  });
}

function googleMissingStatusMessage(detail) {
  if (detail?.error) {
    return "Google sign-in configuration failed to load. Check the console for details.";
  }
  if (detail?.source === "missing") {
    return "Create assets/js/env.local.js and set googleAuth.clientId to enable Google sign-in.";
  }
  return "Set googleAuth.clientId in assets/js/env.local.js to enable Google sign-in.";
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
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((customer) => customer && customer.email)
      .map((customer) => ({
        ...customer,
        role: normalizeRole(customer.role),
      }));
  } catch (error) {
    console.warn("Unable to parse stored customers", error);
    return [];
  }
}

function saveCustomers(customers) {
  const { customers: key } = storageKeys();
  const payload = (customers || []).map((customer) => ({
    ...customer,
    role: normalizeRole(customer?.role),
  }));
  localStorage.setItem(key, JSON.stringify(payload));
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
    role: normalizeRole(customer.role),
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
    role: normalizeRole(customer.role),
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
    role: normalizeRole(customer.role),
  };
}

export function logoutCustomer() {
  clearSession();
  notifyAuthChange(null);
}

function createCustomer({ name, email, password, role, accessCode }) {
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
  const resolvedRole = resolveRole(role, accessCode);
  const stored = {
    id: `cust_${Date.now()}`,
    name: name.trim(),
    email: trimmedEmail,
    salt,
    passwordHash,
    role: resolvedRole,
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
      role: stored.role,
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
      role: record.role,
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
        role: existing.role,
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
    role: normalizeRole(window.ENV?.auth?.defaultProviderRole || DEFAULT_ROLE),
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
      role: stored.role,
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
  let adminSlot = actions.querySelector("[data-admin-slot]");
  if (!adminSlot) {
    adminSlot = document.createElement("div");
    adminSlot.className = "nav-actions__slot nav-actions__slot--admin";
    adminSlot.setAttribute("data-admin-slot", "");
    actions.prepend(adminSlot);
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
  return { actions, adminSlot, cartSlot, authSlot };
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
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `Hi, ${firstName}`;
    greeting.appendChild(nameSpan);
    const badge = createRoleBadge(customer.role);
    if (badge) greeting.appendChild(badge);
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

function renderMobileAdminControls(customer) {
  const actions = ensureMobileActionsContainer();
  if (!actions) return;
  actions.querySelectorAll("[data-admin-nav]").forEach((item) => item.remove());
  if (!customer || normalizeRole(customer.role) !== "admin") return;
  const block = document.createElement("div");
  block.className = "mobile-admin";
  block.setAttribute("data-admin-nav", "");
  const label = document.createElement("p");
  label.className = "mobile-admin__label";
  label.textContent = isEcommerceEnabled() ? "Mode: E-commerce" : "Mode: Normal site";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "btn btn-ghost";
  toggle.setAttribute(
    "data-site-mode-toggle",
    isEcommerceEnabled() ? SITE_MODES.BASIC : SITE_MODES.ECOMMERCE
  );
  toggle.textContent = isEcommerceEnabled()
    ? "Switch to normal site"
    : "Enable e-commerce";
  block.append(label, toggle);
  actions.prepend(block);
}

function renderAdminControls(customer = getCurrentCustomer()) {
  const { adminSlot } = ensureSlots();
  if (!adminSlot) return;
  adminSlot.innerHTML = "";
  if (!customer || normalizeRole(customer.role) !== "admin") {
    adminSlot.setAttribute("hidden", "hidden");
    renderMobileAdminControls(null);
    return;
  }
  adminSlot.removeAttribute("hidden");
  const modeLabel = document.createElement("span");
  modeLabel.className = "nav-mode";
  modeLabel.textContent = isEcommerceEnabled()
    ? "Mode: E-commerce"
    : "Mode: Normal site";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "btn btn-ghost";
  toggle.setAttribute(
    "data-site-mode-toggle",
    isEcommerceEnabled() ? SITE_MODES.BASIC : SITE_MODES.ECOMMERCE
  );
  toggle.textContent = isEcommerceEnabled()
    ? "Switch to normal site"
    : "Enable e-commerce";
  adminSlot.append(modeLabel, toggle);
  renderMobileAdminControls(customer);
}

function handleModeToggle(event) {
  const toggle = event.target.closest("[data-site-mode-toggle]");
  if (!toggle) return;
  const customer = getCurrentCustomer();
  if (!customer || normalizeRole(customer.role) !== "admin") return;
  event.preventDefault();
  const requested = toggle.getAttribute("data-site-mode-toggle");
  const targetMode = requested === SITE_MODES.BASIC ? SITE_MODES.BASIC : SITE_MODES.ECOMMERCE;
  setSiteMode(targetMode);
  showAuthStatus(
    targetMode === SITE_MODES.BASIC
      ? "Switched to the normal site experience."
      : "E-commerce experience enabled."
  );
  const mobileNav = document.getElementById("mobileNav");
  const mobileToggle = document.getElementById("mobileNavToggle");
  if (mobileNav?.classList.contains("is-open")) {
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("hidden", "hidden");
    document.body.classList.remove("nav-open");
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
  }
  setTimeout(() => {
    window.location.reload();
  }, 220);
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
    const info = document.createElement("div");
    info.className = "nav-user__wrap";
    const greeting = document.createElement("span");
    greeting.className = "nav-user";
    greeting.textContent = `Hi, ${firstName}`;
    info.appendChild(greeting);
    const badge = createRoleBadge(customer.role);
    if (badge) info.appendChild(badge);
    authSlot.appendChild(info);
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
  renderAdminControls(customer);
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
    const roleSelection = form.role?.value || DEFAULT_ROLE;
    const accessCode = form.accessCode?.value || "";
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
    const result = createCustomer({
      name,
      email,
      password,
      role: roleSelection,
      accessCode,
    });
    if (!result.ok) {
      if (status) status.textContent = result.error;
      return;
    }
    startSession(result.customer);
    if (status)
      status.textContent = `Account created! Signed in as ${getRoleLabel(
        result.customer.role
      )}. Redirecting…`;
    const redirect = getRedirectParam() || getDefaultRedirect(result.customer.role, "signup");
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
    if (status)
      status.textContent = `Welcome back, ${getRoleLabel(
        result.customer.role
      )}! Redirecting…`;
    const redirect = getRedirectParam() || getDefaultRedirect(result.customer.role);
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
  if (status)
    status.textContent = `Signed in with Google as ${getRoleLabel(
      result.customer.role
    )}. Redirecting…`;
  const redirect =
    getRedirectParam() || getDefaultRedirect(result.customer.role, context === "signup" ? "signup" : "login");
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
  const clientId = config.clientId || config.client_id || "";
  const missingClient = !clientId || /replace/i.test(clientId);

  if (googleAuthInitialized) {
    return;
  }

  if (missingClient) {
    if (!envReadyState.ready && !clientId) {
      renderGoogleStatus(slots, {
        buttonText: "Loading Google sign-in…",
        statusText: "Loading Google sign-in configuration…",
      });
    } else {
      renderGoogleStatus(slots, {
        buttonText: "Google sign-in unavailable",
        statusText: googleMissingStatusMessage(getEnvReadyDetail()),
      });
    }
    return;
  }

  config.clientId = clientId;

  slots.forEach(({ container, status }) => {
    if (container) container.innerHTML = "";
    if (status) status.textContent = "";
  });

  googleAuthInitialized = true;

  loadGoogleScript()
    .then((google) => {
      if (!google?.accounts?.id) {
        throw new Error("Google Identity Services are unavailable.");
      }
      google.accounts.id.initialize({
        client_id: clientId,
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
      googleAuthInitialized = false;
      renderGoogleStatus(slots, {
        buttonText: "Google sign-in unavailable",
        statusText:
          error?.message || "Google sign-in could not be initialised. Check your network connection.",
      });
    });
}

function handleSecureEnvReady(event) {
  markEnvReady(event?.detail || null);
  renderDatabaseNotice();
  if (!googleAuthInitialized) {
    initGoogleAuth();
  }
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

export function requireAuth(redirectTo, allowedRoles = []) {
  const customer = getCurrentCustomer();
  if (!customer) {
    const fallback = safeRedirect(redirectTo) || getDefaultRedirect(DEFAULT_ROLE, "signup");
    const url = new URL("login.html", window.location.origin);
    url.searchParams.set("redirect", fallback);
    window.location.href = `${url.pathname}${url.search}`;
    return null;
  }
  const permitted = Array.isArray(allowedRoles)
    ? allowedRoles.map((role) => normalizeRole(role)).filter(Boolean)
    : [];
  if (permitted.length && !permitted.includes(normalizeRole(customer.role))) {
    showAuthStatus("You do not have permission to view that page.");
    setTimeout(() => {
      window.location.href = getDefaultRedirect(customer.role);
    }, 640);
    return null;
  }
  return customer;
}

export function initAuth() {
  ensureSlots();
  renderAuthControls();
  renderDatabaseNotice();
  handleSignup();
  handleLogin();
  handleLogoutClicks();
  initGoogleAuth();
  if (envReadyState.ready) {
    handleSecureEnvReady({ detail: envReadyState.detail });
  }
  document.addEventListener(AUTH_CHANGE_EVENT, renderAuthControls);
  document.addEventListener(AUTH_CHANGE_EVENT, renderDatabaseNotice);
  document.addEventListener("secure-env-ready", handleSecureEnvReady);
  document.addEventListener("click", handleModeToggle);
  document.addEventListener(SITE_MODE_EVENT, () => renderAdminControls());
}
