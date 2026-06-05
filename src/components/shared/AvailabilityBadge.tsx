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
    <div className={`inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-1.5 text-ink ${className}`}>
      <span className="relative flex size-2">
        <span className={`relative inline-flex size-2 rounded-full ${status === 'available' ? 'bg-success' : 'bg-warning'}`} />
      </span>
      <span className="text-xs font-medium text-ink">{label}</span>
    </div>
  );
}
