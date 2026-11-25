// Vite plugin: SEO + AI-crawler support, generated from the same data the site uses.
//  - canonical URL, Open Graph / Twitter tags and Restaurant structured data on every page
//  - full menu written into menu.html (plus Menu structured data) so crawlers that
//    don't run JavaScript still see every dish and price
//  - robots.txt, sitemap.xml and llms.txt (served in dev, emitted on build)
import { basename } from 'node:path'
import { SITE, REAL, IMG } from './src/js/site.js'
import { MENU } from './src/js/menu-data.js'
import { menuSectionsHTML, menuTabsHTML } from './src/js/menu-render.js'
import { headerHTML, footerHTML } from './src/js/chrome.js'

const PAGES = [
  { file: 'index.html', path: '/', priority: '1.0', id: 'home' },
  { file: 'menu.html', path: '/menu.html', priority: '0.9', id: 'menu' },
  { file: 'about.html', path: '/about.html', priority: '0.7', id: 'about' },
  { file: 'services.html', path: '/services.html', priority: '0.7', id: 'services' },
  { file: 'gallery.html', path: '/gallery.html', priority: '0.6', id: 'gallery' },
  { file: 'contact.html', path: '/contact.html', priority: '0.8', id: 'contact' },
]

const abs = (p) => SITE.url + p
const OG_IMAGE = abs('/og-image.png')
const pad = (h) => String(h).padStart(2, '0') + ':00'
const today = new Date().toISOString().slice(0, 10)
const socials = Object.values(SITE.socials).filter((u) => u && u !== '#')

const restaurantLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': abs('/#restaurant'),
  name: SITE.fullName,
  alternateName: SITE.name,
  slogan: SITE.tagline,
  url: abs('/'),
  logo: abs('/desi-madrasi-restaurant-logo.jpeg'),
  image: [OG_IMAGE, ...REAL.map((r) => abs(r.src))],
  telephone: '+' + SITE.phoneIntl,
  email: SITE.email,
  priceRange: '₹₹',
  servesCuisine: ['Hyderabadi', 'South Indian', 'Biryani', 'Andhra', 'Tamil'],
  acceptsReservations: true,
  hasMenu: abs('/menu.html'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pillar No. 38, 1st Floor, above Ramraj Cotton, near Bajaj Electronics, Gachibowli – Miyapur Road',
    addressLocality: 'Kondapur, Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: pad(SITE.openHour),
      closes: pad(SITE.closeHour),
    },
  ],
  ...(socials.length ? { sameAs: socials } : {}),
})

const menuLD = () => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `${SITE.fullName} Menu`,
  url: abs('/menu.html'),
  inLanguage: 'en',
  hasMenuSection: MENU.map((cat) => ({
    '@type': 'MenuSection',
    name: cat.title,
    description: cat.desc,
    hasMenuItem: cat.items.map((it) => ({
      '@type': 'MenuItem',
      name: it.n,
      description: it.d,
      offers: { '@type': 'Offer', price: String(it.p), priceCurrency: 'INR' },
      ...(it.nv ? {} : { suitableForDiet: 'https://schema.org/VegetarianDiet' }),
    })),
  })),
})

const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

function headTags(page, html) {
  const title = (html.match(/<title>(.*?)<\/title>/s) || [])[1] || SITE.fullName
  const desc = (html.match(/name="description" content="(.*?)"/s) || [])[1] || ''
  const url = abs(page.path)
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    html.includes('property="og:title"') ? '' : `<meta property="og:title" content="${title}" />`,
    html.includes('property="og:description"') ? '' : `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:type" content="${page.file === 'index.html' ? 'restaurant.restaurant' : 'website'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${SITE.fullName}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE.fullName} — bagara, biryani and combos served on a banana leaf" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    ld(restaurantLD()),
    page.file === 'menu.html' ? ld(menuLD()) : '',
  ]
  return tags.filter(Boolean).map((t) => '    ' + t).join('\n')
}

/* ---------------- Generated text files ---------------- */
const robotsTxt = () => `# ${SITE.fullName}
User-agent: *
Allow: /

# AI assistants and search crawlers are welcome
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`

const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.map(
  (p) => `  <url>
    <loc>${abs(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>${
      p.file === 'index.html' || p.file === 'gallery.html'
        ? REAL.map((r) => `\n    <image:image><image:loc>${abs(r.src)}</image:loc></image:image>`).join('')
        : ''
    }
  </url>`,
).join('\n')}
</urlset>
`

const llmsTxt = () => `# ${SITE.fullName}

> ${SITE.tagline}. A restaurant in Kondapur, Hyderabad, where Hyderabadi bagara rice and dum biryani meet Madras-style (Madrasi) biryani and Tamil sukka. Meals are served on a banana leaf. Dine-in, takeaway, office lunches and outdoor catering.

- Address: ${SITE.addressLines.join(', ')}
- Phone / WhatsApp: ${SITE.phoneDisplay}
- Email: ${SITE.email}
- Open daily: ${SITE.hours.map((h) => `${h.label} ${h.time}`).join('; ')}
- Prices are in Indian Rupees (₹), exclusive of GST.

## Pages

${PAGES.map((p) => `- [${p.file === 'index.html' ? 'Home' : p.file.replace('.html', '').replace(/^./, (c) => c.toUpperCase())}](${abs(p.path)})`).join('\n')}

## Menu

${MENU.map(
  (cat) => `### ${cat.title}

${cat.desc}

${cat.items.map((it) => `- ${it.n} — ₹${it.p}${it.nv ? ' (non-veg)' : ' (veg)'}${it.badge ? ` [${it.badge}]` : ''}: ${it.d}`).join('\n')}`,
).join('\n\n')}
`

const FILES = {
  '/robots.txt': ['text/plain', robotsTxt],
  '/sitemap.xml': ['application/xml', sitemapXml],
  '/llms.txt': ['text/plain', llmsTxt],
}

export default function seoPlugin() {
  return {
    name: 'desi-madrasi-seo',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const f = FILES[req.url.split('?')[0]]
        if (!f) return next()
        res.setHeader('Content-Type', `${f[0]}; charset=utf-8`)
        res.end(f[1]())
      })
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const file = basename(ctx.filename)
        const page = PAGES.find((p) => p.file === file)
        if (!page) return html
        let out = html.replace('</head>', headTags(page, html) + '\n  </head>')
        // Header + footer written into the HTML; layout.js reuses them instead of building new ones
        out = out.replace('<body>', `<body>\n    ${headerHTML(page.id)}`)
        out = out.replace(/(\s*<script type="module" src="\/src\/js\/pages\/)/, `\n    ${footerHTML()}$1`)
        if (file === 'menu.html') {
          out = out
            .replace('<div class="menu-tabs" role="tablist" aria-label="Menu categories"></div>', `<div class="menu-tabs" role="tablist" aria-label="Menu categories">${menuTabsHTML(MENU)}</div>`)
            .replace('<div id="menu-list"></div>', `<div id="menu-list">${menuSectionsHTML(MENU, IMG)}</div>`)
        }
        return out
      },
    },
    generateBundle() {
      for (const [name, [, make]] of Object.entries(FILES)) {
        this.emitFile({ type: 'asset', fileName: name.slice(1), source: make() })
      }
    },
  }
}
