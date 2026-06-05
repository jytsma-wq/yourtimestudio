import { getTranslations } from 'next-intl/server';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/shared/TrackedLink';
import { pricingWebsitePackages } from '@/lib/pricing-config';

export async function PricingSection() {
  const t = await getTranslations('pricing');

  return (
    <section className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24">
      <div className="mx-auto max-w-[var(--container-max-width)]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('sectionLabel')}</p>
            <h2 className="text-display-lg text-ink-dark">{t('heading')}</h2>
          </div>
          <p className="max-w-2xl text-body-lg leading-[1.75] text-muted-dark lg:justify-self-end">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-md border border-hairline-light bg-hairline-light md:grid-cols-3">
          {pricingWebsitePackages.map((pkg) => (
            <article key={pkg.key} className="flex h-full flex-col bg-paper-soft p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`size-2 rounded-full ${pkg.dotClass}`} aria-hidden="true" />
                    <span className="mono-label text-sea-bright">{t(`${pkg.key}.scope_label`)}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-ink-dark">{t(`${pkg.key}.name`)}</h3>
                </div>
                <span className="font-mono text-xs font-semibold text-muted-dark">{pkg.packageNumber}</span>
              </div>

              <p className="text-sm leading-[1.65] text-muted-dark">{t(`${pkg.key}.outcome`)}</p>

              <div className="my-5 border-y border-hairline-light py-4">
                <p className="text-xl font-semibold text-ink-dark">{t(`${pkg.key}.setup`)}</p>
                <p className="mt-1 text-sm text-muted-dark">{t('setup_label')}</p>
                <p className="mt-3 text-base font-semibold text-ink-dark">{t(`${pkg.key}.monthly`)}</p>
                <p className="mt-1 text-sm text-muted-dark">{t('monthly_label')}</p>
              </div>

              <ul className="mb-6 space-y-2">
                {Array.from({ length: Math.min(pkg.moduleCount, 3) }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-dark">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{t(`${pkg.key}.includes.${i}`)}</span>
                  </li>
                ))}
              </ul>

              <TrackedLink
                href="/pricing"
                eventName="Pricing CTA Clicked"
                eventProps={{ location: 'homepage_pricing_card', package: pkg.key }}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-sea-bright transition-colors hover:text-oxide"
              >
                {t('see_full_pricing')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-md border border-hairline-light bg-paper p-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-body-sm leading-[1.7] text-muted-dark">{t('guarantee')}</p>
          <Button asChild className="rounded-md bg-oxide text-white hover:bg-oxide-hover hover:text-white">
            <TrackedLink
              href="/contact"
              eventName="Pricing CTA Clicked"
              eventProps={{ location: 'homepage_pricing_footer' }}
            >
              {t('cta')}
            </TrackedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
