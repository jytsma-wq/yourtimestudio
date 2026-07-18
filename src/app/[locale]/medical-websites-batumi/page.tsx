import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SectorPageTemplate } from '@/components/shared/SectorPageTemplate';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sectorPages.medical.hero' });
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
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
