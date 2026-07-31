import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-114: value by path — constructions
 * =============================================================================
 *
 * A path union says which strings are valid. These constructions build the
 * parser that says what is found there: split one segment off the front, prove
 * it indexes the current type, and recurse with the remainder. There are two
 * honest answers, and the packet wants both. The strict reading is a type-level
 * query, so a union branch lacking the segment becomes `never` and simply
 * disappears; the safe reading models a real lookup, so a missing, nullish, or
 * optional branch contributes `undefined` instead. Keep in mind that the parser
 * can reach structural members the approved vocabulary deliberately refuses to
 * name — tuple indices, `map.size`, `date.getTime` — which is exactly why the
 * two tools stay separate. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenApprovedLeaf =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined
  | Function
  | Date
  | RegExp
  | Promise<unknown>
  | ReadonlyMap<unknown, unknown>
  | ReadonlySet<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>
  | readonly unknown[];

type GivenApprovedChild<Key extends string, Value> =
  GivenApprovedPaths<Value> extends infer Rest extends string ? `${Key}.${Rest}` : never;

// A solved local copy of k-113's vocabulary policy, given so that these
// constructions can be compared against it without rebuilding it.
type GivenApprovedPaths<Value> = GivenIsAny<Value> extends true
  ? string
  : Value extends unknown
    ? Value extends GivenApprovedLeaf
      ? never
      : Value extends object
        ? {
          [Key in keyof Value & string]-?: Key | GivenApprovedChild<Key, Value[Key]>;
        }[keyof Value & string]
        : never
    : never;

type GivenModel = {
  id: string;
  profile: {
    name: string;
    contact?: { email: string; phone: string | null };
  };
  settings?: { theme: "light" | "dark" };
};

// Declared with the packet's own lookup signature so a construction can be
// graded against a real call site.
declare function givenGetAtPath<Value, const Path extends GivenApprovedPaths<Value> & string>(
  value: Value,
  path: Path,
): SafePathValueOf<Value, Path>;

// ─── The two readings ─────────────────────────────────────────────────

// 1. Build the strict parser. Intercept `any`, distribute over union members,
//    and for a dotted path prove the head indexes the current type before
//    recursing with the remainder. A branch that cannot supply the segment
//    contributes `never`, which removes it from the result entirely.
//    `PathValueOf<{ profile: { name: string } }, "profile.name">` is `string`.
//    Hint: `P extends \`${infer Head}.${infer Rest}\`` splits at the FIRST dot,
//    and `Head extends keyof T` is the proof that the segment is real.
export type PathValueOf<Value, Path extends string> = TODO; // TODO(koan)

type _01a = Expect<Equal<PathValueOf<GivenModel, "id">, string>>;
type _01b = Expect<Equal<PathValueOf<GivenModel, "profile.name">, string>>;
type _01c = Expect<Equal<PathValueOf<GivenModel, "missing">, never>>;
type _01d = Expect<Equal<PathValueOf<GivenModel, "settings.theme">, "light" | "dark">>;
type _01e = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<PathValueOf<any, "x.y">>;
      deep: PathValueOf<{ a: { b: { c: 1 } } }, "a.b.c">;
    },
    { anyStaysAny: true; deep: 1 }
  >
>;

// 2. Build the safe parser, which models an actual runtime lookup: a nullish
//    current value stops with `undefined`, and so does a segment that is not
//    there, instead of removing the branch.
//    `SafePathValueOf<{ a?: { b: 1 } }, "a.b">` is `1 | undefined`.
export type SafePathValueOf<Value, Path extends string> = TODO; // TODO(koan)

type _02a = Expect<Equal<SafePathValueOf<GivenModel, "id">, string>>;
type _02b = Expect<Equal<SafePathValueOf<{ a?: { b: 1 } }, "a.b">, 1 | undefined>>;
type _02c = Expect<Equal<SafePathValueOf<GivenModel, "settings.theme">, "light" | "dark" | undefined>>;
type _02d = Expect<Equal<SafePathValueOf<null | { x: number }, "x">, number | undefined>>;
type _02e = Expect<Equal<SafePathValueOf<GivenModel, "missing">, undefined>>;

// ─── Walking one segment at a time ────────────────────────────────────

// 3. Report a one-segment path behaving as indexed access with a proof attached.
export type SingleSegmentProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<SingleSegmentProfile["primitive"], string>>;
type _03b = Expect<
  Equal<
    SingleSegmentProfile["branch"],
    { name: string; contact?: { email: string; phone: string | null } }
  >
>;
type _03c = Expect<Equal<SingleSegmentProfile["nested"], string>>;
type _03d = Expect<Equal<SingleSegmentProfile["absent"], never>>;
type _03e = Expect<
  Equal<SingleSegmentProfile["optionalBranch"], { theme: "light" | "dark" } | undefined>
>;

// 4. Report each dot consuming exactly one object layer.
export type MultiSegmentProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<MultiSegmentProfile["twoSegments"], string>>;
type _04b = Expect<
  Equal<
    MultiSegmentProfile["optionalMiddle"],
    { email: string; phone: string | null } | undefined
  >
>;
type _04c = Expect<Equal<MultiSegmentProfile["throughOptional"], string>>;
type _04d = Expect<Equal<MultiSegmentProfile["nullableLeaf"], string | null>>;
type _04e = Expect<Equal<MultiSegmentProfile["deepLiteral"], 1>>;

// 5. Report the two readings diverging exactly where a branch cannot supply the
//    segment: the strict one deletes it, the safe one records its absence.
export type StrictVersusSafeProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<StrictVersusSafeProfile["strictUnion"], 1>>;
type _05b = Expect<Equal<StrictVersusSafeProfile["safeUnion"], 1 | undefined>>;
type _05c = Expect<Equal<StrictVersusSafeProfile["strictEmptyMember"], 1>>;
type _05d = Expect<Equal<StrictVersusSafeProfile["safeEmptyMember"], 1 | undefined>>;
type _05e = Expect<Equal<StrictVersusSafeProfile["safeAbsent"], undefined>>;

// 6. Report deep paths crossing an optional or nullish branch.
export type NullishBranchProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<NullishBranchProfile["strictOptional"], 1>>;
type _06b = Expect<Equal<NullishBranchProfile["safeOptional"], 1 | undefined>>;
type _06c = Expect<Equal<NullishBranchProfile["strictNullMember"], 1>>;
type _06d = Expect<Equal<NullishBranchProfile["safeNullMember"], 1 | undefined>>;
type _06e = Expect<Equal<NullishBranchProfile["safeUndefinedMember"], 1 | undefined>>;

// 7. Report `never` in a branch, which both readings drop entirely — the safe
//    reading does not turn an empty domain into `undefined`.
export type EmptyDomainProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<EmptyDomainProfile["strictNeverBranch"], never>>;
type _07b = Expect<Equal<EmptyDomainProfile["safeNeverBranch"], never>>;
type _07c = Expect<Equal<EmptyDomainProfile["strictNeverSource"], never>>;
type _07d = Expect<Equal<EmptyDomainProfile["safeNeverSource"], never>>;
type _07e = Expect<Equal<EmptyDomainProfile["strictNeverSegment"], never>>;

// ─── Where dot syntax stops being faithful ────────────────────────────

// 8. Report the ambiguity that dot syntax cannot resolve: a key containing a dot
//    is unreachable, and when both readings exist the split always wins.
export type DotAmbiguityProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<DotAmbiguityProfile["dottedKeyStrict"], never>>;
type _08b = Expect<Equal<DotAmbiguityProfile["dottedKeySafe"], undefined>>;
type _08c = Expect<Equal<DotAmbiguityProfile["splitWins"], 2>>;
type _08d = Expect<Equal<DotAmbiguityProfile["dotOnlyKey"], never>>;
type _08e = Expect<Equal<DotAmbiguityProfile["approvedNames"], "a.b">>;

// 9. Report empty segments, which are ordinary string keys to the parser.
export type EmptySegmentProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<EmptySegmentProfile["emptyKey"], 1>>;
type _09b = Expect<Equal<EmptySegmentProfile["trailingDot"], 1>>;
type _09c = Expect<Equal<EmptySegmentProfile["trailingDotSafe"], 1>>;
type _09d = Expect<Equal<EmptySegmentProfile["missingTrailing"], never>>;
type _09e = Expect<Equal<EmptySegmentProfile["missingTrailingSafe"], undefined>>;

// 10. Report a broad index signature, which accepts the first segment and then
//     has nothing structural left for the second one to index.
export type BroadIndexProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<BroadIndexProfile["oneSegment"], number>>;
type _10b = Expect<Equal<BroadIndexProfile["twoSegmentsStrict"], never>>;
type _10c = Expect<Equal<BroadIndexProfile["twoSegmentsSafe"], undefined>>;
type _10d = Expect<Equal<BroadIndexProfile["nestedRecord"], 1>>;
type _10e = Expect<Equal<BroadIndexProfile["vocabulary"], string>>;

// ─── Two tools with different reach ───────────────────────────────────

// 11. Report the parser reaching structural members the approved vocabulary
//     refuses to name, because the vocabulary's leaf policy stops where the
//     parser's `keyof` does not.
export type ParserBeyondVocabularyProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ParserBeyondVocabularyProfile["tupleIndex"], 1>>;
type _11b = Expect<Equal<ParserBeyondVocabularyProfile["tupleApproved"], never>>;
type _11c = Expect<Equal<ParserBeyondVocabularyProfile["mapSize"], number>>;
type _11d = Expect<Equal<ParserBeyondVocabularyProfile["mapApproved"], never>>;
type _11e = Expect<Equal<ParserBeyondVocabularyProfile["dateMethod"], () => number>>;

// 12. Report members reached through an intersection and through a list index.
export type StructuralReachProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<StructuralReachProfile["intersectionMember"], 2>>;
type _12b = Expect<Equal<StructuralReachProfile["listIndex"], 1>>;
type _12c = Expect<Equal<StructuralReachProfile["listApproved"], never>>;
type _12d = Expect<Equal<StructuralReachProfile["dateApproved"], never>>;
type _12e = Expect<Equal<StructuralReachProfile["arrayLength"], number>>;

// 13. Report the top and bottom sources keeping their established algebra.
export type ExtremeSourceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ExtremeSourceProfile["strictUnknown"], never>>;
type _13b = Expect<Equal<ExtremeSourceProfile["safeUnknown"], undefined>>;
type _13c = Expect<Equal<ExtremeSourceProfile["strictAny"], true>>;
type _13d = Expect<Equal<ExtremeSourceProfile["safeAny"], true>>;
type _13e = Expect<Equal<ExtremeSourceProfile["anyValueMember"], true>>;

// ─── The parsing primitives themselves ────────────────────────────────

// 14. Build the head reader: the first segment of a path, or the whole path when
//     there is no dot at all.
export type HeadOfPath<Path extends string> = TODO; // TODO(koan)

type _14a = Expect<Equal<HeadOfPath<"profile.contact.email">, "profile">>;
type _14b = Expect<Equal<HeadOfPath<"id">, "id">>;
type _14c = Expect<Equal<HeadOfPath<"">, "">>;
type _14d = Expect<Equal<HeadOfPath<"a.b" | "c">, "a" | "c">>;
type _14e = Expect<Equal<HeadOfPath<".x">, "">>;

// 15. Build the remainder reader, which is empty when a path has one segment.
export type RestOfPath<Path extends string> = TODO; // TODO(koan)

type _15a = Expect<Equal<RestOfPath<"profile.contact.email">, "contact.email">>;
type _15b = Expect<Equal<RestOfPath<"id">, never>>;
type _15c = Expect<Equal<RestOfPath<"a.">, "">>;
type _15d = Expect<Equal<RestOfPath<"a.b" | "c.d.e">, "b" | "d.e">>;
type _15e = Expect<Equal<RestOfPath<"a.b" | "c">, "b">>;

// 16. Build the full segment list, which is the parser's loop made visible.
export type PathSegmentsOf<Path extends string> = TODO; // TODO(koan)

type _16a = Expect<Equal<PathSegmentsOf<"profile.contact.email">, ["profile", "contact", "email"]>>;
type _16b = Expect<Equal<PathSegmentsOf<"id">, ["id"]>>;
type _16c = Expect<Equal<PathSegmentsOf<"">, [""]>>;
type _16d = Expect<Equal<PathSegmentsOf<"a.">, ["a", ""]>>;
type _16e = Expect<Equal<PathSegmentsOf<"a.b.c.d">["length"], 4>>;

// ─── Surfaces built on the parser ─────────────────────────────────────

// 17. Build the predicate that reports whether a path resolves at all under the
//     strict reading.
export type HasPathOf<Value, Path extends string> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { present: HasPathOf<GivenModel, "profile.name">; absent: HasPathOf<GivenModel, "missing"> },
    { present: true; absent: false }
  >
>;
type _17b = Expect<
  Equal<
    {
      deep: HasPathOf<GivenModel, "profile.contact.email">;
      tooDeep: HasPathOf<GivenModel, "profile.name.nope">;
    },
    { deep: true; tooDeep: false }
  >
>;
type _17c = Expect<
  Equal<
    { optional: HasPathOf<GivenModel, "settings.theme">; dotted: HasPathOf<{ "a.b": 1 }, "a.b"> },
    { optional: true; dotted: false }
  >
>;
type _17d = Expect<
  Equal<
    { emptyDomain: HasPathOf<{ a: never }, "a">; union: HasPathOf<{ a: 1 } | { b: 2 }, "a"> },
    { emptyDomain: false; union: true }
  >
>;
type _17e = Expect<
  Equal<
    { tupleIndex: HasPathOf<{ tuple: [{ x: 1 }] }, "tuple.0.x">; broad: HasPathOf<Record<string, number>, "a.b"> },
    { tupleIndex: true; broad: false }
  >
>;

// 18. Build the fallback reading that the packet's `getAtPathOr` returns: the
//     found value with absence removed, widened by the caller's fallback.
export type PathValueOrOf<Value, Path extends string, Fallback> = TODO; // TODO(koan)

type _18a = Expect<Equal<PathValueOrOf<GivenModel, "id", "none">, string | "none">>;
type _18b = Expect<Equal<PathValueOrOf<GivenModel, "settings.theme", "light">, "light" | "dark">>;
type _18c = Expect<Equal<PathValueOrOf<GivenModel, "missing", 0>, 0>>;
type _18d = Expect<Equal<PathValueOrOf<{ a?: { b: 1 } }, "a.b", null>, 1 | null>>;
type _18e = Expect<Equal<PathValueOrOf<{ a: 1 } | { b: 2 }, "a", "fallback">, 1 | "fallback">>;

// 19. Build the lookup signatures the packet exports, whose path parameter is
//     constrained by the approved vocabulary while the result comes from the
//     safe reading.
export type LookupRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    LookupRuntimeApi["getAtPath"],
    <Value, const Path extends GivenApprovedPaths<Value> & string>(
      value: Value,
      path: Path,
    ) => SafePathValueOf<Value, Path>
  >
>;
type _19b = Expect<
  Equal<
    LookupRuntimeApi["getAtPathOr"],
    <Value, const Path extends GivenApprovedPaths<Value> & string, Fallback>(
      value: Value,
      path: Path,
      fallback: Fallback,
    ) => Exclude<SafePathValueOf<Value, Path>, undefined> | Fallback
  >
>;
type _19c = Expect<
  Equal<ReturnType<typeof givenGetAtPath<GivenModel, "profile.name">>, string>
>;
type _19d = Expect<
  Equal<
    ReturnType<typeof givenGetAtPath<GivenModel, "settings.theme">>,
    "light" | "dark" | undefined
  >
>;
type _19e = Expect<
  Equal<ReturnType<typeof givenGetAtPath<{ a?: { b: 1 } }, "a.b">>, 1 | undefined>
>;
