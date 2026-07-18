import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Background variant — determines the section's visual rhythm */
  variant?: 'default' | 'subtle' | 'dark' | 'accent';
  /** Whether to show a top border (needed when adjacent sections share the same bg) */
  border?: boolean;
  id?: string;
  /** Optional section number retained for compatibility with older layouts */
  number?: string;
}

/**
 * Section wrapper that enforces consistent padding, max-width, and
 * background alternation across the site.
 *
 * Variants:
 *   default — warm page background
 *   subtle  — soft neutral surface for alternating rhythm
 *   dark    — restrained deep sea for selective contrast
 *   accent  — restrained deep sea for primary CTA bands
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
        'relative px-[var(--container-padding)] py-[var(--section-padding)]',
        number && 'section-numbered',
        variant === 'default' && 'bg-background',
        variant === 'subtle' && 'bg-muted',
        variant === 'dark' && 'bg-navy text-background',
        variant === 'accent' && 'bg-navy text-background',
        border && 'border-t border-border',
        className
      )}
    >
      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">{children}</div>
    </section>
  );
}
