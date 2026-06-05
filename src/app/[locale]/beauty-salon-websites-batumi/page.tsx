import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SectorPageTemplate } from '@/components/shared/SectorPageTemplate';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Beauty Salon Website Development in Batumi',
    description:
      'Booking-led websites for Batumi salons, medspas, and beauty studios with service menus, appointment flows, pricing clarity, and galleries.',
    path: '/beauty-salon-websites-batumi',
    locale: locale as Locale,
    ogImage: pageOgImages.beauty,
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
