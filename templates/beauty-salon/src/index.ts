export const templateFamily = {
  category: "beauty-salon",
  plannedTemplates: 3,
  status: "planned"
} as const;

export {
  BeautySalonTemplate,
  beautySalonTemplateConfig,
  getBeautySalonSeo,
  isBeautySalonSlug,
  type BeautySalonTemplateProps
} from "./beauty-01-salon/preview";

export {
  BeautySpaTemplate,
  beautySpaTemplateConfig,
  getBeautySpaSeo,
  isBeautySpaSlug,
  type BeautySpaTemplateProps
} from "./beauty-02-spa/preview";

export {
  BeautyAestheticTemplate,
  beautyAestheticTemplateConfig,
  getBeautyAestheticSeo,
  isBeautyAestheticSlug,
  type BeautyAestheticTemplateProps
} from "./beauty-03-aesthetic-clinic/preview";
