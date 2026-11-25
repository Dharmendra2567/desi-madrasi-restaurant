import { initSite, entrance, flowerShower } from '../layout.js'
import { heroCarousel, coverflow, promiseSlider } from '../carousel.js'
import { IMG, REAL } from '../site.js'

// Real-plates strip (rendered before initSite so reveal animations pick it up)
const rp = document.querySelector('.rp-grid')
if (rp) rp.innerHTML = REAL.map((r, i) => `<figure class="polaroid rp-card" style="--r:${[-4, 3, -2, 4][i % 4]}deg"><img src="${r.src}" alt="${r.cap}" loading="lazy" /><figcaption>${r.cap}</figcaption></figure>`).join('')

initSite('home')

const hero = heroCarousel(document.querySelector('.hero'))

// Temple doors open → flower shower → hero starts "walking in"
entrance((animated) => {
  hero.start()
  if (animated) setTimeout(() => flowerShower({ count: 110, duration: 5500 }), 500)
})

const sig = (img, w = 800) => IMG[img].replace('w=1600', `w=${w}`)
coverflow(
  document.querySelector('.coverflow'),
  [
    { img: IMG.realBiryaniLeaf, tag: 'Real Plate · Madrasi Biryani', name: 'Madrasi Chicken Biryani', desc: 'Madras-style biryani rich with tomato, mint and whole spices, with juicy chicken pieces.', price: 299 },
    { img: IMG.realBagaraLeaf, tag: 'Real Plate · Bagara Special', name: 'Mutton Fry + Bagara', desc: 'Tender mutton roasted dry with pepper and onions, served with fragrant bagara rice.', price: 399 },
    { img: sig('biryani'), tag: 'Desi Biryani', name: 'Chicken Dum Biryani', desc: 'Hyderabadi-style dum biryani with marinated chicken, sealed and slow-cooked.', price: 239 },
    { img: sig('chettinadCurry'), tag: 'Must Try', name: 'Mutton Sukka', desc: 'Mutton roasted dry with shallots, pepper and coconut — our most-loved fry.', price: 399 },
    { img: IMG.realComboTray, tag: 'Real Plate · Combo', name: 'Desi Madrasi Chicken Combo', desc: 'Bagara, Madrasi biryani, chicken curry and chicken fry — all on one table.', price: 399 },
    { img: sig('chickenCurry'), tag: 'Must Try', name: 'Chicken Sukka', desc: 'Chicken roasted dry with shallots, pepper and coconut.', price: 299 },
    { img: IMG.realPots, tag: 'Real Plate · Thali', name: 'Non Veg Thali', desc: 'Rice with chicken curry, chicken fry, dal, curd and a sweet — a full meal on one plate.', price: 299 },
  ],
  {
    dotsEl: document.querySelector('.cf-dots'),
    prevBtn: document.querySelector('.cf-prev'),
    nextBtn: document.querySelector('.cf-next'),
  },
)

promiseSlider(document.querySelector('.promise-slider'), {
  navEl: document.querySelector('.promise-nav'),
  imgEl: document.querySelector('.pv-img img'),
  imgMap: IMG,
})
