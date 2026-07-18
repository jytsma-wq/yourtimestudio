import {
  createTemplateNavigation,
  createTemplatePath,
  resolveTemplatePage,
  type RoutableTemplatePage
} from "./routing";
import { beautySpaContent, dentistClinicalContent, hotelLuxuryContent } from "./batch-one";
import { beautySalonContent, dentistCosmeticContent, hotelBoutiqueContent } from "./batch-two";
import { restaurantBistroContent, shopFashionContent, shopLifestyleContent } from "./batch-three";
import { barCocktailContent, barPubContent, barRooftopContent } from "./batch-four";
import {
  dentistFamilyContent,
  hotelResortContent,
  restaurantFastCasualContent
} from "./batch-five";
import { beautyAestheticContent, shopSpecialtyContent } from "./batch-six";
import { createStaticContentSource } from "./static-source";

export type TemplateCategorySlug =
  "hotel" | "dentist" | "beauty-salon" | "restaurant" | "bar" | "shop";

export type TemplateStatus = "not-started" | "in-progress" | "complete";

export type TemplateCategory = {
  slug: TemplateCategorySlug;
  label: string;
  plannedTemplates: 3;
  primaryConversion: string;
  summary: string;
};

export type TemplateSummary = {
  id: TemplateId;
  category: TemplateCategorySlug;
  name: string;
  positioning: string;
  visualMood: string;
  primaryCta: string;
  secondaryCta: string;
  previewHref: string;
  status: TemplateStatus;
  requiredPages: string[];
  requiredComponents: string[];
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "time" | "number" | "textarea" | "select";
  required: boolean;
  options?: string[];
  helperText?: string;
};

export type TextDirection = "ltr" | "rtl";

export type TemplateLocaleConfig = {
  defaultLocale: string;
  fallbackLocale: string;
  enabledLocales: string[];
  directions: Record<string, TextDirection>;
};

export type LocalizedValue<T> = Record<string, T>;

export type SeoContent = {
  title: string;
  description: string;
  canonicalPath: string;
  locale?: string;
  languages?: Record<string, string>;
};

export type RestaurantPageSlug =
  | ""
  | "menu"
  | "tasting-menu"
  | "chef-story"
  | "gallery"
  | "private-dining"
  | "reservations"
  | "contact"
  | "faq";

export type RestaurantPage = RoutableTemplatePage<RestaurantPageSlug>;

export type RestaurantFineDiningContent = {
  id: "restaurant-01-fine-dining";
  locale: TemplateLocaleConfig;
  business: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    hours: string[];
  };
  navigation: Array<{ label: string; slug: Exclude<RestaurantPageSlug, ""> }>;
  pages: RestaurantPage[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    serviceNote: string;
    proofPoints: string[];
  };
  menuSections: Array<{
    name: string;
    description: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
      dietary?: string[];
    }>;
  }>;
  tastingMenu: Array<{
    course: string;
    title: string;
    note: string;
  }>;
  signatureDishes: Array<{
    title: string;
    description: string;
    accent: string;
  }>;
  gallery: Array<{
    title: string;
    alt: string;
    tone: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    context: string;
  }>;
  privateDining: {
    title: string;
    description: string;
    capacities: string[];
  };
  reservation: {
    title: string;
    description: string;
    fields: FormField[];
    successMessage: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const templateCategories = [
  {
    slug: "hotel",
    label: "Hotel",
    plannedTemplates: 3,
    primaryConversion: "Direct bookings and rate checks",
    summary: "Destination-led templates for luxury, boutique, and efficient hotel stays."
  },
  {
    slug: "dentist",
    label: "Dentist",
    plannedTemplates: 3,
    primaryConversion: "Appointment and consultation requests",
    summary: "Trust-first templates for clinical, family, and cosmetic dental practices."
  },
  {
    slug: "beauty-salon",
    label: "Beauty Salon",
    plannedTemplates: 3,
    primaryConversion: "Bookings, check-ins, and stylist selection",
    summary: "Style-aware templates for editorial, efficient, and wellness-led salons."
  },
  {
    slug: "restaurant",
    label: "Restaurant",
    plannedTemplates: 3,
    primaryConversion: "Reservations, orders, and menu views",
    summary: "Food-first templates for fine dining, fast casual, and neighborhood restaurants."
  },
  {
    slug: "bar",
    label: "Bar",
    plannedTemplates: 3,
    primaryConversion: "Reservations, events, and queue clarity",
    summary: "Atmosphere-led templates for cocktail bars, social bars, and lounges."
  },
  {
    slug: "shop",
    label: "Shop",
    plannedTemplates: 3,
    primaryConversion: "Product discovery and checkout",
    summary: "Commerce templates for premium launches, DTC stores, and broad catalogs."
  }
] as const satisfies readonly TemplateCategory[];

export const plannedTemplateCount = templateCategories.reduce(
  (total, category) => total + category.plannedTemplates,
  0
);

export const templateIds = [
  "hotel-01-luxury",
  "hotel-02-boutique",
  "hotel-03-resort",
  "dentist-01-clinical",
  "dentist-02-premium-cosmetic",
  "dentist-03-family",
  "beauty-01-salon",
  "beauty-02-spa",
  "beauty-03-aesthetic-clinic",
  "restaurant-01-fine-dining",
  "restaurant-02-bistro",
  "restaurant-03-fast-casual",
  "bar-01-cocktail",
  "bar-02-pub",
  "bar-03-rooftop",
  "shop-01-fashion",
  "shop-02-lifestyle",
  "shop-03-specialty"
] as const;

export type TemplateId = (typeof templateIds)[number];

export const templateRegistry = [
  {
    id: "hotel-01-luxury",
    category: "hotel",
    name: "Grand Heritage Luxury",
    positioning: "Five-star luxury hotel with spa, suites, fine dining and concierge service.",
    visualMood: "Quiet, spacious, editorial, high-end",
    primaryCta: "Book a stay",
    secondaryCta: "Explore suites",
    previewHref: "/templates/hotel-01-luxury",
    status: "complete",
    requiredPages: [
      "Home",
      "Rooms",
      "Room Detail",
      "Dining",
      "Spa",
      "Experiences",
      "Gallery",
      "Offers",
      "Booking",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Luxury hotel hero",
      "Room cards",
      "Room detail layout",
      "Amenities grid",
      "Booking CTA",
      "Spa teaser",
      "Dining teaser",
      "Concierge/service section",
      "Guest reviews",
      "Gallery",
      "Location block",
      "Booking inquiry form",
      "Footer"
    ]
  },
  {
    id: "hotel-02-boutique",
    category: "hotel",
    name: "Boutique Local Stay",
    positioning: "Independent boutique hotel for design-conscious travelers.",
    visualMood: "Artistic, intimate, local, warm, stylish",
    primaryCta: "Reserve your room",
    secondaryCta: "Discover the neighborhood",
    previewHref: "/templates/hotel-02-boutique",
    status: "complete",
    requiredPages: [
      "Home",
      "Rooms",
      "Room Detail",
      "Neighborhood",
      "Journal",
      "Gallery",
      "Offers",
      "Booking",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Booking CTA",
      "Local guide",
      "Event cards",
      "Social gallery",
      "Newsletter"
    ]
  },
  {
    id: "hotel-03-resort",
    category: "hotel",
    name: "Resort Escape",
    positioning: "Resort destination for leisure, family, wellness and activities.",
    visualMood: "Bright, relaxed, scenic, immersive, spacious",
    primaryCta: "Plan your escape",
    secondaryCta: "View activities",
    previewHref: "/templates/hotel-03-resort",
    status: "complete",
    requiredPages: [
      "Home",
      "Rooms/Villas",
      "Room Detail",
      "Activities",
      "Wellness",
      "Dining",
      "Families",
      "Gallery",
      "Offers",
      "Booking",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Scenic resort hero",
      "Room/villa cards",
      "Room/villa detail layout",
      "Activity cards",
      "Wellness feature section",
      "Dining teaser",
      "Family modules",
      "Seasonal offers",
      "Experience itinerary",
      "Booking CTA",
      "Gallery",
      "Guest reviews",
      "Location block",
      "Booking inquiry form",
      "FAQ",
      "Footer"
    ]
  },
  {
    id: "dentist-01-clinical",
    category: "dentist",
    name: "Clinical Trust",
    positioning: "Modern dental clinic focused on clarity, trust and easy appointments.",
    visualMood: "Clean, bright, clinical, calm, professional",
    primaryCta: "Book appointment",
    secondaryCta: "Call emergency care",
    previewHref: "/templates/dentist-01-clinical",
    status: "complete",
    requiredPages: [
      "Home",
      "Treatments",
      "Treatment Detail",
      "Team",
      "Pricing/Insurance",
      "Reviews",
      "Emergency Dental",
      "Appointment",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Clinical trust hero",
      "Treatment grid",
      "Dentist/team profiles",
      "Insurance/trust badges",
      "Hygiene/safety section",
      "Emergency CTA",
      "Review cards",
      "Appointment form",
      "Contact/location block",
      "FAQ",
      "Footer"
    ]
  },
  {
    id: "dentist-02-premium-cosmetic",
    category: "dentist",
    name: "Cosmetic Precision",
    positioning: "Premium cosmetic dentistry and implant clinic.",
    visualMood: "Elegant, precise, high-trust, premium, polished",
    primaryCta: "Schedule consultation",
    secondaryCta: "View treatment options",
    previewHref: "/templates/dentist-02-premium-cosmetic",
    status: "complete",
    requiredPages: [
      "Home",
      "Cosmetic Dentistry",
      "Implants",
      "Treatment Detail",
      "Smile Gallery",
      "Technology",
      "Team",
      "Pricing",
      "Consultation",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Consult form",
      "Treatment journey",
      "Financing card",
      "Gallery",
      "Credentials"
    ]
  },
  {
    id: "dentist-03-family",
    category: "dentist",
    name: "Family Dental",
    positioning: "Family dental practice for children, parents and preventive care.",
    visualMood: "Friendly, warm, approachable, safe, bright",
    primaryCta: "Book family visit",
    secondaryCta: "First visit guide",
    previewHref: "/templates/dentist-03-family",
    status: "complete",
    requiredPages: [
      "Home",
      "Services",
      "Service Detail",
      "Kids Dentistry",
      "Preventive Care",
      "Team",
      "First Visit",
      "Reviews",
      "Appointment",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Family-friendly hero",
      "Family service cards",
      "Kids dentistry section",
      "Preventive care section",
      "First visit checklist",
      "Team profiles",
      "Patient comfort section",
      "Parent information block",
      "Parent testimonials",
      "Appointment form",
      "Emergency/contact CTA",
      "Opening hours",
      "Location block",
      "FAQ",
      "Footer"
    ]
  },
  {
    id: "beauty-01-salon",
    category: "beauty-salon",
    name: "Editorial Salon",
    positioning: "Stylish hair and beauty salon for cuts, color, styling and treatments.",
    visualMood: "Fashionable, polished, modern, confident",
    primaryCta: "Book treatment",
    secondaryCta: "View services",
    previewHref: "/templates/beauty-01-salon",
    status: "complete",
    requiredPages: [
      "Home",
      "Services",
      "Service Detail",
      "Stylists",
      "Pricing",
      "Gallery",
      "Offers",
      "Booking",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Stylist cards",
      "Lookbook filters",
      "Pricing table",
      "Booking CTA",
      "Product shelf"
    ]
  },
  {
    id: "beauty-02-spa",
    category: "beauty-salon",
    name: "Wellness Spa",
    positioning: "Calm wellness spa focused on relaxation, rituals, massage and skincare.",
    visualMood: "Soft, serene, natural, slow, luxurious",
    primaryCta: "Reserve a treatment",
    secondaryCta: "Explore rituals",
    previewHref: "/templates/beauty-02-spa",
    status: "complete",
    requiredPages: [
      "Home",
      "Treatments",
      "Treatment Detail",
      "Spa Packages",
      "Memberships",
      "About",
      "Gallery",
      "Gift Cards",
      "Booking",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Calming spa hero",
      "Treatment cards",
      "Ritual/package cards",
      "Membership CTA",
      "Gift card section",
      "Gallery",
      "Testimonials",
      "Booking form",
      "Opening hours",
      "Location block",
      "Footer"
    ]
  },
  {
    id: "beauty-03-aesthetic-clinic",
    category: "beauty-salon",
    name: "Aesthetic Clinic",
    positioning:
      "Consultation-led aesthetic clinic for facial aesthetics, skin quality planning and safety-first practitioner trust.",
    visualMood: "Clinical-luxury, minimal, precise, high-trust",
    primaryCta: "Book consultation",
    secondaryCta: "View treatments",
    previewHref: "/templates/beauty-03-aesthetic-clinic",
    status: "complete",
    requiredPages: [
      "Home",
      "Treatments",
      "Treatment Detail",
      "Facial Aesthetics",
      "Skin Treatments",
      "Results / Gallery",
      "Practitioners",
      "Technology / Safety",
      "Pricing / Consultation",
      "Aftercare",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Consultation form",
      "Results placeholder",
      "Practitioner cards",
      "Safety and hygiene section",
      "Technology proof",
      "Aftercare guidance",
      "SEO metadata"
    ]
  },
  {
    id: "restaurant-01-fine-dining",
    category: "restaurant",
    name: "Nocturne Table",
    positioning:
      "Premium fine-dining restaurant with chef-led menu and elegant reservation experience.",
    visualMood: "Editorial, cinematic, calm, premium, atmospheric",
    primaryCta: "Reserve a table",
    secondaryCta: "View seasonal menu",
    previewHref: "/templates/restaurant-01-fine-dining",
    status: "complete",
    requiredPages: [
      "Home",
      "Menu",
      "Tasting Menu",
      "About / Chef Story",
      "Gallery",
      "Private Dining",
      "Reservations",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Cinematic hero",
      "Sticky header",
      "Mobile navigation",
      "Reservation CTA",
      "Menu preview",
      "Signature dishes",
      "Chef story section",
      "Gallery",
      "Testimonials",
      "Opening hours",
      "Location block",
      "Private dining CTA",
      "Reservation form",
      "Footer",
      "SEO metadata"
    ]
  },
  {
    id: "restaurant-02-bistro",
    category: "restaurant",
    name: "Neighborhood Bistro",
    positioning: "Local modern bistro with seasonal menu and relaxed atmosphere.",
    visualMood: "Warm, inviting, editorial, neighborhood-focused",
    primaryCta: "Reserve table",
    secondaryCta: "View menu",
    previewHref: "/templates/restaurant-02-bistro",
    status: "complete",
    requiredPages: [
      "Home",
      "Menu",
      "About",
      "Events",
      "Gallery",
      "Reservations",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Dish highlights",
      "Events list",
      "Reservation form",
      "Hours card",
      "Testimonials"
    ]
  },
  {
    id: "restaurant-03-fast-casual",
    category: "restaurant",
    name: "Fast Casual Order",
    positioning: "Fast-casual restaurant focused on quick ordering, fresh food and takeaway.",
    visualMood: "Energetic, clear, colorful, efficient",
    primaryCta: "Order online",
    secondaryCta: "View menu",
    previewHref: "/templates/restaurant-03-fast-casual",
    status: "complete",
    requiredPages: [
      "Home",
      "Menu",
      "Menu Item Detail",
      "Locations",
      "Catering",
      "About",
      "Order",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Fast-casual hero",
      "Order mode selector",
      "Menu category sections",
      "Menu cards",
      "Menu item detail layout",
      "Dietary/allergen labels",
      "Order CTA",
      "Pickup/takeaway info",
      "Location chooser",
      "Catering CTA",
      "Value proposition blocks",
      "Reviews",
      "Contact/location block",
      "FAQ",
      "Footer"
    ]
  },
  {
    id: "bar-01-cocktail",
    category: "bar",
    name: "Cocktail Atelier",
    positioning: "Premium cocktail bar with signature drinks and intimate atmosphere.",
    visualMood: "Dark, cinematic, refined, moody, elegant",
    primaryCta: "Reserve a table",
    secondaryCta: "View drinks",
    previewHref: "/templates/bar-01-cocktail",
    status: "complete",
    requiredPages: [
      "Home",
      "Drinks",
      "Signature Cocktails",
      "Events",
      "Private Hire",
      "Gallery",
      "Reservations",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Drinks menu",
      "Reservation module",
      "Awards strip",
      "Private event form",
      "Gallery"
    ]
  },
  {
    id: "bar-02-pub",
    category: "bar",
    name: "Modern Pub",
    positioning: "Modern pub with food, drinks, sports/events and community feel.",
    visualMood: "Warm, friendly, textured, social",
    primaryCta: "Book a table",
    secondaryCta: "See events",
    previewHref: "/templates/bar-02-pub",
    status: "complete",
    requiredPages: [
      "Home",
      "Food Menu",
      "Drinks",
      "Events",
      "Sports",
      "Gallery",
      "Bookings",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Event schedule",
      "Menu cards",
      "Group booking CTA",
      "Map/contact",
      "Newsletter"
    ]
  },
  {
    id: "bar-03-rooftop",
    category: "bar",
    name: "Rooftop Lounge",
    positioning: "Rooftop bar with skyline views, events, bottle service and group bookings.",
    visualMood: "Urban, stylish, sunset/nightlife, premium",
    primaryCta: "Book rooftop experience",
    secondaryCta: "See events",
    previewHref: "/templates/bar-03-rooftop",
    status: "complete",
    requiredPages: [
      "Home",
      "Drinks",
      "Food",
      "Events",
      "Private Bookings",
      "Group Packages",
      "Gallery",
      "Reservations",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Skyline hero",
      "Events cards",
      "Group packages",
      "Reservation form",
      "Gallery"
    ]
  },
  {
    id: "shop-01-fashion",
    category: "shop",
    name: "Fashion Flagship",
    positioning: "Fashion boutique for curated apparel and accessories.",
    visualMood: "Editorial, stylish, minimal, high-fashion",
    primaryCta: "Shop collection",
    secondaryCta: "View lookbook",
    previewHref: "/templates/shop-01-fashion",
    status: "complete",
    requiredPages: [
      "Home",
      "Collection",
      "Product Detail",
      "Lookbook",
      "About",
      "Journal",
      "Cart Preview",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Product cards",
      "Collection grid",
      "Lookbook",
      "Cart preview",
      "Newsletter"
    ]
  },
  {
    id: "shop-02-lifestyle",
    category: "shop",
    name: "Lifestyle Store",
    positioning: "Lifestyle/home goods store with curated objects, gifts and decor.",
    visualMood: "Warm, tactile, curated, calm, premium",
    primaryCta: "Shop new arrivals",
    secondaryCta: "View gift guide",
    previewHref: "/templates/shop-02-lifestyle",
    status: "complete",
    requiredPages: [
      "Home",
      "Categories",
      "Product Detail",
      "Collections",
      "Gift Guide",
      "About",
      "Journal",
      "Cart Preview",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Category chips",
      "Product cards",
      "Gift guide",
      "Cart preview",
      "Help module"
    ]
  },
  {
    id: "shop-03-specialty",
    category: "shop",
    name: "Specialty Retail",
    positioning:
      "Specialty retail shop for niche safe products, expert guidance, specs, comparison and cart-preview conversion.",
    visualMood: "Expert, trustworthy, clean, product-focused",
    primaryCta: "Browse products",
    secondaryCta: "Get expert advice",
    previewHref: "/templates/shop-03-specialty",
    status: "complete",
    requiredPages: [
      "Home",
      "Products",
      "Product Detail",
      "Categories",
      "Product Comparison",
      "Buying Guide",
      "Expert Advice",
      "Reviews",
      "Cart Preview",
      "Contact",
      "FAQ",
      "404"
    ],
    requiredComponents: [
      "Product specs",
      "Comparison table",
      "Buying guide",
      "Reviews",
      "Expert advice CTA",
      "Cart preview",
      "Newsletter",
      "SEO metadata"
    ]
  }
] as const satisfies readonly TemplateSummary[];

export function getTemplateById(id: TemplateId): TemplateSummary {
  const template = templateRegistry.find((item) => item.id === id);

  if (!template) {
    throw new Error(`Unknown template: ${id}`);
  }

  return template;
}

export const restaurantFineDiningDefaultBasePath = "/templates/restaurant-01-fine-dining";

export const restaurantFineDiningPageSlugs = [
  "",
  "menu",
  "tasting-menu",
  "chef-story",
  "gallery",
  "private-dining",
  "reservations",
  "contact",
  "faq"
] as const satisfies readonly RestaurantPageSlug[];

export const restaurantFineDiningContent = {
  id: "restaurant-01-fine-dining",
  locale: {
    defaultLocale: "en",
    fallbackLocale: "en",
    enabledLocales: ["en"],
    directions: {
      en: "ltr"
    }
  },
  business: {
    name: "Nocturne Table",
    tagline: "Seasonal tasting menu in a quietly dramatic dining room.",
    description:
      "Nocturne Table is a fictional chef-led restaurant template built around reservations, seasonal menus, private dining, and a calm premium dining experience.",
    phone: "+1 212 555 0198",
    email: "reservations@nocturnetable.example",
    address: "18 Linden Court, New York, NY",
    hours: [
      "Dinner Wed-Sun 6 PM-11 PM",
      "Tasting menu seatings 6 PM and 8:45 PM",
      "Private dining by inquiry"
    ]
  },
  navigation: [
    { label: "Menu", slug: "menu" },
    { label: "Tasting", slug: "tasting-menu" },
    { label: "Chef", slug: "chef-story" },
    { label: "Private Dining", slug: "private-dining" },
    { label: "Reservations", slug: "reservations" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A cinematic reservation-first landing page for a premium dining room.",
      seo: {
        title: "Nocturne Table | Fine Dining Restaurant Template",
        description:
          "A premium fine-dining restaurant template with seasonal menu, chef story, private dining and reservations.",
        canonicalPath: restaurantFineDiningDefaultBasePath
      }
    },
    {
      slug: "menu",
      title: "Seasonal Menu",
      navLabel: "Menu",
      intro: "A concise HTML menu with signature dishes, prices, and dietary notes.",
      seo: {
        title: "Seasonal Menu | Nocturne Table",
        description:
          "Browse original fine-dining menu content with signature dishes, dietary notes, and prices.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/menu`
      }
    },
    {
      slug: "tasting-menu",
      title: "Tasting Menu",
      navLabel: "Tasting",
      intro: "A five-course tasting path designed around seasonal produce and tableside service.",
      seo: {
        title: "Tasting Menu | Nocturne Table",
        description: "Preview a premium tasting menu route for a fine-dining restaurant template.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/tasting-menu`
      }
    },
    {
      slug: "chef-story",
      title: "Chef Story",
      navLabel: "Chef",
      intro: "A chef-led narrative page that stays specific without copying any real restaurant.",
      seo: {
        title: "Chef Story | Nocturne Table",
        description:
          "Meet the fictional chef and culinary point of view behind this fine-dining template.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/chef-story`
      }
    },
    {
      slug: "gallery",
      title: "Gallery",
      navLabel: "Gallery",
      intro: "Atmospheric food, room, bar, and service moments with descriptive alt text.",
      seo: {
        title: "Gallery | Nocturne Table",
        description:
          "Explore a cinematic restaurant gallery route with accessible image descriptions.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/gallery`
      }
    },
    {
      slug: "private-dining",
      title: "Private Dining",
      navLabel: "Private Dining",
      intro: "A conversion page for private dinners, celebrations, and buyouts.",
      seo: {
        title: "Private Dining | Nocturne Table",
        description:
          "Private dining inquiry page for an editorial fine-dining restaurant template.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/private-dining`
      }
    },
    {
      slug: "reservations",
      title: "Reservations",
      navLabel: "Reservations",
      intro: "A focused reservation form with validation and safe mock success state.",
      seo: {
        title: "Reservations | Nocturne Table",
        description: "Reserve a table through an accessible mock reservation form.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/reservations`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Hours, address, phone, email, and location guidance for the restaurant template.",
      seo: {
        title: "Contact | Nocturne Table",
        description: "Contact and location route for the Nocturne Table fine-dining template.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Reservation, tasting menu, private dining, accessibility, and policy answers.",
      seo: {
        title: "FAQ | Nocturne Table",
        description:
          "Fine-dining restaurant FAQ content for reservations, menu, private dining, and accessibility.",
        canonicalPath: `${restaurantFineDiningDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "A low-lit dining room built around the season's quiet details.",
    subtitle:
      "Reserve a table for a five-course evening of coastal produce, hearth-charred sauces, and restrained service in a dining room designed for conversation.",
    primaryCta: "Reserve a table",
    secondaryCta: "View menu",
    serviceNote: "Tonight: dinner from 6 PM",
    proofPoints: [
      "Two nightly tasting seatings",
      "Private dining for 10-28 guests",
      "Vegetarian menu with advance notice"
    ]
  },
  menuSections: [
    {
      name: "First Notes",
      description: "Small plates that open the table with acidity, smoke, and mineral texture.",
      items: [
        {
          name: "Cured fluke, fennel pollen, green almond",
          description: "Line-caught fluke with shaved fennel heart and preserved citrus.",
          price: "$24",
          dietary: ["GF"]
        },
        {
          name: "Charred leek tart, black garlic, aged cream",
          description: "A crisp savory tart finished with fermented allium oil.",
          price: "$21",
          dietary: ["V"]
        },
        {
          name: "Hen-of-the-woods, rye crisp, smoked yolk",
          description: "Roasted mushrooms with a warm yolk emulsion and rye crunch.",
          price: "$23"
        }
      ]
    },
    {
      name: "At The Hearth",
      description: "Main plates paced for a calm dinner service rather than a crowded table.",
      items: [
        {
          name: "Duck breast, sour cherry, toasted farro",
          description: "Dry-aged duck with a restrained cherry jus and bitter greens.",
          price: "$46"
        },
        {
          name: "Day boat scallops, celery root, sea herbs",
          description: "Seared scallops with a light celery root puree and herb broth.",
          price: "$44",
          dietary: ["GF"]
        },
        {
          name: "Cabbage pave, walnut miso, pear",
          description: "Layered cabbage roasted until lacquered, served with pear mostarda.",
          price: "$34",
          dietary: ["V"]
        }
      ]
    },
    {
      name: "Last Light",
      description: "Desserts with quiet sweetness and enough texture to finish cleanly.",
      items: [
        {
          name: "Dark chocolate, olive oil, salted oat",
          description: "A compact chocolate cremeux with oat crumble and olive oil.",
          price: "$17",
          dietary: ["V"]
        },
        {
          name: "Poached quince, bay leaf custard",
          description: "Late-season quince with chilled custard and toasted buckwheat.",
          price: "$16",
          dietary: ["V"]
        }
      ]
    }
  ],
  tastingMenu: [
    {
      course: "I",
      title: "Oyster leaf, apple vinegar, iced cucumber",
      note: "A cold opening course served tableside."
    },
    {
      course: "II",
      title: "Fluke, fennel pollen, green almond",
      note: "Bright, mineral, and intentionally restrained."
    },
    {
      course: "III",
      title: "Cabbage pave, walnut miso, pear",
      note: "The vegetable course carries the center of the menu."
    },
    {
      course: "IV",
      title: "Duck breast, sour cherry, toasted farro",
      note: "A hearth course with quiet acidity."
    },
    {
      course: "V",
      title: "Dark chocolate, olive oil, salted oat",
      note: "A compact finish with bittersweet depth."
    }
  ],
  signatureDishes: [
    {
      title: "Cured fluke",
      description: "Green almond, fennel pollen, preserved citrus, and a chilled stoneware plate.",
      accent: "mineral"
    },
    {
      title: "Duck over embers",
      description: "Dry-aged breast carved beside the table with sour cherry and farro.",
      accent: "hearth"
    },
    {
      title: "Cabbage pave",
      description: "Layered leaves roasted until lacquered, finished with walnut miso.",
      accent: "vegetable"
    }
  ],
  gallery: [
    {
      title: "Window table set before service",
      alt: "Low-lit dining room with linen tables and brass lamps before dinner service.",
      tone: "room"
    },
    {
      title: "Fluke with green almond",
      alt: "Cured fish dish with pale green garnish on a matte ceramic plate.",
      tone: "dish"
    },
    {
      title: "Chef finishing sauce",
      alt: "Chef spooning sauce over a plated dish under warm pass lighting.",
      tone: "service"
    },
    {
      title: "Private room with long table",
      alt: "Private dining room with a long table, warm lamps, and dark paneled walls.",
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
  privateDining: {
    title: "A separate room for dinners that need attention without spectacle.",
    description:
      "Host a client dinner, family celebration, or chef-led tasting in a private room with a dedicated service team and a menu written for the table.",
    capacities: [
      "10-16 guests seated",
      "Up to 28 guests for a full buyout",
      "Custom printed menus and wine pairings"
    ]
  },
  reservation: {
    title: "Request a reservation",
    description:
      "This is a safe mock form for the template demo. It validates required fields and returns a local success state.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      {
        name: "partySize",
        label: "Party size",
        type: "number",
        required: true,
        helperText: "Maximum demo party size is 8."
      },
      {
        name: "occasion",
        label: "Occasion",
        type: "select",
        required: true,
        options: ["Dinner", "Tasting menu", "Anniversary", "Private dining inquiry"]
      }
    ],
    successMessage:
      "Reservation request received. The demo keeps this response local and does not send data."
  },
  faq: [
    {
      question: "Do you offer a vegetarian tasting menu?",
      answer:
        "Yes. The vegetarian menu is available with advance notice when the reservation request is made."
    },
    {
      question: "How long is the tasting menu?",
      answer: "Most tasting menu seatings run about two hours and fifteen minutes."
    },
    {
      question: "Can the private room be booked for business dinners?",
      answer: "Yes. The private room supports seated dinners, quiet client meals, and full buyouts."
    },
    {
      question: "Is the menu available as HTML?",
      answer: "Yes. This template uses crawlable HTML menu content instead of image-only PDFs."
    },
    {
      question: "Does the form collect payment or sensitive information?",
      answer:
        "No. The demo form only validates basic reservation details and shows a local success message."
    }
  ]
} as const satisfies RestaurantFineDiningContent;

export function createRestaurantFineDiningPath(
  basePath = restaurantFineDiningDefaultBasePath,
  slug: RestaurantPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getRestaurantFineDiningNavigation(basePath = restaurantFineDiningDefaultBasePath) {
  return createTemplateNavigation(basePath, restaurantFineDiningContent.navigation);
}

export function getRestaurantPage(
  slug: RestaurantPageSlug,
  basePath = restaurantFineDiningDefaultBasePath
): RestaurantPage {
  return resolveTemplatePage({
    pages: restaurantFineDiningContent.pages,
    slug,
    basePath,
    locale: restaurantFineDiningContent.locale.defaultLocale,
    templateLabel: "restaurant"
  });
}

export const staticContentSource = createStaticContentSource([
  restaurantFineDiningContent,
  restaurantBistroContent,
  barCocktailContent,
  barPubContent,
  barRooftopContent,
  hotelResortContent,
  dentistFamilyContent,
  restaurantFastCasualContent,
  beautyAestheticContent,
  shopSpecialtyContent,
  hotelLuxuryContent,
  hotelBoutiqueContent,
  beautySpaContent,
  beautySalonContent,
  dentistClinicalContent,
  dentistCosmeticContent,
  shopFashionContent,
  shopLifestyleContent
]);

export * from "./content-source";
export * from "./localization";
export * from "./routing";
export { createStaticContentSource } from "./static-source";
export * from "./batch-one";
export * from "./batch-two";
export * from "./batch-three";
export * from "./batch-four";
export * from "./batch-five";
export * from "./batch-six";
