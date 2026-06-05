import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { geistSans, geistMono } from '@/fonts';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { CookieConsent } from '@/components/shared/CookieConsent';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppFAB } from '@/components/shared/WhatsAppFAB';
import { BackToTop } from '@/components/shared/BackToTop';
import { siteConfig } from '@/lib/site-config';
import { pageOgImages } from '@/lib/seo/metadata';
import '@/app/globals.css';



export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Yourtimestudio — Website Development Studio in Batumi',
  description:
    'Founder-led website development for hotels, clinics, and beauty businesses in Batumi. Booking systems, local SEO, multilingual UX, and conversion-focused design.',
  icons: {
    icon: [
      { url: '/brand/yourtimestudio-mark.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '1024x1024' },
    ],
    apple: [
      { url: '/brand/yourtimestudio-mark.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Yourtimestudio — Website Development Studio in Batumi',
    description:
      'Founder-led website development for hotels, clinics, and beauty businesses in Batumi.',
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: pageOgImages.home,
        width: 1344,
        height: 768,
        alt: 'Yourtimestudio — Website Development Studio in Batumi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yourtimestudio — Website Development Studio in Batumi',
    description:
      'Founder-led website development for hotels, clinics, and beauty businesses in Batumi.',
    images: [pageOgImages.home],
  },
};

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!launchLocales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const ui = await getTranslations('ui');

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-canvas text-ink`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-oxide focus:text-white focus:rounded focus:text-sm focus:font-semibold"
          >
            {ui('skipToContent')}
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter locale={locale as Locale} />
          </div>
          <WhatsAppFAB />
          <BackToTop />
          <Toaster />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
