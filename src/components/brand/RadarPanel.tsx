import { cn } from '@/lib/utils';

interface RadarPanelProps {
  className?: string;
}

const radarLabels = [
  { label: 'UX', className: 'left-[18%] top-[24%] text-sea-bright' },
  { label: 'SEO', className: 'right-[18%] top-[18%] text-ink' },
  { label: 'Speed', className: 'right-[13%] bottom-[24%] text-oxide-hover' },
  { label: 'Trust', className: 'left-[10%] bottom-[22%] text-success' },
  { label: 'Booking', className: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ink' },
];

export function RadarPanel({ className }: RadarPanelProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative aspect-square w-full max-w-56 overflow-hidden rounded-md border border-hairline bg-canvas/88 p-3 shadow-[0_18px_80px_rgba(0,0,0,0.22)]',
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-3 size-[calc(100%-1.5rem)] opacity-65"
        viewBox="0 0 160 160"
        focusable="false"
      >
        <g fill="none" stroke="var(--bl-chart-line)" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <circle cx="80" cy="80" r="24" />
          <circle cx="80" cy="80" r="46" />
          <circle cx="80" cy="80" r="68" />
          <line x1="80" y1="12" x2="80" y2="148" />
          <line x1="12" y1="80" x2="148" y2="80" />
        </g>
        <g fill="var(--primitive-sea-bright)" opacity="0.75">
          <circle cx="44" cy="54" r="2.5" />
          <circle cx="112" cy="45" r="2.5" />
          <circle cx="118" cy="110" r="2.5" />
        </g>
        <circle cx="49" cy="116" r="2.5" fill="var(--primitive-oxide-hover)" opacity="0.76" />
      </svg>

      <div className="absolute inset-3 bl-radar opacity-80" />

      {radarLabels.map(({ label, className: labelClassName }) => (
        <span
          key={label}
          className={cn(
            'absolute rounded-sm border border-hairline bg-canvas/78 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase leading-none',
            labelClassName
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
