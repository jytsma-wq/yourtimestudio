import { describe, expect, it } from "vitest";

import { templateCategories } from "./index";

describe("templateCategories", () => {
  it("defines the six factory categories with three planned templates each", () => {
    expect(templateCategories.map((category) => category.slug)).toEqual([
      "hotel",
      "dentist",
      "beauty-salon",
      "restaurant",
      "bar",
      "shop"
    ]);

    expect(templateCategories.every((category) => category.plannedTemplates === 3)).toBe(true);
  });
});
