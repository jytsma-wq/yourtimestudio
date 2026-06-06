import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Languages,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { sectorKeys, sectors, type SectorKey } from '@/lib/sector-config';

const previewIcons: Record<SectorKey, LucideIcon> = {
  hospitality: BedDouble,
  medical: Stethoscope,
  beauty: Sparkles,
};

function MiniBrowser({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-md border border-hairline bg-surface">
      <div className="flex min-w-0 items-center gap-2 border-b border-hairline px-3 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-hairline-light/70" />
          <span className="size-1.5 rounded-full bg-hairline-light/50" />
          <span className="size-1.5 rounded-full bg-hairline-light/30" />
        </div>
        <div className="min-w-0 flex-1 rounded bg-canvas px-2 py-1 font-mono text-[10px] text-muted">
          <span className="block truncate">{url}</span>
        </div>
      </div>
      <div className="bl-signal-line h-2.5" aria-hidden="true" />
      <div className="p-3">{children}</div>
    </div>
  );
}

function SystemPreview({ sectorKey }: { sectorKey: SectorKey }) {
  if (sectorKey === 'hospitality') {
    return (
      <MiniBrowser url="hotel.ge/direct">
        <div className="space-y-2.5">
          <div className="flex gap-1.5">
            {['EN', 'KA', 'RU'].map((language) => (
              <span key={language} className="rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[9px] text-muted">
                {language}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['Date', 'Room', 'Guests'].map((label) => (
              <div key={label} className="rounded border border-hairline bg-canvas p-2">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">{label}</p>
                <div className="mt-2 h-1.5 rounded bg-sea-bright/70" />
              </div>
            ))}
          </div>
          <div className="rounded border border-hairline bg-surface-elevated p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-ink">Sea view suite</span>
              <BedDouble className="size-3.5 text-sea-bright" aria-hidden="true" />
            </div>
            <div className="mt-2 flex gap-1.5">
              <span className="h-1.5 flex-1 rounded bg-hairline-light/40" />
              <span className="h-1.5 w-8 rounded bg-hairline-light/25" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded border border-oxide/40 bg-oxide/15 px-2.5 py-2 text-xs">
            <span className="text-ink">Direct booking CTA</span>
            <CalendarDays className="size-3.5 text-oxide-hover" aria-hidden="true" />
          </div>
        </div>
      </MiniBrowser>
    );
  }

  if (sectorKey === 'medical') {
    return (
      <MiniBrowser url="clinic.ge/treatments">
        <div className="space-y-2.5">
          <div className="rounded border border-hairline bg-canvas p-2.5">
            <p className="text-xs font-semibold text-ink">Treatment category</p>
            <p className="mt-1 text-xs text-muted">Safety, process, aftercare.</p>
          </div>
          <div className="flex items-center gap-2 rounded border border-hairline bg-surface-elevated p-2.5">
            <div className="flex size-7 items-center justify-center rounded bg-sea/25 font-mono text-[10px] font-semibold text-sea-bright">
              DR
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-ink">Doctor profile</p>
              <p className="truncate text-xs text-muted">Credentials and languages</p>
            </div>
            <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
          </div>
          <div className="flex items-center justify-between rounded border border-oxide/40 bg-oxide/15 px-2.5 py-2 text-xs">
            <span className="text-ink">Consultation request</span>
            <span className="rounded bg-oxide px-2 py-1 font-semibold text-white">CTA</span>
          </div>
          <div className="flex items-center gap-2 border-t border-hairline pt-2 text-xs text-muted">
            <Languages className="size-3.5 text-sea-bright" aria-hidden="true" />
            <span>Multilingual intake</span>
          </div>
        </div>
      </MiniBrowser>
    );
  }

  return (
    <MiniBrowser url="studio.ge/book">
      <div className="space-y-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {['Hair', 'Nails', 'Makeup'].map((service) => (
            <div key={service} className="rounded border border-hairline bg-canvas p-2 text-center">
              <Sparkles className="mx-auto size-3 text-oxide-hover" aria-hidden="true" />
              <p className="mt-1 text-[11px] font-medium text-ink">{service}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {['Price', 'Time', 'Artist'].map((detail) => (
            <div key={detail} className="rounded border border-hairline bg-surface-elevated px-2 py-2">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">{detail}</p>
              <div className="mt-2 h-1.5 rounded bg-hairline-light/35" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {['01', '02', '03', '04'].map((item) => (
            <div key={item} className="aspect-[4/3] rounded border border-hairline bg-canvas" />
          ))}
        </div>
        <div className="rounded border border-oxide/40 bg-oxide/15 px-2.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sea-bright">
          Instagram to booking
        </div>
      </div>
    </MiniBrowser>
  );
}

export async function CaseStudiesSection() {
  const t = await getTranslations('caseStudies');

  return (
    <section className="relative isolate overflow-hidden border-y border-hairline bg-surface px-[var(--container-padding)] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bl-navigation-chart opacity-45" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('sectionLabel')}</p>
            <h2 className="text-display-lg text-ink">{t('heading')}</h2>
          </div>
          <p className="max-w-2xl text-body-lg leading-[1.75] text-muted lg:justify-self-end">
            {t('subtitle')}
          </p>
        </div>

        <div className="mb-8 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="bg-canvas p-4">
              <p className="text-sm font-semibold leading-[1.7] text-ink">
                {t(`proof.items.${item}`)}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {sectorKeys.map((key) => {
            const sector = sectors[key];
            const Icon = previewIcons[key];

            return (
              <article
                key={key}
                className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-canvas transition-colors hover:border-sea/30 hover:bg-surface-elevated/50"
              >
                <div className="pointer-events-none absolute right-4 top-4 bl-coordinates opacity-50" aria-hidden="true">
                  BL-0{sectorKeys.indexOf(key) + 1}
                </div>
                <div className="border-b border-hairline p-4">
                  <SystemPreview sectorKey={key} />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded bg-sea/15">
                      <Icon className="size-4 text-sea-bright" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="mono-label text-sea-bright">{t(`studies.${key}.vertical`)}</p>
                      <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                        {t(`studies.${key}.label`)}
                      </p>
                    </div>
                    <span className={`ml-auto size-2 rounded-full ${sector.dotClass}`} aria-hidden="true" />
                  </div>

                  <h3 className="text-heading-md leading-tight text-ink">{t(`studies.${key}.title`)}</h3>
                  <p className="mt-3 text-body-sm leading-[1.7] text-muted">
                    {t(`studies.${key}.problem`)}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {[0, 1, 2].map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                        <span>{t(`studies.${key}.modules.${item}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-md border border-hairline bg-surface px-3 py-2 text-sm text-muted">
                    <span className="font-semibold text-ink">{t('conversionLabel')}:</span>{' '}
                    {t(`studies.${key}.conversion`)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
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
