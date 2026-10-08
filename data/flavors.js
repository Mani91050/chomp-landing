// Shared product data — edit flavors, prices and copy here.
// Adding a flavor automatically updates the grid, the cart and the box builder.

export const FLAVORS = [
  {
    id: 'cosmic',
    name: 'Cosmic Crunch',
    tag: 'Cookie + cream, 64% dark',
    price: 4.5,
    color: '#5b2bd6',
    soft: '#efe9ff',
    img: '/images/flavor-cosmic.jpg',
    blurb: 'Cookie rubble folded through vanilla cream, sealed in 64% dark chocolate.',
    badge: 'New drop',
  },
  {
    id: 'mango',
    name: 'Mango Meltdown',
    tag: 'Freeze-dried mango',
    price: 4.5,
    color: '#f97316',
    soft: '#fff1e2',
    img: '/images/flavor-mango.jpg',
    blurb: 'Sun-ripened mango pieces that snap, then melt. Like summer, but chewable.',
    badge: 'Fan favourite',
  },
  {
    id: 'pink',
    name: 'Strawberry Riot',
    tag: 'Raspberry + pink salt',
    price: 4.5,
    color: '#ff2e88',
    soft: '#ffe8f2',
    img: '/images/flavor-pink.jpg',
    blurb: 'Tart berries, a whisper of pink salt, and way too much attitude.',
    badge: 'Bestseller',
  },
  {
    id: 'mint',
    name: 'Mint Static',
    tag: 'Cool mint crunch',
    price: 4.5,
    color: '#009e86',
    soft: '#e2fbf6',
    img: '/images/flavor-mint.jpg',
    blurb: 'Arctic mint shards in silky milk chocolate. Your mouth goes quiet. In a good way.',
    badge: 'Limited',
  },
];

export const FREE_SHIPPING_THRESHOLD = 25;
export const BUNDLE_DEAL = { size: 4, price: 14 };

export const getFlavor = (id) => FLAVORS.find((f) => f.id === id);
