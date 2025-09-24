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
      article.className = "card";
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
      fig.className = "shot";
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
      block.innerHTML = `“${item.quote}”<cite>— ${item.author}</cite>`;
      testimonialList.appendChild(block);
    });
  }

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
      card.className = "price-card";
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${g.label} ${p.label} plan`);
      const ul = p.features.map((f) => `<li>${f}</li>`).join("");
      card.innerHTML = `
        <h3>${p.label}</h3>
        <p class="price">${formatCurrency(p.price, p.currency)}</p>
        <ul class="features">${ul}</ul>
        <button class="btn select-plan" data-plan="${g.id}-${p.id}" data-name="${g.label} – ${p.label}" data-price="${p.price}">Select</button>
      `;
      card.querySelector(".select-plan").addEventListener("click", () => {
        const plan = {
          id: `${g.id}-${p.id}`,
          name: `${g.label} – ${p.label}`,
          price: Number(p.price),
          time: new Date().toISOString(),
        };
        localStorage.setItem("selectedPlan", JSON.stringify(plan));
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

/* Checkout summary */
(function fillCheckout() {
  const orderSummary = document.getElementById("orderSummary");
  if (!orderSummary) return;
  const plan = JSON.parse(localStorage.getItem("selectedPlan") || "null");
  if (!plan) {
    orderSummary.innerHTML =
      '<p>No plan selected. <a href="pricing.html">Choose a plan</a>.</p>';
  } else {
    orderSummary.innerHTML = `
      <h2>Order summary</h2>
      <p><strong>Plan:</strong> ${plan.name}</p>
      <p><strong>Price:</strong> ${formatCurrency(plan.price)}</p>
      <p class="muted">Selected at: ${new Date(plan.time).toLocaleString()}</p>
    `;
  }
})();

/* Payment simulation */
(function payment() {
  const mini = document.getElementById("miniSummary");
  const plan = JSON.parse(localStorage.getItem("selectedPlan") || "null");
  if (mini && plan) {
    mini.textContent = `${plan.name} — ${formatCurrency(plan.price)}`;
  }

  const form = document.getElementById("paymentForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const status = document.getElementById("payStatus");
    if (status) status.textContent = "Processing…";
    setTimeout(() => {
      const ok = Math.random() > 0.15;
      window.location.href = ok ? "success.html" : "failed.html";
    }, 900);
  });
})();
