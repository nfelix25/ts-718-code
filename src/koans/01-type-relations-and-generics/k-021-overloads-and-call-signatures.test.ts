import { describe, expect, it } from "vitest";
import {
  concatenate,
  convert,
  genericIdentity,
  lookup,
  makeDate,
  stringIdentity,
} from "./k-021-overloads-and-call-signatures.js";

describe("k-021 overloads and call signatures", () => {
  it("implements both conversion overloads", () => {
    expect(convert("abc")).toBe(3);
    expect(convert(123)).toBe("123");
  });

  it("concatenates strings and arrays", () => {
    expect(concatenate("type", "script")).toBe("typescript");
    expect(concatenate([1, 2], [3])).toEqual([1, 2, 3]);
  });

  it("uses specific and fallback lookup branches", () => {
    expect(lookup("id")).toBe(1);
    expect(lookup("name")).toBe("Ada");
    expect(lookup("other")).toBeUndefined();
  });

  it("runs generic and fixed callable interfaces", () => {
    expect(genericIdentity({ id: 1 })).toEqual({ id: 1 });
    expect(stringIdentity("a")).toBe("a");
  });

  it("implements both date call signatures", () => {
    expect(makeDate(0).getTime()).toBe(0);
    expect(makeDate("2020-01-01T00:00:00.000Z").getUTCFullYear()).toBe(2020);
  });
});
