import { describe, expect, it } from "vitest";

import {
  csv,
  join,
  path,
} from "./k-082-type-level-join.js";

describe("k-082 type-level join", () => {
  it("joins an empty and singleton tuple", () => {
    expect(join([] as const, ",")).toBe("");
    expect(join(["only"] as const, ",")).toBe("only");
  });

  it("places separators only between elements", () => {
    expect(csv(["a", "b", "c"] as const)).toBe("a,b,c");
  });

  it("joins heterogeneous primitive values", () => {
    expect(path(["users", 42, true] as const)).toBe("users/42/true");
  });

  it("stringifies nullish values like template interpolation", () => {
    expect(join([null, undefined] as const, ",")).toBe("null,undefined");
  });

  it("concatenates with an empty separator", () => {
    expect(join(["T", "S", 7] as const, "")).toBe("TS7");
  });
});
