import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SectorPageTemplate } from '@/components/shared/SectorPageTemplate';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Beauty Salon Websites Batumi — Booking-Led Websites for Salons',
    description:
      'Websites that fill your appointment book, not your Instagram DMs. Service menu systems, online booking, pricing visibility, and promo management for Batumi salons, medspas, and studios.',
    path: '/beauty-salon-websites-batumi',
    locale: locale as Locale,
    ogImage: '/og-beauty.png',
  });
}

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export default async function BeautyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SectorPageTemplate sectorKey="beauty" locale={locale as Locale} />;
}
