import { describe, expect, it } from "vitest";

import {
  lowerStart,
  quiet,
  screaming,
  titleStart,
} from "./k-076-intrinsic-string-casing.js";

describe("k-076 intrinsic string casing", () => {
  it("uppercases the whole string", () => {
    expect(screaming("Type-Script 7")).toBe("TYPE-SCRIPT 7");
  });

  it("lowercases the whole string", () => {
    expect(quiet("Type-Script 7")).toBe("type-script 7");
  });

  it("changes only the first character for title start", () => {
    expect(titleStart("tYPEscript")).toBe("TYPEscript");
  });

  it("changes only the first character for lower start", () => {
    expect(lowerStart("TYPEScript")).toBe("tYPEScript");
  });

  it("handles empty and expanding Unicode strings like JavaScript casing", () => {
    expect(titleStart("")).toBe("");
    expect(screaming("straße")).toBe("STRASSE");
  });
});
