'use client';

import { useTranslations } from 'next-intl';
import { Check, X, Minus } from 'lucide-react';

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

export function ComparisonTable() {
  const t = useTranslations('pricing');

  function FeatureIcon({ value }: { value: 'yes' | 'no' | 'partial' }) {
    if (value === 'yes') return <Check className="size-4 text-success" />;
    if (value === 'no') return <X className="size-4 text-oxide" />;
    return <Minus className="size-4 text-sea-bright" />;
  }

  return (
    <div className="mt-16">
      <h3 className="mb-8 text-left text-2xl font-semibold text-ink">
        {t('comparison_heading')}
      </h3>
      <div className="overflow-x-auto rounded-md border border-hairline bg-surface">
        <table className="w-full border-collapse text-ink">
          <thead>
            <tr className="border-b border-hairline">
              <th className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-sm font-medium text-copy-muted will-change-transform">
                {t('feature_label')}
              </th>
              {['beauty', 'medical', 'hospitality'].map(key => (
                <th key={key} className="px-4 py-3 text-center text-sm font-semibold">
                  <span className={`inline-block size-2 mr-2 ${
                    key === 'beauty' ? 'bg-oxide' : key === 'medical' ? 'bg-sea-bright' : 'bg-sea'
                  }`} />
                  {t(`${key}.name`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map(key => (
              <tr key={key} className="border-b border-hairline transition-colors hover:bg-surface-elevated/50">
                <td className="sticky left-0 z-10 bg-surface px-4 py-3 text-sm text-ink will-change-transform">
                  {t(`comparison.${key}`)}
                </td>
                {['beauty', 'medical', 'hospitality'].map(plan => (
                  <td key={plan} className="px-4 py-3 text-center">
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
