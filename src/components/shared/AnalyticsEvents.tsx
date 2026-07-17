'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>('[data-analytics-event]');
      const eventName = element?.dataset.analyticsEvent;
      if (!element || !eventName) return;

      const link = element instanceof HTMLAnchorElement ? element : element.closest<HTMLAnchorElement>('a');
      const label = (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);

      trackEvent(eventName, {
        href: link?.getAttribute('href') || undefined,
        label: label || undefined,
        section: element.dataset.analyticsSection,
        item: element.dataset.analyticsItem,
      });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
