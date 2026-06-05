import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

export async function CTABandSection() {
  const t = await getTranslations('ctaBand');

  return (
    <section className="bg-canvas py-16 md:py-24 px-[var(--container-padding)] border-t border-hairline" id="cta">
      <div className="mx-auto max-w-[var(--container-max-width)]">
        <div className="max-w-2xl">
          <p className="mono-label text-sea-bright mb-4">{t('sectionLabel')}</p>
          <h2 className="text-display-lg text-ink mb-5">
            {t('heading')}
          </h2>
          <p className="text-body-lg text-muted max-w-xl leading-relaxed mb-10">
            {t('subtitle')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="bg-oxide text-white font-semibold text-base px-8 h-12 rounded-md hover:bg-oxide-hover transition-colors"
          >
            <Link href="/website-audits">
              {t('primary')}
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base px-8 h-12 rounded-md border-hairline text-ink hover:bg-surface hover:text-ink transition-colors"
          >
            <Link href="/contact">
              {t('secondary')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
