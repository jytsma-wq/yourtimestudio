import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { BookOpen, DollarSign } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thankYouPage' });

  return generatePageMetadata({
    title: t('heading'),
    description: t('body'),
    path: '/thank-you',
    locale: locale as Locale,
    noIndex: true,
  });
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('thankYouPage');

  const breadcrumbItems = [
    { label: t('heading') },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <Section>
        <div className="max-w-2xl mx-auto text-center">
          {/* Success indicator */}
          <div className="size-16 flex items-center justify-center bg-brand-serene-coral/10 border border-border mx-auto mb-8">
            <svg
              className="size-8 text-brand-serene-coral-darken"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            {t('body')}
          </p>

          {/* Resource links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 px-5 flex items-center gap-3 justify-start rounded-none"
            >
              <Link href="/insights">
                <div className="size-10 flex items-center justify-center border border-border bg-brand-serene-coral/10 shrink-0">
                  <BookOpen className="size-4 text-brand-serene-coral-darken" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{t('browse_insights')}</p>
                  <p className="text-muted-foreground text-xs">{t('insights_description')}</p>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto py-4 px-5 flex items-center gap-3 justify-start rounded-none"
            >
              <Link href="/pricing">
                <div className="size-10 flex items-center justify-center border border-border bg-brand-sage-green-darken/10 shrink-0">
                  <DollarSign className="size-4 text-brand-sage-green-darken" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{t('see_pricing')}</p>
                  <p className="text-muted-foreground text-xs">{t('pricing_description')}</p>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
