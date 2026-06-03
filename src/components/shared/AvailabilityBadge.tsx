import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site-config';

interface AvailabilityBadgeProps {
  className?: string;
}

export async function AvailabilityBadge({ className = '' }: AvailabilityBadgeProps) {
  const t = await getTranslations('availability');
  const { status } = siteConfig.availability;
  const label = t(status);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border shadow-none ${className}`}>
      <span className="relative flex size-2">
        <span className={`relative inline-flex rounded-full size-2 ${status === 'available' ? 'bg-brand-serene-coral' : 'bg-brand-serene-coral'}`} />
      </span>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  );
}
