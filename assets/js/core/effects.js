export function initScrollReveal() {
  const revealables = document.querySelectorAll(".js-reveal");
  if (!revealables.length) return;
  if (!("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );
  revealables.forEach((el) => observer.observe(el));
}

export function initHeaderScrollEffect() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}
