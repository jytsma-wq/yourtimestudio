import Image from 'next/image';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import {
  Accessibility,
  ArrowRight,
  BarChart3,
  Bed,
  CalendarCheck,
  CalendarX,
  Camera,
  CheckCircle2,
  Clock,
  Code,
  DollarSign,
  Eye,
  Globe2,
  HelpCircle,
  MessageSquare,
  Plus,
  Repeat,
  Scissors,
  ShieldAlert,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  Tag,
  TrendingUp,
  UserRound,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from '@/lib/i18n/navigation';
import { getExampleUiLabels } from '@/lib/examples/labels';
import type { Locale } from '@/lib/i18n/config';
import { sectors, type SectorKey } from '@/lib/sector-config';
import { serializeJsonLd } from '@/lib/seo/structured-data';

const painIcons: Record<SectorKey, LucideIcon[]> = {
  hospitality: [DollarSign, Clock, Globe2, Smartphone],
  medical: [ShieldAlert, UserRound, CalendarCheck, Globe2],
  beauty: [CalendarX, MessageSquare, Eye, Repeat],
};

const deliverableIcons: Record<SectorKey, LucideIcon[]> = {
  hospitality: [Bed, ShoppingCart, Globe2, BarChart3, Zap, TrendingUp],
  medical: [Stethoscope, CalendarCheck, Globe2, Code, Star, HelpCircle],
  beauty: [Scissors, CalendarCheck, Tag, Sparkles, Camera, MessageSquare],
};

const sectorVisuals = {
  hospitality: {
    hero: '/images/studio-scenes/hospitality-hero.webp',
    plan: '/templates/hotel-01-luxury/hero-suite.png',
    heroSurface: 'bg-navy text-brand-cream',
    heroHeading: 'text-brand-cream',
    heroMuted: 'text-brand-cream/76',
    heroRule: 'border-brand-cream/20',
    heroAccent: 'text-brand-serene-coral',
    heroTitleSize: 'lg:text-6xl xl:text-7xl',
    primary: 'bg-brand-serene-coral text-brand-charcoal hover:bg-brand-cream',
    secondary: 'border-brand-cream/40 text-brand-cream hover:bg-brand-cream hover:text-brand-charcoal',
    journeySurface: 'bg-[#e7efec]',
    outcomeSurface: 'bg-navy text-brand-cream',
    outcomeMuted: 'text-brand-cream/72',
    focalPoint: 'object-center',
  },
  medical: {
    hero: '/images/studio-scenes/clinic-story.webp',
    plan: '/templates/dentist-01-clinical/hero-clinic.png',
    heroSurface: 'bg-[#e8efec] text-brand-charcoal',
    heroHeading: 'text-brand-charcoal',
    heroMuted: 'text-brand-charcoal/72',
    heroRule: 'border-brand-charcoal/18',
    heroAccent: 'text-brand-sage-green-darken',
    heroTitleSize: 'lg:text-[3.25rem] xl:text-[3.75rem]',
    primary: 'bg-navy text-brand-cream hover:bg-brand-charcoal',
    secondary: 'border-brand-charcoal/30 text-brand-charcoal hover:bg-brand-cream',
    journeySurface: 'bg-[#f0f3f1]',
    outcomeSurface: 'bg-[#1f3b3f] text-brand-cream',
    outcomeMuted: 'text-brand-cream/72',
    focalPoint: 'object-center',
  },
  beauty: {
    hero: '/images/studio-scenes/beauty-studio.webp',
    plan: '/templates/beauty-01-salon/hero-salon.png',
    heroSurface: 'bg-[#f1e4dd] text-brand-charcoal',
    heroHeading: 'text-brand-charcoal',
    heroMuted: 'text-brand-charcoal/72',
    heroRule: 'border-brand-charcoal/18',
    heroAccent: 'text-brand-serene-coral-darken',
    heroTitleSize: 'lg:text-[3.25rem] xl:text-[3.75rem]',
    primary: 'bg-brand-serene-coral text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream',
    secondary: 'border-brand-charcoal/30 text-brand-charcoal hover:bg-brand-cream',
    journeySurface: 'bg-[#f5ebe5]',
    outcomeSurface: 'bg-[#773f36] text-brand-cream',
    outcomeMuted: 'text-brand-cream/76',
    focalPoint: 'object-center',
  },
} as const;

interface PainItem {
  title: string;
  description: string;
}

interface DeliverableItem {
  title: string;
  description: string;
}

interface OutcomeItem {
  title: string;
  description: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface SectorTranslations {
  hero: { eyebrow: string; title: string; subtitle: string };
  pains: { heading: string; items: PainItem[] };
  deliverables: { heading: string; items: DeliverableItem[] };
  outcomes: { heading: string; items: OutcomeItem[] };
  faq: { heading: string; items: FaqItem[] };
  cta: { heading: string; primary: string; secondary: string };
}

interface SectorPageTemplateProps {
  sectorKey: SectorKey;
  locale: Locale;
}

export async function SectorPageTemplate({
  sectorKey,
  locale,
}: SectorPageTemplateProps) {
  const t = await getTranslations(`sectorPages.${sectorKey}`);
  const tNav = await getTranslations('nav');
  const exampleLabels = await getExampleUiLabels();
  const sector = sectors[sectorKey];
  const visual = sectorVisuals[sectorKey];

  const data: SectorTranslations = {
    hero: {
      eyebrow: t('hero.eyebrow'),
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
    },
    pains: {
      heading: t('pains.heading'),
      items: t.raw('pains.items') as PainItem[],
    },
    deliverables: {
      heading: t('deliverables.heading'),
      items: t.raw('deliverables.items') as DeliverableItem[],
    },
    outcomes: {
      heading: t('outcomes.heading'),
      items: t.raw('outcomes.items') as OutcomeItem[],
    },
    faq: {
      heading: t('faq.heading'),
      items: t.raw('faq.items') as FaqItem[],
    },
    cta: {
      heading: t('cta.heading'),
      primary: t('cta.primary'),
      secondary: t('cta.secondary'),
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        id={`sector-faq-json-ld-${sectorKey}`}
        data-locale={locale}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      <div className="mx-auto max-w-[var(--container-max-width)] px-[var(--container-padding)] pt-6 md:pt-8">
        <Breadcrumbs items={[{ label: tNav(sectorKey), href: sector.href }]} />
      </div>

      <section className={`mt-4 overflow-hidden ${visual.heroSurface}`}>
        <div className="mx-auto grid min-h-[42rem] max-w-[var(--hero-max-width)] lg:grid-cols-2">
          <div className="bl-sector-hero-copy flex flex-col justify-between px-[var(--container-padding)] py-8 md:py-10 lg:py-12">
            <div className={`flex items-center border-b pb-4 text-xs font-semibold uppercase ${visual.heroRule}`}>
              <span className={visual.heroAccent}>{data.hero.eyebrow}</span>
            </div>

            <div className="max-w-2xl py-8 lg:py-10">
              <h1 className={`max-w-[13ch] text-4xl font-semibold leading-[1.02] sm:text-5xl ${visual.heroTitleSize} ${visual.heroHeading}`}>
                {data.hero.title}
              </h1>
              <p className={`mt-6 max-w-xl text-base leading-[1.75] md:text-lg ${visual.heroMuted}`}>
                {data.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className={`rounded-none ${visual.primary}`}>
                  <Link
                    href="/website-audits"
                    data-analytics-event="sector_audit_cta_click"
                    data-analytics-section={`${sectorKey}_hero`}
                  >
                    {data.cta.primary}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className={`rounded-none bg-transparent ${visual.secondary}`}>
                  <Link href="/pricing">{data.cta.secondary}</Link>
                </Button>
              </div>
            </div>

            <p className={`border-t pt-4 text-xs leading-relaxed ${visual.heroRule} ${visual.heroMuted}`}>
              {exampleLabels.typeLabels['demo-build']} / {exampleLabels.statusLabels['demo-only']}
            </p>
          </div>

          <figure className="bl-sector-hero-media relative min-h-[24rem] overflow-hidden lg:min-h-full">
            <Image
              src={visual.hero}
              alt={data.hero.eyebrow}
              fill
              preload
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 55vw"
              className={`object-cover ${visual.focalPoint}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/44 via-transparent to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 border-t border-white/24 bg-brand-charcoal/28 px-5 py-4 text-xs font-semibold text-white backdrop-blur-sm md:px-7">
              <span>{data.hero.eyebrow}</span>
              <span>Batumi / Adjara</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <Section className={visual.journeySurface}>
        <div className="bl-sector-reveal grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <p className={`editorial-kicker ${sector.textClass}`}>{data.hero.eyebrow}</p>
            <h2 className="editorial-display mt-4 max-w-[12ch] text-4xl font-medium md:text-5xl">
              {data.pains.heading}
            </h2>
          </div>

          <ol
            className="bl-sector-flow grid border-l border-t border-brand-charcoal/18 sm:grid-cols-2 lg:grid-cols-4"
            style={{ '--sector-motion-color': sector.cssVar } as CSSProperties}
          >
            {data.pains.items.map((item, index) => {
              const Icon = painIcons[sectorKey][index] || Accessibility;

              return (
                <li key={item.title} className="bl-sector-tile border-b border-r border-brand-charcoal/18">
                  <details className="group">
                    <summary className="flex min-h-64 cursor-pointer list-none flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:p-6 [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center justify-between">
                        <Icon className={`size-5 ${sector.textClass}`} aria-hidden="true" />
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-4 pt-12">
                        <h3 className="text-xl font-semibold leading-tight text-foreground">
                          {item.title}
                        </h3>
                        <Plus className={`size-5 shrink-0 transition-transform group-open:rotate-45 ${sector.textClass}`} aria-hidden="true" />
                      </div>
                    </summary>
                    <p className="border-t border-brand-charcoal/18 px-5 py-5 text-sm leading-[1.7] text-muted-foreground md:px-6">
                      {item.description}
                    </p>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="bl-sector-reveal grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <p className={`editorial-kicker ${sector.textClass}`}>{data.hero.eyebrow}</p>
            <h2 className="editorial-display mt-4 max-w-[13ch] text-4xl font-medium md:text-5xl">
              {data.deliverables.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
            {data.hero.subtitle}
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden border border-border bg-border lg:grid-cols-[1.05fr_0.95fr]">
          <figure className="bl-sector-plan-media relative min-h-[28rem] overflow-hidden bg-muted lg:min-h-[44rem]">
            <Image
              src={visual.plan}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent" aria-hidden="true" />
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-5 text-xs font-semibold text-white md:p-7">
              <span>{exampleLabels.typeLabels['demo-build']}</span>
              <span>{exampleLabels.statusLabels['demo-only']}</span>
            </figcaption>
          </figure>

          <ol className="grid bg-card sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {data.deliverables.items.map((item, index) => {
              const Icon = deliverableIcons[sectorKey][index] || CheckCircle2;

              return (
                <li key={item.title} className="bl-sector-tile border-b border-r border-border">
                  <details className="group">
                    <summary className="flex min-h-52 cursor-pointer list-none flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:p-6 [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center justify-between">
                        <Icon className={`size-5 ${sector.textClass}`} aria-hidden="true" />
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-4 pt-10">
                        <h3 className="text-lg font-semibold leading-tight text-foreground">
                          {item.title}
                        </h3>
                        <Plus className={`size-5 shrink-0 transition-transform group-open:rotate-45 ${sector.textClass}`} aria-hidden="true" />
                      </div>
                    </summary>
                    <p className="border-t border-border px-5 py-5 text-sm leading-[1.7] text-muted-foreground md:px-6">
                      {item.description}
                    </p>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      <section className={`px-[var(--container-padding)] py-[var(--section-padding)] ${visual.outcomeSurface}`}>
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="bl-sector-reveal grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-16">
            <div>
              <p className="editorial-kicker text-brand-serene-coral">{data.hero.eyebrow}</p>
              <h2 className="editorial-display mt-4 max-w-[12ch] text-4xl font-medium md:text-5xl">
                {data.outcomes.heading}
              </h2>
            </div>
            <div className="grid border-l border-t border-white/20 md:grid-cols-3">
              {data.outcomes.items.map((item) => (
                <article key={item.title} className="bl-sector-tile border-b border-r border-white/20 p-5 md:p-7">
                  <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-[1.7] ${visual.outcomeMuted}`}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="bl-sector-reveal grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
          <div>
            <p className={`editorial-kicker ${sector.textClass}`}>{data.hero.eyebrow}</p>
            <h2 className="editorial-display mt-4 max-w-[11ch] text-4xl font-medium md:text-5xl">
              {data.faq.heading}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full border-t border-border">
            {data.faq.items.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold md:text-lg">
                  <span>{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p className="max-w-3xl leading-[1.75]">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <section className={`px-[var(--container-padding)] py-16 md:py-24 ${visual.heroSurface}`}>
        <div className="bl-sector-reveal mx-auto grid max-w-[var(--container-max-width)] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <h2 className="editorial-display max-w-4xl text-3xl font-medium md:text-5xl">
            {data.cta.heading}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className={`rounded-none ${visual.primary}`}>
              <Link href="/website-audits">
                {data.cta.primary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={`rounded-none bg-transparent ${visual.secondary}`}>
              <Link href="/pricing">{data.cta.secondary}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
