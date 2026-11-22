// ------------------------------------------------------------
//  Central business details — edit here and every page updates.
// ------------------------------------------------------------
export const SITE = {
  name: 'Desi Madrasi',
  fullName: 'Desi Madrasi Restaurant',
  tagline: 'Tradition meets the taste',
  phone: '8106787523',
  phoneDisplay: '+91 81067 87523',
  phoneIntl: '918106787523',
  email: 'info@desimadrasirestaurant.in',
  addressLines: [
    'Pillar No. 38, 1st Floor',
    'Gachibowli – Miyapur Road, Kondapur',
    'Above Ramraj Cotton, near Bajaj Electronics',
    'Hyderabad, Telangana',
  ],
  addressShort: 'Pillar No. 38, 1st Floor, Gachibowli – Miyapur Rd, Kondapur, Hyderabad',
  mapQuery:
    'Pillar No 38, Kondapur, Gachibowli - Miyapur Rd, above Ramraj Cotton, near Bajaj Electronics, Hyderabad',
  // Opening hours (24h). Update to match the real timings.
  hours: [
    { label: 'Morning Tiffin', time: '7:00 AM – 11:30 AM' },
    { label: 'Lunch & Meals', time: '12:00 PM – 3:30 PM' },
    { label: 'Evening Snacks & Kaapi', time: '4:00 PM – 6:30 PM' },
    { label: 'Dinner', time: '7:00 PM – 11:00 PM' },
  ],
  openHour: 7,
  closeHour: 23,
  socials: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
}

export const telLink = `tel:+91${SITE.phone}`
export const mailLink = `mailto:${SITE.email}`
export const waLink = (text = 'Vanakkam! I would like to know more about Desi Madrasi.') =>
  `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(text)}`
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`
export const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=16&output=embed`

// ------------------------------------------------------------
//  Photography (Unsplash, free licence). Replace with your own
//  restaurant photos later — just swap the URL.
// ------------------------------------------------------------
const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export const IMG = {
  interiorWarm: u('1590846406792-0adc7f938f1d'),
  interiorHall: u('1552566626-52f8b828add9'),
  interiorDining: u('1414235077428-338989a2e8c0'),
  interiorModern: u('1555396273-367ea4eb4db5'),
  chefFlame: u('1600565193348-f74bd3c7ccdf'),
  bananaLeafMeal: u('1625398407796-82650a8c135f'),
  masalaDosa: u('1668236543090-82eba5ee5976'),
  dosaLeaf: u('1694849789325-914b71ab4075'),
  plainDosa: u('1708146464361-5c5ce4f9abb6'),
  dosaSambar: u('1567337710282-00832b415979'),
  idliVada: u('1630383249896-424e482df921'),
  idliLeaf: u('1589301760014-d929f3979dbc'),
  uttapam: u('1610192244261-3f33de3f55e4'),
  paniyaram: u('1606491956689-2ea866880c84'),
  filterCoffee: u('1495474472287-4d71bcdd2085'),
  biryani: u('1563379091339-03b21ab4a4f8'),
  tomatoRice: u('1645177628172-a94c1f96e6db'),
  leafPulao: u('1642821373181-696a54913e93'),
  chettinadCurry: u('1596797038530-2c107229654b'),
  redCurry: u('1585937421612-70a008356fbe'),
  fishCurry: u('1574653853027-5382a3d23a15'),
  chickenCurry: u('1631515243349-e0cb75fb8d3a'),
  paneer: u('1588166524941-3bf61a9c41db'),
  palak: u('1589647363585-f4a7d3877b10'),
  thali: u('1546833999-b9f581a1996d'),
  spiceThali: u('1626777552726-4a6b54c97e46'),
  samosa: u('1601050690597-df0568f70950'),
  kebab: u('1599487488170-d11ec9c172f0'),
  upma: u('1512058564366-18510be2db19'),
  riceBowl: u('1630851840633-f96999247032'),
  tableSpread: u('1576867757603-05b134ebc379'),
  friendsDining: u('1466978913421-dad2ebd01d17'),
  friendsTable: u('1424847651672-bf20a4b0982b'),
  crowd: u('1528605248644-14dd04022da1'),
  candleDining: u('1533777857889-4be7c70b33f7'),
  kitchenBar: u('1514933651103-005eec06c04b'),
}
