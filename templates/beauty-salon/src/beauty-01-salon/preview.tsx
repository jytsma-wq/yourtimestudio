import type { CSSProperties } from "react";

import {
  beautySalonContent,
  beautySalonDefaultBasePath,
  beautySalonPageSlugs,
  createBeautySalonPath,
  createFormValidation,
  getBeautySalonNavigation,
  getBeautySalonPage,
  type BeautySalonPageSlug
} from "@website-template-factory/content";
import { createThemeCssVariables } from "@website-template-factory/tokens";
import {
  Button,
  Container,
  DecisionGuide,
  FAQAccordion,
  Footer,
  Header,
  JsonLd,
  LocationBlock,
  ManagedForm,
  Section,
  TemplatePageIntro,
  TestimonialCard
} from "@website-template-factory/ui";
import Image from "next/image";

export const beautySalonTemplateConfig = {
  id: "beauty-01-salon",
  defaultBasePath: beautySalonDefaultBasePath,
  defaultHeroImage: "/templates/beauty-01-salon/hero-salon.png",
  pageSlugs: beautySalonPageSlugs,
  locale: beautySalonContent.locale
} as const;

export type BeautySalonTemplateProps = {
  slug: BeautySalonPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isBeautySalonSlug(slug: string): slug is BeautySalonPageSlug {
  return (beautySalonPageSlugs as readonly string[]).includes(slug);
}

export function getBeautySalonSeo(
  slug: BeautySalonPageSlug,
  basePath = beautySalonTemplateConfig.defaultBasePath
) {
  return getBeautySalonPage(slug, basePath).seo;
}

export function BeautySalonTemplate({
  slug,
  basePath = beautySalonTemplateConfig.defaultBasePath,
  heroImageSrc = beautySalonTemplateConfig.defaultHeroImage
}: BeautySalonTemplateProps) {
  const content = beautySalonContent;
  const page = getBeautySalonPage(slug, basePath);
  const navigation = getBeautySalonNavigation(basePath);
  const themeStyle = createThemeCssVariables("beauty-01-salon") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[var(--wtf-color-background)] text-[var(--wtf-color-foreground)]"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          name: content.business.name,
          url: basePath,
          telephone: content.business.phone,
          email: content.business.email,
          address: content.business.address
        }}
      />
      <Header
        brand={content.business.name}
        homeHref={basePath}
        items={navigation}
        cta={{
          label: content.hero.primaryCta,
          href: createBeautySalonPath(basePath, "booking")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#dca8ba] bg-[#fff5f7]/95"
      />
      {slug === "" ? (
        <BeautySalonHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <BeautySalonInnerPage
          slug={slug}
          title={page.title}
          intro={page.intro}
          basePath={basePath}
          heroImageSrc={heroImageSrc}
        />
      )}
      <Footer
        brand={content.business.name}
        summary={content.business.tagline}
        links={[
          ...navigation,
          { label: "Contact", href: createBeautySalonPath(basePath, "contact") },
          { label: "FAQ", href: createBeautySalonPath(basePath, "faq") }
        ]}
        contact={
          <div>
            <p>{content.business.address}</p>
            <p className="mt-2">{content.business.phone}</p>
            <p>{content.business.email}</p>
          </div>
        }
      />
    </div>
  );
}

function BeautySalonHome({
  basePath,
  heroImageSrc
}: Required<Pick<BeautySalonTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = beautySalonContent;

  return (
    <main>
      <section className="overflow-hidden bg-[#221923] text-white">
        <Container className="grid min-h-[78svh] gap-8 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#f5e0e6]">
              Cuts, colour, brows, styling
            </p>
            <h1 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f5e0e6] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={createBeautySalonPath(basePath, "booking")}
                className="!bg-white !text-[#221923]"
              >
                {content.hero.primaryCta}
              </Button>
              <Button
                href={createBeautySalonPath(basePath, "services")}
                variant="secondary"
                className="!border-white/60 !bg-transparent !text-white hover:!bg-white/10"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>
          </div>
          <div className="relative min-h-[35rem] border border-[#dca8ba] bg-[#fff5f7]">
            <Image
              src={heroImageSrc}
              alt="fashion-forward salon station with copper colour swatches, mirror, styling chair, and product shelf."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute -bottom-6 left-6 right-6 bg-[#fff5f7] p-5 text-[#221923] shadow-[var(--wtf-shadow-elevated)]">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#c84a74]">
                Booking note
              </p>
              <p className="mt-2 text-sm leading-7">{content.hero.styleNote}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#fff5f7] py-6">
        <Container className="grid gap-4 md:grid-cols-3">
          {content.hero.proofPoints.map((point) => (
            <p key={point} className="border-l border-[#c84a74] pl-4 text-sm leading-6">
              {point}
            </p>
          ))}
        </Container>
      </section>

      <DecisionGuide
        eyebrow="Appointment match"
        title="Book the right amount of time."
        description="Match the appointment to the change you want, then review the stylist and price notes before requesting a slot."
        prompt="What are you coming in for?"
        options={[
          {
            id: "maintain",
            label: "Maintain my cut",
            resultEyebrow: "Best fit",
            resultTitle: "Cut and finish appointment",
            resultBody:
              "Choose a stylist by texture and finish, then book the standard maintenance window.",
            href: createBeautySalonPath(basePath, "stylists"),
            ctaLabel: "Choose a stylist"
          },
          {
            id: "colour",
            label: "Change my colour",
            resultEyebrow: "Best fit",
            resultTitle: "Colour consultation before service",
            resultBody:
              "Review colour history, timing and price-from notes before a longer appointment is confirmed.",
            href: createBeautySalonPath(basePath, "services/copper-gloss-colour"),
            ctaLabel: "View colour service"
          },
          {
            id: "occasion",
            label: "Style for an event",
            resultEyebrow: "Best fit",
            resultTitle: "Styling with an occasion note",
            resultBody:
              "Share timing, outfit direction and finish preferences when requesting the appointment.",
            href: createBeautySalonPath(basePath, "booking"),
            ctaLabel: "Request styling"
          }
        ]}
        className="bg-[#fff5f7]"
      />

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Service clarity with a salon pace.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#6e4d5a]">
              The first screen points to booking, but the next decision is practical: service,
              timing, stylist, and price-from expectations.
            </p>
          </div>
          <ServiceList basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#f5e0e6]">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <StylistGrid />
          <div className="self-center">
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Stylist choice is part of conversion.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#6e4d5a]">
              Profiles are brief enough to scan and specific enough to guide new client bookings.
            </p>
            <Button href={createBeautySalonPath(basePath, "stylists")} className="mt-7">
              Meet stylists
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#221923] text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
              Price notes before the form.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#f5e0e6]">
              Pricing is close to booking so clients understand why colour and corrective work need
              consultation.
            </p>
          </div>
          <PricingTable />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-4 md:grid-cols-2">
          {content.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </Container>
      </Section>
    </main>
  );
}

type InnerProps = Required<Pick<BeautySalonTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: BeautySalonPageSlug;
  title: string;
  intro: string;
};

function BeautySalonInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "services" ? <ServicesPage basePath={basePath} /> : null}
      {slug === "services/copper-gloss-colour" ? <ServiceDetailPage basePath={basePath} /> : null}
      {slug === "stylists" ? <StylistsPage /> : null}
      {slug === "pricing" ? <PricingPage basePath={basePath} /> : null}
      {slug === "gallery" ? <SalonGallery /> : null}
      {slug === "offers" ? <OffersPage basePath={basePath} /> : null}
      {slug === "booking" ? <BookingPage /> : null}
      {slug === "contact" ? <ContactPage /> : null}
      {slug === "faq" ? <FAQPage /> : null}
    </main>
  );
}

function PageIntro({
  title,
  intro,
  basePath,
  heroImageSrc
}: {
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
}) {
  return (
    <TemplatePageIntro
      title={title}
      intro={intro}
      homeHref={basePath}
      homeLabel="Roux & Row Salon"
      sectionClassName="border-[#dca8ba] bg-[#fff5f7]"
      linkClassName="text-[#c84a74]"
      introClassName="text-[#6e4d5a]"
      mediaClassName="relative min-h-64 overflow-hidden border border-[#dca8ba]"
      media={
        <Image
          src={heroImageSrc}
          alt="salon visual with copper colour, mirror, and styling tools."
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function ServiceList({ basePath }: { basePath: string }) {
  return (
    <div className="grid gap-4">
      {beautySalonContent.services.map((service, index) => (
        <article
          key={service.name}
          className="grid gap-4 border border-[#dca8ba] bg-[#fff5f7] p-5 md:grid-cols-[4rem_1fr_auto]"
        >
          <p className="[font-family:var(--wtf-font-heading)] text-4xl text-[#c84a74]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {service.name}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6e4d5a]">{service.summary}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{service.duration}</p>
            <p className="text-[#6e4d5a]">{service.priceFrom}</p>
            <Button
              href={createBeautySalonPath(basePath, service.slug)}
              variant="secondary"
              className="mt-4"
            >
              Details
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ServicesPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            A menu built for booking, not browsing forever.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#6e4d5a]">
            Services include timing and price-from notes so guests can choose a realistic starting
            point.
          </p>
        </div>
        <ServiceList basePath={basePath} />
      </Container>
    </Section>
  );
}

function ServiceDetailPage({ basePath }: { basePath: string }) {
  const service = beautySalonContent.services[0];

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {service.name}: colour with a maintenance plan.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#6e4d5a]">{service.summary}</p>
          <p className="mt-5 border-l border-[#c84a74] pl-4 text-sm leading-7 text-[#6e4d5a]">
            New colour clients should book consultation timing so patch testing, condition, and
            pricing can be confirmed.
          </p>
        </div>
        <div className="grid gap-4">
          {["Consult", "Gloss and tone", "Blow-dry finish", "Home-care note"].map((step) => (
            <p key={step} className="border border-[#dca8ba] bg-white p-4 text-sm font-semibold">
              {step}
            </p>
          ))}
          <Button href={createBeautySalonPath(basePath, "booking")}>Book this service</Button>
        </div>
      </Container>
    </Section>
  );
}

function StylistGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {beautySalonContent.stylists.map((stylist) => (
        <article key={stylist.name} className="border border-[#dca8ba] bg-white p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#c84a74]">
            {stylist.role}
          </p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {stylist.name}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#6e4d5a]">{stylist.focus}</p>
        </article>
      ))}
    </div>
  );
}

function StylistsPage() {
  return (
    <Section>
      <Container>
        <StylistGrid />
      </Container>
    </Section>
  );
}

function PricingTable() {
  return (
    <div className="grid gap-3">
      {beautySalonContent.pricing.map((item) => (
        <article
          key={item.service}
          className="grid gap-3 border-b border-[#dca8ba] pb-4 text-sm md:grid-cols-[0.55fr_0.25fr_1fr]"
        >
          <h3 className="font-semibold">{item.service}</h3>
          <p>{item.price}</p>
          <p className="text-[#f5e0e6]">{item.note}</p>
        </article>
      ))}
    </div>
  );
}

function PricingPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#221923] text-white">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Price-from notes make the form easier.
          </h2>
          <Button
            href={createBeautySalonPath(basePath, "booking")}
            className="mt-7 !bg-white !text-[#221923]"
          >
            Book treatment
          </Button>
        </div>
        <PricingTable />
      </Container>
    </Section>
  );
}

function SalonGallery() {
  return (
    <Section>
      <Container>
        <div className="grid gap-4 md:grid-cols-4">
          {beautySalonContent.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={[
                "min-h-72 border border-[#dca8ba] bg-[#f5e0e6] p-4",
                index === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[36rem]" : ""
              ].join(" ")}
            >
              <div
                aria-label={item.alt}
                role="img"
                className="flex h-full min-h-64 items-end bg-gradient-to-br from-[#221923] via-[#c84a74] to-[#f5e0e6] p-5"
              >
                <figcaption className="bg-white p-3 text-sm font-semibold text-[#221923]">
                  {item.title}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function OffersPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Offers for appointment behavior, not vague discounting.
          </h2>
          <Button href={createBeautySalonPath(basePath, "booking")} className="mt-7">
            Request appointment
          </Button>
        </div>
        <div className="grid gap-4">
          {beautySalonContent.offers.map((offer) => (
            <article key={offer.title} className="border border-[#dca8ba] bg-white p-5">
              <p className="text-sm font-semibold text-[#c84a74]">{offer.date}</p>
              <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {offer.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6e4d5a]">{offer.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BookingPage() {
  const content = beautySalonContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Booking asks for service, timing, and useful notes.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#6e4d5a]">
            The demo form validates locally and leaves deposits, patch testing, and live scheduling
            to launch configuration.
          </p>
        </div>
        <ManagedForm
          title={content.booking.title}
          description={content.booking.description}
          fields={content.booking.fields}
          submitLabel={content.booking.submitLabel}
          successMessage={content.booking.successMessage}
          emptySelectLabel={content.booking.emptySelectLabel}
          validationMessages={createFormValidation(content.booking.validation)}
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = beautySalonContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Colour clients should arrive with current hair history and enough time for consultation."
        />
        <div className="min-h-80 border border-[#dca8ba] bg-[#f5e0e6] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#c84a74]">
            Local salon map
          </p>
          <p className="mt-20 max-w-md [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Damen Arcade, street parking notes, coffee next door, early appointments.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function FAQPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <FAQAccordion items={beautySalonContent.faq} />
      </Container>
    </Section>
  );
}
