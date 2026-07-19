import { describe, expect, it } from "vitest";

import { Box, User, construct } from "./k-126-constructor-utility-types.js";

describe("k-126 constructor utility types", () => {
  it("constructs a class from its parameter tuple", () => {
    const user = construct(User, "u1", false);
    expect(user).toBeInstanceOf(User);
    expect(user).toMatchObject({ id: "u1", active: false });
  });

  it("forwards omitted optional constructor arguments", () => {
    expect(construct(User, "u1").active).toBe(true);
  });

  it("preserves generic instance values through concrete inference", () => {
    const box = construct(Box, { id: 1 });
    expect(box.value).toEqual({ id: 1 });
  });

  it("supports built-in constructors", () => {
    const date = construct(Date, 0);
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toBe(0);
  });

  it("supports anonymous constructor values", () => {
    class Point { constructor(public x: number, public y: number) {} }
    expect(construct(Point, 2, 3)).toMatchObject({ x: 2, y: 3 });
  });
});
