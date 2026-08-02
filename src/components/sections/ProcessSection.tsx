import { getTranslations } from 'next-intl/server';
import { ArrowRight, Hammer, Palette, Rocket, Search } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { Section } from '@/components/shared/Section';
import { FadeInUp } from '@/components/motion';
import { Link } from '@/lib/i18n/navigation';

interface ProcessSectionProps {
  locale: Locale;
  /** Large faint section number for background decoration */
  number?: string;
}

const stepIcons = [Search, Palette, Hammer, Rocket];

export async function ProcessSection({ locale, number }: ProcessSectionProps) {
  const t = await getTranslations('process');

  return (
    <Section number={number}>
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="section-label">{t('sectionLabel')}</p>
          <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('heading')}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-foreground no-underline transition duration-150 ease-in-out hover:border-b-2 hover:border-brand-serene-coral hover:text-brand-sage-green-darken"
          >
            {t('cta')}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="border-y border-border">
          {[0, 1, 2, 3].map((i) => {
            const Icon = stepIcons[i];
            return (
              <FadeInUp key={i} delay={i * 0.12}>
                <div className="grid gap-4 border-b border-border py-6 last:border-b-0 md:grid-cols-[64px_1fr] md:items-start">
                  <div className="flex size-12 items-center justify-center border border-border bg-brand-gray-100">
                    <Icon className="size-5 text-brand-serene-coral-darken" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{t(`steps.${i}.title`)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`steps.${i}.description`)}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
