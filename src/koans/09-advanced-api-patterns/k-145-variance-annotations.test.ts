import { describe, expect, it } from "vitest";

import { makeChannel, makeSink, makeSource, transfer } from "./k-145-variance-annotations.js";

describe("k-145 variance annotations", () => {
  it("transfers a produced value into a consumer", () => {
    const values: number[] = [];
    transfer(makeSource(3), makeSink((value: number) => values.push(value)));
    expect(values).toEqual([3]);
  });

  it("lets a broad sink consume a narrow source", () => {
    const names: string[] = [];
    const source = makeSource({ kind: "dog" as const, name: "Rex", bark: () => "woof" });
    const sink = makeSink((animal: import("./k-145-variance-annotations.js").Animal) => names.push(animal.name));
    transfer(source, sink);
    expect(names).toEqual(["Rex"]);
  });

  it("reads and writes one invariant channel domain", () => {
    const channel = makeChannel(1);
    channel.put(2);
    expect(channel.get()).toBe(2);
  });

  it("creates stable sources", () => {
    const source = makeSource("value");
    expect([source.get(), source.get()]).toEqual(["value", "value"]);
  });

  it("invokes a sink for every explicit put", () => {
    let count = 0;
    const sink = makeSink(() => { count += 1; });
    sink.put("a");
    sink.put("b");
    expect(count).toBe(2);
  });
});
