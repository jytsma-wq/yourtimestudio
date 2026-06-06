import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  ExternalLink,
  FileCode2,
  GitBranch,
  Globe2,
  Layers3,
  MapPin,
  Monitor,
  SearchCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { NavigationChart, SignalBadge } from '@/components/brand';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ExampleSystemFallbackVisual, ExampleSystemVisual } from '@/components/work/ExampleSystemVisual';
import { ScreenshotFrame } from '@/components/work/ScreenshotFrame';
import { exampleSystems, type ExampleSystem } from '@/content/example-systems';
import { launchLocales, type Locale } from '@/lib/i18n/config';
import { Link } from '@/lib/i18n/navigation';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';
import { publicWorkAssetExists } from '@/lib/work-screenshots';
import { cn } from '@/lib/utils';

type SystemStyle = CSSProperties & {
  '--system-color': string;
};

type DetailScreenshot = ExampleSystem['detail']['screenshots'][number];
type AvailableDetailScreenshot = DetailScreenshot & { src: string };

const statusLabelKeys: Record<ExampleSystem['status'], 'concept' | 'internalBuild' | 'clientBuild'> = {
  concept: 'concept',
  'internal-build': 'internalBuild',
  'client-build': 'clientBuild',
};

const statusClasses: Record<ExampleSystem['status'], string> = {
  concept: 'border-sea/35 bg-sea/15 text-sea-bright',
  'internal-build': 'border-oxide/40 bg-oxide/15 text-oxide-hover',
  'client-build': 'border-success/35 bg-success/15 text-success',
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

const routeArchitecture: Record<ExampleSystem['fallbackVisual'], string[]> = {
  'hotel-booking': ['/', '/rooms', '/rooms/[slug]', '/about', '/contact'],
  'clinic-trust': ['/', '/services', '/services/[slug]', '/about', '/contact'],
  'beauty-booking': ['/', '/services', '/gallery', '/booking', '/contact'],
};

const technicalDeliveryKeys = ['nextjs', 'localSeo', 'structuredData', 'multilingualRoutes', 'performance'] as const;

function getExampleSystem(slug: string): ExampleSystem | undefined {
  return exampleSystems.find((system) => system.slug === slug);
}

function getAvailableDetailScreenshots(system: ExampleSystem): AvailableDetailScreenshot[] {
  return system.detail.screenshots.filter(
    (screenshot): screenshot is AvailableDetailScreenshot => publicWorkAssetExists(screenshot.src)
  );
}

function getHeroDesktopScreenshot(system: ExampleSystem): string | undefined {
  const desktopScreenshot = system.screenshot?.desktop;
  return publicWorkAssetExists(desktopScreenshot) ? desktopScreenshot : undefined;
}

export function generateStaticParams() {
  return launchLocales.flatMap((locale) =>
    exampleSystems.map((system) => ({
      locale,
      slug: system.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const system = getExampleSystem(slug);

  if (!system) {
    notFound();
  }

  const screenshotOgImage = getHeroDesktopScreenshot(system);

  return generatePageMetadata({
    title: `${system.title} | Website System Example`,
    description: system.summary,
    path: `/work/${system.slug}`,
    locale: locale as Locale,
    ogImage: screenshotOgImage ?? pageOgImages.work,
  });
}

function ScreenshotGallery({
  screenshotsComingSoon,
  system,
  t,
}: {
  screenshotsComingSoon: string;
  system: ExampleSystem;
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const screenshots = getAvailableDetailScreenshots(system);

  if (screenshots.length === 0) {
    return (
      <div className="rounded-md border border-hairline bg-surface p-4 md:p-6">
        <ExampleSystemVisual
          screenshotsComingSoon={screenshotsComingSoon}
          showMissingLabel={false}
          system={system}
          variant="card"
        />
        <p className="mt-4 inline-flex rounded-sm border border-hairline bg-canvas px-3 py-2 font-mono text-[11px] font-semibold text-muted">
          {t('detail.screenshots.captureLabel')}
        </p>
      </div>
    );
  }

  const screenshotAlt = system.screenshot?.alt ?? `${system.title} website system screenshot`;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {screenshots.map((screenshot) => (
        <ScreenshotFrame
          key={screenshot.src}
          alt={`${screenshotAlt} - ${screenshot.label}`}
          device={screenshot.device}
          fallback={<ExampleSystemFallbackVisual fallbackVisual={system.fallbackVisual} />}
          label={screenshot.label}
          src={screenshot.src}
        />
      ))}
    </div>
  );
}

function MainVisual({
  screenshotsCanBeAdded,
  system,
}: {
  screenshotsCanBeAdded: string;
  system: ExampleSystem;
}) {
  const desktopScreenshot = getHeroDesktopScreenshot(system);

  if (desktopScreenshot && system.screenshot) {
    return (
      <ScreenshotFrame
        alt={system.screenshot.alt}
        device="desktop"
        fallback={<ExampleSystemFallbackVisual fallbackVisual={system.fallbackVisual} />}
        label={system.title}
        priority
        src={desktopScreenshot}
      />
    );
  }

  return (
    <div>
      <ExampleSystemVisual
        imagePriority
        screenshotsComingSoon={screenshotsCanBeAdded}
        showMissingLabel={false}
        system={system}
        variant="hero"
      />
      <p className="mt-3 inline-flex rounded-sm border border-hairline bg-surface px-3 py-2 font-mono text-[11px] font-semibold text-muted">
        {screenshotsCanBeAdded}
      </p>
    </div>
  );
}

export default async function ExampleSystemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const system = getExampleSystem(slug);

  if (!system) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('workPage');
  const tNav = await getTranslations('nav');
  const vertical = verticalMeta[system.vertical];
  const VerticalIcon = vertical.icon;
  const routes = routeArchitecture[system.fallbackVisual];

  return (
    <div className="bg-canvas text-ink" data-locale={locale}>
      <section
        className="relative isolate overflow-hidden px-[var(--container-padding)] py-12 md:py-18 lg:py-20"
        style={{ '--system-color': vertical.color } as SystemStyle}
      >
        <NavigationChart variant="section" className="!absolute opacity-[0.25]" />
        <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
          <Breadcrumbs
            items={[
              { label: tNav('work'), href: '/work' },
              { label: system.title },
            ]}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(380px,1fr)] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md border border-sea-bright/20 bg-sea-bright/10">
                  <VerticalIcon className={cn('size-4.5', vertical.textClass)} aria-hidden="true" />
                </span>
                <span className={cn('rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]', statusClasses[system.status])}>
                  {t(`status.${statusLabelKeys[system.status]}`)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  <span className={cn('size-1.5 rounded-full', vertical.dotClass)} aria-hidden="true" />
                  {vertical.label}
                </span>
              </div>
              <p className="mono-label mb-4 text-sea-bright">{t('detail.eyebrow')}</p>
              <h1 className="max-w-4xl text-display-lg text-ink">{system.title}</h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-[1.75] text-muted">
                {system.summary}
              </p>
              <div className="mt-6 rounded-md border border-hairline bg-surface px-4 py-3 text-body-sm leading-[1.75] text-muted">
                <span className="font-semibold text-ink">{t('detail.disclosure')}:</span> {system.disclosure}
              </div>
            </div>

            <MainVisual screenshotsCanBeAdded={t('detail.screenshots.captureLabel')} system={system} />
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas-soft px-[var(--container-padding)] py-8 md:py-10">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
          {[
            { icon: SearchCheck, label: t('detail.diagnostic.signal'), body: system.problem },
            { icon: Layers3, label: t('detail.diagnostic.system'), body: system.solution },
            { icon: Monitor, label: t('detail.diagnostic.output'), body: system.summary },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="bg-surface p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-md border border-sea-bright/20 bg-sea-bright/10 text-sea-bright">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h2 className="mono-label text-sea-bright">{item.label}</h2>
                </div>
                <p className="text-body-sm leading-[1.75] text-muted">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-[var(--container-padding)] py-14 md:py-20">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('detail.structureEyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{t('detail.structureHeading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted">{t('detail.structureBody')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label mb-4 text-muted">{t('labels.problem')}</p>
              <p className="text-body-sm leading-[1.75] text-ink">{system.problem}</p>
              <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                {system.detail.problemFocus.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label mb-4 text-muted">{t('labels.solution')}</p>
              <p className="text-body-sm leading-[1.75] text-ink">{system.solution}</p>
              <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                {system.detail.solutionFocus.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label mb-4 text-muted">{t('labels.modules')}</p>
              <ul className="space-y-2">
                {system.modules.map((module) => (
                  <li key={module} className="flex gap-2 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label mb-4 text-muted">{t('detail.technicalBuild')}</p>
              <div className="flex flex-wrap gap-2">
                {system.technical.map((item) => (
                  <span key={item} className="rounded-md border border-hairline bg-canvas px-2.5 py-1 font-mono text-[11px] font-semibold text-sea-bright">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas-soft px-[var(--container-padding)] py-14 md:py-20">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-8 grid gap-4 lg:grid-cols-[0.7fr_1fr] lg:items-end">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('detail.screenshots.eyebrow')}</p>
              <h2 className="text-heading-lg text-ink">{t('detail.screenshots.heading')}</h2>
            </div>
            <p className="max-w-2xl text-body-lg leading-[1.75] text-muted lg:justify-self-end">
              {t('detail.screenshots.body')}
            </p>
          </div>
          <ScreenshotGallery screenshotsComingSoon={t('screenshotsComingSoon')} system={system} t={t} />
        </div>
      </section>

      <section className="px-[var(--container-padding)] py-14 md:py-20">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-md border border-hairline bg-surface p-5 md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <Layers3 className="size-5 text-sea-bright" aria-hidden="true" />
              <h2 className="text-heading-md text-ink">{t('detail.whatThisDemonstrates')}</h2>
            </div>
            <ul className="space-y-3">
              {system.detail.demonstrates.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-hairline pt-5">
              <div className="mb-4 flex items-center gap-2">
                <GitBranch className="size-4 text-sea-bright" aria-hidden="true" />
                <p className="mono-label text-muted">{t('detail.routeArchitecture')}</p>
              </div>
            <div className="space-y-2">
              {routes.map((route, index) => (
                <div key={route} className="flex items-center gap-3 rounded-md border border-hairline bg-canvas px-3 py-2">
                  <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                  <code className="font-mono text-sm font-semibold text-ink">{route}</code>
                </div>
              ))}
            </div>
            </div>
          </div>

          <div className="rounded-md border border-hairline bg-surface p-5 md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <FileCode2 className="size-5 text-sea-bright" aria-hidden="true" />
              <h2 className="text-heading-md text-ink">{t('detail.technicalDelivery')}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {technicalDeliveryKeys.map((key) => (
                <div key={key} className="rounded-md border border-hairline bg-canvas p-4">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-sea-bright">
                    {t(`detail.delivery.${key}.title`)}
                  </p>
                  <p className="mt-2 text-sm leading-[1.7] text-muted">
                    {t(`detail.delivery.${key}.body`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-md border border-hairline bg-canvas p-4">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <FileCode2 className="size-4 text-sea-bright" aria-hidden="true" />
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.12em] text-sea-bright">
                  {t('detail.technicalReference')}
                </h3>
                <span className={cn('rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]', statusClasses[system.status])}>
                  {t(`status.${statusLabelKeys[system.status]}`)}
                </span>
              </div>

              <p className="text-body-sm leading-[1.75] text-muted">
                <span className="font-semibold text-ink">{t('detail.disclosure')}:</span> {system.disclosure}
              </p>

              <div className="mt-4 border-t border-hairline pt-4">
                <p className="mono-label mb-3 text-muted">{t('detail.stackTags')}</p>
                <div className="flex flex-wrap gap-2">
                  {system.technical.map((item) => (
                    <span
                      key={item}
                      className="rounded-sm border border-hairline bg-surface px-2 py-1 font-mono text-[10px] font-semibold text-sea-bright"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {(system.repoUrl || system.liveUrl) && (
                <div className="mt-4 flex flex-wrap gap-3 border-t border-hairline pt-4">
                  {system.repoUrl && (
                    <a
                      href={system.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${system.title} repository on GitHub`}
                      className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted transition-colors hover:text-sea-bright"
                    >
                      {t('labels.repository')}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {system.liveUrl && (
                    <a
                      href={system.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted transition-colors hover:text-oxide-hover"
                    >
                      <Globe2 className="size-3.5" aria-hidden="true" />
                      {t('viewLiveSite')}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-canvas-soft px-[var(--container-padding)] py-14 md:py-20">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <SignalBadge label={t('detail.auditCtaEyebrow')} tone="sea" />
            <h2 className="mt-4 text-heading-lg text-ink">{t('detail.auditCtaHeading')}</h2>
            <p className="mt-4 max-w-2xl text-body-lg leading-[1.75] text-muted">{t('detail.auditCtaSubtitle')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white transition-colors hover:bg-oxide-hover"
            >
              <Link href="/website-audits">
                {t('detail.requestAudit')}
                <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-hairline bg-transparent px-6 text-base text-ink transition-colors hover:bg-surface hover:text-ink"
            >
              <Link href="/contact">{t('detail.contact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
