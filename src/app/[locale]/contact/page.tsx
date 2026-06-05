import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  ClipboardCheck,
  Code2,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/shared/ContactForm';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Contact - Yourtimestudio',
    description:
      'Start with a website audit, scoped project, or focused improvement request for hotels, clinics, and studios in Batumi.',
    path: '/contact',
    locale: locale as Locale,
    ogImage: '/og-default.png',
  });
}

const optionIcons: LucideIcon[] = [
  Search,
  Code2,
  Wrench,
];

const trustIcons: LucideIcon[] = [
  MapPin,
  ShieldCheck,
  ClipboardCheck,
  MessageCircle,
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contactPage');
  const tNav = await getTranslations('nav');
  const hasWhatsApp = Boolean(siteConfig.contact.whatsappHref);
  const whatsappLabel = siteConfig.contact.whatsapp || t('info_whatsapp_label');

  const breadcrumbItems = [
    { label: tNav('contact'), href: '/contact' },
  ];

  const contactOptions = optionIcons.map((Icon, index) => ({
    Icon,
    title: t(`options.${index}.title`),
    description: t(`options.${index}.description`),
  }));

  const trustItems = trustIcons.map((Icon, index) => ({
    Icon,
    title: t(`trust.items.${index}.title`),
    description: t(`trust.items.${index}.description`),
  }));

  return (
    <div data-locale={locale} className="bg-canvas text-ink">
      <section className="px-[var(--container-padding)] py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[var(--hero-max-width)]">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)] lg:items-end lg:gap-16">
            <div>
              <p className="mono-label mb-4 text-sea-bright">{t('eyebrow')}</p>
              <h1 className="max-w-4xl text-display-lg text-ink">{t('heading')}</h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-[1.75] text-muted">
                {t('subtitle')}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 rounded-md bg-oxide px-6 text-base font-semibold text-white hover:bg-oxide-hover hover:text-white"
              >
                <a href="#contact-form">
                  {t('form.submit')}
                  <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <aside className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label text-muted">{t('hero_panel.label')}</p>
              <p className="mt-3 text-body-sm leading-[1.75] text-muted">
                {t('hero_panel.body')}
              </p>
              <div className="mt-5 grid gap-2">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="rounded border border-hairline bg-canvas px-3 py-2 text-sm text-ink">
                    {t(`hero_panel.points.${index}`)}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas-soft px-[var(--container-padding)] py-12 md:py-16">
        <div className="mx-auto max-w-[var(--container-max-width)]">
          <div className="mb-8 max-w-2xl">
            <p className="mono-label mb-4 text-sea-bright">{t('options_eyebrow')}</p>
            <h2 className="text-heading-md text-ink">{t('options_heading')}</h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
            {contactOptions.map((option, index) => (
              <article key={option.title} className="bg-surface p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md border border-hairline bg-canvas">
                    <option.Icon className="size-4.5 text-sea-bright" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{option.title}</h3>
                <p className="mt-3 text-body-sm leading-[1.7] text-muted">{option.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[var(--container-padding)] py-16 md:py-24">
        <div className="mx-auto grid max-w-[var(--container-max-width)] gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
          <div id="contact-form" className="scroll-mt-24 rounded-md border border-hairline bg-surface p-4 md:p-6">
            <div className="mb-6 border-b border-hairline pb-5">
              <p className="mono-label mb-3 text-sea-bright">{t('form.eyebrow')}</p>
              <h2 className="text-heading-md text-ink">{t('form.heading')}</h2>
              <p className="mt-3 max-w-2xl text-body-sm leading-[1.7] text-muted">{t('form.subtitle')}</p>
            </div>
            <ContactForm />
          </div>

          <aside className="grid gap-4">
            <div className="rounded-md border border-hairline bg-surface p-5">
              <p className="mono-label mb-4 text-sea-bright">{t('trust.eyebrow')}</p>
              <h2 className="text-heading-md text-ink">{t('trust.heading')}</h2>
              <div className="mt-6 grid gap-3">
                {trustItems.map((item) => (
                  <div key={item.title} className="grid grid-cols-[auto_1fr] gap-3 rounded-md border border-hairline bg-canvas p-3">
                    <div className="flex size-9 items-center justify-center rounded bg-sea/20">
                      <item.Icon className="size-4 text-sea-bright" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-[1.6] text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-hairline bg-canvas-soft p-5">
              <p className="mono-label mb-4 text-muted">{t('info_heading')}</p>
              <div className="space-y-4">
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="flex size-9 items-center justify-center rounded bg-sea/20">
                    <Mail className="size-4 text-sea-bright" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t('info_email_label')}</p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm text-muted transition-colors hover:text-oxide"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {hasWhatsApp && (
                  <div className="grid grid-cols-[auto_1fr] gap-3">
                    <div className="flex size-9 items-center justify-center rounded bg-sea/20">
                      <MessageCircle className="size-4 text-sea-bright" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t('info_whatsapp_label')}</p>
                      <a
                        href={siteConfig.contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-oxide"
                      >
                        {whatsappLabel}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
