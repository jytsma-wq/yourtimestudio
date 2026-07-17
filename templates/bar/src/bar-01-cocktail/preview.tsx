import {
  barCocktailContent,
  barCocktailDefaultBasePath,
  barCocktailPageSlugs,
  createBarCocktailPath,
  getBarCocktailNavigation,
  getBarCocktailPage,
  type BarCocktailPageSlug
} from "@website-template-factory/content";

import { BarTemplate } from "../shared/bar-template";
import { createSeoResolver, createSlugGuard } from "../shared/route-utils";

export const barCocktailTemplateConfig = {
  id: "bar-01-cocktail",
  defaultBasePath: barCocktailDefaultBasePath,
  defaultHeroImage: "/templates/bar-01-cocktail/hero-cocktail.png",
  pageSlugs: barCocktailPageSlugs,
  locale: barCocktailContent.locale
} as const;

export type BarCocktailTemplateProps = {
  slug: BarCocktailPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export const isBarCocktailSlug = createSlugGuard<BarCocktailPageSlug>(barCocktailPageSlugs);
export const getBarCocktailSeo = createSeoResolver(
  getBarCocktailPage,
  barCocktailTemplateConfig.defaultBasePath
);

export function BarCocktailTemplate({
  slug,
  basePath = barCocktailTemplateConfig.defaultBasePath,
  heroImageSrc = barCocktailTemplateConfig.defaultHeroImage
}: BarCocktailTemplateProps) {
  const page = getBarCocktailPage(slug, basePath);

  return (
    <BarTemplate
      content={barCocktailContent}
      variant="cocktail"
      slug={slug}
      title={page.title}
      intro={page.intro}
      basePath={basePath}
      heroImageSrc={heroImageSrc}
      createPath={(path, nextSlug) => createBarCocktailPath(path, nextSlug as BarCocktailPageSlug)}
    />
  );
}

export { getBarCocktailNavigation };
