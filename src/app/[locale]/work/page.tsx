import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ExamplePreviewPanel } from '@/components/examples/ExamplePreviewPanel';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { getExampleUiLabels } from '@/lib/examples/labels';
import { getLocalizedExamples } from '@/lib/examples/localized';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'examplesUi.page' });

  return generatePageMetadata({
    title: t('heading'),
    description: t('subtitle'),
    path: '/work',
    locale: locale as Locale,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('nav');
  const labels = await getExampleUiLabels();
  const localizedExamples = await getLocalizedExamples(locale as Locale);

  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: tNav('work'), href: '/work' }]} />

        <div className="mb-10 max-w-3xl md:mb-12">
          <h1 className="editorial-display mb-4 text-4xl md:text-5xl">
            {labels.page.heading}
          </h1>
          <p className="text-lg leading-[1.75] text-muted-foreground md:text-xl">
            {labels.page.subtitle}
          </p>
        </div>

        <div className="max-w-3xl border-l border-border pl-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {labels.page.note}
          </p>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {localizedExamples.map((example) => (
            <article
              key={example.id}
              className="flex min-h-full flex-col overflow-hidden border border-border bg-card"
            >
              <ExamplePreviewPanel
                example={example}
                sizes="(max-width: 1024px) 100vw, 50vw"
                screenshotPlaceholder={labels.preview.screenshotComingSoon}
                className="aspect-[16/10] border-b border-border"
              />

              <div className="flex flex-1 flex-col gap-6 p-5 md:p-6">
                <div className="flex flex-wrap gap-2">
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

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {example.title}
                  </h2>
                  <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
                    {example.shortDescription}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {labels.fields.businessType}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {example.businessType}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {labels.fields.demonstratedProblem}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {example.demonstratedProblem}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {labels.fields.pagesModules}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {example.modules.slice(0, 5).map((module) => (
                        <li key={module} className="text-sm leading-relaxed text-muted-foreground">
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {labels.fields.clientLearning}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {example.clientLearning.slice(0, 3).map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">
                    {labels.fields.disclosure}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {example.disclaimer}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button asChild variant="outline">
                    <Link
                      href={`/work/${example.slug}`}
                      data-analytics-event="work_example_card_click"
                      data-analytics-section="work_page"
                      data-analytics-item={example.slug}
                    >
                      {labels.buttons.viewExample}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link
                      href="/contact"
                      data-analytics-event="work_example_contact_cta_click"
                      data-analytics-section="work_page"
                      data-analytics-item={example.slug}
                    >
                      <MessageSquare className="size-4" aria-hidden="true" />
                      {labels.buttons.discussSimilarWebsite}
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
