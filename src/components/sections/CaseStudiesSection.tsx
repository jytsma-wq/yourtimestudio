import { ArrowRight, LayoutTemplate } from 'lucide-react';
import { ExamplePreviewPanel } from '@/components/examples/ExamplePreviewPanel';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import { Link } from '@/lib/i18n/navigation';
import { Section } from '@/components/shared/Section';
import {
  exampleProofLabels,
  exampleSectorLabels,
  exampleStatusLabels,
  exampleTypeLabels,
  featuredExamples,
} from '@/content/examples';

export function CaseStudiesSection({ number }: { number?: string }) {
  return (
    <Section variant="dark" className="relative overflow-hidden" number={number}>
      <div className="mb-12 grid gap-6 border-b border-background/12 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="section-label text-background">Demo briefs</p>
          <p className="editorial-kicker text-background">Example directions, not fake client claims.</p>
        </div>
        <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-background">
          Website examples
        </h2>
      </div>

      <StaggerContainer className="grid gap-px overflow-hidden border border-background/12 bg-background/12 md:grid-cols-[1.15fr_0.85fr] md:auto-rows-fr">
        {featuredExamples.map((example) => (
          <StaggerItem key={example.id}>
            <article className="bg-ink text-background">
              <div>
                <ExamplePreviewPanel
                  example={example}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  tone="dark"
                  className="aspect-[4/3] border-b border-background/12 bg-ink"
                  imageClassName="opacity-90"
                />
                <div className="border-b border-background/12 px-5 py-4 md:px-6">
                  <p className="editorial-kicker text-background">
                    {exampleTypeLabels[example.type]} / {exampleStatusLabels[example.status]}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-background">
                    {example.title}
                  </h3>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="inline-flex items-center gap-2">
                  <LayoutTemplate className="size-4 text-brand-serene-coral-darken" />
                  <span className="text-sm font-semibold text-background">
                    {exampleSectorLabels[example.sector]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-background">
                  {example.shortDescription}
                </p>
                <ul className="mt-4 space-y-2">
                  {example.features.slice(0, 2).map((feature) => (
                    <li key={feature} className="text-xs leading-relaxed text-background/78">
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-background/12 pt-4">
                  <p className="editorial-kicker text-background/78">
                    {exampleProofLabels[example.proofLevel]} proof
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-background/72">
                    {example.disclaimer}
                  </p>
                </div>
                <Link
                  href="/work"
                  className="mt-5 flex items-center gap-2 text-sm font-semibold text-background transition-colors hover:text-background"
                >
                  See website examples
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-background">
        Demo and internal examples are clearly labelled. Real client work can be added later when it is ready to publish.
      </p>
    </Section>
  );
}
