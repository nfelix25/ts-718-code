import { describe, expect, it } from "vitest";

import { mutableSnapshot, readonlySnapshot } from "./k-112-collection-aware-recursion.js";

describe("k-112 collection-aware recursion", () => {
  it("clones Map keys and values recursively", () => {
    const key = { id: 1 };
    const value = { nested: { count: 2 } };
    const snapshot = readonlySnapshot(new Map([[key, value]]));
    const [clonedKey, clonedValue] = [...snapshot][0]!;
    expect(clonedKey).toEqual(key);
    expect(clonedKey).not.toBe(key);
    expect(clonedValue.nested).not.toBe(value.nested);
  });

  it("clones Set elements recursively", () => {
    const entry = { id: 1 };
    const snapshot = mutableSnapshot(new Set([entry]));
    const [cloned] = [...snapshot];
    expect(cloned).toEqual(entry);
    expect(cloned).not.toBe(entry);
  });

  it("transforms fulfilled Promise values", async () => {
    const source = { nested: { id: 1 } };
    const snapshot = await readonlySnapshot(Promise.resolve(source));
    expect(snapshot).toEqual(source);
    expect(snapshot.nested).not.toBe(source.nested);
  });

  it("preserves cycles across collection snapshots", () => {
    const map = new Map<string, unknown>();
    map.set("self", map);
    const snapshot = mutableSnapshot(map);
    expect(snapshot.get("self")).toBe(snapshot);
  });

  it("keeps weak collections opaque", () => {
    const weak = new WeakMap<object, { id: number }>();
    expect(readonlySnapshot(weak)).toBe(weak);
    expect(mutableSnapshot(weak)).toBe(weak);
  });
});
