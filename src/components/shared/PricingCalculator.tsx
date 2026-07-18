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
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">
          {t('calculator_sector')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {sectorOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSector(opt.key)}
              className={`relative rounded-md border px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out ${
                sector === opt.key
                  ? 'border-navy bg-muted text-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-navy hover:bg-muted'
              }`}
            >
              {sectorLabels[opt.key]}
              {sector === opt.key && (
                <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-brand-serene-coral" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Page count slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-foreground">
            {t('calculator_pages')}
          </label>
          <span className="text-sm font-semibold tabular-nums text-navy">{pages}</span>
        </div>
        <input
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
        <label className="text-sm font-medium text-foreground mb-3 block">
          {t('calculator_addons')}
        </label>
        <div className="space-y-3">
          {addOnOptions.map((opt) => {
            const isActive = addOns.has(opt.key);
            const price = rates[opt.key];
            return (
              <button
                key={opt.key}
                type="button"
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
      <Link href="/contact" className="block">
        <Button
          size="lg"
          className="w-full font-semibold"
        >
          {t('calculator_cta')}
        </Button>
      </Link>
    </div>
  );
}
