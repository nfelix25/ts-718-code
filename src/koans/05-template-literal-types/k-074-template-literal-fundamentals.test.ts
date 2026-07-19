import { describe, expect, it } from "vitest";

import {
  coordinate,
  flag,
  label,
  suffix,
} from "./k-074-template-literal-fundamentals.js";

describe("k-074 template literal fundamentals", () => {
  it("prefixes a string literal", () => {
    expect(label("ready")).toBe("value:ready");
  });

  it("stringifies numeric and bigint literals", () => {
    expect(label(42)).toBe("value:42");
    expect(label(99n)).toBe("value:99");
  });

  it("stringifies nullish values", () => {
    expect(suffix(null)).toBe("null:done");
    expect(suffix(undefined)).toBe("undefined:done");
  });

  it("joins two numeric coordinates", () => {
    expect(coordinate(-3, 4.5)).toBe("-3,4.5");
  });

  it("builds a boolean flag", () => {
    expect(flag("cache", true)).toBe("cache:true");
    expect(flag("cache", false)).toBe("cache:false");
  });
});
