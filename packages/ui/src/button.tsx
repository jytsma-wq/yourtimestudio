import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <a
      className={cx(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-center text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)] focus:ring-offset-2",
        variant === "primary"
          ? "bg-[var(--wtf-color-button,#2563eb)] text-[var(--wtf-color-button-foreground,#fff)] hover:opacity-90"
          : "border border-[var(--wtf-color-border,#cbd5e1)] bg-[var(--wtf-color-surface,#fff)] text-[var(--wtf-color-foreground,#111827)] hover:bg-[var(--wtf-color-surface-muted,#f8fafc)]",
        className
      )}
      {...props}
    />
  );
}
