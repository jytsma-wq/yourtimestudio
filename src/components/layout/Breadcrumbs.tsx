'use client';

import { Link } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { Locale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/site-config';
import { serializeJsonLd } from '@/lib/seo/structured-data';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemData[];
}

function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const locale = useLocale() as Locale;
  const ui = useTranslations('ui');
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  // Build JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ui('home'),
        item: `${baseUrl}${localePath(locale, '/')}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href
          ? { item: `${baseUrl}${localePath(locale, item.href)}` }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        id={`breadcrumb-json-ld-${items.map((item) => item.href || 'current').join('-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Breadcrumb className="mb-4" aria-label={ui('breadcrumbNavigation')}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="flex min-h-10 min-w-10 items-center justify-center gap-1 py-1 text-muted-foreground transition-colors hover:text-brand-serene-coral-darken sm:min-w-0 sm:justify-start"
              >
                <Home className="size-3.5" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">{ui('home')}</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={index} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage className="text-foreground">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-10 items-center py-1 text-muted-foreground hover:text-brand-serene-coral-darken transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
