import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const headers = new Headers(request.headers);
    headers.set('X-NEXT-INTL-LOCALE', defaultLocale);

    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;

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
  matcher: ['/', '/(ka|ru|tr|en)/:path*', '/((?!api|_next|.*\\..*).*)'],
};
