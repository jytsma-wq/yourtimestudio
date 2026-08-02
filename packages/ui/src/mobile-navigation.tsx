"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

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
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;

    const previousId = main.getAttribute("id");
    const previousTabIndex = main.getAttribute("tabindex");
    main.id = "wtf-main-content";
    main.tabIndex = -1;

    return () => {
      if (previousId) main.id = previousId;
      else main.removeAttribute("id");

      if (previousTabIndex) main.setAttribute("tabindex", previousTabIndex);
      else main.removeAttribute("tabindex");
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer")
    );
    const previousInertValues = backgroundElements.map((element) => element.inert);
    const focusFrame = window.requestAnimationFrame(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      (firstFocusable ?? panelRef.current)?.focus();
    });

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("hidden"));
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements.at(-1);

      if (!firstFocusable || !lastFocusable) {
        event.preventDefault();
        panel.focus();
        return;
      }

      if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastFocusable : firstFocusable).focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      backgroundElements.forEach((element, index) => {
        element.inert = previousInertValues[index] ?? false;
      });
    };
  }, [closeMenu, open]);

  return (
    <div className={cx("lg:hidden", className)}>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex min-h-11 items-center justify-center border border-current px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)] focus:ring-offset-2"
        aria-expanded={open}
        aria-controls={navigationId}
        aria-haspopup="dialog"
        onClick={() => {
          if (open) closeMenu();
          else setOpen(true);
        }}
      >
        {open ? closeLabel : menuLabel}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[calc(var(--wtf-z-overlay,50)-1)] cursor-default bg-black/35"
            aria-label={closeLabel}
            tabIndex={-1}
            onClick={closeMenu}
          />
          <div
            ref={panelRef}
            id={navigationId}
            className="absolute left-4 right-4 top-full z-[var(--wtf-z-overlay,50)] mt-3 border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] p-4 text-[var(--wtf-color-foreground,#111827)] shadow-[var(--wtf-shadow-elevated,0_24px_70px_rgba(0,0,0,0.18))]"
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            tabIndex={-1}
          >
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                onClick={closeMenu}
              >
                {closeLabel}
              </button>
            </div>
            <nav aria-label={menuLabel} className="grid gap-2">
              {items.map((item) => (
                <a
                  key={item.href}
                  className="flex min-h-12 items-center px-3 py-3 text-sm font-semibold hover:bg-[var(--wtf-color-surface-muted,#f1f5f9)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
              {cta ? (
                <a
                  className="mt-2 inline-flex min-h-12 items-center justify-center bg-[var(--wtf-color-button,#111827)] px-4 text-sm font-semibold text-[var(--wtf-color-button-foreground,#fff)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
                  href={cta.href}
                  onClick={closeMenu}
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
