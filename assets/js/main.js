import { hydrateSite } from "./core/hydrator.js";
import { initThemeToggle } from "./core/theme.js";
import { initCookieBanner } from "./core/cookies.js";
import { initScrollReveal, initHeaderScrollEffect } from "./core/effects.js";
import { bindContact, initQuoteGenerator } from "./core/forms.js";
import { initPageLoader } from "./features/loader.js";
import { initMobileNav } from "./core/navigation.js";

initThemeToggle();
initCookieBanner();
initPageLoader();

document.addEventListener("DOMContentLoaded", () => {
  if (!window.DATA) return;
  hydrateSite(window.DATA);
  initMobileNav();
  initScrollReveal();
  initHeaderScrollEffect();
  initQuoteGenerator(window.DATA);
  bindContact("contactForm", "contactStatus", "contact");
  bindContact("contactForm2", "contactStatus2", "contact");
  bindContact("quoteForm", "quoteStatus", "quote");
});
