"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  buildPreviewHref,
  parsePreviewLocale,
  previewLabels,
  shouldCarryPreviewLocale,
  splitPreviewSuffix,
  type PreviewLocale
} from "@/components/templates/template-preview-locale";

type DemoDisclosureProps = {
  initialLocale: PreviewLocale;
  templateId: string;
  slug: string;
};

export function TemplateDemoDisclosure({
  initialLocale,
  templateId,
  slug
}: DemoDisclosureProps) {
  const [locale, setLocale] = useState<PreviewLocale>(initialLocale);
  const [demoSearch, setDemoSearch] = useState("");
  const [hash, setHash] = useState("");
  const labels = previewLabels[locale];
  const previewHref = buildPreviewHref(
    templateId,
    slug,
    locale,
    demoSearch,
    hash
  );

  useEffect(() => {
    const ownParams = new URLSearchParams(window.location.search);
    const ownLocale = ownParams.get("locale");
    let resolvedLocale =
      ownLocale && parsePreviewLocale(ownLocale) === ownLocale
        ? parsePreviewLocale(ownLocale)
        : null;

    if (!resolvedLocale && window.parent !== window) {
      try {
        const parentLocale = new URLSearchParams(
          window.parent.location.search
        ).get("locale");
        if (parentLocale && parsePreviewLocale(parentLocale) === parentLocale) {
          resolvedLocale = parsePreviewLocale(parentLocale);
        }
      } catch {
        // A cross-origin embed cannot share preview locale state.
      }
    }

    const nextLocale = resolvedLocale ?? initialLocale;
    const suffix = splitPreviewSuffix(
      window.location.search,
      window.location.hash
    );
    const animationFrame = window.requestAnimationFrame(() => {
      setLocale(nextLocale);
      setDemoSearch(suffix.demoSearch);
      setHash(suffix.hash);
    });

    if (ownParams.has("locale")) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${suffix.demoSearch}${suffix.hash}`
      );
    }

    const rawPrefix = `/template-sites/${templateId}`;
    const addLocaleToNativeNewTabLink = (event: MouseEvent) => {
      const target = event.target;
      if (!target || typeof (target as Element).closest !== "function") return;

      const anchor = (target as Element).closest<HTMLAnchorElement>("a");
      if (!anchor || anchor.origin !== window.location.origin) return;
      if (
        anchor.pathname !== rawPrefix &&
        !anchor.pathname.startsWith(`${rawPrefix}/`)
      ) {
        return;
      }

      if (
        !shouldCarryPreviewLocale({
          type: event.type,
          button: event.button,
          metaKey: event.metaKey,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey,
          altKey: event.altKey,
          target: anchor.target
        })
      ) {
        return;
      }

      const originalHref = anchor.href;
      const targetUrl = new URL(anchor.href);
      targetUrl.searchParams.delete("locale");
      targetUrl.searchParams.set("locale", nextLocale);
      const localizedHref = targetUrl.toString();
      anchor.href = localizedHref;

      window.setTimeout(() => {
        if (anchor.href === localizedHref) anchor.href = originalHref;
      }, 0);
    };

    document.addEventListener("click", addLocaleToNativeNewTabLink, true);
    document.addEventListener("auxclick", addLocaleToNativeNewTabLink, true);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("click", addLocaleToNativeNewTabLink, true);
      document.removeEventListener("auxclick", addLocaleToNativeNewTabLink, true);
    };
  }, [initialLocale, templateId]);

  return (
    <aside
      lang={locale}
      aria-label={labels.disclosureLabel}
      className="border-t border-white/15 bg-[#171714] px-5 py-4 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-6 text-white/70">{labels.disclosureBody}</p>
        <Link
          href={previewHref}
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {labels.returnToControls}
        </Link>
      </div>
    </aside>
  );
}
