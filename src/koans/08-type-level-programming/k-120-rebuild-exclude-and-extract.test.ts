import { describe, expect, it } from "vitest";

import { partitionBy } from "./k-120-rebuild-exclude-and-extract.js";

describe("k-120 rebuild Exclude and Extract", () => {
  it("partitions primitive unions with a predicate", () => {
    const result = partitionBy([1, "a", 2, "b"] as const, (value): value is 1 | 2 => typeof value === "number");
    expect(result).toEqual({ extracted: [1, 2], excluded: ["a", "b"] });
  });

  it("keeps input order within both partitions", () => {
    const result = partitionBy([3, 2, 1, 4], (value): value is number => value % 2 === 0);
    expect(result.extracted).toEqual([2, 4]);
    expect(result.excluded).toEqual([3, 1]);
  });

  it("extracts structurally matching object variants", () => {
    type Item = { kind: "text"; value: string } | { kind: "count"; value: number };
    const items: Item[] = [{ kind: "text", value: "a" }, { kind: "count", value: 1 }];
    const result = partitionBy(items, (item): item is Extract<Item, { kind: "count" }> => item.kind === "count");
    expect(result.extracted).toEqual([{ kind: "count", value: 1 }]);
  });

  it("handles an empty input", () => {
    expect(partitionBy([] as number[], (value): value is number => value > 0)).toEqual({ extracted: [], excluded: [] });
  });

  it("can select no members", () => {
    const result = partitionBy([1, 2, 3], (_value): _value is never => false);
    expect(result).toEqual({ extracted: [], excluded: [1, 2, 3] });
  });
});
