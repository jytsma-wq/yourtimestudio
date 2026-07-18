import type { CSSProperties } from "react";

import {
  createFormValidation,
  createHotelLuxuryPath,
  getHotelLuxuryNavigation,
  getHotelLuxuryPage,
  hotelLuxuryContent,
  hotelLuxuryDefaultBasePath,
  hotelLuxuryPageSlugs,
  type HotelLuxuryPageSlug
} from "@website-template-factory/content";
import { createThemeCssVariables } from "@website-template-factory/tokens";
import {
  Button,
  Card,
  Container,
  DecisionGuide,
  FAQAccordion,
  Footer,
  Header,
  JsonLd,
  LocationBlock,
  ManagedForm,
  Section,
  TestimonialCard
} from "@website-template-factory/ui";
import Image from "next/image";
import Link from "next/link";

export const hotelLuxuryTemplateConfig = {
  id: "hotel-01-luxury",
  defaultBasePath: hotelLuxuryDefaultBasePath,
  defaultHeroImage: "/templates/hotel-01-luxury/hero-suite.png",
  pageSlugs: hotelLuxuryPageSlugs,
  locale: hotelLuxuryContent.locale
} as const;

export type HotelLuxuryTemplateProps = {
  slug: HotelLuxuryPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isHotelLuxurySlug(slug: string): slug is HotelLuxuryPageSlug {
  return (hotelLuxuryPageSlugs as readonly string[]).includes(slug);
}

export function getHotelLuxurySeo(
  slug: HotelLuxuryPageSlug,
  basePath = hotelLuxuryTemplateConfig.defaultBasePath
) {
  return getHotelLuxuryPage(slug, basePath).seo;
}

export function HotelLuxuryTemplate({
  slug,
  basePath = hotelLuxuryTemplateConfig.defaultBasePath,
  heroImageSrc = hotelLuxuryTemplateConfig.defaultHeroImage
}: HotelLuxuryTemplateProps) {
  const content = hotelLuxuryContent;
  const page = getHotelLuxuryPage(slug, basePath);
  const navigation = getHotelLuxuryNavigation(basePath);
  const themeStyle = createThemeCssVariables("hotel-01-luxury") as CSSProperties;
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
          "@type": "Hotel",
          name: content.business.name,
          url: basePath,
          telephone: content.business.phone,
          email: content.business.email,
          address: content.business.address,
          amenityFeature: content.amenities.map((amenity) => amenity.title),
          priceRange: "$$$$"
        }}
      />
      <Header
        brand={content.business.name}
        homeHref={basePath}
        items={navigation}
        cta={{
          label: content.hero.primaryCta,
          href: createHotelLuxuryPath(basePath, "booking")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#cdb89e] bg-[#fffaf2]/95"
      />
      {slug === "" ? (
        <HotelHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <HotelInnerPage
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
          { label: "Contact", href: createHotelLuxuryPath(basePath, "contact") },
          { label: "FAQ", href: createHotelLuxuryPath(basePath, "faq") }
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

function HotelHome({
  basePath,
  heroImageSrc
}: Required<Pick<HotelLuxuryTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = hotelLuxuryContent;

  return (
    <main>
      <section className="relative min-h-[78svh] overflow-hidden">
        <Image
          src={heroImageSrc}
          alt="Original luxury hotel suite with linen bed, stone table, and morning terrace light."
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211813]/82 via-[#211813]/35 to-transparent" />
        <Container className="relative flex min-h-[78svh] items-center pb-12 pt-24">
          <div className="max-w-2xl text-[#fffaf2]">
            <h1 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#f4e8d8] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={createHotelLuxuryPath(basePath, "booking")}
                className="rounded-sm bg-[#fffaf2] text-[#211813] hover:bg-white"
              >
                {content.hero.primaryCta}
              </Button>
              <Button
                href={createHotelLuxuryPath(basePath, "rooms")}
                variant="secondary"
                className="rounded-sm !border-[#fffaf2]/70 !bg-transparent !text-[#fffaf2] hover:!bg-[#fffaf2]/10"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>
            <div className="mt-9 grid gap-3 border-l border-[#d9c8b4] pl-5 text-sm text-[#f4e8d8] md:grid-cols-3 md:border-l-0 md:border-t md:pl-0 md:pt-5">
              {content.hero.proofPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#cdb89e] bg-[#fffaf2] py-5">
        <Container className="grid gap-4 text-sm md:grid-cols-[1.4fr_0.8fr_0.8fr_auto] md:items-center">
          <p className="font-medium leading-6 text-[#6f5a47]">{content.hero.bookingNote}</p>
          <p>
            <span className="block text-xs uppercase tracking-wide text-[#8a6433]">Arrival</span>
            Flexible dates
          </p>
          <p>
            <span className="block text-xs uppercase tracking-wide text-[#8a6433]">Guests</span>
            Suites for 2-4
          </p>
          <Button href={createHotelLuxuryPath(basePath, "booking")} className="rounded-sm">
            Check availability
          </Button>
        </Container>
      </section>

      <DecisionGuide
        eyebrow="Find your stay"
        title="Start with the reason for the trip."
        description="Choose the shape of the stay and move directly to the room, service or booking information that matters most."
        prompt="What are you planning?"
        options={[
          {
            id: "weekend",
            label: "A quiet weekend",
            resultEyebrow: "Suggested path",
            resultTitle: "Signature Suite and breakfast credit",
            resultBody:
              "Compare suite space, flexible arrival notes and the direct-book offer before choosing dates.",
            href: createHotelLuxuryPath(basePath, "rooms/signature-suite"),
            ctaLabel: "View the suite"
          },
          {
            id: "wellness",
            label: "A spa stay",
            resultEyebrow: "Suggested path",
            resultTitle: "Hold treatment time before arrival",
            resultBody:
              "Review spa access, treatment timing and hotel-guest availability alongside the room decision.",
            href: createHotelLuxuryPath(basePath, "spa"),
            ctaLabel: "Plan spa time"
          },
          {
            id: "occasion",
            label: "A special occasion",
            resultEyebrow: "Suggested path",
            resultTitle: "Build the stay around dinner and concierge notes",
            resultBody:
              "Keep dining, transfers and arrival requests together so the occasion feels handled before check-in.",
            href: createHotelLuxuryPath(basePath, "booking"),
            ctaLabel: "Request dates"
          }
        ]}
        className="bg-[#fffaf2]"
      />

      <Section className="bg-[#f7f2ea]">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Suites described like decisions, not inventory.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
              Room content keeps occupancy, size, rate notes, and amenities close to the decision
              path so guests can move from inspiration to booking.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {content.rooms.map((room) => (
              <article
                key={room.name}
                className="border border-[#cdb89e] bg-[#fffaf2] p-5 shadow-[var(--wtf-shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                    {room.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#8a6433]">{room.priceFrom}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#6f5a47]">{room.summary}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-[#cdb89e] py-4 text-sm">
                  <div>
                    <dt className="text-[#6f5a47]">Occupancy</dt>
                    <dd className="font-semibold">{room.sleeps}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6f5a47]">Size</dt>
                    <dd className="font-semibold">{room.size}</dd>
                  </div>
                </dl>
                <ul className="mt-4 grid gap-2 text-sm text-[#6f5a47]">
                  {room.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
                <Button
                  href={createHotelLuxuryPath(basePath, room.slug)}
                  variant="secondary"
                  className="mt-6 w-full rounded-sm"
                >
                  View suite detail
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#211813] text-[#fffaf2]">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Service has its own architecture.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#d9c8b4]">
              Concierge, spa, dining, and rate clarity are presented as one service system rather
              than a stack of interchangeable luxury badges.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.amenities.map((amenity) => (
              <div key={amenity.title} className="border-t border-[#8a6433] pt-4">
                <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                  {amenity.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#d9c8b4]">{amenity.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fffaf2]">
        <Container className="grid gap-6 lg:grid-cols-2">
          <EditorialPanel
            title="Spa hours held for hotel guests."
            text="The spa route is a conversion assist for guests choosing a premium stay, not a separate beauty campaign."
            href={createHotelLuxuryPath(basePath, "spa")}
            cta="Plan spa time"
          />
          <EditorialPanel
            title="Dining without leaving the house."
            text="Dining content covers breakfast, terrace lunch, room service, and an evening table with clear timing."
            href={createHotelLuxuryPath(basePath, "dining")}
            cta="View dining"
          />
        </Container>
      </Section>

      <Section className="bg-[#f7f2ea]">
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
              Concierge-ready experiences.
            </h2>
            <Button
              href={createHotelLuxuryPath(basePath, "experiences")}
              className="mt-6 rounded-sm"
            >
              Explore experiences
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.experiences.map((experience) => (
              <article key={experience.title} className="border-l border-[#8a6433] pl-4">
                <h3 className="font-semibold">{experience.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6f5a47]">{experience.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#fffaf2]">
        <Container className="grid gap-6 md:grid-cols-2">
          {content.testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              context={testimonial.context}
            />
          ))}
        </Container>
      </Section>
    </main>
  );
}

function EditorialPanel({
  title,
  text,
  href,
  cta
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="grid min-h-80 content-between border border-[#cdb89e] bg-[#f7f2ea] p-6">
      <div>
        <h3 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-[#6f5a47]">{text}</p>
      </div>
      <Button href={href} variant="secondary" className="mt-8 w-fit rounded-sm">
        {cta}
      </Button>
    </article>
  );
}

function HotelInnerPage({
  slug,
  title,
  intro,
  basePath,
  heroImageSrc
}: {
  slug: Exclude<HotelLuxuryPageSlug, "">;
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
}) {
  const content = hotelLuxuryContent;

  return (
    <main>
      <section className="border-b border-[#cdb89e] bg-[#fffaf2] py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Link className="text-sm font-semibold text-[#8a6433]" href={basePath}>
              {content.business.name}
            </Link>
            <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
              {title}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#6f5a47]">{intro}</p>
        </Container>
      </section>

      {slug === "rooms" ? <RoomsPage basePath={basePath} /> : null}
      {slug === "rooms/signature-suite" ? (
        <RoomDetailPage basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : null}
      {slug === "dining" ? <DiningPage basePath={basePath} /> : null}
      {slug === "spa" ? <SpaPage basePath={basePath} /> : null}
      {slug === "experiences" ? <ExperiencesPage basePath={basePath} /> : null}
      {slug === "gallery" ? <HotelGalleryPage /> : null}
      {slug === "offers" ? <OffersPage basePath={basePath} /> : null}
      {slug === "booking" ? <BookingPage /> : null}
      {slug === "contact" ? <HotelContactPage basePath={basePath} /> : null}
      {slug === "faq" ? (
        <Section className="bg-[#f7f2ea]">
          <Container className="max-w-3xl">
            <FAQAccordion items={content.faq} />
          </Container>
        </Section>
      ) : null}
    </main>
  );
}

function RoomsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#f7f2ea]">
      <Container className="grid gap-5">
        {hotelLuxuryContent.rooms.map((room) => (
          <article
            key={room.name}
            className="grid gap-5 border border-[#cdb89e] bg-[#fffaf2] p-5 lg:grid-cols-[0.6fr_1fr_auto] lg:items-center"
          >
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {room.name}
            </h2>
            <p className="text-sm leading-7 text-[#6f5a47]">{room.summary}</p>
            <Button href={createHotelLuxuryPath(basePath, room.slug)} className="rounded-sm">
              View details
            </Button>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function RoomDetailPage({ basePath, heroImageSrc }: { basePath: string; heroImageSrc: string }) {
  const room = hotelLuxuryContent.rooms[0];

  return (
    <Section className="bg-[#fffaf2]">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[32rem] overflow-hidden border border-[#cdb89e]">
          <Image
            src={heroImageSrc}
            alt="Luxury hotel signature suite with terrace light and refined linen bed."
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {room.name}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5a47]">{room.summary}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-[#cdb89e] py-4 text-sm">
            <div>
              <dt className="text-[#6f5a47]">Sleeps</dt>
              <dd className="font-semibold">{room.sleeps}</dd>
            </div>
            <div>
              <dt className="text-[#6f5a47]">Size</dt>
              <dd className="font-semibold">{room.size}</dd>
            </div>
            <div>
              <dt className="text-[#6f5a47]">Rate</dt>
              <dd className="font-semibold">{room.priceFrom}</dd>
            </div>
          </dl>
          <ul className="mt-6 grid gap-3 text-sm text-[#6f5a47]">
            {room.amenities.map((amenity) => (
              <li key={amenity} className="border-l border-[#8a6433] pl-3">
                {amenity}
              </li>
            ))}
          </ul>
          <Button href={createHotelLuxuryPath(basePath, "booking")} className="mt-7 rounded-sm">
            Book this suite
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function DiningPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#211813] text-[#fffaf2]">
      <Container className="grid gap-6 md:grid-cols-3">
        {["Breakfast in the library", "Terrace lunch", "In-room evening service"].map((item) => (
          <article key={item} className="border-t border-[#8a6433] pt-5">
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">{item}</h2>
            <p className="mt-4 text-sm leading-7 text-[#d9c8b4]">
              Dining content is crawlable HTML with service hours, dress notes, and booking context
              rather than a static PDF.
            </p>
          </article>
        ))}
        <Button href={createHotelLuxuryPath(basePath, "booking")} className="rounded-sm md:w-fit">
          Add dining note
        </Button>
      </Container>
    </Section>
  );
}

function SpaPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#f7f2ea]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Treatment time is part of the stay.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
            The spa page supports room conversion by showing guest-priority access, treatment types,
            and pre-arrival notes.
          </p>
          <Button href={createHotelLuxuryPath(basePath, "booking")} className="mt-7 rounded-sm">
            Request spa time
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {hotelLuxuryContent.amenities.slice(0, 3).map((amenity) => (
            <Card key={amenity.title} className="rounded-sm shadow-none">
              <h3 className="font-semibold">{amenity.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6f5a47]">{amenity.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ExperiencesPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#fffaf2]">
      <Container className="grid gap-5">
        {hotelLuxuryContent.experiences.map((experience) => (
          <article
            key={experience.title}
            className="grid gap-4 border-b border-[#cdb89e] pb-5 md:grid-cols-[0.45fr_1fr_auto]"
          >
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {experience.title}
            </h2>
            <p className="text-sm leading-7 text-[#6f5a47]">{experience.detail}</p>
            <Button href={createHotelLuxuryPath(basePath, "booking")} variant="secondary">
              Ask concierge
            </Button>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function HotelGalleryPage() {
  return (
    <Section className="bg-[#211813] text-[#fffaf2]">
      <Container className="grid gap-4 md:grid-cols-4">
        {hotelLuxuryContent.gallery.map((item, index) => (
          <figure
            key={item.title}
            className={[
              "min-h-72 border border-[#8a6433] bg-gradient-to-br p-5",
              index === 0
                ? "from-[#5e4a36] via-[#b89a70] to-[#fffaf2] md:col-span-2 md:row-span-2 md:min-h-[36rem]"
                : "from-[#2e251d] via-[#8a6433] to-[#d9c8b4]"
            ].join(" ")}
            role="img"
            aria-label={item.alt}
          >
            <figcaption className="flex h-full items-end text-sm font-semibold uppercase tracking-wide">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </Container>
    </Section>
  );
}

function OffersPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#f7f2ea]">
      <Container className="grid gap-5 md:grid-cols-3">
        {["Stay three nights", "Suite and spa", "Private arrival"].map((offer) => (
          <article key={offer} className="border border-[#cdb89e] bg-[#fffaf2] p-5">
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {offer}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
              Offer terms, blackout dates, taxes, and cancellation details should be editable and
              visible before the booking handoff.
            </p>
            <Button href={createHotelLuxuryPath(basePath, "booking")} className="mt-6 rounded-sm">
              Request offer
            </Button>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function BookingPage() {
  const booking = hotelLuxuryContent.booking;

  return (
    <Section className="bg-[#fffaf2]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Direct booking should feel handled.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
            Keep rate notes, flexible dates, accessibility needs, and concierge requests close to
            the form so guests do not have to hunt for policy details.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-[#6f5a47]">
            {hotelLuxuryContent.business.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
        </div>
        <ManagedForm
          title={booking.title}
          description={booking.description}
          fields={booking.fields}
          submitLabel={booking.submitLabel}
          successMessage={booking.successMessage}
          emptySelectLabel={booking.emptySelectLabel}
          validationMessages={createFormValidation(booking.validation)}
          className="bg-[#f7f2ea]"
        />
      </Container>
    </Section>
  );
}

function HotelContactPage({ basePath }: { basePath: string }) {
  const content = hotelLuxuryContent;

  return (
    <Section className="bg-[#f7f2ea]">
      <Container className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-sm shadow-none">
          <LocationBlock
            name={content.business.name}
            address={content.business.address}
            phone={content.business.phone}
            email={content.business.email}
            hours={content.business.hours}
            note="Static contact details keep the page fast; maps and booking vendors can load only when needed."
          />
        </Card>
        <Card className="rounded-sm shadow-none">
          <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            Arrival notes
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
            Add parking, transfer, accessibility, check-in, and late-arrival details here. Keep
            phone and email visible for fallback conversion.
          </p>
          <Button href={createHotelLuxuryPath(basePath, "booking")} className="mt-6 rounded-sm">
            Request arrival help
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
