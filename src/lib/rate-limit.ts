import type { NextRequest } from 'next/server';

type RateLimitOptions = {
  keyPrefix: string;
  maxRequests: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function clientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const userAgent = request.headers.get('user-agent')?.slice(0, 120) || 'unknown';

  return `${forwardedFor || realIp || 'local'}:${userAgent}`;
}

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 500) return;

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(request: NextRequest, options: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${options.keyPrefix}:${clientIdentifier(request)}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const bucket = { count: 1, resetAt: now + options.windowMs };
    buckets.set(key, bucket);

    return {
      limited: false,
      remaining: options.maxRequests - 1,
      resetAt: bucket.resetAt,
      retryAfter: 0,
    };
  }

  if (existing.count >= options.maxRequests) {
    return {
      limited: true,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;

  return {
    limited: false,
    remaining: options.maxRequests - existing.count,
    resetAt: existing.resetAt,
    retryAfter: 0,
  };
}
