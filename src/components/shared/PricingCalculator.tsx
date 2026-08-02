'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { pricingRates, type PricingRateKey } from '@/lib/pricing-config';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

type AddOnKey = 'multilingual' | 'booking' | 'seo' | 'priority';

const sectorOptions: { key: PricingRateKey; labelKey: string }[] = [
  { key: 'beauty', labelKey: 'calculator_sector_beauty' },
  { key: 'medical', labelKey: 'calculator_sector_medical' },
  { key: 'hospitality', labelKey: 'calculator_sector_hospitality' },
];

const addOnOptions: { key: AddOnKey; labelKey: string }[] = [
  { key: 'multilingual', labelKey: 'calculator_multilingual' },
  { key: 'booking', labelKey: 'calculator_booking' },
  { key: 'seo', labelKey: 'calculator_seo' },
  { key: 'priority', labelKey: 'calculator_priority' },
];

export function PricingCalculator() {
  const t = useTranslations('pricing');

  const [sector, setSector] = useState<PricingRateKey>('beauty');
  const [pages, setPages] = useState(5);
  const [addOns, setAddOns] = useState<Set<AddOnKey>>(new Set());

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

  const rates = pricingRates[sector];

  const setupTotal = useMemo(() => {
    let total = rates.base;
    total += (pages - 5) * rates.perPage;
    if (addOns.has('multilingual')) total += rates.multilingual;
    if (addOns.has('booking')) total += rates.booking;
    if (addOns.has('seo')) total += rates.seo;
    if (addOns.has('priority')) total += rates.priority;
    return total;
  }, [rates, pages, addOns]);

  const monthlyTotal = useMemo(() => {
    const base = rates.base / 12;
    let total = base;
    if (addOns.has('priority')) total += rates.priority;
    return total;
  }, [rates, addOns]);

  const sectorLabels: Record<PricingRateKey, string> = {
    beauty: t('calculator_sector_beauty'),
    medical: t('calculator_sector_medical'),
    hospitality: t('calculator_sector_hospitality'),
  };

  return (
    <div className="mx-auto max-w-2xl rounded-md border border-border bg-card p-6 shadow-none md:p-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="editorial-display text-2xl md:text-3xl font-semibold mb-2">
          {t('calculator_heading')}
        </h2>
        <p className="text-muted-foreground leading-[1.75]">
          {t('calculator_subtitle')}
        </p>
      </div>

      {/* Sector selection */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-medium text-foreground">
          {t('calculator_sector')}
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          {sectorOptions.map((opt) => {
            const inputId = `pricing-calculator-sector-${opt.key}`;
            const isActive = sector === opt.key;

            return (
              <div key={opt.key} className="relative min-w-0">
                <input
                  id={inputId}
                  name="pricing-calculator-sector"
                  type="radio"
                  value={opt.key}
                  checked={isActive}
                  onChange={() => setSector(opt.key)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={inputId}
                  className={`relative flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-center text-sm font-medium leading-snug transition-colors duration-150 ease-out peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-navy bg-muted text-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-navy hover:bg-muted'
                  }`}
                >
                  <span className="min-w-0 break-words">{sectorLabels[opt.key]}</span>
                  {isActive && (
                    <span
                      className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-brand-serene-coral"
                      aria-hidden="true"
                    />
                  )}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Page count slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="pricing-calculator-pages" className="text-sm font-medium text-foreground">
            {t('calculator_pages')}
          </label>
          <output
            htmlFor="pricing-calculator-pages"
            className="text-sm font-semibold tabular-nums text-navy"
            aria-live="polite"
          >
            {pages}
          </output>
        </div>
        <input
          id="pricing-calculator-pages"
          name="pricing-calculator-pages"
          type="range"
          min={5}
          max={20}
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-navy"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">5</span>
          <span className="text-xs text-muted-foreground">20</span>
        </div>
      </div>

      {/* Add-on toggles */}
      <div className="mb-8">
        <p id="pricing-calculator-addons-label" className="mb-3 text-sm font-medium text-foreground">
          {t('calculator_addons')}
        </p>
        <div className="space-y-3" role="group" aria-labelledby="pricing-calculator-addons-label">
          {addOnOptions.map((opt) => {
            const isActive = addOns.has(opt.key);
            const price = rates[opt.key];
            return (
              <button
                key={opt.key}
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => toggleAddOn(opt.key)}
                className={`flex w-full items-center justify-between rounded-md border px-4 py-3 transition-colors duration-150 ease-out ${
                  isActive
                    ? 'border-navy bg-muted'
                    : 'border-border bg-background hover:border-navy'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Toggle switch */}
                  <span
                    aria-hidden="true"
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-navy' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 rounded-full bg-background transition-transform duration-200 ${
                        isActive ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </span>
                  <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {t(opt.labelKey)}
                  </span>
                </div>
                <span className={`text-sm tabular-nums ${isActive ? 'font-semibold text-navy' : 'text-muted-foreground'}`}>
                  +${price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price display */}
      <div className="border-t border-border pt-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-md bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {t('calculator_setup')}
            </p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              ${setupTotal.toLocaleString()}
            </p>
          </div>
          <div className="rounded-md bg-muted p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {t('calculator_monthly')}
            </p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              ${Math.round(monthlyTotal)}/mo
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button asChild size="lg" className="w-full font-semibold">
        <Link href="/contact">
          {t('calculator_cta')}
        </Link>
      </Button>
    </div>
  );
}
