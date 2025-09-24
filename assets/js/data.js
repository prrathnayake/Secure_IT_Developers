/* Centralized site content. Update values here to refresh the UI. */
window.DATA = {
  org: {
    name: "Secure IT Developers",
    legalName: "Secure IT Developers",
    tagline: "Security-first web & app engineering",
    description:
      "Secure IT Developers partners with startups and scale-ups to ship resilient, high-performing digital products that are hardened for security from day one.",
    url: "https://secureitdevelopers.com",
    logo: "assets/img/favicon.svg",
    email: "hello@secureitdevelopers.com",
    phone: "+61 480 123 765",
    location: {
      streetAddress: "Level 4, 11 York Street",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    sameAs: [
      "https://secureitdevelopers.com",
      "https://www.linkedin.com/company/secure-it-developers",
      "https://github.com/secure-it-developers",
      "https://twitter.com/secureitdev",
    ],
  },
  navigation: [
    { label: "Home", href: "index.html" },
    { label: "Pricing", href: "pricing.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ],
  socials: [
    { label: "Website", href: "https://secureitdevelopers.com", aria: "Website" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/secure-it-developers",
      aria: "LinkedIn profile",
    },
    {
      label: "GitHub",
      href: "https://github.com/secure-it-developers",
      aria: "GitHub profile",
    },
    { label: "X (Twitter)", href: "https://twitter.com/secureitdev", aria: "Twitter profile" },
  ],
  contact: {
    heading: "Let's secure your next launch",
    copy:
      "Tell us what you need—penetration-ready marketing sites, conversion-optimised stores, or custom app builds. You'll get a technical reply within one business day.",
    emailLabel: "hello@secureitdevelopers.com",
    phoneLabel: "+61 480 123 765",
    locationLabel: "Sydney, Australia (remote friendly)",
    responseTime: "Replies in under 24 hours",
  },
  footer: {
    about:
      "Security-focused engineers building performant digital experiences, with measurable business impact and transparent collaboration.",
    legalNote: "ABN 00 123 456 789",
  },
  team: [
    {
      name: "Avery Patel",
      role: "Founder & Lead Full-Stack Engineer",
      location: "Sydney, Australia",
      bio:
        "Avery is a security-conscious engineer with 8+ years delivering web platforms, eCommerce stacks, and cloud-native applications for regulated industries.",
      focus: [
        "Application security reviews & OWASP hardening",
        "TypeScript, React, and modern frontend architectures",
        "Node.js, Laravel, and API-first development",
        "DevOps automation across AWS, Azure, and GCP",
      ],
      links: [
        { label: "Website", href: "https://secureitdevelopers.com" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/averypatel",
        },
        { label: "GitHub", href: "https://github.com/averypatel" },
        { label: "X (Twitter)", href: "https://twitter.com/secureitavery" },
      ],
    },
  ],
  pages: {
    home: {
      meta: {
        title: "Secure IT Developers — Security-first web & app engineering",
        description:
          "Security-first websites, SaaS platforms, and eCommerce builds delivered with transparent pricing and measurable results.",
        path: "index.html",
      },
      hero: {
        eyebrow: "Secure. Performant. Maintainable.",
        title: "Build and ship with confidence",
        subtitle:
          "From launch-ready marketing sites to complex SaaS products, we combine security engineering with design-led development to accelerate your roadmap.",
        primaryCta: { label: "View pricing", href: "pricing.html" },
        secondaryCta: { label: "Schedule a call", href: "contact.html" },
      },
      services: {
        heading: "What we deliver",
        cards: [
          {
            title: "Websites & platforms",
            description:
              "High-performing marketing sites, documentation hubs, and portals optimised for accessibility, SEO, and conversion.",
          },
          {
            title: "Commerce ecosystems",
            description:
              "Shopify, WooCommerce, and headless storefronts with secure payments, automation, and analytics instrumentation.",
          },
          {
            title: "Custom apps & integrations",
            description:
              "Role-aware dashboards, API-first backends, and integrations that connect your product stack end-to-end.",
          },
        ],
      },
      highlights: {
        heading: "Recent outcomes",
        items: [
          {
            title: "Product-led SaaS upgrade",
            description:
              "Re-platformed a compliance SaaS to a modern stack with SSO and audit logging, improving retention by 18%.",
            img: "assets/img/placeholder1.svg",
            alt: "Dashboard interface showing security analytics",
          },
          {
            title: "Conversion-focused retail store",
            description:
              "Delivered a Shopify build with subscriptions, Klaviyo flows, and A/B-tested landing pages—lifting revenue per visitor by 32%.",
            img: "assets/img/placeholder2.svg",
            alt: "Screenshot of ecommerce storefront",
          },
          {
            title: "Executive analytics hub",
            description:
              "Built a cloud dashboard ingesting IoT data with granular RBAC, SOC2-ready logging, and automated reporting.",
            img: "assets/img/placeholder3.svg",
            alt: "Analytics dashboard visualising metrics",
          },
        ],
      },
      testimonials: {
        heading: "Client feedback",
        items: [
          {
            quote:
              "Secure IT Developers helped us ship a compliant platform ahead of schedule. Their security insight saved weeks of remediation.",
            author: "Mia Thompson, COO — RegTech Labs",
          },
          {
            quote:
              "From discovery to launch, they owned the roadmap, communicated clearly, and left us with maintainable code and documentation.",
            author: "Leon Carter, CTO — Venture Supply Co.",
          },
        ],
      },
      contact: {
        heading: "Ready to scope your project?",
        points: [
          "Get a tailored roadmap and investment range in 48 hours",
          "Security and performance baked into every sprint",
          "Flexible retainers for iterative product delivery",
        ],
      },
    },
    about: {
      meta: {
        title: "About Secure IT Developers",
        description:
          "Learn how Secure IT Developers blends security engineering, product strategy, and design to deliver dependable digital products.",
        path: "about.html",
      },
      intro:
        "We architect and build resilient digital products for founders and teams that value security, performance, and measurable results.",
      mission:
        "Our mission is to embed security and reliability into every product we ship while keeping collaboration transparent and outcomes data-driven.",
      approach: [
        {
          title: "Discovery & threat modelling",
          detail:
            "Deep-dive workshops uncover user journeys, success metrics, and the attack surface so we can prioritise security early.",
        },
        {
          title: "Design & prototyping",
          detail:
            "Rapid prototypes validate UX decisions, content strategy, and component accessibility before development.",
        },
        {
          title: "Build & harden",
          detail:
            "We deliver in sprints with automated testing, infrastructure as code, and continuous security reviews.",
        },
        {
          title: "Launch & optimise",
          detail:
            "Post-launch support covers observability, performance tuning, and growth experiments that align with KPIs.",
        },
      ],
      techStack: [
        "TypeScript, Next.js, and Astro",
        "React Native & Flutter",
        "Node.js, Laravel, and Go microservices",
        "PostgreSQL, PlanetScale, DynamoDB",
        "AWS, Azure, GCP, and Vercel",
        "Terraform, Docker, and GitHub Actions",
      ],
      values: [
        "Security by default",
        "Outcome-driven delivery",
        "Transparent collaboration",
        "Continuous improvement",
      ],
      teamIntro:
        "Secure IT Developers is currently founder-led, giving you direct access to senior engineering leadership on every engagement.",
    },
    pricing: {
      meta: {
        title: "Pricing — Transparent, security-focused plans",
        description:
          "Compare Secure IT Developers pricing for websites, commerce, and custom product builds. Every plan includes security hardening and support.",
        path: "pricing.html",
      },
      intro:
        "Pick the category that fits your roadmap, then choose the engagement level that matches your timeline and complexity.",
    },
    contact: {
      meta: {
        title: "Contact Secure IT Developers",
        description:
          "Reach out to Secure IT Developers to discuss your goals, security requirements, and delivery timeline.",
        path: "contact.html",
      },
      intro:
        "Share a few details and we'll send over a tailored proposal with security recommendations and delivery milestones.",
    },
    checkout: {
      meta: {
        title: "Checkout — Review your Secure IT Developers plan",
        description:
          "Review the plan you selected from Secure IT Developers before proceeding to payment.",
        path: "checkout.html",
      },
      message:
        "Need adjustments or a tailored engagement? Contact us and we'll customise the deliverables before you pay.",
    },
    payment: {
      meta: {
        title: "Payment — Secure billing with Secure IT Developers",
        description:
          "Enter billing details to complete your Secure IT Developers engagement.",
        path: "payment.html",
      },
      message: "All transactions are encrypted and reviewed by our finance team within one business day.",
    },
    success: {
      meta: {
        title: "Payment successful — Welcome to Secure IT Developers",
        description:
          "Your Secure IT Developers engagement is confirmed. We'll reach out with next steps.",
        path: "success.html",
      },
      heading: "Payment confirmed",
      body:
        "Thanks for partnering with Secure IT Developers. Your project kickoff email, including onboarding steps and access invites, is on its way.",
      actions: [
        { label: "Back to home", href: "index.html" },
        { label: "View pricing", href: "pricing.html", variant: "ghost" },
      ],
    },
    failed: {
      meta: {
        title: "Payment issue — Secure IT Developers",
        description:
          "Something went wrong while processing your payment with Secure IT Developers.",
        path: "failed.html",
      },
      heading: "Payment unsuccessful",
      body:
        "Your payment was not completed. No charges were made. You can retry below or contact us for manual invoicing support.",
      actions: [
        { label: "Try again", href: "payment.html" },
        { label: "Contact support", href: "contact.html", variant: "ghost" },
      ],
    },
  },
  pricingGroups: [
    {
      id: "starter",
      label: "Website Starter",
      plans: [
        {
          id: "basic",
          label: "Launch",
          price: 799,
          currency: "AUD",
          features: [
            "Up to 3 bespoke pages with responsive layouts",
            "Content strategy workshop and copy polishing",
            "On-page SEO setup with schema markup",
            "Privacy, cookie, and consent management tooling",
            "Analytics instrumentation (GA4 + Meta Pixel)",
            "Hardened deployment on Vercel or Netlify",
          ],
        },
        {
          id: "pro",
          label: "Growth",
          price: 2299,
          currency: "AUD",
          features: [
            "Up to 10 modular pages with CMS integration",
            "Design system components and animation polish",
            "Technical SEO audit and performance tuning",
            "Lead capture automations into your CRM",
            "Accessibility review (WCAG 2.2 AA)",
            "Security headers, WAF setup, and uptime alerts",
          ],
        },
        {
          id: "premium",
          label: "Scale",
          price: 4299,
          currency: "AUD",
          features: [
            "Unlimited pages with localization support",
            "Composable architecture with headless CMS",
            "Conversion experimentation setup (A/B + heatmaps)",
            "Multi-region deployment with CDN optimisation",
            "Quarterly security & performance reviews",
            "Team training + detailed documentation handover",
          ],
        },
      ],
    },
    {
      id: "ecom",
      label: "eCommerce",
      plans: [
        {
          id: "basic",
          label: "Launch",
          price: 1899,
          currency: "AUD",
          features: [
            "Shopify or WooCommerce theme setup customised to brand",
            "Product catalogue up to 80 SKUs with variant logic",
            "Secure payment gateways and tax/shipping rules",
            "Abandoned cart and welcome email automations",
            "Core Web Vitals optimisation for PDP and checkout",
            "Foundational analytics & attribution dashboard",
          ],
        },
        {
          id: "pro",
          label: "Growth",
          price: 3899,
          currency: "AUD",
          features: [
            "Headless storefront using Hydrogen or Next.js",
            "Subscription, bundles, and loyalty program integrations",
            "ERP/IMS sync with inventory forecasting",
            "Advanced Klaviyo/Drip flows with segmentation",
            "Fraud prevention rules and security audits",
            "Performance budget monitoring with monthly reports",
          ],
        },
        {
          id: "premium",
          label: "Scale",
          price: 6999,
          currency: "AUD",
          features: [
            "Composable commerce with custom checkout experiences",
            "Global storefronts with multi-currency support",
            "Complex fulfilment integrations (3PL, EDI, marketplaces)",
            "Customer data platform setup and BI dashboards",
            "Penetration testing with remediation sprints",
            "Dedicated optimisation retainer (CRO + SEO)",
          ],
        },
      ],
    },
    {
      id: "custom",
      label: "Custom Web/App",
      plans: [
        {
          id: "basic",
          label: "MVP",
          price: 2899,
          currency: "AUD",
          features: [
            "Authentication, RBAC, and secure session handling",
            "CRUD modules with audit logging",
            "REST or GraphQL API with documentation",
            "CI/CD pipeline with automated testing",
            "Cloud infrastructure provisioning (AWS/Azure/GCP)",
            "Product analytics instrumentation (PostHog/Amplitude)",
          ],
        },
        {
          id: "pro",
          label: "Growth",
          price: 5699,
          currency: "AUD",
          features: [
            "Modular architecture ready for microservices",
            "Advanced RBAC, SSO, and secrets management",
            "Streaming or event-driven integrations",
            "Observability stack (logs, metrics, tracing)",
            "Blue/green deployments with rollback automation",
            "Load testing with remediation recommendations",
          ],
        },
        {
          id: "premium",
          label: "Enterprise",
          price: 10499,
          currency: "AUD",
          features: [
            "Enterprise-grade security review and threat modelling",
            "Compliance support (SOC2, ISO 27001, HIPAA)",
            "Modular microservices with API gateway & service mesh",
            "Custom analytics lakehouse & reporting dashboards",
            "24/7 monitoring with incident response playbooks",
            "Quarterly roadmap workshops with leadership",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How quickly can we start?",
      a: "Discovery typically begins within 5 business days. Kickoff depends on complexity but we keep a fast-moving bench for priority engagements.",
    },
    {
      q: "Do you work with existing teams?",
      a: "Yes. We can operate as your end-to-end product squad or plug into existing teams as specialised security-focused engineers.",
    },
    {
      q: "What about post-launch support?",
      a: "Every engagement includes a 30-day warranty. Retainers are available for iterative development, optimisation, and security monitoring.",
    },
    {
      q: "Can you handle compliance requirements?",
      a: "Absolutely. We design with SOC2, ISO 27001, HIPAA, GDPR, and PCI DSS controls in mind, and collaborate with your auditors when needed.",
    },
  ],
};
