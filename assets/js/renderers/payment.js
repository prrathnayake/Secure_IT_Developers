import {
  byId,
  formatCurrency,
  luhnCheck,
  parseExpiry,
  generateReference,
} from "../core/utils.js";
import {
  getSelectedPlan,
  getSelectedServices,
  storeLastOrder,
} from "../core/storage.js";
import { logCustomerEvent } from "../core/audit.js";

export function renderPaymentPage(data) {
  const servicesCatalog = data?.serviceCatalog || [];
  const summaryTarget = byId("paymentSummary");
  const mini = byId("miniSummary");
  const plan = getSelectedPlan();
  const selectedServiceIds = getSelectedServices();

  const selectedServices = () =>
    selectedServiceIds
      .map((id) => servicesCatalog.find((service) => service.id === id))
      .filter(Boolean);

  const renderSummary = () => {
    if (!summaryTarget) return;
    if (!plan) {
      summaryTarget.innerHTML =
        '<p class="muted">No plan selected yet. <a href="pricing.html">Choose a package</a> to continue.</p>';
      return;
    }
    const services = selectedServices();
    const items = services.length
      ? `<ul class="cart-summary__addons">${services
          .map((service) => {
            const priceLabel = service.priceLabel
              ? `<span class="cart-summary__price">${service.priceLabel}</span>`
              : "";
            return `<li><strong>${service.title}</strong>${priceLabel}</li>`;
          })
          .join("")}</ul>`
      : '<p class="cart-summary__empty muted">No add-on services selected. You can add them on the previous step.</p>';
    summaryTarget.innerHTML = `
      <div class="cart-summary__plan">
        <h3>${plan.name}</h3>
        <p>${formatCurrency(plan.price, plan.currency)}</p>
        <p class="muted">Selected ${new Date(plan.time).toLocaleString()}</p>
      </div>
      <div class="cart-summary__services">
        <h4>Included services</h4>
        ${items}
      </div>
      <p class="cart-summary__note muted">Add-on pricing is finalised with your personalised proposal.</p>
    `;
    if (mini) {
      const addOnLabel = services.length
        ? `${services.length} add-on${services.length > 1 ? "s" : ""}`
        : "No add-ons";
      mini.textContent = `${plan.name} — ${formatCurrency(
        plan.price,
        plan.currency
      )} (${addOnLabel})`;
    }
  };

  renderSummary();

  const form = byId("paymentForm");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = byId("payStatus");
    const currentPlan = getSelectedPlan();
    if (!currentPlan) {
      if (status)
        status.textContent = "Please choose a plan before completing your payment.";
      setTimeout(() => {
        window.location.href = "pricing.html";
      }, 1200);
      return;
    }
    if (!form.reportValidity()) {
      if (status) status.textContent = "Please complete the required fields.";
      return;
    }
    const cardNumber = byId("card")?.value.replace(/\s+/g, "");
    if (!luhnCheck(cardNumber)) {
      if (status) status.textContent = "Enter a valid card number.";
      return;
    }
    const expValue = byId("exp")?.value;
    const exp = parseExpiry(expValue);
    if (!exp.valid) {
      if (status)
        status.textContent = "Expiry date must be in MM/YY format and in the future.";
      return;
    }
    const cvc = byId("cvc")?.value.trim();
    if (!/^\d{3,4}$/.test(cvc || "")) {
      if (status) status.textContent = "Enter a valid CVC.";
      return;
    }
    const services = selectedServices();
    const button = form.querySelector("button[type='submit']");
    if (status) status.textContent = "Processing secure payment…";
    if (button) button.setAttribute("disabled", "disabled");
    setTimeout(async () => {
      const order = {
        reference: generateReference(),
        plan: currentPlan,
        amount: Number(currentPlan.price),
        currency: currentPlan.currency || "AUD",
        name: byId("fullname")?.value.trim(),
        email: byId("emailPay")?.value.trim(),
        services: services.map((service) => ({
          id: service.id,
          title: service.title,
          priceLabel: service.priceLabel || null,
        })),
        createdAt: new Date().toISOString(),
      };
      storeLastOrder(order);
      try {
        await logCustomerEvent("payment_submitted", {
          planId: currentPlan.id,
          serviceIds: services.map((service) => service.id),
          email: order.email,
          amount: order.amount,
          currency: order.currency,
        });
      } catch (error) {
        // Fails silently — logging should never block checkout completion.
      }
      if (button) button.removeAttribute("disabled");
      window.location.href = "success.html";
    }, 900);
  });
}
