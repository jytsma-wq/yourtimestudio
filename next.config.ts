import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: [
    '@website-template-factory/content',
    '@website-template-factory/tokens',
    '@website-template-factory/ui',
    '@website-template-factory/template-hotel',
    '@website-template-factory/template-dentist',
    '@website-template-factory/template-beauty-salon',
    '@website-template-factory/template-restaurant',
    '@website-template-factory/template-bar',
    '@website-template-factory/template-shop',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    const enforcedContentSecurityPolicy = [
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
    ].join('; ');
    const reportOnlyContentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
      "connect-src 'self' https://plausible.io",
    ].join('; ');
    const securityHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=()',
      },
      {
        key: 'Content-Security-Policy',
        value: enforcedContentSecurityPolicy,
      },
      {
        key: 'Content-Security-Policy-Report-Only',
        value: reportOnlyContentSecurityPolicy,
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains',
      },
    ];

    const templatePreviewHeaders = securityHeaders.map((header) => {
      if (
        header.key === 'Content-Security-Policy' ||
        header.key === 'Content-Security-Policy-Report-Only'
      ) {
        return {
          ...header,
          value: header.value.replace("frame-ancestors 'none'", "frame-ancestors 'self'"),
        };
      }

      if (header.key === 'X-Frame-Options') {
        return { ...header, value: 'SAMEORIGIN' };
      }

      return header;
    });

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/template-sites/:path*',
        headers: templatePreviewHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
