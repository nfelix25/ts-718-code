import { describe, expect, it } from "vitest";

import { invokeMethod, invokeStrict, makeCat, makeDog, onAnimal } from "./k-146-bivariance-methods-and-properties.js";

describe("k-146 bivariance methods and properties", () => {
  it("invokes broad strict handlers with narrow values", () => {
    const seen: string[] = [];
    invokeStrict({ handle: (animal) => seen.push(animal.name) }, makeDog("Rex"));
    expect(seen).toEqual(["Rex"]);
  });

  it("permits a narrow method assignment that can fail at runtime", () => {
    const dogOnly = { handle(dog: import("./k-146-bivariance-methods-and-properties.js").Dog) { dog.bark(); } };
    expect(() => invokeMethod(dogOnly, makeCat("Milo"))).toThrow(TypeError);
  });

  it("packages method bivariance into a callback alias", () => {
    const dogOnly = (dog: import("./k-146-bivariance-methods-and-properties.js").Dog) => dog.bark();
    expect(() => onAnimal(dogOnly, makeCat("Milo"))).toThrow(TypeError);
  });

  it("works when the bivariant callback receives its expected subtype", () => {
    expect(() => onAnimal((dog: import("./k-146-bivariance-methods-and-properties.js").Dog) => dog.bark(), makeDog("Rex"))).not.toThrow();
  });

  it("keeps runtime method calls ordinary JavaScript calls", () => {
    const values: string[] = [];
    invokeMethod({ handle(animal) { values.push(animal.kind); } }, makeCat("C"));
    expect(values).toEqual(["cat"]);
  });
});
