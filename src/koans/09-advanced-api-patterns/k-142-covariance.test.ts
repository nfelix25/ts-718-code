import { describe, expect, it } from "vitest";

import { animalNames, makeCat, makeDog, mapProducer, widenProducer } from "./k-142-covariance.js";

describe("k-142 covariance", () => {
  it("uses a dog producer where an animal producer is required", () => {
    const animalProducer = widenProducer<
      ReturnType<typeof makeDog>,
      import("./k-142-covariance.js").Animal
    >(() => makeDog("Ada"));
    expect(animalProducer().name).toBe("Ada");
  });

  it("maps producer outputs", () => {
    const name = mapProducer(() => makeDog("Rex"), (dog) => dog.name);
    expect(name()).toBe("Rex");
  });

  it("reads narrower values through a readonly broader collection", () => {
    expect(animalNames([makeDog("D"), makeCat("C")])).toEqual(["D", "C"]);
  });

  it("retains subtype-specific behavior before widening", () => {
    expect(makeDog("Rex").bark()).toBe("Rex: woof");
  });

  it("demonstrates why mutable array covariance is unsound", () => {
    const dogs = [makeDog("D")];
    const animals: import("./k-142-covariance.js").Animal[] = dogs;
    animals.push(makeCat("C"));
    expect(dogs[1]?.kind).toBe("cat");
  });
});
