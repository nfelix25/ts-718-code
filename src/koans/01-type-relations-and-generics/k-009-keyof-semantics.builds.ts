import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-009: keyof semantics — constructions
 * =============================================================================
 *
 * These constructions build the key domains guaranteed by ordinary objects,
 * index signatures, composites, arrays, tuples, classes, and special types.
 * Separate runtime-key array constructions preserve the packet's warning that
 * static permission is not exact enumerable-property discovery. Replace each
 * `TODO` with a type that satisfies all assertions below.
 */

declare const givenTokenA: unique symbol;
declare const givenTokenB: unique symbol;

class GivenClass {
  static version = 1;
  public visible = true;
  protected guarded = true;
  private hidden = true;
  run(): void {}
}

// ─── Declared and mixed key surfaces ─────────────────────────────────────────

// 1. Construct the union of keys guaranteed by T.
export type KeysOf<T> = TODO; // TODO(koan)

// 2. Decide whether Key belongs to T's static key domain.
export type HasKey<T, Key extends PropertyKey> = TODO; // TODO(koan)

// 3. Classify each property-key category.
export type KeyCategory<Key extends PropertyKey> = TODO; // TODO(koan)

// 4. Keep only string keys from a mixed key surface.
export type StringKeyPart<T> = TODO; // TODO(koan)

// 5. Keep only number keys from a mixed key surface.
export type NumberKeyPart<T> = TODO; // TODO(koan)

// 6. Keep only symbol keys from a mixed key surface.
export type SymbolKeyPart<T> = TODO; // TODO(koan)

// ─── Broad index domains ─────────────────────────────────────────────────────

// 7. Construct the key domain of a string index signature.
export type StringIndexKeys<Value> = TODO; // TODO(koan)

// 8. Construct the key domain of a number index signature.
export type NumberIndexKeys<Value> = TODO; // TODO(koan)

// 9. Construct the key domain of a symbol index signature.
export type SymbolIndexKeys<Value> = TODO; // TODO(koan)

// 10. Combine a number index domain with named properties.
export type NumberIndexWithNamed<
  Value,
  Named extends object,
> = TODO; // TODO(koan)

// 11. Combine a symbol index domain with named properties.
export type SymbolIndexWithNamed<
  Value,
  Named extends object,
> = TODO; // TODO(koan)

// ─── Composite guarantees ────────────────────────────────────────────────────

// 12. Return only keys guaranteed by every member of a union.
export type CommonKeys<Union> = TODO; // TODO(koan)

// 13. Return the combined key surface of simultaneous contracts.
export type CombinedKeys<Left, Right> = TODO; // TODO(koan)

// 14. Distribute keyof to collect keys mentioned by any union member.
export type DistributedKeys<Union> = TODO; // TODO(koan)

// ─── Arrays and tuples ────────────────────────────────────────────────────────

// 15. Return only a tuple's fixed string index keys.
export type TupleOwnIndices<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

// 16. Ask whether a key belongs to an array's API.
export type ArrayKeyCheck<
  Element,
  Key extends PropertyKey,
  ReadonlyView extends boolean,
> = TODO; // TODO(koan)

// 17. Ask whether a key belongs to a particular tuple's API.
export type TupleKeyCheck<
  Tuple extends readonly unknown[],
  Key extends PropertyKey,
> = TODO; // TODO(koan)

// ─── Special, class, callable, and runtime-facing views ───────────────────────

// 18. Construct keyof for special or broad source types.
export type SpecialKeys<T> = TODO; // TODO(koan)

// 19. Construct the asserted typed-enumeration helper result.
export type TypedEnumerableKeyArray<T extends object> = TODO; // TODO(koan)

// 20. Construct the standard Object.keys result type.
export type RuntimeObjectKeyArray<T extends object> = TODO; // TODO(koan)

// 21. Construct Reflect.ownKeys' runtime result type.
export type RuntimeReflectKeyArray<T extends object> = TODO; // TODO(koan)

// 22. Return the public instance key surface of a class-like type.
export type PublicInstanceKeys<Instance> = TODO; // TODO(koan)

// 23. Return the static-side key surface of a constructor-like type.
export type StaticSideKeys<Constructor> = TODO; // TODO(koan)

// 24. Construct the generic own-key type-guard signature.
export type HasOwnGuardSignature = TODO; // TODO(koan)

// 25. Return keys declared by a bare or property-bearing callable type.
export type CallableKeys<Callable> = TODO; // TODO(koan)

// 26. Return the set of key categories present on T.
export type KeyCategoriesOf<T> = TODO; // TODO(koan)

// ─── Assertions ───────────────────────────────────────────────────────────────

type _01a = Expect<Equal<KeysOf<{ id: string }>, "id">>;
type _01b = Expect<
  Equal<KeysOf<{ readonly id: string; name?: string }>, "id" | "name">
>;
type _01c = Expect<
  Equal<KeysOf<{ run(): void; stop: () => void }>, "run" | "stop">
>;
type _01d = Expect<Equal<KeysOf<{}>, never>>;
type _01e = Expect<
  Equal<KeysOf<{ nested: { value: number } }>, "nested">
>;

type _02a = Expect<Equal<HasKey<{ id: string }, "id">, true>>;
type _02b = Expect<Equal<HasKey<{ id?: string }, "id">, true>>;
type _02c = Expect<Equal<HasKey<{ readonly id: string }, "id">, true>>;
type _02d = Expect<Equal<HasKey<{ id: string }, "name">, false>>;
type _02e = Expect<Equal<HasKey<{}, never>, never>>;

type _03a = Expect<Equal<KeyCategory<"name">, "string">>;
type _03b = Expect<Equal<KeyCategory<0>, "number">>;
type _03c = Expect<
  Equal<KeyCategory<typeof givenTokenA>, "symbol">
>;
type _03d = Expect<
  Equal<KeyCategory<"name" | 0 | typeof givenTokenA>, "string" | "number" | "symbol">
>;

type MixedKeys = {
  name: string;
  0: boolean;
  [givenTokenA]: Date;
};

type _04a = Expect<Equal<StringKeyPart<MixedKeys>, "name">>;
type _04b = Expect<
  Equal<StringKeyPart<{ "0": string; camelKey: number }>, "0" | "camelKey">
>;
type _04c = Expect<Equal<StringKeyPart<{}>, never>>;

type _05a = Expect<Equal<NumberKeyPart<MixedKeys>, 0>>;
type _05b = Expect<
  Equal<NumberKeyPart<{ [-1]: string; 1.5: string }>, -1 | 1.5>
>;
type _05c = Expect<Equal<NumberKeyPart<{ "0": string }>, never>>;

type _06a = Expect<
  Equal<SymbolKeyPart<MixedKeys>, typeof givenTokenA>
>;
type _06b = Expect<
  Equal<
    SymbolKeyPart<{ [givenTokenA]: string; [givenTokenB]: number }>,
    typeof givenTokenA | typeof givenTokenB
  >
>;
type _06c = Expect<Equal<SymbolKeyPart<{ name: string }>, never>>;

type _07a = Expect<
  Equal<StringIndexKeys<boolean>, string | number>
>;
type _07b = Expect<
  Equal<StringIndexKeys<unknown>, string | number>
>;
type _07c = Expect<
  Equal<StringIndexKeys<never>, string | number>
>;

type _08a = Expect<Equal<NumberIndexKeys<string>, number>>;
type _08b = Expect<Equal<NumberIndexKeys<unknown>, number>>;
type _08c = Expect<Equal<NumberIndexKeys<never>, number>>;

type _09a = Expect<Equal<SymbolIndexKeys<string>, symbol>>;
type _09b = Expect<Equal<SymbolIndexKeys<unknown>, symbol>>;
type _09c = Expect<Equal<SymbolIndexKeys<never>, symbol>>;

type _10a = Expect<
  Equal<NumberIndexWithNamed<string, { length: number }>, number | "length">
>;
type _10b = Expect<
  Equal<NumberIndexWithNamed<unknown, { 0: string; label: string }>, number | "label">
>;
type _10c = Expect<
  Equal<NumberIndexWithNamed<boolean, {}>, number>
>;

type _11a = Expect<
  Equal<SymbolIndexWithNamed<string, { name: string }>, symbol | "name">
>;
type _11b = Expect<
  Equal<
    SymbolIndexWithNamed<unknown, { [givenTokenA]: true; label: string }>,
    symbol | "label"
  >
>;
type _11c = Expect<
  Equal<SymbolIndexWithNamed<boolean, {}>, symbol>
>;

type Left = { shared: string; left: number; optionalLeft?: true };
type Right = { shared: string; right: boolean; optionalRight?: true };

type _12a = Expect<Equal<CommonKeys<Left | Right>, "shared">>;
type _12b = Expect<
  Equal<
    CommonKeys<{ shared?: string; a: 1 } | { shared: string; b: 2 }>,
    "shared"
  >
>;
type _12c = Expect<Equal<CommonKeys<{ a: 1 } | {}>, never>>;
type _12d = Expect<
  Equal<CommonKeys<{ [key: string]: unknown } | { fixed: true }>, "fixed">
>;
type _12e = Expect<Equal<CommonKeys<{ a: 1 } | never>, "a">>;

type _13a = Expect<
  Equal<
    CombinedKeys<Left, Right>,
    "shared" | "left" | "right" | "optionalLeft" | "optionalRight"
  >
>;
type _13b = Expect<
  Equal<CombinedKeys<{ a: 1 }, { a: 2; b: 3 }>, "a" | "b">
>;
type _13c = Expect<
  Equal<
    CombinedKeys<{ [key: string]: unknown }, { fixed: true }>,
    string | number
  >
>;
type _13d = Expect<Equal<CombinedKeys<{ a: 1 }, unknown>, "a">>;
type _13e = Expect<
  Equal<CombinedKeys<{ a: 1 }, never>, string | number | symbol>
>;

type _14a = Expect<
  Equal<
    DistributedKeys<Left | Right>,
    "shared" | "left" | "right" | "optionalLeft" | "optionalRight"
  >
>;
type _14b = Expect<
  Equal<DistributedKeys<{ a: 1 } | { b: 2 }>, "a" | "b">
>;
type _14c = Expect<Equal<DistributedKeys<never>, never>>;
type _14d = Expect<
  Equal<DistributedKeys<{ [key: number]: unknown } | { named: true }>, number | "named">
>;

type _15a = Expect<
  Equal<TupleOwnIndices<readonly ["a", "b"]>, "0" | "1">
>;
type _15b = Expect<
  Equal<TupleOwnIndices<readonly [1, 2, 3]>, "0" | "1" | "2">
>;
type _15c = Expect<Equal<TupleOwnIndices<readonly []>, never>>;
type _15d = Expect<
  Equal<TupleOwnIndices<readonly [head: string, tail?: number]>, "0" | "1">
>;

type _16a = Expect<Equal<ArrayKeyCheck<string, number, false>, true>>;
type _16b = Expect<Equal<ArrayKeyCheck<string, "push", false>, true>>;
type _16c = Expect<Equal<ArrayKeyCheck<string, "push", true>, false>>;
type _16d = Expect<Equal<ArrayKeyCheck<string, "length", true>, true>>;
type _16e = Expect<
  Equal<ArrayKeyCheck<string, typeof Symbol.iterator, false>, true>
>;

type _17a = Expect<
  Equal<TupleKeyCheck<readonly [string, number], "0">, true>
>;
type _17b = Expect<
  Equal<TupleKeyCheck<readonly [string, number], 0>, true>
>;
type _17c = Expect<
  Equal<TupleKeyCheck<readonly [string, number], 2>, true>
>; // Broad numeric tuple indexing admits numeric keys.
type _17d = Expect<
  Equal<TupleKeyCheck<readonly [string, number], "2">, false>
>;
type _17e = Expect<
  Equal<TupleKeyCheck<readonly [], "length">, true>
>;

type _18a = Expect<
  Equal<SpecialKeys<any>, string | number | symbol>
>;
type _18b = Expect<Equal<SpecialKeys<unknown>, never>>;
type _18c = Expect<
  Equal<SpecialKeys<never>, string | number | symbol>
>;
type _18d = Expect<Equal<SpecialKeys<{}>, never>>;
type _18e = Expect<Equal<SpecialKeys<object>, never>>;

type _19a = Expect<
  Equal<TypedEnumerableKeyArray<{ id: string; active: boolean }>, ("id" | "active")[]>
>;
type _19b = Expect<
  Equal<
    TypedEnumerableKeyArray<{ visible: number; [givenTokenA]: number }>,
    ("visible" | typeof givenTokenA)[]
  >
>;
type _19c = Expect<Equal<TypedEnumerableKeyArray<{}>, never[]>>;

type _20a = Expect<
  Equal<RuntimeObjectKeyArray<{ id: string }>, string[]>
>;
type _20b = Expect<
  Equal<RuntimeObjectKeyArray<{ 0: string; [givenTokenA]: number }>, string[]>
>;
type _20c = Expect<Equal<RuntimeObjectKeyArray<{}>, string[]>>;

type _21a = Expect<
  Equal<RuntimeReflectKeyArray<{ id: string }>, (string | symbol)[]>
>;
type _21b = Expect<
  Equal<
    RuntimeReflectKeyArray<{ [givenTokenA]: number }>,
    (string | symbol)[]
  >
>;
type _21c = Expect<
  Equal<RuntimeReflectKeyArray<{}>, (string | symbol)[]>
>;

type _22a = Expect<
  Equal<PublicInstanceKeys<GivenClass>, "visible" | "run">
>;
type _22b = Expect<
  Equal<PublicInstanceKeys<{ readonly id: string; method(): void }>, "id" | "method">
>;
type _22c = Expect<Equal<PublicInstanceKeys<{}>, never>>;

type _23a = Expect<
  Equal<StaticSideKeys<typeof GivenClass>, "prototype" | "version">
>;
type _23b = Expect<
  Equal<StaticSideKeys<{ new (): {}; label: string }>, "label">
>;
type _23c = Expect<Equal<StaticSideKeys<{}>, never>>;

type _24a = Expect<
  Equal<
    HasOwnGuardSignature,
    <T extends object>(
      value: T,
      key: PropertyKey,
    ) => key is keyof T
  >
>;
type _24b = Expect<
  Equal<ReturnType<HasOwnGuardSignature>, boolean>
>;

type _25a = Expect<Equal<CallableKeys<() => void>, never>>;
type _25b = Expect<
  Equal<CallableKeys<(() => void) & { label: string }>, "label">
>;
type _25c = Expect<
  Equal<CallableKeys<{ (): number; readonly id: "fn" }>, "id">
>;

type _26a = Expect<
  Equal<KeyCategoriesOf<{ name: string; 0: boolean; [givenTokenA]: Date }>, "string" | "number" | "symbol">
>;
type _26b = Expect<
  Equal<KeyCategoriesOf<{ [key: string]: unknown }>, "string" | "number">
>;
type _26c = Expect<
  Equal<KeyCategoriesOf<{ [key: symbol]: unknown }>, "symbol">
>;
type _26d = Expect<Equal<KeyCategoriesOf<{}>, never>>;
