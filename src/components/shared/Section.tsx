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
 *   subtle  — slightly tinted beige (bg-brand-gray-100) — for alternating rhythm
 *   dark    — deep navy (bg-foreground) — for case studies, CTAs on dark
 *   accent  — navy (bg-brand-sage-green-darken) — for primary CTA bands
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
        'py-16 md:py-24 px-4 md:px-8 relative paper-texture',
        number && 'section-numbered',
        variant === 'default' && 'bg-background',
        variant === 'subtle' && 'bg-brand-gray-100',
        variant === 'dark' && 'bg-foreground text-background',
        variant === 'accent' && 'bg-brand-sage-green-darken text-background',
        border && 'border-t border-border',
        className
      )}
    >
      {/* Angled bottom edge for dark sections */}
      {variant === 'dark' && (
        <div
          className="absolute bottom-0 left-0 right-0 h-4 bg-background"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
          aria-hidden="true"
        />
      )}
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
}
