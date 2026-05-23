'use client';

import { useLocale } from 'next-intl';
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
          className="h-8 gap-1.5 rounded-md border-border/60 bg-background/50 px-2.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:border-teal/40 hover:text-teal hover:bg-teal/5"
        >
          <span className="text-xs font-bold tracking-wider uppercase">{localeAbbreviations[locale]}</span>
          <span className="text-xs text-muted-foreground">▼</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1">
        {launchLocales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleSwitch(loc)}
            className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
              locale === loc
                ? 'bg-teal/10 text-teal font-semibold'
                : 'text-foreground hover:bg-accent/5 hover:text-teal'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground w-5">
                {localeAbbreviations[loc]}
              </span>
              <span>{localeLabels[loc]}</span>
            </span>
            {locale === loc && <Check className="size-3.5 text-teal" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
