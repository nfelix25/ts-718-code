import { describe, expect, it } from "vitest";

import { addCents, centsValue, makeCents, makeEmailAddress, makeMeters, makeSessionToken } from "./k-139-opaque-module-types.js";

describe("k-139 opaque module types", () => {
  it("normalizes and validates email addresses", () => {
    expect(makeEmailAddress(" Ada@Example.com ")).toBe("ada@example.com");
    expect(() => makeEmailAddress("not-an-email")).toThrow(TypeError);
  });

  it("constructs only non-negative integral cents", () => {
    expect(makeCents(125)).toBe(125);
    expect(() => makeCents(1.5)).toThrow(RangeError);
  });

  it("keeps same-domain arithmetic behind a preserving operation", () => {
    expect(addCents(makeCents(125), makeCents(75))).toBe(200);
  });

  it("unwraps deliberately at the representation boundary", () => {
    expect(centsValue(makeCents(99))).toBe(99);
    expect(makeMeters(2.5)).toBe(2.5);
  });

  it("can pair opacity with a runtime immutable wrapper", () => {
    const token = makeSessionToken("abcdefgh");
    expect(token).toEqual({ value: "abcdefgh" });
    expect(Object.isFrozen(token)).toBe(true);
  });
});
