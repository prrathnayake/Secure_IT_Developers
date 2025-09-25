import { byId } from "../core/utils.js";
import { populateContactDetails } from "./shared.js";

export function renderContactPage(data) {
  const intro = byId("contactIntro");
  if (intro) intro.textContent = data.pages?.contact?.intro || "";

  const metaHeading = byId("contactHeading");
  if (metaHeading) metaHeading.textContent = data.contact?.heading || "";

  populateContactDetails(data);

  const servicesTarget = byId("contactServices");
  if (servicesTarget) {
    servicesTarget.innerHTML = "";
    (data.serviceCatalog || []).forEach((service) => {
      const item = document.createElement("label");
      item.className = "service-option";
      item.innerHTML = `
        <input type="checkbox" name="services" value="${service.title}" />
        <span>
          <strong>${service.title}</strong>
          <em>${service.priceLabel || "Tailored pricing"}</em>
          <p>${service.description}</p>
        </span>
      `;
      servicesTarget.appendChild(item);
    });
  }
}
