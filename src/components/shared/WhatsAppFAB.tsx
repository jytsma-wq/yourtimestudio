'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function WhatsAppFAB() {
  const ui = useTranslations('ui');
  const locale = useLocale();
  const contactHref = locale === 'en' ? '/contact' : `/${locale}/contact`;
  const hasWhatsAppLink = Boolean(siteConfig.contact.whatsappHref);
  const hasPhone = Boolean(siteConfig.contact.whatsapp);
  const whatsappHref = siteConfig.contact.whatsappHref || contactHref;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:bottom-8 md:right-8">
      <a
        href={`mailto:${siteConfig.contact.email}`}
        className="hidden md:flex size-12 items-center justify-center rounded-full bg-card text-foreground shadow-lg ring-1 ring-border transition duration-150 ease-out hover:scale-[1.02] hover:text-brand-serene-coral-darken hover:shadow-md active:scale-[0.99] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
        aria-label={ui('sendEmail')}
      >
        <Mail className="size-5" />
      </a>

      {hasPhone && (
        <a
          href={`tel:${siteConfig.contact.whatsapp.replace(/\s/g, '')}`}
          className="hidden size-12 items-center justify-center rounded-full bg-brand-sage-green-darken text-background shadow-lg transition duration-150 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.99] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 md:flex"
          aria-label={ui('call')}
        >
          <Phone className="size-5" />
        </a>
      )}

      <a
        href={whatsappHref}
        target={hasWhatsAppLink ? '_blank' : undefined}
        rel={hasWhatsAppLink ? 'noopener noreferrer' : undefined}
        aria-label={ui('chatOnWhatsApp')}
        className="relative flex size-14 items-center justify-center rounded-full bg-brand-serene-coral text-brand-charcoal shadow-xl ring-1 ring-border transition duration-150 ease-out hover:scale-[1.02] hover:bg-brand-serene-coral/90 hover:shadow-md active:scale-[0.99] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
      >
        <span className="absolute inset-0 rounded-full bg-brand-serene-coral opacity-25 motion-safe:animate-ping" />
        <MessageCircle className="relative z-10 size-6" />
      </a>
    </div>
  );
}
