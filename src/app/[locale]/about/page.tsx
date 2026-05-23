import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { teamBlur } from '@/lib/blur-placeholders';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'About — Yourtimestudio',
    description:
      'Founder-led web studio in Batumi, Georgia. Dutch developer specializing in hospitality, medical, and beauty websites with sector-specific expertise.',
    path: '/about',
    locale: locale as Locale,
    ogImage: '/og-default.png',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('aboutPage');
  const tNav = await getTranslations('nav');

  const breadcrumbItems = [
    { label: tNav('about'), href: '/about' },
  ];

  const processSteps = [
    { title: t('process_steps.0.title'), description: t('process_steps.0.description'), number: '01' },
    { title: t('process_steps.1.title'), description: t('process_steps.1.description'), number: '02' },
    { title: t('process_steps.2.title'), description: t('process_steps.2.description'), number: '03' },
    { title: t('process_steps.3.title'), description: t('process_steps.3.description'), number: '04' },
    { title: t('process_steps.4.title'), description: t('process_steps.4.description'), number: '05' },
  ];

  const tools = [
    { name: t('tools.0.name'), category: 'framework' },
    { name: t('tools.1.name'), category: 'language' },
    { name: t('tools.2.name'), category: 'styling' },
    { name: t('tools.3.name'), category: 'hosting' },
    { name: t('tools.4.name'), category: 'database' },
    { name: t('tools.5.name'), category: 'forms' },
    { name: t('tools.6.name'), category: 'validation' },
    { name: t('tools.7.name'), category: 'i18n' },
    { name: t('tools.8.name'), category: 'animation' },
    { name: t('tools.9.name'), category: 'components' },
  ];

  const categoryColors: Record<string, string> = {
    framework: 'bg-navy/10 text-navy border-navy/20',
    language: 'bg-teal/10 text-teal border-teal/20',
    styling: 'bg-rose/10 text-rose border-rose/20',
    hosting: 'bg-stone/10 text-stone border-stone/20',
    database: 'bg-navy/10 text-navy border-navy/20',
    forms: 'bg-teal/10 text-teal border-teal/20',
    validation: 'bg-rose/10 text-rose border-rose/20',
    i18n: 'bg-stone/10 text-stone border-stone/20',
    animation: 'bg-teal/10 text-teal border-teal/20',
    components: 'bg-navy/10 text-navy border-navy/20',
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="editorial-display text-4xl md:text-5xl mb-6">
            {t('heading')}
          </h1>
        </div>
      </Section>

      {/* Founder Photo — prominent, large format */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-premium-xl aspect-21/9">
            <Image
              src="/images/about-team.jpg"
              alt={t('image_alt')}
              fill
              className="object-cover object-center"
              priority
              placeholder="blur"
              blurDataURL={teamBlur}
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <p className="text-paper text-xl md:text-2xl font-semibold">Yourtimestudio</p>
              <p className="text-paper text-sm mt-1">{t('image_caption')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* The Story */}
      <Section variant="subtle">
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial-display text-2xl md:text-3xl mb-6">
            {t('story_heading')}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-[1.75] text-base md:text-lg">
            <p>{t('story_body_1')}</p>
            <p>{t('story_body_2')}</p>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial-display text-2xl md:text-3xl mb-6">
            {t('approach_heading')}
          </h2>
          <p className="text-muted-foreground leading-[1.75] text-base md:text-lg">
            {t('approach_body')}
          </p>
        </div>
      </Section>

      {/* Why Batumi */}
      <Section variant="subtle">
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial-display text-2xl md:text-3xl mb-6">
            {t('why_batumi_heading')}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-[1.75] text-base md:text-lg">
            <p>{t('why_batumi_body_1')}</p>
            <p>{t('why_batumi_body_2')}</p>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial-display text-2xl md:text-3xl mb-10">
            {t('process_heading')}
          </h2>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 md:gap-6">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-teal/10 border border-teal/30 shrink-0">
                    <span className="text-teal font-semibold text-sm">{step.number}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-[1.75]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Tools & Stack */}
      <Section variant="subtle">
        <div className="max-w-3xl mx-auto">
          <h2 className="editorial-display text-2xl md:text-3xl mb-3">
            {t('tools_heading')}
          </h2>
          <p className="text-muted-foreground leading-[1.75] mb-8">
            {t('tools_subtitle')}
          </p>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <Badge
                key={i}
                variant="outline"
                className={`px-3 py-1.5 text-sm font-medium ${categoryColors[tool.category] || 'border-border'}`}
              >
                {tool.name}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-medium mb-6">
            {t('cta_text')}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-teal hover:bg-teal/90 text-background"
          >
            <Link href="/website-audits">
              {t('cta_button')}
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
