import { describe, expect, it, vi } from "vitest";

import { createModelEmitter } from "./k-084-type-safe-event-names.js";

type Model = { name: string; age: number; active?: boolean };

describe("k-084 type-safe event names", () => {
  it("emits a correlated string payload", () => {
    const emitter = createModelEmitter<Model>();
    const listener = vi.fn<(value: string) => void>();
    emitter.on("nameChanged", listener);
    emitter.emit("nameChanged", "Ada");
    expect(listener).toHaveBeenCalledWith("Ada");
  });

  it("keeps numeric payloads on their own event", () => {
    const emitter = createModelEmitter<Model>();
    const listener = vi.fn<(value: number) => void>();
    emitter.on("ageChanged", listener);
    emitter.emit("ageChanged", 37);
    expect(listener).toHaveBeenCalledWith(37);
  });

  it("allows optional-property events to carry undefined", () => {
    const emitter = createModelEmitter<Model>();
    const listener = vi.fn<(value: boolean | undefined) => void>();
    emitter.on("activeChanged", listener);
    emitter.emit("activeChanged", undefined);
    expect(listener).toHaveBeenCalledWith(undefined);
  });

  it("notifies multiple listeners", () => {
    const emitter = createModelEmitter<Model>();
    const first = vi.fn();
    const second = vi.fn();
    emitter.on("nameChanged", first);
    emitter.on("nameChanged", second);
    emitter.emit("nameChanged", "Grace");
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });

  it("unsubscribes one listener", () => {
    const emitter = createModelEmitter<Model>();
    const listener = vi.fn();
    const unsubscribe = emitter.on("ageChanged", listener);
    unsubscribe();
    emitter.emit("ageChanged", 1);
    expect(listener).not.toHaveBeenCalled();
  });
});
