import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-040: mapped types and PropertyKey — constructions
 * =============================================================================
 *
 * These constructions iterate over finite, object-derived, mixed, and broad
 * property-key domains. They build constant and key-dependent values, preserve
 * homomorphic modifiers, compare numeric and symbol domains, and classify the
 * syntax boundaries of mapped declarations. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

declare const givenTokenA: unique symbol;
declare const givenTokenB: unique symbol;

type GivenUser = {
  readonly id: number;
  name: string;
  active?: boolean;
};

type GivenConfig = {
  host: string;
  port: number;
};

type GivenKeyKind<Key extends PropertyKey> =
  Key extends string ? "string" : Key extends number ? "number" : "symbol";

// ─── Finite and object-derived mapped types ────────────────────────────────

// 1. Emit one required property with the same value for every finite key.
export type FiniteDictionary<
  Keys extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<FiniteDictionary<"id" | "name", string>, { id: string; name: string }>
>;
type _01b = Expect<
  Equal<FiniteDictionary<0 | 1, number>, { 0: number; 1: number }>
>;
type _01c = Expect<
  Equal<
    FiniteDictionary<typeof givenTokenA | typeof givenTokenB, boolean>,
    { [givenTokenA]: boolean; [givenTokenB]: boolean }
  >
>;
type _01d = Expect<Equal<FiniteDictionary<never, string>, {}>>;

// 2. Emit each key itself as that property's value.
export type KeyDependentRecord<Keys extends PropertyKey> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<KeyDependentRecord<"a" | "b">, { a: "a"; b: "b" }>
>;
type _02b = Expect<
  Equal<KeyDependentRecord<1 | 2>, { 1: 1; 2: 2 }>
>;
type _02c = Expect<
  Equal<
    KeyDependentRecord<typeof givenTokenA>,
    { [givenTokenA]: typeof givenTokenA }
  >
>;
type _02d = Expect<Equal<KeyDependentRecord<never>, {}>>;

// 3. Make every emitted value depend on the current key's PropertyKey family.
export type KeyKindRecord<Keys extends PropertyKey> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    KeyKindRecord<"a" | 1>,
    { a: [key: "a", kind: "string"]; 1: [key: 1, kind: "number"] }
  >
>;
type _03b = Expect<
  Equal<
    KeyKindRecord<typeof givenTokenA>,
    { [givenTokenA]: [key: typeof givenTokenA, kind: "symbol"] }
  >
>;
type _03c = Expect<
  Equal<
    KeyKindRecord<"name" | 0 | typeof givenTokenA>,
    {
      name: [key: "name", kind: "string"];
      0: [key: 0, kind: "number"];
      [givenTokenA]: [key: typeof givenTokenA, kind: "symbol"];
    }
  >
>;
type _03d = Expect<Equal<KeyKindRecord<never>, {}>>;

// 4. Replace every source value with boolean while preserving source modifiers.
export type PropertyFlags<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    PropertyFlags<GivenUser>,
    { readonly id: boolean; name: boolean; active?: boolean }
  >
>;
type _04b = Expect<
  Equal<PropertyFlags<GivenConfig>, { host: boolean; port: boolean }>
>;
type _04c = Expect<Equal<PropertyFlags<{}>, {}>>;
type _04d = Expect<
  Equal<PropertyFlags<{ readonly 0: string }>, { readonly 0: boolean }>
>;

// 5. Replace every source value with string while preserving source modifiers.
export type StringProperties<Source> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    StringProperties<GivenUser>,
    { readonly id: string; name: string; active?: string }
  >
>;
type _05b = Expect<
  Equal<StringProperties<GivenConfig>, { host: string; port: string }>
>;
type _05c = Expect<
  Equal<
    StringProperties<{ readonly value?: number }>,
    { readonly value?: string }
  >
>;
type _05d = Expect<Equal<StringProperties<unknown>, {}>>;

// 6. Copy each source property's own indexed value and modifiers.
export type MappedIdentity<Source> = TODO; // TODO(koan)

type _06a = Expect<Equal<MappedIdentity<GivenUser>, GivenUser>>;
type _06b = Expect<Equal<MappedIdentity<GivenConfig>, GivenConfig>>;
type _06c = Expect<
  Equal<
    MappedIdentity<{ readonly value?: string | number }>,
    { readonly value?: string | number }
  >
>;
type _06d = Expect<Equal<MappedIdentity<{}>, {}>>;

// 7. Map each source property to its own key.
export type ObjectKeyNames<Source> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    ObjectKeyNames<GivenConfig>,
    { host: "host"; port: "port" }
  >
>;
type _07b = Expect<
  Equal<
    ObjectKeyNames<GivenUser>,
    { readonly id: "id"; name: "name"; active?: "active" }
  >
>;
type _07c = Expect<
  Equal<ObjectKeyNames<{ 0: string }>, { 0: 0 }>
>;
type _07d = Expect<Equal<ObjectKeyNames<unknown>, {}>>;

// 8. Pair every source key with the value selected by that same key.
export type ObjectKeyValuePairs<Source> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    ObjectKeyValuePairs<GivenConfig>,
    {
      host: [key: "host", value: string];
      port: [key: "port", value: number];
    }
  >
>;
type _08b = Expect<
  Equal<
    ObjectKeyValuePairs<{ readonly id: number }>,
    { readonly id: [key: "id", value: number] }
  >
>;
type _08c = Expect<
  Equal<
    ObjectKeyValuePairs<{ name?: string }>,
    { name?: [key: "name", value: string | undefined] }
  >
>;
type _08d = Expect<
  Equal<
    ObjectKeyValuePairs<{ [givenTokenA]: Date }>,
    { [givenTokenA]: [key: typeof givenTokenA, value: Date] }
  >
>;

// ─── Special and broad key domains ─────────────────────────────────────────

// 9. Recover the complete key domain exposed by a source type.
export type ObjectKeyDomain<Source> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ObjectKeyDomain<GivenUser>, "id" | "name" | "active">
>;
type _09b = Expect<Equal<ObjectKeyDomain<unknown>, never>>;
type _09c = Expect<Equal<ObjectKeyDomain<any>, PropertyKey>>;
type _09d = Expect<Equal<ObjectKeyDomain<never>, PropertyKey>>;
type _09e = Expect<Equal<ObjectKeyDomain<{}>, never>>;

// 10. Iterate over the special keyof domain and emit each key as its value.
export type MapObjectKeys<Source> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<MapObjectKeys<GivenConfig>, { host: "host"; port: "port" }>
>;
type _10b = Expect<Equal<MapObjectKeys<unknown>, {}>>;
type _10c = Expect<
  Equal<MapObjectKeys<any>, { [Key in keyof any]: Key }>
>;
type _10d = Expect<
  Equal<MapObjectKeys<never>, { [Key in keyof never]: Key }>
>;

// 11. Construct an index-signature-like dictionary over one broad key family.
export type BroadDictionary<
  Domain extends string | number | symbol,
  Value,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<BroadDictionary<string, number>, { [key: string]: number }>
>;
type _11b = Expect<
  Equal<BroadDictionary<number, string>, { [key: number]: string }>
>;
type _11c = Expect<
  Equal<BroadDictionary<symbol, boolean>, { [key: symbol]: boolean }>
>;
type _11d = Expect<
  Equal<
    BroadDictionary<string | number, Date>,
    { [key: string]: Date; [key: number]: Date }
  >
>;

// 12. Recover the exact keyof result of a broad mapped key domain.
export type BroadMappedKeyof<
  Domain extends string | number | symbol,
> = TODO; // TODO(koan)

type _12a = Expect<Equal<BroadMappedKeyof<string>, string>>;
type _12b = Expect<Equal<BroadMappedKeyof<number>, number>>;
type _12c = Expect<Equal<BroadMappedKeyof<symbol>, symbol>>;
type _12d = Expect<
  Equal<BroadMappedKeyof<string | number | symbol>, PropertyKey>
>;

// 13. Compare numeric literal keys with a broad numeric key domain.
export type NumericKeyProfile<
  Keys extends number,
  Value,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    NumericKeyProfile<0 | 1, string>,
    [finite: { 0: string; 1: string }, finiteKeys: 0 | 1, broadKeys: number]
  >
>;
type _13b = Expect<
  Equal<
    NumericKeyProfile<42, boolean>,
    [finite: { 42: boolean }, finiteKeys: 42, broadKeys: number]
  >
>;
type _13c = Expect<
  Equal<
    NumericKeyProfile<never, Date>,
    [finite: {}, finiteKeys: never, broadKeys: number]
  >
>;
type _13d = Expect<
  Equal<NumericKeyProfile<0, never>[0], { 0: never }>
>;

// 14. Construct a dictionary whose finite symbol identities remain distinct.
export type SymbolDictionary<
  Keys extends symbol,
  Value,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    SymbolDictionary<typeof givenTokenA, number>,
    { [givenTokenA]: number }
  >
>;
type _14b = Expect<
  Equal<
    SymbolDictionary<typeof givenTokenA | typeof givenTokenB, boolean>,
    { [givenTokenA]: boolean; [givenTokenB]: boolean }
  >
>;
type _14c = Expect<
  Equal<keyof SymbolDictionary<symbol, Date>, symbol>
>;
type _14d = Expect<Equal<SymbolDictionary<never, string>, {}>>;

// 15. Construct one dictionary spanning string, number, and symbol literals.
export type MixedKeyDictionary<
  Keys extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    MixedKeyDictionary<"name" | 0 | typeof givenTokenA, Date>,
    { name: Date; 0: Date; [givenTokenA]: Date }
  >
>;
type _15b = Expect<
  Equal<
    keyof MixedKeyDictionary<"name" | 0 | typeof givenTokenA, Date>,
    "name" | 0 | typeof givenTokenA
  >
>;
type _15c = Expect<
  Equal<
    MixedKeyDictionary<"a" | 1, never>,
    { a: never; 1: never }
  >
>;
type _15d = Expect<Equal<MixedKeyDictionary<never, unknown>, {}>>;

// 16. Construct a dictionary accepting every JavaScript property-key family.
export type PropertyKeyDictionary<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    PropertyKeyDictionary<unknown>,
    { [Key in PropertyKey]: unknown }
  >
>;
type _16b = Expect<
  Equal<PropertyKeyDictionary<number>[string], number>
>;
type _16c = Expect<
  Equal<PropertyKeyDictionary<string>[number], string>
>;
type _16d = Expect<
  Equal<PropertyKeyDictionary<boolean>[symbol], boolean>
>;

// ─── Record equivalence and runtime-facing results ─────────────────────────

// 17. Pair a hand-written mapped dictionary with the built-in Record result.
export type MappedRecordPair<
  Keys extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    MappedRecordPair<"a" | "b", number>,
    [mapped: { a: number; b: number }, builtin: { a: number; b: number }]
  >
>;
type _17b = Expect<
  Equal<
    MappedRecordPair<0 | 1, string>,
    [mapped: { 0: string; 1: string }, builtin: { 0: string; 1: string }]
  >
>;
type _17c = Expect<
  Equal<
    MappedRecordPair<typeof givenTokenA, Date>,
    [mapped: { [givenTokenA]: Date }, builtin: { [givenTokenA]: Date }]
  >
>;
type _17d = Expect<
  Equal<
    keyof MappedRecordPair<never, boolean>[0]
      | keyof MappedRecordPair<never, boolean>[1],
    never
  >
>;

// 18. Intersect singleton dictionaries so each key can keep a distinct value.
export type IntersectedSingletonRecords<
  LeftKey extends PropertyKey,
  LeftValue,
  RightKey extends PropertyKey,
  RightValue,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    IntersectedSingletonRecords<"a", 1, "b", 2>,
    { a: 1 } & { b: 2 }
  >
>;
type _18b = Expect<
  Equal<
    IntersectedSingletonRecords<0, string, 1, number>,
    { 0: string } & { 1: number }
  >
>;
type _18c = Expect<
  Equal<
    IntersectedSingletonRecords<typeof givenTokenA, Date, "name", string>,
    { [givenTokenA]: Date } & { name: string }
  >
>;
type _18d = Expect<
  Equal<keyof IntersectedSingletonRecords<never, 1, never, 2>, never>
>;

// 19. Derive the exact flag object returned for a readonly key tuple.
export type FlagsFromKeyTuple<
  Keys extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<FlagsFromKeyTuple<readonly ["read", "write"]>, { read: boolean; write: boolean }>
>;
type _19b = Expect<
  Equal<FlagsFromKeyTuple<readonly [0, 1]>, { 0: boolean; 1: boolean }>
>;
type _19c = Expect<
  Equal<
    FlagsFromKeyTuple<readonly [typeof givenTokenA]>,
    { [givenTokenA]: boolean }
  >
>;
type _19d = Expect<Equal<FlagsFromKeyTuple<readonly []>, {}>>;

// 20. Construct the array returned when reading values at selected object keys.
export type SelectedValues<
  Source extends object,
  Keys extends keyof Source,
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<SelectedValues<GivenConfig, "host">, string[]>
>;
type _20b = Expect<
  Equal<SelectedValues<GivenConfig, "host" | "port">, Array<string | number>>
>;
type _20c = Expect<
  Equal<SelectedValues<{ readonly id?: number }, "id">, Array<number | undefined>>
>;
type _20d = Expect<Equal<SelectedValues<{}, never>, never[]>>;

// 21. Decide whether every proposed mapped key is assignable to PropertyKey.
export type ValidMappedDomain<Input> = TODO; // TODO(koan)

type _21a = Expect<Equal<ValidMappedDomain<"a" | 1 | symbol>, true>>;
type _21b = Expect<Equal<ValidMappedDomain<{ id: string }>, false>>;
type _21c = Expect<
  Equal<ValidMappedDomain<"a" | { id: string }>, false>
>;
type _21d = Expect<Equal<ValidMappedDomain<never>, true>>;

// 22. Classify which declaration host can directly contain a mapped member.
export type MappedDeclarationAllowed<
  Host extends "type-alias" | "interface",
> = TODO; // TODO(koan)

type _22a = Expect<Equal<MappedDeclarationAllowed<"type-alias">, true>>;
type _22b = Expect<Equal<MappedDeclarationAllowed<"interface">, false>>;
type _22c = Expect<
  Equal<MappedDeclarationAllowed<"type-alias" | "interface">, boolean>
>;
type _22d = Expect<
  Equal<MappedDeclarationAllowed<never>, never>
>;
