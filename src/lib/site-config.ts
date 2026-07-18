/**
 * Centralized site configuration — single source of truth for
 * contact details, social links, and brand info used across
 * components, structured data, and API routes.
 */

const brandName = 'Batumi Lighthouse';
const brandSlug = 'batumi-lighthouse';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://batumilighthouse.com').replace(/\/+$/, '');

export const siteConfig = {
  name: brandName,
  slug: brandSlug,
  url: siteUrl,
  description:
    'Dutch-practical web design, local SEO, and booking-focused websites for serious Batumi businesses.',

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@batumilighthouse.com',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
    whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_HREF || '',
    area: 'Based in Batumi, Georgia. Serving hospitality, medical, and beauty businesses across the Adjara region and beyond.',
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  },

  address: {
    locality: 'Batumi',
    region: 'Adjara',
    country: 'GE',
    geo: {
      latitude: 41.6168,
      longitude: 41.6367,
    },
  },

  analytics: {
    domain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || 'batumilighthouse.com',
  },

  assets: {
    mark: `/brand/${brandSlug}-mark.png`,
    logo: `/brand/${brandSlug}-logo.png`,
    faviconSvg: '/favicon.svg',
    faviconPng: '/favicon.png',
    manifest: '/manifest.json',
    ogDefault: '/og-default.png',
  },

  /** Colors matching CSS custom properties */
  colors: {
    teal: 'var(--teal)',
    tealLight: 'var(--accent)',
    navy: 'var(--navy)',
    rose: 'var(--rose)',
  },

  /** Key metrics — single source of truth for hero, founder chips, etc. */
  stats: {
    clients: { number: 3, suffix: '', labelKey: 'hero.stats.clients.label' },
    languages: { number: 4, suffix: '', labelKey: 'hero.stats.languages.label' },
    countries: { number: 1, suffix: '', labelKey: 'hero.stats.countries.label' },
  },

  availability: {
    status: 'available' as const,
    label: 'Available for projects',
  },
} as const;
