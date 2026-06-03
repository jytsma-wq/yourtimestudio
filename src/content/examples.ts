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
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  liveUrl?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  screenshot?: string;
  imageAlt: string;
  technologies: string[];
  proofLevel: ExampleProofLevel;
  disclaimer: string;
  whatItShows: string[];
  ctaLabel: string;
};

export const exampleTypeLabels: Record<ExampleType, string> = {
  'real-project': 'Real project',
  'demo-build': 'Demo build',
  concept: 'Concept',
  prototype: 'Prototype',
  'own-site': 'Own site',
};

export const exampleStatusLabels: Record<ExampleStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  'demo-only': 'Demo only',
  private: 'Private',
};

export const exampleProofLabels: Record<ExampleProofLevel, string> = {
  'verified-live': 'Verified live',
  demo: 'Demo',
  concept: 'Concept',
  'private-client': 'Private client',
  internal: 'Internal',
};

export const exampleSectorLabels: Record<ExampleSector, string> = {
  hospitality: 'Hospitality',
  medical: 'Medical',
  beauty: 'Beauty',
  studio: 'Studio',
};

export const examples: Example[] = [
  {
    id: 'boutique-hotel-direct-booking-demo',
    title: 'Boutique Hotel Direct Booking Demo',
    slug: 'boutique-hotel-direct-booking-demo',
    type: 'demo-build',
    sector: 'hospitality',
    status: 'demo-only',
    shortDescription:
      'A direct-booking website model for a Batumi hotel that needs clearer room pages, multilingual search visibility, and fewer booking dead ends.',
    problem:
      'Many hotel websites rely on generic galleries and send guests away before they understand the rooms, location, and direct booking benefits.',
    solution:
      'A fast multilingual structure with room-focused content, local SEO, trust signals, and a booking path that keeps direct inquiries visible.',
    features: [
      'Room and offer page structure',
      'Direct booking calls to action',
      'Local SEO page hierarchy',
      'Image-weight and speed planning',
      'Guest trust content',
    ],
    screenshot: '/images/portfolio-hotel.jpg',
    imageAlt: 'Demo visual for a boutique hotel direct booking website direction',
    technologies: ['Next.js', 'React', 'TypeScript', 'Local SEO', 'Structured data'],
    proofLevel: 'demo',
    disclaimer:
      'Demo build. This shows a website direction and structure, not a verified client result.',
    whatItShows: [
      'How hotel content can support direct bookings',
      'How multilingual room pages can be organized',
      'How trust signals fit into a practical booking flow',
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
    shortDescription:
      'A clinic website model for presenting doctors, treatments, patient questions, and inquiry paths with less friction.',
    problem:
      'Clinic websites often make patients hunt for basic trust details: doctor profiles, treatment information, languages, and how to request an appointment.',
    solution:
      'A trust-first structure with clear medical service pages, doctor content, FAQs, structured data, and consultation request paths.',
    features: [
      'Doctor and treatment page structure',
      'Patient FAQ sections',
      'Consultation request flow',
      'Medical structured data planning',
      'Multilingual content hierarchy',
    ],
    screenshot: '/images/portfolio-dental.jpg',
    imageAlt: 'Demo visual for a clinic trust website direction',
    technologies: ['Next.js', 'React', 'TypeScript', 'Schema.org', 'next-intl'],
    proofLevel: 'demo',
    disclaimer:
      'Demo build. It is a practical example of clinic information architecture, not a live client case study.',
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
    shortDescription:
      'A booking-focused salon website model for turning service browsing into clearer appointment requests.',
    problem:
      'Many salons depend on social DMs for pricing, availability, and appointment requests, which creates extra back-and-forth and lost demand.',
    solution:
      'A mobile-first service menu, booking prompts, trust content, and local search structure that supports appointments without hiding basic details.',
    features: [
      'Service and pricing page structure',
      'Appointment-focused calls to action',
      'Mobile-first browsing flow',
      'Review and social proof placement',
      'Local SEO service pages',
    ],
    screenshot: '/images/portfolio-beauty.jpg',
    imageAlt: 'Demo visual for a beauty salon booking website direction',
    technologies: ['Next.js', 'React', 'TypeScript', 'Local SEO', 'Booking UX'],
    proofLevel: 'demo',
    disclaimer:
      'Demo build. This is a sector-specific example, not a claim about a real salon client.',
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
    shortDescription:
      'The Batumi Lighthouse website itself: a multilingual, SEO-aware studio site built around clear positioning, practical content, and lead capture.',
    problem:
      'A small studio site needs to explain what it builds, who it serves, and how to make contact without relying on decorative agency language.',
    solution:
      'A multilingual Next.js site with centralized brand configuration, structured metadata, sector pages, audit paths, and clear contact routes.',
    features: [
      'Multilingual route structure',
      'Centralized site configuration',
      'SEO metadata and structured data',
      'Audit and lead capture flows',
      'Functional design system',
    ],
    imageAlt: 'Batumi Lighthouse website internal example placeholder',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'next-intl'],
    proofLevel: 'internal',
    disclaimer:
      'Internal site in progress. This represents Batumi Lighthouse system work, not a client result.',
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
