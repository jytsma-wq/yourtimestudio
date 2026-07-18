import type { ContentLocaleConfig, SEOContent } from "./content-source";

export type LocalizedRecord<T> = Record<string, T | undefined>;

export type LocalizationOptions = {
  locale: string;
  fallbackLocale?: string;
  defaultLocale?: string;
  config?: ContentLocaleConfig;
};

export type MissingTranslation = {
  field: string;
  locale: string;
  fallbackLocale: string;
};

type SlugLike = string | { current?: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function localeCandidates(options: LocalizationOptions) {
  const candidates = [
    options.locale,
    options.fallbackLocale,
    options.defaultLocale,
    options.config?.fallbackLocale,
    options.config?.defaultLocale
  ];

  return candidates.filter((candidate, index): candidate is string => {
    return Boolean(candidate) && candidates.indexOf(candidate) === index;
  });
}

export function getLocalizedValue<T>(
  value: T | LocalizedRecord<T> | null | undefined,
  options: LocalizationOptions
): T | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (!isRecord(value)) {
    return value as T;
  }

  for (const locale of localeCandidates(options)) {
    const localizedValue = value[locale];

    if (localizedValue !== undefined && localizedValue !== null) {
      return localizedValue as T;
    }
  }

  return value as T;
}

export function getLocalizedSlug(
  value: SlugLike | LocalizedRecord<SlugLike> | null | undefined,
  options: LocalizationOptions
): string {
  const localizedSlug = getLocalizedValue<SlugLike>(value, options);

  if (typeof localizedSlug === "string") {
    return localizedSlug;
  }

  if (isRecord(localizedSlug) && typeof localizedSlug.current === "string") {
    return localizedSlug.current;
  }

  return "";
}

export function getLocalizedSEO(
  value: SEOContent | LocalizedRecord<SEOContent> | null | undefined,
  options: LocalizationOptions
): SEOContent | undefined {
  return getLocalizedValue<SEOContent>(value, options);
}

export function getDirectionForLocale(locale: string, config: ContentLocaleConfig) {
  return config.directions[locale] ?? config.directions[config.fallbackLocale] ?? "ltr";
}

export function detectMissingTranslations(
  fields: Record<string, LocalizedRecord<unknown> | unknown>,
  locales: readonly string[],
  fallbackLocale: string
): MissingTranslation[] {
  const missing: MissingTranslation[] = [];

  for (const [field, value] of Object.entries(fields)) {
    if (!isRecord(value)) {
      continue;
    }

    for (const locale of locales) {
      if (locale === fallbackLocale) {
        continue;
      }

      if (value[locale] === undefined || value[locale] === null) {
        missing.push({
          field,
          locale,
          fallbackLocale
        });
      }
    }
  }

  return missing;
}
