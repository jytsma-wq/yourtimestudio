import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  bleed?: "surface" | "muted" | "dark";
};

export function Section({ bleed = "surface", className, ...props }: SectionProps) {
  return (
    <section
      className={cx(
        "py-[var(--wtf-spacing-section,4rem)]",
        bleed === "surface" &&
          "bg-[var(--wtf-color-surface,#fff)] text-[var(--wtf-color-foreground,#111827)]",
        bleed === "muted" &&
          "bg-[var(--wtf-color-surface-muted,#f1f5f9)] text-[var(--wtf-color-foreground,#111827)]",
        bleed === "dark" &&
          "bg-[var(--wtf-color-background,#111827)] text-[var(--wtf-color-foreground,#fff)]",
        className
      )}
      {...props}
    />
  );
}
