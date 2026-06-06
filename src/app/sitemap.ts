import type { MetadataRoute } from 'next';
import { defaultLocale, launchLocales, type Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

const siteUrl = siteConfig.url;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

const hreflangByLocale = {
  en: 'en-US',
  ka: 'ka-GE',
  ru: 'ru-RU',
  tr: 'tr-TR',
} satisfies Record<Locale, string>;

const staticRoutes = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/hospitality-web-design-batumi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/medical-websites-batumi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beauty-salon-websites-batumi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/website-audits', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}>;

function localizedUrl(locale: Locale, path: string): string {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  return locale === defaultLocale
    ? `${siteUrl}${normalizedPath}`
    : `${siteUrl}/${locale}${normalizedPath}`;
}

function alternateLanguages(path: string): Record<string, string> {
  return Object.fromEntries(
    launchLocales.map((locale) => [
      hreflangByLocale[locale],
      localizedUrl(locale, path),
    ])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return launchLocales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: localizedUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: alternateLanguages(route.path),
      },
    }))
  );
}
