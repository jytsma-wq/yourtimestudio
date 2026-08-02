import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const baseUrl = process.env.SMOKE_BASE_URL;
assert(baseUrl, 'SMOKE_BASE_URL is required');

const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || baseUrl).origin;
const expectFormsReady = process.env.EXPECT_FORM_INBOX_READY !== 'false';
let addressSuffix = 20;

function nextIp() {
  addressSuffix += 1;
  return `198.51.100.${addressSuffix}`;
}

async function post(path, body, options = {}) {
  const headers = {
    'content-type': options.contentType ?? 'application/json',
    'x-real-ip': options.ip ?? nextIp(),
    'user-agent': options.userAgent ?? 'batumi-lighthouse-ci-smoke',
    ...options.headers,
  };

  return fetch(new URL(path, baseUrl), {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

const validLead = {
  name: 'CI Smoke Test',
  email: 'ci-smoke@example.com',
  message: 'Disposable production server verification.',
  websiteUrl: 'https://example.com/contact',
};

const validAudit = {
  name: 'CI Smoke Test',
  businessName: 'CI Test Business',
  email: 'ci-smoke@example.com',
  sector: 'hospitality',
  websiteUrl: 'https://example.com',
};

async function main() {
  const caddyfile = readFileSync('Caddyfile', 'utf8');
  assert(!caddyfile.includes('XTransformPort'), 'Caddy must not proxy to a query-selected port');
  assert(caddyfile.includes('reverse_proxy localhost:3000'), 'Caddy must proxy only to the fixed app port');
  assert(caddyfile.includes('header_up X-Forwarded-Host {host}'), 'Caddy must overwrite the forwarded host');
  assert(caddyfile.includes('header_up X-Forwarded-Proto https'), 'Caddy must preserve the public HTTPS scheme');

  const normalPageResponse = await fetch(new URL('/en', baseUrl));
  const normalCsp = normalPageResponse.headers.get('content-security-policy') || '';
  assert(normalCsp.includes("frame-ancestors 'none'"), 'Normal pages must enforce frame blocking');
  assert(normalCsp.includes('https://plausible.io'), 'Enforced CSP must allow configured Plausible delivery');
  assert.equal(normalPageResponse.headers.get('x-frame-options'), 'DENY');

  const templateResponse = await fetch(new URL('/template-sites/hotel-01-luxury', baseUrl));
  const templateCsp = templateResponse.headers.get('content-security-policy') || '';
  assert(templateCsp.includes("frame-ancestors 'self'"), 'Raw templates must allow same-origin framing');
  assert.equal(templateResponse.headers.get('x-frame-options'), 'SAMEORIGIN');

  const healthResponse = await fetch(new URL('/api', baseUrl));
  assert.equal(healthResponse.status, 200, 'API health must report a ready database');
  const health = await healthResponse.json();
  assert.equal(health.database, 'ready');
  assert.equal(health.formsReady, expectFormsReady);

  for (const [path, marker] of [
    ['/contact', 'contact-inbox-unavailable'],
    ['/website-audits', 'audit-inbox-unavailable'],
  ]) {
    const response = await fetch(new URL(path, baseUrl));
    assert.equal(response.status, 200, `${path} must render`);
    const html = await response.text();
    assert.equal(
      html.includes(marker),
      !expectFormsReady,
      `${path} must reflect the runtime FORM_INBOX_READY state`,
    );
  }

  if (!expectFormsReady) {
    for (const locale of ['en', 'ka', 'ru', 'tr']) {
      for (const [path, payload] of [
        ['/api/leads', validLead],
        ['/api/audits', validAudit],
      ]) {
        const response = await post(path, payload, { headers: { 'x-locale': locale } });
        assert.equal(response.status, 503, `${path} must fail closed for ${locale}`);
        const result = await response.json();
        assert(
          result.error?.includes('hello@batumilighthouse.com'),
          `${path} must provide the direct email address for ${locale}`,
        );
      }
    }

    console.log('Form inbox fail-closed smoke checks passed');
    return;
  }

  assert.equal(
    (await post('/api/leads', '{}', { contentType: 'text/plain' })).status,
    415,
    'Lead API must reject non-JSON content types',
  );
  assert.equal(
    (
      await post('/api/leads', validLead, {
        headers: {
          origin: 'https://attacker.example',
          'sec-fetch-site': 'cross-site',
        },
      })
    ).status,
    403,
    'Lead API must reject cross-origin browser submissions',
  );
  assert.equal(
    (
      await post('/api/leads', validLead, {
        headers: { origin, 'sec-fetch-site': 'same-origin' },
      })
    ).status,
    201,
    'Lead API must accept a same-origin valid submission when the inbox is ready',
  );
  assert.equal(
    (await post('/api/leads', JSON.stringify({ value: 'x'.repeat(33 * 1024) }))).status,
    413,
    'Lead API must reject oversized bodies',
  );
  assert.equal(
    (await post('/api/leads', '{')).status,
    400,
    'Lead API must reject malformed JSON',
  );
  assert.equal(
    (await post('/api/leads', { ...validLead, name: '   ' })).status,
    400,
    'Lead API must reject whitespace-only required strings',
  );
  assert.equal(
    (await post('/api/leads', { ...validLead, websiteUrl: 'javascript:alert(1)' })).status,
    400,
    'Lead API must reject non-HTTP(S) URLs',
  );
  assert.equal(
    (await post('/api/leads', { ...validLead, unexpected: true })).status,
    400,
    'Lead API must reject unknown keys',
  );

  assert.equal(
    (await post('/api/audits', validAudit)).status,
    201,
    'Audit API must accept a valid submission when the inbox is ready',
  );
  assert.equal(
    (await post('/api/audits', { ...validAudit, websiteUrl: 'ftp://example.com' })).status,
    400,
    'Audit API must reject non-HTTP(S) URLs',
  );
  assert.equal(
    (await post('/api/audits', { ...validAudit, unexpected: true })).status,
    400,
    'Audit API must reject unknown keys',
  );

  const rateLimitedIp = '203.0.113.77';
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await post('/api/leads', {}, {
      ip: rateLimitedIp,
      userAgent: `rotating-user-agent-${attempt}`,
      headers: { 'x-forwarded-for': `198.51.100.${attempt}, ${rateLimitedIp}` },
    });
    assert.equal(
      response.status,
      attempt <= 5 ? 400 : 429,
      'Rotating User-Agent or forwarded entries must not bypass the IP limit',
    );
  }

  console.log('API security smoke checks passed');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
