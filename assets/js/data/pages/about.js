import { seoContent } from "../site/seo.js";

export const aboutPage = {
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
      "Cyberion began as Pasan's consultancy helping regulated startups ship faster without sacrificing compliance. Today we operate as an embedded product partner for founders that need security, design, and growth thinking in one squad.",
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
      alt: "Cyberion team workshop",
      caption: "Weekly roadmap and security review inside the Cyberion studio.",
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
    "Cyberion is founder-led, giving you direct access to senior engineering leadership on every engagement.",
};
