import { siteConfig } from '@/lib/site-config';

export const COOKIE_CONSENT_KEY = `${siteConfig.slug}-cookie-consent`;
export const OPEN_COOKIE_SETTINGS_EVENT = `${siteConfig.slug}:open-cookie-settings`;

export function analyticsAllowedOnCurrentHost(): boolean {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return false;

  const configuredDomain = siteConfig.analytics.domain.trim().toLowerCase();
  const currentHost = window.location.hostname.toLowerCase();

  if (!configuredDomain) return false;
  return currentHost === configuredDomain || currentHost.endsWith(`.${configuredDomain}`);
}
