import { describe, expect, it } from "vitest";

import { Builder, createBuilder, executeRequest } from "./k-148-accumulating-builders.js";

describe("k-148 accumulating builders", () => {
  it("accumulates runtime fields through immutable steps", () => {
    const empty = createBuilder();
    const one = empty.set("method", "GET");
    const two = one.set("url", "/koans");
    expect(empty.build()).toEqual({});
    expect(one.build()).toEqual({ method: "GET" });
    expect(two.build()).toEqual({ method: "GET", url: "/koans" });
  });

  it("overwrites an existing field in the next state", () => {
    const builder = new Builder().set("mode", "read").set("mode", "write");
    expect(builder.get("mode")).toBe("write");
  });

  it("retains symbol and numeric runtime keys", () => {
    const token = Symbol("token");
    const built = new Builder().set(token, 1).set(0, "zero").build();
    expect(built[token]).toBe(1);
    expect(built[0]).toBe("zero");
  });

  it("freezes the built snapshot", () => {
    expect(Object.isFrozen(new Builder().set("x", 1).build())).toBe(true);
  });

  it("executes a request only after required steps are represented", () => {
    const request = new Builder().set("method", "GET").set("url", "/koans");
    expect(executeRequest(request)).toEqual({ method: "GET", url: "/koans" });
  });
});
