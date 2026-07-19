import { describe, expect, it } from "vitest";

import { cloneJson, isJsonValue, parseJson, stringifyJson } from "./k-105-recursive-json-values.js";

describe("k-105 recursive JSON values", () => {
  it("validates deeply nested JSON data", () => {
    expect(isJsonValue({ users: [{ id: 1, tags: ["ts"] }], active: true })).toBe(true);
  });

  it("rejects unsupported leaves and nonfinite numbers", () => {
    expect(isJsonValue({ value: undefined })).toBe(false);
    expect(isJsonValue(Number.NaN)).toBe(false);
    expect(isJsonValue(1n)).toBe(false);
  });

  it("rejects sparse and cyclic containers", () => {
    const sparse = new Array(2);
    const cyclic: Record<string, unknown> = {};
    cyclic.self = cyclic;
    expect(isJsonValue(sparse)).toBe(false);
    expect(isJsonValue(cyclic)).toBe(false);
  });

  it("accepts a shared reference that is not cyclic", () => {
    const shared = { id: 1 };
    expect(isJsonValue({ left: shared, right: shared })).toBe(true);
  });

  it("parses and stringifies through the trusted boundary", () => {
    const parsed = parseJson('{"count":2,"ok":true}');
    expect(stringifyJson(parsed)).toBe('{"count":2,"ok":true}');
  });

  it("deep-clones valid JSON data", () => {
    const source = { nested: { values: [1, 2] } } as const;
    const clone = cloneJson(source);
    expect(clone).toEqual(source);
    expect(clone).not.toBe(source);
  });
});
