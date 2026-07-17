import { describe, expect, it } from "vitest";

import { createThemeCssVariables, getThemePreset, templateThemeIds, themePresets } from "./index";

const requiredThemeIds = [
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

describe("theme presets", () => {
  it("defines one typed theme preset for every planned template", () => {
    expect(templateThemeIds).toEqual(requiredThemeIds);
    expect(Object.keys(themePresets)).toEqual([...requiredThemeIds]);
  });

  it("includes the required token categories for each template theme", () => {
    for (const themeId of requiredThemeIds) {
      const preset = getThemePreset(themeId);

      expect(preset.colors).toEqual(
        expect.objectContaining({
          background: expect.any(String),
          foreground: expect.any(String),
          accent: expect.any(String),
          muted: expect.any(String),
          border: expect.any(String),
          button: expect.any(String),
          buttonForeground: expect.any(String)
        })
      );
      expect(preset.typography).toEqual(
        expect.objectContaining({
          heading: expect.any(String),
          body: expect.any(String)
        })
      );
      expect(preset.spacing).toEqual(expect.objectContaining({ mood: expect.any(String) }));
      expect(preset.radius).toEqual(expect.objectContaining({ mood: expect.any(String) }));
      expect(preset.shadows).toEqual(expect.objectContaining({ mood: expect.any(String) }));
      expect(preset.borders).toEqual(expect.objectContaining({ default: expect.any(String) }));
      expect(preset.layout).toEqual(expect.objectContaining({ maxWidth: expect.any(String) }));
      expect(preset.motion).toEqual(expect.objectContaining({ mood: expect.any(String) }));
      expect(preset.zIndex).toEqual(
        expect.objectContaining({
          header: expect.any(Number),
          overlay: expect.any(Number),
          modal: expect.any(Number)
        })
      );
    }
  });

  it("creates CSS variables apps can apply to a selected theme", () => {
    const variables = createThemeCssVariables("restaurant-01-fine-dining");

    expect(variables).toMatchObject({
      fontFamily: "var(--wtf-font-body)",
      "--wtf-color-background": themePresets["restaurant-01-fine-dining"].colors.background,
      "--wtf-color-foreground": themePresets["restaurant-01-fine-dining"].colors.foreground,
      "--wtf-color-accent": themePresets["restaurant-01-fine-dining"].colors.accent,
      "--wtf-layout-max-width": themePresets["restaurant-01-fine-dining"].layout.maxWidth
    });
  });
});
