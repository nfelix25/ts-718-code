import { describe, expect, it } from "vitest";

import {
  asynchronouslyUndefined,
  createContextualCallbacks,
  implicitlyUndefined,
  invokeUndefined,
  mapWithUndefined,
  recordUndefined,
} from "./k-173-easier-undefined-returns.js";

describe("k-173 easier undefined returns", () => {
  it("falls off the end of an explicitly undefined-returning function", () => {
    expect(implicitlyUndefined()).toBeUndefined();
    const log: string[] = [];
    expect(recordUndefined(log, "recorded")).toBeUndefined();
    expect(log).toEqual(["recorded"]);
  });

  it("contextually infers undefined for a callback with no return", () => {
    const log: string[] = [];
    const result = invokeUndefined(() => {
      log.push("callback");
    });
    expect(result).toBeUndefined();
    expect(log).toEqual(["callback"]);
  });

  it("maps every callback completion to actual undefined values", () => {
    const seen: number[] = [];
    const result = mapWithUndefined([10, 20], (value, index) => {
      seen.push(value + index);
    });
    expect(result).toEqual([undefined, undefined]);
    expect(seen).toEqual([10, 21]);
  });

  it("distinguishes a void callback that returns an ignored value", () => {
    const log: string[] = [];
    const { undefinedCallback, voidCallback } = createContextualCallbacks(log);
    expect(undefinedCallback()).toBeUndefined();
    expect(voidCallback()).toBe(42);
    expect(log).toEqual(["undefined", "void"]);
  });

  it("fulfills Promise<undefined> without an explicit return", async () => {
    const log: string[] = [];
    await expect(asynchronouslyUndefined(log)).resolves.toBeUndefined();
    expect(log).toEqual(["async-body"]);
  });
});
