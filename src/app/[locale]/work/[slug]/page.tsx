import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { type Locale, launchLocales } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { ExamplePreviewPanel } from '@/components/examples/ExamplePreviewPanel';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { examples } from '@/content/examples';
import { getExampleUiLabels } from '@/lib/examples/labels';
import { getLocalizedExampleBySlug } from '@/lib/examples/localized';

export function generateStaticParams() {
  return launchLocales.flatMap((locale) =>
    examples.map((example) => ({
      locale,
      slug: example.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const example = await getLocalizedExampleBySlug(slug, locale as Locale);

  if (!example) {
    return {};
  }

  return generatePageMetadata({
    title: example.title,
    description: example.shortDescription,
    path: `/work/${example.slug}`,
    locale: locale as Locale,
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const example = await getLocalizedExampleBySlug(slug, locale as Locale);

  if (!example) {
    notFound();
  }

  const tNav = await getTranslations('nav');
  const labels = await getExampleUiLabels();

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: tNav('work'), href: '/work' },
            { label: example.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground">
                {labels.typeLabels[example.type]}
              </span>
              <span className="border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {labels.statusLabels[example.status]}
              </span>
              <span className="border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {labels.sectorLabels[example.sector]}
              </span>
            </div>

            <h1 className="editorial-display text-4xl text-foreground md:text-5xl">
              {example.title}
            </h1>
            <p className="mt-5 text-lg leading-[1.75] text-muted-foreground">
              {example.shortDescription}
            </p>

            <div className="mt-8 border-l border-border pl-4">
              <p className="text-sm font-semibold text-foreground">
                {labels.fields.disclosure}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {example.disclaimer}
              </p>
            </div>
          </div>

          <ExamplePreviewPanel
            example={example}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[16/10] border border-border bg-muted"
          />
        </div>
      </Section>

      <Section variant="subtle">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="border border-border bg-card p-5 md:p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {labels.fields.businessType}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {example.businessType}
            </p>
          </article>

          <article className="border border-border bg-card p-5 md:p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {labels.fields.demonstratedProblem}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {example.demonstratedProblem}
            </p>
          </article>

          <article className="border border-border bg-card p-5 md:p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {labels.fields.pagesModules}
            </h2>
            <ul className="mt-4 space-y-3">
              {example.modules.map((module) => (
                <li key={module} className="border-l border-border pl-3 text-sm leading-relaxed text-muted-foreground">
                  {module}
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-border bg-card p-5 md:p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {labels.fields.clientLearning}
            </h2>
            <ul className="mt-4 space-y-3">
              {example.clientLearning.map((item) => (
                <li key={item} className="border-l border-border pl-3 text-sm leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link
              href="/work"
              data-analytics-event="work_detail_back_to_work_click"
              data-analytics-section="work_detail"
              data-analytics-item={example.slug}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {labels.home.cta}
            </Link>
          </Button>
          <Button asChild>
            <Link
              href="/contact"
              data-analytics-event="work_example_contact_cta_click"
              data-analytics-section="work_detail"
              data-analytics-item={example.slug}
            >
              <MessageSquare className="size-4" aria-hidden="true" />
              {labels.buttons.discussSimilarWebsite}
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
