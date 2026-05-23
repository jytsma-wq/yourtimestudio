import type { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Fraunces, Manrope } from 'next/font/google';
import { launchLocales, type Locale } from '@/lib/i18n/config';
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
import { siteConfig } from '@/lib/site-config';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: 'variable',
  axes: ['opsz', 'SOFT'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Yourtimestudio',
  description:
    'Founder-led websites for Batumi hotels, clinics, and beauty businesses that need direct bookings and qualified inquiries.',
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
    images: [
      {
        url: '/og-default.png',
        width: 1344,
        height: 768,
        alt: 'Yourtimestudio - direct-booking and appointment-focused websites in Batumi',
      },
    ],
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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal focus:text-background focus:rounded-md focus:text-sm focus:font-semibold"
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
          <Toaster />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
