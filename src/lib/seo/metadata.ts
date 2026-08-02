import type { Metadata } from 'next';
import { launchLocales, defaultLocale, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

const siteUrl = siteConfig.url;

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
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
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
  const ogImageUrl = absoluteUrl(ogImage || siteConfig.assets.ogDefault);
  const ogImagePath = new URL(ogImageUrl).pathname;
  const isStandardOgImage = /^\/og-[^/]+$/.test(ogImagePath);
  const openGraphImage = {
    url: ogImageUrl,
    alt: title,
    ...(isStandardOgImage ? { width: 1344, height: 768 } : {}),
  };

  // Build hreflang alternates for all launch locales
  const languages: Record<string, string> = {};
  for (const loc of launchLocales) {
    languages[loc] = localeUrl(loc, path);
  }
  languages['x-default'] = localeUrl(defaultLocale, path);

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
      images: [openGraphImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
