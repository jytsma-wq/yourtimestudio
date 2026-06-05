'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

export function WhatsAppFAB() {
  const ui = useTranslations('ui');
  const whatsappHref = siteConfig.contact.whatsappHref;
  const hasPhone = Boolean(siteConfig.contact.whatsapp);

  if (!whatsappHref) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:bottom-8 md:right-8">
      <a
        href={`mailto:${siteConfig.contact.email}`}
        className="hidden size-12 items-center justify-center rounded-md border border-hairline bg-surface text-ink transition duration-150 ease-out hover:border-sea/40 hover:bg-surface-elevated hover:text-sea-bright md:flex"
        aria-label={ui('sendEmail')}
      >
        <Mail className="size-5" />
      </a>

      {hasPhone && (
        <a
          href={`tel:${siteConfig.contact.whatsapp.replace(/\s/g, '')}`}
          className="hidden size-12 items-center justify-center rounded-md bg-sea text-white transition duration-150 ease-out hover:bg-sea-bright md:flex"
          aria-label={ui('call')}
        >
          <Phone className="size-5" />
        </a>
      )}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui('chatOnWhatsApp')}
        onClick={() => trackEvent('WhatsApp Clicked', { location: 'floating_action_button' })}
        className="flex size-14 items-center justify-center rounded-md bg-oxide text-white transition duration-150 ease-out hover:bg-oxide-hover"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
