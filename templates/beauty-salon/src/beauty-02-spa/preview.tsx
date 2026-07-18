import type { CSSProperties } from "react";

import {
  beautySpaContent,
  beautySpaDefaultBasePath,
  beautySpaPageSlugs,
  createBeautySpaPath,
  createFormValidation,
  getBeautySpaNavigation,
  getBeautySpaPage,
  type BeautySpaPageSlug
} from "@website-template-factory/content";
import { createThemeCssVariables } from "@website-template-factory/tokens";
import {
  Button,
  Card,
  Container,
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

export const beautySpaTemplateConfig = {
  id: "beauty-02-spa",
  defaultBasePath: beautySpaDefaultBasePath,
  defaultHeroImage: "/templates/beauty-02-spa/hero-spa.png",
  pageSlugs: beautySpaPageSlugs,
  locale: beautySpaContent.locale
} as const;

export type BeautySpaTemplateProps = {
  slug: BeautySpaPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isBeautySpaSlug(slug: string): slug is BeautySpaPageSlug {
  return (beautySpaPageSlugs as readonly string[]).includes(slug);
}

export function getBeautySpaSeo(
  slug: BeautySpaPageSlug,
  basePath = beautySpaTemplateConfig.defaultBasePath
) {
  return getBeautySpaPage(slug, basePath).seo;
}

export function BeautySpaTemplate({
  slug,
  basePath = beautySpaTemplateConfig.defaultBasePath,
  heroImageSrc = beautySpaTemplateConfig.defaultHeroImage
}: BeautySpaTemplateProps) {
  const content = beautySpaContent;
  const page = getBeautySpaPage(slug, basePath);
  const navigation = getBeautySpaNavigation(basePath);
  const themeStyle = createThemeCssVariables("beauty-02-spa") as CSSProperties;
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
          href: createBeautySpaPath(basePath, "booking")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#c2b39d] bg-[#fffaf1]/95"
      />
      {slug === "" ? (
        <BeautySpaHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <BeautySpaInnerPage
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
          { label: "Contact", href: createBeautySpaPath(basePath, "contact") },
          { label: "FAQ", href: createBeautySpaPath(basePath, "faq") }
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

function BeautySpaHome({
  basePath,
  heroImageSrc
}: Required<Pick<BeautySpaTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = beautySpaContent;

  return (
    <main>
      <section className="relative min-h-[78svh] overflow-hidden">
        <Image
          src={heroImageSrc}
          alt="Original spa treatment room with stone basin, folded towels, and diffused natural light."
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#26312a]/76 lg:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#26312a]/82 via-[#26312a]/58 to-[#26312a]/78 lg:bg-gradient-to-l lg:from-[#26312a]/82 lg:via-[#26312a]/38 lg:to-transparent" />
        <Container className="relative flex min-h-[78svh] items-center justify-end pb-12 pt-24">
          <div className="max-w-xl text-[#fffaf1] drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] lg:max-w-2xl">
            <h1 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#fffaf1] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={createBeautySpaPath(basePath, "booking")}
                className="rounded-[var(--wtf-radius-md)] bg-[#fffaf1] text-[#26312a] hover:bg-white"
              >
                {content.hero.primaryCta}
              </Button>
              <Button
                href={createBeautySpaPath(basePath, "treatments")}
                variant="secondary"
                className="rounded-[var(--wtf-radius-md)] !border-[#fffaf1]/70 !bg-transparent !text-[#fffaf1] hover:!bg-[#fffaf1]/10"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f6f1e8] py-7">
        <Container className="grid gap-5 md:grid-cols-[1fr_1fr_1fr]">
          {content.hero.proofPoints.map((point) => (
            <p
              key={point}
              className="border-l border-[#7d8b5d] pl-4 text-sm leading-6 text-[#625946]"
            >
              {point}
            </p>
          ))}
        </Container>
      </section>

      <Section className="bg-[#fffaf1]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
                Choose the ritual by the state you want to leave in.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#625946]">{content.hero.sensoryNote}</p>
            </div>
            <div className="grid gap-4">
              {content.treatments.map((treatment, index) => (
                <article
                  key={treatment.name}
                  className="grid gap-5 border-t border-[#c2b39d] pt-5 md:grid-cols-[4rem_1fr_auto]"
                >
                  <p className="[font-family:var(--wtf-font-heading)] text-4xl text-[#7d8b5d]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                      {treatment.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#625946]">{treatment.description}</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">{treatment.duration}</p>
                    <p className="text-[#625946]">{treatment.priceFrom}</p>
                    <Button
                      href={createBeautySpaPath(basePath, treatment.slug)}
                      variant="secondary"
                      className="mt-4 rounded-[var(--wtf-radius-md)]"
                    >
                      View ritual
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#e8dfcf]">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {content.packages.map((spaPackage) => (
              <article
                key={spaPackage.name}
                className="bg-[#fffaf1] p-5 shadow-[var(--wtf-shadow-soft)]"
              >
                <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                  {spaPackage.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#625946]">{spaPackage.description}</p>
                <ul className="mt-4 grid gap-2 text-sm text-[#625946] sm:grid-cols-2">
                  {spaPackage.includes.map((item) => (
                    <li key={item} className="border-l border-[#7d8b5d] pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="self-center">
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Packages and memberships without the sales-room pressure.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#625946]">
              Memberships and gift cards are framed as care continuity, with clear terms and simple
              paths to reserve.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={createBeautySpaPath(basePath, "memberships")}>View memberships</Button>
              <Button href={createBeautySpaPath(basePath, "gift-cards")} variant="secondary">
                Gift a ritual
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <BeautyGallery />

      <Section className="bg-[#fffaf1]">
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

function BeautySpaInnerPage({
  slug,
  title,
  intro,
  basePath,
  heroImageSrc
}: {
  slug: Exclude<BeautySpaPageSlug, "">;
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
}) {
  return (
    <main>
      <section className="border-b border-[#c2b39d] bg-[#fffaf1] py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Link className="text-sm font-semibold text-[#7d8b5d]" href={basePath}>
              {beautySpaContent.business.name}
            </Link>
            <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
              {title}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#625946]">{intro}</p>
        </Container>
      </section>

      {slug === "treatments" ? <TreatmentsPage basePath={basePath} /> : null}
      {slug === "treatments/mineral-reset" ? (
        <TreatmentDetailPage basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : null}
      {slug === "packages" ? <PackagesPage basePath={basePath} /> : null}
      {slug === "memberships" ? <MembershipsPage basePath={basePath} /> : null}
      {slug === "about" ? <AboutSpaPage /> : null}
      {slug === "gallery" ? <BeautyGallery /> : null}
      {slug === "gift-cards" ? <GiftCardsPage basePath={basePath} /> : null}
      {slug === "booking" ? <SpaBookingPage /> : null}
      {slug === "contact" ? <SpaContactPage basePath={basePath} /> : null}
      {slug === "faq" ? (
        <Section className="bg-[#fffaf1]">
          <Container className="max-w-3xl">
            <FAQAccordion items={beautySpaContent.faq} />
          </Container>
        </Section>
      ) : null}
    </main>
  );
}

function TreatmentsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#fffaf1]">
      <Container className="grid gap-5">
        {beautySpaContent.treatments.map((treatment) => (
          <article
            key={treatment.name}
            className="grid gap-4 border-b border-[#c2b39d] pb-5 md:grid-cols-[0.45fr_1fr_auto]"
          >
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {treatment.name}
            </h2>
            <p className="text-sm leading-7 text-[#625946]">{treatment.description}</p>
            <div>
              <p className="text-sm font-semibold">{treatment.duration}</p>
              <p className="text-sm text-[#625946]">{treatment.priceFrom}</p>
              <Button
                href={createBeautySpaPath(basePath, treatment.slug)}
                variant="secondary"
                className="mt-3"
              >
                Details
              </Button>
            </div>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function TreatmentDetailPage({
  basePath,
  heroImageSrc
}: {
  basePath: string;
  heroImageSrc: string;
}) {
  const treatment = beautySpaContent.treatments[0];

  return (
    <Section className="bg-[#f6f1e8]">
      <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[30rem] overflow-hidden border border-[#c2b39d]">
          <Image
            src={heroImageSrc}
            alt="Premium wellness spa treatment room with stone basin and folded towels."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {treatment.name}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#625946]">{treatment.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-[#c2b39d] py-4 text-sm">
            <div>
              <dt className="text-[#625946]">Duration</dt>
              <dd className="font-semibold">{treatment.duration}</dd>
            </div>
            <div>
              <dt className="text-[#625946]">Starting at</dt>
              <dd className="font-semibold">{treatment.priceFrom}</dd>
            </div>
          </dl>
          <ol className="mt-6 grid gap-3 text-sm text-[#625946]">
            {["Warm arrival", "Mineral bodywork", "Quiet recovery"].map((step) => (
              <li key={step} className="border-l border-[#7d8b5d] pl-3">
                {step}
              </li>
            ))}
          </ol>
          <Button href={createBeautySpaPath(basePath, "booking")} className="mt-7">
            Reserve this ritual
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function PackagesPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#e8dfcf]">
      <Container className="grid gap-5 md:grid-cols-3">
        {beautySpaContent.packages.map((spaPackage) => (
          <Card key={spaPackage.name} className="rounded-[var(--wtf-radius-md)] shadow-none">
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {spaPackage.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#625946]">{spaPackage.description}</p>
            <Button href={createBeautySpaPath(basePath, "booking")} className="mt-6">
              Reserve package
            </Button>
          </Card>
        ))}
      </Container>
    </Section>
  );
}

function MembershipsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#fffaf1]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Monthly care without vague wellness math.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#625946]">
            Membership content should show cadence, credits, pause rules, and real limitations.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {["Monthly Ritual", "Seasonal Reset"].map((membership) => (
            <Card key={membership} className="rounded-[var(--wtf-radius-md)] shadow-none">
              <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {membership}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#625946]">
                Treatment credit, booking priority, product savings, and clear cancellation terms.
              </p>
              <Button href={createBeautySpaPath(basePath, "booking")} className="mt-6">
                Ask about membership
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function AboutSpaPage() {
  return (
    <Section className="bg-[#fffaf1]">
      <Container className="max-w-3xl">
        <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
          A studio story built from materials, pacing, and care.
        </h2>
        <p className="mt-5 text-sm leading-7 text-[#625946]">
          This about route gives buyers room to describe practitioner training, ingredient
          philosophy, arrival rituals, accessibility, and product standards without borrowing a real
          spa story.
        </p>
      </Container>
    </Section>
  );
}

function BeautyGallery() {
  return (
    <Section className="bg-[#26312a] text-[#fffaf1]">
      <Container className="grid gap-4 md:grid-cols-4">
        {beautySpaContent.gallery.map((item, index) => (
          <figure
            key={item.title}
            className={[
              "min-h-72 border border-[#7d8b5d] bg-gradient-to-br p-5",
              index === 0
                ? "from-[#4d5f45] via-[#9ba579] to-[#fffaf1] md:col-span-2 md:row-span-2 md:min-h-[36rem]"
                : "from-[#394235] via-[#7d8b5d] to-[#d4c7b1]"
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

function GiftCardsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#f6f1e8]">
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Gift cards should feel like care, not a checkout afterthought.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#625946]">
            Use this route for ritual recommendations, delivery options, local legal terms, and
            recipient booking guidance.
          </p>
          <Button href={createBeautySpaPath(basePath, "booking")} className="mt-7">
            Request gift card
          </Button>
        </div>
        <Card className="rounded-[var(--wtf-radius-md)] bg-[#fffaf1] shadow-none">
          <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            Giftable rituals
          </h3>
          <ul className="mt-4 grid gap-3 text-sm text-[#625946]">
            {beautySpaContent.treatments.map((treatment) => (
              <li key={treatment.name} className="border-t border-[#c2b39d] pt-3">
                {treatment.name} - {treatment.priceFrom}
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </Section>
  );
}

function SpaBookingPage() {
  const booking = beautySpaContent.booking;

  return (
    <Section className="bg-[#fffaf1]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Booking copy should lower the guest's pulse.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#625946]">
            The form asks only for what is needed to reserve time and leaves sensitive intake to
            secure launch systems.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-[#625946]">
            {beautySpaContent.business.hours.map((hour) => (
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
          className="bg-[#f6f1e8]"
        />
      </Container>
    </Section>
  );
}

function SpaContactPage({ basePath }: { basePath: string }) {
  const content = beautySpaContent;

  return (
    <Section className="bg-[#f6f1e8]">
      <Container className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[var(--wtf-radius-md)] shadow-none">
          <LocationBlock
            name={content.business.name}
            address={content.business.address}
            phone={content.business.phone}
            email={content.business.email}
            hours={content.business.hours}
            note="Use this block for arrival timing, parking, fragrance policy, and accessibility details."
          />
        </Card>
        <Card className="rounded-[var(--wtf-radius-md)] shadow-none">
          <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            Before arrival
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#625946]">
            Keep preparation, late-arrival, cancellation, and accessibility notes close to contact
            details so guests can plan calmly.
          </p>
          <Button href={createBeautySpaPath(basePath, "booking")} className="mt-6">
            Reserve a treatment
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
