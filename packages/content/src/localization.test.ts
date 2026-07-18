import { describe, expect, it } from "vitest";

import {
  detectMissingTranslations,
  getDirectionForLocale,
  getLocalizedSEO,
  getLocalizedSlug,
  getLocalizedValue
} from "./localization";

describe("localization helpers", () => {
  it("resolves arbitrary locale records with fallback", () => {
    const value = {
      en: "Book now",
      ka: "დაჯავშნა"
    };

    expect(getLocalizedValue(value, { locale: "ka", fallbackLocale: "en" })).toBe("დაჯავშნა");
    expect(getLocalizedValue(value, { locale: "nl", fallbackLocale: "en" })).toBe("Book now");
  });

  it("resolves localized slugs and SEO", () => {
    expect(
      getLocalizedSlug(
        {
          en: { current: "booking" },
          nl: { current: "reserveren" }
        },
        { locale: "nl", fallbackLocale: "en" }
      )
    ).toBe("reserveren");

    expect(
      getLocalizedSEO(
        {
          en: {
            title: "Booking",
            description: "Book a table.",
            canonicalPath: "/booking"
          }
        },
        { locale: "ka", fallbackLocale: "en" }
      )
    ).toMatchObject({
      title: "Booking",
      canonicalPath: "/booking"
    });
  });

  it("reads text direction from the configured locale map", () => {
    expect(
      getDirectionForLocale("ar", {
        defaultLocale: "en",
        fallbackLocale: "en",
        enabledLocales: ["en", "ar"],
        directions: {
          en: "ltr",
          ar: "rtl"
        }
      })
    ).toBe("rtl");
  });

  it("detects missing translations without assuming a fixed language set", () => {
    expect(
      detectMissingTranslations(
        {
          title: {
            en: "Menu",
            ka: "მენიუ"
          },
          intro: {
            en: "Seasonal dishes"
          }
        },
        ["en", "ka", "nl"],
        "en"
      )
    ).toEqual([
      {
        field: "title",
        locale: "nl",
        fallbackLocale: "en"
      },
      {
        field: "intro",
        locale: "ka",
        fallbackLocale: "en"
      },
      {
        field: "intro",
        locale: "nl",
        fallbackLocale: "en"
      }
    ]);
  });
});
