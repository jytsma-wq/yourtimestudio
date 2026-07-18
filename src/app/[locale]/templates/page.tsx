import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/shared/Section";
import { TemplateCatalog } from "@/components/templates/TemplateCatalog";
import type { Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { showcaseCategories, templateShowcaseEntries } from "@/lib/templates/catalog";

type TemplatesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TemplatesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templatesCatalog" });

  return generatePageMetadata({
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    path: "/templates",
    locale: locale as Locale
  });
}

export default async function TemplatesPage({ params }: TemplatesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("templatesCatalog");
  const nav = await getTranslations("nav");

  const entries = templateShowcaseEntries.map((entry) => ({
    ...entry,
    categoryLabel: t(`categories.${entry.category}`),
    localizedPositioning: t(`items.${entry.id}.positioning`),
    localizedSignature: t(`items.${entry.id}.signature`),
    previewAlt: `${entry.brandName} - ${t("imageAlt", {
      category: t(`categories.${entry.category}`)
    })}`
  }));

  return (
    <>
      <Section className="pb-10 md:pb-14">
        <Breadcrumbs items={[{ label: nav("templates"), href: "/templates" }]} />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold text-brand-serene-coral-darken">
              {t("eyebrow")}
            </p>
            <h1 className="editorial-display text-4xl leading-tight md:text-6xl">
              {t("heading")}
            </h1>
          </div>
          <div className="max-w-2xl lg:pb-2">
            <p className="text-lg leading-8 text-muted-foreground">{t("intro")}</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{t("disclosure")}</p>
          </div>
        </div>
      </Section>

      <Section variant="subtle" border>
        <TemplateCatalog
          entries={entries}
          categories={showcaseCategories.map((category) => ({
            slug: category.slug,
            label: t(`categories.${category.slug}`)
          }))}
          labels={{
            all: t("all"),
            filter: t("filter"),
            showing: t.raw("showing") as string,
            pageCount: t.raw("pageCount") as string,
            details: t("details"),
            preview: t("preview"),
            internalDemo: t("internalDemo")
          }}
        />
      </Section>
    </>
  );
}
