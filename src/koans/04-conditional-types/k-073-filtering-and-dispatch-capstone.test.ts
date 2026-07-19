import { describe, expect, it, vi } from "vitest";

import {
  createDispatcher,
  dispatchAppEvent,
} from "./k-073-filtering-and-dispatch-capstone.js";

describe("k-073 filtering and dispatch capstone", () => {
  it("dispatches a payload event and returns its correlated result", () => {
    expect(dispatchAppEvent("user.created", { id: 1, name: "Ada" })).toEqual({ accepted: true });
  });

  it("dispatches another payload shape independently", () => {
    expect(dispatchAppEvent("user.deleted", { id: 7 })).toBe(true);
    expect(dispatchAppEvent("user.deleted", { id: 0 })).toBe(false);
  });

  it("dispatches a payloadless event", () => {
    expect(dispatchAppEvent("ping")).toBe("pong");
  });

  it("passes the exact payload object to its selected handler", () => {
    type Event = { type: "seen"; payload: { id: number }; result: number };
    const seen = vi.fn((payload: { id: number }) => payload.id);
    const dispatch = createDispatcher<Event>({ seen });
    const payload = { id: 42 };

    expect(dispatch("seen", payload)).toBe(42);
    expect(seen).toHaveBeenCalledWith(payload);
  });

  it("supports void-returning event handlers", () => {
    expect(dispatchAppEvent("audit.logged", { message: "ready", level: "info" })).toBeUndefined();
  });
});
