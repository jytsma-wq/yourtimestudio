import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, CalendarDays, Check, ChevronDown, MapPin } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PhotographySceneBoard } from '@/components/photography/PhotographySceneBoard';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';

const shootTypes = ['hospitality', 'clinics', 'beauty', 'foodProducts'] as const;
const deliverables = ['planning', 'direction', 'editing', 'delivery'] as const;
const shootOptions = ['focused', 'story', 'website'] as const;
const socialOutputs = ['website', 'reels', 'feed', 'google'] as const;
const processSteps = ['brief', 'plan', 'shoot', 'deliver'] as const;
const faqItems = ['webOnly', 'extras', 'rights', 'delivery', 'clinics'] as const;

const scenes = [
  { src: '/images/studio-scenes/hospitality-hero.webp', key: 'hospitality', format: '16:9' },
  { src: '/images/studio-scenes/beauty-studio.webp', key: 'beauty', format: '4:5' },
  { src: '/images/studio-scenes/clinic-story.webp', key: 'clinics', format: '16:10' },
  { src: '/images/studio-scenes/food-story.webp', key: 'foodProducts', format: '3:2' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'photographyPage.meta' });

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/photography',
    locale: locale as Locale,
  });
}

export function generateStaticParams() {
  return launchLocales.map((locale) => ({ locale }));
}

export default async function PhotographyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('photographyPage');

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#111312] text-brand-cream">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/studio-scenes/hospitality-hero.webp"
            alt={t('shootTypes.items.hospitality.body')}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[64%_center]"
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,19,18,0.97)_0%,rgba(17,19,18,0.82)_46%,rgba(17,19,18,0.18)_82%)] max-md:bg-[linear-gradient(180deg,rgba(17,19,18,0.9),rgba(17,19,18,0.62))]"
          aria-hidden="true"
        />

        <div className="mx-auto flex min-h-[44rem] max-w-[var(--hero-max-width)] flex-col px-[var(--container-padding)] pb-9 pt-8 lg:min-h-[calc(100svh-7rem)]">
          <div className="flex items-center justify-between gap-6 border-b border-brand-cream/25 pb-4 text-xs font-semibold uppercase text-brand-cream/70">
            <span>{t('hero.eyebrow')}</span>
            <span className="hidden md:block">{t('social.stage.disclosure')}</span>
          </div>

          <div className="my-auto max-w-5xl py-14">
            <h1
              className={
                locale === 'ka'
                  ? 'max-w-[18ch] font-serif text-[2rem] font-medium leading-[1.04] text-brand-cream min-[360px]:text-[2.35rem] sm:text-[3.5rem] lg:text-[4.8rem]'
                  : 'max-w-[13ch] font-serif text-[3.25rem] font-medium leading-[0.92] text-brand-cream sm:text-7xl lg:text-[6.6rem]'
              }
            >
              {t('hero.title')}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-[1.75] text-brand-cream/78 md:text-xl">
              {t('hero.body')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-none bg-brand-serene-coral text-brand-charcoal hover:bg-brand-cream">
                <Link
                  href="/contact"
                  data-analytics-event="photography_contact_cta_click"
                  data-analytics-section="photography_hero"
                >
                  {t('hero.primaryCta')}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-brand-cream/45 bg-transparent text-brand-cream hover:bg-brand-cream hover:text-brand-charcoal">
                <a href="#shoot-options">{t('hero.secondaryCta')}</a>
              </Button>
            </div>
          </div>

          <ul className="grid border-t border-brand-cream/25 text-sm text-brand-cream/72 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <li key={index} className="flex min-h-14 items-center border-brand-cream/20 py-3 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                {t(`hero.proof.${index}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section variant="dark" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-brand-serene-coral">{t('social.eyebrow')}</p>
            <h2 className="mt-4 max-w-[14ch] font-serif text-5xl font-medium leading-[0.98] text-brand-cream md:text-6xl">
              {t('social.heading')}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-[1.75] text-brand-cream/72">{t('social.body')}</p>
            <p className="mt-5 border-l border-brand-serene-coral pl-5 font-serif text-2xl font-medium text-brand-cream">
              {t('social.statement')}
            </p>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <PhotographySceneBoard
            ariaLabel={t('social.stage.ariaLabel')}
            heading={t('social.stage.contactSheet')}
            disclosure={t('social.stage.disclosure')}
            scenes={scenes.map((scene) => ({
              src: scene.src,
              alt: t(`shootTypes.items.${scene.key}.body`),
              title: t(`shootTypes.items.${scene.key}.title`),
              format: scene.format,
            }))}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <figure className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src="/images/studio-scenes/beauty-studio.webp"
                alt={t('shootTypes.items.beauty.body')}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-5 text-xs font-semibold uppercase text-muted-foreground">
              <span>{t('social.stage.portrait')}</span>
              <span>04:05</span>
            </figcaption>
          </figure>

          <div>
            <p className="text-sm font-semibold text-navy">{t('shootTypes.eyebrow')}</p>
            <h2 className="mt-4 max-w-[13ch] font-serif text-5xl font-medium leading-[0.98] md:text-6xl">
              {t('shootTypes.heading')}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-[1.75] text-muted-foreground">{t('shootTypes.body')}</p>

            <div className="mt-10 border-y border-border">
              {shootTypes.map((key) => (
                <article key={key} className="grid gap-3 border-b border-border py-6 last:border-b-0 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-8">
                  <h3 className="font-serif text-2xl font-medium leading-tight md:text-3xl">{t(`shootTypes.items.${key}.title`)}</h3>
                  <p className="leading-[1.75] text-muted-foreground">{t(`shootTypes.items.${key}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-navy">{t('deliverables.eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl font-medium md:text-5xl">{t('deliverables.heading')}</h2>
            <p className="mt-4 text-lg leading-[1.75] text-muted-foreground">{t('deliverables.body')}</p>
          </div>
          <div className="mt-9 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((key) => (
              <article key={key} className="py-6 sm:border-r sm:border-border sm:px-6 sm:odd:pl-0 lg:odd:pl-6 lg:first:pl-0 lg:last:border-r-0">
                <h3 className="text-lg font-semibold">{t(`deliverables.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{t(`deliverables.items.${key}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <section className="overflow-hidden bg-brand-serene-coral text-brand-charcoal">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[28rem] lg:min-h-[48rem]">
            <Image
              src="/images/studio-scenes/food-story.webp"
              alt={t('shootTypes.items.foodProducts.body')}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="px-[var(--container-padding)] py-[var(--section-padding)] lg:px-14 xl:px-20">
            <p className="text-sm font-semibold">{t('social.eyebrow')}</p>
            <h2 className="mt-4 max-w-[12ch] font-serif text-5xl font-medium leading-[0.98] md:text-6xl">
              {t('social.statement')}
            </h2>
            <div className="mt-10 border-y border-brand-charcoal/30">
              {socialOutputs.map((key) => (
                <article key={key} className="grid gap-2 border-b border-brand-charcoal/25 py-5 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-5">
                  <p className="text-sm font-semibold">{t(`social.outputs.${key}.channel`)}</p>
                  <div>
                    <h3 className="text-xl font-semibold">{t(`social.outputs.${key}.title`)}</h3>
                    <p className="mt-1 text-sm leading-[1.7] text-brand-charcoal/75">{t(`social.outputs.${key}.body`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="shoot-options" variant="subtle">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-navy">{t('options.eyebrow')}</p>
          <h2 className="mt-4 max-w-[14ch] font-serif text-5xl font-medium leading-[0.98] md:text-6xl">{t('options.heading')}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-[1.75] text-muted-foreground">{t('options.body')}</p>
        </div>

        <div className="mt-12 border-y border-border">
          {shootOptions.map((key) => (
            <article key={key} className="grid gap-5 border-b border-border py-7 last:border-b-0 lg:grid-cols-[0.8fr_1fr_1.05fr] lg:gap-10">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{t(`options.items.${key}.bestForLabel`)}</p>
                <p className="mt-1 text-sm leading-relaxed">{t(`options.items.${key}.bestFor`)}</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl font-medium leading-tight">{t(`options.items.${key}.title`)}</h3>
                <p className="mt-3 leading-[1.7] text-muted-foreground">{t(`options.items.${key}.body`)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{t('options.includedLabel')}</p>
                <ul className="mt-3 space-y-3">
                  {[0, 1, 2].map((itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
                      <span>{t(`options.items.${key}.included.${itemIndex}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{t('options.scopeNote')}</p>

        <div className="mt-16 border-t border-border pt-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-navy">{t('process.eyebrow')}</p>
              <h2 className="mt-3 font-serif text-4xl font-medium md:text-5xl">{t('process.heading')}</h2>
            </div>
            <ol className="grid gap-7 sm:grid-cols-2">
              {processSteps.map((key) => (
                <li key={key} className="border-t border-border pt-4">
                  <h3 className="text-lg font-semibold">{t(`process.steps.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{t(`process.steps.${key}.body`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-navy">{t('team.eyebrow')}</p>
            <h2 className="mt-3 font-serif text-5xl font-medium leading-[0.98]">{t('team.heading')}</h2>
            <p className="mt-5 text-lg leading-[1.75] text-muted-foreground">{t('team.body')}</p>
            <div className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold">{t('team.jasper.title')}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{t('team.jasper.body')}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t('team.assistant.title')}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-muted-foreground">{t('team.assistant.body')}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-navy">{t('faq.eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl font-medium md:text-5xl">{t('faq.heading')}</h2>
            <div className="mt-7 border-t border-border">
              {faqItems.map((key) => (
                <details key={key} className="group border-b border-border py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    <span>{t(`faq.items.${key}.question`)}</span>
                    <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="max-w-2xl pb-5 pr-10 leading-[1.75] text-muted-foreground">{t(`faq.items.${key}.answer`)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-[#111312] px-[var(--container-padding)] py-[var(--section-padding)] text-brand-cream">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-serene-coral">
              <MapPin className="size-4" aria-hidden="true" />
              <span>{t('cta.eyebrow')}</span>
            </div>
            <h2 className="mt-4 max-w-[13ch] font-serif text-5xl font-medium leading-[0.98] text-brand-cream md:text-6xl">{t('cta.heading')}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-[1.75] text-brand-cream/70">{t('cta.body')}</p>
          </div>
          <Button asChild size="lg" className="rounded-none bg-brand-serene-coral text-brand-charcoal hover:bg-brand-cream">
            <Link
              href="/contact"
              data-analytics-event="photography_contact_cta_click"
              data-analytics-section="photography_final_cta"
            >
              <CalendarDays aria-hidden="true" />
              {t('cta.button')}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
