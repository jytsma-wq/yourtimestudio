import type { CSSProperties } from "react";

import {
  appendTemplateNavigationLinks,
  createFormValidation,
  createRestaurantFastCasualPath,
  getRestaurantFastCasualNavigation,
  getRestaurantFastCasualPage,
  restaurantFastCasualContent,
  restaurantFastCasualDefaultBasePath,
  restaurantFastCasualPageSlugs,
  type RestaurantFastCasualPageSlug
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

export const restaurantFastCasualTemplateConfig = {
  id: "restaurant-03-fast-casual",
  defaultBasePath: restaurantFastCasualDefaultBasePath,
  defaultHeroImage: "/templates/restaurant-03-fast-casual/hero-fast-casual.png",
  pageSlugs: restaurantFastCasualPageSlugs,
  locale: restaurantFastCasualContent.locale
} as const;

export type RestaurantFastCasualTemplateProps = {
  slug: RestaurantFastCasualPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isRestaurantFastCasualSlug(slug: string): slug is RestaurantFastCasualPageSlug {
  return (restaurantFastCasualPageSlugs as readonly string[]).includes(slug);
}

export function getRestaurantFastCasualSeo(
  slug: RestaurantFastCasualPageSlug,
  basePath = restaurantFastCasualTemplateConfig.defaultBasePath
) {
  return getRestaurantFastCasualPage(slug, basePath).seo;
}

export function RestaurantFastCasualTemplate({
  slug,
  basePath = restaurantFastCasualTemplateConfig.defaultBasePath,
  heroImageSrc = restaurantFastCasualTemplateConfig.defaultHeroImage
}: RestaurantFastCasualTemplateProps) {
  const content = restaurantFastCasualContent;
  const page = getRestaurantFastCasualPage(slug, basePath);
  const navigation = getRestaurantFastCasualNavigation(basePath);
  const footerLinks = appendTemplateNavigationLinks(navigation, [
    { label: "Contact", href: createRestaurantFastCasualPath(basePath, "contact") },
    { label: "FAQ", href: createRestaurantFastCasualPath(basePath, "faq") }
  ]);
  const themeStyle = createThemeCssVariables("restaurant-03-fast-casual") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#fffdf4] text-[#1f2420]"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: content.business.name,
          servesCuisine: "Fast casual bowls and wraps",
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
          href: createRestaurantFastCasualPath(basePath, "order")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#cbd389] bg-[#fffdf4]/95"
      />
      {slug === "" ? (
        <FastCasualHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <FastCasualInnerPage
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

function FastCasualHome({
  basePath,
  heroImageSrc
}: Required<Pick<RestaurantFastCasualTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = restaurantFastCasualContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#cbd389] bg-[#fffdf4]">
        <Container className="grid min-h-[78svh] gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="pt-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d9481e]">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl [font-family:var(--wtf-font-heading)] text-5xl font-bold leading-[0.98] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#58604c]">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createRestaurantFastCasualPath(basePath, "order")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createRestaurantFastCasualPath(basePath, "menu")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-xl border-l-4 border-[#d9481e] bg-white p-4 text-sm leading-7 text-[#58604c] shadow-[var(--wtf-shadow-soft)]">
              {content.hero.orderNote}
            </p>
          </div>
          <div className="relative min-h-[33rem] overflow-hidden rounded-[var(--wtf-radius-xl)] border-2 border-[#1f2420] bg-[#f1f5dd] shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="fast-casual counter visual with grain bowls, pickup shelf, menu board and catering boxes."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 grid gap-2 bg-[#fffdf4]/95 p-4 text-sm shadow-[var(--wtf-shadow-soft)] sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p key={point} className="border-t-2 border-[#d9481e] pt-3 font-semibold">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#157a4f] text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#f1f5dd]">
              Menu first
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-bold">
              Categories scan fast without becoming app chrome.
            </h2>
            <Button
              href={createRestaurantFastCasualPath(basePath, "menu")}
              variant="secondary"
              className="mt-7 border-white bg-transparent text-white"
            >
              Open menu
            </Button>
          </div>
          <MenuCategoryPreview basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#fffdf4]">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <OrderSteps />
          <LocationsPanel />
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

type InnerProps = Required<Pick<RestaurantFastCasualTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: RestaurantFastCasualPageSlug;
  title: string;
  intro: string;
};

function FastCasualInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "menu" ? <MenuPage basePath={basePath} /> : null}
      {slug === "menu/grain-bowl" ? <MenuItemPage basePath={basePath} /> : null}
      {slug === "order" ? <OrderPage /> : null}
      {slug === "locations" ? <LocationsPage /> : null}
      {slug === "catering" ? <CateringPage basePath={basePath} /> : null}
      {slug === "about" ? <AboutPage /> : null}
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
      homeLabel={restaurantFastCasualContent.business.name}
      sectionClassName="border-[#cbd389] bg-[#fffdf4]"
      linkClassName="text-[#d9481e]"
      titleClassName="font-bold"
      introClassName="text-[#58604c]"
      mediaClassName="relative min-h-72 overflow-hidden rounded-[var(--wtf-radius-xl)] border-2 border-[#1f2420]"
      media={
        <Image
          src={heroImageSrc}
          alt="fast-casual restaurant visual with menu board, bowls and pickup shelf."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function MenuCategoryPreview({ basePath }: { basePath: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {restaurantFastCasualContent.menuSections.map((section) => (
        <article
          key={section.name}
          className="rounded-[var(--wtf-radius-lg)] bg-[#fffdf4] p-5 text-[#1f2420]"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d9481e]">
            {section.items.length} items
          </p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-bold">
            {section.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#58604c]">{section.description}</p>
          <Button
            href={createRestaurantFastCasualPath(basePath, "menu")}
            variant="secondary"
            className="mt-5"
          >
            Browse
          </Button>
        </article>
      ))}
    </div>
  );
}

function MenuPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-8">
        {restaurantFastCasualContent.menuSections.map((section) => (
          <article key={section.name} className="grid gap-5 lg:grid-cols-[0.32fr_1fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#d9481e]">
                Category
              </p>
              <h2 className="mt-2 [font-family:var(--wtf-font-heading)] text-4xl font-bold">
                {section.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#58604c]">{section.description}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {section.items.map((item) => (
                <MenuItemCard key={item.name} item={item} basePath={basePath} />
              ))}
            </div>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function MenuItemCard({
  item,
  basePath
}: {
  item: (typeof restaurantFastCasualContent.menuSections)[number]["items"][number];
  basePath: string;
}) {
  return (
    <article className="rounded-[var(--wtf-radius-lg)] border-2 border-[#cbd389] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-bold">{item.name}</h3>
        <p className="font-bold text-[#157a4f]">{item.price}</p>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#58604c]">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[...item.dietary, ...item.allergens.map((allergen) => `Contains ${allergen}`)].map(
          (label) => (
            <span key={label} className="rounded-full bg-[#f1f5dd] px-3 py-1 text-xs font-semibold">
              {label}
            </span>
          )
        )}
      </div>
      <Button
        href={createRestaurantFastCasualPath(basePath, item.slug as RestaurantFastCasualPageSlug)}
        className="mt-5 w-full"
      >
        Item details
      </Button>
    </article>
  );
}

function MenuItemPage({ basePath }: { basePath: string }) {
  const item = restaurantFastCasualContent.menuSections[0].items[0];

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d9481e]">Menu item</p>
          <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-5xl font-bold">
            {item.name}
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#58604c]">{item.description}</p>
          <p className="mt-5 text-3xl font-bold text-[#157a4f]">{item.price}</p>
          <Button href={createRestaurantFastCasualPath(basePath, "order")} className="mt-7">
            Start order request
          </Button>
        </div>
        <div className="rounded-[var(--wtf-radius-xl)] border-2 border-[#1f2420] bg-[#f1f5dd] p-6">
          <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-bold">
            Labels and caveats
          </h3>
          <div className="mt-5 grid gap-3">
            {[...item.dietary, ...item.allergens.map((allergen) => `Contains ${allergen}`)].map(
              (label) => (
                <p key={label} className="border-t border-[#cbd389] pt-3 text-sm font-semibold">
                  {label}
                </p>
              )
            )}
          </div>
          <p className="mt-6 text-sm leading-7 text-[#58604c]">
            Allergen and dietary copy is a placeholder. The restaurant must verify final labels,
            cross-contact notes and local menu disclosure rules before launch.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function OrderSteps() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#d9481e]">Order flow</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-bold">
        The placeholder is useful because it is honest.
      </h2>
      <div className="mt-7 grid gap-4">
        {restaurantFastCasualContent.orderSteps.map((item) => (
          <article key={item.step} className="border-t-2 border-[#cbd389] pt-4">
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-bold">
              {item.step}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#58604c]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function OrderPage() {
  const content = restaurantFastCasualContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <OrderSteps />
          <p className="mt-7 rounded-[var(--wtf-radius-lg)] border-2 border-[#d9481e] bg-white p-4 text-sm font-semibold text-[#58604c]">
            No payment, delivery, stock or kitchen ticket is created by this demo.
          </p>
        </div>
        <ManagedForm
          title={content.order.title}
          description={content.order.description}
          fields={content.order.fields}
          submitLabel={content.order.submitLabel}
          successMessage={content.order.successMessage}
          emptySelectLabel={content.order.emptySelectLabel}
          validationMessages={createFormValidation(content.order.validation)}
          className="rounded-[var(--wtf-radius-xl)] bg-white shadow-[var(--wtf-shadow-soft)]"
        />
      </Container>
    </Section>
  );
}

function LocationsPanel() {
  return (
    <div className="rounded-[var(--wtf-radius-xl)] border-2 border-[#cbd389] bg-white p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#d9481e]">Locations</p>
      <div className="mt-6 grid gap-4">
        {restaurantFastCasualContent.locations.map((location) => (
          <article key={location.name} className="border-t-2 border-[#cbd389] pt-4">
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-bold">
              {location.name}
            </h3>
            <p className="mt-2 text-sm font-semibold">{location.address}</p>
            <p className="mt-2 text-sm text-[#58604c]">{location.hours}</p>
            <p className="mt-2 text-sm leading-7 text-[#58604c]">{location.pickupNote}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function LocationsPage() {
  return (
    <Section>
      <Container className="max-w-5xl">
        <LocationsPanel />
      </Container>
    </Section>
  );
}

function CateringPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-bold">
            Catering is a lead path, not checkout.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#58604c]">
            Packages show serves, labels and timing so a real catering inquiry can start cleanly.
          </p>
          <Button href={createRestaurantFastCasualPath(basePath, "order")} className="mt-7">
            Send catering request
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {restaurantFastCasualContent.catering.map((item) => (
            <article
              key={item.title}
              className="rounded-[var(--wtf-radius-lg)] border-2 border-[#cbd389] bg-white p-5"
            >
              <p className="text-sm font-semibold text-[#d9481e]">{item.serves}</p>
              <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-2xl font-bold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#58604c]">{item.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function AboutPage() {
  return (
    <Section className="bg-[#157a4f] text-white">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <h2 className="[font-family:var(--wtf-font-heading)] text-5xl font-bold leading-tight">
          Built around pickup rhythm, not delivery-app noise.
        </h2>
        <div className="grid gap-5 text-sm leading-7 text-[#f1f5dd]">
          <p>
            Counter & Grain is fictional. The template focuses on menu clarity, pickup timing,
            locations and catering leads instead of accounts, loyalty complexity or fake checkout.
          </p>
          <p>
            A real launch can connect the order route to a POS, delivery partner, Stripe flow or
            custom ordering backend after menu labels and legal notes are verified.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = restaurantFastCasualContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Pickup windows, allergen labels and catering cutoffs should be verified before launch."
        />
        <LocationsPanel />
      </Container>
    </Section>
  );
}

function FAQPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <FAQAccordion items={restaurantFastCasualContent.faq} />
      </Container>
    </Section>
  );
}
