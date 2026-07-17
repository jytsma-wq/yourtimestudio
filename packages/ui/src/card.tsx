import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cx(
        "rounded-[var(--wtf-radius-md,0.5rem)] border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface,#fff)] p-5 shadow-[var(--wtf-shadow-soft,0_1px_2px_rgba(15,23,42,0.08))]",
        className
      )}
      {...props}
    />
  );
}
