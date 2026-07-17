export type ExampleType =
  | 'real-project'
  | 'demo-build'
  | 'concept'
  | 'prototype'
  | 'own-site';

export type ExampleStatus =
  | 'live'
  | 'in-development'
  | 'demo-only'
  | 'private';

export type ExampleProofLevel =
  | 'verified-live'
  | 'demo'
  | 'concept'
  | 'private-client'
  | 'internal';

export type ExampleSector =
  | 'hospitality'
  | 'medical'
  | 'beauty'
  | 'studio';

export type Example = {
  id: string;
  title: string;
  slug: string;
  type: ExampleType;
  sector: ExampleSector;
  status: ExampleStatus;
  businessType: string;
  shortDescription: string;
  demonstratedProblem: string;
  problem: string;
  solution: string;
  modules: string[];
  features: string[];
  clientLearning: string[];
  liveUrl?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  screenshotFilename: `${string}.webp`;
  screenshot?: string;
  imageAlt: string;
  technologies: string[];
  proofLevel: ExampleProofLevel;
  disclaimer: string;
  whatItShows: string[];
  ctaLabel: string;
};

export const exampleScreenshotDirectory = '/examples' as const;

export const internalExampleDisclosure =
  'Internal example. This is not paid client work, not testimonial-backed work, and not a published business result.';

export const examples: Example[] = [
  {
    id: 'boutique-hotel-direct-booking-demo',
    title: 'Boutique Hotel Direct Booking Demo',
    slug: 'boutique-hotel-direct-booking-demo',
    type: 'demo-build',
    sector: 'hospitality',
    status: 'demo-only',
    businessType: 'Boutique hotel, guesthouse, or aparthotel',
    shortDescription:
      'An internal hotel website example for clearer rooms, offers, policies, and direct booking paths.',
    demonstratedProblem:
      'Hotel visitors often compare rooms, location, policies, and booking options quickly. If those details are scattered, the website pushes them back to OTAs or generic booking pages.',
    problem:
      'Many hotel websites rely on generic galleries and send guests away before they understand the rooms, location, and direct booking benefits.',
    solution:
      'A fast multilingual structure with room-focused content, local SEO, trust details, and a booking path that keeps direct inquiries visible.',
    modules: [
      'Homepage with direct booking prompts',
      'Room and offer page structure',
      'Location, policies, and guest FAQ modules',
      'Local SEO landing page structure',
      'Contact and booking handoff flow',
    ],
    features: [
      'Room and offer page structure',
      'Direct booking calls to action',
      'Local SEO page hierarchy',
      'Image-weight and speed planning',
      'Guest trust content',
    ],
    clientLearning: [
      'How room content can help guests compare without leaving the site',
      'How direct booking prompts can sit beside policies and trust details',
      'How multilingual hotel pages can be structured before design starts',
    ],
    screenshotFilename: 'boutique-hotel-direct-booking.webp',
    imageAlt: 'Screenshot of the Boutique Hotel Direct Booking Demo website example',
    technologies: ['Next.js', 'React', 'TypeScript', 'Local SEO', 'Structured data'],
    proofLevel: 'demo',
    disclaimer: internalExampleDisclosure,
    whatItShows: [
      'How hotel content can support direct bookings',
      'How multilingual room pages can be organized',
      'How trust details fit into a practical booking flow',
    ],
    ctaLabel: 'Discuss a similar website',
  },
  {
    id: 'clinic-trust-website-demo',
    title: 'Clinic Trust Website Demo',
    slug: 'clinic-trust-website-demo',
    type: 'demo-build',
    sector: 'medical',
    status: 'demo-only',
    businessType: 'Clinic, dental practice, or aesthetic medical center',
    shortDescription:
      'An internal clinic website example for treatment clarity, doctor trust, patient questions, and consultation requests.',
    demonstratedProblem:
      'Patients need to understand treatments, practitioners, safety, languages, and next steps before they feel ready to contact a clinic.',
    problem:
      'Clinic websites often make patients hunt for basic trust details: doctor profiles, treatment information, languages, and how to request an appointment.',
    solution:
      'A trust-first structure with clear medical service pages, doctor content, FAQs, structured data, and consultation request paths.',
    modules: [
      'Treatment overview and detail pages',
      'Doctor profile modules',
      'Patient FAQ and safety content',
      'Consultation request flow',
      'Medical structured data plan',
    ],
    features: [
      'Doctor and treatment page structure',
      'Patient FAQ sections',
      'Consultation request flow',
      'Medical structured data planning',
      'Multilingual content hierarchy',
    ],
    clientLearning: [
      'How treatment pages can answer patient concerns before contact',
      'How doctor profiles and safety notes can support trust',
      'How appointment requests can be clearer without making medical claims',
    ],
    screenshotFilename: 'clinic-trust-website.webp',
    imageAlt: 'Screenshot of the Clinic Trust Website Demo website example',
    technologies: ['Next.js', 'React', 'TypeScript', 'Schema.org', 'next-intl'],
    proofLevel: 'demo',
    disclaimer: internalExampleDisclosure,
    whatItShows: [
      'How treatment pages can build trust',
      'How patient questions can reduce inquiry friction',
      'How structured data can support medical search visibility',
    ],
    ctaLabel: 'Discuss a similar website',
  },
  {
    id: 'beauty-salon-booking-demo',
    title: 'Beauty Salon Booking Demo',
    slug: 'beauty-salon-booking-demo',
    type: 'demo-build',
    sector: 'beauty',
    status: 'demo-only',
    businessType: 'Beauty studio, salon, medspa, or appointment-led service',
    shortDescription:
      'An internal salon website example for clearer services, prices, proof, and appointment requests.',
    demonstratedProblem:
      'Beauty clients often arrive from Instagram or Google and need quick answers on services, prices, proof, and how to book.',
    problem:
      'Many salons depend on social DMs for pricing, availability, and appointment requests, which creates extra back-and-forth and lost demand.',
    solution:
      'A mobile-first service menu, booking prompts, trust content, and local search structure that supports appointments without hiding basic details.',
    modules: [
      'Mobile-first service menu',
      'Price and duration modules',
      'Proof, gallery, and review sections',
      'Appointment request flow',
      'Local SEO service pages',
    ],
    features: [
      'Service and pricing page structure',
      'Appointment-focused calls to action',
      'Mobile-first browsing flow',
      'Review and social proof placement',
      'Local SEO service pages',
    ],
    clientLearning: [
      'How a salon can reduce back-and-forth before booking',
      'How service and price content can work on mobile',
      'How proof and contact flow can support appointment requests',
    ],
    screenshotFilename: 'beauty-salon-booking.webp',
    imageAlt: 'Screenshot of the Beauty Salon Booking Demo website example',
    technologies: ['Next.js', 'React', 'TypeScript', 'Local SEO', 'Booking UX'],
    proofLevel: 'demo',
    disclaimer: internalExampleDisclosure,
    whatItShows: [
      'How services can be organized for faster booking decisions',
      'How appointment prompts can reduce DM friction',
      'How local SEO can support salon discovery',
    ],
    ctaLabel: 'Discuss a similar website',
  },
  {
    id: 'batumi-lighthouse-website',
    title: 'Batumi Lighthouse Website',
    slug: 'batumi-lighthouse-website',
    type: 'own-site',
    sector: 'studio',
    status: 'in-development',
    businessType: 'Founder-led web studio',
    shortDescription:
      'The Batumi Lighthouse website itself: an internal studio build for service clarity, multilingual structure, and enquiry flow.',
    demonstratedProblem:
      'A small studio needs to explain who it serves, what it builds, and how to start a conversation without sounding like a generic agency template.',
    problem:
      'A small studio site needs to explain what it builds, who it serves, and how to make contact without relying on decorative agency language.',
    solution:
      'A multilingual Next.js site with centralized brand configuration, structured metadata, sector pages, audit paths, and clear contact routes.',
    modules: [
      'Founder-led homepage structure',
      'Sector-specific service pages',
      'Audit request and contact flow',
      'Multilingual routing and content structure',
      'SEO metadata and structured data',
    ],
    features: [
      'Multilingual route structure',
      'Centralized site configuration',
      'SEO metadata and structured data',
      'Audit and lead capture flows',
      'Reusable design rules',
    ],
    clientLearning: [
      'How a small service business can explain its offer plainly',
      'How multilingual pages and SEO basics can be planned together',
      'How audit and contact paths can be built into the site structure',
    ],
    screenshotFilename: 'batumi-lighthouse-website.webp',
    imageAlt: 'Screenshot of the Batumi Lighthouse Website internal example',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'next-intl'],
    proofLevel: 'internal',
    disclaimer: internalExampleDisclosure,
    whatItShows: [
      'How the studio structures multilingual service content',
      'How brand and SEO configuration are centralized',
      'How practical lead paths can be built into a small studio website',
    ],
    ctaLabel: 'Discuss a similar website',
  },
];

export const featuredExamples = examples
  .filter((example) => example.type === 'demo-build')
  .slice(0, 3);

export function getExampleBySlug(slug: string) {
  return examples.find((example) => example.slug === slug);
}
