import { getTranslations } from 'next-intl/server';
import { ArrowRight, CheckCircle2, Code2, FileSearch, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/shared/TrackedLink';
import { pricingAuditProduct, pricingWebsitePackages } from '@/lib/pricing-config';

export async function PricingCards() {
  const t = await getTranslations('pricing');

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {pricingWebsitePackages.map((pkg) => (
        <article
          key={pkg.key}
          className={`rounded-md border bg-surface p-5 transition-colors hover:bg-surface-elevated/50 ${pkg.borderClass} ${
            pkg.highlighted ? 'ring-1 ring-sea-bright/25' : ''
          }`}
        >
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className={`size-2 rounded-full ${pkg.dotClass}`} aria-hidden="true" />
                <span className="mono-label text-sea-bright">{t(`${pkg.key}.scope_label`)}</span>
              </div>
              <h3 className="text-heading-md text-ink">{t(`${pkg.key}.name`)}</h3>
            </div>
            <span className="font-mono text-sm font-semibold text-muted">{pkg.packageNumber}</span>
          </div>

          <div className="grid gap-3 border-y border-hairline py-5 sm:grid-cols-2">
            <div>
              <p className="mono-label mb-2 text-muted">{t('setup_label')}</p>
              <p className="text-xl font-semibold text-ink">{t(`${pkg.key}.setup`)}</p>
            </div>
            <div>
              <p className="mono-label mb-2 text-muted">{t('monthly_label')}</p>
              <p className="text-xl font-semibold text-ink">{t(`${pkg.key}.monthly`)}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-hairline bg-canvas p-4">
              <p className="mono-label mb-2 text-sea-bright">{t('best_for_label')}</p>
              <p className="text-sm leading-[1.7] text-muted">{t(`${pkg.key}.best_fit`)}</p>
            </div>
            <div className="rounded-md border border-hairline bg-canvas p-4">
              <p className="mono-label mb-2 text-sea-bright">{t('outcome_label')}</p>
              <p className="text-sm leading-[1.7] text-muted">{t(`${pkg.key}.outcome`)}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
            <div>
              <p className="mono-label mb-3 text-muted">{t('includes_label')}</p>
              <ul className="space-y-2">
                {Array.from({ length: pkg.moduleCount }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${pkg.iconText}`} aria-hidden="true" />
                    <span>{t(`${pkg.key}.includes.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3 text-muted">{t('technical_label')}</p>
              <ul className="space-y-2">
                {Array.from({ length: pkg.technicalCount }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <Code2 className="mt-0.5 size-4 shrink-0 text-sea-bright" aria-hidden="true" />
                    <span>{t(`${pkg.key}.technical.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3 text-muted">{t('not_included_label')}</p>
              <ul className="space-y-2">
                {Array.from({ length: pkg.exclusionCount }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <MinusCircle className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
                    <span>{t(`${pkg.key}.not_included.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            asChild
            className="mt-6 h-11 rounded-md bg-oxide px-5 text-sm font-semibold text-white hover:bg-oxide-hover hover:text-white"
          >
            <TrackedLink
              href="/contact"
              eventName="Pricing CTA Clicked"
              eventProps={{ location: 'pricing_package_card', package: pkg.key }}
            >
              {t('cta')}
              <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </article>
      ))}
    </div>
  );
}

export async function PricingAuditProduct() {
  const t = await getTranslations('pricing');
  const audit = pricingAuditProduct;

  return (
    <div className={`rounded-md border bg-surface text-ink ${audit.borderClass}`}>
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-hairline bg-canvas p-5 lg:border-b-0 lg:border-r md:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex size-11 items-center justify-center rounded-md border border-hairline bg-surface">
              <FileSearch className={`size-5 ${audit.iconText}`} aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-success">
              {audit.productNumber}
            </span>
          </div>
          <p className="mono-label mb-4 text-success">{t('audit_section_eyebrow')}</p>
          <h2 className="text-heading-lg text-ink">{t('audit_section_heading')}</h2>
          <p className="mt-4 text-body-sm leading-[1.75] text-muted">{t('audit_section_subtitle')}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-hairline bg-surface p-4">
              <p className="mono-label mb-2 text-muted">{t('audit_price_label')}</p>
              <p className="text-xl font-semibold text-ink">{t('audit.setup')}</p>
            </div>
            <div className="rounded-md border border-hairline bg-surface p-4">
              <p className="mono-label mb-2 text-muted">{t('monthly_label')}</p>
              <p className="text-base font-semibold text-ink">{t('audit.monthly')}</p>
            </div>
          </div>

          {audit.turnaroundKey && (
            <div className="mt-3 rounded-md border border-hairline bg-surface p-4">
              <p className="mono-label mb-2 text-muted">{t('turnaround_label')}</p>
              <p className="text-sm leading-[1.7] text-ink">{t(audit.turnaroundKey)}</p>
            </div>
          )}

          <Button
            asChild
            className="mt-6 h-11 rounded-md bg-oxide px-5 text-sm font-semibold text-white hover:bg-oxide-hover hover:text-white"
          >
            <TrackedLink
              href="/website-audits"
              eventName="Pricing CTA Clicked"
              eventProps={{ location: 'pricing_audit_product' }}
            >
              {t('audit_cta')}
              <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-hairline bg-canvas p-4">
              <p className="mono-label mb-2 text-sea-bright">{t('who_for_label')}</p>
              <p className="text-sm leading-[1.7] text-muted">{t('audit.best_fit')}</p>
            </div>
            <div className="rounded-md border border-hairline bg-canvas p-4">
              <p className="mono-label mb-2 text-sea-bright">{t('outcome_label')}</p>
              <p className="text-sm leading-[1.7] text-muted">{t('audit.outcome')}</p>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
            <div>
              <p className="mono-label mb-3 text-muted">{t('includes_label')}</p>
              <ul className="space-y-2">
                {Array.from({ length: audit.includeCount }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${audit.iconText}`} aria-hidden="true" />
                    <span>{t(`audit.includes.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3 text-muted">{t('technical_label')}</p>
              <ul className="space-y-2">
                {Array.from({ length: audit.technicalCount }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <Code2 className="mt-0.5 size-4 shrink-0 text-sea-bright" aria-hidden="true" />
                    <span>{t(`audit.technical.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3 text-muted">{t('audit_not_included_label')}</p>
              <ul className="space-y-2">
                {Array.from({ length: audit.exclusionCount }, (_, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <MinusCircle className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
                    <span>{t(`audit.not_included.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
