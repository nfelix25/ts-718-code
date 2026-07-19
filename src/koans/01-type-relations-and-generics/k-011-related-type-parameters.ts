import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-011: Related type parameters
 * =============================================================================
 *
 * Multiple type parameters become useful when one is constrained in terms of
 * another. `<T, K extends keyof T>` says that T is chosen first and K may then
 * range only over keys guaranteed by T. `T[K]` completes the relationship by
 * making a value position depend on the selected key.
 *
 * I read `<T, K extends keyof T>(value: T, key: K): T[K]` aloud as:
 *
 *   "Choose an object type T, choose one of T's keys K, and return the value
 *    type belonging to that exact key."
 *
 * Each literal key can therefore produce a different return or callback input.
 * A union key produces a union value, which is accurate for reads but can lose
 * the pairing needed for safe writes. Relations can extend across several keys,
 * mapped results, and a separately inferred output type. Parameter order records
 * a dependency for the checker; it does not impose runtime evaluation order.
 */

export function select<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

export function selectPair<
  T,
  Left extends keyof T,
  Right extends keyof T,
>(value: T, left: Left, right: Right): [T[Left], T[Right]] {
  return [value[left], value[right]];
}

export function transformSelected<T, K extends keyof T, Result>(
  value: T,
  key: K,
  transform: (selected: T[K]) => Result,
): Result {
  return transform(value[key]);
}

export function selectMany<T, K extends keyof T>(
  value: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) result[key] = value[key];
  return result;
}

export function assignSelected<T, K extends keyof T>(
  value: T,
  key: K,
  next: T[K],
): void {
  value[key] = next;
}

// Part 1: A selected literal key determines the result.
const mainRecord = { id: 1, name: "Ada", active: true };
const mainId = select(mainRecord, "id");
const mainName = select(mainRecord, "name");
const mainActive = select(mainRecord, "active");
const mainKey: "id" | "name" = Math.random() ? "id" : "name";
const mainEither = select(mainRecord, mainKey);
type _Main01 = Expect<Equal<typeof mainId, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainName, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainActive, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainEither, TODO>>; // TODO(koan) @koan-error

// Part 2: Two related keys retain their positional value types.
const mainIdName = selectPair(mainRecord, "id", "name");
const mainNameActive = selectPair(mainRecord, "name", "active");
const mainSameKey = selectPair(mainRecord, "id", "id");
const mainUnionPair = selectPair(mainRecord, mainKey, "active");
type _Main05 = Expect<Equal<typeof mainIdName, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainNameActive, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainSameKey, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainUnionPair, TODO>>; // TODO(koan) @koan-error

// Part 3: The callback input follows K while Result is inferred independently.
const mainIdText = transformSelected(mainRecord, "id", (id) => id.toFixed(2));
const mainNameLength = transformSelected(mainRecord, "name", (name) => name.length);
const mainNegated = transformSelected(mainRecord, "active", (active) => !active);
const mainObjectResult = transformSelected(mainRecord, "id", (id) => ({ id }));
type _Main09 = Expect<Equal<typeof mainIdText, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainNameLength, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainNegated, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainObjectResult, TODO>>; // TODO(koan) @koan-error

// Part 4: An array of related keys determines a Pick result.
const mainOnlyId = selectMany(mainRecord, ["id"]);
const mainIdentity = selectMany(mainRecord, ["id", "name"]);
const mainFlags = selectMany(mainRecord, ["active"] as const);
const mainAll = selectMany(mainRecord, ["id", "name", "active"] as const);
type _Main13 = Expect<Equal<typeof mainOnlyId, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainIdentity, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainFlags, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainAll, TODO>>; // TODO(koan) @koan-error

// Part 5: The same relation checks value types for writes.
const mainMutable = { id: 1, name: "Ada", active: true };
assignSelected(mainMutable, "id", 2);
assignSelected(mainMutable, "name", "Grace");
assignSelected(mainMutable, "active", false);
const mainAfterWrite = mainMutable;
type _Main17 = Expect<Equal<typeof mainMutable.id, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainMutable.name, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainMutable.active, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainAfterWrite, TODO>>; // TODO(koan) @koan-error
