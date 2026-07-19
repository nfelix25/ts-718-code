import { describe, expect, it } from "vitest";

import { cloneObjectGraph } from "./k-116-cyclic-types-and-visited-guards.js";

describe("k-116 cyclic types and visited guards", () => {
  it("clones an acyclic object graph deeply", () => {
    const source = { nested: { id: 1 }, list: [{ id: 2 }] };
    const clone = cloneObjectGraph(source);
    expect(clone).toEqual(source);
    expect(clone.nested).not.toBe(source.nested);
    expect(clone.list).not.toBe(source.list);
  });

  it("preserves a self cycle", () => {
    const source: { id: number; self?: unknown } = { id: 1 };
    source.self = source;
    const clone = cloneObjectGraph(source);
    expect(clone).not.toBe(source);
    expect(clone.self).toBe(clone);
  });

  it("preserves a mutual cycle", () => {
    const left: { right?: unknown } = {};
    const right: { left?: unknown } = {};
    left.right = right;
    right.left = left;
    const clone = cloneObjectGraph(left);
    expect((clone.right as { left: unknown }).left).toBe(clone);
  });

  it("preserves shared runtime identity", () => {
    const shared = { id: 1 };
    const clone = cloneObjectGraph({ left: shared, right: shared });
    expect(clone.left).toBe(clone.right);
    expect(clone.left).not.toBe(shared);
  });

  it("keeps opaque built-ins by identity", () => {
    const date = new Date(0);
    expect(cloneObjectGraph({ date }).date).toBe(date);
  });
});
