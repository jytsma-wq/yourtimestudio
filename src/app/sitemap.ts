import { MetadataRoute } from 'next';
import { launchLocales, defaultLocale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';

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
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return launchLocales.flatMap((locale) =>
    pages.map((page) => ({
      url:
        locale === defaultLocale
          ? `${siteUrl}${page.path}`
          : `${siteUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );
}
