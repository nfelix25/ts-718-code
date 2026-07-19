import { describe, expect, it } from "vitest";

import { bindPrefix, bindSuffix, flipFunction, invokeTuple } from "./k-103-tuple-adapter-capstone.js";

describe("k-103 tuple adapter capstone", () => {
  const request = (method: "GET" | "POST", path: string, retries: number, trace: boolean) =>
    `${method} ${path} retries=${retries} trace=${trace}`;

  it("binds multiple leading arguments", () => {
    const getUsers = bindPrefix(request, "GET", "/users");
    expect(getUsers(2, true)).toBe("GET /users retries=2 trace=true");
  });

  it("binds multiple trailing arguments", () => {
    const tracedOnce = bindSuffix(request, 1, true);
    expect(tracedOnce("POST", "/jobs")).toBe("POST /jobs retries=1 trace=true");
  });

  it("binds every parameter into a zero-argument function", () => {
    const fixed = bindPrefix(request, "GET", "/health", 0, false);
    expect(fixed()).toBe("GET /health retries=0 trace=false");
  });

  it("flips a fixed required signature", () => {
    const flipped = flipFunction((a: string, b: number, c: boolean) => `${a}:${b}:${c}`);
    expect(flipped(true, 2, "x")).toBe("x:2:true");
  });

  it("invokes through an exact parameter tuple", () => {
    expect(invokeTuple(request, ["POST", "/items", 3, false])).toBe("POST /items retries=3 trace=false");
  });
});
