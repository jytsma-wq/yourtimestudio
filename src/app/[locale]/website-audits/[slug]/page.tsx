import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import auditData from '@/content/audits/batumi-hotel-website-audit.json';

function getScoreColor(score: number): string {
  if (score >= 70) return 'text-navy';
  if (score >= 50) return 'text-teal';
  return 'text-destructive';
}

function getScoreBg(score: number): string {
  if (score >= 70) return 'bg-navy/10';
  if (score >= 50) return 'bg-teal/10';
  return 'bg-destructive/10';
}

function getScoreBarColor(score: number): string {
  if (score >= 70) return 'bg-navy';
  if (score >= 50) return 'bg-teal';
  return 'bg-destructive';
}

const categoryLabels: Record<string, string> = {
  brand: 'Brand Clarity',
  speed: 'Performance & Speed',
  seo: 'Local SEO',
  content: 'Content Structure',
  accessibility: 'Accessibility',
  conversion: 'Conversion UX',
};

const categoryKeys = ['brand', 'speed', 'seo', 'content', 'accessibility', 'conversion'] as const;

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('auditPage');
  const tNav = await getTranslations('nav');

  // For now, only the demo audit exists
  if (slug !== 'batumi-hotel-website-audit') {
    return (
      <Section>
        <p>Audit not found.</p>
      </Section>
    );
  }

  const audit = auditData;
  const sectorTagColor =
    audit.sector === 'hospitality'
      ? 'bg-navy/10 text-navy'
      : audit.sector === 'medical'
        ? 'bg-stone/10 text-stone'
        : 'bg-rose/10 text-rose';

  return (
    <>
      {/* Breadcrumbs */}
      <Section>
        <Breadcrumbs
          items={[
            { label: tNav('audits'), href: '/website-audits' },
            { label: audit.title },
          ]}
        />

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={`${sectorTagColor} border-0 font-semibold text-xs uppercase tracking-wide`}>
              {audit.sector.charAt(0).toUpperCase() + audit.sector.slice(1)}
            </Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Calendar className="size-3.5" />
              {new Date(audit.date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
            {audit.title}
          </h1>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
              {audit.overallScore}
            </span>
            <span className="text-muted-foreground text-xl">{t('detail.score_out_of')}</span>
          </div>
        </div>
      </Section>

      {/* Executive Summary */}
      <Section variant="subtle">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          {t('detail.executive_summary')}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          {audit.executiveSummary}
        </p>
      </Section>

      {/* Scoring Breakdown */}
      <Section>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          {t('detail.scoring')}
        </h2>

        <div className="space-y-5 max-w-3xl">
          {categoryKeys.map((key) => {
            const score = audit.scores[key];
            return (
              <div key={key} className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-lg ${getScoreBg(score)} flex items-center justify-center shrink-0`}>
                  <span className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medium text-sm">{categoryLabels[key]}</span>
                    <span className="text-muted-foreground text-sm">{score}/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreBarColor(score)} transition-all`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Detailed Findings */}
      <Section variant="subtle">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
          {t('detail.findings')}
        </h2>

        <div className="space-y-6 max-w-3xl">
          {audit.findings.map((finding, index) => {
            const catKey = finding.category;
            const tagColor =
              catKey === 'speed'
                ? 'bg-teal/10 text-teal'
                : catKey === 'seo'
                  ? 'bg-navy/10 text-navy'
                  : catKey === 'conversion'
                    ? 'bg-rose/10 text-rose'
                    : catKey === 'content'
                      ? 'bg-stone/10 text-stone'
                      : catKey === 'accessibility'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-muted text-muted-foreground';

            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${tagColor} border-0 text-xs font-semibold uppercase tracking-wide`}>
                    {categoryLabels[catKey] || catKey}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{finding.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {finding.description}
                </p>
                <div className="bg-surface-subtle rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal mb-1.5">
                    {t('detail.recommended_fix')}
                  </p>
                  <p className="text-sm leading-relaxed">{finding.recommendedFix}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CTA Band */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-primary-foreground">
            {t('detail.cta')}
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-teal hover:bg-teal/90 text-background font-medium text-base px-8 h-12 mt-6"
          >
            <Link href="/website-audits">
              {t('detail.cta')}
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
