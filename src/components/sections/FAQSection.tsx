'use client';

import { useTranslations } from 'next-intl';
import Script from 'next/script';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const t = useTranslations('faq');

  const items = [
    { q: t('items.0.q'), a: t('items.0.a') },
    { q: t('items.1.q'), a: t('items.1.a') },
    { q: t('items.2.q'), a: t('items.2.a') },
    { q: t('items.3.q'), a: t('items.3.a') },
    { q: t('items.4.q'), a: t('items.4.a') },
    { q: t('items.5.q'), a: t('items.5.a') },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base md:text-lg font-medium">
              <span className="flex items-baseline">
                <span className="faq-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{item.q}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pl-[3.2em]">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
