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
        className="hidden md:flex size-12 items-center justify-center rounded-full bg-card text-foreground shadow-lg ring-1 ring-border transition-all duration-300 hover:scale-110 hover:text-teal hover:shadow-xl active:scale-95"
        aria-label={ui('sendEmail')}
      >
        <Mail className="size-5" />
      </a>

      {hasPhone && (
        <a
          href={`tel:${siteConfig.contact.whatsapp.replace(/\s/g, '')}`}
          className="hidden size-12 items-center justify-center rounded-full bg-navy text-background shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 md:flex"
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
        className="relative flex size-14 items-center justify-center rounded-full bg-teal text-background shadow-xl ring-1 ring-border transition-all duration-300 hover:scale-110 hover:bg-teal/90 hover:shadow-2xl active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-teal opacity-25 motion-safe:animate-ping" />
        <MessageCircle className="relative z-10 size-6" />
      </a>
    </div>
  );
}
