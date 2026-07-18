import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
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
    const headers = new Headers(request.headers);
    headers.set('X-NEXT-INTL-LOCALE', defaultLocale);

    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;

    const response = NextResponse.rewrite(url, {
      request: {
        headers,
      },
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
