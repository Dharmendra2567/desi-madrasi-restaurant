import { initSite, flowerShower } from '../layout.js'
import { SITE, waLink } from '../site.js'

document.getElementById('hoursBody').innerHTML = SITE.hours
  .map((h) => `<tr><td>${h.label}</td><td>${h.time}</td></tr>`)
  .join('')

initSite('contact')

const form = document.getElementById('reserveForm')
const date = form.elements.date
const today = new Date()
const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
date.min = iso(today)
date.value = iso(today)

const setErr = (el, msg) => {
  el.closest('.field').querySelector('.err').textContent = msg
  el.setAttribute('aria-invalid', msg ? 'true' : 'false')
}

const validate = () => {
  const f = form.elements
  let ok = true
  if (f.name.value.trim().length < 2) { setErr(f.name, 'Please tell us your name.'); ok = false } else setErr(f.name, '')
  const digits = f.phone.value.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
  if (!/^[6-9]\d{9}$/.test(digits)) { setErr(f.phone, 'Please enter a valid 10-digit mobile number.'); ok = false } else setErr(f.phone, '')
  if (!f.date.value) { setErr(f.date, 'Pick a date.'); ok = false } else setErr(f.date, '')
  if (!f.time.value) { setErr(f.time, 'Choose a time slot.'); ok = false } else setErr(f.time, '')
  if (!ok) form.querySelector('[aria-invalid="true"]')?.focus()
  return ok
}

const message = () => {
  const f = form.elements
  const d = new Date(f.date.value + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  return [
    'Vanakkam Desi Madrasi! I would like to reserve a table.',
    '',
    `Name: ${f.name.value.trim()}`,
    `Mobile: ${f.phone.value.trim()}`,
    `Date: ${d}`,
    `Time: ${f.time.value}`,
    `Guests: ${f.guests.value}`,
    `Occasion: ${f.occasion.value}`,
    f.notes.value.trim() ? `Notes: ${f.notes.value.trim()}` : '',
  ].filter(Boolean).join('\n')
}

const success = () => {
  form.classList.add('sent')
  flowerShower({ count: 70, duration: 4000 })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!validate()) return
  window.open(waLink(message()), '_blank', 'noopener')
  success()
})

document.getElementById('emailBtn').addEventListener('click', () => {
  if (!validate()) return
  const subject = encodeURIComponent(`Table reservation — ${form.elements.name.value.trim()}`)
  location.href = `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(message())}`
  success()
})

document.getElementById('againBtn').addEventListener('click', () => {
  form.reset()
  date.value = iso(today)
  form.classList.remove('sent')
})

form.querySelectorAll('input, select').forEach((el) => el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && setErr(el, '')))
