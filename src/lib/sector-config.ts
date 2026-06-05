/**
 * Centralized sector configuration — single source of truth for
 * sector metadata used across Hero, SectorCards, CaseStudies,
 * SiteHeader, SiteFooter, and SectorPageTemplate.
 *
 * Updated for Black Sea Digital Systems design direction.
 */

import {
  hospitalityBlur,
  medicalBlur,
  beautyBlur,
  hotelPortfolioBlur,
  dentalPortfolioBlur,
  beautyPortfolioBlur,
} from '@/lib/blur-placeholders';

export type SectorKey = 'hospitality' | 'medical' | 'beauty';

export interface SectorMeta {
  key: SectorKey;
  textClass: string;
  dotClass: string;
  bgLight: string;
  borderClass: string;
  cssVar: string;
  href: string;
  image: string;
  portfolioImage: string;
  blur: string;
  portfolioBlur: string;
  focalPoint: string;
}

export const sectorKeys: SectorKey[] = ['hospitality', 'medical', 'beauty'];

export const sectors: Record<SectorKey, SectorMeta> = {
  hospitality: {
    key: 'hospitality',
    textClass: 'text-sea-bright',
    dotClass: 'bg-sea-bright',
    bgLight: 'bg-sea/10',
    borderClass: 'border-sea-bright/20',
    cssVar: 'var(--primitive-sea-bright)',
    href: '/hospitality-web-design-batumi',
    image: '/images/verticals-hospitality.jpg',
    portfolioImage: '/images/portfolio-hotel.jpg',
    blur: hospitalityBlur,
    portfolioBlur: hotelPortfolioBlur,
    focalPoint: 'object-center',
  },
  medical: {
    key: 'medical',
    textClass: 'text-sea-bright',
    dotClass: 'bg-sea',
    bgLight: 'bg-sea/10',
    borderClass: 'border-sea/20',
    cssVar: 'var(--primitive-sea)',
    href: '/medical-websites-batumi',
    image: '/images/verticals-medical.jpg',
    portfolioImage: '/images/portfolio-dental.jpg',
    blur: medicalBlur,
    portfolioBlur: dentalPortfolioBlur,
    focalPoint: 'object-top',
  },
  beauty: {
    key: 'beauty',
    textClass: 'text-oxide-hover',
    dotClass: 'bg-oxide',
    bgLight: 'bg-oxide/10',
    borderClass: 'border-oxide/20',
    cssVar: 'var(--primitive-oxide)',
    href: '/beauty-salon-websites-batumi',
    image: '/images/verticals-beauty.jpg',
    portfolioImage: '/images/portfolio-beauty.jpg',
    blur: beautyBlur,
    portfolioBlur: beautyPortfolioBlur,
    focalPoint: 'object-top',
  },
};

export function getSector(key: string): SectorMeta {
  const sector = sectors[key as SectorKey];
  if (!sector) throw new Error(`Unknown sector key: ${key}`);
  return sector;
}

export const sectorYears: Record<SectorKey, string> = {
  hospitality: '2025',
  medical: '2025',
  beauty: '2024',
};
