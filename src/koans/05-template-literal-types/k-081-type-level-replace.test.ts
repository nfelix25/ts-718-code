import { describe, expect, it } from "vitest";

import {
  replace,
  replaceAll,
} from "./k-081-type-level-replace.js";

describe("k-081 type-level replace", () => {
  it("replaces only the first match", () => {
    expect(replace("a-b-c", "-", ":")).toBe("a:b-c");
  });

  it("replaces all nonoverlapping matches", () => {
    expect(replaceAll("a-b-c", "-", ":")).toBe("a:b:c");
  });

  it("supports deletion with an empty replacement", () => {
    expect(replaceAll("banana", "a", "")).toBe("bnn");
  });

  it("does not rescan inserted text", () => {
    expect(replaceAll("aa", "a", "aa")).toBe("aaaa");
  });

  it("treats an empty search token as identity", () => {
    expect(replace("abc", "", "x")).toBe("abc");
    expect(replaceAll("abc", "", "x")).toBe("abc");
  });
});
