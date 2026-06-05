import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  Camera,
  ClipboardList,
  Languages,
  LifeBuoy,
  PhoneCall,
  PlugZap,
  Rocket,
  Search,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';
import { faqSchema } from '@/lib/seo/structured-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { PricingAuditProduct, PricingCards } from '@/components/sections/PricingPageContent';
import { PricingCalculator } from '@/components/shared/PricingCalculator';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/shared/TrackedLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Website Development Pricing & Scope',
    description:
      'Website development scopes, setup ranges, monthly care options, and add-ons for hotels, clinics, studios, and service businesses.',
    path: '/pricing',
    locale: locale as Locale,
    ogImage: pageOgImages.pricing,
  });
}

const addOnIcons: LucideIcon[] = [
  Camera,
  PlugZap,
  Languages,
  Search,
  LifeBuoy,
];

const processIcons: LucideIcon[] = [
  Search,
  PhoneCall,
  ClipboardList,
  Wrench,
  Rocket,
];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pricing');
  const tp = await getTranslations('pricingPage');
  const tNav = await getTranslations('nav');

  const breadcrumbItems = [
    { label: tNav('pricing'), href: '/pricing' },
  ];

  const addOns: { name: string; description: string; price: string; Icon: LucideIcon }[] =
    addOnIcons.map((Icon, index) => ({
      Icon,
      name: tp(`add_ons.${index}.name`),
      description: tp(`add_ons.${index}.description`),
      price: tp(`add_ons.${index}.price`),
    }));

  const processSteps: { title: string; description: string; Icon: LucideIcon }[] =
    processIcons.map((Icon, index) => ({
      Icon,
      title: tp(`process_steps.${index}.title`),
      description: tp(`process_steps.${index}.description`),
    }));

  const faqItems = [0, 1, 2, 3].map((index) => ({
    q: tp(`faq_items.${index}.q`),
    a: tp(`faq_items.${index}.a`),
  }));
  const structuredData = faqSchema(faqItems.map((item) => ({
    question: item.q,
    answer: item.a,
  })));

  return (
    <div data-locale={locale} className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="px-[var(--container-padding)] py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[var(--hero-max-width)]">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] lg:items-end lg:gap-16">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('hero_eyebrow')}</p>
              <h1 className="max-w-4xl text-display-lg text-ink">{t('heading')}</h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-[1.75] text-muted">
                {t('subtitle')}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white hover:bg-oxide-hover hover:text-white"
              >
                <TrackedLink
                  href="/contact"
                  eventName="Pricing CTA Clicked"
                  eventProps={{ location: 'pricing_hero' }}
                >
                  {t('cta')}
                  <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
                </TrackedLink>
              </Button>
            </div>

            <aside className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label text-muted">{t('hero_note_label')}</p>
              <p className="mt-3 text-body-sm leading-[1.75] text-muted">{t('hero_note')}</p>
              <div className="mt-5 grid gap-2">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="rounded border border-hairline bg-canvas px-3 py-2 text-sm text-ink">
                    {t(`hero_points.${index}`)}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 max-w-3xl">
            <p className="mono-label mb-4 text-sea-bright">{t('comparison_eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{t('comparison_heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted">{t('comparison_subtitle')}</p>
          </div>
          <PricingCards />
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <PricingAuditProduct />
        </div>
      </section>

      <section className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{tp('add_ons_eyebrow')}</p>
              <h2 className="text-heading-lg text-ink-dark">{tp('add_ons_heading')}</h2>
            </div>
            <p className="max-w-2xl text-body-lg leading-[1.75] text-muted-dark lg:justify-self-end">
              {tp('add_ons_subtitle')}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline-light bg-hairline-light md:grid-cols-2 lg:grid-cols-5">
            {addOns.map((addon) => (
              <article key={addon.name} className="bg-paper-soft p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-sea/10">
                  <addon.Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-ink-dark">{addon.name}</h3>
                <p className="mt-3 text-body-sm leading-[1.7] text-muted-dark">{addon.description}</p>
                <p className="mt-5 border-t border-hairline-light pt-4 font-semibold text-sea-bright">
                  {addon.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas px-[var(--container-padding)] py-16 md:py-24">
        <PricingCalculator />
      </section>

      <section className="bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{tp('process_eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{tp('process_heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted">{tp('process_subtitle')}</p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline">
            {processSteps.map((step, index) => (
              <article key={step.title} className="grid gap-4 bg-surface p-5 sm:grid-cols-[auto_1fr]">
                <div className="flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas">
                  <step.Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-muted">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-body-sm leading-[1.7] text-muted">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{tp('faq_eyebrow')}</p>
            <h2 className="text-heading-lg text-ink-dark">{tp('faq_heading')}</h2>
          </div>
          <PricingFAQ items={faqItems} />
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{tp('cta_eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{tp('cta_heading')}</h2>
            <p className="mt-4 max-w-2xl text-body-lg leading-[1.75] text-muted">{tp('cta_subtitle')}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white hover:bg-oxide-hover hover:text-white"
          >
            <TrackedLink
              href="/contact"
              eventName="Pricing CTA Clicked"
              eventProps={{ location: 'pricing_footer' }}
            >
              {t('cta')}
              <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
            </TrackedLink>
          </Button>
        </div>
      </section>
    </div>
  );
}

function PricingFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="w-full rounded-md border border-hairline-light bg-paper-soft">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`pricing-faq-${index}`} className="border-hairline-light px-4">
          <AccordionTrigger className="text-left text-base font-semibold text-ink-dark hover:text-sea-bright">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-dark leading-[1.75]">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
