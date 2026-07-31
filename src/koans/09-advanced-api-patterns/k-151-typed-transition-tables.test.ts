import { describe, expect, it } from "vitest";

import { createDoor, transition } from "./k-151-typed-transition-tables.js";

describe("k-151 typed transition tables", () => {
  it("opens and closes through payload-free events", () => {
    const opened = transition(createDoor(), "open");
    const closed = transition(opened, "close");
    expect(closed.state).toBe("closed");
  });

  it("locks and unlocks with typed payloads", () => {
    const locked = transition(createDoor(), "lock", { key: "secret" });
    const unlocked = transition(locked, "unlock", { key: "secret" });
    expect(unlocked.state).toBe("closed");
  });

  it("records each transition", () => {
    expect(transition(createDoor(), "open").history).toEqual(["closed:open:open"]);
  });

  it("rejects assertion-forged illegal events at runtime", () => {
    const event = "unlock" as unknown as "open";
    expect(() => transition(createDoor(), event)).toThrow("illegal");
  });

  it("validates payloads after static checks are bypassed", () => {
    const payload = undefined as unknown as { key: string };
    expect(() => transition(createDoor(), "lock", payload)).toThrow(TypeError);
  });
});
