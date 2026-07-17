export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

const CONSENT_KEY = 'batumi-lighthouse-cookie-consent';

function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;

  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function cleanProps(props?: AnalyticsProps) {
  if (!props) return undefined;

  return Object.fromEntries(
    Object.entries(props).filter((entry): entry is [string, string | number | boolean] => entry[1] !== undefined),
  );
}

export function trackEvent(eventName: string, props?: AnalyticsProps) {
  if (!hasAnalyticsConsent()) return;

  try {
    window.plausible?.(eventName, { props: cleanProps(props) });
  } catch {
    // Analytics must never block navigation, forms, or rendering.
  }
}
