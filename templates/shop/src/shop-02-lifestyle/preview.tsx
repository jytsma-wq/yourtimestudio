import type { CSSProperties } from "react";

import {
  createShopLifestylePath,
  getShopLifestyleNavigation,
  getShopLifestylePage,
  shopLifestyleContent,
  shopLifestyleDefaultBasePath,
  shopLifestylePageSlugs,
  type ShopLifestylePageSlug
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
  Section,
  TemplatePageIntro
} from "@website-template-factory/ui";
import Image from "next/image";
import Link from "next/link";

import { ShopNewsletterPanel } from "../shared/shop-newsletter-panel";

export const shopLifestyleTemplateConfig = {
  id: "shop-02-lifestyle",
  defaultBasePath: shopLifestyleDefaultBasePath,
  defaultHeroImage: "/templates/shop-02-lifestyle/hero-lifestyle.png",
  pageSlugs: shopLifestylePageSlugs,
  locale: shopLifestyleContent.locale
} as const;

export type ShopLifestyleTemplateProps = {
  slug: ShopLifestylePageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

type LifestyleProduct = (typeof shopLifestyleContent.products)[number];

export function isShopLifestyleSlug(slug: string): slug is ShopLifestylePageSlug {
  return (shopLifestylePageSlugs as readonly string[]).includes(slug);
}

export function getShopLifestyleSeo(
  slug: ShopLifestylePageSlug,
  basePath = shopLifestyleTemplateConfig.defaultBasePath
) {
  return getShopLifestylePage(slug, basePath).seo;
}

export function ShopLifestyleTemplate({
  slug,
  basePath = shopLifestyleTemplateConfig.defaultBasePath,
  heroImageSrc = shopLifestyleTemplateConfig.defaultHeroImage
}: ShopLifestyleTemplateProps) {
  const content = shopLifestyleContent;
  const page = getShopLifestylePage(slug, basePath);
  const navigation = getShopLifestyleNavigation(basePath);
  const themeStyle = createThemeCssVariables("shop-02-lifestyle") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#fff8f0] text-[#242018]"
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
          href: createShopLifestylePath(basePath, "categories")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#c8aa82] bg-[#fff8f0]/95"
      />
      {slug === "" ? (
        <LifestyleHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <LifestyleInnerPage
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
          { label: "Contact", href: createShopLifestylePath(basePath, "contact") },
          { label: "FAQ", href: createShopLifestylePath(basePath, "faq") }
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

function LifestyleHome({
  basePath,
  heroImageSrc
}: Required<Pick<ShopLifestyleTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = shopLifestyleContent;

  return (
    <main>
      <section className="overflow-hidden border-b border-[#c8aa82] bg-[#fff8f0]">
        <Container className="grid min-h-[76svh] gap-10 py-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="pt-14">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#c05f3c]">
              Home goods and gifts
            </p>
            <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-[1.03] sm:text-6xl lg:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#665644]">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createShopLifestylePath(basePath, "categories")}>
                {content.hero.primaryCta}
              </Button>
              <Button href={createShopLifestylePath(basePath, "gift-guide")} variant="secondary">
                {content.hero.secondaryCta}
              </Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.hero.proofPoints.map((point) => (
                <p key={point} className="border-l border-[#c05f3c] pl-3 text-sm leading-6">
                  {point}
                </p>
              ))}
            </div>
          </div>
          <div className="relative min-h-[34rem] overflow-hidden rounded-[var(--wtf-radius-xl)] border border-[#c8aa82] bg-[#ede0cc] shadow-[var(--wtf-shadow-elevated)]">
            <Image
              src={heroImageSrc}
              alt="lifestyle shop image with stoneware, linen, candles and warm table light."
              fill
              loading="eager"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-[var(--wtf-radius-md)] bg-[#fff8f0]/95 p-4 text-sm leading-6 shadow-[var(--wtf-shadow-soft)]">
              {content.hero.makerNote}
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-[#2f6d58] text-white">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#f5d6ba]">
              Categories
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Browsing starts with rooms, rituals and gift timing.
            </h2>
            <Button
              href={createShopLifestylePath(basePath, "categories")}
              variant="secondary"
              className="mt-7 border-white bg-transparent text-white"
            >
              Browse categories
            </Button>
          </div>
          <CategoryGrid basePath={basePath} dark />
        </Container>
      </Section>

      <Section className="bg-[#fff8f0]">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGrid basePath={basePath} />
          <GiftGuidePanel />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#c05f3c]">Journal</p>
            <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
              Care notes and retail operations close to the product.
            </h2>
          </div>
          <JournalGrid />
        </Container>
      </Section>
    </main>
  );
}

type InnerProps = Required<Pick<ShopLifestyleTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: ShopLifestylePageSlug;
  title: string;
  intro: string;
};

function LifestyleInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "categories" ? <CategoriesPage basePath={basePath} /> : null}
      {slug === "products/stoneware-breakfast-set" ? (
        <ProductDetailPage basePath={basePath} />
      ) : null}
      {slug === "collections" ? <CollectionsPage basePath={basePath} /> : null}
      {slug === "gift-guide" ? <GiftGuidePage /> : null}
      {slug === "about" ? <AboutPage /> : null}
      {slug === "journal" ? <JournalPage /> : null}
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
      homeLabel="Field & Hearth"
      sectionClassName="border-[#c8aa82] bg-[#fff8f0]"
      containerClassName="lg:grid-cols-[0.82fr_1.18fr]"
      linkClassName="text-[#c05f3c]"
      titleClassName="font-normal"
      introClassName="text-[#665644]"
      mediaClassName="relative min-h-72 overflow-hidden rounded-[var(--wtf-radius-lg)] border border-[#c8aa82]"
      media={
        <Image
          src={heroImageSrc}
          alt="lifestyle shop table with ceramics, candle and folded linen."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function CategoryGrid({ basePath, dark = false }: { basePath: string; dark?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {shopLifestyleContent.collections.map((collection) => (
        <Link
          key={collection.name}
          href={createShopLifestylePath(basePath, collection.slug as ShopLifestylePageSlug)}
          className={
            dark
              ? "rounded-[var(--wtf-radius-lg)] border border-[#f5d6ba] bg-[#fff8f0] p-5 text-[#242018] focus:outline-none focus:ring-2 focus:ring-[#f5d6ba]"
              : "rounded-[var(--wtf-radius-lg)] border border-[#c8aa82] bg-white p-5 shadow-[var(--wtf-shadow-soft)] focus:outline-none focus:ring-2 focus:ring-[#c05f3c]"
          }
        >
          <p className="text-sm font-semibold text-[#c05f3c]">{collection.filter}</p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-3xl font-normal">
            {collection.name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#665644]">{collection.description}</p>
        </Link>
      ))}
    </div>
  );
}

function ProductGrid({ basePath }: { basePath: string }) {
  return (
    <div>
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#c05f3c]">New arrivals</p>
        <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-normal">
          Product cards carry material and care detail.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {shopLifestyleContent.products.map((product) => (
          <ProductCard key={product.name} product={product} basePath={basePath} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, basePath }: { product: LifestyleProduct; basePath: string }) {
  return (
    <article className="rounded-[var(--wtf-radius-lg)] border border-[#c8aa82] bg-white p-4 shadow-[var(--wtf-shadow-soft)]">
      <div
        role="img"
        aria-label={product.images[0]?.alt}
        className="flex aspect-[4/3] items-end rounded-[var(--wtf-radius-md)] bg-[radial-gradient(circle_at_30%_35%,#fff8f0,#ede0cc_34%,#c8aa82_35%,#2f6d58_82%)] p-4"
      >
        <span className="rounded-full bg-[#fff8f0] px-3 py-2 text-xs font-semibold text-[#2f6d58]">
          {product.category}
        </span>
      </div>
      <h3 className="mt-4 [font-family:var(--wtf-font-heading)] text-2xl font-normal">
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#665644]">{product.description}</p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#c8aa82] pt-3 text-sm">
        <span>{product.price}</span>
        <span className="text-[#665644]">{product.inventoryStatus}</span>
      </div>
      <Link
        href={createShopLifestylePath(basePath, product.slug as ShopLifestylePageSlug)}
        className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-[var(--wtf-radius-sm)] border border-[#2f6d58] px-3 text-sm font-semibold text-[#2f6d58] hover:bg-[#2f6d58] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c05f3c]"
      >
        View product
      </Link>
    </article>
  );
}

function CategoriesPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container>
        <CategoryGrid basePath={basePath} />
      </Container>
    </Section>
  );
}

function ProductDetailPage({ basePath }: { basePath: string }) {
  const product = shopLifestyleContent.products[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          role="img"
          aria-label={product.images[0]?.alt}
          className="min-h-[34rem] rounded-[var(--wtf-radius-xl)] border border-[#c8aa82] bg-[radial-gradient(circle_at_35%_35%,#fff8f0,#ede0cc_30%,#c05f3c_31%,#2f6d58_82%)] p-5"
        >
          <div className="flex h-full items-end">
            <p className="max-w-xs rounded-[var(--wtf-radius-md)] bg-[#fff8f0] p-4 text-sm font-semibold shadow-[var(--wtf-shadow-soft)]">
              {product.images[0]?.title}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#c05f3c]">
            {product.category}
          </p>
          <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-5xl font-normal leading-tight">
            {product.name}
          </h2>
          <p className="mt-4 text-2xl font-semibold">{product.price}</p>
          <p className="mt-5 text-base leading-8 text-[#665644]">{product.description}</p>
          <dl className="mt-8 grid gap-4 border-y border-[#c8aa82] py-5 text-sm">
            <div>
              <dt className="font-semibold">Material</dt>
              <dd className="mt-1 text-[#665644]">{product.material}</dd>
            </div>
            <div>
              <dt className="font-semibold">Care</dt>
              <dd className="mt-1 text-[#665644]">{product.fitOrCare}</dd>
            </div>
            <div>
              <dt className="font-semibold">Availability</dt>
              <dd className="mt-1 text-[#665644]">{product.inventoryStatus}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <span
                key={variant}
                className="rounded-full border border-[#c8aa82] bg-[#fff8f0] px-3 py-2 text-sm"
              >
                {variant}
              </span>
            ))}
          </div>
          <Button href={createShopLifestylePath(basePath, "cart-preview")} className="mt-8 w-full">
            Add to cart preview
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function CollectionsPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-normal">
            Seasonal collections make broad product sets easier to scan.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#665644]">
            Each block can map to a real collection, room, occasion or local pickup campaign in a
            future commerce backend.
          </p>
        </div>
        <CategoryGrid basePath={basePath} />
      </Container>
    </Section>
  );
}

function GiftGuidePanel() {
  return (
    <div className="rounded-[var(--wtf-radius-xl)] border border-[#c8aa82] bg-white p-6 shadow-[var(--wtf-shadow-soft)]">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#c05f3c]">Gift guide</p>
      <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-normal">
        Useful gift logic beats seasonal decoration.
      </h2>
      <div className="mt-7 grid gap-4">
        {shopLifestyleContent.giftGuide.map((gift) => (
          <article key={gift.recipient} className="border-t border-[#c8aa82] pt-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-normal">
                {gift.recipient}
              </h3>
              <p className="text-sm font-semibold text-[#2f6d58]">{gift.priceNote}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-[#665644]">{gift.suggestion}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function GiftGuidePage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <GiftGuidePanel />
      </Container>
    </Section>
  );
}

function AboutPage() {
  return (
    <Section className="bg-[#2f6d58] text-white">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="[font-family:var(--wtf-font-heading)] text-5xl font-normal leading-tight">
          A shop story built from shelves, makers and pickup operations.
        </h2>
        <div className="grid gap-5 text-sm leading-7 text-[#f5d6ba]">
          <p>
            Field & Hearth is fictional. The template gives a lifestyle retailer room for maker
            notes, care guidance, pickup instructions and product stories without imitating a real
            store.
          </p>
          <p>
            Product and cart routes remain honest placeholders until a buyer connects inventory,
            checkout, pickup notifications and payment processing.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function JournalGrid() {
  return (
    <div className="grid gap-4">
      {shopLifestyleContent.journal.map((story) => (
        <article key={story.title} className="border-t border-[#c8aa82] pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#c05f3c]">
            {story.category}
          </p>
          <h3 className="mt-2 [font-family:var(--wtf-font-heading)] text-2xl font-normal">
            {story.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[#665644]">{story.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

function JournalPage() {
  return (
    <Section>
      <Container className="max-w-4xl">
        <JournalGrid />
      </Container>
    </Section>
  );
}

function NewsletterPanel() {
  const content = shopLifestyleContent;

  return (
    <ShopNewsletterPanel
      newsletter={content.newsletter}
      className="rounded-[var(--wtf-radius-xl)] border border-[#c8aa82] bg-white p-5 shadow-[var(--wtf-shadow-soft)]"
    />
  );
}

function CartPreviewPage({ basePath }: { basePath: string }) {
  const product = shopLifestyleContent.products[0];

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-normal">
            Cart preview with pickup and fragile item notes.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#665644]">
            The demo does not process orders. Use this route to plan gift wrap, pickup, shipping,
            taxes, payment and inventory once the buyer selects a commerce system.
          </p>
          <Button href={createShopLifestylePath(basePath, "contact")} className="mt-7">
            Ask about pickup setup
          </Button>
        </div>
        <aside className="rounded-[var(--wtf-radius-xl)] border border-[#c8aa82] bg-white p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#c05f3c]">Demo cart</p>
          <div className="mt-5 grid gap-4 border-y border-[#c8aa82] py-5 text-sm">
            <div className="flex justify-between gap-4">
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
            <p className="text-[#665644]">{product.variants[0]}</p>
            <p className="text-[#665644]">Pickup note: pack fragile ceramics before close.</p>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#665644]">
            Checkout disabled in the demo. Connect commerce infrastructure before accepting payment
            or stock commitments.
          </p>
        </aside>
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = shopLifestyleContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Pickup, gift wrap and fragile packing can be connected to real commerce operations at launch."
        />
        <NewsletterPanel />
      </Container>
    </Section>
  );
}

function FAQPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <FAQAccordion items={shopLifestyleContent.faq} />
      </Container>
    </Section>
  );
}
