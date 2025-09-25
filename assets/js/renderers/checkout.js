import { byId, formatCurrency } from "../core/utils.js";
import {
  getSelectedPlan,
  getSelectedServices,
  setSelectedServices,
  toggleSelectedService,
} from "../core/storage.js";
import { renderOtherServices } from "./shared.js";

export function renderCheckoutPage(data) {
  const plan = getSelectedPlan();
  const info = byId("messageInfo");
  if (info) {
    info.textContent = plan
      ? data.pages?.checkout?.message || ""
      : "No plan selected. Please choose a package from pricing.";
  }
  const summaryTarget = byId("orderSummary");
  const servicesCatalog = data.serviceCatalog || [];
  let selectedServiceIds = getSelectedServices();
  const validSelected = selectedServiceIds.filter((id) =>
    servicesCatalog.some((service) => service.id === id)
  );
  if (validSelected.length !== selectedServiceIds.length) {
    selectedServiceIds = setSelectedServices(validSelected);
  }

  const updateSummary = () => {
    if (!summaryTarget) return;
    if (!plan) {
      summaryTarget.innerHTML =
        '<p>No plan selected. <a href="pricing.html">Choose a plan</a>.</p>';
      return;
    }
    const selectedDetails = selectedServiceIds
      .map((id) => servicesCatalog.find((service) => service.id === id))
      .filter(Boolean);
    const addons = selectedDetails.length
      ? `<div class="order-addons order-addons--list"><h3>Added services</h3><ul>${selectedDetails
          .map((service) => {
            const priceLabel = service.priceLabel
              ? `<span>${service.priceLabel}</span>`
              : "";
            return `<li><strong>${service.title}</strong>${priceLabel}</li>`;
          })
          .join("")}</ul></div>`
      : '<p class="order-addons order-addons--empty muted">No extra services selected yet. Add services below to include them in your quote.</p>';
    summaryTarget.innerHTML = `
      <h2>${plan.name}</h2>
      <p class="price">${formatCurrency(plan.price, plan.currency)}</p>
      <p class="muted">Selected at ${new Date(plan.time).toLocaleString()}</p>
      ${addons}
    `;
  };

  updateSummary();

  const relatedTarget = byId("relatedServices");
  const relatedSection = document.querySelector(".related-services");
  if (relatedSection) {
    relatedSection.hidden = !plan;
    const heading = relatedSection.querySelector("h2");
    if (heading && plan) heading.textContent = "Add services to your quote";
  }

  const renderServices = () => {
    if (!relatedTarget) return;
    if (!plan) {
      relatedTarget.innerHTML =
        '<p class="muted">Select a package to see available add-on services.</p>';
      return;
    }
    if (!servicesCatalog.length) {
      relatedTarget.innerHTML =
        '<p class="muted">Additional services will appear here once configured.</p>';
      return;
    }
    const recommendedSet = new Set(plan.recommendedServices || []);
    const sorted = [...servicesCatalog].sort((a, b) => {
      const aRecommended = recommendedSet.has(a.id) ? 0 : 1;
      const bRecommended = recommendedSet.has(b.id) ? 0 : 1;
      if (aRecommended !== bRecommended) return aRecommended - bRecommended;
      return a.title.localeCompare(b.title);
    });
    renderOtherServices(relatedTarget, sorted, {
      selectable: true,
      selectedIds: selectedServiceIds,
      recommendedIds: recommendedSet,
      detailLink: true,
      linkLabel: "View service details",
      onToggle: (serviceId) => {
        selectedServiceIds = toggleSelectedService(serviceId);
        updateSummary();
        renderServices();
      },
    });
  };

  renderServices();

}
