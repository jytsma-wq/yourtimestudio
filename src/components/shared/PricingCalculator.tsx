'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, CheckCircle2 } from 'lucide-react';
import { pricingRates, type PricingRateKey } from '@/lib/pricing-config';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

type AddOnKey = 'multilingual' | 'booking' | 'seo' | 'care';

const sectorOptions: { key: PricingRateKey; labelKey: string }[] = [
  { key: 'beauty', labelKey: 'calculator_sector_beauty' },
  { key: 'medical', labelKey: 'calculator_sector_medical' },
  { key: 'hospitality', labelKey: 'calculator_sector_hospitality' },
];

const addOnOptions: { key: AddOnKey; labelKey: string; billing: 'setup' | 'monthly' }[] = [
  { key: 'multilingual', labelKey: 'calculator_multilingual', billing: 'setup' },
  { key: 'booking', labelKey: 'calculator_booking', billing: 'setup' },
  { key: 'seo', labelKey: 'calculator_seo', billing: 'setup' },
  { key: 'care', labelKey: 'calculator_care', billing: 'monthly' },
];

export function PricingCalculator() {
  const t = useTranslations('pricing');

  const [sector, setSector] = useState<PricingRateKey>('beauty');
  const [pages, setPages] = useState(6);
  const [addOns, setAddOns] = useState<Set<AddOnKey>>(new Set());

  const rates = pricingRates[sector];

  const toggleAddOn = (key: AddOnKey) => {
    setAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const setupTotal = useMemo(() => {
    let total = rates.base + Math.max(0, pages - 5) * rates.perPage;
    if (addOns.has('multilingual')) total += rates.multilingual;
    if (addOns.has('booking')) total += rates.booking;
    if (addOns.has('seo')) total += rates.seo;
    return total;
  }, [addOns, pages, rates]);

  const monthlyTotal = useMemo(() => {
    let total = rates.monthlyBase;
    if (addOns.has('care')) total += rates.careMonthly;
    return total;
  }, [addOns, rates]);

  const sectorLabels: Record<PricingRateKey, string> = {
    beauty: t('calculator_sector_beauty'),
    medical: t('calculator_sector_medical'),
    hospitality: t('calculator_sector_hospitality'),
  };

  return (
    <div className="mx-auto max-w-4xl rounded-md border border-hairline bg-surface text-ink">
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-hairline bg-canvas p-6 lg:border-b-0 lg:border-r">
          <div className="mb-5 flex size-11 items-center justify-center rounded-md border border-hairline bg-surface">
            <Calculator className="size-5 text-sea-bright" aria-hidden="true" />
          </div>
          <p className="mono-label mb-4 text-sea-bright">{t('calculator_label')}</p>
          <h2 className="text-heading-md text-ink">{t('calculator_heading')}</h2>
          <p className="mt-4 text-body-sm leading-[1.75] text-muted">{t('calculator_subtitle')}</p>
          <p className="mt-5 rounded-md border border-hairline bg-surface px-3 py-2 text-sm leading-[1.7] text-muted">
            {t('calculator_note')}
          </p>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold text-ink">{t('calculator_sector')}</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {sectorOptions.map((opt) => {
                const active = sector === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSector(opt.key)}
                    className={`rounded-md border px-3 py-3 text-left text-sm font-semibold transition-colors ${
                      active
                        ? 'border-sea-bright bg-sea/20 text-ink'
                        : 'border-hairline bg-canvas text-muted hover:border-sea/40 hover:text-ink'
                    }`}
                  >
                    {sectorLabels[opt.key]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <label htmlFor="pricing-pages" className="text-sm font-semibold text-ink">
                {t('calculator_pages')}
              </label>
              <span className="font-mono text-sm font-semibold text-sea-bright tabular-nums">{pages}</span>
            </div>
            <input
              id="pricing-pages"
              type="range"
              min={5}
              max={24}
              value={pages}
              onChange={(event) => setPages(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-canvas accent-sea-bright"
            />
            <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
              <span>5</span>
              <span>24</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold text-ink">{t('calculator_addons')}</p>
            <div className="grid gap-2">
              {addOnOptions.map((opt) => {
                const active = addOns.has(opt.key);
                const setupPrice = rates[opt.key];
                const priceLabel = opt.billing === 'monthly'
                  ? `+$${rates.careMonthly}/mo`
                  : `+$${setupPrice.toLocaleString()}`;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleAddOn(opt.key)}
                    className={`flex w-full items-center justify-between gap-4 rounded-md border px-3 py-3 text-left transition-colors ${
                      active
                        ? 'border-oxide/60 bg-oxide/15'
                        : 'border-hairline bg-canvas hover:border-sea/40 hover:bg-surface-elevated/50'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                          active ? 'border-oxide bg-oxide text-white' : 'border-hairline bg-surface text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className={`text-sm font-medium ${active ? 'text-ink' : 'text-muted'}`}>
                        {t(opt.labelKey)}
                      </span>
                    </span>
                    <span className={`shrink-0 font-mono text-xs font-semibold ${active ? 'text-oxide-hover' : 'text-muted'}`}>
                      {priceLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2">
            <div className="bg-canvas p-4">
              <p className="mono-label mb-2 text-muted">{t('calculator_setup')}</p>
              <p className="text-2xl font-semibold text-ink tabular-nums">${setupTotal.toLocaleString()}</p>
            </div>
            <div className="bg-canvas p-4">
              <p className="mono-label mb-2 text-muted">{t('calculator_monthly')}</p>
              <p className="text-2xl font-semibold text-ink tabular-nums">${monthlyTotal.toLocaleString()}/mo</p>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="mt-5 h-12 w-full rounded-md bg-oxide text-base font-semibold text-white hover:bg-oxide-hover hover:text-white"
          >
            <Link href="/contact">{t('calculator_cta')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
