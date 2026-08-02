import { describe, expect, it } from "vitest";

import {
  buildDemoHref,
  buildLocalizedDemoHref,
  buildPreviewHref,
  parsePreviewLocale,
  previewPageLabel,
  shouldCarryPreviewLocale,
  splitPreviewSuffix
} from "./template-preview-locale";

describe("template preview locale URLs", () => {
  it.each(["en", "ka", "ru", "tr"] as const)(
    "round-trips the %s locale through preview URLs",
    (locale) => {
      expect(buildPreviewHref("hotel-01-luxury", "rooms", locale)).toBe(
        `/preview/hotel-01-luxury/rooms?locale=${locale}`
      );
      expect(parsePreviewLocale(locale)).toBe(locale);
    }
  );

  it("falls back to English for missing or unsupported locales", () => {
    expect(parsePreviewLocale(undefined)).toBe("en");
    expect(parsePreviewLocale("de")).toBe("en");
    expect(splitPreviewSuffix("?locale=de", "").locale).toBe("en");
  });

  it("keeps exactly one locale in the outer preview URL", () => {
    const href = buildPreviewHref(
      "hotel-01-luxury",
      "rooms",
      "ka",
      "?locale=ru&ref=one&ref=two&locale=tr",
      "details"
    );
    const url = new URL(href, "https://example.test");

    expect(url.searchParams.getAll("locale")).toEqual(["ka"]);
    expect(url.searchParams.getAll("ref")).toEqual(["one", "two"]);
    expect(url.hash).toBe("#details");
  });

  it("never forwards the locale to an embedded demo URL", () => {
    expect(
      buildDemoHref(
        "hotel-01-luxury",
        "rooms",
        "?locale=ru&offer=summer&offer=weekend",
        "#rates"
      )
    ).toBe(
      "/template-sites/hotel-01-luxury/rooms?offer=summer&offer=weekend#rates"
    );
  });

  it("adds a temporary locale only to direct demo navigation", () => {
    expect(
      buildLocalizedDemoHref(
        "hotel-01-luxury",
        "rooms",
        "tr",
        "?offer=summer",
        "#rates"
      )
    ).toBe(
      "/template-sites/hotel-01-luxury/rooms?locale=tr&offer=summer#rates"
    );
  });

  it("keeps Georgian and Russian tabs independent without shared state", () => {
    const georgian = splitPreviewSuffix("?locale=ka&room=suite", "#gallery");
    const russian = splitPreviewSuffix("?locale=ru&room=studio", "#booking");

    expect(georgian).toEqual({
      locale: "ka",
      demoSearch: "?room=suite",
      hash: "#gallery"
    });
    expect(russian).toEqual({
      locale: "ru",
      demoSearch: "?room=studio",
      hash: "#booking"
    });
  });

  it("keeps English demo names out of non-English page controls", () => {
    const home = { slug: "", label: "Home" };
    const rooms = { slug: "rooms", label: "Rooms" };

    expect(previewPageLabel("en", rooms, 1)).toBe("Rooms");
    expect(previewPageLabel("ka", home, 0)).toBe("მთავარი");
    expect(previewPageLabel("ka", rooms, 1)).toBe("გვერდი 2");
    expect(previewPageLabel("ru", rooms, 1)).toBe("Страница 2");
    expect(previewPageLabel("tr", rooms, 1)).toBe("Sayfa 2");
  });

  it("carries locale only for native new-tab navigation", () => {
    expect(shouldCarryPreviewLocale({ type: "click", button: 0 })).toBe(false);
    expect(
      shouldCarryPreviewLocale({ type: "click", button: 0, ctrlKey: true })
    ).toBe(true);
    expect(
      shouldCarryPreviewLocale({ type: "click", button: 0, target: "_blank" })
    ).toBe(true);
    expect(shouldCarryPreviewLocale({ type: "auxclick", button: 1 })).toBe(true);
    expect(shouldCarryPreviewLocale({ type: "auxclick", button: 2 })).toBe(false);
  });
});
