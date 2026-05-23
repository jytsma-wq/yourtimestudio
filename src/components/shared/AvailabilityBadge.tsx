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
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-sm ${className}`}>
      <span className="relative flex size-2">
        {status === 'available' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-45" />
        )}
        <span className={`relative inline-flex rounded-full size-2 ${status === 'available' ? 'bg-teal' : 'bg-rose'}`} />
      </span>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  );
}
