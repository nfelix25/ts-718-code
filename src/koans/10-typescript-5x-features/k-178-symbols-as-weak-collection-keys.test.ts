import { describe, expect, it } from "vitest";

import {
  describeWeakly,
  localToken,
  markVisited,
  readWeakDescription,
  registeredToken,
  secondToken,
  wasVisited,
} from "./k-178-symbols-as-weak-collection-keys.js";

describe("k-178 symbols as weak collection keys", () => {
  it("stores and retrieves a local symbol in a WeakMap", () => {
    describeWeakly(localToken, "local");
    expect(readWeakDescription(localToken)).toBe("local");
  });

  it("tracks a local symbol in a WeakSet", () => {
    markVisited(secondToken);
    expect(wasVisited(secondToken)).toBe(true);
    expect(wasVisited(localToken)).toBe(false);
  });

  it("still accepts object keys", () => {
    const objectKey = {};
    describeWeakly(objectKey, "object");
    expect(readWeakDescription(objectKey)).toBe("object");
  });

  it("keeps unique symbol identities separate", () => {
    describeWeakly(localToken, "first");
    describeWeakly(secondToken, "second");
    expect(readWeakDescription(localToken)).toBe("first");
    expect(readWeakDescription(secondToken)).toBe("second");
  });

  it("rejects globally registered symbols at runtime", () => {
    expect(() => describeWeakly(registeredToken, "registered")).toThrow(TypeError);
    expect(Symbol.keyFor(registeredToken)).toBe("koans.registered-token");
  });
});
