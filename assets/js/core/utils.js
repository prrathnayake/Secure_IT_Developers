export function byId(id) {
  return document.getElementById(id);
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function setMeta(attr, name, content) {
  if (typeof name !== "string") return;
  let el = document.querySelector(`meta[${attr}='${name}']`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  if (typeof content === "string") {
    el.setAttribute("content", content);
  }
}

export function buildUrl(path, base) {
  try {
    if (!base) return path;
    return new URL(path || "", base).href;
  } catch (error) {
    return path;
  }
}

export function telHref(value) {
  if (!value) return "";
  const cleaned = String(value).replace(/[^+\d]/g, "");
  return `tel:${cleaned}`;
}

export function formatCurrency(value, currency = "AUD") {
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    return `${currency} ${Number(value).toLocaleString()}`;
  }
}

export function resolveEndpoint(config = {}) {
  const envValue = config.endpointKey ? window.ENV?.[config.endpointKey] : null;
  return envValue || config.endpoint || config.defaultEndpoint || "";
}

export function serializeForm(form) {
  const formData = new FormData(form);
  const payload = {};
  formData.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      const current = payload[key];
      if (Array.isArray(current)) {
        current.push(value);
      } else {
        payload[key] = [current, value];
      }
    } else {
      payload[key] = value;
    }
  });
  return payload;
}

export function luhnCheck(value) {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 12) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function parseExpiry(value = "") {
  const match = String(value)
    .trim()
    .match(/^(\d{1,2})\s*\/?\s*(\d{2})$/);
  if (!match) return { valid: false };
  const [, mm, yy] = match;
  const month = Number(mm);
  if (month < 1 || month > 12) return { valid: false };
  const year = Number(yy);
  const fullYear = 2000 + year;
  const now = new Date();
  const expiryDate = new Date(fullYear, month);
  return { valid: expiryDate > now };
}

export function generateReference() {
  const random = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `SIT-${random}${Date.now().toString().slice(-4)}`;
}
