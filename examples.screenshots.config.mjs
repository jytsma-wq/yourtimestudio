const exampleScreenshotTargets = [
  {
    slug: 'hotel-direct-booking',
    url: 'http://localhost:3101',
    routes: [
      { name: 'home', path: '/' },
      { name: 'rooms', path: '/rooms' },
      { name: 'contact', path: '/contact' },
    ],
  },
  {
    slug: 'clinic-trust',
    url: 'http://localhost:3102',
    routes: [
      { name: 'home', path: '/' },
      { name: 'services', path: '/services' },
      { name: 'contact', path: '/contact' },
    ],
  },
  {
    slug: 'beauty-booking',
    url: 'http://localhost:3103',
    routes: [
      { name: 'home', path: '/' },
      { name: 'services', path: '/services' },
      { name: 'booking', path: '/booking' },
    ],
  },
];

export default exampleScreenshotTargets;
