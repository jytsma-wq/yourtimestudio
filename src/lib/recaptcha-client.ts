'use client';

import { recaptchaActions } from '@/lib/recaptcha-actions';

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
export const recaptchaScriptSrc = recaptchaSiteKey
  ? `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`
  : '';

export async function getRecaptchaToken(action: keyof typeof recaptchaActions): Promise<string> {
  if (!recaptchaSiteKey) {
    throw new Error('reCAPTCHA site key is not configured.');
  }

  const grecaptcha = window.grecaptcha;

  if (!grecaptcha) {
    throw new Error('reCAPTCHA is not ready.');
  }

  await new Promise<void>((resolve) => {
    grecaptcha.ready(resolve);
  });

  return grecaptcha.execute(recaptchaSiteKey, {
    action: recaptchaActions[action],
  });
}
