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
    title: 'Hotel Website Development in Batumi',
    description:
      'Direct booking websites for Batumi hotels, guesthouses, and aparthotels with fast pages, multilingual guest paths, and clear room enquiry flows.',
    path: '/hospitality-web-design-batumi',
    locale: locale as Locale,
    ogImage: pageOgImages.hospitality,
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
