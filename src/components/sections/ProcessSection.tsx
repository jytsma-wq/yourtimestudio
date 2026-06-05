import { getTranslations } from 'next-intl/server';
import { ArrowRight, Hammer, Palette, Rocket, Search } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

const stepIcons = [Search, Palette, Hammer, Rocket];

export async function ProcessSection() {
  const t = await getTranslations('process');

  return (
    <section className="bg-paper py-16 md:py-24 px-[var(--container-padding)]">
      <div className="mx-auto max-w-[var(--container-max-width)]">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="mono-label text-sea mb-4">{t('sectionLabel')}</p>
            <h2 className="text-display-lg text-ink-dark">
              {t('heading')}
            </h2>
            <p className="mt-6 max-w-md text-body-lg text-muted-dark leading-relaxed">
              {t('subtitle')}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-dark hover:text-oxide transition-colors"
            >
              {t('cta')}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Build pipeline — technical steps */}
          <div className="border-t border-hairline-light">
            {[0, 1, 2, 3].map((i) => {
              const Icon = stepIcons[i];
              return (
                <div
                  key={i}
                  className="grid gap-4 border-b border-hairline-light py-6 last:border-b-0 md:grid-cols-[72px_1fr]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded bg-sea/10 shrink-0">
                      <Icon className="size-4 text-sea-bright" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-muted-dark md:hidden">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-muted-dark hidden md:inline">0{i + 1}</span>
                      <h3 className="text-lg font-semibold text-ink-dark">{t(`steps.${i}.title`)}</h3>
                    </div>
                    <p className="text-body-sm text-muted-dark leading-relaxed">
                      {t(`steps.${i}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
