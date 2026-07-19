import { describe, expect, it } from "vitest";

import { ORDER, USER, createRegistry, ownRegistryKeys, readRegistry } from "./k-141-unique-symbol-identity.js";

describe("k-141 unique symbol identity", () => {
  it("creates distinct runtime symbols even with ordinary descriptions", () => {
    expect(USER).not.toBe(ORDER);
    expect(USER.description).toBe("user");
  });

  it("uses singleton keys for heterogeneous reads", () => {
    const registry = createRegistry();
    expect(readRegistry(registry, USER)).toEqual({ id: "u1", name: "Ada" });
    expect(readRegistry(registry, ORDER)).toEqual({ id: 42, total: 1999 });
  });

  it("keeps symbol keys out of Object.keys", () => {
    expect(Object.keys(createRegistry())).toEqual(["version"]);
  });

  it("includes symbol keys in Reflect.ownKeys", () => {
    expect(ownRegistryKeys(createRegistry())).toEqual(["version", USER, ORDER]);
  });

  it("keeps symbol-keyed values independent", () => {
    const registry = createRegistry();
    expect(registry[USER].id).toBe("u1");
    expect(registry[ORDER].id).toBe(42);
  });
});
