import { defaultLocale, type Locale } from './config';

export function getLocaleHref(pathname: string, locale: Locale): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (locale === defaultLocale) return normalizedPath;
  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export function persistLocale(locale: Locale): void {
  document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
