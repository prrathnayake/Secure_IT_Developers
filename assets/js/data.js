/* Centralized site content. Update values here to refresh the UI. */
(function initData() {
  const org = {
    name: "Secure IT Developers",
    legalName: "Secure IT Developers",
    tagline: "Startup-ready web, mobile & API builders",
    description:
      "Secure IT Developers is a Melbourne-based studio led by Pasan Rathnayake, delivering security-first web, mobile, and platform builds that help startups move from concept to reliable revenue.",
    url: "https://secureitdevelopers.com",
    logo: "assets/img/favicon.svg",
    email: "rans.rath@gmail.com",
    phone: "+61 434 438 494",
    location: {
      streetAddress: "120 Spencer Street",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      postalCode: "3000",
      addressCountry: "AU",
    },
    sameAs: [
      "https://secureitdevelopers.com",
      "https://www.linkedin.com/in/pasan-rathnayake",
      "https://github.com/pasanrathnayake",
      "https://www.instagram.com/secureitdevelopers",
    ],
  };
  const seo = {
    defaultKeywords:
      "secure web development, security-first developers, seo optimisation services, managed web maintenance, ecommerce security, australia web agency",
    siteName: "Secure IT Developers",
    author: "Secure IT Developers",
    robots: "index, follow",
    twitterHandle: "@secureitdev",
    twitterCreator: "@pasanbuilds",
    themeColor: "#0b1d3a",
    ogImage: "assets/img/placeholder-growth.svg",
  };
  const seoContent = {
    home: {
      title: "Secure IT Developers — Security-first web & app engineering",
      description:
        "Security-first websites, SaaS platforms, and eCommerce builds delivered with transparent pricing and measurable results.",
      path: "index.html",
      keywords:
        "secure web development, managed web maintenance, seo optimisation, ecommerce development australia, security focused agency",
      image: "assets/img/placeholder-growth.svg",
    },
    about: {
      title: "About Secure IT Developers",
      description:
        "Inside the Melbourne studio led by Pasan Rathnayake, blending security engineering, product strategy, and design to ship dependable digital products.",
      path: "about.html",
      keywords:
        "secure development team, security design sprints, australian dev studio, devops automation partner",
      image: "assets/img/placeholder-team.svg",
    },
    pricing: {
      title: "Pricing — Transparent, security-focused plans",
      description:
        "Compare Secure IT Developers pricing for websites, commerce, and custom product builds. Every plan includes security hardening and support.",
      path: "pricing.html",
      keywords:
        "secure development pricing, ecommerce build cost, web maintenance retainer, seo optimisation retainers",
      image: "assets/img/placeholder-ops.svg",
    },
    contact: {
      title: "Contact Secure IT Developers",
      description:
        "Reach out to Secure IT Developers to discuss your goals, security requirements, and delivery timeline.",
      path: "contact.html",
      keywords:
        "contact secure it developers, request security quote, talk to security developer, schedule discovery call",
      image: "assets/img/placeholder-team.svg",
    },
    checkout: {
      title: "Checkout — Review your Secure IT Developers plan",
      description:
        "Review the plan you selected from Secure IT Developers before proceeding to payment.",
      path: "checkout.html",
      keywords:
        "secure it developers checkout, confirm web development package, add services to quote, security focused engagement review",
      image: "assets/img/placeholder-ops.svg",
    },
    payment: {
      title: "Payment — Secure billing with Secure IT Developers",
      description:
        "Enter billing details to complete your Secure IT Developers engagement.",
      path: "payment.html",
      keywords:
        "secure it developers payment, pay for cybersecurity project, secure billing portal, web app development invoice",
      image: "assets/img/placeholder-growth.svg",
    },
    success: {
      title: "Payment successful — Welcome to Secure IT Developers",
      description:
        "Your Secure IT Developers engagement is confirmed. We'll reach out with next steps.",
      path: "success.html",
      keywords:
        "secure it developers payment success, project kickoff confirmation, cybersecurity engagement onboarding",
      image: "assets/img/placeholder-team.svg",
    },
    failed: {
      title: "Payment issue — Secure IT Developers",
      description:
        "Something went wrong while processing your payment with Secure IT Developers.",
      path: "failed.html",
      keywords:
        "secure it developers payment failed, retry secure payment, billing support cybersecurity agency",
      image: "assets/img/placeholder-ops.svg",
    },
    detail: {
      title: "Engagement details — Secure IT Developers",
      description:
        "Dive deeper into our engagements and specialist services, including deliverables, pricing guidance, and recommended add-ons.",
      path: "detail.html",
      keywords:
        "secure it developers engagement details, security focused service breakdown, web app package inclusions, cybersecurity add ons",
      image: "assets/img/placeholder-team.svg",
    },
    legal: {
      title: "Privacy & legal — Secure IT Developers",
      description:
        "Review how Secure IT Developers safeguards data, governs engagements, and upholds compliance commitments.",
      path: "legal.html",
      keywords:
        "secure it developers privacy policy, legal terms, data protection statement, cybersecurity agency compliance",
      image: "assets/img/placeholder-ops.svg",
    },
  };
  const navigation = [
    { label: "Home", href: "index.html" },
    { label: "Pricing", href: "pricing.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" },
  ];
  const socials = [
    {
      label: "Website",
      href: "https://secureitdevelopers.com",
      aria: "Website",
      icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M12 2a10 10 0 100 20 10 10 0 000-20zm0 2.1c1.5 0 2.9.5 4 1.3a16 16 0 01-4 6.6 16 16 0 01-4-6.6A7.9 7.9 0 0112 4.1zm-6.7 7.1a13.8 13.8 0 003.4 5.9A8 8 0 015.3 11.2zm5.3 6.9c1.1-1.3 2.1-2.7 2.8-4.2.7 1.5 1.7 2.9 2.8 4.2a7.9 7.9 0 01-5.6 0zm6.7-.9a13.8 13.8 0 003.4-5.9 8 8 0 01-3.4 5.9z'/></svg>",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pasan-rathnayake",
      aria: "LinkedIn profile",
      icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M4 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4zm3.2 4.2a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM6.2 19V9.5h3.1V19H6.2zm5.3 0h-3V9.5h3v1.6c.7-1.12 2-1.9 3.3-1.9 2.1 0 3.7 1.4 3.7 4.3V19h-3.1v-4.6c0-1.1-.5-1.9-1.6-1.9-1.1 0-1.8.8-1.8 1.9V19z'/></svg>",
    },
    {
      label: "GitHub",
      href: "https://github.com/pasanrathnayake",
      aria: "GitHub profile",
      icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.3-1.3-3.3-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.3-1.1.5-1.4-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 015.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0012 2z'/></svg>",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/secureitdevelopers",
      aria: "Instagram profile",
      icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v10c0 1.1.9 2 2 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5.3-.6a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z'/></svg>",
    },
  ];
  const contact = {
    heading: "Let's build your next secure product",
    copy:
      "Share where you are on the roadmap—brand-new landing page, mobile MVP, or API overhaul. Pasan replies personally with next steps inside one business day.",
    emailLabel: "rans.rath@gmail.com",
    phoneLabel: "+61 434 438 494",
    locationLabel: "Melbourne, Australia (remote-first)",
    responseTime: "Replies in under 24 hours",
  };
  const forms = {
    contact: {
      endpointKey: "contactEndpoint",
      defaultEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
      subject: "Secure IT Developers — New contact request",
      success: "Thanks for reaching out! We'll reply within one business day.",
      error:
        "We couldn't send your message. Please email rans.rath@gmail.com instead.",
    },
    quote: {
      endpointKey: "quoteEndpoint",
      defaultEndpoint: "https://formsubmit.co/ajax/rans.rath@gmail.com",
      subject: "Secure IT Developers — Quote request",
      success: "Your tailored quote has been generated. Watch your inbox for next steps.",
      error:
        "We couldn't deliver the quote email. Refresh and try again or email rans.rath@gmail.com.",
    },
  };
  const billing = {
    currency: "AUD",
    taxRate: 0.1,
    staffRate: 0.08,
    staffLabel: "Project leadership & QA assurance",
    note:
      "GST calculated for Australian clients. Staffing covers senior engineering oversight, QA analysts, and delivery management.",
  };
  const footer = {
    about:
      "Melbourne-based engineers delivering security-first web, mobile, and platform builds with startup-friendly collaboration.",
    legalNote: "ABN 00 123 456 789",
    contactPoints: [
      {
        label: "Email",
        value: org.email,
        href: `mailto:${org.email}`,
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v.01L12 13l8-6.99V6H4zm16 12V8l-8 7-8-7v10h16z'/></svg>",
      },
      {
        label: "Phone",
        value: org.phone,
        href: org.phone ? `tel:${org.phone.replace(/[^+\d]/g, "")}` : "",
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M6.7 4.6l2.6 2.6a1 1 0 01.24 1.01l-1 3.02a12.4 12.4 0 005.87 5.87l3.02-1a1 1 0 011.01.24l2.6 2.6a1 1 0 01-.05 1.45 4.8 4.8 0 01-2.95 1 12.6 12.6 0 01-12.6-12.6 4.8 4.8 0 011-2.95 1 1 0 011.45-.05z'/></svg>",
      },
      {
        label: "Location",
        value: contact.locationLabel,
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M12 2a6 6 0 016 6c0 4.4-6 12-6 12S6 12.4 6 8a6 6 0 016-6zm0 3a3 3 0 100 6 3 3 0 000-6z'/></svg>",
      },
      {
        label: "Response time",
        value: contact.responseTime,
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 10.59l3.3 1.9-.9 1.63L11 13V7h2z'/></svg>",
      },
    ],
    securityPractices: [
      {
        title: "Encryption",
        detail: "AES-256 encryption protects credentials and project artefacts end-to-end.",
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M17 10h-1V7a4 4 0 00-8 0v3H7a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1v-8a1 1 0 00-1-1zm-7-3a2 2 0 114 0v3h-4zm4 8a2 2 0 11-4 0 2 2 0 014 0z'/></svg>",
      },
      {
        title: "Decryption",
        detail: "Role-based approvals unlock secrets only when audits and delivery require it.",
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M21 7a5 5 0 10-9.8 1.7L3 17v4h4l1.71-1.71L10 18v-2h2l1-1v-2h2l1.59-1.59A5 5 0 0021 7zm-5 3a3 3 0 113-3 3 3 0 01-3 3z'/></svg>",
      },
      {
        title: "JWT tokenisation",
        detail: "Signed JWT flows guard customer sessions and integrations with rotation policies.",
        icon: "<svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4zm0 4.6L8 8v3.9a6.1 6.1 0 004 5.5 6.1 6.1 0 004-5.5V8z'/></svg>",
      },
    ],
    policies: [
      { label: "Privacy Policy", href: "legal.html#privacy" },
      { label: "Terms of Service", href: "legal.html#terms" },
      { label: "Data Protection", href: "legal.html#data-protection" },
    ],
  };
  const team = [
    {
      id: "pasan-rathnayake",
      name: "Pasan Rathnayake",
      role: "Founder & Lead Engineer",
      location: "Melbourne, Australia",
      bio:
        "Pasan blends 9+ years of full-stack development with hands-on security consulting, partnering with founders to launch and scale products that are hardened from day one.",
      testimonial:
        "“I love translating ambitious roadmaps into stable, secure experiences your customers can trust.”",
      portfolio: "https://secureitdevelopers.com/portfolio",
      focus: [
        "End-to-end SaaS and marketing platform builds",
        "React, Next.js, Flutter, and modern mobile stacks",
        "Node.js, Laravel, and API-first architecture",
        "Security audits, DevOps automation, and observability",
      ],
      links: [
        { label: "Portfolio", href: "https://secureitdevelopers.com/portfolio" },
        { label: "Website", href: "https://secureitdevelopers.com" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/pasan-rathnayake",
        },
        { label: "GitHub", href: "https://github.com/pasanrathnayake" },
        { label: "X (Twitter)", href: "https://twitter.com/pasanbuilds" },
      ],
    },
    {
      id: "sunara-ranasooriya",
      name: "Sunara Ranasooriya",
      role: "Cybersecurity Specialist",
      location: "Colombo, Sri Lanka",
      bio:
        "Sunara leads threat modelling and incident readiness for regulated teams, drawing on 8+ years across telecom and fintech SOC leadership.",
      testimonial:
        "“Security isn't a checkbox—it’s a culture. I love partnering with founders to build that muscle early.”",
      portfolio: "https://secureitdevelopers.com/security",
      focus: [
        "Threat modelling and purple-team simulations",
        "Zero Trust network and identity strategy delivery",
        "Security awareness, runbooks, and incident response coaching",
      ],
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/sunera-ranasooriya",
        },
        { label: "Website", href: "https://secureitdevelopers.com" },
      ],
    },
  ];
  const homePage = {
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

  const aboutPage = {
    meta: seoContent.about,
    intro:
      "We architect and build resilient digital products for founders that value security, performance, and transparent delivery.",
    mission:
      "Our mission is to embed security and reliability into every product we ship while keeping collaboration transparent and outcomes data-driven.",
    pillarsHeading: "Why founders partner with us",
    pillars: [
      {
        title: "Security leadership on tap",
        detail:
          "Access senior security engineers who join ceremonies, shape roadmaps, and document controls alongside your product team.",
        highlights: [
          "Security champions inside every squad",
          "Runbooks and response playbooks documented",
          "Audit support with evidence-ready artefacts",
        ],
      },
      {
        title: "Product strategy meets delivery",
        detail:
          "Blend product strategy, design, and engineering so experiments land fast without sacrificing resilience.",
        highlights: [
          "Design sprints with measurable KPIs",
          "Weekly growth and performance reviews",
          "Accessibility baked into QA gates",
        ],
      },
      {
        title: "Transparency from kickoff to launch",
        detail:
          "Shared dashboards show burn, velocity, incidents, and ROI so stakeholders stay aligned.",
        highlights: [
          "Single source of truth for delivery metrics",
          "Daily async updates with loom recaps",
          "Post-launch retros with documented wins",
        ],
      },
    ],
    story: {
      copy:
        "Secure IT Developers began as Pasan's consultancy helping regulated startups ship faster without sacrificing compliance. Today we operate as an embedded product partner for founders that need security, design, and growth thinking in one squad.",
      milestones: [
        {
          year: "2018",
          detail:
            "Pasan launched the studio after delivering a PCI-compliant commerce rebuild for an enterprise retailer.",
        },
        {
          year: "2020",
          detail:
            "Introduced security design sprints, pairing UX prototyping with threat modelling for fintech teams.",
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
      "MySQL, PlanetScale, DynamoDB",
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
    leadership: {
      heading: "Leadership & governance",
      copy:
        "Founder-led delivery keeps decision-makers close to the work. We pair a dedicated engagement lead with senior engineers, designers, and analysts so you always know who is accountable.",
      details: [
        "Every engagement includes a delivery lead, QA analyst, and security champion.",
        "Fortnightly governance reviews cover scope, risk, and budget health.",
        "Clients receive SOC2-aligned documentation packages at key milestones.",
      ],
    },
    assurance: {
      heading: "Assurance & ways of working",
      copy:
        "We treat every build as mission critical. Tooling, secrets, and client data are isolated per engagement with least-privilege access.",
      commitments: [
        "Dedicated compliance workspace with access logs",
        "Secure vault for credential exchange and rotation",
        "Signed NDAs and background checks for all staff",
        "Structured incident communication within 1 hour",
      ],
    },
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
      "Secure IT Developers is founder-led, giving you direct access to senior engineering leadership on every engagement.",
  };

  const pricingPage = {
    meta: seoContent.pricing,
    intro:
      "Start with the category that matches your roadmap—web, mobile, platform, or commerce—then choose the engagement level that fits your timeline and complexity.",
    addOns: {
      eyebrow: "Extend your engagement",
      heading: "Recurring services for continuous gains",
      copy:
        "Layer proactive maintenance, SEO, and experimentation to keep performance, compliance, and growth trending up after launch.",
      cards: [
        {
          title: "Monthly maintenance retainer",
          price: "From $680/mo",
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
          price: "From $760/mo",
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
          price: "From $990/mo",
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
    deepDive: {
      eyebrow: "Smart support pairings",
      heading: "Recommended services by focus area",
      copy:
        "Toggle between product types to explore the specialist services that keep each engagement secure, optimised, and compliant after launch.",
      empty: "Service recommendations are being finalised. Check back shortly.",
      linkLabel: "Explore service details",
    },
    customEngagement: {
      eyebrow: "Bespoke programs",
      heading: "Design a custom engagement around your roadmap",
      copy:
        "Mix and match retainers, discovery sprints, and compliance support. We assemble the right specialists to move your KPI targets while protecting customer data.",
      highlights: [
        "Dedicated engagement lead and security champion",
        "Fortnightly ROI reporting with agreed KPIs",
        "Shared delivery board with budget and runway visibility",
      ],
      primaryCta: { label: "Schedule a planning session", href: "contact.html" },
      secondaryCta: {
        label: "Browse delivery approach",
        href: "about.html#aboutApproach",
      },
      aside: {
        title: "What to expect",
        metrics: [
          { label: "Average payback", value: "4.2 months" },
          { label: "Security incidents", value: "0 critical in 36 months" },
          { label: "Client NPS", value: "+72" },
        ],
      },
    },
    standalone: {
      eyebrow: "Need help without a package?",
      heading: "Book standalone services",
      copy:
        "Pick the sprints and reviews that solve your immediate challenges—from security audits to SEO growth plays.",
      note: "Every service includes a discovery call, scoped roadmap, and documented next steps.",
    },
    compare: {
      heading: "Compare project tiers",
      copy:
        "Understand how deliverables evolve within each category so you can pick the right balance of investment and velocity.",
      categories: [
        {
          id: "web",
          label: "Web & marketing websites",
          summary:
            "Move from launch-ready pages to global storytelling engines with experimentation built in.",
          columns: [
            { planId: "web-launch", label: "Launch" },
            { planId: "web-growth", label: "Growth" },
            { planId: "web-scale", label: "Scale" },
          ],
          rows: [
            {
              label: "Ideal for",
              values: [
                "Idea-stage founders shipping credibility",
                "Scaling teams running content and CRO",
                "Global organisations with governance needs",
              ],
            },
            {
              label: "Content ops",
              values: [
                "Component-driven pages + messaging workshop",
                "CMS-driven content with automation hooks",
                "Multi-region publishing with localisation workflows",
              ],
            },
            {
              label: "Experience",
              values: [
                "Responsive layouts + SEO baseline",
                "Motion design & experimentation roadmap",
                "A/B testing suite with analytics dashboards",
              ],
            },
            {
              label: "Security & compliance",
              values: [
                "Best-practice hardening",
                "Security headers + WAF automation",
                "Regional privacy workflows & threat modelling",
              ],
            },
            {
              label: "Measurement",
              values: [
                "Analytics baseline",
                "Conversion dashboards",
                "Executive reporting with experimentation insights",
              ],
            },
          ],
        },
        {
          id: "mobile",
          label: "Mobile products",
          summary:
            "From MVPs in the app stores to enterprise-ready cross-platform experiences.",
          columns: [
            { planId: "mobile-launch", label: "Launch" },
            { planId: "mobile-growth", label: "Growth" },
            { planId: "mobile-scale", label: "Scale" },
          ],
          rows: [
            {
              label: "Ideal for",
              values: [
                "Founders validating a mobile MVP",
                "Product teams growing retention",
                "Enterprises demanding resilience & compliance",
              ],
            },
            {
              label: "Platform coverage",
              values: [
                "iOS & Android with shared code",
                "Native patterns + advanced device features",
                "Background tasks, realtime sync, localisation",
              ],
            },
            {
              label: "Engagement",
              values: [
                "Analytics + crash monitoring",
                "Segmentation, push, and lifecycle flows",
                "Warehouses, cohorts, and experimentation",
              ],
            },
            {
              label: "Security",
              values: [
                "Secure storage + auth best practice",
                "Secure code review + penetration testing",
                "Compliance-aligned release playbooks",
              ],
            },
            {
              label: "Delivery",
              values: [
                "Store submission + release pipeline",
                "CI/CD automation with QA suite",
                "24/7 observability with incident runbooks",
              ],
            },
          ],
        },
        {
          id: "ecom",
          label: "Commerce & subscriptions",
          summary:
            "Scale from secure carts to multi-market commerce engines.",
          columns: [
            { planId: "ecom-launch", label: "Launch" },
            { planId: "ecom-growth", label: "Growth" },
            { planId: "ecom-scale", label: "Scale" },
          ],
          rows: [
            {
              label: "Merchandising",
              values: [
                "Tailored theme + 120 SKUs",
                "Headless catalogue with bundles & subscriptions",
                "Composable commerce with marketplaces + wholesale",
              ],
            },
            {
              label: "Customer experience",
              values: [
                "Optimised storefront templates",
                "Personalised journeys & segmentation",
                "Custom checkout + experimentation program",
              ],
            },
            {
              label: "Operations",
              values: [
                "Payments, tax, shipping automation",
                "ERP/IMS integration + forecasting",
                "Global fulfilment orchestration & service mesh",
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
                "Analytics baseline",
                "Attribution + lifecycle automation",
                "Customer data platforms with BI dashboards",
              ],
            },
          ],
        },
        {
          id: "api",
          label: "API & backend platforms",
          summary:
            "Evolve from foundational APIs to compliant, data-rich platforms.",
          columns: [
            { planId: "api-launch", label: "Launch" },
            { planId: "api-growth", label: "Growth" },
            { planId: "api-scale", label: "Scale" },
          ],
          rows: [
            {
              label: "Architecture",
              values: [
                "Secure monolith with modular patterns",
                "Service-ready architecture with event flows",
                "Microservices with service mesh & governance",
              ],
            },
            {
              label: "Integrations",
              values: [
                "Core system APIs",
                "Webhooks + automation",
                "Enterprise integrations & data lakehouse",
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
                "Autoscaling + observability suite",
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
  };

  const pricingGroups = [
    {
      id: "web",
      label: "Web & Marketing",
      tagline: "Polished marketing sites ready to convert",
      plans: [
        {
          id: "launch",
          label: "Launch",
          price: 1490,
          currency: "AUD",
          summary:
            "Perfect for founders validating positioning and shipping a credible presence fast.",
          features: [
            "Up to 5 responsive pages with reusable components",
            "Story, messaging, and SEO discovery workshop",
            "Technical SEO baseline with analytics setup",
            "Privacy, consent, and cookie tooling",
            "Secure hosting on Vercel or Netlify",
            "Performance budget with automated checks",
          ],
          recommendedServices: ["seo-technical", "ux-accessibility"],
        },
        {
          id: "growth",
          label: "Growth",
          price: 3290,
          currency: "AUD",
          summary:
            "For teams scaling content, experiments, and lead capture with confidence.",
          features: [
            "10-15 modular pages with CMS integration",
            "Motion design and interactive components",
            "CRO roadmap with multivariate experiments",
            "CRM and marketing automation hooks",
            "Accessibility review (WCAG 2.2 AA)",
            "Security headers, WAF, and uptime alerts",
          ],
          recommendedServices: ["seo-technical", "performance-hardening"],
        },
        {
          id: "scale",
          label: "Scale",
          price: 5490,
          currency: "AUD",
          summary:
            "Enterprise-grade storytelling with global governance and measurement baked in.",
          features: [
            "Unlimited locales with content governance workflows",
            "Headless architecture with reusable design systems",
            "Experimentation program and analytics dashboards",
            "Regional compliance and privacy workflows",
            "Quarterly performance and security reviews",
            "Team enablement and documentation handover",
          ],
          recommendedServices: ["seo-technical", "security-audit"],
        },
      ],
    },
    {
      id: "mobile",
      label: "Mobile Products",
      tagline: "Cross-platform apps with native polish",
      plans: [
        {
          id: "launch",
          label: "Launch",
          price: 3490,
          currency: "AUD",
          summary:
            "Get your MVP into the App Store and Play Store with secure foundations.",
          features: [
            "React Native or Flutter build with design system",
            "Authentication, onboarding, and secure storage",
            "API integration with offline-first data sync",
            "Automated QA pipeline with device testing",
            "Store submission support and release management",
            "Crash and performance monitoring setup",
          ],
          recommendedServices: ["mobile-polish", "performance-hardening"],
        },
        {
          id: "growth",
          label: "Growth",
          price: 6290,
          currency: "AUD",
          summary:
            "Scale retention, engagement, and monetisation with confidence.",
          features: [
            "Design system with native interaction patterns",
            "Push notifications, deep links, and segmentation",
            "CI/CD with fastlane or Codemagic",
            "In-app purchases or subscription flows",
            "Analytics, retention, and cohort dashboards",
            "Security audit and secure code review",
          ],
          recommendedServices: ["mobile-polish", "security-audit"],
        },
        {
          id: "scale",
          label: "Scale",
          price: 9890,
          currency: "AUD",
          summary:
            "For venture-backed teams operating at enterprise-level scale and reliability.",
          features: [
            "Modular architecture for multi-team delivery",
            "Realtime sync, background tasks, and edge caching",
            "Advanced accessibility and localisation",
            "Integration with analytics warehouses",
            "Chaos testing and performance hardening",
            "24/7 observability with incident runbooks",
          ],
          recommendedServices: [
            "mobile-polish",
            "performance-hardening",
            "security-audit",
          ],
        },
      ],
    },
    {
      id: "api",
      label: "API & Backend Platforms",
      tagline: "Secure foundations for data-rich products",
      plans: [
        {
          id: "launch",
          label: "Launch",
          price: 2990,
          currency: "AUD",
          summary:
            "Ship a reliable backend or integration layer with confidence.",
          features: [
            "REST or GraphQL API with schema and docs",
            "Role-based access, auth, and audit logging",
            "Infrastructure-as-code deployment",
            "Unit and integration tests with coverage reports",
            "Monitoring and alerting baseline",
            "DevOps pipeline for staging and production",
          ],
          recommendedServices: ["api-integration", "security-audit"],
        },
        {
          id: "growth",
          label: "Growth",
          price: 5990,
          currency: "AUD",
          summary:
            "Extend your platform with automation, scale, and full observability.",
          features: [
            "Event-driven architecture and queue processing",
            "Third-party integrations and webhook orchestration",
            "Secrets management and rotation policies",
            "Autoscaling container or serverless setup",
            "Full observability (logs, metrics, tracing)",
            "Load testing with remediation backlog",
          ],
          recommendedServices: [
            "api-integration",
            "performance-hardening",
            "security-audit",
          ],
        },
        {
          id: "scale",
          label: "Scale",
          price: 10490,
          currency: "AUD",
          summary:
            "Enterprise-grade platforms with compliance and resilience engineered in.",
          features: [
            "Modular microservices with API gateway",
            "Zero-downtime deployments and blue/green rollout",
            "Compliance support (SOC2, ISO 27001, HIPAA)",
            "Data lakehouse and BI integration",
            "Disaster recovery and chaos engineering drills",
            "Quarterly threat modelling workshops",
          ],
          recommendedServices: ["security-audit", "performance-hardening"],
        },
      ],
    },
    {
      id: "ecom",
      label: "Commerce & Subscriptions",
      tagline: "Sell and scale with automation baked-in",
      plans: [
        {
          id: "launch",
          label: "Launch",
          price: 2190,
          currency: "AUD",
          summary:
            "Get trading quickly with a secure, conversion-friendly storefront.",
          features: [
            "Shopify or WooCommerce theme tailored to brand",
            "Catalogue up to 120 SKUs with variant logic",
            "Secure payments, tax, and shipping rules",
            "Lifecycle automations (welcome + abandoned cart)",
            "Performance tuning for PDP and checkout",
            "Analytics and attribution baseline",
          ],
          recommendedServices: ["seo-technical", "security-audit"],
        },
        {
          id: "growth",
          label: "Growth",
          price: 4290,
          currency: "AUD",
          summary:
            "Level up operations, personalisation, and automation for scale.",
          features: [
            "Headless storefront using Hydrogen or Next.js",
            "Subscriptions, bundles, and loyalty programs",
            "ERP/IMS integrations with forecasting",
            "Advanced segmentation and personalisation",
            "Fraud prevention and security audits",
            "Performance budget dashboards",
          ],
          recommendedServices: ["seo-technical", "api-integration"],
        },
        {
          id: "scale",
          label: "Scale",
          price: 7290,
          currency: "AUD",
          summary:
            "For multi-region commerce leaders needing compliance and experimentation.",
          features: [
            "Composable commerce with multi-region catalogue",
            "Marketplace and wholesale channel integrations",
            "Custom checkout experiences with A/B testing",
            "Customer data platform and BI dashboards",
            "Pen testing with remediation sprints",
            "Dedicated optimisation retainer",
          ],
          recommendedServices: [
            "security-audit",
            "seo-technical",
            "performance-hardening",
          ],
        },
      ],
    },
  ];

  const contactPage = {
    meta: seoContent.contact,
    intro:
      "Share a few details and we'll send over a tailored proposal with security recommendations and delivery milestones.",
  };

  const checkoutPage = {
    meta: seoContent.checkout,
    message:
      "Need adjustments or a tailored engagement? Contact us and we'll customise the deliverables before you pay.",
  };

  const paymentPage = {
    meta: seoContent.payment,
    message: "All transactions are encrypted and reviewed by our finance team within one business day.",
  };

  const successPage = {
    meta: seoContent.success,
    heading: "Payment confirmed",
    body:
      "Thanks for partnering with Secure IT Developers. Your project kickoff email, including onboarding steps and access invites, is on its way.",
    actions: [
      { label: "Back to home", href: "index.html" },
      { label: "View pricing", href: "pricing.html", variant: "ghost" },
    ],
  };

  const failedPage = {
    meta: seoContent.failed,
    heading: "Payment unsuccessful",
    body:
      "Your payment was not completed. No charges were made. You can retry below or contact us for manual invoicing support.",
    actions: [
      { label: "Try again", href: "payment.html" },
      { label: "Contact support", href: "contact.html", variant: "ghost" },
    ],
  };

  const detailPage = {
    meta: seoContent.detail,
  };

  const legalPage = {
    meta: seoContent.legal,
    heading: "Privacy, terms, and data protection",
    intro:
      "Security and trust guide every engagement. These policies outline how we protect information, set expectations, and respond when you need support.",
    sections: [
      {
        id: "privacy",
        title: "Privacy policy",
        body: [
          "We collect only the details required to scope engagements and deliver agreed work. Access to personal data is restricted to senior staff under signed confidentiality agreements.",
          "Operational data is encrypted at rest and in transit, monitored with audit trails, and removed when projects conclude unless ongoing services require retention.",
        ],
        bullets: [
          "Form submissions and credentials are stored using AES-256 encryption with time-bound keys.",
          "Third-party processors (for example, cloud hosting and analytics) are vetted for SOC2 or ISO 27001 compliance.",
          "You can request data removal or export at any time by emailing privacy@secureitdevelopers.com.",
        ],
      },
      {
        id: "terms",
        title: "Terms of service",
        body: [
          "Every engagement begins with a mutually signed statement of work covering scope, deliverables, and payment schedule. We work transparently in shared tooling so you can see progress and review artefacts early.",
          "Intellectual property transfers once invoices are settled, and we guarantee defect remediation for 30 days after launch unless otherwise specified in a managed-services agreement.",
        ],
        bullets: [
          "Change requests are captured through agreed backlog tools and priced before implementation.",
          "Invoices are issued at project milestones or monthly for retainers with NET 14 terms.",
          "Either party may terminate with 14 days notice; completed work and in-progress deliverables are billed proportionally.",
        ],
      },
      {
        id: "data-protection",
        title: "Data protection & incident response",
        body: [
          "We operate a defense-in-depth approach across development, infrastructure, and continuous delivery. Secrets are stored in managed vaults and rotated automatically with environment-table auditing.",
          "If an incident impacts your environment, you receive an initial notification within 24 hours, followed by containment updates and a remediation report with lessons learned.",
        ],
        bullets: [
          "Customer logging for database credentials uses environment-bound tables keyed by deployment secrets.",
          "Penetration testing and dependency reviews are scheduled quarterly for long-running retainers.",
          "Disaster-recovery drills validate restore points, access controls, and communications workflows.",
        ],
      },
    ],
    contact: {
      heading: "Need bespoke terms?",
      copy:
        "We can supply NDAs, security schedules, and compliance evidence tailored to your procurement team—just let us know what you need.",
      email: "privacy@secureitdevelopers.com",
      phone: "+61 434 438 494",
    },
  };

  const pages = {
    home: homePage,
    about: aboutPage,
    pricing: pricingPage,
    contact: contactPage,
    checkout: checkoutPage,
    payment: paymentPage,
    success: successPage,
    failed: failedPage,
    detail: detailPage,
    legal: legalPage,
  };

  const serviceCatalog = [
    {
      id: "security-audit",
      title: "Security & compliance audit",
      description:
        "Deep-dive review of your web, mobile, or API stack with actionable remediation steps mapped to OWASP and ISO controls.",
      price: 3600,
      priceLabel: "From $3,600",
      category: "Security",
      benefits: [
        "Identify configuration drift and insecure defaults across cloud, CI/CD, and application layers",
        "Deliver remediation tickets prioritised by risk with owner-ready descriptions",
        "Provide executive-ready summaries for stakeholders and compliance auditors",
      ],
    },
    {
      id: "seo-technical",
      title: "Technical SEO & content sprint",
      description:
        "Optimise Core Web Vitals, schema, and editorial workflows to lift organic visibility and conversions.",
      price: 2950,
      priceLabel: "From $2,950",
      category: "Growth",
      benefits: [
        "Boost organic performance with Core Web Vitals tuning and structured data coverage",
        "Equip content teams with workflows for continuous optimisation",
        "Surface growth opportunities with keyword gap and SERP analysis",
      ],
    },
    {
      id: "performance-hardening",
      title: "Performance hardening",
      description:
        "Stress-test and tune critical journeys with profiling, caching strategies, and infrastructure optimisation.",
      price: 2400,
      priceLabel: "From $2,400",
      category: "Engineering",
      benefits: [
        "Profile front-end and backend bottlenecks with actionable benchmarks",
        "Implement caching, CDNs, and workload tuning to sustain peak demand",
        "Document performance budgets and alerting thresholds for engineering teams",
      ],
    },
    {
      id: "api-integration",
      title: "API & integration build",
      description:
        "Design and ship robust REST or GraphQL endpoints with documentation, auth, and monitoring.",
      price: 4200,
      priceLabel: "From $4,200",
      category: "Engineering",
      benefits: [
        "Design resilient APIs with schema governance and automated documentation",
        "Implement secure authentication, rate limiting, and monitoring from day one",
        "Reduce integration risk with contract testing and rollback playbooks",
      ],
    },
    {
      id: "mobile-polish",
      title: "Mobile polish sprint",
      description:
        "Stabilise and improve existing Flutter or React Native apps with performance tuning and UX refinements.",
      price: 3300,
      priceLabel: "From $3,300",
      category: "Mobile",
      benefits: [
        "Stabilise crash-prone journeys with automated device lab coverage",
        "Elevate UX with platform-specific motion, accessibility, and offline-first flows",
        "Ship updates faster through optimised CI/CD and release management",
      ],
    },
    {
      id: "ux-accessibility",
      title: "Accessibility & UX review",
      description:
        "Audit flows against WCAG 2.2 AA, deliver remediation tickets, and coach teams on inclusive design.",
      price: 1750,
      priceLabel: "From $1,750",
      category: "Experience",
      benefits: [
        "Audit against WCAG 2.2 AA with annotated remediation recommendations",
        "Coach teams on inclusive design patterns and QA rituals",
        "Improve conversion through UX heuristics and journey refinements",
      ],
    },
  ];

  const quoteCalculator = {
    projects: {
      web: {
        label: "Web & marketing site",
        tiers: {
          small: { title: "Launch site", base: 1800, currency: "AUD" },
          medium: { title: "Growth site", base: 3600, currency: "AUD" },
          large: { title: "Scale site", base: 5800, currency: "AUD" },
        },
      },
      mobile: {
        label: "Mobile app",
        tiers: {
          small: { title: "MVP app", base: 4200, currency: "AUD" },
          medium: { title: "Growth app", base: 7200, currency: "AUD" },
          large: { title: "Enterprise app", base: 11200, currency: "AUD" },
        },
      },
      api: {
        label: "API / platform",
        tiers: {
          small: { title: "Core API", base: 3600, currency: "AUD" },
          medium: { title: "Platform expansion", base: 6900, currency: "AUD" },
          large: { title: "Enterprise platform", base: 11800, currency: "AUD" },
        },
      },
      ecom: {
        label: "Commerce experience",
        tiers: {
          small: { title: "Launch store", base: 3200, currency: "AUD" },
          medium: { title: "Growth store", base: 5400, currency: "AUD" },
          large: { title: "Scale commerce", base: 8900, currency: "AUD" },
        },
      },
    },
    timelines: {
      standard: { label: "6–10 weeks", adjustment: 0 },
      accelerated: { label: "3–5 weeks", adjustment: 1200 },
      rush: { label: "Under 3 weeks", adjustment: 2400 },
    },
    compliance: {
      standard: { label: "General best practice", adjustment: 0 },
      regulated: { label: "Regulated industry support", adjustment: 1500 },
      critical: { label: "Mission critical / audited", adjustment: 2800 },
    },
    support: {
      0: { label: "No ongoing support", multiplier: 0 },
      "0.12": {
        label: "Monthly performance & CRO (12% of build)",
        multiplier: 0.12,
      },
      "0.2": {
        label: "Embedded optimisation squad (20% of build)",
        multiplier: 0.2,
      },
    },
  };

  const faqs = [
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
    {
      q: "What does onboarding look like?",
      a: "We run a structured onboarding covering access, tooling, security checks, and project goals within the first 48 hours so delivery can start immediately.",
    },
    {
      q: "Do you offer white-label partnerships?",
      a: "Yes. Agencies partner with us for secure builds while retaining client ownership. NDAs and co-branded reporting are part of the package.",
    },
    {
      q: "How do you communicate progress?",
      a: "Clients receive weekly live reviews, async Loom walkthroughs, and shared dashboards covering backlog, burn, risks, and performance metrics.",
    },
    {
      q: "Can we scale the team mid-engagement?",
      a: "Absolutely. Our bench model lets you scale designers, engineers, and analysts up or down with two weeks notice without losing context.",
    },
  ];

  window.DATA = {
    org,
    seo,
    seoContent,
    navigation,
    socials,
    contact,
    forms,
    footer,
    billing,
    team,
    pricingGroups,
    pages,
    serviceCatalog,
    quoteCalculator,
    faqs,
  };
})();
