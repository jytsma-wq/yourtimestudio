import { Button } from "./button";
import { Card } from "./card";

type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  features: readonly string[];
  cta?: { label: string; href: string };
};

export function PricingCard({ title, price, description, features, cta }: PricingCardProps) {
  return (
    <Card className="rounded-none shadow-none">
      <h3 className="[font-family:var(--wtf-font-heading,inherit)] text-xl font-semibold">
        {title}
      </h3>
      <p className="mt-3 text-3xl font-bold">{price}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--wtf-color-muted-foreground,#475569)]">
        {description}
      </p>
      <ul className="mt-5 grid gap-2 text-sm">
        {features.map((feature) => (
          <li key={feature} className="border-t border-[var(--wtf-color-border,#dbe3ef)] pt-2">
            {feature}
          </li>
        ))}
      </ul>
      {cta ? (
        <Button href={cta.href} className="mt-6 rounded-none">
          {cta.label}
        </Button>
      ) : null}
    </Card>
  );
}
