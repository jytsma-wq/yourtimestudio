import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return generatePageMetadata({
    title: t('heading'),
    description: t('story_body_1'),
    path: '/about',
    locale: locale as Locale,
    ogImage: siteConfig.assets.ogDefault,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('aboutPage');
  const tNav = await getTranslations('nav');

  const breadcrumbItems = [
    { label: tNav('about'), href: '/about' },
  ];

  const processSteps = [
    { title: t('process_steps.0.title'), description: t('process_steps.0.description') },
    { title: t('process_steps.1.title'), description: t('process_steps.1.description') },
    { title: t('process_steps.2.title'), description: t('process_steps.2.description') },
    { title: t('process_steps.3.title'), description: t('process_steps.3.description') },
    { title: t('process_steps.4.title'), description: t('process_steps.4.description') },
  ];

  const tools = [
    t('tools.0.name'),
    t('tools.1.name'),
    t('tools.2.name'),
    t('tools.3.name'),
    t('tools.4.name'),
    t('tools.5.name'),
    t('tools.6.name'),
    t('tools.7.name'),
    t('tools.8.name'),
    t('tools.9.name'),
  ];

  return (
    <>
      <Section className="pb-16 pt-6 md:pb-24 md:pt-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <div>
            <p className="editorial-kicker text-navy">{t('image_caption')}</p>
            <h1 className="editorial-display mt-4 max-w-[10ch] text-5xl font-medium md:text-6xl lg:text-7xl">
              {t('heading')}
            </h1>

            <div className="mt-8 flex items-center gap-4 border-t border-border pt-5">
              <Image
                src={siteConfig.assets.mark}
                alt=""
                width={48}
                height={48}
                className="size-12 shrink-0 object-cover"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-foreground">{siteConfig.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">Batumi, Adjara, Georgia</p>
              </div>
            </div>
          </div>

          <div className="border-l border-brand-serene-coral pl-6 md:pl-8">
            <p className="font-serif text-2xl leading-[1.35] text-foreground md:text-3xl">
              {t('story_body_1')}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              {t('story_body_2')}
            </p>
            <Button asChild className="mt-8 rounded-none bg-foreground text-background hover:bg-navy">
              <Link href="/website-audits">{t('cta_button')}</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section variant="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <article className="border-t border-background/24 pt-7">
            <p className="editorial-kicker text-brand-serene-coral">{t('approach_heading')}</p>
            <h2 className="editorial-display mt-5 max-w-[14ch] text-3xl font-medium text-brand-cream md:text-4xl">
              {t('approach_heading')}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.75] text-brand-cream/72">
              {t('approach_body')}
            </p>
          </article>

          <article className="border-t border-background/24 pt-7">
            <p className="editorial-kicker text-brand-serene-coral">{t('why_batumi_heading')}</p>
            <h2 className="editorial-display mt-5 max-w-[14ch] text-3xl font-medium text-brand-cream md:text-4xl">
              {t('why_batumi_heading')}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-[1.75] text-brand-cream/72">
              <p>{t('why_batumi_body_1')}</p>
              <p>{t('why_batumi_body_2')}</p>
            </div>
          </article>
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-16">
          <div>
            <p className="editorial-kicker text-navy">{t('story_heading')}</p>
            <h2 className="editorial-display mt-3 text-3xl font-medium md:text-4xl">
              {t('process_heading')}
            </h2>
          </div>

          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.title} className="border-t border-border pt-5">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section variant="subtle">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="editorial-display text-3xl font-medium md:text-4xl">
              {t('tools_heading')}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.75] text-muted-foreground">
              {t('tools_subtitle')}
            </p>
          </div>

          <ul className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-5">
            {tools.map((tool) => (
              <li key={tool} className="flex min-h-20 items-center border-b border-r border-border px-4 py-5 text-sm font-semibold text-foreground">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section variant="accent">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <p className="editorial-display max-w-3xl text-3xl font-medium text-brand-cream md:text-4xl">
            {t('cta_text')}
          </p>
          <Button
            asChild
            size="lg"
            className="w-fit rounded-none bg-brand-serene-coral text-brand-charcoal hover:bg-brand-cream"
          >
            <Link href="/website-audits">
              {t('cta_button')}
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
