import { cn } from '@/lib/utils';

type NavigationChartVariant = 'hero' | 'section' | 'footer';

interface NavigationChartProps {
  variant?: NavigationChartVariant;
  className?: string;
}

const variantClasses: Record<NavigationChartVariant, string> = {
  hero: 'opacity-70',
  section: 'opacity-45',
  footer: 'opacity-28',
};

const variantLabels: Record<NavigationChartVariant, string[]> = {
  hero: ['N41.6168', 'E41.6367', 'BL-01'],
  section: ['BL-CHART', 'RTE-02', 'SEA-UX'],
  footer: ['N41.6168', 'E41.6367', 'BATUMI'],
};

export function NavigationChart({ variant = 'section', className }: NavigationChartProps) {
  const labels = variantLabels[variant];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bl-navigation-chart',
        variantClasses[variant],
        className
      )}
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        focusable="false"
      >
        <g stroke="var(--bl-chart-line)" strokeWidth="0.18" vectorEffect="non-scaling-stroke">
          <line x1="12" y1="0" x2="12" y2="60" />
          <line x1="31" y1="0" x2="31" y2="60" />
          <line x1="50" y1="0" x2="50" y2="60" />
          <line x1="69" y1="0" x2="69" y2="60" />
          <line x1="88" y1="0" x2="88" y2="60" />
          <line x1="0" y1="12" x2="100" y2="12" />
          <line x1="0" y1="30" x2="100" y2="30" />
          <line x1="0" y1="48" x2="100" y2="48" />
        </g>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
          <path
            d="M8 46 C22 34 31 38 43 28 S65 18 88 14"
            stroke="var(--bl-chart-line-strong)"
            strokeWidth="0.55"
          />
          <path
            d="M18 18 L36 27 L51 23 L67 33 L82 28"
            stroke="var(--primitive-oxide-hover)"
            strokeOpacity="0.5"
            strokeWidth="0.42"
          />
          <path
            d="M5 54 L34 42 L58 46 L95 36"
            stroke="var(--primitive-sea-bright)"
            strokeOpacity="0.34"
            strokeWidth="0.36"
          />
        </g>
        <g>
          <circle cx="18" cy="18" r="0.85" fill="var(--primitive-oxide-hover)" />
          <circle cx="43" cy="28" r="0.85" fill="var(--primitive-sea-bright)" />
          <circle cx="67" cy="33" r="0.85" fill="var(--primitive-oxide)" />
          <circle cx="88" cy="14" r="0.85" fill="var(--primitive-sea-bright)" />
          <path d="M51 23 L52.2 24.2 L51 25.4 L49.8 24.2 Z" fill="var(--primitive-oxide-hover)" opacity="0.75" />
        </g>
      </svg>

      <div className="absolute left-[7%] top-[18%] hidden gap-3 text-sea-bright/80 md:flex">
        {labels.map((label) => (
          <span key={label} className="bl-coordinates">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
