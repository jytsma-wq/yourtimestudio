import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check, Monitor, Globe, Zap, Search, BarChart3 } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { sectorKeys, sectors } from '@/lib/sector-config';

const sectorIcons = {
  hospitality: [Monitor, Globe, Zap],
  medical: [Search, BarChart3, Check],
  beauty: [Monitor, Zap, Globe],
};

const sectorTechChips = {
  hospitality: ['Direct booking flow', 'Room availability', 'Multilingual pages', 'Local SEO'],
  medical: ['Trust architecture', 'Treatment pages', 'Doctor profiles', 'Multilingual intake'],
  beauty: ['Appointment flow', 'Service menu', 'Instagram-to-booking', 'Location trust'],
};

export async function SectorCardsSection() {
  const t = await getTranslations('sectors');

  return (
    <section className="relative isolate overflow-hidden bg-paper py-16 md:py-24 px-[var(--container-padding)]">
      <div className="pointer-events-none absolute inset-0 bl-grid opacity-35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-10 bl-signal-line h-6 opacity-45" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <p className="bl-coordinates mb-3 text-sea" aria-hidden="true">BL-CHART / N41.6168 / E41.6367</p>
          <p className="mono-label text-sea mb-4">{t('sectionLabel')}</p>
          <h2 className="text-display-lg text-ink-dark">
            {t('heading')}
          </h2>
          <p className="mt-4 text-body-lg text-muted-dark leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Three website systems */}
        <div className="grid gap-6 md:grid-cols-3">
          {sectorKeys.map((sectorKey, idx) => {
            const sector = sectors[sectorKey];
            const icons = sectorIcons[sectorKey];
            const chips = sectorTechChips[sectorKey];

            return (
              <div
                key={sectorKey}
                className="group relative bg-paper-soft border border-hairline-light rounded-md overflow-hidden hover:border-sea/30 transition-colors"
              >
                {/* System header */}
                <div className="bl-grid border-b border-hairline-light p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`size-2 rounded-full ${sector.dotClass}`} aria-hidden="true" />
                    <span className="mono-label text-muted-dark">0{idx + 1}</span>
                    <span className="mono-label text-sea ml-auto">{t(`${sectorKey}.title`)}</span>
                  </div>
                  <h3 className="text-heading-md text-ink-dark leading-tight">
                    {t(`${sectorKey}.title`)} System
                  </h3>
                  <p className="mt-2 text-body-sm text-muted-dark">
                    {t(`${sectorKey}.pain`)}
                  </p>
                </div>

                {/* System modules */}
                <div className="p-5 space-y-3">
                  <p className="mono-label text-muted-dark mb-2">Core modules</p>
                  {icons.map((Icon, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-ink-dark">
                      <Icon className="size-4 text-sea-bright shrink-0" aria-hidden="true" />
                      <span>{t(`${sectorKey}.deliverables.${i}`)}</span>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div className="px-5 pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[10px] font-mono font-semibold tracking-wider uppercase bg-sea/8 text-sea px-2 py-0.5 rounded"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-hairline-light p-5">
                  <Link
                    href={sector.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink-dark hover:text-oxide transition-colors group"
                  >
                    View {t(`${sectorKey}.title`).toLowerCase()} system
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
