import type { ReactNode } from "react";

import { Container } from "./container";
import { cx } from "./cx";
import { Heading } from "./heading";
import { Section } from "./section";

type SplitSectionProps = {
  title: string;
  body: ReactNode;
  media: ReactNode;
  kicker?: string;
  reverse?: boolean;
  className?: string;
};

export function SplitSection({
  title,
  body,
  media,
  kicker,
  reverse = false,
  className
}: SplitSectionProps) {
  return (
    <Section className={className}>
      <Container
        className={cx(
          "grid gap-8 lg:grid-cols-2 lg:items-center",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div>
          <Heading kicker={kicker}>{title}</Heading>
          <div className="mt-5 text-base leading-7 text-[var(--wtf-color-muted-foreground,#475569)]">
            {body}
          </div>
        </div>
        <div>{media}</div>
      </Container>
    </Section>
  );
}
