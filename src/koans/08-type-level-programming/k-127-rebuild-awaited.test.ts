import { describe, expect, it } from "vitest";

import { resolveAwaited } from "./k-127-rebuild-awaited.js";

describe("k-127 rebuild Awaited", () => {
  it("resolves a plain value", async () => {
    await expect(resolveAwaited(42)).resolves.toBe(42);
  });

  it("preserves nullish values", async () => {
    await expect(resolveAwaited(null)).resolves.toBeNull();
    await expect(resolveAwaited(undefined)).resolves.toBeUndefined();
  });

  it("unwraps a native promise", async () => {
    await expect(resolveAwaited(Promise.resolve("ready"))).resolves.toBe("ready");
  });

  it("assimilates a structural thenable", async () => {
    const thenable = { then(resolve: (value: number) => void) { resolve(42); } };
    await expect(resolveAwaited(thenable)).resolves.toBe(42);
  });

  it("recursively assimilates a thenable fulfilled with a promise", async () => {
    const thenable = { then(resolve: (value: Promise<number>) => void) { resolve(Promise.resolve(42)); } };
    await expect(resolveAwaited(thenable)).resolves.toBe(42);
  });
});
