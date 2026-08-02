'use client';

import { type FocusEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Link, usePathname } from '@/lib/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { sectors } from '@/lib/sector-config';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

interface NavChild {
  key: string;
  href: string;
}

interface NavItem {
  key: string;
  href: string;
  children?: NavChild[];
}

const serviceNavItems: NavChild[] = [
  { key: 'hotelsGuesthouses', href: sectors.hospitality.href },
  { key: 'clinicsMedical', href: sectors.medical.href },
  { key: 'beautyStudios', href: sectors.beauty.href },
  { key: 'websiteAudit', href: '/website-audits' },
  { key: 'photography', href: '/photography' },
];

const navItems: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'solutions', href: '#', children: serviceNavItems },
  { key: 'work', href: '/work' },
  { key: 'templates', href: '/templates' },
  { key: 'pricing', href: '/pricing' },
  { key: 'insights', href: '/insights' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

export default function SiteHeader() {
  const t = useTranslations('nav');
  const ui = useTranslations('ui');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = localStorage.getItem('theme');
      const isDark = saved === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      setDark(isDark);
      setThemeReady(true);
    });
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (solutionsTimeoutRef.current) {
        clearTimeout(solutionsTimeoutRef.current);
      }
    };
  }, []);

  function openSolutions() {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  }

  function closeSolutions(delay = 120) {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), delay);
  }

  function handleSolutionsBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setSolutionsOpen(false);
    }
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  function isActive(href: string): boolean {
    if (href === '#') return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isItemActive(item: NavItem): boolean {
    return item.children
      ? item.children.some((child) => isActive(child.href))
      : isActive(item.href);
  }

  const desktopLinkClass = (active: boolean) =>
    `h-11 rounded-none border-b-2 px-2 text-sm font-semibold normal-case tracking-normal transition-colors ${
      active
        ? 'border-brand-serene-coral text-foreground'
        : 'border-transparent text-muted-foreground hover:border-border hover:bg-transparent hover:text-foreground'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `flex min-h-12 items-center border-b px-1 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      active
        ? 'border-brand-serene-coral text-foreground'
        : 'border-border text-foreground hover:text-brand-serene-coral-darken'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-border bg-background/96 shadow-[0_1px_0_rgba(23,60,62,0.08)] backdrop-blur-md'
          : 'border-transparent bg-background/92 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-[86rem] items-center justify-between px-[var(--container-padding)]">
        <Link
          href="/"
          className="flex min-w-0 items-center text-foreground transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          aria-label={siteConfig.name}
        >
          <Image
            src={siteConfig.assets.logo}
            alt=""
            width={1360}
            height={520}
            loading="eager"
            className="h-auto w-[10.75rem] shrink-0 mix-blend-multiply dark:invert dark:mix-blend-screen sm:w-[13rem]"
            aria-hidden="true"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label={ui('mainNavigation')}>
          {navItems.map((item) => {
            const active = isItemActive(item);

            if (item.children) {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onBlur={handleSolutionsBlur}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') setSolutionsOpen(false);
                  }}
                  onMouseEnter={openSolutions}
                  onMouseLeave={() => closeSolutions()}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-expanded={solutionsOpen}
                    aria-controls="site-services-menu"
                    aria-haspopup="true"
                    onClick={openSolutions}
                    onFocus={openSolutions}
                    className={`${desktopLinkClass(active)} gap-1.5 hover:bg-transparent`}
                  >
                    {t(item.key)}
                    <ChevronDown
                      className={`size-4 opacity-60 transition-transform duration-200 ${
                        solutionsOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </Button>

                  {solutionsOpen && (
                    <div
                      id="site-services-menu"
                      className="absolute left-0 top-full z-50 mt-3 w-80 border border-border bg-popover p-3 text-popover-foreground shadow-[0_24px_60px_rgba(23,60,62,0.16)]"
                      onMouseEnter={openSolutions}
                      onMouseLeave={() => closeSolutions()}
                    >
                      <div className="space-y-1">
                        {item.children.map((child) => {
                          const childActive = isActive(child.href);

                          return (
                            <Link
                              key={child.key}
                              href={child.href}
                              aria-current={childActive ? 'page' : undefined}
                              onClick={() => setSolutionsOpen(false)}
                              className={`group flex min-h-11 items-center justify-between border-b border-border px-2 py-2.5 text-sm font-semibold transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                childActive
                                  ? 'text-brand-serene-coral-darken'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <span>{t(child.key)}</span>
                              <ArrowRight
                                className="size-4 opacity-0 transition-opacity group-hover:opacity-70"
                                aria-hidden="true"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Button
                key={item.key}
                variant="ghost"
                size="sm"
                asChild
                className={desktopLinkClass(active)}
              >
                <Link href={item.href} aria-current={active ? 'page' : undefined}>
                  {t(item.key)}
                </Link>
              </Button>
            );
          })}

          <Button
            asChild
            size="sm"
            className="ml-2 h-10 rounded-full bg-brand-serene-coral px-4 text-sm font-semibold text-brand-charcoal shadow-none hover:bg-foreground hover:text-background"
          >
            <Link
              href="/website-audits"
              data-analytics-event="header_audit_cta_click"
              data-analytics-section="header"
            >
              {t('requestAudit')}
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={themeReady ? (dark ? ui('switchToLight') : ui('switchToDark')) : ui('toggleColorTheme')}
            className="rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
          >
            {dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
          </Button>

          <div className="hidden xl:block">
            <LanguageSwitcher />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={ui('openNavigationMenu')}
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="flex w-full flex-col bg-background p-0 sm:max-w-md">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle className="flex items-center text-left">
              <Image
                src={siteConfig.assets.logo}
                alt=""
                width={1360}
                height={520}
                className="h-auto w-48 mix-blend-multiply dark:invert dark:mix-blend-screen"
                aria-hidden="true"
              />
              <span className="sr-only">{siteConfig.name}</span>
            </SheetTitle>
            <SheetDescription className="sr-only">{ui('mobileNavigation')}</SheetDescription>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label={ui('mobileNavigation')}>
            <div className="space-y-1">
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.key} className="py-2">
                      <p className="pb-2 text-sm font-semibold text-muted-foreground">
                        {t(item.key)}
                      </p>
                      <div className="space-y-1">
                        {item.children.map((child) => {
                          const childActive = isActive(child.href);

                          return (
                            <SheetClose asChild key={child.key}>
                              <Link
                                href={child.href}
                                aria-current={childActive ? 'page' : undefined}
                                className={mobileLinkClass(childActive)}
                              >
                                {t(child.key)}
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const active = isActive(item.href);

                return (
                  <SheetClose asChild key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={mobileLinkClass(active)}
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </nav>

          <div className="space-y-4 border-t border-border px-6 py-5">
            <SheetClose asChild>
              <Button
                asChild
                className="h-12 w-full rounded-full bg-brand-serene-coral text-base font-semibold text-brand-charcoal shadow-none hover:bg-foreground hover:text-background"
              >
                <Link
                  href="/website-audits"
                  data-analytics-event="header_audit_cta_click"
                  data-analytics-section="mobile_drawer"
                >
                  {t('requestAudit')}
                </Link>
              </Button>
            </SheetClose>
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
