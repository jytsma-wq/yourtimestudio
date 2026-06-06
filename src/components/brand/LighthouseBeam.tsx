import { useId } from 'react';

import { cn } from '@/lib/utils';

interface LighthouseBeamProps {
  className?: string;
}

export function LighthouseBeam({ className }: LighthouseBeamProps) {
  const gradientId = useId().replace(/:/g, '');
  const beamGradientId = `bl-lighthouse-beam-${gradientId}`;
  const horizonGradientId = `bl-lighthouse-horizon-${gradientId}`;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bl-beacon-beam',
        'max-sm:opacity-60',
        className
      )}
    >
      <svg
        className="absolute left-[-12%] top-[8%] h-[62vw] max-h-[560px] min-h-64 w-[120vw] max-w-[1120px] opacity-60 max-sm:left-[-48%] max-sm:top-[18%] max-sm:h-[92vw]"
        viewBox="0 0 1120 560"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id={beamGradientId} x1="0" x2="1" y1="0.5" y2="0.5">
            <stop offset="0%" stopColor="var(--primitive-oxide-hover)" stopOpacity="0" />
            <stop offset="42%" stopColor="var(--primitive-oxide-hover)" stopOpacity="0.12" />
            <stop offset="62%" stopColor="var(--primitive-sea-bright)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--primitive-sea-bright)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={horizonGradientId} x1="0" x2="1" y1="0.5" y2="0.5">
            <stop offset="0%" stopColor="var(--primitive-sea-bright)" stopOpacity="0" />
            <stop offset="48%" stopColor="var(--primitive-sea-bright)" stopOpacity="0.38" />
            <stop offset="100%" stopColor="var(--primitive-oxide-hover)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 282 L1120 24 L1120 520 L0 338 Z" fill={`url(#${beamGradientId})`} />
        <path d="M80 356 C280 338 484 346 674 330 C842 316 976 320 1088 306" fill="none" stroke={`url(#${horizonGradientId})`} strokeWidth="1.2" />
      </svg>
    </div>
  );
}
