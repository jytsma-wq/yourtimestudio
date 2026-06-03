import type { ElementType } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  ArrowUpRight,
  Building2,
  Github,
  MessageSquare,
  Monitor,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { ExamplePreviewPanel } from '@/components/examples/ExamplePreviewPanel';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import {
  examples,
  exampleProofLabels,
  exampleSectorLabels,
  exampleStatusLabels,
  exampleTypeLabels,
  type ExampleSector,
} from '@/content/examples';

const pageHeading = 'Website Examples';
const pageSubtitle =
  'Real builds, demo websites, and sector-specific examples showing what is possible for Batumi hotels, clinics, salons, and service businesses.';
const pageNote =
  'Some examples are demo builds or internal concepts. They are clearly labelled so you can judge the work honestly.';

const sectorIcons: Record<ExampleSector, ElementType> = {
  hospitality: Building2,
  medical: Stethoscope,
  beauty: Sparkles,
  studio: Monitor,
};

const sectorColors: Record<ExampleSector, string> = {
  hospitality: 'bg-brand-sage-green-darken/10 text-brand-sage-green-darken',
  medical: 'bg-brand-sage-green-darken/10 text-brand-sage-green-darken',
  beauty: 'bg-brand-serene-coral/10 text-brand-serene-coral-darken',
  studio: 'bg-navy/10 text-navy',
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations('nav');

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: tNav('work'), href: '/work' },
          ]}
        />

        <div className="mb-10 max-w-3xl md:mb-12">
          <h1 className="editorial-display mb-4 text-4xl md:text-5xl">
            {pageHeading}
          </h1>
          <p className="text-lg leading-[1.75] text-muted-foreground md:text-xl">
            {pageSubtitle}
          </p>
        </div>

        <div className="max-w-3xl border-l border-border pl-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {pageNote}
          </p>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-2">
          {examples.map((example) => {
            const Icon = sectorIcons[example.sector];
            const colorClass = sectorColors[example.sector];

            return (
              <article
                key={example.id}
                className="flex min-h-full flex-col border border-border bg-card"
              >
                <ExamplePreviewPanel
                  example={example}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[16/10] border-b border-border"
                />

                <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex size-9 items-center justify-center border border-border ${colorClass}`}>
                      <Icon className="size-4" />
                    </span>
                    <Badge className={`${colorClass} rounded-none border-0 text-xs font-semibold uppercase tracking-wide`}>
                      {exampleSectorLabels[example.sector]}
                    </Badge>
                    <Badge variant="outline" className="rounded-none text-xs font-semibold uppercase tracking-wide">
                      {exampleTypeLabels[example.type]}
                    </Badge>
                    <Badge variant="outline" className="rounded-none text-xs font-semibold uppercase tracking-wide">
                      {exampleStatusLabels[example.status]}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {example.title}
                    </h2>
                    <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
                      {example.shortDescription}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="editorial-kicker mb-3 text-muted-foreground">Features</p>
                      <ul className="space-y-2">
                        {example.features.slice(0, 5).map((feature) => (
                          <li key={feature} className="text-sm leading-relaxed text-foreground">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="editorial-kicker mb-3 text-muted-foreground">What it shows</p>
                      <ul className="space-y-2">
                        {example.whatItShows.slice(0, 3).map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {example.technologies.slice(0, 5).map((technology) => (
                      <span
                        key={technology}
                        className="border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto border-t border-border pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                      {exampleProofLabels[example.proofLevel]} proof
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {example.disclaimer}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {example.liveUrl && (
                      <Button asChild>
                        <a href={example.liveUrl} target="_blank" rel="noopener noreferrer">
                          View website
                          <ArrowUpRight className="size-4" />
                        </a>
                      </Button>
                    )}
                    {example.demoUrl && (
                      <Button asChild variant="outline">
                        <a href={example.demoUrl} target="_blank" rel="noopener noreferrer">
                          View demo
                          <ArrowUpRight className="size-4" />
                        </a>
                      </Button>
                    )}
                    {example.repositoryUrl && (
                      <Button asChild variant="outline">
                        <a href={example.repositoryUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="size-4" />
                          View repository
                        </a>
                      </Button>
                    )}
                    <Button asChild variant="outline">
                      <Link href="/contact">
                        <MessageSquare className="size-4" />
                        {example.ctaLabel}
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
