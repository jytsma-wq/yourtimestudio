import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { type Locale } from '@/lib/i18n/config';
import { pricingPackages } from '@/lib/pricing-config';

interface PricingCardsProps {
  locale: Locale;
}

export async function PricingCards({ locale }: PricingCardsProps) {
  const t = await getTranslations('pricing');
  const tPricing = t;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pricingPackages.map((pkg) => (
        <div
          key={pkg.key}
          className={`${
            pkg.prominent ? 'pt-4 -mt-4 md:mb-4' : ''
          }`}
        >
          {pkg.prominent && (
            <div className="relative z-10 flex justify-center -mb-3">
              <span className="bg-stone text-background text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="size-3" />
                {tPricing('most_popular')}
              </span>
            </div>
          )}
          <div
            className={`bg-card border border-border rounded-xl border-t-2 ${pkg.accentClass} transition-shadow duration-300 hover:shadow-md ${
              pkg.prominent ? 'md:shadow-lg ring-1 ring-border' : ''
            }`}
          >
          <div className="p-6">
            {/* Package name */}
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${pkg.dotClass}`} />
              <h3 className="text-lg font-semibold">{t(`${pkg.key}.name`)}</h3>
            </div>

            {/* Best for */}
            <p className="text-muted-foreground text-sm mb-5">
              {t('best_for_label')}: {t(`${pkg.key}.best_fit`)}
            </p>

            {/* Pricing */}
            <div className="mb-5">
              <p className="text-2xl font-semibold text-foreground">{t(`${pkg.key}.setup`)}</p>
              <p className="text-sm text-muted-foreground">{t('setup_label')}</p>
              <p className="text-lg font-medium text-foreground mt-2">{t(`${pkg.key}.monthly`)}</p>
              <p className="text-sm text-muted-foreground">{t('monthly_label')}</p>
            </div>

            {/* Includes */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">{t('includes_label')}</h4>
              <ul className="space-y-2">
                {Array.from({ length: pkg.itemCount }, (_, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className={`size-4 mt-0.5 shrink-0 ${pkg.iconText}`} />
                    <span>{t(`${pkg.key}.includes.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best upsells */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-2">{t('best_upsells_label')}</h4>
              <ul className={`rounded-lg ${pkg.bgAccent} p-3 space-y-2`}>
                {Array.from({ length: pkg.upsellCount }, (_, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Star className={`size-3.5 mt-0.5 shrink-0 ${pkg.iconText}`} />
                    <span className="text-muted-foreground">{t(`${pkg.key}.best_upsells.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Button
              asChild
              variant={pkg.prominent ? 'default' : 'outline'}
              className={`w-full ${
                pkg.prominent
                  ? 'bg-teal hover:bg-teal/90 text-background'
                  : ''
              }`}
            >
              <Link href="/contact">
                {t('cta')}
              </Link>
            </Button>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
