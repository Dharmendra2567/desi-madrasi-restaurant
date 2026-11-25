// Shared menu markup — used in the browser (menu.js) and at build time (seo-plugin.js)
// so the full menu is in the HTML for search engines and AI crawlers that don't run JavaScript.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const menuSectionsHTML = (MENU, IMG) =>
  MENU.map(
    (cat) => `
  <section class="menu-section" id="${cat.id}" data-cat="${cat.id}">
    <div class="menu-section-head">
      <div class="msh-img" data-reveal="zoom"><img src="${IMG[cat.img].replace('w=1600', 'w=600')}" alt="${esc(cat.title)}" loading="lazy"></div>
      <div class="msh-text" data-reveal="up">
        <span class="indic">${cat.indic}</span>
        <h2>${esc(cat.title)}</h2>
        <p>${esc(cat.desc)}</p>
      </div>
    </div>
    <div class="menu-items" data-stagger="45">
      ${cat.items
        .map(
          (it) => `
        <div class="menu-item" data-nv="${it.nv ? 1 : 0}" data-search="${esc((it.n + ' ' + it.d + ' ' + cat.title).toLowerCase())}">
          <i class="mi-mark ${it.nv ? 'nv' : ''}" title="${it.nv ? 'Non-vegetarian' : 'Vegetarian'}"></i>
          <span class="mi-name">${esc(it.n)}${it.badge ? `<span class="badge">${esc(it.badge)}</span>` : ''}${it.spicy ? '<span class="badge spicy">Spicy</span>' : ''}</span>
          <span class="mi-price">₹${it.p}</span>
          <p class="mi-desc">${esc(it.d)}</p>
        </div>`,
        )
        .join('')}
    </div>
  </section>`,
  ).join('')

export const menuTabsHTML = (MENU) =>
  MENU.map((c) => `<button class="menu-tab" role="tab" data-target="${c.id}">${esc(c.title)}</button>`).join('')
