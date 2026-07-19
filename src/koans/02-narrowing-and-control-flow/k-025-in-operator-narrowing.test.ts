import { describe, expect, it } from "vitest";
import {
  contact,
  errorCode,
  hasInheritedToString,
  move,
  readName,
  type Bird,
  type Fish,
} from "./k-025-in-operator-narrowing.js";

describe("k-025 in-operator narrowing", () => {
  it("selects a required union capability", () => {
    const fish: Fish = { kind: "fish", swim: () => "swimming" };
    const bird: Bird = { kind: "bird", fly: () => "flying" };
    expect(move(fish)).toBe("swimming");
    expect(move(bird)).toBe("flying");
  });

  it("guards an unlisted property on unknown", () => {
    expect(readName({ name: "Ada" })).toBe("Ada");
    expect(readName({ name: 42 })).toBeUndefined();
    expect(readName(null)).toBeUndefined();
  });

  it("distinguishes an Error from a coded record", () => {
    expect(errorCode({ code: 404 })).toBe(404);
    expect(errorCode(new Error("failed"))).toBeUndefined();
  });

  it("selects contact fields", () => {
    expect(contact({ email: "a@example.com" })).toBe("a@example.com");
    expect(contact({ phone: "555" })).toBe("555");
  });

  it("counts inherited properties for the JavaScript in operator", () => {
    expect(hasInheritedToString({})).toBe(true);
    expect(Object.hasOwn({}, "toString")).toBe(false);
  });
});
