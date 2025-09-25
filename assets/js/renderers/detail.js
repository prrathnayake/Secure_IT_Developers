import { byId, formatCurrency } from "../core/utils.js";
import { savePlanSelection } from "../core/storage.js";

export function renderDetailPage(data) {
  const container = byId("detailContent");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const id = params.get("id");
  const eyebrow = byId("detailEyebrow");
  const heading = byId("detailHeading");
  const summary = byId("detailSummary");
  const meta = byId("detailMeta");
  const recommended = byId("detailRecommended");

  const resetMeta = () => {
    if (meta) meta.innerHTML = "";
    if (recommended) recommended.innerHTML = "";
  };

  const showFallback = (message) => {
    if (eyebrow) eyebrow.textContent = "";
    if (heading) heading.textContent = "Details coming soon";
    if (summary) summary.textContent = "";
    resetMeta();
    container.innerHTML = `<p class="muted">${message}</p>`;
  };

  if (!type || !id) {
    showFallback("We couldn't find the information you were looking for.");
    return;
  }

  resetMeta();
  container.innerHTML = "";
  if (recommended) recommended.innerHTML = "";

  const serviceCatalog = data.serviceCatalog || [];

  if (type === "plan") {
    const [groupId, planId] = id.split("-");
    const group = (data.pricingGroups || []).find((item) => item.id === groupId);
    const plan = group?.plans?.find((item) => item.id === planId);
    if (!group || !plan) {
      showFallback("That plan isn't available right now. Please choose another engagement.");
      return;
    }

    if (eyebrow) eyebrow.textContent = group.label || "Plan detail";
    if (heading) heading.textContent = `${plan.label} engagement`;
    if (summary) summary.textContent = plan.summary || "";
    if (meta) {
      if (group.tagline) {
        const focus = document.createElement("span");
        focus.innerHTML = `<strong>Focus:</strong> ${group.tagline}`;
        meta.appendChild(focus);
      }
      const priceMeta = document.createElement("span");
      priceMeta.innerHTML = `<strong>Investment:</strong> ${formatCurrency(
        plan.price,
        plan.currency
      )}`;
      meta.appendChild(priceMeta);
    }

    const article = document.createElement("article");
    article.className = "detail-card detail-card--plan";
    const header = document.createElement("header");
    header.innerHTML = `
      <p class="eyebrow">${group.tagline || group.label || ""}</p>
      <h2>${group.label} – ${plan.label}</h2>
      <span class="detail-price">${formatCurrency(plan.price, plan.currency)}</span>
    `;
    article.appendChild(header);

    if (plan.summary) {
      const p = document.createElement("p");
      p.textContent = plan.summary;
      article.appendChild(p);
    }

    if ((plan.features || []).length) {
      const h3 = document.createElement("h3");
      h3.textContent = "What's included";
      article.appendChild(h3);
      const ul = document.createElement("ul");
      (plan.features || []).forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        ul.appendChild(li);
      });
      article.appendChild(ul);
    }

    const actions = document.createElement("div");
    actions.className = "detail-actions";
    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.className = "btn";
    selectButton.textContent = "Select this plan";
    selectButton.addEventListener("click", () => {
      savePlanSelection({
        id: `${group.id}-${plan.id}`,
        groupId: group.id,
        name: `${group.label} – ${plan.label}`,
        price: Number(plan.price),
        currency: plan.currency,
      });
      localStorage.setItem(
        "selectedServices",
        JSON.stringify(plan.recommendedServices || [])
      );
      window.location.href = "checkout.html";
    });
    actions.appendChild(selectButton);
    const backLink = document.createElement("a");
    backLink.className = "detail-link";
    backLink.href = "pricing.html#pricingSubnav";
    backLink.textContent = "Back to pricing overview";
    actions.appendChild(backLink);
    article.appendChild(actions);
    container.appendChild(article);

    if (recommended && (plan.recommendedServices || []).length) {
      const headingEl = document.createElement("h2");
      headingEl.textContent = "Suggested services to pair with this plan";
      recommended.appendChild(headingEl);
      const grid = document.createElement("div");
      grid.className = "detail-grid";
      (plan.recommendedServices || []).forEach((serviceId) => {
        const service = serviceCatalog.find((item) => item.id === serviceId);
        if (!service) return;
        grid.appendChild(createServiceCard(service));
      });
      recommended.appendChild(grid);
    }

    return;
  }

  if (type === "service") {
    const service = serviceCatalog.find((item) => item.id === id);
    if (!service) {
      showFallback("That service isn't configured yet. Please choose another option.");
      return;
    }
    if (eyebrow) eyebrow.textContent = service.category || "Service detail";
    if (heading) heading.textContent = service.title || "Service";
    if (summary) summary.textContent = service.description || "";
    if (meta) {
      if (service.priceLabel) {
        const price = document.createElement("span");
        price.innerHTML = `<strong>Investment:</strong> ${service.priceLabel}`;
        meta.appendChild(price);
      }
      const cadence = document.createElement("span");
      cadence.innerHTML = `<strong>Discipline:</strong> ${service.category || "Consulting"}`;
      meta.appendChild(cadence);
    }

    container.appendChild(createServiceCard(service, { includeLink: false }));

    const relatedPlans = [];
    (data.pricingGroups || []).forEach((group) => {
      (group.plans || []).forEach((plan) => {
        if ((plan.recommendedServices || []).includes(service.id)) {
          relatedPlans.push({ group, plan });
        }
      });
    });

    if (recommended && relatedPlans.length) {
      const headingEl = document.createElement("h2");
      headingEl.textContent = "Included in these packaged engagements";
      recommended.appendChild(headingEl);
      const list = document.createElement("ul");
      list.className = "focus";
      relatedPlans.forEach(({ group, plan }) => {
        const li = document.createElement("li");
        li.innerHTML = `<a class="detail-link" href="detail.html?type=plan&id=${group.id}-${plan.id}">${group.label} – ${plan.label}</a>`;
        list.appendChild(li);
      });
      recommended.appendChild(list);
    }
    return;
  }

  showFallback("We couldn't determine which detail to show. Please try again.");

  function createServiceCard(service, options = {}) {
    const { includeLink = true } = options;
    const card = document.createElement("article");
    card.className = "detail-card detail-card--service";
    const header = document.createElement("header");
    header.innerHTML = `
      <p class="eyebrow">${service.category || "Service"}</p>
      <h3>${service.title}</h3>
      ${
        service.priceLabel
          ? `<span class="detail-price">${service.priceLabel}</span>`
          : ""
      }
    `;
    card.appendChild(header);
    if (service.description) {
      const p = document.createElement("p");
      p.textContent = service.description;
      card.appendChild(p);
    }
    if ((service.benefits || []).length) {
      const h4 = document.createElement("h4");
      h4.textContent = "How it helps";
      card.appendChild(h4);
      const ul = document.createElement("ul");
      (service.benefits || []).forEach((benefit) => {
        const li = document.createElement("li");
        li.textContent = benefit;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }
    if (includeLink) {
      const link = document.createElement("a");
      link.className = "detail-link";
      link.href = `detail.html?type=service&id=${service.id}`;
      link.textContent = "Service details";
      card.appendChild(link);
    }
    return card;
  }
}
