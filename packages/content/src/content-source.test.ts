import { describe, expect, it } from "vitest";

import {
  beautySalonDefaultBasePath,
  dentistCosmeticDefaultBasePath,
  hotelBoutiqueDefaultBasePath,
  resolveContentSourceKind,
  restaurantFineDiningDefaultBasePath,
  staticContentSource
} from "./index";

describe("content source configuration", () => {
  it("uses static content by default", () => {
    expect(resolveContentSourceKind().contentSource).toBe("static");
  });

  it("falls back to static content for unsupported source names", () => {
    const warnings: string[] = [];
    const config = resolveContentSourceKind("unknown", (warning) => warnings.push(warning));

    expect(config.contentSource).toBe("static");
    expect(warnings).toHaveLength(1);
  });
});

describe("staticContentSource", () => {
  it("returns restaurant POC pages and navigation from static content", async () => {
    const context = {
      templateId: "restaurant-01-fine-dining",
      basePath: restaurantFineDiningDefaultBasePath,
      slug: "menu"
    };

    await expect(staticContentSource.getPage(context)).resolves.toMatchObject({
      slug: "menu",
      title: "Seasonal Menu"
    });
    await expect(staticContentSource.getNavigation(context)).resolves.toContainEqual({
      label: "Menu",
      slug: "menu",
      href: `${restaurantFineDiningDefaultBasePath}/menu`
    });
  });

  it("exposes industry-specific static content through the shared source", async () => {
    await expect(
      staticContentSource.getRooms({ templateId: "hotel-01-luxury" })
    ).resolves.toHaveLength(3);
    await expect(
      staticContentSource.getTreatments({ templateId: "beauty-02-spa" })
    ).resolves.toHaveLength(3);
    await expect(
      staticContentSource.getPractitioners({ templateId: "dentist-01-clinical" })
    ).resolves.toHaveLength(3);
  });

  it("exposes Batch 2 template content through the shared source", async () => {
    await expect(
      staticContentSource.getRooms({ templateId: "hotel-02-boutique" })
    ).resolves.toHaveLength(3);
    await expect(
      staticContentSource.getHotelOffers({ templateId: "hotel-02-boutique" })
    ).resolves.toHaveLength(2);
    await expect(
      staticContentSource.getTreatments({ templateId: "dentist-02-premium-cosmetic" })
    ).resolves.toHaveLength(3);
    await expect(
      staticContentSource.getServices({ templateId: "beauty-01-salon" })
    ).resolves.toHaveLength(3);
    await expect(
      staticContentSource.getServiceDetail({
        templateId: "beauty-01-salon",
        slug: "services/copper-gloss-colour"
      })
    ).resolves.toMatchObject({ name: "Copper Gloss Colour" });

    await expect(
      staticContentSource.getNavigation({
        templateId: "hotel-02-boutique",
        basePath: hotelBoutiqueDefaultBasePath
      })
    ).resolves.toContainEqual({
      label: "Booking",
      slug: "booking",
      href: `${hotelBoutiqueDefaultBasePath}/booking`
    });
    await expect(
      staticContentSource.getSEO({
        templateId: "dentist-02-premium-cosmetic",
        basePath: dentistCosmeticDefaultBasePath,
        slug: "pricing-consultation",
        locale: "en"
      })
    ).resolves.toMatchObject({
      canonicalPath: `${dentistCosmeticDefaultBasePath}/pricing-consultation`,
      locale: "en"
    });
    await expect(
      staticContentSource.getFormsConfig({
        templateId: "beauty-01-salon",
        basePath: beautySalonDefaultBasePath
      })
    ).resolves.toContainEqual(expect.objectContaining({ id: "booking" }));
  });
});
