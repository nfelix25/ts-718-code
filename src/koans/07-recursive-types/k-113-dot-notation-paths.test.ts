import { describe, expect, it } from "vitest";

import { listDotPaths } from "./k-113-dot-notation-paths.js";

describe("k-113 dot-notation paths", () => {
  it("lists every present object prefix and nested path", () => {
    expect(listDotPaths({ profile: { name: "Ada", contact: { email: "a@example.test" } } })).toEqual([
      "profile",
      "profile.contact",
      "profile.contact.email",
      "profile.name",
    ]);
  });

  it("treats arrays and built-ins as leaves", () => {
    expect(listDotPaths({ rows: [{ id: 1 }], createdAt: new Date(0) })).toEqual(["createdAt", "rows"]);
  });

  it("reports only optional properties present in the runtime value", () => {
    const value: { settings?: { theme?: string }; id: number } = { id: 1 };
    expect(listDotPaths(value)).toEqual(["id"]);
  });

  it("stops when a runtime object cycle returns to an active node", () => {
    const node: { id: string; self?: unknown } = { id: "root" };
    node.self = node;
    expect(listDotPaths(node)).toEqual(["id", "self"]);
  });

  it("ignores symbol keys because dot paths are string-keyed", () => {
    const hidden = Symbol("hidden");
    expect(listDotPaths({ shown: { value: 1 }, [hidden]: { secret: true } })).toEqual([
      "shown",
      "shown.value",
    ]);
  });
});
