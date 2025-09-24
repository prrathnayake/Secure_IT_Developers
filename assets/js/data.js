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
  seo: {
    defaultKeywords:
      "secure web development, security-first developers, seo optimisation services, managed web maintenance, ecommerce security, australia web agency",
    ogImage: "assets/img/placeholder-growth.svg",
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
  forms: {
    contact: {
      endpointKey: "contactEndpoint",
      defaultEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
      subject: "Secure IT Developers — New contact request",
      success: "Thanks for reaching out! We'll reply within one business day.",
      error:
        "We couldn't send your message. Please email hello@secureitdevelopers.com instead.",
    },
    quote: {
      endpointKey: "quoteEndpoint",
      defaultEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
      subject: "Secure IT Developers — Quote request",
      success: "Your tailored quote has been generated. Watch your inbox for next steps.",
      error:
        "We couldn't deliver the quote email. Refresh and try again or email hello@secureitdevelopers.com.",
    },
  },
  footer: {
    about:
      "Security-focused engineers building performant digital experiences, with measurable business impact and transparent collaboration.",
    legalNote: "ABN 00 123 456 789",
  },
  team: [
    {
      id: "avery-patel",
      name: "Avery Patel",
      role: "Founder & Lead Full-Stack Engineer",
      location: "Sydney, Australia",
      bio:
        "Avery is a security-conscious engineer with 8+ years delivering web platforms, eCommerce stacks, and cloud-native applications for regulated industries.",
      testimonial:
        "“I believe every build should launch with security, performance, and business impact measured from day one.”",
      portfolio: "https://secureitdevelopers.com/portfolio",
      focus: [
        "Application security reviews & OWASP hardening",
        "TypeScript, React, and modern frontend architectures",
        "Node.js, Laravel, and API-first development",
        "DevOps automation across AWS, Azure, and GCP",
      ],
      links: [
        { label: "Portfolio", href: "https://secureitdevelopers.com/portfolio" },
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
        keywords:
          "secure web development, managed web maintenance, seo optimisation, ecommerce development australia, security focused agency",
        image: "assets/img/placeholder-growth.svg",
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
      addOns: {
        eyebrow: "Stay optimised after launch",
        heading: "Managed services & optimisation add-ons",
        copy:
          "Mix and match recurring services so your product keeps its edge on performance, conversion, and governance.",
        cards: [
          {
            title: "Monthly maintenance & security",
            price: "From $580/mo",
            description:
              "Scheduled framework upgrades, dependency patching, uptime monitoring, and recovery runbooks.",
            highlights: [
              "Applies to Next.js, Astro, Shopify, and WordPress builds",
              "24-hour security patch SLA with change logs",
              "Backups, restore drills, and vulnerability reports",
            ],
            image: "assets/img/placeholder-ops.svg",
          },
          {
            title: "Search & content optimisation",
            price: "From $720/mo",
            description:
              "Technical SEO audits, schema refreshes, and editorial calendars aligned to your growth metrics.",
            highlights: [
              "Quarterly keyword strategy with competitor insights",
              "Schema markup + Core Web Vitals tuning",
              "Content refresh playbooks and CMS workflows",
            ],
            image: "assets/img/placeholder-growth.svg",
          },
          {
            title: "Experimentation & analytics",
            price: "From $960/mo",
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
      gallery: {
        heading: "Recent build snapshots",
        copy:
          "Swap these placeholders with live project visuals by updating assets and captions in data.js when you're ready.",
        items: [
          {
            title: "Security-focused team sync",
            caption: "Sprint planning with live threat modelling to prioritise backlog hardening.",
            img: "assets/img/placeholder-team.svg",
            alt: "Team collaborating around laptops",
          },
          {
            title: "Ops automation control",
            caption: "Observability dashboards tracking deployments, uptime, and key incidents.",
            img: "assets/img/placeholder-ops.svg",
            alt: "Operations dashboard with charts",
          },
          {
            title: "Innovation lab",
            caption: "Prototype environment where we validate UX flows and performance budgets.",
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
      spotlight: {
        heading: "Meet the team",
        copy:
          "A single founder-led squad means you collaborate directly with the person building, auditing, and optimising your product.",
        memberId: "avery-patel",
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
        keywords:
          "secure development team, security design sprints, australian dev studio, devops automation partner",
        image: "assets/img/placeholder-team.svg",
      },
      intro:
        "We architect and build resilient digital products for founders and teams that value security, performance, and measurable results.",
      mission:
        "Our mission is to embed security and reliability into every product we ship while keeping collaboration transparent and outcomes data-driven.",
      story: {
        copy:
          "Secure IT Developers started as a solo consultancy helping regulated startups ship faster without sacrificing compliance. Today we operate as an embedded product partner for founders that need security, design, and growth thinking in one squad.",
        milestones: [
          {
            year: "2018",
            detail:
              "Launched the studio after delivering a PCI-compliant commerce rebuild for an enterprise retailer.",
          },
          {
            year: "2020",
            detail:
              "Introduced our security design sprints, pairing UX prototyping with threat modelling for fintech teams.",
          },
          {
            year: "2022",
            detail:
              "Scaled to support multi-region SaaS launches with infrastructure automation and 24/7 observability.",
          },
          {
            year: "2023",
            detail:
              "Expanded optimisation retainers covering CRO, SEO, and accessibility for commerce and B2B platforms.",
          },
        ],
        media: {
          img: "assets/img/placeholder-team.svg",
          alt: "Secure IT Developers team workshop",
          caption: "Weekly roadmap and security review inside the Secure IT Developers studio.",
        },
      },
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
      impact: [
        {
          metric: "120+",
          label: "Security audits shipped",
          detail: "Covering fintech, health, and government workloads with measurable remediation plans.",
        },
        {
          metric: "38%",
          label: "Average conversion uplift",
          detail: "Delivered across CRO and SEO retainers for commerce and subscription clients.",
        },
        {
          metric: "2.4s",
          label: "Median LCP after launch",
          detail: "We optimise for Core Web Vitals as part of every production deployment.",
        },
        {
          metric: "24/7",
          label: "Monitoring & incident cover",
          detail: "Retainer clients receive automated alerts with escalation runbooks.",
        },
      ],
      values: [
        "Security by default",
        "Outcome-driven delivery",
        "Transparent collaboration",
        "Continuous improvement",
      ],
      certifications: [
        "AWS Certified Solutions Architect – Professional",
        "Certified Information Systems Security Professional (CISSP)",
        "Google Analytics 4 Certification",
        "Scrum.org Professional Scrum Master",
      ],
      community: [
        "Host monthly security clinics for early-stage founders",
        "Publish threat-modelling templates and runbooks in our newsletter",
        "Mentor at local startup accelerators on secure product launches",
        "Speak at developer meetups about performance and accessibility",
      ],
      partners: [
        "Vercel & Netlify deployment partners",
        "AWS Activate and Microsoft for Startups programs",
        "Shopify Experts collective",
        "Security tooling alliances with Snyk and Prisma Cloud",
      ],
      gallery: {
        copy:
          "A peek into our hybrid workspace. Replace these visuals with your own culture and delivery moments straight from data.js.",
        items: [
          {
            title: "Threat modelling wall",
            caption: "Framing risks and mitigations alongside customer journey maps.",
            img: "assets/img/placeholder-team.svg",
            alt: "Sticky notes and architectural diagrams on a wall",
          },
          {
            title: "Ops & reliability pod",
            caption: "Live dashboards watching uptime, performance, and incident response health.",
            img: "assets/img/placeholder-ops.svg",
            alt: "Operations dashboard screens",
          },
          {
            title: "Experiment studio",
            caption: "Designers and engineers pair on experiments before they reach production.",
            img: "assets/img/placeholder-labs.svg",
            alt: "Product team ideating around laptops",
          },
        ],
      },
      teamIntro:
        "Secure IT Developers is currently founder-led, giving you direct access to senior engineering leadership on every engagement.",
    },
    pricing: {
      meta: {
        title: "Pricing — Transparent, security-focused plans",
        description:
          "Compare Secure IT Developers pricing for websites, commerce, and custom product builds. Every plan includes security hardening and support.",
        path: "pricing.html",
        keywords:
          "secure development pricing, ecommerce build cost, web maintenance retainer, seo optimisation retainers",
        image: "assets/img/placeholder-ops.svg",
      },
      intro:
        "Pick the category that fits your roadmap, then choose the engagement level that matches your timeline and complexity.",
      addOns: {
        eyebrow: "Extend your engagement",
        heading: "Recurring services for continuous gains",
        copy:
          "Layer proactive maintenance, SEO, and experimentation to keep performance, compliance, and growth trending up after launch.",
        cards: [
          {
            title: "Monthly maintenance retainer",
            price: "From $580/mo",
            description:
              "Framework upgrades, hosting patching, uptime monitoring, and quarterly recovery drills.",
            highlights: [
              "Dependency patching with changelog reports",
              "Infrastructure reviews and cost optimisation",
              "Incident response runbooks + on-call escalation",
            ],
          },
          {
            title: "SEO & content optimisation",
            price: "From $720/mo",
            description:
              "Roadmaps combining keyword research, structured data, and UX copy updates for compounding organic growth.",
            highlights: [
              "Quarterly technical SEO audits",
              "Editorial calendar + CMS workflow support",
              "Backlink and schema development",
            ],
          },
          {
            title: "Experimentation squad",
            price: "From $960/mo",
            description:
              "Hypothesis-driven experiments across landing pages, checkout, and product funnels with analytics instrumentation.",
            highlights: [
              "Test design and implementation",
              "Weekly readouts with action plans",
              "Attribution and lifecycle reporting dashboards",
            ],
          },
        ],
      },
      compare: {
        heading: "Compare project tiers",
        copy:
          "Understand how deliverables evolve within each category so you can pick the right balance of investment and velocity.",
        categories: [
          {
            id: "starter",
            label: "Marketing & product websites",
            summary:
              "From rapid landing pages to systemised, multi-region platforms ready for scale.",
            columns: [
              { planId: "starter-basic", label: "Launch" },
              { planId: "starter-pro", label: "Growth" },
              { planId: "starter-premium", label: "Scale" },
            ],
            rows: [
              {
                label: "Ideal for",
                values: [
                  "Founders validating positioning",
                  "Series A teams refreshing product story",
                  "Global teams with complex governance",
                ],
              },
              {
                label: "Team involvement",
                values: [
                  "1 lead engineer/designer",
                  "Lead + specialist network",
                  "Embedded squad across design, content, and DevOps",
                ],
              },
              {
                label: "SEO maturity",
                values: [
                  "Foundational technical SEO",
                  "Ongoing content optimisation",
                  "Enterprise localisation, schema, and analytics alignment",
                ],
              },
              {
                label: "Security & compliance",
                values: [
                  "Best-practice hardening",
                  "Security headers + WAF automation",
                  "Multi-region compliance with threat modelling",
                ],
              },
              {
                label: "Measurement",
                values: [
                  "Analytics baseline",
                  "Conversion dashboards",
                  "Experimentation platform with executive reporting",
                ],
              },
            ],
          },
          {
            id: "ecom",
            label: "eCommerce ecosystems",
            summary:
              "Scaling from secure carts to multi-market, automated commerce engines.",
            columns: [
              { planId: "ecom-basic", label: "Launch" },
              { planId: "ecom-pro", label: "Growth" },
              { planId: "ecom-premium", label: "Scale" },
            ],
            rows: [
              {
                label: "Merchandising",
                values: [
                  "Up to 80 SKUs with variant logic",
                  "Advanced bundling and subscriptions",
                  "Headless catalog with marketplace feeds",
                ],
              },
              {
                label: "Customer experience",
                values: [
                  "Optimised storefront templates",
                  "Personalised journeys with segmentation",
                  "Composable UX with experimentation and loyalty integration",
                ],
              },
              {
                label: "Operations",
                values: [
                  "Core fulfilment + payment automation",
                  "ERP/IMS integrations with forecasting",
                  "Global fulfilment orchestration + service mesh",
                ],
              },
              {
                label: "Security",
                values: [
                  "Secure gateway configuration",
                  "Fraud prevention & monitoring",
                  "Pen-testing, SOC2 alignment, and observability",
                ],
              },
              {
                label: "Growth",
                values: [
                  "Foundational analytics",
                  "Attribution + lifecycle automation",
                  "Customer data platforms with BI dashboards",
                ],
              },
            ],
          },
          {
            id: "custom",
            label: "Custom web & app builds",
            summary:
              "Align the scope with the complexity of your SaaS, portal, or platform roadmap.",
            columns: [
              { planId: "custom-basic", label: "MVP" },
              { planId: "custom-pro", label: "Growth" },
              { planId: "custom-premium", label: "Enterprise" },
            ],
            rows: [
              {
                label: "Architecture",
                values: [
                  "Secure monolith with modular patterns",
                  "Service-ready modular architecture",
                  "Microservices with service mesh & governance",
                ],
              },
              {
                label: "Integrations",
                values: [
                  "Core system APIs",
                  "Event-driven + streaming workflows",
                  "Enterprise integrations and data lakehouse",
                ],
              },
              {
                label: "Security posture",
                values: [
                  "RBAC & audit logging",
                  "SSO + secrets automation",
                  "Compliance support with quarterly testing",
                ],
              },
              {
                label: "Scalability",
                values: [
                  "CI/CD with automated tests",
                  "Blue/green + observability suite",
                  "Multi-region deployments with chaos testing",
                ],
              },
              {
                label: "Product analytics",
                values: [
                  "Feature usage tracking",
                  "Cohort analysis + funnels",
                  "Custom BI dashboards & stakeholder reporting",
                ],
              },
            ],
          },
        ],
      },
    },
    contact: {
      meta: {
        title: "Contact Secure IT Developers",
        description:
          "Reach out to Secure IT Developers to discuss your goals, security requirements, and delivery timeline.",
        path: "contact.html",
        keywords:
          "contact secure it developers, request security quote, talk to security developer, schedule discovery call",
        image: "assets/img/placeholder-team.svg",
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
