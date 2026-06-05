import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, FileSearch } from 'lucide-react';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insightsPage' });

  return generatePageMetadata({
    title: `${t('heading')} - Batumi Lighthouse`,
    description: t('subtitle'),
    path: '/insights',
    locale: locale as Locale,
    noIndex: true,
  });
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('insightsPage');
  const tNav = await getTranslations('nav');

  return (
    <Section className="min-h-[70vh]">
      <Breadcrumbs
        items={[
          { label: tNav('insights'), href: '/insights' },
        ]}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] lg:items-center lg:gap-16">
        <div className="max-w-3xl">
          <p className="mono-label mb-4 text-sea-bright">{t('comingSoon')}</p>
          <h1 className="text-display-lg text-ink">
            {t('heading')}
          </h1>
          <p className="mt-6 text-body-lg leading-[1.75] text-muted">
            {t('subtitle')}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white transition-colors hover:bg-oxide-hover hover:text-white"
          >
            <Link href="/website-audits">
              {t('detail.ctaLink')}
              <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <aside className="rounded-md border border-hairline bg-surface p-5">
          <div className="mb-5 flex size-11 items-center justify-center rounded-md border border-hairline bg-canvas">
            <FileSearch className="size-5 text-sea-bright" aria-hidden="true" />
          </div>
          <p className="mono-label text-muted">{t('detail.cta')}</p>
          <p className="mt-3 text-body-sm leading-[1.75] text-muted">
            {t('subtitle')}
          </p>
        </aside>
      </div>
    </Section>
  );
}
