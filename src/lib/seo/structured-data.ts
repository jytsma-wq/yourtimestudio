import { siteConfig } from '@/lib/site-config';
import { defaultLocale, type Locale } from '@/lib/i18n/config';

const siteUrl = siteConfig.url;
const logoUrl = `${siteUrl}${siteConfig.brand.logoPngSrc}`;
const organizationId = `${siteUrl}/#organization`;
const localBusinessId = `${siteUrl}/#localbusiness`;
const normalizedPhone = siteConfig.contact.whatsapp.replace(/\s/g, '');
const sameAs = [
  siteConfig.social.instagram,
  siteConfig.social.linkedin,
  siteConfig.social.facebook,
].filter(Boolean);

function localeUrl(locale: Locale, path: string): string {
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;

  return locale === defaultLocale
    ? `${siteUrl}${normalizedPath}`
    : `${siteUrl}/${locale}${normalizedPath}`;
}

export function areaServedSchema() {
  return [
    {
      '@type': 'City',
      name: 'Batumi',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Adjara',
    },
    {
      '@type': 'Country',
      name: 'Georgia',
    },
  ] as const;
}

function serviceProviderSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': localBusinessId,
    name: siteConfig.name,
    url: siteUrl,
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: siteConfig.name,
    url: siteUrl,
    logo: logoUrl,
    description: siteConfig.description,
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
    '@id': `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    // SearchAction removed: the insights page has no search implementation.
    // Add potentialAction back once a real site search endpoint exists.
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': localBusinessId,
    name: siteConfig.name,
    url: siteUrl,
    logo: logoUrl,
    description: siteConfig.description,
    image: `${siteUrl}/og-default.png`,
    ...(normalizedPhone ? { telephone: normalizedPhone } : {}),
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.address.geo?.latitude,
      longitude: siteConfig.address.geo?.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: areaServedSchema(),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  locale,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  serviceType: string;
}) {
  const url = localeUrl(locale, path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service' as const,
    '@id': `${url}#service`,
    name,
    description,
    serviceType,
    provider: serviceProviderSchema(),
    areaServed: areaServedSchema(),
    url,
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
