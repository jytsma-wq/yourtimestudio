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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-sea-bright"
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
                        className="text-muted-foreground transition-colors hover:text-sea-bright"
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
