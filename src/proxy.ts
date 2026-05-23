import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(ka|ru|tr|en)/:path*', '/((?!api|_next|.*\\..*).*)'],
};
