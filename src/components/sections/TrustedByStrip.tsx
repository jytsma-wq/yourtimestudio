import { getTranslations } from 'next-intl/server';

export async function TrustedByStrip() {
  const t = await getTranslations('trustedBy');

  const clients = [
    t('client0'),
    t('client1'),
    t('client2'),
    t('client3'),
    t('client4'),
    t('client5'),
  ];

  // Duplicate the list for seamless infinite scroll
  const marqueeItems = [...clients, ...clients];

  return (
    <section className="border-y border-border bg-card py-6 overflow-hidden">
      <p className="editorial-kicker text-center text-muted-foreground mb-5">
        {t('label')}
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((name, i) => (
            <span
              key={i}
              className="mx-8 shrink-0 font-sans text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {name} <span className="ml-8 text-brand-serene-coral-darken">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
