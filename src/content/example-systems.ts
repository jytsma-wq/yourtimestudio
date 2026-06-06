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
};

export const exampleSystems: ExampleSystem[] = [
  {
    slug: 'hotel-direct-booking-system',
    title: 'Hotel Direct Booking System',
    vertical: 'hospitality',
    status: 'concept',
    disclosure: 'Concept system prepared as a booking-first website architecture. Not presented as client work.',
    summary:
      'A hotel website system designed to move guests from room comparison into a direct booking path with multilingual content and location trust.',
    problem:
      'Guests compare hotels quickly and often return to OTA platforms when the direct website does not make rooms, policies, location, and booking value clear.',
    solution:
      'Structure rooms, rates, policies, language routes, local proof, and a direct booking CTA into one clear decision path.',
    modules: [
      'Room comparison cards',
      'Direct booking route',
      'Policy and amenity strip',
      'Location trust panel',
    ],
    technical: [
      'Next.js route architecture',
      'Hotel structured data',
      'Performance budget for media-heavy pages',
    ],
    fallbackVisual: 'hotel-booking',
  },
  {
    slug: 'clinic-trust-website',
    title: 'Clinic Trust Website',
    vertical: 'medical',
    status: 'concept',
    disclosure: 'Concept system prepared as a trust-first clinic website architecture. Not presented as client work.',
    summary:
      'A clinic website system that connects treatment clarity, doctor credibility, FAQs, and consultation requests.',
    problem:
      'Patients need treatment details, safety signals, doctor credibility, language support, and next steps before they feel ready to contact a clinic.',
    solution:
      'Place treatment pages, doctor profiles, intake prompts, and trust proof close to the consultation path.',
    modules: [
      'Treatment category pages',
      'Doctor profile rows',
      'FAQ and safety panel',
      'Consultation request flow',
    ],
    technical: [
      'Medical schema basics',
      'Accessible intake form flow',
      'Localized route structure',
    ],
    fallbackVisual: 'clinic-trust',
  },
  {
    slug: 'beauty-appointment-website',
    title: 'Beauty Appointment Website',
    vertical: 'beauty',
    status: 'concept',
    disclosure: 'Concept system prepared as an appointment-first beauty website architecture. Not presented as client work.',
    summary:
      'A beauty studio website system that turns social and search interest into service-specific appointment requests.',
    problem:
      'Social traffic creates attention, but visitors often cannot compare services, price context, time, availability, or visual proof in one structured place.',
    solution:
      'Organize services, price/time context, gallery proof, promotions, and booking prompts into a clear appointment route.',
    modules: [
      'Service menu grid',
      'Price and time context',
      'Gallery proof strip',
      'Appointment request route',
    ],
    technical: [
      'Booking route pattern',
      'Image optimization layer',
      'Local service schema',
    ],
    fallbackVisual: 'beauty-booking',
  },
];
