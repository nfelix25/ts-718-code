import { describe, expect, it } from "vitest";

import {
  dispatchField,
  fieldHandlers,
  formatFieldCase,
  formatFieldTuple,
  type FieldCase,
} from "./k-157-correlated-unions.js";

describe("k-157 correlated unions", () => {
  it("narrows a text object case as one unit", () => {
    const field: FieldCase = {
      kind: "text",
      value: "hello",
      format: (value) => value.toUpperCase(),
    };
    expect(formatFieldCase(field)).toBe("HELLO");
  });

  it("narrows a numeric object case as one unit", () => {
    const field: FieldCase = {
      kind: "count",
      value: 12.5,
      format: (value) => value.toFixed(1),
    };
    expect(formatFieldCase(field)).toBe("12.5");
  });

  it("preserves tuple-position correlation while narrowing", () => {
    expect(formatFieldTuple(["active", false, (value: boolean) => value ? "yes" : "no"]))
      .toBe("no");
  });

  it("threads one generic key through handler and value lookup", () => {
    expect(dispatchField(fieldHandlers, "count", 3)).toBe("3.00");
    expect(dispatchField(fieldHandlers, "active", true)).toBe("enabled");
  });

  it("uses the correct runtime handler for every key", () => {
    expect([
      dispatchField(fieldHandlers, "text", "ts"),
      dispatchField(fieldHandlers, "count", 7),
      dispatchField(fieldHandlers, "active", false),
    ]).toEqual(["TS", "7.00", "disabled"]);
  });
});
