'use client';

import type { ComponentProps, MouseEvent } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { trackEvent, type AnalyticsEventProps } from '@/lib/analytics';

type TrackedLinkProps = Omit<ComponentProps<typeof Link>, 'onClick'> & {
  eventName: string;
  eventProps?: AnalyticsEventProps;
  onClick?: ComponentProps<typeof Link>['onClick'];
};

export function TrackedLink({
  eventName,
  eventProps,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventProps);
    onClick?.(event);
  }

  return <Link {...props} onClick={handleClick} />;
}
