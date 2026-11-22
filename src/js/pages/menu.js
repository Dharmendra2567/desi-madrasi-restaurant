import '../../styles/main.css'
import { initSite } from '../layout.js'
import { MENU } from '../menu-data.js'
import { IMG } from '../site.js'

const list = document.getElementById('menu-list')
const tabs = document.querySelector('.menu-tabs')

list.innerHTML = MENU.map(
  (cat) => `
  <section class="menu-section" id="${cat.id}" data-cat="${cat.id}">
    <div class="menu-section-head">
      <div class="msh-img" data-reveal="zoom"><img src="${IMG[cat.img].replace('w=1600', 'w=600')}" alt="${cat.title}" loading="lazy"></div>
      <div class="msh-text" data-reveal="up">
        <span class="indic">${cat.indic}</span>
        <h2>${cat.title}</h2>
        <p>${cat.desc}</p>
      </div>
    </div>
    <div class="menu-items" data-stagger="45">
      ${cat.items
        .map(
          (it) => `
        <div class="menu-item" data-nv="${it.nv ? 1 : 0}" data-search="${(it.n + ' ' + it.d + ' ' + cat.title).toLowerCase()}">
          <i class="mi-mark ${it.nv ? 'nv' : ''}" title="${it.nv ? 'Non-vegetarian' : 'Vegetarian'}"></i>
          <span class="mi-name">${it.n}${it.badge ? `<span class="badge">${it.badge}</span>` : ''}${it.spicy ? '<span class="badge spicy">Spicy</span>' : ''}</span>
          <span class="mi-price">₹${it.p}</span>
          <p class="mi-desc">${it.d}</p>
        </div>`,
        )
        .join('')}
    </div>
  </section>`,
).join('')

tabs.innerHTML = MENU.map((c) => `<button class="menu-tab" role="tab" data-target="${c.id}">${c.title}</button>`).join('')

initSite('menu')

/* ---------- Tabs: smooth scroll + scroll-spy ---------- */
const tabBtns = [...tabs.children]
const setTab = (id) =>
  tabBtns.forEach((b) => {
    const on = b.dataset.target === id
    b.classList.toggle('active', on)
    if (on) tabs.scrollTo({ left: b.offsetLeft - tabs.clientWidth / 2 + b.clientWidth / 2, behavior: 'smooth' })
  })

tabBtns.forEach((b) =>
  b.addEventListener('click', () => {
    document.getElementById(b.dataset.target).scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTab(b.dataset.target)
  }),
)

const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && setTab(e.target.id)),
  { rootMargin: '-45% 0px -50% 0px' },
)
document.querySelectorAll('.menu-section').forEach((s) => spy.observe(s))
setTab(MENU[0].id)

if (location.hash) {
  const target = document.querySelector(location.hash)
  if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 700)
}

/* ---------- Search + veg filter ---------- */
const search = document.querySelector('.menu-search input')
const veg = document.getElementById('vegOnly')
const empty = document.querySelector('.menu-empty')

const filter = () => {
  const q = search.value.trim().toLowerCase()
  let total = 0
  document.querySelectorAll('.menu-section').forEach((sec) => {
    let count = 0
    sec.querySelectorAll('.menu-item').forEach((it) => {
      const show = (!q || it.dataset.search.includes(q)) && (!veg.checked || it.dataset.nv === '0')
      it.classList.toggle('hidden', !show)
      if (show) { count++; it.classList.add('in') }
    })
    sec.style.display = count ? '' : 'none'
    tabBtns.find((b) => b.dataset.target === sec.id).style.display = count ? '' : 'none'
    total += count
  })
  empty.style.display = total ? 'none' : 'block'
}
search.addEventListener('input', filter)
veg.addEventListener('change', filter)
