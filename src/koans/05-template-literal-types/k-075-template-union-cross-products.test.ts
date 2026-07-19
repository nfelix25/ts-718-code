import { describe, expect, it } from "vitest";

import {
  booleanState,
  eventName,
  localeKey,
  pair,
} from "./k-075-template-union-cross-products.js";

describe("k-075 template union cross-products", () => {
  it("joins one pair of choices", () => {
    expect(pair("get", "user")).toBe("get:user");
  });

  it("preserves values selected from runtime unions", () => {
    const verb = Math.random() > -1 ? "get" as const : "set" as const;
    const resource = Math.random() > -1 ? "user" as const : "post" as const;
    expect(pair(verb, resource)).toBe("get:user");
  });

  it("builds dotted event names", () => {
    expect(eventName("user", "created")).toBe("user.created");
  });

  it("builds a three-slot locale key", () => {
    expect(localeKey("en", "nav", "home")).toBe("en:nav.home");
  });

  it("expands boolean runtime states", () => {
    expect(booleanState("cache", true)).toBe("cache:true");
    expect(booleanState("cache", false)).toBe("cache:false");
  });
});
