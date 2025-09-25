import { byId, formatCurrency } from "../core/utils.js";
import { getSelectedPlan } from "../core/storage.js";
import { renderOtherServices } from "./shared.js";

export function renderCheckoutPage(data) {
  const plan = getSelectedPlan();
  const info = byId("messageInfo");
  if (info && !plan) {
    info.textContent = "No plan selected. Please choose a package from pricing.";
  }
  const summaryTarget = byId("orderSummary");
  if (summaryTarget) {
    if (!plan) {
      summaryTarget.innerHTML =
        '<p>No plan selected. <a href="pricing.html">Choose a plan</a>.</p>';
    } else {
      summaryTarget.innerHTML = `
        <h2>${plan.name}</h2>
        <p class="price">${formatCurrency(plan.price, plan.currency)}</p>
        <p class="muted">Selected at ${new Date(plan.time).toLocaleString()}</p>
      `;
    }
  }

  const relatedTarget = byId("relatedServices");
  const relatedSection = document.querySelector(".related-services");
  if (relatedSection) {
    relatedSection.hidden = !plan;
  }
  if (relatedTarget) {
    const planServices = JSON.parse(localStorage.getItem("selectedServices") || "[]");
    const services = (data.serviceCatalog || []).filter((service) =>
      !planServices.length ? true : planServices.includes(service.id)
    );
    if (!services.length) {
      relatedTarget.innerHTML = "<p class=\"muted\">Browse our standalone services to add specialist support.</p>";
    } else {
      renderOtherServices(relatedTarget, services);
    }
  }
}
