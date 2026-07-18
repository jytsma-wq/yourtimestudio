import type { CSSProperties } from "react";

import {
  createRestaurantFineDiningPath,
  defaultContentSourceConfig,
  getRestaurantFineDiningNavigation,
  getRestaurantPage,
  restaurantFineDiningContent,
  restaurantFineDiningDefaultBasePath,
  restaurantFineDiningPageSlugs,
  type RestaurantPageSlug
} from "@website-template-factory/content";
import { createThemeCssVariables } from "@website-template-factory/tokens";
import {
  Button,
  CTASection,
  Card,
  Container,
  DecisionGuide,
  FAQAccordion,
  Footer,
  GalleryGrid,
  Header,
  Hero,
  JsonLd,
  LocationBlock,
  ReservationForm,
  Section,
  ServiceCard,
  SplitSection,
  TestimonialCard
} from "@website-template-factory/ui";
import Image from "next/image";
import Link from "next/link";

export const restaurantFineDiningTemplateConfig = {
  id: "restaurant-01-fine-dining",
  defaultBasePath: restaurantFineDiningDefaultBasePath,
  defaultHeroImage: "/templates/restaurant-01-fine-dining/hero-dining-room.png",
  contentSource: defaultContentSourceConfig.contentSource,
  pageSlugs: restaurantFineDiningPageSlugs,
  locale: restaurantFineDiningContent.locale
} as const;

export type RestaurantFineDiningTemplateProps = {
  slug: RestaurantPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isRestaurantFineDiningSlug(slug: string): slug is RestaurantPageSlug {
  return (restaurantFineDiningPageSlugs as readonly string[]).includes(slug);
}

export function getRestaurantFineDiningSeo(
  slug: RestaurantPageSlug,
  basePath = restaurantFineDiningTemplateConfig.defaultBasePath
) {
  return getRestaurantPage(slug, basePath).seo;
}

export function RestaurantFineDiningTemplate({
  slug,
  basePath = restaurantFineDiningTemplateConfig.defaultBasePath,
  heroImageSrc = restaurantFineDiningTemplateConfig.defaultHeroImage
}: RestaurantFineDiningTemplateProps) {
  const content = restaurantFineDiningContent;
  const themeStyle = createThemeCssVariables("restaurant-01-fine-dining") as CSSProperties;
  const page = getRestaurantPage(slug, basePath);
  const navigation = getRestaurantFineDiningNavigation(basePath);
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
          "@type": "Restaurant",
          name: content.business.name,
          servesCuisine: "Seasonal fine dining",
          url: basePath,
          telephone: content.business.phone,
          address: content.business.address,
          priceRange: "$$$$"
        }}
      />
      <Header
        brand={content.business.name}
        homeHref={basePath}
        items={navigation}
        cta={{
          label: content.hero.primaryCta,
          href: createRestaurantFineDiningPath(basePath, "reservations")
        }}
        className="bg-[#16110d]/95 text-[#f7ead7]"
      />
      {slug === "" ? (
        <RestaurantHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <RestaurantInnerPage
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
          { label: "Contact", href: createRestaurantFineDiningPath(basePath, "contact") }
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

function RestaurantHome({
  basePath,
  heroImageSrc
}: Required<Pick<RestaurantFineDiningTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = restaurantFineDiningContent;

  return (
    <main>
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        primaryCta={{
          label: content.hero.primaryCta,
          href: createRestaurantFineDiningPath(basePath, "reservations")
        }}
        secondaryCta={{
          label: content.hero.secondaryCta,
          href: createRestaurantFineDiningPath(basePath, "menu")
        }}
        aside={
          <div className="grid gap-3 border-l border-[#c7a45a] pl-4 text-sm text-[#cbb9a0]">
            <p className="font-semibold text-[#f7ead7]">{content.hero.serviceNote}</p>
            {content.hero.proofPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        }
        media={<RestaurantHeroMedia heroImageSrc={heroImageSrc} />}
      />

      <DecisionGuide
        eyebrow="Choose the evening"
        title="Different tables ask for different pacing."
        description="Start with the occasion and move to the menu or room that fits it, without turning dinner into a complicated booking flow."
        prompt="What kind of evening are you planning?"
        options={[
          {
            id: "tasting",
            label: "The full tasting",
            resultEyebrow: "Recommended",
            resultTitle: "Five courses at one of two seatings",
            resultBody:
              "Review the current sequence, dietary notice and expected duration before choosing a date.",
            href: createRestaurantFineDiningPath(basePath, "tasting-menu"),
            ctaLabel: "View tasting menu"
          },
          {
            id: "dinner",
            label: "A quieter dinner",
            resultEyebrow: "Recommended",
            resultTitle: "Seasonal menu in the main room",
            resultBody:
              "Browse individual dishes and reserve a standard table for a more flexible evening.",
            href: createRestaurantFineDiningPath(basePath, "menu"),
            ctaLabel: "Browse the menu"
          },
          {
            id: "private",
            label: "A private table",
            resultEyebrow: "Recommended",
            resultTitle: "A separate room for 10-28 guests",
            resultBody:
              "Review capacities, service format and buyout notes before sending an event inquiry.",
            href: createRestaurantFineDiningPath(basePath, "private-dining"),
            ctaLabel: "Plan private dining"
          }
        ]}
        className="bg-[#211913]"
      />

      <Section bleed="dark">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#c7a45a]">
              Seasonal menu
            </p>
            <h2 className="mt-3 max-w-md [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              A compact menu that changes with the market, not the marketing calendar.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#cbb9a0]">
              Menu pages are HTML, readable, and direct. They support conversion without forcing
              guests into image PDFs or vague tasting-menu promises.
            </p>
            <Button
              href={createRestaurantFineDiningPath(basePath, "menu")}
              className="mt-7 rounded-none"
            >
              View the menu
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.signatureDishes.map((dish) => (
              <ServiceCard
                key={dish.title}
                title={dish.title}
                description={dish.description}
                meta={dish.accent}
              />
            ))}
          </div>
        </Container>
      </Section>

      <SplitSection
        title="The room is quiet by design."
        body={
          <>
            <p>
              Nocturne Table is written as a fictional but plausible restaurant: a tight dining
              room, two tasting seatings, restrained service, and private dinners that feel personal
              rather than theatrical.
            </p>
            <Button
              href={createRestaurantFineDiningPath(basePath, "chef-story")}
              variant="secondary"
              className="mt-6 rounded-none"
            >
              Read the chef story
            </Button>
          </>
        }
        media={
          <div className="relative min-h-[26rem] overflow-hidden border border-[#5f472f]">
            <Image
              src={heroImageSrc}
              alt="Atmospheric fine-dining room with a plated dish and warm brass lighting."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        }
        reverse
        className="bg-[#211913] text-[#f7ead7]"
      />

      <Section bleed="dark">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#c7a45a]">
                Gallery
              </p>
              <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
                Food, room, and service moments.
              </h2>
            </div>
            <Button
              href={createRestaurantFineDiningPath(basePath, "gallery")}
              variant="secondary"
              className="rounded-none"
            >
              Open gallery
            </Button>
          </div>
          <GalleryGrid items={content.gallery} />
        </Container>
      </Section>

      <Section className="bg-[#f7ead7] text-[#16110d]">
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

      <CTASection
        title="Reserve the room while the menu is still in season."
        description="The primary path stays simple: view the menu, choose a date, and send a safe mock reservation request."
        primary={{
          label: content.hero.primaryCta,
          href: createRestaurantFineDiningPath(basePath, "reservations")
        }}
        secondary={{
          label: "Private dining",
          href: createRestaurantFineDiningPath(basePath, "private-dining")
        }}
      />
    </main>
  );
}

function RestaurantHeroMedia({ heroImageSrc }: { heroImageSrc: string }) {
  return (
    <div className="relative min-h-[18rem] overflow-hidden border border-[#5f472f] bg-[#211913] shadow-[var(--wtf-shadow-elevated)] md:min-h-[30rem]">
      <Image
        src={heroImageSrc}
        alt="Original atmospheric restaurant image with plated seasonal dish and low-lit dining room."
        fill
        loading="eager"
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 hidden bg-gradient-to-t from-[#16110d] to-transparent p-5 sm:block">
        <p className="max-w-xs text-sm font-semibold text-[#f7ead7]">
          Seasonal tasting menu, two seatings, private dining by inquiry.
        </p>
      </div>
    </div>
  );
}

function RestaurantInnerPage({
  slug,
  title,
  intro,
  basePath,
  heroImageSrc
}: {
  slug: Exclude<RestaurantPageSlug, "">;
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
}) {
  const content = restaurantFineDiningContent;

  return (
    <main>
      <section className="border-b border-[#5f472f] bg-[#16110d] py-14 text-[#f7ead7]">
        <Container>
          <Link className="text-sm font-semibold text-[#c7a45a]" href={basePath}>
            {content.business.name}
          </Link>
          <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#cbb9a0]">{intro}</p>
        </Container>
      </section>

      {slug === "menu" ? <MenuPage /> : null}
      {slug === "tasting-menu" ? <TastingMenuPage /> : null}
      {slug === "chef-story" ? <ChefStoryPage heroImageSrc={heroImageSrc} /> : null}
      {slug === "gallery" ? <GalleryPage /> : null}
      {slug === "private-dining" ? <PrivateDiningPage basePath={basePath} /> : null}
      {slug === "reservations" ? <ReservationsPage /> : null}
      {slug === "contact" ? <ContactPage basePath={basePath} /> : null}
      {slug === "faq" ? (
        <Section className="bg-[#f7ead7] text-[#16110d]">
          <Container className="max-w-3xl">
            <FAQAccordion items={content.faq} />
          </Container>
        </Section>
      ) : null}
    </main>
  );
}

function MenuPage() {
  const content = restaurantFineDiningContent;

  return (
    <Section className="bg-[#f7ead7] text-[#16110d]">
      <Container className="grid gap-6">
        {content.menuSections.map((section) => (
          <article
            key={section.name}
            className="grid gap-6 border-b border-[#cdb89e] pb-8 lg:grid-cols-[0.45fr_1fr]"
          >
            <div>
              <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {section.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#6f5a47]">{section.description}</p>
            </div>
            <div className="grid gap-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="grid gap-2 border border-[#cdb89e] p-4 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6f5a47]">{item.description}</p>
                    {"dietary" in item && item.dietary ? (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#8a6433]">
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

function TastingMenuPage() {
  const content = restaurantFineDiningContent;

  return (
    <Section bleed="dark">
      <Container className="max-w-4xl">
        <div className="grid gap-4">
          {content.tastingMenu.map((course) => (
            <article
              key={course.course}
              className="grid gap-4 border border-[#5f472f] p-5 md:grid-cols-[5rem_1fr]"
            >
              <p className="[font-family:var(--wtf-font-heading)] text-4xl text-[#c7a45a]">
                {course.course}
              </p>
              <div>
                <h2 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                  {course.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#cbb9a0]">{course.note}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ChefStoryPage({ heroImageSrc }: { heroImageSrc: string }) {
  return (
    <SplitSection
      title="A chef-led template without borrowed biography."
      body={
        <div className="grid gap-4">
          <p>
            The chef story is intentionally fictional. It gives buyers a realistic structure for
            culinary point of view, sourcing, and service rhythm without copying a real restaurant
            founder narrative.
          </p>
          <p>
            Use this route for philosophy, team notes, supplier relationships, and practical details
            that make a premium restaurant feel specific.
          </p>
        </div>
      }
      media={<RestaurantHeroMedia heroImageSrc={heroImageSrc} />}
      className="bg-[#211913] text-[#f7ead7]"
    />
  );
}

function GalleryPage() {
  return (
    <Section bleed="dark">
      <Container>
        <GalleryGrid items={restaurantFineDiningContent.gallery} />
      </Container>
    </Section>
  );
}

function PrivateDiningPage({ basePath }: { basePath: string }) {
  const privateDining = restaurantFineDiningContent.privateDining;

  return (
    <Section className="bg-[#f7ead7] text-[#16110d]">
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {privateDining.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#6f5a47]">
            {privateDining.description}
          </p>
          <Button
            href={createRestaurantFineDiningPath(basePath, "reservations")}
            className="mt-7 rounded-none"
          >
            Inquire about private dining
          </Button>
        </div>
        <Card className="rounded-none shadow-none">
          <h3 className="text-lg font-semibold">Private dining details</h3>
          <ul className="mt-4 grid gap-3 text-sm">
            {privateDining.capacities.map((item) => (
              <li key={item} className="border-t border-[#cdb89e] pt-3">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </Section>
  );
}

function ReservationsPage() {
  const content = restaurantFineDiningContent;

  return (
    <Section className="bg-[#f7ead7] text-[#16110d]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Reserve with context.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
            The reservation page keeps the primary conversion route direct while showing validation,
            helper text, and a safe local success state.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-[#6f5a47]">
            {content.business.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
        </div>
        <ReservationForm
          title={content.reservation.title}
          description={content.reservation.description}
          fields={content.reservation.fields}
          successMessage={content.reservation.successMessage}
        />
      </Container>
    </Section>
  );
}

function ContactPage({ basePath }: { basePath: string }) {
  const content = restaurantFineDiningContent;

  return (
    <Section className="bg-[#f7ead7] text-[#16110d]">
      <Container className="grid gap-8 lg:grid-cols-2">
        <Card className="rounded-none shadow-none">
          <LocationBlock
            name={content.business.name}
            address={content.business.address}
            phone={content.business.phone}
            email={content.business.email}
            hours={content.business.hours}
            note="Map integrations should be deferred until needed; this template uses a static location block by default."
          />
        </Card>
        <Card className="rounded-none shadow-none">
          <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            Before you call
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#6f5a47]">
            Keep phone, email, hours, parking notes, and accessibility notes visible in crawlable
            HTML. For launch builds, connect this section to verified business details.
          </p>
          <Button
            href={createRestaurantFineDiningPath(basePath, "reservations")}
            className="mt-6 rounded-none"
          >
            Request a reservation
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
