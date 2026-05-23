import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
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
    title: 'Privacy Policy — Yourtimestudio',
    description:
      'Learn how Yourtimestudio collects, uses, and protects your personal data. Our privacy policy covers data collection, cookies, third-party services, and your rights.',
    path: '/privacy',
    locale: locale as Locale,
    noIndex: true,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('legalPage.privacy');
  const tFooter = await getTranslations('footer');

  const breadcrumbItems = [
    { label: tFooter('privacy'), href: '/privacy' },
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
                {t('data_collection_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('data_collection_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('cookies_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('cookies_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('third_party_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('third_party_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('data_rights_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('data_rights_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('data_security_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('data_security_body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contact_heading')}
              </h2>
              <p className="whitespace-pre-line">{t('contact_body')}</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
