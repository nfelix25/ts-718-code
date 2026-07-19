import { describe, expect, it } from "vitest";

import {
  omitKeys,
  pickKeys,
  pickNumberValues,
  publicUser,
} from "./k-046-filtering-keys-to-never.js";

describe("k-046 filtering keys to never", () => {
  it("omits exactly the requested runtime keys", () => {
    expect(omitKeys({ id: 1, name: "Ada", active: true }, ["active"])).toEqual({ id: 1, name: "Ada" });
  });

  it("picks exactly the requested runtime keys", () => {
    expect(pickKeys({ id: 1, name: "Ada", active: true }, ["name", "id"])).toEqual({ name: "Ada", id: 1 });
  });

  it("builds a public user view without credentials", () => {
    expect(publicUser({ id: 7, name: "Lin", password: "secret", token: "abc" })).toEqual({ id: 7, name: "Lin" });
  });

  it("filters runtime entries by their value predicate", () => {
    expect(pickNumberValues({ count: 3, label: "three", ratio: 0.5, active: true })).toEqual({ count: 3, ratio: 0.5 });
  });

  it("supports numeric and symbol keys at runtime", () => {
    const secret = Symbol("secret");
    expect(Reflect.ownKeys(omitKeys({ 0: "zero", keep: true, [secret]: 1 }, [0, secret]))).toEqual(["keep"]);
  });
});
