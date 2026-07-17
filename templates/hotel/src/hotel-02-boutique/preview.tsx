import type { CSSProperties } from "react";

import {
  createFormValidation,
  createHotelBoutiquePath,
  getHotelBoutiqueNavigation,
  getHotelBoutiquePage,
  hotelBoutiqueContent,
  hotelBoutiqueDefaultBasePath,
  hotelBoutiquePageSlugs,
  type HotelBoutiquePageSlug
} from "@website-template-factory/content";
import { createThemeCssVariables } from "@website-template-factory/tokens";
import {
  Button,
  Container,
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
import Link from "next/link";

export const hotelBoutiqueTemplateConfig = {
  id: "hotel-02-boutique",
  defaultBasePath: hotelBoutiqueDefaultBasePath,
  defaultHeroImage: "/templates/hotel-02-boutique/hero-boutique.png",
  pageSlugs: hotelBoutiquePageSlugs,
  locale: hotelBoutiqueContent.locale
} as const;

export type HotelBoutiqueTemplateProps = {
  slug: HotelBoutiquePageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isHotelBoutiqueSlug(slug: string): slug is HotelBoutiquePageSlug {
  return (hotelBoutiquePageSlugs as readonly string[]).includes(slug);
}

export function getHotelBoutiqueSeo(
  slug: HotelBoutiquePageSlug,
  basePath = hotelBoutiqueTemplateConfig.defaultBasePath
) {
  return getHotelBoutiquePage(slug, basePath).seo;
}

export function HotelBoutiqueTemplate({
  slug,
  basePath = hotelBoutiqueTemplateConfig.defaultBasePath,
  heroImageSrc = hotelBoutiqueTemplateConfig.defaultHeroImage
}: HotelBoutiqueTemplateProps) {
  const content = hotelBoutiqueContent;
  const page = getHotelBoutiquePage(slug, basePath);
  const navigation = getHotelBoutiqueNavigation(basePath);
  const themeStyle = createThemeCssVariables("hotel-02-boutique") as CSSProperties;
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
          amenityFeature: content.rooms.flatMap((room) => room.details),
          priceRange: "$$$"
        }}
      />
      <Header
        brand={content.business.name}
        homeHref={basePath}
        items={navigation}
        cta={{
          label: content.hero.primaryCta,
          href: createHotelBoutiquePath(basePath, "booking")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#d8a985] bg-[#fff7ed]/95"
      />
      {slug === "" ? (
        <HotelBoutiqueHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <HotelBoutiqueInnerPage
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
          { label: "Contact", href: createHotelBoutiquePath(basePath, "contact") },
          { label: "FAQ", href: createHotelBoutiquePath(basePath, "faq") }
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

function HotelBoutiqueHome({
  basePath,
  heroImageSrc
}: Required<Pick<HotelBoutiqueTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = hotelBoutiqueContent;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#fff7ed]">
        <Container className="grid min-h-[78svh] gap-8 pb-12 pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#b4532a]">
              Independent boutique hotel
            </p>
            <h1 className="mt-4 max-w-3xl [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#705141] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createHotelBoutiquePath(basePath, "booking")} className="rounded-sm">
                {content.hero.primaryCta}
              </Button>
              <Button
                href={createHotelBoutiquePath(basePath, "neighborhood")}
                variant="secondary"
                className="rounded-sm"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-md border-l border-[#b4532a] pl-4 text-sm leading-7 text-[#705141]">
              {content.hero.editorialNote}
            </p>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden border border-[#d8a985] bg-[#f3ddc8] shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="editorial boutique hotel lobby with terracotta tile, local art, coffee bar, and room key desk."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 bg-[rgba(37,23,20,0.92)] p-4 text-sm text-[#fff7ed] shadow-[var(--wtf-shadow-elevated)] sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#251714] text-[#fff7ed]">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d8a985]">Rooms</p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Rooms that read like a small design archive.
            </h2>
          </div>
          <RoomCards basePath={basePath} dark />
        </Container>
      </Section>

      <Section className="bg-[#fff7ed]">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <NeighborhoodBlocks />
          <div className="border border-[#d8a985] bg-white p-6 shadow-[var(--wtf-shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#b4532a]">Journal</p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              The hotel voice continues after the booking button.
            </h2>
            <div className="mt-7 grid gap-4">
              {content.journal.map((story) => (
                <StoryLink key={story.title} story={story} basePath={basePath} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f3ddc8]">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Weekend offers with reasons to book direct.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#705141]">
              Offers are small and specific: local maps, breakfast credit, weekday work rhythm, and
              terms close enough to the inquiry path.
            </p>
            <Button href={createHotelBoutiquePath(basePath, "offers")} className="mt-7 rounded-sm">
              View offers
            </Button>
          </div>
          <OfferList />
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

type InnerProps = Required<Pick<HotelBoutiqueTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: HotelBoutiquePageSlug;
  title: string;
  intro: string;
};

function HotelBoutiqueInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "rooms" ? <RoomsPage basePath={basePath} /> : null}
      {slug === "rooms/atelier-room" ? <RoomDetailPage basePath={basePath} /> : null}
      {slug === "neighborhood" ? <NeighborhoodPage /> : null}
      {slug === "journal" ? <JournalPage basePath={basePath} /> : null}
      {slug === "gallery" ? <BoutiqueGallery /> : null}
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
      homeLabel="Marlowe House"
      sectionClassName="border-[#d8a985] bg-[#fff7ed]"
      containerClassName="lg:grid-cols-[0.85fr_1.15fr]"
      linkClassName="text-[#b4532a]"
      introClassName="text-[#705141]"
      mediaClassName="relative min-h-64 overflow-hidden border border-[#d8a985]"
      media={
        <Image
          src={heroImageSrc}
          alt="boutique hotel visual with warm local design details."
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function RoomCards({ basePath, dark = false }: { basePath: string; dark?: boolean }) {
  const content = hotelBoutiqueContent;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {content.rooms.map((room, index) => (
        <article
          key={room.name}
          className={
            dark
              ? "border border-[#d8a985] bg-[#fff7ed] p-5 text-[#251714]"
              : "border border-[#d8a985] bg-white p-5 shadow-[var(--wtf-shadow-soft)]"
          }
        >
          <p className="text-sm font-semibold text-[#b4532a]">Room {index + 1}</p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {room.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#705141]">{room.summary}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#d8a985] py-4 text-sm">
            <p>{room.sleeps}</p>
            <p>{room.size}</p>
          </div>
          <p className="mt-4 text-sm font-semibold">{room.priceFrom}</p>
          <Button
            href={createHotelBoutiquePath(basePath, room.slug)}
            variant="secondary"
            className="mt-5 w-full rounded-sm"
          >
            View room
          </Button>
        </article>
      ))}
    </div>
  );
}

function RoomsPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container>
        <RoomCards basePath={basePath} />
      </Container>
    </Section>
  );
}

function RoomDetailPage({ basePath }: { basePath: string }) {
  const room = hotelBoutiqueContent.rooms[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {room.name}, written for guests who unpack.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#705141]">{room.summary}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {room.details.map((detail) => (
              <p key={detail} className="border-l border-[#b4532a] pl-3 text-sm">
                {detail}
              </p>
            ))}
          </div>
        </div>
        <div className="border border-[#d8a985] bg-[#fff7ed] p-6">
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="text-[#705141]">Occupancy</dt>
              <dd className="mt-1 text-2xl font-semibold">{room.sleeps}</dd>
            </div>
            <div>
              <dt className="text-[#705141]">Size</dt>
              <dd className="mt-1 text-2xl font-semibold">{room.size}</dd>
            </div>
            <div>
              <dt className="text-[#705141]">Rate note</dt>
              <dd className="mt-1 text-2xl font-semibold">{room.priceFrom}</dd>
            </div>
          </dl>
          <Button href={createHotelBoutiquePath(basePath, "booking")} className="mt-8 w-full">
            Reserve this room
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function NeighborhoodBlocks() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#b4532a]">
        Neighborhood guide
      </p>
      <h2 className="mt-4 max-w-xl [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        Local recommendations with timing, not filler paragraphs.
      </h2>
      <div className="mt-8 grid gap-4">
        {hotelBoutiqueContent.localHighlights.map((highlight) => (
          <article
            key={highlight.title}
            className="grid gap-3 border-t border-[#d8a985] pt-5 sm:grid-cols-[0.45fr_1fr_auto]"
          >
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {highlight.title}
            </h3>
            <p className="text-sm leading-7 text-[#705141]">{highlight.detail}</p>
            <p className="text-sm font-semibold text-[#b4532a]">{highlight.walk}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function NeighborhoodPage() {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.75fr]">
        <NeighborhoodBlocks />
        <LocationBlock
          name={hotelBoutiqueContent.business.name}
          address={hotelBoutiqueContent.business.address}
          phone={hotelBoutiqueContent.business.phone}
          email={hotelBoutiqueContent.business.email}
          hours={hotelBoutiqueContent.business.hours}
          note="The guide blocks are editable content so a hotel team can keep routes current."
        />
      </Container>
    </Section>
  );
}

function StoryLink({
  story,
  basePath
}: {
  story: (typeof hotelBoutiqueContent.journal)[number];
  basePath: string;
}) {
  return (
    <Link
      href={createHotelBoutiquePath(basePath, "journal")}
      className="block border-t border-[#d8a985] pt-4 focus:outline-none focus:ring-2 focus:ring-[#b4532a]"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#b4532a]">
        {story.category}
      </p>
      <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-2xl font-semibold">
        {story.title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-[#705141]">{story.excerpt}</p>
    </Link>
  );
}

function JournalPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-3">
        {hotelBoutiqueContent.journal.map((story) => (
          <article key={story.title} className="border border-[#d8a985] bg-white p-5">
            <StoryLink story={story} basePath={basePath} />
          </article>
        ))}
      </Container>
    </Section>
  );
}

function BoutiqueGallery() {
  return (
    <Section>
      <Container>
        <div className="grid gap-4 md:grid-cols-4">
          {hotelBoutiqueContent.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={[
                "min-h-72 border border-[#d8a985] bg-[#f3ddc8] p-4",
                index === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[36rem]" : ""
              ].join(" ")}
            >
              <div
                aria-label={item.alt}
                role="img"
                className="flex h-full min-h-64 items-end bg-gradient-to-br from-[#251714] via-[#b4532a] to-[#f3ddc8] p-5"
              >
                <figcaption className="max-w-52 bg-[#fff7ed] p-3 text-sm font-semibold text-[#251714]">
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

function OfferList() {
  return (
    <div className="grid gap-4">
      {hotelBoutiqueContent.hotelOffers.map((offer) => (
        <article key={offer.title} className="border border-[#d8a985] bg-white p-5">
          <p className="text-sm font-semibold text-[#b4532a]">{offer.date}</p>
          <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {offer.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#705141]">{offer.description}</p>
        </article>
      ))}
    </div>
  );
}

function OffersPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Offers should sound like this hotel, not a coupon feed.
          </h2>
          <Button href={createHotelBoutiquePath(basePath, "booking")} className="mt-6 rounded-sm">
            Reserve with an offer
          </Button>
        </div>
        <OfferList />
      </Container>
    </Section>
  );
}

function BookingPage() {
  const content = hotelBoutiqueContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            The form asks for what a small team can actually use.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#705141]">
            Arrival timing, room preference, guests, and local interests are enough for a useful
            reply without adding friction.
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
  const content = hotelBoutiqueContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Late arrivals receive a door code and a front desk follow-up the next morning."
        />
        <div className="min-h-80 border border-[#d8a985] bg-[#f3ddc8] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#b4532a]">
            Map placeholder
          </p>
          <p className="mt-20 max-w-sm [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Alder Mews, coffee bar, gallery loop, river walk.
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
        <FAQAccordion items={hotelBoutiqueContent.faq} />
      </Container>
    </Section>
  );
}
