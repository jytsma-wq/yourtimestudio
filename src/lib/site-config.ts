/**
 * Centralized site configuration — single source of truth for
 * contact details, social links, and brand info used across
 * components, structured data, and API routes.
 *
 * Updated for Black Sea Digital Systems design direction.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourtimestudio.com';

function normalizeHttpUrl(value: string | undefined): string {
  const raw = value?.trim();

  if (!raw || raw === '#') {
    return '';
  }

  try {
    const url = new URL(raw);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

function normalizeWhatsAppNumber(value: string | undefined): string {
  const normalized = value?.trim().replace(/[^\d+]/g, '') || '';

  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : '';
}

function normalizeWhatsAppHref(value: string | undefined): string {
  const href = normalizeHttpUrl(value);

  if (!href) {
    return '';
  }

  const { hostname } = new URL(href);
  return ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(hostname) ? href : '';
}

const whatsappNumber = normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP);
const configuredWhatsAppHref = normalizeWhatsAppHref(process.env.NEXT_PUBLIC_WHATSAPP_HREF);
const derivedWhatsAppHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
  : '';

export const siteConfig = {
  name: 'Yourtimestudio',
  brand: {
    displayName: 'Yourtime Studio',
    markSrc: '/brand/yourtimestudio-mark.webp',
    markAlt: 'Yourtimestudio mark',
  },
  url: siteUrl,
  description:
    'Website development studio in Batumi for hotels, clinics, beauty studios, and service businesses.',

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@yourtimestudio.com',
    // NEXT_PUBLIC_WHATSAPP must be E.164, e.g. +995555123456.
    // Alternatively set NEXT_PUBLIC_WHATSAPP_HREF to a WhatsApp URL such as https://wa.me/995555123456.
    whatsapp: whatsappNumber,
    whatsappHref: configuredWhatsAppHref || derivedWhatsAppHref,
    area: 'Based in Batumi, Georgia. Serving hospitality, medical, and beauty businesses across the Adjara region and beyond.',
  },

  social: {
    instagram: normalizeHttpUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    linkedin: normalizeHttpUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    facebook: normalizeHttpUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  },

  trust: {
    clientNames: [] as string[],
    testimonials: [] as Array<{
      quote: string;
      name: string;
      role?: string;
      company?: string;
    }>,
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
    domain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN || 'yourtimestudio.com',
  },

  /** Key metrics — truthful, credible */
  stats: {
    sectors: { number: 3, suffix: '', labelKey: 'hero.stats.sectors.label' },
    languages: { number: 4, suffix: '-language', labelKey: 'hero.stats.languages.label' },
    focus: { number: 100, suffix: '%', labelKey: 'hero.stats.focus.label' },
  },

  availability: {
    status: 'available' as const,
    label: 'Available for projects',
  },
} as const;
