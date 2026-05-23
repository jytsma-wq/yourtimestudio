import { getTranslations } from 'next-intl/server';
import { ArrowRight, LayoutTemplate } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/motion';
import { Link } from '@/lib/i18n/navigation';
import { sectorKeys, sectors, sectorYears } from '@/lib/sector-config';
import { Section } from '@/components/shared/Section';
import Image from 'next/image';

export async function CaseStudiesSection({ number }: { number?: string }) {
  const t = await getTranslations('caseStudies');

  return (
    <Section variant="dark" className="relative overflow-hidden" number={number}>
      <div className="mb-12 grid gap-6 border-b border-background/12 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="section-label text-background">{t('sectionLabel')}</p>
          <p className="editorial-kicker text-background">Work in public</p>
        </div>
        <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-background">
          {t('heading')}
        </h2>
      </div>

      <StaggerContainer className="grid gap-px overflow-hidden border border-background/12 bg-background/12 md:grid-cols-[1.15fr_0.85fr] md:auto-rows-fr">
        {sectorKeys.map((key) => {
          const sector = sectors[key];
          const year = sectorYears[key];
          return (
            <StaggerItem key={key}>
              <article className="group bg-ink text-background">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={sector.portfolioImage}
                    alt={`${t(`studies.${key}.title`)} reference direction`}
                    fill
                    className="object-cover opacity-78 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={sector.portfolioBlur}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="editorial-kicker text-background">{year} / {t(`studies.${key}.vertical`)}</p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight text-background">
                      {t(`studies.${key}.title`)}
                    </h3>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="inline-flex items-center gap-2">
                    <LayoutTemplate className="size-4 text-brand-serene-coral-darken" />
                    <span className="text-sm font-semibold text-background">
                      {t(`studies.${key}.result`)}
                    </span>
                  </div>
                  <Link
                    href="/work"
                    className="mt-5 flex items-center gap-2 text-sm font-semibold text-background transition-colors hover:text-background"
                  >
                    {t('seeBrief')}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-background">
        {t('moreNote')}
      </p>
    </Section>
  );
}
