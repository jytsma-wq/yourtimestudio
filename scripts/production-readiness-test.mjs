import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const locales = ['en', 'ka', 'ru', 'tr'];
const messageDir = 'src/content/messages';
const exampleSource = readFileSync('src/content/examples.ts', 'utf8');
const workDetailSlugs = [
  ...exampleSource.matchAll(/^\s+slug: '([^']+)',$/gm),
].map((match) => match[1]);
const workDetailPaths = workDetailSlugs.map((slug) => `/work/${slug}`);
const localizedPagePaths = [
  '',
  '/website-audits',
  '/photography',
  '/pricing',
  '/work',
  '/templates',
  '/templates/hotel-01-luxury',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/insights',
  '/hospitality-web-design-batumi',
  '/medical-websites-batumi',
  '/beauty-salon-websites-batumi',
  '/thank-you',
  '/website-audits/batumi-hotel-website-audit',
  ...workDetailPaths,
];

const requiredRoutes = [
  '/',
  ...locales.flatMap((locale) =>
    localizedPagePaths.map((path) => `/${locale}${path}`),
  ),
];

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function flatten(value, prefix = '', out = {}) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}.${index}`, out));
    return out;
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }

  out[prefix] = value;
  return out;
}

function collectNodeTypes(value, prefix = '', out = {}) {
  const type = Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;
  out[prefix || '<root>'] = type;

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      collectNodeTypes(child, prefix ? `${prefix}.${key}` : key, out);
    }
  }

  return out;
}

function assertNoRawMarkers(text, label) {
  const markers = ['MISSING_MESSAGE', 'IntlError', '[object Object]', 'Application error', 'Hydration failed'];
  for (const marker of markers) {
    assert(!text.includes(marker), `${label} contains ${marker}`);
  }
}

function extractPlaceholders(text) {
  return [...text.matchAll(/\{[^{}]+\}/g)].map((match) => match[0]).sort();
}

const allowedSharedLocaleValues = new Set([
  'Google Business Profile',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Hostinger',
  'Prisma',
  'React Hook Form',
  'Zod',
  'next-intl',
  'Framer Motion',
  'Radix UI',
  'hello@batumilighthouse.com',
  'WhatsApp',
  'Instagram',
  'LinkedIn',
  'Facebook',
  'Core Web Vitals (LCP, FID, CLS)',
  'Reels + Stories',
  'Jasper',
  'Demo',
]);

const forbiddenUntranslatedFragments = {
  ka: ['placeholder', 'follow-up', 'custom forms', 'screen reader', 'channel manager', 'fit call', 'book now', 'feed +', 'გაყიდვების წნევა', 'ეწვილათ', 'თვალთვალა', 'იწვდით', 'გინახავთ', 'ობიექტი გაუწიოთ', 'უცხოვრებო', 'ექსპრესირებული', 'მისუტაცირებული', 'შეიძლია', 'გადახდილი მისაწოდებლის', 'დარჩენილია შესასრულებელი', 'გადაიწყვება', 'ქართული ფასდამატება', 'დასტოვრამდე', 'წინარესრულებული'],
  ru: ['founder-led', 'fake-', 'placeholder', 'account-команд', 'booking engine', 'follow-up', 'lazy loading', 'screen reader', 'hero-изображ', 'book now', 'alt-текст', 'fit call', 'channel manager', 'rate parity', 'beauty-бизнес', 'beauty-студ', 'medspa', 'на email', 'service schema', 'lifestyle-магаз'],
  tr: ['fake metrik', 'placeholder', 'lazy loading', 'channel manager', 'fit call', 'hero görsel', 'book now', 'alt metin', 'wellness', 'medspa', 'build çıktısı', 'walk-in', 'site footerına', 'duyarlı ana sayfa', 'dokunsal bakım bulucu', 'kullanışlı bugün', 'clearing', 'teslim edilebilir', 'soruşturma', 'sonuçsal', 'ödenmeye devam eder'],
};

function checkI18nParity() {
  const localeMessages = Object.fromEntries(
    locales.map((locale) => [locale, readJson(`${messageDir}/${locale}.json`)]),
  );
  const messages = Object.fromEntries(
    locales.map((locale) => [locale, flatten(localeMessages[locale])]),
  );
  const englishKeys = Object.keys(messages.en).sort();
  const englishNodeTypes = collectNodeTypes(localeMessages.en);

  for (const locale of locales.filter((item) => item !== 'en')) {
    assert.deepEqual(
      collectNodeTypes(localeMessages[locale]),
      englishNodeTypes,
      `${locale} recursive message structure and node types must match English`,
    );

    const localeKeys = Object.keys(messages[locale]).sort();
    assert.deepEqual(localeKeys, englishKeys, `${locale} message keys must match English`);

    for (const key of englishKeys) {
      const englishValue = messages.en[key];
      const localizedValue = messages[locale][key];

      if (typeof englishValue !== 'string' || typeof localizedValue !== 'string') continue;

      assert.deepEqual(
        extractPlaceholders(localizedValue),
        extractPlaceholders(englishValue),
        `${locale}:${key} placeholders must match English`,
      );

      if (localizedValue === englishValue && /[A-Za-z]{3}/.test(englishValue)) {
        assert(
          allowedSharedLocaleValues.has(englishValue),
          `${locale}:${key} must not silently fall back to English`,
        );
      }

      const normalizedValue = localizedValue.toLocaleLowerCase(locale);
      for (const fragment of forbiddenUntranslatedFragments[locale]) {
        assert(
          !normalizedValue.includes(fragment),
          `${locale}:${key} contains untranslated fragment "${fragment}"`,
        );
      }
    }
  }

  for (const [locale, values] of Object.entries(messages)) {
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === 'string') {
        assertNoRawMarkers(value, `${locale}:${key}`);
        assert(
          value.trim() || key === 'contactPage.info_whatsapp',
          `${locale}:${key} must not be empty`,
        );
      }
    }
  }

  const englishTemplateCatalog = flatten(localeMessages.en.templatesCatalog);
  for (const locale of locales.filter((item) => item !== 'en')) {
    const localizedTemplateCatalog = flatten(localeMessages[locale].templatesCatalog);

    for (const [key, englishValue] of Object.entries(englishTemplateCatalog)) {
      if (typeof englishValue !== 'string' || !englishValue.trim()) continue;

      assert.notEqual(
        localizedTemplateCatalog[key],
        englishValue,
        `${locale}:templatesCatalog.${key} must not fall back to English`,
      );
    }
  }
}

function checkLocalizedCopyRegressions() {
  const localeMessages = Object.fromEntries(
    locales.map((locale) => [locale, readJson(`${messageDir}/${locale}.json`)]),
  );

  for (const locale of locales) {
    const messages = localeMessages[locale];

    for (const step of [1, 2, 3]) {
      assert.equal(
        messages.pricingPage.process_steps[step].description,
        messages.aboutPage.process_steps[step].description,
        `${locale} pricing and about process step ${step + 1} must not drift`,
      );
    }

    assert.equal(
      messages.thankYouPage.body,
      messages.thank_you.body,
      `${locale} duplicate thank-you copy must stay synchronized`,
    );
    assert(
      messages.auditPage.detail.sample_disclosure.trim().length > 40,
      `${locale} illustrative audit must include a clear sample disclosure`,
    );
    assert(
      messages.templatesCatalog.metadataDescription.includes('Batumi Lighthouse'),
      `${locale} template metadata must retain the tailored-build invitation`,
    );
    assert(
      messages.contactPage.form.inbox_unavailable.includes('hello@batumilighthouse.com') &&
        messages.auditPage.form.inbox_unavailable.includes('hello@batumilighthouse.com'),
      `${locale} unavailable-form notices must provide the direct inbox`,
    );
  }

  assert.deepEqual(
    [...localeMessages.ka.faq.items[0].a.matchAll(/\d+(?:[.,]\d+)?/g)].map((match) => match[0]),
    [...localeMessages.en.faq.items[0].a.matchAll(/\d+(?:[.,]\d+)?/g)].map((match) => match[0]),
    'Georgian project-timeline FAQ must retain every duration from English',
  );
  assert.equal(
    localeMessages.en.examplesUi.items['boutique-hotel-direct-booking-demo'].clientLearning[1],
    'How direct booking prompts can sit beside policies and trust details',
    'Hotel example client learning must not duplicate its trust-flow point',
  );
  assert.equal(
    localeMessages.en.examplesUi.items['batumi-lighthouse-website'].whatItShows[1],
    'How brand and SEO configuration are centralized',
    'Studio example must describe centralized brand and SEO configuration',
  );
  assert.notEqual(
    localeMessages.tr.templatesCatalog.requestTemplate,
    'Bu şablonu görüş',
    'Turkish template CTA must be grammatical',
  );

  const expectedLocationLabels = {
    en: ['Batumi / Adjara', 'Batumi, Adjara, Georgia'],
    ka: ['ბათუმი / აჭარა', 'ბათუმი, აჭარა, საქართველო'],
    ru: ['Батуми / Аджария', 'Батуми, Аджария, Грузия'],
    tr: ['Batum / Acara', 'Batum, Acara, Gürcistan'],
  };

  for (const locale of locales) {
    assert.deepEqual(
      Object.values(localeMessages[locale].locationLabels),
      expectedLocationLabels[locale],
      `${locale} place labels must stay localized`,
    );
  }

  const responseTimePromises = {
    en: [/one business day/i, /24 hours/i, /3 business days/i],
    ka: [/ერთ(?:ი)? სამუშაო დღ/i, /24 საათ/i, /3 სამუშაო დღ/i],
    ru: [/одного рабочего дня/i, /24 час/i, /3 рабочих д/i],
    tr: [/bir iş günü/i, /24 saat/i, /3 iş günü/i],
  };

  for (const locale of locales) {
    const messages = localeMessages[locale];
    const reviewedRequestCopy = [
      messages.contactPage.subtitle,
      messages.contactPage.form.success_body,
      messages.contactPage.form.success_meta,
      messages.thankYouPage.body,
      messages.contact.subtitle,
      messages.thank_you.body,
      messages.auditPage.form.subtitle,
      messages.auditPage.form.success,
    ].join(' ');

    for (const promise of responseTimePromises[locale]) {
      assert(
        !promise.test(reviewedRequestCopy),
        `${locale} form copy must not promise an unimplemented response time`,
      );
    }

    for (const key of [
      'name_placeholder',
      'business_placeholder',
      'email_placeholder',
      'website_placeholder',
    ]) {
      assert(
        messages.auditPage.form[key]?.trim(),
        `${locale} audit form must provide localized ${key}`,
      );
    }
  }

  assert.equal(
    localeMessages.ka.contactPage.form.message,
    'მომიყევით თქვენი პროექტის შესახებ',
    'Georgian contact prompt must remain grammatical',
  );
  assert.equal(
    localeMessages.ru.phoneFirst.support,
    'Вас легче найти и понять, вам проще доверять, а связаться с вами — удобнее.',
    'Russian phone-first support copy must remain grammatical',
  );
  assert.equal(
    localeMessages.tr.phoneFirst.support,
    'Kolay bulunur ve anlaşılır olun; güven verin ve iletişim kurmayı kolaylaştırın.',
    'Turkish phone-first support copy must remain grammatical',
  );

  const turkishVisibleCopy = JSON.stringify(localeMessages.tr)
    .replaceAll('Batumi Lighthouse', '')
    .replaceAll('hotel Batumi', '');
  assert(
    !/\bBatumi\b/.test(turkishVisibleCopy),
    'Turkish standalone place names must use Batum outside the brand and quoted search term',
  );

  const reviewedForeignFragments = {
    ka: [
      'MedicalBusiness schema',
      'სერვისის schema',
      'Hotel schema',
      'დათმობილი Slack',
      'მოგვითხროთ პროექტზე',
      'სიურპრიზი ინვოისები',
    ],
    ru: ['MedicalBusiness schema', 'Hotel schema', 'Оптимизированная скорость бронирования'],
    tr: [
      'faydalı metadata',
      'responsive düzenleri',
      "metadata'yı",
      "hizmet schema'sı",
      'yapılandırılmış metadata',
      'SEO metadata',
      'Hız optimize edilmiş',
      'iki veya üç taksitlere',
    ],
  };

  for (const [locale, fragments] of Object.entries(reviewedForeignFragments)) {
    const copy = JSON.stringify(localeMessages[locale]);
    for (const fragment of fragments) {
      assert(
        !copy.includes(fragment),
        `${locale} reviewed copy must not contain the stale fragment "${fragment}"`,
      );
    }
  }

  const georgianLegalCopy = JSON.stringify(localeMessages.ka.legalPage);
  for (const term of [
    'დამუშავების შეწყვეტა',
    'სტრუქტურიზებული',
    'მანქანურად წაკითხვადი',
    'სათანადო ტექნიკურ და ორგანიზაციულ ზომებს',
    'პირდაპირი თუ ნაგულისხმევი',
  ]) {
    assert(
      georgianLegalCopy.includes(term),
      `Georgian legal copy must retain the reviewed term "${term}"`,
    );
  }
}

function checkLocalizedUiSources() {
  const sectorTemplate = readFileSync('src/components/shared/SectorPageTemplate.tsx', 'utf8');
  const aboutPage = readFileSync('src/app/[locale]/about/page.tsx', 'utf8');
  const auditRequestForm = readFileSync(
    'src/components/shared/AuditRequestForm.tsx',
    'utf8',
  );

  assert(!sectorTemplate.includes('<span>Batumi / Adjara</span>'), 'Sector caption must use messages');
  assert(sectorTemplate.includes("tLocations('sectorCaption')"), 'Sector caption must use locationLabels');
  assert(!aboutPage.includes('>Batumi, Adjara, Georgia<'), 'About address must use messages');
  assert(aboutPage.includes("tLocations('studioAddress')"), 'About address must use locationLabels');

  for (const key of [
    'name_placeholder',
    'business_placeholder',
    'email_placeholder',
    'website_placeholder',
  ]) {
    assert(
      auditRequestForm.includes(`placeholder={t('${key}')}`),
      `Audit request form must use localized ${key}`,
    );
  }
  for (const hardcodedPlaceholder of [
    'Mariam K.',
    'Seafront Rooms',
    'mariam@example.com',
    'https://yourwebsite.com',
  ]) {
    assert(
      !auditRequestForm.includes(hardcodedPlaceholder),
      `Audit request form must not hardcode ${hardcodedPlaceholder}`,
    );
  }
}

function checkRequiredFiles() {
  const files = [
    '.env.example',
    'next.config.ts',
    'server.js',
    'src/app/robots.ts',
    'src/app/sitemap.ts',
    'src/app/[locale]/photography/page.tsx',
    'public/favicon.svg',
    'public/favicon.png',
    'public/favicon-16.png',
    'public/favicon-32.png',
    'public/favicon-48.png',
    'public/apple-touch-icon.png',
    'public/icon-192.png',
    'public/icon-512.png',
    'public/manifest.json',
    'public/og-audits.jpg',
    'public/og-beauty.jpg',
    'public/og-default.jpg',
    'public/og-hospitality.jpg',
    'public/og-medical.jpg',
  ];

  for (const file of files) {
    assert(existsSync(file), `${file} must exist`);
  }

  const rasterIcons = [
    ['public/favicon.png', 512],
    ['public/favicon-16.png', 16],
    ['public/favicon-32.png', 32],
    ['public/favicon-48.png', 48],
    ['public/apple-touch-icon.png', 180],
    ['public/icon-192.png', 192],
    ['public/icon-512.png', 512],
  ];

  for (const [file, size] of rasterIcons) {
    const bytes = readFileSync(file);
    assert.equal(
      bytes.subarray(0, 8).toString('hex'),
      '89504e470d0a1a0a',
      `${file} must contain PNG bytes`,
    );
    assert.equal(bytes.readUInt32BE(16), size, `${file} must be ${size}px wide`);
    assert.equal(bytes.readUInt32BE(20), size, `${file} must be ${size}px high`);
  }

  const faviconSvg = readFileSync('public/favicon.svg', 'utf8');
  assert(!faviconSvg.includes('<text'), 'favicon.svg must not depend on a font or text glyph');
  assert(faviconSvg.includes('<path'), 'favicon.svg must contain the shared vector mark');

  const manifest = readJson('public/manifest.json');
  assert.deepEqual(
    manifest.icons.map((icon) => [icon.src, icon.sizes]),
    [
      ['/icon-192.png', '192x192'],
      ['/icon-512.png', '512x512'],
      ['/favicon.svg', 'any'],
    ],
    'Manifest icons must use the shared lighthouse mark at explicit PWA sizes',
  );

  const localeLayout = readFileSync('src/app/[locale]/layout.tsx', 'utf8');
  assert(
    !localeLayout.includes('next/font/google') &&
      localeLayout.includes('@fontsource-variable/noto-sans-georgian'),
    'Production fonts must be bundled locally instead of fetched during the build',
  );

  for (const file of files.filter((file) => file.startsWith('public/og-'))) {
    assert.equal(
      readFileSync(file).subarray(0, 3).toString('hex'),
      'ffd8ff',
      `${file} must contain JPEG bytes matching its extension`,
    );
  }
}

function checkEnvExample() {
  const envExample = readFileSync('.env.example', 'utf8');
  const required = ['DATABASE_URL', 'NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_CONTACT_EMAIL', 'NEXT_PUBLIC_ANALYTICS_DOMAIN'];

  for (const key of required) {
    assert(envExample.includes(`${key}=`), `.env.example must document ${key}`);
  }

  assert(!/sk-[A-Za-z0-9]/.test(envExample), '.env.example must not contain OpenAI-style secrets');
  assert(!/AIza[0-9A-Za-z_-]{20,}/.test(envExample), '.env.example must not contain Google API keys');
}

function checkFormInboxReadiness() {
  for (const envFile of ['.env.example', '.env.hostinger.example']) {
    const envExample = readFileSync(envFile, 'utf8');
    assert(
      envExample.includes('FORM_INBOX_READY="false"'),
      `${envFile} must default FORM_INBOX_READY to false`,
    );
    assert(
      envExample.includes('notification') &&
        envExample.includes('protected inbox') &&
        envExample.includes('polls the database'),
      `${envFile} must document the owner-notification or protected-inbox prerequisite`,
    );
  }

  const validation = readFileSync('src/lib/form-validation.ts', 'utf8');
  assert(
    validation.includes("env.FORM_INBOX_READY === 'true'"),
    'Form inbox must become ready only for the exact value true',
  );

  for (const route of ['src/app/api/leads/route.ts', 'src/app/api/audits/route.ts']) {
    const source = readFileSync(route, 'utf8');
    assert(source.includes('if (!isFormInboxReady())'), `${route} must fail closed`);
    assert.equal(
      source.match(/hello@batumilighthouse\.com/g)?.length,
      4,
      `${route} must provide the direct inbox in all four API locales`,
    );
  }

  const contactPage = readFileSync('src/app/[locale]/contact/page.tsx', 'utf8');
  const auditPage = readFileSync('src/app/[locale]/website-audits/page.tsx', 'utf8');
  const contactForm = readFileSync('src/components/shared/ContactForm.tsx', 'utf8');
  const auditForm = readFileSync('src/components/shared/AuditRequestForm.tsx', 'utf8');
  const unavailableNotice = readFileSync(
    'src/components/shared/FormInboxUnavailableNotice.tsx',
    'utf8',
  );

  assert(
    contactPage.includes('const inboxReady = isFormInboxReady()') &&
      contactPage.includes('inboxReady={inboxReady}') &&
      contactPage.includes("export const dynamic = 'force-dynamic'"),
    'Contact page must pass server-side inbox readiness to its form',
  );
  assert(
    auditPage.includes('const inboxReady = isFormInboxReady()') &&
      auditPage.includes('inboxReady={inboxReady}') &&
      auditPage.includes("export const dynamic = 'force-dynamic'"),
    'Audit page must pass server-side inbox readiness to its form',
  );
  assert(
    contactForm.includes('disabled={!inboxReady || isSubmitting}') &&
      auditForm.includes("disabled={!inboxReady || status === 'sending'}"),
    'Both submit controls must stay disabled while the inbox is unavailable',
  );
  assert(
    unavailableNotice.includes('mailto:${formInboxEmail}') &&
      unavailableNotice.includes('hello@batumilighthouse.com'),
    'Unavailable-form notice must render the visible direct inbox as a mailto link',
  );
}

function checkSecurityConfig() {
  const config = readFileSync('next.config.ts', 'utf8');
  const required = [
    'poweredByHeader: false',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'Content-Security-Policy',
    'Strict-Transport-Security',
  ];

  for (const text of required) {
    assert(config.includes(text), `next.config.ts must include ${text}`);
  }

  assert(!config.includes("'unsafe-eval'"), 'Production CSP must not allow eval');
}

function checkStructuredDataClaims() {
  const structuredData = readFileSync('src/lib/seo/structured-data.ts', 'utf8');
  const homepage = readFileSync('src/app/[locale]/page.tsx', 'utf8');
  assert(!structuredData.includes('aggregateRating'), 'Do not publish aggregateRating without real review data');
  assert(!structuredData.includes('reviewRating'), 'Do not publish reviewRating without real review data');
  assert(!structuredData.includes('openingHoursSpecification'), 'Do not publish opening hours unless verified');
  assert(
    !structuredData.includes('description: siteConfig.description'),
    'Localized homepage schema must not leak the global English description',
  );
  assert(
    homepage.includes('organizationSchema(description)'),
    'Homepage schema must receive the localized metadata description',
  );
  assert(
    !structuredData.includes('GeoCoordinates') && !structuredData.includes("priceRange: '$$'"),
    'Do not publish an exact business location or price range without verified source data',
  );
  assert(
    homepage.includes('<script') && homepage.includes('serializeJsonLd('),
    'Homepage JSON-LD must render as escaped initial HTML',
  );
}

function checkSitemapSource() {
  const sitemap = readFileSync('src/app/sitemap.ts', 'utf8');

  assert.equal(workDetailSlugs.length, 4, 'Work inventory must expose four public detail pages');
  assert(sitemap.includes("import { examples } from '@/content/examples'"), 'Sitemap must use work inventory');
  assert(sitemap.includes('examples.map((example)'), 'Sitemap must enumerate every work detail');
  assert(sitemap.includes('alternates:'), 'Sitemap entries must publish locale alternates');
  assert(!sitemap.includes("path: '/privacy'"), 'Noindex privacy pages must stay out of sitemap');
  assert(!sitemap.includes("path: '/terms'"), 'Noindex terms pages must stay out of sitemap');
  assert(
    !sitemap.includes('/website-audits/batumi-hotel-website-audit'),
    'Noindex fictional audit detail must stay out of sitemap',
  );
  assert(!sitemap.includes('lastModified:'), 'Sitemap must not publish a changing build-time lastModified');
}

function checkPhotographyNavigation() {
  const header = readFileSync('src/components/layout/SiteHeader.tsx', 'utf8');
  assert(
    header.includes("{ key: 'photography', href: '/photography' }"),
    'Services navigation must link to the photography page',
  );
}

function checkPhotographyHomepageShowcase() {
  const homepage = readFileSync('src/app/[locale]/page.tsx', 'utf8');
  assert(
    homepage.includes('PhotographyShowcaseSection'),
    'Homepage must introduce the photography and social-content service',
  );
}

function checkPhotographyEditorialSceneBoard() {
  const photographyPage = readFileSync('src/app/[locale]/photography/page.tsx', 'utf8');
  assert(
    photographyPage.includes('PhotographySceneBoard'),
    'Photography page must use the image-led editorial scene board',
  );
}

function checkTemplateLibrary() {
  const expectedPackages = [
    'packages/content',
    'packages/tokens',
    'packages/ui',
    'templates/hotel',
    'templates/dentist',
    'templates/beauty-salon',
    'templates/restaurant',
    'templates/bar',
    'templates/shop',
  ];

  for (const packagePath of expectedPackages) {
    assert(existsSync(`${packagePath}/package.json`), `${packagePath} must be a workspace package`);
  }

  const assets = readdirSync('public/templates', { withFileTypes: true })
    .filter((entry) => entry.isDirectory());
  assert.equal(assets.length, 18, 'The template library must include exactly 18 asset directories');

  for (const locale of locales) {
    const messages = readJson(`${messageDir}/${locale}.json`);
    assert.equal(
      Object.keys(messages.templatesCatalog.items).length,
      18,
      `${locale} must describe all 18 templates`,
    );
  }

  const contentFiles = [
    'packages/content/src/index.ts',
    'packages/content/src/batch-one.ts',
    'packages/content/src/batch-two.ts',
    'packages/content/src/batch-three.ts',
    'packages/content/src/batch-four.ts',
    'packages/content/src/batch-five.ts',
    'packages/content/src/batch-six.ts',
  ];
  const templateContent = contentFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  assert(!templateContent.includes('Template buyer review'), 'Template demos must not publish invented buyer reviews');
}

function localizedSitemapPath(locale, path) {
  if (locale === 'en') return path || '/';
  return `/${locale}${path}`;
}

async function checkSitemap(baseUrl) {
  const response = await fetch(new URL('/sitemap.xml', baseUrl));
  assert(response.ok, `/sitemap.xml returned HTTP ${response.status}`);

  const xml = await response.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  const templatePaths = readdirSync('public/templates', { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `/templates/${entry.name}`);
  const indexedPaths = [
    '',
    '/hospitality-web-design-batumi',
    '/medical-websites-batumi',
    '/beauty-salon-websites-batumi',
    '/website-audits',
    '/photography',
    '/pricing',
    '/about',
    '/contact',
    '/insights',
    '/work',
    ...workDetailPaths,
    '/templates',
    ...templatePaths,
  ];
  const expectedPaths = locales
    .flatMap((locale) => indexedPaths.map((path) => localizedSitemapPath(locale, path)))
    .sort();
  const entryByPath = new Map();

  for (const entry of entries) {
    const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
    assert(loc, 'Every sitemap entry must include loc');
    entryByPath.set(new URL(loc).pathname, entry);
  }

  assert.deepEqual(
    [...entryByPath.keys()].sort(),
    expectedPaths,
    'Sitemap must contain only the complete public indexable locale inventory',
  );

  for (const locale of locales) {
    for (const path of indexedPaths) {
      const localizedPath = localizedSitemapPath(locale, path);
      const entry = entryByPath.get(localizedPath);
      const alternates = new Map();

      for (const tag of entry.match(/<xhtml:link\b[^>]*>/g) || []) {
        const hreflang = tag.match(/hreflang="([^"]+)"/)?.[1];
        const href = tag.match(/href="([^"]+)"/)?.[1];
        if (hreflang && href) alternates.set(hreflang, new URL(href).pathname);
      }

      for (const alternateLocale of locales) {
        assert.equal(
          alternates.get(alternateLocale),
          localizedSitemapPath(alternateLocale, path),
          `${localizedPath} must link to the ${alternateLocale} alternate`,
        );
      }
      assert.equal(
        alternates.get('x-default'),
        localizedSitemapPath('en', path),
        `${localizedPath} must link x-default to English`,
      );
    }
  }
}

async function checkRouteSmoke(baseUrl) {
  for (const route of requiredRoutes) {
    const response = await fetch(new URL(route, baseUrl));
    assert(response.ok, `${route} returned HTTP ${response.status}`);

    const html = await response.text();
    assert(html.length > 1000, `${route} returned unexpectedly small HTML`);
    assertNoRawMarkers(html, route);
    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    assert.equal(h1Count, 1, `${route} must render exactly one H1 in HTML`);
    assert(/<title>/i.test(html), `${route} must include a title`);
    assert(/name="description"/i.test(html), `${route} must include a meta description`);
    assert(/rel="canonical"/i.test(html), `${route} must include a canonical URL`);
  }

  const headerResponse = await fetch(new URL('/en', baseUrl));
  assert.equal(headerResponse.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(headerResponse.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert(headerResponse.headers.get('permissions-policy'), 'Permissions-Policy header must be present');
  assert(
    headerResponse.headers.get('content-security-policy')?.includes("frame-ancestors 'none'"),
    'Business pages must enforce frame blocking through CSP',
  );
  assert.equal(headerResponse.headers.get('x-frame-options'), 'DENY');
  assert.equal(headerResponse.headers.get('x-powered-by'), null, 'X-Powered-By must be disabled');

  const previewResponse = await fetch(new URL('/preview/hotel-01-luxury', baseUrl));
  const previewHtml = await previewResponse.text();
  assert(previewHtml.includes('noindex'), 'Template preview routes must be noindex');

  const rawTemplateResponse = await fetch(new URL('/template-sites/hotel-01-luxury', baseUrl));
  const rawTemplateHtml = await rawTemplateResponse.text();
  assert(rawTemplateHtml.includes('noindex'), 'Raw template routes must be noindex');
  assert(
    rawTemplateResponse.headers.get('content-security-policy')?.includes("frame-ancestors 'self'"),
    'Raw template routes must allow same-origin preview framing',
  );
  assert.equal(rawTemplateResponse.headers.get('x-frame-options'), 'SAMEORIGIN');

  await checkSitemap(baseUrl);
  await checkInternalLinks(baseUrl);
  await checkApiValidation(baseUrl);
}

async function checkInternalLinks(baseUrl) {
  const pageRoutes = ['/', '/en', '/en/pricing', '/en/work', '/en/contact'];
  const links = new Set();

  for (const route of pageRoutes) {
    const response = await fetch(new URL(route, baseUrl));
    const html = await response.text();

    for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
      const href = match[1];
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http') ||
        href.startsWith('/_next') ||
        href.startsWith('/images') ||
        href.startsWith('/examples')
      ) {
        continue;
      }

      links.add(href.split('#')[0]);
    }
  }

  for (const href of links) {
    const response = await fetch(new URL(href, baseUrl), { redirect: 'manual' });
    const okStatus = response.status >= 200 && response.status < 400;
    assert(okStatus, `${href} internal link returned HTTP ${response.status}`);
  }
}

async function checkApiValidation(baseUrl) {
  const invalidLead = await fetch(new URL('/api/leads', baseUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-locale': 'en' },
    body: JSON.stringify({}),
  });
  assert.equal(invalidLead.status, 400, '/api/leads must reject invalid input');

  const invalidAudit = await fetch(new URL('/api/audits', baseUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-locale': 'en' },
    body: JSON.stringify({}),
  });
  assert.equal(invalidAudit.status, 400, '/api/audits must reject invalid input');
}

async function main() {
  checkRequiredFiles();
  checkEnvExample();
  checkFormInboxReadiness();
  checkI18nParity();
  checkLocalizedCopyRegressions();
  checkLocalizedUiSources();
  checkSecurityConfig();
  checkStructuredDataClaims();
  checkSitemapSource();
  checkPhotographyNavigation();
  checkPhotographyHomepageShowcase();
  checkPhotographyEditorialSceneBoard();
  checkTemplateLibrary();

  if (process.env.SMOKE_BASE_URL) {
    await checkRouteSmoke(process.env.SMOKE_BASE_URL);
  }

  console.log('production readiness checks passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
