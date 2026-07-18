import { Button } from "./button";
import { Container } from "./container";

type CTASectionProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTASection({ title, description, primary, secondary }: CTASectionProps) {
  return (
    <section className="bg-[var(--wtf-color-background,#111827)] py-[var(--wtf-spacing-section,4rem)] text-[var(--wtf-color-foreground,#fff)]">
      <Container className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="max-w-2xl [font-family:var(--wtf-font-heading,inherit)] text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wtf-color-muted-foreground,#cbd5e1)]">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={primary.href} className="rounded-none">
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="secondary" className="rounded-none">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
