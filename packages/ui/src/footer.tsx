import type { ReactNode } from "react";

import { Container } from "./container";
import type { NavigationItem } from "./mobile-navigation";

type FooterProps = {
  brand: ReactNode;
  summary: string;
  links: readonly NavigationItem[];
  contact?: ReactNode;
};

export function Footer({ brand, summary, links, contact }: FooterProps) {
  return (
    <footer className="border-t border-[var(--wtf-color-border,#dbe3ef)] bg-[var(--wtf-color-background,#111827)] py-10 text-[var(--wtf-color-foreground,#fff)]">
      <Container className="grid gap-8 md:grid-cols-[1fr_1fr_0.8fr]">
        <div>
          <p className="[font-family:var(--wtf-font-heading,inherit)] text-xl font-semibold">
            {brand}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--wtf-color-muted-foreground,#cbd5e1)]">
            {summary}
          </p>
        </div>
        <nav aria-label="Footer navigation" className="grid gap-2 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm text-[var(--wtf-color-muted-foreground,#cbd5e1)] hover:text-[var(--wtf-color-foreground,#fff)] focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        {contact ? (
          <div className="text-sm leading-6 text-[var(--wtf-color-muted-foreground,#cbd5e1)]">
            {contact}
          </div>
        ) : null}
      </Container>
    </footer>
  );
}
