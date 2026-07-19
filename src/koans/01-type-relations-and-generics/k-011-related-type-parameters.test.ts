import { describe, expect, it } from "vitest";
import {
  assignSelected,
  select,
  selectMany,
  selectPair,
  transformSelected,
} from "./k-011-related-type-parameters.js";

describe("k-011 related type parameters", () => {
  it("selects the runtime property corresponding to K", () => {
    expect(select({ id: 1, name: "Ada" }, "name")).toBe("Ada");
  });

  it("retains the requested order in a related key pair", () => {
    expect(selectPair({ id: 1, name: "Ada" }, "name", "id")).toEqual(["Ada", 1]);
  });

  it("contextually types a transformation for the selected value", () => {
    expect(transformSelected({ count: 2 }, "count", (count) => count * 3)).toBe(6);
  });

  it("builds a projection from the requested keys", () => {
    expect(selectMany({ id: 1, name: "Ada", active: true }, ["id", "active"])).toEqual({
      id: 1,
      active: true,
    });
  });

  it("assigns a value accepted for the selected key", () => {
    const value = { count: 1 };
    assignSelected(value, "count", 2);
    expect(value.count).toBe(2);
  });
});
