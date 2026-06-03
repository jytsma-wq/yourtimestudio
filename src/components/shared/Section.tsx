import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Background variant — determines the section's visual rhythm */
  variant?: 'default' | 'subtle' | 'dark' | 'accent';
  /** Whether to show a top border (needed when adjacent sections share the same bg) */
  border?: boolean;
  id?: string;
  /** Large faint section number (e.g. "01", "02") shown as background decoration */
  number?: string;
}

/**
 * Section wrapper that enforces consistent padding, max-width, and
 * background alternation across the site.
 *
 * Variants:
 *   default — warm off-white (bg-background)
 *   subtle  — soft neutral surface (bg-muted) — for alternating rhythm
 *   dark    — restrained deep sea (bg-navy) — for case studies, CTAs on dark
 *   accent  — restrained deep sea (bg-navy) — for primary CTA bands
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
        'py-16 md:py-24 px-4 md:px-8 relative',
        number && 'section-numbered',
        variant === 'default' && 'bg-background',
        variant === 'subtle' && 'bg-muted',
        variant === 'dark' && 'bg-navy text-background',
        variant === 'accent' && 'bg-navy text-background',
        border && 'border-t border-border',
        className
      )}
    >
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
}
