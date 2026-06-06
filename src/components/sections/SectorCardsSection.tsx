import type { CSSProperties } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BarChart3,
  BedDouble,
  CalendarDays,
  Check,
  Globe,
  Monitor,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { sectorKeys, sectors, type SectorKey, type SectorMeta } from '@/lib/sector-config';
import { cn } from '@/lib/utils';

type SectorStyle = CSSProperties & {
  '--sector-color': string;
  '--bl-signal-position'?: string;
};

interface SectorVisualConfig {
  alt: string;
  cardClassName: string;
  imageClassName: string;
  labels: string[];
  markerClassName: string;
  markerLabel: string;
  routeChips: string[];
  signalPosition: string;
  sizes: string;
}

interface SectorImageStageProps {
  deliverables: string[];
  sector: SectorMeta;
  sectorKey: SectorKey;
}

interface SectorOverlayProps {
  deliverables: string[];
  sector: SectorMeta;
}

const sectorIcons: Record<SectorKey, LucideIcon[]> = {
  hospitality: [Monitor, Globe, Zap],
  medical: [Search, BarChart3, Check],
  beauty: [Monitor, Zap, Globe],
};

const sectorTechChips: Record<SectorKey, string[]> = {
  hospitality: ['Direct booking flow', 'Room availability', 'Multilingual pages', 'Local SEO'],
  medical: ['Trust architecture', 'Treatment pages', 'Doctor profiles', 'Multilingual intake'],
  beauty: ['Appointment flow', 'Service menu', 'Instagram-to-booking', 'Location trust'],
};

const sectorVisuals: Record<SectorKey, SectorVisualConfig> = {
  hospitality: {
    alt: 'Seafront hotel building used as context for a hospitality booking website system.',
    cardClassName: 'md:col-span-2 lg:col-span-2',
    imageClassName: 'aspect-[4/3] sm:aspect-[21/10] lg:aspect-[21/9]',
    labels: ['PMS HANDOFF', 'DIRECT RATE', 'LOCAL INTENT'],
    markerClassName: 'right-[8%] top-[32%]',
    markerLabel: 'Booking signal',
    routeChips: ['/rooms', '/offers', '/book', '/en'],
    signalPosition: '73%',
    sizes: '(min-width: 1024px) 50vw, (min-width: 768px) 100vw, 100vw',
  },
  medical: {
    alt: 'Dental clinic treatment room used as context for a medical trust website system.',
    cardClassName: 'md:col-span-1 lg:col-span-1',
    imageClassName: 'aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4]',
    labels: ['CREDENTIALS', 'FAQ CLARITY', 'INTAKE FLOW'],
    markerClassName: 'right-[16%] top-[24%]',
    markerLabel: 'Trust signal',
    routeChips: ['/treatments', '/doctors', '/faq'],
    signalPosition: '58%',
    sizes: '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw',
  },
  beauty: {
    alt: 'Beauty salon chairs used as context for an appointment website system.',
    cardClassName: 'md:col-span-1 lg:col-span-1',
    imageClassName: 'aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4]',
    labels: ['SERVICE MENU', 'PRICE CONTEXT', 'SOCIAL ROUTE'],
    markerClassName: 'left-[18%] top-[32%]',
    markerLabel: 'Appointment signal',
    routeChips: ['/services', '/gallery', '/book'],
    signalPosition: '64%',
    sizes: '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw',
  },
};

function RouteChips({ chips }: { chips: string[] }) {
  return (
    <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded border border-ink/10 bg-canvas/80 px-2 py-1 font-mono text-[10px] font-semibold leading-none text-ink shadow-premium backdrop-blur"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function TechnicalLabels({ labels }: { labels: string[] }) {
  return (
    <div className="absolute left-4 top-14 z-20 hidden max-w-[52%] flex-col gap-1.5 sm:flex">
      {labels.map((label) => (
        <span
          key={label}
          className="w-fit rounded border border-ink/10 bg-canvas/70 px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none text-muted backdrop-blur"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function SignalMarker({ className, label }: { className: string; label: string }) {
  return (
    <div className={cn('absolute z-20 flex items-center gap-2', className)}>
      <span className="relative flex size-5 items-center justify-center" aria-hidden="true">
        <span className="absolute size-5 rotate-45 border border-[color:var(--sector-color)] bg-canvas/80 shadow-[0_0_28px_rgba(31,111,120,0.35)] backdrop-blur" />
        <span className="absolute size-9 rounded-full border border-[color:var(--sector-color)]/35 opacity-75" />
        <span className="relative size-1.5 rounded-full bg-[color:var(--sector-color)]" />
      </span>
      <span className="hidden rounded border border-ink/10 bg-canvas/75 px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none text-ink backdrop-blur sm:inline">
        {label}
      </span>
    </div>
  );
}

function PreviewChrome({ label }: { label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 border-b border-ink/10 px-3 py-2">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-muted/60" />
        <span className="size-1.5 rounded-full bg-muted/40" />
        <span className="size-1.5 rounded-full bg-muted/25" />
      </div>
      <span className="min-w-0 truncate font-mono text-[10px] font-semibold uppercase text-muted">{label}</span>
    </div>
  );
}

function HospitalityOverlay({ deliverables, sector }: SectorOverlayProps) {
  return (
    <div className="absolute bottom-4 right-4 z-30 w-[min(520px,calc(100%-2rem))] overflow-hidden rounded-md border border-ink/10 bg-canvas/[0.82] shadow-premium-lg backdrop-blur-md">
      <PreviewChrome label="direct-booking.route" />
      <div className="grid gap-3 p-3 sm:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="mono-label text-sea-bright">Booking path</p>
            <CalendarDays className="size-4 shrink-0 text-oxide-hover" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {['Room', 'Rate', 'Guest', 'Direct'].map((step, index) => (
              <div key={step} className="rounded border border-hairline bg-surface/85 px-2 py-2">
                <p className="font-mono text-[10px] font-semibold text-muted">0{index + 1}</p>
                <p className="mt-1 truncate text-xs font-semibold text-ink">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden rounded border border-[color:var(--sector-color)]/35 bg-sea/[0.18] p-3 sm:block">
          <div className="mb-2 flex items-center gap-2">
            <BedDouble className={cn('size-4', sector.textClass)} aria-hidden="true" />
            <p className="line-clamp-1 text-xs font-semibold text-ink">{deliverables[1]}</p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['EN', 'KA', 'RU'].map((language) => (
              <span key={language} className="rounded bg-canvas/85 px-2 py-1 text-center font-mono text-[10px] font-semibold text-muted">
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MedicalOverlay({ deliverables, sector }: SectorOverlayProps) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 overflow-hidden rounded-md border border-ink/10 bg-canvas/[0.84] shadow-premium-lg backdrop-blur-md">
      <PreviewChrome label="clinic-trust.panel" />
      <div className="grid gap-3 p-3">
        <div className="flex items-start gap-3 rounded border border-[color:var(--sector-color)]/35 bg-sea/[0.18] p-3">
          <div className={cn('flex size-9 shrink-0 items-center justify-center rounded border', sector.bgLight, sector.borderClass)}>
            <Stethoscope className={cn('size-4', sector.textClass)} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-xs font-semibold text-ink">{deliverables[0]}</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <span className="h-1.5 rounded bg-hairline-light/50" />
              <span className="h-1.5 rounded bg-hairline-light/30" />
              <span className="h-1.5 rounded bg-hairline-light/45" />
            </div>
          </div>
          <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Verified doctor', 'Consent-aware FAQ'].map((item) => (
            <span key={item} className="rounded border border-hairline bg-surface/85 px-2 py-2 text-xs font-semibold text-ink">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeautyOverlay({ deliverables, sector }: SectorOverlayProps) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 overflow-hidden rounded-md border border-ink/10 bg-canvas/[0.84] shadow-premium-lg backdrop-blur-md">
      <PreviewChrome label="service-grid.appointment" />
      <div className="grid gap-3 p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {['Cut', 'Color', 'Nails'].map((service) => (
            <div key={service} className="rounded border border-hairline bg-surface/85 px-2 py-2">
              <Scissors className={cn('mb-2 size-3.5', sector.textClass)} aria-hidden="true" />
              <p className="truncate text-xs font-semibold text-ink">{service}</p>
            </div>
          ))}
        </div>
        <div className="rounded border border-oxide/35 bg-oxide/[0.18] p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="line-clamp-1 text-xs font-semibold text-ink">{deliverables[1]}</p>
            <Sparkles className="size-4 shrink-0 text-oxide-hover" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {['10', '12', '14', '16'].map((time) => (
              <span key={time} className="rounded bg-canvas/85 px-1.5 py-1 text-center font-mono text-[10px] font-semibold text-muted">
                {time}:00
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectorOverlay({ deliverables, sector, sectorKey }: SectorOverlayProps & { sectorKey: SectorKey }) {
  if (sectorKey === 'hospitality') return <HospitalityOverlay deliverables={deliverables} sector={sector} />;
  if (sectorKey === 'medical') return <MedicalOverlay deliverables={deliverables} sector={sector} />;
  return <BeautyOverlay deliverables={deliverables} sector={sector} />;
}

function SectorImageStage({ deliverables, sector, sectorKey }: SectorImageStageProps) {
  const visual = sectorVisuals[sectorKey];

  return (
    <div
      className={cn('relative overflow-hidden border-b border-hairline bg-canvas', visual.imageClassName)}
      style={{
        '--sector-color': sector.cssVar,
        '--bl-signal-position': visual.signalPosition,
      } as SectorStyle}
    >
      <Image
        src={sector.image}
        alt={visual.alt}
        fill
        sizes={visual.sizes}
        placeholder="blur"
        blurDataURL={sector.blur}
        className={cn(
          'object-cover opacity-[0.82] saturate-[0.9] transition-transform duration-700 group-hover:scale-[1.03]',
          sector.focalPoint
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/68 to-canvas/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-canvas/88 via-canvas/42 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bl-navigation-chart opacity-55 mix-blend-screen" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-4 top-[46%] bl-signal-line h-5 opacity-70" aria-hidden="true" />
      <RouteChips chips={visual.routeChips} />
      <SignalMarker className={visual.markerClassName} label={visual.markerLabel} />
      <TechnicalLabels labels={visual.labels} />
      <SectorOverlay deliverables={deliverables} sector={sector} sectorKey={sectorKey} />
    </div>
  );
}

export async function SectorCardsSection() {
  const t = await getTranslations('sectors');

  return (
    <section className="relative isolate overflow-hidden bg-paper px-[var(--container-padding)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-10 bl-signal-line h-6 opacity-45" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <p className="bl-coordinates mb-3 text-sea" aria-hidden="true">BL-CHART / N41.6168 / E41.6367</p>
          <p className="mono-label mb-4 text-sea">{t('sectionLabel')}</p>
          <h2 className="text-display-lg text-ink-dark">
            {t('heading')}
          </h2>
          <p className="mt-4 text-body-lg leading-relaxed text-muted-dark">
            {t('subtitle')}
          </p>
        </div>

        {/* Three website systems */}
        <div className="grid gap-5 md:grid-cols-2 md:items-start lg:grid-cols-4">
          {sectorKeys.map((sectorKey, idx) => {
            const sector = sectors[sectorKey];
            const icons = sectorIcons[sectorKey];
            const chips = sectorTechChips[sectorKey];
            const deliverables = [0, 1, 2].map((item) => t(`${sectorKey}.deliverables.${item}`));
            const title = t(`${sectorKey}.title`);

            return (
              <article
                key={sectorKey}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-md border border-hairline bg-canvas text-ink shadow-premium-lg transition-[border-color,transform] duration-300 motion-safe:hover:-translate-y-1 hover:border-[color:var(--sector-color)]',
                  sectorVisuals[sectorKey].cardClassName
                )}
                style={{ '--sector-color': sector.cssVar } as SectorStyle}
              >
                <SectorImageStage
                  deliverables={deliverables}
                  sector={sector}
                  sectorKey={sectorKey}
                />

                <div className="flex flex-1 flex-col gap-5 p-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`size-2 rounded-full ${sector.dotClass}`} aria-hidden="true" />
                      <span className="mono-label text-muted">0{idx + 1}</span>
                      <span className={cn('mono-label ml-auto', sector.textClass)}>{title}</span>
                    </div>
                    <h3 className="text-heading-md leading-tight text-ink">
                      {title} System
                    </h3>
                    <p className="mt-2 text-body-sm text-muted">
                      {t(`${sectorKey}.pain`)}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <p className="mono-label text-muted">Core modules</p>
                    {icons.map((Icon, i) => (
                      <div key={deliverables[i]} className="flex items-center gap-2.5 text-sm text-ink">
                        <Icon className={cn('size-4 shrink-0', sector.textClass)} aria-hidden="true" />
                        <span>{deliverables[i]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded border border-[color:var(--sector-color)]/20 bg-[color:var(--sector-color)]/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-hairline p-5">
                  <Link
                    href={sector.href}
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-oxide"
                  >
                    View {title.toLowerCase()} system
                    <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
