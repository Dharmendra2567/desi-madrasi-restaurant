// Hand-built SVG ornaments inspired by South Indian kolam, diya and temple art.

const petal = (deg) =>
  `<path class="k-line" pathLength="1" transform="rotate(${deg} 100 100)" d="M100 100 C 78 72, 80 42, 100 22 C 120 42, 122 72, 100 100Z"/>`
const loop = (deg) =>
  `<circle class="k-line" pathLength="1" transform="rotate(${deg} 100 100)" cx="100" cy="13" r="8"/>`
const dot = (deg, r = 62) =>
  `<circle class="k-dot" transform="rotate(${deg} 100 100)" cx="100" cy="${100 - r}" r="3"/>`

const angles = [0, 45, 90, 135, 180, 225, 270, 315]

export const kolamSVG = (cls = '') => `
<svg class="kolam ${cls}" viewBox="0 0 200 200" aria-hidden="true" fill="none">
  <circle class="k-line" pathLength="1" cx="100" cy="100" r="94"/>
  <circle class="k-line k-thin" pathLength="1" cx="100" cy="100" r="40"/>
  ${angles.map(petal).join('')}
  ${angles.map(loop).join('')}
  ${angles.map((a) => dot(a + 22.5)).join('')}
  ${angles.map((a) => dot(a + 22.5, 84)).join('')}
  <circle class="k-line" pathLength="1" cx="100" cy="100" r="9"/>
  <circle class="k-dot" cx="100" cy="100" r="3.5"/>
</svg>`

export const diyaSVG = (cls = '') => `
<svg class="diya ${cls}" viewBox="0 0 120 140" aria-hidden="true">
  <defs>
    <radialGradient id="flameG" cx="50%" cy="70%" r="60%">
      <stop offset="0%" stop-color="#fff7c2"/>
      <stop offset="45%" stop-color="#ffc93c"/>
      <stop offset="100%" stop-color="#ff6a00" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bowlG" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#e7b45a"/>
      <stop offset="100%" stop-color="#8a5a1c"/>
    </linearGradient>
  </defs>
  <circle class="diya-glow" cx="60" cy="48" r="42" fill="url(#flameG)" opacity=".35"/>
  <path class="diya-flame" d="M60 12 C 76 36, 73 58, 60 66 C 47 58, 44 36, 60 12Z" fill="url(#flameG)"/>
  <path class="diya-core" d="M60 40 C 66 50, 65 60, 60 64 C 55 60, 54 50, 60 40Z" fill="#fffbe6"/>
  <path d="M10 78 Q60 138 110 78 Q86 90 60 90 Q34 90 10 78Z" fill="url(#bowlG)"/>
  <ellipse cx="60" cy="79" rx="50" ry="9" fill="#c98e36"/>
  <ellipse cx="60" cy="79" rx="40" ry="5" fill="#6b3d10"/>
  <path d="M100 74 Q116 70 114 80 Q108 82 100 80Z" fill="#c98e36"/>
</svg>`

export const leafDividerSVG = `
<svg class="leaf-divider" viewBox="0 0 320 40" aria-hidden="true">
  <path d="M0 20 H120" />
  <path d="M200 20 H320" />
  <path class="ld-leaf" d="M160 4 C 176 12, 176 28, 160 36 C 144 28, 144 12, 160 4Z"/>
  <circle cx="132" cy="20" r="3"/><circle cx="188" cy="20" r="3"/>
  <circle cx="142" cy="20" r="2"/><circle cx="178" cy="20" r="2"/>
</svg>`

export const steamSVG = `
<svg class="steam" viewBox="0 0 60 80" aria-hidden="true" fill="none">
  <path d="M15 78 C 5 60, 25 50, 15 30 C 8 18, 18 8, 15 0"/>
  <path d="M30 78 C 20 60, 40 50, 30 30 C 23 18, 33 8, 30 0"/>
  <path d="M45 78 C 35 60, 55 50, 45 30 C 38 18, 48 8, 45 0"/>
</svg>`

// Fallback emblem when /logo.png is not present yet
export const emblemSVG = `
<svg class="emblem" viewBox="0 0 64 64" aria-hidden="true">
  <circle cx="32" cy="32" r="30" fill="#6b0f1a" stroke="#e0a526" stroke-width="2"/>
  <path d="M32 12 C 42 22, 42 36, 32 46 C 22 36, 22 22, 32 12Z" fill="#2f5d34" stroke="#e0a526" stroke-width="1.5"/>
  <path d="M32 16 V44" stroke="#e0a526" stroke-width="1"/>
  <circle cx="32" cy="52" r="2.4" fill="#e0a526"/>
  <circle cx="20" cy="48" r="1.6" fill="#e0a526"/><circle cx="44" cy="48" r="1.6" fill="#e0a526"/>
</svg>`

export const icon = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.5 2.1-.8 1.3L11 13V7h2z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1a8.2 8.2 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 13.8 13.8 0 0 0 5.3 4.7c2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.9 7.1c-.1-1.6-.4-3-1.6-4.2-1.2-1.2-2.6-1.5-4.2-1.6C14.4 1.2 9.6 1.2 7.9 1.3 6.3 1.4 4.9 1.7 3.7 2.9 2.5 4.1 2.2 5.5 2.1 7.1 2 8.8 2 15.2 2.1 16.9c.1 1.6.4 3 1.6 4.2 1.2 1.2 2.6 1.5 4.2 1.6 1.7.1 6.5.1 8.2 0 1.6-.1 3-.4 4.2-1.6 1.2-1.2 1.5-2.6 1.6-4.2.1-1.7.1-8.1 0-9.8zm-2.2 11.7a3.3 3.3 0 0 1-1.9 1.9c-1.3.5-4.4.4-5.8.4s-4.5.1-5.8-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.4-.4-5.8s-.1-4.5.4-5.8a3.3 3.3 0 0 1 1.9-1.9c1.3-.5 4.4-.4 5.8-.4s4.5-.1 5.8.4a3.3 3.3 0 0 1 1.9 1.9c.5 1.3.4 4.4.4 5.8s.1 4.5-.4 5.8z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.3 2 10 3.6 10 6.2V8H8v3h2v11h4V11h2.7l.3-3z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15V9l5.8 3z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 3S9 2 5 8c-3 4.5-1 9-1 9s4.5 2 9-1c6-4 7-13 7-13zM6.4 17.6 15 9"/></svg>',
}
