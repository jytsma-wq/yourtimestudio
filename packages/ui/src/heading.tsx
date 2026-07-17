import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cx } from "./cx";

type HeadingProps<T extends ElementType> = {
  as?: T;
  kicker?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Heading<T extends ElementType = "h2">({
  as,
  kicker,
  children,
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? "h2";

  return (
    <div>
      {kicker ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--wtf-color-accent,#2563eb)]">
          {kicker}
        </p>
      ) : null}
      <Component
        className={cx(
          "text-balance [font-family:var(--wtf-font-heading,inherit)] text-3xl font-bold leading-tight tracking-tight text-[var(--wtf-color-foreground,#111827)] sm:text-4xl",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
