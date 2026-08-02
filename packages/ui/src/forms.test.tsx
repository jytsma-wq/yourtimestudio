import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { isValidEmailAddress, ManagedForm } from "./forms";

function findControl(markup: string, name: string) {
  return markup.match(new RegExp(`<(?:input|select|textarea)[^>]*name="${name}"[^>]*>`))?.[0];
}

describe("ManagedForm validation", () => {
  it("accepts complete email addresses and rejects incomplete or spaced values", () => {
    expect(isValidEmailAddress("person@example.com")).toBe(true);
    expect(isValidEmailAddress("person+tag@sub.example.co.uk")).toBe(true);
    expect(isValidEmailAddress("a@")).toBe(false);
    expect(isValidEmailAddress("person@example")).toBe(false);
    expect(isValidEmailAddress("person @example.com")).toBe(false);
    expect(isValidEmailAddress("person@example .com")).toBe(false);
  });

  it("renders native and ARIA required state for every supported control shape", () => {
    const markup = renderToStaticMarkup(
      <ManagedForm
        title="Contact"
        fields={[
          { name: "email", label: "Email", type: "email", required: true },
          { name: "message", label: "Message", type: "textarea", required: true },
          {
            name: "topic",
            label: "Topic",
            type: "select",
            required: true,
            options: ["Support"]
          },
          { name: "phone", label: "Phone", type: "tel" }
        ]}
        submitLabel="Send"
        successMessage="Sent"
      />
    );

    for (const name of ["email", "message", "topic"]) {
      expect(findControl(markup, name)).toContain("required");
      expect(findControl(markup, name)).toContain('aria-required="true"');
    }

    expect(findControl(markup, "phone")).not.toContain("required");
    expect(findControl(markup, "phone")).not.toContain("aria-required");
  });
});
