import type { CSSProperties } from "react";

import {
  createFormValidation,
  createRestaurantBistroPath,
  getRestaurantBistroNavigation,
  getRestaurantBistroPage,
  restaurantBistroContent,
  restaurantBistroDefaultBasePath,
  restaurantBistroPageSlugs,
  type RestaurantBistroPageSlug
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

export const restaurantBistroTemplateConfig = {
  id: "restaurant-02-bistro",
  defaultBasePath: restaurantBistroDefaultBasePath,
  defaultHeroImage: "/templates/restaurant-02-bistro/hero-bistro.png",
  pageSlugs: restaurantBistroPageSlugs,
  locale: restaurantBistroContent.locale
} as const;

export type RestaurantBistroTemplateProps = {
  slug: RestaurantBistroPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isRestaurantBistroSlug(slug: string): slug is RestaurantBistroPageSlug {
  return (restaurantBistroPageSlugs as readonly string[]).includes(slug);
}

export function getRestaurantBistroSeo(
  slug: RestaurantBistroPageSlug,
  basePath = restaurantBistroTemplateConfig.defaultBasePath
) {
  return getRestaurantBistroPage(slug, basePath).seo;
}

export function RestaurantBistroTemplate({
  slug,
  basePath = restaurantBistroTemplateConfig.defaultBasePath,
  heroImageSrc = restaurantBistroTemplateConfig.defaultHeroImage
}: RestaurantBistroTemplateProps) {
  const content = restaurantBistroContent;
  const page = getRestaurantBistroPage(slug, basePath);
  const navigation = getRestaurantBistroNavigation(basePath);
  const themeStyle = createThemeCssVariables("restaurant-02-bistro") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#fff8ed] text-[#2a1d16]"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: content.business.name,
          servesCuisine: "Seasonal neighborhood bistro",
          url: basePath,
          telephone: content.business.phone,
          email: content.business.email,
          address: content.business.address,
          priceRange: "$$"
        }}
      />
      <Header
        brand={content.business.name}
        homeHref={basePath}
        items={navigation}
        cta={{
          label: content.hero.primaryCta,
          href: createRestaurantBistroPath(basePath, "reservations")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#caab86] bg-[#fff8ed]/95"
      />
      {slug === "" ? (
        <BistroHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <BistroInnerPage
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
          { label: "Contact", href: createRestaurantBistroPath(basePath, "contact") },
          { label: "FAQ", href: createRestaurantBistroPath(basePath, "faq") }
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

function BistroHome({
  basePath,
  heroImageSrc
}: Required<Pick<RestaurantBistroTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = restaurantBistroContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#caab86] bg-[#fff8ed]">
        <Container className="grid min-h-[76svh] gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="pt-14">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#9c5b2c]">
              Neighborhood bistro
            </p>
            <h1 className="mt-4 max-w-3xl [font-family:var(--wtf-font-heading)] text-[2.75rem] font-normal leading-[1.03] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6d513b]">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createRestaurantBistroPath(basePath, "reservations")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createRestaurantBistroPath(basePath, "menu")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 rounded-[var(--wtf-radius-md)] border border-[#caab86] bg-white px-4 py-3 text-sm leading-7 text-[#6d513b] shadow-[var(--wtf-shadow-soft)]">
              {content.hero.serviceNote}
            </p>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden rounded-[var(--wtf-radius-xl)] border border-[#caab86] bg-[#f0dfc9] shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="warm bistro image with window table, chalkboard menu, wine glass and seasonal plate."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[var(--wtf-radius-md)] bg-[#fff8ed]/95 p-4 text-sm shadow-[var(--wtf-shadow-soft)] sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#2f5f45] text-white">
        <Container className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#f0dfc9]">
              Seasonal menu
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-normal leading-tight">
              The menu looks like a working restaurant, not a tasting manifesto.
            </h2>
            <Button
              href={createRestaurantBistroPath(basePath, "menu")}
              variant="secondary"
              className="mt-7 border-white bg-transparent text-white"
            >
              Open menu
            </Button>
          </div>
          <MenuPreview />
        </Container>
      </Section>

      <Section className="bg-[#fff8ed]">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SpecialsList />
          <EventsPanel basePath={basePath} />
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

type InnerProps = Required<Pick<RestaurantBistroTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: RestaurantBistroPageSlug;
  title: string;
  intro: string;
};

function BistroInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "menu" ? <MenuPage /> : null}
      {slug === "about" ? <AboutPage /> : null}
      {slug === "events" ? <EventsPage basePath={basePath} /> : null}
      {slug === "gallery" ? <GalleryPage /> : null}
      {slug === "reservations" ? <ReservationsPage /> : null}
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
      homeLabel="June & Bay Bistro"
      sectionClassName="border-[#caab86] bg-[#fff8ed]"
      linkClassName="text-[#9c5b2c]"
      titleClassName="font-normal"
      introClassName="text-[#6d513b]"
      mediaClassName="relative min-h-72 overflow-hidden rounded-[var(--wtf-radius-lg)] border border-[#caab86]"
      media={
        <Image
          src={heroImageSrc}
          alt="warm bistro visual with table, menu and wine shelf."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function MenuPreview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {restaurantBistroContent.menuSections.map((section) => (
        <article
          key={section.name}
          className="rounded-[var(--wtf-radius-lg)] border border-[#f0dfc9] bg-[#fff8ed] p-5 text-[#2a1d16]"
        >
          <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-normal">
            {section.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#6d513b]">{section.description}</p>
          <p className="mt-5 text-sm font-semibold text-[#9c5b2c]">{section.items.length} items</p>
        </article>
      ))}
    </div>
  );
}

function MenuPage() {
  const content = restaurantBistroContent;

  return (
    <Section>
      <Container className="grid gap-7">
        {content.menuSections.map((section) => (
          <article
            key={section.name}
            className="grid gap-6 border-b border-[#caab86] pb-8 lg:grid-cols-[0.42fr_1fr]"
          >
            <div>
              <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-normal">
                {section.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#6d513b]">{section.description}</p>
            </div>
            <div className="grid gap-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-3 rounded-[var(--wtf-radius-md)] border border-[#caab86] bg-white p-4 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6d513b]">{item.description}</p>
                    {"dietary" in item && item.dietary ? (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#9c5b2c]">
                        {item.dietary.join(" / ")}
                      </p>
                    ) : null}
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function SpecialsList() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#9c5b2c]">Daily specials</p>
      <h2 className="mt-4 max-w-xl [font-family:var(--wtf-font-heading)] text-4xl font-normal leading-tight">
        Specials make the restaurant feel current without hiding the menu.
      </h2>
      <div className="mt-8 grid gap-4">
        {restaurantBistroContent.specials.map((special) => (
          <article
            key={special.day}
            className="grid gap-4 rounded-[var(--wtf-radius-lg)] border border-[#caab86] bg-white p-5 sm:grid-cols-[7rem_1fr]"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[#9c5b2c]">
              {special.day}
            </p>
            <div>
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-normal">
                {special.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6d513b]">{special.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function EventsPanel({ basePath }: { basePath: string }) {
  return (
    <div className="rounded-[var(--wtf-radius-xl)] border border-[#caab86] bg-white p-6 shadow-[var(--wtf-shadow-soft)]">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#9c5b2c]">Events</p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-normal">
        Small events for guests who already know the room.
      </h2>
      <div className="mt-7 grid gap-4">
        {restaurantBistroContent.events.map((event) => (
          <article key={event.title} className="border-t border-[#caab86] pt-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-normal">
                {event.title}
              </h3>
              <p className="text-sm font-semibold text-[#2f5f45]">{event.date}</p>
            </div>
            <p className="mt-1 text-sm font-semibold text-[#9c5b2c]">{event.time}</p>
            <p className="mt-2 text-sm leading-7 text-[#6d513b]">{event.description}</p>
          </article>
        ))}
      </div>
      <Button href={createRestaurantBistroPath(basePath, "events")} className="mt-7">
        See events
      </Button>
    </div>
  );
}

function EventsPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-normal">
            Events should support reservations, not distract from them.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6d513b]">
            Each event block has a date, time, short promise and clear path back to the reservation
            flow.
          </p>
          <Button href={createRestaurantBistroPath(basePath, "reservations")} className="mt-7">
            Reserve for an event
          </Button>
        </div>
        <EventsPanel basePath={basePath} />
      </Container>
    </Section>
  );
}

function AboutPage() {
  return (
    <Section className="bg-[#2f5f45] text-white">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="[font-family:var(--wtf-font-heading)] text-5xl font-normal leading-tight">
          A bistro story can be local without becoming precious.
        </h2>
        <div className="grid gap-5 text-sm leading-7 text-[#f0dfc9]">
          <p>
            June & Bay is fictional. The story focuses on lunch, dinner, regular guests, wine by the
            glass and events instead of copying a chef biography or fine-dining language.
          </p>
          <p>
            The structure gives buyers room for sourcing notes, team tone, local events and
            practical reservation details close to conversion.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function GalleryPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-4 md:grid-cols-4">
          {restaurantBistroContent.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={[
                "min-h-72 rounded-[var(--wtf-radius-lg)] border border-[#caab86] bg-[#f0dfc9] p-4",
                index === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[36rem]" : ""
              ].join(" ")}
            >
              <div
                aria-label={item.alt}
                role="img"
                className="flex h-full min-h-64 items-end rounded-[var(--wtf-radius-md)] bg-[linear-gradient(135deg,#fff8ed,#caab86_38%,#9c5b2c_39%,#2f5f45)] p-5"
              >
                <figcaption className="max-w-52 rounded-[var(--wtf-radius-sm)] bg-[#fff8ed] p-3 text-sm font-semibold text-[#2a1d16]">
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

function ReservationsPage() {
  const content = restaurantBistroContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-normal">
            The form asks for enough detail to seat the table.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#6d513b]">
            Date, time, party size, occasion and guest notes keep the request useful without
            collecting sensitive information or pretending to show live inventory.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-[#6d513b]">
            {content.business.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
        </div>
        <ManagedForm
          title={content.reservation.title}
          description={content.reservation.description}
          fields={content.reservation.fields}
          submitLabel={content.reservation.submitLabel}
          successMessage={content.reservation.successMessage}
          emptySelectLabel={content.reservation.emptySelectLabel}
          validationMessages={createFormValidation(content.reservation.validation)}
          className="rounded-[var(--wtf-radius-lg)] bg-white shadow-[var(--wtf-shadow-soft)]"
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = restaurantBistroContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Transit, sidewalk seating, walk-in and access notes should be verified before launch."
        />
        <div className="min-h-80 rounded-[var(--wtf-radius-xl)] border border-[#caab86] bg-[#f0dfc9] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#9c5b2c]">
            Map placeholder
          </p>
          <p className="mt-20 max-w-sm [font-family:var(--wtf-font-heading)] text-4xl font-normal">
            Bay Street, corner window, lunch regulars, dinner after five.
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
        <FAQAccordion items={restaurantBistroContent.faq} />
      </Container>
    </Section>
  );
}
