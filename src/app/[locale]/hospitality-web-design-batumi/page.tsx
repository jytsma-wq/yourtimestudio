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
    title: 'Hospitality Web Design Batumi — Direct Booking Websites for Hotels',
    description:
      'Websites that fill rooms, not OTA commission sheets. Direct booking integration, multilingual guest paths, and speed optimization for Batumi hotels, guesthouses, and aparthotels.',
    path: '/hospitality-web-design-batumi',
    locale: locale as Locale,
    ogImage: '/og-hospitality.png',
  });
}

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export default async function HospitalityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SectorPageTemplate sectorKey="hospitality" locale={locale as Locale} />;
}
