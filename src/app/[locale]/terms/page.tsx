import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/site-config';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Terms of Service — Batumi Lighthouse',
    description:
      'Read the terms of service for Batumi Lighthouse. Covers our web design and development services, payment terms, intellectual property, liability limitations, and more.',
    path: '/terms',
    locale: locale as Locale,
    noIndex: true,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legalPage.terms');
  const tFooter = await getTranslations('footer');

  const breadcrumbItems = [
    { label: tFooter('terms'), href: '/terms' },
  ];

  return (
    <>
      <Section>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-sm mb-10">
            {t('last_updated')}
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>{t('intro')}</p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('services_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('services_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('payment_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('payment_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('ip_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('ip_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('liability_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('liability_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('termination_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('termination_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('governing_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('governing_body')}</p>
            </div>

            <div className="rounded-md border border-hairline bg-paper p-6 text-ink-dark">
              <h2 className="text-2xl font-semibold text-ink-dark mb-4">
                {t('contact_heading')}
              </h2>
              <p className="whitespace-pre-line text-ink-dark/80">{t('contact_body')}</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-4 inline-flex font-semibold text-sea-dark transition-colors hover:text-oxide"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
