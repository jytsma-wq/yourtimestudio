import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PhotographySceneBoard } from '@/components/photography/PhotographySceneBoard';
import { Section } from '@/components/shared/Section';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

interface PhotographyShowcaseSectionProps {
  number?: string;
}

const scenes = [
  {
    src: '/images/studio-scenes/hospitality-hero.webp',
    titleKey: 'sceneTitles.hospitality',
    altKey: 'sceneAlts.hospitality',
    format: '16:9',
  },
  {
    src: '/images/studio-scenes/beauty-studio.webp',
    titleKey: 'sceneTitles.beauty',
    altKey: 'sceneAlts.beauty',
    format: '4:5',
  },
  {
    src: '/images/studio-scenes/clinic-story.webp',
    titleKey: 'sceneTitles.clinic',
    altKey: 'sceneAlts.clinic',
    format: '16:10',
  },
  {
    src: '/images/studio-scenes/food-story.webp',
    titleKey: 'sceneTitles.food',
    altKey: 'sceneAlts.food',
    format: '3:2',
  },
] as const;

export async function PhotographyShowcaseSection({ number }: PhotographyShowcaseSectionProps) {
  const t = await getTranslations('photographyHome');

  return (
    <Section variant="dark" className="overflow-hidden" number={number}>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-brand-serene-coral">{t('eyebrow')}</p>
          <h2 className="mt-4 max-w-[13ch] font-serif text-5xl font-medium leading-[0.98] text-brand-cream sm:text-6xl lg:text-7xl">
            {t('heading')}
          </h2>
        </div>
        <div className="max-w-xl lg:pb-2">
          <p className="text-lg leading-[1.7] text-brand-cream/75">{t('body')}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none bg-brand-serene-coral text-brand-charcoal hover:bg-brand-cream">
              <Link
                href="/photography"
                data-analytics-event="homepage_photography_cta_click"
                data-analytics-section="photography_showcase"
              >
                {t('primaryCta')}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none border-brand-cream/40 bg-transparent text-brand-cream hover:bg-brand-cream hover:text-brand-charcoal">
              <Link href="/contact">{t('secondaryCta')}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <PhotographySceneBoard
          ariaLabel={t('stage.ariaLabel')}
          heading={t('stage.contactSheet')}
          disclosure={t('stage.disclosure')}
          scenes={scenes.map((scene) => ({
            src: scene.src,
            title: t(scene.titleKey),
            alt: t(scene.altKey),
            format: scene.format,
          }))}
        />
      </div>

      <div className="mt-10 grid border-y border-brand-cream/25 sm:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="py-5 sm:border-r sm:border-brand-cream/20 sm:px-6 sm:first:pl-0 sm:last:border-r-0">
            <p className="font-serif text-2xl font-medium text-brand-cream">{t(`outputs.${index}.title`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-cream/65">{t(`outputs.${index}.body`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
