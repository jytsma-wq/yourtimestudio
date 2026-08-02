import { MetadataRoute } from 'next';
import { launchLocales, defaultLocale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';
import { templateShowcaseEntries } from '@/lib/templates/catalog';
import { examples } from '@/content/examples';

const siteUrl = siteConfig.url;

const pages = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/hospitality-web-design-batumi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/medical-websites-batumi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/beauty-salon-websites-batumi', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/website-audits', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/photography', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/insights', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/work', priority: 0.7, changeFrequency: 'monthly' as const },
  ...examples.map((example) => ({
    path: `/work/${example.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  })),
  { path: '/templates', priority: 0.8, changeFrequency: 'monthly' as const },
  ...templateShowcaseEntries.map((template) => ({
    path: `/templates/${template.id}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
];

function localeUrl(locale: string, path: string): string {
  return locale === defaultLocale
    ? `${siteUrl}${path}`
    : `${siteUrl}/${locale}${path}`;
}

function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      launchLocales.map((locale) => [locale, localeUrl(locale, path)]),
    ),
    'x-default': localeUrl(defaultLocale, path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return launchLocales.flatMap((locale) =>
    pages.map((page) => ({
      url: localeUrl(locale, page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: languageAlternates(page.path),
      },
    }))
  );
}
