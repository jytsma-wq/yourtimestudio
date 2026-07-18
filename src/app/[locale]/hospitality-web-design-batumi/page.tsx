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
  const t = await getTranslations({ locale, namespace: 'sectorPages.hospitality.hero' });
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
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
