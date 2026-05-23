'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, ChevronDown, Sun, Moon, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Link, usePathname } from '@/lib/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { sectors, sectorKeys } from '@/lib/sector-config';
import Image from 'next/image';

interface NavItem {
  key: string;
  href: string;
  children?: { key: string; href: string; color?: string }[];
}

export default function SiteHeader() {
  const t = useTranslations('nav');
  const ui = useTranslations('ui');
  const sectorT = useTranslations('sectors');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sliding underline indicator state
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Mega-menu solutions dropdown state
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

  function handleSolutionsEnter() {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  }

  function handleSolutionsLeave() {
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, progress));
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  const navItems: NavItem[] = [
    { key: 'home', href: '/' },
    {
      key: 'solutions',
      href: '#',
      children: [
        ...sectorKeys.map(key => ({ key, href: sectors[key].href, color: sectors[key].dotClass })),
        { key: 'insights', href: '/insights' },
      ],
    },
    { key: 'audits', href: '/website-audits' },
    { key: 'work', href: '/work' },
    { key: 'pricing', href: '/pricing' },
    { key: 'about', href: '/about' },
  ];

  function isActive(href: string): boolean {
    if (href === '#') return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const activeNavKey = navItems.find((item) => (
    item.children
      ? item.children.some((child) => isActive(child.href))
      : isActive(item.href)
  ))?.key ?? null;
  const indicatorNavKey = hoveredNav ?? activeNavKey;

  function renderNavIndicator(visible: boolean) {
    return (
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute bottom-0 left-2 right-2 h-px bg-brand-serene-coral"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/94 backdrop-blur-md border-b border-border'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-max-width)] items-center justify-between px-[var(--container-padding)]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-normal text-foreground hover:text-brand-serene-coral-darken transition-colors"
        >
          <Image
            src="/brand/yourtimestudio-mark.png"
            alt="Yourtimestudio logo"
            width={36}
            height={36}
            className="size-9 shrink-0 object-cover"
            priority
          />
          <span className="font-sans text-sm font-bold uppercase">Yourtimestudio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1" aria-label={ui('mainNavigation')}>
          {navItems.map((item) => {
            const active = item.children
              ? item.children.some((child) => isActive(child.href))
              : isActive(item.href);
            const showIndicator = indicatorNavKey === item.key;

            if (item.children) {
              // Solutions dropdown — mega-menu with hover panel
              return (
                <div
                  key={item.key}
                  onMouseEnter={() => { setHoveredNav(item.key); handleSolutionsEnter(); }}
                  onMouseLeave={() => { setHoveredNav(null); handleSolutionsLeave(); }}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 rounded-none font-sans text-xs font-bold uppercase transition-colors ${
                      active ? 'text-brand-serene-coral-darken' : 'text-muted-foreground hover:text-brand-serene-coral-darken'
                    }`}
                  >
                    {t(item.key)}
                    <ChevronDown className={`size-3.5 opacity-50 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  {renderNavIndicator(showIndicator)}
                  {solutionsOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-card border border-border shadow-lg p-4 z-50"
                      onMouseEnter={handleSolutionsEnter}
                      onMouseLeave={handleSolutionsLeave}
                    >
                      <div className="space-y-1">
                        {sectorKeys.map((key) => {
                          const sector = sectors[key];
                          return (
                            <Link
                              key={key}
                              href={sector.href}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/5 transition-colors group"
                            >
                              <Image
                                src={sector.image}
                                alt={sectorT(`${key}.title`)}
                                width={60}
                                height={40}
                              className="object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`size-2 rounded-full ${sector.dotClass}`} />
                                  <span className="text-sm font-semibold text-foreground group-hover:text-brand-serene-coral-darken transition-colors">
                                    {sectorT(`${key}.title`)}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {sectorT(`${key}.subtitle`)}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <Link
                          href="/website-audits"
                          className="flex items-center gap-2 text-sm font-medium text-brand-sage-green-darken hover:text-brand-serene-coral-darken transition-colors"
                        >
                          {t('audits')} <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={item.key}
                onMouseEnter={() => setHoveredNav(item.key)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                    className={`rounded-none font-sans text-xs font-bold uppercase transition-colors ${
                    active
                      ? 'text-brand-serene-coral-darken'
                      : 'text-muted-foreground hover:text-brand-serene-coral-darken'
                  }`}
                >
                  <Link href={item.href}>{t(item.key)}</Link>
                </Button>
                {renderNavIndicator(showIndicator)}
              </div>
            );
          })}
          <Button
            asChild
            size="sm"
            className="ml-2 h-9 rounded-none bg-foreground px-4 text-sm font-semibold text-background hover:bg-foreground/88"
          >
            <Link href="/contact">{t('contact')}</Link>
          </Button>
        </nav>

        {/* Right side: Theme Toggle + Language Switcher + Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={themeReady ? (dark ? ui('switchToLight') : ui('switchToDark')) : ui('toggleColorTheme')}
            className="text-muted-foreground hover:text-brand-serene-coral-darken transition-colors"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <div className="hidden xl:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={ui('openNavigationMenu')}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0">
          <SheetHeader className="border-b border-border px-6 py-4">
            <SheetTitle className="flex items-center gap-2.5 text-left">
              <Image
                src="/brand/yourtimestudio-mark.png"
                alt="Yourtimestudio logo"
                width={32}
                height={32}
                className="size-8 shrink-0 object-cover"
              />
              <span>Yourtimestudio</span>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col py-4" aria-label={ui('mobileNavigation')}>
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.key} className="px-6 py-2">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t(item.key)}
                    </p>
                    {item.children.map((child) => (
                      <SheetClose asChild key={child.key}>
                        <Link
                          href={child.href}
                          className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                            isActive(child.href)
                              ? 'text-brand-serene-coral-darken bg-accent/10'
                              : 'text-foreground hover:text-brand-serene-coral-darken hover:bg-accent/5'
                          }`}
                        >
                          {child.color && (
                            <span
                              className={`inline-block size-2 rounded-full ${child.color}`}
                            />
                          )}
                          {t(child.key)}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                );
              }

              return (
                <SheetClose asChild key={item.key}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-6 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-brand-serene-coral-darken bg-accent/10'
                        : 'text-foreground hover:text-brand-serene-coral-darken hover:bg-accent/5'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          {/* Mobile CTA + language switcher */}
          <div className="border-t border-border px-6 py-4 mt-auto space-y-3">
            <SheetClose asChild>
              <Button asChild className="w-full bg-brand-serene-coral text-brand-charcoal hover:bg-brand-serene-coral-darken hover:text-white font-medium">
                <Link href="/contact">{t('contact')}</Link>
              </Button>
            </SheetClose>
            <LanguageSwitcher />
          </div>
        </SheetContent>
      </Sheet>
      {/* Scroll progress bar */}
      <div className="h-0.5 bg-border/50">
        <div
          className="h-full bg-brand-serene-coral transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
