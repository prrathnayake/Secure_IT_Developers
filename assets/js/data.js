
/* Edit or add pricing groups/plans here; UI renders automatically */
window.DATA = {
  org: {
    name: "Your Web Dev Team",
    url: "https://example.com/",
    logo: "https://example.com/logo.png",
    sameAs: ["https://www.linkedin.com/","https://github.com/"]
  },
  pricingGroups: [
    {
      id: "starter",
      label: "Website Starter",
      plans: [
        { id: "basic",   label: "Basic",   price: 799,  currency: "AUD",
          features: ["1–3 pages","Responsive design","Basic SEO","Contact form"] },
        { id: "pro",     label: "Pro",     price: 1999, currency: "AUD",
          features: ["Up to 8 pages","Blog setup","On-page SEO","Analytics & pixels"] },
        { id: "premium", label: "Premium", price: 3999, currency: "AUD",
          features: ["Unlimited pages","Performance tuning","Advanced SEO","Priority support"] }
      ]
    },
    {
      id: "ecom",
      label: "eCommerce",
      plans: [
        { id: "basic",   label: "Basic",   price: 1499, currency: "AUD",
          features: ["Catalog up to 50 products","Payments setup","Tax/shipping basics","Theme customization"] },
        { id: "pro",     label: "Pro",     price: 3499, currency: "AUD",
          features: ["Up to 300 products","Subscriptions/discounts","Email & pixels","Speed optimization"] },
        { id: "premium", label: "Premium", price: 6499, currency: "AUD",
          features: ["Unlimited products","Headless-ready","Advanced integrations","Priority support"] }
      ]
    },
    {
      id: "custom",
      label: "Custom Web/App",
      plans: [
        { id: "basic",   label: "Basic",   price: 2499, currency: "AUD",
          features: ["Auth + CRUD","Admin dashboard","API endpoints","Docs & handover"] },
        { id: "pro",     label: "Pro",     price: 4999, currency: "AUD",
          features: ["Role-based access","CI/CD & tests","Monitoring","Staging setup"] },
        { id: "premium", label: "Premium", price: 9999, currency: "AUD",
          features: ["Microservices ready","Scale & caching","Custom analytics","SLA support"] }
      ]
    }
  ],
  faqs: [
    { q: "How long does a typical website take?", a: "Most sites launch in 2–4 weeks depending on scope."},
    { q: "Do you handle hosting & domains?", a: "Yes—use our recommended stack or bring your own."}
  ]
};
