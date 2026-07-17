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

type MenuSection = {
  name: string;
  description: string;
  items: readonly {
    name: string;
    description: string;
    price: string;
    note?: string;
  }[];
};

type EventItem = {
  title: string;
  date: string;
  time: string;
  description: string;
};

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

type BarCommonContent<TSlug extends string, TId extends string> = {
  id: TId;
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<TSlug>[];
  pages: readonly PageContent<TSlug>[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    serviceNote: string;
    proofPoints: readonly string[];
  };
  menuSections: readonly MenuSection[];
  events: readonly EventItem[];
  gallery: readonly GalleryItem[];
  testimonials: readonly Testimonial[];
  booking: FormCopy;
  responsibleNote: string;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type BarCocktailPageSlug =
  | ""
  | "drinks"
  | "signature-cocktails"
  | "events"
  | "private-hire"
  | "gallery"
  | "reservations"
  | "contact"
  | "faq";

export type BarPubPageSlug =
  "" | "food-menu" | "drinks" | "events" | "sports" | "gallery" | "bookings" | "contact" | "faq";

export type BarRooftopPageSlug =
  | ""
  | "drinks"
  | "food"
  | "events"
  | "private-bookings"
  | "group-packages"
  | "gallery"
  | "reservations"
  | "contact"
  | "faq";

export type BarCocktailContent = BarCommonContent<BarCocktailPageSlug, "bar-01-cocktail"> & {
  signatures: readonly {
    name: string;
    description: string;
    method: string;
    glass: string;
  }[];
  privateHire: {
    title: string;
    description: string;
    capacities: readonly string[];
  };
};

export type BarPubContent = BarCommonContent<BarPubPageSlug, "bar-02-pub"> & {
  sports: readonly {
    title: string;
    detail: string;
    timing: string;
  }[];
  communityNotes: readonly string[];
};

export type BarRooftopContent = BarCommonContent<BarRooftopPageSlug, "bar-03-rooftop"> & {
  packages: readonly {
    name: string;
    detail: string;
    suitableFor: string;
  }[];
  accessNotes: readonly string[];
};

export const barCocktailDefaultBasePath = "/templates/bar-01-cocktail";
export const barPubDefaultBasePath = "/templates/bar-02-pub";
export const barRooftopDefaultBasePath = "/templates/bar-03-rooftop";

export const barCocktailPageSlugs = [
  "",
  "drinks",
  "signature-cocktails",
  "events",
  "private-hire",
  "gallery",
  "reservations",
  "contact",
  "faq"
] as const satisfies readonly BarCocktailPageSlug[];

export const barPubPageSlugs = [
  "",
  "food-menu",
  "drinks",
  "events",
  "sports",
  "gallery",
  "bookings",
  "contact",
  "faq"
] as const satisfies readonly BarPubPageSlug[];

export const barRooftopPageSlugs = [
  "",
  "drinks",
  "food",
  "events",
  "private-bookings",
  "group-packages",
  "gallery",
  "reservations",
  "contact",
  "faq"
] as const satisfies readonly BarRooftopPageSlug[];

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
};

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

export const barCocktailContent = {
  id: "bar-01-cocktail",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Vesper Room",
    tagline: "Small room, precise drinks, reserved tables.",
    description:
      "A fictional cocktail bar template for reservations, signature drinks, private hire and responsible hospitality information.",
    phone: "+1 212 555 0198",
    email: "reservations@vesperroom.example",
    address: "18 Mercer Lane, New York, NY",
    hours: ["Tue-Thu 5 PM-12 AM", "Fri-Sat 5 PM-1 AM", "Sun 5 PM-11 PM", "Mon closed"]
  },
  navigation: [
    { label: "Drinks", slug: "drinks" },
    { label: "Signatures", slug: "signature-cocktails" },
    { label: "Events", slug: "events" },
    { label: "Private Hire", slug: "private-hire" },
    { label: "Reserve", slug: "reservations" }
  ],
  pages: [
    createPage(
      "",
      "Vesper Room | Cocktail Bar Template",
      "A premium cocktail bar homepage with signature drinks, private hire and reservation flow.",
      "Premium cocktail bar website template with drinks menu, private hire, events, gallery, reservations and FAQ.",
      barCocktailDefaultBasePath
    ),
    createPage(
      "drinks",
      "Drinks",
      "A drinks menu with seasonal cocktails, low-ABV serves, alcohol-free options and snacks.",
      "Cocktail bar drinks page with seasonal menu sections and responsible options.",
      `${barCocktailDefaultBasePath}/drinks`
    ),
    createPage(
      "signature-cocktails",
      "Signature Cocktails",
      "Featured serves with method notes, glassware and a short reason to book the room.",
      "Signature cocktail page with original demo drinks and mixology notes.",
      `${barCocktailDefaultBasePath}/signature-cocktails`
    ),
    createPage(
      "events",
      "Events",
      "Small-format programming designed around seated guests, tastings and calm service.",
      "Cocktail bar events page with tasting nights and reservation prompts.",
      `${barCocktailDefaultBasePath}/events`
    ),
    createPage(
      "private-hire",
      "Private Hire",
      "A private table and buyout path with capacity notes, timing and host contact flow.",
      "Private hire page for premium cocktail bar bookings and inquiries.",
      `${barCocktailDefaultBasePath}/private-hire`
    ),
    createPage(
      "gallery",
      "Gallery",
      "Atmospheric room and drink moments without relying on generic nightlife clichés.",
      "Cocktail bar gallery page with original visual direction.",
      `${barCocktailDefaultBasePath}/gallery`
    ),
    createPage(
      "reservations",
      "Reservations",
      "A direct reservation form for tables, tasting seats and private hire inquiries.",
      "Cocktail bar reservations page with local validation and safe demo success state.",
      `${barCocktailDefaultBasePath}/reservations`
    ),
    createPage(
      "contact",
      "Contact",
      "Opening hours, location, age-policy placeholder and access details.",
      "Cocktail bar contact page with hours, address and responsible hospitality notes.",
      `${barCocktailDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "Practical reservation, age policy, private hire and alcohol-free option questions.",
      "Cocktail bar FAQ page for reservation and visit planning questions.",
      `${barCocktailDefaultBasePath}/faq`
    )
  ],
  hero: {
    eyebrow: "Intimate cocktail bar",
    title: "Reserved seats, precise drinks and a room that stays composed.",
    subtitle:
      "Vesper Room pairs signature drinks with seated reservations, private hire and clear responsible-service information.",
    primaryCta: "Reserve a table",
    secondaryCta: "View cocktail menu",
    serviceNote: "Age policy, alcohol-free options and table timing belong near the booking path.",
    proofPoints: [
      "Signature drinks with method notes",
      "Private hire inquiry path",
      "Alcohol-free options visible in menu"
    ]
  },
  menuSections: [
    {
      name: "Seasonal Cocktails",
      description: "Short, precise serves with ingredients and glass notes.",
      items: [
        {
          name: "Low Light Martini",
          description: "Dry gin, fino, olive leaf, chilled coupe.",
          price: "$18",
          note: "Stirred"
        },
        {
          name: "Amber Fold",
          description: "Rye, pear cordial, walnut bitters, orange oil.",
          price: "$17",
          note: "Short"
        },
        {
          name: "Garden After Five",
          description: "Vodka, basil, verjus, soda, cracked salt.",
          price: "$16",
          note: "Tall"
        }
      ]
    },
    {
      name: "Zero Proof",
      description: "Alcohol-free options treated as part of the menu, not an afterthought.",
      items: [
        {
          name: "Spruce Tonic",
          description: "Juniper tea, spruce syrup, tonic, lemon.",
          price: "$11",
          note: "Alcohol-free"
        },
        {
          name: "Pressed Orchard",
          description: "Apple, verjus, ginger, black tea, chilled rocks glass.",
          price: "$10",
          note: "Alcohol-free"
        }
      ]
    },
    {
      name: "Bar Snacks",
      description: "Small plates that support longer seated bookings.",
      items: [
        {
          name: "Marinated olives",
          description: "Citrus peel, fennel seed, bay.",
          price: "$8"
        },
        {
          name: "Anchovy toast",
          description: "Whipped butter, parsley, sourdough.",
          price: "$12"
        }
      ]
    }
  ],
  signatures: [
    {
      name: "Low Light Martini",
      description: "Cold, dry and narrow: a signature drink for the room's first hour.",
      method: "Stirred for clarity, finished with olive leaf.",
      glass: "Coupe"
    },
    {
      name: "Amber Fold",
      description: "Rye and pear with a walnut finish, built for the slower second round.",
      method: "Served short over a hand-cut block.",
      glass: "Rocks"
    },
    {
      name: "Spruce Tonic",
      description: "An alcohol-free serve that still feels like a proper bar order.",
      method: "Carbonated tonic, juniper tea and lemon oil.",
      glass: "Highball"
    }
  ],
  events: [
    {
      title: "Menu notes at the bar",
      date: "First Wednesday",
      time: "6 PM-8 PM",
      description: "A seated tasting of three seasonal serves with snacks and method notes."
    },
    {
      title: "Quiet vinyl hour",
      date: "Thursday",
      time: "8 PM-10 PM",
      description: "Lower-volume programming for guests who book early tables."
    },
    {
      title: "Host table preview",
      date: "Last Sunday",
      time: "5 PM",
      description: "Private hire walkthrough for hosts planning seated groups."
    }
  ],
  privateHire: {
    title: "Private hire stays seated, paced and clear.",
    description:
      "Use this section for minimum spend, seating windows, arrival timing, alcohol-free planning and host contact before launch.",
    capacities: ["Back room: 18 seated", "Full buyout: 42 guests", "Tasting table: 8 guests"]
  },
  gallery: [
    {
      title: "Low bar light",
      alt: "Dark cocktail bar counter with reserved seats and small menu cards.",
      tone: "intimate"
    },
    {
      title: "Coupe detail",
      alt: "Signature martini in a coupe with restrained garnish.",
      tone: "drink"
    },
    {
      title: "Private table",
      alt: "Small cocktail table set for a private seated booking.",
      tone: "private"
    },
    {
      title: "Zero proof",
      alt: "Alcohol-free cocktail with tonic, lemon and juniper notes.",
      tone: "responsible"
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
    title: "Reserve a table",
    description:
      "This safe mock form validates locally. Real availability, deposits and age-policy notices can be connected at launch.",
    submitLabel: "Request reservation",
    successMessage: "Reservation request received. A real launch can connect this to availability.",
    emptySelectLabel: "Select a booking type",
    validation: formValidation,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      { name: "partySize", label: "Party size", type: "number", required: true },
      {
        name: "bookingType",
        label: "Booking type",
        type: "select",
        required: true,
        options: ["Table", "Signature tasting", "Private hire inquiry"]
      },
      {
        name: "notes",
        label: "Guest notes",
        type: "textarea",
        required: false,
        helperText: "Optional: seating needs, alcohol-free requests, access notes or host timing."
      }
    ]
  },
  responsibleNote:
    "Service copy should include local age policy, alcohol-free options and safe transport guidance before launch.",
  faq: [
    {
      question: "Is this a real booking system?",
      answer:
        "No. The demo validates locally and shows a safe success state. Real availability, deposits and policies should be connected during implementation."
    },
    {
      question: "Can alcohol-free options be promoted?",
      answer:
        "Yes. The content model treats zero-proof drinks as a normal menu section so responsible hospitality is visible."
    },
    {
      question: "Where does age policy copy go?",
      answer:
        "Use the contact, FAQ and reservation pages for local age policy, accepted ID and entry notes."
    },
    {
      question: "Can the private hire page become a lead form?",
      answer:
        "Yes. The private hire route is structured for capacities, timing, host notes and a form handoff."
    }
  ]
} as const satisfies BarCocktailContent;

export const barPubContent = {
  id: "bar-02-pub",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "The Borough Tap",
    tagline: "Food, fixtures, regulars and bookings in one practical pub template.",
    description:
      "A fictional modern pub template for food, drinks, sports nights, events, group bookings and local contact details.",
    phone: "+44 20 5555 0147",
    email: "bookings@boroughtap.example",
    address: "42 Market Row, London",
    hours: ["Mon-Thu 12 PM-11 PM", "Fri-Sat 12 PM-12 AM", "Sun 12 PM-10 PM"]
  },
  navigation: [
    { label: "Food", slug: "food-menu" },
    { label: "Drinks", slug: "drinks" },
    { label: "Events", slug: "events" },
    { label: "Sports", slug: "sports" },
    { label: "Book", slug: "bookings" }
  ],
  pages: [
    createPage(
      "",
      "The Borough Tap | Modern Pub Template",
      "A modern pub homepage with food, events, sports nights and table bookings.",
      "Modern pub website template with menus, events, sports, bookings, gallery, contact and FAQ.",
      barPubDefaultBasePath
    ),
    createPage(
      "food-menu",
      "Food Menu",
      "Pub food with practical service notes, lunch timing and group-friendly choices.",
      "Pub food menu page with classics, small plates and lunch service notes.",
      `${barPubDefaultBasePath}/food-menu`
    ),
    createPage(
      "drinks",
      "Drinks",
      "A drinks page for house beer, wine, low-ABV, alcohol-free and soft options.",
      "Modern pub drinks page with responsible menu structure.",
      `${barPubDefaultBasePath}/drinks`
    ),
    createPage(
      "events",
      "Events",
      "Quiz nights, live music and local events with clear booking paths.",
      "Pub events page with calendar-style event cards.",
      `${barPubDefaultBasePath}/events`
    ),
    createPage(
      "sports",
      "Sports",
      "Fixture screenings, table timing and group booking notes.",
      "Pub sports page with fixture and booking information.",
      `${barPubDefaultBasePath}/sports`
    ),
    createPage(
      "gallery",
      "Gallery",
      "Room, food and event moments that feel local without nostalgia clichés.",
      "Modern pub gallery page with original visual direction.",
      `${barPubDefaultBasePath}/gallery`
    ),
    createPage(
      "bookings",
      "Bookings",
      "A direct booking form for tables, quiz teams, fixtures and group meals.",
      "Pub booking page with validation and safe demo success state.",
      `${barPubDefaultBasePath}/bookings`
    ),
    createPage(
      "contact",
      "Contact",
      "Hours, location, access and table-booking contact details.",
      "Pub contact page with hours, location and access notes.",
      `${barPubDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "Practical questions for bookings, events, sports nights and food service.",
      "Pub FAQ page for table and event planning questions.",
      `${barPubDefaultBasePath}/faq`
    )
  ],
  hero: {
    eyebrow: "Modern local pub",
    title: "A neighborhood pub built around tables, fixtures and actual reasons to visit.",
    subtitle:
      "The Borough Tap gives a local pub room for food, drinks, sports, quiz nights, live music and group bookings without relying on vague good-times copy.",
    primaryCta: "Book a table",
    secondaryCta: "See events",
    serviceNote: "Food service, fixtures and access notes stay close to booking.",
    proofPoints: [
      "Event calendar before generic gallery",
      "Sports nights with table timing",
      "Group booking form with context"
    ]
  },
  menuSections: [
    {
      name: "Lunch and pub plates",
      description: "Food copy with service timing and clear choices.",
      items: [
        {
          name: "Market pie and greens",
          description: "Daily pie, greens, mash and gravy.",
          price: "£16",
          note: "Lunch and dinner"
        },
        {
          name: "Crisp fish sandwich",
          description: "Tartar, pickles, soft roll and chips.",
          price: "£14",
          note: "Until 6 PM"
        },
        {
          name: "Roast cauliflower plate",
          description: "Herb dressing, lentils, toasted seeds.",
          price: "£13"
        }
      ]
    },
    {
      name: "Drinks board",
      description: "Beer, wine and alcohol-free options with no unsafe promotion language.",
      items: [
        {
          name: "House pale",
          description: "Local cask and keg rotation listed on the board.",
          price: "from £5.80"
        },
        {
          name: "Orange wine glass",
          description: "Small producer list for food pairing.",
          price: "£8"
        },
        {
          name: "Ginger lime spritz",
          description: "Alcohol-free, bitter lime, soda, mint.",
          price: "£6"
        }
      ]
    }
  ],
  events: [
    {
      title: "Quiz tables",
      date: "Tuesday",
      time: "7:30 PM",
      description: "Teams book tables in advance; food preorders can be added during launch."
    },
    {
      title: "Acoustic corner",
      date: "Friday",
      time: "8 PM",
      description: "Small live sets with seated tables and a quieter dining area."
    },
    {
      title: "Sunday roast booking",
      date: "Sunday",
      time: "12 PM-5 PM",
      description: "Timed tables help the kitchen and make family bookings easier."
    }
  ],
  sports: [
    {
      title: "Fixture board",
      detail: "Keep upcoming screenings visible without turning the homepage into a sports site.",
      timing: "Updated weekly"
    },
    {
      title: "Group tables",
      detail: "Let guests request one table, two screens or a quieter dining area.",
      timing: "Book ahead"
    },
    {
      title: "Food timing",
      detail: "Show kitchen hours beside match listings so guests plan properly.",
      timing: "Before kick-off"
    }
  ],
  communityNotes: [
    "Accessible entrance notes should be verified before launch.",
    "Events should show timing, table rules and whether food is available.",
    "Responsible hospitality copy should be practical, not preachy."
  ],
  gallery: [
    {
      title: "Corner table",
      alt: "Warm modern pub table with menus and low lamps.",
      tone: "table"
    },
    {
      title: "Fixture board",
      alt: "Pub board showing fixtures and event times.",
      tone: "sports"
    },
    {
      title: "Food pass",
      alt: "Pub lunch plate on a wooden counter.",
      tone: "food"
    },
    {
      title: "Back room",
      alt: "Small pub event room with tables set for a quiz night.",
      tone: "events"
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
    title: "Book a table",
    description:
      "This safe mock form validates locally. Real table inventory and group policies can be connected at launch.",
    submitLabel: "Request table",
    successMessage: "Booking request received. A real launch can connect this to table inventory.",
    emptySelectLabel: "Select visit type",
    validation: formValidation,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      { name: "partySize", label: "Party size", type: "number", required: true },
      {
        name: "visitType",
        label: "Visit type",
        type: "select",
        required: true,
        options: ["Food booking", "Quiz night", "Sports table", "Group meal"]
      },
      {
        name: "notes",
        label: "Guest notes",
        type: "textarea",
        required: false,
        helperText: "Optional: access needs, fixture request, high chair or group timing."
      }
    ]
  },
  responsibleNote:
    "Pub templates should show food timing, access notes, fixture details and responsible service placeholders before launch.",
  faq: [
    {
      question: "Does the booking form reserve a live table?",
      answer:
        "No. It validates locally in the demo. Real table inventory and confirmation workflows should be connected during implementation."
    },
    {
      question: "Can sports fixtures be updated?",
      answer:
        "Yes. The sports section is content-led and can later be driven by CMS entries or a simple weekly schedule."
    },
    {
      question: "Where do access notes go?",
      answer:
        "Use the contact, bookings and FAQ pages for verified entrance, seating and facilities details."
    },
    {
      question: "Can this support group bookings?",
      answer:
        "Yes. The booking form includes visit type and notes fields for groups, quiz teams and fixture requests."
    }
  ]
} as const satisfies BarPubContent;

export const barRooftopContent = {
  id: "bar-03-rooftop",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Aster Deck",
    tagline: "Skyline reservations, group packages and weather-aware rooftop planning.",
    description:
      "A fictional rooftop bar template for skyline views, events, private bookings, group packages and responsible reservation notes.",
    phone: "+1 312 555 0174",
    email: "events@asterdeck.example",
    address: "11 River Tower, Chicago, IL",
    hours: [
      "Wed-Thu 4 PM-11 PM",
      "Fri-Sat 3 PM-1 AM",
      "Sun 3 PM-10 PM",
      "Weather-dependent terrace"
    ]
  },
  navigation: [
    { label: "Drinks", slug: "drinks" },
    { label: "Events", slug: "events" },
    { label: "Private", slug: "private-bookings" },
    { label: "Packages", slug: "group-packages" },
    { label: "Reserve", slug: "reservations" }
  ],
  pages: [
    createPage(
      "",
      "Aster Deck | Rooftop Bar Template",
      "A rooftop bar homepage with skyline views, events, group packages and reservations.",
      "Rooftop bar website template with drinks, food, events, private bookings, group packages, gallery, reservations and FAQ.",
      barRooftopDefaultBasePath
    ),
    createPage(
      "drinks",
      "Drinks",
      "Sunset drinks, alcohol-free options and responsible table-service placeholders.",
      "Rooftop drinks page with clear menu sections and responsible service notes.",
      `${barRooftopDefaultBasePath}/drinks`
    ),
    createPage(
      "food",
      "Food",
      "Light rooftop food designed around groups, weather and table timing.",
      "Rooftop food page with share plates and service timing.",
      `${barRooftopDefaultBasePath}/food`
    ),
    createPage(
      "events",
      "Events",
      "Event programming with skyline timing, access notes and group booking routes.",
      "Rooftop events page with cards and reservation prompts.",
      `${barRooftopDefaultBasePath}/events`
    ),
    createPage(
      "private-bookings",
      "Private Bookings",
      "Private booking details for corporate, celebration and terrace buyout inquiries.",
      "Rooftop private bookings page with capacity and inquiry structure.",
      `${barRooftopDefaultBasePath}/private-bookings`
    ),
    createPage(
      "group-packages",
      "Group Packages",
      "Package cards for sunset tables, terrace groups and weather-aware planning.",
      "Rooftop group packages page with responsible table-service placeholders.",
      `${barRooftopDefaultBasePath}/group-packages`
    ),
    createPage(
      "gallery",
      "Gallery",
      "Skyline, terrace and event visuals that feel elevated without hotel terrace clichés.",
      "Rooftop bar gallery page with original visual direction.",
      `${barRooftopDefaultBasePath}/gallery`
    ),
    createPage(
      "reservations",
      "Reservations",
      "Reservation and group inquiry form with weather, access and timing notes.",
      "Rooftop reservations page with validation and safe demo success state.",
      `${barRooftopDefaultBasePath}/reservations`
    ),
    createPage(
      "contact",
      "Contact",
      "Location, lift access, weather note and opening hours for terrace planning.",
      "Rooftop contact page with access, weather and reservation notes.",
      `${barRooftopDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "Weather, age policy, group packages, access and booking questions.",
      "Rooftop FAQ page for reservation and group planning questions.",
      `${barRooftopDefaultBasePath}/faq`
    )
  ],
  hero: {
    eyebrow: "Rooftop bar and events",
    title: "Sunset tables, skyline events and group bookings with a clear plan.",
    subtitle:
      "Aster Deck keeps skyline events, group packages, weather notes and private bookings clear before guests make plans.",
    primaryCta: "Book rooftop experience",
    secondaryCta: "View events",
    serviceNote: "Weather, lift access and age-policy notes should be visible before guests book.",
    proofPoints: [
      "Event cards near the primary CTA",
      "Group packages without unsafe claims",
      "Weather and access notes built into content"
    ]
  },
  menuSections: [
    {
      name: "Sunset Drinks",
      description: "Bright terrace drinks with clear alcohol-free options.",
      items: [
        {
          name: "Citrus highball",
          description: "Vodka, grapefruit, bitter lemon, soda.",
          price: "$16",
          note: "Tall"
        },
        {
          name: "Terrace spritz",
          description: "Aperitif, sparkling wine, orange, herb.",
          price: "$15",
          note: "Sunset"
        },
        {
          name: "Harbor cooler",
          description: "Cucumber, lime, mint, tonic.",
          price: "$10",
          note: "Alcohol-free"
        }
      ]
    },
    {
      name: "Rooftop Food",
      description: "Shareable plates that work around weather and table timing.",
      items: [
        {
          name: "Crisp chickpea bowl",
          description: "Herbs, yogurt, lemon, warm flatbread.",
          price: "$14"
        },
        {
          name: "Skewer plate",
          description: "Seasonal vegetables, chicken or halloumi, green sauce.",
          price: "$18"
        },
        {
          name: "Late terrace fries",
          description: "Herb salt, aioli, smoked paprika.",
          price: "$9"
        }
      ]
    }
  ],
  events: [
    {
      title: "Sunset table window",
      date: "Thursday-Saturday",
      time: "6 PM-8 PM",
      description: "Timed reservations for guests who want the terrace before night programming."
    },
    {
      title: "Rooftop cinema table",
      date: "Second Wednesday",
      time: "8:30 PM",
      description: "Seated screening with food preorder and weather backup note."
    },
    {
      title: "Private deck preview",
      date: "By inquiry",
      time: "Afternoon",
      description: "Walkthrough for hosts planning corporate or celebration bookings."
    }
  ],
  packages: [
    {
      name: "Sunset table",
      detail: "Reserved table window, food preorder option and weather backup note.",
      suitableFor: "2-6 guests"
    },
    {
      name: "Terrace group",
      detail: "Grouped tables, arrival timing, host contact and access confirmation.",
      suitableFor: "8-24 guests"
    },
    {
      name: "Private deck",
      detail: "Buyout inquiry path with weather, lift, minimum spend and service notes.",
      suitableFor: "Private events"
    }
  ],
  accessNotes: [
    "Terrace opening can change with weather and should be confirmed before launch.",
    "Lift access, entry policy and host contact details belong near booking.",
    "Table-service wording should avoid unsafe or intoxication-focused claims."
  ],
  gallery: [
    {
      title: "Sunset rail",
      alt: "Rooftop terrace rail with skyline view and reserved table cards.",
      tone: "skyline"
    },
    {
      title: "Group table",
      alt: "Rooftop group table set with share plates and water glasses.",
      tone: "group"
    },
    {
      title: "Weather note",
      alt: "Rooftop host stand with weather and lift access note.",
      tone: "access"
    },
    {
      title: "Evening deck",
      alt: "Open-air rooftop bar seating as the sky turns blue.",
      tone: "night"
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
    title: "Book rooftop experience",
    description:
      "This safe mock form validates locally. Real availability, weather rules and deposits can be connected at launch.",
    submitLabel: "Request rooftop booking",
    successMessage:
      "Rooftop booking request received. A real launch can connect this to availability.",
    emptySelectLabel: "Select booking type",
    validation: formValidation,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      { name: "partySize", label: "Party size", type: "number", required: true },
      {
        name: "bookingType",
        label: "Booking type",
        type: "select",
        required: true,
        options: ["Sunset table", "Group package", "Private deck inquiry"]
      },
      {
        name: "notes",
        label: "Guest notes",
        type: "textarea",
        required: false,
        helperText:
          "Optional: weather flexibility, lift access needs, host timing or package notes."
      }
    ]
  },
  responsibleNote:
    "Rooftop templates should include age-policy, weather, access and safe transport placeholders before launch.",
  faq: [
    {
      question: "Does the demo handle weather changes?",
      answer:
        "No. The template includes weather-note placement, but real weather policy and automated guest messaging should be connected during implementation."
    },
    {
      question: "Are group packages real checkout products?",
      answer:
        "No. They are content cards and inquiry routes. Real deposits, minimums and package rules require a backend."
    },
    {
      question: "Where should age policy appear?",
      answer:
        "Use the reservation, contact and FAQ pages for local age policy and accepted ID notes."
    },
    {
      question: "Can private bookings be routed separately?",
      answer:
        "Yes. The private booking and group package routes can later connect to CRM or event inquiry workflows."
    }
  ]
} as const satisfies BarRooftopContent;

export function createBarCocktailPath(
  basePath = barCocktailDefaultBasePath,
  slug: BarCocktailPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createBarPubPath(basePath = barPubDefaultBasePath, slug: BarPubPageSlug = "") {
  return createTemplatePath(basePath, slug);
}

export function createBarRooftopPath(
  basePath = barRooftopDefaultBasePath,
  slug: BarRooftopPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getBarCocktailNavigation(basePath = barCocktailDefaultBasePath) {
  return createTemplateNavigation(basePath, barCocktailContent.navigation);
}

export function getBarPubNavigation(basePath = barPubDefaultBasePath) {
  return createTemplateNavigation(basePath, barPubContent.navigation);
}

export function getBarRooftopNavigation(basePath = barRooftopDefaultBasePath) {
  return createTemplateNavigation(basePath, barRooftopContent.navigation);
}

export function getBarCocktailPage(
  slug: BarCocktailPageSlug,
  basePath = barCocktailDefaultBasePath
): PageContent<BarCocktailPageSlug> {
  return resolveTemplatePage({
    pages: barCocktailContent.pages,
    slug,
    basePath,
    locale: barCocktailContent.locale.defaultLocale,
    templateLabel: "cocktail bar"
  });
}

export function getBarPubPage(
  slug: BarPubPageSlug,
  basePath = barPubDefaultBasePath
): PageContent<BarPubPageSlug> {
  return resolveTemplatePage({
    pages: barPubContent.pages,
    slug,
    basePath,
    locale: barPubContent.locale.defaultLocale,
    templateLabel: "pub"
  });
}

export function getBarRooftopPage(
  slug: BarRooftopPageSlug,
  basePath = barRooftopDefaultBasePath
): PageContent<BarRooftopPageSlug> {
  return resolveTemplatePage({
    pages: barRooftopContent.pages,
    slug,
    basePath,
    locale: barRooftopContent.locale.defaultLocale,
    templateLabel: "rooftop bar"
  });
}
