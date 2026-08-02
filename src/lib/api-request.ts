export const MAX_API_BODY_BYTES = 16 * 1024;
export const MAX_WEBSITE_URL_LENGTH = 500;

export type ApiRequestErrorCode =
  | 'origin_not_allowed'
  | 'unsupported_media_type'
  | 'payload_too_large'
  | 'invalid_json'
  | 'invalid_body';

type ApiRequestFailure = {
  ok: false;
  status: 400 | 403 | 413 | 415;
  code: ApiRequestErrorCode;
};

type ApiRequestHeaderOptions = {
  allowedOrigins: readonly string[];
  allowRequestOrigin?: boolean;
  maxBytes?: number;
};

type ApiJsonSuccess = {
  ok: true;
  body: Record<string, unknown>;
};

const validHeaders = { ok: true } as const;

function failure(
  status: ApiRequestFailure['status'],
  code: ApiRequestErrorCode,
): ApiRequestFailure {
  return { ok: false, status, code };
}

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function requestHeaderOrigin(request: Request): string | null {
  const host = request.headers.get('host')?.trim();
  if (!host) return null;

  const requestProtocol = normalizeOrigin(request.url)?.split('://', 1)[0];
  const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',', 1)[0]?.trim();
  const protocol = forwardedProtocol === 'http' || forwardedProtocol === 'https'
    ? forwardedProtocol
    : requestProtocol;

  return protocol ? normalizeOrigin(`${protocol}://${host}`) : null;
}

function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  return (
    normalized === 'localhost' ||
    normalized === '127.0.0.1' ||
    normalized === '::1' ||
    normalized === '0.0.0.0' ||
    normalized === '::'
  );
}

function isSafeLoopbackAlias(currentOrigin: string, headerOrigin: string): boolean {
  const currentUrl = new URL(currentOrigin);
  const headerUrl = new URL(headerOrigin);

  return (
    currentUrl.protocol === headerUrl.protocol &&
    currentUrl.port === headerUrl.port &&
    isLoopbackHostname(currentUrl.hostname) &&
    isLoopbackHostname(headerUrl.hostname)
  );
}

export function validateApiRequestHeaders(
  request: Request,
  options: ApiRequestHeaderOptions,
): typeof validHeaders | ApiRequestFailure {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase();
  const isJson = contentType === 'application/json' || contentType?.endsWith('+json');

  if (!isJson) {
    return failure(415, 'unsupported_media_type');
  }

  const originHeader = request.headers.get('origin');
  if (originHeader) {
    const requestOrigin = normalizeOrigin(originHeader);
    const allowedOrigins = new Set(
      options.allowedOrigins
        .map(normalizeOrigin)
        .filter((origin): origin is string => Boolean(origin)),
    );

    if (options.allowRequestOrigin) {
      const currentOrigin = normalizeOrigin(request.url);
      if (currentOrigin) allowedOrigins.add(currentOrigin);

      if (currentOrigin && requestOrigin && isSafeLoopbackAlias(currentOrigin, requestOrigin)) {
        allowedOrigins.add(requestOrigin);
      }

      // Next's standalone server can normalize request.url to `localhost`
      // while the browser reached the same server through 127.0.0.1 or an alias.
      const headerOrigin = requestHeaderOrigin(request);
      if (headerOrigin && currentOrigin && isSafeLoopbackAlias(currentOrigin, headerOrigin)) {
        allowedOrigins.add(headerOrigin);
      }
    }

    if (!requestOrigin || !allowedOrigins.has(requestOrigin)) {
      return failure(403, 'origin_not_allowed');
    }
  } else if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return failure(403, 'origin_not_allowed');
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength && /^\d+$/.test(contentLength)) {
    const maxBytes = options.maxBytes ?? MAX_API_BODY_BYTES;
    if (Number(contentLength) > maxBytes) {
      return failure(413, 'payload_too_large');
    }
  }

  return validHeaders;
}

export async function readApiJsonBody(
  request: Request,
  maxBytes = MAX_API_BODY_BYTES,
): Promise<ApiJsonSuccess | ApiRequestFailure> {
  if (!request.body) {
    return failure(400, 'invalid_json');
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return failure(413, 'payload_too_large');
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const body: unknown = JSON.parse(text);

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return failure(400, 'invalid_body');
    }

    return { ok: true, body: body as Record<string, unknown> };
  } catch {
    try {
      await reader.cancel();
    } catch {
      // The stream may already be errored or closed.
    }
    return failure(400, 'invalid_json');
  } finally {
    reader.releaseLock();
  }
}

export function isAllowedHttpUrl(value: string): boolean {
  const normalizedValue = value.trim();

  if (!normalizedValue || normalizedValue.length > MAX_WEBSITE_URL_LENGTH) {
    return false;
  }

  try {
    const url = new URL(normalizedValue);

    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
