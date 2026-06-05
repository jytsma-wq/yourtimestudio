import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, DollarSign } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Thank You — Yourtimestudio',
    description: 'Thank you for your inquiry. We will get back to you within one business day.',
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
    { label: 'Thank You' },
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
          <div className="size-16 flex items-center justify-center bg-oxide/10 border border-border mx-auto mb-8">
            <svg
              className="size-8 text-sea-bright"
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
              className="h-auto py-4 px-5 flex items-center gap-3 justify-start rounded-md"
            >
              <Link href="/website-audits">
                <div className="size-10 flex items-center justify-center border border-border bg-oxide/10 shrink-0">
                  <ClipboardCheck className="size-4 text-sea-bright" />
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
              className="h-auto py-4 px-5 flex items-center gap-3 justify-start rounded-md"
            >
              <Link href="/pricing">
                <div className="size-10 flex items-center justify-center border border-border bg-sea/10 shrink-0">
                  <DollarSign className="size-4 text-sea-bright" />
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
