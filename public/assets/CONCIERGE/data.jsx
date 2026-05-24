// Concierge data - derived from the actual master sheet.
// Item statuses: 'pending' | 'review' | 'approved' | 'rejected' | 'live'
// Client status (rolled-up): 'new' | 'review' | 'ready' | 'live'

const SEED_CLIENTS = [
  {
    id: 'diane',
    name: 'Diane O’Sullivan',
    initials: 'DO',
    pickup: 'Apt 220, La Riviera B, JVC',
    pickupShort: 'JVC',
    pickupDate: '14 Mar 2026',
    status: 'review',
    estValue: 8420,
    items: [
      { id: 'd1', name: 'Monte Carlo Cowl Maxi Dress', brand: 'Oh Polly', type: 'Clothing', category: 'Dresses', size: 'UK 10', colour: 'Powder blue', condition: 'Pre-loved', shoppingType: 'SELL & RENT', price: 420, rrp: 920, status: 'approved', desc: 'Cowl-neck maxi in powder blue, satin-finish jersey. Worn twice, hemmed once at the heel.' },
      { id: 'd2', name: 'Alamea Cut-Out Bandeau Maxi', brand: 'Oh Polly', type: 'Clothing', category: 'Dresses', size: 'UK 6', colour: 'Nude', condition: 'Pre-loved', shoppingType: 'RENT', price: 180, rrp: 760, status: 'review', desc: 'Strapless bandeau with embellished cut-out at the waist. Excellent condition.' },
      { id: 'd3', name: 'Serena Embellished Heart Cup Gown', brand: 'Hire Street', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Red', condition: 'Pre-loved', shoppingType: 'RENT', price: 220, rrp: 690, status: 'approved', desc: 'Floor-length evening gown, scarlet with crystal heart-cup detail. Worn to one wedding.' },
      { id: 'd4', name: 'Linen Co-Ord Set', brand: 'Faithfull the Brand', type: 'Clothing', category: 'Sets', size: 'UK 8', colour: 'White', condition: 'Pre-loved', shoppingType: 'SELL', price: 340, rrp: 580, status: 'approved', desc: 'Two-piece, button-front top and full skirt. A little crease at the hem.' },
      { id: 'd5', name: 'Slip Dress, Bias-Cut', brand: 'Nanushka', type: 'Clothing', category: 'Dresses', size: 'UK 10', colour: 'Champagne', condition: 'Pre-loved', shoppingType: 'SELL', price: 280, rrp: 540, status: 'pending', desc: '' },
      { id: 'd6', name: 'Wool Tailored Blazer', brand: 'Acne Studios', type: 'Clothing', category: 'Outerwear', size: 'UK 10', colour: 'Charcoal', condition: 'Pre-loved', shoppingType: 'SELL', price: 460, rrp: 1100, status: 'live', desc: 'Single-breasted, structured shoulder. Lining intact.' },
      { id: 'd7', name: 'Strappy Heeled Sandal', brand: 'Aquazzura', type: 'Shoe', category: 'Heels', size: 'EU 38', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL & RENT', price: 520, rrp: 1450, status: 'rejected', desc: 'Heel tip slightly scuffed; otherwise excellent.' },
      { id: 'd8', name: 'Quilted Mini Bag', brand: 'Bottega Veneta', type: 'Accessory', category: 'Bags', size: 'One size', colour: 'Cream', condition: 'Pre-loved', shoppingType: 'SELL', price: 1100, rrp: 2400, status: 'live', desc: 'Intrecciato weave, gold-tone hardware. Dust-bag included.' },
      { id: 'd9', name: 'Silk Maxi, Floral', brand: 'Zimmermann', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Multi', condition: 'Pre-loved', shoppingType: 'RENT', price: 240, rrp: 850, status: 'review', desc: '' },
    ],
  },
  {
    id: 'mona',
    name: 'Mona Al Mansoori',
    initials: 'MA',
    pickup: 'Villa 12, Jumeirah Park',
    pickupShort: 'Jumeirah',
    pickupDate: '12 Mar 2026',
    status: 'ready',
    estValue: 12480,
    items: [
      { id: 'm1', name: 'Jasmina Astoria Floral Midi', brand: 'Faithfull the Brand', type: 'Clothing', category: 'Dresses', size: 'UK 6', colour: 'Printed', condition: 'Pre-loved', shoppingType: 'SELL & RENT', price: 320, rrp: 540, status: 'approved' },
      { id: 'm2', name: 'Rilo Midi Dress', brand: 'Nanushka', type: 'Clothing', category: 'Dresses', size: 'S', colour: 'Orange', condition: 'Pre-loved', shoppingType: 'SELL', price: 380, rrp: 690, status: 'approved' },
      { id: 'm3', name: 'Beth Tweed Mini Dress', brand: 'Self-Portrait', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Pink', condition: 'Pre-loved', shoppingType: 'SELL & RENT', price: 290, rrp: 480, status: 'approved' },
      { id: 'm4', name: 'Cropped Wool Cardigan', brand: 'Khaite', type: 'Clothing', category: 'Knitwear', size: 'S', colour: 'Cream', condition: 'Pre-loved', shoppingType: 'SELL', price: 540, rrp: 980, status: 'approved' },
      { id: 'm5', name: 'High-Waist Trouser', brand: 'The Row', type: 'Clothing', category: 'Bottoms', size: 'UK 8', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL', price: 620, rrp: 1340, status: 'approved' },
      { id: 'm6', name: 'Leather Mule', brand: 'The Row', type: 'Shoe', category: 'Flats', size: 'EU 37', colour: 'Tan', condition: 'Pre-loved', shoppingType: 'SELL', price: 480, rrp: 1080, status: 'approved' },
      { id: 'm7', name: 'Silk Scarf, Hand-Rolled', brand: 'Hermès', type: 'Accessory', category: 'Scarves', size: '90cm', colour: 'Coral', condition: 'New with tags', shoppingType: 'SELL', price: 720, rrp: 1450, status: 'approved' },
      { id: 'm8', name: 'Pearl Drop Earrings', brand: 'Mizuki', type: 'Accessory', category: 'Jewellery', size: 'One size', colour: 'White', condition: 'Pre-loved', shoppingType: 'SELL', price: 380, rrp: 720, status: 'approved' },
    ],
  },
  {
    id: 'isabel',
    name: 'Isabel Moore',
    initials: 'IM',
    pickup: 'Marina Residence 5, The Palm',
    pickupShort: 'The Palm',
    pickupDate: '- awaiting',
    status: 'new',
    estValue: 4200,
    items: [
      { id: 'i1', name: 'Aura Dress - Gold', brand: 'Isabel Moore', type: 'Clothing', category: 'Dresses', size: 'S', colour: 'Gold', condition: 'New with tags', shoppingType: 'SELL & RENT', price: 480, rrp: 920, status: 'pending' },
      { id: 'i2', name: 'Aura Dress - Silver', brand: 'Isabel Moore', type: 'Clothing', category: 'Dresses', size: 'S', colour: 'Silver', condition: 'New with tags', shoppingType: 'SELL & RENT', price: 480, rrp: 920, status: 'pending' },
      { id: 'i3', name: 'Aura Dress - Gunmetal', brand: 'Isabel Moore', type: 'Clothing', category: 'Dresses', size: 'M', colour: 'Gunmetal', condition: 'New with tags', shoppingType: 'SELL & RENT', price: 480, rrp: 920, status: 'pending' },
      { id: 'i4', name: 'Aura Dress - Black', brand: 'Isabel Moore', type: 'Clothing', category: 'Dresses', size: 'M', colour: 'Black', condition: 'New with tags', shoppingType: 'SELL & RENT', price: 480, rrp: 920, status: 'pending' },
      { id: 'i5', name: 'Slip Dress - Pearl', brand: 'Isabel Moore', type: 'Clothing', category: 'Dresses', size: 'S', colour: 'Pearl', condition: 'New with tags', shoppingType: 'SELL', price: 420, rrp: 780, status: 'pending' },
      { id: 'i6', name: 'Slip Dress - Inkwell', brand: 'Isabel Moore', type: 'Clothing', category: 'Dresses', size: 'M', colour: 'Inkwell', condition: 'New with tags', shoppingType: 'SELL', price: 420, rrp: 780, status: 'pending' },
    ],
  },
  {
    id: 'amyjane',
    name: 'Amy Jane London',
    initials: 'AJ',
    pickup: 'Brand pickup, DIFC',
    pickupShort: 'DIFC',
    pickupDate: '08 Mar 2026',
    status: 'live',
    estValue: 6740,
    items: [
      { id: 'a1', name: 'Adeline Set - Top', brand: 'Amy Jane London', type: 'Clothing', category: 'Sets', size: 'UK 8', colour: 'Sage', condition: 'New with tags', shoppingType: 'SELL', price: 320, rrp: 640, status: 'live' },
      { id: 'a2', name: 'Adeline Set - Bottom', brand: 'Amy Jane London', type: 'Clothing', category: 'Sets', size: 'UK 8', colour: 'Sage', condition: 'New with tags', shoppingType: 'SELL', price: 320, rrp: 640, status: 'live' },
      { id: 'a3', name: 'Anastasia Set - Top', brand: 'Amy Jane London', type: 'Clothing', category: 'Sets', size: 'UK 10', colour: 'Ivory', condition: 'New with tags', shoppingType: 'SELL', price: 340, rrp: 680, status: 'live' },
      { id: 'a4', name: 'Anastasia Set - Bottom', brand: 'Amy Jane London', type: 'Clothing', category: 'Sets', size: 'UK 10', colour: 'Ivory', condition: 'New with tags', shoppingType: 'SELL', price: 340, rrp: 680, status: 'live' },
      { id: 'a5', name: 'Linen Slip Dress', brand: 'Amy Jane London', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Stone', condition: 'New with tags', shoppingType: 'SELL', price: 280, rrp: 520, status: 'live' },
    ],
  },
  {
    id: 'sezin',
    name: 'Sezin Hande Tezel',
    initials: 'ST',
    pickup: 'Bay Central 3001, Marina',
    pickupShort: 'Marina',
    pickupDate: '11 Mar 2026',
    status: 'review',
    estValue: 5260,
    items: [
      { id: 's1', name: 'Cashmere Roll-Neck', brand: 'Loro Piana', type: 'Clothing', category: 'Knitwear', size: 'M', colour: 'Camel', condition: 'Pre-loved', shoppingType: 'SELL', price: 540, rrp: 1280, status: 'review' },
      { id: 's2', name: 'Tailored Wool Coat', brand: 'Max Mara', type: 'Clothing', category: 'Outerwear', size: 'UK 10', colour: 'Camel', condition: 'Pre-loved', shoppingType: 'SELL & RENT', price: 980, rrp: 2400, status: 'approved' },
      { id: 's3', name: 'Pleated Midi Skirt', brand: 'Khaite', type: 'Clothing', category: 'Skirts', size: 'UK 8', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL', price: 320, rrp: 690, status: 'review' },
      { id: 's4', name: 'Strappy Sandal', brand: 'Manolo Blahnik', type: 'Shoe', category: 'Heels', size: 'EU 38', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL', price: 380, rrp: 820, status: 'pending' },
      { id: 's5', name: 'Crystal-Embellished Mini', brand: 'Self-Portrait', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Black', condition: 'Pre-loved', shoppingType: 'RENT', price: 240, rrp: 540, status: 'rejected' },
      { id: 's6', name: 'Leather Tote', brand: 'Celine', type: 'Accessory', category: 'Bags', size: 'Large', colour: 'Tan', condition: 'Pre-loved', shoppingType: 'SELL', price: 1240, rrp: 2800, status: 'review' },
      { id: 's7', name: 'Silk Blouse', brand: 'Vince', type: 'Clothing', category: 'Tops', size: 'S', colour: 'Ivory', condition: 'Pre-loved', shoppingType: 'SELL', price: 180, rrp: 380, status: 'review' },
    ],
  },
  {
    id: 'maddison',
    name: 'Maddison Babb',
    initials: 'MB',
    pickup: 'Villa 12, Jumeirah Park',
    pickupShort: 'Jumeirah',
    pickupDate: '06 Mar 2026',
    status: 'ready',
    estValue: 9180,
    items: [
      { id: 'mb1', name: 'Tweed Mini Dress', brand: 'Self-Portrait', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Pink', condition: 'New with tags', shoppingType: 'SELL & RENT', price: 320, rrp: 580, status: 'approved' },
      { id: 'mb2', name: 'Embellished Mini', brand: 'Needle & Thread', type: 'Clothing', category: 'Dresses', size: 'UK 8', colour: 'Champagne', condition: 'Pre-loved', shoppingType: 'RENT', price: 220, rrp: 540, status: 'approved' },
      { id: 'mb3', name: 'Strappy Heel', brand: 'Jimmy Choo', type: 'Shoe', category: 'Heels', size: 'EU 39', colour: 'Nude', condition: 'Pre-loved', shoppingType: 'SELL', price: 380, rrp: 820, status: 'approved' },
      { id: 'mb4', name: 'Quilted Shoulder Bag', brand: 'Chanel', type: 'Accessory', category: 'Bags', size: 'Medium', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL', price: 4200, rrp: 8400, status: 'approved' },
      { id: 'mb5', name: 'Silk Maxi Skirt', brand: 'Zimmermann', type: 'Clothing', category: 'Skirts', size: 'UK 8', colour: 'Multi', condition: 'Pre-loved', shoppingType: 'RENT', price: 220, rrp: 540, status: 'approved' },
      { id: 'mb6', name: 'Cropped Cardigan', brand: 'Anine Bing', type: 'Clothing', category: 'Knitwear', size: 'S', colour: 'Cream', condition: 'Pre-loved', shoppingType: 'SELL', price: 180, rrp: 320, status: 'approved' },
    ],
  },
  {
    id: 'wafaa',
    name: 'Wafaa Abo El Ela',
    initials: 'WA',
    pickup: 'Mirdif Shorooq, Villa P19',
    pickupShort: 'Mirdif',
    pickupDate: '- awaiting',
    status: 'new',
    estValue: 0,
    items: [
      { id: 'w1', name: 'Photographs awaiting', brand: '-', type: 'Clothing', category: '-', size: '-', colour: '-', condition: '-', shoppingType: 'SELL', price: 0, rrp: 0, status: 'pending', placeholder: true },
      { id: 'w2', name: 'Photographs awaiting', brand: '-', type: 'Clothing', category: '-', size: '-', colour: '-', condition: '-', shoppingType: 'SELL', price: 0, rrp: 0, status: 'pending', placeholder: true },
      { id: 'w3', name: 'Photographs awaiting', brand: '-', type: 'Clothing', category: '-', size: '-', colour: '-', condition: '-', shoppingType: 'SELL', price: 0, rrp: 0, status: 'pending', placeholder: true },
      { id: 'w4', name: 'Photographs awaiting', brand: '-', type: 'Clothing', category: '-', size: '-', colour: '-', condition: '-', shoppingType: 'SELL', price: 0, rrp: 0, status: 'pending', placeholder: true },
    ],
  },
  {
    id: 'howar',
    name: 'Howar Talabany',
    initials: 'HT',
    pickup: '5306, Address Fountain Views T3',
    pickupShort: 'Downtown',
    pickupDate: '04 Mar 2026',
    status: 'live',
    estValue: 14820,
    items: [
      { id: 'h1', name: 'Embroidered Caftan', brand: 'Zuhair Murad', type: 'Clothing', category: 'Dresses', size: 'UK 10', colour: 'Ivory', condition: 'Pre-loved', shoppingType: 'RENT', price: 1200, rrp: 4800, status: 'live' },
      { id: 'h2', name: 'Beaded Evening Gown', brand: 'Elie Saab', type: 'Clothing', category: 'Dresses', size: 'UK 10', colour: 'Champagne', condition: 'Pre-loved', shoppingType: 'RENT', price: 1400, rrp: 6200, status: 'live' },
      { id: 'h3', name: 'Silk Kimono Coat', brand: 'Etro', type: 'Clothing', category: 'Outerwear', size: 'M', colour: 'Multi', condition: 'Pre-loved', shoppingType: 'SELL', price: 920, rrp: 2400, status: 'live' },
      { id: 'h4', name: 'Crystal Clutch', brand: 'Judith Leiber', type: 'Accessory', category: 'Bags', size: 'One size', colour: 'Silver', condition: 'Pre-loved', shoppingType: 'SELL', price: 1800, rrp: 3800, status: 'live' },
      { id: 'h5', name: 'Pleated Trouser', brand: 'The Row', type: 'Clothing', category: 'Bottoms', size: 'UK 10', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL', price: 540, rrp: 1340, status: 'live' },
      { id: 'h6', name: 'Cashmere Wrap Coat', brand: 'Max Mara', type: 'Clothing', category: 'Outerwear', size: 'UK 10', colour: 'Camel', condition: 'Pre-loved', shoppingType: 'SELL', price: 1340, rrp: 3200, status: 'live' },
    ],
  },
  {
    id: 'kelly',
    name: 'Kelly Anderson',
    initials: 'KA',
    pickup: 'Golden Mile 8, Apt 602',
    pickupShort: 'The Palm',
    pickupDate: '13 Mar 2026',
    status: 'review',
    estValue: 3640,
    items: [
      { id: 'k1', name: 'Linen Co-Ord - Top', brand: 'Posse', type: 'Clothing', category: 'Sets', size: 'S', colour: 'Stone', condition: 'Pre-loved', shoppingType: 'SELL', price: 180, rrp: 320, status: 'review' },
      { id: 'k2', name: 'Linen Co-Ord - Skirt', brand: 'Posse', type: 'Clothing', category: 'Sets', size: 'S', colour: 'Stone', condition: 'Pre-loved', shoppingType: 'SELL', price: 180, rrp: 320, status: 'review' },
      { id: 'k3', name: 'Strappy Slingback', brand: 'Bottega Veneta', type: 'Shoe', category: 'Heels', size: 'EU 38', colour: 'Black', condition: 'Pre-loved', shoppingType: 'SELL', price: 620, rrp: 1240, status: 'approved' },
      { id: 'k4', name: 'Silk Maxi Slip', brand: 'Reformation', type: 'Clothing', category: 'Dresses', size: 'S', colour: 'Sage', condition: 'Pre-loved', shoppingType: 'SELL', price: 140, rrp: 280, status: 'approved' },
      { id: 'k5', name: 'Cotton Shirt Dress', brand: 'Toteme', type: 'Clothing', category: 'Dresses', size: 'M', colour: 'Ivory', condition: 'Pre-loved', shoppingType: 'SELL', price: 320, rrp: 680, status: 'pending' },
    ],
  },
];

// Status meta - copy and palette
const STATUS_META = {
  pending:  { label: 'Pending review', tone: 'pending', dot: 'var(--endless-linen-500)' },
  review:   { label: 'In review',      tone: 'review',  dot: 'var(--endless-tangerine)' },
  approved: { label: 'Approved',       tone: 'approved',dot: '#3F7D5E' },
  rejected: { label: 'Rejected',       tone: 'rejected',dot: 'var(--endless-noir)' },
  live:     { label: 'Live on Endless',tone: 'live',    dot: 'var(--endless-rosette)' },
};

const CLIENT_STATUS_META = {
  new:    { label: 'New',         dot: 'var(--endless-linen-500)' },
  review: { label: 'In review',   dot: 'var(--endless-tangerine)' },
  ready:  { label: 'Ready to list', dot: '#3F7D5E' },
  live:   { label: 'Live',        dot: 'var(--endless-rosette)' },
};

// Photographic placeholders - composed swatches keyed by item id (deterministic).
// Real ops uses photographer-shot images; here each item has 4 "photos" we fake
// with subtle warm-toned gradients + a centered item glyph. Always tasteful.
function photoFor(itemId, idx = 0, palette = null) {
  const palettes = [
    ['#E8DFD2', '#C9B79C', '#A48868'],
    ['#EFE7DC', '#D7C7B5', '#B59E83'],
    ['#E2D9CB', '#BFAE96', '#8E7659'],
    ['#F1ECE2', '#D8CDB7', '#A89878'],
    ['#E5DBCB', '#C8B59A', '#9C8262'],
    ['#EEE3D2', '#D2BC9E', '#9B7F5F'],
  ];
  const seed = (itemId.charCodeAt(0) + itemId.charCodeAt(itemId.length-1) + idx*7) % palettes.length;
  const p = palette || palettes[seed];
  // Encoded SVG with editorial composition
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <radialGradient id='g${itemId}${idx}' cx='${30 + (idx*20)%40}%' cy='${20 + (idx*15)%40}%' r='90%'>
        <stop offset='0%' stop-color='${p[0]}'/>
        <stop offset='60%' stop-color='${p[1]}'/>
        <stop offset='100%' stop-color='${p[2]}'/>
      </radialGradient>
      <filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.9 0 0 0 0 0.82 0 0 0 0.06 0'/></filter>
    </defs>
    <rect width='400' height='500' fill='url(#g${itemId}${idx})'/>
    <rect width='400' height='500' filter='url(#n)' opacity='0.5'/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

Object.assign(window, { SEED_CLIENTS, STATUS_META, CLIENT_STATUS_META, photoFor });
