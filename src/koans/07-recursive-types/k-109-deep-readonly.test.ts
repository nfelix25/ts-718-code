import { describe, expect, it } from "vitest";

import { deepFreeze, freezeSettings, type ReadonlySettings } from "./k-109-deep-readonly.js";

describe("k-109 DeepReadonly", () => {
  it("freezes nested plain objects", () => {
    const value = deepFreeze({ nested: { count: 1 } });
    expect(Object.isFrozen(value)).toBe(true);
    expect(Object.isFrozen(value.nested)).toBe(true);
  });

  it("freezes nested arrays and their object elements", () => {
    const value = deepFreeze([{ id: 1 }, { id: 2 }]);
    expect(Object.isFrozen(value)).toBe(true);
    expect(Object.isFrozen(value[0])).toBe(true);
  });

  it("rejects mutation at runtime after freezing", () => {
    const value = deepFreeze({ nested: { count: 1 } });
    expect(() => Reflect.set(value.nested, "count", 2)).not.toThrow();
    expect(value.nested.count).toBe(1);
  });

  it("handles active cycles without infinite recursion", () => {
    const cyclic: { self?: unknown } = {};
    cyclic.self = cyclic;
    expect(() => deepFreeze(cyclic)).not.toThrow();
    expect(Object.isFrozen(cyclic)).toBe(true);
  });

  it("freezes a complete settings data graph", () => {
    const settings: ReadonlySettings = {
      account: { name: "Ada", contact: { email: "ada@example.com" } },
      theme: { mode: "dark", contrast: 2 },
      tags: ["typescript"],
    };
    const frozen = freezeSettings(settings);
    expect(Object.isFrozen(frozen.account.contact)).toBe(true);
    expect(Object.isFrozen(frozen.tags)).toBe(true);
  });
});
