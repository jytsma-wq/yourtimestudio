import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, FileSearch, ShieldCheck } from 'lucide-react';
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

  return (
    <Section variant="subtle" number={number}>
      <div data-locale={locale} className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
          <div>
            <p className="section-label">{t('sectionLabel')}</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {t('heading')}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>

          <aside className="border border-border bg-background p-5 shadow-none md:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center border border-border bg-card">
                <FileSearch className="size-5 text-navy" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {t('audit_offer.kicker')}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-foreground">
                  {t('audit_offer.title')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t('audit_offer.body')}
                </p>
              </div>
            </div>
            <Button asChild className="mt-5 w-full">
              <Link
                href="/website-audits"
                data-analytics-event="pricing_audit_cta_click"
                data-analytics-section="pricing_preview"
              >
                {t('audit_offer.cta')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </aside>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {pricingPackages.map((pkg) => (
            <article
              key={pkg.key}
              className={`flex h-full flex-col border border-border bg-card p-5 shadow-none md:p-6 ${pkg.prominent ? 'bg-background ring-1 ring-inset ring-navy/15' : ''}`}
            >
              <div className="flex min-h-28 flex-col items-start gap-4 border-b border-border pb-5 sm:flex-row sm:justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`size-2.5 ${pkg.dotClass}`} aria-hidden="true" />
                    <p className="text-sm font-semibold text-muted-foreground">
                      {t('best_for_label')}
                    </p>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {t(`${pkg.key}.name`)}
                  </h3>
                </div>
                {pkg.prominent && (
                  <span className="inline-flex max-w-full items-center gap-1.5 text-wrap border border-border bg-accent px-2.5 py-1 text-xs font-semibold leading-snug text-accent-foreground">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    {t('most_popular')}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(`${pkg.key}.best_fit`)}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-muted-foreground">{t('setup_label')}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{t(`${pkg.key}.setup`)}</p>
                </div>
                <div className="border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-muted-foreground">{t('monthly_label')}</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{t(`${pkg.key}.monthly`)}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">{t('outcome_label')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${pkg.key}.outcome`)}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground">{t('includes_label')}</p>
                <ul className="mt-3 space-y-2.5">
                  {Array.from({ length: Math.min(pkg.itemCount, 4) }, (_, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <Check className={`mt-0.5 size-4 shrink-0 ${pkg.iconText}`} aria-hidden="true" />
                      <span>{t(`${pkg.key}.includes.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground">{t('scope_note_label')}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`${pkg.key}.scope_note`)}
                </p>
              </div>

              <Button
                asChild
                variant={pkg.prominent ? 'default' : 'outline'}
                className="mt-auto w-full"
              >
                <Link
                  href="/contact"
                  data-analytics-event="pricing_card_cta_click"
                  data-analytics-section="pricing_preview"
                  data-analytics-item={pkg.key}
                >
                  {t('cta')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 border border-border bg-background p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {t('guarantee')}
            </p>
          </div>
          <Link
            href="/pricing"
            data-analytics-event="pricing_full_page_cta_click"
            data-analytics-section="pricing_preview"
            className="inline-flex min-h-11 shrink-0 items-center border-b border-transparent py-2 text-sm font-semibold text-navy no-underline transition-colors duration-150 ease-in-out hover:border-accent"
          >
            {t('see_full_pricing')}
          </Link>
        </div>
      </div>
    </Section>
  );
}
