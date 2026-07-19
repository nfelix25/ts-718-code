import { describe, expect, it } from "vitest";

import { omit } from "./k-119-rebuild-omit.js";

describe("k-119 rebuild Omit", () => {
  it("removes one requested property", () => {
    expect(omit({ id: 1, password: "secret" }, ["password"])).toEqual({ id: 1 });
  });

  it("removes several properties", () => {
    expect(omit({ id: 1, name: "Ada", active: true }, ["name", "active"])).toEqual({ id: 1 });
  });

  it("does not mutate the source", () => {
    const source = { id: 1, password: "secret" };
    const result = omit(source, ["password"]);
    expect(source).toEqual({ id: 1, password: "secret" });
    expect(result).not.toBe(source);
  });

  it("treats an absent blocked key as a no-op", () => {
    expect(omit({ id: 1 }, ["missing"])).toEqual({ id: 1 });
  });

  it("can remove a symbol key", () => {
    const token = Symbol("token");
    const result = omit({ [token]: 42, shown: true }, [token]);
    expect(result).toEqual({ shown: true });
    expect(Reflect.ownKeys(result)).toEqual(["shown"]);
  });
});
