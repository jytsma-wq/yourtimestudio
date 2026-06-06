export type ExampleSystem = {
  slug: string;
  title: string;
  vertical: 'hospitality' | 'medical' | 'beauty' | 'local-service';
  status: 'concept' | 'internal-build' | 'client-build';
  disclosure: string;
  summary: string;
  problem: string;
  solution: string;
  modules: string[];
  technical: string[];
  repoUrl?: string;
  liveUrl?: string;
  screenshot?: {
    desktop?: string;
    mobile?: string;
    tablet?: string;
    alt: string;
  };
  fallbackVisual: 'hotel-booking' | 'clinic-trust' | 'beauty-booking';
  detail: {
    problemFocus: string[];
    solutionFocus: string[];
    demonstrates: string[];
    screenshots: Array<{
      src: string;
      device: 'desktop' | 'tablet' | 'mobile';
      label: string;
    }>;
  };
};

export const exampleSystems: ExampleSystem[] = [
  {
    slug: 'silk-beauty-salon',
    title: 'Silk Beauty Salon',
    vertical: 'beauty',
    status: 'internal-build',
    disclosure:
      'Internal build used as an example website system. It is not presented as paid work, testimonial-backed work, or a published business result.',
    summary:
      'A multilingual beauty salon website system for treatments, appointments, service discovery, and international visitors in Batumi.',
    problem:
      'Beauty and aesthetic businesses often depend too much on Instagram or messaging alone. Visitors need clear treatment information, trust signals, service navigation, and an appointment path before they contact the salon.',
    solution:
      'A structured salon website with multilingual routes, treatment content, appointment-oriented UX, contact flow, and a professional service presentation.',
    modules: [
      'Treatment and service discovery',
      'Appointment / booking path',
      'Multilingual visitor structure',
      'Trust and contact sections',
      'Mobile-first salon browsing',
    ],
    technical: [
      'Next.js App Router',
      'TypeScript',
      'next-intl multilingual routing',
      'Prisma-backed data model',
      'Resend email integration',
      'Playwright / accessibility testing structure',
    ],
    repoUrl: 'https://github.com/jytsma-wq/silk-beauty-salon',
    screenshot: {
      desktop: '/work/silk-beauty-salon/desktop-home.png',
      mobile: '/work/silk-beauty-salon/mobile-home.png',
      alt: 'Silk Beauty Salon homepage interface shown as a beauty appointment website example',
    },
    fallbackVisual: 'beauty-booking',
    detail: {
      problemFocus: [
        'Treatment information clarity',
        'Appointment path',
        'Multilingual visitors',
        'Trust before enquiry',
        'Mobile service browsing',
      ],
      solutionFocus: [
        'Beauty appointment system',
        'Treatment/service discovery',
        'International visitor structure',
        'Contact and booking UX',
        'Multilingual content support',
      ],
      demonstrates: [
        'How a salon can move beyond social-only discovery into a structured service website.',
        'How appointment intent can sit close to treatment information and trust signals.',
        'How multilingual routes support visitors who need clarity before contacting the studio.',
        'How a mobile-first service path can make treatments easier to compare and request.',
      ],
      screenshots: [
        { src: '/work/silk-beauty-salon/desktop-home.png', device: 'desktop', label: 'Homepage desktop' },
        { src: '/work/silk-beauty-salon/mobile-home.png', device: 'mobile', label: 'Homepage mobile' },
        { src: '/work/silk-beauty-salon/desktop-services.png', device: 'desktop', label: 'Services desktop' },
        { src: '/work/silk-beauty-salon/mobile-booking.png', device: 'mobile', label: 'Booking mobile' },
      ],
    },
  },
  {
    slug: 'grand-boutique-hotel',
    title: 'Grand Boutique Hotel',
    vertical: 'hospitality',
    status: 'internal-build',
    disclosure:
      'Internal build used as an example website system. It is not presented as paid work, testimonial-backed work, or a published business result.',
    summary:
      'A boutique hotel website system for room discovery, direct booking intent, local trust, and multilingual hospitality presentation.',
    problem:
      'Hotels and guesthouses lose direct-booking opportunities when the website does not clearly show rooms, location, policies, trust signals, and a direct enquiry or booking path.',
    solution:
      'A hospitality website system with room-focused UX, booking-oriented calls to action, local search structure, content management support, and technical foundations for growth.',
    modules: [
      'Room and offer presentation',
      'Direct booking / enquiry path',
      'Location and trust sections',
      'Hotel content management layer',
      'Mobile-first guest journey',
    ],
    technical: [
      'Next.js App Router',
      'TypeScript',
      'next-intl multilingual routing',
      'Prisma-backed data model',
      'Sanity content tooling',
      'Resend email integration',
      'React Day Picker booking UI support',
    ],
    repoUrl: 'https://github.com/jytsma-wq/Grand-boutique-hotel',
    screenshot: {
      desktop: '/work/grand-boutique-hotel/desktop-home.png',
      mobile: '/work/grand-boutique-hotel/mobile-home.png',
      alt: 'Grand Boutique Hotel homepage interface shown as a direct-booking hospitality website example',
    },
    fallbackVisual: 'hotel-booking',
    detail: {
      problemFocus: [
        'Direct booking friction',
        'Room and offer clarity',
        'Location trust',
        'Guest journey on mobile',
        'OTA dependency',
      ],
      solutionFocus: [
        'Hotel direct-booking presentation',
        'Room/offer modules',
        'Enquiry or booking path',
        'Location and trust content',
        'Content management support',
      ],
      demonstrates: [
        'How a boutique hotel can make rooms and offers easier to evaluate before enquiry.',
        'How direct-booking intent can be supported without pretending to replace every hotel system.',
        'How location, trust content, and mobile navigation reduce friction for guests.',
        'How content tooling can support seasonal room, offer, and hospitality updates.',
      ],
      screenshots: [
        { src: '/work/grand-boutique-hotel/desktop-home.png', device: 'desktop', label: 'Homepage desktop' },
        { src: '/work/grand-boutique-hotel/mobile-home.png', device: 'mobile', label: 'Homepage mobile' },
        { src: '/work/grand-boutique-hotel/desktop-rooms.png', device: 'desktop', label: 'Rooms desktop' },
        { src: '/work/grand-boutique-hotel/mobile-booking.png', device: 'mobile', label: 'Booking mobile' },
      ],
    },
  },
];
