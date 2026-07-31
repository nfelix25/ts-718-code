import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-051: string, number, and symbol keys — constructions
 * =============================================================================
 *
 * These constructions separate the three PropertyKey families while tracking
 * finite literals, broad index domains, Record mappings, runtime numeric
 * coercion, unique-symbol identity, family-aware remaps, container
 * infrastructure, reflection APIs, and invalid key candidates. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;
declare const givenOther: unique symbol;

interface GivenFinite {
  name: string;
  "-1": boolean;
  0: number;
  2: bigint;
  [givenToken]: Date;
}

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Universal, finite, and special key algebra ────────────────────────────

// 1. Construct the universal static property-key domain.
export type UniversalPropertyKey = TODO; // TODO(koan)

type _01a = Expect<Equal<UniversalPropertyKey, PropertyKey>>;
type _01b = Expect<Equal<UniversalPropertyKey, keyof any>>;
type _01c = Expect<Equal<Extract<UniversalPropertyKey, string>, string>>;
type _01d = Expect<Equal<Exclude<UniversalPropertyKey, symbol>, string | number>>;

// 2. Extract each PropertyKey family from one source.
export type KeyFamilies<Source> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    KeyFamilies<GivenFinite>,
    [
      strings: "name" | "-1",
      numbers: 0 | 2,
      symbols: typeof givenToken,
    ]
  >
>;
type _02b = Expect<
  Equal<
    KeyFamilies<Record<PropertyKey, unknown>>,
    [strings: string, numbers: number, symbols: symbol]
  >
>;
type _02c = Expect<
  Equal<KeyFamilies<{}>, [strings: never, numbers: never, symbols: never]>
>;
type _02d = Expect<
  Equal<
    KeyFamilies<{ 1: "one"; "two": 2; [givenOther]: 3 }>,
    [strings: "two", numbers: 1, symbols: typeof givenOther]
  >
>;

// 3. Classify key families for any, never, and unknown.
export type SpecialKeyFamilies<Source> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<SpecialKeyFamilies<any>, [strings: string, numbers: number, symbols: symbol]>
>;
type _03b = Expect<
  Equal<SpecialKeyFamilies<never>, [strings: string, numbers: number, symbols: symbol]>
>;
type _03c = Expect<
  Equal<SpecialKeyFamilies<unknown>, [strings: never, numbers: never, symbols: never]>
>;
type _03d = Expect<
  Equal<SpecialKeyFamilies<object>, [strings: never, numbers: never, symbols: never]>
>;

// 4. Expose selected primitive wrapper key facts without enumerating all methods.
export type PrimitiveKeyFacts<Primitive> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<PrimitiveKeyFacts<string>, [hasLength: true, hasToString: true, hasValueOf: true]>
>;
type _04b = Expect<
  Equal<PrimitiveKeyFacts<number>, [hasLength: false, hasToString: true, hasValueOf: true]>
>;
type _04c = Expect<
  Equal<PrimitiveKeyFacts<boolean>, [hasLength: false, hasToString: false, hasValueOf: true]>
>;
type _04d = Expect<
  Equal<PrimitiveKeyFacts<{}>, [hasLength: false, hasToString: false, hasValueOf: false]>
>;

// ─── Numeric spelling and index domains ────────────────────────────────────

// 5. Compare numeric and string spelling of the same runtime slot.
export type NumericSpellingProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<NumericSpellingProfile[0], 0>>;
type _05b = Expect<Equal<NumericSpellingProfile[1], "0">>;
type _05c = Expect<Equal<NumericSpellingProfile[2 | 3], string>>;
type _05d = Expect<Equal<NumericSpellingProfile[4], true>>;

// 6. Describe a string index signature and its explicit string member.
export type StringIndexProfile<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<StringIndexProfile<boolean>[0], string | number>
>;
type _06b = Expect<Equal<StringIndexProfile<boolean>[1], string>>;
type _06c = Expect<Equal<StringIndexProfile<boolean>[2], number>>;
type _06d = Expect<Equal<StringIndexProfile<never>[3], never>>;

// 7. Describe a number index signature plus one named member.
export type NumberIndexProfile<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<NumberIndexProfile<string>[0], number | "label">
>;
type _07b = Expect<Equal<NumberIndexProfile<string>[1], "label">>;
type _07c = Expect<Equal<NumberIndexProfile<string>[2], number>>;
type _07d = Expect<Equal<NumberIndexProfile<never>[3], never>>;

// 8. Describe a symbol index signature plus one named member.
export type SymbolIndexProfile<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<SymbolIndexProfile<Date>[0], symbol | "fixed">
>;
type _08b = Expect<Equal<SymbolIndexProfile<Date>[1], "fixed">>;
type _08c = Expect<Equal<SymbolIndexProfile<Date>[2], symbol>>;
type _08d = Expect<Equal<SymbolIndexProfile<Date>[3], Date>>;

// 9. Contrast mapped Record key domains for all three families.
export type RecordKeyDomains = TODO; // TODO(koan)

type _09a = Expect<Equal<RecordKeyDomains[0], string>>;
type _09b = Expect<Equal<RecordKeyDomains[1], number>>;
type _09c = Expect<Equal<RecordKeyDomains[2], symbol>>;
type _09d = Expect<Equal<RecordKeyDomains[3], string | number | symbol>>;

// ─── Unique symbols and family-aware remapping ─────────────────────────────

// 10. Build a finite object keyed by two unique-symbol identities.
export type UniqueSymbolObject = TODO; // TODO(koan)

type _10a = Expect<
  Equal<keyof UniqueSymbolObject, typeof givenToken | typeof givenOther>
>;
type _10b = Expect<Equal<UniqueSymbolObject[typeof givenToken], "token">>;
type _10c = Expect<
  Equal<Extract<keyof UniqueSymbolObject, typeof givenOther>, typeof givenOther>
>;
type _10d = Expect<
  Equal<Exclude<keyof UniqueSymbolObject, typeof givenOther>, typeof givenToken>
>;

// 11. Compare symbol-key unions and intersections.
export type SymbolKeyAlgebra = TODO; // TODO(koan)

type _11a = Expect<Equal<SymbolKeyAlgebra[0], never>>;
type _11b = Expect<
  Equal<SymbolKeyAlgebra[1], typeof givenToken | typeof givenOther>
>;
type _11c = Expect<Equal<SymbolKeyAlgebra[2], symbol>>;
type _11d = Expect<
  Equal<Extract<SymbolKeyAlgebra[1], symbol>, typeof givenToken | typeof givenOther>
>;

// 12. Prefix string keys while preserving number and symbol identities.
export type PrefixStringsPreserveOthers<Source> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    PrefixStringsPreserveOthers<GivenFinite>,
    {
      "p-name": string;
      "p--1": boolean;
      0: number;
      2: bigint;
      [givenToken]: Date;
    }
  >
>;
type _12b = Expect<
  Equal<
    keyof PrefixStringsPreserveOthers<GivenFinite>,
    "p-name" | "p--1" | 0 | 2 | typeof givenToken
  >
>;
type _12c = Expect<
  Equal<
    PrefixStringsPreserveOthers<Record<symbol, Date>>,
    Record<symbol, Date>
  >
>;
type _12d = Expect<Equal<PrefixStringsPreserveOthers<{}>, {}>>;

// 13. Stringify number keys while preserving string and symbol identities.
export type StringifyNumbers<Source> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    StringifyNumbers<GivenFinite>,
    {
      name: string;
      "-1": boolean;
      "0": number;
      "2": bigint;
      [givenToken]: Date;
    }
  >
>;
type _13b = Expect<
  Equal<
    keyof StringifyNumbers<GivenFinite>,
    "name" | "-1" | "0" | "2" | typeof givenToken
  >
>;
type _13c = Expect<
  Equal<
    StringifyNumbers<Record<number, string>>,
    { [key: `${number}`]: string }
  >
>;
type _13d = Expect<Equal<StringifyNumbers<{}>, {}>>;

// 14. Drop symbols while preserving string and number properties.
export type WithoutSymbols<Source> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    WithoutSymbols<GivenFinite>,
    { name: string; "-1": boolean; 0: number; 2: bigint }
  >
>;
type _14b = Expect<
  Equal<keyof WithoutSymbols<GivenFinite>, "name" | "-1" | 0 | 2>
>;
type _14c = Expect<Equal<WithoutSymbols<Record<symbol, Date>>, {}>>;
type _14d = Expect<Equal<WithoutSymbols<{}>, {}>>;

// 15. Convert numeric keys to a prefixed textual pattern.
export type PrefixNumberKeys<Source> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    PrefixNumberKeys<{ 0: string; 2: boolean; name: number }>,
    { "slot-0": string; "slot-2": boolean; name: number }
  >
>;
type _15b = Expect<
  Equal<
    PrefixNumberKeys<Record<number, string>>,
    { [key: `slot-${number}`]: string }
  >
>;
type _15c = Expect<
  Equal<keyof PrefixNumberKeys<{ 1: "a"; 2: "b" }>, "slot-1" | "slot-2">
>;
type _15d = Expect<Equal<PrefixNumberKeys<{}>, {}>>;

// 16. Merge numeric zero and string "0" by stringifying both destinations.
export type StringifiedZeroCollision = TODO; // TODO(koan)

type _16a = Expect<Equal<StringifiedZeroCollision, { "0": 0 | "0" }>>;
type _16b = Expect<Equal<keyof StringifiedZeroCollision, "0">>;
type _16c = Expect<Equal<StringifiedZeroCollision["0"], 0 | "0">>;
type _16d = Expect<
  Equal<GivenIsAny<StringifiedZeroCollision["0"]>, false>
>;

// ─── Containers, runtime keys, and validation ──────────────────────────────

// 17. Expose number, string-infrastructure, and symbol facts for arrays.
export type ArrayKeyFacts<ArrayType extends readonly unknown[]> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<ArrayKeyFacts<string[]>[0], number>
>;
type _17b = Expect<
  Equal<ArrayKeyFacts<string[]>[1 | 2 | 3], true>
>;
type _17c = Expect<
  Equal<
    ArrayKeyFacts<readonly string[]>,
    [numbers: number, hasLength: true, hasPush: false, hasIterator: true]
  >
>;
type _17d = Expect<
  Equal<
    ArrayKeyFacts<readonly []>,
    [numbers: number, hasLength: true, hasPush: false, hasIterator: true]
  >
>;

// 18. Expose tuple position spelling, numeric indexing, and element values.
export type TupleKeyFacts<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    TupleKeyFacts<[string, number]>,
    [stringPositions: "0" | "1", hasNumber: true, elements: string | number, length: 2]
  >
>;
type _18b = Expect<
  Equal<
    TupleKeyFacts<readonly ["a", "b"]>,
    [stringPositions: "0" | "1", hasNumber: true, elements: "a" | "b", length: 2]
  >
>;
type _18c = Expect<
  Equal<
    TupleKeyFacts<readonly []>,
    [stringPositions: never, hasNumber: true, elements: never, length: 0]
  >
>;
type _18d = Expect<
  Equal<TupleKeyFacts<readonly string[]>[0], never>
>;

// 19. Normalize a static PropertyKey to its runtime own-key representation.
export type RuntimePropertyKey<Key extends PropertyKey> = TODO; // TODO(koan)

type _19a = Expect<Equal<RuntimePropertyKey<42>, "42">>;
type _19b = Expect<Equal<RuntimePropertyKey<"42">, "42">>;
type _19c = Expect<
  Equal<RuntimePropertyKey<typeof givenToken>, typeof givenToken>
>;
type _19d = Expect<
  Equal<RuntimePropertyKey<0 | "0" | typeof givenToken>, "0" | typeof givenToken>
>;

// 20. Construct the return types of string-only and all-own-key reflection.
export type ReflectionKeyResults = TODO; // TODO(koan)

type _20a = Expect<Equal<ReflectionKeyResults[0], string[]>>;
type _20b = Expect<Equal<ReflectionKeyResults[1], (string | symbol)[]>>;
type _20c = Expect<Equal<ReflectionKeyResults[0][number], string>>;
type _20d = Expect<
  Equal<ReflectionKeyResults[1][number], string | symbol>
>;

// 21. Decide whether an entire candidate type can name object properties.
export type ValidKeyDomain<Candidate> = TODO; // TODO(koan)

type _21a = Expect<Equal<ValidKeyDomain<string | number | symbol>, true>>;
type _21b = Expect<Equal<ValidKeyDomain<typeof givenToken>, true>>;
type _21c = Expect<Equal<ValidKeyDomain<Symbol>, false>>;
type _21d = Expect<Equal<ValidKeyDomain<{ key: string }>, false>>;
type _21e = Expect<
  Equal<ValidKeyDomain<"ok" | { key: string }>, false>
>;

// 22. Map a key domain back to its keys and classify the broad string value
//     without making any the intended answer.
export type IdentityKeyMapProfile<Keys extends PropertyKey> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    IdentityKeyMapProfile<"a" | 1>[0],
    { a: "a"; 1: 1 }
  >
>;
type _22b = Expect<
  Equal<IdentityKeyMapProfile<PropertyKey>[1], false>
>;
type _22c = Expect<
  Equal<
    IdentityKeyMapProfile<symbol>[0][typeof givenToken],
    symbol
  >
>;
type _22d = Expect<
  Equal<keyof IdentityKeyMapProfile<never>[0], never>
>;
