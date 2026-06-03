import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';

export async function LocationCard() {
  const ui = await getTranslations('ui');

  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-card p-4 shadow-none">
      <div className="w-9 h-9 rounded-lg bg-brand-serene-coral/10 flex items-center justify-center shrink-0">
        <MapPin className="size-4 text-brand-serene-coral-darken" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{ui('location')}</p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
          {ui('locationArea')}
        </p>
      </div>
    </div>
  );
}
