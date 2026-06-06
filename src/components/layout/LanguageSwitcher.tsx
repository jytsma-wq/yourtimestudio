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
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { launchLocales, localeLabels, type Locale } from '@/lib/i18n/config';

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
  const router = useRouter();

  function handleSwitch(newLocale: Locale) {
    // Using next-intl's router.replace with {locale} properly
    // updates the NEXT_LOCALE cookie so the middleware won't
    // redirect the user back to the previous locale.
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label={ui('changeLanguage')}
          className="h-8 gap-1.5 rounded-md border-hairline bg-surface px-2.5 text-xs font-medium text-copy-muted transition-colors hover:border-sea/40 hover:bg-surface-elevated hover:text-sea-bright"
        >
          <span className="text-xs font-bold tracking-wider uppercase">{localeAbbreviations[locale]}</span>
          <span className="text-xs text-copy-muted" aria-hidden="true">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 border-hairline bg-surface p-1 text-ink shadow-none">
        {launchLocales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSwitch(loc)}
            className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
              locale === loc
                ? 'bg-sea/20 text-sea-bright font-semibold'
                : 'text-copy-muted hover:bg-surface-elevated hover:text-ink'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-copy-muted w-5">
                {localeAbbreviations[loc]}
              </span>
              <span>{localeLabels[loc]}</span>
            </span>
            {locale === loc && <Check className="size-3.5 text-sea-bright" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
