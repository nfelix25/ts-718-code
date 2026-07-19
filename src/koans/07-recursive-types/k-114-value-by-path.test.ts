import { describe, expect, it } from "vitest";

import { getAtPath, getAtPathOr } from "./k-114-value-by-path.js";

describe("k-114 value by path", () => {
  it("reads a root property", () => {
    expect(getAtPath({ id: "u1", active: true }, "id")).toBe("u1");
  });

  it("reads a deeply nested property", () => {
    const model = { profile: { contact: { email: "a@example.test" } } };
    expect(getAtPath(model, "profile.contact.email")).toBe("a@example.test");
  });

  it("returns undefined when an optional branch is absent", () => {
    const model: { settings?: { theme: string } } = {};
    expect(getAtPath(model, "settings.theme")).toBeUndefined();
  });

  it("returns a fallback only for undefined", () => {
    const model: { settings?: { retries: number } } = { settings: { retries: 0 } };
    const absent: { missing?: string } = {};
    expect(getAtPathOr(model, "settings.retries", 3)).toBe(0);
    expect(getAtPathOr(absent, "missing", 3)).toBe(3);
  });

  it("preserves null as a found terminal value", () => {
    expect(getAtPathOr({ profile: { phone: null as string | null } }, "profile.phone", "none")).toBeNull();
  });
});
