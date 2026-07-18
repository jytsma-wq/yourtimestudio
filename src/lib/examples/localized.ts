import { getTranslations } from 'next-intl/server';
import { type Example, examples, featuredExamples, getExampleBySlug } from '@/content/examples';
import { type Locale } from '@/lib/i18n/config';

type ExampleTranslations = Awaited<ReturnType<typeof getTranslations>>;

function localizeExample(example: Example, t: ExampleTranslations): Example {
  const key = example.id;

  return {
    ...example,
    title: t(`${key}.title`),
    businessType: t(`${key}.businessType`),
    shortDescription: t(`${key}.shortDescription`),
    demonstratedProblem: t(`${key}.demonstratedProblem`),
    problem: t(`${key}.problem`),
    solution: t(`${key}.solution`),
    modules: t.raw(`${key}.modules`) as string[],
    features: t.raw(`${key}.features`) as string[],
    clientLearning: t.raw(`${key}.clientLearning`) as string[],
    imageAlt: t(`${key}.imageAlt`),
    disclaimer: t(`${key}.disclaimer`),
    whatItShows: t.raw(`${key}.whatItShows`) as string[],
    ctaLabel: t(`${key}.ctaLabel`),
  };
}

async function getExampleTranslations(locale?: Locale) {
  return locale
    ? getTranslations({ locale, namespace: 'examplesUi.items' })
    : getTranslations('examplesUi.items');
}

export async function getLocalizedExamples(locale?: Locale) {
  const t = await getExampleTranslations(locale);
  return examples.map((example) => localizeExample(example, t));
}

export async function getLocalizedFeaturedExamples(locale?: Locale) {
  const t = await getExampleTranslations(locale);
  return featuredExamples.map((example) => localizeExample(example, t));
}

export async function getLocalizedExampleBySlug(slug: string, locale?: Locale) {
  const example = getExampleBySlug(slug);

  if (!example) {
    return undefined;
  }

  const t = await getExampleTranslations(locale);
  return localizeExample(example, t);
}
