window.ENV = Object.assign(window.ENV || {}, {
  contactEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
  quoteEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
  compareDefaultCategory: "starter",
  auditTable: "secure_it_audit_log",
  auditKey: "replace-with-deployment-secret",
  database: {
    host: "127.0.0.1",
    port: 5432,
    name: "secure_it",
    user: "secure_app",
    passwordEnvVar: "SECURE_IT_DB_PASSWORD",
  },
  auth: {
    storageNamespace: "secure_it",
    sessionTtlHours: 72,
  },
});
