const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* =========================================================
   Hero: circular "doorway" reveal + walk-in zoom + parallax
   ========================================================= */
export function heroCarousel(root, { interval = 7000 } = {}) {
  const slides = [...root.querySelectorAll('.slide')]
  const dotsWrap = root.querySelector('.hero-dots')
  const cur = root.querySelector('.hc-cur')
  root.querySelector('.hc-total').textContent = String(slides.length).padStart(2, '0')
  root.style.setProperty('--dur', `${interval}ms`)

  dotsWrap.innerHTML = slides
    .map((s, i) => `<button class="hero-dot" role="tab" aria-label="Slide ${i + 1}: ${s.dataset.label}"><span>${s.dataset.label}</span><i></i></button>`)
    .join('')
  const dots = [...dotsWrap.children]

  let index = 0
  let timer = null
  let started = false

  const setActive = (i, origin) => {
    if (i === index && started) return
    const prev = slides[index]
    const next = slides[i]
    if (prev !== next) {
      prev.classList.remove('active')
      prev.classList.add('leaving')
      setTimeout(() => prev.classList.remove('leaving'), 1500)
    }
    next.style.setProperty('--cx', origin?.x ?? '50%')
    next.style.setProperty('--cy', origin?.y ?? '55%')
    // restart line animation
    next.classList.remove('active')
    void next.offsetWidth
    next.classList.add('active')
    dots.forEach((d, k) => {
      d.classList.toggle('active', k === i)
      d.setAttribute('aria-selected', String(k === i))
      // restart progress bar
      const bar = d.querySelector('i')
      bar.style.animation = 'none'
      void bar.offsetWidth
      bar.style.animation = ''
    })
    cur.textContent = String(i + 1).padStart(2, '0')
    index = i
  }

  const go = (dir, origin) => setActive((index + dir + slides.length) % slides.length, origin)
  const schedule = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (!root.classList.contains('paused')) go(1)
      schedule()
    }, interval)
  }

  root.querySelector('.hero-arrow.next').addEventListener('click', () => { go(1, { x: '100%', y: '50%' }); schedule() })
  root.querySelector('.hero-arrow.prev').addEventListener('click', () => { go(-1, { x: '0%', y: '50%' }); schedule() })
  dots.forEach((d, i) => d.addEventListener('click', () => { setActive(i); schedule() }))

  // keyboard
  root.tabIndex = 0
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { go(1, { x: '100%', y: '50%' }); schedule() }
    if (e.key === 'ArrowLeft') { go(-1, { x: '0%', y: '50%' }); schedule() }
  })

  // swipe
  let sx = 0, sy = 0
  root.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY }, { passive: true })
  root.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx
    const dy = e.changedTouches[0].clientY - sy
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1, { x: dx < 0 ? '100%' : '0%', y: '50%' })
      schedule()
    }
  })

  // pause when hovering text / tab hidden
  root.querySelector('.hero-ui').addEventListener('mouseenter', () => root.classList.add('paused'))
  root.querySelector('.hero-ui').addEventListener('mouseleave', () => root.classList.remove('paused'))
  document.addEventListener('visibilitychange', () => root.classList.toggle('paused', document.hidden))

  // mouse parallax depth
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const track = root.querySelector('.hero-track')
    let tx = 0, ty = 0, cx = 0, cy = 0
    root.addEventListener('mousemove', (e) => {
      const r = root.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * -24
      ty = ((e.clientY - r.top) / r.height - 0.5) * -16
    })
    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      track.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0) scale(1.03)`
      slides[index].querySelector('.slide-text').style.transform = `translate3d(${(-cx * 0.6).toFixed(2)}px, ${(-cy * 0.6).toFixed(2)}px, 0)`
      requestAnimationFrame(loop)
    }
    loop()
  }

  return {
    start() {
      started = true
      setActive(0)
      schedule()
    },
  }
}

/* =========================================================
   Coverflow: 3D arch-shaped dish cards
   ========================================================= */
export function coverflow(root, items, { dotsEl, prevBtn, nextBtn, interval = 4200 } = {}) {
  root.innerHTML = items
    .map(
      (it, i) => `
      <article class="cf-card" data-i="${i}" tabindex="0" aria-label="${it.name}">
        <img src="${it.img}" alt="${it.name}" loading="lazy" draggable="false">
        <div class="cf-info">
          <span class="tag">${it.tag}</span>
          <h3>${it.name}</h3>
          <p>${it.desc}</p>
          <span class="price">₹${it.price}</span>
        </div>
      </article>`,
    )
    .join('')
  const cards = [...root.children]
  const n = cards.length
  let active = 0
  dotsEl.innerHTML = cards.map((_, i) => `<button aria-label="Show dish ${i + 1}"></button>`).join('')
  const dots = [...dotsEl.children]

  const layout = () => {
    const w = root.clientWidth
    const spread = w < 640 ? 0.55 : 0.7
    cards.forEach((c, i) => {
      let off = i - active
      if (off > n / 2) off -= n
      if (off < -n / 2) off += n
      const abs = Math.abs(off)
      const x = off * (c.offsetWidth * spread)
      c.style.transform = `translateX(${x}px) translateZ(${-abs * 160}px) rotateY(${off * -24}deg) scale(${1 - abs * 0.04})`
      c.style.zIndex = String(100 - abs)
      c.style.opacity = abs > 2 ? '0' : String(1 - abs * 0.18)
      c.style.filter = abs ? `brightness(${1 - abs * 0.22}) saturate(${1 - abs * 0.2})` : 'none'
      c.style.pointerEvents = abs > 2 ? 'none' : 'auto'
      c.classList.toggle('is-center', off === 0)
    })
    dots.forEach((d, i) => d.classList.toggle('active', i === active))
  }
  const go = (i) => { active = (i + n) % n; layout() }

  let timer
  const auto = () => {
    clearInterval(timer)
    timer = setInterval(() => go(active + 1), interval)
  }

  cards.forEach((c, i) => {
    c.addEventListener('click', () => { if (!dragged) { go(i); auto() } })
    c.addEventListener('keydown', (e) => e.key === 'Enter' && go(i))
  })
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); auto() }))
  prevBtn?.addEventListener('click', () => { go(active - 1); auto() })
  nextBtn?.addEventListener('click', () => { go(active + 1); auto() })
  root.addEventListener('mouseenter', () => clearInterval(timer))
  root.addEventListener('mouseleave', auto)

  // drag / swipe
  let startX = 0, dragging = false, dragged = false
  root.addEventListener('pointerdown', (e) => { dragging = true; dragged = false; startX = e.clientX })
  window.addEventListener('pointerup', (e) => {
    if (!dragging) return
    dragging = false
    const dx = e.clientX - startX
    if (Math.abs(dx) > 40) {
      dragged = true
      go(active + (dx < 0 ? 1 : -1))
      auto()
      setTimeout(() => (dragged = false), 50)
    }
  })

  window.addEventListener('resize', layout)
  layout()
  auto()
}

/* =========================================================
   Promise slider: crossfading text + swapping image
   ========================================================= */
export function promiseSlider(root, { navEl, imgEl, imgMap, interval = 6000 } = {}) {
  const items = [...root.querySelectorAll('.promise-item')]
  const labels = ['Bagara', 'Spices', 'Biryani', 'Leaf', 'Welcome']
  navEl.innerHTML = items.map((_, i) => `<button role="tab">${labels[i] || i + 1}</button>`).join('')
  const btns = [...navEl.children]
  let idx = 0
  // fit height to tallest item
  const fit = () => (root.style.minHeight = Math.max(...items.map((it) => it.scrollHeight)) + 'px')
  const show = (i) => {
    idx = i
    items.forEach((it, k) => it.classList.toggle('active', k === i))
    btns.forEach((b, k) => b.classList.toggle('active', k === i))
    const url = imgMap[items[i].dataset.img]
    if (imgEl && url) {
      imgEl.style.opacity = '0'
      imgEl.style.transform = 'scale(1.15) rotate(-4deg)'
      setTimeout(() => {
        imgEl.src = url.replace('w=1600', 'w=900')
        imgEl.onload = () => { imgEl.style.opacity = '1'; imgEl.style.transform = 'none' }
      }, 350)
    }
  }
  let t
  const auto = () => { clearInterval(t); t = setInterval(() => show((idx + 1) % items.length), interval) }
  btns.forEach((b, i) => b.addEventListener('click', () => { show(i); auto() }))
  window.addEventListener('resize', fit)
  fit()
  setTimeout(fit, 800)
  show(0)
  auto()
}
