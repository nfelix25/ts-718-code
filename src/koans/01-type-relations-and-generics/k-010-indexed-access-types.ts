import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-010: Indexed access types
 * =============================================================================
 *
 * An indexed access type looks up a value type through a type-level key. `T[K]`
 * does not read a runtime property; it projects the static type associated with
 * every possible key in K. When K is a union, the result is the union of those
 * property types. Optional properties contribute `undefined` because a read may
 * observe absence.
 *
 * I read `T[K]` aloud as:
 *
 *   "the type of a value obtained by indexing a T with any key in K."
 *
 * The key must be admissible for the target type. `T[keyof T]` therefore forms
 * the union of all declared property values. Arrays use `number` to expose their
 * element type; tuples preserve per-position types for literal indexes and form
 * an element union for `Tuple[number]`. Indexed access composes, so nested object
 * and collection projections can be followed one layer at a time.
 */

export function getProperty<T, K extends keyof T>(value: T, key: K): T[K] {
  return value[key];
}

export function pluck<T, K extends keyof T>(
  values: readonly T[],
  key: K,
): Array<T[K]> {
  return values.map((value) => value[key]);
}

export function getTupleElement<
  T extends readonly unknown[],
  K extends keyof T,
>(tuple: T, key: K): T[K] {
  return tuple[key];
}

export function enumerableValues<T extends object>(value: T): Array<T[keyof T]> {
  return Object.values(value) as Array<T[keyof T]>;
}

// Part 1: A literal key selects one declared property type.
interface MainUser {
  id: number;
  name: string;
  active: boolean;
  nickname?: string;
}

type MainId = MainUser["id"];
type MainName = MainUser["name"];
type MainActive = MainUser["active"];
type MainNickname = MainUser["nickname"];
type _Main01 = Expect<Equal<MainId, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainName, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainActive, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainNickname, TODO>>; // TODO(koan) @koan-error

// Part 2: A union of keys projects a union of value types.
type MainIdentity = MainUser["id" | "name"];
type MainFlags = MainUser["active" | "nickname"];
type MainAllValues = MainUser[keyof MainUser];
type MainRequiredValues = MainUser["id" | "name" | "active"];
type _Main05 = Expect<Equal<MainIdentity, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainFlags, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainAllValues, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainRequiredValues, TODO>>; // TODO(koan) @koan-error

// Part 3: Arrays and tuples expose element and position types.
type MainArrayElement = string[][number];
type MainReadonlyArrayElement = (readonly Date[])[number];
type MainTupleFirst = (readonly ["ok", 200, true])[0];
type MainTupleElements = (readonly ["ok", 200, true])[number];
type _Main09 = Expect<Equal<MainArrayElement, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainReadonlyArrayElement, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainTupleFirst, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<MainTupleElements, TODO>>; // TODO(koan) @koan-error

// Part 4: Indexed access composes through nested structures.
type MainApi = {
  user: { profile: { displayName: string; age: number } };
  posts: Array<{ id: string; tags: readonly string[] }>;
};
type MainProfile = MainApi["user"]["profile"];
type MainDisplayName = MainApi["user"]["profile"]["displayName"];
type MainPost = MainApi["posts"][number];
type MainTag = MainApi["posts"][number]["tags"][number];
type _Main13 = Expect<Equal<MainProfile, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainDisplayName, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainPost, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<MainTag, TODO>>; // TODO(koan) @koan-error

// Part 5: Generic key relationships preserve the selected value type.
const mainUser: MainUser = { id: 1, name: "Ada", active: true };
const mainId = getProperty(mainUser, "id");
const mainNickname = getProperty(mainUser, "nickname");
const mainNames = pluck([mainUser], "name");
const mainTupleValue = getTupleElement(["ok", 200] as const, 1);
type _Main17 = Expect<Equal<typeof mainId, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainNickname, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainNames, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainTupleValue, TODO>>; // TODO(koan) @koan-error
