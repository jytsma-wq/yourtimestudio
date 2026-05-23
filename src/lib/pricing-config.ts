/**
 * Centralized pricing configuration — single source of truth for
 * package styling, structure, and feature counts.
 *
 * All translatable text (names, prices, features) lives in locale files
 * under the `pricing` key. This config only handles the visual/styling
 * and structural properties that don't vary by locale.
 */

export type PricingPackageKey = 'beauty' | 'medical' | 'hospitality';

export interface PricingPackageConfig {
  /** Locale file key under `pricing.*` */
  key: PricingPackageKey;
  /** Tailwind border-top accent class */
  accentClass: string;
  /** Tailwind text color for icons */
  iconText: string;
  /** Tailwind bg class for the dot indicator */
  dotClass: string;
  /** Tailwind bg class for upsell section background */
  bgAccent: string;
  /** Whether this package is highlighted as "Most popular" */
  prominent?: boolean;
  /** Number of items in the `includes` array in the locale file */
  itemCount: number;
  /** Number of items in the `best_upsells` array in the locale file */
  upsellCount: number;
}

export const pricingRates = {
  beauty: { base: 700, perPage: 80, multilingual: 200, booking: 300, seo: 150, priority: 50 },
  medical: { base: 1500, perPage: 100, multilingual: 300, booking: 400, seo: 200, priority: 75 },
  hospitality: { base: 2000, perPage: 120, multilingual: 400, booking: 500, seo: 250, priority: 100 },
} as const;

export type PricingRateKey = keyof typeof pricingRates;

export const pricingPackages: PricingPackageConfig[] = [
  {
    key: 'beauty',
    accentClass: 'border-t-rose',
    iconText: 'text-brand-serene-coral-darken',
    dotClass: 'bg-brand-serene-coral',
    bgAccent: 'bg-brand-serene-coral/5',
    itemCount: 6,
    upsellCount: 3,
  },
  {
    key: 'medical',
    accentClass: 'border-t-stone',
    iconText: 'text-brand-sage-green-darken',
    dotClass: 'bg-brand-sage-green-darken',
    bgAccent: 'bg-brand-sage-green-darken/5',
    prominent: true,
    itemCount: 6,
    upsellCount: 3,
  },
  {
    key: 'hospitality',
    accentClass: 'border-t-navy',
    iconText: 'text-brand-sage-green-darken',
    dotClass: 'bg-brand-sage-green-darken',
    bgAccent: 'bg-brand-sage-green-darken/5',
    itemCount: 6,
    upsellCount: 4,
  },
];
