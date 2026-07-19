import { describe, expect, it } from "vitest";
import {
  clearTheme,
  hasTheme,
  mergePreferences,
  ownKeys,
  themeOrDefault,
} from "./k-043-optionality-and-exact-optional-properties.js";

describe("k-043 optionality and exact optional properties", () => {
  it("distinguishes missing from present keys", () => {
    expect(hasTheme({ retries: 1 })).toBe(false);
    expect(hasTheme({ theme: "dark", retries: 1 })).toBe(true);
  });
  it("defaults an absent optional read", () => {
    expect(themeOrDefault({ retries: 1 })).toBe("light");
    expect(themeOrDefault({ theme: "dark", retries: 1 })).toBe("dark");
  });
  it("spreads partial updates over required defaults", () => {
    expect(mergePreferences(
      { theme: "light", label: undefined, retries: 1 },
      { theme: "dark" },
    )).toEqual({ theme: "dark", label: undefined, retries: 1 });
  });
  it("deletes an optional property", () => {
    expect(clearTheme({ theme: "dark", retries: 1 })).toEqual({ retries: 1 });
  });
  it("enumerates present-undefined but not absent properties", () => {
    expect(ownKeys({ label: undefined, retries: 1 })).toEqual(["label", "retries"]);
    expect(ownKeys({ retries: 1 })).toEqual(["retries"]);
  });
});
