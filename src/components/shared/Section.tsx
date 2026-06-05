import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'dark' | 'accent' | 'paper' | 'surface';
  border?: boolean;
  id?: string;
  number?: string;
}

/**
 * Section wrapper that enforces consistent padding, max-width, and
 * background alternation across the site.
 *
 * Variants:
 *   default — dark canvas
 *   subtle  — slightly lighter dark
 *   dark    — deep dark (same as default)
 *   accent  — sea-dark accent
 *   paper   — warm paper contrast
 *   surface — elevated dark surface
 */
export function Section({
  children,
  className,
  variant = 'default',
  border = false,
  id,
  number,
}: SectionProps) {
  return (
    <section
      id={id}
      data-number={number || undefined}
      className={cn(
        'py-16 md:py-24 px-[var(--container-padding)] relative',
        variant === 'default' && 'bg-canvas text-ink',
        variant === 'subtle' && 'bg-canvas-soft text-ink',
        variant === 'dark' && 'bg-canvas text-ink',
        variant === 'accent' && 'bg-sea text-ink',
        variant === 'paper' && 'bg-paper text-ink-dark',
        variant === 'surface' && 'bg-surface text-ink',
        border && 'border-t border-hairline',
        className
      )}
    >
      <div className="max-w-[var(--container-max-width)] mx-auto relative z-10">{children}</div>
    </section>
  );
}
