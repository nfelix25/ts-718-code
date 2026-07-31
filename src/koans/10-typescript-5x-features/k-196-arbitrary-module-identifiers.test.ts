import { describe, expect, it } from "vitest";
import {
  "01" as firstOrdinal,
  "build-version" as buildVersion,
  "wasm:add" as wasmAdd,
  readBoundaryValue,
  renderArbitraryImport,
} from "./k-196-arbitrary-module-identifiers.js";

describe("k-196: arbitrary module identifiers", () => {
  it("aliases a punctuation-bearing export to a legal local name", () => {
    expect(wasmAdd(2, 3)).toBe(5);
  });

  it("imports a hyphenated external name", () => {
    expect(buildVersion).toBe("7.0");
  });

  it("imports a numeric-looking external name", () => {
    expect(firstOrdinal).toBe(1);
  });

  it("looks up exact boundary names", () => {
    expect(readBoundaryValue("build-version")).toBe("7.0");
    expect(readBoundaryValue("01")).toBe(1);
  });

  it("renders quoted-name import syntax", () => {
    expect(renderArbitraryImport("wasm:add", "add", "./math.js")).toBe(
      'import { "wasm:add" as add } from "./math.js";',
    );
  });
});
