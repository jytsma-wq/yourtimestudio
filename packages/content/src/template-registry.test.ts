import { describe, expect, it } from "vitest";

import {
  beautySpaContent,
  beautySpaPageSlugs,
  beautyAestheticContent,
  beautyAestheticPageSlugs,
  beautySalonContent,
  beautySalonPageSlugs,
  barCocktailContent,
  barCocktailPageSlugs,
  barPubContent,
  barPubPageSlugs,
  barRooftopContent,
  barRooftopPageSlugs,
  appendTemplateNavigationLinks,
  createBeautyAestheticPath,
  createBeautySalonPath,
  createBarCocktailPath,
  createBarPubPath,
  createBarRooftopPath,
  createTemplateNavigation,
  createTemplatePath,
  createBeautySpaPath,
  createDentistCosmeticPath,
  createDentistClinicalPath,
  createDentistFamilyPath,
  createHotelBoutiquePath,
  createHotelLuxuryPath,
  createHotelResortPath,
  createRestaurantBistroPath,
  createRestaurantFastCasualPath,
  createRestaurantFineDiningPath,
  createShopFashionPath,
  createShopLifestylePath,
  createShopSpecialtyPath,
  dentistCosmeticContent,
  dentistCosmeticPageSlugs,
  dentistClinicalContent,
  dentistClinicalPageSlugs,
  dentistFamilyContent,
  dentistFamilyPageSlugs,
  getRestaurantBistroPage,
  getRestaurantFastCasualPage,
  getBarCocktailPage,
  getBarPubPage,
  getBarRooftopPage,
  getBeautySalonPage,
  getBeautySpaPage,
  getBeautyAestheticPage,
  getDentistCosmeticPage,
  getDentistClinicalPage,
  getDentistFamilyPage,
  getHotelBoutiquePage,
  getHotelLuxuryPage,
  getHotelResortPage,
  getShopFashionPage,
  getShopLifestylePage,
  getShopSpecialtyPage,
  getRestaurantFineDiningNavigation,
  getRestaurantPage,
  hotelBoutiqueContent,
  hotelBoutiquePageSlugs,
  getTemplateById,
  hotelLuxuryContent,
  hotelLuxuryPageSlugs,
  hotelResortContent,
  hotelResortPageSlugs,
  restaurantBistroContent,
  restaurantBistroPageSlugs,
  restaurantFastCasualContent,
  restaurantFastCasualPageSlugs,
  restaurantFineDiningContent,
  restaurantFineDiningPageSlugs,
  resolveTemplatePage,
  shopFashionContent,
  shopFashionPageSlugs,
  shopLifestyleContent,
  shopLifestylePageSlugs,
  shopSpecialtyContent,
  shopSpecialtyPageSlugs,
  templateRegistry,
  type RoutableTemplatePage
} from "./index";

const requiredTemplateIds = [
  "hotel-01-luxury",
  "hotel-02-boutique",
  "hotel-03-resort",
  "dentist-01-clinical",
  "dentist-02-premium-cosmetic",
  "dentist-03-family",
  "beauty-01-salon",
  "beauty-02-spa",
  "beauty-03-aesthetic-clinic",
  "restaurant-01-fine-dining",
  "restaurant-02-bistro",
  "restaurant-03-fast-casual",
  "bar-01-cocktail",
  "bar-02-pub",
  "bar-03-rooftop",
  "shop-01-fashion",
  "shop-02-lifestyle",
  "shop-03-specialty"
] as const;

describe("template registry", () => {
  it("defines all 18 planned templates with status and preview metadata", () => {
    expect(templateRegistry.map((template) => template.id)).toEqual(requiredTemplateIds);

    for (const template of templateRegistry) {
      expect(template).toEqual(
        expect.objectContaining({
          category: expect.any(String),
          name: expect.any(String),
          positioning: expect.any(String),
          previewHref: expect.any(String),
          primaryCta: expect.any(String),
          secondaryCta: expect.any(String),
          status: expect.stringMatching(/^(not-started|in-progress|complete)$/),
          visualMood: expect.any(String)
        })
      );
    }
  });

  it("marks the completed 18-template set as complete", () => {
    const completedTemplates = templateRegistry
      .filter((template) => template.status === "complete")
      .map((template) => template.id);

    expect(completedTemplates).toEqual([
      "hotel-01-luxury",
      "hotel-02-boutique",
      "hotel-03-resort",
      "dentist-01-clinical",
      "dentist-02-premium-cosmetic",
      "dentist-03-family",
      "beauty-01-salon",
      "beauty-02-spa",
      "beauty-03-aesthetic-clinic",
      "restaurant-01-fine-dining",
      "restaurant-02-bistro",
      "restaurant-03-fast-casual",
      "bar-01-cocktail",
      "bar-02-pub",
      "bar-03-rooftop",
      "shop-01-fashion",
      "shop-02-lifestyle",
      "shop-03-specialty"
    ]);

    expect(getTemplateById("restaurant-01-fine-dining").requiredPages).toEqual([
      "Home",
      "Menu",
      "Tasting Menu",
      "About / Chef Story",
      "Gallery",
      "Private Dining",
      "Reservations",
      "Contact",
      "FAQ",
      "404"
    ]);
  });
});

describe("batch six content", () => {
  it("contains required aesthetic clinic and specialty shop page slugs with safe forms", () => {
    expect(beautyAestheticPageSlugs).toContain("technology-safety");
    expect(beautyAestheticPageSlugs).toContain("pricing-consultation");
    expect(beautyAestheticPageSlugs).toContain("treatments/facial-balance-consultation");
    expect(shopSpecialtyPageSlugs).toContain("products/grind-by-weight-scale");
    expect(shopSpecialtyPageSlugs).toContain("comparison");
    expect(shopSpecialtyPageSlugs).toContain("cart-preview");

    expect(beautyAestheticContent.consultationForm.fields.map((field) => field.name)).toContain(
      "focus"
    );
    expect(shopSpecialtyContent.cartPreview.fields.map((field) => field.name)).toContain("product");
    expect(shopSpecialtyContent.newsletter.fields.map((field) => field.name)).toEqual([
      "email",
      "topic"
    ]);

    expect(beautyAestheticContent.business.reviewReminder).toContain("medical");
    expect(beautyAestheticContent.hero.safetyNote).toContain("qualified practitioners");
    expect(shopSpecialtyContent.cartPreview.description).toContain("commerce backend");
    expect(shopSpecialtyContent.faq.map((item) => item.answer).join(" ")).toContain(
      "Stock, shipping, tax"
    );
  });

  it("derives Batch 6 paths and metadata from caller-provided base paths", () => {
    expect(createBeautyAestheticPath("/clinic", "technology-safety")).toBe(
      "/clinic/technology-safety"
    );
    expect(createShopSpecialtyPath("/coffee", "products/grind-by-weight-scale")).toBe(
      "/coffee/products/grind-by-weight-scale"
    );

    expect(getBeautyAestheticPage("pricing-consultation", "/clinic").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/clinic/pricing-consultation", locale: "en" })
    );
    expect(getShopSpecialtyPage("cart-preview", "/coffee").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/coffee/cart-preview", locale: "en" })
    );
  });
});

describe("batch five content", () => {
  it("contains required resort, family dentist and fast-casual page slugs with conversion forms", () => {
    expect(hotelResortPageSlugs).toContain("rooms/villa-garden-suite");
    expect(dentistFamilyPageSlugs).toContain("services/child-checkup");
    expect(restaurantFastCasualPageSlugs).toContain("menu/grain-bowl");

    expect(hotelResortContent.booking.fields.map((field) => field.name)).toContain("stayFocus");
    expect(dentistFamilyContent.appointment.fields.map((field) => field.name)).toContain(
      "visitType"
    );
    expect(restaurantFastCasualContent.order.fields.map((field) => field.name)).toContain(
      "location"
    );

    expect(dentistFamilyContent.hero.safetyNote).toContain("clinician");
    expect(restaurantFastCasualContent.hero.orderNote).toContain("future ordering integration");
  });

  it("derives Batch 5 paths and metadata from caller-provided base paths", () => {
    expect(createHotelResortPath("/resort", "rooms/villa-garden-suite")).toBe(
      "/resort/rooms/villa-garden-suite"
    );
    expect(createDentistFamilyPath("/family-dental", "first-visit")).toBe(
      "/family-dental/first-visit"
    );
    expect(createRestaurantFastCasualPath("/counter", "menu/grain-bowl")).toBe(
      "/counter/menu/grain-bowl"
    );

    expect(getHotelResortPage("booking", "/resort").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/resort/booking", locale: "en" })
    );
    expect(getDentistFamilyPage("appointment", "/family-dental").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/family-dental/appointment", locale: "en" })
    );
    expect(getRestaurantFastCasualPage("order", "/counter").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/counter/order", locale: "en" })
    );
  });
});

describe("batch four content", () => {
  it("contains required bar page slugs with content-driven booking forms", () => {
    expect(barCocktailPageSlugs).toContain("signature-cocktails");
    expect(barPubPageSlugs).toContain("sports");
    expect(barRooftopPageSlugs).toContain("group-packages");

    expect(barCocktailContent.booking.fields.map((field) => field.name)).toContain("bookingType");
    expect(barPubContent.booking.fields.map((field) => field.name)).toContain("visitType");
    expect(barRooftopContent.booking.fields.map((field) => field.name)).toContain("bookingType");

    expect(barCocktailContent.menuSections.map((section) => section.name)).toContain("Zero Proof");
    expect(barRooftopContent.accessNotes.join(" ")).toContain("weather");
  });

  it("derives Batch 4 paths and metadata from caller-provided base paths", () => {
    expect(createBarCocktailPath("/cocktail", "private-hire")).toBe("/cocktail/private-hire");
    expect(createBarPubPath("/pub", "sports")).toBe("/pub/sports");
    expect(createBarRooftopPath("/deck", "group-packages")).toBe("/deck/group-packages");

    expect(getBarCocktailPage("reservations", "/cocktail").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/cocktail/reservations", locale: "en" })
    );
    expect(getBarPubPage("bookings", "/pub").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/pub/bookings", locale: "en" })
    );
    expect(getBarRooftopPage("private-bookings", "/deck").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/deck/private-bookings", locale: "en" })
    );
  });
});

describe("batch three content", () => {
  it("contains required shop and bistro page slugs with content-driven conversion forms", () => {
    expect(shopFashionPageSlugs).toContain("products/linen-column-coat");
    expect(shopLifestylePageSlugs).toContain("products/stoneware-breakfast-set");
    expect(restaurantBistroPageSlugs).toContain("reservations");

    expect(shopFashionContent.products.map((product) => product.name)).toContain(
      "Linen Column Coat"
    );
    expect(shopLifestyleContent.collections.map((collection) => collection.name)).toContain(
      "Morning Table"
    );
    expect(restaurantBistroContent.reservation.fields.map((field) => field.name)).toContain(
      "partySize"
    );

    expect(shopFashionContent.newsletter.fields.map((field) => field.name)).toEqual([
      "email",
      "interest"
    ]);
  });

  it("derives Batch 3 paths and metadata from caller-provided base paths", () => {
    expect(createShopFashionPath("/fashion", "products/linen-column-coat")).toBe(
      "/fashion/products/linen-column-coat"
    );
    expect(createShopLifestylePath("/home-shop", "gift-guide")).toBe("/home-shop/gift-guide");
    expect(createRestaurantBistroPath("/bistro", "reservations")).toBe("/bistro/reservations");

    expect(getShopFashionPage("cart-preview", "/fashion").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/fashion/cart-preview", locale: "en" })
    );
    expect(getShopLifestylePage("products/stoneware-breakfast-set", "/home-shop").seo).toEqual(
      expect.objectContaining({
        canonicalPath: "/home-shop/products/stoneware-breakfast-set",
        locale: "en"
      })
    );
    expect(getRestaurantBistroPage("menu", "/bistro").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/bistro/menu", locale: "en" })
    );
  });
});

describe("batch two content", () => {
  it("contains required page slugs and locale-ready form content", () => {
    expect(hotelBoutiquePageSlugs).toContain("rooms/atelier-room");
    expect(dentistCosmeticPageSlugs).toContain("treatments/digital-smile-design");
    expect(beautySalonPageSlugs).toContain("services/copper-gloss-colour");

    expect(hotelBoutiqueContent.booking.fields.map((field) => field.name)).toContain("arrival");
    expect(dentistCosmeticContent.appointment.fields.map((field) => field.name)).toContain(
      "consultation"
    );
    expect(beautySalonContent.booking.fields.map((field) => field.name)).toContain("service");

    expect(dentistCosmeticContent.hero.safetyNote).toContain("clinician review");
  });

  it("derives Batch 2 paths and metadata from caller-provided base paths", () => {
    expect(createHotelBoutiquePath("/boutique", "rooms/atelier-room")).toBe(
      "/boutique/rooms/atelier-room"
    );
    expect(createDentistCosmeticPath("/cosmetic", "pricing-consultation")).toBe(
      "/cosmetic/pricing-consultation"
    );
    expect(createBeautySalonPath("/salon", "services/copper-gloss-colour")).toBe(
      "/salon/services/copper-gloss-colour"
    );

    expect(getHotelBoutiquePage("booking", "/boutique").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/boutique/booking", locale: "en" })
    );
    expect(getDentistCosmeticPage("pricing-consultation", "/cosmetic").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/cosmetic/pricing-consultation", locale: "en" })
    );
    expect(getBeautySalonPage("booking", "/salon").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/salon/booking", locale: "en" })
    );
  });
});

describe("batch one content", () => {
  it("shares typed route helpers for paths, navigation and page SEO", () => {
    const pages: readonly RoutableTemplatePage<"" | "details">[] = [
      {
        slug: "",
        title: "Home",
        navLabel: "Home",
        intro: "Home intro.",
        seo: {
          title: "Home",
          description: "Home description.",
          canonicalPath: "/demo"
        }
      },
      {
        slug: "details",
        title: "Details",
        navLabel: "Details",
        intro: "Details intro.",
        seo: {
          title: "Details",
          description: "Details description.",
          canonicalPath: "/demo/details"
        }
      }
    ] as const;

    expect(createTemplatePath("/demo", "details")).toBe("/demo/details");
    expect(createTemplatePath("/demo", "")).toBe("/demo");
    expect(createTemplateNavigation("/demo", [{ label: "Details", slug: "details" }])).toEqual([
      { label: "Details", href: "/demo/details" }
    ]);
    expect(
      appendTemplateNavigationLinks(
        [{ label: "Details", href: "/demo/details" }],
        [
          { label: "Details duplicate", href: "/demo/details" },
          { label: "Contact", href: "/demo/contact" }
        ]
      )
    ).toEqual([
      { label: "Details", href: "/demo/details" },
      { label: "Contact", href: "/demo/contact" }
    ]);
    expect(
      resolveTemplatePage<"" | "details", RoutableTemplatePage<"" | "details">>({
        pages,
        slug: "details",
        basePath: "/client-demo",
        locale: "en",
        templateLabel: "demo"
      }).seo
    ).toEqual(
      expect.objectContaining({
        canonicalPath: "/client-demo/details",
        locale: "en"
      })
    );
    expect(() =>
      resolveTemplatePage<"" | "details", RoutableTemplatePage<"" | "details">>({
        pages,
        slug: "missing" as "" | "details",
        basePath: "/demo",
        locale: "en",
        templateLabel: "demo"
      })
    ).toThrow("Unknown demo page: missing");
  });

  it("contains required page slugs and locale-ready form content", () => {
    expect(hotelLuxuryPageSlugs).toContain("rooms/signature-suite");
    expect(beautySpaPageSlugs).toContain("treatments/mineral-reset");
    expect(dentistClinicalPageSlugs).toContain("treatments/preventive-care");

    expect(hotelLuxuryContent.booking.fields.map((field) => field.name)).toContain("arrival");
    expect(beautySpaContent.booking.fields.map((field) => field.name)).toContain("treatment");
    expect(dentistClinicalContent.appointment.fields.map((field) => field.name)).toContain(
      "visitType"
    );

    expect(dentistClinicalContent.appointment.description).toContain("avoids sensitive health");
  });

  it("derives Batch 1 paths and metadata from caller-provided base paths", () => {
    expect(createHotelLuxuryPath("/hotel", "rooms/signature-suite")).toBe(
      "/hotel/rooms/signature-suite"
    );
    expect(createBeautySpaPath("/spa", "treatments/mineral-reset")).toBe(
      "/spa/treatments/mineral-reset"
    );
    expect(createDentistClinicalPath("/clinic", "appointment")).toBe("/clinic/appointment");

    expect(getHotelLuxuryPage("booking", "/hotel").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/hotel/booking", locale: "en" })
    );
    expect(getBeautySpaPage("booking", "/spa").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/spa/booking", locale: "en" })
    );
    expect(getDentistClinicalPage("appointment", "/clinic").seo).toEqual(
      expect.objectContaining({ canonicalPath: "/clinic/appointment", locale: "en" })
    );
  });
});

describe("restaurant fine dining content", () => {
  it("contains the required page slugs and reservation form fields", () => {
    expect(restaurantFineDiningPageSlugs).toEqual([
      "",
      "menu",
      "tasting-menu",
      "chef-story",
      "gallery",
      "private-dining",
      "reservations",
      "contact",
      "faq"
    ]);

    expect(restaurantFineDiningContent.reservation.fields.map((field) => field.name)).toEqual([
      "name",
      "email",
      "date",
      "time",
      "partySize",
      "occasion"
    ]);
  });

  it("derives paths and metadata from a caller-provided base path", () => {
    const basePath = "/client-site";

    expect(restaurantFineDiningContent.locale).toEqual({
      defaultLocale: "en",
      fallbackLocale: "en",
      enabledLocales: ["en"],
      directions: { en: "ltr" }
    });
    expect(createRestaurantFineDiningPath(basePath, "")).toBe(basePath);
    expect(createRestaurantFineDiningPath(basePath, "reservations")).toBe(
      "/client-site/reservations"
    );
    expect(getRestaurantFineDiningNavigation(basePath).map((item) => item.href)).toEqual([
      "/client-site/menu",
      "/client-site/tasting-menu",
      "/client-site/chef-story",
      "/client-site/private-dining",
      "/client-site/reservations"
    ]);
    expect(getRestaurantPage("faq", basePath).seo).toEqual(
      expect.objectContaining({
        canonicalPath: "/client-site/faq",
        locale: "en"
      })
    );
  });
});
