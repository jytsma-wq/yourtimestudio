'use client';

import { useTranslations } from 'next-intl';
import {
  Eye,
  Gauge,
  MapPin,
  LayoutGrid,
  Accessibility,
  MousePointerClick,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

const auditCategories = [
  { key: 'brand', icon: Eye, risk: 'high' },
  { key: 'speed', icon: Gauge, risk: 'medium' },
  { key: 'seo', icon: MapPin, risk: 'high' },
  { key: 'content', icon: LayoutGrid, risk: 'medium' },
  { key: 'accessibility', icon: Accessibility, risk: 'low' },
  { key: 'conversion', icon: MousePointerClick, risk: 'high' },
];

const riskConfig = {
  high: { icon: AlertTriangle, color: 'text-oxide', bg: 'bg-oxide/10', label: 'High impact' },
  medium: { icon: Circle, color: 'text-warning', bg: 'bg-warning/10', label: 'Medium impact' },
  low: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Low impact' },
};

interface AuditSectionProps {
  locale: Locale;
  number?: string;
}

export function AuditSection({ locale, number }: AuditSectionProps) {
  const t = useTranslations('audit');
  const tDesc = useTranslations('auditDescriptions');

  return (
    <section className="bg-canvas py-16 md:py-24 px-[var(--container-padding)]">
      <div className="mx-auto max-w-[var(--container-max-width)]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Left: Copy */}
          <div className="lg:sticky lg:top-28">
            <p className="mono-label text-sea-bright mb-4">{t('sectionLabel')}</p>
            <h2 className="text-display-lg text-ink">
              {t('heading')}
            </h2>
            <p className="mt-6 max-w-xl text-body-lg text-muted leading-relaxed">
              {t('subtitle')}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-md bg-oxide px-6 text-white hover:bg-oxide-hover transition-colors"
            >
              <Link href="/website-audits">
                {t('cta')}
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Diagnostic product panel */}
          <div className="bg-surface border border-hairline rounded-md overflow-hidden">
            {/* Panel header */}
            <div className="border-b border-hairline p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mono-label text-sea-bright">{t('panel_kicker')}</p>
                  <h3 className="mt-2 text-heading-md text-ink">{t('scorecard_title')}</h3>
                </div>
                <span className="mono-label text-muted">Manual review</span>
              </div>
            </div>

            {/* Audit checklist rows */}
            <div className="divide-y divide-hairline">
              {auditCategories.map((cat) => {
                const Icon = cat.icon;
                const risk = riskConfig[cat.risk as keyof typeof riskConfig];
                return (
                  <div key={cat.key} className="p-5 md:p-6 hover:bg-surface-elevated/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex size-9 items-center justify-center rounded bg-sea/10 shrink-0">
                        <Icon className="size-4 text-sea-bright" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-ink">{t(`categories.${cat.key}`)}</h4>
                          <span className={`mono-label text-[9px] ${risk.color} ${risk.bg} px-1.5 py-0.5 rounded`}>
                            {risk.label}
                          </span>
                        </div>
                        <p className="text-body-sm text-muted leading-relaxed">
                          {tDesc(cat.key)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel footer */}
            <div className="border-t border-hairline bg-surface-elevated p-5 text-body-sm text-muted md:p-6">
              {t('note')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
