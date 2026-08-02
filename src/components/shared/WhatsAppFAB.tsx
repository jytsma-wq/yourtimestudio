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
    <div className="fixed bottom-8 right-8 z-50 hidden flex-col gap-3 min-[1536px]:flex">
      <a
        href={`mailto:${siteConfig.contact.email}`}
        className="hidden size-12 items-center justify-center rounded-md bg-card text-foreground ring-1 ring-border transition-colors duration-150 ease-out hover:text-navy min-[1536px]:flex"
        aria-label={ui('sendEmail')}
      >
        <Mail className="size-5" />
      </a>

      {hasPhone && (
        <a
          href={`tel:${siteConfig.contact.whatsapp.replace(/\s/g, '')}`}
          className="hidden size-12 items-center justify-center rounded-md bg-navy text-background transition-colors duration-150 ease-out hover:bg-foreground min-[1536px]:flex"
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
        className="relative flex size-14 items-center justify-center rounded-md bg-accent text-accent-foreground ring-1 ring-border transition-colors duration-150 ease-out hover:bg-brand-serene-coral/90"
      >
        <MessageCircle className="relative z-10 size-6" />
      </a>
    </div>
  );
}
