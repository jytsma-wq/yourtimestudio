import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale, launchLocales } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';
import { organizationSchema, webSiteSchema, localBusinessSchema } from '@/lib/seo/structured-data';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectorCardsSection } from '@/components/sections/SectorCardsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ExampleBuildsSection } from '@/components/sections/ExampleBuildsSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTABandSection } from '@/components/sections/CTABandSection';

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
    ogImage: pageOgImages.home,
  });
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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

      {/* 01 — Hero: dark, immersive, developer-system mockup */}
      <HeroSection locale={locale as Locale} />

      {/* 02 — Sector systems: three website systems */}
      <div id="sectors" data-section-name="Solutions">
        <SectorCardsSection />
      </div>

      {/* 03 — Work: concept system previews */}
      <div id="case-studies" data-section-name="Systems">
        <CaseStudiesSection />
      </div>

      {/* 04 — Example builds: finished internal systems */}
      <div id="example-builds" data-section-name="Example builds">
        <ExampleBuildsSection />
      </div>

      {/* 05 — Process: technical build pipeline */}
      <div id="process" data-section-name="Process">
        <ProcessSection />
      </div>

      {/* 06 — Founder: technical authority */}
      <div id="about" data-section-name="About">
        <FounderSection locale={locale as Locale} />
      </div>

      {/* 07 — Pricing: calm scope comparison */}
      <div id="pricing" data-section-name="Pricing">
        <PricingSection />
      </div>

      {/* 08 — CTA: strong dark closing */}
      <CTABandSection />
    </>
  );
}
