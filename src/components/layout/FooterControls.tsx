'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/lib/i18n/navigation';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';
import { getLocaleHref, getLocaleHrefWithContext, persistLocale } from '@/lib/i18n/locale-switch';
import { OPEN_COOKIE_SETTINGS_EVENT } from '@/lib/cookie-consent';

const linkClass =
  'inline-flex min-h-10 items-center py-1 text-sm text-brand-cream/68 transition-colors hover:text-brand-serene-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-serene-coral';

export function CookieSettingsButton() {
  const t = useTranslations('footer');

  return (
    <button
      type="button"
      className={linkClass}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      {t('cookieSettings')}
    </button>
  );
}

export function FooterLocaleLinks({ locale: activeLocale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
      {launchLocales.map((locale) => (
        <a
          key={locale}
          href={getLocaleHref(pathname, locale)}
          hrefLang={locale}
          aria-current={activeLocale === locale ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault();
            persistLocale(locale);
            window.location.assign(
              getLocaleHrefWithContext(pathname, locale, window.location.search, window.location.hash),
            );
          }}
          className={`min-h-10 py-3 transition-colors hover:text-brand-serene-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-serene-coral ${
            activeLocale === locale
              ? 'font-semibold text-brand-serene-coral'
              : 'text-brand-cream/58'
          }`}
        >
          {localeLabels[locale]}
        </a>
      ))}
    </div>
  );
}
