"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";

type PreviewPage = {
  slug: string;
  label: string;
};

type PreviewShellProps = {
  templateId: string;
  brandName: string;
  category: string;
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

function previewPath(templateId: string, slug: string) {
  return `/preview/${templateId}${slug ? `/${slug}` : ""}`;
}

function templatePath(templateId: string, slug: string) {
  return `/template-sites/${templateId}${slug ? `/${slug}` : ""}`;
}

export function PreviewShell({
  templateId,
  brandName,
  category,
  initialSlug,
  pages,
  catalogHref = "/templates"
}: PreviewShellProps) {
  const [device, setDevice] = useState<DeviceMode>("responsive");
  const [currentSlug, setCurrentSlug] = useState(initialSlug);
  const [frameMounted, setFrameMounted] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const frameSrc = templatePath(templateId, initialSlug);

  const updateFromFrame = useCallback((frame: HTMLIFrameElement) => {
    const frameWindow = frame.contentWindow;
    const frameDocument = frame.contentDocument;

    if (!frameWindow || !frameDocument) return;

    const rawPrefix = `/template-sites/${templateId}`;
    const currentPath = frameWindow.location.pathname;

    if (currentPath.startsWith(rawPrefix)) {
      const nextSlug = currentPath.slice(rawPrefix.length).replace(/^\//, "");
      setCurrentSlug(nextSlug);
      window.history.replaceState(null, "", previewPath(templateId, nextSlug));
    }

    if (interceptedDocuments.has(frameDocument)) return;
    interceptedDocuments.add(frameDocument);

    frameDocument.addEventListener("click", (event) => {
      const target = event.target;
      if (!target || typeof (target as Element).closest !== "function") return;

      const anchor = (target as Element).closest("a");
      if (!anchor || anchor.origin !== window.location.origin) return;
      if (!anchor.pathname.startsWith(rawPrefix)) return;

      const clickedCurrentPage = anchor.pathname === currentPath && anchor.hash;
      if (clickedCurrentPage) return;

      event.preventDefault();
      const nextSlug = anchor.pathname.slice(rawPrefix.length).replace(/^\//, "");
      window.location.assign(previewPath(templateId, nextSlug));
    });
  }, [templateId]);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => setFrameMounted(true));

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

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
    window.location.assign(previewPath(templateId, event.target.value));
  }

  return (
    <div className="flex h-dvh min-h-[36rem] flex-col overflow-hidden bg-[#ddd9d0] text-[#171714]">
      <a
        href="#template-preview"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:ring-2 focus:ring-[#c95032]"
      >
        Skip preview controls
      </a>

      <header className="relative z-20 shrink-0 border-b border-black/15 bg-[#f7f5ef]">
        <div className="mx-auto flex min-h-16 max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2 sm:px-5 lg:flex-nowrap">
          <Link
            href={catalogHref}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">All templates</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <span className="hidden h-8 w-px bg-black/15 sm:block" aria-hidden="true" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{brandName}</p>
            <p className="hidden truncate text-xs capitalize text-stone-500 sm:block">
              {category.replace("-", " ")} / fictional demonstration
            </p>
          </div>

          <label className="sr-only" htmlFor="preview-page">
            Preview page
          </label>
          <select
            id="preview-page"
            value={currentSlug}
            onChange={changePage}
            className="min-h-11 min-w-36 border border-stone-300 bg-white px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032]"
          >
            {pages.map((page) => (
              <option key={page.slug || "home"} value={page.slug}>
                {page.label}
              </option>
            ))}
          </select>

          <div
            className="hidden items-center border border-stone-300 bg-white p-1 lg:flex"
            aria-label="Preview width"
            role="group"
          >
            {(
              [
                ["responsive", "Desktop"],
                ["tablet", "Tablet"],
                ["mobile", "Mobile"]
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
            href={templatePath(templateId, currentSlug)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-[#c95032] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#a93622] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c95032] focus-visible:ring-offset-2"
            title="Open the fictional site without preview controls"
          >
            Full screen{" "}
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
            title={`${brandName} website preview`}
            className="h-full max-w-full border-0 bg-white shadow-[0_24px_70px_rgba(23,23,20,0.16)] lg:border lg:border-black/10"
            style={{ width: deviceWidths[device] }}
            onLoad={(event) => updateFromFrame(event.currentTarget)}
          />
        ) : null}
      </main>
    </div>
  );
}
