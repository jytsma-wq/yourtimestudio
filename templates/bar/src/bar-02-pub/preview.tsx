import {
  barPubContent,
  barPubDefaultBasePath,
  barPubPageSlugs,
  createBarPubPath,
  getBarPubNavigation,
  getBarPubPage,
  type BarPubPageSlug
} from "@website-template-factory/content";

import { BarTemplate } from "../shared/bar-template";
import { createSeoResolver, createSlugGuard } from "../shared/route-utils";

export const barPubTemplateConfig = {
  id: "bar-02-pub",
  defaultBasePath: barPubDefaultBasePath,
  defaultHeroImage: "/templates/bar-02-pub/hero-pub.png",
  pageSlugs: barPubPageSlugs,
  locale: barPubContent.locale
} as const;

export type BarPubTemplateProps = {
  slug: BarPubPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export const isBarPubSlug = createSlugGuard<BarPubPageSlug>(barPubPageSlugs);
export const getBarPubSeo = createSeoResolver(getBarPubPage, barPubTemplateConfig.defaultBasePath);

export function BarPubTemplate({
  slug,
  basePath = barPubTemplateConfig.defaultBasePath,
  heroImageSrc = barPubTemplateConfig.defaultHeroImage
}: BarPubTemplateProps) {
  const page = getBarPubPage(slug, basePath);

  return (
    <BarTemplate
      content={barPubContent}
      variant="pub"
      slug={slug}
      title={page.title}
      intro={page.intro}
      basePath={basePath}
      heroImageSrc={heroImageSrc}
      createPath={(path, nextSlug) => createBarPubPath(path, nextSlug as BarPubPageSlug)}
    />
  );
}

export { getBarPubNavigation };
