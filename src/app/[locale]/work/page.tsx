import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Building2, Stethoscope, Sparkles, Clock } from 'lucide-react';

const sectorIcons: Record<string, React.ElementType> = {
  Hospitality: Building2,
  Medical: Stethoscope,
  Beauty: Sparkles,
};

const sectorColors: Record<string, string> = {
  Hospitality: 'bg-brand-sage-green-darken/10 text-brand-sage-green-darken',
  Medical: 'bg-brand-sage-green-darken/10 text-brand-sage-green-darken',
  Beauty: 'bg-brand-serene-coral/10 text-brand-serene-coral-darken',
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('workPage');
  const tNav = await getTranslations('nav');

  const items = [0, 1, 2].map((i) => ({
    sector: t(`items.${i}.sector`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <>
      <Section>
        <Breadcrumbs
          items={[
            { label: tNav('work'), href: '/work' },
          ]}
        />

        <div className="max-w-3xl mb-16 md:mb-20">
          <h1 className="editorial-display text-4xl md:text-5xl mb-4">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-[1.75]">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-px border border-border bg-border">
          {items.map((item, index) => {
            const Icon = sectorIcons[item.sector] || Building2;
            const colorClass = sectorColors[item.sector] || 'bg-muted text-muted-foreground';

            return (
              <div
                key={index}
                className="bg-card bg-paper-texture border border-border rounded-none p-6 flex flex-col gap-4 relative shadow-md transition duration-150 ease-out hover:translate-y-[-4px] hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`size-10 flex items-center justify-center border border-border ${colorClass}`}>
                    <Icon className="size-4.5" />
                  </div>
                  <Badge className={`${colorClass} rounded-none border-0 text-xs font-semibold uppercase tracking-wide`}>
                    {item.sector}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.75] flex-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium pt-2">
                  <Clock className="size-3.5" />
                  {t('comingSoon')}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
