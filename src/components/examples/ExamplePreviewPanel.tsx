import Image from 'next/image';
import type { Example, ExampleSector } from '@/content/examples';
import { cn } from '@/lib/utils';

type ExamplePreviewPanelProps = {
  example: Pick<Example, 'title' | 'screenshot' | 'imageAlt' | 'sector'>;
  sizes: string;
  className?: string;
  imageClassName?: string;
  tone?: 'light' | 'dark';
};

const fallbackVisuals: Record<ExampleSector, string> = {
  hospitality: '/images/studio-scenes/hospitality-hero.webp',
  medical: '/images/studio-scenes/clinic-story.webp',
  beauty: '/images/studio-scenes/beauty-studio.webp',
  studio: '/og-default.jpg',
};

export function ExamplePreviewPanel({
  example,
  sizes,
  className,
  imageClassName,
  tone = 'light',
}: ExamplePreviewPanelProps) {
  const isDark = tone === 'dark';
  const visual = example.screenshot ?? fallbackVisuals[example.sector];

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-muted',
        isDark && 'bg-navy',
        className,
      )}
    >
      <Image
        src={visual}
        alt={example.screenshot ? example.imageAlt : ''}
        fill
        className={cn('object-cover transition-transform duration-500 group-hover:scale-[1.015]', imageClassName)}
        sizes={sizes}
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-brand-charcoal/48 via-transparent to-transparent',
          isDark && 'from-brand-charcoal/62',
        )}
        aria-hidden="true"
      />
      <p className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] text-sm font-semibold text-white md:bottom-5 md:left-5">
        {example.title}
      </p>
    </div>
  );
}
