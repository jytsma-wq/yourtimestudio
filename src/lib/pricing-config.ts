/**
 * Centralized pricing configuration for scope cards and estimator rates.
 */

export type PricingWebsitePackageKey = 'beauty' | 'medical' | 'hospitality';
export type PricingAuditProductKey = 'audit';
export type PricingRateKey = 'beauty' | 'medical' | 'hospitality';

export interface PricingPackageConfig {
  key: PricingWebsitePackageKey;
  borderClass: string;
  iconText: string;
  dotClass: string;
  packageNumber: string;
  highlighted?: boolean;
  moduleCount: number;
  technicalCount: number;
  exclusionCount: number;
}

export interface PricingAuditProductConfig {
  key: PricingAuditProductKey;
  borderClass: string;
  iconText: string;
  dotClass: string;
  productNumber: string;
  includeCount: number;
  technicalCount: number;
  exclusionCount: number;
  turnaroundKey?: string;
}

export const pricingRates = {
  beauty: {
    base: 900,
    perPage: 90,
    multilingual: 250,
    booking: 350,
    seo: 250,
    care: 0,
    monthlyBase: 69,
    careMonthly: 39,
  },
  medical: {
    base: 1800,
    perPage: 120,
    multilingual: 350,
    booking: 450,
    seo: 350,
    care: 0,
    monthlyBase: 119,
    careMonthly: 59,
  },
  hospitality: {
    base: 2600,
    perPage: 140,
    multilingual: 500,
    booking: 650,
    seo: 450,
    care: 0,
    monthlyBase: 159,
    careMonthly: 79,
  },
} as const;

export const pricingWebsitePackages: PricingPackageConfig[] = [
  {
    key: 'beauty',
    borderClass: 'border-oxide/45',
    iconText: 'text-oxide',
    dotClass: 'bg-oxide',
    packageNumber: '01',
    moduleCount: 4,
    technicalCount: 3,
    exclusionCount: 3,
  },
  {
    key: 'medical',
    borderClass: 'border-sea-bright/45',
    iconText: 'text-sea-bright',
    dotClass: 'bg-sea-bright',
    packageNumber: '02',
    highlighted: true,
    moduleCount: 4,
    technicalCount: 3,
    exclusionCount: 3,
  },
  {
    key: 'hospitality',
    borderClass: 'border-sea/60',
    iconText: 'text-sea-bright',
    dotClass: 'bg-sea',
    packageNumber: '03',
    moduleCount: 4,
    technicalCount: 3,
    exclusionCount: 3,
  },
];

export const pricingAuditProduct: PricingAuditProductConfig = {
  key: 'audit',
  borderClass: 'border-success/40',
  iconText: 'text-success',
  dotClass: 'bg-success',
  productNumber: 'Diagnostic',
  includeCount: 4,
  technicalCount: 3,
  exclusionCount: 3,
};
