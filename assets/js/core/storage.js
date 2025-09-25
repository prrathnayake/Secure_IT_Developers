export function savePlanSelection(plan) {
  if (!plan) return;
  const payload = {
    ...plan,
    time: new Date().toISOString(),
  };
  localStorage.setItem("selectedPlan", JSON.stringify(payload));
}

export function getSelectedPlan() {
  try {
    return JSON.parse(localStorage.getItem("selectedPlan") || "null");
  } catch (error) {
    return null;
  }
}

export function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem("lastOrder") || "null");
  } catch (error) {
    return null;
  }
}

export function storeLastOrder(order) {
  if (!order) return;
  localStorage.setItem("lastOrder", JSON.stringify(order));
}
