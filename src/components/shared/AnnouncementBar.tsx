'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const t = useTranslations('announcement');
  const ui = useTranslations('ui');
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('announcement-dismissed') === 'true';
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide on scroll
    function handleScroll() {
      setHidden(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed) return null;

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
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-1 pr-8 sm:flex-row sm:gap-3 relative">
        <span className="font-medium leading-tight">
          {t('text')}
        </span>
        <a
          href="/website-audits"
          className="border-b border-transparent font-semibold no-underline transition duration-150 ease-in-out hover:border-b-2 hover:border-brand-serene-coral hover:text-brand-charcoal whitespace-nowrap leading-tight"
        >
          {t('cta')}
        </a>
        <button
          onClick={handleDismiss}
          className="absolute right-0 text-brand-charcoal hover:text-brand-charcoal transition duration-150 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.99] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          aria-label={ui('dismissAnnouncement')}
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
