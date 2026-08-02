"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { defaultLocale, launchLocales, type Locale } from "@/lib/i18n/config";
import { Link } from "@/lib/i18n/navigation";
import type { TemplateShowcaseEntry } from "@/lib/templates/catalog";

type CatalogEntry = TemplateShowcaseEntry & {
  categoryLabel: string;
  localizedPositioning: string;
  localizedSignature: string;
};

type CategoryOption = {
  slug: string;
  label: string;
};

type TemplateCatalogProps = {
  entries: CatalogEntry[];
  categories: CategoryOption[];
  labels: {
    all: string;
    filter: string;
    showing: string;
    pageCount: string;
    details: string;
    preview: string;
    internalDemo: string;
  };
};

function getLaunchLocale(value: string): Locale {
  return launchLocales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function TemplateCatalog({ entries, categories, labels }: TemplateCatalogProps) {
  const locale = getLaunchLocale(useLocale());
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleEntries = useMemo(
    () =>
      activeCategory === "all"
        ? entries
        : entries.filter((entry) => entry.category === activeCategory),
    [activeCategory, entries]
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold text-muted-foreground">{labels.filter}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.filter}>
            <Button
              type="button"
              size="sm"
              variant={activeCategory === "all" ? "default" : "outline"}
              aria-pressed={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            >
              {labels.all}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.slug}
                type="button"
                size="sm"
                variant={activeCategory === category.slug ? "default" : "outline"}
                aria-pressed={activeCategory === category.slug}
                onClick={() => setActiveCategory(category.slug)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {labels.showing.replace("{count}", String(visibleEntries.length))}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleEntries.map((entry) => (
          <article
            key={entry.id}
            className="group flex min-h-full flex-col overflow-hidden border border-border bg-card"
          >
            <Link
              href={`/templates/${entry.id}`}
              className="relative block aspect-[16/10] overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              aria-label={`${labels.details}: ${entry.brandName}`}
              data-analytics-event="template_card_click"
              data-analytics-section="template_catalog"
              data-analytics-item={entry.id}
            >
              <Image
                src={entry.previewImage}
                alt={entry.previewAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
              />
              <span className="absolute left-4 top-4 border border-white/30 bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {labels.internalDemo}
              </span>
            </Link>

            <div
              className="h-1"
              style={{ backgroundColor: entry.accent }}
              aria-hidden="true"
            />

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {entry.categoryLabel}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {entry.brandName}
                  </h2>
                </div>
                <span className="shrink-0 border border-border px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {entry.id.split("-")[1]}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {entry.localizedPositioning}
              </p>
              <p className="mt-4 border-l-2 border-border pl-3 text-sm font-medium leading-6 text-foreground">
                {entry.localizedSignature}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                <span className="text-xs font-semibold text-muted-foreground">
                  {labels.pageCount.replace("{count}", String(entry.pages.length))}
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={`${entry.previewHref}?locale=${locale}`}
                      data-analytics-event="template_preview_click"
                      data-analytics-section="template_catalog"
                      data-analytics-item={entry.id}
                    >
                      {labels.preview}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <Link
                      href={`/templates/${entry.id}`}
                      data-analytics-event="template_details_click"
                      data-analytics-section="template_catalog"
                      data-analytics-item={entry.id}
                    >
                      {labels.details}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
