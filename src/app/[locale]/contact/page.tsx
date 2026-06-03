import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { Section } from '@/components/shared/Section';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/shared/ContactForm';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: `Contact — ${siteConfig.name}`,
    description:
      `Get in touch with ${siteConfig.name} for practical web design, local SEO, and booking-focused websites in Batumi, Georgia. Response within one business day.`,
    path: '/contact',
    locale: locale as Locale,
    ogImage: siteConfig.assets.ogDefault,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contactPage');
  const tNav = await getTranslations('nav');
  const hasWhatsApp = Boolean(siteConfig.contact.whatsapp && siteConfig.contact.whatsappHref);
  const whatsappHref = hasWhatsApp ? siteConfig.contact.whatsappHref : '#contact-form';
  const whatsappLabel = hasWhatsApp ? siteConfig.contact.whatsapp : t('info_whatsapp_fallback');

  const breadcrumbItems = [
    { label: tNav('contact'), href: '/contact' },
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero */}
      <Section>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="editorial-display text-4xl md:text-5xl mb-4">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-lg leading-[1.75]">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-12">
          {/* Contact Form - takes 2 columns */}
          <div id="contact-form" className="scroll-mt-24 lg:col-span-1">
            <div className="bg-card border border-border rounded-none p-6 md:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="editorial-display text-xl font-semibold mb-4">{t('info_heading')}</h2>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="size-10 flex items-center justify-center border border-border bg-brand-serene-coral/10 shrink-0">
                <Mail className="size-5 text-brand-serene-coral-darken" />
              </div>
              <div>
                <p className="text-sm font-medium">{t('info_email_label')}</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-muted-foreground text-sm hover:text-brand-serene-coral-darken transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="size-10 flex items-center justify-center border border-border bg-brand-serene-coral/10 shrink-0">
                <MessageCircle className="size-5 text-brand-serene-coral-darken" />
              </div>
              <div>
                <p className="text-sm font-medium">{t('info_whatsapp_label')}</p>
                <a
                  href={whatsappHref}
                  target={hasWhatsApp ? '_blank' : undefined}
                  rel={hasWhatsApp ? 'noopener noreferrer' : undefined}
                  className="text-muted-foreground text-sm hover:text-brand-serene-coral-darken transition-colors"
                >
                  {whatsappLabel}
                </a>
              </div>
            </div>

            {/* Service Area */}
            <div className="flex items-start gap-3">
              <div className="size-10 flex items-center justify-center border border-border bg-brand-sage-green-darken/10 shrink-0">
                <MapPin className="size-5 text-brand-sage-green-darken" />
              </div>
              <div>
                <p className="text-sm font-medium">{t('info_area_label')}</p>
                <p className="text-muted-foreground text-sm leading-[1.75]">
                  {t('info_area')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
