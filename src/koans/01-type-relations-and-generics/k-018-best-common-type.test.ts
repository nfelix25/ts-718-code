import { describe, expect, it } from "vitest";
import { collect, copyList, first, last } from "./k-018-best-common-type.js";

describe("k-018 best common type", () => {
  it("reads array boundaries", () => {
    expect(first([1, 2])).toBe(1);
    expect(last([1, 2])).toBe(2);
    expect(first([])).toBeUndefined();
  });

  it("collects heterogeneous values under an explicit union", () => {
    expect(collect<string | number>(1, "a")).toEqual([1, "a"]);
  });

  it("copies readonly tuple values into a mutable runtime array", () => {
    const source = ["ok", 200] as const;
    const result = copyList(source);
    expect(result).toEqual(source);
    expect(result).not.toBe(source);
  });

  it("preserves object values while copying", () => {
    const value = { id: 1 };
    expect(copyList([value])[0]).toBe(value);
  });

  it("uses ordinary JavaScript order for mixed collections", () => {
    expect([1, "a", true]).toEqual([1, "a", true]);
  });
});
