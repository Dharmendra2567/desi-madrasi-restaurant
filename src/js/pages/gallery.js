import { initSite } from '../layout.js'
import { IMG, SITE, REAL } from '../site.js'

const PHOTOS = [
  ...REAL.map((r) => [r.key, 'real', r.cap]),
  ['biryani', 'food', 'Chicken dum biryani'],
  ['interiorWarm', 'ambience', 'Evening glow in the main hall'],
  ['leafPulao', 'food', 'Fragrant bagara rice'],
  ['chefFlame', 'kitchen', 'Fire under the handi'],
  ['bananaLeafMeal', 'food', 'The full leaf meal'],
  ['friendsDining', 'moments', 'Sunday lunch with friends'],
  ['tomatoRice', 'food', 'Madrasi biryani'],
  ['chettinadCurry', 'food', 'Mutton sukka'],
  ['candleDining', 'ambience', 'A quiet dinner'],
  ['kebab', 'food', 'Kaju chicken pakoda'],
  ['spiceThali', 'kitchen', 'House-roasted spice powders'],
  ['chickenCurry', 'food', 'Home-style chicken curry'],
  ['crowd', 'moments', 'A full house'],
  ['redCurry', 'food', 'Mutton curry'],
  ['kitchenBar', 'kitchen', 'Behind the counter'],
  ['riceBowl', 'food', 'Biryani, plated and ready'],
  ['interiorDining', 'ambience', 'Set for the evening'],
  ['tableSpread', 'moments', 'A table for celebrations'],
  ['paneer', 'food', 'Veg specials'],
  ['friendsTable', 'moments', 'Plates shared, stories told'],
  ['interiorHall', 'ambience', 'The dining room'],
  ['thali', 'food', 'Non veg thali'],
]

const grid = document.querySelector('.masonry')
grid.innerHTML = PHOTOS.map(
  ([key, cat, cap], i) => `
  <figure class="g-item${cat === 'real' ? ' g-real' : ''}" data-cat="${cat}" data-i="${i}" data-reveal="up" style="--delay:${(i % 3) * 90}ms" tabindex="0">
    <img src="${IMG[key].replace('w=1600', 'w=700')}" alt="${cap}" loading="lazy">
    <figcaption><span>${cat === 'real' ? 'Real photo' : cat}</span><b>${cap}</b></figcaption>
  </figure>`,
).join('')

document.querySelector('[data-social="instagram"]').href = SITE.socials.instagram

initSite('gallery')

/* ---------- Filters ---------- */
const items = [...grid.children]
document.querySelectorAll('.gallery-filters button').forEach((btn) =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gallery-filters button').forEach((b) => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', String(b === btn)) })
    const f = btn.dataset.filter
    items.forEach((it) => {
      const show = f === 'all' || it.dataset.cat === f
      it.style.opacity = '0'
      it.style.transform = 'scale(.94)'
      setTimeout(() => {
        it.classList.toggle('is-hidden', !show)
        if (show) requestAnimationFrame(() => { it.style.opacity = ''; it.style.transform = ''; it.classList.add('in') })
      }, 260)
    })
  }),
)

/* ---------- Lightbox ---------- */
const lb = document.querySelector('.lightbox')
const lbImg = lb.querySelector('img')
const lbCap = lb.querySelector('figcaption')
let cur = 0
const visible = () => items.filter((it) => !it.classList.contains('is-hidden'))
const open = (el) => {
  const list = visible()
  cur = list.indexOf(el)
  render(list)
  lb.classList.add('open')
  document.body.style.overflow = 'hidden'
}
const render = (list = visible()) => {
  const el = list[cur]
  const i = Number(el.dataset.i)
  lbImg.style.opacity = '0'
  lbImg.onload = () => (lbImg.style.opacity = '1')
  lbImg.src = IMG[PHOTOS[i][0]].replace('w=1600', 'w=1600')
  lbImg.alt = PHOTOS[i][2]
  lbCap.textContent = PHOTOS[i][2]
}
const step = (d) => { const list = visible(); cur = (cur + d + list.length) % list.length; render(list) }
const close = () => { lb.classList.remove('open'); document.body.style.overflow = '' }
lbImg.style.transition = 'opacity .4s'

items.forEach((it) => {
  it.addEventListener('click', () => open(it))
  it.addEventListener('keydown', (e) => e.key === 'Enter' && open(it))
})
lb.querySelector('.lb-close').addEventListener('click', close)
lb.querySelector('.lb-prev').addEventListener('click', () => step(-1))
lb.querySelector('.lb-next').addEventListener('click', () => step(1))
lb.addEventListener('click', (e) => e.target === lb && close())
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
})
let tx = 0
lb.addEventListener('touchstart', (e) => (tx = e.touches[0].clientX), { passive: true })
lb.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1) })
