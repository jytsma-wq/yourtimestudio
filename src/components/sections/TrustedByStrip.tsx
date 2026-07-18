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

  return (
    <section className="overflow-hidden border-y border-border bg-card py-6">
      <p className="editorial-kicker text-center text-muted-foreground mb-5">
        {t('label')}
      </p>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-4 md:px-8">
          {clients.map((name, i) => (
            <span
              key={i}
              className="shrink-0 font-sans text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
      </div>
    </section>
  );
}
