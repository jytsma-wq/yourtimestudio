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

type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

type GalleryItem = {
  title: string;
  alt: string;
  note: string;
};

export type BeautyAestheticPageSlug =
  | ""
  | "treatments"
  | "treatments/facial-balance-consultation"
  | "facial-aesthetics"
  | "skin-treatments"
  | "results-gallery"
  | "practitioners"
  | "technology-safety"
  | "pricing-consultation"
  | "aftercare"
  | "contact"
  | "faq";

export type ShopSpecialtyPageSlug =
  | ""
  | "products"
  | "products/grind-by-weight-scale"
  | "categories"
  | "comparison"
  | "buying-guide"
  | "expert-advice"
  | "reviews"
  | "cart-preview"
  | "contact"
  | "faq";

export type BeautyAestheticContent = {
  id: "beauty-03-aesthetic-clinic";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics & {
    reviewReminder: string;
  };
  navigation: readonly NavigationItem<BeautyAestheticPageSlug>[];
  pages: readonly PageContent<BeautyAestheticPageSlug>[];
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
    slug: string;
    category: string;
    summary: string;
    duration: string;
    suitability: string;
  }[];
  consultationSteps: readonly {
    step: string;
    title: string;
    detail: string;
  }[];
  practitioners: readonly {
    name: string;
    role: string;
    credential: string;
    focus: string;
  }[];
  safetyPoints: readonly {
    title: string;
    detail: string;
  }[];
  technology: readonly {
    title: string;
    detail: string;
  }[];
  aftercare: readonly {
    title: string;
    detail: string;
  }[];
  pricing: readonly {
    title: string;
    detail: string;
    note: string;
  }[];
  gallery: readonly GalleryItem[];
  testimonials: readonly Testimonial[];
  consultationForm: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export type ShopSpecialtyContent = {
  id: "shop-03-specialty";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: BusinessBasics;
  navigation: readonly NavigationItem<ShopSpecialtyPageSlug>[];
  pages: readonly PageContent<ShopSpecialtyPageSlug>[];
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    expertNote: string;
    proofPoints: readonly string[];
  };
  categories: readonly {
    name: string;
    summary: string;
    criteria: string;
  }[];
  products: readonly {
    name: string;
    slug: string;
    category: string;
    description: string;
    summary: string;
    price: string;
    specs: readonly {
      label: string;
      value: string;
    }[];
    useCases: readonly string[];
  }[];
  comparison: readonly {
    product: string;
    bestFor: string;
    keySpec: string;
    expertNote: string;
  }[];
  buyingGuide: readonly {
    title: string;
    detail: string;
  }[];
  expertAdvice: readonly {
    title: string;
    detail: string;
  }[];
  testimonials: readonly Testimonial[];
  cartPreview: FormCopy;
  newsletter: FormCopy;
  faq: readonly {
    question: string;
    answer: string;
  }[];
};

export const beautyAestheticDefaultBasePath = "/templates/beauty-03-aesthetic-clinic";
export const shopSpecialtyDefaultBasePath = "/templates/shop-03-specialty";

export const beautyAestheticPageSlugs = [
  "",
  "treatments",
  "treatments/facial-balance-consultation",
  "facial-aesthetics",
  "skin-treatments",
  "results-gallery",
  "practitioners",
  "technology-safety",
  "pricing-consultation",
  "aftercare",
  "contact",
  "faq"
] as const satisfies readonly BeautyAestheticPageSlug[];

export const shopSpecialtyPageSlugs = [
  "",
  "products",
  "products/grind-by-weight-scale",
  "categories",
  "comparison",
  "buying-guide",
  "expert-advice",
  "reviews",
  "cart-preview",
  "contact",
  "faq"
] as const satisfies readonly ShopSpecialtyPageSlug[];

const locale = {
  defaultLocale: "en",
  fallbackLocale: "en",
  enabledLocales: ["en"],
  directions: {
    en: "ltr"
  }
} as const satisfies TemplateLocaleConfig;

function createPage<TSlug extends string>(
  slug: TSlug,
  title: string,
  navLabel: string,
  intro: string,
  description: string,
  canonicalPath: string
): PageContent<TSlug> {
  return {
    slug,
    title,
    navLabel,
    intro,
    seo: {
      title,
      description,
      canonicalPath
    }
  };
}

export const beautyAestheticContent = {
  id: "beauty-03-aesthetic-clinic",
  locale,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Vellum Aesthetic Clinic",
    tagline: "Consultation-led facial aesthetics and skin quality planning.",
    description:
      "A fictional aesthetic clinic template for practitioner-led consultations, facial aesthetics, skin treatments, safety information, aftercare, contact and FAQ content.",
    phone: "+1 212 555 0148",
    email: "consult@vellumclinic.example",
    address: "18 Mercer Lane, Suite 4, New York, NY",
    hours: [
      "Consultations Tue-Fri 9 AM-6 PM",
      "Saturday assessment appointments 10 AM-2 PM",
      "Follow-up calls by scheduled window",
      "Urgent aftercare questions by clinic phone"
    ],
    reviewReminder:
      "Informational demo content only. Real aesthetic clinic copy requires medical, legal and regulatory review before client use."
  },
  navigation: [
    { label: "Treatments", slug: "treatments" },
    { label: "Safety", slug: "technology-safety" },
    { label: "Practitioners", slug: "practitioners" },
    { label: "Aftercare", slug: "aftercare" },
    { label: "Consultation", slug: "pricing-consultation" }
  ],
  pages: [
    createPage(
      "",
      "Vellum Aesthetic Clinic | Aesthetic Clinic Template",
      "Home",
      "A clinical-luxury homepage for consultation-led aesthetic care and skin treatment planning.",
      "Aesthetic clinic template with treatments, practitioners, safety, aftercare, consultation pricing, contact and FAQ.",
      beautyAestheticDefaultBasePath
    ),
    createPage(
      "treatments",
      "Treatments",
      "Treatments",
      "Treatment categories explained through suitability, timing and consultation context.",
      "Aesthetic clinic treatments page with facial aesthetics, skin treatments and suitability notes.",
      `${beautyAestheticDefaultBasePath}/treatments`
    ),
    createPage(
      "treatments/facial-balance-consultation",
      "Facial Balance Consultation",
      "Treatment Detail",
      "A treatment detail route for assessment-led facial aesthetics planning.",
      "Facial aesthetics consultation detail page with process, suitability and aftercare notes.",
      `${beautyAestheticDefaultBasePath}/treatments/facial-balance-consultation`
    ),
    createPage(
      "facial-aesthetics",
      "Facial Aesthetics",
      "Facial Aesthetics",
      "Injectable treatment planning framed around practitioner assessment and realistic expectations.",
      "Facial aesthetics page with anti-wrinkle consultation and dermal filler consultation language.",
      `${beautyAestheticDefaultBasePath}/facial-aesthetics`
    ),
    createPage(
      "skin-treatments",
      "Skin Treatments",
      "Skin Treatments",
      "Skin quality consultations, device-led treatments and home-care planning.",
      "Skin treatment page with assessment, technology and aftercare sections.",
      `${beautyAestheticDefaultBasePath}/skin-treatments`
    ),
    createPage(
      "results-gallery",
      "Results / Gallery",
      "Results",
      "A careful gallery placeholder that avoids exaggerated before-and-after claims.",
      "Aesthetic clinic results gallery placeholder with conservative wording and review reminders.",
      `${beautyAestheticDefaultBasePath}/results-gallery`
    ),
    createPage(
      "practitioners",
      "Practitioners",
      "Practitioners",
      "Practitioner profiles with credentials, focus areas and consultation responsibilities.",
      "Aesthetic clinic practitioner page with profiles and credential-led trust content.",
      `${beautyAestheticDefaultBasePath}/practitioners`
    ),
    createPage(
      "technology-safety",
      "Technology / Safety",
      "Safety",
      "Safety, hygiene, suitability assessment and device notes for aesthetic clinic buyers.",
      "Aesthetic clinic safety page with hygiene, record keeping, equipment and suitability notes.",
      `${beautyAestheticDefaultBasePath}/technology-safety`
    ),
    createPage(
      "pricing-consultation",
      "Pricing / Consultation",
      "Consultation",
      "Transparent consultation notes, pricing caveats and a safe inquiry form.",
      "Aesthetic clinic consultation page with pricing notes and local validation.",
      `${beautyAestheticDefaultBasePath}/pricing-consultation`
    ),
    createPage(
      "aftercare",
      "Aftercare",
      "Aftercare",
      "Aftercare instructions, follow-up expectations and when to contact the clinic.",
      "Aesthetic clinic aftercare page with follow-up and safety guidance.",
      `${beautyAestheticDefaultBasePath}/aftercare`
    ),
    createPage(
      "contact",
      "Contact",
      "Contact",
      "Clinic contact details, hours, appointment expectations and review reminder.",
      "Aesthetic clinic contact page with location, hours, phone and legal review reminder.",
      `${beautyAestheticDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "FAQ",
      "Common questions about consultation, treatment suitability, aftercare and pricing.",
      "Aesthetic clinic FAQ page with conservative treatment and consultation answers.",
      `${beautyAestheticDefaultBasePath}/faq`
    )
  ],
  hero: {
    title: "Aesthetic care starts with assessment, not assumptions.",
    subtitle:
      "Vellum puts practitioner-led consultation, realistic expectations, safety information and aftercare before any treatment decision.",
    primaryCta: "Book consultation",
    secondaryCta: "View treatments",
    safetyNote:
      "Content is informational demo copy. Treatment suitability, risks, costs and timing must be reviewed by qualified practitioners before real use.",
    proofPoints: [
      "Practitioner-led suitability assessment",
      "Conservative results language",
      "Aftercare and follow-up built into the journey"
    ]
  },
  treatments: [
    {
      name: "Facial balance consultation",
      slug: "facial-balance-consultation",
      category: "Facial aesthetics",
      summary:
        "Assessment-led planning for facial proportions, profile concerns and treatment options.",
      duration: "45-60 minutes",
      suitability: "Requires practitioner review before any treatment recommendation."
    },
    {
      name: "Anti-wrinkle treatment consultation",
      slug: "anti-wrinkle-consultation",
      category: "Facial aesthetics",
      summary: "A consultation route for movement lines, medical history and realistic timing.",
      duration: "30 minutes",
      suitability: "Suitability depends on assessment, contraindications and consent."
    },
    {
      name: "Dermal filler consultation",
      slug: "dermal-filler-consultation",
      category: "Facial aesthetics",
      summary: "Planning conversation for volume, contour and balance without guaranteed outcomes.",
      duration: "45 minutes",
      suitability: "Treatment is not suitable for everyone and must be practitioner assessed."
    },
    {
      name: "Skin quality consultation",
      slug: "skin-quality-consultation",
      category: "Skin treatments",
      summary: "Review of texture, hydration, pigment concerns and treatment planning options.",
      duration: "40 minutes",
      suitability: "Device and topical plans require skin assessment and review."
    }
  ],
  consultationSteps: [
    {
      step: "01",
      title: "Assessment first",
      detail:
        "Medical history, skin context, previous treatment and goals are reviewed before options."
    },
    {
      step: "02",
      title: "Plan with limits",
      detail:
        "The practitioner explains suitability, alternatives, expected timing and aftercare duties."
    },
    {
      step: "03",
      title: "Follow-up window",
      detail: "Clients receive aftercare guidance and a clear route for follow-up questions."
    }
  ],
  practitioners: [
    {
      name: "Dr. Mara Vale",
      role: "Medical aesthetic practitioner",
      credential: "Licensed clinician, complication-management training noted",
      focus: "Facial aesthetics consultation and conservative treatment planning."
    },
    {
      name: "Elena Park",
      role: "Skin treatment specialist",
      credential: "Advanced skin assessment and device safety training placeholder",
      focus: "Skin quality consultation, home-care planning and aftercare education."
    }
  ],
  safetyPoints: [
    {
      title: "Suitability before treatment",
      detail: "Every pathway begins with consultation, medical history and consent discussion."
    },
    {
      title: "Hygiene and records",
      detail: "Treatment notes, aftercare instructions and contact routes are documented."
    },
    {
      title: "Conservative claims",
      detail:
        "The template avoids guaranteed outcomes, urgency tactics and exaggerated result language."
    }
  ],
  technology: [
    {
      title: "Skin imaging placeholder",
      detail:
        "The page can describe imaging or assessment tools once a real clinic confirms equipment."
    },
    {
      title: "Device review notes",
      detail: "Device-led treatment copy is structured for later legal and clinical review."
    },
    {
      title: "Consent-ready flow",
      detail:
        "Consultation sections make risks, alternatives and aftercare part of the conversion path."
    }
  ],
  aftercare: [
    {
      title: "Before leaving",
      detail: "Clients receive expected-response notes, activity limits and contact instructions."
    },
    {
      title: "First follow-up",
      detail: "A scheduled review window helps keep treatment decisions calm and documented."
    },
    {
      title: "When to call",
      detail: "The clinic phone remains visible for urgent aftercare questions and escalation."
    }
  ],
  pricing: [
    {
      title: "Consultation appointment",
      detail: "Assessment-first appointment for facial aesthetics or skin quality planning.",
      note: "Fees, deposits and treatment pricing require local review before launch."
    },
    {
      title: "Treatment plan estimate",
      detail: "Costs are discussed after assessment, suitability review and chosen treatment path.",
      note: "Do not present this template as a fixed treatment quote."
    }
  ],
  gallery: [
    {
      title: "Consultation room",
      alt: "Generated aesthetic clinic consultation room with calm lighting, clean counter and treatment chair.",
      note: "Use environment imagery before any real result photography is approved."
    },
    {
      title: "Assessment notes",
      alt: "Generated clinic assessment desk with skin chart, tablet and aftercare card.",
      note: "The template is structured for education and review, not dramatic before-after claims."
    },
    {
      title: "Aftercare shelf",
      alt: "Generated aftercare display with sealed guidance cards and clinical storage.",
      note: "Aftercare remains visible across the conversion path."
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
  consultationForm: {
    title: "Request a consultation",
    description:
      "This demo form validates locally. Real booking, consent, screening and payment workflows require clinic systems.",
    submitLabel: "Send request",
    successMessage:
      "Consultation request received. A real clinic would review suitability before confirming.",
    emptySelectLabel: "Select consultation focus",
    validation: {
      required: "Add this detail before sending the request.",
      email: "Enter a valid email address.",
      numberMin: "Enter a number greater than zero."
    },
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      {
        name: "focus",
        label: "Consultation focus",
        type: "select",
        required: true,
        options: ["Facial aesthetics", "Skin quality", "Aftercare question", "Not sure yet"]
      },
      { name: "preferredDate", label: "Preferred date", type: "date", required: true },
      {
        name: "notes",
        label: "Questions for the practitioner",
        type: "textarea",
        required: false,
        helperText: "Do not enter urgent medical information in this static demo."
      }
    ]
  },
  faq: [
    {
      question: "Can this template promise treatment results?",
      answer:
        "No. It is intentionally written for consultation, suitability assessment and realistic expectations."
    },
    {
      question: "Does the form book a real appointment?",
      answer:
        "No. It is a local demo form. Real scheduling, screening and consent need a clinic system."
    },
    {
      question: "Can before-and-after photos be added?",
      answer:
        "Yes, but only after consent, legal review and platform policy requirements are confirmed."
    },
    {
      question: "Why avoid specific brand treatment names?",
      answer:
        "Generic terminology keeps the template safer and easier to adapt across regions and practitioners."
    }
  ]
} as const satisfies BeautyAestheticContent;

export const shopSpecialtyContent = {
  id: "shop-03-specialty",
  locale,
  ui: {
    mobileMenu: "Menu",
    mobileClose: "Close"
  },
  business: {
    name: "Dial & Bloom Supply",
    tagline: "Specialty coffee equipment with expert notes and comparison-first buying paths.",
    description:
      "A fictional specialty retail template for safe niche products, product specs, comparison, buying guides, expert advice, cart preview, contact and FAQ content.",
    phone: "+1 503 555 0184",
    email: "advice@dialbloom.example",
    address: "42 Alder Workshop, Portland, OR",
    hours: [
      "Showroom Tue-Sat 10 AM-6 PM",
      "Bench demos by appointment",
      "Pickup window 12 PM-5 PM",
      "Expert replies within one business day"
    ]
  },
  navigation: [
    { label: "Products", slug: "products" },
    { label: "Compare", slug: "comparison" },
    { label: "Buying Guide", slug: "buying-guide" },
    { label: "Advice", slug: "expert-advice" },
    { label: "Cart", slug: "cart-preview" }
  ],
  pages: [
    createPage(
      "",
      "Dial & Bloom Supply | Specialty Retail Template",
      "Home",
      "An expert specialty retail homepage for product education, comparison and cart-preview conversion.",
      "Specialty retail template with product grid, detail, categories, comparison, buying guide, expert advice, cart preview, contact and FAQ.",
      shopSpecialtyDefaultBasePath
    ),
    createPage(
      "products",
      "Products",
      "Products",
      "Product cards with specs, use cases and expert notes for specialty coffee tools.",
      "Specialty retail products page with coffee equipment, specs and product detail links.",
      `${shopSpecialtyDefaultBasePath}/products`
    ),
    createPage(
      "products/grind-by-weight-scale",
      "Grind-by-Weight Scale",
      "Product Detail",
      "A product detail route with specs, use cases, setup notes and inquiry CTA.",
      "Specialty product detail page for a coffee scale with specs and buying guidance.",
      `${shopSpecialtyDefaultBasePath}/products/grind-by-weight-scale`
    ),
    createPage(
      "categories",
      "Categories",
      "Categories",
      "Category navigation for brewing, grinding, measuring and setup support.",
      "Specialty retail categories page with expert criteria by product type.",
      `${shopSpecialtyDefaultBasePath}/categories`
    ),
    createPage(
      "comparison",
      "Product Comparison",
      "Compare",
      "A readable comparison table for deciding between similar specialty products.",
      "Specialty retail comparison page with product specs and expert notes.",
      `${shopSpecialtyDefaultBasePath}/comparison`
    ),
    createPage(
      "buying-guide",
      "Buying Guide",
      "Buying Guide",
      "Criteria-led buying advice for matching product specs to real use cases.",
      "Specialty retail buying guide page with criteria, setup and care notes.",
      `${shopSpecialtyDefaultBasePath}/buying-guide`
    ),
    createPage(
      "expert-advice",
      "Expert Advice",
      "Advice",
      "Advice-led conversion blocks for choosing, maintaining and pairing products.",
      "Specialty retail expert advice page with store guidance and inquiry CTA.",
      `${shopSpecialtyDefaultBasePath}/expert-advice`
    ),
    createPage(
      "reviews",
      "Reviews",
      "Reviews",
      "Buyer and operator reviews focused on advice quality, setup and product fit.",
      "Specialty retail reviews page with practical testimonial content.",
      `${shopSpecialtyDefaultBasePath}/reviews`
    ),
    createPage(
      "cart-preview",
      "Cart Preview",
      "Cart",
      "A lightweight cart/inquiry placeholder that does not pretend to be checkout.",
      "Specialty retail cart preview page with local validation and e-commerce limitations.",
      `${shopSpecialtyDefaultBasePath}/cart-preview`
    ),
    createPage(
      "contact",
      "Contact",
      "Contact",
      "Showroom address, pickup notes, advice channel and contact details.",
      "Specialty retail contact page with hours, location and expert advice route.",
      `${shopSpecialtyDefaultBasePath}/contact`
    ),
    createPage(
      "faq",
      "FAQ",
      "FAQ",
      "Questions about product advice, pickup, returns placeholders and real commerce integration.",
      "Specialty retail FAQ page for catalog, cart preview and expert guidance questions.",
      `${shopSpecialtyDefaultBasePath}/faq`
    )
  ],
  hero: {
    title: "Coffee tools compared by use case, not shelf noise.",
    subtitle:
      "Dial & Bloom compares specialist coffee tools through specifications, real use cases, maintenance notes and expert advice.",
    primaryCta: "Browse products",
    secondaryCta: "Get expert advice",
    expertNote:
      "The demo uses specialty coffee equipment so comparison, setup and maintenance details can stay useful without regulated product risk.",
    proofPoints: [
      "Specs visible before product detail",
      "Comparison table works on mobile",
      "Cart preview without fake checkout"
    ]
  },
  categories: [
    {
      name: "Grind and measure",
      summary: "Scales, burr-care tools and workflow accessories for repeatable recipes.",
      criteria: "Resolution, platform size, response speed and bench footprint."
    },
    {
      name: "Manual brewing",
      summary: "Drippers, kettles and filters selected by brew style and cleanup rhythm.",
      criteria: "Heat retention, pour control, filter fit and durability."
    },
    {
      name: "Setup support",
      summary: "Cleaning, storage and calibration tools that make the kit easier to own.",
      criteria: "Care schedule, counter space, replacement parts and warranty placeholders."
    }
  ],
  products: [
    {
      name: "Grind-by-weight scale",
      slug: "grind-by-weight-scale",
      category: "Grind and measure",
      description:
        "Fast-response bench scale for espresso setup, pour-over recipes and repeatable dosing.",
      summary:
        "Fast-response bench scale for espresso setup, pour-over recipes and repeatable dosing.",
      price: "$148",
      specs: [
        { label: "Resolution", value: "0.1 g" },
        { label: "Platform", value: "120 x 130 mm" },
        { label: "Battery", value: "USB-C rechargeable" },
        { label: "Best use", value: "Espresso bench and travel kit" }
      ],
      useCases: ["Espresso dose checks", "Pour-over recipe timing", "Compact counter setups"]
    },
    {
      name: "Thermal pour kettle",
      slug: "thermal-pour-kettle",
      category: "Manual brewing",
      description: "Insulated gooseneck kettle with measured pour control for manual brewing.",
      summary: "Insulated gooseneck kettle with measured pour control for manual brewing.",
      price: "$124",
      specs: [
        { label: "Capacity", value: "900 ml" },
        { label: "Material", value: "Brushed stainless steel" },
        { label: "Control", value: "Narrow gooseneck spout" },
        { label: "Best use", value: "Daily pour-over bar" }
      ],
      useCases: ["Slow pour control", "Shared kitchen setup", "Compact brew station"]
    },
    {
      name: "Ceramic brewer set",
      slug: "ceramic-brewer-set",
      category: "Manual brewing",
      description: "Dripper and server pairing with stable heat and simple filter matching.",
      summary: "Dripper and server pairing with stable heat and simple filter matching.",
      price: "$96",
      specs: [
        { label: "Material", value: "Glazed ceramic" },
        { label: "Cup range", value: "1-3 cups" },
        { label: "Filter", value: "Flat-bottom paper" },
        { label: "Best use", value: "Home tasting flights" }
      ],
      useCases: ["Weekend brewing", "Giftable starter kit", "Small counter display"]
    }
  ],
  comparison: [
    {
      product: "Grind-by-weight scale",
      bestFor: "Repeatable dosing and compact benches",
      keySpec: "0.1 g resolution",
      expertNote: "Choose this first if recipes drift because measurements are inconsistent."
    },
    {
      product: "Thermal pour kettle",
      bestFor: "Manual pour control and heat retention",
      keySpec: "900 ml insulated body",
      expertNote: "Best paired with a dripper once grind consistency is already solved."
    },
    {
      product: "Ceramic brewer set",
      bestFor: "Simple home brewing and gifting",
      keySpec: "1-3 cup range",
      expertNote: "A strong starter option when setup clarity matters more than gadget features."
    }
  ],
  buyingGuide: [
    {
      title: "Start with the bottleneck",
      detail:
        "If recipes vary daily, compare measurement and grind tools before buying more brewers."
    },
    {
      title: "Check counter behavior",
      detail:
        "Platform size, cord reach, cleaning time and storage matter as much as product claims."
    },
    {
      title: "Pair by routine",
      detail: "The best kit is the one that matches morning time, cup volume and cleanup tolerance."
    }
  ],
  expertAdvice: [
    {
      title: "Bring your current recipe",
      detail: "The advice flow asks what you brew now so recommendations can stay practical."
    },
    {
      title: "Compare total setup cost",
      detail:
        "Filters, cleaning tools and replacement parts should be visible before checkout exists."
    },
    {
      title: "Use cart preview as a checklist",
      detail:
        "The placeholder cart is a planning tool until Shopify, Medusa, Stripe or another backend is connected."
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
  cartPreview: {
    title: "Cart preview request",
    description:
      "This static template collects product interest only. Real checkout, stock, shipping and tax require a commerce backend.",
    submitLabel: "Send product inquiry",
    successMessage:
      "Product inquiry received. A real store would convert this into a cart or quote workflow.",
    emptySelectLabel: "Select product interest",
    validation: {
      required: "Add this detail before sending the inquiry.",
      email: "Enter a valid email address.",
      numberMin: "Enter a number greater than zero."
    },
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "product",
        label: "Product interest",
        type: "select",
        required: true,
        options: [
          "Grind-by-weight scale",
          "Thermal pour kettle",
          "Ceramic brewer set",
          "Not sure yet"
        ]
      },
      { name: "quantity", label: "Estimated quantity", type: "number", required: true },
      {
        name: "notes",
        label: "Setup or advice notes",
        type: "textarea",
        required: false,
        helperText: "Use this for brew style, pickup needs or comparison questions."
      }
    ]
  },
  newsletter: {
    title: "Get bench notes",
    description: "Monthly product setup notes, comparison updates and buying-guide revisions.",
    submitLabel: "Join list",
    successMessage: "Signup received. A real store would connect this to an email provider.",
    emptySelectLabel: "Select topic",
    validation: {
      required: "Add this detail before signing up.",
      email: "Enter a valid email address.",
      numberMin: "Enter a number greater than zero."
    },
    fields: [
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "topic",
        label: "Primary interest",
        type: "select",
        required: true,
        options: ["Espresso setup", "Manual brewing", "Gift advice", "Maintenance"]
      }
    ]
  },
  faq: [
    {
      question: "Is this a real checkout?",
      answer:
        "No. The cart preview is a static inquiry flow until a commerce backend such as Shopify, Medusa, Stripe or custom commerce is connected."
    },
    {
      question: "Why use coffee equipment as the demo category?",
      answer:
        "It is a safe specialty retail example with useful specs, comparison logic and buying guidance."
    },
    {
      question: "Can the product model support another niche?",
      answer:
        "Yes. The content model is structured around categories, specs, comparison rows, buying criteria and expert notes."
    },
    {
      question: "Does the template manage stock or shipping?",
      answer:
        "No. Stock, shipping, tax, accounts and order management require a future e-commerce integration."
    }
  ]
} as const satisfies ShopSpecialtyContent;

export function createBeautyAestheticPath(
  basePath = beautyAestheticDefaultBasePath,
  slug: BeautyAestheticPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function createShopSpecialtyPath(
  basePath = shopSpecialtyDefaultBasePath,
  slug: ShopSpecialtyPageSlug = ""
) {
  return createTemplatePath(basePath, slug);
}

export function getBeautyAestheticNavigation(basePath = beautyAestheticDefaultBasePath) {
  return createTemplateNavigation(basePath, beautyAestheticContent.navigation);
}

export function getShopSpecialtyNavigation(basePath = shopSpecialtyDefaultBasePath) {
  return createTemplateNavigation(basePath, shopSpecialtyContent.navigation);
}

export function getBeautyAestheticPage(
  slug: BeautyAestheticPageSlug,
  basePath = beautyAestheticDefaultBasePath
): PageContent<BeautyAestheticPageSlug> {
  return resolveTemplatePage({
    pages: beautyAestheticContent.pages,
    slug,
    basePath,
    locale: beautyAestheticContent.locale.defaultLocale,
    templateLabel: "aesthetic clinic"
  });
}

export function getShopSpecialtyPage(
  slug: ShopSpecialtyPageSlug,
  basePath = shopSpecialtyDefaultBasePath
): PageContent<ShopSpecialtyPageSlug> {
  return resolveTemplatePage({
    pages: shopSpecialtyContent.pages,
    slug,
    basePath,
    locale: shopSpecialtyContent.locale.defaultLocale,
    templateLabel: "specialty shop"
  });
}
