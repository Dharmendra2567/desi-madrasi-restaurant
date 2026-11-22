import '../../styles/main.css'
import { initSite, entrance, flowerShower } from '../layout.js'
import { heroCarousel, coverflow, promiseSlider } from '../carousel.js'
import { IMG } from '../site.js'

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
    { img: sig('masalaDosa'), tag: 'From the Tawa', name: 'Ghee Roast Masala Dosa', desc: 'A metre of golden crunch brushed with pure ghee, folded around spiced potato masala.', price: 160 },
    { img: sig('idliVada'), tag: 'Morning Tiffin', name: 'Ghee Podi Idli', desc: 'Button idlis tossed in gunpowder and hot ghee — the snack Chennai cannot stop eating.', price: 110 },
    { img: sig('bananaLeafMeal'), tag: 'Lunch Special', name: 'Banana Leaf Meals', desc: 'Unlimited rice with sambar, rasam, kootu, poriyal, appalam, curd and payasam.', price: 249 },
    { img: sig('chettinadCurry'), tag: 'Chettinad Kitchen', name: 'Chettinad Pepper Chicken', desc: 'Slow-cooked with kalpasi, star anise and a fistful of freshly cracked black pepper.', price: 320 },
    { img: sig('paniyaram'), tag: 'Evening Snack', name: 'Kuzhi Paniyaram', desc: 'Crisp-shelled, cloud-soft dumplings from a cast-iron kuzhi pan, with kara chutney.', price: 120 },
    { img: sig('biryani'), tag: 'Dinner Favourite', name: 'Dindigul-Style Biryani', desc: 'Short-grain seeraga samba rice, tender meat and a sharp, peppery masala.', price: 299 },
    { img: sig('filterCoffee'), tag: 'Always', name: 'Filter Kaapi', desc: 'Strong decoction, boiling milk, a high pour and a crown of froth. Served in a dabarah set.', price: 50 },
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
