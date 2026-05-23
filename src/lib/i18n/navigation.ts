/**
 * Locale-aware navigation utilities for next-intl.
 *
 * Using these instead of raw `next/navigation` ensures that
 * locale-switching updates the NEXT_LOCALE cookie so the
 * middleware does not redirect users back to a previous locale.
 */
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
