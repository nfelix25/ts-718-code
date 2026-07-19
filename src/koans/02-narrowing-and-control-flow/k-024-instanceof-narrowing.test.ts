import { describe, expect, it } from "vitest";
import {
  Cat,
  Circle,
  Dog,
  Rectangle,
  animalSound,
  errorMessage,
  formatDateOrText,
  isRealCircle,
  shapeArea,
} from "./k-024-instanceof-narrowing.js";

describe("k-024 instanceof narrowing", () => {
  it("uses Date behavior only for Date instances", () => {
    expect(formatDateOrText(new Date(0))).toBe("1970-01-01T00:00:00.000Z");
    expect(formatDateOrText("ts")).toBe("TS");
  });

  it("reads Error instance messages", () => {
    expect(errorMessage(new Error("failed"))).toBe("failed");
    expect(errorMessage("plain")).toBe("plain");
  });

  it("narrows user-defined shape instances", () => {
    expect(shapeArea(new Circle(2))).toBeCloseTo(Math.PI * 4);
    expect(shapeArea(new Rectangle(2, 3))).toBe(6);
  });

  it("retains subclass behavior", () => {
    expect(animalSound(new Dog("Ada"))).toBe("woof");
    expect(animalSound(new Cat("Lin"))).toBe("meow");
  });

  it("distinguishes structural lookalikes from real instances", () => {
    const lookalike: Circle = { kind: "circle", radius: 2, area: () => 4 };
    expect(isRealCircle(new Circle(2))).toBe(true);
    expect(isRealCircle(lookalike)).toBe(false);
  });
});
