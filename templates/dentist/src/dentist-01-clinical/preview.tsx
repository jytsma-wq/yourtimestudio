import type { CSSProperties } from "react";

import {
  createDentistClinicalPath,
  createFormValidation,
  dentistClinicalContent,
  dentistClinicalDefaultBasePath,
  dentistClinicalPageSlugs,
  getDentistClinicalNavigation,
  getDentistClinicalPage,
  type DentistClinicalPageSlug
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

export const dentistClinicalTemplateConfig = {
  id: "dentist-01-clinical",
  defaultBasePath: dentistClinicalDefaultBasePath,
  defaultHeroImage: "/templates/dentist-01-clinical/hero-clinic.png",
  pageSlugs: dentistClinicalPageSlugs,
  locale: dentistClinicalContent.locale
} as const;

export type DentistClinicalTemplateProps = {
  slug: DentistClinicalPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isDentistClinicalSlug(slug: string): slug is DentistClinicalPageSlug {
  return (dentistClinicalPageSlugs as readonly string[]).includes(slug);
}

export function getDentistClinicalSeo(
  slug: DentistClinicalPageSlug,
  basePath = dentistClinicalTemplateConfig.defaultBasePath
) {
  return getDentistClinicalPage(slug, basePath).seo;
}

export function DentistClinicalTemplate({
  slug,
  basePath = dentistClinicalTemplateConfig.defaultBasePath,
  heroImageSrc = dentistClinicalTemplateConfig.defaultHeroImage
}: DentistClinicalTemplateProps) {
  const content = dentistClinicalContent;
  const page = getDentistClinicalPage(slug, basePath);
  const navigation = getDentistClinicalNavigation(basePath);
  const themeStyle = createThemeCssVariables("dentist-01-clinical") as CSSProperties;
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
          href: createDentistClinicalPath(basePath, "appointment")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#b7d0e6] bg-white/95"
      />
      {slug === "" ? (
        <DentistHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <DentistInnerPage
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
          { label: "Contact", href: createDentistClinicalPath(basePath, "contact") },
          { label: "FAQ", href: createDentistClinicalPath(basePath, "faq") }
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

function DentistHome({
  basePath,
  heroImageSrc
}: Required<Pick<DentistClinicalTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = dentistClinicalContent;

  return (
    <main>
      <section className="relative min-h-[78svh] overflow-hidden">
        <Image
          src={heroImageSrc}
          alt="Original modern dental clinic consultation room with clean cabinetry and daylight."
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-white/45 lg:from-white/92 lg:via-white/72 lg:to-transparent" />
        <Container className="relative flex min-h-[78svh] items-center pb-12 pt-24">
          <div className="max-w-2xl">
            <h1 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.06] tracking-tight text-[#112033] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#546b80] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createDentistClinicalPath(basePath, "appointment")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={`tel:${content.business.emergencyPhone}`} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-7 max-w-xl border-l border-[#1d75bd] pl-4 text-sm leading-7 text-[#546b80]">
              {content.hero.safetyNote}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#112033] py-5 text-white">
        <Container className="grid gap-4 text-sm md:grid-cols-[1fr_auto_auto] md:items-center">
          <p className="leading-6">
            Dental emergency? Call first so the clinic can triage timing, comfort, and next steps.
          </p>
          <a
            className="font-semibold underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            href={`tel:${content.business.emergencyPhone}`}
          >
            {content.business.emergencyPhone}
          </a>
          <Button
            href={createDentistClinicalPath(basePath, "emergency-dental")}
            className="!bg-white !text-[#112033]"
          >
            Emergency guidance
          </Button>
        </Container>
      </section>

      <Section className="bg-[#f7fbff]">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              Treatments written for decisions, not pressure.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#546b80]">
              Clearline keeps treatment summaries tied to process, duration, and realistic
              expectations. It avoids guaranteed outcomes and aggressive medical advertising.
            </p>
          </div>
          <div className="grid gap-4">
            {content.treatments.map((treatment) => (
              <article
                key={treatment.name}
                className="grid gap-4 border border-[#b7d0e6] bg-white p-5 md:grid-cols-[0.45fr_1fr_auto]"
              >
                <h3 className="text-2xl font-semibold tracking-tight">{treatment.name}</h3>
                <div>
                  <p className="text-sm leading-7 text-[#546b80]">{treatment.summary}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#1d75bd]">
                    {treatment.expectations}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{treatment.duration}</p>
                  <Button
                    href={createDentistClinicalPath(basePath, treatment.slug)}
                    variant="secondary"
                    className="mt-3"
                  >
                    Details
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">
              Hygiene, credentials, and insurance stay near the appointment path.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p
                  key={point}
                  className="border-t border-[#1d75bd] pt-4 text-sm leading-6 text-[#546b80]"
                >
                  {point}
                </p>
              ))}
            </div>
          </div>
          <Card className="rounded-[var(--wtf-radius-md)] shadow-none">
            <h3 className="text-2xl font-semibold tracking-tight">Medical/legal review reminder</h3>
            <p className="mt-4 text-sm leading-7 text-[#546b80]">
              Review clinical claims, pricing language, emergency guidance, privacy, consent, and
              regulated advertising rules before launch.
            </p>
          </Card>
        </Container>
      </Section>

      <Section className="bg-[#e8f2fb]">
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl text-4xl font-semibold tracking-tight">
              A team section that earns trust quietly.
            </h2>
            <Button href={createDentistClinicalPath(basePath, "team")} variant="secondary">
              Meet the team
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {content.team.map((member) => (
              <article key={member.name} className="border border-[#b7d0e6] bg-white p-5">
                <h3 className="text-2xl font-semibold tracking-tight">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#1d75bd]">{member.credentials}</p>
                <p className="mt-4 text-sm leading-7 text-[#546b80]">{member.focus}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-6 md:grid-cols-2">
          {content.reviews.map((review) => (
            <TestimonialCard
              key={review.author}
              quote={review.quote}
              author={review.author}
              context={review.context}
            />
          ))}
        </Container>
      </Section>
    </main>
  );
}

function DentistInnerPage({
  slug,
  title,
  intro,
  basePath,
  heroImageSrc
}: {
  slug: Exclude<DentistClinicalPageSlug, "">;
  title: string;
  intro: string;
  basePath: string;
  heroImageSrc: string;
}) {
  return (
    <main>
      <section className="border-b border-[#b7d0e6] bg-white py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Link className="text-sm font-semibold text-[#1d75bd]" href={basePath}>
              {dentistClinicalContent.business.name}
            </Link>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight">
              {title}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#546b80]">{intro}</p>
        </Container>
      </section>

      {slug === "treatments" ? <TreatmentsPage basePath={basePath} /> : null}
      {slug === "treatments/preventive-care" ? (
        <TreatmentDetailPage basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : null}
      {slug === "team" ? <TeamPage /> : null}
      {slug === "pricing-insurance" ? <PricingInsurancePage basePath={basePath} /> : null}
      {slug === "reviews" ? <ReviewsPage /> : null}
      {slug === "emergency-dental" ? <EmergencyPage basePath={basePath} /> : null}
      {slug === "appointment" ? <AppointmentPage /> : null}
      {slug === "contact" ? <DentistContactPage basePath={basePath} /> : null}
      {slug === "faq" ? (
        <Section className="bg-[#f7fbff]">
          <Container className="max-w-3xl">
            <FAQAccordion items={dentistClinicalContent.faq} />
          </Container>
        </Section>
      ) : null}
    </main>
  );
}

function TreatmentsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#f7fbff]">
      <Container className="grid gap-5">
        {dentistClinicalContent.treatments.map((treatment) => (
          <article
            key={treatment.name}
            className="grid gap-4 border-b border-[#b7d0e6] pb-5 md:grid-cols-[0.45fr_1fr_auto]"
          >
            <h2 className="text-3xl font-semibold tracking-tight">{treatment.name}</h2>
            <div>
              <p className="text-sm leading-7 text-[#546b80]">{treatment.summary}</p>
              <p className="mt-2 text-sm text-[#546b80]">{treatment.expectations}</p>
            </div>
            <Button href={createDentistClinicalPath(basePath, treatment.slug)} variant="secondary">
              Details
            </Button>
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
  const treatment = dentistClinicalContent.treatments[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[30rem] overflow-hidden border border-[#b7d0e6]">
          <Image
            src={heroImageSrc}
            alt="Bright dental clinic consultation room with ergonomic chair and clean cabinetry."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">{treatment.name}</h2>
          <p className="mt-4 text-sm leading-7 text-[#546b80]">{treatment.summary}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-[#b7d0e6] py-4 text-sm">
            <div>
              <dt className="text-[#546b80]">Typical visit</dt>
              <dd className="font-semibold">{treatment.duration}</dd>
            </div>
            <div>
              <dt className="text-[#546b80]">Expectation</dt>
              <dd className="font-semibold">Exam-led</dd>
            </div>
          </dl>
          <div className="mt-6 border-l border-[#1d75bd] pl-4 text-sm leading-7 text-[#546b80]">
            Recommendations depend on the clinician's exam, X-rays when appropriate, medical
            history, and patient consent.
          </div>
          <Button href={createDentistClinicalPath(basePath, "appointment")} className="mt-7">
            Book preventive visit
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function TeamPage() {
  return (
    <Section className="bg-[#e8f2fb]">
      <Container className="grid gap-4 md:grid-cols-3">
        {dentistClinicalContent.team.map((member) => (
          <Card key={member.name} className="rounded-[var(--wtf-radius-md)] bg-white shadow-none">
            <h2 className="text-3xl font-semibold tracking-tight">{member.name}</h2>
            <p className="mt-2 text-sm font-semibold text-[#1d75bd]">{member.credentials}</p>
            <p className="mt-4 text-sm leading-7 text-[#546b80]">{member.focus}</p>
          </Card>
        ))}
      </Container>
    </Section>
  );
}

function PricingInsurancePage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-white">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">Insurance before assumptions.</h2>
          <p className="mt-4 text-sm leading-7 text-[#546b80]">
            Pricing and insurance content must avoid cheapest-treatment claims and explain that
            estimates depend on exam findings and plan verification.
          </p>
          <Button href={createDentistClinicalPath(basePath, "appointment")} className="mt-7">
            Verify before visit
          </Button>
        </div>
        <div className="grid gap-3">
          {dentistClinicalContent.insurance.map((item) => (
            <p
              key={item}
              className="border border-[#b7d0e6] bg-[#f7fbff] p-4 text-sm text-[#546b80]"
            >
              {item}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ReviewsPage() {
  return (
    <Section className="bg-white">
      <Container className="grid gap-6 md:grid-cols-2">
        {dentistClinicalContent.reviews.map((review) => (
          <TestimonialCard
            key={review.author}
            quote={review.quote}
            author={review.author}
            context={review.context}
          />
        ))}
      </Container>
    </Section>
  );
}

function EmergencyPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-[#112033] text-white">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            Call first for urgent dental concerns.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#cde0ef]">
            Emergency content should guide patients to call, describe what information the clinic
            may request, and avoid replacing professional diagnosis.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              href={`tel:${dentistClinicalContent.business.emergencyPhone}`}
              className="!bg-white !text-[#112033]"
            >
              Call emergency line
            </Button>
            <Button
              href={createDentistClinicalPath(basePath, "appointment")}
              variant="secondary"
              className="!border-white/60 !bg-transparent !text-white hover:!bg-white/10"
            >
              Request appointment
            </Button>
          </div>
        </div>
        <div className="grid gap-3 text-sm text-[#cde0ef]">
          {["Severe pain", "Swelling", "Broken tooth", "Lost restoration"].map((item) => (
            <p key={item} className="border-l border-[#cde0ef] pl-4">
              {item}: call so the clinic can advise timing and next steps.
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function AppointmentPage() {
  const appointment = dentistClinicalContent.appointment;

  return (
    <Section className="bg-[#f7fbff]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            Appointment forms should stay useful without collecting sensitive history.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#546b80]">
            This request form collects contact, visit type, date, and optional insurance provider. A
            real clinic should use secure intake for health history and consent.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-[#546b80]">
            {dentistClinicalContent.business.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
        </div>
        <ManagedForm
          title={appointment.title}
          description={appointment.description}
          fields={appointment.fields}
          submitLabel={appointment.submitLabel}
          successMessage={appointment.successMessage}
          emptySelectLabel={appointment.emptySelectLabel}
          validationMessages={createFormValidation(appointment.validation)}
          className="bg-white"
        />
      </Container>
    </Section>
  );
}

function DentistContactPage({ basePath }: { basePath: string }) {
  const content = dentistClinicalContent;

  return (
    <Section className="bg-white">
      <Container className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[var(--wtf-radius-md)] shadow-none">
          <LocationBlock
            name={content.business.name}
            address={content.business.address}
            phone={content.business.phone}
            email={content.business.email}
            hours={content.business.hours}
            note="Keep parking, accessibility, privacy, and first-visit preparation details visible in HTML."
          />
        </Card>
        <Card className="rounded-[var(--wtf-radius-md)] shadow-none">
          <h2 className="text-3xl font-semibold tracking-tight">Before your visit</h2>
          <p className="mt-4 text-sm leading-7 text-[#546b80]">
            Bring ID, insurance details if applicable, a medication list if requested by secure
            intake, and questions for the clinician. This template is not medical advice.
          </p>
          <Button href={createDentistClinicalPath(basePath, "appointment")} className="mt-6">
            Book appointment
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
