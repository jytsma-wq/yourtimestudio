import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/shared/Section';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight, Globe2, Clock, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { SlideInLeft, SlideInRight, FadeInUp } from '@/components/motion';
import { teamBlur } from '@/lib/blur-placeholders';
import { siteConfig } from '@/lib/site-config';
import { SpotlightCard } from '@/components/shared/SpotlightCard';
import { AvailabilityBadge } from '@/components/shared/AvailabilityBadge';

interface FounderSectionProps {
  locale: Locale;
  /** Large faint section number for background decoration */
  number?: string;
}

export async function FounderSection({ locale, number }: FounderSectionProps) {
  const t = await getTranslations('founder');

  return (
    <Section border number={number}>
      <div className="max-w-7xl mx-auto">
        {/* Part A — Founder intro row */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <SlideInLeft>
            <div className="relative overflow-visible isolate">
              <Image
                src="/images/about-team.jpg"
                alt={t('founder.imageAlt')}
                width={480}
                height={560}
                className="border border-border object-cover object-top shadow-premium-xl w-full"
                placeholder="blur"
                blurDataURL={teamBlur}
              />
              {/* Floating stat chip 1 */}
              <div className="absolute bottom-4 right-4 bg-brand-sage-green-darken text-background px-4 py-3 shadow-premium-lg float-chip-1">
                <p className="text-2xl font-bold">{siteConfig.stats.clients.number}{siteConfig.stats.clients.suffix}</p>
                <p className="text-xs opacity-80">{t('founder.statClients')}</p>
              </div>
              {/* Floating stat chip 2 */}
              <div className="absolute top-4 left-4 bg-card border border-border px-4 py-3 shadow-premium float-chip-2">
                <p className="text-2xl font-bold text-brand-serene-coral-darken">{siteConfig.stats.languages.number}</p>
                <p className="text-xs text-muted-foreground">{t('founder.statLanguages')}</p>
              </div>
              {/* Floating stat chip 3 — availability */}
              <div className="absolute top-4 right-4 bg-foreground text-background px-4 py-3 shadow-premium-lg float-chip-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-serene-coral opacity-40" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-serene-coral" />
                  </span>
                  <span className="text-xs font-semibold">{t('founder.statAvailable')}</span>
                </div>
              </div>
            </div>
          </SlideInLeft>

          {/* Text side */}
          <SlideInRight>
            <p className="section-label">{t('founder.sectionLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
              {t('founder.heading')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              {t('founder.bio')}
            </p>
            <div className="mt-8 flex gap-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-brand-serene-coral-darken" />
                <span>{t('founder.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4 text-brand-serene-coral-darken" />
                <span>{t('founder.since')}</span>
              </div>
            </div>
            <AvailabilityBadge className="mt-4" />
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 border-b border-transparent text-sm font-semibold text-brand-sage-green-darken no-underline transition duration-150 ease-in-out hover:border-b-2 hover:border-brand-serene-coral"
            >
              {t('founder.cta')}
              <ArrowRight className="size-4" />
            </Link>
          </SlideInRight>
        </div>

        {/* Part B — Feature cards panel */}
        <FadeInUp delay={0.2}>
          <div className="mt-20 border-y border-border bg-card py-12">
            <div className="grid gap-8 px-6 md:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="section-label">{t('features.sectionLabel')}</p>
                <h3 className="editorial-display text-4xl md:text-5xl text-foreground">
                  {t('features.heading')}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t('features.intro')}
              </p>
            </div>
            <div className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {[Globe2, Clock, ShieldCheck, HeadphonesIcon].map((Icon, i) => (
                <SpotlightCard key={i} className="border-b border-r border-border bg-card bg-paper-texture p-6 shadow-md transition duration-150 ease-out hover:translate-y-[-4px] hover:shadow-xl last:border-r-0 lg:border-b-0">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-border bg-background">
                    <Icon className="size-5 text-brand-serene-coral-darken" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{t(`features.items.${i}.title`)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`features.items.${i}.desc`)}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </Section>
  );
}
