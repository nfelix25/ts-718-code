import { describe, expect, it } from "vitest";

import {
  addAnimal,
  assumeString,
  firstDeclared,
  makeCat,
  makeDog,
  parseTrusted,
  replaceAnimal,
  unsafeUppercaseAuthor,
} from "./k-147-deliberate-soundness-holes.js";

describe("k-147 deliberate soundness holes", () => {
  it("pollutes a covariantly widened mutable array", () => {
    const dogs = [makeDog("Rex")];
    addAnimal(dogs, makeCat("Milo"));
    expect(dogs[1]?.kind).toBe("cat");
  });

  it("replaces a covariantly widened writable property", () => {
    const dogBox = { value: makeDog("Rex") };
    replaceAnimal(dogBox, makeCat("Milo"));
    expect(dogBox.value.kind).toBe("cat");
  });

  it("shows refinement invalidation across a mutating call", () => {
    expect(() => unsafeUppercaseAuthor({ title: "Koan", author: "Ada" })).toThrow(TypeError);
  });

  it("shows that an assertion adds no runtime conversion", () => {
    expect(() => assumeString(42).toUpperCase()).toThrow(TypeError);
  });

  it("shows non-null and generic parse assertions can lie", () => {
    expect(firstDeclared([])).toBeUndefined();
    expect(parseTrusted<{ id: number }>('{"name":"Ada"}')).toEqual({ name: "Ada" });
  });
});
