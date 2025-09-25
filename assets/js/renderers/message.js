import { byId, formatCurrency } from "../core/utils.js";
import { getLastOrder, getSelectedPlan } from "../core/storage.js";

export function renderMessagePage(pageKey, data) {
  const page = data.pages?.[pageKey];
  if (!page) return;
  const heading = byId("messageHeading");
  if (heading) heading.textContent = page.heading || "";
  const body = byId("messageBody");
  if (body) body.textContent = page.body || page.message || "";
  const messageInfo = byId("messageInfo");
  if (messageInfo && page.message) messageInfo.textContent = page.message;
  const actions = byId("messageActions");
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
  const orderDetails = byId("orderDetails");
  if (!orderDetails) return;
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
