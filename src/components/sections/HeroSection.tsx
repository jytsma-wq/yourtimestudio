import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import type { Locale } from '@/lib/i18n/config';

interface HeroSectionProps {
  locale: Locale;
}

const proofKeys = ['proof_band.0', 'proof_band.1', 'proof_band.2', 'proof_band.3'] as const;

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations('hero');
  const isGeorgian = locale === 'ka';

  return (
    <section
      id="hero"
      data-section-name={t('sectionLabel')}
      className="relative isolate overflow-hidden bg-[#111312] text-brand-cream"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/studio-scenes/hospitality-hero.webp"
          alt={t('visual_alt')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,19,18,0.96)_0%,rgba(17,19,18,0.84)_38%,rgba(17,19,18,0.18)_78%,rgba(17,19,18,0.08)_100%)] max-md:bg-[linear-gradient(180deg,rgba(17,19,18,0.9)_0%,rgba(17,19,18,0.82)_55%,rgba(17,19,18,0.56)_100%)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[46rem] w-full max-w-[var(--hero-max-width)] flex-col px-[var(--container-padding)] pb-8 pt-8 lg:min-h-[calc(100svh-7rem)] lg:pb-10 lg:pt-10">
        <div className="flex items-start justify-between gap-6 border-b border-brand-cream/25 pb-4 text-xs font-semibold uppercase text-brand-cream/75">
          <span>{t('eyebrow')}</span>
          <span className="hidden text-right md:block">{t('visual_label')}</span>
        </div>

        <div className="my-auto max-w-5xl py-14 lg:py-20">
          <h1
            className={
              isGeorgian
                ? 'max-w-[20ch] text-[1.75rem] font-semibold leading-[1.05] text-brand-cream min-[360px]:text-[2rem] sm:text-5xl lg:text-[4.6rem]'
                : 'max-w-[15ch] text-[2.5rem] font-semibold leading-[0.92] text-brand-cream min-[360px]:text-[2.9rem] sm:text-6xl lg:text-[5.8rem] xl:text-[7rem]'
            }
          >
            <span className="block font-sans text-brand-cream">{t('title1')}</span>
            <span className="mt-2 block font-serif font-medium italic text-brand-serene-coral sm:mt-3">
              {t('title2')}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-[1.7] text-brand-cream/82 md:text-lg">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none bg-brand-serene-coral px-6 text-base font-semibold text-brand-charcoal hover:bg-brand-cream"
            >
              <Link
                href="/website-audits"
                data-analytics-event="homepage_primary_audit_cta_click"
                data-analytics-section="hero"
              >
                {t('cta_primary')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-none border-brand-cream/50 bg-transparent px-6 text-base text-brand-cream hover:bg-brand-cream hover:text-brand-charcoal"
            >
              <Link
                href="/work"
                data-analytics-event="homepage_work_cta_click"
                data-analytics-section="hero"
              >
                {t('cta_secondary')}
              </Link>
            </Button>
          </div>
        </div>

        <ul className="grid border-t border-brand-cream/25 text-sm text-brand-cream/78 sm:grid-cols-2 lg:grid-cols-4">
          {proofKeys.map((key, index) => (
            <li
              key={key}
              className="flex min-h-14 items-center gap-3 border-brand-cream/20 py-3 sm:odd:border-r lg:border-r lg:px-4 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="text-brand-serene-coral" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
