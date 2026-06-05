import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site-config';

const placeholderPattern = /^(client|client\s*\d+|logo|logo\s*\d+|placeholder|sample|example|company|business|your client|your logo)$/i;

function hasRealText(value: string | undefined): value is string {
  const text = value?.trim();
  return Boolean(text && !placeholderPattern.test(text));
}

export async function TrustedByStrip() {
  const clients = siteConfig.trust.clientNames
    .map((name) => name.trim())
    .filter(hasRealText);

  if (clients.length === 0) {
    return null;
  }

  const t = await getTranslations('trustedBy');

  return (
    <section className="overflow-hidden border-y border-hairline bg-surface py-6">
      <p className="mono-label mb-5 text-center text-muted">
        {t('label')}
      </p>
      <div className="mx-auto max-w-[var(--container-max-width)] px-[var(--container-padding)]">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {clients.map((name) => (
            <span
              key={name}
              className="font-sans text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function TestimonialsSection() {
  const testimonials = siteConfig.trust.testimonials
    .map((testimonial) => ({
      quote: testimonial.quote.trim(),
      name: testimonial.name.trim(),
      role: testimonial.role?.trim(),
      company: testimonial.company?.trim(),
    }))
    .filter((testimonial) => hasRealText(testimonial.quote) && hasRealText(testimonial.name));

  if (testimonials.length === 0) {
    return null;
  }

  const t = await getTranslations('testimonials');

  return (
    <section className="border-y border-hairline bg-canvas-soft px-[var(--container-padding)] py-16 md:py-24">
      <div className="mx-auto max-w-[var(--container-max-width)]">
        <div className="mb-10 max-w-3xl">
          <p className="mono-label mb-4 text-sea-bright">{t('eyebrow')}</p>
          <h2 className="text-heading-lg text-ink">{t('heading')}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={`${testimonial.name}-${testimonial.company || testimonial.role || 'testimonial'}`} className="rounded-md border border-hairline bg-surface p-5">
              <blockquote className="text-body-sm leading-[1.75] text-ink">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <figcaption className="mt-5 border-t border-hairline pt-4">
                <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                {(testimonial.role || testimonial.company) && (
                  <p className="mt-1 text-sm text-muted">
                    {[testimonial.role, testimonial.company].filter(Boolean).join(' / ')}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
