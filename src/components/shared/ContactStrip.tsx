'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function ContactStrip() {
  const ui = useTranslations('ui');
  const [visible, setVisible] = useState(false);
  const whatsappHref = siteConfig.contact.whatsappHref;

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
      <div className="flex flex-col items-center gap-3 rounded-l-md border border-r-0 border-hairline bg-surface px-2 py-3 text-ink">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-sea-bright transition duration-150 ease-out hover:bg-surface-elevated hover:text-oxide"
            aria-label={ui('contactViaWhatsApp')}
          >
            <MessageCircle className="size-4" />
          </a>
        )}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-muted transition duration-150 ease-out hover:bg-surface-elevated hover:text-sea-bright"
          aria-label={ui('sendEmail')}
        >
          <Mail className="size-4" />
        </a>
        <span className="mt-1 rotate-180 text-xs font-medium uppercase tracking-widest text-muted [writing-mode:vertical-lr]">
          {ui('contact')}
        </span>
      </div>
    </div>
  );
}
