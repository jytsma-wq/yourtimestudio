export const MAX_API_BODY_BYTES = 32 * 1024;
const DEFAULT_PRODUCTION_ORIGIN = 'https://batumilighthouse.com';

export type ApiRequestErrorCode =
  | 'invalid_json'
  | 'invalid_origin'
  | 'payload_too_large'
  | 'unsupported_media_type';

export type ApiRequestError = {
  code: ApiRequestErrorCode;
  status: 400 | 403 | 413 | 415;
};

type JsonObject = Record<string, unknown>;

function firstHeaderValue(value: string | null) {
  return value?.split(',')[0]?.trim() || null;
}

function expectedRequestOrigin(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    try {
      const configuredOrigin = new URL(
        process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_PRODUCTION_ORIGIN,
      );
      if (['http:', 'https:'].includes(configuredOrigin.protocol)) {
        return configuredOrigin.origin;
      }
    } catch {
      // Never trust proxy headers as an origin authority in production.
    }

    return DEFAULT_PRODUCTION_ORIGIN;
  }

  const requestUrl = new URL(request.url);
  const forwardedHost = firstHeaderValue(request.headers.get('x-forwarded-host'));
  const host = forwardedHost || request.headers.get('host')?.trim() || requestUrl.host;
  const forwardedProtocol = firstHeaderValue(request.headers.get('x-forwarded-proto'));
  const protocol = forwardedProtocol || requestUrl.protocol.replace(':', '');

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return requestUrl.origin;
  }
}

function isJsonContentType(value: string | null) {
  const mediaType = value?.split(';', 1)[0]?.trim().toLowerCase();
  return mediaType === 'application/json' || Boolean(mediaType?.startsWith('application/') && mediaType.endsWith('+json'));
}

export function validateApiRequestMetadata(
  request: Request,
  maxBytes = MAX_API_BODY_BYTES,
): ApiRequestError | null {
  if (!isJsonContentType(request.headers.get('content-type'))) {
    return { code: 'unsupported_media_type', status: 415 };
  }

  const fetchSite = request.headers.get('sec-fetch-site')?.toLowerCase();
  if (fetchSite === 'cross-site') {
    return { code: 'invalid_origin', status: 403 };
  }

  const originHeader = request.headers.get('origin');
  if (originHeader) {
    try {
      const origin = new URL(originHeader);
      if (
        !['http:', 'https:'].includes(origin.protocol) ||
        origin.origin !== expectedRequestOrigin(request)
      ) {
        return { code: 'invalid_origin', status: 403 };
      }
    } catch {
      return { code: 'invalid_origin', status: 403 };
    }
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    if (!/^\d+$/.test(contentLength.trim())) {
      return { code: 'invalid_json', status: 400 };
    }

    const declaredBytes = Number(contentLength);
    if (!Number.isSafeInteger(declaredBytes) || declaredBytes > maxBytes) {
      return { code: 'payload_too_large', status: 413 };
    }
  }

  return null;
}

export async function readJsonObjectBody(
  request: Request,
  maxBytes = MAX_API_BODY_BYTES,
): Promise<{ ok: true; data: JsonObject } | { ok: false; error: ApiRequestError }> {
  if (!request.body) {
    return { ok: false, error: { code: 'invalid_json', status: 400 } };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, error: { code: 'payload_too_large', status: 413 } };
      }

      chunks.push(value);
    }

    const bodyBytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const text = new TextDecoder('utf-8', { fatal: true }).decode(bodyBytes);
    const data: unknown = JSON.parse(text);
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      return { ok: false, error: { code: 'invalid_json', status: 400 } };
    }

    return { ok: true, data: data as JsonObject };
  } catch {
    return { ok: false, error: { code: 'invalid_json', status: 400 } };
  } finally {
    reader.releaseLock();
  }
}
