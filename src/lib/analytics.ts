export type AnalyticsEventProps = Record<string, string | number | boolean | null | undefined>;

type PlausibleProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: PlausibleProps }) => void;
  }
}

function cleanProps(props?: AnalyticsEventProps): PlausibleProps | undefined {
  if (!props) return undefined;

  const cleaned: PlausibleProps = {};

  for (const [key, value] of Object.entries(props)) {
    if (value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

export function trackEvent(name: string, props?: AnalyticsEventProps) {
  if (typeof window === 'undefined' || typeof window.plausible !== 'function') {
    return;
  }

  const cleanedProps = cleanProps(props);

  try {
    window.plausible(name, cleanedProps ? { props: cleanedProps } : undefined);
  } catch {
    // Analytics must never break the user flow.
  }
}
