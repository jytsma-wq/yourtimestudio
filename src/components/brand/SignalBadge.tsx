import { cn } from '@/lib/utils';

type SignalBadgeTone = 'sea' | 'oxide' | 'success' | 'muted';

interface SignalBadgeProps {
  label: string;
  tone?: SignalBadgeTone;
  className?: string;
}

const toneClasses: Record<SignalBadgeTone, string> = {
  sea: 'border-sea-bright/25 bg-sea-bright/10 text-sea-bright',
  oxide: 'border-oxide-hover/30 bg-oxide/15 text-oxide-hover',
  success: 'border-success/25 bg-success/10 text-success',
  muted: 'border-hairline bg-surface-elevated text-muted',
};

export function SignalBadge({ label, tone = 'sea', className }: SignalBadgeProps) {
  return (
    <span
      className={cn(
        'mono-label inline-flex w-fit max-w-full items-center gap-1.5 rounded-sm border px-2 py-1 leading-none',
        toneClasses[tone],
        className
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </span>
  );
}
