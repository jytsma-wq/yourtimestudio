import type { CSSProperties } from "react";

import {
  createShopFashionPath,
  getShopFashionNavigation,
  getShopFashionPage,
  shopFashionContent,
  shopFashionDefaultBasePath,
  shopFashionPageSlugs,
  type ShopFashionPageSlug
} from "@website-template-factory/content";
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
  Section,
  TemplatePageIntro
} from "@website-template-factory/ui";
import Image from "next/image";
import Link from "next/link";

import { ShopNewsletterPanel } from "../shared/shop-newsletter-panel";

export const shopFashionTemplateConfig = {
  id: "shop-01-fashion",
  defaultBasePath: shopFashionDefaultBasePath,
  defaultHeroImage: "/templates/shop-01-fashion/hero-fashion.png",
  pageSlugs: shopFashionPageSlugs,
  locale: shopFashionContent.locale
} as const;

export type ShopFashionTemplateProps = {
  slug: ShopFashionPageSlug;
  basePath?: string;
  heroImageSrc?: string;
};

type FashionProduct = (typeof shopFashionContent.products)[number];

export function isShopFashionSlug(slug: string): slug is ShopFashionPageSlug {
  return (shopFashionPageSlugs as readonly string[]).includes(slug);
}

export function getShopFashionSeo(
  slug: ShopFashionPageSlug,
  basePath = shopFashionTemplateConfig.defaultBasePath
) {
  return getShopFashionPage(slug, basePath).seo;
}

export function ShopFashionTemplate({
  slug,
  basePath = shopFashionTemplateConfig.defaultBasePath,
  heroImageSrc = shopFashionTemplateConfig.defaultHeroImage
}: ShopFashionTemplateProps) {
  const content = shopFashionContent;
  const page = getShopFashionPage(slug, basePath);
  const navigation = getShopFashionNavigation(basePath);
  const themeStyle = createThemeCssVariables("shop-01-fashion") as CSSProperties;
  const direction = content.locale.directions[content.locale.defaultLocale] ?? "ltr";

  return (
    <div
      dir={direction}
      lang={content.locale.defaultLocale}
      style={themeStyle}
      className="bg-[#fbfbf8] text-[#111]"
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
          href: createShopFashionPath(basePath, "collection")
        }}
        mobileMenuLabel={content.ui.mobileMenu}
        mobileCloseLabel={content.ui.mobileClose}
        className="border-[#111] bg-[#fbfbf8]/95"
      />
      {slug === "" ? (
        <FashionHome basePath={basePath} heroImageSrc={heroImageSrc} />
      ) : (
        <FashionInnerPage
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
          { label: "Contact", href: createShopFashionPath(basePath, "contact") },
          { label: "FAQ", href: createShopFashionPath(basePath, "faq") }
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

function FashionHome({
  basePath,
  heroImageSrc
}: Required<Pick<ShopFashionTemplateProps, "basePath" | "heroImageSrc">>) {
  const content = shopFashionContent;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#111] bg-[#fbfbf8]">
        <Container className="grid min-h-[78svh] gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="pb-4 pt-16 lg:pb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2546a0]">
              Editorial fashion boutique
            </p>
            <h1 className="mt-5 max-w-3xl [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#5f5f5a]">
              {content.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={createShopFashionPath(basePath, "collection")} className="rounded-none">
                {content.hero.primaryCta}
              </Button>
              <Button
                href={createShopFashionPath(basePath, "lookbook")}
                variant="secondary"
                className="rounded-none"
              >
                {content.hero.secondaryCta}
              </Button>
            </div>
            <p className="mt-8 max-w-lg border-l border-[#111] pl-4 text-sm leading-7 text-[#5f5f5a]">
              {content.hero.editorialNote}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[0.75fr_1fr]">
            <div className="order-2 grid content-end gap-3 md:order-1">
              {content.hero.proofPoints.map((point) => (
                <p key={point} className="border-t border-[#111] pt-3 text-sm leading-6">
                  {point}
                </p>
              ))}
            </div>
            <div className="relative order-1 min-h-[32rem] overflow-hidden border border-[#111] bg-[#efefea] shadow-[var(--wtf-shadow-elevated)] md:order-2">
              <Image
                src={heroImageSrc}
                alt="editorial fashion image with garments, rack, fabric swatches and sharp studio light."
                fill
                loading="eager"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 bg-[#fbfbf8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
                Small run
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DecisionGuide
        eyebrow="Shop the edit"
        title="Start with where the piece needs to work."
        description="The collection is small enough to guide by use, fabric and silhouette rather than pushing an endless product grid."
        prompt="What are you dressing for?"
        options={[
          {
            id: "daily",
            label: "Everyday structure",
            resultEyebrow: "Selected edit",
            resultTitle: "Linen layers and narrow proportions",
            resultBody:
              "Begin with the column coat, compact knit and pieces designed to repeat across the week.",
            href: createShopFashionPath(basePath, "products/linen-column-coat"),
            ctaLabel: "View the column coat"
          },
          {
            id: "evening",
            label: "An evening set",
            resultEyebrow: "Selected edit",
            resultTitle: "Compact shapes with one cobalt accent",
            resultBody:
              "Use the lookbook to see proportion, layering and the smallest accessories in context.",
            href: createShopFashionPath(basePath, "lookbook"),
            ctaLabel: "Open the lookbook"
          },
          {
            id: "browse",
            label: "See the full capsule",
            resultEyebrow: "Selected edit",
            resultTitle: "The current collection in one view",
            resultBody: "Compare fabric, fit notes and price without leaving the collection page.",
            href: createShopFashionPath(basePath, "collection"),
            ctaLabel: "Shop the collection"
          }
        ]}
        className="bg-[#efefea]"
      />

      <Section className="bg-[#111] text-[#fbfbf8]">
        <Container className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9aa8db]">
              Current edit
            </p>
            <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
              Product cards should feel bought, shot and merchandised.
            </h2>
            <Button
              href={createShopFashionPath(basePath, "collection")}
              variant="secondary"
              className="mt-7 rounded-none border-[#fbfbf8] bg-transparent text-[#fbfbf8]"
            >
              Open collection
            </Button>
          </div>
          <ProductGrid basePath={basePath} dark />
        </Container>
      </Section>

      <Section className="bg-[#fbfbf8]">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <LookbookRail />
          <NewsletterPanel />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2546a0]">
                Journal
              </p>
              <h2 className="mt-3 [font-family:var(--wtf-font-heading)] text-4xl font-semibold">
                Specific retail stories, not styling slogans.
              </h2>
            </div>
            <Button href={createShopFashionPath(basePath, "journal")} variant="secondary">
              Read notes
            </Button>
          </div>
          <JournalGrid />
        </Container>
      </Section>
    </main>
  );
}

type InnerProps = Required<Pick<ShopFashionTemplateProps, "basePath" | "heroImageSrc">> & {
  slug: ShopFashionPageSlug;
  title: string;
  intro: string;
};

function FashionInnerPage({ slug, title, intro, basePath, heroImageSrc }: InnerProps) {
  return (
    <main>
      <PageIntro title={title} intro={intro} basePath={basePath} heroImageSrc={heroImageSrc} />
      {slug === "collection" ? <CollectionPage basePath={basePath} /> : null}
      {slug === "products/linen-column-coat" ? <ProductDetailPage basePath={basePath} /> : null}
      {slug === "lookbook" ? <LookbookPage /> : null}
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
      homeLabel="Atelier Sable"
      sectionClassName="border-[#111] bg-[#fbfbf8]"
      containerClassName="lg:grid-cols-[0.8fr_1.2fr]"
      linkClassName="text-[#2546a0]"
      introClassName="text-[#5f5f5a]"
      mediaClassName="relative min-h-72 overflow-hidden border border-[#111]"
      media={
        <Image
          src={heroImageSrc}
          alt="fashion boutique visual with garments and fabric details."
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}

function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Collection filters">
      {shopFashionContent.collections.map((collection) => (
        <a
          key={collection.name}
          href={`#${collection.filter.toLowerCase()}`}
          className="border border-[#111] px-4 py-2 text-sm font-semibold hover:bg-[#111] hover:text-[#fbfbf8] focus:outline-none focus:ring-2 focus:ring-[#2546a0]"
        >
          {collection.filter}
        </a>
      ))}
    </div>
  );
}

function ProductGrid({ basePath, dark = false }: { basePath: string; dark?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3" id="product-grid">
      {shopFashionContent.products.map((product, index) => (
        <ProductCard
          key={product.name}
          product={product}
          index={index}
          basePath={basePath}
          dark={dark}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  index,
  basePath,
  dark
}: {
  product: FashionProduct;
  index: number;
  basePath: string;
  dark?: boolean;
}) {
  return (
    <article
      id={shopFashionContent.collections[index]?.filter.toLowerCase()}
      className={
        dark
          ? "border border-[#fbfbf8] bg-[#fbfbf8] p-4 text-[#111]"
          : "border border-[#111] bg-white p-4"
      }
    >
      <div
        role="img"
        aria-label={product.images[0]?.alt}
        className="flex aspect-[4/5] items-end border border-[#c6c6bf] bg-[linear-gradient(135deg,#efefea,#fbfbf8_42%,#2546a0_43%,#111_78%)] p-4"
      >
        <span className="bg-[#fbfbf8] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#5f5f5a]">{product.description}</p>
        </div>
        <p className="text-sm font-semibold">{product.price}</p>
      </div>
      <p className="mt-4 border-t border-[#c6c6bf] pt-3 text-xs uppercase tracking-[0.18em] text-[#5f5f5a]">
        {product.material}
      </p>
      <Link
        href={createShopFashionPath(basePath, product.slug as ShopFashionPageSlug)}
        className="mt-5 inline-flex min-h-10 w-full items-center justify-center border border-[#111] px-3 text-sm font-semibold hover:bg-[#111] hover:text-[#fbfbf8] focus:outline-none focus:ring-2 focus:ring-[#2546a0]"
      >
        View product
      </Link>
    </article>
  );
}

function CollectionPage({ basePath }: { basePath: string }) {
  return (
    <Section>
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
              A focused capsule with product proof before checkout.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f5f5a]">
              Filters are lightweight links in this demo. A launch build can connect search,
              inventory and cart state through a commerce backend.
            </p>
          </div>
          <FilterBar />
        </div>
        <ProductGrid basePath={basePath} />
      </Container>
    </Section>
  );
}

function ProductDetailPage({ basePath }: { basePath: string }) {
  const product = shopFashionContent.products[0];

  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          role="img"
          aria-label={product.images[0]?.alt}
          className="min-h-[36rem] border border-[#111] bg-[linear-gradient(145deg,#111,#252525_38%,#fbfbf8_39%,#efefea_72%,#2546a0)] p-5"
        >
          <div className="flex h-full items-end">
            <p className="max-w-xs bg-[#fbfbf8] p-4 text-sm font-semibold">
              {product.images[0]?.title}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2546a0]">
            {product.category}
          </p>
          <h2 className="mt-4 [font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
            {product.name}
          </h2>
          <p className="mt-4 text-2xl font-semibold">{product.price}</p>
          <p className="mt-5 text-base leading-8 text-[#5f5f5a]">{product.description}</p>
          <dl className="mt-8 grid gap-4 border-y border-[#111] py-5 text-sm">
            <div>
              <dt className="font-semibold">Material</dt>
              <dd className="mt-1 text-[#5f5f5a]">{product.material}</dd>
            </div>
            <div>
              <dt className="font-semibold">Fit and care</dt>
              <dd className="mt-1 text-[#5f5f5a]">{product.fitOrCare}</dd>
            </div>
            <div>
              <dt className="font-semibold">Inventory note</dt>
              <dd className="mt-1 text-[#5f5f5a]">{product.inventoryStatus}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <span key={variant} className="border border-[#c6c6bf] px-3 py-2 text-sm">
                {variant}
              </span>
            ))}
          </div>
          <Button href={createShopFashionPath(basePath, "cart-preview")} className="mt-8 w-full">
            Add to cart preview
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function LookbookRail() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2546a0]">Lookbook</p>
      <h2 className="mt-4 max-w-xl [font-family:var(--wtf-font-heading)] text-4xl font-semibold leading-tight">
        Outfits are organized by use, not vague moods.
      </h2>
      <div className="mt-8 grid gap-4">
        {shopFashionContent.lookbook.map((item, index) => (
          <article
            key={item.title}
            className="grid gap-4 border-t border-[#111] pt-5 sm:grid-cols-[4rem_1fr]"
          >
            <p className="[font-family:var(--wtf-font-heading)] text-4xl text-[#2546a0]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="[font-family:var(--wtf-font-heading)] text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#5f5f5a]">{item.note}</p>
              <p className="mt-2 text-sm font-semibold">{item.styling}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function LookbookPage() {
  return (
    <Section>
      <Container>
        <LookbookRail />
      </Container>
    </Section>
  );
}

function NewsletterPanel() {
  const content = shopFashionContent;

  return (
    <ShopNewsletterPanel
      newsletter={content.newsletter}
      className="border border-[#111] bg-white p-5 shadow-[var(--wtf-shadow-soft)]"
    />
  );
}

function AboutPage() {
  return (
    <Section className="bg-[#111] text-[#fbfbf8]">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="[font-family:var(--wtf-font-heading)] text-5xl font-semibold leading-tight">
          The boutique story is merchandising discipline, not borrowed glamour.
        </h2>
        <div className="grid gap-5 text-sm leading-7 text-[#d9d9d2]">
          <p>
            Atelier Sable is fictional. The copy gives future buyers a structure for sourcing, size
            runs, fitting appointments and material notes without imitating a real fashion label.
          </p>
          <p>
            The template keeps commerce honest: product pages and cart preview are ready for a
            backend, but checkout, tax, shipping and stock are intentionally left to launch
            integration.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function JournalGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {shopFashionContent.journal.map((story) => (
        <article key={story.title} className="border border-[#111] bg-[#fbfbf8] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2546a0]">
            {story.category}
          </p>
          <h3 className="mt-3 [font-family:var(--wtf-font-heading)] text-2xl font-semibold">
            {story.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#5f5f5a]">{story.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

function JournalPage() {
  return (
    <Section>
      <Container>
        <JournalGrid />
      </Container>
    </Section>
  );
}

function CartPreviewPage({ basePath }: { basePath: string }) {
  const product = shopFashionContent.products[0];

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <h2 className="[font-family:var(--wtf-font-heading)] text-4xl font-semibold">
            A cart preview, not a pretend checkout.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5f5f5a]">
            This page shows where selected products, variants, returns, shipping and checkout
            handoff can live. A real build should connect Shopify, Medusa, Stripe or another
            commerce backend before taking orders.
          </p>
          <Button href={createShopFashionPath(basePath, "contact")} className="mt-7 rounded-none">
            Ask about commerce setup
          </Button>
        </div>
        <aside className="border border-[#111] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2546a0]">
            Demo cart
          </p>
          <div className="mt-5 grid gap-4 border-y border-[#c6c6bf] py-5 text-sm">
            <div className="flex justify-between gap-4">
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
            <p className="text-[#5f5f5a]">{product.variants[1]}</p>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#5f5f5a]">
            Checkout disabled in the template demo. Use this area for taxes, shipping, returns,
            payment and inventory once a commerce system is selected.
          </p>
        </aside>
      </Container>
    </Section>
  );
}

function ContactPage() {
  const content = shopFashionContent;

  return (
    <Section>
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <LocationBlock
          name={content.business.name}
          address={content.business.address}
          phone={content.business.phone}
          email={content.business.email}
          hours={content.business.hours}
          note="Private fittings can be connected to a real scheduling system during launch."
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
        <FAQAccordion items={shopFashionContent.faq} />
      </Container>
    </Section>
  );
}
