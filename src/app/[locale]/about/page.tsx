import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  BadgeCheck,
  Braces,
  Camera,
  Code2,
  DatabaseZap,
  FileSearch,
  Gauge,
  Globe2,
  Layout,
  MapPin,
  MousePointerClick,
  Rocket,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata, pageOgImages } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'About - Batumi Lighthouse',
    description:
      'Founder-led website development in Batumi by Jasper: strategy, UX, code, SEO, launch, and improvement for hotels, clinics, and studios.',
    path: '/about',
    locale: locale as Locale,
    ogImage: pageOgImages.about,
  });
}

const operatingKeys = ['diagnose', 'structure', 'design', 'build', 'launch', 'improve'] as const;
const stackKeys = ['nextjs', 'react', 'tailwind', 'routes', 'schema', 'performance', 'seo', 'forms'] as const;
const directKeys = ['ux', 'frontend', 'seo', 'multilingual', 'checks', 'lead_flows'] as const;
const supportKeys = ['photography', 'content'] as const;
const notFakeKeys = ['numbers', 'decoration', 'templates', 'guarantees'] as const;

const operatingIcons: Record<(typeof operatingKeys)[number], LucideIcon> = {
  diagnose: Search,
  structure: FileSearch,
  design: Layout,
  build: Code2,
  launch: Rocket,
  improve: Gauge,
};

const stackIcons: Record<(typeof stackKeys)[number], LucideIcon> = {
  nextjs: Code2,
  react: Braces,
  tailwind: Sparkles,
  routes: Globe2,
  schema: DatabaseZap,
  performance: Gauge,
  seo: Search,
  forms: MousePointerClick,
};

const directIcons: Record<(typeof directKeys)[number], LucideIcon> = {
  ux: Layout,
  frontend: Code2,
  seo: Search,
  multilingual: Globe2,
  checks: Gauge,
  lead_flows: MousePointerClick,
};

const supportIcons: Record<(typeof supportKeys)[number], LucideIcon> = {
  photography: Camera,
  content: FileSearch,
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('aboutPage');
  const tNav = await getTranslations('nav');

  const breadcrumbItems = [
    { label: tNav('about'), href: '/about' },
  ];

  return (
    <div data-locale={locale} className="bg-canvas text-ink">
      <section className="px-[var(--container-padding)] py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[var(--hero-max-width)]">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] lg:items-end lg:gap-16">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('hero.eyebrow')}</p>
              <h1 className="max-w-4xl text-display-lg text-ink">{t('hero.title')}</h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-[1.75] text-muted">
                {t('hero.subtitle')}
              </p>
              <div className="mt-6 max-w-3xl space-y-3 border-l border-hairline pl-4">
                {[0, 1, 2].map((index) => (
                  <p key={index} className="text-body-sm leading-[1.75] text-muted">
                    {t(`hero.story.${index}`)}
                  </p>
                ))}
              </div>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white hover:bg-oxide-hover hover:text-white"
              >
                <Link href="/website-audits">
                  {t('cta.button')}
                  <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <aside className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label text-muted">{t('hero.panel_label')}</p>
              <h2 className="mt-3 text-heading-md text-ink">{t('hero.panel_title')}</h2>
              <p className="mt-3 text-body-sm leading-[1.75] text-muted">{t('hero.panel_body')}</p>
              <div className="mt-5 grid gap-2">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-2 rounded border border-hairline bg-canvas px-3 py-2 text-sm text-ink">
                    <MapPin className="size-3.5 shrink-0 text-sea-bright" aria-hidden={index !== 0} />
                    <span>{t(`hero.panel_points.${index}`)}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 max-w-3xl">
            <p className="mono-label mb-4 text-sea-bright">{t('operating.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink">{t('operating.heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted">{t('operating.subtitle')}</p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-6">
            {operatingKeys.map((key, index) => {
              const Icon = operatingIcons[key];
              return (
                <article key={key} className="bg-surface p-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas">
                      <Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-ink">{t(`operating.items.${key}.title`)}</h3>
                  <p className="mt-3 text-body-sm leading-[1.7] text-muted">
                    {t(`operating.items.${key}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('stack.eyebrow')}</p>
              <h2 className="text-heading-lg text-ink-dark">{t('stack.heading')}</h2>
            </div>
            <p className="max-w-2xl text-body-lg leading-[1.75] text-muted-dark lg:justify-self-end">
              {t('stack.subtitle')}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stackKeys.map((key) => {
              const Icon = stackIcons[key];
              return (
                <div key={key} className="rounded-md border border-hairline-light bg-paper-soft p-4">
                  <div className="mb-4 flex size-9 items-center justify-center rounded bg-sea/10">
                    <Icon className="size-4 text-sea-bright" aria-hidden="true" />
                  </div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-sea-bright">
                    {t(`stack.items.${key}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-canvas px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-md border border-hairline bg-surface p-5 md:p-6">
            <p className="mono-label mb-4 text-sea-bright">{t('direct.eyebrow')}</p>
            <h2 className="text-heading-md text-ink">{t('direct.heading')}</h2>
            <div className="mt-6 grid gap-3">
              {directKeys.map((key) => {
                const Icon = directIcons[key];
                return (
                  <div key={key} className="grid grid-cols-[auto_1fr] gap-3 rounded-md border border-hairline bg-canvas p-3">
                    <div className="flex size-9 items-center justify-center rounded bg-sea/20">
                      <Icon className="size-4 text-sea-bright" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">{t(`direct.items.${key}.title`)}</h3>
                      <p className="mt-1 text-sm leading-[1.6] text-muted">{t(`direct.items.${key}.description`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-md border border-hairline bg-surface p-5 md:p-6">
            <p className="mono-label mb-4 text-sea-bright">{t('support.eyebrow')}</p>
            <h2 className="text-heading-md text-ink">{t('support.heading')}</h2>
            <p className="mt-4 text-body-sm leading-[1.75] text-muted">{t('support.subtitle')}</p>
            <div className="mt-6 grid gap-3">
              {supportKeys.map((key) => {
                const Icon = supportIcons[key];
                return (
                  <div key={key} className="rounded-md border border-hairline bg-canvas p-4">
                    <Icon className="mb-4 size-5 text-oxide-hover" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-ink">{t(`support.items.${key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-[1.6] text-muted">{t(`support.items.${key}.description`)}</p>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-paper px-[var(--container-padding)] py-16 text-ink-dark md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="mono-label mb-4 text-sea-bright">{t('not_fake.eyebrow')}</p>
            <h2 className="text-heading-lg text-ink-dark">{t('not_fake.heading')}</h2>
            <p className="mt-5 text-body-lg leading-[1.75] text-muted-dark">{t('not_fake.subtitle')}</p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline-light bg-hairline-light sm:grid-cols-2">
            {notFakeKeys.map((key) => (
              <article key={key} className="bg-paper-soft p-5">
                <div className="mb-4 flex size-9 items-center justify-center rounded bg-oxide/10">
                  <BadgeCheck className="size-4 text-oxide" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-ink-dark">{t(`not_fake.items.${key}.title`)}</h3>
                <p className="mt-3 text-body-sm leading-[1.7] text-muted-dark">
                  {t(`not_fake.items.${key}.description`)}
                </p>
              </article>
            ))}
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
          <Button
            asChild
            size="lg"
            className="h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white hover:bg-oxide-hover hover:text-white"
          >
            <Link href="/website-audits">
              {t('cta.button')}
              <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
