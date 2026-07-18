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

type Product = {
  name: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  material: string;
  fitOrCare: string;
  inventoryStatus: string;
  variants: readonly string[];
  images: readonly {
    title: string;
    alt: string;
    tone: string;
  }[];
};

type Collection = {
  name: string;
  slug: string;
  description: string;
  filter: string;
};

export type ShopFashionPageSlug =
  | ""
  | "collection"
  | "products/linen-column-coat"
  | "lookbook"
  | "about"
  | "journal"
  | "cart-preview"
  | "contact"
  | "faq";

export type ShopLifestylePageSlug =
  | ""
  | "categories"
  | "products/stoneware-breakfast-set"
  | "collections"
  | "gift-guide"
  | "about"
  | "journal"
  | "cart-preview"
  | "contact"
  | "faq";

export type RestaurantBistroPageSlug =
  "" | "menu" | "about" | "events" | "gallery" | "reservations" | "contact" | "faq";

export type ShopFashionContent = {
  id: "shop-01-fashion";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<ShopFashionPageSlug>[];
  pages: readonly PageContent<ShopFashionPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    editorialNote: string;
    proofPoints: readonly string[];
  };
  products: readonly Product[];
  collections: readonly Collection[];
  lookbook: readonly {
    title: string;
    note: string;
    styling: string;
  }[];
  journal: readonly {
    title: string;
    excerpt: string;
    category: string;
  }[];
  newsletter: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type ShopLifestyleContent = {
  id: "shop-02-lifestyle";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<ShopLifestylePageSlug>[];
  pages: readonly PageContent<ShopLifestylePageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    makerNote: string;
    proofPoints: readonly string[];
  };
  products: readonly Product[];
  collections: readonly Collection[];
  giftGuide: readonly {
    recipient: string;
    suggestion: string;
    priceNote: string;
  }[];
  journal: readonly {
    title: string;
    excerpt: string;
    category: string;
  }[];
  newsletter: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type RestaurantBistroContent = {
  id: "restaurant-02-bistro";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<RestaurantBistroPageSlug>[];
  pages: readonly PageContent<RestaurantBistroPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    serviceNote: string;
    proofPoints: readonly string[];
  };
  menuSections: readonly {
    name: string;
    description: string;
    items: readonly {
      name: string;
      description: string;
      price: string;
      dietary?: readonly string[];
    }[];
  }[];
  specials: readonly {
    day: string;
    title: string;
    detail: string;
  }[];
  events: readonly {
    title: string;
    date: string;
    time: string;
    description: string;
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
  reservation: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export const shopFashionDefaultBasePath = "/templates/shop-01-fashion";
export const shopLifestyleDefaultBasePath = "/templates/shop-02-lifestyle";
export const restaurantBistroDefaultBasePath = "/templates/restaurant-02-bistro";

export const shopFashionPageSlugs = [
  "",
  "collection",
  "products/linen-column-coat",
  "lookbook",
  "about",
  "journal",
  "cart-preview",
  "contact",
  "faq"
] as const satisfies readonly ShopFashionPageSlug[];

export const shopLifestylePageSlugs = [
  "",
  "categories",
  "products/stoneware-breakfast-set",
  "collections",
  "gift-guide",
  "about",
  "journal",
  "cart-preview",
  "contact",
  "faq"
] as const satisfies readonly ShopLifestylePageSlug[];

export const restaurantBistroPageSlugs = [
  "",
  "menu",
  "about",
  "events",
  "gallery",
  "reservations",
  "contact",
  "faq"
] as const satisfies readonly RestaurantBistroPageSlug[];

const localeConfig = {
  defaultLocale: "en",
  fallbackLocale: "en",
  enabledLocales: ["en"],
  directions: {
    en: "ltr"
  }
} as const satisfies TemplateLocaleConfig;

const newsletterValidation = {
  required: "{field} is required.",
  email: "Enter a valid email address.",
  numberMin: "{field} must be at least {min}."
} as const;

export const shopFashionContent = {
  id: "shop-01-fashion",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Atelier Sable",
    tagline: "A seasonal fashion boutique for quiet statement pieces and private styling notes.",
    description:
      "A fictional editorial fashion shop template for capsule collections, product stories, lookbooks, cart preview placeholders, contact, newsletter capture and SEO-ready collection pages.",
    phone: "+1 646 555 0142",
    email: "studio@ateliersable.example",
    address: "214 Mercer Walk, New York, NY",
    hours: [
      "Mon-Fri 11 AM-7 PM",
      "Sat 10 AM-6 PM",
      "Sun by appointment",
      "Private fittings available after 6 PM"
    ]
  },
  navigation: [
    { label: "Collection", slug: "collection" },
    { label: "Product", slug: "products/linen-column-coat" },
    { label: "Lookbook", slug: "lookbook" },
    { label: "Journal", slug: "journal" },
    { label: "Cart", slug: "cart-preview" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "An editorial fashion homepage with collection, lookbook, and cart preview paths.",
      seo: {
        title: "Atelier Sable | Fashion Boutique Template",
        description:
          "Editorial fashion boutique template with capsule collection, product detail, lookbook, journal, cart preview and newsletter.",
        canonicalPath: shopFashionDefaultBasePath
      }
    },
    {
      slug: "collection",
      title: "Collection",
      navLabel: "Collection",
      intro:
        "Product cards with fabric notes, fit cues, price clarity and refined filtering links.",
      seo: {
        title: "Collection | Atelier Sable",
        description: "Browse a fictional fashion capsule with material notes and product links.",
        canonicalPath: `${shopFashionDefaultBasePath}/collection`
      }
    },
    {
      slug: "products/linen-column-coat",
      title: "Linen Column Coat",
      navLabel: "Product Detail",
      intro: "A product detail route with fabric, fit, variants, care notes and cart placeholder.",
      seo: {
        title: "Linen Column Coat | Atelier Sable",
        description:
          "Fashion product detail page with material notes, variants and inquiry-ready cart path.",
        canonicalPath: `${shopFashionDefaultBasePath}/products/linen-column-coat`
      }
    },
    {
      slug: "lookbook",
      title: "Lookbook",
      navLabel: "Lookbook",
      intro: "Editorial outfits grouped by styling situation instead of a default product grid.",
      seo: {
        title: "Lookbook | Atelier Sable",
        description: "Fashion lookbook route with original styling notes and capsule pairings.",
        canonicalPath: `${shopFashionDefaultBasePath}/lookbook`
      }
    },
    {
      slug: "about",
      title: "About",
      navLabel: "About",
      intro:
        "A boutique story page for buying rhythm, fittings, fabric standards and sourcing notes.",
      seo: {
        title: "About | Atelier Sable",
        description: "About page for a fictional editorial fashion boutique template.",
        canonicalPath: `${shopFashionDefaultBasePath}/about`
      }
    },
    {
      slug: "journal",
      title: "Journal",
      navLabel: "Journal",
      intro: "Story cards for fabric, fittings, packing lists and capsule merchandising.",
      seo: {
        title: "Journal | Atelier Sable",
        description: "Fashion journal route with original capsule and styling article cards.",
        canonicalPath: `${shopFashionDefaultBasePath}/journal`
      }
    },
    {
      slug: "cart-preview",
      title: "Cart Preview",
      navLabel: "Cart",
      intro: "A lightweight cart placeholder that explains ecommerce backend requirements.",
      seo: {
        title: "Cart Preview | Atelier Sable",
        description:
          "Cart preview placeholder for a fashion template that is catalog-ready without live checkout.",
        canonicalPath: `${shopFashionDefaultBasePath}/cart-preview`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Boutique contact details, fitting notes, opening hours and newsletter capture.",
      seo: {
        title: "Contact | Atelier Sable",
        description: "Contact route for a fashion boutique template.",
        canonicalPath: `${shopFashionDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Shipping, returns, sizing, fittings and ecommerce integration guidance.",
      seo: {
        title: "FAQ | Atelier Sable",
        description: "Fashion boutique FAQ for sizing, returns, fittings and cart preview limits.",
        canonicalPath: `${shopFashionDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "A capsule shop with a sharper edit than the scroll.",
    subtitle:
      "Atelier Sable presents limited garments through fabric notes, precise fit guidance and styling appointments for considered purchases.",
    primaryCta: "Shop collection",
    secondaryCta: "Explore lookbook",
    editorialNote:
      "Current edit: linen outerwear, narrow belts, compact evening bags, and one cobalt knit stocked in small runs.",
    proofPoints: [
      "Capsule products with fabric and fit notes",
      "Cart preview placeholder for backend handoff",
      "Private styling route for appointment-led retail"
    ]
  },
  products: [
    {
      name: "Linen Column Coat",
      slug: "products/linen-column-coat",
      description:
        "Unlined long coat in dense black linen with a straight shoulder, internal tie, and side seam pockets.",
      price: "$420",
      category: "Outerwear",
      material: "Washed midweight linen, corozo buttons, cotton pocketing",
      fitOrCare: "Straight fit. Air between wears, cold wash separately, hang dry.",
      inventoryStatus: "Small run, 18 units in the demo catalog",
      variants: ["Black / XS", "Black / S", "Black / M", "Black / L"],
      images: [
        {
          title: "Column coat front",
          alt: "Black linen column coat on a minimal editorial rack with white backdrop.",
          tone: "product"
        }
      ]
    },
    {
      name: "Cobalt Rib Knit",
      slug: "products/linen-column-coat",
      description:
        "Fine rib top with a narrow sleeve and high neckline for layering under suiting or denim.",
      price: "$148",
      category: "Knitwear",
      material: "Cotton viscose rib, garment washed for a dry hand",
      fitOrCare: "Close fit. Fold flat, do not hang, reshape while damp.",
      inventoryStatus: "Available in limited sizes",
      variants: ["Cobalt / S", "Cobalt / M", "Ivory / S", "Ivory / M"],
      images: [
        {
          title: "Cobalt knit detail",
          alt: "Cobalt rib knit folded beside a narrow black belt and silver pin.",
          tone: "detail"
        }
      ]
    },
    {
      name: "Fine Line Belt",
      slug: "products/linen-column-coat",
      description:
        "Slim leather belt with a small brushed buckle designed for high-waist trousers.",
      price: "$96",
      category: "Accessories",
      material: "Vegetable-tanned leather, brushed nickel buckle",
      fitOrCare: "Three sizes. Store flat and avoid prolonged direct sun.",
      inventoryStatus: "Core accessory, replenished monthly",
      variants: ["Black / 70", "Black / 80", "Bone / 70", "Bone / 80"],
      images: [
        {
          title: "Fine line belt",
          alt: "Slim black belt arranged across a folded linen coat.",
          tone: "accessory"
        }
      ]
    }
  ],
  collections: [
    {
      name: "Outerwear",
      slug: "collection",
      description:
        "Long coats and lighter layers with material notes visible before product detail.",
      filter: "Coats"
    },
    {
      name: "Knitwear",
      slug: "collection",
      description: "Fine-gauge pieces chosen for layering, compact packing and repeat wear.",
      filter: "Knits"
    },
    {
      name: "Accessories",
      slug: "collection",
      description: "Belts, bags and finishing items that make the capsule feel intentional.",
      filter: "Finish"
    }
  ],
  lookbook: [
    {
      title: "Gallery opening",
      note: "Column coat, cobalt knit, black trouser, small silver pin.",
      styling: "Quiet enough for work, sharp enough for evening."
    },
    {
      title: "Train weekend",
      note: "Washed shirt, rib knit, narrow belt, folded coat over arm.",
      styling: "Pieces repeat without looking like travel uniform."
    },
    {
      title: "Private fitting",
      note: "Two coat sizes, hem pinning, belt comparison, fabric care card.",
      styling: "Appointment copy turns boutique service into conversion."
    }
  ],
  journal: [
    {
      title: "Why the coat is unlined",
      excerpt: "A short buyer note on drape, summer weight, and tailoring cost.",
      category: "Fabric"
    },
    {
      title: "Three pieces for a two-night bag",
      excerpt: "How the capsule supports repeat outfits without adding vague styling copy.",
      category: "Packing"
    },
    {
      title: "What a fitting page should ask",
      excerpt: "Sizing, timing, alteration notes, and the buyer questions a boutique can answer.",
      category: "Retail"
    }
  ],
  newsletter: {
    title: "Receive the next edit",
    description:
      "A safe local demo signup for collection drops, fitting windows, and fabric notes.",
    submitLabel: "Join the list",
    successMessage: "Signup received locally for this demo.",
    emptySelectLabel: "Select an interest",
    validation: newsletterValidation,
    fields: [
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "interest",
        label: "Interest",
        type: "select",
        required: true,
        options: ["Collection drops", "Private fittings", "Fabric notes"]
      }
    ]
  },
  faq: [
    {
      question: "Is this a real checkout?",
      answer:
        "No. The template is catalog-ready and shows cart preview structure. Live checkout needs Shopify, Medusa, Stripe, or another commerce backend."
    },
    {
      question: "Can product variants be expanded?",
      answer:
        "Yes. The product model includes variant placeholders for size, color, SKU and availability mapping."
    },
    {
      question: "How should returns be handled?",
      answer:
        "The FAQ and cart preview leave clear space for return windows, final sale rules and local legal review."
    },
    {
      question: "Can buyers book private fittings?",
      answer:
        "Yes. The contact and newsletter forms can be replaced with a real booking or CRM workflow."
    }
  ]
} as const satisfies ShopFashionContent;

export const shopLifestyleContent = {
  id: "shop-02-lifestyle",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Field & Hearth",
    tagline: "Home goods, table objects and gifts with material notes close to the product.",
    description:
      "A fictional lifestyle shop template for home objects, categories, product detail, collections, gift guide, journal, cart preview and local pickup notes.",
    phone: "+1 415 555 0186",
    email: "hello@fieldandhearth.example",
    address: "72 Linden Yard, San Francisco, CA",
    hours: [
      "Tue-Sat 10 AM-6 PM",
      "Sun 11 AM-4 PM",
      "Mon closed",
      "Pickup desk closes 20 minutes before store close"
    ]
  },
  navigation: [
    { label: "Categories", slug: "categories" },
    { label: "Product", slug: "products/stoneware-breakfast-set" },
    { label: "Collections", slug: "collections" },
    { label: "Gift Guide", slug: "gift-guide" },
    { label: "Cart", slug: "cart-preview" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A warm lifestyle shop homepage for categories, gifts, products and pickup.",
      seo: {
        title: "Field & Hearth | Lifestyle Shop Template",
        description:
          "Lifestyle home goods shop template with categories, product detail, collections, gift guide, cart preview and local pickup content.",
        canonicalPath: shopLifestyleDefaultBasePath
      }
    },
    {
      slug: "categories",
      title: "Categories",
      navLabel: "Categories",
      intro:
        "Category cards for ceramics, candles, textiles and tableware with practical browsing.",
      seo: {
        title: "Categories | Field & Hearth",
        description: "Browse lifestyle shop categories with product and material notes.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/categories`
      }
    },
    {
      slug: "products/stoneware-breakfast-set",
      title: "Stoneware Breakfast Set",
      navLabel: "Product Detail",
      intro: "A product detail route with material, care, pickup and gift-ready notes.",
      seo: {
        title: "Stoneware Breakfast Set | Field & Hearth",
        description:
          "Lifestyle product detail page with ceramics, care notes, variants and cart preview.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/products/stoneware-breakfast-set`
      }
    },
    {
      slug: "collections",
      title: "Collections",
      navLabel: "Collections",
      intro: "Seasonal product groupings for morning tables, soft light and guest-room shelves.",
      seo: {
        title: "Collections | Field & Hearth",
        description: "Lifestyle shop collection route with warm editorial product blocks.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/collections`
      }
    },
    {
      slug: "gift-guide",
      title: "Gift Guide",
      navLabel: "Gift Guide",
      intro: "Gift logic by recipient, budget and pickup timing rather than decorative filler.",
      seo: {
        title: "Gift Guide | Field & Hearth",
        description: "Gift guide route for lifestyle shop templates with practical buying cues.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/gift-guide`
      }
    },
    {
      slug: "about",
      title: "About",
      navLabel: "About",
      intro: "A store story page for local makers, shelf rhythm, pickup and care standards.",
      seo: {
        title: "About | Field & Hearth",
        description: "About page for a fictional lifestyle home goods shop template.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/about`
      }
    },
    {
      slug: "journal",
      title: "Journal",
      navLabel: "Journal",
      intro: "Editorial story cards about care, table settings, gifts and local maker notes.",
      seo: {
        title: "Journal | Field & Hearth",
        description: "Lifestyle shop journal route with care, maker and product story cards.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/journal`
      }
    },
    {
      slug: "cart-preview",
      title: "Cart Preview",
      navLabel: "Cart",
      intro: "A lightweight cart placeholder for pickup, gift wrap and commerce integration notes.",
      seo: {
        title: "Cart Preview | Field & Hearth",
        description:
          "Cart preview placeholder for a lifestyle shop template without live checkout.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/cart-preview`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Store address, pickup window, phone, email, hours and local retail notes.",
      seo: {
        title: "Contact | Field & Hearth",
        description: "Contact and pickup route for a lifestyle home goods shop template.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Answers for pickup, fragile items, care, gift wrap and checkout integration.",
      seo: {
        title: "FAQ | Field & Hearth",
        description: "Lifestyle shop FAQ for pickup, materials, care notes and cart limitations.",
        canonicalPath: `${shopLifestyleDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "Objects for the table, shelf and guest room, arranged by use.",
    subtitle:
      "Field & Hearth brings ceramics, candles, textiles and gifts together with useful product detail, care notes and pickup clarity.",
    primaryCta: "Shop new arrivals",
    secondaryCta: "Browse categories",
    makerNote:
      "This week: speckled stoneware, beeswax tapers, linen napkins, and cedar drawer blocks from small regional workshops.",
    proofPoints: [
      "Material and care notes on every product",
      "Gift guide organized by recipient and timing",
      "Cart preview ready for a future commerce backend"
    ]
  },
  products: [
    {
      name: "Stoneware Breakfast Set",
      slug: "products/stoneware-breakfast-set",
      description:
        "Two small plates, two shallow bowls and two handleless cups in a warm speckled glaze.",
      price: "$118",
      category: "Ceramics",
      material: "High-fired stoneware with hand-applied oat glaze",
      fitOrCare: "Dishwasher safe. Avoid thermal shock and stack with care.",
      inventoryStatus: "Six sets in the demo catalog",
      variants: ["Oat glaze", "Salt glaze", "Mixed glaze"],
      images: [
        {
          title: "Breakfast set",
          alt: "Speckled stoneware plates, bowls and cups on a linen breakfast table.",
          tone: "ceramic"
        }
      ]
    },
    {
      name: "Cedar Drawer Blocks",
      slug: "products/stoneware-breakfast-set",
      description:
        "A boxed set of six sanded cedar blocks for linen drawers, guest rooms and storage shelves.",
      price: "$32",
      category: "Utility",
      material: "Untreated cedar, recycled paper wrap",
      fitOrCare: "Refresh lightly with fine sandpaper when scent softens.",
      inventoryStatus: "Core utility item",
      variants: ["Set of 6", "Set of 12"],
      images: [
        {
          title: "Cedar blocks",
          alt: "Small cedar blocks stacked beside folded linen towels.",
          tone: "utility"
        }
      ]
    },
    {
      name: "Linen Table Runner",
      slug: "products/stoneware-breakfast-set",
      description:
        "Washed linen runner with a narrow selvedge stripe for long tables and consoles.",
      price: "$74",
      category: "Textiles",
      material: "European flax linen, washed finish",
      fitOrCare: "Cold wash, line dry, press while slightly damp if a crisp edge is preferred.",
      inventoryStatus: "Seasonal color run",
      variants: ["Clay stripe", "Sage stripe", "Natural stripe"],
      images: [
        {
          title: "Linen runner",
          alt: "Washed linen table runner under ceramic cups and a taper candle.",
          tone: "textile"
        }
      ]
    }
  ],
  collections: [
    {
      name: "Morning Table",
      slug: "collections",
      description:
        "Ceramics, linen and small candles sized for breakfast, brunch and slow weekends.",
      filter: "Table"
    },
    {
      name: "Guest Room Shelf",
      slug: "collections",
      description: "Soft textiles, cedar blocks and calm objects for useful hospitality moments.",
      filter: "Guest"
    },
    {
      name: "Small Gifts",
      slug: "gift-guide",
      description: "Objects under $80 with material notes, wrapping options and pickup timing.",
      filter: "Gifts"
    }
  ],
  giftGuide: [
    {
      recipient: "Host",
      suggestion: "Beeswax taper pair, linen napkins and a handwritten care card.",
      priceNote: "Under $65"
    },
    {
      recipient: "New apartment",
      suggestion: "Stoneware breakfast set with optional pickup wrapping.",
      priceNote: "$118 set"
    },
    {
      recipient: "Long-distance parcel",
      suggestion: "Cedar drawer blocks and a textile care note packed flat.",
      priceNote: "Ships compactly"
    }
  ],
  journal: [
    {
      title: "How to store stoneware without chips",
      excerpt: "Shelf spacing, felt pads and the care copy product pages should include.",
      category: "Care"
    },
    {
      title: "A useful gift table for December",
      excerpt: "Grouping by recipient makes the guide more useful than a seasonal collage.",
      category: "Gifts"
    },
    {
      title: "What local pickup copy needs",
      excerpt: "Hours, packing time, fragile item notes and contact routes close to conversion.",
      category: "Operations"
    }
  ],
  newsletter: {
    title: "Get the shelf note",
    description: "A local demo signup for arrivals, maker notes, pickup reminders and gift lists.",
    submitLabel: "Subscribe",
    successMessage: "Signup received locally for this demo.",
    emptySelectLabel: "Select an interest",
    validation: newsletterValidation,
    fields: [
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "interest",
        label: "Interest",
        type: "select",
        required: true,
        options: ["New arrivals", "Gift guide", "Care notes", "Local pickup"]
      }
    ]
  },
  faq: [
    {
      question: "Does the template include real checkout?",
      answer:
        "No. It includes product, collection and cart preview structure. Live commerce needs Shopify, Medusa, Stripe or another backend."
    },
    {
      question: "Can store pickup be connected?",
      answer:
        "Yes. The pickup copy is structured so a future commerce backend can map pickup windows and notifications."
    },
    {
      question: "Are fragile item policies editable?",
      answer:
        "Yes. Product detail, FAQ and cart preview sections leave space for fragile packing and return rules."
    },
    {
      question: "Can categories support more products?",
      answer:
        "Yes. Product and collection records are typed so additional categories can be added without changing reusable UI."
    }
  ]
} as const satisfies ShopLifestyleContent;

export const restaurantBistroContent = {
  id: "restaurant-02-bistro",
  locale: localeConfig,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "June & Bay Bistro",
    tagline: "A relaxed neighborhood bistro with a short seasonal menu and regular events.",
    description:
      "A fictional neighborhood bistro template for menu browsing, daily specials, events, reservations, gallery, contact, location and FAQ content.",
    phone: "+1 718 555 0137",
    email: "table@juneandbay.example",
    address: "36 Bay Street, Brooklyn, NY",
    hours: [
      "Lunch Wed-Fri 12 PM-3 PM",
      "Dinner Tue-Sun 5 PM-10 PM",
      "Weekend brunch 10 AM-2 PM",
      "Closed Monday"
    ]
  },
  navigation: [
    { label: "Menu", slug: "menu" },
    { label: "About", slug: "about" },
    { label: "Events", slug: "events" },
    { label: "Gallery", slug: "gallery" },
    { label: "Reserve", slug: "reservations" }
  ],
  pages: [
    {
      slug: "",
      title: "Home",
      navLabel: "Home",
      intro: "A warm bistro homepage with obvious reservation and menu paths.",
      seo: {
        title: "June & Bay Bistro | Neighborhood Restaurant Template",
        description:
          "Neighborhood bistro template with seasonal menu, daily specials, events, reservations, gallery and contact.",
        canonicalPath: restaurantBistroDefaultBasePath
      }
    },
    {
      slug: "menu",
      title: "Menu",
      navLabel: "Menu",
      intro: "A crawlable menu page with lunch, dinner, wine and dietary notes.",
      seo: {
        title: "Menu | June & Bay Bistro",
        description: "Browse seasonal bistro menu sections with prices and dietary notes.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/menu`
      }
    },
    {
      slug: "about",
      title: "About",
      navLabel: "About",
      intro: "A restaurant story page grounded in neighborhood rhythm instead of chef mythology.",
      seo: {
        title: "About | June & Bay Bistro",
        description: "About page for a relaxed fictional neighborhood bistro template.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/about`
      }
    },
    {
      slug: "events",
      title: "Events",
      navLabel: "Events",
      intro: "Wine nights, prix fixe Mondays, produce dinners and small group booking cues.",
      seo: {
        title: "Events | June & Bay Bistro",
        description: "Bistro events page with practical event details and reservation CTA.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/events`
      }
    },
    {
      slug: "gallery",
      title: "Gallery",
      navLabel: "Gallery",
      intro: "Food, sidewalk tables, wine shelf and service details with accessible captions.",
      seo: {
        title: "Gallery | June & Bay Bistro",
        description: "Neighborhood bistro gallery route with warm original image direction.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/gallery`
      }
    },
    {
      slug: "reservations",
      title: "Reservations",
      navLabel: "Reservations",
      intro: "A simple reservation request form with party, date, time and guest notes.",
      seo: {
        title: "Reservations | June & Bay Bistro",
        description: "Reserve a table through an accessible mock bistro reservation form.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/reservations`
      }
    },
    {
      slug: "contact",
      title: "Contact",
      navLabel: "Contact",
      intro: "Address, phone, email, hours, transit notes and simple group inquiry guidance.",
      seo: {
        title: "Contact | June & Bay Bistro",
        description: "Contact and location route for a neighborhood bistro template.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/contact`
      }
    },
    {
      slug: "faq",
      title: "FAQ",
      navLabel: "FAQ",
      intro: "Answers for reservations, walk-ins, dietary needs, events, kids and access.",
      seo: {
        title: "FAQ | June & Bay Bistro",
        description: "Neighborhood bistro FAQ content for reservations, events and access.",
        canonicalPath: `${restaurantBistroDefaultBasePath}/faq`
      }
    }
  ],
  hero: {
    title: "A neighborhood table for lunch regulars and last-minute dinners.",
    subtitle:
      "June & Bay keeps the menu, daily specials, events and reservations as warm and useful as the room itself.",
    primaryCta: "Reserve table",
    secondaryCta: "View menu",
    serviceNote: "Today: lunch until 3 PM, dinner from 5 PM, walk-ins held for the bar rail.",
    proofPoints: [
      "Short seasonal menu in HTML",
      "Daily specials and events near the reservation path",
      "Neighborhood hours, transit and access notes"
    ]
  },
  menuSections: [
    {
      name: "Lunch",
      description: "Compact plates for midweek tables and quick returns to the office.",
      items: [
        {
          name: "Market greens, lemon dressing, toasted seeds",
          description: "Bitter leaves, shaved fennel and a bright house vinaigrette.",
          price: "$16",
          dietary: ["V", "GF"]
        },
        {
          name: "Roast chicken sandwich, herb aioli",
          description: "Warm ciabatta, pickled onion, crisp lettuce and pan juices.",
          price: "$18"
        },
        {
          name: "Mushroom tartine, soft herbs",
          description: "Sauteed mushrooms over grilled sourdough with parsley and shallot.",
          price: "$17",
          dietary: ["V"]
        }
      ]
    },
    {
      name: "Dinner",
      description: "Seasonal plates, easy wine pairings and enough range for regular guests.",
      items: [
        {
          name: "Ricotta gnudi, brown butter, sage",
          description: "Tender dumplings with squash, sage and toasted hazelnut.",
          price: "$27",
          dietary: ["V"]
        },
        {
          name: "Hanger steak, green peppercorn, fries",
          description: "A familiar bistro plate with bitter greens and warm sauce.",
          price: "$34"
        },
        {
          name: "Cod, white beans, roasted tomato",
          description: "Pan-roasted cod over beans with garlic, herbs and olive oil.",
          price: "$31",
          dietary: ["GF"]
        }
      ]
    },
    {
      name: "By the Glass",
      description: "A short list a neighborhood server can describe without a script.",
      items: [
        {
          name: "Loire Chenin",
          description: "Dry, textured, useful with fish and vegetables.",
          price: "$15"
        },
        {
          name: "Etna Rosso",
          description: "Light red with enough structure for chicken, steak and mushrooms.",
          price: "$16"
        }
      ]
    }
  ],
  specials: [
    {
      day: "Tuesday",
      title: "Half chicken and greens",
      detail: "Roast chicken, bitter salad and a glass pour suggestion after 5 PM."
    },
    {
      day: "Thursday",
      title: "Pasta sheet",
      detail: "Two handmade pastas posted at lunch and carried through dinner if available."
    },
    {
      day: "Sunday",
      title: "Brunch to supper",
      detail: "Eggs until 2 PM, then a shorter dinner board for walk-ins and regulars."
    }
  ],
  events: [
    {
      title: "Glass pour night",
      date: "First Wednesday",
      time: "6 PM-9 PM",
      description: "Three by-the-glass pours with small plates and a short producer note."
    },
    {
      title: "Neighborhood supper",
      date: "Second Sunday",
      time: "5 PM",
      description: "Family-style table for twelve with seasonal vegetables and simple dessert."
    },
    {
      title: "Market menu preview",
      date: "Last Thursday",
      time: "7 PM",
      description: "A smaller test menu before the next month changes, bookable by inquiry."
    }
  ],
  gallery: [
    {
      title: "Window table at lunch",
      alt: "Warm bistro window table set with menus, water glasses and daylight.",
      tone: "room"
    },
    {
      title: "Ricotta gnudi",
      alt: "Bistro plate of ricotta gnudi with sage, squash and hazelnuts.",
      tone: "dish"
    },
    {
      title: "Wine shelf and chalkboard",
      alt: "Bistro wine shelf beside a chalkboard listing daily specials.",
      tone: "service"
    },
    {
      title: "Sidewalk tables",
      alt: "Small neighborhood bistro sidewalk tables with striped awning and warm light.",
      tone: "outside"
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
  reservation: {
    title: "Reserve a table",
    description:
      "This safe mock form validates reservation details locally. Real availability, deposits and waitlist rules can be connected at launch.",
    submitLabel: "Request table",
    successMessage: "Reservation request received. This demo keeps the response local.",
    emptySelectLabel: "Select an occasion",
    validation: newsletterValidation,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "time", required: true },
      { name: "partySize", label: "Party size", type: "number", required: true },
      {
        name: "occasion",
        label: "Occasion",
        type: "select",
        required: true,
        options: ["Dinner", "Lunch", "Brunch", "Event inquiry", "Small group"]
      },
      {
        name: "notes",
        label: "Guest notes",
        type: "textarea",
        required: false,
        helperText: "Optional: dietary needs, high chair, access needs or group timing."
      }
    ]
  },
  faq: [
    {
      question: "Do you hold tables for walk-ins?",
      answer:
        "Yes. The demo copy keeps a few bar rail seats and early tables visible as walk-in friendly."
    },
    {
      question: "Can guests book events online?",
      answer:
        "Events can point to the reservation form or a future event ticketing/inquiry integration."
    },
    {
      question: "Is the menu crawlable?",
      answer: "Yes. Menu content is HTML with prices and dietary notes, not an image-only PDF."
    },
    {
      question: "Can dietary notes be expanded?",
      answer:
        "Yes. The content model supports dietary and allergen placeholders that should be verified by the restaurant before launch."
    }
  ]
} as const satisfies RestaurantBistroContent;

export function createShopFashionPath(
  basePath = shopFashionDefaultBasePath,
  slug: ShopFashionPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createShopLifestylePath(
  basePath = shopLifestyleDefaultBasePath,
  slug: ShopLifestylePageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createRestaurantBistroPath(
  basePath = restaurantBistroDefaultBasePath,
  slug: RestaurantBistroPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getShopFashionNavigation(basePath = shopFashionDefaultBasePath) {
  return createTemplateNavigation(basePath, shopFashionContent.navigation);
}

export function getShopLifestyleNavigation(basePath = shopLifestyleDefaultBasePath) {
  return createTemplateNavigation(basePath, shopLifestyleContent.navigation);
}

export function getRestaurantBistroNavigation(basePath = restaurantBistroDefaultBasePath) {
  return createTemplateNavigation(basePath, restaurantBistroContent.navigation);
}

export function getShopFashionPage(
  slug: ShopFashionPageSlug,
  basePath = shopFashionDefaultBasePath
): PageContent<ShopFashionPageSlug> {
  return resolveTemplatePage({
    pages: shopFashionContent.pages,
    slug,
    basePath,
    locale: shopFashionContent.locale.defaultLocale,
    templateLabel: "shop fashion"
  });
}

export function getShopLifestylePage(
  slug: ShopLifestylePageSlug,
  basePath = shopLifestyleDefaultBasePath
): PageContent<ShopLifestylePageSlug> {
  return resolveTemplatePage({
    pages: shopLifestyleContent.pages,
    slug,
    basePath,
    locale: shopLifestyleContent.locale.defaultLocale,
    templateLabel: "shop lifestyle"
  });
}

export function getRestaurantBistroPage(
  slug: RestaurantBistroPageSlug,
  basePath = restaurantBistroDefaultBasePath
): PageContent<RestaurantBistroPageSlug> {
  return resolveTemplatePage({
    pages: restaurantBistroContent.pages,
    slug,
    basePath,
    locale: restaurantBistroContent.locale.defaultLocale,
    templateLabel: "restaurant bistro"
  });
}
