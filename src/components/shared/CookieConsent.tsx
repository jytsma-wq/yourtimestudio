'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';

const CONSENT_KEY = 'yourtimestudio-cookie-consent';

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
    queueMicrotask(() => {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setVisible(true);
      } else if (consent === 'accepted') {
        loadAnalytics();
      }
    });
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    loadAnalytics();
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-md"
      role="dialog"
      aria-label={t('aria_label')}
    >
      <div className="bg-card border border-border rounded-xl shadow-lg p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="size-5 text-brand-serene-coral-darken shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm text-foreground leading-relaxed">
                {t('message')}{' '}
                <Link
                  href="/privacy"
                  className="border-b border-transparent font-medium text-brand-serene-coral-darken no-underline transition duration-150 ease-in-out hover:border-b-2 hover:border-brand-serene-coral"
                >
                  {t('privacy_link')}
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="text-sm"
            >
              {t('decline')}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-brand-serene-coral text-brand-charcoal hover:bg-brand-serene-coral-darken hover:text-white text-sm"
            >
              {t('accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
