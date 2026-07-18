"use client";

import { useState } from "react";

import { cx } from "./cx";

export type DecisionGuideOption = {
  id: string;
  label: string;
  resultEyebrow: string;
  resultTitle: string;
  resultBody: string;
  href: string;
  ctaLabel: string;
};

type DecisionGuideProps = {
  eyebrow: string;
  title: string;
  description: string;
  prompt: string;
  options: readonly DecisionGuideOption[];
  className?: string;
};

export function DecisionGuide({
  eyebrow,
  title,
  description,
  prompt,
  options,
  className
}: DecisionGuideProps) {
  const [selectedId, setSelectedId] = useState(options[0]?.id ?? "");
  const selected = options.find((option) => option.id === selectedId) ?? options[0];

  if (!selected) return null;

  return (
    <section
      className={cx(
        "border-y border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] py-[var(--wtf-spacing-section,4rem)] text-[var(--wtf-color-foreground,#111827)]",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[var(--wtf-layout-max-width,72rem)] px-[var(--wtf-spacing-page,1.5rem)]">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wtf-color-accent,#2563eb)]">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl [font-family:var(--wtf-font-heading,inherit)] text-4xl font-semibold leading-tight">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--wtf-color-muted-foreground,#475569)]">
              {description}
            </p>
          </div>

          <div>
            <fieldset>
              <legend className="text-sm font-semibold">{prompt}</legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {options.map((option) => {
                  const active = option.id === selected.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={[
                        "min-h-12 border px-4 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wtf-color-accent,#2563eb)] focus-visible:ring-offset-2",
                        active
                          ? "border-[var(--wtf-color-button,#111827)] bg-[var(--wtf-color-button,#111827)] text-[var(--wtf-color-button-foreground,#fff)]"
                          : "border-[var(--wtf-color-border,#dbe3ef)] bg-transparent text-[var(--wtf-color-foreground,#111827)] hover:bg-[var(--wtf-color-surface-muted,#f1f5f9)]"
                      ].join(" ")}
                      aria-pressed={active}
                      onClick={() => setSelectedId(option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div
              className="mt-5 border-l-2 border-[var(--wtf-color-accent,#2563eb)] bg-[var(--wtf-color-surface-muted,#f1f5f9)] px-5 py-6 sm:px-6"
              aria-live="polite"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--wtf-color-accent,#2563eb)]">
                {selected.resultEyebrow}
              </p>
              <h3 className="mt-3 [font-family:var(--wtf-font-heading,inherit)] text-2xl font-semibold">
                {selected.resultTitle}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wtf-color-muted-foreground,#475569)]">
                {selected.resultBody}
              </p>
              <a
                href={selected.href}
                className="mt-5 inline-flex min-h-11 items-center justify-center bg-[var(--wtf-color-button,#111827)] px-4 text-sm font-semibold text-[var(--wtf-color-button-foreground,#fff)] transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wtf-color-accent,#2563eb)] focus-visible:ring-offset-2"
              >
                {selected.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
