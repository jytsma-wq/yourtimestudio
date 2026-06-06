import type { ReactNode } from 'react';
import {
  BedDouble,
  CalendarDays,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import type { ExampleSystem } from '@/content/example-systems';
import { getPrimaryExampleScreenshot } from '@/lib/work-screenshots';
import { cn } from '@/lib/utils';
import { ScreenshotFrame } from './ScreenshotFrame';

type ExampleSystemVisualVariant = 'card' | 'hero';

interface ExampleSystemVisualProps {
  className?: string;
  imagePriority?: boolean;
  screenshotsComingSoon: string;
  showMissingLabel?: boolean;
  system: ExampleSystem;
  variant?: ExampleSystemVisualVariant;
}

const imageFrameClasses: Record<ExampleSystemVisualVariant, string> = {
  card: '',
  hero: '',
};

function BrowserChrome({
  children,
  sector,
  url,
}: {
  children: ReactNode;
  sector: string;
  url: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-surface shadow-premium-lg">
      <div className="flex min-w-0 items-center gap-2 border-b border-hairline px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-hairline-light/70" />
          <span className="size-2 rounded-full bg-hairline-light/50" />
          <span className="size-2 rounded-full bg-hairline-light/30" />
        </div>
        <div className="min-w-0 flex-1 rounded bg-canvas px-2 py-1 font-mono text-[10px] text-muted">
          <span className="block truncate">{url}</span>
        </div>
        <span className="hidden shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sea-bright sm:inline">
          {sector}
        </span>
      </div>
      <div className="relative overflow-hidden p-4">
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

function HotelBookingFallback() {
  return (
    <BrowserChrome url="direct.hotel.ge/rooms" sector="Hospitality">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {['EN', 'KA', 'RU', 'TR'].map((language) => (
            <span key={language} className="rounded border border-hairline bg-canvas px-2 py-1 font-mono text-[10px] text-muted">
              {language}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Check-in', 'Nights', 'Guests'].map((label) => (
            <div key={label} className="rounded border border-hairline bg-canvas p-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{label}</p>
              <div className="mt-2 h-1.5 w-10 rounded bg-sea-bright/70" />
            </div>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {['Sea view room', 'Family stay'].map((room) => (
            <div key={room} className="rounded border border-hairline bg-surface-elevated p-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-ink">
                <BedDouble className="size-3.5 text-sea-bright" aria-hidden="true" />
                <span>{room}</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                <span className="h-1.5 flex-1 rounded bg-hairline-light/50" />
                <span className="h-1.5 w-8 rounded bg-hairline-light/30" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 rounded border border-oxide/40 bg-oxide/15 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-ink">
            <CalendarDays className="size-3.5 text-oxide-hover" aria-hidden="true" />
            <span>Direct booking path</span>
          </div>
          <span className="rounded bg-oxide px-2.5 py-1 text-xs font-semibold text-white">Book direct</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
          <MapPin className="size-3.5 text-sea-bright" aria-hidden="true" />
          <span>Location trust</span>
          <span className="text-hairline-light">/</span>
          <span>Policy strip</span>
        </div>
      </div>
    </BrowserChrome>
  );
}

function ClinicTrustFallback() {
  return (
    <BrowserChrome url="clinic.ge/treatments" sector="Medical">
      <div className="space-y-3">
        <div className="rounded border border-hairline bg-canvas p-3">
          <div className="flex items-start gap-2">
            <Stethoscope className="mt-0.5 size-4 text-sea-bright" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-ink">Treatment category</p>
              <p className="mt-1 text-xs text-muted">Overview, safety, preparation, aftercare.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded border border-hairline bg-surface-elevated p-3">
          <div className="flex size-8 items-center justify-center rounded bg-sea/30 font-mono text-xs font-semibold text-sea-bright">
            DR
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-ink">Doctor profile row</p>
            <p className="truncate text-xs text-muted">Credentials and languages</p>
          </div>
          <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
        </div>
        <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="rounded border border-hairline bg-canvas px-3 py-2">
            <p className="text-xs font-medium text-ink">FAQ trust signal</p>
            <p className="mt-1 text-xs text-muted">Answers before contact.</p>
          </div>
          <span className="rounded bg-oxide px-3 py-2 text-center text-xs font-semibold text-white">
            Request consult
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
          <Languages className="size-3.5 text-sea-bright" aria-hidden="true" />
          <span>Multilingual intake</span>
          {['EN', 'KA', 'RU'].map((language) => (
            <span key={language} className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px]">
              {language}
            </span>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

function BeautyBookingFallback() {
  return (
    <BrowserChrome url="studio.ge/book" sector="Beauty">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {['Hair', 'Nails', 'Makeup'].map((service) => (
            <div key={service} className="rounded border border-hairline bg-canvas p-2 text-center">
              <Sparkles className="mx-auto size-3.5 text-oxide-hover" aria-hidden="true" />
              <p className="mt-1 text-xs font-medium text-ink">{service}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Price', 'Time', 'Artist'].map((detail) => (
            <div key={detail} className="rounded border border-hairline bg-surface-elevated px-2 py-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{detail}</p>
              <div className="mt-2 h-1.5 rounded bg-hairline-light/40" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 rounded border border-oxide/40 bg-oxide/15 px-3 py-2">
          <span className="text-xs font-medium text-ink">Appointment flow</span>
          <span className="rounded bg-oxide px-2.5 py-1 text-xs font-semibold text-white">Book</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {['Look', 'Space', 'Result', 'Team'].map((label) => (
            <div key={label} className="aspect-[4/3] rounded border border-hairline bg-canvas p-1.5">
              <div className="h-full rounded-sm border border-sea/20 bg-surface-elevated" />
              <span className="sr-only">{label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline pt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sea-bright">
          Instagram to booking
        </div>
      </div>
    </BrowserChrome>
  );
}

export function ExampleSystemFallbackVisual({ fallbackVisual }: { fallbackVisual: ExampleSystem['fallbackVisual'] }) {
  if (fallbackVisual === 'hotel-booking') return <HotelBookingFallback />;
  if (fallbackVisual === 'clinic-trust') return <ClinicTrustFallback />;
  return <BeautyBookingFallback />;
}

export function ExampleSystemVisual({
  className,
  imagePriority = false,
  screenshotsComingSoon,
  showMissingLabel = true,
  system,
  variant = 'card',
}: ExampleSystemVisualProps) {
  const screenshotSrc = getPrimaryExampleScreenshot(system);

  return (
    <ScreenshotFrame
      alt={system.screenshot?.alt ?? `${system.title} interface preview`}
      className={cn(imageFrameClasses[variant], className)}
      device="desktop"
      fallback={<ExampleSystemFallbackVisual fallbackVisual={system.fallbackVisual} />}
      label={screenshotSrc ? system.title : showMissingLabel ? screenshotsComingSoon : undefined}
      priority={imagePriority}
      src={screenshotSrc}
    />
  );
}
