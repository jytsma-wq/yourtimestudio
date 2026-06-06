import { getTranslations } from 'next-intl/server';
import {
  DollarSign,
  Clock,
  Globe2,
  Smartphone,
  Bed,
  ShoppingCart,
  BarChart3,
  Zap,
  TrendingUp,
  ShieldAlert,
  UserRound,
  CalendarCheck,
  Stethoscope,
  Code,
  Star,
  HelpCircle,
  CalendarX,
  MessageSquare,
  Eye,
  Repeat,
  Scissors,
  Tag,
  Sparkles,
  Camera,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrackedLink } from '@/components/shared/TrackedLink';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { Locale } from '@/lib/i18n/config';
import { sectors, type SectorKey } from '@/lib/sector-config';
import { faqSchema, serviceSchema } from '@/lib/seo/structured-data';

/* ─── Sector icon configuration (kept here — specific to page template layout) ─── */
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

const serviceTypes: Record<SectorKey, string> = {
  hospitality: 'Hospitality web design and direct booking websites',
  medical: 'Clinic website development',
  beauty: 'Beauty salon and studio appointment websites',
};

/* ─── Type helpers ─── */
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

/* ─── Template props ─── */
interface SectorPageTemplateProps {
  sectorKey: SectorKey;
  locale: Locale;
}

/* ─── Main component ─── */
export async function SectorPageTemplate({
  sectorKey,
  locale,
}: SectorPageTemplateProps) {
  const t = await getTranslations(`sectorPages.${sectorKey}`);
  const tNav = await getTranslations('nav');
  const sector = sectors[sectorKey];

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

  const structuredData = [
    serviceSchema({
      name: data.hero.title,
      description: data.hero.subtitle,
      path: sector.href,
      locale,
      serviceType: serviceTypes[sectorKey],
    }),
    faqSchema(data.faq.items.map((item) => ({
      question: item.q,
      answer: item.a,
    }))),
  ];

  // Map sector key to the Tailwind bg class for the CTA band
  const ctaBgClass: Record<SectorKey, string> = {
    hospitality: 'bg-sea',
    medical: 'bg-sea-bright',
    beauty: 'bg-oxide',
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumbs */}
      <div className="px-4 md:px-8 pt-6 max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: tNav(sectorKey), href: sector.href },
          ]}
        />
      </div>

      {/* ─── 1. Hero Section ─── */}
      <Section>
        <div className="max-w-3xl">
          <Badge
            variant="outline"
            className={`mb-6 ${sector.textClass} ${sector.borderClass} ${sector.bgLight} text-xs font-semibold uppercase tracking-widest`}
          >
            {data.hero.eyebrow}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            {data.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {data.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-oxide text-white hover:bg-oxide-hover"
            >
              <TrackedLink
                href="/website-audits"
                eventName="Sector CTA Clicked"
                eventProps={{ sector: sectorKey, location: 'hero_primary', destination: 'website_audits' }}
              >
                {data.cta.primary}
                <ArrowRight className="size-4 ml-1" aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <TrackedLink
                href="/pricing"
                eventName="Sector CTA Clicked"
                eventProps={{ sector: sectorKey, location: 'hero_secondary', destination: 'pricing' }}
              >
                {data.cta.secondary}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </Section>

      {/* ─── 2. Pain Points Section ─── */}
      <Section variant="subtle">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          {data.pains.heading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {data.pains.items.map((item, i) => {
            const Icon = painIcons[sectorKey][i] || ShieldAlert;
            return (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div
                    className={`size-10 rounded-lg ${sector.bgLight} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`size-5 ${sector.textClass}`} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ─── 3. Deliverables Section ─── */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          {data.deliverables.heading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.deliverables.items.map((item, i) => {
            const Icon = deliverableIcons[sectorKey][i] || CheckCircle2;
            return (
              <div key={i} className="flex gap-4">
                <div
                  className={`size-10 shrink-0 rounded-lg ${sector.bgLight} flex items-center justify-center`}
                >
                  <Icon className={`size-5 ${sector.textClass}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ─── 4. Outcome Section ─── */}
      <Section variant="subtle">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          {data.outcomes.heading}
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {data.outcomes.items.map((item, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-6">
                <div
                  className={`size-8 rounded-full ${sector.bgLight} flex items-center justify-center mb-4`}
                >
                  <span className={`text-sm font-bold ${sector.textClass}`}>
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── 5. FAQ Section ─── */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
          {data.faq.heading}
        </h2>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {data.faq.items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className={sector.textClass}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ─── 6. CTA Band ─── */}
      <section
        className={`py-16 md:py-24 px-4 md:px-8 ${ctaBgClass[sectorKey]} text-white`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            {data.cta.heading}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-paper text-ink-dark hover:bg-paper-soft hover:text-ink-dark"
            >
              <TrackedLink
                href="/website-audits"
                eventName="Sector CTA Clicked"
                eventProps={{ sector: sectorKey, location: 'footer_primary', destination: 'website_audits' }}
              >
                {data.cta.primary}
                <ArrowRight className="size-4 ml-1" aria-hidden="true" />
              </TrackedLink>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <TrackedLink
                href="/pricing"
                eventName="Sector CTA Clicked"
                eventProps={{ sector: sectorKey, location: 'footer_secondary', destination: 'pricing' }}
              >
                {data.cta.secondary}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
