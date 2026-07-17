import {
  templateRegistry,
  type TemplateCategorySlug,
  type TemplateId,
  type TemplateSummary
} from "@website-template-factory/content";
import {
  barCocktailTemplateConfig,
  barPubTemplateConfig,
  barRooftopTemplateConfig
} from "@website-template-factory/template-bar";
import {
  beautyAestheticTemplateConfig,
  beautySalonTemplateConfig,
  beautySpaTemplateConfig
} from "@website-template-factory/template-beauty-salon";
import {
  dentistClinicalTemplateConfig,
  dentistCosmeticTemplateConfig,
  dentistFamilyTemplateConfig
} from "@website-template-factory/template-dentist";
import {
  hotelBoutiqueTemplateConfig,
  hotelLuxuryTemplateConfig,
  hotelResortTemplateConfig
} from "@website-template-factory/template-hotel";
import {
  restaurantBistroTemplateConfig,
  restaurantFastCasualTemplateConfig,
  restaurantFineDiningTemplateConfig
} from "@website-template-factory/template-restaurant";
import {
  shopFashionTemplateConfig,
  shopLifestyleTemplateConfig,
  shopSpecialtyTemplateConfig
} from "@website-template-factory/template-shop";
import { themePresets } from "@website-template-factory/tokens";

type TemplateRuntimeConfig = {
  id: TemplateId;
  defaultHeroImage: string;
  pageSlugs: readonly string[];
};

const runtimeConfigs = [
  hotelLuxuryTemplateConfig,
  hotelBoutiqueTemplateConfig,
  hotelResortTemplateConfig,
  dentistClinicalTemplateConfig,
  dentistCosmeticTemplateConfig,
  dentistFamilyTemplateConfig,
  beautySalonTemplateConfig,
  beautySpaTemplateConfig,
  beautyAestheticTemplateConfig,
  restaurantFineDiningTemplateConfig,
  restaurantBistroTemplateConfig,
  restaurantFastCasualTemplateConfig,
  barCocktailTemplateConfig,
  barPubTemplateConfig,
  barRooftopTemplateConfig,
  shopFashionTemplateConfig,
  shopLifestyleTemplateConfig,
  shopSpecialtyTemplateConfig
] as const satisfies readonly TemplateRuntimeConfig[];

const editorialDetails = {
  "hotel-01-luxury": {
    brandName: "Aurelian House",
    signatureFeature: "Direct-book stay planner",
    archetype: "Full-bleed hospitality editorial"
  },
  "hotel-02-boutique": {
    brandName: "Marlowe House",
    signatureFeature: "Neighborhood guide",
    archetype: "Local journal and intimate rooms"
  },
  "hotel-03-resort": {
    brandName: "Sundrift Cove",
    signatureFeature: "Resort day planner",
    archetype: "Scenic destination planning"
  },
  "dentist-01-clinical": {
    brandName: "Clearline Dental Studio",
    signatureFeature: "Emergency care pathway",
    archetype: "Calm clinical clarity"
  },
  "dentist-02-premium-cosmetic": {
    brandName: "Vellum Dental Atelier",
    signatureFeature: "Staged treatment journey",
    archetype: "Consultation-led clinical luxury"
  },
  "dentist-03-family": {
    brandName: "Maple & Finch Dental",
    signatureFeature: "First-visit guide",
    archetype: "Parent-first family care"
  },
  "beauty-01-salon": {
    brandName: "Roux & Row Salon",
    signatureFeature: "Stylist and service match",
    archetype: "Fashion-led salon editorial"
  },
  "beauty-02-spa": {
    brandName: "Luma Ritual Spa",
    signatureFeature: "Ritual finder",
    archetype: "Slow tactile wellness"
  },
  "beauty-03-aesthetic-clinic": {
    brandName: "Vellum Aesthetic Clinic",
    signatureFeature: "Consultation planner",
    archetype: "Safety-first clinical beauty"
  },
  "restaurant-01-fine-dining": {
    brandName: "Nocturne Table",
    signatureFeature: "Seasonal tasting path",
    archetype: "Low-lit culinary editorial"
  },
  "restaurant-02-bistro": {
    brandName: "June & Bay Bistro",
    signatureFeature: "Tonight and events board",
    archetype: "Neighborhood dining journal"
  },
  "restaurant-03-fast-casual": {
    brandName: "Counter & Grain",
    signatureFeature: "Order-mode selector",
    archetype: "Fast menu-first utility"
  },
  "bar-01-cocktail": {
    brandName: "Vesper Room",
    signatureFeature: "Seating and private hire",
    archetype: "Dark cocktail atelier"
  },
  "bar-02-pub": {
    brandName: "The Borough Tap",
    signatureFeature: "Live fixtures and events",
    archetype: "Warm social noticeboard"
  },
  "bar-03-rooftop": {
    brandName: "Aster Deck",
    signatureFeature: "Group package planner",
    archetype: "Skyline event-led hospitality"
  },
  "shop-01-fashion": {
    brandName: "Atelier Sable",
    signatureFeature: "Editorial lookbook",
    archetype: "High-fashion collection story"
  },
  "shop-02-lifestyle": {
    brandName: "Field & Hearth",
    signatureFeature: "Occasion-led gift guide",
    archetype: "Warm tactile curation"
  },
  "shop-03-specialty": {
    brandName: "Dial & Bloom Supply",
    signatureFeature: "Product comparison",
    archetype: "Expert specification-led retail"
  }
} as const satisfies Record<
  TemplateId,
  { brandName: string; signatureFeature: string; archetype: string }
>;

const runtimeById = new Map<TemplateId, TemplateRuntimeConfig>(
  runtimeConfigs.map((config) => [config.id, config])
);

function pageLabel(slug: string) {
  if (!slug) return "Home";

  return slug
    .split("/")
    .at(-1)!
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export type TemplateShowcaseEntry = TemplateSummary & {
  brandName: string;
  signatureFeature: string;
  archetype: string;
  previewImage: string;
  previewAlt: string;
  accent: string;
  background: string;
  pages: readonly { slug: string; label: string }[];
};

export const templateShowcaseEntries = templateRegistry.map<TemplateShowcaseEntry>((template) => {
  const runtime = runtimeById.get(template.id);

  if (!runtime) {
    throw new Error(`Missing runtime showcase configuration for ${template.id}`);
  }

  const editorial = editorialDetails[template.id];
  const theme = themePresets[template.id];

  return {
    ...template,
    ...editorial,
    previewHref: `/preview/${template.id}`,
    previewImage: runtime.defaultHeroImage,
    previewAlt: `${editorial.brandName} ${template.category.replace("-", " ")} template preview`,
    accent: theme.colors.accent,
    background: theme.colors.background,
    pages: runtime.pageSlugs.map((slug) => ({ slug, label: pageLabel(slug) }))
  };
});

export function getTemplateShowcaseEntry(id: string) {
  return templateShowcaseEntries.find((template) => template.id === id);
}

export const showcaseCategories: readonly {
  slug: TemplateCategorySlug;
  label: string;
  promise: string;
}[] = [
  { slug: "hotel", label: "Hotels", promise: "Rooms, offers, stays and direct-booking decisions" },
  {
    slug: "dentist",
    label: "Dentists",
    promise: "Treatment clarity, practitioner trust and appointments"
  },
  {
    slug: "beauty-salon",
    label: "Beauty",
    promise: "Services, specialists, rituals and consultation paths"
  },
  {
    slug: "restaurant",
    label: "Restaurants",
    promise: "Menus, occasions, reservations and ordering"
  },
  { slug: "bar", label: "Bars", promise: "Drinks, events, groups and table bookings" },
  {
    slug: "shop",
    label: "Shops",
    promise: "Collections, comparison, products and inquiry-ready carts"
  }
];
