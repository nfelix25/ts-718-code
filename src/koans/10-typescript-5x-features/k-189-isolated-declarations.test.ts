import { describe, expect, it } from "vitest";

import {
  UserStore,
  createUser,
  declarationReady,
  formatUser,
  protocolVersion,
} from "./k-189-isolated-declarations.js";

describe("k-189 isolated declarations", () => {
  it("keeps trivial exported literals ordinary at runtime", () => {
    expect(protocolVersion).toBe(1);
  });

  it("implements an explicitly annotated exported function", () => {
    expect(createUser(1, "Ada")).toEqual({ id: 1, name: "Ada" });
  });

  it("implements an explicitly typed exported function value", () => {
    expect(formatUser({ id: 2, name: "Grace" })).toBe("2:Grace");
  });

  it("keeps annotated class members functional", () => {
    const store = new UserStore();
    store.add(createUser(1, "Ada"));
    expect(store.size).toBe(1);
  });

  it("classifies missing public annotations as not ready", () => {
    expect(declarationReady({
      name: "create",
      kind: "function",
      annotation: "missing",
    })).toBe(false);
    expect(declarationReady({
      name: "version",
      kind: "variable",
      annotation: "trivial",
    })).toBe(true);
  });
});
