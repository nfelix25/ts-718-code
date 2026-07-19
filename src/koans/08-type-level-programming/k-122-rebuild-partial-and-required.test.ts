import { describe, expect, it } from "vitest";

import { withDefaults } from "./k-122-rebuild-partial-and-required.js";

describe("k-122 rebuild Partial and Required", () => {
  it("fills absent properties from defaults", () => {
    expect(withDefaults({ host: "localhost", port: 80 }, { port: 3000 })).toEqual({ host: "localhost", port: 3000 });
  });

  it("accepts an empty partial value", () => {
    const defaults = { host: "localhost", port: 80 };
    expect(withDefaults(defaults, {})).toEqual(defaults);
  });

  it("does not mutate either input", () => {
    const defaults = { host: "localhost", port: 80 };
    const values = { port: 3000 };
    const result = withDefaults(defaults, values);
    expect(result).not.toBe(defaults);
    expect(defaults.port).toBe(80);
    expect(values.port).toBe(3000);
  });

  it("uses explicit undefined when the source value domain permits it", () => {
    const defaults: { value: string | undefined } = { value: "ready" };
    expect(withDefaults(defaults, { value: undefined })).toEqual({ value: undefined });
  });

  it("performs a shallow merge", () => {
    const defaults = { nested: { host: "localhost", port: 80 } };
    const replacement = { host: "example.test", port: 443 };
    expect(withDefaults(defaults, { nested: replacement }).nested).toBe(replacement);
  });
});
