export const templateFamily = {
  category: "shop",
  plannedTemplates: 3,
  status: "planned"
} as const;

export {
  ShopFashionTemplate,
  getShopFashionSeo,
  isShopFashionSlug,
  shopFashionTemplateConfig,
  type ShopFashionTemplateProps
} from "./shop-01-fashion/preview";

export {
  ShopLifestyleTemplate,
  getShopLifestyleSeo,
  isShopLifestyleSlug,
  shopLifestyleTemplateConfig,
  type ShopLifestyleTemplateProps
} from "./shop-02-lifestyle/preview";

export {
  ShopSpecialtyTemplate,
  getShopSpecialtySeo,
  isShopSpecialtySlug,
  shopSpecialtyTemplateConfig,
  type ShopSpecialtyTemplateProps
} from "./shop-03-specialty/preview";
