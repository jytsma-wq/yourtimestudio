import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Code2,
  FileCode2,
  Gauge,
  Languages,
  MapPin,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { TestimonialsSection } from '@/components/sections/TrustedByStrip';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';

const systemKeys = ['hotel', 'clinic', 'beauty'] as const;
const processKeys = ['audit', 'structure', 'design', 'build', 'launch'] as const;

const systemIcons: Record<(typeof systemKeys)[number], LucideIcon> = {
  hotel: BedDouble,
  clinic: Stethoscope,
  beauty: Sparkles,
};

const processIcons: Record<(typeof processKeys)[number], LucideIcon> = {
  audit: Search,
  structure: FileCode2,
  design: MousePointerClick,
  build: Code2,
  launch: Gauge,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Website System Examples',
    description:
      'Example website systems for hotels, clinics, and beauty studios, showing booking paths, trust modules, multilingual structure, and launch-ready page architecture.',
    path: '/work',
    locale: locale as Locale,
    ogImage: pageOgImages.work,
  });
}

function BrowserChrome({
  url,
  sector,
  children,
}: {
  url: string;
  sector: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-hairline bg-surface">
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
      <div className="p-4">{children}</div>
    </div>
  );
}

function SystemMockup({ systemKey }: { systemKey: (typeof systemKeys)[number] }) {
  if (systemKey === 'hotel') {
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

  if (systemKey === 'clinic') {
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

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('workPage');
  const tNav = await getTranslations('nav');

  return (
    <div data-locale={locale} className="bg-canvas text-ink">
      <section className="px-[var(--container-padding)] py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[var(--hero-max-width)]">
          <Breadcrumbs
            items={[
              { label: tNav('work'), href: '/work' },
            ]}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.7fr)] lg:items-end lg:gap-16">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('hero.eyebrow')}</p>
              <h1 className="max-w-4xl text-display-lg text-ink">{t('hero.title')}</h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-[1.75] text-muted">
                {t('hero.subtitle')}
              </p>
            </div>
            <aside className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label text-muted">{t('hero.note_label')}</p>
              <p className="mt-3 text-body-sm leading-[1.75] text-muted">
                {t('hero.note')}
              </p>
              <p className="mt-4 text-body-sm leading-[1.75] text-muted">
                {t('hero.future_note')}
              </p>
              <div className="mt-5 grid gap-2">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="rounded border border-hairline bg-canvas px-3 py-2 text-sm text-ink">
                    {t(`hero.proof.${item}`)}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)] space-y-8">
          {systemKeys.map((systemKey, index) => {
            const Icon = systemIcons[systemKey];

            return (
              <article
                key={systemKey}
                className="overflow-hidden rounded-md border border-hairline bg-surface"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(360px,0.95fr)_minmax(0,1.05fr)]">
                  <div className="border-b border-hairline bg-canvas p-4 md:p-6 lg:border-b-0 lg:border-r">
                    <SystemMockup systemKey={systemKey} />
                  </div>

                  <div className="p-5 md:p-7">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded bg-sea/15">
                        <Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                      </div>
                      <span className="rounded-md border border-sea/35 bg-sea/15 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sea-bright">
                        {t(`systems.${systemKey}.label`)}
                      </span>
                      <span className="ml-auto font-mono text-xs font-semibold text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h2 className="text-heading-md text-ink">{t(`systems.${systemKey}.title`)}</h2>
                    <p className="mt-4 text-body-sm leading-[1.75] text-muted">
                      {t(`systems.${systemKey}.summary`)}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-md border border-hairline bg-canvas p-4">
                        <p className="mono-label mb-3 text-sea-bright">{t('labels.problem')}</p>
                        <p className="text-sm leading-[1.75] text-ink">{t(`systems.${systemKey}.problem`)}</p>
                      </div>
                      <div className="rounded-md border border-hairline bg-canvas p-4">
                        <p className="mono-label mb-3 text-sea-bright">{t('labels.conversion')}</p>
                        <p className="text-sm leading-[1.75] text-ink">{t(`systems.${systemKey}.conversion`)}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
                      <div>
                        <p className="mono-label mb-3 text-muted">{t('labels.architecture')}</p>
                        <ul className="space-y-2">
                          {[0, 1, 2].map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                              <span>{t(`systems.${systemKey}.architecture.${item}`)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="mono-label mb-3 text-muted">{t('labels.modules')}</p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {[0, 1, 2, 3].map((item) => (
                            <li key={item} className="rounded border border-hairline bg-canvas px-3 py-2 text-sm text-ink">
                              {t(`systems.${systemKey}.modules.${item}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-hairline pt-5">
                      <p className="mono-label mb-3 text-muted">{t('labels.technical')}</p>
                      <div className="flex flex-wrap gap-2">
                        {[0, 1, 2].map((item) => (
                          <span key={item} className="rounded-md border border-hairline bg-surface-elevated px-2.5 py-1 font-mono text-[11px] font-semibold text-sea-bright">
                            {t(`systems.${systemKey}.technical.${item}`)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <TestimonialsSection />

      <section className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 max-w-3xl">
            <p className="mono-label mb-4 text-sea-bright">{t('process.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink-dark">{t('process.heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted-dark">{t('process.subtitle')}</p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline-light bg-hairline-light md:grid-cols-5">
            {processKeys.map((key, index) => {
              const Icon = processIcons[key];
              return (
                <article key={key} className="bg-paper-soft p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded bg-sea/10">
                      <Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-muted-dark">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-ink-dark">{t(`process.items.${key}.title`)}</h3>
                  <p className="mt-3 text-body-sm leading-[1.7] text-muted-dark">
                    {t(`process.items.${key}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('cta.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{t('cta.heading')}</h2>
            <p className="mt-4 max-w-2xl text-body-lg leading-[1.75] text-muted">{t('cta.subtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white transition-colors hover:bg-oxide-hover"
            >
              <Link href="/website-audits">
                {t('cta.audit')}
                <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-hairline bg-transparent px-6 text-base text-ink transition-colors hover:bg-surface hover:text-ink"
            >
              <Link href="/contact">{t('cta.project')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
