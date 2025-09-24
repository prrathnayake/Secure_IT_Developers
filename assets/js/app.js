/* Theme */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  if (themeToggle)
    themeToggle.setAttribute("aria-pressed", savedTheme === "dark");
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.setAttribute("aria-pressed", next === "dark");
  });
}

/* Cookie */
const cookieBanner = document.getElementById("cookieBanner");
const openCookie = document.getElementById("openCookie");
const consent = localStorage.getItem("cookieConsent");
function showCookie() {
  if (cookieBanner) cookieBanner.style.display = "flex";
}
function hideCookie() {
  if (cookieBanner) cookieBanner.style.display = "none";
}
if (!consent) showCookie();
if (openCookie) {
  openCookie.addEventListener("click", (e) => {
    e.preventDefault();
    showCookie();
  });
}
if (cookieBanner) {
  cookieBanner.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cookie]");
    if (!btn) return;
    localStorage.setItem("cookieConsent", btn.getAttribute("data-cookie"));
    hideCookie();
  });
}

/* Content hydration */
document.addEventListener("DOMContentLoaded", () => {
  if (!window.DATA) return;
  hydrateSite(window.DATA);
  initScrollReveal();
  initHeaderScrollEffect();
  initQuoteGenerator(window.DATA);
});

function hydrateSite(data) {
  const pageKey = document.body?.dataset?.page || "home";
  applyBranding(data);
  applyNavigation(data, pageKey);
  applyFooter(data);
  updateHeadMeta(data, pageKey);
  injectOrganizationSchema(data);
  renderPage(pageKey, data);
}

function applyBranding(data) {
  document
    .querySelectorAll("[data-bind='brandName']")
    .forEach((el) => (el.textContent = data.org?.name || ""));
  const taglineEl = document.querySelector("[data-bind='brandTagline']");
  if (taglineEl) taglineEl.textContent = data.org?.tagline || "";
}

function applyNavigation(data, pageKey) {
  const nav = document.getElementById("primaryNav");
  if (!nav) return;
  nav.innerHTML = "";
  (data.navigation || []).forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    const currentPath = pageKey === "home" ? "index.html" : `${pageKey}.html`;
    if (item.href === currentPath) {
      link.setAttribute("aria-current", "page");
    }
    nav.appendChild(link);
  });
}

function applyFooter(data) {
  const about = document.getElementById("footerAbout");
  if (about) about.textContent = data.footer?.about || "";

  const contactList = document.getElementById("footerContact");
  if (contactList) {
    contactList.innerHTML = "";
    if (data.org?.email) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="mailto:${data.org.email}">${data.org.email}</a>`;
      contactList.appendChild(li);
    }
    if (data.org?.phone) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${telHref(data.org.phone)}">${data.org.phone}</a>`;
      contactList.appendChild(li);
    }
    if (data.contact?.locationLabel) {
      const li = document.createElement("li");
      li.textContent = data.contact.locationLabel;
      contactList.appendChild(li);
    }
  }

  const social = document.getElementById("footerSocial");
  if (social) {
    social.innerHTML = "";
    (data.socials || []).forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.href}" aria-label="${item.aria || item.label}" target="_blank" rel="noopener">${item.label}</a>`;
      social.appendChild(li);
    });
  }

  const legal = document.getElementById("footerLegal");
  if (legal) {
    const year = new Date().getFullYear();
    const parts = [`© ${year} ${data.org?.name || ""}`];
    if (data.footer?.legalNote) parts.push(data.footer.legalNote);
    legal.textContent = parts.filter(Boolean).join(" • ");
  }
}

function updateHeadMeta(data, pageKey) {
  const meta = data.pages?.[pageKey]?.meta || {};
  const title = meta.title || data.org?.name || document.title;
  document.title = title;
  const description = meta.description || data.org?.description || "";
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);

  const canonical = document.querySelector("link[rel='canonical']");
  const url = buildUrl(meta.path || pageKey, data.org?.url);
  if (canonical && url) canonical.setAttribute("href", url);
  setMeta("property", "og:url", url);
}

function setMeta(attr, name, content) {
  const el = document.querySelector(`meta[${attr}='${name}']`);
  if (el && content) {
    el.setAttribute("content", content);
  }
}

function buildUrl(path, base) {
  try {
    if (!base) return path;
    return new URL(path || "", base).href;
  } catch (e) {
    return path;
  }
}

function telHref(value) {
  if (!value) return "";
  const cleaned = String(value).replace(/[^+\d]/g, "");
  return `tel:${cleaned}`;
}

function injectOrganizationSchema(data) {
  const script = document.getElementById("orgJsonLd") || document.createElement("script");
  script.type = "application/ld+json";
  script.id = "orgJsonLd";
  const org = data.org || {};
  const payload = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    legalName: org.legalName,
    url: org.url,
    logo: buildUrl(org.logo, org.url),
    description: org.description,
    sameAs: org.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: org.email,
        telephone: org.phone,
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    ],
  };
  if (org.location) {
    payload.address = {
      "@type": "PostalAddress",
      ...org.location,
    };
  }
  script.textContent = JSON.stringify(payload);
  if (!script.parentElement) document.head.appendChild(script);
}

function renderPage(pageKey, data) {
  switch (pageKey) {
    case "home":
      renderHomePage(data);
      break;
    case "about":
      renderAboutPage(data);
      break;
    case "pricing":
      renderPricingPage(data);
      break;
    case "contact":
      renderContactPage(data);
      break;
    case "checkout":
    case "payment":
    case "success":
    case "failed":
      renderMessagePage(pageKey, data);
      break;
    default:
      break;
  }
}

function renderHomePage(data) {
  const page = data.pages?.home;
  if (!page) return;
  const hero = page.hero || {};
  const heroEyebrow = document.getElementById("heroEyebrow");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroPrimary = document.getElementById("heroPrimary");
  const heroSecondary = document.getElementById("heroSecondary");
  if (heroEyebrow) heroEyebrow.textContent = hero.eyebrow || "";
  if (heroTitle) heroTitle.textContent = hero.title || "";
  if (heroSubtitle) heroSubtitle.textContent = hero.subtitle || "";
  if (heroPrimary) {
    heroPrimary.textContent = hero.primaryCta?.label || "";
    heroPrimary.href = hero.primaryCta?.href || "#";
  }
  if (heroSecondary) {
    heroSecondary.textContent = hero.secondaryCta?.label || "";
    heroSecondary.href = hero.secondaryCta?.href || "#";
  }

  const servicesHeading = document.getElementById("servicesHeading");
  if (servicesHeading) servicesHeading.textContent = page.services?.heading || "";
  const servicesCards = document.getElementById("servicesCards");
  if (servicesCards) {
    servicesCards.innerHTML = "";
    (page.services?.cards || []).forEach((card) => {
      const article = document.createElement("article");
      article.className = "card js-reveal";
      article.innerHTML = `<h3>${card.title}</h3><p>${card.description}</p>`;
      servicesCards.appendChild(article);
    });
  }

  const highlightsHeading = document.getElementById("highlightsHeading");
  if (highlightsHeading) highlightsHeading.textContent = page.highlights?.heading || "";
  const highlightsGrid = document.getElementById("highlightsGrid");
  if (highlightsGrid) {
    highlightsGrid.innerHTML = "";
    (page.highlights?.items || []).forEach((item) => {
      const fig = document.createElement("figure");
      fig.className = "shot js-reveal";
      fig.innerHTML = `
        <img src="${item.img}" alt="${item.alt}" />
        <figcaption>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </figcaption>
      `;
      highlightsGrid.appendChild(fig);
    });
  }

  const testimonialsHeading = document.getElementById("testimonialsHeading");
  if (testimonialsHeading)
    testimonialsHeading.textContent = page.testimonials?.heading || "";
  const testimonialList = document.getElementById("testimonialsList");
  if (testimonialList) {
    testimonialList.innerHTML = "";
    (page.testimonials?.items || []).forEach((item) => {
      const block = document.createElement("blockquote");
      block.className = "quote-card js-reveal";
      block.innerHTML = `“${item.quote}”<cite>— ${item.author}</cite>`;
      testimonialList.appendChild(block);
    });
  }

  renderTeamSpotlight(page.spotlight, data.team);

  renderFaqs(document.getElementById("faqsContainer"), data.faqs);

  const contactHeading = document.getElementById("homeContactHeading");
  if (contactHeading) contactHeading.textContent = page.contact?.heading || "";
  const contactPoints = document.getElementById("homeContactPoints");
  if (contactPoints) {
    contactPoints.innerHTML = "";
    (page.contact?.points || []).forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      contactPoints.appendChild(li);
    });
  }
  const contactCopy = document.getElementById("contactCopy");
  if (contactCopy) contactCopy.textContent = data.contact?.copy || "";
}

function renderTeamSpotlight(config = {}, team = []) {
  const heading = document.getElementById("teamSpotlightHeading");
  const copy = document.getElementById("teamSpotlightCopy");
  const card = document.getElementById("teamSpotlightCard");
  if (!card) return;
  if (heading) heading.textContent = config.heading || "";
  if (copy) copy.textContent = config.copy || "";

  card.innerHTML = "";
  const member =
    team.find((item) => item.id === config.memberId) || team.find(Boolean);
  if (!member) {
    card.innerHTML = "<p class=\"muted\">Team details coming soon.</p>";
    return;
  }

  const focus = (member.focus || [])
    .slice(0, 3)
    .map((item) => `<li>${item}</li>`)
    .join("");
  const testimonial = member.testimonial || "";
  const portfolio = member.portfolio || member.links?.[0]?.href || "#";
  card.innerHTML = `
    <header>
      <p class="eyebrow">${member.role}</p>
      <h3>${member.name}</h3>
      <p class="location">${member.location || ""}</p>
    </header>
    <p class="bio">${member.bio || ""}</p>
    <blockquote class="founder-quote">${testimonial}</blockquote>
    <h4>Common engagements</h4>
    <ul class="focus">${focus}</ul>
    <a class="btn" href="${portfolio}" target="_blank" rel="noopener">View portfolio</a>
  `;
}

function renderAboutPage(data) {
  const page = data.pages?.about;
  if (!page) return;
  const intro = document.getElementById("aboutIntro");
  if (intro) intro.textContent = page.intro || "";
  const mission = document.getElementById("aboutMission");
  if (mission) mission.textContent = page.mission || "";

  const approach = document.getElementById("aboutApproach");
  if (approach) {
    approach.innerHTML = "";
    (page.approach || []).forEach((step) => {
      const article = document.createElement("article");
      article.innerHTML = `<h3>${step.title}</h3><p>${step.detail}</p>`;
      approach.appendChild(article);
    });
  }

  const techList = document.getElementById("techList");
  if (techList) {
    techList.innerHTML = "";
    (page.techStack || []).forEach((tech) => {
      const li = document.createElement("li");
      li.textContent = tech;
      techList.appendChild(li);
    });
  }

  const valuesList = document.getElementById("valuesList");
  if (valuesList) {
    valuesList.innerHTML = "";
    (page.values || []).forEach((value) => {
      const li = document.createElement("li");
      li.textContent = value;
      valuesList.appendChild(li);
    });
  }

  const teamIntro = document.getElementById("teamIntro");
  if (teamIntro) teamIntro.textContent = page.teamIntro || "";

  const teamGrid = document.getElementById("teamGrid");
  if (teamGrid) {
    teamGrid.innerHTML = "";
    (data.team || []).forEach((member) => {
      const article = document.createElement("article");
      article.className = "team-card";
      const focus = (member.focus || [])
        .map((item) => `<li>${item}</li>`)
        .join("");
      const links = (member.links || [])
        .map(
          (link) =>
            `<li><a href="${link.href}" target="_blank" rel="noopener">${link.label}</a></li>`
        )
        .join("");
      article.innerHTML = `
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
        <p class="location">${member.location || ""}</p>
        <p>${member.bio || ""}</p>
        <h4>Focus areas</h4>
        <ul class="focus">${focus}</ul>
        <h4>Connect</h4>
        <ul class="social">${links}</ul>
      `;
      teamGrid.appendChild(article);
    });
  }
}

function renderPricingPage(data) {
  const intro = document.getElementById("pricingIntro");
  if (intro) intro.textContent = data.pages?.pricing?.intro || "";
}

function renderContactPage(data) {
  const intro = document.getElementById("contactIntro");
  if (intro) intro.textContent = data.pages?.contact?.intro || "";

  const metaHeading = document.getElementById("contactHeading");
  if (metaHeading) metaHeading.textContent = data.contact?.heading || "";

  const details = document.getElementById("contactDetails");
  if (details) {
    details.innerHTML = "";
    const list = [
      { label: "Email", value: data.org?.email, href: `mailto:${data.org?.email}` },
      { label: "Phone", value: data.org?.phone, href: telHref(data.org?.phone) },
      { label: "Location", value: data.contact?.locationLabel },
      { label: "Response time", value: data.contact?.responseTime },
    ];
    list
      .filter((item) => item.value)
      .forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = item.href
          ? `<strong>${item.label}:</strong> <a href="${item.href}">${item.value}</a>`
          : `<strong>${item.label}:</strong> ${item.value}`;
        details.appendChild(li);
      });
  }
}

function renderMessagePage(pageKey, data) {
  const page = data.pages?.[pageKey];
  if (!page) return;
  const heading = document.getElementById("messageHeading");
  if (heading) heading.textContent = page.heading || "";
  const body = document.getElementById("messageBody");
  if (body) body.textContent = page.body || page.message || "";
  const messageInfo = document.getElementById("messageInfo");
  if (messageInfo && page.message) messageInfo.textContent = page.message;
  const actions = document.getElementById("messageActions");
  if (actions) {
    actions.innerHTML = "";
    (page.actions || []).forEach((action) => {
      const a = document.createElement("a");
      a.className = "btn" + (action.variant === "ghost" ? " btn-ghost" : "");
      a.href = action.href || "#";
      a.textContent = action.label;
      actions.appendChild(a);
    });
  }
  const orderDetails = document.getElementById("orderDetails");
  if (orderDetails) {
    if (pageKey === "success") {
      const order = getLastOrder();
      if (order?.plan) {
        orderDetails.innerHTML = `
          <h3>Engagement summary</h3>
          <ul>
            <li><strong>Reference:</strong> ${order.reference}</li>
            <li><strong>Plan:</strong> ${order.plan.name}</li>
            <li><strong>Amount:</strong> ${formatCurrency(order.amount, order.currency)}</li>
            <li><strong>Client:</strong> ${order.name || "Pending"}</li>
            <li><strong>Email:</strong> ${order.email || "Pending"}</li>
          </ul>
          <p class="muted">We’ve emailed a detailed receipt and kickoff checklist.</p>
        `;
      } else {
        orderDetails.innerHTML =
          "<p class=\"muted\">Your receipt will be emailed shortly.</p>";
      }
    } else if (pageKey === "failed") {
      const plan = getSelectedPlan();
      if (plan) {
        orderDetails.innerHTML = `
          <h3>Selected plan</h3>
          <p><strong>${plan.name}</strong></p>
          <p>${formatCurrency(plan.price, plan.currency)}</p>
          <p class="muted">No charges were made. You can retry securely.</p>
        `;
      } else {
        orderDetails.innerHTML =
          "<p class=\"muted\">Choose a plan before retrying payment.</p>";
      }
    }
  }
}

function renderFaqs(container, faqs = []) {
  if (!container) return;
  container.innerHTML = "";
  faqs.forEach((item) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = item.q;
    const p = document.createElement("p");
    p.textContent = item.a;
    details.appendChild(summary);
    details.appendChild(p);
    container.appendChild(details);
  });
}

function initScrollReveal() {
  const revealables = document.querySelectorAll(".js-reveal");
  if (!revealables.length) return;
  if (!("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );
  revealables.forEach((el) => observer.observe(el));
}

function initHeaderScrollEffect() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* Contact forms demo */
function bindContact(formId, statusId) {
  const form = document.getElementById(formId),
    status = document.getElementById(statusId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (status) status.textContent = "Sending…";
    setTimeout(() => {
      if (status)
        status.textContent = "Thanks! We will get back to you soon.";
      form.reset();
    }, 700);
  });
}
bindContact("contactForm", "contactStatus");
bindContact("contactForm2", "contactStatus2");

function initQuoteGenerator(data) {
  const form = document.getElementById("quoteForm");
  const result = document.getElementById("quoteResult");
  if (!form || !result || !data) return;

  const render = (event) => {
    if (event) event.preventDefault();
    result.classList.remove("is-ready");
    if (!form.reportValidity()) return;
    const size = form.querySelector("input[name='projectSize']:checked")?.value;
    const input = {
      project: document.getElementById("quoteProject")?.value,
      timeline: document.getElementById("quoteTimeline")?.value,
      size,
      compliance: document.getElementById("quoteCompliance")?.value,
      support: document.getElementById("quoteSupport")?.value,
    };
    const recommendation = buildQuoteRecommendation(data, input);
    if (!recommendation) {
      result.innerHTML = "<p class=\"muted\">Select options to generate a quote.</p>";
      return;
    }
    const featureList = (recommendation.plan.features || [])
      .slice(0, 3)
      .map((item) => `<li>${item}</li>`)
      .join("");
    const adjustments = recommendation.adjustments
      .map((item) => `<li>${item}</li>`)
      .join("");
    result.innerHTML = `
      <div class="quote-output">
        <p class="eyebrow">Recommended: ${recommendation.groupLabel} – ${recommendation.plan.label}</p>
        <h3>${formatCurrency(
          recommendation.estimated,
          recommendation.plan.currency
        )}</h3>
        <p class="muted">Estimated investment (ex GST)</p>
        <ul class="quote-features">${featureList}</ul>
        <div class="quote-meta">
          <h4>Why this plan</h4>
          <ul>${adjustments}</ul>
        </div>
        <button
          type="button"
          class="btn"
          data-plan-id="${recommendation.planId}"
        >Save quote & continue</button>
      </div>
    `;
    result.classList.add("is-ready");
    const btn = result.querySelector("button[data-plan-id]");
    if (btn) {
      btn.addEventListener("click", () => {
        savePlanSelection({
          id: recommendation.planId,
          groupId: recommendation.groupId,
          name: `${recommendation.groupLabel} – ${recommendation.plan.label}`,
          price: recommendation.plan.price,
          currency: recommendation.plan.currency,
        });
        window.location.href = "checkout.html";
      });
    }
  };

  form.addEventListener("submit", render);
}

function buildQuoteRecommendation(data, input = {}) {
  if (!input.project || !input.size) return null;
  const groups = data.pricingGroups || [];
  const group = groups.find((item) => item.id === input.project);
  if (!group) return null;
  const sizeWeight = { small: 0, medium: 1, large: 2 };
  let index = sizeWeight[input.size] ?? 0;
  if (input.timeline === "accelerated") index += 0.2;
  if (input.timeline === "rush") index += 0.7;
  if (input.compliance === "regulated") index += 0.3;
  if (input.compliance === "critical") index += 0.8;
  index = Math.min(group.plans.length - 1, Math.round(index));
  const plan = group.plans[index];
  if (!plan) return null;
  let estimated = Number(plan.price);
  const adjustments = [];
  switch (input.timeline) {
    case "accelerated":
      estimated *= 1.1;
      adjustments.push("Accelerated timeline adds ~10% for parallel sprints.");
      break;
    case "rush":
      estimated *= 1.25;
      adjustments.push("Rush delivery adds ~25% to cover extended coverage.");
      break;
    default:
      adjustments.push("Standard timeline keeps delivery within 6–10 weeks.");
  }
  if (input.compliance === "regulated") {
    estimated *= 1.12;
    adjustments.push("Regulated compliance adds security review buffers.");
  } else if (input.compliance === "critical") {
    estimated *= 1.22;
    adjustments.push("Mission-critical compliance adds advanced audits.");
  } else {
    adjustments.push("General best practices baked into every build.");
  }
  const supportRate = Number(input.support || 0);
  if (supportRate > 0) {
    estimated *= 1 + supportRate;
    adjustments.push(
      `Includes ongoing optimisation retainer (${Math.round(
        supportRate * 100
      )}% uplift).`
    );
  } else {
    adjustments.push("No ongoing optimisation selected.");
  }
  return {
    plan,
    estimated: Math.round(estimated),
    adjustments,
    groupLabel: group.label,
    groupId: group.id,
    planId: `${group.id}-${plan.id}`,
  };
}

function savePlanSelection(plan) {
  if (!plan) return;
  const payload = {
    id: plan.id,
    groupId: plan.groupId,
    name: plan.name,
    price: Number(plan.price),
    currency: plan.currency || "AUD",
    time: new Date().toISOString(),
  };
  localStorage.setItem("selectedPlan", JSON.stringify(payload));
}

function getSelectedPlan() {
  try {
    return JSON.parse(localStorage.getItem("selectedPlan") || "null");
  } catch (e) {
    return null;
  }
}

function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem("lastOrder") || "null");
  } catch (e) {
    return null;
  }
}

/* Pricing render + tabs */
(function initPricing() {
  const subnav = document.getElementById("pricingSubnav");
  const tabs = document.getElementById("pricingTabs");
  if (!subnav || !tabs || !window.DATA) return;

  subnav.innerHTML = "";
  tabs.innerHTML = "";

  window.DATA.pricingGroups.forEach((g, idx) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (idx === 0 ? " active" : "");
    chip.textContent = g.label;
    chip.setAttribute("data-tab", g.id);
    chip.addEventListener("click", () => selectTab(g.id));
    subnav.appendChild(chip);

    const sec = document.createElement("section");
    sec.className = "grid-3 tab";
    sec.id = `tab-${g.id}`;
    if (idx !== 0) sec.style.display = "none";

    g.plans.forEach((p) => {
      const card = document.createElement("article");
      card.className = "price-card js-reveal";
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${g.label} ${p.label} plan`);
      const ul = p.features.map((f) => `<li>${f}</li>`).join("");
      card.innerHTML = `
        <h3>${p.label}</h3>
        <p class="price">${formatCurrency(p.price, p.currency)}</p>
        <ul class="features">${ul}</ul>
        <button class="btn select-plan" data-plan="${g.id}-${p.id}">Select</button>
      `;
      card.querySelector(".select-plan").addEventListener("click", () => {
        savePlanSelection({
          id: `${g.id}-${p.id}`,
          groupId: g.id,
          name: `${g.label} – ${p.label}`,
          price: Number(p.price),
          currency: p.currency,
        });
        window.location.href = "checkout.html";
      });
      sec.appendChild(card);
    });
    tabs.appendChild(sec);
  });

  const offers = [];
  window.DATA.pricingGroups.forEach((g) =>
    g.plans.forEach((p) => {
      offers.push({
        "@type": "Offer",
        name: `${g.label} – ${p.label}`,
        price: p.price,
        priceCurrency: p.currency || "AUD",
        category: g.label,
        availability: "https://schema.org/InStock",
      });
    })
  );
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: offers,
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.body.appendChild(script);

  const saved =
    localStorage.getItem("pricingTab") ||
    window.DATA.pricingGroups[0]?.id ||
    "starter";
  selectTab(saved);

  function selectTab(id) {
    document
      .querySelectorAll("#pricingSubnav .chip")
      .forEach((c) => c.classList.toggle("active", c.dataset.tab === id));
    document.querySelectorAll("#pricingTabs > .tab").forEach((s) => {
      s.style.display = s.id === `tab-${id}` ? "grid" : "none";
    });
    localStorage.setItem("pricingTab", id);
  }
})();

function formatCurrency(value, currency = "AUD") {
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (e) {
    return `A$${Number(value).toLocaleString()}`;
  }
}

function luhnCheck(value) {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 12) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
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

function parseExpiry(value = "") {
  const match = String(value)
    .trim()
    .match(/^(\d{1,2})\s*\/?\s*(\d{2})$/);
  if (!match) return { valid: false };
  let [_, mm, yy] = match;
  const month = Number(mm);
  if (month < 1 || month > 12) return { valid: false };
  const year = Number(yy);
  const fullYear = 2000 + year;
  const now = new Date();
  const expiryDate = new Date(fullYear, month);
  const valid = expiryDate > now;
  return { valid };
}

function generateReference() {
  const random = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `SIT-${random}${Date.now().toString().slice(-4)}`;
}

/* Checkout summary */
(function fillCheckout() {
  const orderSummary = document.getElementById("orderSummary");
  if (!orderSummary) return;
  const plan = getSelectedPlan();
  if (!plan) {
    orderSummary.innerHTML =
      '<p>No plan selected. <a href="pricing.html">Choose a plan</a>.</p>';
  } else {
    orderSummary.innerHTML = `
      <h2>Order summary</h2>
      <p><strong>Plan:</strong> ${plan.name}</p>
      <p><strong>Price:</strong> ${formatCurrency(plan.price, plan.currency)}</p>
      <p class="muted">Selected at: ${new Date(plan.time).toLocaleString()}</p>
    `;
  }
})();

/* Payment simulation */
(function payment() {
  const mini = document.getElementById("miniSummary");
  const plan = getSelectedPlan();
  if (mini && plan) {
    mini.textContent = `${plan.name} — ${formatCurrency(
      plan.price,
      plan.currency
    )}`;
  }

  const form = document.getElementById("paymentForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("payStatus");
    const currentPlan = getSelectedPlan();
    if (!currentPlan) {
      if (status)
        status.textContent =
          "Please choose a plan before completing your payment.";
      setTimeout(() => {
        window.location.href = "pricing.html";
      }, 1200);
      return;
    }
    if (!form.reportValidity()) {
      if (status) status.textContent = "Please complete the required fields.";
      return;
    }
    const cardNumber = document.getElementById("card")?.value.replace(/\s+/g, "");
    if (!luhnCheck(cardNumber)) {
      if (status) status.textContent = "Enter a valid card number.";
      return;
    }
    const expValue = document.getElementById("exp")?.value;
    const exp = parseExpiry(expValue);
    if (!exp.valid) {
      if (status)
        status.textContent = "Expiry date must be in MM/YY format and in the future.";
      return;
    }
    const cvc = document.getElementById("cvc")?.value.trim();
    if (!/^\d{3,4}$/.test(cvc || "")) {
      if (status) status.textContent = "Enter a valid CVC.";
      return;
    }
    const button = form.querySelector("button[type='submit']");
    if (status) status.textContent = "Processing secure payment…";
    if (button) button.setAttribute("disabled", "disabled");
    setTimeout(() => {
      const order = {
        reference: generateReference(),
        plan: currentPlan,
        amount: Number(currentPlan.price),
        currency: currentPlan.currency || "AUD",
        name: document.getElementById("fullname")?.value.trim(),
        email: document.getElementById("emailPay")?.value.trim(),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      if (button) button.removeAttribute("disabled");
      window.location.href = "success.html";
    }, 900);
  });
})();
