import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, launchLocales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the requested locale is one we support at launch
  let locale = await requestLocale;

  if (!locale || !launchLocales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/content/messages/${locale}.json`)).default,
  };
});
