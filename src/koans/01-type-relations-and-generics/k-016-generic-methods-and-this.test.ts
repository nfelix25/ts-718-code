import { describe, expect, it } from "vitest";
import {
  Collection,
  Model,
  SpecializedFluent,
  invokeWith,
} from "./k-016-generic-methods-and-this.js";

describe("k-016 generic methods and this", () => {
  it("maps and reduces with independently selected result types", () => {
    const values = new Collection([1, 2]);
    expect(values.map(String).values).toEqual(["1", "2"]);
    expect(values.reduce(0, (total, value) => total + value)).toBe(3);
  });

  it("gets, sets, and projects related model keys", () => {
    const model = new Model({ id: 1, active: false });
    expect(model.set("active", true)).toBe(model);
    expect(model.get("active")).toBe(true);
    expect(model.project("id")).toEqual({ id: 1 });
  });

  it("preserves a derived fluent receiver", () => {
    const fluent = new SpecializedFluent().label("ready").enable();
    expect(fluent.enabled).toBe(true);
    expect(fluent.allLabels()).toEqual(["ready"]);
  });

  it("returns this from a side-effecting collection method", () => {
    const values = new Collection([1, 2]);
    const seen: number[] = [];
    expect(values.tap((value) => seen.push(value))).toBe(values);
    expect(seen).toEqual([1, 2]);
  });

  it("invokes a function with its explicit receiver", () => {
    function describe(this: { prefix: string }, value: number) {
      return `${this.prefix}${value}`;
    }
    expect(invokeWith(describe, { prefix: "#" }, 2)).toBe("#2");
  });
});
