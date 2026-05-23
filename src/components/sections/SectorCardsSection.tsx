import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { type Locale } from '@/lib/i18n/config';
import { FadeInUp } from '@/components/motion';
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
        <div className="mb-12 grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-label">{t('sectionLabel')}</p>
            <p className="editorial-kicker text-muted-foreground">{t('kicker')}</p>
          </div>
          <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('heading')}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:col-start-2">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-0 border-y border-border">
          {sectorKeys.map((sectorKey, idx) => {
            const sector = sectors[sectorKey];
            const isReversed = idx % 2 === 1;
            return (
              <FadeInUp key={sectorKey} delay={idx * 0.1}>
                <div
                  className="grid gap-0 border-b border-border last:border-b-0 lg:grid-cols-12"
                >
                  <div
                    className={`relative min-h-[320px] overflow-hidden lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}
                  >
                    <Image
                      src={sector.image}
                      alt={t(`${sectorKey}.title`)}
                      fill
                      className={`object-cover ${sector.focalPoint}`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={sector.blur}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-paper">
                      <p className="editorial-kicker text-paper">{String(idx + 1).padStart(2, '0')} / {t(`${sectorKey}.title`)}</p>
                      <p className="mt-2 text-2xl font-semibold leading-tight">{t(`${sectorKey}.tagline`)}</p>
                    </div>
                  </div>

                  <div className={`bg-card p-6 md:p-10 lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
                      <div>
                        <p className="editorial-kicker text-muted-foreground">{t('departmentLabel')} {String(idx + 1).padStart(2, '0')}</p>
                        <h3 className="mt-3 text-3xl font-semibold text-foreground leading-tight">
                          {t(`${sectorKey}.title`)}
                        </h3>
                        <p className="mt-4 text-sm font-medium text-muted-foreground">
                          {t(`${sectorKey}.priceFrom`)}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg leading-relaxed text-foreground">
                          {t(`${sectorKey}.pain`)}
                        </p>
                        <ul className="mt-6 divide-y divide-border border-y border-border">
                          {[0, 1, 2, 3].map((i) => (
                            <li key={i} className="flex items-start gap-3 py-3 text-sm text-muted-foreground">
                              <Check className={`size-4 mt-0.5 shrink-0 ${sector.textClass}`} />
                              <span>{t(`${sectorKey}.deliverables.${i}`)}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={sector.href}
                          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${sector.textClass} hover:opacity-70 transition-opacity`}
                        >
                          {t(`${sectorKey}.cta`)}
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          {sectorKeys.map((sectorKey) => {
            const sector = sectors[sectorKey];
            return (
              <Link
                key={sectorKey}
                href={sector.href}
                className="group flex items-center justify-between border-t border-border pt-4"
              >
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${sector.dotClass}`} />
                  {t(`${sectorKey}.subtitle`)}
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
