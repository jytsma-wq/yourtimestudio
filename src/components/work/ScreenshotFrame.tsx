'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type ScreenshotFrameProps = {
  src?: string;
  alt: string;
  label?: string;
  device?: 'desktop' | 'tablet' | 'mobile';
  priority?: boolean;
  fallback?: ReactNode;
  className?: string;
};

const screenAspectClasses: Record<NonNullable<ScreenshotFrameProps['device']>, string> = {
  desktop: 'aspect-[16/10]',
  tablet: 'aspect-[4/5]',
  mobile: 'aspect-[9/16]',
};

const imageSizes: Record<NonNullable<ScreenshotFrameProps['device']>, string> = {
  desktop: '(min-width: 1024px) 54vw, 100vw',
  tablet: '(min-width: 1024px) 32vw, 84vw',
  mobile: '(min-width: 1024px) 22vw, 78vw',
};

function ScreenshotImage({
  alt,
  device,
  onError,
  priority,
  src,
}: {
  alt: string;
  device: NonNullable<ScreenshotFrameProps['device']>;
  onError: () => void;
  priority: boolean;
  src: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={imageSizes[device]}
        className="object-cover object-top"
        onError={onError}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,transparent_0_44%,rgba(0,0,0,0.5)_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
    </>
  );
}

function EmptyFallback({ alt }: { alt: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center bg-canvas p-6 text-center">
      <p className="max-w-xs font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
        {alt}
      </p>
    </div>
  );
}

export function ScreenshotFrame({
  alt,
  className,
  device = 'desktop',
  fallback,
  label,
  priority = false,
  src,
}: ScreenshotFrameProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const fallbackContent = fallback ?? <EmptyFallback alt={alt} />;
  const shouldRenderImage = Boolean(src) && failedSrc !== src;

  return (
    <figure className={cn('group min-w-0', className)}>
      {shouldRenderImage && src ? (
        <>
          {device === 'desktop' && (
            <div className="overflow-hidden rounded-md border border-hairline bg-surface shadow-premium-lg">
              <div className="flex min-w-0 items-center gap-2 border-b border-hairline bg-surface-elevated/65 px-3 py-2">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-hairline-light/80" />
                  <span className="size-2 rounded-full bg-hairline-light/55" />
                  <span className="size-2 rounded-full bg-hairline-light/35" />
                </div>
                <div className="h-5 min-w-0 flex-1 rounded bg-canvas/90" aria-hidden="true" />
                <div className="hidden h-5 w-16 rounded bg-canvas/60 sm:block" aria-hidden="true" />
              </div>
              <div className={cn('relative overflow-hidden bg-canvas', screenAspectClasses.desktop)}>
                <ScreenshotImage
                  alt={alt}
                  device="desktop"
                  onError={() => setFailedSrc(src)}
                  priority={priority}
                  src={src}
                />
              </div>
            </div>
          )}

          {device === 'tablet' && (
            <div className="rounded-[1.35rem] border border-hairline bg-surface p-2 shadow-premium-lg">
              <div className={cn('relative overflow-hidden rounded-[1rem] border border-hairline bg-canvas', screenAspectClasses.tablet)}>
                <ScreenshotImage
                  alt={alt}
                  device="tablet"
                  onError={() => setFailedSrc(src)}
                  priority={priority}
                  src={src}
                />
              </div>
            </div>
          )}

          {device === 'mobile' && (
            <div className="rounded-[2rem] border border-hairline bg-surface p-2 shadow-premium-lg">
              <div className={cn('relative overflow-hidden rounded-[1.45rem] border border-hairline bg-canvas', screenAspectClasses.mobile)}>
                <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/55 ring-1 ring-white/10" aria-hidden="true" />
                <ScreenshotImage
                  alt={alt}
                  device="mobile"
                  onError={() => setFailedSrc(src)}
                  priority={priority}
                  src={src}
                />
              </div>
            </div>
          )}
        </>
      ) : fallback ? (
        fallbackContent
      ) : (
        <div className="overflow-hidden rounded-md border border-hairline bg-surface shadow-premium-lg">
          {fallbackContent}
        </div>
      )}

      {label && (
        <figcaption className="mt-3 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
