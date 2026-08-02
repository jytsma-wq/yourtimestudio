import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  readJsonObjectBody,
  validateApiRequestMetadata,
} from './api-request';

function jsonRequest(
  body: BodyInit,
  headers: HeadersInit = {},
  url = 'https://batumilighthouse.com/api/leads',
) {
  return new Request(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body,
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('API request validation', () => {
  it('rejects non-JSON media types and cross-origin browser requests', () => {
    const textRequest = new Request('https://batumilighthouse.com/api/leads', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: '{}',
    });
    expect(validateApiRequestMetadata(textRequest)).toEqual({
      code: 'unsupported_media_type',
      status: 415,
    });

    const crossOriginRequest = jsonRequest('{}', {
      origin: 'https://attacker.example',
      'sec-fetch-site': 'cross-site',
    });
    expect(validateApiRequestMetadata(crossOriginRequest)).toEqual({
      code: 'invalid_origin',
      status: 403,
    });
  });

  it('accepts the externally forwarded same origin', () => {
    const request = jsonRequest('{}', {
      host: '127.0.0.1:3000',
      origin: 'https://batumilighthouse.com',
      'x-forwarded-host': 'batumilighthouse.com',
      'x-forwarded-proto': 'https',
    }, 'http://127.0.0.1:3000/api/leads');

    expect(validateApiRequestMetadata(request)).toBeNull();
  });

  it('uses the configured public origin in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://batumilighthouse.com');
    const forgedForwardingRequest = jsonRequest('{}', {
      host: '127.0.0.1:3000',
      origin: 'https://attacker.example',
      'x-forwarded-host': 'attacker.example',
      'x-forwarded-proto': 'https',
    }, 'http://127.0.0.1:3000/api/leads');

    expect(validateApiRequestMetadata(forgedForwardingRequest)).toEqual({
      code: 'invalid_origin',
      status: 403,
    });
  });

  it('fails closed to the canonical origin when production configuration is invalid', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'not-a-url');
    const forgedForwardingRequest = jsonRequest('{}', {
      host: 'attacker.example',
      origin: 'https://attacker.example',
      'x-forwarded-host': 'attacker.example',
      'x-forwarded-proto': 'https',
    }, 'http://127.0.0.1:3000/api/leads');

    expect(validateApiRequestMetadata(forgedForwardingRequest)).toEqual({
      code: 'invalid_origin',
      status: 403,
    });
  });

  it('enforces both declared and streamed body limits', async () => {
    const declaredTooLarge = jsonRequest('{}', { 'content-length': '33000' });
    expect(validateApiRequestMetadata(declaredTooLarge)).toEqual({
      code: 'payload_too_large',
      status: 413,
    });

    const streamedTooLarge = jsonRequest(JSON.stringify({ value: 'x'.repeat(200) }));
    const parsed = await readJsonObjectBody(streamedTooLarge, 64);
    expect(parsed).toEqual({
      ok: false,
      error: { code: 'payload_too_large', status: 413 },
    });
  });

  it('accepts JSON objects and rejects malformed or non-object JSON', async () => {
    await expect(readJsonObjectBody(jsonRequest('{'))).resolves.toEqual({
      ok: false,
      error: { code: 'invalid_json', status: 400 },
    });
    await expect(readJsonObjectBody(jsonRequest('[]'))).resolves.toEqual({
      ok: false,
      error: { code: 'invalid_json', status: 400 },
    });
    await expect(readJsonObjectBody(jsonRequest('{"name":"Ada"}'))).resolves.toEqual({
      ok: true,
      data: { name: 'Ada' },
    });
  });
});
