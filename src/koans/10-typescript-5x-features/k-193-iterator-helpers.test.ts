import { describe, expect, it } from "vitest";
import {
  collectNumberLabels,
  duplicateWords,
  firstLongWord,
  lazyNumberLabels,
  mapEntries,
  sumNumbers,
} from "./k-193-iterator-helpers.js";

describe("k-193: iterator helpers", () => {
  it("maps, filters, and limits a lazy pipeline", () => {
    expect(collectNumberLabels([1, 2, 3, 4, 6, 8])).toEqual([
      "0:2",
      "1:4",
      "2:6",
    ]);
  });

  it("does not pull an input until the pipeline is consumed", () => {
    const pulled: number[] = [];
    function* source() {
      for (const value of [1, 2, 3, 4]) {
        pulled.push(value);
        yield value;
      }
    }
    const pipeline = lazyNumberLabels(source());
    expect(pulled).toEqual([]);
    expect(pipeline.next().value).toBe("0:2");
    expect(pulled).toEqual([1, 2]);
  });

  it("runs terminal reduce and find operations", () => {
    expect(sumNumbers([2, 3, 5])).toBe(10);
    expect(firstLongWord(["a", "typescript", "ts"], 5)).toBe("typescript");
  });

  it("flat-maps one input to multiple outputs", () => {
    expect(duplicateWords(["ts", "type"])).toEqual([
      "ts",
      "TS",
      "type",
      "TYPE",
    ]);
  });

  it("uses helpers directly on a Map iterator", () => {
    expect(mapEntries(new Map([["a", 1], ["b", 2]]))).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });
});
