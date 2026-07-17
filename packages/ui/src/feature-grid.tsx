import type { ReactNode } from "react";

import { Card } from "./card";
import { Container } from "./container";
import { Heading } from "./heading";
import { Section } from "./section";

export type FeatureItem = {
  title: string;
  description: string;
  meta?: ReactNode;
};

type FeatureGridProps = {
  title: string;
  intro?: string;
  items: readonly FeatureItem[];
};

export function FeatureGrid({ title, intro, items }: FeatureGridProps) {
  return (
    <Section bleed="muted">
      <Container>
        <div className="max-w-2xl">
          <Heading>{title}</Heading>
          {intro ? (
            <p className="mt-4 text-base leading-7 text-[var(--wtf-color-muted-foreground,#475569)]">
              {intro}
            </p>
          ) : null}
        </div>
        <div className="mt-8 grid gap-[var(--wtf-layout-grid-gap,1rem)] md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="rounded-none shadow-none">
              {item.meta ? (
                <div className="mb-4 text-sm font-semibold text-[var(--wtf-color-accent,#2563eb)]">
                  {item.meta}
                </div>
              ) : null}
              <h3 className="[font-family:var(--wtf-font-heading,inherit)] text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--wtf-color-muted-foreground,#475569)]">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
