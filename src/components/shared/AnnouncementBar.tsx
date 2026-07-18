'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

export function AnnouncementBar() {
  const t = useTranslations('announcement');
  const ui = useTranslations('ui');
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      setDismissed(sessionStorage.getItem('announcement-dismissed') === 'true');
    });

    // Hide on scroll
    function handleScroll() {
      setHidden(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem('announcement-dismissed', 'true');
  }

  return (
    <div
      className={`sticky top-0 z-50 bg-brand-serene-coral text-brand-charcoal text-center text-xs sm:text-sm py-2 px-4 transform-gpu transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-1 pr-12 sm:flex-row sm:gap-3 relative">
        <span className="font-medium leading-tight">
          {t('text')}
        </span>
        <Link
          href="/website-audits"
          className="inline-flex min-h-10 items-center border-b border-transparent font-semibold leading-tight no-underline transition duration-150 ease-in-out hover:border-b-2 hover:border-brand-serene-coral hover:text-brand-charcoal whitespace-nowrap"
        >
          {t('cta')}
        </Link>
        <button
          onClick={handleDismiss}
          className="absolute right-0 inline-flex size-10 items-center justify-center text-brand-charcoal transition-colors duration-150 ease-out hover:text-brand-charcoal"
          aria-label={ui('dismissAnnouncement')}
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
