import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-214: the ES2025 lib and RegExp.escape — constructions
 * =============================================================================
 *
 * `target` decides what syntax is emitted; `lib` decides what declarations are
 * assumed to exist. They are separate questions, and TypeScript 6.0 accepts
 * ES2025 for both — promoting `RegExp.escape`, `Promise.try`, the iterator
 * helpers and the modern Set operations out of ESNext and into a numbered
 * edition, which is the point at which they are safe to depend on.
 *
 * `RegExp.escape(text)` is the one worth being careful about. It makes arbitrary
 * text safe *as a literal fragment* inside a pattern you are about to build. It
 * does not validate a pattern, does not anchor anything, and adds no word
 * boundaries — the caller still writes those. Build the availability rule, the
 * signatures, and the set operations' element types.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Target and lib are different questions ───────────────────────────

// 1. Build the two things a project configures separately.
export type Concern = TODO; // TODO(koan)

type _01a = Expect<Equal<Concern, "syntax emit" | "declaration availability">>;
type _01b = Expect<Equal<Exclude<Concern, "syntax emit">, "declaration availability">>;
type _01c = Expect<Equal<Extract<Concern, `${string}emit`>, "syntax emit">>;
type _01d = Expect<Equal<Extract<Concern, "module resolution">, never>>;

// 2. Build which option answers each of them.
export type ControlledBy<TheConcern extends Concern> = TODO; // TODO(koan)

type _02a = Expect<Equal<ControlledBy<"syntax emit">, "target">>;
type _02b = Expect<Equal<ControlledBy<"declaration availability">, "lib">>;
type _02c = Expect<Equal<ControlledBy<Concern>, "target" | "lib">>;
type _02d = Expect<Equal<Equal<ControlledBy<"syntax emit">, ControlledBy<"declaration availability">>, false>>;

// 3. Build the library editions in play, in order.
export type LibEdition = TODO; // TODO(koan)

type _03a = Expect<Equal<LibEdition, "es2023" | "es2024" | "es2025" | "esnext">>;
type _03b = Expect<Equal<Extract<LibEdition, `es${number}`>, "es2023" | "es2024" | "es2025">>;
type _03c = Expect<Equal<Exclude<LibEdition, `es${number}`>, "esnext">>;
type _03d = Expect<Equal<Extract<LibEdition, "es5">, never>>;

// 4. Build the APIs this release promoted.
export type PromotedApi = TODO; // TODO(koan)

type _04a = Expect<
  Equal<PromotedApi, "RegExp.escape" | "Promise.try" | "Iterator.from" | "Set.union" | "Set.intersection">
>;
type _04b = Expect<Equal<Extract<PromotedApi, `Set.${string}`>, "Set.union" | "Set.intersection">>;
type _04c = Expect<Equal<Extract<PromotedApi, `${string}.escape`>, "RegExp.escape">>;
type _04d = Expect<Equal<Extract<PromotedApi, "Array.fromAsync">, never>>;

// 5. Build the availability rule: a promoted API needs a library edition that
//    contains it, and the numbered edition is what makes it a commitment.
export type AvailableUnder<Lib extends LibEdition> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    AvailableUnder<"es2025">,
    "RegExp.escape" | "Promise.try" | "Iterator.from" | "Set.union" | "Set.intersection"
  >
>;
type _05b = Expect<
  Equal<
    AvailableUnder<"esnext">,
    "RegExp.escape" | "Promise.try" | "Iterator.from" | "Set.union" | "Set.intersection"
  >
>;
type _05c = Expect<Equal<AvailableUnder<"es2024">, never>>;
type _05d = Expect<Equal<Extract<AvailableUnder<"es2023">, "RegExp.escape">, never>>;

// 6. Build the per-API question a call site actually asks.
export type IsAvailable<
  Api extends PromotedApi,
  Lib extends LibEdition,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<IsAvailable<"RegExp.escape", "es2025">, true>>;
type _06b = Expect<Equal<IsAvailable<"RegExp.escape", "es2024">, false>>;
type _06c = Expect<Equal<IsAvailable<"Set.union", "esnext">, true>>;
type _06d = Expect<Equal<IsAvailable<"Promise.try", "es2023">, false>>;

// ─── RegExp.escape ────────────────────────────────────────────────────

// 7. Build its signature. Text in, text out — the type says nothing about
//    patterns, because the result is still just a string.
export type EscapeSignature = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<EscapeSignature>, [string]>>;
type _07b = Expect<Equal<ReturnType<EscapeSignature>, string>>;
type _07c = Expect<Equal<Equal<EscapeSignature, typeof RegExp.escape>, true>>;
type _07d = Expect<Equal<Parameters<EscapeSignature>["length"], 1>>;

// 8. Build what a caller does with the result: interpolate it into a pattern.
//    Escaping produced a fragment, not a pattern.
export type PatternFrom<Fragment extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<PatternFrom<"a\\.b">, "a\\.b">>;
type _08b = Expect<Equal<PatternFrom<"">, "">>;
type _08c = Expect<
  Equal<
    {
      theFragmentIsStillAString: GivenExtends<PatternFrom<"a">, string>;
      andItIsExactlyWhatWentIn: PatternFrom<"a">;
    },
    { theFragmentIsStillAString: true; andItIsExactlyWhatWentIn: "a" }
  >
>;
type _08d = Expect<Equal<Equal<PatternFrom<"a">, "a">, true>>;

// 9. Build the anchoring the caller still has to write, so the difference is on
//    the page rather than in the prose.
export type AnchoredPattern<Fragment extends string> = TODO; // TODO(koan)

type _09a = Expect<Equal<AnchoredPattern<"a\\.b">, "^a\\.b$">>;
type _09b = Expect<Equal<Equal<AnchoredPattern<"a">, PatternFrom<"a">>, false>>;
type _09c = Expect<
  Equal<AnchoredPattern<"a"> extends `^${infer Inner}$` ? Inner : never, "a">
>;
type _09d = Expect<Equal<AnchoredPattern<"">, "^$">>;

// 10. Build the claims about escaping, and which of them hold.
export type EscapeClaim = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    EscapeClaim,
    "theFragmentIsLiteral" | "thePatternIsValid" | "theMatchIsAnchored" | "wordBoundariesWereAdded"
  >
>;
type _10b = Expect<Equal<Extract<EscapeClaim, `the${string}`>, "theFragmentIsLiteral" | "thePatternIsValid" | "theMatchIsAnchored">>;
type _10c = Expect<Equal<Extract<EscapeClaim, `word${string}`>, "wordBoundariesWereAdded">>;
type _10d = Expect<Equal<Extract<EscapeClaim, "theInputWasValidated">, never>>;

// 11. Build the answer. Exactly one.
export type GuaranteedByEscape<Claim extends EscapeClaim> = TODO; // TODO(koan)

type _11a = Expect<Equal<GuaranteedByEscape<"theFragmentIsLiteral">, true>>;
type _11b = Expect<Equal<GuaranteedByEscape<"thePatternIsValid">, false>>;
type _11c = Expect<Equal<GuaranteedByEscape<"theMatchIsAnchored">, false>>;
type _11d = Expect<Equal<GuaranteedByEscape<"wordBoundariesWereAdded">, false>>;
type _11e = Expect<Equal<GuaranteedByEscape<EscapeClaim>, boolean>>;

// ─── The set operations ───────────────────────────────────────────────

// 12. Build the union operation's result type. Either side's members qualify, so
//     the element type is the union of both.
export type SetUnion<Left, Right> = TODO; // TODO(koan)

type _12a = Expect<Equal<SetUnion<string, number>, Set<string | number>>>;
type _12b = Expect<Equal<SetUnion<"a", "b">, Set<"a" | "b">>>;
type _12c = Expect<Equal<SetUnion<string, never>, Set<string>>>;
type _12d = Expect<Equal<ReturnType<SetUnion<string, number>["has"]>, boolean>>;

// 13. Build the intersection's result type, which is the interesting one: only
//     members of both, so the element type is the intersection.
export type SetIntersection<Left, Right> = TODO; // TODO(koan)

type _13a = Expect<Equal<SetIntersection<string, string>, Set<string>>>;
type _13b = Expect<Equal<SetIntersection<string | number, string>, Set<string>>>;
type _13c = Expect<Equal<SetIntersection<{ a: 1 }, { b: 2 }>, Set<{ a: 1 } & { b: 2 }>>>;
type _13d = Expect<
  Equal<Equal<SetIntersection<string, number>, SetUnion<string, number>>, false>
>;

// 14. Build the difference, which keeps only the left side's element type
//     however wide the other set is.
export type SetDifference<Left, Right> = TODO; // TODO(koan)

type _14a = Expect<Equal<SetDifference<string, number>, Set<string>>>;
type _14b = Expect<Equal<SetDifference<string, string>, Set<string>>>;
type _14c = Expect<Equal<SetDifference<"a" | "b", "b">, Set<"a" | "b">>>;
type _14d = Expect<Equal<Equal<SetDifference<string, number>, SetUnion<string, number>>, false>>;

// 15. Build the predicate operations' shape: they answer a question rather than
//     producing a set, so nothing about element types survives.
export type SetPredicate = TODO; // TODO(koan)

type _15a = Expect<Equal<ReturnType<SetPredicate>, boolean>>;
type _15b = Expect<Equal<Parameters<SetPredicate>[0], ReadonlySetLike<unknown>>>;
type _15c = Expect<Equal<Equal<SetPredicate, Set<string>["isSubsetOf"]>, true>>;
type _15d = Expect<Equal<Parameters<SetPredicate>["length"], 1>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the promoted APIs against two library editions.
export type AvailabilityProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    AvailabilityProfile["underEs2025"],
    "RegExp.escape" | "Promise.try" | "Iterator.from" | "Set.union" | "Set.intersection"
  >
>;
type _16b = Expect<Equal<AvailabilityProfile["underEs2024"], never>>;
type _16c = Expect<Equal<AvailabilityProfile["escapeIsThere"], true>>;
type _16d = Expect<Equal<AvailabilityProfile["escapeIsNotYet"], false>>;
type _16e = Expect<Equal<AvailabilityProfile["andLibIsWhatDecidesIt"], "lib">>;

// 17. Report what escaping gives you and what it leaves to you.
export type EscapeProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<EscapeProfile["theResultIsStillJustText"], string>>;
type _17b = Expect<Equal<EscapeProfile["interpolatedAsWritten"], "a\\.b">>;
type _17c = Expect<Equal<EscapeProfile["anchoredByHand"], "^a\\.b$">>;
type _17d = Expect<Equal<EscapeProfile["andAnchoringWasNotIncluded"], false>>;
type _17e = Expect<Equal<ReturnType<EscapeProfile["signature"]>, string>>;

// 18. Report one API at a glance: whether the configured library has it, which
//     option decides that, and — for the set operations — what it produces.
export type ApiReport<Api extends PromotedApi, Lib extends LibEdition, Left, Right> = TODO; // TODO(koan)

type _18a = Expect<Equal<ApiReport<"Set.union", "es2025", string, number>["available"], true>>;
type _18b = Expect<Equal<ApiReport<"Set.union", "es2024", string, number>["available"], false>>;
type _18c = Expect<
  Equal<ApiReport<"Set.union", "es2025", string, number>["unionResult"], Set<string | number>>
>;
type _18d = Expect<
  Equal<ApiReport<"Set.union", "es2025", string | number, string>["intersectionResult"], Set<string>>
>;
type _18e = Expect<
  Equal<ApiReport<"Set.union", "es2025", string, number>["differenceResult"], Set<string>>
>;
