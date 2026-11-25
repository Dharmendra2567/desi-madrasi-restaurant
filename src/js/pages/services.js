import { initSite } from '../layout.js'

initSite('services')

// Open a section directly when arriving with a hash (e.g. /services.html#catering)
if (location.hash) {
  const t = document.querySelector(location.hash)
  if (t) setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'center' }), 700)
}
