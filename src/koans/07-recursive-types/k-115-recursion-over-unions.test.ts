import { describe, expect, it } from "vitest";

import { collectDeepLeaves } from "./k-115-recursion-over-unions.js";

describe("k-115 recursion over unions", () => {
  it("returns a primitive root as one leaf", () => {
    expect(collectDeepLeaves("ready")).toEqual(["ready"]);
  });

  it("collects leaves across nested object branches", () => {
    expect(collectDeepLeaves({ user: { id: 1, active: true }, label: "A" })).toEqual([1, true, "A"]);
  });

  it("recurses through arrays and tuples", () => {
    expect(collectDeepLeaves([{ id: 1 }, { id: 2 }, ["x", "y"]])).toEqual([1, 2, "x", "y"]);
  });

  it("treats Date and RegExp values as atomic", () => {
    const date = new Date(0);
    const matcher = /x/;
    expect(collectDeepLeaves({ date, matcher })).toEqual([date, matcher]);
  });

  it("stops an active cycle but still visits ordinary siblings", () => {
    const node: { id: number; self?: unknown; child: { ok: boolean } } = { id: 1, child: { ok: true } };
    node.self = node;
    expect(collectDeepLeaves(node)).toEqual([1, true]);
  });
});
