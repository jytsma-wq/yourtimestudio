import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { type Locale } from '@/lib/i18n/config';
import { sectorKeys, sectors } from '@/lib/sector-config';
import { Section } from '@/components/shared/Section';

interface SectorCardsSectionProps {
  locale: Locale;
  /** Large faint section number for background decoration */
  number?: string;
}

export async function SectorCardsSection({ locale, number }: SectorCardsSectionProps) {
  const t = await getTranslations('sectors');

  return (
    <Section border number={number}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <h2 className="editorial-display text-4xl text-foreground md:text-5xl lg:text-6xl">
            {t('heading')}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {sectorKeys.map((sectorKey) => {
            const sector = sectors[sectorKey];
            return (
              <article
                key={sectorKey}
                className="group flex min-w-0 flex-col overflow-hidden border border-border bg-background transition-colors duration-200 ease-out hover:border-brand-serene-coral/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={sector.image}
                    alt={t(`${sectorKey}.title`)}
                    fill
                    className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] ${sector.focalPoint}`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={sector.blur}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-2xl font-semibold leading-tight text-foreground">
                    {t(`${sectorKey}.title`)}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground">
                    {t(`${sectorKey}.pain`)}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Check className={`mt-0.5 size-4 shrink-0 ${sector.textClass}`} aria-hidden="true" />
                        <span>{t(`${sectorKey}.deliverables.${i}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={sector.href}
                    className={`mt-7 inline-flex min-h-11 items-center gap-2 self-start border-b border-transparent py-2 text-sm font-semibold no-underline transition-colors duration-150 ease-in-out hover:border-accent ${sector.textClass}`}
                  >
                    {t(`${sectorKey}.cta`)}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
