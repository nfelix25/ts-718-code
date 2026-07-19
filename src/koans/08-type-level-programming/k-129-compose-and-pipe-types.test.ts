import { describe, expect, it } from "vitest";

import { composeFrom, pipeFrom } from "./k-129-compose-and-pipe-types.js";

describe("k-129 compose and pipe types", () => {
  it("pipes left to right", () => {
    const transform = pipeFrom<string>()(
      (text) => Number(text),
      (value) => value * 2,
      (value) => `result:${value}`,
    );
    expect(transform("21")).toBe("result:42");
  });

  it("composes right to left", () => {
    const transform = composeFrom<string>()(
      (value: number) => `result:${value}`,
      (value: number) => value * 2,
      (text) => Number(text),
    );
    expect(transform("21")).toBe("result:42");
  });

  it("uses an empty pipe as runtime identity", () => {
    const value = { id: 1 };
    expect(pipeFrom<typeof value>()()(value)).toBe(value);
  });

  it("forwards structured intermediate values", () => {
    const transform = pipeFrom<number>()(
      (id) => ({ id, active: true }),
      (user) => user.active ? user.id : 0,
    );
    expect(transform(7)).toBe(7);
  });

  it("propagates thrown errors", () => {
    const transform = pipeFrom<string>()(
      (value) => { if (value === "bad") throw new Error("invalid"); return value; },
      (value) => value.length,
    );
    expect(() => transform("bad")).toThrow("invalid");
  });
});
