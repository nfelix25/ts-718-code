import { describe, expect, it } from "vitest";

import { evaluateExpression, listFromArray, listToArray, mapList, nestedDepth } from "./k-104-recursive-type-aliases.js";

describe("k-104 recursive type aliases", () => {
  it("round-trips an array through a recursive list", () => {
    expect(listToArray(listFromArray([1, 2, 3]))).toEqual([1, 2, 3]);
  });

  it("uses null as the empty list base", () => {
    expect(listFromArray([])).toBeNull();
  });

  it("maps every recursive list node", () => {
    expect(listToArray(mapList(listFromArray([1, 2]), (value) => `#${value}`))).toEqual(["#1", "#2"]);
  });

  it("measures nested container depth", () => {
    expect(nestedDepth([1, [2, [3]]])).toBe(3);
    expect(nestedDepth("leaf")).toBe(0);
  });

  it("evaluates a recursive discriminated expression", () => {
    expect(evaluateExpression({
      kind: "add",
      left: { kind: "number", value: 7 },
      right: { kind: "negate", expression: { kind: "number", value: 2 } },
    })).toBe(5);
  });
});
