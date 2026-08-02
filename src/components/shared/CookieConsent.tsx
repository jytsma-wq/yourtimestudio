'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';

const CONSENT_KEY = `${siteConfig.slug}-cookie-consent`;

function loadAnalytics() {
  if (document.getElementById('plausible-script')) return;

  const script = document.createElement('script');
  script.id = 'plausible-script';
  script.defer = true;
  script.dataset.domain = siteConfig.analytics.domain;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentCheck = window.setTimeout(() => {
      try {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
          setVisible(true);
        } else if (consent === 'accepted') {
          loadAnalytics();
        }
      } catch {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(consentCheck);
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // Keep consent session-local when storage is unavailable.
    }
    setVisible(false);
    loadAnalytics();
  }

  function handleDecline() {
    try {
      localStorage.setItem(CONSENT_KEY, 'declined');
    } catch {
      // Hiding the prompt for this page must not depend on storage access.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-3 left-3 right-3 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-md"
      role="dialog"
      aria-label={t('aria_label')}
    >
      <div className="rounded-md border border-border bg-card p-3 shadow-lg shadow-brand-charcoal/10 md:p-4">
        <div className="flex flex-col gap-3">
          <p className="text-xs leading-[1.6] text-foreground sm:text-sm">
            {t('message')}{' '}
            <Link
              href="/privacy"
              className="font-semibold text-brand-serene-coral-darken underline decoration-brand-serene-coral/50 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('privacy_link')}
            </Link>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="min-h-10 text-xs sm:text-sm"
            >
              {t('decline')}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="min-h-10 bg-brand-serene-coral text-xs text-brand-charcoal hover:bg-brand-serene-coral-darken hover:text-white sm:text-sm"
            >
              {t('accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
