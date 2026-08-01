import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-197: syntactic truthy and nullish checks — constructions
 * =============================================================================
 *
 * A few expressions are legal, well-typed, and almost certainly not what the
 * author meant: `if (/hex/)` tests an object that is always truthy,
 * `if (value => 0)` is an arrow function where `>=` was intended, and
 * `value < maximum ?? 100` parses as `(value < maximum) ?? 100`, whose left side
 * is a boolean and can therefore never be nullish. TypeScript 5.6 reports these
 * from syntax alone.
 *
 * The line it draws is worth building. "Always truthy" is a claim about the
 * *type* of the expression — every object is truthy, so a regex literal or an
 * arrow always is; and "the right side of `??` is unreachable" is a claim about
 * the left side never being nullish. Neither is a general theorem, and the
 * familiar constants `true`, `false`, `0` and `1` are deliberately exempt.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The vocabulary ───────────────────────────────────────────────────

// 1. Build the outcomes the check can reach.
export type SyntacticCheckKind = TODO; // TODO(koan)

type _01a = Expect<
  Equal<SyntacticCheckKind, "always-truthy" | "always-nullish" | "never-nullish" | "allowed-constant">
>;
type _01b = Expect<Equal<Extract<SyntacticCheckKind, `${string}nullish`>, "always-nullish" | "never-nullish">>;
type _01c = Expect<Equal<Extract<SyntacticCheckKind, "allowed-constant">, "allowed-constant">>;
type _01d = Expect<Equal<Extract<SyntacticCheckKind, "possibly-truthy">, never>>;

// 2. Build the shapes that trigger it.
export type SuspiciousSyntax = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    SuspiciousSyntax,
    "regex-condition" | "arrow-condition" | "comparison-before-coalesce" | "misplaced-parenthesis"
  >
>;
type _02b = Expect<Equal<Extract<SuspiciousSyntax, `${string}-condition`>, "regex-condition" | "arrow-condition">>;
type _02c = Expect<
  Equal<Exclude<SuspiciousSyntax, `${string}-condition`>, "comparison-before-coalesce" | "misplaced-parenthesis">
>;
type _02d = Expect<Equal<Extract<SuspiciousSyntax, "unused-variable">, never>>;

// 3. Build one row of the matrix, with the source text kept as a literal.
export type SyntacticCheckCase<Syntax extends string, Kind extends SyntacticCheckKind> = TODO; // TODO(koan)

type _03a = Expect<Equal<SyntacticCheckCase<"if (/hex/)", "always-truthy">["syntax"], "if (/hex/)">>;
type _03b = Expect<Equal<SyntacticCheckCase<"if (/hex/)", "always-truthy">["kind"], "always-truthy">>;
type _03c = Expect<Equal<keyof SyntacticCheckCase<"while (true)", "allowed-constant">, "syntax" | "kind">>;
type _03d = Expect<
  Equal<
    SyntacticCheckCase<"while (true)", "allowed-constant">,
    { syntax: "while (true)"; kind: "allowed-constant" }
  >
>;

// ─── What "always truthy" means ───────────────────────────────────────

// 4. Build the claim itself. It is a claim about the type: every object is
//    truthy, and a regex literal and an arrow function are both objects.
export type AlwaysTruthy<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<AlwaysTruthy<RegExp>, true>>;
type _04b = Expect<Equal<AlwaysTruthy<(value: number) => boolean>, true>>;
type _04c = Expect<Equal<AlwaysTruthy<boolean>, false>>;
type _04d = Expect<Equal<AlwaysTruthy<string>, false>>;
type _04e = Expect<Equal<AlwaysTruthy<0 | 1>, false>>;

// 5. Build the constants the check deliberately leaves alone, however truthy or
//    falsy they are.
export type AllowedConstant = TODO; // TODO(koan)

type _05a = Expect<Equal<AllowedConstant, boolean | 0 | 1>>;
type _05b = Expect<Equal<Extract<AllowedConstant, number>, 0 | 1>>;
type _05c = Expect<Equal<Extract<AllowedConstant, boolean>, boolean>>;
type _05d = Expect<Equal<Extract<AllowedConstant, 2>, never>>;

// 6. Build the exemption test.
export type IsAllowedConstant<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<IsAllowedConstant<true>, true>>;
type _06b = Expect<Equal<IsAllowedConstant<0>, true>>;
type _06c = Expect<Equal<IsAllowedConstant<2>, false>>;
type _06d = Expect<Equal<IsAllowedConstant<RegExp>, false>>;

// ─── What "never nullish" means ───────────────────────────────────────

// 7. Build the other claim: nothing on this side can be `null` or `undefined`,
//    so a `??` after it can never reach its right operand.
export type NeverNullish<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<NeverNullish<boolean>, true>>;
type _07b = Expect<Equal<NeverNullish<number>, true>>;
type _07c = Expect<Equal<NeverNullish<number | undefined>, false>>;
type _07d = Expect<Equal<NeverNullish<null>, false>>;

// 8. Build what `??` actually produces, so "unreachable" can be seen rather than
//    asserted.
export type CoalesceResult<Left, Right> = TODO; // TODO(koan)

type _08a = Expect<Equal<CoalesceResult<boolean, 100>, boolean>>;
type _08b = Expect<Equal<CoalesceResult<number | undefined, 100>, number | 100>>;
type _08c = Expect<Equal<CoalesceResult<string | null, "fallback">, string | "fallback">>;
type _08d = Expect<Equal<CoalesceResult<undefined, 1>, 1>>;

// 9. Build the reachability question the diagnostic is really asking.
export type RightSideReachable<Left> = TODO; // TODO(koan)

type _09a = Expect<Equal<RightSideReachable<boolean>, false>>;
type _09b = Expect<Equal<RightSideReachable<number | undefined>, true>>;
type _09c = Expect<Equal<RightSideReachable<number>, false>>;
type _09d = Expect<Equal<RightSideReachable<null | string>, true>>;

// ─── The precedence that causes it ────────────────────────────────────

// 10. Build how each spelling parses. `<` binds tighter than `??`, which is the
//     whole of the mistake.
export type ParsedAs<Form extends "unparenthesised" | "parenthesised"> = TODO; // TODO(koan)

type _10a = Expect<Equal<ParsedAs<"unparenthesised">, "(value < maximum) ?? 100">>;
type _10b = Expect<Equal<ParsedAs<"parenthesised">, "value < (maximum ?? 100)">>;
type _10c = Expect<
  Equal<ParsedAs<"unparenthesised" | "parenthesised">, "(value < maximum) ?? 100" | "value < (maximum ?? 100)">
>;
type _10d = Expect<Equal<Equal<ParsedAs<"unparenthesised">, ParsedAs<"parenthesised">>, false>>;

// 11. Build the type of the left operand each parse produces. One is a boolean
//     that can never be nullish; the other is the number the author meant.
export type LeftOperandOf<Form extends "unparenthesised" | "parenthesised"> = TODO; // TODO(koan)

type _11a = Expect<Equal<LeftOperandOf<"unparenthesised">, boolean>>;
type _11b = Expect<Equal<LeftOperandOf<"parenthesised">, number | undefined>>;
type _11c = Expect<Equal<RightSideReachable<LeftOperandOf<"unparenthesised">>, false>>;
type _11d = Expect<Equal<RightSideReachable<LeftOperandOf<"parenthesised">>, true>>;

// ─── The verdict ──────────────────────────────────────────────────────

// 12. Build the diagnosis for a condition expression.
export type DiagnoseCondition<Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<DiagnoseCondition<RegExp>, "always-truthy">>;
type _12b = Expect<Equal<DiagnoseCondition<() => boolean>, "always-truthy">>;
type _12c = Expect<Equal<DiagnoseCondition<true>, "allowed-constant">>;
type _12d = Expect<Equal<DiagnoseCondition<string>, "allowed-constant">>;

// 13. Build the diagnosis for the left side of a `??`.
export type DiagnoseCoalesce<Left> = TODO; // TODO(koan)

type _13a = Expect<Equal<DiagnoseCoalesce<boolean>, "never-nullish">>;
type _13b = Expect<Equal<DiagnoseCoalesce<undefined>, "always-nullish">>;
type _13c = Expect<Equal<DiagnoseCoalesce<number | undefined>, "allowed-constant">>;
type _13d = Expect<Equal<DiagnoseCoalesce<null>, "always-nullish">>;

// 14. Build what the compiler does with each verdict.
export type Verdict<Kind extends SyntacticCheckKind> = TODO; // TODO(koan)

type _14a = Expect<Equal<Verdict<"always-truthy">, "diagnostic">>;
type _14b = Expect<Equal<Verdict<"never-nullish">, "diagnostic">>;
type _14c = Expect<Equal<Verdict<"allowed-constant">, "allowed">>;
type _14d = Expect<Equal<Verdict<SyntacticCheckKind>, "diagnostic" | "allowed">>;

// 15. Build the spelling the author almost certainly meant.
export type CorrectedForm<Syntax extends SuspiciousSyntax> = TODO; // TODO(koan)

type _15a = Expect<Equal<CorrectedForm<"regex-condition">, "if (/hex/.test(input))">>;
type _15b = Expect<Equal<CorrectedForm<"arrow-condition">, "if (value >= 0)">>;
type _15c = Expect<Equal<CorrectedForm<"comparison-before-coalesce">, "value < (maximum ?? 100)">>;
type _15d = Expect<Equal<CorrectedForm<"misplaced-parenthesis">, "value < (maximum ?? 100)">>;

// ─── Reading the matrix back ──────────────────────────────────────────

// 16. Report the four rows the koan collects.
export type CaseProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<CaseProfile["aRegexCondition"], "diagnostic">>;
type _16b = Expect<Equal<CaseProfile["anArrowCondition"], "diagnostic">>;
type _16c = Expect<Equal<CaseProfile["aComparisonBeforeCoalesce"], "diagnostic">>;
type _16d = Expect<Equal<CaseProfile["aConstantCondition"], "allowed">>;

// 17. Report the precedence pair: same characters, one pair of parentheses, two
//     entirely different programs.
export type PrecedenceProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<PrecedenceProfile["asWritten"], "(value < maximum) ?? 100">>;
type _17b = Expect<Equal<PrecedenceProfile["asMeant"], "value < (maximum ?? 100)">>;
type _17c = Expect<Equal<PrecedenceProfile["theLeftSideAsWritten"], boolean>>;
type _17d = Expect<Equal<PrecedenceProfile["theFallbackIsUnreachable"], false>>;
type _17e = Expect<Equal<PrecedenceProfile["andTheCoalesceProducesNothingNew"], boolean>>;

// 18. Report one expression at a glance: what the check concludes, whether that
//     is reported, and what to write instead.
export type SyntacticCheckReport<Value, Syntax extends SuspiciousSyntax> = TODO; // TODO(koan)

type _18a = Expect<Equal<SyntacticCheckReport<RegExp, "regex-condition">["asACondition"], "always-truthy">>;
type _18b = Expect<Equal<SyntacticCheckReport<RegExp, "regex-condition">["reported"], "diagnostic">>;
type _18c = Expect<
  Equal<SyntacticCheckReport<RegExp, "regex-condition">["writeInstead"], "if (/hex/.test(input))">
>;
type _18d = Expect<Equal<SyntacticCheckReport<boolean, "comparison-before-coalesce">["asACoalesceLeftSide"], "never-nullish">>;
type _18e = Expect<Equal<SyntacticCheckReport<true, "arrow-condition">["exempt"], true>>;
