import { seoContent } from "../site/seo.js";

export const successPage = {
  meta: seoContent.success,
  heading: "Payment confirmed",
  body:
    "Thanks for partnering with Secure IT Developers. Your project kickoff email, including onboarding steps and access invites, is on its way.",
  actions: [
    { label: "Back to home", href: "index.html" },
    { label: "View pricing", href: "pricing.html", variant: "ghost" },
  ],
};
