import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/shared/Section';
import { Link } from '@/lib/i18n/navigation';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Code2,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { SlideInLeft, SlideInRight, FadeInUp } from '@/components/motion';
import { AvailabilityBadge } from '@/components/shared/AvailabilityBadge';

interface FounderSectionProps {
  locale: Locale;
  /** Large faint section number for background decoration */
  number?: string;
}

export async function FounderSection({ locale, number }: FounderSectionProps) {
  const t = await getTranslations('founder');
  const responsibilities = [
    { icon: FileText, key: '0' },
    { icon: Code2, key: '1' },
    { icon: Search, key: '2' },
    { icon: ShieldCheck, key: '3' },
  ];
  const featureIcons = [UsersRound, Camera, CheckCircle2, ShieldCheck];

  return (
    <Section border number={number} className="bg-background">
      <div className="mx-auto max-w-7xl" data-locale={locale}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-start">
          <SlideInLeft>
            <div>
              <p className="section-label">{t('founder.sectionLabel')}</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {t('founder.heading')}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {t('founder.bio')}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                  <MapPin className="size-4 text-navy" aria-hidden="true" />
                  {t('founder.location')}
                </span>
                <AvailabilityBadge />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/website-audits"
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {t('founder.cta')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center justify-center border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {t('founder.secondaryCta')}
                </Link>
              </div>
            </div>
          </SlideInLeft>

          <SlideInRight>
            <aside className="border border-border bg-card p-5 shadow-none md:p-7" aria-label={t('founder.panelLabel')}>
              <p className="text-sm font-semibold text-muted-foreground">{t('founder.panelLabel')}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {t('founder.panelHeading')}
              </h3>

              <div className="mt-6 space-y-4">
                {responsibilities.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-border bg-background">
                      <Icon className="size-4 text-navy" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {t(`founder.responsibilities.${key}.title`)}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t(`founder.responsibilities.${key}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-4">
                <div className="border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold text-foreground">{t('founder.supportTitle')}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('founder.supportBody')}</p>
                </div>
                <div className="border border-border bg-background p-4">
                  <h4 className="text-sm font-semibold text-foreground">{t('founder.noFakeTitle')}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('founder.noFakeBody')}</p>
                </div>
              </div>
            </aside>
          </SlideInRight>
        </div>

        <FadeInUp delay={0.2}>
          <div className="mt-14 border border-border bg-card py-10 md:mt-20 md:py-12">
            <div className="grid gap-6 px-5 md:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="section-label">{t('features.sectionLabel')}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {t('features.heading')}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t('features.intro')}
              </p>
            </div>
            <div className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {featureIcons.map((Icon, i) => (
                <div key={i} className="border-b border-border bg-card p-5 shadow-none sm:border-r sm:even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0 md:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-border bg-background">
                    <Icon className="size-5 text-navy" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{t(`features.items.${i}.title`)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`features.items.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </Section>
  );
}
