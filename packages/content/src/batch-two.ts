import type { FormField, TemplateLocaleConfig } from "./index";
import {
  createTemplateNavigation,
  createTemplatePath,
  resolveTemplatePage,
  type RoutableTemplatePage,
  type TemplateNavigationItem
} from "./routing";

type PageContent<TSlug extends string> = RoutableTemplatePage<TSlug>;

type FormCopy = {
  title: string;
  description: string;
  submitLabel: string;
  successMessage: string;
  emptySelectLabel: string;
  validation: {
    required: string;
    email: string;
    numberMin: string;
  };
  fields: readonly FormField[];
};

type BusinessBasics = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: readonly string[];
};

type NavigationItem<TSlug extends string> = TemplateNavigationItem<TSlug>;

export type HotelBoutiquePageSlug =
  | ""
  | "rooms"
  | "rooms/atelier-room"
  | "neighborhood"
  | "journal"
  | "gallery"
  | "offers"
  | "booking"
  | "contact"
  | "faq";

export type DentistCosmeticPageSlug =
  | ""
  | "cosmetic-dentistry"
  | "implants"
  | "treatments/digital-smile-design"
  | "smile-gallery"
  | "technology"
  | "team"
  | "pricing-consultation"
  | "contact"
  | "faq";

export type BeautySalonPageSlug =
  | ""
  | "services"
  | "services/copper-gloss-colour"
  | "stylists"
  | "pricing"
  | "gallery"
  | "offers"
  | "booking"
  | "contact"
  | "faq";

export type HotelBoutiqueContent = {
  id: "hotel-02-boutique";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<HotelBoutiquePageSlug>[];
  pages: readonly PageContent<HotelBoutiquePageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    editorialNote: string;
    proofPoints: readonly string[];
  };
  rooms: readonly {
    name: string;
    slug: "rooms/atelier-room";
    summary: string;
    sleeps: string;
    size: string;
    priceFrom: string;
    details: readonly string[];
  }[];
  localHighlights: readonly {
    title: string;
    detail: string;
    walk: string;
  }[];
  journal: readonly {
    title: string;
    excerpt: string;
    category: string;
  }[];
  gallery: readonly {
    title: string;
    alt: string;
    tone: string;
  }[];
  testimonials: readonly {
    quote: string;
    author: string;
    context: string;
  }[];
  hotelOffers: readonly {
    title: string;
    description: string;
    date: string;
  }[];
  booking: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type DentistCosmeticContent = {
  id: "dentist-02-premium-cosmetic";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<DentistCosmeticPageSlug>[];
  pages: readonly PageContent<DentistCosmeticPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    safetyNote: string;
    proofPoints: readonly string[];
  };
  treatments: readonly {
    name: string;
    slug: "treatments/digital-smile-design";
    summary: string;
    duration: string;
    expectations: string;
  }[];
  implantJourney: readonly {
    step: string;
    title: string;
    detail: string;
  }[];
  technology: readonly {
    title: string;
    detail: string;
  }[];
  team: readonly {
    name: string;
    credentials: string;
    focus: string;
  }[];
  gallery: readonly {
    title: string;
    alt: string;
    tone: string;
  }[];
  testimonials: readonly {
    quote: string;
    author: string;
    context: string;
  }[];
  appointment: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type BeautySalonContent = {
  id: "beauty-01-salon";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<BeautySalonPageSlug>[];
  pages: readonly PageContent<BeautySalonPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    styleNote: string;
    proofPoints: readonly string[];
  };
  services: readonly {
    name: string;
    slug: "services/copper-gloss-colour";
    summary: string;
    duration: string;
    priceFrom: string;
  }[];
  stylists: readonly {
    name: string;
    role: string;
    focus: string;
  }[];
  pricing: readonly {
    service: string;
    price: string;
    note: string;
  }[];
  gallery: readonly {
    title: string;
    alt: string;
    tone: string;
  }[];
  testimonials: readonly {
    quote: string;
    author: string;
    context: string;
  }[];
  offers: readonly {
    title: string;
    description: string;
    date: string;
  }[];
  booking: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export const hotelBoutiqueDefaultBasePath = "/templates/hotel-02-boutique";
export const dentistCosmeticDefaultBasePath = "/templates/dentist-02-premium-cosmetic";
export const beautySalonDefaultBasePath = "/templates/beauty-01-salon";

export const hotelBoutiquePageSlugs = [
  "",
  "rooms",
  "rooms/atelier-room",
  "neighborhood",
  "journal",
  "gallery",
  "offers",
  "booking",
  "contact",
  "faq"
] as const satisfies readonly HotelBoutiquePageSlug[];

export const dentistCosmeticPageSlugs = [
  "",
  "cosmetic-dentistry",
  "implants",
  "treatments/digital-smile-design",
  "smile-gallery",
  "technology",
  "team",
  "pricing-consultation",
  "contact",
  "faq"
] as const satisfies readonly DentistCosmeticPageSlug[];

export const beautySalonPageSlugs = [
  "",
  "services",
  "services/copper-gloss-colour",
  "stylists",
  "pricing",
  "gallery",
  "offers",
  "booking",
  "contact",
  "faq"
] as const satisfies readonly BeautySalonPageSlug[];

const localeConfig = {
  defaultLocale: "en",
  fallbackLocale: "en",
  enabledLocales: ["en"],
  directions: {
    en: "ltr"
  }
} as const satisfies TemplateLocaleConfig;

export const hotelBoutiqueContent = {
  id: "hotel-02-boutique",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Marlowe House",
    tagline: "A 24-room design hotel with neighborhood notes at the desk.",
    description:
      "A fictional boutique hotel template for independent stays, design-led rooms, local guides, journal stories, direct booking and warm small-team service.",
    phone: "+1 503 555 0128",
    email: "stay@marlowehouse.example",
    address: "19 Alder Mews, Portland, OR",
    hours: [
      "Reception daily 7 AM-11 PM",
      "Breakfast room 7:30 AM-10:30 AM",
      "Coffee bar open to guests until 5 PM",
      "Late arrival by door code"
    ]
  },
  navigation: [
    { label: "Rooms", slug: "rooms" },
    { label: "Neighborhood", slug: "neighborhood" },
    { label: "Journal", slug: "journal" },
    { label: "Gallery", slug: "gallery" },
    { label: "Offers", slug: "offers" },
    { label: "Booking", slug: "booking" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A warm editorial boutique hotel homepage for direct room inquiries.",
      seo: {
        title: "Marlowe House | Boutique Hotel Template",
        description:
          "Boutique hotel template with design-led rooms, neighborhood guide, journal, offers and booking inquiry.",
        canonicalPath: hotelBoutiqueDefaultBasePath
      }
    },
    {
      slug: "rooms",
      title: "Rooms",
      navLabel: "Rooms",
      intro: "Room cards with design notes, practical details, and direct booking cues.",
      seo: {
        title: "Rooms | Marlowe House",
        description: "Browse boutique rooms with design details, rates, amenities and room notes.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/rooms`
      }
    },
    {
      slug: "rooms/atelier-room",
      title: "Atelier Room",
      navLabel: "Room Detail",
      intro: "A room detail page for design-led amenities, working space, and direct booking.",
      seo: {
        title: "Atelier Room | Marlowe House",
        description: "Boutique hotel room detail page with local design cues and booking CTA.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/rooms/atelier-room`
      }
    },
    {
      slug: "neighborhood",
      title: "Neighborhood",
      navLabel: "Neighborhood",
      intro: "Local guide blocks for coffee, galleries, dinner walks, and independent shopping.",
      seo: {
        title: "Neighborhood | Marlowe House",
        description: "Local guide route for a boutique hotel template with walkable highlights.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/neighborhood`
      }
    },
    {
      slug: "journal",
      title: "Journal",
      navLabel: "Journal",
      intro: "Editorial story cards for culture, design, weekend plans, and guest recommendations.",
      seo: {
        title: "Journal | Marlowe House",
        description: "Boutique hotel journal route with original local stories and travel notes.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/journal`
      }
    },
    {
      slug: "gallery",
      title: "Gallery",
      navLabel: "Gallery",
      intro: "Room, breakfast, lobby, and neighborhood moments with descriptive alt text.",
      seo: {
        title: "Gallery | Marlowe House",
        description: "Boutique hotel gallery with warm editorial image direction.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/gallery`
      }
    },
    {
      slug: "offers",
      title: "Offers",
      navLabel: "Offers",
      intro: "Weekend and direct-booking offers with clear eligibility and local value.",
      seo: {
        title: "Offers | Marlowe House",
        description: "Boutique hotel offers page for direct booking and local culture packages.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/offers`
      }
    },
    {
      slug: "booking",
      title: "Booking",
      navLabel: "Booking",
      intro: "A compact room inquiry form with arrival, room preference, and guest notes.",
      seo: {
        title: "Booking | Marlowe House",
        description: "Reserve a boutique hotel room through an accessible inquiry form.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/booking`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro:
        "Address, phone, email, arrival notes, coffee bar hours, and walkable location details.",
      seo: {
        title: "Contact | Marlowe House",
        description: "Contact and location page for a boutique hotel template.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro:
        "Answers for arrival, breakfast, direct booking, accessibility, pets, and local notes.",
      seo: {
        title: "FAQ | Marlowe House",
        description: "Boutique hotel FAQ content for booking, arrival, rooms, and accessibility.",
        canonicalPath: `${hotelBoutiqueDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "A small hotel with a front desk full of good addresses.",
    subtitle:
      "Marlowe House pairs individual rooms with a useful neighborhood guide and a reservation path that feels personal from the first question.",
    primaryCta: "Reserve your room",
    secondaryCta: "Discover the neighborhood",
    editorialNote:
      "Tonight's desk note: late supper at Juniper Lane, vinyl market on Alder, raincoats by the lift.",
    proofPoints: [
      "24 rooms above a guest-only coffee bar",
      "Local map cards written by the team",
      "Direct-book weekends include breakfast credit"
    ]
  },
  rooms: [
    {
      name: "Atelier Room",
      slug: "rooms/atelier-room",
      summary: "Oak writing rail, woven bedside lamps, rain shower, and a tall window over Alder.",
      sleeps: "Sleeps 2",
      size: "29 m2",
      priceFrom: "From $245",
      details: ["Local ceramics", "Window desk", "Rain shower", "Breakfast credit"]
    },
    {
      name: "Mews Studio",
      slug: "rooms/atelier-room",
      summary: "A room for longer weekends with sitting corner, small pantry shelf, and art books.",
      sleeps: "Sleeps 2",
      size: "36 m2",
      priceFrom: "From $310",
      details: ["Sitting corner", "Pantry shelf", "Street view", "Late checkout option"]
    },
    {
      name: "Courtyard Pair",
      slug: "rooms/atelier-room",
      summary: "Two connected small rooms facing the courtyard garden for friends or family.",
      sleeps: "Sleeps 4",
      size: "44 m2",
      priceFrom: "From $380",
      details: ["Connecting rooms", "Courtyard outlook", "Two baths", "Guest laundry access"]
    }
  ],
  localHighlights: [
    {
      title: "Morning coffee route",
      detail: "Three independent counters, one bakery window, and a river walk back to the hotel.",
      walk: "6-18 min walk"
    },
    {
      title: "Alder gallery loop",
      detail: "Small ceramics, risograph prints, and a frame shop that hosts Friday openings.",
      walk: "4 blocks"
    },
    {
      title: "Late supper list",
      detail: "Kitchen hours and quiet tables the front desk keeps current for late arrivals.",
      walk: "Updated weekly"
    }
  ],
  journal: [
    {
      title: "How the lobby shelves are chosen",
      excerpt:
        "A short note on the artists, books, and objects that rotate through the front room.",
      category: "Design"
    },
    {
      title: "A rainy Saturday without a taxi",
      excerpt: "Coffee, museum rooms, a matinee, and supper within a twenty-minute walk.",
      category: "Weekend"
    },
    {
      title: "Breakfast when the city is still closed",
      excerpt: "Why the guest coffee bar opens early and keeps the menu compact.",
      category: "Stay notes"
    }
  ],
  gallery: [
    {
      title: "Atelier room window desk",
      alt: "Boutique hotel room with wood desk, woven lamp, art book, and tall window.",
      tone: "room"
    },
    {
      title: "Guest coffee bar tiles",
      alt: "Warm boutique hotel coffee bar with terracotta tile and small brass lamps.",
      tone: "service"
    },
    {
      title: "Handwritten local map",
      alt: "Concierge map card with local coffee, gallery, and supper recommendations.",
      tone: "private"
    },
    {
      title: "Courtyard after rain",
      alt: "Small courtyard garden with cafe tables after rain at a boutique hotel.",
      tone: "room"
    }
  ],
  testimonials: [
    {
      quote:
        "No customer quote is published in this demonstration. Add this block only after receiving verified, permissioned feedback.",
      author: "Review placeholder",
      context: "No review published"
    }
  ],
  hotelOffers: [
    {
      title: "Friday gallery night",
      description: "Two-night stay, breakfast credit, and a front desk map for Friday openings.",
      date: "Available most first Fridays"
    },
    {
      title: "Work from the mews",
      description: "Midweek room rate with coffee bar credit and late checkout when available.",
      date: "Sunday-Thursday"
    }
  ],
  booking: {
    title: "Reserve your room",
    description:
      "This demo form validates the inquiry locally and shows how a boutique hotel can collect useful arrival notes before connecting a booking engine.",
    submitLabel: "Request room",
    successMessage: "Room request received. This demo keeps the response local.",
    emptySelectLabel: "Select a room",
    validation: {
      required: "{field} is required.",
      email: "Enter a valid email address.",
      numberMin: "{field} must be at least {min}."
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "arrival", label: "Arrival", type: "date", required: true },
      { name: "departure", label: "Departure", type: "date", required: true },
      { name: "guests", label: "Guests", type: "number", required: true },
      {
        name: "room",
        label: "Room preference",
        type: "select",
        required: true,
        options: ["Atelier Room", "Mews Studio", "Courtyard Pair"]
      },
      {
        name: "notes",
        label: "Stay notes",
        type: "textarea",
        required: false,
        helperText: "Optional: late arrival, breakfast needs, mobility notes, or local interests."
      }
    ]
  },
  faq: [
    {
      question: "Is breakfast included?",
      answer:
        "Some direct-book offers include breakfast credit. The booking route leaves space for rate-specific terms."
    },
    {
      question: "Can guests arrive late?",
      answer:
        "Yes. The template includes late-arrival copy for door codes and front desk follow-up."
    },
    {
      question: "Is the neighborhood guide editable?",
      answer:
        "Yes. Local highlights and journal cards are content-driven so each hotel can keep recommendations current."
    },
    {
      question: "Can room detail pages support more room types?",
      answer: "Yes. The typed model supports room slugs, amenities, rates, and future galleries."
    }
  ]
} as const satisfies HotelBoutiqueContent;

export const dentistCosmeticContent = {
  id: "dentist-02-premium-cosmetic",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Vellum Dental Atelier",
    tagline: "Consultation-led cosmetic dentistry, implant planning, and discreet smile care.",
    description:
      "A fictional premium cosmetic dentistry template with consultation-first copy, implant planning, treatment education, team credentials, cautious gallery language, and safe inquiry flow.",
    phone: "+1 212 555 0174",
    email: "consult@vellumdental.example",
    address: "88 Mercer Arcade, New York, NY",
    hours: [
      "Mon-Thu 8 AM-6 PM",
      "Fri 8 AM-2 PM",
      "Consultations by appointment",
      "Aftercare calls scheduled by the clinician"
    ]
  },
  navigation: [
    { label: "Cosmetic", slug: "cosmetic-dentistry" },
    { label: "Implants", slug: "implants" },
    { label: "Technology", slug: "technology" },
    { label: "Team", slug: "team" },
    { label: "Consultation", slug: "pricing-consultation" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A premium cosmetic dentistry homepage focused on consultation and trust.",
      seo: {
        title: "Vellum Dental Atelier | Cosmetic Dentistry Template",
        description:
          "Premium cosmetic dentist template with consultation, implants, smile planning, technology, team and cautious gallery content.",
        canonicalPath: dentistCosmeticDefaultBasePath
      }
    },
    {
      slug: "cosmetic-dentistry",
      title: "Cosmetic Dentistry",
      navLabel: "Cosmetic",
      intro: "Cosmetic treatment categories framed around consultation, planning, and aftercare.",
      seo: {
        title: "Cosmetic Dentistry | Vellum Dental Atelier",
        description:
          "Consultation-led cosmetic dentistry page with veneers, whitening, alignment and planning content.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/cosmetic-dentistry`
      }
    },
    {
      slug: "implants",
      title: "Implants",
      navLabel: "Implants",
      intro:
        "Implant planning content with assessment, imaging, timeline, and maintenance expectations.",
      seo: {
        title: "Implants | Vellum Dental Atelier",
        description:
          "Dental implant planning page with safety, imaging, suitability and aftercare language.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/implants`
      }
    },
    {
      slug: "treatments/digital-smile-design",
      title: "Digital Smile Planning",
      navLabel: "Treatment Detail",
      intro:
        "A treatment detail route for planning, mockups, risks, suitability, and realistic expectations.",
      seo: {
        title: "Digital Smile Planning | Vellum Dental Atelier",
        description:
          "Cosmetic treatment detail page with consultation-first smile planning content.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/treatments/digital-smile-design`
      }
    },
    {
      slug: "smile-gallery",
      title: "Smile Gallery",
      navLabel: "Smile Gallery",
      intro:
        "A cautious visual proof page that avoids guarantees and keeps clinical review visible.",
      seo: {
        title: "Smile Gallery | Vellum Dental Atelier",
        description:
          "Cosmetic dentistry smile gallery route with careful consultation-dependent wording.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/smile-gallery`
      }
    },
    {
      slug: "technology",
      title: "Technology",
      navLabel: "Technology",
      intro:
        "Imaging, planning, shade communication, and lab coordination content for premium care.",
      seo: {
        title: "Technology | Vellum Dental Atelier",
        description:
          "Dental technology page for scanning, imaging, planning and lab communication.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/technology`
      }
    },
    {
      slug: "team",
      title: "Team",
      navLabel: "Team",
      intro:
        "Practitioner profiles with credentials, focus areas, and patient communication style.",
      seo: {
        title: "Team | Vellum Dental Atelier",
        description: "Premium cosmetic dental team page with credentials and treatment focus.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/team`
      }
    },
    {
      slug: "pricing-consultation",
      title: "Pricing & Consultation",
      navLabel: "Consultation",
      intro:
        "Transparent consultation flow with estimate caveats, planning stages, and safe form fields.",
      seo: {
        title: "Pricing & Consultation | Vellum Dental Atelier",
        description: "Cosmetic dental consultation page with pricing caveats and appointment form.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/pricing-consultation`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Clinic address, contact details, consultation timing, and arrival notes.",
      seo: {
        title: "Contact | Vellum Dental Atelier",
        description: "Contact and location page for a premium cosmetic dentistry template.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Questions about suitability, implants, whitening, financing, aftercare, and safety.",
      seo: {
        title: "FAQ | Vellum Dental Atelier",
        description:
          "Cosmetic dentist FAQ content with consultation-first answers and safety language.",
        canonicalPath: `${dentistCosmeticDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "Cosmetic dentistry planned in stages, not promises.",
    subtitle:
      "Vellum Dental Atelier presents veneers, whitening, implants, and smile planning through consultation, diagnostics, clinical judgement, and careful follow-up.",
    primaryCta: "Schedule consultation",
    secondaryCta: "View treatment options",
    safetyNote:
      "Suitability, timing, fees, and outcomes depend on examination, imaging, health history, and clinician review.",
    proofPoints: [
      "Digital planning before irreversible treatment",
      "Implant assessment with imaging and maintenance notes",
      "Written estimates after diagnosis and consultation"
    ]
  },
  treatments: [
    {
      name: "Digital Smile Planning",
      slug: "treatments/digital-smile-design",
      summary: "Photo records, shade discussion, mockup options, and phased recommendations.",
      duration: "Consultation first",
      expectations: "Planning does not guarantee suitability or final result."
    },
    {
      name: "Porcelain Veneers",
      slug: "treatments/digital-smile-design",
      summary: "Conservative preparation discussion, shade planning, temporary stage, and review.",
      duration: "Usually staged",
      expectations: "Tooth structure, bite, gum health, and expectations are reviewed first."
    },
    {
      name: "Whitening & Finishing",
      slug: "treatments/digital-smile-design",
      summary: "Shade assessment, sensitivity discussion, home-care instructions, and maintenance.",
      duration: "Case dependent",
      expectations: "Results vary by enamel, restorations, habits, and clinical suitability."
    }
  ],
  implantJourney: [
    {
      step: "01",
      title: "Assessment",
      detail:
        "Health history, gum condition, bite, imaging needs, and patient priorities are reviewed."
    },
    {
      step: "02",
      title: "Planning",
      detail:
        "The clinician explains possible timelines, alternatives, maintenance, and referral needs."
    },
    {
      step: "03",
      title: "Aftercare",
      detail: "Follow-up, hygiene, and long-term maintenance are built into the treatment plan."
    }
  ],
  technology: [
    {
      title: "Digital scanning",
      detail: "Used to support planning and communication; it does not replace clinical diagnosis."
    },
    {
      title: "Guided implant planning",
      detail: "Imaging and treatment plans are reviewed before suitability or timing is confirmed."
    },
    {
      title: "Shade communication",
      detail: "Photography and lab notes help set realistic expectations before cosmetic work."
    }
  ],
  team: [
    {
      name: "Dr. Lena Moreau",
      credentials: "DDS, cosmetic restorative dentistry",
      focus: "Smile planning, veneers, shade communication, and restorative sequencing."
    },
    {
      name: "Dr. Mateo Rios",
      credentials: "DMD, implant and restorative planning",
      focus: "Implant assessment, treatment staging, maintenance planning, and patient education."
    },
    {
      name: "Iris Novak",
      credentials: "Treatment coordinator",
      focus: "Consultation scheduling, written estimates, aftercare timing, and finance discussion."
    }
  ],
  gallery: [
    {
      title: "Shade planning record",
      alt: "Cosmetic dental shade planning card with neutral photography and clinical notes.",
      tone: "service"
    },
    {
      title: "Consultation suite",
      alt: "Premium dental consultation room with soft daylight and privacy screen.",
      tone: "room"
    },
    {
      title: "Smile planning review",
      alt: "Dentist reviewing smile planning records with a patient at a consultation desk.",
      tone: "private"
    },
    {
      title: "Sterile instrument tray",
      alt: "Prepared dental instrument tray in a calm premium clinical treatment room.",
      tone: "service"
    }
  ],
  testimonials: [
    {
      quote:
        "No customer quote is published in this demonstration. Add this block only after receiving verified, permissioned feedback.",
      author: "Review placeholder",
      context: "No review published"
    }
  ],
  appointment: {
    title: "Schedule consultation",
    description:
      "This safe demo form avoids sensitive health history. A real clinic should connect secure intake, consent, and legal review before launch.",
    submitLabel: "Request consultation",
    successMessage: "Consultation request received. This demo keeps the response local.",
    emptySelectLabel: "Select a consultation type",
    validation: {
      required: "{field} is required.",
      email: "Enter a valid email address.",
      numberMin: "{field} must be at least {min}."
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      {
        name: "consultation",
        label: "Consultation type",
        type: "select",
        required: true,
        options: ["Cosmetic consultation", "Implant planning", "Whitening review", "Second opinion"]
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      {
        name: "notes",
        label: "Planning notes",
        type: "textarea",
        required: false,
        helperText: "Optional. Do not enter medical history, ID numbers, or sensitive details."
      }
    ]
  },
  faq: [
    {
      question: "Are cosmetic results guaranteed?",
      answer:
        "No. Suitability and likely outcomes depend on consultation, imaging, diagnosis, and clinical review."
    },
    {
      question: "Can prices be listed?",
      answer:
        "The template supports consultation fees and estimate ranges, but final fees should follow diagnosis and legal review."
    },
    {
      question: "Is implant treatment suitable for everyone?",
      answer:
        "No. Implant suitability depends on health history, bone, gum condition, imaging, and clinician assessment."
    },
    {
      question: "Can before-and-after images be used?",
      answer:
        "Use local advertising rules, consent, disclaimers, and careful wording. The demo uses cautious placeholder gallery language."
    }
  ]
} as const satisfies DentistCosmeticContent;

export const beautySalonContent = {
  id: "beauty-01-salon",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Roux & Row Salon",
    tagline: "Cuts, colour, styling, brows, and maintenance appointments in a sharp local salon.",
    description:
      "A fictional modern salon template for service discovery, pricing clarity, stylist selection, offers, booking and repeat local clients.",
    phone: "+1 312 555 0152",
    email: "book@rouxandrow.example",
    address: "402 Damen Arcade, Chicago, IL",
    hours: [
      "Tue-Fri 9 AM-8 PM",
      "Sat 9 AM-6 PM",
      "Sun-Mon closed",
      "Colour consultations by appointment"
    ]
  },
  navigation: [
    { label: "Services", slug: "services" },
    { label: "Stylists", slug: "stylists" },
    { label: "Pricing", slug: "pricing" },
    { label: "Gallery", slug: "gallery" },
    { label: "Offers", slug: "offers" },
    { label: "Booking", slug: "booking" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro:
        "A fashion-forward salon homepage focused on services, stylists, pricing, and booking.",
      seo: {
        title: "Roux & Row Salon | Beauty Salon Template",
        description:
          "Modern beauty salon template with services, stylists, pricing, gallery, offers and booking.",
        canonicalPath: beautySalonDefaultBasePath
      }
    },
    {
      slug: "services",
      title: "Services",
      navLabel: "Services",
      intro: "A clear service menu for cuts, colour, styling, brows, and beauty appointments.",
      seo: {
        title: "Services | Roux & Row Salon",
        description: "Salon service menu with duration, price-from notes, and booking CTAs.",
        canonicalPath: `${beautySalonDefaultBasePath}/services`
      }
    },
    {
      slug: "services/copper-gloss-colour",
      title: "Copper Gloss Colour",
      navLabel: "Service Detail",
      intro: "A service detail route for colour consultation, maintenance, timing, and aftercare.",
      seo: {
        title: "Copper Gloss Colour | Roux & Row Salon",
        description: "Salon service detail page for colour consultation and maintenance planning.",
        canonicalPath: `${beautySalonDefaultBasePath}/services/copper-gloss-colour`
      }
    },
    {
      slug: "stylists",
      title: "Stylists",
      navLabel: "Stylists",
      intro: "Stylist cards with roles, specialties, and booking direction.",
      seo: {
        title: "Stylists | Roux & Row Salon",
        description: "Salon stylist profile route with role, specialty and booking context.",
        canonicalPath: `${beautySalonDefaultBasePath}/stylists`
      }
    },
    {
      slug: "pricing",
      title: "Pricing",
      navLabel: "Pricing",
      intro: "Price clarity for common services with consultation notes for colour work.",
      seo: {
        title: "Pricing | Roux & Row Salon",
        description:
          "Salon pricing page for cuts, colour, styling, brows and maintenance services.",
        canonicalPath: `${beautySalonDefaultBasePath}/pricing`
      }
    },
    {
      slug: "gallery",
      title: "Gallery",
      navLabel: "Gallery",
      intro: "Cut, colour, styling, and brow visual proof with descriptive alt text.",
      seo: {
        title: "Gallery | Roux & Row Salon",
        description: "Salon gallery route with fashion-forward visual direction.",
        canonicalPath: `${beautySalonDefaultBasePath}/gallery`
      }
    },
    {
      slug: "offers",
      title: "Offers",
      navLabel: "Offers",
      intro: "New client, maintenance, and weekday offers with realistic terms.",
      seo: {
        title: "Offers | Roux & Row Salon",
        description: "Beauty salon offers page with clear eligibility and booking CTA.",
        canonicalPath: `${beautySalonDefaultBasePath}/offers`
      }
    },
    {
      slug: "booking",
      title: "Booking",
      navLabel: "Booking",
      intro: "A booking request form for service, stylist preference, timing, and notes.",
      seo: {
        title: "Booking | Roux & Row Salon",
        description: "Book a salon treatment through an accessible request form.",
        canonicalPath: `${beautySalonDefaultBasePath}/booking`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Hours, location, phone, email, arrival notes, and local appointment guidance.",
      seo: {
        title: "Contact | Roux & Row Salon",
        description: "Contact and location page for a modern salon template.",
        canonicalPath: `${beautySalonDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro:
        "Questions about new clients, colour consultations, deposits, patch tests, and timing.",
      seo: {
        title: "FAQ | Roux & Row Salon",
        description: "Salon FAQ content for appointments, colour, pricing, policies, and access.",
        canonicalPath: `${beautySalonDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "Sharp cuts, honest colour plans, and appointments that keep their shape.",
    subtitle:
      "Roux & Row keeps services, stylist choice, price expectations and maintenance timing clear before the appointment request.",
    primaryCta: "Book treatment",
    secondaryCta: "View services",
    styleNote: "Next available: cut appointments this week, colour consultations from Thursday.",
    proofPoints: [
      "Colour plans include maintenance timing",
      "Stylist profiles guide the first booking",
      "Transparent price-from notes before inquiry"
    ]
  },
  services: [
    {
      name: "Copper Gloss Colour",
      slug: "services/copper-gloss-colour",
      summary: "Consultation, warm gloss, tone refresh, blow-dry, and home-care notes.",
      duration: "105-135 min",
      priceFrom: "From $165"
    },
    {
      name: "Cut & Shape",
      slug: "services/copper-gloss-colour",
      summary: "Dry consultation, wash, cut, shape refinement, and styling plan.",
      duration: "60-75 min",
      priceFrom: "From $82"
    },
    {
      name: "Brow Detail",
      slug: "services/copper-gloss-colour",
      summary: "Shape, tint when suitable, skin prep, and simple maintenance notes.",
      duration: "30 min",
      priceFrom: "From $38"
    }
  ],
  stylists: [
    {
      name: "Mika Lane",
      role: "Colour lead",
      focus: "Copper, brunette gloss, corrective consults, and realistic maintenance plans."
    },
    {
      name: "Sera Quinn",
      role: "Cutting specialist",
      focus: "Bobs, long layers, fringe work, and low-effort shape plans."
    },
    {
      name: "Noa Brooks",
      role: "Styling and brows",
      focus: "Event styling, blow-dry rhythm, brow shape, and repeat appointment timing."
    }
  ],
  pricing: [
    {
      service: "Cut & Shape",
      price: "From $82",
      note: "Price varies by stylist level and hair density."
    },
    {
      service: "Gloss Colour",
      price: "From $135",
      note: "Consultation required for new colour clients."
    },
    {
      service: "Blow-dry / Styling",
      price: "From $54",
      note: "Event timing and extensions quoted before booking."
    },
    {
      service: "Brows",
      price: "From $38",
      note: "Tint and shape suitability checked before service."
    }
  ],
  gallery: [
    {
      title: "Copper gloss finish",
      alt: "Salon client with copper gloss colour and softly waved shoulder-length hair.",
      tone: "dish"
    },
    {
      title: "Cutting station",
      alt: "Modern salon cutting station with mirror, chair, clips, and product shelf.",
      tone: "room"
    },
    {
      title: "Brow detail tray",
      alt: "Brow styling tools and tint tray prepared on a clean salon counter.",
      tone: "service"
    },
    {
      title: "Styling wall",
      alt: "Salon styling wall with editorial hair references and warm task lighting.",
      tone: "private"
    }
  ],
  testimonials: [
    {
      quote:
        "No customer quote is published in this demonstration. Add this block only after receiving verified, permissioned feedback.",
      author: "Review placeholder",
      context: "No review published"
    }
  ],
  offers: [
    {
      title: "New client shape check",
      description: "Cut consultation, shape plan, and blow-dry with a maintenance timing card.",
      date: "First appointment only"
    },
    {
      title: "Weekday gloss refresh",
      description: "Gloss colour refresh with home-care note for returning clients.",
      date: "Tue-Thu before 3 PM"
    }
  ],
  booking: {
    title: "Book treatment",
    description:
      "This demo form validates salon booking details locally and leaves deposits, patch tests, and real scheduling to launch configuration.",
    submitLabel: "Request appointment",
    successMessage: "Appointment request received. This demo keeps the response local.",
    emptySelectLabel: "Select a service",
    validation: {
      required: "{field} is required.",
      email: "Enter a valid email address.",
      numberMin: "{field} must be at least {min}."
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "service",
        label: "Service",
        type: "select",
        required: true,
        options: ["Copper Gloss Colour", "Cut & Shape", "Brow Detail", "Blow-dry / Styling"]
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "time", label: "Preferred time", type: "time", required: true },
      {
        name: "notes",
        label: "Hair or beauty notes",
        type: "textarea",
        required: false,
        helperText: "Optional: current colour, length, timing limits, allergies, or access needs."
      }
    ]
  },
  faq: [
    {
      question: "Do new colour clients need a consultation?",
      answer:
        "Yes. New colour clients should book a consultation so timing, price, patch testing, and expectations can be confirmed."
    },
    {
      question: "Are prices fixed?",
      answer:
        "The template uses price-from guidance. Final pricing can vary by stylist, hair density, product needs, and timing."
    },
    {
      question: "Can clients choose a stylist?",
      answer:
        "Yes. Stylist profiles and booking fields support preferred stylist selection without blocking inquiry."
    },
    {
      question: "Does the demo form take deposits?",
      answer:
        "No. It validates appointment details locally. Real deposits and scheduling should be connected at launch."
    }
  ]
} as const satisfies BeautySalonContent;

export function createHotelBoutiquePath(
  basePath = hotelBoutiqueDefaultBasePath,
  slug: HotelBoutiquePageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createDentistCosmeticPath(
  basePath = dentistCosmeticDefaultBasePath,
  slug: DentistCosmeticPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createBeautySalonPath(
  basePath = beautySalonDefaultBasePath,
  slug: BeautySalonPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getHotelBoutiqueNavigation(basePath = hotelBoutiqueDefaultBasePath) {
  return createTemplateNavigation(basePath, hotelBoutiqueContent.navigation);
}

export function getDentistCosmeticNavigation(basePath = dentistCosmeticDefaultBasePath) {
  return createTemplateNavigation(basePath, dentistCosmeticContent.navigation);
}

export function getBeautySalonNavigation(basePath = beautySalonDefaultBasePath) {
  return createTemplateNavigation(basePath, beautySalonContent.navigation);
}

export function getHotelBoutiquePage(
  slug: HotelBoutiquePageSlug,
  basePath = hotelBoutiqueDefaultBasePath
): PageContent<HotelBoutiquePageSlug> {
  return resolveTemplatePage({
    pages: hotelBoutiqueContent.pages,
    slug,
    basePath,
    locale: hotelBoutiqueContent.locale.defaultLocale,
    templateLabel: "hotel boutique"
  });
}

export function getDentistCosmeticPage(
  slug: DentistCosmeticPageSlug,
  basePath = dentistCosmeticDefaultBasePath
): PageContent<DentistCosmeticPageSlug> {
  return resolveTemplatePage({
    pages: dentistCosmeticContent.pages,
    slug,
    basePath,
    locale: dentistCosmeticContent.locale.defaultLocale,
    templateLabel: "dentist cosmetic"
  });
}

export function getBeautySalonPage(
  slug: BeautySalonPageSlug,
  basePath = beautySalonDefaultBasePath
): PageContent<BeautySalonPageSlug> {
  return resolveTemplatePage({
    pages: beautySalonContent.pages,
    slug,
    basePath,
    locale: beautySalonContent.locale.defaultLocale,
    templateLabel: "beauty salon"
  });
}
