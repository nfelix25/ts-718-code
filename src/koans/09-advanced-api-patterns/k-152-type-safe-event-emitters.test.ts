import { describe, expect, it, vi } from "vitest";

import {
  shutdownEvent,
  TypedEmitter,
  type AppEvents,
} from "./k-152-type-safe-event-emitters.js";

describe("k-152 type-safe event emitters", () => {
  it("delivers a correlated multi-argument event", () => {
    const emitter = new TypedEmitter<AppEvents>();
    const listener = vi.fn();
    emitter.on("message", listener);
    expect(emitter.emit("message", "hello", { id: "u1" })).toBe(true);
    expect(listener).toHaveBeenCalledWith("hello", { id: "u1" });
  });

  it("supports zero-argument events", () => {
    const emitter = new TypedEmitter<AppEvents>();
    const listener = vi.fn();
    emitter.on("ready", listener);
    emitter.emit("ready");
    expect(listener).toHaveBeenCalledOnce();
  });

  it("removes a listener through the returned disposer", () => {
    const emitter = new TypedEmitter<AppEvents>();
    const listener = vi.fn();
    const dispose = emitter.on("progress", listener);
    dispose();
    expect(emitter.emit("progress", 50)).toBe(false);
  });

  it("runs a once listener only once", () => {
    const emitter = new TypedEmitter<AppEvents>();
    const listener = vi.fn();
    emitter.once("error", listener);
    emitter.emit("error", new Error("first"), true);
    emitter.emit("error", new Error("second"));
    expect(listener).toHaveBeenCalledOnce();
  });

  it("supports number and unique-symbol event names", () => {
    const emitter = new TypedEmitter<AppEvents>();
    const seen: unknown[] = [];
    emitter.on(404, (path) => seen.push(path));
    emitter.on(shutdownEvent, (code) => seen.push(code));
    emitter.emit(404, "/missing");
    emitter.emit(shutdownEvent, 0);
    expect(seen).toEqual(["/missing", 0]);
  });
});
