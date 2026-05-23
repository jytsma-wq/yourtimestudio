import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale, launchLocales } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema, webSiteSchema, localBusinessSchema } from '@/lib/seo/structured-data';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectorCardsSection } from '@/components/sections/SectorCardsSection';
import { AuditSection } from '@/components/sections/AuditSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { ResultsBand } from '@/components/sections/ResultsBand';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { BlogTeaser } from '@/components/sections/BlogTeaser';
import { CTABandSection } from '@/components/sections/CTABandSection';
import { Section } from '@/components/shared/Section';
import { TrustedByStrip } from '@/components/sections/TrustedByStrip';

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    path: '',
    locale: locale as Locale,
  });
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('faq');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema(),
            webSiteSchema(),
            localBusinessSchema(),
          ]),
        }}
      />

      <HeroSection locale={locale as Locale} />

      <TrustedByStrip />

      <div id="sectors" data-section-name="Solutions">
        <SectorCardsSection locale={locale as Locale} number="02" />
      </div>

      <div id="audit" data-section-name="Audit">
        <AuditSection locale={locale as Locale} number="03" />
      </div>

      <div id="process" data-section-name="Process">
        <ProcessSection locale={locale as Locale} number="04" />
      </div>

      <div id="case-studies" data-section-name="Demo Briefs">
        <CaseStudiesSection number="05" />
      </div>

      <div id="about" data-section-name="About">
        <FounderSection locale={locale as Locale} number="06" />
      </div>

      <ResultsBand locale={locale as Locale} number="07" />

      <div id="pricing" data-section-name="Pricing">
        <PricingSection locale={locale as Locale} number="08" />
      </div>

      <div id="faq" data-section-name="FAQ">
        <Section variant="subtle" number="09">
          <div className="text-center mb-12 md:mb-16">
            <p className="section-label">{t('sectionLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              {t('heading')}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQSection locale={locale} />
          </div>
        </Section>
      </div>

      <div id="insights" data-section-name="Insights">
        <BlogTeaser locale={locale as Locale} />
      </div>

      <CTABandSection locale={locale as Locale} />
    </>
  );
}
