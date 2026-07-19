import { describe, expect, it } from "vitest";

import { makeCell, makeDog, modify, roundTrip } from "./k-144-invariance.js";

describe("k-144 invariance", () => {
  it("reads and writes the same cell domain", () => {
    const cell = makeCell(makeDog("Ada"));
    expect(cell.get().name).toBe("Ada");
    cell.set(makeDog("Rex"));
    expect(cell.get().name).toBe("Rex");
  });

  it("modifies through an endomorphism", () => {
    const cell = makeCell(2);
    expect(modify(cell, (value) => value + 3)).toBe(5);
    expect(cell.get()).toBe(5);
  });

  it("round-trips one codec domain", () => {
    const numberCodec = { encode: String, decode: Number };
    expect(roundTrip(numberCodec, 42)).toBe(42);
  });

  it("keeps independent cells isolated", () => {
    const left = makeCell("left");
    const right = makeCell("right");
    left.set("changed");
    expect(right.get()).toBe("right");
  });

  it("returns the transformed value and stores it", () => {
    const cell = makeCell("a");
    expect(modify(cell, (value) => value + "b")).toBe("ab");
    expect(cell.get()).toBe("ab");
  });
});
