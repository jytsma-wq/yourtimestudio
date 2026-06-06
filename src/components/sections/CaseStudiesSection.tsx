import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { sectorKeys, sectors, type SectorKey, type SectorMeta } from '@/lib/sector-config';
import { cn } from '@/lib/utils';

type SectorStyle = CSSProperties & {
  '--sector-color': string;
};

interface SignalVisualProps {
  sectorKey: SectorKey;
  sector: SectorMeta;
  modules: string[];
  conversion: string;
}

interface BrowserShellProps extends SignalVisualProps {
  url: string;
  children: React.ReactNode;
  showRadar?: boolean;
}

const previewIcons: Record<SectorKey, LucideIcon> = {
  hospitality: BedDouble,
  medical: Stethoscope,
  beauty: Sparkles,
};

const cardOffsets: Record<SectorKey, string> = {
  hospitality: 'lg:translate-y-0',
  medical: 'lg:translate-y-8',
  beauty: 'lg:-translate-y-4',
};

function BrowserShell({
  sector,
  url,
  children,
  showRadar = false,
}: BrowserShellProps) {
  return (
    <div
      className="relative overflow-hidden rounded-md border border-hairline bg-canvas shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
      style={{ '--sector-color': sector.cssVar } as SectorStyle}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-hairline bg-canvas-soft px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-hairline-light/75" />
          <span className="size-1.5 rounded-full bg-hairline-light/50" />
          <span className="size-1.5 rounded-full bg-hairline-light/30" />
        </div>
        <div className="min-w-0 flex-1 rounded bg-canvas px-2 py-1 font-mono text-[10px] text-muted">
          <span className="block truncate">{url}</span>
        </div>
        <span className={cn('hidden font-mono text-[10px] font-semibold uppercase sm:inline', sector.textClass)}>
          BL-SIGNAL
        </span>
      </div>

      <div className="relative min-h-[280px] overflow-hidden bg-surface p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-0 bl-grid opacity-25" aria-hidden="true" />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full opacity-75"
          viewBox="0 0 420 280"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d="M24 220 C92 160 146 176 200 118 S302 68 392 48"
            fill="none"
            stroke="var(--sector-color)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M42 68 L126 106 L188 92 L278 142 L368 126"
            fill="none"
            stroke="var(--primitive-oxide-hover)"
            strokeOpacity="0.38"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="126" cy="106" r="3" fill="var(--sector-color)" opacity="0.85" />
          <circle cx="278" cy="142" r="3" fill="var(--primitive-oxide-hover)" opacity="0.85" />
          <path d="M200 118 L205 123 L200 128 L195 123 Z" fill="var(--sector-color)" opacity="0.8" />
        </svg>

        {showRadar && (
          <div className="pointer-events-none absolute right-4 top-4 size-24 bl-radar opacity-70" aria-hidden="true" />
        )}

        <div className="relative z-10">{children}</div>
        <div className="pointer-events-none absolute inset-x-5 bottom-4 bl-signal-line h-3" aria-hidden="true" />
      </div>
    </div>
  );
}

function HospitalitySignalVisual(props: SignalVisualProps) {
  const { sector, modules, conversion } = props;

  return (
    <BrowserShell {...props} url="signal://hospitality/direct-booking">
      <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {['EN', 'KA', 'RU'].map((language) => (
              <span
                key={language}
                className="rounded border border-hairline bg-canvas px-2 py-1 text-center font-mono text-[10px] font-semibold text-muted"
              >
                {language}
              </span>
            ))}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {modules.slice(0, 2).map((module) => (
              <div key={module} className="rounded border border-hairline bg-canvas p-3">
                <BedDouble className={cn('mb-2 size-4', sector.textClass)} aria-hidden="true" />
                <p className="line-clamp-2 text-xs font-semibold leading-relaxed text-ink">{module}</p>
                <div className="mt-3 h-1.5 rounded bg-hairline-light/40" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 rounded border border-oxide/40 bg-oxide/15 px-3 py-2">
            <span className="truncate text-xs font-semibold text-ink">{conversion}</span>
            <CalendarDays className="size-4 shrink-0 text-oxide-hover" aria-hidden="true" />
          </div>
        </div>

        <div className="rounded border border-hairline bg-canvas/90 p-3">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-ink">
            <MapPin className={cn('size-4', sector.textClass)} aria-hidden="true" />
            <span className="line-clamp-1">{modules[2]}</span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded border border-hairline bg-surface-elevated">
            <div className="absolute inset-0 bl-grid opacity-35" aria-hidden="true" />
            <svg className="absolute inset-0 size-full" viewBox="0 0 160 120" aria-hidden="true" focusable="false">
              <path d="M18 92 C42 48 72 76 102 38 S136 30 148 22" fill="none" stroke={sector.cssVar} strokeWidth="2" opacity="0.65" />
              <circle cx="102" cy="38" r="5" fill="var(--primitive-oxide-hover)" />
              <circle cx="42" cy="48" r="4" fill={sector.cssVar} />
            </svg>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function MedicalSignalVisual(props: SignalVisualProps) {
  const { sector, modules, conversion } = props;

  return (
    <BrowserShell {...props} url="signal://clinic/trust-stack" showRadar>
      <div className="grid gap-3">
        <div className="rounded border border-hairline bg-canvas p-3">
          <div className="flex items-start gap-3">
            <Stethoscope className={cn('mt-0.5 size-5', sector.textClass)} aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-ink">{modules[0]}</p>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <span className="h-1.5 rounded bg-hairline-light/45" />
                <span className="h-1.5 rounded bg-hairline-light/30" />
                <span className="h-1.5 rounded bg-hairline-light/45" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_0.8fr]">
          <div className="rounded border border-hairline bg-surface-elevated p-3">
            <div className="flex items-center gap-3">
              <div className={cn('flex size-10 items-center justify-center rounded font-mono text-xs font-bold', sector.bgLight, sector.textClass)}>
                DR
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-xs font-semibold text-ink">{modules[1]}</p>
                <div className="mt-2 h-1.5 rounded bg-hairline-light/40" />
              </div>
              <ShieldCheck className="size-4 shrink-0 text-success" aria-hidden="true" />
            </div>
          </div>

          <div className="rounded border border-oxide/40 bg-oxide/15 p-3">
            <p className="text-xs font-semibold text-ink">{conversion}</p>
            <div className="mt-3 flex gap-1.5">
              <span className="h-1.5 flex-1 rounded bg-oxide-hover/45" />
              <span className="h-1.5 w-8 rounded bg-oxide-hover/25" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded border border-hairline bg-canvas px-3 py-2 text-xs text-muted">
          <Languages className={cn('size-4', sector.textClass)} aria-hidden="true" />
          <span className="line-clamp-1">{modules[2]}</span>
        </div>
      </div>
    </BrowserShell>
  );
}

function BeautySignalVisual(props: SignalVisualProps) {
  const { sector, modules, conversion } = props;

  return (
    <BrowserShell {...props} url="signal://beauty/appointment-path">
      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-2">
          {['01', '02', '03'].map((item) => (
            <div key={item} className="rounded border border-hairline bg-canvas p-3 text-center">
              <Sparkles className={cn('mx-auto size-4', sector.textClass)} aria-hidden="true" />
              <p className="mt-2 font-mono text-[10px] font-semibold text-muted">{item}</p>
            </div>
          ))}
        </div>

        <div className="rounded border border-hairline bg-surface-elevated p-3">
          <p className="line-clamp-1 text-xs font-semibold text-ink">{modules[0]}</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {['A', 'B', 'C', 'D'].map((item) => (
              <div key={item} className="aspect-square rounded border border-hairline bg-canvas">
                <span className="sr-only">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-stretch">
          {modules.slice(1, 3).map((module) => (
            <div key={module} className="rounded border border-hairline bg-canvas px-3 py-2">
              <p className="line-clamp-1 text-xs font-semibold text-ink">{module}</p>
              <div className="mt-2 h-1.5 rounded bg-hairline-light/35" />
            </div>
          ))}
          <div className="rounded border border-oxide/40 bg-oxide/15 px-3 py-2 text-xs font-semibold text-ink">
            {conversion}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function SignalSystemVisual(props: SignalVisualProps) {
  if (props.sectorKey === 'hospitality') return <HospitalitySignalVisual {...props} />;
  if (props.sectorKey === 'medical') return <MedicalSignalVisual {...props} />;
  return <BeautySignalVisual {...props} />;
}

export async function CaseStudiesSection() {
  const t = await getTranslations('caseStudies');

  return (
    <section className="relative isolate overflow-hidden border-y border-hairline bg-surface px-[var(--container-padding)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bl-navigation-chart opacity-35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('sectionLabel')}</p>
            <h2 className="text-display-lg text-ink">{t('heading')}</h2>
          </div>
          <div className="max-w-2xl space-y-4 lg:justify-self-end">
            <p className="text-body-lg leading-[1.75] text-muted">{t('subtitle')}</p>
            <p className="rounded-md border border-oxide/35 bg-oxide/10 px-4 py-3 text-body-sm leading-[1.7] text-ink">
              {t('disclosure')}
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
          {sectorKeys.map((key) => {
            const sector = sectors[key];
            const Icon = previewIcons[key];
            const modules = [0, 1, 2].map((item) => t(`studies.${key}.modules.${item}`));

            return (
              <article
                key={key}
                className={cn(
                  'group relative grid h-full overflow-hidden rounded-md border bg-canvas transition-[border-color,transform] duration-300 motion-safe:hover:-translate-y-1',
                  'border-hairline hover:border-[color:var(--sector-color)]',
                  cardOffsets[key]
                )}
                style={{ '--sector-color': sector.cssVar } as SectorStyle}
              >
                <div className="border-b border-hairline p-3 sm:p-4">
                  <SignalSystemVisual
                    sectorKey={key}
                    sector={sector}
                    modules={modules}
                    conversion={t(`studies.${key}.conversion`)}
                  />
                </div>

                <div className="grid gap-5 p-5">
                  <div className="flex items-start gap-3">
                    <div className={cn('flex size-10 shrink-0 items-center justify-center rounded border', sector.bgLight, sector.borderClass)}>
                      <Icon className={cn('size-4', sector.textClass)} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn('mono-label', sector.textClass)}>{t(`studies.${key}.vertical`)}</p>
                      <h3 className="mt-2 text-heading-md leading-tight text-ink">{t(`studies.${key}.title`)}</h3>
                    </div>
                    <span className={cn('ml-auto mt-2 size-2 rounded-full', sector.dotClass)} aria-hidden="true" />
                  </div>

                  <p className="text-body-sm leading-[1.75] text-muted">{t(`studies.${key}.problem`)}</p>

                  <div>
                    <p className="mono-label mb-3 text-muted">{t('modulesLabel')}</p>
                    <ul className="space-y-2">
                      {modules.map((module) => (
                        <li key={module} className="flex gap-2 text-sm leading-relaxed text-ink">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                          <span>{module}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-md border border-hairline bg-surface px-3 py-2 text-sm text-muted">
                    <span className="font-semibold text-ink">{t('conversionLabel')}:</span>{' '}
                    {t(`studies.${key}.conversion`)}
                  </div>
                </div>

                <dl className="grid grid-cols-3 border-t border-hairline bg-surface/65">
                  {[
                    [t('footer.signal'), t(`studies.${key}.vertical`)],
                    [t('footer.system'), t(`studies.${key}.label`)],
                    [t('footer.output'), t(`studies.${key}.result`)],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-0 border-r border-hairline p-3 last:border-r-0">
                      <dt className="font-mono text-[10px] font-semibold uppercase text-muted">{label}</dt>
                      <dd className="mt-1 truncate text-xs font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-body-sm leading-[1.7] text-muted">{t('moreNote')}</p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-sea-bright transition-colors hover:text-oxide"
          >
            {t('viewGallery')}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
