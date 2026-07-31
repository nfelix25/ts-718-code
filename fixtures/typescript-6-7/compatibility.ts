function callIt<T>(shape: {
  produce: (value: number) => T;
  consume: (value: T) => void;
}): T {
  const value = shape.produce(21);
  shape.consume(value);
  return value;
}

// TypeScript 6.0 recognizes that these methods do not use `this`, so property
// order no longer prevents `value` from receiving the inferred number type.
const inferred = callIt({
  consume(value) {
    value.toFixed();
  },
  produce(value: number) {
    return value * 2;
  },
});

const escaped: string = RegExp.escape("a+b?");
const instant: Temporal.Instant = Temporal.Instant.from(
  "2026-07-28T00:00:00Z",
);
const upserted: number = new Map<string, number>().getOrInsert("count", 0);
const union: Set<number> = new Set([1]).union(new Set([2]));
const iterated: number[] = Iterator.from([1, 2]).map(value => value * 2).toArray();
const promised: Promise<number> = Promise.try(() => 42);

void [
  inferred,
  escaped,
  instant,
  upserted,
  union,
  iterated,
  promised,
];
