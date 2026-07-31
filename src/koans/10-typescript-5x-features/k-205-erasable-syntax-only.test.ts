import { describe, expect, it } from "vitest";
import {
  Direction,
  Point,
  classifyErasability,
  erasabilityCases,
} from "./k-205-erasable-syntax-only.js";

describe("k-205: erasable syntax only", () => {
  it("classifies type-only syntax as erasable", () => {
    expect(classifyErasability("type-annotation")).toBe("erasable");
    expect(classifyErasability("type-only-import")).toBe("erasable");
  });

  it("classifies runtime TypeScript constructs as transforms", () => {
    expect(classifyErasability("enum")).toBe("requires-transform");
    expect(classifyErasability("runtime-namespace")).toBe(
      "requires-transform",
    );
  });

  it("uses a const object as an enum replacement", () => {
    expect(Direction).toEqual({
      Up: "up",
      Down: "down",
      Left: "left",
      Right: "right",
    });
  });

  it("uses explicit fields instead of parameter properties", () => {
    expect(new Point(2, 3)).toEqual({ x: 2, y: 3 });
  });

  it("keeps the diagnostic case matrix consistent", () => {
    expect(
      erasabilityCases.map(({ syntax }) => classifyErasability(syntax)),
    ).toEqual(erasabilityCases.map(({ check }) => check));
  });
});
