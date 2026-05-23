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
  { key: 'brand', icon: Eye, score: '01' },
  { key: 'speed', icon: Gauge, score: '02' },
  { key: 'seo', icon: MapPin, score: '03' },
  { key: 'content', icon: LayoutGrid, score: '04' },
  { key: 'accessibility', icon: Accessibility, score: '05' },
  { key: 'conversion', icon: MousePointerClick, score: '06' },
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
        <div className="lg:sticky lg:top-28 dot-grid-bg">
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
            className="mt-8 h-12 rounded-none bg-foreground px-6 text-background hover:bg-foreground/88"
          >
            <Link href="/website-audits">
              {t('cta')}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="border border-border bg-card bg-paper-texture shadow-md transition duration-150 ease-out hover:translate-y-[-4px] hover:shadow-xl">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border p-5 md:p-6">
            <div>
              <p className="editorial-kicker text-brand-serene-coral-darken">{t('panel_kicker')}</p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">{t('scorecard_title')}</h3>
            </div>
            <p className="text-right font-sans text-3xl font-semibold text-muted-foreground">/100</p>
          </div>

          <div className="divide-y divide-border">
            {auditCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.key} className="grid gap-4 p-5 md:grid-cols-[80px_1fr] md:p-6">
                  <div className="flex items-center gap-3 md:block">
                    <p className="font-sans text-sm font-semibold text-muted-foreground">{cat.score}</p>
                    <div className="mt-0 flex size-10 items-center justify-center border border-border bg-background md:mt-4">
                      <Icon className="size-5 text-brand-sage-green-darken" />
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
