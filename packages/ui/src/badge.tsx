import type { ComponentPropsWithoutRef } from "react";

import { cx } from "./cx";

export function Badge({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cx(
        "inline-flex items-center border border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-surface-muted,#f1f5f9)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--wtf-color-muted-foreground,#475569)]",
        className
      )}
      {...props}
    />
  );
}
