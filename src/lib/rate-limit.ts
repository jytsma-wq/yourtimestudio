import { isIP } from 'node:net';

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
export const MAX_RATE_LIMIT_BUCKETS = 2_000;

function validIp(value: string | undefined) {
  const candidate = value?.trim();
  return candidate && candidate.length <= 64 && isIP(candidate) ? candidate.toLowerCase() : null;
}

function clientIdentifier(request: Pick<Request, 'headers'>) {
  // Caddy overwrites X-Real-IP and X-Forwarded-For at the public trust boundary.
  // If neither trusted proxy header is present, use one shared fail-closed bucket.
  const realIp = validIp(request.headers.get('x-real-ip') ?? undefined);
  if (realIp) return realIp;

  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',').reverse();
  for (const candidate of forwardedFor ?? []) {
    const ip = validIp(candidate);
    if (ip) return ip;
  }

  return 'unknown';
}

function pruneExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function evictOldestBucket() {
  let oldestKey: string | undefined;
  let earliestReset = Number.POSITIVE_INFINITY;

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt < earliestReset) {
      oldestKey = key;
      earliestReset = bucket.resetAt;
    }
  }

  if (oldestKey) buckets.delete(oldestKey);
}

export function checkRateLimit(request: Pick<Request, 'headers'>, options: RateLimitOptions) {
  const now = Date.now();
  const key = `${options.keyPrefix}:${clientIdentifier(request)}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    pruneExpiredBuckets(now);
    if (!buckets.has(key) && buckets.size >= MAX_RATE_LIMIT_BUCKETS) {
      evictOldestBucket();
    }

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

export function resetRateLimitForTests() {
  buckets.clear();
}

export function getRateLimitBucketCountForTests() {
  return buckets.size;
}
