import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  checkRateLimit,
  getRateLimitBucketCountForTests,
  MAX_RATE_LIMIT_BUCKETS,
  resetRateLimitForTests,
} from './rate-limit';

const options = {
  keyPrefix: 'test',
  maxRequests: 2,
  windowMs: 60_000,
};

function requestWithHeaders(headers: HeadersInit) {
  return new Request('https://batumilighthouse.com/api/leads', { headers });
}

afterEach(() => {
  resetRateLimitForTests();
  vi.restoreAllMocks();
});

describe('rate limiting', () => {
  it('cannot be bypassed by rotating the user agent', () => {
    const first = requestWithHeaders({ 'x-real-ip': '203.0.113.10', 'user-agent': 'one' });
    const second = requestWithHeaders({ 'x-real-ip': '203.0.113.10', 'user-agent': 'two' });
    const third = requestWithHeaders({ 'x-real-ip': '203.0.113.10', 'user-agent': 'three' });

    expect(checkRateLimit(first, options).limited).toBe(false);
    expect(checkRateLimit(second, options).limited).toBe(false);
    expect(checkRateLimit(third, options).limited).toBe(true);
  });

  it('uses the trusted real IP instead of attacker-controlled forwarded entries', () => {
    const first = requestWithHeaders({
      'x-real-ip': '203.0.113.11',
      'x-forwarded-for': '198.51.100.1, 203.0.113.11',
    });
    const second = requestWithHeaders({
      'x-real-ip': '203.0.113.11',
      'x-forwarded-for': '198.51.100.2, 203.0.113.11',
    });
    const third = requestWithHeaders({
      'x-real-ip': '203.0.113.11',
      'x-forwarded-for': '198.51.100.3, 203.0.113.11',
    });

    checkRateLimit(first, options);
    checkRateLimit(second, options);
    expect(checkRateLimit(third, options).limited).toBe(true);
  });

  it('keeps the in-memory bucket map bounded', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_000);

    for (let index = 0; index <= MAX_RATE_LIMIT_BUCKETS; index += 1) {
      const thirdOctet = Math.floor(index / 254);
      const fourthOctet = (index % 254) + 1;
      const request = requestWithHeaders({
        'x-real-ip': `10.0.${thirdOctet}.${fourthOctet}`,
      });
      checkRateLimit(request, { ...options, keyPrefix: `bucket-${index}` });
    }

    expect(getRateLimitBucketCountForTests()).toBe(MAX_RATE_LIMIT_BUCKETS);
  });
});
