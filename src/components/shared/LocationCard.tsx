import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';

export async function LocationCard() {
  const ui = await getTranslations('ui');

  return (
    <div className="flex items-start gap-3 rounded-md border border-hairline bg-surface p-4 text-ink">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sea/20">
        <MapPin className="size-4 text-sea-bright" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{ui('location')}</p>
        <p className="mt-1 text-xs leading-relaxed text-copy-muted">
          {ui('locationArea')}
        </p>
      </div>
    </div>
  );
}
