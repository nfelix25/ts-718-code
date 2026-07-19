import { describe, expect, it } from "vitest";
import {
  duplicateValue,
  handlerKeys,
  renameUser,
  swapCoordinates,
  type EventHandlers,
} from "./k-045-key-remapping.js";

describe("k-045 key remapping", () => {
  it("swaps coordinate destinations", () => {
    expect(swapCoordinates({ x: 1, y: 2 })).toEqual({ x: 2, y: 1 });
  });
  it("renames user fields", () => {
    expect(renameUser({ first: "Ada", last: "Lovelace" })).toEqual({ firstName: "Ada", lastName: "Lovelace" });
  });
  it("duplicates one runtime value under two keys", () => {
    expect(duplicateValue(3)).toEqual({ original: 3, backup: 3 });
  });
  it("enumerates string handler keys", () => {
    type Events = { type: "open"; id: string } | { type: "close"; code: number };
    const handlers: EventHandlers<Events> = { open: () => {}, close: () => {} };
    expect(handlerKeys(handlers)).toEqual(["open", "close"]);
  });
  it("enumerates symbol handler keys", () => {
    const token = Symbol("event");
    const handlers: EventHandlers<{ type: typeof token; value: number }> = { [token]: () => {} };
    expect(handlerKeys(handlers)).toEqual([token]);
  });
});
