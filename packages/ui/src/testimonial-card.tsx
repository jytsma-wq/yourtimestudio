import { Card } from "./card";

type TestimonialCardProps = {
  quote: string;
  author: string;
  context?: string;
};

export function TestimonialCard({ quote, author, context }: TestimonialCardProps) {
  return (
    <Card className="rounded-none shadow-none">
      <blockquote className="text-lg leading-8 text-[var(--wtf-color-foreground,#111827)]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="mt-5 text-sm font-semibold">{author}</p>
      {context ? (
        <p className="mt-1 text-sm text-[var(--wtf-color-muted-foreground,#475569)]">{context}</p>
      ) : null}
    </Card>
  );
}
