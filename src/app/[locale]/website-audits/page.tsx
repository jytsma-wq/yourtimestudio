import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import {
  Eye,
  Gauge,
  MapPin,
  LayoutGrid,
  Accessibility,
  MousePointerClick,
  Send,
  Search,
  FileText,
  Building2,
  Stethoscope,
  Sparkles,
  ArrowDown,
  Plus,
} from 'lucide-react';
import { AuditRequestForm } from '@/components/shared/AuditRequestForm';
import { Button } from '@/components/ui/button';

const rubricItems = [
  { key: 'brand', icon: Eye },
  { key: 'speed', icon: Gauge },
  { key: 'seo', icon: MapPin },
  { key: 'content', icon: LayoutGrid },
  { key: 'accessibility', icon: Accessibility },
  { key: 'conversion', icon: MousePointerClick },
] as const;

const sampleFindings = [
  { key: 'hospitality', icon: Building2, color: 'navy' },
  { key: 'medical', icon: Stethoscope, color: 'stone' },
  { key: 'beauty', icon: Sparkles, color: 'rose' },
] as const;

const howItWorksSteps = [
  { icon: Send },
  { icon: Search },
  { icon: FileText },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auditPage.hero' });

  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    path: '/website-audits',
    locale: locale as Locale,
    ogImage: '/og-audits.png',
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

  return (
    <>
      <Section className="pb-14 pt-6 md:pb-20 md:pt-8">
        <Breadcrumbs
          items={[
            { label: tNav('audits'), href: '/website-audits' },
          ]}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <p className="editorial-kicker text-navy">
              {t('hero.eyebrow')}
            </p>
            <h1 className="editorial-display mt-4 max-w-[13ch] text-4xl font-semibold md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-muted-foreground md:text-xl">
              {t('hero.subtitle')}
            </p>
            <Button asChild size="lg" className="mt-8 rounded-none bg-foreground text-background hover:bg-navy">
              <a
                href="#audit-form"
                data-analytics-event="audit_page_form_jump_click"
                data-analytics-section="audit_hero"
              >
                {t('form.heading')}
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <aside className="border border-border bg-card" aria-label={t('rubric.heading')}>
            <div className="border-b border-border px-5 py-4 md:px-6">
              <p className="text-sm font-semibold text-foreground">{t('rubric.heading')}</p>
            </div>
            <ul className="grid grid-cols-2">
              {rubricItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.key}
                    className={`flex min-h-20 items-center gap-3 border-border px-4 py-4 md:px-5 ${
                      index % 2 === 0 ? 'border-r' : ''
                    } ${index < 4 ? 'border-b' : ''}`}
                  >
                    <Icon className="size-4 shrink-0 text-brand-serene-coral-darken" aria-hidden="true" />
                    <span className="text-sm font-medium leading-snug text-foreground">
                      {t(`rubric.items.${item.key}.name`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="bl-sector-reveal mb-10 grid gap-4 md:mb-14 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <h2 className="editorial-display text-3xl font-semibold md:text-4xl">
            {t('rubric.heading')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-[1.75]">
            {t('rubric.subtitle')}
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {rubricItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <details
                key={item.key}
                className="bl-sector-tile group bg-card open:bg-background"
              >
                <summary className="flex min-h-36 cursor-pointer list-none flex-col justify-between gap-6 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:min-h-44 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold text-brand-serene-coral-darken">0{index + 1}</span>
                    <span className="flex size-9 items-center justify-center border border-border bg-muted">
                      <Icon className="size-4 text-navy" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-lg font-semibold leading-snug text-foreground">
                      {t(`rubric.items.${item.key}.name`)}
                    </span>
                    <Plus className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                  </span>
                </summary>
                <ul className="space-y-2 border-t border-border px-5 py-5 md:px-6">
                  {[0, 1, 2].map((i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-sm leading-[1.75] flex items-start gap-2"
                    >
                      <span className="mt-1.5 shrink-0 text-brand-serene-coral">•</span>
                      <span>{t(`rubric.items.${item.key}.points.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="bl-sector-reveal mb-10 text-left md:mb-14">
          <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
            {t('howItWorks.heading')}
          </h2>
        </div>

        <div className="bl-sector-flow mx-auto grid max-w-6xl gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bl-sector-tile relative min-h-64 bg-card p-6 text-left md:min-h-72 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-semibold text-foreground/12">0{index + 1}</span>
                  <div className="flex size-11 items-center justify-center border border-border bg-background">
                    <Icon className="size-5 text-brand-serene-coral-darken" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-10 text-sm font-semibold text-brand-serene-coral-darken">
                  {t('howItWorks.step_label')} {index + 1}
                </div>
                <h3 className="mt-2 text-lg font-semibold">
                  {t(`howItWorks.steps.${index}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
                  {t(`howItWorks.steps.${index}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section variant="subtle">
        <div className="bl-sector-reveal mb-10 text-left md:mb-14">
          <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
            {t('sampleFindings.heading')}
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3">
          {sampleFindings.map((finding, index) => {
            const Icon = finding.icon;

            return (
              <div
                key={finding.key}
                className="bl-sector-tile flex min-h-56 flex-col justify-between gap-8 bg-card p-6 md:p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center border border-border bg-muted text-navy">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    0{index + 1} /{' '}
                    {t(`sampleFindings.items.${finding.key}.sector`)}
                  </span>
                </div>
                <p className="text-lg font-medium leading-[1.55] text-foreground">
                  {t(`sampleFindings.items.${finding.key}.finding`)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Audit Request Form */}
      <Section id="audit-form">
        <div className="max-w-2xl mx-auto">
          <div className="text-left mb-10">
            <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
              {t('form.heading')}
            </h2>
            <p className="text-muted-foreground text-lg leading-[1.75]">
              {t('form.subtitle')}
            </p>
          </div>
          <AuditRequestForm />
        </div>
      </Section>
    </>
  );
}
