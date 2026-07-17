import type { CSSProperties } from "react";

import {
  appendTemplateNavigationLinks,
  beautyAestheticContent,
  beautyAestheticDefaultBasePath,
  beautyAestheticPageSlugs,
  createBeautyAestheticPath,
  createFormValidation,
  getBeautyAestheticNavigation,
  getBeautyAestheticPage,
  type BeautyAestheticPageSlug
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
  TemplatePageIntro,
  TestimonialCard
} from "@website-template-factory/ui";
import Image from "next/image";

export const beautyAestheticTemplateConfig = {
  id: "beauty-03-aesthetic-clinic",
  defaultBasePath: beautyAestheticDefaultBasePath,
  defaultHeroImage: "/templates/beauty-03-aesthetic-clinic/hero-aesthetic-clinic.png",
  pageSlugs: beautyAestheticPageSlugs,
  locale: beautyAestheticContent.locale
} as const;

export type BeautyAestheticTemplateProps = {
  slug: BeautyAestheticPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

type AestheticTreatment = (typeof beautyAestheticContent.treatments)[number];

export function isBeautyAestheticSlug(slug: string): slug is BeautyAestheticPageSlug {
  return (beautyAestheticPageSlugs as readonly string[]).includes(slug);
}

export function getBeautyAestheticSeo(
  slug: BeautyAestheticPageSlug,
  basePath = beautyAestheticTemplateConfig.defaultBasePath
) {
  return getBeautyAestheticPage(slug, basePath).seo;
}

export function BeautyAestheticTemplate({
  slug,
  basePath = beautyAestheticTemplateConfig.defaultBasePath,
  heroImageSrc = beautyAestheticTemplateConfig.defaultHeroImage
}: BeautyAestheticTemplateProps) {
  const content = beautyAestheticContent;
  const page = getBeautyAestheticPage(slug, basePath);
  const navigation = getBeautyAestheticNavigation(basePath);
  const themeStyle = createThemeCssVariables("beauty-03-aesthetic-clinic") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#f8faf9] text-[#17212b]"
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
          href: createBeautyAestheticPath(basePath, "pricing-consultation")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#bec8cb] bg-[#f8faf9]/95 backdrop-blur"
      />
      {slug === "" ? (
        <AestheticHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <AestheticInnerPage
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
        links={appendTemplateNavigationLinks(navigation, [
          { label: "Contact", href: createBeautyAestheticPath(basePath, "contact") },
          { label: "FAQ", href: createBeautyAestheticPath(basePath, "faq") }
        ])}
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

function AestheticHome({
  basePath,
  heroImageSrc
}: Required<Pick<BeautyAestheticTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = beautyAestheticContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#bec8cb] bg-[#f8faf9]">
        <Container className="grid min-h-[82svh] gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8d7a9f]">
              Clinical aesthetic template
            </p>
            <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#596570] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="relative mt-6 min-h-48 overflow-hidden border border-[#bec8cb] bg-white shadow-[var(--wtf-shadow-soft)] lg:hidden">
              <Image
                src={heroImageSrc}
                alt="clinical aesthetic consultation room with treatment chair, tablet assessment notes, and quiet natural light."
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createBeautyAestheticPath(basePath, "pricing-consultation")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createBeautyAestheticPath(basePath, "treatments")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-2xl border-l-2 border-[#8d7a9f] pl-4 text-sm leading-7 text-[#596570]">
              {content.hero.safetyNote}
            </p>
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-[0.78fr_1fr]">
            <div className="order-2 grid content-end gap-3 sm:order-1">
              {content.hero.proofPoints.map((point) => (
                <p
                  key={point}
                  className="border-t border-[#8d7a9f] pt-3 text-sm leading-6 text-[#344150]"
                >
                  {point}
                </p>
              ))}
              <div className="border border-[#bec8cb] bg-white p-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#596570]">
                Review-ready structure
              </div>
            </div>
            <div className="relative order-1 min-h-[35rem] overflow-hidden border border-[#bec8cb] bg-white shadow-[var(--wtf-shadow-elevated)] sm:order-2">
              <Image
                src={heroImageSrc}
                alt="clinical aesthetic consultation room with treatment chair, tablet assessment notes, and quiet natural light."
                fill
                loading="eager"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 bg-[#f8faf9]/94 p-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#17212b] shadow-[var(--wtf-shadow-soft)] sm:grid-cols-3">
                <span>Assess</span>
                <span>Plan</span>
                <span>Aftercare</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8d7a9f]">
              Treatment planning
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              The homepage sells judgment before procedures.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#596570]">
              Treatment cards stay anchored to suitability, timing and conservative expectations so
              the template feels premium without risky promises.
            </p>
          </div>
          <TreatmentList basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#17212b] text-white">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ConsultationSteps />
          <div className="self-center">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#cfc5d8]">
              Safety path
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Qualification, consent and aftercare are not buried below the fold.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#d5dcde]">
              The conversion journey repeatedly reminds buyers that real clinic claims, pricing,
              consent and medical content need qualified local review.
            </p>
            <Button
              href={createBeautyAestheticPath(basePath, "technology-safety")}
              className="mt-7 !bg-white !text-[#17212b]"
            >
              Review safety page
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#eef2f1]">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <PractitionerGrid />
          <AftercarePreview />
        </Container>
      </Section>

      <ResultsGallery />

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

type InnerProps = Required<Pick<BeautyAestheticTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: BeautyAestheticPageSlug;
  title: string;
  intro: string;
};

function AestheticInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "treatments" ? <TreatmentsPage basePath={basePath} /> : null}
      {slug === "treatments/facial-balance-consultation" ? (
        <TreatmentDetailPage basePath={basePath} />
      ) : null}
      {slug === "facial-aesthetics" ? (
        <TreatmentCategoryPage basePath={basePath} category="Facial aesthetics" />
      ) : null}
      {slug === "skin-treatments" ? (
        <TreatmentCategoryPage basePath={basePath} category="Skin treatments" />
      ) : null}
      {slug === "results-gallery" ? <ResultsGallery /> : null}
      {slug === "practitioners" ? <PractitionersPage /> : null}
      {slug === "technology-safety" ? <SafetyPage /> : null}
      {slug === "pricing-consultation" ? <ConsultationPage /> : null}
      {slug === "aftercare" ? <AftercarePage /> : null}
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
      homeLabel={beautyAestheticContent.business.name}
      sectionClassName="border-[#bec8cb] bg-[#f8faf9]"
      containerClassName="lg:grid-cols-[0.78fr_1.22fr]"
      linkClassName="text-[#8d7a9f]"
      introClassName="text-[#596570]"
      mediaClassName="relative min-h-72 overflow-hidden border border-[#bec8cb] bg-white"
      media={
        <Image
          src={heroImageSrc}
          alt="aesthetic clinic visual with assessment tablet, clean counter, treatment chair, and clinical lighting."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function getTreatmentHref(basePath: string, treatment: AestheticTreatment) {
  if (treatment.slug === "facial-balance-consultation") {
    return createBeautyAestheticPath(basePath, "treatments/facial-balance-consultation");
  }

  return createBeautyAestheticPath(
    basePath,
    treatment.category === "Skin treatments" ? "skin-treatments" : "facial-aesthetics"
  );
}

function TreatmentList({ basePath }: { basePath: string }) {
  return (
    <div className="grid gap-4">
      {beautyAestheticContent.treatments.map((treatment, index) => (
        <article
          key={treatment.name}
          className="grid gap-4 border border-[#bec8cb] bg-[#f8faf9] p-5 md:grid-cols-[4rem_1fr_auto]"
        >
          <p className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold text-[#8d7a9f]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#596570]">
              {treatment.category}
            </p>
            <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {treatment.name}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#596570]">{treatment.summary}</p>
            <p className="mt-2 text-sm font-semibold text-[#344150]">{treatment.suitability}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{treatment.duration}</p>
            <Button
              href={getTreatmentHref(basePath, treatment)}
              variant="secondary"
              className="mt-3"
            >
              Review path
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ConsultationSteps() {
  return (
    <div className="grid gap-4">
      {beautyAestheticContent.consultationSteps.map((item) => (
        <article
          key={item.step}
          className="grid gap-4 border-t border-[#cfc5d8] pt-5 sm:grid-cols-[5rem_1fr]"
        >
          <p className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold text-[#cfc5d8]">
            {item.step}
          </p>
          <div>
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#d5dcde]">{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function TreatmentsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-white">
      <Container>
        <TreatmentList basePath={basePath} />
      </Container>
    </Section>
  );
}

function TreatmentCategoryPage({
  basePath,
  category
}: {
  basePath: string;
  category: AestheticTreatment["category"];
}) {
  const treatments = beautyAestheticContent.treatments.filter(
    (treatment) => treatment.category === category
  );

  return (
    <Section className="bg-white">
      <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
            {category} with consultation checkpoints.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#596570]">
            The copy focuses on suitability and planning, leaving treatment-specific claims for
            qualified review.
          </p>
          <Button
            href={createBeautyAestheticPath(basePath, "pricing-consultation")}
            className="mt-7"
          >
            Request consultation
          </Button>
        </div>
        <div className="grid gap-4">
          {treatments.map((treatment) => (
            <Card key={treatment.name} className="rounded-[var(--wtf-radius-md)] shadow-none">
              <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {treatment.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#596570]">{treatment.summary}</p>
              <p className="mt-4 text-sm font-semibold text-[#344150]">{treatment.suitability}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TreatmentDetailPage({ basePath }: { basePath: string }) {
  const treatment = beautyAestheticContent.treatments[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8d7a9f]">
            {treatment.category}
          </p>
          <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
            {treatment.name}
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#596570]">{treatment.summary}</p>
          <p className="mt-5 border-l-2 border-[#8d7a9f] pl-4 text-sm leading-7 text-[#344150]">
            {treatment.suitability}
          </p>
          <Button
            href={createBeautyAestheticPath(basePath, "pricing-consultation")}
            className="mt-7"
          >
            Book consultation
          </Button>
        </div>
        <ConsultationSteps />
      </Container>
    </Section>
  );
}

function PractitionerGrid() {
  return (
    <div className="grid gap-4">
      {beautyAestheticContent.practitioners.map((person) => (
        <article key={person.name} className="border border-[#bec8cb] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d7a9f]">
            {person.role}
          </p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {person.name}
          </h3>
          <p className="mt-3 text-sm font-semibold text-[#344150]">{person.credential}</p>
          <p className="mt-3 text-sm leading-7 text-[#596570]">{person.focus}</p>
        </article>
      ))}
    </div>
  );
}

function PractitionersPage() {
  return (
    <Section className="bg-[#eef2f1]">
      <Container className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Credentials and responsibilities are part of the design system.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#596570]">
            Profiles are written as placeholders for verified credentials and local scope of
            practice, not invented proof.
          </p>
        </div>
        <PractitionerGrid />
      </Container>
    </Section>
  );
}

function SafetyPage() {
  return (
    <Section className="bg-[#17212b] text-white">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          {beautyAestheticContent.safetyPoints.map((item) => (
            <article key={item.title} className="border border-[#cfc5d8] p-5">
              <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#d5dcde]">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="grid gap-4">
          {beautyAestheticContent.technology.map((item) => (
            <article key={item.title} className="bg-white p-5 text-[#17212b]">
              <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#596570]">{item.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function AftercarePreview() {
  return (
    <div className="self-center border border-[#bec8cb] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8d7a9f]">
        Aftercare visible
      </p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        Follow-up language appears before conversion pressure.
      </h2>
      <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#596570]">
        {beautyAestheticContent.aftercare.map((item) => (
          <li key={item.title} className="border-t border-[#bec8cb] pt-3">
            <span className="font-semibold text-[#17212b]">{item.title}: </span>
            {item.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AftercarePage() {
  return (
    <Section className="bg-white">
      <Container className="grid gap-4 md:grid-cols-3">
        {beautyAestheticContent.aftercare.map((item) => (
          <Card key={item.title} className="rounded-[var(--wtf-radius-md)] shadow-none">
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#596570]">{item.detail}</p>
          </Card>
        ))}
      </Container>
    </Section>
  );
}

function ResultsGallery() {
  return (
    <Section className="bg-[#eef2f1]">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8d7a9f]">
            Results gallery
          </p>
          <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Environment and education before outcome claims.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#596570]">
            The gallery is intentionally positioned as a consent and review-ready placeholder.
            Replace it with approved client media only after local review.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {beautyAestheticContent.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={[
                "min-h-72 border border-[#bec8cb] bg-white p-4",
                index === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[36rem]" : ""
              ].join(" ")}
            >
              <div
                role="img"
                aria-label={item.alt}
                className="flex h-full min-h-64 items-end bg-[linear-gradient(135deg,#ffffff_0%,#eef2f1_35%,#8d7a9f_36%,#17212b_100%)] p-5"
              >
                <figcaption className="bg-white p-4 shadow-[var(--wtf-shadow-soft)]">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#596570]">{item.note}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ConsultationPage() {
  const content = beautyAestheticContent;

  return (
    <Section className="bg-white">
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
            Pricing follows assessment and local review.
          </h2>
          <div className="mt-6 grid gap-4">
            {content.pricing.map((item) => (
              <article key={item.title} className="border border-[#bec8cb] bg-[#f8faf9] p-5">
                <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#596570]">{item.detail}</p>
                <p className="mt-3 text-sm font-semibold text-[#344150]">{item.note}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 border-l-2 border-[#8d7a9f] pl-4 text-sm leading-7 text-[#596570]">
            {content.business.reviewReminder}
          </p>
        </div>
        <ManagedForm
          title={content.consultationForm.title}
          description={content.consultationForm.description}
          fields={content.consultationForm.fields}
          submitLabel={content.consultationForm.submitLabel}
          successMessage={content.consultationForm.successMessage}
          emptySelectLabel={content.consultationForm.emptySelectLabel}
          validationMessages={createFormValidation(content.consultationForm.validation)}
          className="bg-[#f8faf9]"
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = beautyAestheticContent;

  return (
    <Section className="bg-[#eef2f1]">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note={content.business.reviewReminder}
        />
        <div className="min-h-80 border border-[#bec8cb] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8d7a9f]">
            Before booking
          </p>
          <p className="mt-20 max-w-md [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
            Call urgent aftercare questions. Use the form for non-urgent consultation planning.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function FAQPage() {
  return (
    <Section className="bg-white">
      <Container className="max-w-3xl">
        <FAQAccordion items={beautyAestheticContent.faq} />
      </Container>
    </Section>
  );
}
