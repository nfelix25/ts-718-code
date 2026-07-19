import { describe, expect, it } from "vitest";

import {
  allOwnKeys,
  commonOwnKeys,
  hasOwnKey,
} from "./k-050-keyof-unions-and-distributed-mapping.js";

describe("k-050 keyof unions and distributed mapping", () => {
  const variants = [
    { kind: "text", common: true, text: "hello" },
    { kind: "count", common: false, count: 3 },
  ];

  it("finds keys present on every runtime member", () => {
    expect(commonOwnKeys(variants)).toEqual(["kind", "common"]);
  });

  it("finds keys present on any runtime member", () => {
    expect(allOwnKeys(variants)).toEqual(["kind", "common", "text", "count"]);
  });

  it("returns no common keys for an empty collection", () => {
    expect(commonOwnKeys([])).toEqual([]);
  });

  it("deduplicates symbol keys by identity", () => {
    const key = Symbol("key");
    expect(allOwnKeys([{ [key]: 1 }, { [key]: 2 }])).toEqual([key]);
  });

  it("checks a candidate own key", () => {
    expect(hasOwnKey({ text: "hello" }, "text")).toBe(true);
    expect(hasOwnKey({ text: "hello" }, "count")).toBe(false);
  });
});
