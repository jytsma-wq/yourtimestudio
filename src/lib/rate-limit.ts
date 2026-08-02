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

export const RATE_LIMIT_BUCKET_CAP = 10_000;

const buckets = new Map<string, Bucket>();
const PRUNE_INTERVAL_MS = 60_000;
const CAPACITY_PRUNE_INTERVAL_MS = 1_000;
const SATURATION_RETRY_AFTER_SECONDS = 60;
let nextPruneAt = 0;
let nextCapacityPruneAt = 0;

function clientIdentifier(request: NextRequest) {
  const realIp = request.headers.get('x-real-ip')?.trim().slice(0, 64);
  const forwardedFor = request.headers
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim()
    .slice(0, 64);

  return realIp || forwardedFor || 'local';
}

function removeExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function pruneExpiredBuckets(now: number) {
  if (now < nextPruneAt) return;

  nextPruneAt = now + PRUNE_INTERVAL_MS;
  nextCapacityPruneAt = now + CAPACITY_PRUNE_INTERVAL_MS;
  removeExpiredBuckets(now);
}

function hasRoomForBucket(now: number) {
  if (buckets.size >= RATE_LIMIT_BUCKET_CAP && now >= nextCapacityPruneAt) {
    nextCapacityPruneAt = now + CAPACITY_PRUNE_INTERVAL_MS;
    removeExpiredBuckets(now);
  }

  return buckets.size < RATE_LIMIT_BUCKET_CAP;
}

export function checkRateLimit(request: NextRequest, options: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${options.keyPrefix}:${clientIdentifier(request)}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (existing) buckets.delete(key);
    if (!hasRoomForBucket(now)) {
      return {
        limited: true,
        remaining: 0,
        resetAt: now + SATURATION_RETRY_AFTER_SECONDS * 1000,
        retryAfter: SATURATION_RETRY_AFTER_SECONDS,
      };
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
