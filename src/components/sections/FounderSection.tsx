import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import {
  ArrowRight,
  Code2,
  FileSearch,
  Gauge,
  Globe,
  Layout,
  MapPin,
  MousePointerClick,
  Rocket,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';

interface FounderSectionProps {
  locale: Locale;
}

const operatingModel = [
  { key: 'diagnose', icon: Search },
  { key: 'structure', icon: FileSearch },
  { key: 'design', icon: Layout },
  { key: 'build', icon: Code2 },
  { key: 'launch', icon: Rocket },
  { key: 'improve', icon: Gauge },
] as const;

const directKeys = ['ux', 'frontend', 'localSeo', 'multilingual', 'checks', 'leadFlows'] as const;
const notFakeKeys = ['numbers', 'decoration', 'templates', 'guarantees'] as const;

export async function FounderSection({ locale }: FounderSectionProps) {
  void locale;
  const t = await getTranslations('founder');

  return (
    <section className="bg-canvas py-16 md:py-24 px-[var(--container-padding)]">
      <div className="mx-auto max-w-[var(--container-max-width)]">
        {/* Part A — Founder intro */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          {/* Left: Info */}
          <div>
            <p className="mono-label text-sea-bright mb-4">{t('founder.sectionLabel')}</p>
            <h2 className="text-display-lg text-ink">
              {t('founder.heading')}
            </h2>
            <p className="mt-6 text-body-lg text-muted leading-relaxed max-w-lg">
              {t('founder.bio')}
            </p>
            <div className="mt-6 max-w-xl space-y-3 border-l border-hairline pl-4">
              {[0, 1, 2].map((index) => (
                <p key={index} className="text-body-sm leading-[1.75] text-muted">
                  {t(`founder.story.${index}`)}
                </p>
              ))}
            </div>
            <div className="mt-6 flex gap-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-4 text-sea-bright" />
                <span>{t('founder.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Globe className="size-4 text-sea-bright" />
                <span>{t('founder.since')}</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sea-bright hover:text-oxide transition-colors"
            >
              {t('founder.cta')}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right: Operating model */}
          <div className="bg-surface border border-hairline rounded-md overflow-hidden">
            <div className="border-b border-hairline p-5">
              <p className="mono-label text-sea-bright">{t('operating.label')}</p>
              <p className="mt-2 text-sm text-ink font-semibold">{t('operating.heading')}</p>
            </div>
            <div className="divide-y divide-hairline">
              {operatingModel.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.key} className="flex items-center gap-3 p-4 hover:bg-surface-elevated/50 transition-colors">
                    <div className="flex size-8 items-center justify-center rounded bg-sea/10 shrink-0">
                      <Icon className="size-3.5 text-sea-bright" />
                    </div>
                    <span className="text-sm font-medium text-ink">{t(`operating.items.${step.key}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part B — What I do / What I don't fake */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-hairline rounded-md p-5">
            <p className="mono-label text-sea-bright mb-4">{t('direct.label')}</p>
            <div className="space-y-2">
              {directKeys.map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-ink">
                  <ShieldCheck className="size-3.5 text-success shrink-0" />
                  <span>{t(`direct.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface border border-hairline rounded-md p-5">
            <p className="mono-label text-oxide mb-4">{t('not_fake.label')}</p>
            <div className="space-y-2">
              {notFakeKeys.map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-ink">
                  <MousePointerClick className="size-3.5 text-oxide shrink-0" />
                  <span>{t(`not_fake.items.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
