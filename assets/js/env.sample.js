// Copy this file to assets/js/env.local.js and update the values privately.
window.ENV = Object.assign(window.ENV || {}, {
  contactEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
  quoteEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
  compareDefaultCategory: "starter",
  auditTable: "secure_it_audit_log",
  auditKey: "replace-with-deployment-secret",
  database: {
    host: "127.0.0.1",
    port: 3306,
    name: "secure_it",
    user: "secure_app",
    passwordEnvVar: "SECURE_IT_DB_PASSWORD",
  },
  auth: {
    storageNamespace: "secure_it",
    sessionTtlHours: 72,
  },
  paymentGateway: {
    mode: "test",
    provider: "Stripe",
    publishableKey: "pk_test_replace_with_publishable_key",
    endpoint: "",
    timeoutMs: 15000,
  },
  googleAuth: {
    clientId: "replace-with-your-google-client-id.apps.googleusercontent.com",
    autoSelect: false,
  },
});
