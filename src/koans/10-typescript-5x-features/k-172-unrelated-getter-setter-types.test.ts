import { describe, expect, it } from "vitest";

import {
  NumberSlot,
  ParsedDateSlot,
  ParsedStyleRule,
  writeDate,
  writeNumberSlot,
  writeStyle,
} from "./k-172-unrelated-getter-setter-types.js";

describe("k-172 unrelated getter and setter types", () => {
  it("accepts string or number writes and returns number or undefined", () => {
    const slot = new NumberSlot();
    expect(slot.value).toBeUndefined();
    writeNumberSlot(slot, "42");
    expect(slot.value).toBe(42);
    writeNumberSlot(slot, 7);
    expect(slot.value).toBe(7);
  });

  it("validates at the write boundary", () => {
    const slot = new NumberSlot();
    expect(() => writeNumberSlot(slot, "not-a-number")).toThrow(
      "value must be numeric",
    );
    expect(slot.value).toBeUndefined();
  });

  it("writes CSS text and reads a structured declaration", () => {
    const rule = new ParsedStyleRule();
    writeStyle(rule, "color: red; display: grid");
    expect(rule.style).toEqual({
      cssText: "color: red; display: grid",
      declarations: { color: "red", display: "grid" },
    });
  });

  it("writes date text and reads Date or null", () => {
    const slot = new ParsedDateSlot();
    writeDate(slot, "2026-07-28T00:00:00.000Z");
    expect(slot.date).toBeInstanceOf(Date);
    expect(slot.date?.toISOString()).toBe("2026-07-28T00:00:00.000Z");
    writeDate(slot, "invalid");
    expect(slot.date).toBeNull();
  });

  it("keeps assignment behavior on the accessor rather than the snapshot", () => {
    const rule = new ParsedStyleRule();
    rule.style = "gap: 8px";
    const snapshot = { style: rule.style };
    expect(snapshot.style.declarations).toEqual({ gap: "8px" });
    snapshot.style = { cssText: "plain", declarations: {} };
    expect(snapshot.style.cssText).toBe("plain");
  });
});
