import type { Metadata } from 'next';
import { launchLocales, defaultLocale, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

const siteUrl = siteConfig.url;

export const pageOgImages = {
  home: '/og-default.png',
  hospitality: '/og-hospitality.png',
  medical: '/og-medical.png',
  beauty: '/og-beauty.png',
  audits: '/og-audits.png',
  pricing: '/og-default.png',
  about: '/og-default.png',
  work: '/og-default.png',
} as const;

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  ogImage?: string;
  noIndex?: boolean;
}

/** Build the full URL for a given locale + path */
function localeUrl(locale: Locale, path: string): string {
  return locale === defaultLocale
    ? `${siteUrl}${path}`
    : `${siteUrl}/${locale}${path}`;
}

function absoluteUrl(pathOrUrl: string): string {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${siteUrl}${normalizedPath}`;
  }
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
  noIndex = false,
}: MetadataOptions): Metadata {
  const url = localeUrl(locale, path);
  const ogImageUrl = absoluteUrl(ogImage || pageOgImages.home);

  // Build hreflang alternates for all launch locales
  const languages: Record<string, string> = {};
  for (const loc of launchLocales) {
    languages[loc] = localeUrl(loc, path);
  }

  // Map locale to OG locale format
  const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    ka: 'ka_GE',
    ru: 'ru_RU',
    tr: 'tr_TR',
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: ogLocaleMap[locale] || 'en_US',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1344, height: 768, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: ogImageUrl, alt: title }],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
