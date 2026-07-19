import { describe, expect, it } from "vitest";
import {
  callbacksFor,
  lastWithForEach,
  makeFormatter,
  makeLastAssignmentReader,
  makePropertyReader,
} from "./k-037-closures-callbacks-and-invalidation.js";

describe("k-037 closures callbacks and invalidation", () => {
  it("captures stable parameter narrowings", () => {
    expect(makeFormatter("go")()).toBe("GO");
    expect(makeFormatter(12)()).toBe("12");
  });
  it("preserves narrowing after a last assignment", () => {
    expect(makeLastAssignmentReader(1)()).toBe("FIXED");
  });
  it("captures a const property snapshot", () => {
    const box = { value: "saved" as string | number };
    const read = makePropertyReader(box);
    box.value = 1;
    expect(read()).toBe("SAVED");
  });
  it("allows callbacks to execute zero times", () => {
    expect(lastWithForEach([])).toBeUndefined();
    expect(lastWithForEach(["a", "b"])).toBe("b");
  });
  it("creates one narrowed closure per loop iteration", () => {
    expect(callbacksFor(["a", 2]).map(callback => callback())).toEqual(["A", "2"]);
  });
});
