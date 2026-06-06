import type { Metadata } from 'next';
import { launchLocales, defaultLocale, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

const siteUrl = siteConfig.url;

const hreflangByLocale = {
  en: 'en-US',
  ka: 'ka-GE',
  ru: 'ru-RU',
  tr: 'tr-TR',
} satisfies Record<Locale, string>;

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
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  return locale === defaultLocale
    ? `${siteUrl}${normalizedPath}`
    : `${siteUrl}/${locale}${normalizedPath}`;
}

function alternateLanguages(path: string): Record<string, string> {
  return Object.fromEntries(
    launchLocales.map((locale) => [
      hreflangByLocale[locale],
      localeUrl(locale, path),
    ])
  );
}

export function localizedAlternates(
  path: string,
  locale: Locale = defaultLocale
): NonNullable<Metadata['alternates']> {
  return {
    canonical: localeUrl(locale, path),
    languages: alternateLanguages(path),
  };
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
    alternates: localizedAlternates(path, locale),
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
