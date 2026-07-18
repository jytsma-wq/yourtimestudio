import type { CSSProperties } from "react";

import {
  appendTemplateNavigationLinks,
  createFormValidation,
  createShopSpecialtyPath,
  getShopSpecialtyNavigation,
  getShopSpecialtyPage,
  shopSpecialtyContent,
  shopSpecialtyDefaultBasePath,
  shopSpecialtyPageSlugs,
  type ShopSpecialtyPageSlug
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

import { ShopNewsletterPanel } from "../shared/shop-newsletter-panel";

export const shopSpecialtyTemplateConfig = {
  id: "shop-03-specialty",
  defaultBasePath: shopSpecialtyDefaultBasePath,
  defaultHeroImage: "/templates/shop-03-specialty/hero-specialty-shop.png",
  pageSlugs: shopSpecialtyPageSlugs,
  locale: shopSpecialtyContent.locale
} as const;

export type ShopSpecialtyTemplateProps = {
  slug: ShopSpecialtyPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

type SpecialtyProduct = (typeof shopSpecialtyContent.products)[number];

export function isShopSpecialtySlug(slug: string): slug is ShopSpecialtyPageSlug {
  return (shopSpecialtyPageSlugs as readonly string[]).includes(slug);
}

export function getShopSpecialtySeo(
  slug: ShopSpecialtyPageSlug,
  basePath = shopSpecialtyTemplateConfig.defaultBasePath
) {
  return getShopSpecialtyPage(slug, basePath).seo;
}

export function ShopSpecialtyTemplate({
  slug,
  basePath = shopSpecialtyTemplateConfig.defaultBasePath,
  heroImageSrc = shopSpecialtyTemplateConfig.defaultHeroImage
}: ShopSpecialtyTemplateProps) {
  const content = shopSpecialtyContent;
  const page = getShopSpecialtyPage(slug, basePath);
  const navigation = getShopSpecialtyNavigation(basePath);
  const themeStyle = createThemeCssVariables("shop-03-specialty") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#f7fafc] text-[#14212d]"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Store",
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
          href: createShopSpecialtyPath(basePath, "products")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#aec7d5] bg-[#f7fafc]/95 backdrop-blur"
      />
      {slug === "" ? (
        <SpecialtyHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <SpecialtyInnerPage
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
          { label: "Reviews", href: createShopSpecialtyPath(basePath, "reviews") },
          { label: "Contact", href: createShopSpecialtyPath(basePath, "contact") },
          { label: "FAQ", href: createShopSpecialtyPath(basePath, "faq") }
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

function SpecialtyHome({
  basePath,
  heroImageSrc
}: Required<Pick<ShopSpecialtyTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = shopSpecialtyContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#aec7d5] bg-[#f7fafc]">
        <Container className="grid min-h-[80svh] gap-10 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2b6f91]">
              Specialty coffee equipment
            </p>
            <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#566b78] sm:text-lg">
              {content.hero.subtitle}
            </p>
            <div className="relative mt-6 min-h-48 overflow-hidden border border-[#aec7d5] bg-white shadow-[var(--wtf-shadow-soft)] lg:hidden">
              <Image
                src={heroImageSrc}
                alt="specialty coffee equipment workbench with scale, kettle, dripper, filters, and comparison notes."
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createShopSpecialtyPath(basePath, "products")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createShopSpecialtyPath(basePath, "expert-advice")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-xl border-l-2 border-[#2b6f91] pl-4 text-sm leading-7 text-[#566b78]">
              {content.hero.expertNote}
            </p>
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-[1fr_0.72fr]">
            <div className="relative min-h-[35rem] overflow-hidden border border-[#aec7d5] bg-white shadow-[var(--wtf-shadow-elevated)]">
              <Image
                src={heroImageSrc}
                alt="specialty coffee equipment workbench with scale, kettle, dripper, filters, and comparison notes."
                fill
                loading="eager"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#f7fafc]/94 p-4 text-sm font-semibold shadow-[var(--wtf-shadow-soft)]">
                Compare by routine, counter space and maintenance before any checkout exists.
              </div>
            </div>
            <div className="grid content-end gap-3">
              {content.hero.proofPoints.map((point) => (
                <p
                  key={point}
                  className="border-t border-[#2b6f91] pt-3 text-sm leading-6 text-[#14212d]"
                >
                  {point}
                </p>
              ))}
              <div className="border border-[#aec7d5] bg-white p-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#566b78]">
                No payments in demo
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#14212d] text-white">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a9d4e8]">
              Categories
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Product discovery starts with what the buyer is trying to fix.
            </h2>
            <Button
              href={createShopSpecialtyPath(basePath, "categories")}
              variant="secondary"
              className="mt-7 border-white bg-transparent text-white"
            >
              Browse categories
            </Button>
          </div>
          <CategoryGrid dark />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <ProductGrid basePath={basePath} />
          <ComparisonSnapshot basePath={basePath} />
        </Container>
      </Section>

      <Section className="bg-[#e7eff4]">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <BuyingGuideList />
          <ExpertAdvicePanel basePath={basePath} />
        </Container>
      </Section>
    </main>
  );
}

type InnerProps = Required<Pick<ShopSpecialtyTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: ShopSpecialtyPageSlug;
  title: string;
  intro: string;
};

function SpecialtyInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "products" ? <ProductsPage basePath={basePath} /> : null}
      {slug === "products/grind-by-weight-scale" ? <ProductDetailPage basePath={basePath} /> : null}
      {slug === "categories" ? <CategoriesPage /> : null}
      {slug === "comparison" ? <ComparisonPage /> : null}
      {slug === "buying-guide" ? <BuyingGuidePage /> : null}
      {slug === "expert-advice" ? <ExpertAdvicePage basePath={basePath} /> : null}
      {slug === "reviews" ? <ReviewsPage /> : null}
      {slug === "cart-preview" ? <CartPreviewPage basePath={basePath} /> : null}
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
      homeLabel={shopSpecialtyContent.business.name}
      sectionClassName="border-[#aec7d5] bg-[#f7fafc]"
      containerClassName="lg:grid-cols-[0.82fr_1.18fr]"
      linkClassName="text-[#2b6f91]"
      introClassName="text-[#566b78]"
      mediaClassName="relative min-h-72 overflow-hidden border border-[#aec7d5] bg-white"
      media={
        <Image
          src={heroImageSrc}
          alt="specialty shop image with coffee scale, brewer, kettle, and product note cards."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function getProductHref(basePath: string, product: SpecialtyProduct) {
  return createShopSpecialtyPath(
    basePath,
    product.slug === "grind-by-weight-scale" ? "products/grind-by-weight-scale" : "comparison"
  );
}

function ProductGrid({ basePath }: { basePath: string }) {
  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2b6f91]">Products</p>
        <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
          Spec cards for decisions, not generic shopping.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {shopSpecialtyContent.products.map((product) => (
          <ProductCard key={product.name} product={product} basePath={basePath} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, basePath }: { product: SpecialtyProduct; basePath: string }) {
  return (
    <article className="border border-[#aec7d5] bg-[#f7fafc] p-4 shadow-[var(--wtf-shadow-soft)]">
      <div
        role="img"
        aria-label={`${product.name} product placeholder with coffee equipment bench styling.`}
        className="flex aspect-[4/3] items-end bg-[linear-gradient(135deg,#ffffff_0%,#e7eff4_38%,#2b6f91_39%,#14212d_100%)] p-4"
      >
        <span className="bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2b6f91]">
          {product.category}
        </span>
      </div>
      <h3 className="mt-4 [font-family:var(--wtf-font-heading)] text-2xl font-semibold">
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#566b78]">{product.summary}</p>
      <div className="mt-4 grid gap-2 border-y border-[#aec7d5] py-3 text-sm">
        {product.specs.slice(0, 2).map((spec) => (
          <div key={spec.label} className="flex justify-between gap-4">
            <span className="text-[#566b78]">{spec.label}</span>
            <span className="font-semibold">{spec.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">{product.price}</span>
        <a
          href={getProductHref(basePath, product)}
          className="font-semibold text-[#2b6f91] hover:text-[#14212d] focus:outline-none focus:ring-2 focus:ring-[#2b6f91]"
        >
          Review
        </a>
      </div>
    </article>
  );
}

function ProductsPage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-white">
      <Container>
        <ProductGrid basePath={basePath} />
      </Container>
    </Section>
  );
}

function ProductDetailPage({ basePath }: { basePath: string }) {
  const product = shopSpecialtyContent.products[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          role="img"
          aria-label="product detail visual with scale, espresso cup, notebook, and cable."
          className="min-h-[34rem] border border-[#aec7d5] bg-[linear-gradient(135deg,#ffffff_0%,#e7eff4_32%,#2b6f91_33%,#14212d_100%)] p-5"
        >
          <div className="flex h-full items-end">
            <p className="max-w-xs bg-white p-4 text-sm font-semibold shadow-[var(--wtf-shadow-soft)]">
              Resolution, bench footprint and recipe repeatability are visible before inquiry.
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2b6f91]">
            {product.category}
          </p>
          <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
            {product.name}
          </h2>
          <p className="mt-4 text-2xl font-semibold">{product.price}</p>
          <p className="mt-5 text-base leading-8 text-[#566b78]">{product.summary}</p>
          <dl className="mt-8 grid gap-4 border-y border-[#aec7d5] py-5 text-sm sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-[#566b78]">{spec.label}</dt>
                <dd className="mt-1 font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 grid gap-2 text-sm leading-6 text-[#566b78]">
            {product.useCases.map((useCase) => (
              <li key={useCase} className="border-l-2 border-[#2b6f91] pl-3">
                {useCase}
              </li>
            ))}
          </ul>
          <Button href={createShopSpecialtyPath(basePath, "cart-preview")} className="mt-8 w-full">
            Add to cart preview
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function CategoryGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {shopSpecialtyContent.categories.map((category) => (
        <article
          key={category.name}
          className={
            dark
              ? "border border-[#a9d4e8] bg-[#f7fafc] p-5 text-[#14212d]"
              : "border border-[#aec7d5] bg-white p-5 shadow-[var(--wtf-shadow-soft)]"
          }
        >
          <h3 className="[font-family:var(--wtf-font-heading)] text-3xl font-semibold">
            {category.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#566b78]">{category.summary}</p>
          <p className="mt-4 border-t border-[#aec7d5] pt-3 text-sm font-semibold">
            {category.criteria}
          </p>
        </article>
      ))}
    </div>
  );
}

function CategoriesPage() {
  return (
    <Section className="bg-[#e7eff4]">
      <Container>
        <CategoryGrid />
      </Container>
    </Section>
  );
}

function ComparisonSnapshot({ basePath }: { basePath: string }) {
  return (
    <div className="self-start border border-[#aec7d5] bg-[#f7fafc] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2b6f91]">Compare</p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        Decision support sits next to product discovery.
      </h2>
      <div className="mt-6 grid gap-3">
        {shopSpecialtyContent.comparison.map((row) => (
          <article key={row.product} className="border-t border-[#aec7d5] pt-3 text-sm">
            <h3 className="font-semibold">{row.product}</h3>
            <p className="mt-2 text-[#566b78]">{row.bestFor}</p>
          </article>
        ))}
      </div>
      <Button href={createShopSpecialtyPath(basePath, "comparison")} className="mt-7">
        Open comparison
      </Button>
    </div>
  );
}

function ComparisonPage() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-4">
          {shopSpecialtyContent.comparison.map((row) => (
            <article
              key={row.product}
              className="grid gap-4 border border-[#aec7d5] bg-[#f7fafc] p-5 md:grid-cols-[0.7fr_0.9fr_0.7fr_1fr]"
            >
              <h2 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {row.product}
              </h2>
              <p className="text-sm leading-7 text-[#566b78]">{row.bestFor}</p>
              <p className="text-sm font-semibold">{row.keySpec}</p>
              <p className="text-sm leading-7 text-[#566b78]">{row.expertNote}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function BuyingGuideList() {
  return (
    <div className="grid gap-4">
      {shopSpecialtyContent.buyingGuide.map((item, index) => (
        <article
          key={item.title}
          className="grid gap-4 border-t border-[#2b6f91] pt-5 sm:grid-cols-[4rem_1fr]"
        >
          <p className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold text-[#2b6f91]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#566b78]">{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function BuyingGuidePage() {
  return (
    <Section className="bg-[#e7eff4]">
      <Container className="max-w-4xl">
        <BuyingGuideList />
      </Container>
    </Section>
  );
}

function ExpertAdvicePanel({ basePath }: { basePath: string }) {
  return (
    <div className="border border-[#aec7d5] bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2b6f91]">
        Expert advice
      </p>
      <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        Advice content keeps the shop specialist, not generic.
      </h2>
      <div className="mt-6 grid gap-4">
        {shopSpecialtyContent.expertAdvice.map((item) => (
          <article key={item.title} className="border-t border-[#aec7d5] pt-4">
            <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#566b78]">{item.detail}</p>
          </article>
        ))}
      </div>
      <Button href={createShopSpecialtyPath(basePath, "cart-preview")} className="mt-7">
        Build cart preview
      </Button>
    </div>
  );
}

function ExpertAdvicePage({ basePath }: { basePath: string }) {
  return (
    <Section className="bg-white">
      <Container className="max-w-4xl">
        <ExpertAdvicePanel basePath={basePath} />
      </Container>
    </Section>
  );
}

function ReviewsPage() {
  return (
    <Section className="bg-white">
      <Container className="grid gap-4 md:grid-cols-2">
        {shopSpecialtyContent.testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </Container>
    </Section>
  );
}

function CartPreviewPage({ basePath }: { basePath: string }) {
  const content = shopSpecialtyContent;
  const product = content.products[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
            Cart preview is an inquiry flow until commerce is connected.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#566b78]">
            This route intentionally does not process payments, stock, shipping, tax, accounts or
            order management. Connect real commerce infrastructure before accepting checkout.
          </p>
          <aside className="mt-6 border border-[#aec7d5] bg-[#f7fafc] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2b6f91]">
              Demo item
            </p>
            <div className="mt-4 flex justify-between gap-4 text-sm">
              <p className="font-semibold">{product.name}</p>
              <p>{product.price}</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-[#566b78]">
              Use the preview as a checklist for backend product, inventory and checkout mapping.
            </p>
            <Button
              href={createShopSpecialtyPath(basePath, "products")}
              variant="secondary"
              className="mt-5"
            >
              Return to products
            </Button>
          </aside>
        </div>
        <ManagedForm
          title={content.cartPreview.title}
          description={content.cartPreview.description}
          fields={content.cartPreview.fields}
          submitLabel={content.cartPreview.submitLabel}
          successMessage={content.cartPreview.successMessage}
          emptySelectLabel={content.cartPreview.emptySelectLabel}
          validationMessages={createFormValidation(content.cartPreview.validation)}
          className="bg-[#f7fafc]"
        />
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = shopSpecialtyContent;

  return (
    <Section className="bg-[#e7eff4]">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Use this block for pickup policies, bench demo appointments and future commerce support."
        />
        <ShopNewsletterPanel
          newsletter={content.newsletter}
          className="border border-[#aec7d5] bg-white p-5 shadow-[var(--wtf-shadow-soft)]"
        />
      </Container>
    </Section>
  );
}

function FAQPage() {
  return (
    <Section className="bg-white">
      <Container className="max-w-3xl">
        <FAQAccordion items={shopSpecialtyContent.faq} />
      </Container>
    </Section>
  );
}
