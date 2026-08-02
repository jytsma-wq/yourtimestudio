"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";

import {
  buildLocalizedDemoHref,
  buildPreviewHref,
  previewPageLabel,
  previewLabels,
  splitPreviewSuffix,
  type PreviewLocale
} from "@/components/templates/template-preview-locale";

type PreviewPage = {
  slug: string;
  label: string;
};

type PreviewShellProps = {
  templateId: string;
  brandName: string;
  category: string;
  initialLocale: PreviewLocale;
  initialSlug: string;
  pages: readonly PreviewPage[];
  catalogHref?: string;
};

type DeviceMode = "responsive" | "tablet" | "mobile";

const deviceWidths: Record<DeviceMode, string> = {
  responsive: "100%",
  tablet: "820px",
  mobile: "390px"
};

const interceptedDocuments = new WeakSet<Document>();

export function PreviewShell({
  templateId,
  brandName,
  category,
  initialLocale,
  initialSlug,
  pages,
  catalogHref = "/templates"
}: PreviewShellProps) {
  const [device, setDevice] = useState<DeviceMode>("responsive");
  const [locale, setLocale] = useState<PreviewLocale>(initialLocale);
  const [currentSlug, setCurrentSlug] = useState(initialSlug);
  const [frameSrc, setFrameSrc] = useState(
    buildLocalizedDemoHref(templateId, initialSlug, initialLocale)
  );
  const [frameSearch, setFrameSearch] = useState("");
  const [frameHash, setFrameHash] = useState("");
  const [frameMounted, setFrameMounted] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const localeRef = useRef(initialLocale);

  const labels = previewLabels[locale];
  const localizedCatalogHref =
    locale === "en" ? catalogHref : `/${locale}${catalogHref}`;

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const updateFromFrame = useCallback((frame: HTMLIFrameElement) => {
    const frameWindow = frame.contentWindow;
    const frameDocument = frame.contentDocument;

    if (!frameWindow || !frameDocument) return;

    const rawPrefix = `/template-sites/${templateId}`;
    const currentPath = frameWindow.location.pathname;
    const belongsToTemplate =
      currentPath === rawPrefix || currentPath.startsWith(`${rawPrefix}/`);

    if (belongsToTemplate) {
      const currentFrameSlug = currentPath.slice(rawPrefix.length).replace(/^\//, "");
      const suffix = splitPreviewSuffix(
        frameWindow.location.search,
        frameWindow.location.hash
      );
      setCurrentSlug(currentFrameSlug);
      setFrameSearch(suffix.demoSearch);
      setFrameHash(suffix.hash);
      window.history.replaceState(
        null,
        "",
        buildPreviewHref(
          templateId,
          currentFrameSlug,
          localeRef.current,
          suffix.demoSearch,
          suffix.hash
        )
      );
    }

    if (interceptedDocuments.has(frameDocument)) return;
    interceptedDocuments.add(frameDocument);

    frameDocument.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

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
      if (anchor.download || (anchor.target && anchor.target !== "_self")) return;

      const clickedCurrentPage = anchor.pathname === currentPath && anchor.hash;
      if (clickedCurrentPage) {
        event.preventDefault();
        const currentFrameSlug = currentPath.slice(rawPrefix.length).replace(/^\//, "");
        const suffix = splitPreviewSuffix(anchor.search, anchor.hash);
        setFrameSearch(suffix.demoSearch);
        setFrameHash(suffix.hash);

        if (suffix.demoSearch === frameWindow.location.search) {
          frameWindow.location.hash = suffix.hash;
        } else {
          setFrameSrc(
            buildLocalizedDemoHref(
              templateId,
              currentFrameSlug,
              localeRef.current,
              suffix.demoSearch,
              suffix.hash
            )
          );
        }
        window.history.pushState(
          null,
          "",
          buildPreviewHref(
            templateId,
            currentFrameSlug,
            localeRef.current,
            suffix.demoSearch,
            suffix.hash
          )
        );
        return;
      }

      event.preventDefault();
      const nextSlug = anchor.pathname.slice(rawPrefix.length).replace(/^\//, "");
      const suffix = splitPreviewSuffix(anchor.search, anchor.hash);
      setCurrentSlug(nextSlug);
      setFrameSearch(suffix.demoSearch);
      setFrameHash(suffix.hash);
      setFrameSrc(
        buildLocalizedDemoHref(
          templateId,
          nextSlug,
          localeRef.current,
          suffix.demoSearch,
          suffix.hash
        )
      );
      window.history.pushState(
        null,
        "",
        buildPreviewHref(
          templateId,
          nextSlug,
          localeRef.current,
          suffix.demoSearch,
          suffix.hash
        )
      );
    });
  }, [templateId]);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const suffix = splitPreviewSuffix(
        window.location.search,
        window.location.hash
      );
      setLocale(suffix.locale);
      setFrameSearch(suffix.demoSearch);
      setFrameHash(suffix.hash);
      setFrameSrc(
        buildLocalizedDemoHref(
          templateId,
          initialSlug,
          suffix.locale,
          suffix.demoSearch,
          suffix.hash
        )
      );
      window.history.replaceState(
        null,
        "",
        buildPreviewHref(
          templateId,
          initialSlug,
          suffix.locale,
          suffix.demoSearch,
          suffix.hash
        )
      );
      setFrameMounted(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [initialSlug, templateId]);

  useEffect(() => {
    function handlePopState() {
      const previewPrefix = `/preview/${templateId}`;
      if (
        window.location.pathname !== previewPrefix &&
        !window.location.pathname.startsWith(`${previewPrefix}/`)
      ) {
        return;
      }

      const nextSlug = window.location.pathname.slice(previewPrefix.length).replace(/^\//, "");
      const suffix = splitPreviewSuffix(
        window.location.search,
        window.location.hash
      );
      setLocale(suffix.locale);
      setCurrentSlug(nextSlug);
      setFrameSearch(suffix.demoSearch);
      setFrameHash(suffix.hash);
      setFrameSrc(
        buildLocalizedDemoHref(
          templateId,
          nextSlug,
          suffix.locale,
          suffix.demoSearch,
          suffix.hash
        )
      );
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [templateId]);

  useEffect(() => {
    if (!frameMounted) return;

    const timer = window.setTimeout(() => {
      const frame = frameRef.current;
      if (frame?.contentDocument?.readyState === "complete") {
        updateFromFrame(frame);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [frameMounted, updateFromFrame]);

  function changePage(event: ChangeEvent<HTMLSelectElement>) {
    const selectedPage = pages[event.currentTarget.selectedIndex];
    if (!selectedPage) return;

    const nextSlug = selectedPage.slug;
    setCurrentSlug(nextSlug);
    setFrameSearch("");
    setFrameHash("");
    setFrameSrc(buildLocalizedDemoHref(templateId, nextSlug, locale));
    window.history.pushState(
      null,
      "",
      buildPreviewHref(templateId, nextSlug, locale)
    );
  }

  return (
    <div
      lang={locale}
      className="flex h-dvh min-h-[36rem] flex-col overflow-hidden bg-[#ddd9d0] text-[#171714]"
    >
      <a
        href="#template-preview"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:ring-2 focus:ring-[#c95032]"
      >
        {labels.skipControls}
      </a>

      <header className="relative z-20 shrink-0 border-b border-black/15 bg-[#f7f5ef]">
        <div className="mx-auto flex min-h-16 max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2 sm:px-5 lg:flex-nowrap">
          <Link
            href={localizedCatalogHref}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">{labels.allTemplates}</span>
            <span className="sm:hidden">{labels.back}</span>
          </Link>

          <span className="hidden h-8 w-px bg-black/15 sm:block" aria-hidden="true" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{brandName}</p>
            <p className="hidden truncate text-xs capitalize text-stone-500 sm:block">
              {labels.categoryLabels[category] ?? category.replace("-", " ")} / {labels.fictionalDemo}
            </p>
          </div>

          <label className="sr-only" htmlFor="preview-page">
            {labels.previewPage}
          </label>
          <select
            id="preview-page"
            value={currentSlug}
            onChange={changePage}
            className="min-h-11 min-w-36 border border-stone-300 bg-white px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032]"
          >
            {pages.map((page, index) => (
              <option key={page.slug || "home"} value={page.slug}>
                {previewPageLabel(locale, page, index)}
              </option>
            ))}
          </select>

          <div
            className="hidden items-center border border-stone-300 bg-white p-1 lg:flex"
            aria-label={labels.previewWidth}
            role="group"
          >
            {(
              [
                ["responsive", labels.desktop],
                ["tablet", labels.tablet],
                ["mobile", labels.mobile]
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                className={[
                  "min-h-9 px-3 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032]",
                  device === mode ? "bg-[#171714] text-white" : "text-stone-600 hover:bg-stone-100"
                ].join(" ")}
                aria-pressed={device === mode}
                onClick={() => setDevice(mode)}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href={buildLocalizedDemoHref(
              templateId,
              currentSlug,
              locale,
              frameSearch,
              frameHash
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-[#c95032] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#a93622] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032] focus-visible:ring-offset-2"
            title={labels.fullScreenTitle}
          >
            {labels.fullScreen}{" "}
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </header>

      <main
        id="template-preview"
        className="relative flex min-h-0 flex-1 justify-center overflow-hidden p-0 lg:p-4"
      >
        {frameMounted ? (
          <iframe
            ref={frameRef}
            src={frameSrc}
            title={labels.iframeTitle(brandName)}
            className="h-full max-w-full border-0 bg-white shadow-[0_24px_70px_rgba(23,23,20,0.16)] lg:border lg:border-black/10"
            style={{ width: deviceWidths[device] }}
            onLoad={(event) => updateFromFrame(event.currentTarget)}
          />
        ) : null}
      </main>
    </div>
  );
}
