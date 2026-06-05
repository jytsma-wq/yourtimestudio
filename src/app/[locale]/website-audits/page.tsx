import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  Accessibility,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  FileText,
  Gauge,
  Globe2,
  LayoutGrid,
  MapPin,
  MousePointerClick,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';
import { faqSchema, serviceSchema } from '@/lib/seo/structured-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { AuditRequestForm } from '@/components/shared/AuditRequestForm';

const diagnosticItems: { key: string; icon: LucideIcon }[] = [
  { key: 'brand', icon: Eye },
  { key: 'mobile', icon: LayoutGrid },
  { key: 'booking', icon: MousePointerClick },
  { key: 'seo', icon: MapPin },
  { key: 'performance', icon: Gauge },
  { key: 'trust', icon: ShieldCheck },
  { key: 'multilingual', icon: Globe2 },
  { key: 'accessibility', icon: Accessibility },
];

const reportRows = [0, 1, 2] as const;

const sectorExamples: { key: string; icon: LucideIcon }[] = [
  { key: 'hotel', icon: Building2 },
  { key: 'clinic', icon: Stethoscope },
  { key: 'beauty', icon: Sparkles },
];

const processSteps: { key: string; icon: LucideIcon }[] = [
  { key: 'request', icon: Send },
  { key: 'review', icon: Search },
  { key: 'report', icon: FileText },
];

const reportPriorityStyles = [
  'border-oxide/35 bg-oxide/10 text-ink-dark',
  'border-warning/40 bg-warning/15 text-ink-dark',
  'border-sea/35 bg-sea/10 text-ink-dark',
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Manual Website Audits for Booking, SEO & Trust',
    description:
      'A manual review of booking paths, trust signals, local SEO, speed, multilingual structure, and conversion UX for service business websites.',
    path: '/website-audits',
    locale: locale as Locale,
    ogImage: pageOgImages.audits,
  });
}

export default async function WebsiteAuditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('auditPage');
  const tNav = await getTranslations('nav');
  const resolvedLocale = locale as Locale;
  const faqItems = [0, 1, 2].map((item) => ({
    question: t(`faq.items.${item}.question`),
    answer: t(`faq.items.${item}.answer`),
  }));
  const structuredData = [
    serviceSchema({
      name: t('hero.title'),
      description: t('hero.subtitle'),
      path: '/website-audits',
      locale: resolvedLocale,
      serviceType: t('hero.eyebrow'),
    }),
    faqSchema(faqItems),
  ];

  return (
    <div data-locale={locale} className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="px-[var(--container-padding)] py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[var(--hero-max-width)]">
          <Breadcrumbs
            items={[
              { label: tNav('audits'), href: '/website-audits' },
            ]}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.85fr)] lg:items-start lg:gap-16">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('hero.eyebrow')}</p>
              <h1 className="max-w-4xl text-display-lg text-ink">
                {t('hero.title')}
              </h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-[1.75] text-muted">
                {t('hero.subtitle')}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white transition-colors hover:bg-oxide-hover"
                >
                  <a href="#audit-request">
                    {t('hero.cta')}
                    <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
                  </a>
                </Button>
                <a
                  href="#report-preview"
                  className="inline-flex h-12 items-center rounded-md border border-hairline px-6 text-base font-medium text-ink transition-colors hover:border-sea/40 hover:bg-surface"
                >
                  {t('hero.secondary_cta')}
                </a>
              </div>
            </div>

            <aside
              aria-label={t('hero.panel_label')}
              className="rounded-md border border-hairline bg-surface"
            >
              <div className="border-b border-hairline p-5">
                <p className="mono-label text-sea-bright">{t('hero.panel_kicker')}</p>
                <h2 className="mt-3 text-heading-md text-ink">{t('hero.panel_title')}</h2>
              </div>
              <div className="divide-y divide-hairline">
                {diagnosticItems.slice(0, 4).map(({ key, icon: Icon }) => (
                  <div key={key} className="flex items-center gap-3 p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded bg-sea/15">
                      <Icon className="size-4 text-sea-bright" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t(`framework.items.${key}.title`)}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{t(`framework.items.${key}.summary`)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-hairline bg-surface-elevated p-4 text-body-sm leading-relaxed text-muted">
                {t('hero.panel_note')}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('framework.eyebrow')}</p>
              <h2 className="text-heading-lg text-ink">{t('framework.heading')}</h2>
            </div>
            <p className="max-w-2xl text-body-lg leading-[1.75] text-muted">
              {t('framework.subtitle')}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
            {diagnosticItems.map(({ key, icon: Icon }, index) => (
              <article key={key} className="bg-surface p-5 transition-colors hover:bg-surface-elevated/50">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex size-10 items-center justify-center rounded bg-sea/15">
                    <Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-ink">
                  {t(`framework.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-body-sm leading-[1.7] text-muted">
                  {t(`framework.items.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="report-preview"
        className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24"
      >
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('report.eyebrow')}</p>
              <h2 className="text-heading-lg text-ink-dark">{t('report.heading')}</h2>
            </div>
            <p className="max-w-2xl text-body-lg leading-[1.75] text-muted-dark">
              {t('report.subtitle')}
            </p>
          </div>

          <div className="overflow-hidden rounded-md border border-hairline-light bg-paper-soft">
            <div className="flex flex-col gap-4 border-b border-hairline-light bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mono-label text-muted-dark">{t('report.interface_label')}</p>
                <h3 className="mt-2 text-xl font-semibold text-ink-dark">{t('report.interface_title')}</h3>
              </div>
              <span className="w-fit rounded-md border border-hairline-light px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-dark">
                {t('report.example_label')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-hairline-light">
                    {['area', 'issue', 'impact', 'priority', 'fix'].map((column) => (
                      <th key={column} className="px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-dark">
                        {t(`report.columns.${column}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline-light">
                  {reportRows.map((row) => (
                    <tr key={row} className="align-top">
                      <td className="w-[16%] px-4 py-4 text-sm font-semibold text-ink-dark">
                        {t(`report.rows.${row}.area`)}
                      </td>
                      <td className="w-[23%] px-4 py-4 text-sm leading-relaxed text-muted-dark">
                        {t(`report.rows.${row}.issue`)}
                      </td>
                      <td className="w-[22%] px-4 py-4 text-sm leading-relaxed text-muted-dark">
                        {t(`report.rows.${row}.impact`)}
                      </td>
                      <td className="w-[12%] px-4 py-4">
                        <span className={`rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${reportPriorityStyles[row]}`}>
                          {t(`report.rows.${row}.priority`)}
                        </span>
                      </td>
                      <td className="w-[27%] px-4 py-4 text-sm leading-relaxed text-ink-dark">
                        {t(`report.rows.${row}.fix`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-12 max-w-3xl">
            <p className="mono-label mb-4 text-sea-bright">{t('sectors.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{t('sectors.heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted">{t('sectors.subtitle')}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {sectorExamples.map(({ key, icon: Icon }) => (
              <article key={key} className="rounded-md border border-hairline bg-surface p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded bg-sea/15">
                    <Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{t(`sectors.items.${key}.title`)}</h3>
                </div>
                <p className="text-body-sm leading-[1.75] text-muted">
                  {t(`sectors.items.${key}.description`)}
                </p>
                <ul className="mt-5 space-y-3">
                  {[0, 1, 2].map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                      <span>{t(`sectors.items.${key}.checks.${item}`)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="audit-request"
        className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24"
      >
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('form.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink-dark">{t('form.heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted-dark">
              {t('form.subtitle')}
            </p>

            <div className="mt-8 rounded-md border border-hairline-light bg-paper-soft">
              {processSteps.map(({ key, icon: Icon }, index) => (
                <div key={key} className="flex gap-4 border-b border-hairline-light p-4 last:border-b-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded bg-sea/10">
                    <Icon className="size-4 text-sea-bright" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-dark">
                      {t('process.step')} {index + 1}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-ink-dark">{t(`process.items.${key}.title`)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-dark">{t(`process.items.${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AuditRequestForm />
        </div>
      </section>

      <section className="bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 max-w-2xl">
            <p className="mono-label mb-4 text-sea-bright">{t('faq.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{t('faq.heading')}</h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
            {faqItems.map((item) => (
              <article key={item.question} className="bg-surface p-6">
                <h3 className="text-base font-semibold text-ink">{item.question}</h3>
                <p className="mt-4 text-body-sm leading-[1.75] text-muted">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
