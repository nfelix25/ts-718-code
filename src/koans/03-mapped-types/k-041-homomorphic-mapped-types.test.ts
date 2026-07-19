import { describe, expect, it } from "vitest";
import { boxValues, clone, flagsFor } from "./k-041-homomorphic-mapped-types.js";

describe("k-041 homomorphic mapped types", () => {
  it("clones the source property set", () => {
    const source = { id: 1, name: "Ada" };
    expect(clone(source)).toEqual(source);
    expect(clone(source)).not.toBe(source);
  });
  it("preserves absent optional properties at runtime", () => {
    expect(clone({ id: 1 } as { id: number; name?: string })).toEqual({ id: 1 });
  });
  it("creates one flag for each enumerable source key", () => {
    expect(flagsFor({ id: 1, active: true })).toEqual({ id: false, active: false });
  });
  it("does not manufacture absent optional keys", () => {
    expect(flagsFor({ id: 1 } as { id: number; name?: string })).toEqual({ id: false });
  });
  it("boxes each present runtime value", () => {
    expect(boxValues({ id: 1, name: "Ada" })).toEqual({ id: { value: 1 }, name: { value: "Ada" } });
  });
});
