"use client";

import { useState } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: readonly FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-[var(--wtf-color-border,#dbe3ef)] border-y border-[var(--wtf-color-border,#dbe3ef)]">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--wtf-color-accent,#2563eb)]"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>{item.question}</span>
              <span aria-hidden="true">{open ? "-" : "+"}</span>
            </button>
            {open ? (
              <div
                id={panelId}
                className="pb-5 text-sm leading-7 text-[var(--wtf-color-muted-foreground,#475569)]"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
