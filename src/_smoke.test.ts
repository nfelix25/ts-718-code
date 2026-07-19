import { describe, expect, it } from "vitest";

import type { Equal, Expect } from "./utils/type-utils.js";

export function add(left: number, right: number): number {
  return left + right;
}

describe("project wiring", () => {
  it("runs TypeScript runtime tests through Vitest", () => {
    expect(add(20, 22)).toBe(42);
  });
});

type _SmokeTypeAssertion = Expect<Equal<ReturnType<typeof add>, number>>;
