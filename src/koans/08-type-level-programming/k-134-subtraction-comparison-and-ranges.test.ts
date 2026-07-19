import { describe, expect, it } from "vitest";

import { compareNaturals, rangeInclusive, subtractNatural } from "./k-134-subtraction-comparison-and-ranges.js";

describe("k-134 subtraction, comparison, and ranges", () => {
  it("subtracts valid natural numbers", () => {
    expect(subtractNatural(9, 4)).toBe(5);
  });

  it("rejects underflow and non-natural subtraction", () => {
    expect(() => subtractNatural(2, 3)).toThrow(RangeError);
    expect(() => subtractNatural(2.5, 1)).toThrow(RangeError);
  });

  it("returns all three comparison outcomes", () => {
    expect([compareNaturals(1, 2), compareNaturals(2, 2), compareNaturals(3, 2)]).toEqual(["lt", "eq", "gt"]);
  });

  it("enumerates inclusive natural bounds", () => {
    expect(rangeInclusive(2, 5)).toEqual([2, 3, 4, 5]);
  });

  it("returns an empty runtime range for invalid bounds", () => {
    expect(rangeInclusive(5, 2)).toEqual([]);
    expect(rangeInclusive(-1, 2)).toEqual([]);
  });
});
