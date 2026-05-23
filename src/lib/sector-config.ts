/**
 * Centralized sector configuration — single source of truth for
 * sector metadata used across Hero, SectorCards, CaseStudies,
 * Testimonials, BlogTeaser, SiteHeader, SiteFooter, and SectorPageTemplate.
 *
 * Eliminates duplication of colors, images, blur placeholders, and hrefs.
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
  /** Machine key matching translation namespace */
  key: SectorKey;
  /** Semantic Tailwind text class (e.g. 'text-navy') */
  textClass: string;
  /** Semantic Tailwind dot/background class (e.g. 'bg-navy') */
  dotClass: string;
  /** Semantic Tailwind background-tint class (e.g. 'bg-navy/10') */
  bgLight: string;
  /** Semantic Tailwind border class (e.g. 'border-navy/20') */
  borderClass: string;
  /** CSS custom-property name for inline styles (e.g. 'var(--navy)') */
  cssVar: string;
  /** Route path for the sector detail page */
  href: string;
  /** Verticals card image */
  image: string;
  /** Portfolio/case study image */
  portfolioImage: string;
  /** Blur placeholder for verticals image */
  blur: string;
  /** Blur placeholder for portfolio image */
  portfolioBlur: string;
  /** Object-fit focal point class (e.g. 'object-center') */
  focalPoint: string;
}

/** Ordered list of all sectors — use this for iteration */
export const sectorKeys: SectorKey[] = ['hospitality', 'medical', 'beauty'];

/** Full metadata for each sector */
export const sectors: Record<SectorKey, SectorMeta> = {
  hospitality: {
    key: 'hospitality',
    textClass: 'text-navy',
    dotClass: 'bg-navy',
    bgLight: 'bg-navy/10',
    borderClass: 'border-navy/20',
    cssVar: 'var(--navy)',
    href: '/hospitality-web-design-batumi',
    image: '/images/verticals-hospitality.jpg',
    portfolioImage: '/images/portfolio-hotel.jpg',
    blur: hospitalityBlur,
    portfolioBlur: hotelPortfolioBlur,
    focalPoint: 'object-center',
  },
  medical: {
    key: 'medical',
    textClass: 'text-stone',
    dotClass: 'bg-stone',
    bgLight: 'bg-stone/10',
    borderClass: 'border-stone/20',
    cssVar: 'var(--stone)',
    href: '/medical-websites-batumi',
    image: '/images/verticals-medical.jpg',
    portfolioImage: '/images/portfolio-dental.jpg',
    blur: medicalBlur,
    portfolioBlur: dentalPortfolioBlur,
    focalPoint: 'object-top',
  },
  beauty: {
    key: 'beauty',
    textClass: 'text-rose',
    dotClass: 'bg-rose',
    bgLight: 'bg-rose/10',
    borderClass: 'border-rose/20',
    cssVar: 'var(--rose)',
    href: '/beauty-salon-websites-batumi',
    image: '/images/verticals-beauty.jpg',
    portfolioImage: '/images/portfolio-beauty.jpg',
    blur: beautyBlur,
    portfolioBlur: beautyPortfolioBlur,
    focalPoint: 'object-top',
  },
};

/** Get a sector's metadata by key — throws if invalid */
export function getSector(key: string): SectorMeta {
  const sector = sectors[key as SectorKey];
  if (!sector) throw new Error(`Unknown sector key: ${key}`);
  return sector;
}

/** Year label for case studies (display only) */
export const sectorYears: Record<SectorKey, string> = {
  hospitality: '2025',
  medical: '2025',
  beauty: '2024',
};
