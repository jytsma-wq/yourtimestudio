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
} from 'lucide-react';
import { Section } from '@/components/shared/Section';
import { type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';

const auditCategories = [
  { key: 'brand', icon: Eye },
  { key: 'speed', icon: Gauge },
  { key: 'seo', icon: MapPin },
  { key: 'content', icon: LayoutGrid },
  { key: 'accessibility', icon: Accessibility },
  { key: 'conversion', icon: MousePointerClick },
];

interface AuditSectionProps {
  locale: Locale;
  /** Large faint section number for background decoration */
  number?: string;
}

export function AuditSection({ locale, number }: AuditSectionProps) {
  const t = useTranslations('audit');
  const tDesc = useTranslations('auditDescriptions');

  return (
    <Section variant="subtle" number={number}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="section-label">{t('sectionLabel')}</p>
          <h2 className="editorial-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('heading')}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t('subtitle')}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-md px-6"
          >
            <Link href="/website-audits">
              {t('cta')}
              <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="border border-border bg-card shadow-none">
          <div className="border-b border-border p-5 md:p-6">
            <div>
              <p className="editorial-kicker text-navy">{t('panel_kicker')}</p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">{t('scorecard_title')}</h3>
            </div>
          </div>

          <div className="divide-y divide-border">
            {auditCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.key} className="grid gap-4 p-5 md:grid-cols-[64px_1fr] md:p-6">
                  <div className="flex items-center gap-3 md:block">
                    <div className="flex size-10 items-center justify-center border border-border bg-background">
                      <Icon className="size-5 text-navy" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-lg font-semibold text-foreground">{t(`categories.${cat.key}`)}</h4>
                      <span className="editorial-kicker text-muted-foreground">{t('manual_review')}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tDesc(cat.key)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border bg-background p-5 text-sm leading-relaxed text-muted-foreground md:p-6">
            {t('note')}
          </div>
        </div>
      </div>
    </Section>
  );
}
