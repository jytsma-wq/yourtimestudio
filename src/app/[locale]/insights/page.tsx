import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Building2, Stethoscope, Sparkles, Clock } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import type { Locale } from '@/lib/i18n/config';

const clusterIcons: Record<string, React.ElementType> = {
  hospitality: Building2,
  medical: Stethoscope,
  beauty: Sparkles,
};

const clusterColors: Record<string, string> = {
  hospitality: 'bg-brand-sage-green-darken/10 text-brand-sage-green-darken',
  medical: 'bg-brand-sage-green-darken/10 text-brand-sage-green-darken',
  beauty: 'bg-brand-serene-coral/10 text-brand-serene-coral-darken',
};

const clusterDotColors: Record<string, string> = {
  hospitality: 'bg-brand-sage-green-darken',
  medical: 'bg-brand-sage-green-darken',
  beauty: 'bg-brand-serene-coral-darken',
};

const clusterKeys = ['hospitality', 'medical', 'beauty'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insightsPage' });

  return generatePageMetadata({
    title: t('heading'),
    description: t('subtitle'),
    path: '/insights',
    locale: locale as Locale,
  });
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('insightsPage');
  const tNav = await getTranslations('nav');

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: tNav('insights'), href: '/insights' },
          ]}
        />

        <div className="max-w-3xl mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="space-y-16">
          {clusterKeys.map((clusterKey) => {
            const Icon = clusterIcons[clusterKey];
            const colorClass = clusterColors[clusterKey];
            const dotClass = clusterDotColors[clusterKey];
            const label = t(`clusters.${clusterKey}.label`);

            const posts = [0, 1].map((i) => ({
              title: t(`clusters.${clusterKey}.posts.${i}.title`),
              description: t(`clusters.${clusterKey}.posts.${i}.description`),
            }));

            return (
              <div key={clusterKey}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className={`w-2 h-2 rounded-full ${dotClass}`} />
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {label}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {posts.map((post) => (
                    <div
                      key={post.title}
                      className="flex h-full flex-col gap-3 rounded-md border border-border bg-card p-6 shadow-none"
                    >
                      <Badge className={`${colorClass} border-0 text-xs font-semibold uppercase tracking-wide w-fit`}>
                        {label}
                      </Badge>
                      <h3 className="font-semibold text-base">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium pt-2">
                        <Clock className="size-3.5" />
                        {t('comingSoon')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
