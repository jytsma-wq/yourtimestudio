import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, BedDouble, CheckCircle2, Sparkles, type LucideIcon } from 'lucide-react';
import { NavigationChart, SignalBadge } from '@/components/brand';
import { ExampleSystemFallbackVisual, ExampleSystemVisual } from '@/components/work/ExampleSystemVisual';
import { ScreenshotFrame } from '@/components/work/ScreenshotFrame';
import { exampleSystems, type ExampleSystem } from '@/content/example-systems';
import { Link } from '@/lib/i18n/navigation';
import { getPrimaryExampleScreenshot } from '@/lib/work-screenshots';
import { cn } from '@/lib/utils';

type BuildSlug = 'silk-beauty-salon' | 'grand-boutique-hotel';
type SignalBadgeTone = 'sea' | 'oxide' | 'success' | 'muted';

type BuildStyle = CSSProperties & {
  '--build-color': string;
  '--bl-signal-position': string;
};

type BuildConfig = {
  slug: BuildSlug;
  badgeKey: 'silk.badge' | 'grand.badge';
  descriptionKey: 'silk.description' | 'grand.description';
  icon: LucideIcon;
  tone: SignalBadgeTone;
  color: string;
  textClass: string;
  signalPosition: string;
  routes: string[];
};

const buildConfigs: BuildConfig[] = [
  {
    slug: 'silk-beauty-salon',
    badgeKey: 'silk.badge',
    descriptionKey: 'silk.description',
    icon: Sparkles,
    tone: 'oxide',
    color: 'var(--primitive-oxide-hover)',
    textClass: 'text-oxide-hover',
    signalPosition: '58%',
    routes: ['/', '/treatments', '/booking', '/contact'],
  },
  {
    slug: 'grand-boutique-hotel',
    badgeKey: 'grand.badge',
    descriptionKey: 'grand.description',
    icon: BedDouble,
    tone: 'sea',
    color: 'var(--primitive-sea-bright)',
    textClass: 'text-sea-bright',
    signalPosition: '68%',
    routes: ['/', '/rooms', '/booking', '/contact'],
  },
];

function getExampleSystem(slug: BuildSlug): ExampleSystem {
  const system = exampleSystems.find((item) => item.slug === slug);

  if (!system) {
    throw new Error(`Missing example system content for ${slug}`);
  }

  return system;
}

function BuildVisual({
  pendingLabel,
  priority,
  screenshotSrc,
  system,
}: {
  pendingLabel: string;
  priority?: boolean;
  screenshotSrc?: string;
  system: ExampleSystem;
}) {
  if (screenshotSrc) {
    return (
      <ScreenshotFrame
        alt={system.screenshot?.alt ?? `${system.title} example system interface screenshot`}
        device="desktop"
        fallback={<ExampleSystemFallbackVisual fallbackVisual={system.fallbackVisual} />}
        label={system.title}
        priority={priority}
        src={screenshotSrc}
      />
    );
  }

  return (
    <ExampleSystemVisual
      screenshotSrc={screenshotSrc}
      screenshotsComingSoon={pendingLabel}
      system={system}
      variant="card"
    />
  );
}

export async function ExampleBuildsSection() {
  const t = await getTranslations('homepage.exampleBuilds');

  return (
    <section className="relative isolate overflow-hidden border-y border-hairline bg-canvas px-[var(--container-padding)] py-16 md:py-24">
      <NavigationChart variant="section" className="!absolute opacity-[0.28]" />
      <div className="pointer-events-none absolute inset-0 bl-noise" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 bl-signal-line h-5 opacity-45" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max-width)]">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <SignalBadge label={t('eyebrow')} tone="sea" />
            <h2 className="mt-5 text-display-lg text-ink">{t('heading')}</h2>
          </div>
          <p className="max-w-2xl text-body-lg leading-[1.75] text-muted lg:justify-self-end">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {buildConfigs.map((config, index) => {
            const system = getExampleSystem(config.slug);
            const screenshotSrc = getPrimaryExampleScreenshot(system);
            const Icon = config.icon;

            return (
              <article
                key={system.slug}
                className="group relative isolate overflow-hidden rounded-md border border-hairline bg-surface shadow-premium-lg transition-colors hover:border-[color:var(--build-color)]"
                style={
                  {
                    '--build-color': config.color,
                    '--bl-signal-position': config.signalPosition,
                  } as BuildStyle
                }
              >
                <div className="pointer-events-none absolute inset-0 bl-soft-vignette opacity-80" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 bl-grid opacity-20" aria-hidden="true" />

                <div className="relative z-10 grid h-full gap-0">
                  <div className="border-b border-hairline p-4 md:p-5">
                    <BuildVisual
                      pendingLabel={t('screenshotsPending')}
                      priority={index === 0}
                      screenshotSrc={screenshotSrc}
                      system={system}
                    />
                    <div className="mt-4 bl-signal-line h-4" aria-hidden="true" />
                  </div>

                  <div className="grid gap-5 p-5">
                    <div className="flex min-w-0 flex-wrap items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-hairline bg-canvas/80">
                        <Icon className={cn('size-4', config.textClass)} aria-hidden="true" />
                      </span>
                      <SignalBadge label={t(config.badgeKey)} tone={config.tone} />
                      <span className="ml-auto font-mono text-xs font-semibold text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div>
                      <p className="mono-label mb-3 text-sea-bright">{t('systemLabel')}</p>
                      <h3 className="text-heading-md text-ink">{system.title}</h3>
                      <p className="mt-3 text-body-sm leading-[1.75] text-muted">
                        {t(config.descriptionKey)}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {system.modules.slice(0, 4).map((module) => (
                        <div key={module} className="flex gap-2 text-sm leading-relaxed text-ink">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                          <span>{module}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {config.routes.map((route) => (
                        <code
                          key={route}
                          className="rounded-sm border border-hairline bg-canvas/90 px-2 py-1 font-mono text-[10px] font-semibold text-muted"
                        >
                          {route}
                        </code>
                      ))}
                    </div>

                    <div className="border-t border-hairline pt-5">
                      <Link
                        href={`/work/${system.slug}`}
                        className="inline-flex items-center gap-2 rounded-md border border-oxide/45 bg-oxide/15 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-oxide hover:text-white"
                      >
                        {t('cta')}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
