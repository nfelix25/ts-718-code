import { describe, expect, it } from "vitest";

import {
  failBodyAndCleanup,
  failCleanupOnly,
  runAsyncDisposableStack,
  runDisposableStack,
  runMovedStack,
} from "./k-171-disposal-stacks-and-suppressed-errors.js";

describe("k-171 disposal stacks and suppressed errors", () => {
  it("unwinds use, adopt, and defer registrations in LIFO order", () => {
    const log: string[] = [];
    const { resource, stack } = runDisposableStack(log);
    expect(log).toEqual([
      "acquire:used",
      "body",
      "defer",
      "adopt:adopted",
      "dispose:used",
    ]);
    expect(resource.disposed).toBe(true);
    expect(stack.disposed).toBe(true);
  });

  it("moves ownership and marks the source stack disposed", () => {
    const log: string[] = [];
    const { source, destination, resource } = runMovedStack(log);
    expect(log).toEqual([
      "acquire:moved",
      "moved:true:false",
      "dispose:moved",
    ]);
    expect(source.disposed).toBe(true);
    expect(destination.disposed).toBe(true);
    expect(resource.disposed).toBe(true);
  });

  it("awaits async stack callbacks sequentially in LIFO order", async () => {
    const log: string[] = [];
    await expect(runAsyncDisposableStack(log)).resolves.toBe(true);
    expect(log).toEqual([
      "body",
      "defer-start",
      "defer-end",
      "adopt-start:adopted",
      "adopt-end:adopted",
    ]);
  });

  it("preserves body and cleanup failures in SuppressedError order", () => {
    let caught: unknown;
    try {
      failBodyAndCleanup();
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(SuppressedError);
    const suppressed = caught as SuppressedError;
    expect(suppressed.error).toMatchObject({ message: "cleanup failed" });
    expect(suppressed.suppressed).toMatchObject({ message: "body failed" });
  });

  it("throws a lone cleanup failure directly", () => {
    expect(() => failCleanupOnly()).toThrow("cleanup only");
    try {
      failCleanupOnly();
    } catch (error) {
      expect(error).not.toBeInstanceOf(SuppressedError);
    }
  });
});
