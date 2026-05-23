import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { Section } from '@/components/shared/Section';
import { MagneticButton } from '@/components/shared/MagneticButton';

interface CTABandSectionProps {
  locale: Locale;
}

export async function CTABandSection({ locale }: CTABandSectionProps) {
  const t = await getTranslations('ctaBand');

  return (
    <Section variant="accent" className="border-t border-brand-sage-green/20 py-16 md:py-20" id="cta">
      <div className="mx-auto max-w-4xl text-left">
        <p className="section-label text-background">{t('sectionLabel')}</p>
        <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl mb-5 text-background">
          {t('heading')}
        </h2>
        <p className="text-background text-lg max-w-xl leading-relaxed mb-10">
          {t('subtitle')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-start">
        <MagneticButton>
          <Button
            asChild
            size="lg"
            className="bg-background text-brand-sage-green-darken font-semibold text-base px-8 h-12 rounded-none hover:bg-background/90"
          >
            <Link href="/website-audits">
              {t('primary')}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </MagneticButton>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="text-base px-8 h-12 rounded-none border-background/35 text-background hover:bg-background/10 hover:text-background"
        >
          <Link href="/contact">
            {t('secondary')}
          </Link>
        </Button>
      </div>
    </Section>
  );
}
