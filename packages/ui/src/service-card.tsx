import { Card } from "./card";

type ServiceCardProps = {
  title: string;
  description: string;
  meta?: string;
};

export function ServiceCard({ title, description, meta }: ServiceCardProps) {
  return (
    <Card className="rounded-none shadow-none">
      {meta ? (
        <p className="text-sm font-semibold text-[var(--wtf-color-accent,#2563eb)]">{meta}</p>
      ) : null}
      <h3 className="mt-2 [font-family:var(--wtf-font-heading,inherit)] text-xl font-semibold">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--wtf-color-muted-foreground,#475569)]">
        {description}
      </p>
    </Card>
  );
}
