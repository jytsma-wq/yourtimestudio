import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

const INTERNAL_LOCALE_REWRITE_HEADER = 'x-internal-locale-rewrite';

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rewrites are processed by the proxy a second time in the standalone
  // server. Let that internal request reach the localized route instead of
  // sending the default locale back to `/` and creating a redirect loop.
  if (request.headers.get(INTERNAL_LOCALE_REWRITE_HEADER) === defaultLocale) {
    return NextResponse.next();
  }

  const isUnlocalizedTemplatePreview =
    pathname === '/preview' ||
    pathname.startsWith('/preview/') ||
    pathname === '/template-sites' ||
    pathname.startsWith('/template-sites/');

  if (isUnlocalizedTemplatePreview) {
    return NextResponse.next();
  }

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(INTERNAL_LOCALE_REWRITE_HEADER, defaultLocale);

    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    response.cookies.set('NEXT_LOCALE', defaultLocale, {
      path: '/',
      sameSite: 'lax',
    });

    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(ka|ru|tr|en)/:path*',
    '/((?!api|_next|preview|template-sites|.*\\..*).*)',
  ],
};
