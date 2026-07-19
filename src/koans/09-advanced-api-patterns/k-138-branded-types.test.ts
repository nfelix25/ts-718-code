import { describe, expect, it } from "vitest";

import { brandValue, formatUserPath, makePositive, makeUserId } from "./k-138-branded-types.js";

describe("k-138 branded types", () => {
  it("validates user ids at the constructor boundary", () => {
    expect(makeUserId("usr_a12")).toBe("usr_a12");
    expect(() => makeUserId("order-1")).toThrow(TypeError);
  });

  it("validates positive numbers", () => {
    expect(makePositive(3)).toBe(3);
    expect(() => makePositive(0)).toThrow(RangeError);
  });

  it("accepts branded values through base-representation operations", () => {
    expect(makeUserId("usr_abc").toUpperCase()).toBe("USR_ABC");
  });

  it("uses brand-requiring APIs after construction", () => {
    expect(formatUserPath(makeUserId("usr_42"))).toBe("/users/usr_42");
  });

  it("adds no runtime wrapper or marker", () => {
    const value = { id: 1 };
    expect(brandValue<typeof value, "entity">(value)).toBe(value);
  });
});
