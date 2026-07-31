import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-082: type-level join — constructions
 * =============================================================================
 *
 * These constructions recursively rebuild strings from finite primitive
 * tuples, with explicit empty, singleton, recursive, and broad-array cases.
 * They cover every interpolation primitive, readonly tuples, empty members,
 * element and separator cross-products, never annihilation, optional/rest
 * fallbacks, split/join round trips, and special tuple boundaries. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenJoinable =
  string | number | bigint | boolean | null | undefined;

type GivenJoin<
  Values extends readonly GivenJoinable[],
  Separator extends string,
> =
  number extends Values["length"]
    ? string
    : Values extends readonly []
      ? ""
      : Values extends readonly [infer Only extends GivenJoinable]
        ? `${Only}`
        : Values extends readonly [
            infer Head extends GivenJoinable,
            ...infer Tail extends readonly GivenJoinable[],
          ]
          ? `${Head}${Separator}${GivenJoin<Tail, Separator>}`
          : string;

type GivenSplit<
  Text extends string,
  Delimiter extends string,
> =
  Text extends `${infer Head}${Delimiter}${infer Tail}`
    ? [Head, ...GivenSplit<Tail, Delimiter>]
    : [Text];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Domain and recursive join ──────────────────────────────────────────

// 1. Construct the complete template-interpolatable join element domain.
export type Joinable =
  TODO; // TODO(koan)

type _01a = Expect<
  Equal<Joinable, string | number | bigint | boolean | null | undefined>
>;
type _01b = Expect<
  Equal<Extract<Joinable, null | undefined>, null | undefined>
>;
type _01c = Expect<Equal<Extract<Joinable, number | bigint>, number | bigint>>;
type _01d = Expect<Equal<Extract<Joinable, symbol>, never>>;
type _01e = Expect<Equal<Extract<Joinable, { id: 1 }>, never>>;

// 2. Join a finite tuple exactly and fall back to string for broad arrays.
export type Join<
  Values extends readonly GivenJoinable[],
  Separator extends string,
> =
  TODO; // TODO(koan)

type _02a = Expect<Equal<Join<[], ",">, "">>;
type _02b = Expect<Equal<Join<readonly ["only"], never>, "only">>;
type _02c = Expect<
  Equal<Join<readonly ["users", 42, true], "/">, "users/42/true">
>;
type _02d = Expect<
  Equal<Join<["", "a", ""], ",">, ",a,">
>;
type _02e = Expect<Equal<Join<string[], ",">, string>>;

// 3. Join a tuple using a comma separator.
export type Csv<Values extends readonly GivenJoinable[]> =
  TODO; // TODO(koan)

type _03a = Expect<Equal<Csv<[]>, "">>;
type _03b = Expect<Equal<Csv<["a"]>, "a">>;
type _03c = Expect<Equal<Csv<["a", "b", "c"]>, "a,b,c">>;
type _03d = Expect<Equal<Csv<[1, true, null, undefined]>, "1,true,null,undefined">>;
type _03e = Expect<Equal<Csv<readonly string[]>, string>>;

// 4. Join a tuple using a slash separator.
export type Path<Values extends readonly GivenJoinable[]> =
  TODO; // TODO(koan)

type _04a = Expect<Equal<Path<[]>, "">>;
type _04b = Expect<Equal<Path<["users"]>, "users">>;
type _04c = Expect<Equal<Path<["users", 42, "posts"]>, "users/42/posts">>;
type _04d = Expect<
  Equal<Path<["a" | "b", "x" | "y"]>, "a/x" | "a/y" | "b/x" | "b/y">
>;
type _04e = Expect<Equal<Path<never>, never>>;

// 5. Join a tuple using a dot separator.
export type Dotted<Values extends readonly GivenJoinable[]> =
  TODO; // TODO(koan)

type _05a = Expect<Equal<Dotted<[]>, "">>;
type _05b = Expect<Equal<Dotted<["config"]>, "config">>;
type _05c = Expect<Equal<Dotted<["user", "profile", "name"]>, "user.profile.name">>;
type _05d = Expect<
  Equal<Dotted<[1 | 2, "x"]>, "1.x" | "2.x">
>;
type _05e = Expect<Equal<Dotted<readonly number[]>, string>>;

// ─── Tuple-shape variations ─────────────────────────────────────────────

// 6. Classify the tuple branch the join algorithm will take.
export type JoinShape<Values extends readonly GivenJoinable[]> =
  TODO; // TODO(koan)

type _06a = Expect<Equal<JoinShape<[]>, "empty">>;
type _06b = Expect<Equal<JoinShape<readonly ["a"]>, "singleton">>;
type _06c = Expect<Equal<JoinShape<["a", "b"]>, "recursive">>;
type _06d = Expect<Equal<JoinShape<string[] | readonly number[]>, "broad">>;
type _06e = Expect<
  Equal<JoinShape<[head: string, tail?: string]>, "recursive">
>;

// 7. Join only exact empty/singleton/recursive tuples and reject fallbacks.
export type StrictJoin<
  Values extends readonly GivenJoinable[],
  Separator extends string,
> =
  TODO; // TODO(koan)

type _07a = Expect<Equal<StrictJoin<[], ",">, "">>;
type _07b = Expect<Equal<StrictJoin<["a"], never>, "a">>;
type _07c = Expect<Equal<StrictJoin<["a", "b", "c"], ",">, "a,b,c">>;
type _07d = Expect<Equal<StrictJoin<string[], ",">, never>>;
type _07e = Expect<Equal<StrictJoin<[head: string, tail?: string], ",">, never>>;

// 8. Join every row in a tuple of primitive tuples, preserving readonlyness.
export type JoinEach<
  Rows extends readonly (readonly GivenJoinable[])[],
  Separator extends string,
> =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<JoinEach<[["a", "b"], ["c", "d"]], ",">, ["a,b", "c,d"]>
>;
type _08b = Expect<
  Equal<
    JoinEach<readonly [readonly ["a", 1], readonly ["b", 2]], ":">,
    readonly ["a:1", "b:2"]
  >
>;
type _08c = Expect<Equal<JoinEach<[], ",">, []>>;
type _08d = Expect<
  Equal<JoinEach<[[], ["only"]], never>, ["", "only"]>
>;
type _08e = Expect<
  Equal<JoinEach<(readonly string[])[], ",">, string[]>
>;

// ─── Separator and primitive profiles ───────────────────────────────────

// 9. Pin when a separator participates and when base cases ignore it.
export type SeparatorProfile<
  Separator extends string,
> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<SeparatorProfile<",">, { empty: ""; singleton: "a"; pair: "a,b"; triple: "a,b,c" }>
>;
type _09b = Expect<
  Equal<SeparatorProfile<"">["triple"], "abc">
>;
type _09c = Expect<
  Equal<SeparatorProfile<":" | "/">["pair"], "a:b" | "a/b">
>;
type _09d = Expect<
  Equal<
    SeparatorProfile<":" | "/">["triple"],
    "a:b:c" | "a:b/c" | "a/b:c" | "a/b/c"
  >
>;
type _09e = Expect<
  Equal<SeparatorProfile<never>, { empty: ""; singleton: "a"; pair: never; triple: never }>
>;

// 10. Stringify every legal primitive exactly while joining.
export type PrimitiveJoinProfile =
  TODO; // TODO(koan)

type _10a = Expect<Equal<PrimitiveJoinProfile["numbers"], "-1/2.5">>;
type _10b = Expect<Equal<PrimitiveJoinProfile["bigints"], "1:2">>;
type _10c = Expect<Equal<PrimitiveJoinProfile["booleans"], "true|false">>;
type _10d = Expect<
  Equal<PrimitiveJoinProfile["broadBoolean"], "flag:true" | "flag:false">
>;
type _10e = Expect<
  Equal<
    Pick<PrimitiveJoinProfile, "nullish" | "mixed">,
    { nullish: "null,undefined"; mixed: "x/null/1/false/undefined" }
  >
>;

// 11. Describe Cartesian expansion from element and separator unions.
export type JoinUnionProfile =
  TODO; // TODO(koan)

type _11a = Expect<Equal<JoinUnionProfile["left"], "a:x" | "b:x">>;
type _11b = Expect<Equal<JoinUnionProfile["right"], "a:x" | "a:y">>;
type _11c = Expect<
  Equal<JoinUnionProfile["both"], "a:x" | "a:y" | "b:x" | "b:y">
>;
type _11d = Expect<Equal<JoinUnionProfile["separator"], "a:b" | "a/b">>;
type _11e = Expect<
  Equal<JoinUnionProfile["all"], "a:x" | "a/x" | "b:x" | "b/x">
>;

// 12. Describe exact and fallback behavior for nonuniform tuple shapes.
export type TupleShapeProfile =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<Pick<TupleShapeProfile, "mutableEmpty" | "readonlyEmpty">, { mutableEmpty: ""; readonlyEmpty: "" }>
>;
type _12b = Expect<
  Equal<Pick<TupleShapeProfile, "mutableFinite" | "readonlyFinite">, { mutableFinite: "a,b"; readonlyFinite: "a,b" }>
>;
type _12c = Expect<
  Equal<Pick<TupleShapeProfile, "broad" | "readonlyBroad">, { broad: string; readonlyBroad: string }>
>;
type _12d = Expect<Equal<TupleShapeProfile["rest"], string>>;
type _12e = Expect<Equal<TupleShapeProfile["optional"], string>>;

// 13. Describe never in element, separator, and tuple positions.
export type NeverJoinProfile =
  TODO; // TODO(koan)

type _13a = Expect<
  Equal<Pick<NeverJoinProfile, "singleton" | "head" | "tail">, { singleton: never; head: never; tail: never }>
>;
type _13b = Expect<
  Equal<NeverJoinProfile["normalizedElement"], "a,b">
>;
type _13c = Expect<Equal<NeverJoinProfile["pairSeparator"], never>>;
type _13d = Expect<Equal<NeverJoinProfile["singletonSeparator"], "a">>;
type _13e = Expect<Equal<NeverJoinProfile["tuple"], never>>;

// ─── Broad, special, and round-trip boundaries ──────────────────────────

// 14. Describe broad element types versus broad tuple cardinality.
export type BroadJoinProfile =
  TODO; // TODO(koan)

type _14a = Expect<
  Equal<BroadJoinProfile["broadStringElement"], `${string}:x`>
>;
type _14b = Expect<
  Equal<BroadJoinProfile["broadNumberElement"], `${number}px`>
>;
type _14c = Expect<
  Equal<BroadJoinProfile["broadBigintElement"], `${bigint}n`>
>;
type _14d = Expect<
  Equal<BroadJoinProfile["broadBooleanElement"], "true:x" | "false:x">
>;
type _14e = Expect<Equal<BroadJoinProfile["broadArray"], string>>;

// 15. Classify any and never join results without requiring raw any.
export type JoinSpecialProfile<
  Values extends readonly GivenJoinable[],
  Separator extends string,
> =
  TODO; // TODO(koan)

type _15a = Expect<Equal<JoinSpecialProfile<any, ",">, [false, false]>>;
type _15b = Expect<Equal<JoinSpecialProfile<never, ",">, [false, true]>>;
type _15c = Expect<Equal<JoinSpecialProfile<string[], ",">, [false, false]>>;
type _15d = Expect<Equal<JoinSpecialProfile<[any], ",">, [false, false]>>;
type _15e = Expect<
  Equal<JoinSpecialProfile<["a", "b"], never>, [false, true]>
>;

// 16. Round-trip strings and tuples when split and join share delimiters.
export type RoundTripProfile<
  Text extends string,
  Values extends readonly string[],
  Delimiter extends string,
> =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    RoundTripProfile<"a,b,c", ["a", "b", "c"], ",">,
    { text: "a,b,c"; values: ["a", "b", "c"] }
  >
>;
type _16b = Expect<
  Equal<RoundTripProfile<",a,", ["", "a", ""], ",">["text"], ",a,">
>;
type _16c = Expect<
  Equal<RoundTripProfile<"single", ["single"], ",">["values"], ["single"]>
>;
type _16d = Expect<
  Equal<
    RoundTripProfile<"a--b--c", ["a", "b", "c"], "--">,
    { text: "a--b--c"; values: ["a", "b", "c"] }
  >
>;
type _16e = Expect<
  Equal<RoundTripProfile<"", [""], ",">, { text: ""; values: [""] }>
>;

// 17. Build one reusable summary of tuple shape and joined output.
export type JoinSummary<
  Values extends readonly GivenJoinable[],
  Separator extends string,
> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    JoinSummary<["a", "b", "c"], ",">,
    {
      values: ["a", "b", "c"];
      members: "a" | "b" | "c";
      length: 3;
      shape: "recursive";
      joined: "a,b,c";
    }
  >
>;
type _17b = Expect<
  Equal<JoinSummary<[], ",">["shape"], "empty">
>;
type _17c = Expect<
  Equal<JoinSummary<readonly [42], "/">["joined"], "42">
>;
type _17d = Expect<
  Equal<JoinSummary<string[], ",">["length"], number>
>;
type _17e = Expect<
  Equal<
    Pick<JoinSummary<[only?: string], ",">, "shape" | "joined">,
    { shape: "fallback"; joined: string }
  >
>;
