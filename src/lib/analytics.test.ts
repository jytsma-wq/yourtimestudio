import { trackEvent, type AnalyticsEventProps } from './analytics';

const safeProps: AnalyticsEventProps = {
  location: 'pricing',
  package: 'starter',
};

trackEvent('Pricing CTA Clicked', safeProps);
trackEvent('Contact Form Submitted');
