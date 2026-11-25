// Header / footer markup shared by the browser (layout.js) and the build (seo-plugin.js),
// so navigation, address, phone and hours are in the HTML for crawlers that don't run JavaScript.
// No window/document access here — this file is also imported in Node at build time.
import { SITE, telLink, mailLink, waLink, mapLink } from './site.js'
import { emblemSVG, icon } from './ornaments.js'

export const NAV = [
  { id: 'home', href: '/', label: 'Home', sub: 'Vanakkam' },
  { id: 'about', href: '/about.html', label: 'About Us', sub: 'Our story' },
  { id: 'menu', href: '/menu.html', label: 'Menu', sub: 'Bagara & biryani' },
  { id: 'services', href: '/services.html', label: 'Services', sub: 'Catering & events' },
  { id: 'gallery', href: '/gallery.html', label: 'Gallery', sub: 'Moments' },
  { id: 'contact', href: '/contact.html', label: 'Contact', sub: 'Find us' },
]

/* Logo: uses the logo image, falls back to the emblem if it fails to load */
export const logoHTML = () => `
  <span class="brand-mark">
  <span class="brand-logo">
    <img src="/desi-madrasi-restaurant-logo.jpeg" alt="${SITE.fullName} logo" width="56" height="56"
      onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'emblem-wrap',innerHTML:this.dataset.fallback}))"
      data-fallback='${emblemSVG.replace(/'/g, '&#39;')}'>
  </span>
  <sup class="tm" aria-label="Trademark">TM</sup>
  </span>`

export const headerHTML = (page) => {
  const links = NAV.map((n) => `<li><a href="${n.href}" class="${n.id === page ? 'active' : ''}" data-link>${n.label}</a></li>`).join('')
  const toranItems = Array.from({ length: 28 }, (_, i) =>
    i % 3 === 2
      ? `<span class="t-leaf" style="--i:${i}"></span>`
      : `<span class="t-flower ${i % 2 ? 'alt' : ''}" style="--i:${i}"><b></b><b></b><b></b></span>`,
  ).join('')
  return `<div class="header-wrap">
    <div class="topbar">
      <div class="container topbar-inner">
        <span class="status" data-status><i></i>Open daily · 12 PM – 11 PM</span>
        <a href="${telLink}" class="tb-item">${icon.phone}${SITE.phoneDisplay}</a>
        <a href="${mailLink}" class="tb-item hide-sm">${icon.mail}${SITE.email}</a>
        <a href="${mapLink}" target="_blank" rel="noopener" class="tb-item hide-md">${icon.pin}Kondapur, Hyderabad</a>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a href="/" class="brand" data-link>
          ${logoHTML()}
          <span class="brand-text"><b>Desi Madrasi</b><small>Restaurant · Kondapur</small></span>
        </a>
        <nav class="main-nav" aria-label="Main"><ul>${links}</ul></nav>
        <div class="header-cta">
          <a href="/contact.html#reserve" class="btn btn-gold btn-sm hide-sm" data-link>Reserve a Table</a>
          <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
      <div class="toran" aria-hidden="true">${toranItems}</div>
    </header>
  </div>`
}

export const footerHTML = () => `<footer class="site-footer">
    <div class="footer-kolam-band" aria-hidden="true"></div>
    <div class="container footer-cta">
      <div>
        <p class="eyebrow light">Saapadu ready</p>
        <h2 class="footer-cta-title">Your leaf is laid. <em>Your seat is waiting.</em></h2>
      </div>
      <div class="footer-cta-btns">
        <a href="/contact.html#reserve" class="btn btn-gold" data-link>Reserve a Table</a>
        <a href="${waLink()}" class="btn btn-ghost-light" target="_blank" rel="noopener">${icon.whatsapp}WhatsApp us</a>
      </div>
    </div>
    <div class="container footer-grid">
      <div class="f-col f-brand">
        <a href="/" class="brand brand-light" data-link>${logoHTML()}<span class="brand-text"><b>Desi Madrasi</b><small>Restaurant · Kondapur</small></span></a>
        <p>Fragrant bagara, slow-cooked biryani and spice powders roasted in-house — the honest flavours of Desi and Madrasi home kitchens, served on a banana leaf on the Gachibowli – Miyapur Road.</p>
        <div class="socials">
          <a href="${SITE.socials.instagram}" aria-label="Instagram">${icon.instagram}</a>
          <a href="${SITE.socials.facebook}" aria-label="Facebook">${icon.facebook}</a>
          <a href="${SITE.socials.youtube}" aria-label="YouTube">${icon.youtube}</a>
          <a href="${waLink()}" aria-label="WhatsApp" target="_blank" rel="noopener">${icon.whatsapp}</a>
        </div>
      </div>
      <div class="f-col">
        <h3 class="f-head">Explore</h3>
        <ul>${NAV.map((n) => `<li><a href="${n.href}" data-link>${n.label}</a></li>`).join('')}</ul>
      </div>
      <div class="f-col">
        <h3 class="f-head">Kitchen Hours</h3>
        <ul class="f-hours">${SITE.hours.map((h) => `<li><span>${h.label}</span><b>${h.time}</b></li>`).join('')}</ul>
        <p class="f-note">Open all seven days, including festivals.</p>
      </div>
      <div class="f-col">
        <h3 class="f-head">Visit Us</h3>
        <address>${SITE.addressLines.join('<br>')}</address>
        <a class="f-contact" href="${telLink}">${icon.phone}${SITE.phoneDisplay}</a>
        <a class="f-contact" href="${mailLink}">${icon.mail}${SITE.email}</a>
        <a class="f-contact" href="${mapLink}" target="_blank" rel="noopener">${icon.pin}Get directions</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container fb-inner">
        <p>© <span data-year>${new Date().getFullYear()}</span> ${SITE.fullName}, Hyderabad. All rights reserved.</p>
        <p class="fb-sign">Made with ghee, gingelly oil &amp; a lot of love.</p>
      </div>
    </div>
  </footer>`
