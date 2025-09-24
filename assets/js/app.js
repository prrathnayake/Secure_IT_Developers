
/* Theme */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme){ root.setAttribute('data-theme', savedTheme); if(themeToggle) themeToggle.setAttribute('aria-pressed', savedTheme==='dark'); }
if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.setAttribute('aria-pressed', next==='dark');
  });
}

/* Cookie */
const cookieBanner = document.getElementById('cookieBanner');
const openCookie = document.getElementById('openCookie');
const consent = localStorage.getItem('cookieConsent');
function showCookie(){ if(cookieBanner) cookieBanner.style.display='flex'; }
function hideCookie(){ if(cookieBanner) cookieBanner.style.display='none'; }
if(!consent) showCookie();
if(openCookie){ openCookie.addEventListener('click', (e)=>{e.preventDefault(); showCookie();});}
if(cookieBanner){
  cookieBanner.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-cookie]');
    if(!btn) return;
    localStorage.setItem('cookieConsent', btn.getAttribute('data-cookie'));
    hideCookie();
  });
}

/* Contact forms demo */
function bindContact(formId, statusId){
  const form = document.getElementById(formId), status = document.getElementById(statusId);
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault(); status.textContent = 'Sending…';
    setTimeout(()=>{ status.textContent = 'Thanks! We will get back to you soon.'; form.reset(); }, 700);
  });
}
bindContact('contactForm','contactStatus');
bindContact('contactForm2','contactStatus2');

/* Pricing render + tabs */
(function initPricing(){
  const subnav = document.getElementById('pricingSubnav');
  const tabs = document.getElementById('pricingTabs');
  if(!subnav || !tabs || !window.DATA) return;

  subnav.innerHTML = '';
  tabs.innerHTML = '';

  window.DATA.pricingGroups.forEach((g, idx) => {
    const chip = document.createElement('button');
    chip.className = 'chip' + (idx===0 ? ' active' : '');
    chip.textContent = g.label;
    chip.setAttribute('data-tab', g.id);
    chip.addEventListener('click', () => selectTab(g.id));
    subnav.appendChild(chip);

    const sec = document.createElement('section');
    sec.className = 'grid-3 tab';
    sec.id = `tab-${g.id}`;
    if(idx!==0) sec.style.display='none';

    g.plans.forEach(p => {
      const card = document.createElement('article');
      card.className = 'price-card';
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-label', `${g.label} ${p.label} plan`);
      const ul = p.features.map(f=>`<li>${f}</li>`).join('');
      card.innerHTML = `
        <h3>${p.label}</h3>
        <p class="price"><span class="currency">A$</span>${Number(p.price).toLocaleString()}</p>
        <ul class="features">${ul}</ul>
        <button class="btn select-plan" data-plan="${g.id}-${p.id}" data-name="${g.label} – ${p.label}" data-price="${p.price}">Select</button>
      `;
      card.querySelector('.select-plan').addEventListener('click', (e)=>{
        const plan = { id: `${g.id}-${p.id}`, name: `${g.label} – ${p.label}`, price: Number(p.price), time: new Date().toISOString() };
        localStorage.setItem('selectedPlan', JSON.stringify(plan));
        window.location.href = 'checkout.html';
      });
      sec.appendChild(card);
    });
    tabs.appendChild(sec);
  });

  // Generate dynamic JSON-LD Offers
  const offers = [];
  window.DATA.pricingGroups.forEach(g=>g.plans.forEach(p=>{
    offers.push({
      "@type":"Offer",
      "name": `${g.label} – ${p.label}`,
      "price": p.price,
      "priceCurrency": "AUD",
      "category": g.label,
      "availability": "https://schema.org/InStock"
    });
  }));
  const ld = { "@context":"https://schema.org", "@type":"ItemList", "itemListElement": offers };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(ld);
  document.body.appendChild(script);

  const saved = localStorage.getItem('pricingTab') || window.DATA.pricingGroups[0]?.id || 'starter';
  selectTab(saved);

  function selectTab(id){
    document.querySelectorAll('#pricingSubnav .chip').forEach(c=>c.classList.toggle('active', c.dataset.tab===id));
    document.querySelectorAll('#pricingTabs > .tab').forEach(s=>{ s.style.display = (s.id === `tab-${id}`) ? 'grid' : 'none';});
    localStorage.setItem('pricingTab', id);
  }
})();

/* Checkout summary */
(function fillCheckout(){
  const orderSummary = document.getElementById('orderSummary');
  if(!orderSummary) return;
  const plan = JSON.parse(localStorage.getItem('selectedPlan') || 'null');
  if(!plan){
    orderSummary.innerHTML = '<p>No plan selected. <a href="pricing.html">Choose a plan</a>.</p>';
  } else {
    orderSummary.innerHTML = `
      <h2>Order summary</h2>
      <p><strong>Plan:</strong> ${plan.name}</p>
      <p><strong>Price:</strong> A$ ${plan.price.toLocaleString()}</p>
      <p class="muted">Selected at: ${new Date(plan.time).toLocaleString()}</p>
    `;
  }
})();

/* Payment simulation */
(function payment(){
  const mini = document.getElementById('miniSummary');
  const plan = JSON.parse(localStorage.getItem('selectedPlan') || 'null');
  if(mini && plan){ mini.textContent = `${plan.name} — A$ ${plan.price.toLocaleString()}`; }

  const form = document.getElementById('paymentForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const status = document.getElementById('payStatus');
    status.textContent = 'Processing…';
    setTimeout(()=>{
      const ok = Math.random() > 0.15;
      window.location.href = ok ? 'success.html' : 'failed.html';
    }, 900);
  });
})();
