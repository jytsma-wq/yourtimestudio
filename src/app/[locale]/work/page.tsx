import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileCode2,
  Gauge,
  MapPin,
  MousePointerClick,
  Search,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { NavigationChart, RadarPanel, SignalBadge } from '@/components/brand';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ExampleSystemVisual } from '@/components/work/ExampleSystemVisual';
import { Link } from '@/lib/i18n/navigation';
import { TestimonialsSection } from '@/components/sections/TrustedByStrip';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';
import { exampleSystems, type ExampleSystem } from '@/content/example-systems';
import { cn } from '@/lib/utils';

type SystemStyle = CSSProperties & {
  '--system-color': string;
  '--bl-signal-position'?: string;
};

type SignalBadgeTone = 'sea' | 'oxide' | 'success' | 'muted';

const processKeys = ['audit', 'structure', 'design', 'build', 'launch'] as const;

const processIcons: Record<(typeof processKeys)[number], LucideIcon> = {
  audit: Search,
  structure: FileCode2,
  design: MousePointerClick,
  build: Code2,
  launch: Gauge,
};

const verticalMeta: Record<ExampleSystem['vertical'], {
  color: string;
  dotClass: string;
  icon: LucideIcon;
  label: string;
  textClass: string;
}> = {
  hospitality: {
    color: 'var(--primitive-sea-bright)',
    dotClass: 'bg-sea-bright',
    icon: BedDouble,
    label: 'Hospitality',
    textClass: 'text-sea-bright',
  },
  medical: {
    color: 'var(--primitive-sea)',
    dotClass: 'bg-sea',
    icon: Stethoscope,
    label: 'Medical',
    textClass: 'text-sea-bright',
  },
  beauty: {
    color: 'var(--primitive-oxide-hover)',
    dotClass: 'bg-oxide',
    icon: Sparkles,
    label: 'Beauty',
    textClass: 'text-oxide-hover',
  },
  'local-service': {
    color: 'var(--primitive-success)',
    dotClass: 'bg-success',
    icon: MapPin,
    label: 'Local service',
    textClass: 'text-success',
  },
};

const statusLabelKeys: Record<ExampleSystem['status'], 'concept' | 'internalBuild' | 'clientBuild'> = {
  concept: 'concept',
  'internal-build': 'internalBuild',
  'client-build': 'clientBuild',
};

const statusTones: Record<ExampleSystem['status'], SignalBadgeTone> = {
  concept: 'sea',
  'internal-build': 'oxide',
  'client-build': 'success',
};

const verticalTones: Record<ExampleSystem['vertical'], SignalBadgeTone> = {
  hospitality: 'sea',
  medical: 'sea',
  beauty: 'oxide',
  'local-service': 'success',
};

const routeArchitecture: Record<ExampleSystem['fallbackVisual'], string[]> = {
  'hotel-booking': ['/', '/rooms', '/offers', '/booking', '/contact'],
  'clinic-trust': ['/', '/services', '/doctors', '/consultation', '/contact'],
  'beauty-booking': ['/', '/services', '/treatments', '/booking', '/contact'],
};

const routeSignalPosition: Record<ExampleSystem['fallbackVisual'], string> = {
  'hotel-booking': '68%',
  'clinic-trust': '54%',
  'beauty-booking': '58%',
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

function SystemVisual({
  screenshotsComingSoon,
  system,
}: {
  screenshotsComingSoon: string;
  system: ExampleSystem;
}) {
  return (
    <ExampleSystemVisual
      screenshotsComingSoon={screenshotsComingSoon}
      system={system}
      variant="card"
    />
  );
}

function RouteArchitecturePreview({ system }: { system: ExampleSystem }) {
  const routes = routeArchitecture[system.fallbackVisual];

  return (
    <div className="mt-4">
      <div
        className="bl-signal-line h-4"
        style={{ '--bl-signal-position': routeSignalPosition[system.fallbackVisual] } as SystemStyle}
        aria-hidden="true"
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {routes.map((route) => (
          <code
            key={route}
            className="rounded-sm border border-hairline bg-canvas/80 px-2 py-1 font-mono text-[10px] font-semibold text-muted"
          >
            {route}
          </code>
        ))}
      </div>
    </div>
  );
}

function DiagnosticStrip({
  system,
  t,
}: {
  system: ExampleSystem;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const items = [
    { label: t('detail.diagnostic.signal'), body: system.problem },
    { label: t('detail.diagnostic.system'), body: system.solution },
    { label: t('detail.diagnostic.output'), body: system.summary },
  ];

  return (
    <div className="mt-5 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="bg-canvas/88 p-3">
          <p className="mono-label mb-2 text-sea-bright">{item.label}</p>
          <p className="line-clamp-3 text-xs leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

function ExampleSystemCard({
  index,
  screenshotsComingSoon,
  system,
  t,
}: {
  index: number;
  screenshotsComingSoon: string;
  system: ExampleSystem;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const vertical = verticalMeta[system.vertical];
  const Icon = vertical.icon;
  const modules = system.modules.slice(0, 4);
  const technical = system.technical.slice(0, 5);

  return (
    <article
      id={system.slug}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-surface shadow-premium-lg transition-colors hover:border-[color:var(--system-color)]"
      style={{ '--system-color': vertical.color } as SystemStyle}
    >
      <NavigationChart variant="section" className="!absolute opacity-[0.2]" />
      <div className="pointer-events-none absolute inset-0 bl-soft-vignette opacity-70" aria-hidden="true" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="border-b border-hairline p-4 md:p-5">
          <div className="mb-4 flex min-w-0 flex-wrap items-center gap-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-hairline bg-canvas/80">
              <Icon className={cn('size-4', vertical.textClass)} aria-hidden="true" />
            </span>
            <SignalBadge
              label={t(`status.${statusLabelKeys[system.status]}`)}
              tone={statusTones[system.status]}
            />
            <SignalBadge
              label={vertical.label}
              tone={verticalTones[system.vertical]}
            />
            <span className="ml-auto font-mono text-xs font-semibold text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="relative">
            <SystemVisual screenshotsComingSoon={screenshotsComingSoon} system={system} />
          </div>

          <RouteArchitecturePreview system={system} />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="mono-label mb-3 text-sea-bright">{t('detail.eyebrow')}</p>
          <h3 className="text-heading-md text-ink">{system.title}</h3>
          <p className="mt-3 text-body-sm leading-[1.7] text-muted">{system.summary}</p>

          <DiagnosticStrip system={system} t={t} />

          <div className="mt-5 grid gap-5 md:grid-cols-[0.96fr_1.04fr]">
            <div>
              <p className="mono-label mb-3 text-muted">{t('labels.modules')}</p>
              <ul className="space-y-2">
                {modules.map((module) => (
                  <li key={module} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3 text-muted">{t('labels.technical')}</p>
              <div className="flex flex-wrap gap-2">
                {technical.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-hairline bg-canvas/90 px-2 py-1 font-mono text-[10px] font-semibold text-sea-bright"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-hairline pt-5">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/work/${system.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-oxide/45 bg-oxide/15 px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-oxide hover:text-white"
              >
                {t('viewSystem')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {system.liveUrl && (
                <a
                  href={system.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-sea-bright hover:text-sea-bright"
                >
                  {t('viewLiveSite')}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
              {system.repoUrl && (
                <a
                  href={system.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-sea-bright hover:text-sea-bright"
                >
                  {t('viewRepository')}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
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
              <p className="mt-5 max-w-2xl rounded-md border border-hairline bg-surface px-3 py-2 text-body-sm leading-[1.7] text-muted">
                {t('hero.internal_note')}
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

      <section className="relative isolate overflow-hidden border-y border-hairline bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <NavigationChart variant="section" className="!absolute opacity-[0.28]" />
        <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('systemIndex.eyebrow')}</p>
              <h2 className="text-heading-lg text-ink">{t('systemIndex.heading')}</h2>
            </div>
            <p className="max-w-2xl text-body-lg leading-[1.75] text-muted lg:justify-self-end">
              {t('systemIndex.subtitle')}
            </p>
          </div>

          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.44fr)] lg:items-center">
            <p className="rounded-md border border-oxide/35 bg-oxide/10 px-4 py-3 text-body-sm leading-[1.7] text-ink">
              {t('systemIndex.disclosure')}
            </p>
            <div className="hidden lg:block lg:justify-self-end">
              <RadarPanel className="w-40 opacity-80" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {exampleSystems.map((system, index) => {
              return (
                <ExampleSystemCard
                  key={system.slug}
                  index={index}
                  screenshotsComingSoon={t('screenshotsComingSoon')}
                  system={system}
                  t={t}
                />
              );
            })}
          </div>

          <div className="relative isolate mt-10 overflow-hidden rounded-md border border-hairline bg-surface p-5 shadow-premium-lg md:p-6">
            <div className="pointer-events-none absolute inset-0 bl-beacon-beam opacity-60" aria-hidden="true" />
            <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div>
                <SignalBadge label={t('systemIndex.cta.eyebrow')} tone="sea" />
                <h3 className="mt-4 text-heading-md text-ink">{t('systemIndex.cta.heading')}</h3>
                <p className="mt-3 max-w-2xl text-body-sm leading-[1.7] text-muted">
                  {t('systemIndex.cta.subtitle')}
                </p>
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
                  className="h-12 rounded-md border-hairline bg-transparent px-6 text-base text-ink transition-colors hover:bg-canvas hover:text-ink"
                >
                  <Link href="/contact">{t('systemIndex.cta.discussBuild')}</Link>
                </Button>
              </div>
            </div>
          </div>
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
