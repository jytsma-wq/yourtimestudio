"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cx } from "./cx";

export type NavigationItem = {
  label: string;
  href: string;
};

type MobileNavigationProps = {
  items: readonly NavigationItem[];
  cta?: NavigationItem | undefined;
  menuLabel?: string | undefined;
  closeLabel?: string | undefined;
  className?: string;
};

export function MobileNavigation({
  items,
  cta,
  menuLabel = "Menu",
  closeLabel = "Close",
  className
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const navigationId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className={cx("lg:hidden", className)}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center justify-center border border-current px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)] focus:ring-offset-2"
        aria-expanded={open}
        aria-controls={navigationId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? closeLabel : menuLabel}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[calc(var(--wtf-z-overlay,50)-1)] cursor-default bg-black/35"
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
          />
          <div
            id={navigationId}
            className="absolute left-4 right-4 top-full z-[var(--wtf-z-overlay,50)] mt-3 border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] p-4 text-[var(--wtf-color-foreground,#111827)] shadow-[var(--wtf-shadow-elevated,0_24px_70px_rgba(0,0,0,0.18))]"
          >
            <nav aria-label="Mobile navigation" className="grid gap-2">
              {items.map((item) => (
                <a
                  key={item.href}
                  className="flex min-h-12 items-center px-3 py-3 text-sm font-semibold hover:bg-[var(--wtf-color-surface-muted,#f1f5f9)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {cta ? (
                <a
                  className="mt-2 inline-flex min-h-12 items-center justify-center bg-[var(--wtf-color-button,#111827)] px-4 text-sm font-semibold text-[var(--wtf-color-button-foreground,#fff)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  href={cta.href}
                  onClick={() => setOpen(false)}
                >
                  {cta.label}
                </a>
              ) : null}
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
