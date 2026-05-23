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
    title: 'Medical Websites Batumi — Trust-First Websites for Clinics',
    description:
      'Websites that build patient trust before the first consultation. Doctor profiles, consultation booking, multilingual medical content, and structured data for Batumi clinics and dental practices.',
    path: '/medical-websites-batumi',
    locale: locale as Locale,
    ogImage: '/og-medical.png',
  });
}

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export default async function MedicalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SectorPageTemplate sectorKey="medical" locale={locale as Locale} />;
}
