import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';

export async function LocationCard() {
  const ui = await getTranslations('ui');

  return (
    <div className="bg-card border border-border rounded-xl shadow-premium p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
        <MapPin className="size-4 text-teal" />
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
