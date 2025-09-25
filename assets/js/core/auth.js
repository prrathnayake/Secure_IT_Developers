import { byId } from "./utils.js";

const DEFAULT_NAMESPACE = "secure_it";
const DEFAULT_SESSION_TTL_HOURS = 72;
const AUTH_CHANGE_EVENT = "auth:change";
let authStatusTimeout;

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
  const customer = {
    id: `cust_${Date.now()}`,
    name: name.trim(),
    email: trimmedEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  customers.push(customer);
  saveCustomers(customers);
  return { ok: true, customer };
}

function authenticate({ email, password }) {
  const customer = findCustomerByEmail(email);
  if (!customer) {
    return { ok: false, error: "No account found for that email." };
  }
  const passwordHash = hashPassword(password, customer.salt);
  if (passwordHash !== customer.passwordHash) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }
  return { ok: true, customer };
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

function renderMobileAuth(customer) {
  const mobileNav = document.getElementById("mobileNav");
  if (!mobileNav) return;
  mobileNav.querySelectorAll("[data-auth-nav]").forEach((item) => item.remove());
  const item = document.createElement(customer ? "div" : "a");
  item.setAttribute("data-auth-nav", "");
  item.className = "mobile-auth";
  if (customer) {
    item.innerHTML = `
      <p class="mobile-auth__greeting">Signed in as ${customer.name}</p>
      <button type="button" class="btn btn-ghost" data-auth-action="logout">Log out</button>
    `;
  } else {
    item.href = "login.html";
    item.classList.add("btn");
    item.textContent = "Customer login";
  }
  mobileNav.appendChild(item);
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
    const session = buildSession(result.customer);
    saveSession(session);
    notifyAuthChange({
      id: result.customer.id,
      name: result.customer.name,
      email: result.customer.email,
    });
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
    const session = buildSession(result.customer);
    saveSession(session);
    notifyAuthChange({
      id: result.customer.id,
      name: result.customer.name,
      email: result.customer.email,
    });
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
    showAuthStatus("You have been signed out.");
    if (/checkout|payment/.test(window.location.pathname)) {
      window.location.href = "login.html?redirect=checkout.html";
    }
  });
}

function renderDatabaseNotice() {
  const notice = byId("dbConfigNotice");
  if (!notice) return;
  const db = window.ENV?.database;
  notice.innerHTML = "";
  if (!db) {
    notice.textContent =
      "Set database credentials in assets/js/env.js before deploying.";
    return;
  }
  const list = document.createElement("ul");
  list.className = "auth-db__list";
  const items = [
    { label: "Host", value: db.host || "not set" },
    { label: "Port", value: db.port ?? "not set" },
    { label: "Database", value: db.name || "not set" },
    { label: "User", value: db.user || "not set" },
  ];
  if (db.passwordEnvVar) {
    items.push({ label: "Password env var", value: db.passwordEnvVar });
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("strong");
    label.textContent = `${item.label}:`;
    const value = document.createElement("span");
    value.textContent = String(item.value);
    li.appendChild(label);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(value);
    list.appendChild(li);
  });
  notice.appendChild(list);
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
  document.addEventListener(AUTH_CHANGE_EVENT, renderAuthControls);
  document.addEventListener(AUTH_CHANGE_EVENT, renderDatabaseNotice);
}

*** End of File
