import { describe, expect, it } from "vitest";

import { cloneMutable, thawSettings, type FrozenSettings } from "./k-111-deep-mutable.js";

describe("k-111 DeepMutable", () => {
  it("clones nested plain objects into writable containers", () => {
    const source = { nested: { count: 1 } } as const;
    const clone = cloneMutable(source);
    clone.nested.count = 1;
    expect(clone).toEqual(source);
    expect(clone.nested).not.toBe(source.nested);
  });

  it("clones readonly arrays into mutable arrays", () => {
    const source: readonly number[] = [1, 2];
    const clone = cloneMutable(source);
    clone.push(3);
    expect(clone).toEqual([1, 2, 3]);
    expect(source).toEqual([1, 2]);
  });

  it("preserves tuple cardinality while permitting writes", () => {
    const clone = cloneMutable([1, 2] as const);
    clone[0] = 1;
    expect(clone).toEqual([1, 2]);
  });

  it("handles cycles while preserving the cloned cycle", () => {
    const source: { self?: unknown } = {};
    source.self = source;
    const clone = cloneMutable(source);
    expect(clone).not.toBe(source);
    expect(clone.self).toBe(clone);
  });

  it("thaws a complete settings graph", () => {
    const source: FrozenSettings = {
      account: { name: "Ada", contact: { email: "ada@example.com" } },
      tags: ["typescript"],
      coordinates: [1, 2],
    };
    const clone = thawSettings(source);
    clone.tags.push("advanced");
    clone.coordinates[0] = 3;
    expect(clone.tags).toEqual(["typescript", "advanced"]);
    expect(clone.coordinates).toEqual([3, 2]);
  });
});
