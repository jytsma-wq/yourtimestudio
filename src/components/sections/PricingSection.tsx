import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { pricingPackages } from '@/lib/pricing-config';

interface PricingSectionProps {
  locale: Locale;
  /** Large faint section number for background decoration */
  number?: string;
}

export async function PricingSection({ locale, number }: PricingSectionProps) {
  const t = await getTranslations('pricing');
  const tFaq = await getTranslations('pricingPage');

  return (
    <Section variant="subtle" number={number}>
      <div className="mb-12 grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="section-label">{t('sectionLabel')}</p>
          <p className="editorial-kicker text-muted-foreground">Transparent ranges</p>
        </div>
        <div>
          <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('heading')}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-3 mb-10">
        {pricingPackages.map((pkg) => (
          <div
            key={pkg.key}
            className={`bg-card p-6 border-t-2 ${pkg.accentClass} transition-all duration-300 ${
              pkg.prominent
                ? 'ring-1 ring-inset ring-teal/45'
                : ''
            }`}
          >
            {pkg.prominent && (
              <div className="mb-4 -mt-1 inline-flex items-center gap-1.5 bg-teal px-3 py-1 text-xs font-bold uppercase text-background">
                <ShieldCheck className="size-3" />
                {t('most_popular')}
              </div>
            )}
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${pkg.dotClass}`} />
              <h3 className="text-lg font-semibold">{t(`${pkg.key}.name`)}</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-5">
              {t('best_for_label')}: {t(`${pkg.key}.best_fit`)}
            </p>
            <div className="mb-5">
              <p className="text-2xl font-semibold text-foreground">{t(`${pkg.key}.setup`)}</p>
              <p className="text-sm text-muted-foreground">{t('setup_label')}</p>
              <p className="text-lg font-medium text-foreground mt-2">{t(`${pkg.key}.monthly`)}</p>
              <p className="text-sm text-muted-foreground">{t('monthly_label')}</p>
            </div>
            <ul className="space-y-2 mb-6">
              {Array.from({ length: pkg.itemCount }, (_, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <Check className={`size-4 mt-0.5 shrink-0 ${pkg.iconText}`} />
                  <span>{t(`${pkg.key}.includes.${i}`)}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant={pkg.prominent ? 'default' : 'outline'}
              className={`w-full rounded-none ${
                pkg.prominent ? 'bg-teal hover:bg-teal/90 text-background' : ''
              }`}
            >
              <Link href="/contact">
                {t('cta')}
              </Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <Link
          href="/pricing"
          className="text-teal font-medium hover:underline text-sm"
        >
          {t('see_full_pricing')}
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-center mb-6">{tFaq('faq_heading')}</h3>
        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-card border border-border p-4">
              <p className="font-medium text-sm text-foreground mb-1">
                {tFaq(`faq_items.${i}.q`)}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tFaq(`faq_items.${i}.a`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 flex items-start gap-3 bg-teal/5 border border-teal/20 p-4">
        <ShieldCheck className="size-5 text-teal shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t('guarantee')}
        </p>
      </div>
    </Section>
  );
}
