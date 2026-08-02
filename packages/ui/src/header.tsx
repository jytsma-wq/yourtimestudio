import type { ReactNode } from "react";

import { Button } from "./button";
import { Container } from "./container";
import { cx } from "./cx";
import { MobileNavigation, type NavigationItem } from "./mobile-navigation";

type HeaderProps = {
  brand: ReactNode;
  homeHref: string;
  items: readonly NavigationItem[];
  cta?: NavigationItem;
  mobileMenuLabel?: string;
  mobileCloseLabel?: string;
  className?: string;
};

export function Header({
  brand,
  homeHref,
  items,
  cta,
  mobileMenuLabel,
  mobileCloseLabel,
  className
}: HeaderProps) {
  return (
    <header
      className={cx(
        "sticky top-0 z-[var(--wtf-z-header,40)] border-b border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)]/95 backdrop-blur",
        className
      )}
    >
      <a
        href="#wtf-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[calc(var(--wtf-z-overlay,50)+1)] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-[var(--wtf-color-surface,#fff)] focus:px-4 focus:text-sm focus:font-semibold focus:text-[var(--wtf-color-foreground,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
      >
        Skip to content
      </a>
      <Container className="relative flex min-h-16 items-center justify-between gap-4 py-3">
        <a
          href={homeHref}
          className="[font-family:var(--wtf-font-heading,inherit)] text-base font-semibold tracking-tight text-[var(--wtf-color-foreground,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
        >
          {brand}
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
          {items.map((item) => (
            <a
              key={item.href}
              className="text-sm font-medium text-[var(--wtf-color-muted-foreground,#475569)] hover:text-[var(--wtf-color-foreground,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          {cta ? (
            <Button href={cta.href} className="rounded-none">
              {cta.label}
            </Button>
          ) : null}
        </div>
        <MobileNavigation
          items={items}
          cta={cta}
          menuLabel={mobileMenuLabel}
          closeLabel={mobileCloseLabel}
        />
      </Container>
    </header>
  );
}
