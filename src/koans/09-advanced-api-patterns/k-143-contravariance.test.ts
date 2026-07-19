import { describe, expect, it } from "vitest";

import { contramap, dispatchDog, filterWith, makeDog } from "./k-143-contravariance.js";

describe("k-143 contravariance", () => {
  it("uses an Animal consumer where only Dogs will be dispatched", () => {
    const names: string[] = [];
    dispatchDog((animal: import("./k-143-contravariance.js").Animal) => names.push(animal.name), makeDog("Rex"));
    expect(names).toEqual(["Rex"]);
  });

  it("projects wider inputs before consuming narrower data", () => {
    const lengths: number[] = [];
    const consumeObject = contramap((value: string) => lengths.push(value.length), (value: { name: string }) => value.name);
    consumeObject({ name: "Ada" });
    expect(lengths).toEqual([3]);
  });

  it("passes broader predicates to narrower collections", () => {
    const dogs = [makeDog("Ada"), makeDog("")];
    expect(filterWith(dogs, (animal: import("./k-143-contravariance.js").Animal) => animal.name.length > 0)).toHaveLength(1);
  });

  it("does not require subtype-specific behavior in a broad consumer", () => {
    const values: string[] = [];
    dispatchDog((animal) => values.push(animal.kind), makeDog("D"));
    expect(values).toEqual(["dog"]);
  });

  it("invokes the supplied consumer exactly once", () => {
    let calls = 0;
    dispatchDog(() => { calls += 1; }, makeDog("D"));
    expect(calls).toBe(1);
  });
});
