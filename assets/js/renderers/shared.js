import { formatCurrency, telHref } from "../core/utils.js";
import { byId } from "../core/utils.js";

export function renderTeamSpotlight(config = {}, team = [], socials = []) {
  const heading = byId("teamSpotlightHeading");
  const copy = byId("teamSpotlightCopy");
  const card = byId("teamSpotlightCard");
  if (!card) return;
  if (heading) heading.textContent = config.heading || "";
  if (copy) copy.textContent = config.copy || "";

  card.innerHTML = "";
  const member = team.find((item) => item.id === config.memberId) || team[0];
  if (!member) {
    card.innerHTML = "<p class=\"muted\">Team details coming soon.</p>";
    return;
  }

  const focus = (member.focus || [])
    .slice(0, 3)
    .map((item) => `<li>${item}</li>`)
    .join("");
  const testimonial = member.testimonial || "";
  const portfolio = member.portfolio || member.links?.[0]?.href || "#";
  card.innerHTML = `
    <header>
      <p class="eyebrow">${member.role}</p>
      <h3>${member.name}</h3>
      <p class="location">${member.location || ""}</p>
    </header>
    <p class="bio">${member.bio || ""}</p>
    <blockquote class="founder-quote">${testimonial}</blockquote>
    <h4>Common engagements</h4>
    <ul class="focus">${focus}</ul>
    <div class="spotlight-actions">
      <a class="btn" href="${portfolio}" target="_blank" rel="noopener">View portfolio</a>
    </div>
    <div class="spotlight-socials" aria-label="Follow Secure IT Developers"></div>
  `;

  const socialWrap = card.querySelector(".spotlight-socials");
  if (socialWrap && (socials || []).length) {
    const list = document.createElement("ul");
    list.className = "social";
    (socials || []).forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${item.href}" aria-label="${item.aria || item.label}" target="_blank" rel="noopener">
          <span class="icon">${item.icon || ""}</span>
          <span class="sr-only">${item.label}</span>
        </a>
      `;
      list.appendChild(li);
    });
    socialWrap.appendChild(list);
  }
}

export function renderFaqs(container, faqs = []) {
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

export function fillCheckoutSummary(plan) {
  const orderSummary = byId("orderSummary");
  if (!orderSummary) return;
  if (!plan) {
    orderSummary.innerHTML =
      '<p>No plan selected. <a href="pricing.html">Choose a plan</a>.</p>';
    return;
  }
  orderSummary.innerHTML = `
    <h2>Order summary</h2>
    <p><strong>Plan:</strong> ${plan.name}</p>
    <p><strong>Price:</strong> ${formatCurrency(plan.price, plan.currency)}</p>
    <p class="muted">Selected at: ${new Date(plan.time).toLocaleString()}</p>
  `;
}

export function populateContactDetails(data) {
  const details = byId("contactDetails");
  if (!details) return;
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

export function renderOtherServices(target, services = [], options = {}) {
  const { showCtas = false, linkLabel = "View details" } = options;
  if (!target) return;
  target.innerHTML = "";
  services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-chip";
    const price = service.priceLabel
      ? `<span class="service-chip__price">${service.priceLabel}</span>`
      : "";
    card.innerHTML = `
      <h4>${service.title}</h4>
      <p>${service.description}</p>
      ${price}
      ${
        showCtas
          ? `<a class="btn btn-ghost" href="detail.html?type=service&id=${service.id}">${linkLabel}</a>`
          : ""
      }
    `;
    target.appendChild(card);
  });
}
