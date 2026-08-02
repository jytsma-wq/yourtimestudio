'use client';

import { useTranslations } from 'next-intl';
import { Check, X, Minus } from 'lucide-react';

interface ComparisonTableProps {
  locale: string;
}

const featureKeys = [
  'pages', 'service_menu', 'local_seo', 'multilingual', 'booking_integration',
  'doctor_profiles', 'structured_data', 'review_system', 'consultation_form',
  'promo_pages', 'performance_optimization', 'gbp_support', 'analytics',
  'priority_support', 'custom_integrations'
];

const planFeatures: Record<string, Record<string, 'yes' | 'no' | 'partial'>> = {
  beauty: {
    pages: 'yes', service_menu: 'yes', local_seo: 'yes', multilingual: 'partial',
    booking_integration: 'yes', doctor_profiles: 'no', structured_data: 'partial',
    review_system: 'no', consultation_form: 'no', promo_pages: 'no',
    performance_optimization: 'yes', gbp_support: 'yes', analytics: 'partial',
    priority_support: 'no', custom_integrations: 'no'
  },
  medical: {
    pages: 'yes', service_menu: 'no', local_seo: 'yes', multilingual: 'yes',
    booking_integration: 'yes', doctor_profiles: 'yes', structured_data: 'yes',
    review_system: 'yes', consultation_form: 'yes', promo_pages: 'no',
    performance_optimization: 'yes', gbp_support: 'yes', analytics: 'yes',
    priority_support: 'partial', custom_integrations: 'partial'
  },
  hospitality: {
    pages: 'yes', service_menu: 'no', local_seo: 'yes', multilingual: 'yes',
    booking_integration: 'yes', doctor_profiles: 'no', structured_data: 'yes',
    review_system: 'yes', consultation_form: 'no', promo_pages: 'yes',
    performance_optimization: 'yes', gbp_support: 'yes', analytics: 'yes',
    priority_support: 'yes', custom_integrations: 'yes'
  }
};

const featureValueLabels: Record<
  string,
  Record<'yes' | 'no' | 'partial', string>
> = {
  en: { yes: 'Included', no: 'Not included', partial: 'Partially included' },
  ka: { yes: 'შედის', no: 'არ შედის', partial: 'ნაწილობრივ შედის' },
  ru: { yes: 'Включено', no: 'Не включено', partial: 'Частично включено' },
  tr: { yes: 'Dahil', no: 'Dahil değil', partial: 'Kısmen dahil' },
};

export function ComparisonTable({ locale }: ComparisonTableProps) {
  const t = useTranslations('pricing');
  const valueLabels = featureValueLabels[locale.split('-')[0]] ?? featureValueLabels.en;

  function FeatureIcon({ value }: { value: 'yes' | 'no' | 'partial' }) {
    const icon = value === 'yes'
      ? <Check aria-hidden="true" className="size-4 text-brand-sage-green-darken" />
      : value === 'no'
        ? <X aria-hidden="true" className="size-4 text-muted-foreground" />
        : <Minus aria-hidden="true" className="size-4 text-brand-serene-coral-darken" />;

    return (
      <span className="inline-flex items-center justify-center">
        {icon}
        <span className="sr-only">{valueLabels[value]}</span>
      </span>
    );
  }

  return (
    <div className="mt-16">
      <h3 id="pricing-comparison-heading" className="text-2xl font-semibold text-left mb-8">
        {t('comparison_heading')}
      </h3>
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-[44rem] border-collapse"
          aria-labelledby="pricing-comparison-heading"
        >
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="text-left py-3 px-4 text-sm font-medium text-muted-foreground sticky left-0 bg-card will-change-transform z-10">
                {t('feature_label')}
              </th>
              {['beauty', 'medical', 'hospitality'].map(key => (
                <th key={key} scope="col" className="text-center py-3 px-4 text-sm font-semibold">
                  <span aria-hidden="true" className={`inline-block size-2 mr-2 ${
                    key === 'beauty' ? 'bg-brand-serene-coral' : key === 'medical' ? 'bg-brand-sage-green-darken' : 'bg-brand-sage-green-darken'
                  }`} />
                  {t(`${key}.name`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map(key => (
              <tr key={key} className="border-b border-border/50 hover:bg-brand-gray-100/50 transition-colors">
                <th scope="row" className="py-3 px-4 text-left text-sm font-normal text-foreground sticky left-0 bg-card will-change-transform z-10">
                  {t(`comparison.${key}`)}
                </th>
                {['beauty', 'medical', 'hospitality'].map(plan => (
                  <td key={plan} className="text-center py-3 px-4">
                    <FeatureIcon value={planFeatures[plan][key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
