import { describe, expect, it } from "vitest";

import { freezeShallow, fromKeys } from "./k-123-rebuild-readonly-and-record.js";

describe("k-123 rebuild Readonly and Record", () => {
  it("creates one value for every finite key", () => {
    expect(fromKeys(["idle", "busy"] as const, (key) => key.length)).toEqual({ idle: 4, busy: 4 });
  });

  it("supports numeric keys", () => {
    expect(fromKeys([0, 1] as const, (key) => `v${key}`)).toEqual({ 0: "v0", 1: "v1" });
  });

  it("supports symbol keys", () => {
    const token = Symbol("token");
    const result = fromKeys([token] as const, () => 42);
    expect(result[token]).toBe(42);
  });

  it("freezes the outer object at runtime", () => {
    const value = freezeShallow({ count: 1 });
    expect(Object.isFrozen(value)).toBe(true);
  });

  it("keeps nested objects mutable because the freeze is shallow", () => {
    const value = freezeShallow({ nested: { count: 1 } });
    value.nested.count = 2;
    expect(value.nested.count).toBe(2);
  });
});
