import { describe, expect, it } from "vitest";

import {
  type EventRecord,
  prefixEvent,
  prependEventContext,
  renameEvent,
  type SourceEvents,
  toEnvelope,
} from "./k-153-event-map-transformations.js";

describe("k-153 event-map transformations", () => {
  it("prefixes a string event while preserving its arguments", () => {
    const event = prefixEvent("ui", { name: "message", args: ["hi", { id: "u1" }] } as const);
    expect(event).toEqual({ name: "ui:message", args: ["hi", { id: "u1" }] });
  });

  it("renames to another property-key kind", () => {
    const eventName = Symbol("renamed");
    const event = renameEvent({ name: "ready", args: [] } as const, eventName);
    expect(event.name).toBe(eventName);
  });

  it("prepends shared context without disturbing existing arguments", () => {
    const event = prependEventContext(
      { requestId: "r1" },
      { name: "progress", args: [75] } as const,
    );
    expect(event.args).toEqual([{ requestId: "r1" }, 75]);
  });

  it("creates a timestamped correlated envelope", () => {
    const record: EventRecord<SourceEvents> = {
      name: "message",
      args: ["hello", { id: "u1" }],
    };
    expect(toEnvelope(record, 123)).toEqual({
      type: "message",
      args: ["hello", { id: "u1" }],
      timestamp: 123,
    });
  });

  it("preserves optional event arguments exactly as supplied", () => {
    const event = prependEventContext(
      "request-1",
      { name: "error", args: [new Error("no")] } as const,
    );
    expect(event.args).toHaveLength(2);
    expect(event.args[1]).toBeInstanceOf(Error);
  });
});
