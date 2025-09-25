import { byId, formatCurrency, luhnCheck, parseExpiry, generateReference } from "../core/utils.js";
import { getSelectedPlan, storeLastOrder } from "../core/storage.js";

export function renderPaymentPage() {
  const mini = byId("miniSummary");
  const plan = getSelectedPlan();
  if (mini && plan) {
    mini.textContent = `${plan.name} — ${formatCurrency(plan.price, plan.currency)}`;
  }

  const form = byId("paymentForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
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
    const button = form.querySelector("button[type='submit']");
    if (status) status.textContent = "Processing secure payment…";
    if (button) button.setAttribute("disabled", "disabled");
    setTimeout(() => {
      const order = {
        reference: generateReference(),
        plan: currentPlan,
        amount: Number(currentPlan.price),
        currency: currentPlan.currency || "AUD",
        name: byId("fullname")?.value.trim(),
        email: byId("emailPay")?.value.trim(),
        createdAt: new Date().toISOString(),
      };
      storeLastOrder(order);
      if (button) button.removeAttribute("disabled");
      window.location.href = "success.html";
    }, 900);
  });
}
