/**
 * Internationalization configuration.
 *
 * Locales:
 *   en – English  (default, served at root `/`)
 *   ka – Georgian (served at `/ka/`)
 *   ru – Russian  (served at `/ru/`)
 *   tr – Turkish  (served at `/tr/`)
 */

export const locales = ['en', 'ka', 'ru', 'tr'] as const;

export type Locale = (typeof locales)[number];

/** The locale served without a URL prefix. */
export const defaultLocale: Locale = 'en';

/** All locales are fully implemented and available in the UI. */
export const launchLocales: Locale[] = ['en', 'ka', 'ru', 'tr'];

/** Human-readable labels for the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский',
  tr: 'Türkçe',
};
