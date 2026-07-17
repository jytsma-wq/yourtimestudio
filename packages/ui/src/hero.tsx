import type { ReactNode } from "react";

import { Button } from "./button";
import { Container } from "./container";
import { cx } from "./cx";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  aside?: ReactNode;
  media?: ReactNode;
  className?: string;
};

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  aside,
  media,
  className
}: HeroProps) {
  return (
    <section
      className={cx(
        "relative overflow-hidden bg-[var(--wtf-color-background,#111827)] text-[var(--wtf-color-foreground,#fff)]",
        className
      )}
    >
      <Container className="relative grid min-h-0 gap-8 py-10 md:min-h-[calc(86svh-4rem)] md:grid-cols-[1fr_0.9fr] md:items-center md:gap-10 md:py-14 lg:gap-16">
        <div className="relative z-10">
          <h1 className="max-w-3xl text-balance [font-family:var(--wtf-font-heading,inherit)] text-4xl font-bold leading-tight tracking-tight sm:text-6xl sm:leading-[0.95] lg:text-7xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--wtf-color-muted-foreground,#cbd5e1)] md:mt-6 md:text-lg md:leading-8">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
            {primaryCta ? (
              <Button href={primaryCta.href} className="rounded-none">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="secondary" className="rounded-none">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
          {aside ? <div className="mt-5 md:mt-8">{aside}</div> : null}
        </div>
        {media ? (
          <div className="max-sm:pointer-events-none max-sm:absolute max-sm:inset-0 max-sm:z-0 max-sm:opacity-30 sm:relative">
            {media}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
