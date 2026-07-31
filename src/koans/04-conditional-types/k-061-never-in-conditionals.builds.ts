import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-061: never in conditional types — constructions
 * =============================================================================
 *
 * These constructions treat never as both the assignable bottom type and the
 * empty union. They cover reliable and naive detection, replacement, filtering,
 * zero-member distribution, union identity, containers and promises that hold
 * never, function variance, retained never-valued properties versus removed
 * keys, keyof/mapping behavior, nullish fallbacks, and exhaustive remainders.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;
type GivenKeep<Value, Constraint> =
  Value extends Constraint ? Value : never;
type GivenRemaining<All, Handled> =
  All extends Handled ? never : All;
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenState = "idle" | "loading" | "success" | "failure";

// ─── Bottom relations, detection, and replacement ─────────────────────────

// 1. Compare bottom assignability in both directions for a target.
export type BottomRelations<Target> = TODO; // TODO(koan)

type _01a = Expect<Equal<BottomRelations<string>, [true, false]>>;
type _01b = Expect<Equal<BottomRelations<object>, [true, false]>>;
type _01c = Expect<Equal<BottomRelations<unknown>, [true, false]>>;
type _01d = Expect<Equal<BottomRelations<never>, [true, never]>>;
type _01e = Expect<Equal<BottomRelations<string | number>, [true, false]>>;

// 2. Detect the empty union by wrapping the checked type.
export type IsNever<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<IsNever<never>, true>>;
type _02b = Expect<Equal<IsNever<string>, false>>;
type _02c = Expect<Equal<IsNever<unknown>, false>>;
type _02d = Expect<Equal<IsNever<any>, false>>;
type _02e = Expect<Equal<IsNever<never & string>, true>>;

// 3. Construct the naive naked check that disappears for never itself.
export type NaiveIsNever<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<NaiveIsNever<never>, never>>;
type _03b = Expect<Equal<NaiveIsNever<string>, false>>;
type _03c = Expect<Equal<NaiveIsNever<string | never>, false>>;
type _03d = Expect<Equal<NaiveIsNever<any>, boolean>>;

// 4. Replace only the complete empty union with a supplied fallback.
export type ReplaceNever<Value, Replacement> = TODO; // TODO(koan)

type _04a = Expect<Equal<ReplaceNever<never, "empty">, "empty">>;
type _04b = Expect<Equal<ReplaceNever<string, "empty">, string>>;
type _04c = Expect<Equal<ReplaceNever<unknown, "empty">, unknown>>;
type _04d = Expect<Equal<ReplaceNever<never | 1, "empty">, 1>>;
type _04e = Expect<Equal<ReplaceNever<never & 1, "empty">, "empty">>;

// 5. Summarize reliable, naive, and replacement behavior together.
export type NeverDetectionProfile<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<NeverDetectionProfile<never>, [true, never, "empty"]>
>;
type _05b = Expect<
  Equal<NeverDetectionProfile<string>, [false, false, string]>
>;
type _05c = Expect<
  Equal<NeverDetectionProfile<string & number>, [true, never, "empty"]>
>;
type _05d = Expect<
  Equal<NeverDetectionProfile<unknown>, [false, false, unknown]>
>;

// ─── Zero-member distribution and union filtering ────────────────────────

// 6. Keep only distributed members satisfying a constraint.
export type Keep<Value, Constraint> = TODO; // TODO(koan)

type _06a = Expect<Equal<Keep<string | number, string>, string>>;
type _06b = Expect<Equal<Keep<"a" | 1 | "b" | 2, string>, "a" | "b">>;
type _06c = Expect<Equal<Keep<1 | 2 | 3, 2>, 2>>;
type _06d = Expect<
  Equal<Keep<{ id: 1 } | { name: "x" }, { id: unknown }>, { id: 1 }>
>;
type _06e = Expect<Equal<Keep<never, string>, never>>;

// 7. Drop distributed members satisfying a constraint.
export type Drop<Value, Constraint> = TODO; // TODO(koan)

type _07a = Expect<Equal<Drop<string | number, string>, number>>;
type _07b = Expect<Equal<Drop<"a" | 1 | "b" | 2, string>, 1 | 2>>;
type _07c = Expect<Equal<Drop<1 | 2 | 3, 2>, 1 | 3>>;
type _07d = Expect<
  Equal<Drop<string | null | undefined, {}>, null | undefined>
>;
type _07e = Expect<Equal<Drop<never, string>, never>>;

// 8. Wrap every surviving union member and return nothing for the empty union.
export type WrapMembers<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    WrapMembers<1 | 2>,
    { value: 1 } | { value: 2 }
  >
>;
type _08b = Expect<
  Equal<WrapMembers<string | never>, { value: string }>
>;
type _08c = Expect<
  Equal<
    WrapMembers<boolean>,
    { value: false } | { value: true }
  >
>;
type _08d = Expect<Equal<WrapMembers<never>, never>>;

// 9. Add never to a union and expose its identity behavior.
export type WithNever<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<WithNever<string>, string>>;
type _09b = Expect<Equal<WithNever<1 | 2>, 1 | 2>>;
type _09c = Expect<Equal<WithNever<unknown>, unknown>>;
type _09d = Expect<Equal<WithNever<never>, never>>;

// ─── Containers, promises, and functions containing never ─────────────────

// 10. Describe whether a container is never and what its element/length types are.
export type NeverContainerProfile<
  Container extends readonly unknown[],
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<NeverContainerProfile<never[]>, [false, never, number]>
>;
type _10b = Expect<
  Equal<NeverContainerProfile<readonly [never]>, [false, never, 1]>
>;
type _10c = Expect<
  Equal<NeverContainerProfile<readonly []>, [false, never, 0]>
>;
type _10d = Expect<
  Equal<NeverContainerProfile<string[]>, [false, string, number]>
>;

// 11. Describe a promise that may resolve only through a never result.
export type NeverPromiseProfile<PromiseType extends Promise<unknown>> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<NeverPromiseProfile<Promise<never>>, [false, never, true]>
>;
type _11b = Expect<
  Equal<NeverPromiseProfile<Promise<string>>, [false, string, true]>
>;
type _11c = Expect<
  Equal<NeverPromiseProfile<Promise<unknown>>, [false, unknown, false]>
>;
type _11d = Expect<
  Equal<NeverPromiseProfile<Promise<1 | 2>>, [false, 1 | 2, false]>
>;

// 12. Infer a callable's return type or produce never for a non-callable.
export type InferReturn<Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<InferReturn<() => never>, never>>;
type _12b = Expect<Equal<InferReturn<() => string>, string>>;
type _12c = Expect<
  Equal<InferReturn<(() => 1) | (() => 2)>, 1 | 2>
>;
type _12d = Expect<Equal<InferReturn<string>, never>>;
type _12e = Expect<Equal<InferReturn<never>, never>>;

// 13. Compare never in return and parameter variance positions.
export type NeverFunctionRelations<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<NeverFunctionRelations<string>, [true, false, true, false]>
>;
type _13b = Expect<
  Equal<NeverFunctionRelations<number>, [true, false, true, false]>
>;
type _13c = Expect<
  Equal<NeverFunctionRelations<unknown>, [true, false, true, false]>
>;
type _13d = Expect<
  Equal<NeverFunctionRelations<never>, [true, true, true, true]>
>;

// ─── Never-valued properties versus removed keys ──────────────────────────

// 14. Retain every key while replacing matching property values with never.
export type NeverMatchingValues<Source, Match> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    NeverMatchingValues<{ keep: string; drop: Date }, Date>,
    { keep: string; drop: never }
  >
>;
type _14b = Expect<
  Equal<
    keyof NeverMatchingValues<{ keep: string; drop: Date }, Date>,
    "keep" | "drop"
  >
>;
type _14c = Expect<
  Equal<
    NeverMatchingValues<{ readonly optional?: string }, string>,
    { readonly optional?: string }
  >
>;
type _14d = Expect<Equal<NeverMatchingValues<{}, unknown>, {}>>;

// 15. Remove matching properties by remapping their destination keys to never.
export type RemoveMatchingKeys<Source, Match> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    RemoveMatchingKeys<{ keep: string; drop: Date }, Date>,
    { keep: string }
  >
>;
type _15b = Expect<
  Equal<
    keyof RemoveMatchingKeys<{ keep: string; drop: Date }, Date>,
    "keep"
  >
>;
type _15c = Expect<
  Equal<
    RemoveMatchingKeys<{ value: string | number; text: string }, string>,
    { value: string | number }
  >
>;
type _15d = Expect<Equal<RemoveMatchingKeys<{}, unknown>, {}>>;

// 16. Report retained and removed key sets for one conditional property policy.
export type NeverPropertyKeyProfile<Source, Match> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    NeverPropertyKeyProfile<{ keep: string; drop: Date }, Date>,
    ["keep" | "drop", "keep"]
  >
>;
type _16b = Expect<
  Equal<
    NeverPropertyKeyProfile<{ a: 1; b: 2; c: 3 }, 1 | 3>,
    ["a" | "b" | "c", "b"]
  >
>;
type _16c = Expect<
  Equal<
    NeverPropertyKeyProfile<{ optional?: string; exact: string }, string>,
    ["optional" | "exact", "optional"]
  >
>;
type _16d = Expect<
  Equal<NeverPropertyKeyProfile<{}, unknown>, [never, never]>
>;

// 17. Map all keys of a source and separately map an explicitly empty key set.
export type NeverKeyMaps<Value> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    NeverKeyMaps<{ a: 1; b: 2 }>,
    [{ a: "a"; b: "b" }, {}]
  >
>;
type _17b = Expect<
  Equal<keyof NeverKeyMaps<{}>[0], never>
>;
type _17c = Expect<
  Equal<keyof NeverKeyMaps<unknown>[0], never>
>;
type _17d = Expect<
  Equal<
    [
      mappedIsAny: GivenIsAny<NeverKeyMaps<never>[0]>,
      keys: keyof NeverKeyMaps<never>[0],
    ],
    [mappedIsAny: false, keys: string | number | symbol]
  >
>;
type _17e = Expect<
  Equal<keyof NeverKeyMaps<{}>[1], never>
>;
type _17f = Expect<
  Equal<keyof NeverKeyMaps<unknown>[1], never>
>;

// ─── Exhaustiveness, nullish fallback, and special inputs ─────────────────

// 18. Remove handled union members to produce an exhaustiveness remainder.
export type Remaining<All, Handled> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    Remaining<GivenState, "idle" | "loading">,
    "success" | "failure"
  >
>;
type _18b = Expect<Equal<Remaining<GivenState, GivenState>, never>>;
type _18c = Expect<
  Equal<Remaining<GivenState, "idle" | "failure">, "loading" | "success">
>;
type _18d = Expect<Equal<Remaining<never, GivenState>, never>>;

// 19. Report the remainder and whether a handled set is exhaustive.
export type ExhaustivenessProfile<All, Handled> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ExhaustivenessProfile<GivenState, "idle" | "loading">,
    ["success" | "failure", false]
  >
>;
type _19b = Expect<
  Equal<ExhaustivenessProfile<GivenState, GivenState>, [never, true]>
>;
type _19c = Expect<
  Equal<
    ExhaustivenessProfile<"a" | "b" | "c", "a" | "c">,
    ["b", false]
  >
>;
type _19d = Expect<
  Equal<ExhaustivenessProfile<never, never>, [never, true]>
>;

// 20. Remove nullish members before a never-returning missing-value fallback.
export type PresentValue<Value> = TODO; // TODO(koan)

type _20a = Expect<Equal<PresentValue<string | null | undefined>, string>>;
type _20b = Expect<Equal<PresentValue<0 | null>, 0>>;
type _20c = Expect<Equal<PresentValue<null | undefined>, never>>;
type _20d = Expect<
  Equal<PresentValue<{ id: number } | undefined>, { id: number }>
>;

// 21. Classify special transforms without expecting a raw any output.
export type NeverSpecialProfile<Value> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<NeverSpecialProfile<any>, [true, false, false, "any"]>
>;
type _21b = Expect<
  Equal<NeverSpecialProfile<never>, [false, true, true, "empty"]>
>;
type _21c = Expect<
  Equal<NeverSpecialProfile<unknown>, [false, false, false, unknown]>
>;
type _21d = Expect<
  Equal<NeverSpecialProfile<string | never>, [false, false, false, string]>
>;
