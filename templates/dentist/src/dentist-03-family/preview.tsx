import type { CSSProperties } from "react";

import {
  appendTemplateNavigationLinks,
  createDentistFamilyPath,
  createFormValidation,
  dentistFamilyContent,
  dentistFamilyDefaultBasePath,
  dentistFamilyPageSlugs,
  getDentistFamilyNavigation,
  getDentistFamilyPage,
  type DentistFamilyPageSlug
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

export const dentistFamilyTemplateConfig = {
  id: "dentist-03-family",
  defaultBasePath: dentistFamilyDefaultBasePath,
  defaultHeroImage: "/templates/dentist-03-family/hero-family-dental.png",
  pageSlugs: dentistFamilyPageSlugs,
  locale: dentistFamilyContent.locale
} as const;

export type DentistFamilyTemplateProps = {
  slug: DentistFamilyPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

export function isDentistFamilySlug(slug: string): slug is DentistFamilyPageSlug {
  return (dentistFamilyPageSlugs as readonly string[]).includes(slug);
}

export function getDentistFamilySeo(
  slug: DentistFamilyPageSlug,
  basePath = dentistFamilyTemplateConfig.defaultBasePath
) {
  return getDentistFamilyPage(slug, basePath).seo;
}

export function DentistFamilyTemplate({
  slug,
  basePath = dentistFamilyTemplateConfig.defaultBasePath,
  heroImageSrc = dentistFamilyTemplateConfig.defaultHeroImage
}: DentistFamilyTemplateProps) {
  const content = dentistFamilyContent;
  const page = getDentistFamilyPage(slug, basePath);
  const navigation = getDentistFamilyNavigation(basePath);
  const footerLinks = appendTemplateNavigationLinks(navigation, [
    { label: "Contact", href: createDentistFamilyPath(basePath, "contact") },
    { label: "FAQ", href: createDentistFamilyPath(basePath, "faq") }
  ]);
  const themeStyle = createThemeCssVariables("dentist-03-family") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#fffaf0] text-[#22313f]"
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
          href: createDentistFamilyPath(basePath, "appointment")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#bfd9df] bg-[#fffaf0]/95"
      />
      {slug === "" ? (
        <FamilyDentalHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <FamilyDentalInnerPage
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

function FamilyDentalHome({
  basePath,
  heroImageSrc
}: Required<Pick<DentistFamilyTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = dentistFamilyContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#bfd9df] bg-[#fffaf0]">
        <Container className="grid min-h-[78svh] gap-10 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="pt-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#287a68]">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5b7180]">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createDentistFamilyPath(basePath, "appointment")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createDentistFamilyPath(basePath, "team")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 rounded-[var(--wtf-radius-lg)] border border-[#bfd9df] bg-white p-4 text-sm leading-7 text-[#5b7180]">
              {content.hero.safetyNote}
            </p>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-[#bfd9df] bg-[#edf7fb] shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="warm family dental reception with parent information cards, child chair and calm clinical room."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[var(--wtf-radius-lg)] bg-white/94 p-4 text-sm shadow-[var(--wtf-shadow-soft)] sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p key={point} className="border-t border-[#2f8ccf] pt-3">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
          <SectionLead
            eyebrow="Family services"
            title="Care cards answer what parents ask before they call."
          />
          <ServiceCards basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#edf7fb]">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <KidsPanel />
          <FirstVisitPanel />
        </Container>
      </Section>

      <Section className="bg-[#22313f] text-white">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <PreventivePanel />
          <ComfortPanel />
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

type InnerProps = Required<Pick<DentistFamilyTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: DentistFamilyPageSlug;
  title: string;
  intro: string;
};

function FamilyDentalInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "services" ? <ServicesPage basePath={basePath} /> : null}
      {slug === "services/child-checkup" ? <ServiceDetailPage basePath={basePath} /> : null}
      {slug === "kids-dentistry" ? <KidsPage /> : null}
      {slug === "preventive-care" ? <PreventivePage /> : null}
      {slug === "team" ? <TeamPage /> : null}
      {slug === "first-visit" ? <FirstVisitPage /> : null}
      {slug === "reviews" ? <ReviewsPage /> : null}
      {slug === "appointment" ? <AppointmentPage /> : null}
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
      homeLabel={dentistFamilyContent.business.name}
      sectionClassName="border-[#bfd9df] bg-[#fffaf0]"
      linkClassName="text-[#287a68]"
      introClassName="text-[#5b7180]"
      mediaClassName="relative min-h-72 overflow-hidden rounded-[2rem] border border-[#bfd9df]"
      media={
        <Image
          src={heroImageSrc}
          alt="warm family dental visual with reception, parent notes and clinical room."
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
      <p className="text-sm font-semibold uppercase tracking-wide text-[#287a68]">{eyebrow}</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        {title}
      </h2>
    </div>
  );
}

function ServiceCards({ basePath }: { basePath: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {dentistFamilyContent.services.map((service) => (
        <article
          key={service.name}
          className="rounded-[var(--wtf-radius-xl)] border border-[#bfd9df] bg-[#fffaf0] p-5 shadow-[var(--wtf-shadow-soft)]"
        >
          <p className="text-sm font-semibold text-[#287a68]">{service.duration}</p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {service.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#5b7180]">{service.summary}</p>
          <p className="mt-4 text-sm font-semibold">{service.priceFrom}</p>
          <Button
            href={createDentistFamilyPath(basePath, service.slug as DentistFamilyPageSlug)}
            variant="secondary"
            className="mt-5"
          >
            Service details
          </Button>
        </article>
      ))}
    </div>
  );
}

function ServicesPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container>
        <ServiceCards basePath={basePath} />
      </Container>
    </Section>
  );
}

function ServiceDetailPage({ basePath }: { basePath: string }) {
  const service = dentistFamilyContent.services[0];

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            {service.name} with parent questions built in.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#5b7180]">{service.summary}</p>
          <p className="mt-5 border-l border-[#287a68] pl-4 text-sm leading-7 text-[#5b7180]">
            Suitability, timing and fees must be confirmed after an exam and clinician review.
          </p>
        </div>
        <div className="rounded-[var(--wtf-radius-xl)] border border-[#bfd9df] bg-white p-6">
          {dentistFamilyContent.firstVisit.map((item) => (
            <article key={item.title} className="border-t border-[#bfd9df] py-4 first:border-t-0">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#5b7180]">{item.detail}</p>
            </article>
          ))}
          <Button href={createDentistFamilyPath(basePath, "appointment")} className="mt-5 w-full">
            Book family visit
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function KidsPanel() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#2f8ccf]">Kids dentistry</p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Reassuring without becoming childish.
      </h2>
      <div className="mt-7 grid gap-4">
        {dentistFamilyContent.kidsDentistry.map((item) => (
          <article key={item.title} className="border-t border-[#bfd9df] pt-4">
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#5b7180]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function KidsPage() {
  return (
    <Section className="bg-[#edf7fb]">
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <KidsPanel />
        <ComfortPanel light />
      </Container>
    </Section>
  );
}

function PreventivePanel() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#bfd9df]">
        Preventive care
      </p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
        Prevention is a sequence, not a slogan.
      </h2>
      <div className="mt-7 grid gap-4">
        {dentistFamilyContent.preventiveCare.map((item) => (
          <article
            key={item.step}
            className="grid gap-4 border-t border-[#bfd9df] pt-4 sm:grid-cols-[4rem_1fr]"
          >
            <p className="[font-family:var(--wtf-font-heading)] text-3xl text-[#bfd9df]">
              {item.step}
            </p>
            <div>
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#edf7fb]">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PreventivePage() {
  return (
    <Section className="bg-[#22313f] text-white">
      <Container>
        <PreventivePanel />
      </Container>
    </Section>
  );
}

function FirstVisitPanel() {
  return (
    <div className="rounded-[var(--wtf-radius-xl)] bg-white p-6 shadow-[var(--wtf-shadow-soft)]">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#287a68]">
        First visit checklist
      </p>
      <div className="mt-6 grid gap-4">
        {dentistFamilyContent.firstVisit.map((item) => (
          <article key={item.title} className="border-t border-[#bfd9df] pt-4">
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#5b7180]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FirstVisitPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <FirstVisitPanel />
      </Container>
    </Section>
  );
}

function ComfortPanel({ light = false }: { light?: boolean }) {
  return (
    <div
      className={
        light
          ? "rounded-[var(--wtf-radius-xl)] bg-white p-6"
          : "rounded-[var(--wtf-radius-xl)] bg-white p-6 text-[#22313f]"
      }
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-[#287a68]">
        Patient comfort
      </p>
      <ul className="mt-6 grid gap-3 text-sm leading-7">
        {dentistFamilyContent.comfort.map((item) => (
          <li key={item} className="border-t border-[#bfd9df] pt-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeamPage() {
  return (
    <Section>
      <Container className="grid gap-4 md:grid-cols-3">
        {dentistFamilyContent.team.map((person) => (
          <article
            key={person.name}
            className="rounded-[var(--wtf-radius-xl)] border border-[#bfd9df] bg-white p-6"
          >
            <p className="text-sm font-semibold text-[#287a68]">{person.role}</p>
            <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-semibold">
              {person.name}
            </h2>
            <p className="mt-2 text-sm font-semibold">{person.credentials}</p>
            <p className="mt-4 text-sm leading-7 text-[#5b7180]">{person.focus}</p>
          </article>
        ))}
      </Container>
    </Section>
  );
}

function ReviewsPage() {
  return (
    <Section>
      <Container className="grid gap-6 md:grid-cols-2">
        {dentistFamilyContent.testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </Container>
    </Section>
  );
}

function AppointmentPage() {
  const content = dentistFamilyContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            The form asks for scheduling context, not private diagnosis.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#5b7180]">
            Medical/legal review reminder: confirm claims, privacy, advertising rules, emergency
            policy and child-consent language before launch.
          </p>
          <p className="mt-6 rounded-[var(--wtf-radius-lg)] border border-[#bfd9df] bg-[#edf7fb] p-4 text-sm font-semibold">
            Emergency triage: {content.business.emergencyPhone}
          </p>
        </div>
        <ManagedForm
          title={content.appointment.title}
          description={content.appointment.description}
          fields={content.appointment.fields}
          submitLabel={content.appointment.submitLabel}
          successMessage={content.appointment.successMessage}
          emptySelectLabel={content.appointment.emptySelectLabel}
          validationMessages={createFormValidation(content.appointment.validation)}
          className="rounded-[var(--wtf-radius-xl)] bg-white shadow-[var(--wtf-shadow-soft)]"
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = dentistFamilyContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note={`Emergency triage by phone: ${content.business.emergencyPhone}`}
        />
        <div className="min-h-80 rounded-[var(--wtf-radius-xl)] border border-[#bfd9df] bg-[#edf7fb] p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#287a68]">
            Arrival note
          </p>
          <p className="mt-20 max-w-sm [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            Parent questions, quiet check-in, written next steps.
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
        <FAQAccordion items={dentistFamilyContent.faq} />
      </Container>
    </Section>
  );
}
