import { defaultLocale, type Locale } from './config';

function normalizeSuffix(value: string, prefix: '?' | '#'): string {
  if (!value) return '';
  return value.startsWith(prefix) ? value : `${prefix}${value}`;
}

export function getLocaleHref(
  pathname: string,
  locale: Locale,
  search = '',
  hash = ''
): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const localizedPath =
    locale === defaultLocale
      ? normalizedPath
      : `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;

  return `${localizedPath}${normalizeSuffix(search, '?')}${normalizeSuffix(hash, '#')}`;
}

export function getLocaleHrefWithContext(
  pathname: string,
  locale: Locale,
  search = '',
  hash = '',
): string {
  const query = search ? (search.startsWith('?') ? search : `?${search}`) : '';
  const fragment = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  return `${getLocaleHref(pathname, locale)}${query}${fragment}`;
}

export function persistLocale(locale: Locale): void {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}
