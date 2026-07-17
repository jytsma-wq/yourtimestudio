import type { CSSProperties } from "react";

import {
  createDentistCosmeticPath,
  createFormValidation,
  dentistCosmeticContent,
  dentistCosmeticDefaultBasePath,
  dentistCosmeticPageSlugs,
  getDentistCosmeticNavigation,
  getDentistCosmeticPage,
  type DentistCosmeticPageSlug
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
  TemplatePageIntro,
  TestimonialCard
} from "@website-template-factory/ui";
import Image from "next/image";

export const dentistCosmeticTemplateConfig = {
  id: "dentist-02-premium-cosmetic",
  defaultBasePath: dentistCosmeticDefaultBasePath,
  defaultHeroImage: "/templates/dentist-02-premium-cosmetic/hero-cosmetic.png",
  pageSlugs: dentistCosmeticPageSlugs,
  locale: dentistCosmeticContent.locale
} as const;

export type DentistCosmeticTemplateProps = {
  slug: DentistCosmeticPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isDentistCosmeticSlug(slug: string): slug is DentistCosmeticPageSlug {
  return (dentistCosmeticPageSlugs as readonly string[]).includes(slug);
}

export function getDentistCosmeticSeo(
  slug: DentistCosmeticPageSlug,
  basePath = dentistCosmeticTemplateConfig.defaultBasePath
) {
  return getDentistCosmeticPage(slug, basePath).seo;
}

export function DentistCosmeticTemplate({
  slug,
  basePath = dentistCosmeticTemplateConfig.defaultBasePath,
  heroImageSrc = dentistCosmeticTemplateConfig.defaultHeroImage
}: DentistCosmeticTemplateProps) {
  const content = dentistCosmeticContent;
  const page = getDentistCosmeticPage(slug, basePath);
  const navigation = getDentistCosmeticNavigation(basePath);
  const themeStyle = createThemeCssVariables("dentist-02-premium-cosmetic") as CSSProperties;
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
          "@type": "Dentist",
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
          href: createDentistCosmeticPath(basePath, "pricing-consultation")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#cdb7a5] bg-[#f9f6f3]/95"
      />
      {slug === "" ? (
        <DentistCosmeticHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <DentistCosmeticInnerPage
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
          { label: "Contact", href: createDentistCosmeticPath(basePath, "contact") },
          { label: "FAQ", href: createDentistCosmeticPath(basePath, "faq") }
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

function DentistCosmeticHome({
  basePath,
  heroImageSrc
}: Required<Pick<DentistCosmeticTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = dentistCosmeticContent;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#f9f6f3]">
        <Container className="grid min-h-[78svh] gap-10 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#a67c52]">
              Premium cosmetic dentistry
            </p>
            <h1 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#65584e] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createDentistCosmeticPath(basePath, "pricing-consultation")}>
                {content.hero.primaryCta}
              </Button>
              <Button
                href={createDentistCosmeticPath(basePath, "cosmetic-dentistry")}
                variant="secondary"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-xl border-l border-[#a67c52] pl-4 text-sm leading-7 text-[#65584e]">
              {content.hero.safetyNote}
            </p>
          </div>
          <div className="relative min-h-[35rem] overflow-hidden border border-[#cdb7a5] bg-white shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="premium cosmetic dental consultation room with imaging screen, shade tools, and calm seating."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 bg-[rgba(255,255,255,0.94)] p-5 shadow-[var(--wtf-shadow-soft)]">
              <div className="grid gap-4 text-sm md:grid-cols-3">
                {content.hero.proofPoints.map((point) => (
                  <p key={point} className="border-t border-[#a67c52] pt-3">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DecisionGuide
        eyebrow="Treatment navigator"
        title="Begin with the question, not a promise."
        description="This short guide points patients toward the right educational page before a consultation is requested."
        prompt="What would you like to understand?"
        options={[
          {
            id: "appearance",
            label: "Shape or colour",
            resultEyebrow: "Read first",
            resultTitle: "Cosmetic options and suitability",
            resultBody:
              "Compare conservative treatment routes, staging and the questions a clinician should answer before planning begins.",
            href: createDentistCosmeticPath(basePath, "cosmetic-dentistry"),
            ctaLabel: "Explore cosmetic care"
          },
          {
            id: "missing",
            label: "A missing tooth",
            resultEyebrow: "Read first",
            resultTitle: "Implant assessment and maintenance",
            resultBody:
              "Review imaging, timing, alternatives and long-term care before discussing whether an implant is suitable.",
            href: createDentistCosmeticPath(basePath, "implants"),
            ctaLabel: "Understand implants"
          },
          {
            id: "plan",
            label: "A complete plan",
            resultEyebrow: "Next step",
            resultTitle: "Consultation with written staging",
            resultBody:
              "Bring priorities and questions to a consultation designed to separate immediate needs from optional work.",
            href: createDentistCosmeticPath(basePath, "pricing-consultation"),
            ctaLabel: "Plan a consultation"
          }
        ]}
        className="bg-[#eee5de]"
      />

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Treatment pages that slow the decision down.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#65584e]">
              Cosmetic pages explain consultation, diagnostics, staging, and aftercare before any
              patient is asked to commit.
            </p>
          </div>
          <TreatmentCards basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#1f2528] text-white">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ImplantJourney />
          <div className="self-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#cdb7a5]">
              Smile gallery standard
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Visual proof must never imply a guaranteed result.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#eee5de]">
              Gallery content is framed as case-dependent, consent-dependent, and subject to local
              advertising review.
            </p>
            <Button
              href={createDentistCosmeticPath(basePath, "smile-gallery")}
              className="mt-7 !bg-white !text-[#1f2528]"
            >
              View gallery guidance
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#eee5de]">
        <Container className="grid gap-6 md:grid-cols-3">
          {content.technology.map((item) => (
            <Card key={item.title} className="rounded-sm bg-white shadow-none">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#65584e]">{item.detail}</p>
            </Card>
          ))}
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

type InnerProps = Required<Pick<DentistCosmeticTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: DentistCosmeticPageSlug;
  title: string;
  intro: string;
};

function DentistCosmeticInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "cosmetic-dentistry" ? <CosmeticDentistryPage basePath={basePath} /> : null}
      {slug === "implants" ? <ImplantsPage basePath={basePath} /> : null}
      {slug === "treatments/digital-smile-design" ? (
        <TreatmentDetailPage basePath={basePath} />
      ) : null}
      {slug === "smile-gallery" ? <SmileGalleryPage /> : null}
      {slug === "technology" ? <TechnologyPage /> : null}
      {slug === "team" ? <TeamPage /> : null}
      {slug === "pricing-consultation" ? <ConsultationPage /> : null}
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
      homeLabel="Vellum Dental Atelier"
      sectionClassName="border-[#cdb7a5] bg-[#f9f6f3]"
      linkClassName="text-[#a67c52]"
      introClassName="text-[#65584e]"
      mediaClassName="relative min-h-64 overflow-hidden border border-[#cdb7a5] bg-white"
      media={
        <Image
          src={heroImageSrc}
          alt="premium dental consultation visual with calm clinical details."
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function TreatmentCards({ basePath }: { basePath: string }) {
  return (
    <div className="grid gap-4">
      {dentistCosmeticContent.treatments.map((treatment) => (
        <article
          key={treatment.name}
          className="grid gap-4 border border-[#cdb7a5] bg-[#f9f6f3] p-5 md:grid-cols-[0.45fr_1fr_auto]"
        >
          <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
            {treatment.name}
          </h3>
          <div>
            <p className="text-sm leading-7 text-[#65584e]">{treatment.summary}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#a67c52]">
              {treatment.expectations}
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">{treatment.duration}</p>
            <Button
              href={createDentistCosmeticPath(basePath, treatment.slug)}
              variant="secondary"
              className="mt-3"
            >
              Details
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function CosmeticDentistryPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Cosmetic care with checkpoints.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#65584e]">
            Every card keeps suitability, diagnosis, and maintenance near the CTA.
          </p>
        </div>
        <TreatmentCards basePath={basePath} />
      </Container>
    </Section>
  );
}

function ImplantJourney() {
  return (
    <div className="grid gap-4">
      {dentistCosmeticContent.implantJourney.map((item) => (
        <article
          key={item.step}
          className="grid gap-4 border-t border-[#cdb7a5] pt-5 sm:grid-cols-[5rem_1fr]"
        >
          <p className="[font-family:var(--wtf-font-heading)] text-4xl text-[#cdb7a5]">
            {item.step}
          </p>
          <div>
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#eee5de]">{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ImplantsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#1f2528] text-white">
      <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ImplantJourney />
        <Card className="rounded-sm bg-white text-[#1f2528] shadow-none">
          <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            Consultation-dependent by design.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#65584e]">
            Implant timing, alternatives, and costs should be confirmed after imaging, diagnosis,
            and clinician review.
          </p>
          <Button
            href={createDentistCosmeticPath(basePath, "pricing-consultation")}
            className="mt-6"
          >
            Schedule consultation
          </Button>
        </Card>
      </Container>
    </Section>
  );
}

function TreatmentDetailPage({ basePath }: { basePath: string }) {
  const treatment = dentistCosmeticContent.treatments[0];

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {treatment.name}: records before recommendations.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#65584e]">{treatment.summary}</p>
          <p className="mt-5 border-l border-[#a67c52] pl-4 text-sm leading-7 text-[#65584e]">
            {treatment.expectations}
          </p>
        </div>
        <div className="grid gap-4">
          {["Consultation", "Photography and shade notes", "Mockup discussion", "Written plan"].map(
            (step) => (
              <p key={step} className="border border-[#cdb7a5] bg-white p-4 text-sm font-semibold">
                {step}
              </p>
            )
          )}
          <Button href={createDentistCosmeticPath(basePath, "pricing-consultation")}>
            Request planning visit
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function SmileGalleryPage() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-3xl">
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Gallery placeholders with safety language built in.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#65584e]">
            Replace with consented case media only after legal review. Individual outcomes vary and
            cannot be inferred from gallery examples.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {dentistCosmeticContent.gallery.map((item, index) => (
            <figure
              key={item.title}
              className={[
                "min-h-72 border border-[#cdb7a5] bg-[#eee5de] p-4",
                index === 0 ? "md:col-span-2 md:row-span-2 md:min-h-[36rem]" : ""
              ].join(" ")}
            >
              <div
                aria-label={item.alt}
                role="img"
                className="flex h-full min-h-64 items-end bg-gradient-to-br from-[#1f2528] via-[#a67c52] to-[#eee5de] p-5"
              >
                <figcaption className="bg-white p-3 text-sm font-semibold text-[#1f2528]">
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

function TechnologyPage() {
  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-3">
        {dentistCosmeticContent.technology.map((item) => (
          <Card key={item.title} className="rounded-sm shadow-none">
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#65584e]">{item.detail}</p>
          </Card>
        ))}
      </Container>
    </Section>
  );
}

function TeamPage() {
  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-3">
        {dentistCosmeticContent.team.map((person) => (
          <article key={person.name} className="border border-[#cdb7a5] bg-white p-5">
            <h2 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {person.name}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#a67c52]">{person.credentials}</p>
            <p className="mt-4 text-sm leading-7 text-[#65584e]">{person.focus}</p>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function ConsultationPage() {
  const content = dentistCosmeticContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Pricing follows diagnosis, not pressure.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#65584e]">
            Use this page for consultation fees, estimate caveats, finance discussion, and medical
            advertising review before launch.
          </p>
          <div className="mt-6 border border-[#cdb7a5] bg-[#eee5de] p-4 text-sm leading-7">
            Medical/legal review reminder: confirm claims, consent, gallery use, pricing language,
            privacy, and regulated advertising rules locally.
          </div>
        </div>
        <ManagedForm
          title={content.appointment.title}
          description={content.appointment.description}
          fields={content.appointment.fields}
          submitLabel={content.appointment.submitLabel}
          successMessage={content.appointment.successMessage}
          emptySelectLabel={content.appointment.emptySelectLabel}
          validationMessages={createFormValidation(content.appointment.validation)}
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = dentistCosmeticContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Consultations are scheduled with privacy and enough time for records and questions."
        />
        <div className="min-h-80 border border-[#cdb7a5] bg-[#eee5de] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#a67c52]">
            Arrival note
          </p>
          <p className="mt-20 max-w-md [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Private consultation room, imaging review, written next steps.
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
        <FAQAccordion items={dentistCosmeticContent.faq} />
      </Container>
    </Section>
  );
}
