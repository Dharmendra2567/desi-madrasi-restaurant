import { SITE, IMG, REAL, telLink, mailLink, waLink, mapLink, mapEmbed } from './site.js'
import { kolamSVG, diyaSVG, emblemSVG, icon } from './ornaments.js'

const NAV = [
  { id: 'home', href: '/', label: 'Home', sub: 'Vanakkam' },
  { id: 'about', href: '/about.html', label: 'About Us', sub: 'Our story' },
  { id: 'menu', href: '/menu.html', label: 'Menu', sub: 'Bagara & biryani' },
  { id: 'services', href: '/services.html', label: 'Services', sub: 'Catering & events' },
  { id: 'gallery', href: '/gallery.html', label: 'Gallery', sub: 'Moments' },
  { id: 'contact', href: '/contact.html', label: 'Contact', sub: 'Find us' },
]

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = window.matchMedia('(pointer: fine)').matches

/* ---------------- Logo: uses /logo.png, falls back to emblem ---------------- */
const logoHTML = () => `
  <span class="brand-mark">
  <span class="brand-logo">
    <img src="/desi-madrasi-restaurant-logo.jpeg" alt="${SITE.fullName} logo" width="56" height="56"
      onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'emblem-wrap',innerHTML:this.dataset.fallback}))"
      data-fallback='${emblemSVG.replace(/'/g, '&#39;')}'>
  </span>
  <sup class="tm" aria-label="Trademark">TM</sup>
  </span>`

/* ---------------- Open / closed status ---------------- */
function status() {
  const h = new Date().getHours()
  const open = h >= SITE.openHour && h < SITE.closeHour
  return open
    ? `<span class="status open"><i></i>Open now · until 11 PM</span>`
    : `<span class="status closed"><i></i>Closed now · opens 12 PM</span>`
}

export function timeGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return { hello: 'Good morning', line: 'The masalas are roasting and the meat is marinating — lunch will be ready from 12 PM.' }
  if (h >= 12 && h < 16) return { hello: 'Good afternoon', line: 'Banana leaves are being laid out and the bagara rice is fresh off the stove. Lunch is calling.' }
  if (h >= 16 && h < 19) return { hello: 'Good evening', line: 'Kaju chicken pakoda, chicken sukka and a chilled cool drink — the evening hunger is sorted.' }
  if (h >= 19 && h < 23) return { hello: 'Good evening', line: 'The biryani handis are being opened for dinner. Come hungry.' }
  return { hello: 'Good night', line: 'The kitchen is resting for the night. We open at 12 PM with fresh bagara and biryani.' }
}

/* ---------------- Header ---------------- */
function renderHeader(page) {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}" class="${n.id === page ? 'active' : ''}" data-link>${n.label}</a></li>`,
  ).join('')

  const toranItems = Array.from({ length: 28 }, (_, i) =>
    i % 3 === 2
      ? `<span class="t-leaf" style="--i:${i}"></span>`
      : `<span class="t-flower ${i % 2 ? 'alt' : ''}" style="--i:${i}"><b></b><b></b><b></b></span>`,
  ).join('')

  const header = document.createElement('div')
  header.className = 'header-wrap'
  header.innerHTML = `
    <div class="topbar">
      <div class="container topbar-inner">
        ${status()}
        <a href="${telLink}" class="tb-item">${icon.phone}${SITE.phoneDisplay}</a>
        <a href="${mailLink}" class="tb-item hide-sm">${icon.mail}${SITE.email}</a>
        <a href="${mapLink}" target="_blank" rel="noopener" class="tb-item hide-md">${icon.pin}Kondapur, Hyderabad</a>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a href="/" class="brand" data-link aria-label="${SITE.fullName} home">
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
    </header>`
  document.body.prepend(header)

  const mobile = document.createElement('div')
  mobile.className = 'mobile-menu'
  mobile.setAttribute('aria-hidden', 'true')
  mobile.innerHTML = `
    <div class="mm-kolam">${kolamSVG('drawn')}</div>
    <nav aria-label="Mobile">
      <ol>${NAV.map(
        (n, i) => `<li style="--d:${i}"><a href="${n.href}" data-link class="${n.id === page ? 'active' : ''}">
          <span class="mm-num">0${i + 1}</span><span class="mm-label">${n.label}<small>${n.sub}</small></span></a></li>`,
      ).join('')}</ol>
    </nav>
    <div class="mm-foot">
      <a href="${telLink}" class="btn btn-gold">${icon.phone}Call ${SITE.phoneDisplay}</a>
      <p>${SITE.addressShort}</p>
    </div>`
  document.body.appendChild(mobile)

  const burger = header.querySelector('.burger')
  const toggle = (force) => {
    const open = force ?? !document.body.classList.contains('menu-open')
    document.body.classList.toggle('menu-open', open)
    burger.setAttribute('aria-expanded', String(open))
    mobile.setAttribute('aria-hidden', String(!open))
  }
  burger.addEventListener('click', () => toggle())
  document.addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false))

  // shrink / hide on scroll
  let last = 0
  const onScroll = () => {
    const y = window.scrollY
    header.classList.toggle('is-scrolled', y > 40)
    const hide = y > 400 && y > last && !document.body.classList.contains('menu-open')
    header.classList.toggle('is-hidden', hide)
    document.body.classList.toggle('header-hidden', hide)
    last = y
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

/* ---------------- Footer ---------------- */
function renderFooter() {
  const f = document.createElement('footer')
  f.className = 'site-footer'
  f.innerHTML = `
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
        <h4>Explore</h4>
        <ul>${NAV.map((n) => `<li><a href="${n.href}" data-link>${n.label}</a></li>`).join('')}</ul>
      </div>
      <div class="f-col">
        <h4>Kitchen Hours</h4>
        <ul class="f-hours">${SITE.hours.map((h) => `<li><span>${h.label}</span><b>${h.time}</b></li>`).join('')}</ul>
        <p class="f-note">Open all seven days, including festivals.</p>
      </div>
      <div class="f-col">
        <h4>Visit Us</h4>
        <address>${SITE.addressLines.join('<br>')}</address>
        <a class="f-contact" href="${telLink}">${icon.phone}${SITE.phoneDisplay}</a>
        <a class="f-contact" href="${mailLink}">${icon.mail}${SITE.email}</a>
        <a class="f-contact" href="${mapLink}" target="_blank" rel="noopener">${icon.pin}Get directions</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container fb-inner">
        <p>© ${new Date().getFullYear()} ${SITE.fullName}, Hyderabad. All rights reserved.</p>
        <p class="fb-sign">Made with ghee, gingelly oil &amp; a lot of love.</p>
      </div>
    </div>`
  document.body.appendChild(f)

  // floating actions
  const fab = document.createElement('div')
  fab.className = 'fab'
  fab.innerHTML = `
    <a href="${waLink()}" target="_blank" rel="noopener" class="fab-btn fab-wa" aria-label="Chat on WhatsApp">${icon.whatsapp}</a>
    <a href="${telLink}" class="fab-btn fab-call" aria-label="Call the restaurant">${icon.phone}</a>
    <button class="fab-btn fab-top" aria-label="Back to top"><svg viewBox="0 0 24 24"><path d="M12 5 5 12l1.4 1.4L11 8.8V20h2V8.8l4.6 4.6L19 12z"/></svg></button>`
  document.body.appendChild(fab)
  fab.querySelector('.fab-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
  window.addEventListener('scroll', () => fab.classList.toggle('show-top', window.scrollY > 700), { passive: true })
}

/* ---------------- Page transition curtain ---------------- */
function curtain() {
  const c = document.createElement('div')
  c.className = 'curtain'
  c.innerHTML = `<div class="curtain-half l"></div><div class="curtain-half r"></div><div class="curtain-mark">${kolamSVG('spin')}</div>`
  document.body.appendChild(c)

  if (sessionStorage.getItem('dm-nav') === '1') {
    sessionStorage.removeItem('dm-nav')
    c.classList.add('closed')
    setTimeout(() => c.classList.remove('closed'), 80)
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-link]')
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return
    const url = new URL(a.href, location.href)
    if (url.origin !== location.origin) return
    const samePage = url.pathname === location.pathname || (url.pathname === '/' && location.pathname === '/index.html')
    if (samePage) {
      if (url.hash) return // allow in-page anchor
      e.preventDefault()
      document.body.classList.remove('menu-open')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    e.preventDefault()
    sessionStorage.setItem('dm-nav', '1')
    c.classList.add('closed')
    setTimeout(() => (location.href = a.href), 650)
  })

  // back/forward cache: reset curtain
  window.addEventListener('pageshow', (e) => e.persisted && c.classList.remove('closed'))
}

/* ---------------- Scroll reveal ---------------- */
function reveals() {
  document.querySelectorAll('[data-stagger]').forEach((wrap) => {
    const step = Number(wrap.dataset.stagger) || 90
    ;[...wrap.children].forEach((ch, i) => {
      if (!ch.hasAttribute('data-reveal')) ch.setAttribute('data-reveal', wrap.dataset.revealType || 'up')
      ch.style.setProperty('--delay', `${i * step}ms`)
    })
  })
  const els = document.querySelectorAll('[data-reveal], .kolam.draw-on-view, [data-count]')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'))
    document.querySelectorAll('[data-count]').forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || '')))
    return
  }
  // Clip-path reveals start fully clipped, which Chrome reports as "not intersecting",
  // so those are watched through their parent element instead.
  const proxies = new Map()
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        const targets = proxies.get(en.target) || [en.target]
        targets.forEach((t) => {
          t.classList.add('in')
          if (t.dataset.count) countUp(t)
        })
        io.unobserve(en.target)
      }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  els.forEach((el) => {
    const clipped = ['mask', 'arch'].includes(el.dataset.reveal)
    const watch = clipped ? el.parentElement : el
    if (clipped) {
      if (!proxies.has(watch)) proxies.set(watch, [...els].includes(watch) ? [watch] : [])
      proxies.get(watch).push(el)
    }
    io.observe(watch)
  })
}

function countUp(el) {
  const end = Number(el.dataset.count)
  const suffix = el.dataset.suffix || ''
  const dur = 1800
  const t0 = performance.now()
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur)
    const eased = 1 - Math.pow(1 - p, 4)
    el.textContent = Math.round(end * eased) + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ---------------- Parallax ---------------- */
function parallax() {
  const items = [...document.querySelectorAll('[data-parallax]')]
  if (!items.length || reduceMotion) return
  let ticking = false
  const update = () => {
    const vh = window.innerHeight
    items.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > vh + 200) return
      const speed = Number(el.dataset.parallax) || 0.15
      const offset = (r.top + r.height / 2 - vh / 2) * speed
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    })
    ticking = false
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }, { passive: true })
  update()
}

/* ---------------- Diya cursor glow ---------------- */
function cursor() {
  if (!finePointer || reduceMotion) return
  const c = document.createElement('div')
  c.className = 'cursor-glow'
  c.innerHTML = '<span></span>'
  document.body.appendChild(c)
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y
  window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; c.classList.add('on') }, { passive: true })
  document.addEventListener('mouseleave', () => c.classList.remove('on'))
  document.addEventListener('mouseover', (e) => c.classList.toggle('big', !!e.target.closest('a,button,[data-cursor]')))
  const loop = () => {
    cx += (x - cx) * 0.18
    cy += (y - cy) * 0.18
    c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
    requestAnimationFrame(loop)
  }
  loop()
}

/* ---------------- Flower shower (pushpa varsha) ---------------- */
export function flowerShower({ count = 90, duration = 5200, container = document.body, continuous = false } = {}) {
  const cv = document.createElement('canvas')
  cv.className = continuous ? 'petal-canvas local' : 'petal-canvas'
  container.appendChild(cv)
  const ctx = cv.getContext('2d')
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  let W, H
  const size = () => {
    const r = continuous ? container.getBoundingClientRect() : { width: innerWidth, height: innerHeight }
    W = r.width; H = r.height
    cv.width = W * dpr; cv.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  size()
  window.addEventListener('resize', size)
  const colors = ['#ff9f1c', '#ffbf00', '#f77f00', '#ffd166', '#fffaf0', '#e63946']
  const mk = (initial) => ({
    x: Math.random() * W,
    y: initial ? -Math.random() * H * (continuous ? 1 : 0.9) - 20 : -20,
    r: 4 + Math.random() * 6,
    vy: 0.8 + Math.random() * 1.6,
    vx: -0.6 + Math.random() * 1.2,
    rot: Math.random() * Math.PI,
    vr: -0.05 + Math.random() * 0.1,
    sway: Math.random() * Math.PI * 2,
    c: colors[(Math.random() * colors.length) | 0],
  })
  const petals = Array.from({ length: count }, () => mk(true))
  const t0 = performance.now()
  let raf
  const draw = (t) => {
    ctx.clearRect(0, 0, W, H)
    const elapsed = t - t0
    const fade = continuous ? 1 : Math.max(0, 1 - Math.max(0, elapsed - duration + 1200) / 1200)
    ctx.globalAlpha = fade
    petals.forEach((p) => {
      p.sway += 0.02
      p.x += p.vx + Math.sin(p.sway) * 0.6
      p.y += p.vy
      p.rot += p.vr
      if (continuous && p.y > H + 20) Object.assign(p, mk(false))
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.c
      ctx.beginPath()
      ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
    if (continuous || elapsed < duration) raf = requestAnimationFrame(draw)
    else cv.remove()
  }
  raf = requestAnimationFrame(draw)
  return () => { cancelAnimationFrame(raf); cv.remove() }
}

/* ---------------- Temple-door entrance (home, once per session) ---------------- */
export function entrance(onOpen) {
  const seen = sessionStorage.getItem('dm-entered') === '1'
  if (seen) { document.documentElement.classList.remove('pre-enter'); onOpen?.(false); return }
  sessionStorage.setItem('dm-entered', '1')

  const greetings = [
    { word: 'வணக்கம்', tr: 'Vanakkam · Tamil' },
    { word: 'నమస్కారం', tr: 'Namaskaram · Telugu' },
    { word: 'നമസ്കാരം', tr: 'Namaskaram · Malayalam' },
    { word: 'ನಮಸ್ಕಾರ', tr: 'Namaskara · Kannada' },
    { word: 'Welcome', tr: 'Please, step inside' },
  ]
  const studs = Array.from({ length: 4 }, () => '<i></i>').join('')
  const pre = document.createElement('div')
  pre.className = 'entrance'
  pre.innerHTML = `
    <div class="door door-l"><div class="door-panel">${studs}</div><div class="door-panel">${studs}</div><span class="door-ring"></span></div>
    <div class="door door-r"><div class="door-panel">${studs}</div><div class="door-panel">${studs}</div><span class="door-ring"></span></div>
    <div class="entrance-center">
      ${kolamSVG('entrance-kolam')}
      <div class="entrance-diya">${diyaSVG()}</div>
      <img class="entrance-logo" src="/desi-madrasi-restaurant-logo.jpeg" alt="">
      <sup class="tm entrance-tm" aria-hidden="true">TM</sup>
      <div class="greet">${greetings.map((g, i) => `<div class="greet-item" style="--i:${i}"><span class="gw">${g.word}</span><span class="gt">${g.tr}</span></div>`).join('')}</div>
    </div>
    <button class="entrance-skip">Skip ›</button>`
  document.body.appendChild(pre)
  document.body.classList.add('is-entering')
  document.documentElement.classList.remove('pre-enter')

  let done = false
  const open = () => {
    if (done) return
    done = true
    pre.classList.add('open')
    document.body.classList.remove('is-entering')
    onOpen?.(true)
    setTimeout(() => pre.remove(), 1500)
  }
  pre.querySelector('.entrance-skip').addEventListener('click', open)
  setTimeout(() => pre.classList.add('play'), 30)
  setTimeout(open, 3200)
}

/* ---------------- Inner page hero helper ---------------- */
function pageHero() {
  const hero = document.querySelector('.page-hero')
  if (!hero) return
  hero.querySelector('.ph-kolam')?.insertAdjacentHTML('beforeend', kolamSVG('drawn slow-spin'))
  // Framed real photo of the restaurant's food on every inner-page banner
  const pick = { about: 'realPots', menu: 'realBiryaniLeaf', services: 'realComboTray', gallery: 'realBagaraLeaf', contact: 'realBiryaniLeaf' }
  const real = REAL.find((r) => r.key === pick[document.body.dataset.page]) || REAL[0]
  hero.insertAdjacentHTML('beforeend', `<figure class="polaroid ph-photo"><img src="${real.src}" alt="${real.cap}" /><figcaption>Real plate · Desi Madrasi</figcaption></figure>`)
  setTimeout(() => hero.classList.add('in'), 60)
}

/* ---------------- Hydrate data-* placeholders ---------------- */
function hydrate() {
  document.querySelectorAll('[data-img]').forEach((el) => {
    const url = IMG[el.dataset.img]
    if (!url) return
    if (el.tagName === 'IMG') {
      el.src = url.replace('w=1600', `w=${el.dataset.w || 1000}`)
      el.addEventListener('error', () => el.closest('figure')?.classList.add('img-missing'), { once: true })
    } else if (!el.classList.contains('promise-item')) {
      el.style.backgroundImage = `url("${url}")`
    }
  })
  document.querySelectorAll('[data-bg]').forEach((el) => (el.style.backgroundImage = `url("${IMG[el.dataset.bg]}")`))
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const words = el.dataset.marquee.split('|').map((w) => `<span>${w}</span>`).join('')
    el.innerHTML = words + words
  })
  document.querySelectorAll('.diya-slot, .badge-diya').forEach((el) => (el.innerHTML = diyaSVG()))
  // lazy map iframe
  const maps = document.querySelectorAll('[data-map-embed]')
  if (maps.length) {
    const load = (el) => (el.innerHTML = `<iframe src="${mapEmbed}" title="Map to ${SITE.fullName}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`)
    const mio = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { load(e.target); mio.unobserve(e.target) } }), { rootMargin: '300px' })
    maps.forEach((m) => mio.observe(m))
  }
}

/* ---------------- Init ---------------- */
export function initSite(page) {
  hydrate()
  document.body.dataset.page = page
  renderHeader(page)
  renderFooter()
  curtain()
  pageHero()
  reveals()
  parallax()
  cursor()
  document.querySelectorAll('[data-kolam]').forEach((el) => (el.innerHTML = kolamSVG(el.dataset.kolam)))
  document.querySelectorAll('[data-greeting]').forEach((el) => {
    const g = timeGreeting()
    el.innerHTML = `<strong>${g.hello}!</strong> ${g.line}`
  })
  document.querySelectorAll('[data-tel]').forEach((a) => (a.href = telLink))
  document.querySelectorAll('[data-wa]').forEach((a) => (a.href = waLink(a.dataset.wa || undefined)))
  document.querySelectorAll('[data-map]').forEach((a) => (a.href = mapLink))
  document.querySelectorAll('[data-phone-text]').forEach((el) => (el.textContent = SITE.phoneDisplay))
  document.querySelectorAll('[data-email-text]').forEach((el) => (el.textContent = SITE.email))
  // Accordions (FAQ)
  document.querySelectorAll('.accordion-item button').forEach((b) =>
    b.addEventListener('click', () => {
      const item = b.closest('.accordion-item')
      const isOpen = item.classList.toggle('open')
      b.setAttribute('aria-expanded', String(isOpen))
    }),
  )
}
