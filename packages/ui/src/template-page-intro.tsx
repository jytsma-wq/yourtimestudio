import type { ReactNode } from "react";

import { Container } from "./container";
import { cx } from "./cx";

type TemplatePageIntroProps = {
  title: string;
  intro: string;
  homeHref: string;
  homeLabel: string;
  media: ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
  linkClassName?: string;
  titleClassName?: string;
  introClassName?: string;
  mediaClassName?: string;
};

export function TemplatePageIntro({
  title,
  intro,
  homeHref,
  homeLabel,
  media,
  sectionClassName,
  containerClassName,
  linkClassName,
  titleClassName,
  introClassName,
  mediaClassName
}: TemplatePageIntroProps) {
  return (
    <section className={cx("border-b border-[var(--wtf-color-border,#dbe3ef)]", sectionClassName)}>
      <Container
        className={cx(
          "grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end",
          containerClassName
        )}
      >
        <div>
          <a
            className={cx(
              "text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]",
              linkClassName
            )}
            href={homeHref}
          >
            {homeLabel}
          </a>
          <h1
            className={cx(
              "mt-4 [font-family:var(--wtf-font-heading,inherit)] text-4xl font-semibold leading-tight sm:text-6xl",
              titleClassName
            )}
          >
            {title}
          </h1>
          <p
            className={cx(
              "mt-5 max-w-2xl text-base leading-8 text-[var(--wtf-color-muted-foreground,#475569)]",
              introClassName
            )}
          >
            {intro}
          </p>
        </div>
        <div className={mediaClassName}>{media}</div>
      </Container>
    </section>
  );
}
