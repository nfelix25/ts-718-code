import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-228: diagnostic, JavaScript and JSDoc differences — constructions
 * =============================================================================
 *
 * A reimplementation is where accumulated special cases get re-examined. Most of
 * what changes here is in checked JavaScript: a JSDoc `@enum` no longer gets
 * bespoke analysis, a bare `?` is not a type, and `@constructor` does not make a
 * constructor — each has an ordinary replacement that says the same thing in
 * syntax the checker already had.
 *
 * Two of the differences are not about JavaScript at all. Template-literal
 * inference now keeps an astral character whole rather than splitting its
 * surrogate pair, and diagnostic ordering and wording may differ without any
 * semantic change. Build the differences, their replacements, and the line
 * between "your program means something different" and "the message moved".
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The differences ──────────────────────────────────────────────────

// 1. Build the things that changed.
export type Difference = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    Difference,
    "template-unicode" | "js-value-as-type" | "js-enum" | "js-question" | "js-constructor" | "diagnostic-order"
  >
>;
type _01b = Expect<
  Equal<
    Extract<Difference, `js-${string}`>,
    "js-value-as-type" | "js-enum" | "js-question" | "js-constructor"
  >
>;
type _01c = Expect<
  Equal<Exclude<Difference, `js-${string}`>, "template-unicode" | "diagnostic-order">
>;
type _01d = Expect<Equal<Extract<Difference, "decorators">, never>>;

// 2. Build what each difference affects.
export type AffectedArea<TheDifference extends Difference> = TODO; // TODO(koan)

type _02a = Expect<Equal<AffectedArea<"js-enum">, "checked javascript">>;
type _02b = Expect<Equal<AffectedArea<"js-question">, "checked javascript">>;
type _02c = Expect<Equal<AffectedArea<"template-unicode">, "type inference">>;
type _02d = Expect<Equal<AffectedArea<"diagnostic-order">, "presentation">>;
type _02e = Expect<
  Equal<AffectedArea<Difference>, "checked javascript" | "type inference" | "presentation">
>;

// 3. Build the question that matters for a migration: could this change what a
//    program means?
export type ChangesMeaning<TheDifference extends Difference> = TODO; // TODO(koan)

type _03a = Expect<Equal<ChangesMeaning<"js-enum">, true>>;
type _03b = Expect<Equal<ChangesMeaning<"template-unicode">, true>>;
type _03c = Expect<Equal<ChangesMeaning<"diagnostic-order">, false>>;
type _03d = Expect<Equal<ChangesMeaning<Difference>, boolean>>;

// 4. Build the replacement each JavaScript difference has. None of them removes
//    an ability; each one removes a special case.
export type ReplacementFor<TheDifference extends Difference> = TODO; // TODO(koan)

type _04a = Expect<Equal<ReplacementFor<"js-value-as-type">, "typeof in the type position">>;
type _04b = Expect<Equal<ReplacementFor<"js-enum">, "a typedef of the value union">>;
type _04c = Expect<Equal<ReplacementFor<"js-question">, "any, written out">>;
type _04d = Expect<Equal<ReplacementFor<"js-constructor">, "a class declaration">>;
type _04e = Expect<Equal<ReplacementFor<"diagnostic-order">, "nothing to replace">>;

// ─── The JSDoc enum, in types ─────────────────────────────────────────

// 5. Build the value object a JSDoc enum was written as.
export type EnumValues<Members extends Record<string, string | number>> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<EnumValues<{ Draft: "draft"; Live: "live" }>, { readonly Draft: "draft"; readonly Live: "live" }>
>;
type _05b = Expect<Equal<keyof EnumValues<{ Draft: "draft" }>, "Draft">>;
type _05c = Expect<Equal<EnumValues<{ Draft: "draft" }>["Draft"], "draft">>;
type _05d = Expect<Equal<EnumValues<{}>, {}>>;

// 6. Build the type it should now be paired with — the union of its values,
//    written as an ordinary typedef.
export type EnumType<
  Members extends Record<string, string | number>,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<EnumType<{ Draft: "draft"; Live: "live" }>, "draft" | "live">>;
type _06b = Expect<Equal<EnumType<{ Zero: 0; One: 1 }>, 0 | 1>>;
type _06c = Expect<Equal<EnumType<{}>, never>>;
type _06d = Expect<Equal<EnumType<{ Draft: "draft" }>, "draft">>;

// 7. Build the pair, which is what the special case was doing implicitly.
export type RewrittenEnum<Members extends Record<string, string | number>> = TODO; // TODO(koan)

type _07a = Expect<Equal<RewrittenEnum<{ Draft: "draft" }>["values"], { readonly Draft: "draft" }>>;
type _07b = Expect<Equal<RewrittenEnum<{ Draft: "draft"; Live: "live" }>["type"], "draft" | "live">>;
type _07c = Expect<Equal<keyof RewrittenEnum<{}>, "values" | "type">>;
type _07d = Expect<Equal<RewrittenEnum<{ Draft: "draft" }>["values"]["Draft"], "draft">>;

// ─── The value-in-a-type-position case ────────────────────────────────

// 8. Build what a type position needs when what you have is a value: the query
//    that turns one into the other.
export type TypeOfValue<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<TypeOfValue<{ id: number }>, { id: number }>>;
type _08b = Expect<Equal<TypeOfValue<"draft">, "draft">>;
type _08c = Expect<Equal<TypeOfValue<typeof globalThis>, typeof globalThis>>;
type _08d = Expect<Equal<TypeOfValue<never>, never>>;

// 9. Build the classifier that keeps the two top types apart. It matters here
//    because the standalone `?` always meant `any`: writing it out preserves the
//    program, and writing `unknown` instead would not.
export type TopKind<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<TopKind<any>, "any">>;
type _09b = Expect<Equal<TopKind<unknown>, "unknown">>;
type _09c = Expect<Equal<TopKind<string>, "neither">>;
type _09d = Expect<Equal<TopKind<never>, "neither">>;
type _09e = Expect<
  Equal<
    {
      theShorthandMeantThis: TopKind<any>;
      andNotThis: TopKind<unknown>;
    },
    { theShorthandMeantThis: "any"; andNotThis: "unknown" }
  >
>;

// 10. Build the constructor replacement: a class declaration, whose instance type
//     and constructor come from the language rather than from a comment.
export type ClassShape<Instance, Parameters extends readonly unknown[]> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<InstanceType<ClassShape<{ id: number }, [number]>>, { id: number }>
>;
type _10b = Expect<
  Equal<ConstructorParameters<ClassShape<{ id: number }, [number]>>, [number]>
>;
type _10c = Expect<Equal<ConstructorParameters<ClassShape<{ id: number }, []>>, []>>;
type _10d = Expect<Equal<InstanceType<ClassShape<never, []>>, never>>;

// ─── Template inference and code points ───────────────────────────────

// 11. Build the two ways a string can be measured, which is what the template
//     inference change is about.
export type Measure = TODO; // TODO(koan)

type _11a = Expect<Equal<Measure, "code units" | "code points">>;
type _11b = Expect<Equal<Exclude<Measure, "code units">, "code points">>;
type _11c = Expect<Equal<Extract<Measure, `code ${string}`>, "code units" | "code points">>;
type _11d = Expect<Equal<Extract<Measure, "graphemes">, never>>;

// 12. Build what each compiler splits a template's first character by.
export type SplitsBy<Compiler extends "6.0" | "7.0"> = TODO; // TODO(koan)

type _12a = Expect<Equal<SplitsBy<"6.0">, "code units">>;
type _12b = Expect<Equal<SplitsBy<"7.0">, "code points">>;
type _12c = Expect<Equal<SplitsBy<"6.0" | "7.0">, "code units" | "code points">>;
type _12d = Expect<Equal<Equal<SplitsBy<"6.0">, SplitsBy<"7.0">>, false>>;

// 13. Build the observable consequence: an astral character survives the split
//     under one and is halved under the other.
export type FirstCharacterIntact<
  Compiler extends "6.0" | "7.0",
  Astral extends boolean,
> = TODO; // TODO(koan)

type _13a = Expect<Equal<FirstCharacterIntact<"7.0", true>, true>>;
type _13b = Expect<Equal<FirstCharacterIntact<"6.0", true>, false>>;
type _13c = Expect<Equal<FirstCharacterIntact<"6.0", false>, true>>;
type _13d = Expect<Equal<FirstCharacterIntact<"7.0", false>, true>>;

// ─── Reviewing a difference ───────────────────────────────────────────

// 14. Build the verdict a review reaches for one observed difference.
export type ReviewVerdict<TheDifference extends Difference> = TODO; // TODO(koan)

type _14a = Expect<Equal<ReviewVerdict<"js-enum">, "rewrite the source">>;
type _14b = Expect<Equal<ReviewVerdict<"js-question">, "rewrite the source">>;
type _14c = Expect<Equal<ReviewVerdict<"diagnostic-order">, "accept the new baseline">>;
type _14d = Expect<Equal<ReviewVerdict<"template-unicode">, "rewrite the source">>;

// 15. Build the work list a project has: the differences it actually hit, minus
//     the ones that are only presentation.
export type ActionableIn<Observed extends readonly Difference[]> = TODO; // TODO(koan)

type _15a = Expect<Equal<keyof ActionableIn<["js-enum", "diagnostic-order"]>, "js-enum">>;
type _15b = Expect<Equal<keyof ActionableIn<["diagnostic-order"]>, never>>;
type _15c = Expect<
  Equal<ActionableIn<["js-question"]>["js-question"], "any, written out">
>;
type _15d = Expect<Equal<ActionableIn<[]>, {}>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the differences by area.
export type AreaProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<AreaProfile["js-enum"], "checked javascript">>;
type _16b = Expect<Equal<AreaProfile["js-constructor"], "checked javascript">>;
type _16c = Expect<Equal<AreaProfile["template-unicode"], "type inference">>;
type _16d = Expect<Equal<AreaProfile["diagnostic-order"], "presentation">>;
type _16e = Expect<Equal<keyof AreaProfile, Difference>>;

// 17. Report the JSDoc enum end to end: why it was reported and what replaces it.
export type EnumProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<EnumProfile["area"], "checked javascript">>;
type _17b = Expect<Equal<EnumProfile["verdict"], "rewrite the source">>;
type _17c = Expect<Equal<EnumProfile["replacement"], "a typedef of the value union">>;
type _17d = Expect<
  Equal<EnumProfile["values"], { readonly Draft: "draft"; readonly Live: "live" }>
>;
type _17e = Expect<Equal<EnumProfile["type"], "draft" | "live">>;

// 18. Report one observed difference at a glance: where it lives, whether it
//     changes meaning, what to do, and what to write instead.
export type DifferenceReport<
  TheDifference extends Difference,
  Observed extends readonly Difference[],
> = TODO; // TODO(koan)

type _18a = Expect<Equal<DifferenceReport<"js-enum", ["js-enum"]>["area"], "checked javascript">>;
type _18b = Expect<Equal<DifferenceReport<"js-enum", ["js-enum"]>["changesMeaning"], true>>;
type _18c = Expect<
  Equal<DifferenceReport<"diagnostic-order", ["diagnostic-order"]>["verdict"], "accept the new baseline">
>;
type _18d = Expect<
  Equal<DifferenceReport<"js-constructor", ["js-constructor"]>["replacement"], "a class declaration">
>;
type _18e = Expect<
  Equal<DifferenceReport<"js-enum", ["js-enum", "diagnostic-order"]>["workList"], "js-enum">
>;
