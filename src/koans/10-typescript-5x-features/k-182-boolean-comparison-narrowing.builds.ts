import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-182: boolean comparison narrowing — constructions
 * =============================================================================
 *
 * A type predicate is a boolean with a second meaning attached: `entry is Text`
 * says that a `true` result *is* evidence about the argument. Before TypeScript
 * 5.3 that evidence survived only when the call sat directly in the condition;
 * comparing the result to a literal — `isText(entry) === true` — threw it away.
 * Since 5.3 all four spellings (`=== true`, `!== false`, `=== false`,
 * `!== true`) carry the same information, in the polarity they imply.
 *
 * What did *not* change is where the evidence comes from. Only a declared
 * `value is T` return type links a result back to an argument; an ordinary
 * `boolean` return compares just as well and tells the checker nothing. Model
 * both here, so the two branches of an honest predicate come out disjoint while
 * the two branches of a plain boolean function are the union you started with.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

interface TextEntry {
  kind: "text";
  text: string;
}

interface CountEntry {
  kind: "count";
  count: number;
}

interface EmptyEntry {
  kind: "empty";
}

type Entry = TextEntry | CountEntry;
type Wider = Entry | EmptyEntry;
type PlainBoolean = (entry: Entry) => boolean;
type CountGuard = (entry: Entry) => entry is CountEntry;

// ─── The predicate itself ─────────────────────────────────────────────

// 1. Build the predicate signature the rest of the file interrogates: it takes
//    an entry and reports, in the type system, that the entry is the text one.
export type TextGuard = TODO; // TODO(koan)

type _01a = Expect<Equal<Parameters<TextGuard>[0], Entry>>;
type _01b = Expect<Equal<ReturnType<TextGuard>, boolean>>;
type _01c = Expect<Equal<Parameters<TextGuard>["length"], 1>>;
type _01d = Expect<
  Equal<
    {
      aPredicateIsAlsoAPlainBooleanFunction: GivenExtends<TextGuard, PlainBoolean>;
      butAPlainBooleanIsNotAPredicate: GivenExtends<PlainBoolean, TextGuard>;
    },
    { aPredicateIsAlsoAPlainBooleanFunction: true; butAPlainBooleanIsNotAPredicate: false }
  >
>;

// 2. Build the reader that recovers what a signature asserts. The parameter of
//    the pattern has to be `any`: a predicate's target must be assignable to its
//    own parameter, so `never` there is rejected outright.
export type GuardTarget<Guard> = TODO; // TODO(koan)

type _02a = Expect<Equal<GuardTarget<TextGuard>, TextEntry>>;
type _02b = Expect<Equal<GuardTarget<CountGuard>, CountEntry>>;
type _02c = Expect<Equal<GuardTarget<PlainBoolean>, never>>;
type _02d = Expect<Equal<GuardTarget<string>, never>>;

// 3. Build the question that separates the two kinds of boolean function.
export type IsPredicate<Guard> = TODO; // TODO(koan)

type _03a = Expect<Equal<IsPredicate<TextGuard>, true>>;
type _03b = Expect<Equal<IsPredicate<CountGuard>, true>>;
type _03c = Expect<Equal<IsPredicate<PlainBoolean>, false>>;
type _03d = Expect<Equal<IsPredicate<never>, false>>;

// ─── The two branches ─────────────────────────────────────────────────

// 4. Build the branch a truthy comparison selects. A signature that asserts
//    nothing must leave the union alone — that is the honest model of a plain
//    boolean, and the reason `Extract` alone will not do.
export type WhenTrue<Union, Guard> = TODO; // TODO(koan)

type _04a = Expect<Equal<WhenTrue<Entry, TextGuard>, TextEntry>>;
type _04b = Expect<Equal<WhenTrue<Entry, CountGuard>, CountEntry>>;
type _04c = Expect<Equal<WhenTrue<Wider, TextGuard>, TextEntry>>;
type _04d = Expect<Equal<WhenTrue<Entry, PlainBoolean>, TextEntry | CountEntry>>;

// 5. Build the branch a falsy comparison selects.
export type WhenFalse<Union, Guard> = TODO; // TODO(koan)

type _05a = Expect<Equal<WhenFalse<Entry, TextGuard>, CountEntry>>;
type _05b = Expect<Equal<WhenFalse<Wider, TextGuard>, CountEntry | EmptyEntry>>;
type _05c = Expect<Equal<WhenFalse<Entry, PlainBoolean>, TextEntry | CountEntry>>;
type _05d = Expect<Equal<WhenFalse<never, TextGuard>, never>>;

// 6. Report both branches together. Disjointness is the observable difference:
//    a real predicate cuts the union in two, a plain boolean hands the same
//    union to both sides.
export type NarrowingSplit<Union, Guard> = TODO; // TODO(koan)

type _06a = Expect<Equal<NarrowingSplit<Entry, TextGuard>["whenTrue"], TextEntry>>;
type _06b = Expect<Equal<NarrowingSplit<Entry, TextGuard>["whenFalse"], CountEntry>>;
type _06c = Expect<Equal<NarrowingSplit<Entry, TextGuard>["branchesAreDisjoint"], true>>;
type _06d = Expect<Equal<NarrowingSplit<Entry, PlainBoolean>["branchesAreDisjoint"], false>>;
type _06e = Expect<Equal<NarrowingSplit<Entry, PlainBoolean>["narrowsAtAll"], false>>;

// ─── The four spellings ───────────────────────────────────────────────

// 7. Build the set of comparison forms 5.3 taught the checker to read.
export type ComparisonForm = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ComparisonForm, "equalsTrue" | "equalsFalse" | "notEqualsTrue" | "notEqualsFalse">
>;
type _07b = Expect<Equal<Extract<ComparisonForm, `not${string}`>, "notEqualsTrue" | "notEqualsFalse">>;
type _07c = Expect<Equal<Exclude<ComparisonForm, `not${string}`>, "equalsTrue" | "equalsFalse">>;
type _07d = Expect<Equal<Extract<ComparisonForm, "equalsTrue">, "equalsTrue">>;

// 8. Build the polarity each form asks for: `=== true` and `!== false` both
//    want the success branch, the other two want the failure branch.
export type SelectedBy<Form extends ComparisonForm> = TODO; // TODO(koan)

type _08a = Expect<Equal<SelectedBy<"equalsTrue">, true>>;
type _08b = Expect<Equal<SelectedBy<"notEqualsFalse">, true>>;
type _08c = Expect<Equal<SelectedBy<"equalsFalse">, false>>;
type _08d = Expect<Equal<SelectedBy<"notEqualsTrue">, false>>;
type _08e = Expect<Equal<SelectedBy<ComparisonForm>, boolean>>;

// 9. Build the narrowing a whole comparison performs — guard plus spelling.
export type NarrowedBy<Union, Guard, Form extends ComparisonForm> = TODO; // TODO(koan)

type _09a = Expect<Equal<NarrowedBy<Entry, TextGuard, "equalsTrue">, TextEntry>>;
type _09b = Expect<Equal<NarrowedBy<Entry, TextGuard, "notEqualsFalse">, TextEntry>>;
type _09c = Expect<Equal<NarrowedBy<Entry, TextGuard, "equalsFalse">, CountEntry>>;
type _09d = Expect<Equal<NarrowedBy<Entry, TextGuard, "notEqualsTrue">, CountEntry>>;

// 10. Build the table of all four at once, so the pairing is visible: four
//     spellings, two answers.
export type FormTable<Union, Guard> = TODO; // TODO(koan)

type _10a = Expect<Equal<FormTable<Entry, TextGuard>["equalsTrue"], TextEntry>>;
type _10b = Expect<Equal<FormTable<Entry, TextGuard>["notEqualsTrue"], CountEntry>>;
type _10c = Expect<
  Equal<
    keyof FormTable<Entry, TextGuard>,
    "equalsTrue" | "equalsFalse" | "notEqualsTrue" | "notEqualsFalse"
  >
>;
type _10d = Expect<Equal<FormTable<Entry, PlainBoolean>["equalsTrue"], TextEntry | CountEntry>>;

// 11. Build the inverse lookup: which spellings ask for a given polarity.
export type FormsSelecting<Polarity extends boolean> = TODO; // TODO(koan)

type _11a = Expect<Equal<FormsSelecting<true>, "equalsTrue" | "notEqualsFalse">>;
type _11b = Expect<Equal<FormsSelecting<false>, "equalsFalse" | "notEqualsTrue">>;
type _11c = Expect<
  Equal<FormsSelecting<boolean>, "equalsTrue" | "notEqualsFalse" | "equalsFalse" | "notEqualsTrue">
>;
type _11d = Expect<Equal<FormsSelecting<never>, never>>;

// ─── What is being compared against ───────────────────────────────────

// 12. Report how `boolean` relates to the two literals a comparison names.
export type BooleanLiteralProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<BooleanLiteralProfile["booleanIsTheUnionOfItsLiterals"], true>>;
type _12b = Expect<Equal<BooleanLiteralProfile["aLiteralFitsBoolean"], true>>;
type _12c = Expect<Equal<BooleanLiteralProfile["butBooleanDoesNotFitALiteral"], false>>;
type _12d = Expect<Equal<BooleanLiteralProfile["removingTrueLeavesFalse"], false>>;
type _12e = Expect<Equal<BooleanLiteralProfile["keepingTrueLeavesTrue"], true>>;

// 13. Build the result type of a predicate that may not have run — the third
//     state a comparison has to reckon with.
export type OptionalFlag = TODO; // TODO(koan)

type _13a = Expect<Equal<Extract<OptionalFlag, true>, true>>;
type _13b = Expect<Equal<Exclude<OptionalFlag, boolean>, undefined>>;
type _13c = Expect<Equal<NonNullable<OptionalFlag>, boolean>>;
type _13d = Expect<Equal<Exclude<OptionalFlag, true>, false | undefined>>;

// 14. Build the comparison itself, as a filter on the result value. Comparing
//     against a literal keeps only that literal — which is why `=== true`
//     disposes of `undefined` for free where a truthiness test would not.
export type ComparedWith<Value, Literal extends boolean> = TODO; // TODO(koan)

type _14a = Expect<Equal<ComparedWith<OptionalFlag, true>, true>>;
type _14b = Expect<Equal<ComparedWith<OptionalFlag, false>, false>>;
type _14c = Expect<Equal<ComparedWith<boolean, true>, true>>;
type _14d = Expect<Equal<ComparedWith<undefined, true>, never>>;
type _14e = Expect<Equal<ComparedWith<OptionalFlag, boolean>, boolean>>;

// 15. Report the boxed wrapper, which a comparison against `true` would not
//     accept in the way `Boolean(x)` suggests.
export type BoxedBooleanProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<BoxedBooleanProfile["thePrimitiveFitsTheWrapper"], true>>;
type _15b = Expect<Equal<BoxedBooleanProfile["theWrapperDoesNotFitThePrimitive"], false>>;
type _15c = Expect<Equal<BoxedBooleanProfile["theWrapperIsAnObject"], true>>;
type _15d = Expect<Equal<BoxedBooleanProfile["unwrappingGivesThePrimitive"], boolean>>;

// ─── The complement is relative ───────────────────────────────────────

// 16. Build the complement operator. The failure branch is only as precise as
//     the union the value had before the comparison — widen the input and the
//     `=== false` branch widens with it.
export type ComplementIn<Union, Target> = TODO; // TODO(koan)

type _16a = Expect<Equal<ComplementIn<Entry, TextEntry>, CountEntry>>;
type _16b = Expect<Equal<ComplementIn<Wider, TextEntry>, CountEntry | EmptyEntry>>;
type _16c = Expect<Equal<ComplementIn<never, TextEntry>, never>>;
type _16d = Expect<Equal<ComplementIn<unknown, TextEntry>, unknown>>;

// 17. Build the other signature that carries evidence — an assertion function.
//     It narrows by returning at all rather than by returning a value, so no
//     comparison against `true` applies to it.
export type AsserterOf<Target> = TODO; // TODO(koan)

type _17a = Expect<Equal<ReturnType<AsserterOf<TextEntry>>, void>>;
type _17b = Expect<
  Equal<
    {
      takesOneUnknownValue: Parameters<AsserterOf<TextEntry>>[0];
      andExactlyOneOfThem: Parameters<AsserterOf<TextEntry>>["length"];
    },
    { takesOneUnknownValue: unknown; andExactlyOneOfThem: 1 }
  >
>;
type _17c = Expect<Equal<IsPredicate<AsserterOf<TextEntry>>, false>>;
type _17d = Expect<
  Equal<GivenExtends<AsserterOf<TextEntry>, (value: unknown) => boolean>, false>
>;

// 18. Report one comparison at a glance: whether the signature carries evidence,
//     what it asserts, and where each polarity lands.
export type ComparisonReport<Union, Guard> = TODO; // TODO(koan)

type _18a = Expect<Equal<ComparisonReport<Entry, TextGuard>["carriesEvidence"], true>>;
type _18b = Expect<Equal<ComparisonReport<Entry, TextGuard>["asserts"], TextEntry>>;
type _18c = Expect<Equal<ComparisonReport<Entry, TextGuard>["onSuccess"], TextEntry>>;
type _18d = Expect<Equal<ComparisonReport<Wider, TextGuard>["onFailure"], CountEntry | EmptyEntry>>;
type _18e = Expect<Equal<ComparisonReport<Entry, PlainBoolean>["spellingsAgree"], true>>;
