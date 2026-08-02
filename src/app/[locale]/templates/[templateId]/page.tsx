import type { Metadata } from "next";
import Image from "next/image";
import { Check, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { defaultLocale, launchLocales, type Locale } from "@/lib/i18n/config";
import { Link } from "@/lib/i18n/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import {
  getTemplateShowcaseEntry,
  templateShowcaseEntries
} from "@/lib/templates/catalog";

type TemplateDetailPageProps = {
  params: Promise<{ locale: string; templateId: string }>;
};

function getLaunchLocale(value: string): Locale {
  return launchLocales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function generateStaticParams() {
  return templateShowcaseEntries.map((entry) => ({ templateId: entry.id }));
}

export async function generateMetadata({ params }: TemplateDetailPageProps): Promise<Metadata> {
  const { locale, templateId } = await params;
  const entry = getTemplateShowcaseEntry(templateId);
  if (!entry) return {};
  const t = await getTranslations({ locale, namespace: "templatesCatalog" });

  return generatePageMetadata({
    title: `${entry.brandName} - ${t(`categories.${entry.category}`)}`,
    description: t(`items.${entry.id}.positioning`),
    path: `/templates/${entry.id}`,
    locale: locale as Locale,
    ogImage: entry.previewImage
  });
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { locale, templateId } = await params;
  setRequestLocale(locale);
  const entry = getTemplateShowcaseEntry(templateId);
  if (!entry) notFound();

  const t = await getTranslations("templatesCatalog");
  const nav = await getTranslations("nav");
  const categoryLabel = t(`categories.${entry.category}`);
  const previewAlt = `${entry.brandName} - ${t("imageAlt", { category: categoryLabel })}`;
  const positioning = t(`items.${entry.id}.positioning`);
  const signature = t(`items.${entry.id}.signature`);
  const included = ["responsive", "navigation", "forms", "seo"] as const;
  const previewHref = `${entry.previewHref}?locale=${getLaunchLocale(locale)}`;

  return (
    <>
      <Section className="pb-10 md:pb-14">
        <Breadcrumbs
          items={[
            { label: nav("templates"), href: "/templates" },
            { label: entry.brandName, href: `/templates/${entry.id}` }
          ]}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold text-brand-serene-coral-darken">
              {categoryLabel} · {t("internalDemo")}
            </p>
            <h1 className="editorial-display text-5xl leading-tight md:text-7xl">
              {entry.brandName}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{positioning}</p>
            <p className="mt-6 border-l-2 border-brand-serene-coral pl-4 text-base font-semibold leading-7 text-foreground">
              {signature}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a
                  href={previewHref}
                  data-analytics-event="template_preview_click"
                  data-analytics-section="template_detail"
                  data-analytics-item={entry.id}
                >
                  {t("openPreview")}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={`/contact?template=${entry.id}`}
                  data-analytics-event="template_enquiry_click"
                  data-analytics-section="template_detail"
                  data-analytics-item={entry.id}
                >
                  {t("requestTemplate")}
                </Link>
              </Button>
            </div>
          </div>

          <a
            href={previewHref}
            className="group relative block aspect-[16/10] overflow-hidden border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`${t("openPreview")}: ${entry.brandName}`}
          >
            <Image
              src={entry.previewImage}
              alt={previewAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
            />
          </a>
        </div>
      </Section>

      <Section variant="subtle" border>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold text-brand-serene-coral-darken">
              {t("whatIsIncluded")}
            </p>
            <h2 className="editorial-display mt-3 text-3xl md:text-4xl">
              {t("completeWebsite")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {t("pageCount", { count: entry.pages.length })}. {t("customizationNote")}
            </p>
          </div>

          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex gap-3 bg-card p-5 text-sm leading-6 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-serene-coral-darken" aria-hidden="true" />
                <span>{t(`included.${item}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section variant="dark">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl">
            <h2 className="editorial-display text-3xl text-white md:text-4xl">{t("ctaHeading")}</h2>
            <p className="mt-3 leading-7 text-white/70">{t("ctaBody")}</p>
          </div>
          <Button asChild size="lg" className="bg-brand-serene-coral text-brand-charcoal hover:bg-white">
            <Link href={`/contact?template=${entry.id}`}>{t("requestTemplate")}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
