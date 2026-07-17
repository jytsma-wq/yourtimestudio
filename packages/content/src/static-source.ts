import type {
  BusinessInfoContent,
  CollectionContent,
  ContentLocaleConfig,
  ContentSource,
  ContentSourceContext,
  EventContent,
  FAQContent,
  FormConfigContent,
  FormFieldContent,
  GalleryContent,
  LocationContent,
  MenuItemContent,
  MenuSectionContent,
  NavigationContent,
  OpeningHoursContent,
  PageContent,
  PractitionerContent,
  ProductContent,
  RoomContent,
  SEOContent,
  ServiceContent,
  TestimonialContent,
  TreatmentContent
} from "./content-source";

type StaticNavigationItem = {
  label: string;
  slug: string;
};

type StaticFormContent = {
  title: string;
  description: string;
  submitLabel?: string;
  successMessage: string;
  fields: readonly FormFieldContent[];
};

type StaticTemplateSeed = {
  id: string;
  locale: ContentLocaleConfig;
  business: BusinessInfoContent;
  navigation: readonly StaticNavigationItem[];
  pages: readonly PageContent[];
  gallery?: readonly GalleryContent[];
  testimonials?: readonly TestimonialContent[];
  faq?: readonly FAQContent[];
  reservation?: StaticFormContent;
  booking?: StaticFormContent;
  appointment?: StaticFormContent;
  newsletter?: StaticFormContent;
  inquiry?: StaticFormContent;
  contact?: StaticFormContent;
  rooms?: readonly RoomContent[];
  treatments?: readonly TreatmentContent[];
  team?: readonly PractitionerContent[];
  services?: readonly ServiceContent[];
  menuSections?: readonly MenuSectionContent[];
  products?: readonly ProductContent[];
  collections?: readonly CollectionContent[];
  events?: readonly EventContent[];
  hotelOffers?: readonly EventContent[];
};

function createHref(basePath: string | undefined, slug: string) {
  if (!basePath) {
    return slug;
  }

  return slug ? `${basePath}/${slug}` : basePath;
}

function createDefaultSiteConfig() {
  return {
    contentSource: "static" as const,
    defaultLocale: "en",
    fallbackLocale: "en",
    enabledLocales: ["en"],
    directions: {
      en: "ltr" as const
    }
  };
}

function normalizeForm(id: string, form: StaticFormContent | undefined): FormConfigContent | null {
  if (!form) {
    return null;
  }

  const normalized: FormConfigContent = {
    id,
    title: form.title,
    description: form.description,
    successMessage: form.successMessage,
    fields: form.fields
  };

  if (form.submitLabel) {
    return {
      ...normalized,
      submitLabel: form.submitLabel
    };
  }

  return normalized;
}

function normalizeServices(seed: StaticTemplateSeed | null): readonly ServiceContent[] {
  if (!seed) {
    return [];
  }

  if (seed.services) {
    return seed.services;
  }

  return (seed.treatments ?? []).map((treatment) => {
    const service: ServiceContent = {
      name: treatment.name,
      slug: treatment.slug,
      summary:
        treatment.summary ?? treatment.description ?? treatment.expectations ?? treatment.name
    };

    if (treatment.duration) {
      service.duration = treatment.duration;
    }

    if (treatment.priceFrom) {
      service.priceFrom = treatment.priceFrom;
    }

    return service;
  });
}

function pageSEO(page: PageContent | undefined, locale: string | undefined): SEOContent | null {
  if (!page) {
    return null;
  }

  if (!locale) {
    return page.seo;
  }

  return {
    ...page.seo,
    locale
  };
}

export function createStaticContentSource(templates: readonly StaticTemplateSeed[]): ContentSource {
  const templatesById = new Map(templates.map((template) => [template.id, template]));
  const firstTemplate = templates[0] ?? null;

  function selectTemplate(context?: ContentSourceContext) {
    if (context?.templateId) {
      return templatesById.get(context.templateId) ?? null;
    }

    return firstTemplate;
  }

  function selectPage(context?: ContentSourceContext) {
    const template = selectTemplate(context);
    const slug = context?.slug ?? "";

    return template?.pages.find((page) => page.slug === slug) ?? null;
  }

  return {
    kind: "static",
    async getSiteConfig(context) {
      const template = selectTemplate(context);

      if (!template) {
        return createDefaultSiteConfig();
      }

      return {
        contentSource: "static",
        defaultLocale: template.locale.defaultLocale,
        fallbackLocale: template.locale.fallbackLocale,
        enabledLocales: template.locale.enabledLocales,
        directions: template.locale.directions
      };
    },
    async getBusinessInfo(context) {
      return selectTemplate(context)?.business ?? null;
    },
    async getNavigation(context) {
      const template = selectTemplate(context);

      if (!template) {
        return [];
      }

      return template.navigation.map<NavigationContent>((item) => ({
        label: item.label,
        slug: item.slug,
        href: createHref(context?.basePath, item.slug)
      }));
    },
    async getSEO(context) {
      return pageSEO(selectPage(context) ?? undefined, context?.locale);
    },
    async getPages(context) {
      return selectTemplate(context)?.pages ?? [];
    },
    async getPage(context) {
      return selectPage(context);
    },
    async getGallery(context) {
      return selectTemplate(context)?.gallery ?? [];
    },
    async getTestimonials(context) {
      return selectTemplate(context)?.testimonials ?? [];
    },
    async getFAQ(context) {
      return selectTemplate(context)?.faq ?? [];
    },
    async getLocations(context) {
      const template = selectTemplate(context);

      if (!template) {
        return [];
      }

      const location: LocationContent = {
        name: template.business.name,
        address: template.business.address,
        phone: template.business.phone,
        email: template.business.email,
        notes: template.business.hours
      };

      return [location];
    },
    async getOpeningHours(context) {
      const template = selectTemplate(context);

      if (!template) {
        return [];
      }

      return [
        {
          label: template.business.name,
          lines: template.business.hours
        } satisfies OpeningHoursContent
      ];
    },
    async getFormsConfig(context) {
      return [
        normalizeForm("reservation", selectTemplate(context)?.reservation),
        normalizeForm("booking", selectTemplate(context)?.booking),
        normalizeForm("appointment", selectTemplate(context)?.appointment),
        normalizeForm("newsletter", selectTemplate(context)?.newsletter),
        normalizeForm("inquiry", selectTemplate(context)?.inquiry),
        normalizeForm("contact", selectTemplate(context)?.contact)
      ].filter((form): form is FormConfigContent => form !== null);
    },
    async getRooms(context) {
      return selectTemplate(context)?.rooms ?? [];
    },
    async getRoomDetail(context) {
      const rooms = selectTemplate(context)?.rooms ?? [];
      const slug = context?.slug ?? "";

      return rooms.find((room) => room.slug === slug) ?? null;
    },
    async getHotelOffers(context) {
      return selectTemplate(context)?.hotelOffers ?? [];
    },
    async getTreatments(context) {
      return selectTemplate(context)?.treatments ?? [];
    },
    async getTreatmentDetail(context) {
      const treatments = selectTemplate(context)?.treatments ?? [];
      const slug = context?.slug ?? "";

      return treatments.find((treatment) => treatment.slug === slug) ?? null;
    },
    async getPractitioners(context) {
      return selectTemplate(context)?.team ?? [];
    },
    async getServices(context) {
      return normalizeServices(selectTemplate(context));
    },
    async getServiceDetail(context) {
      const services = normalizeServices(selectTemplate(context));
      const slug = context?.slug ?? "";

      return services.find((service) => service.slug === slug) ?? null;
    },
    async getMenuSections(context) {
      return selectTemplate(context)?.menuSections ?? [];
    },
    async getMenuItems(context) {
      const sections = selectTemplate(context)?.menuSections ?? [];

      return sections.flatMap((section) => section.items) satisfies readonly MenuItemContent[];
    },
    async getProducts(context) {
      return selectTemplate(context)?.products ?? [];
    },
    async getProductDetail(context) {
      const products = selectTemplate(context)?.products ?? [];
      const slug = context?.slug ?? "";

      return products.find((product) => product.slug === slug) ?? null;
    },
    async getCollections(context) {
      return selectTemplate(context)?.collections ?? [];
    },
    async getEvents(context) {
      return selectTemplate(context)?.events ?? [];
    }
  };
}
