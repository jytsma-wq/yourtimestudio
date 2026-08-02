'use client';

import { usePathname } from '@/lib/i18n/navigation';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';
import { getLocaleHref, persistLocale } from '@/lib/i18n/locale-switch';
import { useCurrentUrlSuffix } from '@/lib/i18n/use-current-url-suffix';

interface FooterLocaleLinksProps {
  locale: Locale;
}

export function FooterLocaleLinks({ locale }: FooterLocaleLinksProps) {
  const pathname = usePathname();
  const { search, hash } = useCurrentUrlSuffix();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
      {launchLocales.map((targetLocale) => (
        <a
          key={targetLocale}
          href={getLocaleHref(pathname, targetLocale, search, hash)}
          hrefLang={targetLocale}
          onClick={() => persistLocale(targetLocale)}
          aria-current={locale === targetLocale ? 'page' : undefined}
          className={`min-h-10 py-3 transition-colors hover:text-brand-serene-coral ${
            locale === targetLocale
              ? 'font-semibold text-brand-serene-coral'
              : 'text-brand-cream/58'
          }`}
        >
          {localeLabels[targetLocale]}
        </a>
      ))}
    </div>
  );
}
