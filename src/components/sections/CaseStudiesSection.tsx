import Image from 'next/image';
import { ArrowRight, LayoutTemplate, Monitor } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import { Link } from '@/lib/i18n/navigation';
import { Section } from '@/components/shared/Section';
import {
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
            <article className="group bg-ink text-background">
              <div className="relative aspect-[4/3] overflow-hidden">
                {example.screenshot ? (
                  <Image
                    src={example.screenshot}
                    alt={example.imageAlt}
                    fill
                    className="object-cover opacity-78 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-background/10 p-6 text-center">
                    <div>
                      <Monitor className="mx-auto mb-3 size-8 text-background" />
                      <p className="text-sm font-medium text-background">
                        Screenshot not available yet
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
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
