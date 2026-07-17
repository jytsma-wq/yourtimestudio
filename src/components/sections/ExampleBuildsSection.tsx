import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { getExampleUiLabels } from '@/lib/examples/labels';
import { getLocalizedFeaturedExamples } from '@/lib/examples/localized';
import { Section } from '@/components/shared/Section';

const imageBySector = {
  hospitality: '/images/studio-scenes/hospitality-hero.webp',
  medical: '/images/studio-scenes/clinic-story.webp',
  beauty: '/images/studio-scenes/beauty-studio.webp',
  studio: '/images/studio-scenes/food-story.webp',
} as const;

export async function ExampleBuildsSection({ number }: { number?: string }) {
  const labels = await getExampleUiLabels();
  const examples = await getLocalizedFeaturedExamples();

  return (
    <Section border className="overflow-hidden" number={number}>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-navy">{labels.home.sectionLabel}</p>
          <h2 className="mt-4 max-w-[13ch] font-serif text-5xl font-medium leading-[0.98] md:text-6xl lg:text-7xl">
            {labels.home.heading}
          </h2>
        </div>
        <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{labels.home.note}</p>
      </div>

      <div className="mt-12 bg-[#fdfaf4] p-3 text-brand-charcoal shadow-[0_24px_70px_rgba(32,35,31,0.12)] md:p-5">
        <div className="flex justify-between gap-6 border-b border-brand-charcoal/20 pb-3 text-xs font-semibold uppercase">
          <span>{labels.home.kicker}</span>
          <span>01-03 / {labels.typeLabels['demo-build']}</span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {examples.map((example, index) => (
            <Link
              key={example.id}
              href={`/work/${example.slug}`}
              data-analytics-event="work_example_card_click"
              data-analytics-section="homepage_examples"
              data-analytics-item={example.slug}
              className={`group block min-w-0 border border-brand-charcoal/15 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === 2 ? 'md:col-span-2' : ''}`}
            >
              <figure>
                <div className={`relative overflow-hidden bg-muted ${index === 2 ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
                  <Image
                    src={imageBySector[example.sector]}
                    alt={example.shortDescription}
                    fill
                    sizes={index === 2 ? '(max-width: 768px) 100vw, 90vw' : '(max-width: 768px) 100vw, 45vw'}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
                <figcaption className="flex items-start justify-between gap-4 p-3 text-sm md:p-4">
                  <span className="font-semibold">{example.title}</span>
                  <span className="shrink-0 text-xs font-semibold uppercase text-brand-serene-coral-darken">{labels.statusLabels[example.status]}</span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>

        <p className="mt-4 border-t border-brand-charcoal/20 pt-3 text-xs leading-relaxed text-muted-foreground">
          {examples[0]?.disclaimer}
        </p>
      </div>

      <Link
        href="/work"
        data-analytics-event="work_examples_index_cta_click"
        data-analytics-section="homepage_examples"
        className="mt-8 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-navy transition-colors hover:text-foreground"
      >
        {labels.home.cta}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
