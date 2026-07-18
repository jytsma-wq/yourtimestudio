import { getTranslations } from 'next-intl/server';
import { CheckCircle2 } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { Section } from '@/components/shared/Section';

interface ResultsBandProps {
  locale: Locale;
  number?: string;
}

const deliveryKeys = ['strategy', 'copy', 'photography', 'deployment'] as const;

export async function ResultsBand({ locale: _locale, number }: ResultsBandProps) {
  const t = await getTranslations('results');

  return (
    <Section variant="dark" className="relative overflow-hidden py-20 md:py-28" number={number}>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12 grid gap-6 border-b border-background/12 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-label text-background">{t('sectionLabel')}</p>
            <p className="editorial-kicker text-background">{t('kicker')}</p>
          </div>
          <div>
            <h2 className="editorial-display text-4xl md:text-5xl text-background">
            {t('heading')}
            </h2>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-background">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border border-background/12 bg-background/12 md:grid-cols-4">
          {deliveryKeys.map((key) => (
            <div
              key={key}
              className="bg-ink p-5"
            >
              <CheckCircle2 className="mb-4 size-5 text-brand-serene-coral" />
              <h3 className="text-sm font-semibold text-background">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-background">
                {t(`items.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
