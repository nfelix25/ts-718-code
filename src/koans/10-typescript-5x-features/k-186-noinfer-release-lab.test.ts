import { describe, expect, it } from "vitest";

import {
  acceptSchema,
  authoritativePair,
  defineEvents,
  defineTransition,
  transformOr,
} from "./k-186-noinfer-release-lab.js";

describe("k-186 NoInfer release lab", () => {
  it("builds a transition inside the list-authored domain", () => {
    expect(defineTransition(["idle", "running"] as const, "idle", "running"))
      .toEqual(["idle", "running"]);
  });

  it("returns a value checked against its schema", () => {
    expect(acceptSchema({ id: 0 }, { id: 42 })).toEqual({ id: 42 });
  });

  it("uses transform output or its checked fallback", () => {
    expect(transformOr("42", Number, 0)).toBe(42);
    expect(transformOr<string, string>("x", () => {
      throw new Error("failure");
    }, "fallback")).toBe("fallback");
  });

  it("returns a handler whose domain comes from the event list", () => {
    const seen: string[] = [];
    const handler = defineEvents(["open", "close"] as const, (event) => {
      seen.push(event);
    });
    handler("open");
    expect(seen).toEqual(["open"]);
  });

  it("uses multiple unblocked sites to select a common type", () => {
    expect(authoritativePair("left", "right", "left")).toBe("left");
  });
});
