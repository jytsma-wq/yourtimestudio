import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale, launchLocales } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema, webSiteSchema, localBusinessSchema } from '@/lib/seo/structured-data';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectorCardsSection } from '@/components/sections/SectorCardsSection';
import { ExampleBuildsSection } from '@/components/sections/ExampleBuildsSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { CTABandSection } from '@/components/sections/CTABandSection';
import { PhotographyShowcaseSection } from '@/components/sections/PhotographyShowcaseSection';

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

  return (
    <>
      <Script
        id="homepage-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema(),
            webSiteSchema(),
            localBusinessSchema(),
          ]),
        }}
      />

      <HeroSection locale={locale as Locale} />

      <div id="sectors" data-section-name="Services">
        <SectorCardsSection locale={locale as Locale} number="02" />
      </div>

      <div id="photography" data-section-name="Photography">
        <PhotographyShowcaseSection number="03" />
      </div>

      <div id="examples" data-section-name="Examples">
        <ExampleBuildsSection number="04" />
      </div>

      <div id="about" data-section-name="About">
        <FounderSection locale={locale as Locale} number="05" />
      </div>

      <div id="pricing" data-section-name="Pricing">
        <PricingSection locale={locale as Locale} number="06" />
      </div>

      <CTABandSection locale={locale as Locale} />
    </>
  );
}
