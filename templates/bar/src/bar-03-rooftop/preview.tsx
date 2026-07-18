import {
  barRooftopContent,
  barRooftopDefaultBasePath,
  barRooftopPageSlugs,
  createBarRooftopPath,
  getBarRooftopNavigation,
  getBarRooftopPage,
  type BarRooftopPageSlug
} from "@website-template-factory/content";

import { BarTemplate } from "../shared/bar-template";
import { createSeoResolver, createSlugGuard } from "../shared/route-utils";

export const barRooftopTemplateConfig = {
  id: "bar-03-rooftop",
  defaultBasePath: barRooftopDefaultBasePath,
  defaultHeroImage: "/templates/bar-03-rooftop/hero-rooftop.png",
  pageSlugs: barRooftopPageSlugs,
  locale: barRooftopContent.locale
} as const;

export type BarRooftopTemplateProps = {
  slug: BarRooftopPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export const isBarRooftopSlug = createSlugGuard<BarRooftopPageSlug>(barRooftopPageSlugs);
export const getBarRooftopSeo = createSeoResolver(
  getBarRooftopPage,
  barRooftopTemplateConfig.defaultBasePath
);

export function BarRooftopTemplate({
  slug,
  basePath = barRooftopTemplateConfig.defaultBasePath,
  heroImageSrc = barRooftopTemplateConfig.defaultHeroImage
}: BarRooftopTemplateProps) {
  const page = getBarRooftopPage(slug, basePath);

  return (
    <BarTemplate
      content={barRooftopContent}
      variant="rooftop"
      slug={slug}
      title={page.title}
      intro={page.intro}
      basePath={basePath}
      heroImageSrc={heroImageSrc}
      createPath={(path, nextSlug) => createBarRooftopPath(path, nextSlug as BarRooftopPageSlug)}
    />
  );
}

export { getBarRooftopNavigation };
