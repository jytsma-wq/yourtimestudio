import Image from 'next/image';
import { Monitor } from 'lucide-react';
import type { Example } from '@/content/examples';
import { cn } from '@/lib/utils';

type ExamplePreviewPanelProps = {
  example: Pick<Example, 'title' | 'screenshot' | 'imageAlt'>;
  sizes: string;
  screenshotPlaceholder: string;
  className?: string;
  imageClassName?: string;
  tone?: 'light' | 'dark';
};

export function ExamplePreviewPanel({
  example,
  sizes,
  screenshotPlaceholder,
  className,
  imageClassName,
  tone = 'light',
}: ExamplePreviewPanelProps) {
  const isDark = tone === 'dark';

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {example.screenshot ? (
        <Image
          src={example.screenshot}
          alt={example.imageAlt}
          fill
          className={cn('object-cover', imageClassName)}
          sizes={sizes}
        />
      ) : (
        <div
          className={cn(
            'flex h-full items-center justify-center p-6 text-center',
            isDark ? 'bg-background/8' : 'bg-background',
          )}
        >
          <div
            className={cn(
              'w-full max-w-sm border border-dashed p-5',
              isDark
                ? 'border-background/25 bg-background/8'
                : 'border-border bg-muted/30',
            )}
          >
            <Monitor
              className={cn(
                'mx-auto mb-3 size-8',
                isDark ? 'text-background' : 'text-muted-foreground',
              )}
            />
            <p
              className={cn(
                'text-sm font-semibold',
                isDark ? 'text-background' : 'text-foreground',
              )}
            >
              {screenshotPlaceholder}
            </p>
            <p
              className={cn(
                'mt-2 text-xs leading-relaxed',
                isDark ? 'text-background/72' : 'text-muted-foreground',
              )}
            >
              {example.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
