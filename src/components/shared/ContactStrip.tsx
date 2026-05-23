'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function ContactStrip() {
  const ui = useTranslations('ui');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const contactHref = locale === 'en' ? '/contact' : `/${locale}/contact`;
  const hasWhatsAppLink = Boolean(siteConfig.contact.whatsappHref);
  const whatsappHref = siteConfig.contact.whatsappHref || contactHref;

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Show after scrolling past hero (~100vh), hide near footer
      setVisible(scrollY > window.innerHeight * 0.8 && scrollY < docHeight - 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    queueMicrotask(handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-20 lg:hidden transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-card border border-border border-r-0 rounded-l-lg shadow-premium-lg py-3 px-2 flex flex-col items-center gap-3">
        <a
          href={whatsappHref}
          target={hasWhatsAppLink ? '_blank' : undefined}
          rel={hasWhatsAppLink ? 'noopener noreferrer' : undefined}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-teal transition-colors hover:text-teal/80"
          aria-label={ui('contactViaWhatsApp')}
        >
          <MessageCircle className="size-4" />
        </a>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-teal transition-colors"
          aria-label={ui('sendEmail')}
        >
          <Mail className="size-4" />
        </a>
        <span className="[writing-mode:vertical-lr] text-xs font-medium text-muted-foreground tracking-widest uppercase rotate-180 mt-1">
          {ui('contact')}
        </span>
      </div>
    </div>
  );
}
