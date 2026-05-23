import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { type Locale } from '@/lib/i18n/config';
import { CountUp } from '@/components/shared/CountUp';
import { sectors } from '@/lib/sector-config';
import { siteConfig } from '@/lib/site-config';
import { AvailabilityBadge } from '@/components/shared/AvailabilityBadge';
import { MagneticButton } from '@/components/shared/MagneticButton';

interface HeroSectionProps {
  locale: Locale;
}

const statKeys = Object.keys(siteConfig.stats) as (keyof typeof siteConfig.stats)[];
const statDelays = [0, 160, 320];
const proofKeys = ['proof_band.0', 'proof_band.1', 'proof_band.2', 'proof_band.3'] as const;

export async function HeroSection({ locale: _locale }: HeroSectionProps) {
  const t = await getTranslations('hero');

  return (
    <section
      id="hero"
      data-section-name={t('sectionLabel')}
      className="bg-background paper-texture px-4 pt-12 pb-10 sm:pt-14 md:px-8 lg:pt-12 lg:pb-12 relative overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-4rem)] lg:max-w-7xl">
        <div className="mb-8 hidden items-center justify-between border-y border-border py-3 text-xs text-muted-foreground md:flex">
          <span className="editorial-kicker">{t('meta_brand')}</span>
          <span className="editorial-kicker">{t('meta_services')}</span>
          <AvailabilityBadge />
        </div>

        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:gap-14 items-center">
          <div className="min-w-0">
            <p className="section-label">{t('sectionLabel')}</p>
            <h1 className="editorial-display max-w-[22rem] text-[clamp(2.4rem,8.8vw,5.25rem)] sm:max-w-full sm:text-6xl lg:text-[4.65rem] xl:text-[5.25rem] text-foreground text-balance">
              {t('title1')}
              <span className="block text-navy">{t('title2')}</span>
            </h1>
            <p className="mt-6 max-w-[22rem] text-base md:max-w-2xl md:text-xl text-muted-foreground leading-[1.75]">
              {t('subtitle')}
            </p>

            <div className="mt-8 grid max-w-[22rem] gap-2 sm:max-w-none sm:grid-cols-2">
              {proofKeys.map((key) => (
                <div key={key} className="flex items-center gap-2 border-t border-border py-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-navy" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid max-w-[22rem] gap-3 sm:max-w-none sm:flex sm:flex-wrap">
              <MagneticButton className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full rounded-none bg-foreground px-6 text-base font-semibold text-background hover:bg-foreground/88 sm:w-auto"
                >
                  <Link href="/website-audits">
                    {t('cta_primary')}
                    <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-none border-foreground/25 bg-transparent px-6 text-base text-foreground hover:bg-foreground hover:text-background sm:w-auto"
              >
                <Link href="/pricing">
                  {t('cta_secondary')}
                </Link>
              </Button>
            </div>
          </div>

          <div className="min-w-0">
            <div className="relative mx-auto max-w-xl">
              <div className="relative aspect-[4/5] overflow-hidden border border-foreground/15 bg-card shadow-premium-xl">
                <Image
                  src={sectors.hospitality.image}
                  alt={t('cards.hospitality.name')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  placeholder="blur"
                  blurDataURL={sectors.hospitality.blur}
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent p-5 text-paper">
                  <p className="editorial-kicker text-paper">{t('feature_direction')}</p>
                  <p className="mt-2 max-w-sm text-2xl font-semibold leading-tight">
                    {t('typewriter.hotel')}
                  </p>
                </div>
              </div>

              <div className="absolute -left-4 top-8 hidden w-44 border border-border bg-background p-3 shadow-premium-lg sm:block">
                <p className="editorial-kicker text-teal">{t('issue')}</p>
                <p className="mt-2 text-sm font-semibold leading-snug">
                  {t('cards.medical.tagline')}
                </p>
              </div>

              <div className="absolute -right-4 bottom-8 hidden w-52 border border-border bg-background p-3 shadow-premium-lg sm:block">
                <div className="relative mb-3 aspect-[4/3] overflow-hidden">
                  <Image
                    src={sectors.beauty.image}
                    alt={t('cards.beauty.name')}
                    fill
                    className="object-cover"
                    sizes="208px"
                    placeholder="blur"
                    blurDataURL={sectors.beauty.blur}
                  />
                </div>
                <p className="editorial-kicker text-rose">{t('appointment_flow')}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t('cards.beauty.priceFrom')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid border-y border-border md:grid-cols-3">
          {statKeys.map((key, i) => (
            <div key={key} className="border-border py-5 md:border-r md:px-6 last:md:border-r-0">
              <div className="text-3xl md:text-4xl font-semibold text-foreground">
                <CountUp
                  number={siteConfig.stats[key].number}
                  suffix={siteConfig.stats[key].suffix}
                  delay={statDelays[i] ?? 0}
                />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`stats.${key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
