import { describe, expect, it } from "vitest";

import { applyPatch, updateSettings, type Settings } from "./k-108-deep-partial.js";

const settings: Settings = {
  account: { name: "Ada", contact: { email: "ada@example.com", phone: "123" } },
  theme: { mode: "light", contrast: 1 },
  tags: ["typescript", "koans"],
};

describe("k-108 DeepPartial", () => {
  it("updates a deeply nested property", () => {
    const updated = updateSettings(settings, { account: { contact: { email: "new@example.com" } } });
    expect(updated.account.contact).toEqual({ email: "new@example.com", phone: "123" });
  });

  it("preserves untouched sibling branches", () => {
    const updated = updateSettings(settings, { theme: { mode: "dark" } });
    expect(updated.theme).toEqual({ mode: "dark", contrast: 1 });
    expect(updated.account).toEqual(settings.account);
  });

  it("replaces arrays according to the patch policy", () => {
    expect(updateSettings(settings, { tags: ["advanced"] }).tags).toEqual(["advanced"]);
  });

  it("replaces atomic leaves", () => {
    const base = { created: new Date("2020-01-01"), nested: { count: 1 } };
    const replacement = new Date("2021-01-01");
    expect(applyPatch(base, { created: replacement }).created).toBe(replacement);
  });

  it("accepts an empty patch as identity by value", () => {
    expect(updateSettings(settings, {})).toEqual(settings);
  });
});
