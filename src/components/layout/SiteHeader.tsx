'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, ChevronDown } from 'lucide-react';
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
import { siteConfig } from '@/lib/site-config';

interface NavItem {
  key: string;
  href?: string;
  children?: { key: string; href: string }[];
}

interface BrandLockupProps {
  descriptor: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

function BrandLockup({ descriptor, className = '', priority = false, onClick }: BrandLockupProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group flex min-w-0 items-center gap-2.5 text-ink transition-colors hover:text-sea-bright ${className}`}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-paper p-0.5">
        <Image
          src={siteConfig.brand.markSrc}
          alt={siteConfig.brand.markAlt}
          width={32}
          height={32}
          sizes="36px"
          priority={priority}
          className="size-8 rounded-sm object-cover"
        />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block truncate text-sm font-semibold tracking-[0.04em] text-ink">
          {siteConfig.brand.displayName}
        </span>
        <span className="mt-1 block truncate font-mono text-[0.62rem] font-semibold uppercase leading-none tracking-[0.12em] text-muted transition-colors group-hover:text-ink/80">
          {descriptor}
        </span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const t = useTranslations('nav');
  const ui = useTranslations('ui');
  const sectorT = useTranslations('sectors');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { key: 'home', href: '/' },
    {
      key: 'solutions',
      children: [
        ...sectorKeys.map(key => ({ key, href: sectors[key].href })),
        { key: 'audits', href: '/website-audits' },
      ],
    },
    { key: 'work', href: '/work' },
    { key: 'pricing', href: '/pricing' },
    { key: 'about', href: '/about' },
  ];

  function isActive(href?: string): boolean {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/95 backdrop-blur-md border-b border-hairline'
          : 'bg-canvas/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-max-width)] items-center justify-between px-[var(--container-padding)]">
        {/* Brand lockup */}
        <BrandLockup descriptor={t('brand_descriptor')} priority />

        {/* Desktop Navigation — visible at lg (1024px) */}
        <nav className="hidden lg:flex items-center gap-1" aria-label={ui('mainNavigation')}>
          {navItems.map((item) => {
            const active = item.children
              ? item.children.some((child) => isActive(child.href))
              : isActive(item.href);

            if (item.children) {
              return (
                <div
                  key={item.key}
                  onMouseEnter={handleSolutionsEnter}
                  onMouseLeave={handleSolutionsLeave}
                  className="relative"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-expanded={solutionsOpen}
                    aria-haspopup="menu"
                    className={`gap-1 rounded-md font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                      active ? 'text-sea-bright' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {t(item.key)}
                    <ChevronDown className={`size-3 opacity-50 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </Button>
                  {solutionsOpen && (
                    <div
                      className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-md border border-hairline bg-surface p-3 shadow-none"
                      onMouseEnter={handleSolutionsEnter}
                      onMouseLeave={handleSolutionsLeave}
                    >
                      <div className="space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            href={child.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-colors ${
                              isActive(child.href)
                                ? 'text-sea-bright bg-surface-elevated'
                                : 'text-ink hover:text-sea-bright hover:bg-surface-elevated'
                            }`}
                          >
                            <span className={`size-1.5 rounded-full ${sectors[child.key as keyof typeof sectors]?.dotClass || 'bg-muted'}`} aria-hidden="true" />
                            {child.key === 'audits' ? t('audits') : sectorT(`${child.key}.title`)}
                          </Link>
                        ))}
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
                className={`rounded-md font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                  active ? 'text-sea-bright' : 'text-muted hover:text-ink'
                }`}
              >
                <Link href={item.href || '/'}>{t(item.key)}</Link>
              </Button>
            );
          })}
          <Button
            asChild
            size="sm"
            className="ml-3 h-9 rounded-md bg-oxide px-4 text-sm font-semibold text-white hover:bg-oxide-hover transition-colors"
          >
            <Link href="/website-audits">{t('audits')}</Link>
          </Button>
        </nav>

        {/* Right side: Language Switcher + Mobile Menu */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu trigger — visible below lg */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted hover:text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label={ui('openNavigationMenu')}
          >
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0 bg-canvas border-hairline">
          <SheetHeader className="border-b border-hairline px-6 py-4">
            <SheetTitle className="text-left text-ink">
              <BrandLockup
                descriptor={t('brand_descriptor')}
                onClick={() => setMobileOpen(false)}
              />
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col py-4" aria-label={ui('mobileNavigation')}>
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.key} className="px-6 py-2">
                    <p className="mb-2 mono-label text-muted">
                      {t(item.key)}
                    </p>
                    {item.children.map((child) => (
                      <SheetClose asChild key={child.key}>
                        <Link
                          href={child.href}
                          className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                            isActive(child.href)
                              ? 'text-sea-bright bg-surface'
                              : 'text-ink hover:text-sea-bright hover:bg-surface'
                          }`}
                        >
                          <span className={`size-1.5 rounded-full ${sectors[child.key as keyof typeof sectors]?.dotClass || 'bg-muted'}`} aria-hidden="true" />
                          {child.key === 'audits' ? t('audits') : sectorT(`${child.key}.title`)}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                );
              }

              return (
                <SheetClose asChild key={item.key}>
                  <Link
                    href={item.href || '/'}
                    className={`flex items-center px-6 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-sea-bright bg-surface'
                        : 'text-ink hover:text-sea-bright hover:bg-surface'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          {/* Mobile CTA + language switcher */}
          <div className="border-t border-hairline px-6 py-4 mt-auto space-y-3">
            <SheetClose asChild>
              <Button asChild className="w-full bg-oxide text-white hover:bg-oxide-hover font-medium rounded-md">
                <Link href="/website-audits">{t('audits')}</Link>
              </Button>
            </SheetClose>
            <LanguageSwitcher />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
