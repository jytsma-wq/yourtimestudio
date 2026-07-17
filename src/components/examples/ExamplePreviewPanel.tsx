import Image from 'next/image';
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
          aria-hidden="true"
          className={cn(
            'flex h-full items-center justify-center p-5 text-left',
            isDark ? 'bg-background/8' : 'bg-background',
          )}
        >
          <div
            className={cn(
              'flex h-full w-full max-w-sm flex-col border p-5',
              isDark
                ? 'border-background/25 bg-background/8'
                : 'border-border bg-card',
            )}
          >
            <div className={cn('mb-5 h-2 w-20', isDark ? 'bg-background/24' : 'bg-border')} />
            <div className="space-y-2">
              <div className={cn('h-3 w-4/5', isDark ? 'bg-background/32' : 'bg-foreground/16')} />
              <div className={cn('h-3 w-2/3', isDark ? 'bg-background/24' : 'bg-muted-foreground/18')} />
              <div className={cn('h-3 w-3/5', isDark ? 'bg-background/24' : 'bg-muted-foreground/18')} />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2 pt-8">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className={cn('h-12 border', isDark ? 'border-background/20' : 'border-border bg-muted/40')}
                />
              ))}
            </div>
            <p
              className={cn(
                'mt-5 text-sm font-semibold',
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
