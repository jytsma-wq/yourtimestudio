import { siteConfig } from '@/lib/site-config';

const siteUrl = siteConfig.url;
const logoUrl = `${siteUrl}${siteConfig.assets.logo}`;
const normalizedPhone = siteConfig.contact.whatsapp.replace(/\s/g, '');
const sameAs = [
  siteConfig.social.instagram,
  siteConfig.social.linkedin,
  siteConfig.social.facebook,
].filter(Boolean);

export function organizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteUrl,
    logo: logoUrl,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      ...(normalizedPhone ? { telephone: normalizedPhone } : {}),
      contactType: 'sales',
      availableLanguage: ['English', 'Georgian', 'Russian', 'Turkish'],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteUrl,
    // SearchAction removed: the insights page has no search implementation.
    // Add potentialAction back once a real site search endpoint exists.
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
