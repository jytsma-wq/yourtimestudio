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
    title: 'Clinic & Medical Tourism Websites in Batumi',
    description:
      'Trust-first websites for Batumi clinics, dental practices, and medical tourism providers with doctor profiles, clear services, and multilingual appointment paths.',
    path: '/medical-websites-batumi',
    locale: locale as Locale,
    ogImage: pageOgImages.medical,
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
