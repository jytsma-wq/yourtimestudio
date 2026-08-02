import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type LucideIcon, ClipboardList, FileText, PhoneCall, Rocket, Search, Settings, Wrench, Zap } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { PricingCards } from '@/components/sections/PricingPageContent';
import { ComparisonTable } from '@/components/shared/ComparisonTable';
import { PricingCalculator } from '@/components/shared/PricingCalculator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return generatePageMetadata({
    title: t('heading'),
    description: t('subtitle'),
    path: '/pricing',
    locale: locale as Locale,
    ogImage: siteConfig.assets.ogDefault,
  });
}

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

  const processSteps: { title: string; description: string; Icon: LucideIcon }[] = [
    { title: tp('process_steps.0.title'), description: tp('process_steps.0.description'), Icon: Search },
    { title: tp('process_steps.1.title'), description: tp('process_steps.1.description'), Icon: PhoneCall },
    { title: tp('process_steps.2.title'), description: tp('process_steps.2.description'), Icon: ClipboardList },
    { title: tp('process_steps.3.title'), description: tp('process_steps.3.description'), Icon: Wrench },
    { title: tp('process_steps.4.title'), description: tp('process_steps.4.description'), Icon: Rocket },
  ];

  const addOns: { name: string; description: string; price: string; Icon: LucideIcon }[] = [
    { name: tp('add_ons.0.name'), description: tp('add_ons.0.description'), price: tp('add_ons.0.price'), Icon: Settings },
    { name: tp('add_ons.1.name'), description: tp('add_ons.1.description'), price: tp('add_ons.1.price'), Icon: FileText },
    { name: tp('add_ons.2.name'), description: tp('add_ons.2.description'), price: tp('add_ons.2.price'), Icon: Zap },
  ];

  const faqItems = [
    { q: tp('faq_items.0.q'), a: tp('faq_items.0.a') },
    { q: tp('faq_items.1.q'), a: tp('faq_items.1.a') },
    { q: tp('faq_items.2.q'), a: tp('faq_items.2.a') },
    { q: tp('faq_items.3.q'), a: tp('faq_items.3.a') },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <Section>
        <div className="bl-sector-reveal mb-12 text-center md:mb-16">
          <h1 className="editorial-display text-4xl md:text-5xl mb-4">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-[1.75]">
            {t('subtitle')}
          </p>
        </div>

        <PricingCards locale={locale as Locale} />
        <ComparisonTable locale={locale as Locale} />
      </Section>

      <Section variant="subtle">
        <div className="mb-12 grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <h2 className="editorial-display text-3xl md:text-4xl mb-4">
            {tp('add_ons_heading')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-[1.75]">
            {tp('add_ons_subtitle')}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-px border border-border bg-border md:grid-cols-[1.15fr_0.85fr]">
          {addOns.map((addon) => (
            <div
              key={addon.name}
              className="bl-sector-tile rounded-none border border-border bg-card p-6 shadow-none"
            >
              <div className="mb-4 flex size-10 items-center justify-center border border-border bg-muted">
                <addon.Icon className="size-5 text-navy" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{addon.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-[1.75]">
                {addon.description}
              </p>
              <p className="text-lg font-semibold text-navy">{addon.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <PricingCalculator />
      </Section>

      <Section>
        <div className="mb-12 grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <h2 className="editorial-display text-3xl md:text-4xl mb-4">
            {tp('process_heading')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-[1.75]">
            {tp('process_subtitle')}
          </p>
        </div>

        <div className="bl-sector-flow mx-auto max-w-6xl overflow-hidden border border-border">
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <div key={step.title} className="bl-sector-tile flex min-h-64 flex-col bg-card p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-3xl font-semibold text-foreground/15">0{i + 1}</span>
                    <div className="flex size-10 shrink-0 items-center justify-center border border-border bg-muted">
                      <step.Icon className="size-5 text-navy" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="mt-auto pt-8">
                    <h3 className="mb-2 text-base font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-[1.75]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="text-left mb-12">
          <h2 className="editorial-display text-3xl md:text-4xl font-semibold mb-4">
            {tp('faq_heading')}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <PricingFAQ items={faqItems} />
        </div>
      </Section>
    </>
  );
}

function PricingFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`pricing-faq-${i}`}>
          <AccordionTrigger className="text-left text-base md:text-lg font-medium">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-[1.75]">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
