import { byId } from "../core/utils.js";

export function renderAboutPage(data) {
  const page = data.pages?.about;
  if (!page) return;
  const intro = byId("aboutIntro");
  if (intro) intro.textContent = page.intro || "";
  const story = page.story || {};
  const storyCopy = byId("aboutStory");
  if (storyCopy) storyCopy.textContent = story.copy || "";
  const milestones = byId("aboutMilestones");
  if (milestones) {
    milestones.innerHTML = "";
    (story.milestones || []).forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.year}</strong><span>${item.detail}</span>`;
      milestones.appendChild(li);
    });
  }
  const storyFigure = byId("aboutStoryFigure");
  if (storyFigure) {
    const media = story.media;
    if (media?.img) {
      storyFigure.innerHTML = `
        <img src="${media.img}" alt="${media.alt || "Studio placeholder"}" />
        <figcaption>${media.caption || ""}</figcaption>
      `;
    } else {
      storyFigure.innerHTML = "";
    }
  }
  const mission = byId("aboutMission");
  if (mission) mission.textContent = page.mission || "";

  const approach = byId("aboutApproach");
  if (approach) {
    approach.innerHTML = "";
    (page.approach || []).forEach((step) => {
      const article = document.createElement("article");
      article.innerHTML = `<h3>${step.title}</h3><p>${step.detail}</p>`;
      approach.appendChild(article);
    });
  }

  const techList = byId("techList");
  if (techList) {
    techList.innerHTML = "";
    (page.techStack || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      techList.appendChild(li);
    });
  }

  const impactGrid = byId("impactGrid");
  if (impactGrid) {
    impactGrid.innerHTML = "";
    (page.impact || []).forEach((metric) => {
      const card = document.createElement("article");
      card.innerHTML = `
        <strong>${metric.metric}</strong>
        <span>${metric.label}</span>
        <p>${metric.detail}</p>
      `;
      impactGrid.appendChild(card);
    });
  }

  const valuesList = byId("valuesList");
  if (valuesList) {
    valuesList.innerHTML = "";
    (page.values || []).forEach((value) => {
      const li = document.createElement("li");
      li.textContent = value;
      valuesList.appendChild(li);
    });
  }

  const certs = byId("certifications");
  if (certs) {
    certs.innerHTML = "";
    (page.certifications || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      certs.appendChild(li);
    });
  }

  const community = byId("communityList");
  if (community) {
    community.innerHTML = "";
    (page.community || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      community.appendChild(li);
    });
  }

  const partners = byId("partnerList");
  if (partners) {
    partners.innerHTML = "";
    (page.partners || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      partners.appendChild(li);
    });
  }

  const gallery = byId("studioGallery");
  if (gallery) {
    gallery.innerHTML = "";
    const media = page.gallery || {};
    (media.items || []).forEach((item) => {
      const figure = document.createElement("figure");
      figure.innerHTML = `
        <img src="${item.img}" alt="${item.alt}" />
        <figcaption>${item.caption || ""}</figcaption>
      `;
      gallery.appendChild(figure);
    });
  }

  const teamIntro = byId("teamIntro");
  if (teamIntro) teamIntro.textContent = page.teamIntro || "";
}
