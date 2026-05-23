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
} from 'lucide-react';
import { AuditRequestForm } from '@/components/shared/AuditRequestForm';

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
  return generatePageMetadata({
    title: 'Website Audits — Yourtimestudio',
    description:
      'Get a detailed website scorecard covering brand clarity, speed, local SEO, content structure, accessibility, and conversion UX. Free audit for Batumi businesses.',
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
      {/* Breadcrumbs */}
      <Section>
        <Breadcrumbs
          items={[
            { label: tNav('audits'), href: '/website-audits' },
          ]}
        />

        {/* Hero */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="editorial-kicker text-teal mb-3">
            {t('hero.eyebrow')}
          </p>
          <h1 className="editorial-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-[1.75]">
            {t('hero.subtitle')}
          </p>
        </div>
      </Section>

      {/* Scoring Rubric */}
      <Section variant="subtle">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
            {t('rubric.heading')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-[1.75]">
            {t('rubric.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rubricItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="bg-card border border-border rounded-xl p-6 flex flex-col items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Icon className="size-5 text-teal" />
                </div>
                <h3 className="font-semibold text-base">
                  {t(`rubric.items.${item.key}.name`)}
                </h3>
                <ul className="space-y-1.5">
                  {[0, 1, 2].map((i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-sm leading-[1.75] flex items-start gap-2"
                    >
                      <span className="text-teal mt-1.5 shrink-0">•</span>
                      <span>{t(`rubric.items.${item.key}.points.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
            {t('howItWorks.heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="size-5 text-teal" />
                </div>
                <div className="text-teal font-semibold text-sm mb-2">
                  Step {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {t(`howItWorks.steps.${index}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-[1.75]">
                  {t(`howItWorks.steps.${index}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Sample Findings */}
      <Section variant="subtle">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
            {t('sampleFindings.heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sampleFindings.map((finding) => {
            const Icon = finding.icon;
            const colorClass =
              finding.color === 'navy'
                ? 'bg-navy/10 text-navy'
                : finding.color === 'stone'
                  ? 'bg-stone/10 text-stone'
                  : 'bg-rose/10 text-rose';
            const tagBgClass =
              finding.color === 'navy'
                ? 'bg-navy/10 text-navy'
                : finding.color === 'stone'
                  ? 'bg-stone/10 text-stone'
                  : 'bg-rose/10 text-rose';

            return (
              <div
                key={finding.key}
                className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <Icon className="size-4.5" />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${tagBgClass}`}>
                    {t(`sampleFindings.items.${finding.key}.sector`)}
                  </span>
                </div>
                <p className="text-foreground text-sm leading-[1.75]">
                  {t(`sampleFindings.items.${finding.key}.finding`)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Audit Request Form */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
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
