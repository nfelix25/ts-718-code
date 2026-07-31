import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-063: unknown in conditional types — constructions
 * =============================================================================
 *
 * These constructions model unknown as the safe top type: every verified type
 * fits it, but it fits only top-like targets. They cover detector ordering,
 * union absorption, intersection identity, deterministic distribution,
 * recovered capabilities, key views, variance, inference failure, standard
 * utilities, record values, and structural boundary validation. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenIsUnknown<Value> =
  GivenIsAny<Value> extends true
    ? false
    : unknown extends Value ? true : false;
type GivenMap<Value> =
  Value extends unknown ? { value: Value } : never;

// ─── Safe-top directionality and detection ────────────────────────────────

// 1. Detect any first so it cannot masquerade as unknown.
export type IsAny<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<IsAny<any>, true>>;
type _01b = Expect<Equal<IsAny<unknown>, false>>;
type _01c = Expect<Equal<IsAny<never>, false>>;
type _01d = Expect<Equal<IsAny<string>, false>>;

// 2. Detect exactly unknown after ruling out any.
export type IsUnknown<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<IsUnknown<unknown>, true>>;
type _02b = Expect<Equal<IsUnknown<any>, false>>;
type _02c = Expect<Equal<IsUnknown<never>, false>>;
type _02d = Expect<Equal<IsUnknown<string>, false>>;
type _02e = Expect<Equal<IsUnknown<unknown | string>, true>>;

// 3. Ask whether each distributed member fits the safe top type.
export type FitsUnknown<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<FitsUnknown<string>, true>>;
type _03b = Expect<Equal<FitsUnknown<null | undefined>, true>>;
type _03c = Expect<Equal<FitsUnknown<{ id: number }>, true>>;
type _03d = Expect<Equal<FitsUnknown<unknown>, true>>;
type _03e = Expect<Equal<FitsUnknown<never>, never>>;

// 4. Ask whether an entirely unverified value fits a supplied target.
export type AcceptsUnknown<Target> = TODO; // TODO(koan)

type _04a = Expect<Equal<AcceptsUnknown<unknown>, true>>;
type _04b = Expect<Equal<AcceptsUnknown<any>, true>>;
type _04c = Expect<Equal<AcceptsUnknown<string>, false>>;
type _04d = Expect<Equal<AcceptsUnknown<object>, false>>;
type _04e = Expect<Equal<AcceptsUnknown<never>, false>>;

// 5. Compare assignability to and from unknown in one relation.
export type UnknownRelations<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<UnknownRelations<string>, [true, false]>>;
type _05b = Expect<Equal<UnknownRelations<unknown>, [true, true]>>;
type _05c = Expect<Equal<UnknownRelations<any>, [true, true]>>;
type _05d = Expect<Equal<UnknownRelations<never>, [never, false]>>;

// 6. Classify any, unknown, strings, numbers, and other safe values in order.
export type SafeCategory<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<SafeCategory<any>, "any">>;
type _06b = Expect<Equal<SafeCategory<unknown>, "unknown">>;
type _06c = Expect<Equal<SafeCategory<string>, "string">>;
type _06d = Expect<Equal<SafeCategory<number>, "number">>;
type _06e = Expect<Equal<SafeCategory<boolean>, "other">>;

// ─── Union absorption, intersection identity, and distribution ────────────

// 7. Expose normalized union/intersection results and their classifications.
export type UnknownAlgebraProfile<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<UnknownAlgebraProfile<string>, [true, false, false, false, string]>
>;
type _07b = Expect<
  Equal<UnknownAlgebraProfile<unknown>, [true, false, true, false, unknown]>
>;
type _07c = Expect<
  Equal<UnknownAlgebraProfile<never>, [true, false, false, false, never]>
>;
type _07d = Expect<
  Equal<UnknownAlgebraProfile<{}>, [true, false, false, false, {}]>
>;

// 8. Map distributed members after normalization has already occurred.
export type MapMembers<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    MapMembers<string | number>,
    { value: string } | { value: number }
  >
>;
type _08b = Expect<
  Equal<MapMembers<unknown | string>, { value: unknown }>
>;
type _08c = Expect<
  Equal<MapMembers<unknown & string>, { value: string }>
>;
type _08d = Expect<Equal<MapMembers<never>, never>>;

// 9. Recover a required structural capability by intersecting it with unknown.
export type RecoverCapability<Capability extends object> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<RecoverCapability<{ id: string }>, { id: string }>
>;
type _09b = Expect<
  Equal<
    RecoverCapability<{ id: number; name: string }>,
    { id: number; name: string }
  >
>;
type _09c = Expect<
  Equal<
    keyof RecoverCapability<{ [givenToken]: boolean }>,
    typeof givenToken
  >
>;
type _09d = Expect<Equal<RecoverCapability<{}>, {}>>;

// 10. Expose safe keys and their mapped identity view.
export type KeyView<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<KeyView<unknown>, [never, {}]>>;
type _10b = Expect<
  Equal<
    KeyView<unknown & { id: string }>,
    ["id", { id: "id" }]
  >
>;
type _10c = Expect<
  Equal<
    KeyView<{ name: string; 0: number; [givenToken]: boolean }>,
    [
      "name" | 0 | typeof givenToken,
      { name: "name"; 0: 0; [givenToken]: typeof givenToken },
    ]
  >
>;
type _10d = Expect<Equal<KeyView<{}>, [never, {}]>>;

// 11. Return the member-key union after first requiring object evidence.
export type NarrowedKeys<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<NarrowedKeys<unknown>, never>>;
type _11b = Expect<Equal<NarrowedKeys<{ id: number; name: string }>, "id" | "name">>;
type _11c = Expect<
  Equal<
    NarrowedKeys<{ a: 1 } | { b: 2 }>,
    "a" | "b"
  >
>;
type _11d = Expect<Equal<NarrowedKeys<string | null>, never>>;

// ─── Variance, inference, and utility behavior ────────────────────────────

// 12. Compare unknown in function return and parameter positions.
export type UnknownFunctionRelations<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<UnknownFunctionRelations<string>, [true, false, true, false]>
>;
type _12b = Expect<
  Equal<UnknownFunctionRelations<number>, [true, false, true, false]>
>;
type _12c = Expect<
  Equal<UnknownFunctionRelations<unknown>, [true, true, true, true]>
>;
type _12d = Expect<
  Equal<UnknownFunctionRelations<never>, [true, false, true, false]>
>;

// 13. Compare a value promise with Promise<unknown> in both directions.
export type UnknownPromiseRelations<Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<UnknownPromiseRelations<string>, [true, false]>>;
type _13b = Expect<Equal<UnknownPromiseRelations<number>, [true, false]>>;
type _13c = Expect<Equal<UnknownPromiseRelations<unknown>, [true, true]>>;
type _13d = Expect<Equal<UnknownPromiseRelations<never>, [true, false]>>;

// 14. Infer a return only after callable structure is proven.
export type InferReturn<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<InferReturn<unknown>, never>>;
type _14b = Expect<Equal<InferReturn<() => unknown>, unknown>>;
type _14c = Expect<Equal<InferReturn<() => string>, string>>;
type _14d = Expect<
  Equal<InferReturn<(() => 1) | (() => 2)>, 1 | 2>
>;

// 15. Infer an element only after readonly-array structure is proven.
export type InferElement<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<InferElement<unknown>, never>>;
type _15b = Expect<Equal<InferElement<unknown[]>, unknown>>;
type _15c = Expect<
  Equal<InferElement<readonly [unknown, string]>, unknown>
>;
type _15d = Expect<Equal<InferElement<readonly []>, never>>;

// 16. Expose standard utility behavior for one input type.
export type UnknownUtilityProfile<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<UnknownUtilityProfile<unknown>, [unknown, {}, unknown, never]>
>;
type _16b = Expect<
  Equal<
    UnknownUtilityProfile<string | null>,
    [string | null, string, string, string]
  >
>;
type _16c = Expect<
  Equal<UnknownUtilityProfile<never>, [never, never, never, never]>
>;
type _16d = Expect<
  Equal<
    UnknownUtilityProfile<Promise<unknown>>,
    [unknown, Promise<unknown>, Promise<unknown>, Promise<unknown>]
  >
>;

// ─── Unknown values in records and boundary validation ────────────────────

// 17. Describe a record whose key domain is known but whose values are not.
export type UnknownRecordProfile<
  RecordType extends Record<PropertyKey, unknown>,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    UnknownRecordProfile<Record<string, unknown>>,
    [string, unknown, true]
  >
>;
type _17b = Expect<
  Equal<
    UnknownRecordProfile<Record<number, unknown>>,
    [number, unknown, true]
  >
>;
type _17c = Expect<
  Equal<
    UnknownRecordProfile<{ id: unknown; name: string }>,
    ["id" | "name", unknown, true]
  >
>;
type _17d = Expect<
  Equal<UnknownRecordProfile<{}>, [never, never, false]>
>;

// 18. Describe optional unknown reads and safe property-key visibility.
export type OptionalUnknownProfile<Source> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    OptionalUnknownProfile<{ value?: unknown }>,
    ["value", unknown, true]
  >
>;
type _18b = Expect<
  Equal<
    OptionalUnknownProfile<{ value?: string }>,
    ["value", string | undefined, false]
  >
>;
type _18c = Expect<
  Equal<
    OptionalUnknownProfile<{ value: unknown; other: number }>,
    ["value" | "other", unknown, true]
  >
>;
type _18d = Expect<
  Equal<OptionalUnknownProfile<{}>, [never, never, false]>
>;

// 19. Project a safe user only after structural evidence is available.
export type ParsedUser<Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ParsedUser<{ id: 1; name: "Ada"; extra: true }>,
    { id: number; name: string }
  >
>;
type _19b = Expect<
  Equal<ParsedUser<{ id: string; name: string }>, undefined>
>;
type _19c = Expect<Equal<ParsedUser<unknown>, undefined>>;
type _19d = Expect<
  Equal<
    ParsedUser<
      { id: number; name: string } | { id: string; name: string }
    >,
    { id: number; name: string } | undefined
  >
>;

// 20. Classify special safe-top relations without exposing raw any.
export type UnknownSpecialProfile<Value> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<UnknownSpecialProfile<any>, [true, false, true, true]>
>;
type _20b = Expect<
  Equal<UnknownSpecialProfile<unknown>, [false, true, true, true]>
>;
type _20c = Expect<
  Equal<UnknownSpecialProfile<never>, [false, false, never, false]>
>;
type _20d = Expect<
  Equal<UnknownSpecialProfile<string>, [false, false, true, false]>
>;
