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

type GalleryItem = {
  title: string;
  alt: string;
  tone: string;
};

type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

export type HotelResortPageSlug =
  | ""
  | "rooms-villas"
  | "rooms/villa-garden-suite"
  | "activities"
  | "wellness"
  | "dining"
  | "families"
  | "gallery"
  | "offers"
  | "booking"
  | "contact"
  | "faq";

export type DentistFamilyPageSlug =
  | ""
  | "services"
  | "services/child-checkup"
  | "kids-dentistry"
  | "preventive-care"
  | "team"
  | "first-visit"
  | "reviews"
  | "appointment"
  | "contact"
  | "faq";

export type RestaurantFastCasualPageSlug =
  | ""
  | "menu"
  | "menu/grain-bowl"
  | "order"
  | "locations"
  | "catering"
  | "about"
  | "contact"
  | "faq";

export type HotelResortContent = {
  id: "hotel-03-resort";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<HotelResortPageSlug>[];
  pages: readonly PageContent<HotelResortPageSlug>[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    planningNote: string;
    proofPoints: readonly string[];
  };
  rooms: readonly {
    name: string;
    slug: string;
    summary: string;
    sleeps: string;
    size: string;
    priceFrom: string;
    amenities: readonly string[];
  }[];
  activities: readonly {
    name: string;
    timing: string;
    detail: string;
  }[];
  wellness: readonly {
    title: string;
    detail: string;
  }[];
  dining: readonly {
    title: string;
    detail: string;
    timing: string;
  }[];
  familyAmenities: readonly {
    title: string;
    detail: string;
  }[];
  itinerary: readonly {
    daypart: string;
    title: string;
    detail: string;
  }[];
  hotelOffers: readonly {
    title: string;
    date: string;
    description: string;
  }[];
  gallery: readonly GalleryItem[];
  testimonials: readonly Testimonial[];
  booking: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type DentistFamilyContent = {
  id: "dentist-03-family";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics & {
    emergencyPhone: string;
  };
  navigation: readonly NavigationItem<DentistFamilyPageSlug>[];
  pages: readonly PageContent<DentistFamilyPageSlug>[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    safetyNote: string;
    proofPoints: readonly string[];
  };
  services: readonly {
    name: string;
    slug: string;
    summary: string;
    duration: string;
    priceFrom: string;
  }[];
  kidsDentistry: readonly {
    title: string;
    detail: string;
  }[];
  preventiveCare: readonly {
    step: string;
    title: string;
    detail: string;
  }[];
  firstVisit: readonly {
    title: string;
    detail: string;
  }[];
  team: readonly {
    name: string;
    role: string;
    credentials: string;
    focus: string;
  }[];
  comfort: readonly string[];
  testimonials: readonly Testimonial[];
  appointment: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type RestaurantFastCasualContent = {
  id: "restaurant-03-fast-casual";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<RestaurantFastCasualPageSlug>[];
  pages: readonly PageContent<RestaurantFastCasualPageSlug>[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    orderNote: string;
    proofPoints: readonly string[];
  };
  menuSections: readonly {
    name: string;
    description: string;
    items: readonly {
      name: string;
      slug: string;
      description: string;
      price: string;
      dietary: readonly string[];
      allergens: readonly string[];
    }[];
  }[];
  locations: readonly {
    name: string;
    address: string;
    hours: string;
    pickupNote: string;
  }[];
  catering: readonly {
    title: string;
    detail: string;
    serves: string;
  }[];
  orderSteps: readonly {
    step: string;
    detail: string;
  }[];
  testimonials: readonly Testimonial[];
  order: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export const hotelResortDefaultBasePath = "/templates/hotel-03-resort";
export const dentistFamilyDefaultBasePath = "/templates/dentist-03-family";
export const restaurantFastCasualDefaultBasePath = "/templates/restaurant-03-fast-casual";

export const hotelResortPageSlugs = [
  "",
  "rooms-villas",
  "rooms/villa-garden-suite",
  "activities",
  "wellness",
  "dining",
  "families",
  "gallery",
  "offers",
  "booking",
  "contact",
  "faq"
] as const satisfies readonly HotelResortPageSlug[];

export const dentistFamilyPageSlugs = [
  "",
  "services",
  "services/child-checkup",
  "kids-dentistry",
  "preventive-care",
  "team",
  "first-visit",
  "reviews",
  "appointment",
  "contact",
  "faq"
] as const satisfies readonly DentistFamilyPageSlug[];

export const restaurantFastCasualPageSlugs = [
  "",
  "menu",
  "menu/grain-bowl",
  "order",
  "locations",
  "catering",
  "about",
  "contact",
  "faq"
] as const satisfies readonly RestaurantFastCasualPageSlug[];

const localeConfig = {
  defaultLocale: "en",
  fallbackLocale: "en",
  enabledLocales: ["en"],
  directions: {
    en: "ltr"
  }
} as const satisfies TemplateLocaleConfig;

const formValidation = {
  required: "{field} is required.",
  email: "Enter a valid email address.",
  numberMin: "{field} must be at least {min}."
} as const;

function createPage<TSlug extends string>(
  slug: TSlug,
  title: string,
  intro: string,
  description: string,
  canonicalPath: string
): PageContent<TSlug> {
  return {
    slug,
    title,
    navLabel: title,
    intro,
    seo: {
      title,
      description,
      canonicalPath
    }
  };
}

export const hotelResortContent = {
  id: "hotel-03-resort",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Sundrift Cove",
    tagline: "A coastal resort template for rooms, activities, family planning and direct stays.",
    description:
      "A fictional resort website template for destination stays, spacious rooms, family amenities, wellness, dining, offers, direct booking inquiries and practical arrival details.",
    phone: "+1 808 555 0138",
    email: "stay@sundriftcove.example",
    address: "4 Shell Road, Kailua Coast",
    hours: [
      "Reservations daily 8 AM-8 PM",
      "Pool and garden paths 7 AM-9 PM",
      "Kids club sessions by morning signup",
      "Airport transfer desk closes at 7 PM"
    ]
  },
  navigation: [
    { label: "Rooms", slug: "rooms-villas" },
    { label: "Activities", slug: "activities" },
    { label: "Wellness", slug: "wellness" },
    { label: "Families", slug: "families" },
    { label: "Booking", slug: "booking" }
  ],
  pages: [
    createPage(
      "",
      "Sundrift Cove | Resort Template",
      "A scenic resort homepage with rooms, activities, wellness, family planning and booking.",
      "Resort website template with rooms, activities, wellness, dining, family amenities, offers, booking, gallery, contact and FAQ.",
      hotelResortDefaultBasePath
    ),
    createPage(
      "rooms-villas",
      "Rooms & Villas",
      "Spacious room and villa cards with practical stay details and direct booking handoff.",
      "Resort rooms and villas page with family suites, garden villas and room detail links.",
      `${hotelResortDefaultBasePath}/rooms-villas`
    ),
    createPage(
      "rooms/villa-garden-suite",
      "Garden Villa Suite",
      "A room detail route for a villa with terrace, outdoor shower and family sleeping notes.",
      "Resort room detail page with amenities, occupancy and booking CTA.",
      `${hotelResortDefaultBasePath}/rooms/villa-garden-suite`
    ),
    createPage(
      "activities",
      "Activities",
      "Activity planning with timing, age notes and low-friction booking prompts.",
      "Resort activities page with guided walks, reef mornings and family activities.",
      `${hotelResortDefaultBasePath}/activities`
    ),
    createPage(
      "wellness",
      "Wellness",
      "Quiet wellness content for rituals, treatment timing and recovery space.",
      "Resort wellness page with spa rituals and poolside recovery notes.",
      `${hotelResortDefaultBasePath}/wellness`
    ),
    createPage(
      "dining",
      "Dining",
      "Breakfast, pool kitchen and dinner notes for resort guests planning a full stay.",
      "Resort dining page with breakfast, pool kitchen and sunset dinner sections.",
      `${hotelResortDefaultBasePath}/dining`
    ),
    createPage(
      "families",
      "Families",
      "Family amenities, kids club timing, sleeping setups and parent-friendly guidance.",
      "Family resort page with kids amenities, family suites and planning notes.",
      `${hotelResortDefaultBasePath}/families`
    ),
    createPage(
      "gallery",
      "Gallery",
      "Destination visuals for pool, garden paths, villas, activities and dining.",
      "Resort gallery page with accessible scenic image descriptions.",
      `${hotelResortDefaultBasePath}/gallery`
    ),
    createPage(
      "offers",
      "Offers",
      "Seasonal stay offers with activity inclusions and booking notes.",
      "Resort offers page with seasonal packages and direct booking incentives.",
      `${hotelResortDefaultBasePath}/offers`
    ),
    createPage(
      "booking",
      "Booking",
      "A direct resort inquiry form with stay dates, guests, room type and activity interest.",
      "Resort booking inquiry page with local validation and safe demo success state.",
      `${hotelResortDefaultBasePath}/booking`
    ),
    createPage(
      "contact",
      "Contact",
      "Location, transfer notes, opening hours and access details for resort planning.",
      "Resort contact page with address, hours, transfer notes and local contact details.",
      `${hotelResortDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "Questions about families, transfers, activity timing, dining and direct booking.",
      "Resort FAQ page for practical stay planning questions.",
      `${hotelResortDefaultBasePath}/faq`
    )
  ],
  hero: {
    eyebrow: "Coastal resort stay",
    title: "Villas, salt-air mornings and plans that make a longer stay easy.",
    subtitle:
      "Sundrift Cove brings rooms, activity timing, family details and direct stay planning together before guests commit to the trip.",
    primaryCta: "Plan your escape",
    secondaryCta: "View activities",
    planningNote:
      "The demo keeps transfers, kids club timing, dining hours and activity signup near the booking route.",
    proofPoints: [
      "Villa and family suite details in HTML",
      "Activities planned by time of day",
      "Direct inquiry form without fake live rates"
    ]
  },
  rooms: [
    {
      name: "Garden Villa Suite",
      slug: "rooms/villa-garden-suite",
      summary:
        "A low garden villa with shaded terrace, outdoor shower, separate lounge and space for a cot.",
      sleeps: "Sleeps 2-4",
      size: "62 sqm plus terrace",
      priceFrom: "From $360 per night",
      amenities: ["Outdoor shower", "Daybed lounge", "Garden terrace", "Cot on request"]
    },
    {
      name: "Poolside Family Suite",
      slug: "rooms/villa-garden-suite",
      summary:
        "Two-room suite near the family pool with blackout curtains, twin setup and stroller storage.",
      sleeps: "Sleeps 4",
      size: "74 sqm",
      priceFrom: "From $410 per night",
      amenities: ["Two sleeping zones", "Pool access", "Mini pantry", "Baby monitor loan"]
    },
    {
      name: "Ridge View Studio",
      slug: "rooms/villa-garden-suite",
      summary:
        "Upper garden studio with sunrise balcony, writing desk and a quieter path to the spa lawn.",
      sleeps: "Sleeps 2",
      size: "46 sqm",
      priceFrom: "From $295 per night",
      amenities: ["Sunrise balcony", "Desk", "Quiet zone", "Spa path"]
    }
  ],
  activities: [
    {
      name: "Reef morning",
      timing: "8:30 AM",
      detail: "Small group shore walk with water shoes, towel station and age guidance."
    },
    {
      name: "Garden bike loop",
      timing: "4 PM",
      detail: "Marked low-traffic route with child seats, shade stops and return desk."
    },
    {
      name: "Family fire bowl",
      timing: "After dinner",
      detail: "Marshmallows, soft seating and a quiet finish before the pool closes."
    }
  ],
  wellness: [
    {
      title: "Salt room reset",
      detail: "A 45-minute quiet ritual paired with a poolside recovery window."
    },
    {
      title: "Garden massage hut",
      detail: "Open-air treatment room with shade screens, towels and water station."
    },
    {
      title: "Slow path circuit",
      detail: "Marked garden loop for guests who want wellness without a class schedule."
    }
  ],
  dining: [
    {
      title: "Terrace breakfast",
      detail: "Local fruit, eggs, bakery basket and a kids option visible before booking.",
      timing: "7 AM-10:30 AM"
    },
    {
      title: "Pool kitchen",
      detail: "Rice bowls, grilled fish, chilled drinks and allergy note placeholders.",
      timing: "11:30 AM-5 PM"
    },
    {
      title: "Cove dinner",
      detail: "Short coastal menu with family seating, sunset timing and reservation note.",
      timing: "6 PM-9:30 PM"
    }
  ],
  familyAmenities: [
    {
      title: "Kids club by session",
      detail: "Morning signups, age ranges and pickup notes keep expectations clear."
    },
    {
      title: "Sleep setup notes",
      detail: "Cot, twin split and blackout request fields appear before the inquiry is sent."
    },
    {
      title: "Parent planning shelf",
      detail: "High chairs, stroller storage, early dinner and pool towel notes stay visible."
    }
  ],
  itinerary: [
    {
      daypart: "Morning",
      title: "Reef walk then breakfast terrace",
      detail: "The route shows guests how activities and dining fit in one day."
    },
    {
      daypart: "Afternoon",
      title: "Pool, garden loop and quiet spa lawn",
      detail: "Enough structure for planning without turning the resort into a schedule."
    },
    {
      daypart: "Evening",
      title: "Cove dinner and family fire bowl",
      detail: "Family-friendly but still calm, with soft timing and clear service notes."
    }
  ],
  hotelOffers: [
    {
      title: "Five-night garden stay",
      date: "May-June",
      description: "Includes airport transfer credit and one reef morning signup window."
    },
    {
      title: "Family pool week",
      date: "School breaks",
      description: "Suite request path, early dinner note and kids club session guidance."
    },
    {
      title: "Wellness shoulder season",
      date: "September",
      description: "Garden studio rate note with two salt room resets and late checkout request."
    }
  ],
  gallery: [
    {
      title: "Garden pool before breakfast",
      alt: "Resort pool beside palm garden with breakfast terrace in morning light.",
      tone: "pool"
    },
    {
      title: "Villa terrace",
      alt: "Low resort villa terrace with shaded daybed and garden path.",
      tone: "villa"
    },
    {
      title: "Reef walk desk",
      alt: "Activity desk with towels, water shoes and reef walk notes.",
      tone: "activity"
    },
    {
      title: "Kids club shelf",
      alt: "Family resort kids club shelf with games, hats and sign-in cards.",
      tone: "family"
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
    title: "Plan your stay",
    description:
      "This safe mock form validates locally. Real rates, deposits, room inventory and activity signup can be connected later.",
    submitLabel: "Request resort plan",
    successMessage: "Stay inquiry received. This demo keeps the response local.",
    emptySelectLabel: "Select a stay focus",
    validation: formValidation,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "arrival", label: "Arrival", type: "date", required: true },
      { name: "departure", label: "Departure", type: "date", required: true },
      { name: "guests", label: "Guests", type: "number", required: true },
      {
        name: "stayFocus",
        label: "Stay focus",
        type: "select",
        required: true,
        options: ["Villa stay", "Family pool week", "Wellness stay", "Activity-led holiday"]
      },
      {
        name: "notes",
        label: "Planning notes",
        type: "textarea",
        required: false,
        helperText: "Optional: children ages, transfer needs, wellness interest or activity timing."
      }
    ]
  },
  faq: [
    {
      question: "Does the demo show live room rates?",
      answer:
        "No. The template is direct-booking ready, but real rates, deposits and inventory require a booking engine or PMS integration."
    },
    {
      question: "Can families request sleeping setups?",
      answer:
        "Yes. The inquiry form includes planning notes and the room pages explain cots, twin setups and family amenities."
    },
    {
      question: "Where do transfers and access notes go?",
      answer: "Use the contact, booking and FAQ pages for transfer desk hours and arrival guidance."
    },
    {
      question: "Can activity signup connect to a CMS?",
      answer:
        "Yes. Activity cards are content-led and can later map to a CMS or booking tool without changing the page structure."
    }
  ]
} as const satisfies HotelResortContent;

export const dentistFamilyContent = {
  id: "dentist-03-family",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Maple & Finch Dental",
    tagline: "Family dentistry with first-visit guidance, prevention and calm appointment flow.",
    description:
      "A fictional family dental practice template for children, parents, preventive care, first visits, appointment requests, reviews, location, contact and FAQ content.",
    phone: "+1 617 555 0192",
    emergencyPhone: "+1 617 555 0199",
    email: "care@maplefinch.example",
    address: "28 Maple Street, Cambridge, MA",
    hours: ["Mon-Wed 8 AM-5 PM", "Thu 10 AM-7 PM", "Fri 8 AM-3 PM", "Emergency triage by phone"]
  },
  navigation: [
    { label: "Services", slug: "services" },
    { label: "Kids", slug: "kids-dentistry" },
    { label: "First Visit", slug: "first-visit" },
    { label: "Team", slug: "team" },
    { label: "Appointment", slug: "appointment" }
  ],
  pages: [
    createPage(
      "",
      "Maple & Finch Dental | Family Dentist Template",
      "A warm family dental homepage with services, first visit guidance and appointments.",
      "Family dentist website template with services, kids dentistry, preventive care, team, first visit, reviews, appointment, contact and FAQ.",
      dentistFamilyDefaultBasePath
    ),
    createPage(
      "services",
      "Services",
      "Family service cards for checkups, hygiene, fillings and urgent appointment triage.",
      "Family dental services page with preventive and child-focused care cards.",
      `${dentistFamilyDefaultBasePath}/services`
    ),
    createPage(
      "services/child-checkup",
      "Child Checkup",
      "A service detail route with first-child-visit expectations and parent questions.",
      "Child dental checkup detail page with realistic expectations and safety notes.",
      `${dentistFamilyDefaultBasePath}/services/child-checkup`
    ),
    createPage(
      "kids-dentistry",
      "Kids Dentistry",
      "Reassuring child dental information without exaggerated or manipulative claims.",
      "Kids dentistry page for first visits, age guidance and parent information.",
      `${dentistFamilyDefaultBasePath}/kids-dentistry`
    ),
    createPage(
      "preventive-care",
      "Preventive Care",
      "Checkups, hygiene, sealants and home-care guidance with realistic expectations.",
      "Preventive family dental page with care steps and hygiene guidance.",
      `${dentistFamilyDefaultBasePath}/preventive-care`
    ),
    createPage(
      "team",
      "Team",
      "Dentist and hygienist profiles with qualifications, focus and family-care tone.",
      "Family dentist team page with original practitioner profiles.",
      `${dentistFamilyDefaultBasePath}/team`
    ),
    createPage(
      "first-visit",
      "First Visit",
      "A first-visit checklist for parents, children and nervous patients.",
      "Family dental first visit page with checklist and appointment expectations.",
      `${dentistFamilyDefaultBasePath}/first-visit`
    ),
    createPage(
      "reviews",
      "Reviews",
      "Parent and patient testimonials framed without guaranteed treatment claims.",
      "Family dental reviews page with trust-focused testimonials.",
      `${dentistFamilyDefaultBasePath}/reviews`
    ),
    createPage(
      "appointment",
      "Appointment",
      "An appointment request form with family visit type, preferred timing and safe notes.",
      "Family dental appointment page with local validation and safe demo success state.",
      `${dentistFamilyDefaultBasePath}/appointment`
    ),
    createPage(
      "contact",
      "Contact",
      "Hours, emergency phone, location, insurance/payment note and contact details.",
      "Family dental contact page with hours, location, phone and emergency triage note.",
      `${dentistFamilyDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "Common parent, prevention, insurance, emergency and first-visit questions.",
      "Family dental FAQ page for practical appointment questions.",
      `${dentistFamilyDefaultBasePath}/faq`
    )
  ],
  hero: {
    eyebrow: "Family dental practice",
    title: "Checkups, first visits and urgent questions handled with clear steps.",
    subtitle:
      "Maple & Finch gives parents clear preventive care, first-visit guidance, team information and a simple appointment path.",
    primaryCta: "Book family visit",
    secondaryCta: "Meet the team",
    safetyNote:
      "Dental information is consultation-first. Treatment suitability, costs and timing must be confirmed by a qualified clinician.",
    proofPoints: [
      "First child visit checklist",
      "Prevention and hygiene guidance",
      "Emergency triage note near contact"
    ]
  },
  services: [
    {
      name: "Child checkup",
      slug: "services/child-checkup",
      summary: "Age-appropriate exam, parent questions and a calm introduction to the room.",
      duration: "30-40 minutes",
      priceFrom: "Estimate after insurance review"
    },
    {
      name: "Family hygiene visit",
      slug: "services/child-checkup",
      summary: "Cleaning, gum health review and home-care coaching for adults and teens.",
      duration: "45-60 minutes",
      priceFrom: "Plan-dependent"
    },
    {
      name: "Preventive sealants",
      slug: "services/child-checkup",
      summary: "Clinician-reviewed option for eligible children after exam and risk assessment.",
      duration: "By recommendation",
      priceFrom: "Estimate after consultation"
    },
    {
      name: "Urgent dental triage",
      slug: "services/child-checkup",
      summary: "Phone-first guidance for tooth pain, broken fillings and swelling concerns.",
      duration: "Call first",
      priceFrom: "Depends on diagnosis"
    }
  ],
  kidsDentistry: [
    {
      title: "Tell-show-do pacing",
      detail: "The visit copy explains instruments and steps without making promises about fear."
    },
    {
      title: "Parent questions up front",
      detail: "Diet, brushing routines and previous dental experiences are part of the intake."
    },
    {
      title: "Age-aware prevention",
      detail: "Fluoride, sealants and hygiene are discussed only after clinician review."
    }
  ],
  preventiveCare: [
    {
      step: "01",
      title: "Risk and routine",
      detail: "Checkups look at brushing habits, diet, gum health and family history."
    },
    {
      step: "02",
      title: "Cleaning and coaching",
      detail: "Hygiene visits pair cleaning with plain home-care guidance."
    },
    {
      step: "03",
      title: "Written next steps",
      detail: "Families leave with timing, estimates and questions to review before treatment."
    }
  ],
  firstVisit: [
    {
      title: "Bring basics",
      detail: "Insurance card, medication list if relevant, previous records and parent questions."
    },
    {
      title: "Start with conversation",
      detail: "The team reviews goals, concerns and visit pacing before care begins."
    },
    {
      title: "Finish with a plan",
      detail: "Any recommended treatment is explained with timing, alternatives and estimates."
    }
  ],
  team: [
    {
      name: "Dr. Lena Morris",
      role: "Family dentist",
      credentials: "DDS, preventive care focus",
      focus: "Child first visits, restorative planning and parent communication."
    },
    {
      name: "Ari Patel",
      role: "Registered dental hygienist",
      credentials: "RDH",
      focus: "Hygiene visits, gum health and home-care coaching."
    },
    {
      name: "Maya Chen",
      role: "Patient coordinator",
      credentials: "Care coordination",
      focus: "Family scheduling, insurance questions and emergency triage calls."
    }
  ],
  comfort: [
    "Private parent questions before the appointment when helpful.",
    "Breaks can be planned into longer visits.",
    "Medical and dental history is reviewed before recommendations.",
    "Emergency symptoms are triaged by phone before scheduling."
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
    title: "Request a family visit",
    description:
      "This safe mock form validates locally and avoids sensitive health details. A real clinic should confirm privacy and medical advertising rules before launch.",
    submitLabel: "Request appointment",
    successMessage: "Appointment request received. This demo keeps the response local.",
    emptySelectLabel: "Select visit type",
    validation: formValidation,
    fields: [
      { name: "name", label: "Parent or patient name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      {
        name: "visitType",
        label: "Visit type",
        type: "select",
        required: true,
        options: ["Family checkup", "Child first visit", "Hygiene visit", "Urgent question"]
      },
      { name: "date", label: "Preferred date", type: "date", required: true },
      {
        name: "notes",
        label: "Scheduling notes",
        type: "textarea",
        required: false,
        helperText: "Optional scheduling context only. Do not enter sensitive medical details."
      }
    ]
  },
  faq: [
    {
      question: "Is this medical advice?",
      answer:
        "No. The demo content is informational and consultation-first. A qualified clinician must review diagnosis, suitability and treatment options."
    },
    {
      question: "Can a child visit be short?",
      answer:
        "Yes. The first visit can be paced around the child, but exact timing depends on the exam and clinician judgment."
    },
    {
      question: "How are emergencies handled?",
      answer:
        "The template includes an emergency phone and triage note. Real emergency policies must be confirmed by the clinic."
    },
    {
      question: "Where should insurance details appear?",
      answer:
        "Use the appointment, contact and FAQ pages for insurance/payment clarity and local legal review."
    }
  ]
} as const satisfies DentistFamilyContent;

export const restaurantFastCasualContent = {
  id: "restaurant-03-fast-casual",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Counter & Grain",
    tagline: "Fast-casual bowls, wraps and catering with a clear pickup path.",
    description:
      "A fictional fast-casual restaurant template for menu browsing, dietary labels, pickup order placeholders, locations, catering, contact and FAQ content.",
    phone: "+1 503 555 0176",
    email: "orders@countergrain.example",
    address: "Main kitchen: 88 Alder Street, Portland, OR",
    hours: [
      "Downtown Mon-Fri 10:30 AM-8 PM",
      "Riverside daily 11 AM-9 PM",
      "Pickup windows every 15 minutes",
      "Catering requests need 48 hours"
    ]
  },
  navigation: [
    { label: "Menu", slug: "menu" },
    { label: "Order", slug: "order" },
    { label: "Locations", slug: "locations" },
    { label: "Catering", slug: "catering" },
    { label: "FAQ", slug: "faq" }
  ],
  pages: [
    createPage(
      "",
      "Counter & Grain | Fast Casual Template",
      "A fast-casual homepage focused on menu browsing, pickup flow and catering.",
      "Fast-casual restaurant template with menu, item detail, order placeholder, locations, catering, about, contact and FAQ.",
      restaurantFastCasualDefaultBasePath
    ),
    createPage(
      "menu",
      "Menu",
      "Menu categories, dietary labels and item cards designed for mobile scanning.",
      "Fast-casual menu page with bowls, wraps, sides, drinks, dietary labels and prices.",
      `${restaurantFastCasualDefaultBasePath}/menu`
    ),
    createPage(
      "menu/grain-bowl",
      "Harbor Grain Bowl",
      "A menu item detail route with ingredients, dietary labels and ordering caveats.",
      "Fast-casual menu item detail page with ingredients, dietary labels and order CTA.",
      `${restaurantFastCasualDefaultBasePath}/menu/grain-bowl`
    ),
    createPage(
      "order",
      "Order",
      "A safe order placeholder form for pickup location, timing and item interest.",
      "Fast-casual order placeholder page with local validation and no live checkout.",
      `${restaurantFastCasualDefaultBasePath}/order`
    ),
    createPage(
      "locations",
      "Locations",
      "Location cards with hours, pickup notes and practical contact details.",
      "Fast-casual location page with pickup notes and store cards.",
      `${restaurantFastCasualDefaultBasePath}/locations`
    ),
    createPage(
      "catering",
      "Catering",
      "Tray and group order information with clear inquiry requirements.",
      "Fast-casual catering page with package cards and inquiry guidance.",
      `${restaurantFastCasualDefaultBasePath}/catering`
    ),
    createPage(
      "about",
      "About",
      "Kitchen rhythm, prep notes and the reason the menu works for pickup.",
      "Fast-casual about page with kitchen prep and sourcing notes.",
      `${restaurantFastCasualDefaultBasePath}/about`
    ),
    createPage(
      "contact",
      "Contact",
      "Main kitchen contact, hours, pickup notes and order integration caveats.",
      "Fast-casual contact page with hours, phone, email and pickup information.",
      `${restaurantFastCasualDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "Pickup, allergens, catering, checkout and order integration questions.",
      "Fast-casual FAQ page for order placeholder and menu browsing questions.",
      `${restaurantFastCasualDefaultBasePath}/faq`
    )
  ],
  hero: {
    eyebrow: "Fast-casual pickup kitchen",
    title: "Bowls, wraps and catering paths built for quick mobile decisions.",
    subtitle:
      "Counter & Grain makes menu details, dietary labels, pickup locations and catering choices easy to scan on a phone.",
    primaryCta: "Order online",
    secondaryCta: "View menu",
    orderNote:
      "The order route validates locally. Real payments, delivery, stock and kitchen systems require a future ordering integration.",
    proofPoints: [
      "Menu categories with dietary labels",
      "Pickup location and timing before submit",
      "Catering inquiry without fake checkout"
    ]
  },
  menuSections: [
    {
      name: "Bowls",
      description: "Warm grain bowls that show ingredients, labels and pickup-friendly assembly.",
      items: [
        {
          name: "Harbor Grain Bowl",
          slug: "menu/grain-bowl",
          description: "Brown rice, roasted salmon, cucumber, pickled cabbage and sesame lime.",
          price: "$15",
          dietary: ["GF option"],
          allergens: ["Fish", "Sesame"]
        },
        {
          name: "Market Lentil Bowl",
          slug: "menu/grain-bowl",
          description: "Lentils, roasted carrots, greens, lemon tahini and toasted seeds.",
          price: "$13",
          dietary: ["V", "VG option"],
          allergens: ["Sesame"]
        }
      ]
    },
    {
      name: "Wraps",
      description: "Fast lunch items with clean hierarchy for mobile browsing.",
      items: [
        {
          name: "Chicken herb wrap",
          slug: "menu/grain-bowl",
          description: "Grilled chicken, herbs, yogurt sauce, chopped salad and warm flatbread.",
          price: "$12",
          dietary: [],
          allergens: ["Wheat", "Milk"]
        },
        {
          name: "Crisp chickpea wrap",
          slug: "menu/grain-bowl",
          description: "Chickpeas, cucumber, pickles, red pepper spread and greens.",
          price: "$11",
          dietary: ["VG option"],
          allergens: ["Wheat"]
        }
      ]
    },
    {
      name: "Sides & Drinks",
      description: "Small add-ons that support pickup and catering orders.",
      items: [
        {
          name: "Lime herb potatoes",
          slug: "menu/grain-bowl",
          description: "Warm potatoes with herbs, lime and smoked salt.",
          price: "$5",
          dietary: ["VG", "GF"],
          allergens: []
        },
        {
          name: "Mint tea cooler",
          slug: "menu/grain-bowl",
          description: "Cold mint tea, lemon and a little honey.",
          price: "$4",
          dietary: ["GF"],
          allergens: []
        }
      ]
    }
  ],
  locations: [
    {
      name: "Downtown counter",
      address: "88 Alder Street",
      hours: "Mon-Fri 10:30 AM-8 PM",
      pickupNote: "Best for office lunch pickup and catering handoff."
    },
    {
      name: "Riverside window",
      address: "12 River Walk",
      hours: "Daily 11 AM-9 PM",
      pickupNote: "Evening pickup, bike rack and outdoor seats."
    }
  ],
  catering: [
    {
      title: "Bowl tray set",
      detail: "Three bowl styles, labeled sauces and allergen card placeholder.",
      serves: "Serves 8-12"
    },
    {
      title: "Wrap lunch box",
      detail: "Wrapped halves, side potatoes, fruit cup and pickup label.",
      serves: "Minimum 10"
    },
    {
      title: "Office reset table",
      detail: "Bowls, sides, drinks and compostable serveware note.",
      serves: "Serves 20+"
    }
  ],
  orderSteps: [
    {
      step: "Choose location",
      detail: "The demo asks where pickup should happen before collecting item notes."
    },
    {
      step: "Pick timing",
      detail: "Pickup windows are placeholders until a real ordering system is connected."
    },
    {
      step: "Confirm externally",
      detail: "No payment, inventory or kitchen ticket is created in this static template."
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
  order: {
    title: "Start an order request",
    description:
      "This safe mock form validates locally. It does not create an order, collect payment, reserve inventory or send kitchen tickets.",
    submitLabel: "Send order request",
    successMessage:
      "Order request received locally. Connect a real ordering backend before launch.",
    emptySelectLabel: "Select pickup location",
    validation: formValidation,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "location",
        label: "Pickup location",
        type: "select",
        required: true,
        options: ["Downtown counter", "Riverside window", "Catering inquiry"]
      },
      { name: "date", label: "Pickup date", type: "date", required: true },
      { name: "time", label: "Pickup time", type: "time", required: true },
      {
        name: "items",
        label: "Items or catering notes",
        type: "textarea",
        required: true,
        helperText: "Demo only. Real menu item selection requires an ordering integration."
      }
    ]
  },
  faq: [
    {
      question: "Is this a real ordering system?",
      answer:
        "No. The order page validates locally and shows a placeholder success state. Payments, stock, kitchen tickets and delivery require a future integration."
    },
    {
      question: "Can allergen details be expanded?",
      answer:
        "Yes. Menu items include dietary and allergen placeholders, but final allergen copy must be verified by the restaurant."
    },
    {
      question: "Can catering requests become real leads?",
      answer:
        "Yes. The catering route can connect to email, CRM or catering software during implementation."
    },
    {
      question: "Why is the menu HTML instead of a PDF?",
      answer:
        "HTML menus are faster on mobile, easier to scan and better for SEO than image-only PDFs."
    }
  ]
} as const satisfies RestaurantFastCasualContent;

export function createHotelResortPath(
  basePath = hotelResortDefaultBasePath,
  slug: HotelResortPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createDentistFamilyPath(
  basePath = dentistFamilyDefaultBasePath,
  slug: DentistFamilyPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createRestaurantFastCasualPath(
  basePath = restaurantFastCasualDefaultBasePath,
  slug: RestaurantFastCasualPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getHotelResortNavigation(basePath = hotelResortDefaultBasePath) {
  return createTemplateNavigation(basePath, hotelResortContent.navigation);
}

export function getDentistFamilyNavigation(basePath = dentistFamilyDefaultBasePath) {
  return createTemplateNavigation(basePath, dentistFamilyContent.navigation);
}

export function getRestaurantFastCasualNavigation(basePath = restaurantFastCasualDefaultBasePath) {
  return createTemplateNavigation(basePath, restaurantFastCasualContent.navigation);
}

export function getHotelResortPage(
  slug: HotelResortPageSlug,
  basePath = hotelResortDefaultBasePath
): PageContent<HotelResortPageSlug> {
  return resolveTemplatePage({
    pages: hotelResortContent.pages,
    slug,
    basePath,
    locale: hotelResortContent.locale.defaultLocale,
    templateLabel: "resort hotel"
  });
}

export function getDentistFamilyPage(
  slug: DentistFamilyPageSlug,
  basePath = dentistFamilyDefaultBasePath
): PageContent<DentistFamilyPageSlug> {
  return resolveTemplatePage({
    pages: dentistFamilyContent.pages,
    slug,
    basePath,
    locale: dentistFamilyContent.locale.defaultLocale,
    templateLabel: "family dentist"
  });
}

export function getRestaurantFastCasualPage(
  slug: RestaurantFastCasualPageSlug,
  basePath = restaurantFastCasualDefaultBasePath
): PageContent<RestaurantFastCasualPageSlug> {
  return resolveTemplatePage({
    pages: restaurantFastCasualContent.pages,
    slug,
    basePath,
    locale: restaurantFastCasualContent.locale.defaultLocale,
    templateLabel: "fast casual restaurant"
  });
}
