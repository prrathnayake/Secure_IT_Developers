import { seoContent } from "../site/seo.js";

export const homePage = {
  meta: seoContent.home,
  hero: {
    eyebrow: "Melbourne engineered",
    title: "Secure builds that scale from day one",
    subtitle:
      "Launch marketing sites, mobile apps, and API platforms with startup-speed delivery and enterprise-grade hardening led by Pasan Rathnayake.",
    primaryCta: { label: "Explore packages", href: "pricing.html" },
    secondaryCta: { label: "Book a discovery call", href: "contact.html" },
    metrics: [
      { value: "40+", label: "Launches hardened" },
      { value: "120%", label: "Average ROI year one" },
      { value: "1 day", label: "Kickoff turnaround" },
    ],
  },
  services: {
    heading: "What we deliver",
    cards: [
      {
        title: "Web experiences that convert",
        icon: "🚀",
        description:
          "Marketing sites, launchpads, and SaaS dashboards built in Next.js, Astro, or Laravel with accessibility and analytics baked in.",
        highlights: [
          "Component libraries wired for rapid iteration",
          "Core Web Vitals tuned for every release",
          "Governance-ready privacy and consent tooling",
        ],
      },
      {
        title: "Mobile & cross-platform apps",
        icon: "📱",
        description:
          "Flutter and React Native builds that share code smartly while keeping experiences native, secure, and easy to ship.",
        highlights: [
          "App Store and Play Store launch readiness",
          "CI/CD pipelines with automated testing",
          "Secure storage, auth, and offline-first design",
        ],
      },
      {
        title: "APIs & backend platforms",
        icon: "🛠️",
        description:
          "Node.js, Laravel, and Go services powering integrations, automation, and data workflows with full observability.",
        highlights: [
          "REST and GraphQL APIs with contract testing",
          "Event-driven architecture with queues & workers",
          "Secrets management, RBAC, and compliance logs",
        ],
      },
    ],
  },
  addOns: {
    eyebrow: "Stay optimised after launch",
    heading: "Managed services & optimisation add-ons",
    copy:
      "Mix and match recurring services so your product keeps its edge on performance, conversion, and governance.",
    cards: [
      {
        title: "Monthly maintenance & security",
        price: "From $680/mo",
        description:
          "Framework upgrades, dependency patching, uptime monitoring, and incident-ready recovery runbooks.",
        highlights: [
          "Applies to Next.js, Astro, Shopify, and WordPress builds",
          "24-hour security patch SLA with change logs",
          "Backups, restore drills, and vulnerability reports",
        ],
        image: "assets/img/placeholder-ops.svg",
      },
      {
        title: "Search & content optimisation",
        price: "From $760/mo",
        description:
          "Technical SEO audits, schema refreshes, and editorial calendars aligned with revenue metrics.",
        highlights: [
          "Quarterly keyword strategy with competitor insights",
          "Schema markup + Core Web Vitals tuning",
          "Content refresh playbooks and CMS workflows",
        ],
        image: "assets/img/placeholder-growth.svg",
      },
      {
        title: "Experimentation & analytics",
        price: "From $990/mo",
        description:
          "Data-informed CRO and product experiments with dashboards that track the signal, not just vanity metrics.",
        highlights: [
          "A/B and multivariate tests with statistical reads",
          "Product analytics setup across funnels and cohorts",
          "Insights review with prioritised next actions",
        ],
        image: "assets/img/placeholder-labs.svg",
      },
    ],
  },
  highlights: {
    heading: "Recent outcomes",
    items: [
      {
        title: "Fintech marketing engine",
        description:
          "Rolled out a modular Next.js marketing system with gated resources, attribution dashboards, and SOC2-ready governance.",
        img: "assets/img/placeholder1.svg",
        alt: "Dashboard interface showing security analytics",
        metrics: [
          { value: "6 weeks", label: "Concept to launch" },
          { value: "+38%", label: "Qualified demos" },
        ],
      },
      {
        title: "Subscription commerce relaunch",
        description:
          "Delivered a headless Shopify stack with custom bundles, subscription logic, and Klaviyo lifecycle automation.",
        img: "assets/img/placeholder2.svg",
        alt: "Screenshot of ecommerce storefront",
        metrics: [
          { value: "32%", label: "Revenue lift" },
          { value: "<2.5s", label: "Checkout LCP" },
        ],
      },
      {
        title: "Ops command centre",
        description:
          "Built an API-first analytics hub ingesting IoT data, with real-time alerting, RBAC, and automated compliance reporting.",
        img: "assets/img/placeholder3.svg",
        alt: "Analytics dashboard visualising metrics",
        metrics: [
          { value: "99.98%", label: "Uptime" },
          { value: "12 hrs", label: "Incident MTTR" },
        ],
      },
    ],
  },
  gallery: {
    heading: "Recent build snapshots",
    copy:
      "A peek inside active engagements—from growth experiments to compliance workshops—captured by our in-house team.",
    items: [
      {
        title: "Security-focused team sync",
        caption:
          "Sprint planning with Pasan and Sunara reviewing mitigations before the next deployment window.",
        img: "assets/img/placeholder-team.svg",
        alt: "Team collaborating around laptops",
      },
      {
        title: "Ops automation control",
        caption:
          "Realtime dashboards monitoring cloud costs, uptime, and incident readiness for a fintech client.",
        img: "assets/img/placeholder-ops.svg",
        alt: "Operations dashboard with charts",
      },
      {
        title: "Innovation lab",
        caption:
          "Prototyping new onboarding flows and performance budgets ahead of usability testing sessions.",
        img: "assets/img/placeholder-labs.svg",
        alt: "Design lab workspace",
      },
    ],
  },
  testimonials: {
    heading: "Client feedback",
    items: [
      {
        quote:
          "Cyberion helped us ship a compliant platform ahead of schedule. Their security insight saved weeks of remediation.",
        author: "Mia Thompson, COO — RegTech Labs",
      },
      {
        quote:
          "From discovery to launch, they owned the roadmap, communicated clearly, and left us with maintainable code and documentation.",
        author: "Leon Carter, CTO — Venture Supply Co.",
      },
    ],
  },
  spotlight: {
    heading: "This is our team",
    copy:
      "Partner with founder-engineer Pasan Rathnayake and cybersecurity specialist Sunara Ranasooriya from discovery to deployment—no hand-offs, just leadership embedded in every sprint.",
    memberIds: ["pasan-rathnayake", "sunara-ranasooriya"],
  },
  contact: {
    heading: "Ready to scope your project?",
    points: [
      "Get a tailored roadmap and investment range in 48 hours",
      "Security and performance baked into every sprint",
      "Flexible retainers for iterative product delivery",
    ],
  },
};
