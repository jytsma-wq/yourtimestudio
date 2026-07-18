import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const locales = ['en', 'ka', 'ru', 'tr'];
const messageDir = 'src/content/messages';
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
  '/work/boutique-hotel-direct-booking-demo',
  '/work/clinic-trust-website-demo',
  '/work/beauty-salon-booking-demo',
  '/work/batumi-lighthouse-website',
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

function assertNoRawMarkers(text, label) {
  const markers = ['MISSING_MESSAGE', 'IntlError', '[object Object]', 'Application error', 'Hydration failed'];
  for (const marker of markers) {
    assert(!text.includes(marker), `${label} contains ${marker}`);
  }
}

function checkI18nParity() {
  const localeMessages = Object.fromEntries(
    locales.map((locale) => [locale, readJson(`${messageDir}/${locale}.json`)]),
  );
  const messages = Object.fromEntries(
    locales.map((locale) => [locale, flatten(localeMessages[locale])]),
  );
  const englishKeys = Object.keys(messages.en).sort();

  for (const locale of locales.filter((item) => item !== 'en')) {
    const localeKeys = Object.keys(messages[locale]).sort();
    assert.deepEqual(localeKeys, englishKeys, `${locale} message keys must match English`);
  }

  for (const [locale, values] of Object.entries(messages)) {
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === 'string') {
        assertNoRawMarkers(value, `${locale}:${key}`);
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
    'public/manifest.json',
    'public/og-default.png',
  ];

  for (const file of files) {
    assert(existsSync(file), `${file} must exist`);
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

function checkSecurityConfig() {
  const config = readFileSync('next.config.ts', 'utf8');
  const required = [
    'poweredByHeader: false',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'Content-Security-Policy-Report-Only',
    'Strict-Transport-Security',
  ];

  for (const text of required) {
    assert(config.includes(text), `next.config.ts must include ${text}`);
  }
}

function checkStructuredDataClaims() {
  const structuredData = readFileSync('src/lib/seo/structured-data.ts', 'utf8');
  assert(!structuredData.includes('aggregateRating'), 'Do not publish aggregateRating without real review data');
  assert(!structuredData.includes('reviewRating'), 'Do not publish reviewRating without real review data');
  assert(!structuredData.includes('openingHoursSpecification'), 'Do not publish opening hours unless verified');
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
    headerResponse.headers.get('content-security-policy-report-only') ||
      headerResponse.headers.get('content-security-policy'),
    'CSP or CSP report-only header must be present',
  );
  assert.equal(headerResponse.headers.get('x-powered-by'), null, 'X-Powered-By must be disabled');

  const previewResponse = await fetch(new URL('/preview/hotel-01-luxury', baseUrl));
  const previewHtml = await previewResponse.text();
  assert(previewHtml.includes('noindex'), 'Template preview routes must be noindex');

  const rawTemplateResponse = await fetch(new URL('/template-sites/hotel-01-luxury', baseUrl));
  const rawTemplateHtml = await rawTemplateResponse.text();
  assert(rawTemplateHtml.includes('noindex'), 'Raw template routes must be noindex');
  assert(
    rawTemplateResponse.headers.get('content-security-policy-report-only')?.includes("frame-ancestors 'self'"),
    'Raw template routes must allow same-origin preview framing',
  );

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
  checkI18nParity();
  checkSecurityConfig();
  checkStructuredDataClaims();
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
