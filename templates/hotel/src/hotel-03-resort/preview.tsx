import type { CSSProperties } from "react";

import {
  appendTemplateNavigationLinks,
  createFormValidation,
  createHotelResortPath,
  getHotelResortNavigation,
  getHotelResortPage,
  hotelResortContent,
  hotelResortDefaultBasePath,
  hotelResortPageSlugs,
  type HotelResortPageSlug
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

export const hotelResortTemplateConfig = {
  id: "hotel-03-resort",
  defaultBasePath: hotelResortDefaultBasePath,
  defaultHeroImage: "/templates/hotel-03-resort/hero-resort.png",
  pageSlugs: hotelResortPageSlugs,
  locale: hotelResortContent.locale
} as const;

export type HotelResortTemplateProps = {
  slug: HotelResortPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isHotelResortSlug(slug: string): slug is HotelResortPageSlug {
  return (hotelResortPageSlugs as readonly string[]).includes(slug);
}

export function getHotelResortSeo(
  slug: HotelResortPageSlug,
  basePath = hotelResortTemplateConfig.defaultBasePath
) {
  return getHotelResortPage(slug, basePath).seo;
}

export function HotelResortTemplate({
  slug,
  basePath = hotelResortTemplateConfig.defaultBasePath,
  heroImageSrc = hotelResortTemplateConfig.defaultHeroImage
}: HotelResortTemplateProps) {
  const content = hotelResortContent;
  const page = getHotelResortPage(slug, basePath);
  const navigation = getHotelResortNavigation(basePath);
  const footerLinks = appendTemplateNavigationLinks(navigation, [
    { label: "Contact", href: createHotelResortPath(basePath, "contact") },
    { label: "FAQ", href: createHotelResortPath(basePath, "faq") }
  ]);
  const themeStyle = createThemeCssVariables("hotel-03-resort") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#f0fbf7] text-[#15342f]"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Resort",
          name: content.business.name,
          url: basePath,
          telephone: content.business.phone,
          email: content.business.email,
          address: content.business.address,
          amenityFeature: content.rooms.flatMap((room) => room.amenities),
          priceRange: "$$$"
        }}
      />
      <Header
        brand={content.business.name}
        homeHref={basePath}
        items={navigation}
        cta={{ label: content.hero.primaryCta, href: createHotelResortPath(basePath, "booking") }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#9bcbbd] bg-[#f0fbf7]/95"
      />
      {slug === "" ? (
        <ResortHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <ResortInnerPage
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
        links={footerLinks}
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

function ResortHome({
  basePath,
  heroImageSrc
}: Required<Pick<HotelResortTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = hotelResortContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#9bcbbd] bg-[#f0fbf7]">
        <Container className="grid min-h-[82svh] gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="pt-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#16876f]">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4c7168] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createHotelResortPath(basePath, "booking")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createHotelResortPath(basePath, "activities")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-xl border-l border-[#16876f] pl-4 text-sm leading-7 text-[#4c7168]">
              {content.hero.planningNote}
            </p>
          </div>
          <div className="relative min-h-[35rem] overflow-hidden rounded-t-[4rem] border border-[#9bcbbd] bg-[#d9f1e9] shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="scenic resort visual with garden pool, villa terrace, coast and family activity board."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[var(--wtf-radius-lg)] bg-white/92 p-4 text-sm shadow-[var(--wtf-shadow-soft)] sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p key={point} className="border-t border-[#16876f] pt-3">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <SectionLead eyebrow="Rooms and villas" title="Stay types explain the whole week." />
          <RoomCards basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#15342f] text-white">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ActivityPanel basePath={basePath} />
          <ItineraryPanel />
        </Container>
      </Section>

      <Section className="bg-[#d9f1e9]">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FamilyPanel />
          <WellnessDiningPanel />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-6 md:grid-cols-2">
          {content.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </Container>
      </Section>
    </main>
  );
}

type InnerProps = Required<Pick<HotelResortTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: HotelResortPageSlug;
  title: string;
  intro: string;
};

function ResortInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "rooms-villas" ? <RoomsPage basePath={basePath} /> : null}
      {slug === "rooms/villa-garden-suite" ? <RoomDetailPage basePath={basePath} /> : null}
      {slug === "activities" ? <ActivitiesPage basePath={basePath} /> : null}
      {slug === "wellness" ? <WellnessPage /> : null}
      {slug === "dining" ? <DiningPage /> : null}
      {slug === "families" ? <FamiliesPage basePath={basePath} /> : null}
      {slug === "gallery" ? <GalleryPage /> : null}
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
      homeLabel={hotelResortContent.business.name}
      sectionClassName="border-[#9bcbbd] bg-[#f0fbf7]"
      linkClassName="text-[#16876f]"
      introClassName="text-[#4c7168]"
      mediaClassName="relative min-h-72 overflow-hidden rounded-t-[3rem] border border-[#9bcbbd]"
      media={
        <Image
          src={heroImageSrc}
          alt="scenic resort visual with garden, pool, villas and activity planning."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function SectionLead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#16876f]">{eyebrow}</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        {title}
      </h2>
    </div>
  );
}

function RoomCards({ basePath }: { basePath: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {hotelResortContent.rooms.map((room) => (
        <article
          key={room.name}
          className="rounded-[var(--wtf-radius-xl)] border border-[#9bcbbd] bg-[#f0fbf7] p-5 shadow-[var(--wtf-shadow-soft)]"
        >
          <p className="text-sm font-semibold text-[#16876f]">{room.sleeps}</p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {room.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#4c7168]">{room.summary}</p>
          <div className="mt-5 grid gap-2 border-y border-[#9bcbbd] py-4 text-sm">
            <p>{room.size}</p>
            <p className="font-semibold">{room.priceFrom}</p>
          </div>
          <Button
            href={createHotelResortPath(basePath, room.slug as HotelResortPageSlug)}
            className="mt-5 w-full"
          >
            View stay
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
  const room = hotelResortContent.rooms[0];

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {room.name} keeps the resort promise practical.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#4c7168]">{room.summary}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {room.amenities.map((amenity) => (
              <p key={amenity} className="rounded-[var(--wtf-radius-md)] bg-white p-4 text-sm">
                {amenity}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-[var(--wtf-radius-xl)] border border-[#9bcbbd] bg-white p-6 shadow-[var(--wtf-shadow-soft)]">
          <dl className="grid gap-5">
            <div>
              <dt className="text-sm text-[#4c7168]">Occupancy</dt>
              <dd className="mt-1 text-3xl font-semibold">{room.sleeps}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#4c7168]">Size</dt>
              <dd className="mt-1 text-3xl font-semibold">{room.size}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#4c7168]">Rate note</dt>
              <dd className="mt-1 text-3xl font-semibold">{room.priceFrom}</dd>
            </div>
          </dl>
          <Button href={createHotelResortPath(basePath, "booking")} className="mt-8 w-full">
            Plan this stay
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function ActivityPanel({ basePath }: { basePath: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#9bcbbd]">Activities</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Activities show timing, age cues and where the day goes next.
      </h2>
      <div className="mt-7 grid gap-4">
        {hotelResortContent.activities.map((activity) => (
          <article key={activity.name} className="border-t border-[#9bcbbd] pt-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {activity.name}
              </h3>
              <p className="text-sm font-semibold text-[#9bcbbd]">{activity.timing}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-[#d9f1e9]">{activity.detail}</p>
          </article>
        ))}
      </div>
      <Button
        href={createHotelResortPath(basePath, "activities")}
        variant="secondary"
        className="mt-7 border-white bg-transparent text-white"
      >
        View activity plan
      </Button>
    </div>
  );
}

function ActivitiesPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#15342f] text-white">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <ActivityPanel basePath={basePath} />
        <ItineraryPanel />
      </Container>
    </Section>
  );
}

function ItineraryPanel() {
  return (
    <div className="rounded-[var(--wtf-radius-xl)] bg-white p-6 text-[#15342f]">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#16876f]">Day rhythm</p>
      <div className="mt-6 grid gap-4">
        {hotelResortContent.itinerary.map((item) => (
          <article key={item.daypart} className="border-t border-[#9bcbbd] pt-4">
            <p className="text-sm font-semibold text-[#16876f]">{item.daypart}</p>
            <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#4c7168]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function WellnessDiningPanel() {
  return (
    <div className="grid gap-4">
      {[...hotelResortContent.wellness, ...hotelResortContent.dining].map((item) => (
        <article key={item.title} className="rounded-[var(--wtf-radius-lg)] bg-white p-5">
          <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#4c7168]">{item.detail}</p>
          {"timing" in item ? (
            <p className="mt-3 text-sm font-semibold text-[#16876f]">{item.timing}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function WellnessPage() {
  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-3">
        {hotelResortContent.wellness.map((item) => (
          <article
            key={item.title}
            className="rounded-[var(--wtf-radius-xl)] border border-[#9bcbbd] bg-white p-6"
          >
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4c7168]">{item.detail}</p>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function DiningPage() {
  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-3">
        {hotelResortContent.dining.map((item) => (
          <article
            key={item.title}
            className="rounded-[var(--wtf-radius-xl)] border border-[#9bcbbd] bg-white p-6"
          >
            <p className="text-sm font-semibold text-[#16876f]">{item.timing}</p>
            <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4c7168]">{item.detail}</p>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function FamilyPanel() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#16876f]">Families</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Family-friendly means details, not cartoons.
      </h2>
      <div className="mt-7 grid gap-4">
        {hotelResortContent.familyAmenities.map((item) => (
          <article key={item.title} className="border-t border-[#9bcbbd] pt-4">
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#4c7168]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FamiliesPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#d9f1e9]">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <FamilyPanel />
        <RoomCards basePath={basePath} />
      </Container>
    </Section>
  );
}

function GalleryPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-4 md:grid-cols-4">
          {hotelResortContent.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={[
                "min-h-72 rounded-[var(--wtf-radius-xl)] border border-[#9bcbbd] bg-[#d9f1e9] p-4",
                index === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[36rem]" : ""
              ].join(" ")}
            >
              <div
                aria-label={item.alt}
                role="img"
                className="flex h-full min-h-64 items-end rounded-[var(--wtf-radius-lg)] bg-[linear-gradient(135deg,#f0fbf7,#9bcbbd_36%,#16876f_37%,#15342f)] p-5"
              >
                <figcaption className="max-w-52 rounded-[var(--wtf-radius-md)] bg-white p-3 text-sm font-semibold">
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
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Offers are written as stay plans, not coupons.
          </h2>
          <Button href={createHotelResortPath(basePath, "booking")} className="mt-7">
            Ask about offers
          </Button>
        </div>
        <div className="grid gap-4">
          {hotelResortContent.hotelOffers.map((offer) => (
            <article
              key={offer.title}
              className="rounded-[var(--wtf-radius-xl)] border border-[#9bcbbd] bg-white p-6"
            >
              <p className="text-sm font-semibold text-[#16876f]">{offer.date}</p>
              <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {offer.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#4c7168]">{offer.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BookingPage() {
  const content = hotelResortContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            The booking route starts a plan, not a fake rate search.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#4c7168]">
            Dates, guests, stay focus and planning notes are enough for a useful resort reply
            without pretending the static demo has room inventory.
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
          className="rounded-[var(--wtf-radius-xl)] bg-white shadow-[var(--wtf-shadow-soft)]"
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = hotelResortContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Transfer desk timing, family arrival needs and activity signups should be verified before launch."
        />
        <div className="min-h-80 rounded-t-[3rem] border border-[#9bcbbd] bg-[#d9f1e9] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#16876f]">
            Arrival map
          </p>
          <p className="mt-20 max-w-sm [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Coast road, garden gate, pool path, transfer desk.
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
        <FAQAccordion items={hotelResortContent.faq} />
      </Container>
    </Section>
  );
}
