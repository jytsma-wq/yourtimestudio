const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const DEFAULT_MINIMUM_SCORE = 0.5;

export interface RecaptchaVerificationResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export interface RecaptchaResult {
  success: boolean;
  reason?: string;
}

interface VerifyRecaptchaOptions {
  token: string | undefined;
  expectedAction: string;
  remoteIp?: string | null;
  minimumScore?: number;
  fetchImpl?: typeof fetch;
}

function minimumScore(): number {
  const configured = Number(process.env.RECAPTCHA_MIN_SCORE);
  return Number.isFinite(configured) ? configured : DEFAULT_MINIMUM_SCORE;
}

export function assessRecaptchaVerification(
  verification: RecaptchaVerificationResponse,
  expectedAction: string,
  scoreThreshold = minimumScore()
): RecaptchaResult {
  if (!verification.success) {
    return { success: false, reason: 'recaptcha_failed' };
  }

  if (verification.action !== expectedAction) {
    return { success: false, reason: 'recaptcha_action_mismatch' };
  }

  if (typeof verification.score !== 'number' || verification.score < scoreThreshold) {
    return { success: false, reason: 'recaptcha_low_score' };
  }

  return { success: true };
}

export async function verifyRecaptchaToken({
  token,
  expectedAction,
  remoteIp,
  minimumScore: scoreThreshold = minimumScore(),
  fetchImpl = fetch,
}: VerifyRecaptchaOptions): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const trimmedToken = token?.trim();

  if (!secret || !trimmedToken) {
    console.warn('reCAPTCHA verification skipped: missing secret key or token.');
    return { success: false, reason: 'recaptcha_missing' };
  }

  const body = new URLSearchParams({
    secret,
    response: trimmedToken,
  });

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  try {
    const response = await fetchImpl(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      console.error('reCAPTCHA verification request failed:', response.status);
      return { success: false, reason: 'recaptcha_request_failed' };
    }

    const verification = (await response.json()) as RecaptchaVerificationResponse;
    const result = assessRecaptchaVerification(verification, expectedAction, scoreThreshold);

    if (!result.success) {
      console.warn('reCAPTCHA verification failed:', {
        reason: result.reason,
        errors: verification['error-codes'],
        action: verification.action,
        score: verification.score,
      });
    }

    return result;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, reason: 'recaptcha_error' };
  }
}
