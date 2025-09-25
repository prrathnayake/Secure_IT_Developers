(function applyEnvironment() {
  const base = window.ENV && typeof window.ENV === "object" ? window.ENV : {};
  const local =
    window.SECURE_ENV && typeof window.SECURE_ENV === "object"
      ? window.SECURE_ENV
      : {};
  window.ENV = Object.assign({}, base, local);
})();
