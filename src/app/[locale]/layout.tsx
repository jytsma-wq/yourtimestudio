import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Noto_Sans_Georgian } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { defaultLocale, launchLocales, type Locale } from '@/lib/i18n/config';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { CookieConsent } from '@/components/shared/CookieConsent';
import { AnnouncementBar } from '@/components/shared/AnnouncementBar';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppFAB } from '@/components/shared/WhatsAppFAB';
import { BackToTop } from '@/components/shared/BackToTop';
import { SectionNav } from '@/components/shared/SectionNav';
import { ContactStrip } from '@/components/shared/ContactStrip';
import { PageTransition } from '@/components/shared/PageTransition';
import { AnalyticsEvents } from '@/components/shared/AnalyticsEvents';
import { siteConfig } from '@/lib/site-config';

const displayFont = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Noto_Sans_Georgian({
  subsets: ['latin', 'cyrillic-ext', 'georgian'],
  weight: 'variable',
  variable: '--font-body',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = launchLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: 'metadata' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('description'),
    icons: {
      icon: [
        { url: siteConfig.assets.mark, type: 'image/png', sizes: '512x512' },
        { url: siteConfig.assets.faviconSvg, type: 'image/svg+xml' },
        { url: siteConfig.assets.faviconPng, type: 'image/png', sizes: '1024x1024' },
      ],
      apple: [
        { url: siteConfig.assets.mark, sizes: '512x512', type: 'image/png' },
      ],
    },
    manifest: siteConfig.assets.manifest,
    openGraph: {
      images: [
        {
          url: siteConfig.assets.ogDefault,
          width: 1344,
          height: 768,
          alt: t('title'),
        },
      ],
    },
  };
}

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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased bg-background text-foreground`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-serene-coral focus:text-brand-charcoal focus:rounded-md focus:text-sm focus:font-semibold"
          >
            {ui('skipToContent')}
          </a>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter locale={locale as Locale} />
          </div>
          <WhatsAppFAB />
          <BackToTop />
          <SectionNav />
          <ContactStrip />
          <AnalyticsEvents />
          <Toaster />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
