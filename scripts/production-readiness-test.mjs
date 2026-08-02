import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';

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

const templateContentFiles = [
  'packages/content/src/index.ts',
  'packages/content/src/batch-one.ts',
  'packages/content/src/batch-two.ts',
  'packages/content/src/batch-three.ts',
  'packages/content/src/batch-four.ts',
  'packages/content/src/batch-five.ts',
  'packages/content/src/batch-six.ts',
];

function hasExactSecuritySource(value, expectedSource) {
  if (typeof value !== 'string') return false;
  return value
    .split(/[\s"'`,;]+/u)
    .some((candidate) => candidate === expectedSource);
}

function unwrapExpression(node) {
  let current = node;

  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current)
  ) {
    current = current.expression;
  }

  return current;
}

function propertyName(property) {
  if (ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name)) {
    return property.name.text;
  }

  return null;
}

function objectProperty(object, name) {
  return object.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property) === name,
  );
}

function stringValue(node) {
  const value = unwrapExpression(node);
  return ts.isStringLiteralLike(value) ? value.text : null;
}

function collectTemplateRouteMatrix() {
  const templates = [];

  for (const path of templateContentFiles) {
    const source = ts.createSourceFile(
      path,
      readFileSync(path, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );

    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;

      for (const declaration of statement.declarationList.declarations) {
        if (!declaration.initializer) continue;
        const object = unwrapExpression(declaration.initializer);
        if (!ts.isObjectLiteralExpression(object)) continue;

        const idProperty = objectProperty(object, 'id');
        const pagesProperty = objectProperty(object, 'pages');
        if (!idProperty || !pagesProperty) continue;

        const id = stringValue(idProperty.initializer);
        const pages = unwrapExpression(pagesProperty.initializer);
        if (!id || !/^(?:hotel|dentist|beauty|restaurant|bar|shop)-/.test(id)) continue;
        if (!ts.isArrayLiteralExpression(pages)) continue;

        const slugs = pages.elements.map((element) => {
          const page = unwrapExpression(element);

          if (ts.isCallExpression(page)) {
            const slug = page.arguments[0] ? stringValue(page.arguments[0]) : null;
            assert.notEqual(slug, null, `${id} page factory must receive a string slug first`);
            return slug;
          }

          assert(ts.isObjectLiteralExpression(page), `${id} page declarations must be objects or factory calls`);
          const slugProperty = objectProperty(page, 'slug');
          assert(slugProperty, `${id} page declaration is missing a slug`);
          const slug = stringValue(slugProperty.initializer);
          assert.notEqual(slug, null, `${id} page slug must be a string literal`);
          return slug;
        });

        templates.push({ id, slugs });
      }
    }
  }

  assert.equal(templates.length, 18, 'The declared route matrix must contain 18 templates');
  assert.equal(new Set(templates.map((template) => template.id)).size, 18, 'Template ids must be unique');
  assert.equal(
    templates.reduce((total, template) => total + template.slugs.length, 0),
    181,
    'The declared route matrix must contain 181 template page slugs',
  );

  for (const template of templates) {
    assert.equal(
      new Set(template.slugs).size,
      template.slugs.length,
      `${template.id} page slugs must be unique`,
    );
  }

  return templates;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function loadTypeScriptModule(path) {
  const source = readFileSync(path, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const testModule = { exports: {} };

  vm.runInNewContext(output, {
    module: testModule,
    exports: testModule.exports,
    URL,
    TextDecoder,
  }, { filename: path });

  return testModule.exports;
}

function checkApiHttpUrlValidation() {
  const { isAllowedHttpUrl } = loadTypeScriptModule('src/lib/api-request.ts');

  assert.equal(isAllowedHttpUrl('https://example.com/path'), true);
  assert.equal(isAllowedHttpUrl('http://example.com'), true);

  for (const unsafeUrl of [
    'javascript:alert(1)',
    'data:text/html,hello',
    'ftp://example.com',
    'file:///etc/passwd',
    'https://user:secret@example.com',
    `https://example.com/${'a'.repeat(500)}`,
  ]) {
    assert.equal(isAllowedHttpUrl(unsafeUrl), false, `${unsafeUrl.slice(0, 80)} must be rejected`);
  }
}

function checkApiRequestHeaderValidation() {
  const { validateApiRequestHeaders } = loadTypeScriptModule('src/lib/api-request.ts');
  const makeRequest = (headers) => new Request('https://batumilighthouse.com/api/leads', {
    method: 'POST',
    headers,
    body: '{}',
  });
  const options = {
    allowedOrigins: ['https://batumilighthouse.com'],
    allowRequestOrigin: false,
  };

  assert.equal(
    validateApiRequestHeaders(makeRequest({
      'content-type': 'application/json; charset=utf-8',
      origin: 'https://batumilighthouse.com',
    }), options).ok,
    true,
  );
  assert.equal(
    validateApiRequestHeaders(makeRequest({
      'content-type': 'text/plain',
      origin: 'https://batumilighthouse.com',
    }), options).code,
    'unsupported_media_type',
  );
  assert.equal(
    validateApiRequestHeaders(makeRequest({
      'content-type': 'application/json',
      origin: 'https://attacker.example',
    }), options).code,
    'origin_not_allowed',
  );
  assert.equal(
    validateApiRequestHeaders(makeRequest({
      'content-length': String(MAX_TEST_BODY_BYTES + 1),
      'content-type': 'application/json',
      origin: 'https://batumilighthouse.com',
    }), options).code,
    'payload_too_large',
  );

  const loopbackOptions = {
    allowedOrigins: ['https://batumilighthouse.com'],
    allowRequestOrigin: true,
  };
  const makeLoopbackRequest = (host, origin) => new Request('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host,
      origin,
    },
    body: '{}',
  });

  assert.equal(
    validateApiRequestHeaders(
      makeLoopbackRequest('127.0.0.1:3000', 'http://127.0.0.1:3000'),
      loopbackOptions,
    ).ok,
    true,
    'Equivalent loopback aliases must work in local production smoke tests',
  );
  assert.equal(
    validateApiRequestHeaders(
      makeLoopbackRequest('localhost:3000', 'http://127.0.0.1:3000'),
      loopbackOptions,
    ).ok,
    true,
    'Loopback origin equivalence must not depend on the Host header alias',
  );
  const localBindRequest = new Request('http://0.0.0.0:3000/api/leads', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host: '127.0.0.1:3000',
      origin: 'http://127.0.0.1:3000',
    },
    body: '{}',
  });
  assert.equal(
    validateApiRequestHeaders(localBindRequest, loopbackOptions).ok,
    true,
    'A standalone server bind address must be equivalent to its local browser origin',
  );
  assert.equal(
    validateApiRequestHeaders(
      makeLoopbackRequest('attacker.example', 'http://attacker.example'),
      loopbackOptions,
    ).code,
    'origin_not_allowed',
    'An arbitrary Host header must not extend the origin allowlist',
  );
}

const MAX_TEST_BODY_BYTES = 16 * 1024;

async function checkApiJsonBodyParsing() {
  const { readApiJsonBody } = loadTypeScriptModule('src/lib/api-request.ts');
  const makeRequest = (body) => new Request('https://batumilighthouse.com/api/leads', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  });

  const valid = await readApiJsonBody(makeRequest('{"name":"Mariam"}'));
  assert.equal(valid.ok, true);
  assert.equal(valid.body.name, 'Mariam');

  for (const invalidBody of ['{"name":', 'null', '[]', '"text"']) {
    const result = await readApiJsonBody(makeRequest(invalidBody));
    assert.equal(result.ok, false);
    assert.equal(result.status, 400);
  }

  const oversized = await readApiJsonBody(
    makeRequest(JSON.stringify({ message: 'x'.repeat(MAX_TEST_BODY_BYTES) })),
  );
  assert.equal(oversized.code, 'payload_too_large');
  assert.equal(oversized.status, 413);

  let chunksRead = 0;
  let cancelled = false;
  const stream = new ReadableStream(
    {
      pull(controller) {
        chunksRead += 1;
        if (chunksRead <= 4) {
          controller.enqueue(new Uint8Array(8 * 1024));
        } else {
          controller.close();
        }
      },
      cancel() {
        cancelled = true;
      },
    },
    { highWaterMark: 0 },
  );
  const streamed = await readApiJsonBody(new Request(
    'https://batumilighthouse.com/api/leads',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: stream,
      duplex: 'half',
    },
  ));
  assert.equal(streamed.code, 'payload_too_large');
  assert.equal(cancelled, true, 'Oversized chunked bodies must be cancelled before reading to EOF');
  assert(chunksRead <= 3, 'At most the chunks needed to cross 16 KiB should be consumed');
}

function checkRateLimitIdentity() {
  const { checkRateLimit } = loadTypeScriptModule('src/lib/rate-limit.ts');
  const options = { keyPrefix: 'identity-test', maxRequests: 1, windowMs: 60_000 };
  const makeRequest = (userAgent) => ({
    headers: new Headers({
      'x-real-ip': '203.0.113.10',
      'user-agent': userAgent,
    }),
  });

  assert.equal(checkRateLimit(makeRequest('browser-a'), options).limited, false);
  assert.equal(
    checkRateLimit(makeRequest('browser-b'), options).limited,
    true,
    'Changing User-Agent must not bypass an IP rate limit',
  );
}

function checkRateLimitBucketCap() {
  const { checkRateLimit, RATE_LIMIT_BUCKET_CAP } = loadTypeScriptModule('src/lib/rate-limit.ts');
  assert.equal(RATE_LIMIT_BUCKET_CAP, 10_000);

  const options = { keyPrefix: 'capacity-test', maxRequests: 1, windowMs: 60_000 };
  const requestFor = (id) => ({
    headers: new Headers({ 'x-real-ip': `2001:db8::${id.toString(16)}` }),
  });

  assert.equal(checkRateLimit(requestFor(0), options).limited, false);
  for (let index = 1; index < RATE_LIMIT_BUCKET_CAP; index += 1) {
    assert.equal(checkRateLimit(requestFor(index), options).limited, false);
  }

  assert.equal(
    checkRateLimit(requestFor(RATE_LIMIT_BUCKET_CAP + 1), options).limited,
    true,
    'Unknown identities must be rejected conservatively while all buckets are live',
  );
  assert.equal(
    checkRateLimit(requestFor(0), options).limited,
    true,
    'Saturation must not evict an existing active rate-limit bucket',
  );
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
  ka: ['placeholder', 'follow-up', 'custom forms', 'screen reader', 'channel manager', 'fit call', 'book now', 'feed +'],
  ru: ['founder-led', 'fake-', 'placeholder', 'account-команд', 'booking engine', 'follow-up', 'lazy loading', 'screen reader', 'hero-изображ', 'book now', 'alt-текст', 'fit call', 'channel manager', 'rate parity', 'beauty-бизнес', 'beauty-студ', 'medspa', 'на email'],
  tr: ['fake metrik', 'placeholder', 'lazy loading', 'channel manager', 'fit call', 'hero görsel', 'book now', 'alt metin', 'wellness', 'medspa'],
};

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
  const plausibleOrigin = 'https://plausible.io';
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

  assert(
    config.includes("key: 'Content-Security-Policy',"),
    'A small enforced Content-Security-Policy must be configured',
  );
  assert(config.includes("key: 'X-Frame-Options'"), 'X-Frame-Options must be configured');
  assert(config.includes("value: 'DENY'"), 'Normal routes must deny framing');
  assert(config.includes("value: 'SAMEORIGIN'"), 'Raw template routes must allow same-origin framing');
  assert(
    hasExactSecuritySource(config, plausibleOrigin),
    'The report-only CSP must allow the exact Plausible origin',
  );
  assert(
    !hasExactSecuritySource('script-src https://plausible.io.evil.example', plausibleOrigin),
    'A hostname containing the Plausible origin must not pass the exact-source check',
  );
}

function checkApiRoutesUseHardening() {
  for (const path of ['src/app/api/leads/route.ts', 'src/app/api/audits/route.ts']) {
    const route = readFileSync(path, 'utf8');

    assert(route.includes('validateApiRequestHeaders'), `${path} must validate request headers`);
    assert(route.includes('readApiJsonBody'), `${path} must parse a size-limited JSON object`);
    assert(route.includes('isAllowedHttpUrl'), `${path} must restrict submitted URL protocols`);
    assert(
      route.includes('allowRequestOrigin: true'),
      `${path} must accept its exact request origin for safe preview and alias deployments`,
    );
    assert(!route.includes('await request.json()'), `${path} must not read an unbounded JSON body`);
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

  const templateContent = templateContentFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  assert(!templateContent.includes('Template buyer review'), 'Template demos must not publish invented buyer reviews');
  collectTemplateRouteMatrix();
}

async function runWithConcurrency(items, concurrency, worker) {
  let cursor = 0;
  const workerCount = Math.min(concurrency, items.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        await worker(items[index], index);
      }
    }),
  );
}

async function checkTemplateRouteMatrix(baseUrl) {
  const routeMatrix = collectTemplateRouteMatrix().flatMap((template) =>
    template.slugs.flatMap((slug) => {
      const suffix = slug ? `/${slug}` : '';
      return [
        { kind: 'preview', path: `/preview/${template.id}${suffix}` },
        { kind: 'raw', path: `/template-sites/${template.id}${suffix}` },
      ];
    }),
  );
  assert.equal(routeMatrix.length, 362, 'Runtime smoke must cover all 362 preview and raw routes');

  const failures = [];
  await runWithConcurrency(routeMatrix, 8, async ({ kind, path }) => {
    try {
      const response = await fetch(new URL(path, baseUrl), {
        signal: AbortSignal.timeout(20_000),
      });
      assert.equal(response.status, 200, `${path} returned HTTP ${response.status}`);

      const html = await response.text();
      assert(html.length > 500, `${path} returned unexpectedly small HTML`);
      assert(/noindex/i.test(html), `${path} must be noindex`);
      assertNoRawMarkers(html, path);

      const enforcedCsp = response.headers.get('content-security-policy');
      const xFrameOptions = response.headers.get('x-frame-options');
      if (kind === 'raw') {
        assert(
          enforcedCsp?.includes("frame-ancestors 'self'"),
          `${path} must enforce same-origin framing`,
        );
        assert.equal(xFrameOptions, 'SAMEORIGIN', `${path} must send X-Frame-Options SAMEORIGIN`);
      } else {
        assert(
          enforcedCsp?.includes("frame-ancestors 'none'"),
          `${path} must deny framing`,
        );
        assert.equal(xFrameOptions, 'DENY', `${path} must send X-Frame-Options DENY`);
      }
    } catch (error) {
      failures.push(`${path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  assert.equal(
    failures.length,
    0,
    `Template route matrix failures (${failures.length}):\n${failures.slice(0, 12).join('\n')}`,
  );
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
  const enforcedCsp = headerResponse.headers.get('content-security-policy');
  const reportOnlyCsp = headerResponse.headers.get('content-security-policy-report-only');
  assert(enforcedCsp?.includes("base-uri 'self'"), 'Enforced CSP must restrict base-uri');
  assert(enforcedCsp?.includes("object-src 'none'"), 'Enforced CSP must disable objects');
  assert(enforcedCsp?.includes("form-action 'self'"), 'Enforced CSP must restrict forms');
  assert(enforcedCsp?.includes("frame-ancestors 'none'"), 'Normal routes must deny framing');
  assert.equal(headerResponse.headers.get('x-frame-options'), 'DENY');
  assert(
    hasExactSecuritySource(reportOnlyCsp, 'https://plausible.io'),
    'Report-only CSP must allow the exact Plausible origin',
  );
  assert.equal(headerResponse.headers.get('x-powered-by'), null, 'X-Powered-By must be disabled');

  await checkTemplateRouteMatrix(baseUrl);

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
  const sameOrigin = new URL(baseUrl).origin;
  const endpointCases = [
    {
      path: '/api/leads',
      unsafeUrlBody: {
        name: 'Mariam',
        email: 'mariam@example.com',
        message: 'Please contact me',
        websiteUrl: 'javascript:alert(1)',
      },
    },
    {
      path: '/api/audits',
      unsafeUrlBody: {
        name: 'Mariam',
        businessName: 'Seafront Rooms',
        email: 'mariam@example.com',
        sector: 'Hospitality',
        websiteUrl: 'file:///etc/passwd',
      },
    },
  ];
  let requestId = 1;

  for (const { path, unsafeUrlBody } of endpointCases) {
    const post = (body, headers = {}) => fetch(new URL(path, baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-locale': 'en',
        'x-real-ip': `198.51.100.${requestId++}`,
        ...headers,
      },
      body,
    });

    const cases = [
      { label: 'empty object', response: await post('{}'), status: 400 },
      { label: 'malformed JSON', response: await post('{"name":'), status: 400 },
      { label: 'null JSON', response: await post('null'), status: 400 },
      {
        label: 'unsupported media type',
        response: await post('{}', { 'Content-Type': 'text/plain' }),
        status: 415,
      },
      {
        label: 'cross-origin request',
        response: await post('{}', { Origin: 'https://attacker.example' }),
        status: 403,
      },
      {
        label: 'same-origin alias request',
        response: await post('{}', { Origin: sameOrigin }),
        status: 400,
      },
      {
        label: 'oversized JSON',
        response: await post(JSON.stringify({ message: 'x'.repeat(MAX_TEST_BODY_BYTES) })),
        status: 413,
      },
      {
        label: 'unsafe URL protocol',
        response: await post(JSON.stringify(unsafeUrlBody)),
        status: 400,
      },
    ];

    for (const testCase of cases) {
      assert.equal(
        testCase.response.status,
        testCase.status,
        `${path} ${testCase.label} returned HTTP ${testCase.response.status}`,
      );
    }
  }
}

async function main() {
  checkRequiredFiles();
  checkEnvExample();
  checkApiHttpUrlValidation();
  checkApiRequestHeaderValidation();
  await checkApiJsonBodyParsing();
  checkRateLimitIdentity();
  checkRateLimitBucketCap();
  checkI18nParity();
  checkSecurityConfig();
  checkApiRoutesUseHardening();
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
