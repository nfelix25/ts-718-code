import { describe, expect, it } from "vitest";

import {
  arrayValueKind,
  describeIndexed,
} from "./k-188-constant-indexed-control-flow-analysis.js";

describe("k-188 constant indexed control-flow analysis", () => {
  it("narrows a string at a dynamic key", () => {
    expect(describeIndexed({ value: "koan" }, "value")).toBe("text:KOAN");
  });

  it("narrows a number at a dynamic key", () => {
    expect(describeIndexed({ value: 3 }, "value")).toBe("number:3.0");
  });

  it("retains the broad fallback for other values", () => {
    expect(describeIndexed({ value: true }, "value")).toBe("other");
    expect(describeIndexed({}, "missing")).toBe("other");
  });

  it("narrows an array at a constant numeric index", () => {
    expect(arrayValueKind(["x", [1, 2]], 1)).toBe("array:2");
  });

  it("distinguishes object and primitive indexed values", () => {
    expect(arrayValueKind([{ id: 1 }], 0)).toBe("object");
    expect(arrayValueKind([42], 0)).toBe("number");
  });
});
