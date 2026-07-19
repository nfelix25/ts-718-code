import { describe, expect, it } from "vitest";

import {
  ownStringKeys,
  ownSymbolKeys,
  runtimePropertyKey,
} from "./k-051-string-number-symbol-keys.js";

describe("k-051 string number symbol keys", () => {
  it("observes numeric object keys as runtime strings", () => {
    expect(ownStringKeys({ 0: "zero", name: "value" })).toEqual(["0", "name"]);
  });

  it("keeps symbol keys out of the string-key list", () => {
    const token = Symbol("token");
    expect(ownStringKeys({ name: "value", [token]: 1 })).toEqual(["name"]);
  });

  it("returns symbol keys by identity", () => {
    const first = Symbol("same");
    const second = Symbol("same");
    expect(ownSymbolKeys({ [first]: 1, [second]: 2 })).toEqual([first, second]);
  });

  it("normalizes numeric PropertyKeys to runtime strings", () => {
    expect(runtimePropertyKey(42)).toBe("42");
    expect(runtimePropertyKey("42")).toBe("42");
  });

  it("preserves symbols during runtime normalization", () => {
    const key = Symbol("key");
    expect(runtimePropertyKey(key)).toBe(key);
  });
});
