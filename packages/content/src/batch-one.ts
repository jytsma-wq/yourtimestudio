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

export type HotelLuxuryPageSlug =
  | ""
  | "rooms"
  | "rooms/signature-suite"
  | "dining"
  | "spa"
  | "experiences"
  | "gallery"
  | "offers"
  | "booking"
  | "contact"
  | "faq";

export type BeautySpaPageSlug =
  | ""
  | "treatments"
  | "treatments/mineral-reset"
  | "packages"
  | "memberships"
  | "about"
  | "gallery"
  | "gift-cards"
  | "booking"
  | "contact"
  | "faq";

export type DentistClinicalPageSlug =
  | ""
  | "treatments"
  | "treatments/preventive-care"
  | "team"
  | "pricing-insurance"
  | "reviews"
  | "emergency-dental"
  | "appointment"
  | "contact"
  | "faq";

export type HotelLuxuryContent = {
  id: "hotel-01-luxury";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<HotelLuxuryPageSlug>[];
  pages: readonly PageContent<HotelLuxuryPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    bookingNote: string;
    proofPoints: readonly string[];
  };
  rooms: readonly {
    name: string;
    slug: "rooms/signature-suite";
    summary: string;
    sleeps: string;
    size: string;
    priceFrom: string;
    amenities: readonly string[];
  }[];
  amenities: readonly {
    title: string;
    description: string;
  }[];
  experiences: readonly {
    title: string;
    detail: string;
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
  booking: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type BeautySpaContent = {
  id: "beauty-02-spa";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<BeautySpaPageSlug>[];
  pages: readonly PageContent<BeautySpaPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    sensoryNote: string;
    proofPoints: readonly string[];
  };
  treatments: readonly {
    name: string;
    slug: "treatments/mineral-reset";
    duration: string;
    priceFrom: string;
    description: string;
  }[];
  packages: readonly {
    name: string;
    description: string;
    includes: readonly string[];
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
  booking: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type DentistClinicalContent = {
  id: "dentist-01-clinical";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics & {
    emergencyPhone: string;
  };
  navigation: readonly NavigationItem<DentistClinicalPageSlug>[];
  pages: readonly PageContent<DentistClinicalPageSlug>[];
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
    slug: "treatments/preventive-care";
    summary: string;
    duration: string;
    expectations: string;
  }[];
  team: readonly {
    name: string;
    credentials: string;
    focus: string;
  }[];
  insurance: readonly string[];
  reviews: readonly {
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

export const hotelLuxuryDefaultBasePath = "/templates/hotel-01-luxury";
export const beautySpaDefaultBasePath = "/templates/beauty-02-spa";
export const dentistClinicalDefaultBasePath = "/templates/dentist-01-clinical";

export const hotelLuxuryPageSlugs = [
  "",
  "rooms",
  "rooms/signature-suite",
  "dining",
  "spa",
  "experiences",
  "gallery",
  "offers",
  "booking",
  "contact",
  "faq"
] as const satisfies readonly HotelLuxuryPageSlug[];

export const beautySpaPageSlugs = [
  "",
  "treatments",
  "treatments/mineral-reset",
  "packages",
  "memberships",
  "about",
  "gallery",
  "gift-cards",
  "booking",
  "contact",
  "faq"
] as const satisfies readonly BeautySpaPageSlug[];

export const dentistClinicalPageSlugs = [
  "",
  "treatments",
  "treatments/preventive-care",
  "team",
  "pricing-insurance",
  "reviews",
  "emergency-dental",
  "appointment",
  "contact",
  "faq"
] as const satisfies readonly DentistClinicalPageSlug[];

const localeConfig = {
  defaultLocale: "en",
  fallbackLocale: "en",
  enabledLocales: ["en"],
  directions: {
    en: "ltr"
  }
} as const satisfies TemplateLocaleConfig;

export const hotelLuxuryContent = {
  id: "hotel-01-luxury",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Aurelian House",
    tagline: "Suites, spa, dining, and concierge service in a quiet city house.",
    description:
      "A fictional luxury hotel template built for direct bookings, premium room presentation, spa, dining, concierge, and confidence-building policies.",
    phone: "+1 415 555 0146",
    email: "stay@aurelianhouse.example",
    address: "72 Arden Row, San Francisco, CA",
    hours: [
      "Check-in from 3 PM",
      "Concierge daily 7 AM-11 PM",
      "Spa by appointment",
      "Breakfast 7 AM-10:30 AM"
    ]
  },
  navigation: [
    { label: "Rooms", slug: "rooms" },
    { label: "Dining", slug: "dining" },
    { label: "Spa", slug: "spa" },
    { label: "Experiences", slug: "experiences" },
    { label: "Offers", slug: "offers" },
    { label: "Booking", slug: "booking" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A luxury hotel homepage focused on suites, service, and direct booking.",
      seo: {
        title: "Aurelian House | Luxury Hotel Template",
        description:
          "Luxury hotel template with suites, spa, dining, concierge, offers, gallery and direct booking inquiry.",
        canonicalPath: hotelLuxuryDefaultBasePath
      }
    },
    {
      slug: "rooms",
      title: "Rooms & Suites",
      navLabel: "Rooms",
      intro: "Editorial room cards with practical amenities, occupancy, size, and rates.",
      seo: {
        title: "Rooms & Suites | Aurelian House",
        description: "Browse premium room and suite content for a luxury hotel template.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/rooms`
      }
    },
    {
      slug: "rooms/signature-suite",
      title: "Signature Suite",
      navLabel: "Suite Detail",
      intro: "A room detail route for suite selling points, policies, and upgrade cues.",
      seo: {
        title: "Signature Suite | Aurelian House",
        description: "Room detail page with luxury suite amenities, rate notes, and booking CTA.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/rooms/signature-suite`
      }
    },
    {
      slug: "dining",
      title: "Dining",
      navLabel: "Dining",
      intro: "Fine dining, breakfast, and in-room service content for premium hotel guests.",
      seo: {
        title: "Dining | Aurelian House",
        description:
          "Hotel dining page for a premium template with breakfast, terrace, and room service.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/dining`
      }
    },
    {
      slug: "spa",
      title: "Spa",
      navLabel: "Spa",
      intro: "A calm spa route with treatment notes, appointment context, and wellness proof.",
      seo: {
        title: "Spa | Aurelian House",
        description: "Luxury hotel spa page with treatment teasers and booking handoff.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/spa`
      }
    },
    {
      slug: "experiences",
      title: "Experiences",
      navLabel: "Experiences",
      intro: "Concierge-led city, wellness, and private dining experiences.",
      seo: {
        title: "Experiences | Aurelian House",
        description: "Hotel experiences page for concierge-led premium stays.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/experiences`
      }
    },
    {
      slug: "gallery",
      title: "Gallery",
      navLabel: "Gallery",
      intro: "Suite, spa, dining, and service imagery with descriptive accessible labels.",
      seo: {
        title: "Gallery | Aurelian House",
        description: "Luxury hotel gallery route with original image direction.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/gallery`
      }
    },
    {
      slug: "offers",
      title: "Offers",
      navLabel: "Offers",
      intro: "Seasonal offers with direct-booking advantages and clear eligibility.",
      seo: {
        title: "Offers | Aurelian House",
        description: "Luxury hotel offers page with direct booking incentives and terms.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/offers`
      }
    },
    {
      slug: "booking",
      title: "Booking",
      navLabel: "Booking",
      intro: "A focused booking inquiry form with rate context and local validation.",
      seo: {
        title: "Booking | Aurelian House",
        description: "Book a stay through an accessible luxury hotel inquiry form.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/booking`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Address, phone, email, hours, transport, and arrival guidance.",
      seo: {
        title: "Contact | Aurelian House",
        description: "Contact and location page for a luxury hotel template.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Booking, cancellation, spa, dining, parking, and accessibility answers.",
      seo: {
        title: "FAQ | Aurelian House",
        description: "Luxury hotel FAQ content for booking policies, amenities, and accessibility.",
        canonicalPath: `${hotelLuxuryDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "A quieter kind of luxury, reserved around the stay.",
    subtitle:
      "Aurelian House frames suites, spa, dining, and concierge service around a direct booking path that feels considered rather than transactional.",
    primaryCta: "Book a stay",
    secondaryCta: "Explore rooms",
    bookingNote:
      "Direct-book benefits: flexible change window, breakfast credit, and concierge pre-arrival notes.",
    proofPoints: [
      "18 suites and garden rooms",
      "Spa appointments held for hotel guests",
      "Private dining and airport transfers by request"
    ]
  },
  rooms: [
    {
      name: "Signature Suite",
      slug: "rooms/signature-suite",
      summary: "Separate lounge, limestone bath, terrace doors, and a calm work table.",
      sleeps: "Sleeps 2",
      size: "62 m2",
      priceFrom: "From $640",
      amenities: ["Terrace view", "Soaking bath", "Breakfast credit", "Evening turndown"]
    },
    {
      name: "Garden Room",
      slug: "rooms/signature-suite",
      summary: "A lower-floor room with garden outlook, reading chair, and rain shower.",
      sleeps: "Sleeps 2",
      size: "38 m2",
      priceFrom: "From $420",
      amenities: ["Garden outlook", "Rain shower", "Writing desk", "Spa priority"]
    },
    {
      name: "House Apartment",
      slug: "rooms/signature-suite",
      summary: "Residential layout for longer stays with dining table and service pantry.",
      sleeps: "Sleeps 4",
      size: "88 m2",
      priceFrom: "From $920",
      amenities: ["Two bedrooms", "Pantry", "Private arrival", "Concierge itinerary"]
    }
  ],
  amenities: [
    {
      title: "Concierge before arrival",
      description:
        "Airport transfer, restaurant timing, flowers, and spa requests collected before check-in."
    },
    {
      title: "Wellness floor",
      description: "Treatment rooms, dry heat, recovery lounge, and guest-priority booking windows."
    },
    {
      title: "Quiet dining",
      description:
        "Breakfast, terrace lunch, evening tasting menu, and in-room dining with clear hours."
    },
    {
      title: "Direct-book clarity",
      description:
        "Rate notes, cancellation window, deposit expectations, and taxes visible near the form."
    }
  ],
  experiences: [
    {
      title: "Gallery breakfast",
      detail: "A seated breakfast in the library before the public rooms open."
    },
    {
      title: "Bathhouse hour",
      detail: "A private spa timing block held for suite guests on arrival day."
    },
    {
      title: "After-hours table",
      detail: "Concierge-arranged dining for late arrivals and small celebrations."
    }
  ],
  gallery: [
    {
      title: "Suite with morning terrace light",
      alt: "Luxury hotel suite with linen bed, warm stone surfaces, and a terrace beyond.",
      tone: "suite"
    },
    {
      title: "Spa corridor in quiet stone",
      alt: "Calm hotel spa corridor with soft light and stone texture.",
      tone: "spa"
    },
    {
      title: "Dining room before breakfast",
      alt: "Refined hotel dining room prepared for breakfast service.",
      tone: "dining"
    },
    {
      title: "Concierge desk with arrival notes",
      alt: "Concierge desk with handwritten arrival cards and room keys.",
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
  booking: {
    title: "Request dates",
    description:
      "This demo form validates booking details locally and shows where a hotel can connect a real booking engine.",
    submitLabel: "Request availability",
    successMessage: "Availability request received. This demo keeps the response local.",
    emptySelectLabel: "Select a room type",
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
        options: ["Signature Suite", "Garden Room", "House Apartment"]
      },
      {
        name: "notes",
        label: "Arrival notes",
        type: "textarea",
        required: false,
        helperText: "Optional: spa time, transfer needs, celebration, or accessibility requests."
      }
    ]
  },
  faq: [
    {
      question: "Does the booking form take payment?",
      answer:
        "No. The demo form validates the request locally and leaves payment integration to launch configuration."
    },
    {
      question: "Can the suite detail page support multiple room types?",
      answer: "Yes. The data model supports room slugs, rates, amenities, policies, and galleries."
    },
    {
      question: "Where should cancellation policies appear?",
      answer:
        "Place cancellation, deposit, tax, and accessibility notes near room details and booking forms."
    },
    {
      question: "Can spa and dining be booked separately?",
      answer:
        "Yes. The routes are structured for hotel guests first, with optional external booking handoffs."
    }
  ]
} as const satisfies HotelLuxuryContent;

export const beautySpaContent = {
  id: "beauty-02-spa",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Luma Ritual Spa",
    tagline: "Slow massage, skincare, and recovery rituals in a calm wellness studio.",
    description:
      "A fictional premium wellness spa template for treatment discovery, ritual packages, memberships, gift cards, and booking inquiries.",
    phone: "+1 310 555 0184",
    email: "care@lumaritual.example",
    address: "44 Cedar Lane, Santa Monica, CA",
    hours: [
      "Mon-Fri 9 AM-8 PM",
      "Sat-Sun 9 AM-6 PM",
      "Quiet hours before 11 AM",
      "Gift card pickup by appointment"
    ]
  },
  navigation: [
    { label: "Treatments", slug: "treatments" },
    { label: "Packages", slug: "packages" },
    { label: "Memberships", slug: "memberships" },
    { label: "Gallery", slug: "gallery" },
    { label: "Gift Cards", slug: "gift-cards" },
    { label: "Booking", slug: "booking" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A serene spa homepage for rituals, skincare, memberships, and booking.",
      seo: {
        title: "Luma Ritual Spa | Wellness Spa Template",
        description:
          "Premium wellness spa template with treatments, rituals, memberships, gift cards, gallery and booking.",
        canonicalPath: beautySpaDefaultBasePath
      }
    },
    {
      slug: "treatments",
      title: "Treatments",
      navLabel: "Treatments",
      intro: "Massage, skincare, bodywork, and recovery services with duration and price clarity.",
      seo: {
        title: "Treatments | Luma Ritual Spa",
        description: "Wellness spa treatment menu with duration, pricing, and booking CTAs.",
        canonicalPath: `${beautySpaDefaultBasePath}/treatments`
      }
    },
    {
      slug: "treatments/mineral-reset",
      title: "Mineral Reset Ritual",
      navLabel: "Treatment Detail",
      intro: "A treatment detail page for steps, sensory cues, expectations, and aftercare.",
      seo: {
        title: "Mineral Reset Ritual | Luma Ritual Spa",
        description: "Spa treatment detail page for a calm premium wellness template.",
        canonicalPath: `${beautySpaDefaultBasePath}/treatments/mineral-reset`
      }
    },
    {
      slug: "packages",
      title: "Spa Packages",
      navLabel: "Packages",
      intro: "Ritual packages for recovery days, couples, gifting, and seasonal care.",
      seo: {
        title: "Spa Packages | Luma Ritual Spa",
        description: "Premium spa package route with ritual bundles and booking CTA.",
        canonicalPath: `${beautySpaDefaultBasePath}/packages`
      }
    },
    {
      slug: "memberships",
      title: "Memberships",
      navLabel: "Memberships",
      intro: "Membership cards with monthly benefits, cadence, and realistic limitations.",
      seo: {
        title: "Memberships | Luma Ritual Spa",
        description: "Wellness spa membership route with benefits and conversion CTA.",
        canonicalPath: `${beautySpaDefaultBasePath}/memberships`
      }
    },
    {
      slug: "about",
      title: "About",
      navLabel: "About",
      intro: "A calm studio story focused on rituals, materials, and guest care.",
      seo: {
        title: "About | Luma Ritual Spa",
        description: "About page for a fictional premium wellness spa template.",
        canonicalPath: `${beautySpaDefaultBasePath}/about`
      }
    },
    {
      slug: "gallery",
      title: "Gallery",
      navLabel: "Gallery",
      intro: "Treatment rooms, product textures, quiet lounges, and ritual details.",
      seo: {
        title: "Gallery | Luma Ritual Spa",
        description: "Spa gallery route with accessible visual proof content.",
        canonicalPath: `${beautySpaDefaultBasePath}/gallery`
      }
    },
    {
      slug: "gift-cards",
      title: "Gift Cards",
      navLabel: "Gift Cards",
      intro: "Gift card positioning for rituals, packages, and easy recipient scheduling.",
      seo: {
        title: "Gift Cards | Luma Ritual Spa",
        description: "Gift card page for a premium wellness spa template.",
        canonicalPath: `${beautySpaDefaultBasePath}/gift-cards`
      }
    },
    {
      slug: "booking",
      title: "Booking",
      navLabel: "Booking",
      intro: "A gentle booking form with treatment, therapist preference, and timing.",
      seo: {
        title: "Booking | Luma Ritual Spa",
        description: "Reserve a treatment through an accessible spa booking form.",
        canonicalPath: `${beautySpaDefaultBasePath}/booking`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Hours, location, contact details, parking, and arrival notes.",
      seo: {
        title: "Contact | Luma Ritual Spa",
        description: "Contact and location route for a premium spa template.",
        canonicalPath: `${beautySpaDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Booking, preparation, memberships, gift cards, accessibility, and policies.",
      seo: {
        title: "FAQ | Luma Ritual Spa",
        description: "Spa FAQ content for bookings, memberships, preparation, and policies.",
        canonicalPath: `${beautySpaDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "Rituals paced for nervous systems, not appointment slots.",
    subtitle:
      "Luma Ritual Spa brings treatments, unhurried rituals, memberships and gift cards into one calm path to reservation.",
    primaryCta: "Reserve a treatment",
    secondaryCta: "Explore rituals",
    sensoryNote: "Soft arrival window, mineral tea, and therapist notes before every ritual.",
    proofPoints: [
      "Massage, skincare, and recovery rituals",
      "Memberships with monthly treatment credit",
      "Gift cards for rituals and packages"
    ]
  },
  treatments: [
    {
      name: "Mineral Reset Ritual",
      slug: "treatments/mineral-reset",
      duration: "90 min",
      priceFrom: "From $180",
      description: "Warm compress, mineral bodywork, scalp release, and quiet recovery tea."
    },
    {
      name: "Botanical Facial",
      slug: "treatments/mineral-reset",
      duration: "75 min",
      priceFrom: "From $155",
      description:
        "Skin consultation, gentle resurfacing, facial massage, and barrier-focused finishing."
    },
    {
      name: "Deep Rest Massage",
      slug: "treatments/mineral-reset",
      duration: "60 or 90 min",
      priceFrom: "From $130",
      description: "Slow pressure work for shoulders, hips, and jaw tension with simple aftercare."
    }
  ],
  packages: [
    {
      name: "Half-Day Stillness",
      description: "A massage, facial, lounge hour, and light meal for a reset day.",
      includes: ["Mineral bodywork", "Botanical facial", "Quiet lounge", "Take-home oil"]
    },
    {
      name: "Couples Recovery",
      description: "Side-by-side treatment timing with separate therapist notes and shared tea.",
      includes: ["Two massages", "Private arrival", "Tea service", "Gift card option"]
    },
    {
      name: "Monthly Ritual",
      description: "A membership-ready package built for recurring wellness bookings.",
      includes: ["Treatment credit", "Priority weekends", "Product savings", "Guest pass"]
    }
  ],
  gallery: [
    {
      title: "Stone treatment room",
      alt: "Calm spa treatment room with stone basin, folded towels, and diffused daylight.",
      tone: "room"
    },
    {
      title: "Botanical oils",
      alt: "Botanical oils and mineral bowls arranged on a warm stone surface.",
      tone: "botanical"
    },
    {
      title: "Quiet recovery lounge",
      alt: "Soft spa lounge with linen curtains and warm neutral seating.",
      tone: "lounge"
    },
    {
      title: "Gift ritual wrapping",
      alt: "Spa gift card packaging with natural paper and small botanical detail.",
      tone: "gift"
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
  booking: {
    title: "Reserve a ritual",
    description:
      "This safe demo form validates treatment requests locally and shows how booking details stay calm and clear.",
    submitLabel: "Reserve treatment",
    successMessage: "Treatment request received. This demo keeps the response local.",
    emptySelectLabel: "Select a treatment",
    validation: {
      required: "{field} is required.",
      email: "Enter a valid email address.",
      numberMin: "{field} must be at least {min}."
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "treatment",
        label: "Treatment",
        type: "select",
        required: true,
        options: [
          "Mineral Reset Ritual",
          "Botanical Facial",
          "Deep Rest Massage",
          "Gift card consultation"
        ]
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "time", label: "Preferred time", type: "time", required: true },
      {
        name: "notes",
        label: "Care notes",
        type: "textarea",
        required: false,
        helperText: "Optional: pressure preference, pregnancy, allergies, or accessibility needs."
      }
    ]
  },
  faq: [
    {
      question: "Should guests arrive early?",
      answer:
        "The template recommends a 15-minute arrival window for check-in, therapist notes, and settling in."
    },
    {
      question: "Can memberships be paused?",
      answer:
        "Membership terms should be customized at launch; this template leaves room for pause and rollover rules."
    },
    {
      question: "Do gift cards expire?",
      answer:
        "Gift card expiry and legal terms vary by region, so the launch team should confirm local rules."
    },
    {
      question: "Does the form collect health details?",
      answer:
        "The demo only collects basic care notes. Sensitive intake should be handled in a secure clinical or spa system."
    }
  ]
} as const satisfies BeautySpaContent;

export const dentistClinicalContent = {
  id: "dentist-01-clinical",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Clearline Dental Studio",
    tagline: "General dentistry with transparent appointments, safety, and insurance guidance.",
    description:
      "A fictional modern dental clinic template focused on trust, treatment clarity, insurance, emergency guidance, and appointment booking.",
    phone: "+1 646 555 0163",
    emergencyPhone: "+1 646 555 0199",
    email: "appointments@clearlinedental.example",
    address: "205 Mercer Street, New York, NY",
    hours: [
      "Mon-Thu 8 AM-6 PM",
      "Fri 8 AM-3 PM",
      "Emergency line answered during clinic hours",
      "After-hours instructions available by voicemail"
    ]
  },
  navigation: [
    { label: "Treatments", slug: "treatments" },
    { label: "Team", slug: "team" },
    { label: "Insurance", slug: "pricing-insurance" },
    { label: "Reviews", slug: "reviews" },
    { label: "Emergency", slug: "emergency-dental" },
    { label: "Appointment", slug: "appointment" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A clinical trust homepage for dental services, safety, reviews, and appointments.",
      seo: {
        title: "Clearline Dental Studio | Dentist Template",
        description:
          "Modern dental clinic template with treatments, team, insurance, reviews, emergency dental and appointment form.",
        canonicalPath: dentistClinicalDefaultBasePath
      }
    },
    {
      slug: "treatments",
      title: "Treatments",
      navLabel: "Treatments",
      intro: "Plain-language dental treatment cards with process, duration, and expectations.",
      seo: {
        title: "Treatments | Clearline Dental Studio",
        description:
          "Dental treatment route with preventive, restorative, and comfort-focused services.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/treatments`
      }
    },
    {
      slug: "treatments/preventive-care",
      title: "Preventive Care",
      navLabel: "Treatment Detail",
      intro: "A treatment detail page with consultation-first guidance and realistic expectations.",
      seo: {
        title: "Preventive Care | Clearline Dental Studio",
        description:
          "Preventive dental care detail page with safety, process, and appointment CTA.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/treatments/preventive-care`
      }
    },
    {
      slug: "team",
      title: "Team",
      navLabel: "Team",
      intro:
        "Dentist and care team profiles with credentials, focus areas, and patient comfort notes.",
      seo: {
        title: "Team | Clearline Dental Studio",
        description: "Dental team profile route for a modern clinic template.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/team`
      }
    },
    {
      slug: "pricing-insurance",
      title: "Pricing & Insurance",
      navLabel: "Pricing / Insurance",
      intro: "Insurance verification, financing notes, and estimate disclaimers near booking.",
      seo: {
        title: "Pricing & Insurance | Clearline Dental Studio",
        description:
          "Dental insurance and pricing clarity page with responsible consultation-first language.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/pricing-insurance`
      }
    },
    {
      slug: "reviews",
      title: "Reviews",
      navLabel: "Reviews",
      intro: "Trust-building reviews about clarity, comfort, and realistic care expectations.",
      seo: {
        title: "Reviews | Clearline Dental Studio",
        description:
          "Dental clinic review route focused on patient trust and appointment confidence.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/reviews`
      }
    },
    {
      slug: "emergency-dental",
      title: "Emergency Dental",
      navLabel: "Emergency Dental",
      intro:
        "Emergency guidance with call-first language, triage clarity, and safety expectations.",
      seo: {
        title: "Emergency Dental | Clearline Dental Studio",
        description: "Emergency dental page with phone CTA and safe triage guidance.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/emergency-dental`
      }
    },
    {
      slug: "appointment",
      title: "Appointment",
      navLabel: "Appointment",
      intro: "An appointment request form that avoids sensitive health data in the demo.",
      seo: {
        title: "Appointment | Clearline Dental Studio",
        description: "Book a dental appointment through a safe accessible request form.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/appointment`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Clinic address, hours, phone, email, and visit preparation details.",
      seo: {
        title: "Contact | Clearline Dental Studio",
        description: "Contact and location route for a dental clinic template.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Appointment, emergency, insurance, safety, and privacy answers.",
      seo: {
        title: "FAQ | Clearline Dental Studio",
        description:
          "Dental clinic FAQ content for appointments, insurance, safety, and emergency care.",
        canonicalPath: `${dentistClinicalDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "Dental care explained before anyone reclines the chair.",
    subtitle:
      "Clearline Dental Studio explains treatments, credentials, insurance guidance and urgent care before asking patients to request an appointment.",
    primaryCta: "Book appointment",
    secondaryCta: "Call emergency line",
    safetyNote:
      "Consultation-first copy avoids guaranteed outcomes and keeps safety, hygiene, and realistic expectations visible.",
    proofPoints: [
      "Credentials and hygiene standards near booking",
      "Insurance verification before treatment estimates",
      "Emergency guidance with call-first triage"
    ]
  },
  treatments: [
    {
      name: "Preventive Care",
      slug: "treatments/preventive-care",
      summary: "Exams, cleanings, X-rays when appropriate, gum checks, and prevention planning.",
      duration: "45-75 min",
      expectations: "Recommendations depend on exam findings and clinician review."
    },
    {
      name: "Restorative Dentistry",
      slug: "treatments/preventive-care",
      summary: "Fillings, crowns, and treatment plans explained with options and timelines.",
      duration: "Varies",
      expectations: "Estimates are confirmed after diagnosis and insurance verification."
    },
    {
      name: "Comfort Visits",
      slug: "treatments/preventive-care",
      summary: "For anxious patients who need slower pacing, breaks, and clear explanations.",
      duration: "Planned ahead",
      expectations: "Comfort options are discussed before treatment starts."
    }
  ],
  team: [
    {
      name: "Dr. Maya Chen",
      credentials: "DDS, general dentistry",
      focus: "Preventive care, restorative planning, and patient communication."
    },
    {
      name: "Dr. Owen Patel",
      credentials: "DMD, emergency and restorative dentistry",
      focus: "Urgent exams, crowns, and treatment sequencing."
    },
    {
      name: "Nora Fields",
      credentials: "Registered dental hygienist",
      focus: "Cleanings, gum health education, and comfort-first hygiene visits."
    }
  ],
  insurance: [
    "Verify benefits before confirming treatment estimates",
    "Provide written treatment plans when available",
    "Offer financing discussion before elective treatment",
    "Keep privacy and consent reminders near forms"
  ],
  reviews: [
    {
      quote:
        "No customer quote is published in this demonstration. Add this block only after receiving verified, permissioned feedback.",
      author: "Review placeholder",
      context: "No review published"
    }
  ],
  appointment: {
    title: "Request an appointment",
    description:
      "This demo form avoids sensitive health details. A real clinic should connect secure intake and consent systems before launch.",
    submitLabel: "Request appointment",
    successMessage: "Appointment request received. This demo keeps the response local.",
    emptySelectLabel: "Select a visit type",
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
        name: "visitType",
        label: "Visit type",
        type: "select",
        required: true,
        options: [
          "New patient exam",
          "Cleaning",
          "Restorative consultation",
          "Emergency call request"
        ]
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      {
        name: "insurance",
        label: "Insurance provider",
        type: "text",
        required: false,
        helperText: "Optional. Do not enter policy numbers in this demo."
      }
    ]
  },
  faq: [
    {
      question: "Does this template promise results?",
      answer:
        "No. Dental copy should stay consultation-first and avoid guaranteed results or no-risk claims."
    },
    {
      question: "Can patients request emergency help?",
      answer:
        "Yes. Emergency routes use call-first triage language and avoid replacing professional diagnosis."
    },
    {
      question: "Can pricing be shown?",
      answer:
        "Yes, but estimates should be tied to exam findings, insurance verification, and local legal review."
    },
    {
      question: "Does the form collect medical history?",
      answer:
        "No. This demo avoids sensitive health data; real intake should use secure approved systems."
    }
  ]
} as const satisfies DentistClinicalContent;

export function createHotelLuxuryPath(
  basePath = hotelLuxuryDefaultBasePath,
  slug: HotelLuxuryPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createBeautySpaPath(
  basePath = beautySpaDefaultBasePath,
  slug: BeautySpaPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createDentistClinicalPath(
  basePath = dentistClinicalDefaultBasePath,
  slug: DentistClinicalPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getHotelLuxuryNavigation(basePath = hotelLuxuryDefaultBasePath) {
  return createTemplateNavigation(basePath, hotelLuxuryContent.navigation);
}

export function getBeautySpaNavigation(basePath = beautySpaDefaultBasePath) {
  return createTemplateNavigation(basePath, beautySpaContent.navigation);
}

export function getDentistClinicalNavigation(basePath = dentistClinicalDefaultBasePath) {
  return createTemplateNavigation(basePath, dentistClinicalContent.navigation);
}

export function getHotelLuxuryPage(
  slug: HotelLuxuryPageSlug,
  basePath = hotelLuxuryDefaultBasePath
): PageContent<HotelLuxuryPageSlug> {
  return resolveTemplatePage({
    pages: hotelLuxuryContent.pages,
    slug,
    basePath,
    locale: hotelLuxuryContent.locale.defaultLocale,
    templateLabel: "hotel"
  });
}

export function getBeautySpaPage(
  slug: BeautySpaPageSlug,
  basePath = beautySpaDefaultBasePath
): PageContent<BeautySpaPageSlug> {
  return resolveTemplatePage({
    pages: beautySpaContent.pages,
    slug,
    basePath,
    locale: beautySpaContent.locale.defaultLocale,
    templateLabel: "beauty spa"
  });
}

export function getDentistClinicalPage(
  slug: DentistClinicalPageSlug,
  basePath = dentistClinicalDefaultBasePath
): PageContent<DentistClinicalPageSlug> {
  return resolveTemplatePage({
    pages: dentistClinicalContent.pages,
    slug,
    basePath,
    locale: dentistClinicalContent.locale.defaultLocale,
    templateLabel: "dentist"
  });
}

export function createFormValidation(copy: FormCopy["validation"]) {
  return {
    required: copy.required,
    email: copy.email,
    numberMin: copy.numberMin
  };
}
