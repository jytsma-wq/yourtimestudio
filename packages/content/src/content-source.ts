export type ContentSourceKind = "static" | "sanity";

export type ContentSourceContext = {
  templateId?: string;
  locale?: string;
  basePath?: string;
  slug?: string;
};

export type ContentSourceConfig = {
  contentSource: ContentSourceKind;
  warning?: string;
};

export type ContentLocaleConfig = {
  defaultLocale: string;
  fallbackLocale: string;
  enabledLocales: readonly string[];
  directions: Record<string, "ltr" | "rtl">;
};

export type SiteConfigContent = {
  contentSource: ContentSourceKind;
  defaultLocale: string;
  fallbackLocale: string;
  enabledLocales: readonly string[];
  directions: Record<string, "ltr" | "rtl">;
};

export type BusinessInfoContent = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: readonly string[];
  emergencyPhone?: string;
};

export type NavigationContent = {
  label: string;
  slug: string;
  href: string;
};

export type SEOContent = {
  title: string;
  description: string;
  canonicalPath: string;
  locale?: string;
  languages?: Record<string, string>;
  noIndex?: boolean;
};

export type PageContent = {
  slug: string;
  title: string;
  navLabel: string;
  intro: string;
  seo: SEOContent;
};

export type GalleryContent = {
  title: string;
  alt: string;
  tone?: string;
  src?: string;
};

export type TestimonialContent = {
  quote: string;
  author: string;
  context: string;
  rating?: number;
};

export type FAQContent = {
  question: string;
  answer: string;
  category?: string;
};

export type LocationContent = {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  directionsUrl?: string;
  notes?: readonly string[];
};

export type OpeningHoursContent = {
  label: string;
  lines: readonly string[];
};

export type FormFieldContent = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "time" | "number" | "textarea" | "select";
  required: boolean;
  options?: readonly string[];
  helperText?: string;
};

export type FormConfigContent = {
  id: string;
  title: string;
  description: string;
  submitLabel?: string;
  successMessage: string;
  fields: readonly FormFieldContent[];
};

export type RoomContent = {
  name: string;
  slug: string;
  summary: string;
  sleeps?: string;
  size?: string;
  priceFrom?: string;
  amenities?: readonly string[];
};

export type TreatmentContent = {
  name: string;
  slug: string;
  summary?: string;
  duration?: string;
  priceFrom?: string;
  description?: string;
  expectations?: string;
};

export type PractitionerContent = {
  name: string;
  credentials?: string;
  role?: string;
  focus?: string;
  specialties?: readonly string[];
};

export type ServiceContent = {
  name: string;
  slug: string;
  summary: string;
  duration?: string;
  priceFrom?: string;
};

export type MenuItemContent = {
  name: string;
  description: string;
  price: string;
  dietary?: readonly string[];
  allergens?: readonly string[];
};

export type MenuSectionContent = {
  name: string;
  description: string;
  items: readonly MenuItemContent[];
};

export type ProductContent = {
  name: string;
  slug: string;
  description: string;
  price: string;
  images?: readonly GalleryContent[];
};

export type CollectionContent = {
  name: string;
  slug: string;
  description: string;
};

export type EventContent = {
  title: string;
  date?: string;
  time?: string;
  description: string;
};

export type ContentSource = {
  kind: ContentSourceKind;
  getSiteConfig(context?: ContentSourceContext): Promise<SiteConfigContent>;
  getBusinessInfo(context?: ContentSourceContext): Promise<BusinessInfoContent | null>;
  getNavigation(context?: ContentSourceContext): Promise<readonly NavigationContent[]>;
  getSEO(context?: ContentSourceContext): Promise<SEOContent | null>;
  getPages(context?: ContentSourceContext): Promise<readonly PageContent[]>;
  getPage(context?: ContentSourceContext): Promise<PageContent | null>;
  getGallery(context?: ContentSourceContext): Promise<readonly GalleryContent[]>;
  getTestimonials(context?: ContentSourceContext): Promise<readonly TestimonialContent[]>;
  getFAQ(context?: ContentSourceContext): Promise<readonly FAQContent[]>;
  getLocations(context?: ContentSourceContext): Promise<readonly LocationContent[]>;
  getOpeningHours(context?: ContentSourceContext): Promise<readonly OpeningHoursContent[]>;
  getFormsConfig(context?: ContentSourceContext): Promise<readonly FormConfigContent[]>;
  getRooms(context?: ContentSourceContext): Promise<readonly RoomContent[]>;
  getRoomDetail(context?: ContentSourceContext): Promise<RoomContent | null>;
  getHotelOffers(context?: ContentSourceContext): Promise<readonly EventContent[]>;
  getTreatments(context?: ContentSourceContext): Promise<readonly TreatmentContent[]>;
  getTreatmentDetail(context?: ContentSourceContext): Promise<TreatmentContent | null>;
  getPractitioners(context?: ContentSourceContext): Promise<readonly PractitionerContent[]>;
  getServices(context?: ContentSourceContext): Promise<readonly ServiceContent[]>;
  getServiceDetail(context?: ContentSourceContext): Promise<ServiceContent | null>;
  getMenuSections(context?: ContentSourceContext): Promise<readonly MenuSectionContent[]>;
  getMenuItems(context?: ContentSourceContext): Promise<readonly MenuItemContent[]>;
  getProducts(context?: ContentSourceContext): Promise<readonly ProductContent[]>;
  getProductDetail(context?: ContentSourceContext): Promise<ProductContent | null>;
  getCollections(context?: ContentSourceContext): Promise<readonly CollectionContent[]>;
  getEvents(context?: ContentSourceContext): Promise<readonly EventContent[]>;
};

export const defaultContentSourceConfig = {
  contentSource: "static"
} as const satisfies ContentSourceConfig;

export function resolveContentSourceKind(
  value?: string | null,
  warn?: (message: string) => void
): ContentSourceConfig {
  if (!value || value === "static") {
    return defaultContentSourceConfig;
  }

  if (value === "sanity") {
    return { contentSource: "sanity" };
  }

  const warning = `Unsupported contentSource "${value}" requested; using static content.`;
  warn?.(warning);
  return {
    contentSource: "static",
    warning
  };
}
