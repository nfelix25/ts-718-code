import { describe, expect, it } from "vitest";

import {
  boxedVariantValue,
  boxProperties,
  removeKind,
} from "./k-049-mapping-object-unions.js";

describe("k-049 mapping object unions", () => {
  it("boxes every own property", () => {
    expect(boxProperties({ kind: "text", value: "hello", length: 5 })).toEqual({
      kind: { value: "text" },
      value: { value: "hello" },
      length: { value: 5 },
    });
  });

  it("preserves symbol properties while boxing", () => {
    const key = Symbol("key");
    expect(boxProperties({ [key]: 3 })[key]).toEqual({ value: 3 });
  });

  it("removes only the runtime discriminant", () => {
    expect(removeKind({ kind: "count" as const, value: 2, step: 1 })).toEqual({ value: 2, step: 1 });
  });

  it("uses a retained boxed discriminant to narrow text variants", () => {
    expect(boxedVariantValue(boxProperties({ kind: "text" as const, value: "hello" }))).toBe("HELLO");
  });

  it("uses a retained boxed discriminant to narrow number variants", () => {
    expect(boxedVariantValue(boxProperties({ kind: "count" as const, value: 7 }))).toBe("7");
  });
});
