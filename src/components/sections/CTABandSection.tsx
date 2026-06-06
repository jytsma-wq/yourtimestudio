import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Route, SearchCheck } from 'lucide-react';
import { LighthouseBeam, NavigationChart } from '@/components/brand';
import { Link } from '@/lib/i18n/navigation';

export async function CTABandSection() {
  const t = await getTranslations('ctaBand');

  return (
    <section className="bl-soft-vignette relative isolate overflow-hidden border-t border-hairline bg-canvas px-[var(--container-padding)] py-14 md:py-20" id="cta">
      <NavigationChart variant="footer" className="!absolute opacity-40" />
      <LighthouseBeam className="!absolute opacity-70" />
      <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-0.25em] hidden select-none text-center font-mono text-[clamp(4rem,13vw,12rem)] font-black uppercase leading-none tracking-[0.08em] text-ink/[0.035] md:block" aria-hidden="true">
        Lighthouse
      </div>
      <div className="pointer-events-none absolute right-[8%] top-10 hidden size-40 bl-radar opacity-40 lg:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="max-w-3xl">
            <p className="bl-coordinates mb-3" aria-hidden="true">BL-SIGNAL / REQUEST-01 / N41.6168 E41.6367</p>
            <p className="mono-label mb-4 text-sea-bright">{t('sectionLabel')}</p>
            <h2 className="max-w-3xl text-display-lg text-ink">
              {t('heading')}
            </h2>
            <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-muted">
              {t('subtitle')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md bg-oxide px-7 text-base font-semibold text-white transition-colors hover:bg-oxide-hover"
              >
                <Link href="/website-audits">
                  <SearchCheck className="size-4" aria-hidden="true" />
                  {t('primary')}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md border-hairline px-7 text-base text-ink transition-colors hover:bg-surface hover:text-ink"
              >
                <Link href="/work">
                  {t('secondary')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="mt-9 bl-signal-line h-4 max-w-3xl" aria-hidden="true" />
          </div>

          <div className="rounded-md border border-hairline bg-surface/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md border border-sea-bright/20 bg-sea-bright/10 text-sea-bright">
                  <Compass className="size-4" aria-hidden="true" />
                </span>
                <span className="mono-label text-ink">{t('panelTitle')}</span>
              </div>
              <span className="bl-coordinates" aria-hidden="true">BL-41</span>
            </div>
            <div className="mt-4 space-y-3">
              {(['booking', 'trust', 'search'] as const).map((signal, index) => (
                <div key={signal} className="rounded-md border border-hairline bg-canvas/70 p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-sea-bright">
                      {t(`signals.${signal}`)}
                    </span>
                    <span className="font-mono text-[0.65rem] text-muted">0{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                    <Route className="size-3.5 text-oxide-hover" aria-hidden="true" />
                    <span>{t(`routes.${signal}`)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
