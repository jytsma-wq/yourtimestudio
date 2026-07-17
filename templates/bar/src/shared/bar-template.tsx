import type { CSSProperties, ReactNode } from "react";

import { createFormValidation, type TemplateLocaleConfig } from "@website-template-factory/content";
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
  TemplatePageIntro
} from "@website-template-factory/ui";
import Image from "next/image";

type BarVariant = "cocktail" | "pub" | "rooftop";

type FormCopy = {
  title: string;
  description: string;
  submitLabel: string;
  successMessage: string;
  emptySelectLabel: string;
  validation: {
    required: string;
    email: string;
    numberMin: string;
  };
  fields: Parameters<typeof ManagedForm>[0]["fields"];
};

type BarContent = {
  id: "bar-01-cocktail" | "bar-02-pub" | "bar-03-rooftop";
  locale: TemplateLocaleConfig;
  ui: {
    mobileMenu: string;
    mobileClose: string;
  };
  business: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    hours: readonly string[];
  };
  navigation: readonly {
    label: string;
    slug: string;
  }[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    serviceNote: string;
    proofPoints: readonly string[];
  };
  menuSections: readonly {
    name: string;
    description: string;
    items: readonly {
      name: string;
      description: string;
      price: string;
      note?: string;
    }[];
  }[];
  events: readonly {
    title: string;
    date: string;
    time: string;
    description: string;
  }[];
  gallery: readonly {
    title: string;
    alt: string;
    tone: string;
  }[];
  testimonials: readonly {
    quote: string;
    author: string;
    context: string;
  }[];
  booking: FormCopy;
  responsibleNote: string;
  faq: readonly {
    question: string;
    answer: string;
  }[];
  signatures?: readonly {
    name: string;
    description: string;
    method: string;
    glass: string;
  }[];
  privateHire?: {
    title: string;
    description: string;
    capacities: readonly string[];
  };
  sports?: readonly {
    title: string;
    detail: string;
    timing: string;
  }[];
  communityNotes?: readonly string[];
  packages?: readonly {
    name: string;
    detail: string;
    suitableFor: string;
  }[];
  accessNotes?: readonly string[];
};

type BarTemplateProps = {
  content: BarContent;
  variant: BarVariant;
  slug: string;
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
  createPath: (basePath: string, slug: string) => string;
};

const styles = {
  cocktail: {
    themeId: "bar-01-cocktail",
    root: "bg-[#100d10] text-[#f7eee2]",
    header: "border-[#5a4336] bg-[#100d10]/95 text-[#f7eee2]",
    section: "border-[#5a4336] bg-[#100d10]",
    panel: "border-[#5a4336] bg-[#1b1518]",
    panelAlt: "border-[#8a624c] bg-[#f7eee2] text-[#100d10]",
    accent: "text-[#d8a15f]",
    muted: "text-[#c7b4a3]",
    line: "border-[#5a4336]",
    button: "rounded-none bg-[#d8a15f] text-[#100d10] hover:bg-[#f7eee2]",
    secondaryButton: "rounded-none border-[#d8a15f] bg-transparent text-[#f7eee2]",
    media: "relative min-h-[32rem] overflow-hidden border border-[#8a624c] bg-[#24191a]",
    imageAlt: "moody cocktail bar visual with reserved seats, drinks and low light."
  },
  pub: {
    themeId: "bar-02-pub",
    root: "bg-[#f8efe2] text-[#2b2117]",
    header: "border-[#b78355] bg-[#f8efe2]/95",
    section: "border-[#b78355] bg-[#f8efe2]",
    panel: "rounded-[var(--wtf-radius-lg)] border border-[#b78355] bg-white",
    panelAlt: "rounded-[var(--wtf-radius-lg)] border border-[#7b4f2f] bg-[#2f5d46] text-white",
    accent: "text-[#9b4d27]",
    muted: "text-[#6a5946]",
    line: "border-[#b78355]",
    button: "bg-[#2f5d46] text-white hover:bg-[#243f32]",
    secondaryButton: "border-[#7b4f2f] bg-transparent text-[#2b2117]",
    media:
      "relative min-h-[31rem] overflow-hidden rounded-[var(--wtf-radius-xl)] border border-[#b78355] bg-[#ead7bf]",
    imageAlt: "warm modern pub visual with tables, event board and food service."
  },
  rooftop: {
    themeId: "bar-03-rooftop",
    root: "bg-[#f8f4ec] text-[#17212d]",
    header:
      "border-[#d48d65] bg-[#f8f4ec]/95 [--wtf-color-button:#315677] [--wtf-color-button-foreground:#ffffff] [--wtf-color-foreground:#17212d] [--wtf-color-muted-foreground:#31445a] [--wtf-color-surface:#f8f4ec]",
    section: "border-[#d48d65] bg-[#f8f4ec]",
    panel: "rounded-[var(--wtf-radius-xl)] border border-[#d48d65] bg-white",
    panelAlt: "rounded-[var(--wtf-radius-xl)] border border-[#315677] bg-[#17212d] text-white",
    accent: "text-[#d36b3d]",
    muted: "text-[#5e6571]",
    line: "border-[#d48d65]",
    button: "bg-[#315677] text-white hover:bg-[#17212d]",
    secondaryButton: "!border-[#315677] !bg-transparent !text-[#17212d]",
    media:
      "relative min-h-[34rem] overflow-hidden rounded-t-[4rem] border border-[#d48d65] bg-[#ead2bd]",
    imageAlt: "rooftop bar visual with skyline, sunset terrace and reserved tables."
  }
} as const;

function navFor(content: BarContent, basePath: string, createPath: BarTemplateProps["createPath"]) {
  return content.navigation.map((item) => ({
    label: item.label,
    href: createPath(basePath, item.slug)
  }));
}

export function BarTemplate({
  content,
  variant,
  slug,
  title,
  intro,
  basePath,
  heroImageSrc,
  createPath
}: BarTemplateProps) {
  const style = styles[variant];
  const themeStyle = createThemeCssVariables(style.themeId) as CSSProperties;
  const navigation = navFor(content, basePath, createPath);
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";
  const primarySlug =
    variant === "pub" ? "bookings" : variant === "rooftop" ? "reservations" : "reservations";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className={style.root}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BarOrPub",
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
        cta={{ label: content.hero.primaryCta, href: createPath(basePath, primarySlug) }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className={style.header}
      />
      {slug === "" ? (
        <HomePage
          content={content}
          variant={variant}
          basePath={basePath}
          heroImageSrc={heroImageSrc}
          createPath={createPath}
        />
      ) : (
        <InnerPage
          content={content}
          variant={variant}
          slug={slug}
          title={title}
          intro={intro}
          basePath={basePath}
          heroImageSrc={heroImageSrc}
          createPath={createPath}
        />
      )}
      <Footer
        brand={content.business.name}
        summary={content.business.tagline}
        links={[
          ...navigation,
          { label: "Contact", href: createPath(basePath, "contact") },
          { label: "FAQ", href: createPath(basePath, "faq") }
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

function HomePage({
  content,
  variant,
  basePath,
  heroImageSrc,
  createPath
}: Pick<BarTemplateProps, "content" | "variant" | "basePath" | "heroImageSrc" | "createPath">) {
  if (variant === "cocktail") {
    return (
      <CocktailHome
        content={content}
        basePath={basePath}
        heroImageSrc={heroImageSrc}
        createPath={createPath}
      />
    );
  }

  if (variant === "pub") {
    return (
      <PubHome
        content={content}
        basePath={basePath}
        heroImageSrc={heroImageSrc}
        createPath={createPath}
      />
    );
  }

  return (
    <RooftopHome
      content={content}
      basePath={basePath}
      heroImageSrc={heroImageSrc}
      createPath={createPath}
    />
  );
}

function HeroImage({
  content,
  variant,
  heroImageSrc,
  children
}: {
  content: BarContent;
  variant: BarVariant;
  heroImageSrc: string;
  children?: ReactNode;
}) {
  const style = styles[variant];

  return (
    <div className={style.media}>
      <Image
        src={heroImageSrc}
        alt={style.imageAlt}
        fill
        loading="eager"
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-4 bottom-4 border border-white/20 bg-black/55 p-4 text-sm leading-6 text-white backdrop-blur">
        {content.hero.serviceNote}
      </div>
      {children}
    </div>
  );
}

function HeroCopy({
  content,
  variant,
  basePath,
  createPath,
  primarySlug,
  secondarySlug
}: {
  content: BarContent;
  variant: BarVariant;
  basePath: string;
  createPath: BarTemplateProps["createPath"];
  primarySlug: string;
  secondarySlug: string;
}) {
  const style = styles[variant];

  return (
    <div>
      <p className={`text-sm font-semibold uppercase tracking-wide ${style.accent}`}>
        {content.hero.eyebrow}
      </p>
      <h1 className="mt-5 max-w-4xl [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
        {content.hero.title}
      </h1>
      <p className={`mt-6 max-w-2xl text-base leading-8 ${style.muted}`}>{content.hero.subtitle}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={createPath(basePath, primarySlug)} className={style.button}>
          {content.hero.primaryCta}
        </Button>
        <Button
          href={createPath(basePath, secondarySlug)}
          variant="secondary"
          className={style.secondaryButton}
        >
          {content.hero.secondaryCta}
        </Button>
      </div>
    </div>
  );
}

function ProofStrip({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {content.hero.proofPoints.map((point) => (
        <p key={point} className={`border-l ${style.line} pl-4 text-sm leading-6 ${style.muted}`}>
          {point}
        </p>
      ))}
    </div>
  );
}

function CocktailHome({
  content,
  basePath,
  heroImageSrc,
  createPath
}: Pick<BarTemplateProps, "content" | "basePath" | "heroImageSrc" | "createPath">) {
  return (
    <main>
      <section className="border-b border-[#5a4336] bg-[#100d10]">
        <Container className="grid min-h-[82svh] gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10 lg:py-12">
          <div className="pt-10 lg:pb-10 lg:pt-14">
            <HeroCopy
              content={content}
              variant="cocktail"
              basePath={basePath}
              createPath={createPath}
              primarySlug="reservations"
              secondarySlug="drinks"
            />
          </div>
          <HeroImage content={content} variant="cocktail" heroImageSrc={heroImageSrc}>
            <div className="absolute left-5 top-5 border border-[#d8a15f] bg-[#100d10]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8a15f]">
              Seated service
            </div>
          </HeroImage>
          <div className="lg:col-span-2">
            <ProofStrip content={content} variant="cocktail" />
          </div>
        </Container>
      </section>
      <DecisionGuide
        eyebrow="Plan the table"
        title="Choose the reason for the reservation."
        description="The room, timing and service notes change depending on whether the visit is for two people, a group or a private event."
        prompt="What are you arranging?"
        options={[
          {
            id: "drinks",
            label: "Drinks for two",
            resultEyebrow: "Recommended",
            resultTitle: "A seated reservation with menu time",
            resultBody:
              "Browse signatures first, then request a table with enough time for a paced round of drinks.",
            href: createPath(basePath, "drinks"),
            ctaLabel: "View the drinks"
          },
          {
            id: "group",
            label: "A small group",
            resultEyebrow: "Recommended",
            resultTitle: "Confirm timing and table policy",
            resultBody:
              "Send the group size and preferred arrival window so the room can stay seated and composed.",
            href: createPath(basePath, "reservations"),
            ctaLabel: "Request a table"
          },
          {
            id: "private",
            label: "Private hire",
            resultEyebrow: "Recommended",
            resultTitle: "Start with capacity and service format",
            resultBody:
              "Review buyout scale, timing and menu direction before sending the event details.",
            href: createPath(basePath, "private-hire"),
            ctaLabel: "Plan private hire"
          }
        ]}
        className="border-[#5a4336] bg-[#100d10]"
      />
      <Section className="bg-[#1b1518]">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionLead
            variant="cocktail"
            eyebrow="Signature serves"
            title="The menu starts with method, not mood."
          />
          <SignatureGrid content={content} variant="cocktail" />
        </Container>
      </Section>
      <Section className="bg-[#100d10]">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <PrivatePanel content={content} variant="cocktail" />
          <EventsPanel
            content={content}
            variant="cocktail"
            basePath={basePath}
            createPath={createPath}
          />
        </Container>
      </Section>
      <GalleryPreview content={content} variant="cocktail" />
    </main>
  );
}

function PubHome({
  content,
  basePath,
  heroImageSrc,
  createPath
}: Pick<BarTemplateProps, "content" | "basePath" | "heroImageSrc" | "createPath">) {
  return (
    <main>
      <section className="border-b border-[#b78355] bg-[#f8efe2]">
        <Container className="grid min-h-[78svh] gap-10 py-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <HeroCopy
            content={content}
            variant="pub"
            basePath={basePath}
            createPath={createPath}
            primarySlug="bookings"
            secondarySlug="events"
          />
          <HeroImage content={content} variant="pub" heroImageSrc={heroImageSrc}>
            <div className="absolute right-5 top-5 rounded-[var(--wtf-radius-sm)] bg-[#f8efe2] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#9b4d27]">
              Food until late
            </div>
          </HeroImage>
          <div className="lg:col-span-2">
            <ProofStrip content={content} variant="pub" />
          </div>
        </Container>
      </section>
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <MenuPreview content={content} variant="pub" />
          <SportsPanel content={content} />
        </Container>
      </Section>
      <Section className="bg-[#2f5d46] text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <SectionLead
            variant="pub"
            eyebrow="Events board"
            title="Fixtures, quiz tables and food timing stay easy to scan."
          />
          <EventsPanel
            content={content}
            variant="pub"
            basePath={basePath}
            createPath={createPath}
          />
        </Container>
      </Section>
      <Testimonials content={content} variant="pub" />
    </main>
  );
}

function RooftopHome({
  content,
  basePath,
  heroImageSrc,
  createPath
}: Pick<BarTemplateProps, "content" | "basePath" | "heroImageSrc" | "createPath">) {
  return (
    <main>
      <section className="border-b border-[#d48d65] bg-[#f8f4ec]">
        <Container className="grid min-h-[80svh] gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <HeroCopy
              content={content}
              variant="rooftop"
              basePath={basePath}
              createPath={createPath}
              primarySlug="reservations"
              secondarySlug="events"
            />
            <div className="mt-10">
              <ProofStrip content={content} variant="rooftop" />
            </div>
          </div>
          <HeroImage content={content} variant="rooftop" heroImageSrc={heroImageSrc}>
            <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#d36b3d]">
              Weather-aware
            </div>
          </HeroImage>
        </Container>
      </section>
      <Section className="bg-[#17212d] text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <SectionLead
            variant="rooftop"
            eyebrow="Group packages"
            title="Packages explain the table, the timing and the backup plan."
          />
          <PackagesPanel content={content} variant="rooftop" />
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <EventsPanel
            content={content}
            variant="rooftop"
            basePath={basePath}
            createPath={createPath}
          />
          <AccessPanel content={content} variant="rooftop" />
        </Container>
      </Section>
      <GalleryPreview content={content} variant="rooftop" />
    </main>
  );
}

function SectionLead({
  variant,
  eyebrow,
  title
}: {
  variant: BarVariant;
  eyebrow: string;
  title: string;
}) {
  const style = styles[variant];

  return (
    <div>
      <p className={`text-sm font-semibold uppercase tracking-wide ${style.accent}`}>{eyebrow}</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        {title}
      </h2>
    </div>
  );
}

function InnerPage({
  content,
  variant,
  slug,
  title,
  intro,
  basePath,
  heroImageSrc,
  createPath
}: BarTemplateProps) {
  return (
    <main>
      <PageIntro
        content={content}
        variant={variant}
        title={title}
        intro={intro}
        basePath={basePath}
        heroImageSrc={heroImageSrc}
      />
      {["drinks", "food-menu", "food"].includes(slug) ? (
        <MenuPage content={content} variant={variant} slug={slug} />
      ) : null}
      {slug === "signature-cocktails" ? (
        <SignaturePage content={content} variant={variant} />
      ) : null}
      {slug === "events" ? (
        <EventsPage
          content={content}
          variant={variant}
          basePath={basePath}
          createPath={createPath}
        />
      ) : null}
      {slug === "private-hire" || slug === "private-bookings" ? (
        <PrivatePage content={content} variant={variant} />
      ) : null}
      {slug === "group-packages" ? <PackagesPage content={content} variant={variant} /> : null}
      {slug === "sports" ? <SportsPage content={content} /> : null}
      {slug === "gallery" ? <GalleryPage content={content} variant={variant} /> : null}
      {slug === "reservations" || slug === "bookings" ? (
        <BookingPage content={content} variant={variant} />
      ) : null}
      {slug === "contact" ? <ContactPage content={content} variant={variant} /> : null}
      {slug === "faq" ? <FAQPage content={content} /> : null}
    </main>
  );
}

function PageIntro({
  content,
  variant,
  title,
  intro,
  basePath,
  heroImageSrc
}: {
  content: BarContent;
  variant: BarVariant;
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
}) {
  const style = styles[variant];

  return (
    <TemplatePageIntro
      title={title}
      intro={intro}
      homeHref={basePath}
      homeLabel={content.business.name}
      sectionClassName={style.section}
      linkClassName={style.accent}
      introClassName={style.muted}
      mediaClassName={style.media}
      media={
        <Image
          src={heroImageSrc}
          alt={style.imageAlt}
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function MenuPreview({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {content.menuSections.map((section) => (
        <article key={section.name} className={`${style.panel} p-5`}>
          <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {section.name}
          </h3>
          <p className={`mt-3 text-sm leading-7 ${style.muted}`}>{section.description}</p>
          <p className={`mt-5 text-sm font-semibold ${style.accent}`}>
            {section.items.length} items
          </p>
        </article>
      ))}
    </div>
  );
}

function MenuPage({
  content,
  variant,
  slug
}: {
  content: BarContent;
  variant: BarVariant;
  slug: string;
}) {
  const style = styles[variant];
  const sections =
    slug === "food" || slug === "food-menu"
      ? content.menuSections.filter((section) => /food|lunch|plate/i.test(section.name))
      : content.menuSections;
  const visibleSections = sections.length ? sections : content.menuSections;

  return (
    <Section>
      <Container className="grid gap-7">
        {visibleSections.map((section) => (
          <article
            key={section.name}
            className={`grid gap-6 border-b ${style.line} pb-8 lg:grid-cols-[0.42fr_1fr]`}
          >
            <div>
              <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
                {section.name}
              </h2>
              <p className={`mt-3 text-sm leading-7 ${style.muted}`}>{section.description}</p>
            </div>
            <div className="grid gap-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className={`${style.panel} grid gap-3 p-4 sm:grid-cols-[1fr_auto]`}
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className={`mt-1 text-sm leading-6 ${style.muted}`}>{item.description}</p>
                    {item.note ? (
                      <p
                        className={`mt-2 text-xs font-semibold uppercase tracking-wide ${style.accent}`}
                      >
                        {item.note}
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

function SignatureGrid({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];
  const signatures = content.signatures ?? [];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {signatures.map((item) => (
        <article key={item.name} className={`${style.panelAlt} p-5`}>
          <p className={`text-xs font-semibold uppercase tracking-wide ${style.accent}`}>
            {item.glass}
          </p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {item.name}
          </h3>
          <p className="mt-3 text-sm leading-7">{item.description}</p>
          <p className="mt-4 border-t border-current/30 pt-3 text-sm font-semibold">
            {item.method}
          </p>
        </article>
      ))}
    </div>
  );
}

function SignaturePage({ content, variant }: { content: BarContent; variant: BarVariant }) {
  return (
    <Section>
      <Container>
        <SignatureGrid content={content} variant={variant} />
      </Container>
    </Section>
  );
}

function EventsPanel({
  content,
  variant,
  basePath,
  createPath
}: {
  content: BarContent;
  variant: BarVariant;
  basePath: string;
  createPath: BarTemplateProps["createPath"];
}) {
  const style = styles[variant];

  return (
    <div className={`${style.panel} p-6 shadow-[var(--wtf-shadow-soft)]`}>
      <p className={`text-sm font-semibold uppercase tracking-wide ${style.accent}`}>Events</p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Programming with timing and booking context.
      </h2>
      <div className="mt-7 grid gap-4">
        {content.events.map((event) => (
          <article key={event.title} className={`border-t ${style.line} pt-4`}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {event.title}
              </h3>
              <p className={`text-sm font-semibold ${style.accent}`}>{event.date}</p>
            </div>
            <p className={`mt-1 text-sm font-semibold ${style.accent}`}>{event.time}</p>
            <p className={`mt-2 text-sm leading-7 ${style.muted}`}>{event.description}</p>
          </article>
        ))}
      </div>
      <Button href={createPath(basePath, "events")} className={`mt-7 ${style.button}`}>
        See events
      </Button>
    </div>
  );
}

function EventsPage({
  content,
  variant,
  basePath,
  createPath
}: {
  content: BarContent;
  variant: BarVariant;
  basePath: string;
  createPath: BarTemplateProps["createPath"];
}) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionLead
          variant={variant}
          eyebrow="Events"
          title="Events support reservations when details are clear."
        />
        <EventsPanel
          content={content}
          variant={variant}
          basePath={basePath}
          createPath={createPath}
        />
      </Container>
    </Section>
  );
}

function PrivatePanel({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];
  const privateHire = content.privateHire;
  const title = privateHire?.title ?? "Private bookings need timing, access and host notes.";
  const description = privateHire?.description ?? content.responsibleNote;
  const capacities = privateHire?.capacities ?? content.accessNotes ?? [];

  return (
    <div className={`${style.panelAlt} p-6`}>
      <p className={`text-sm font-semibold uppercase tracking-wide ${style.accent}`}>
        Private booking
      </p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">{title}</h2>
      <p className="mt-4 text-sm leading-7">{description}</p>
      <ul className="mt-6 grid gap-2 text-sm">
        {capacities.map((item) => (
          <li key={item} className="border-t border-current/30 pt-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PrivatePage({ content, variant }: { content: BarContent; variant: BarVariant }) {
  return (
    <Section>
      <Container className="max-w-4xl">
        <PrivatePanel content={content} variant={variant} />
      </Container>
    </Section>
  );
}

function SportsPanel({ content }: { content: BarContent }) {
  const sports = content.sports ?? [];

  return (
    <div className="rounded-[var(--wtf-radius-lg)] border border-[#b78355] bg-[#f8efe2] p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#9b4d27]">Sports board</p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Screenings work when guests know timing and table rules.
      </h2>
      <div className="mt-7 grid gap-4">
        {sports.map((item) => (
          <article key={item.title} className="border-t border-[#b78355] pt-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="text-sm font-semibold text-[#9b4d27]">{item.timing}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-[#6a5946]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SportsPage({ content }: { content: BarContent }) {
  return (
    <Section>
      <Container>
        <SportsPanel content={content} />
      </Container>
    </Section>
  );
}

function PackagesPanel({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];
  const packages = content.packages ?? [];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {packages.map((item) => (
        <article key={item.name} className={`${style.panelAlt} p-5`}>
          <p className={`text-sm font-semibold ${style.accent}`}>{item.suitableFor}</p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {item.name}
          </h3>
          <p className="mt-3 text-sm leading-7">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

function PackagesPage({ content, variant }: { content: BarContent; variant: BarVariant }) {
  return (
    <Section>
      <Container>
        <PackagesPanel content={content} variant={variant} />
      </Container>
    </Section>
  );
}

function AccessPanel({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];
  const notes = content.accessNotes ?? content.communityNotes ?? [];

  return (
    <div className={`${style.panel} p-6`}>
      <p className={`text-sm font-semibold uppercase tracking-wide ${style.accent}`}>
        Planning notes
      </p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Responsible hospitality belongs before the form.
      </h2>
      <div className="mt-6 grid gap-3">
        {[...notes, content.responsibleNote].map((note) => (
          <p key={note} className={`border-t ${style.line} pt-3 text-sm leading-7 ${style.muted}`}>
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}

function GalleryPreview({ content, variant }: { content: BarContent; variant: BarVariant }) {
  return (
    <Section>
      <Container>
        <GalleryGrid content={content} variant={variant} preview />
      </Container>
    </Section>
  );
}

function GalleryPage({ content, variant }: { content: BarContent; variant: BarVariant }) {
  return (
    <Section>
      <Container>
        <GalleryGrid content={content} variant={variant} />
      </Container>
    </Section>
  );
}

function GalleryGrid({
  content,
  variant,
  preview = false
}: {
  content: BarContent;
  variant: BarVariant;
  preview?: boolean;
}) {
  const style = styles[variant];
  const items = preview ? content.gallery.slice(0, 3) : content.gallery;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item, index) => (
        <figure
          key={item.title}
          className={`${style.panel} min-h-72 p-4 ${index === 0 ? "md:col-span-2 md:min-h-[34rem]" : ""}`}
        >
          <div
            role="img"
            aria-label={item.alt}
            className="flex h-full min-h-64 items-end rounded-[var(--wtf-radius-md)] bg-[linear-gradient(135deg,var(--wtf-color-surface,#fff),var(--wtf-color-accent,#a16207)_44%,var(--wtf-color-foreground,#111)_45%)] p-5"
          >
            <figcaption className={`${style.panelAlt} max-w-52 p-3 text-sm font-semibold`}>
              {item.title}
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}

function BookingPage({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <AccessPanel content={content} variant={variant} />
        <ManagedForm
          title={content.booking.title}
          description={content.booking.description}
          fields={content.booking.fields}
          submitLabel={content.booking.submitLabel}
          successMessage={content.booking.successMessage}
          emptySelectLabel={content.booking.emptySelectLabel}
          validationMessages={createFormValidation(content.booking.validation)}
          className={`${style.panel} shadow-[var(--wtf-shadow-soft)]`}
        />
      </Container>
    </Section>
  );
}

function ContactPage({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note={content.responsibleNote}
        />
        <div className={`${style.panel} min-h-80 p-6`}>
          <p className={`text-sm font-semibold uppercase tracking-wide ${style.accent}`}>
            Visit planning
          </p>
          <p className="mt-20 max-w-sm [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {content.business.tagline}
          </p>
        </div>
      </Container>
    </Section>
  );
}

function FAQPage({ content }: { content: BarContent }) {
  return (
    <Section>
      <Container className="max-w-3xl">
        <FAQAccordion items={content.faq} />
      </Container>
    </Section>
  );
}

function Testimonials({ content, variant }: { content: BarContent; variant: BarVariant }) {
  const style = styles[variant];

  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-2">
        {content.testimonials.map((testimonial) => (
          <figure key={testimonial.quote} className={`${style.panel} p-6`}>
            <blockquote className="text-lg leading-8">"{testimonial.quote}"</blockquote>
            <figcaption className={`mt-5 text-sm ${style.muted}`}>
              <strong>{testimonial.author}</strong>
              <br />
              {testimonial.context}
            </figcaption>
          </figure>
        ))}
      </Container>
    </Section>
  );
}
