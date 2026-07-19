import { describe, expect, it } from "vitest";

import {
  dataAttributes,
  prefixObjectKeys,
  suffixObjectKeys,
} from "./k-047-template-literal-keys.js";

describe("k-047 template literal keys", () => {
  it("prefixes and capitalizes object keys", () => {
    expect(prefixObjectKeys({ name: "Ada", active: true }, "api")).toEqual({ apiName: "Ada", apiActive: true });
  });

  it("handles an empty source key without inventing text", () => {
    expect(prefixObjectKeys({ "": 1 }, "pre")).toEqual({ pre: 1 });
  });

  it("suffixes every enumerable string key", () => {
    expect(suffixObjectKeys({ width: 10, height: 20 }, "Px")).toEqual({ widthPx: 10, heightPx: 20 });
  });

  it("creates data-style names while preserving values", () => {
    expect(dataAttributes({ userId: 7, active: false })).toEqual({ "data-userId": 7, "data-active": false });
  });

  it("returns an empty object for an empty source", () => {
    expect(prefixObjectKeys({}, "api")).toEqual({});
  });
});
