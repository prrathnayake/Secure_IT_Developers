import { byId, formatCurrency } from "../core/utils.js";
import { savePlanSelection } from "../core/storage.js";
import { renderOtherServices } from "./shared.js";

export function renderPricingPage(data) {
  const page = data.pages?.pricing;
  if (!page) return;
  const intro = byId("pricingIntro");
  if (intro) intro.textContent = page.intro || "";

  const addOns = page.addOns || {};
  const addOnsEyebrow = byId("pricingAddOnsEyebrow");
  if (addOnsEyebrow) addOnsEyebrow.textContent = addOns.eyebrow || "";
  const addOnsHeading = byId("pricingAddOnsHeading");
  if (addOnsHeading) addOnsHeading.textContent = addOns.heading || "";
  const addOnsCopy = byId("pricingAddOnsCopy");
  if (addOnsCopy) addOnsCopy.textContent = addOns.copy || "";
  const addOnsCards = byId("pricingAddOnsCards");
  if (addOnsCards) {
    addOnsCards.innerHTML = "";
    (addOns.cards || []).forEach((card) => {
      const article = document.createElement("article");
      article.className = "add-on-card js-reveal";
      const list = (card.highlights || [])
        .map((item) => `<li>${item}</li>`)
        .join("");
      article.innerHTML = `
        <h3>${card.title}</h3>
        <p class="price">${card.price || ""}</p>
        <p>${card.description || ""}</p>
        <ul>${list}</ul>
      `;
      addOnsCards.appendChild(article);
    });
  }

  const compareHeading = byId("compareHeading");
  if (compareHeading) compareHeading.textContent = page.compare?.heading || "";
  const compareCopy = byId("compareCopy");
  if (compareCopy) compareCopy.textContent = page.compare?.copy || "";

  const deepDive = page.deepDive || {};
  const deepDiveEyebrow = byId("pricingDeepDiveEyebrow");
  if (deepDiveEyebrow) deepDiveEyebrow.textContent = deepDive.eyebrow || "";
  const deepDiveHeading = byId("pricingDeepDiveHeading");
  if (deepDiveHeading) deepDiveHeading.textContent = deepDive.heading || "";
  const deepDiveCopy = byId("pricingDeepDiveCopy");
  if (deepDiveCopy) deepDiveCopy.textContent = deepDive.copy || "";
  const deepDivePanels = byId("pricingDeepDivePanels");
  const deepDiveLinkLabel = deepDive.linkLabel || "View service details";

  const subnav = byId("pricingSubnav");
  const tabs = byId("pricingTabs");
  if (!subnav || !tabs) return;
  subnav.innerHTML = "";
  tabs.innerHTML = "";
  if (deepDivePanels) deepDivePanels.innerHTML = "";

  const serviceCatalog = data.serviceCatalog || [];
  (data.pricingGroups || []).forEach((group, index) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (index === 0 ? " active" : "");
    chip.textContent = group.label;
    chip.setAttribute("data-tab", group.id);
    chip.setAttribute("type", "button");
    chip.addEventListener("click", () => selectTab(group.id));
    subnav.appendChild(chip);

    const section = document.createElement("section");
    section.className = "grid-3 tab";
    section.id = `tab-${group.id}`;
    if (index !== 0) section.hidden = true;

    (group.plans || []).forEach((plan) => {
      const card = document.createElement("article");
      card.className = "price-card js-reveal";
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${group.label} ${plan.label} plan`);
      const features = (plan.features || []).map((feature) => `<li>${feature}</li>`).join("");
      const ctaLabel = plan.ctaLabel || "Select";
      const summary = plan.summary ? `<p>${plan.summary}</p>` : "";
      card.innerHTML = `
        <header>
          <p class="eyebrow">${group.tagline || ""}</p>
          <h3>${plan.label}</h3>
          <p class="price">${formatCurrency(plan.price, plan.currency)}</p>
        </header>
        ${summary}
        <ul class="features">${features}</ul>
        <div class="card-actions">
          <button class="btn select-plan" data-plan="${group.id}-${plan.id}">${ctaLabel}</button>
          <a class="plan-link" href="detail.html?type=plan&id=${group.id}-${plan.id}">Plan details</a>
        </div>
      `;
      card.querySelector(".select-plan").addEventListener("click", () => {
        savePlanSelection({
          id: `${group.id}-${plan.id}`,
          groupId: group.id,
          name: `${group.label} – ${plan.label}`,
          price: Number(plan.price),
          currency: plan.currency,
        });
        localStorage.setItem("selectedServices", JSON.stringify(plan.recommendedServices || []));
        window.location.href = "checkout.html";
      });
      section.appendChild(card);
    });

    tabs.appendChild(section);

    if (deepDivePanels) {
      const panel = document.createElement("section");
      panel.className = "tab-detail";
      panel.id = `detail-${group.id}`;
      if (index !== 0) panel.hidden = true;
      const recommendedIds = new Set();
      (group.plans || []).forEach((plan) => {
        (plan.recommendedServices || []).forEach((serviceId) =>
          recommendedIds.add(serviceId)
        );
      });
      if (!recommendedIds.size) {
        panel.innerHTML = `<p class="muted">${
          deepDive.empty || "Service recommendations coming soon."
        }</p>`;
      } else {
        const grid = document.createElement("div");
        grid.className = "detail-grid";
        recommendedIds.forEach((serviceId) => {
          const service = serviceCatalog.find((item) => item.id === serviceId);
          if (!service) return;
          const card = document.createElement("article");
          card.className = "detail-card";
          const benefits = (service.benefits || [])
            .map((benefit) => `<li>${benefit}</li>`)
            .join("");
          card.innerHTML = `
            <header>
              <p class="eyebrow">${service.category || ""}</p>
              <h3>${service.title}</h3>
              ${
                service.priceLabel
                  ? `<span class="detail-price">${service.priceLabel}</span>`
                  : ""
              }
            </header>
            <p>${service.description || ""}</p>
            ${benefits ? `<ul>${benefits}</ul>` : ""}
            <a class="detail-link" href="detail.html?type=service&id=${service.id}">${deepDiveLinkLabel}</a>
          `;
          grid.appendChild(card);
        });
        panel.appendChild(grid);
      }
      deepDivePanels.appendChild(panel);
    }
  });

  const additional = byId("additionalServices");
  if (additional) {
    renderOtherServices(additional, data.serviceCatalog || [], {
      showCtas: true,
      linkLabel: deepDiveLinkLabel,
    });
  }

  const standalone = page.standalone || {};
  const standaloneEyebrow = byId("standaloneEyebrow");
  if (standaloneEyebrow) standaloneEyebrow.textContent = standalone.eyebrow || "";
  const standaloneHeading = byId("standaloneHeading");
  if (standaloneHeading) standaloneHeading.textContent = standalone.heading || "";
  const standaloneCopy = byId("standaloneCopy");
  if (standaloneCopy) standaloneCopy.textContent = standalone.copy || "";
  const standaloneNote = byId("standaloneNote");
  if (standaloneNote) standaloneNote.textContent = standalone.note || "";

  const saved =
    localStorage.getItem("pricingTab") ||
    data.pricingGroups?.[0]?.id ||
    "starter";
  selectTab(saved);

  function selectTab(id) {
    document
      .querySelectorAll("#pricingSubnav .chip")
      .forEach((chip) => {
        const isActive = chip.dataset.tab === id;
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", String(isActive));
      });
    document.querySelectorAll("#pricingTabs > .tab").forEach((section) => {
      section.hidden = section.id !== `tab-${id}`;
    });
    if (deepDivePanels) {
      document
        .querySelectorAll("#pricingDeepDivePanels > .tab-detail")
        .forEach((panel) => {
          panel.hidden = panel.id !== `detail-${id}`;
        });
    }
    localStorage.setItem("pricingTab", id);
  }
}

export function renderCompareTable(data) {
  const compare = data.pages?.pricing?.compare;
  const nav = byId("compareNav");
  const table = byId("compareTable");
  if (!compare || !nav || !table) return;
  nav.innerHTML = "";
  table.innerHTML = "";
  const categories = compare.categories || [];
  if (!categories.length) {
    table.innerHTML = "<p class=\"muted\">Compare data will appear here once configured.</p>";
    return;
  }
  let activeId = window.ENV?.compareDefaultCategory || categories[0]?.id;
  const setActive = (id) => {
    activeId = id;
    Array.from(nav.children).forEach((btn) => {
      const isActive = btn.getAttribute("data-id") === id;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    const category = categories.find((item) => item.id === id) || categories[0];
    if (!category) return;
    table.innerHTML = "";
    const summary = document.createElement("p");
    summary.className = "compare-summary";
    summary.textContent = category.summary || "";
    table.appendChild(summary);
    const grid = document.createElement("div");
    grid.className = "compare-grid";
    const header = document.createElement("div");
    header.className = "compare-row compare-row--header";
    header.innerHTML =
      '<span class="compare-label">Criteria</span>' +
      (category.columns || [])
        .map((column) => {
          const plan = findPlanDetails(data, column.planId);
          const price = plan ? formatCurrency(plan.price, plan.currency) : "";
          return `<span><strong>${column.label}</strong><em>${price}</em></span>`;
        })
        .join("");
    grid.appendChild(header);
    (category.rows || []).forEach((row) => {
      const div = document.createElement("div");
      div.className = "compare-row";
      const label = document.createElement("span");
      label.className = "compare-label";
      label.textContent = row.label;
      div.appendChild(label);
      (row.values || []).forEach((value) => {
        const span = document.createElement("span");
        span.textContent = value;
        div.appendChild(span);
      });
      grid.appendChild(div);
    });
    table.appendChild(grid);
  };
  categories.forEach((category, index) => {
    const btn = document.createElement("button");
    btn.className = "compare-tab" + (category.id === activeId ? " active" : "");
    btn.textContent = category.label;
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "tab");
    btn.setAttribute("data-id", category.id);
    btn.setAttribute("aria-selected", category.id === activeId);
    btn.addEventListener("click", () => setActive(category.id));
    nav.appendChild(btn);
    if (index === 0 && !activeId) activeId = category.id;
  });
  setActive(activeId);
}

function findPlanDetails(data, compositeId) {
  if (!compositeId) return null;
  const [groupId, planId] = compositeId.split("-");
  if (!groupId || !planId) return null;
  const group = (data.pricingGroups || []).find((item) => item.id === groupId);
  if (!group) return null;
  const plan = (group.plans || []).find((item) => item.id === planId);
  if (!plan) return null;
  return {
    id: plan.id,
    label: plan.label,
    price: plan.price,
    currency: plan.currency,
    groupLabel: group.label,
  };
}
