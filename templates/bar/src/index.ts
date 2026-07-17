export const templateFamily = {
  category: "bar",
  plannedTemplates: 3,
  status: "complete"
} as const;

export {
  BarCocktailTemplate,
  barCocktailTemplateConfig,
  getBarCocktailNavigation,
  getBarCocktailSeo,
  isBarCocktailSlug,
  type BarCocktailTemplateProps
} from "./bar-01-cocktail/preview";
export {
  BarPubTemplate,
  barPubTemplateConfig,
  getBarPubNavigation,
  getBarPubSeo,
  isBarPubSlug,
  type BarPubTemplateProps
} from "./bar-02-pub/preview";
export {
  BarRooftopTemplate,
  barRooftopTemplateConfig,
  getBarRooftopNavigation,
  getBarRooftopSeo,
  isBarRooftopSlug,
  type BarRooftopTemplateProps
} from "./bar-03-rooftop/preview";
