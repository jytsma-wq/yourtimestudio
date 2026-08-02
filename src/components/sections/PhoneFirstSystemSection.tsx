import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  MapPin,
  Megaphone,
  MonitorSmartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { Section } from '@/components/shared/Section';

type PhoneFirstSystemSectionProps = {
  number?: string;
};

const systemItems = [
  { key: 'website', icon: MonitorSmartphone },
  { key: 'google', icon: MapPin },
  { key: 'visuals', icon: Camera },
  { key: 'social', icon: Megaphone },
  { key: 'booking', icon: CalendarCheck },
] as const;

export async function PhoneFirstSystemSection({
  number,
}: PhoneFirstSystemSectionProps) {
  const t = await getTranslations('phoneFirst');

  return (
    <div id="phone-first-system" data-section-name={t('navLabel')}>
      <Section variant="subtle" border number={number}>
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div className="max-w-xl">
            <p className="section-label">{t('sectionLabel')}</p>
            <h2 className="editorial-display text-4xl text-foreground md:text-5xl lg:text-6xl">
              {t('heading')}
            </h2>
            <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
              {t('intro')}
            </p>
            <p className="mt-5 border-l border-border pl-4 text-sm leading-relaxed text-foreground">
              {t('support')}
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-md px-6 text-base font-semibold"
              >
                <Link href="/website-audits">
                  {t('primaryCta')}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md border-foreground/25 bg-transparent px-6 text-base text-foreground hover:bg-background"
              >
                <Link href="/work">{t('secondaryCta')}</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {systemItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.key}
                  className={`bg-card p-5 md:p-6 ${
                    item.key === 'booking' ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="mb-5 flex items-center gap-4 border-b border-border pb-4">
                    <span className="flex size-10 items-center justify-center border border-border bg-background text-navy">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`items.${item.key}.label`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${item.key}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
