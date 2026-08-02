'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from '@/lib/i18n/navigation';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';
import { getLocaleHref, persistLocale } from '@/lib/i18n/locale-switch';

const localeAbbreviations: Record<Locale, string> = {
  en: 'EN',
  ka: 'KA',
  ru: 'RU',
  tr: 'TR',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const ui = useTranslations('ui');
  const pathname = usePathname();

  function handleSwitch(newLocale: Locale) {
    persistLocale(newLocale);
    window.location.assign(getLocaleHref(pathname, newLocale));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-11 gap-1.5 rounded-md border-border/60 bg-background/50 px-3 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-brand-serene-coral/40 hover:text-brand-serene-coral-darken hover:bg-brand-serene-coral/5"
          aria-label={ui('selectLanguage')}
        >
          <span className="text-xs font-bold tracking-wider uppercase">{localeAbbreviations[locale]}</span>
          <span className="text-xs text-muted-foreground" aria-hidden="true">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1">
        {launchLocales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            aria-label={localeLabels[loc]}
            onClick={() => handleSwitch(loc)}
            className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
              locale === loc
                ? 'bg-brand-serene-coral/10 text-brand-serene-coral-darken font-semibold'
                : 'text-foreground hover:bg-accent/5 hover:text-brand-serene-coral-darken'
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className="text-xs font-bold tracking-wider uppercase text-muted-foreground w-5"
                aria-hidden="true"
              >
                {localeAbbreviations[loc]}
              </span>
              <span>{localeLabels[loc]}</span>
            </span>
            {locale === loc && <Check className="size-3.5 text-brand-serene-coral-darken" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
