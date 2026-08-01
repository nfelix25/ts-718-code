import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-183: Symbol.hasInstance narrowing — constructions
 * =============================================================================
 *
 * `instanceof` is not fixed. If the right-hand value declares a static
 * `[Symbol.hasInstance]` method, JavaScript calls it instead of walking the
 * prototype chain, and since TypeScript 5.3 the checker reads a type predicate
 * on that method: `value instanceof Point` narrows to whatever
 * `Point[Symbol.hasInstance]` says it proves, not to `Point`.
 *
 * That gap is the whole subject. A matcher may assert a structural `PointLike`,
 * so a bare `{ x, y }` object passes `instanceof Point` and still has none of
 * Point's prototype methods; a matcher may assert a primitive, so `undefined`
 * can be `instanceof` something; and a matcher that returns plain `boolean`
 * asserts nothing at all, leaving the ordinary instance check in place. Model
 * the constructor side, the target it declares, and the distance between them.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

interface PointLike {
  x: number;
  y: number;
}

declare class Point implements PointLike {
  x: number;
  y: number;
  distanceFromOrigin(): number;
  static [Symbol.hasInstance](value: unknown): value is PointLike;
}

declare class UndefinedMatcher {
  static [Symbol.hasInstance](value: unknown): value is undefined;
}

declare class PlainMatcher {
  static [Symbol.hasInstance](value: unknown): boolean;
}

// ─── Finding the matcher ──────────────────────────────────────────────

// 1. Build the key a custom matcher hangs on. It is a `unique symbol`, so it is
//    one particular symbol rather than the whole `symbol` type.
export type HasInstanceKey = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<keyof typeof Point, HasInstanceKey>, typeof Symbol.hasInstance>>;
type _01b = Expect<Equal<Extract<keyof PointLike, HasInstanceKey>, never>>;
type _01c = Expect<
  Equal<
    {
      theKeyIsSomeSymbol: GivenExtends<HasInstanceKey, symbol>;
      butNotJustAnySymbol: GivenExtends<symbol, HasInstanceKey>;
    },
    { theKeyIsSomeSymbol: true; butNotJustAnySymbol: false }
  >
>;
type _01d = Expect<Equal<Extract<keyof Point, HasInstanceKey>, never>>;

// 2. Build the reader that lifts the matcher method off a constructor's static
//    side.
export type MatcherOf<Ctor> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    {
      takesOneUnknownValue: Parameters<MatcherOf<typeof Point>>[0];
      andExactlyOneOfThem: Parameters<MatcherOf<typeof Point>>["length"];
    },
    { takesOneUnknownValue: unknown; andExactlyOneOfThem: 1 }
  >
>;
type _02b = Expect<Equal<ReturnType<MatcherOf<typeof Point>>, boolean>>;
type _02c = Expect<Equal<ReturnType<MatcherOf<typeof PlainMatcher>>, boolean>>;
type _02d = Expect<Equal<MatcherOf<{ x: number }>, never>>;

// 3. Build the reader for what the matcher *asserts*. Match the predicate in
//    the pattern itself: a method that returns plain `boolean` must not match,
//    and neither must a `never` that would satisfy every pattern by default.
export type MatchTarget<Ctor> = TODO; // TODO(koan)

type _03a = Expect<Equal<MatchTarget<typeof Point>, PointLike>>;
type _03b = Expect<Equal<MatchTarget<typeof UndefinedMatcher>, undefined>>;
type _03c = Expect<Equal<MatchTarget<typeof PlainMatcher>, never>>;
type _03d = Expect<Equal<MatchTarget<{ x: number }>, never>>;

// 4. Build the ordinary side of `instanceof`: the instance type a constructor
//    produces, which is what the prototype-chain check would prove.
export type InstanceOf<Ctor> = TODO; // TODO(koan)

type _04a = Expect<Equal<InstanceOf<typeof Point>, Point>>;
type _04b = Expect<Equal<InstanceOf<typeof PlainMatcher>, PlainMatcher>>;
type _04c = Expect<Equal<InstanceOf<string>, never>>;
type _04d = Expect<Equal<InstanceOf<typeof Point>["distanceFromOrigin"], () => number>>;

// 5. Build the question the checker asks first: is there a predicate matcher to
//    honour at all?
export type UsesCustomMatcher<Ctor> = TODO; // TODO(koan)

type _05a = Expect<Equal<UsesCustomMatcher<typeof Point>, true>>;
type _05b = Expect<Equal<UsesCustomMatcher<typeof UndefinedMatcher>, true>>;
type _05c = Expect<Equal<UsesCustomMatcher<typeof PlainMatcher>, false>>;
type _05d = Expect<Equal<UsesCustomMatcher<typeof Date>, false>>;

// ─── What the operator produces ───────────────────────────────────────

// 6. Build the result of `value instanceof Ctor`: the declared target when there
//    is one, the instance type otherwise.
export type NarrowedByInstanceOf<Ctor> = TODO; // TODO(koan)

type _06a = Expect<Equal<NarrowedByInstanceOf<typeof Point>, PointLike>>;
type _06b = Expect<Equal<NarrowedByInstanceOf<typeof UndefinedMatcher>, undefined>>;
type _06c = Expect<Equal<NarrowedByInstanceOf<typeof PlainMatcher>, PlainMatcher>>;
type _06d = Expect<Equal<NarrowedByInstanceOf<typeof Date>, Date>>;

// 7. Report the gap between the two. The instance satisfies the target, but the
//    target is the weaker claim — which is exactly what a match hands you.
export type MatcherGap<Ctor> = TODO; // TODO(koan)

type _07a = Expect<Equal<MatcherGap<typeof Point>["target"], PointLike>>;
type _07b = Expect<Equal<MatcherGap<typeof Point>["instance"], Point>>;
type _07c = Expect<Equal<MatcherGap<typeof Point>["everyInstanceFitsTheTarget"], true>>;
type _07d = Expect<Equal<MatcherGap<typeof Point>["butAMatchIsNotAnInstance"], false>>;
type _07e = Expect<Equal<MatcherGap<typeof Point>["membersOnlyTheInstanceHas"], "distanceFromOrigin">>;

// 8. Build the shape any value must have to be usable on the right of
//    `instanceof` — no class required, an object literal type will do.
export type MatcherFor<Target> = TODO; // TODO(koan)

type _08a = Expect<Equal<MatchTarget<MatcherFor<PointLike>>, PointLike>>;
type _08b = Expect<Equal<MatchTarget<MatcherFor<string>>, string>>;
type _08c = Expect<Equal<MatchTarget<MatcherFor<undefined>>, undefined>>;
type _08d = Expect<Equal<keyof MatcherFor<PointLike>, typeof Symbol.hasInstance>>;

// ─── Narrowing a real value ───────────────────────────────────────────

// 9. Build the then-branch. Narrowing `unknown` lands exactly on the target;
//    narrowing an existing union keeps only the members that fit it.
export type NarrowFrom<Source, Ctor> = TODO; // TODO(koan)

type _09a = Expect<Equal<NarrowFrom<unknown, typeof Point>, PointLike>>;
type _09b = Expect<Equal<NarrowFrom<PointLike | string, typeof Point>, PointLike>>;
type _09c = Expect<Equal<NarrowFrom<Point | string, typeof Point>, Point>>;
type _09d = Expect<Equal<NarrowFrom<string | number, typeof Point>, never>>;
type _09e = Expect<Equal<NarrowFrom<unknown, typeof UndefinedMatcher>, undefined>>;

// 10. Build the else-branch. A match carries information; a failure to match
//     carries almost none — from `unknown` the negative branch is still
//     `unknown`, because nothing was ever excluded.
export type ElseBranch<Source, Ctor> = TODO; // TODO(koan)

type _10a = Expect<Equal<ElseBranch<unknown, typeof Point>, unknown>>;
type _10b = Expect<Equal<ElseBranch<PointLike | string, typeof Point>, string>>;
type _10c = Expect<Equal<ElseBranch<Point | string, typeof Point>, string>>;
type _10d = Expect<Equal<ElseBranch<unknown, typeof UndefinedMatcher>, unknown>>;

// 11. Build the check for where a matcher may be declared: on the constructor,
//     never on the instances it makes.
export type DeclaresMatcher<Owner> = TODO; // TODO(koan)

type _11a = Expect<Equal<DeclaresMatcher<typeof Point>, true>>;
type _11b = Expect<Equal<DeclaresMatcher<Point>, false>>;
type _11c = Expect<Equal<DeclaresMatcher<typeof PlainMatcher>, true>>;
type _11d = Expect<Equal<DeclaresMatcher<PointLike>, false>>;

// ─── Honest and dishonest matchers ────────────────────────────────────

// 12. Build the sanity check a matcher ought to pass: its own instances should
//     satisfy what it claims to prove.
export type AdmitsItsOwnInstances<Ctor> = TODO; // TODO(koan)

type _12a = Expect<Equal<AdmitsItsOwnInstances<typeof Point>, true>>;
type _12b = Expect<Equal<AdmitsItsOwnInstances<typeof UndefinedMatcher>, false>>;
type _12c = Expect<Equal<AdmitsItsOwnInstances<typeof Date>, false>>;
type _12d = Expect<Equal<AdmitsItsOwnInstances<MatcherFor<PointLike>>, true>>;

// 13. Build the converse: can a successful `instanceof` hand back something that
//     was never constructed by this class? With the ordinary prototype check the
//     answer is no; a structural or primitive target changes that.
export type MatchesNonInstances<Ctor> = TODO; // TODO(koan)

type _13a = Expect<Equal<MatchesNonInstances<typeof Point>, true>>;
type _13b = Expect<Equal<MatchesNonInstances<typeof UndefinedMatcher>, true>>;
type _13c = Expect<Equal<MatchesNonInstances<typeof PlainMatcher>, false>>;
type _13d = Expect<Equal<MatchesNonInstances<typeof Date>, false>>;

// 14. Report the matcher that declares itself but proves nothing. It is a legal
//     `Symbol.hasInstance`; it simply returns `boolean`, so 5.3 has no predicate
//     to read and the prototype check stands.
export type PlainMatcherProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<PlainMatcherProfile["declaresAMatcher"], true>>;
type _14b = Expect<Equal<PlainMatcherProfile["whichTypechecks"], boolean>>;
type _14c = Expect<Equal<PlainMatcherProfile["butAssertsNothing"], never>>;
type _14d = Expect<Equal<PlainMatcherProfile["soNarrowingFallsBackToTheInstance"], PlainMatcher>>;

// 15. Report the primitive target. `undefined instanceof UndefinedMatcher` is a
//     legal question, and its answer narrows to a type with no object in it.
export type PrimitiveTargetProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<PrimitiveTargetProfile["target"], undefined>>;
type _15b = Expect<Equal<PrimitiveTargetProfile["whichIsNotAnObject"], false>>;
type _15c = Expect<Equal<PrimitiveTargetProfile["narrowingUnknownLandsOnIt"], undefined>>;
type _15d = Expect<Equal<PrimitiveTargetProfile["andTheInstanceTypeIsUnrelated"], false>>;

// 16. Report what starting from `unknown` costs. `Extract` and `Exclude` cannot
//     take `unknown` apart, so only the positive branch learns anything.
export type UnknownSourceProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<UnknownSourceProfile["thenBranch"], PointLike>>;
type _16b = Expect<Equal<UnknownSourceProfile["elseBranch"], unknown>>;
type _16c = Expect<Equal<UnknownSourceProfile["keepingFromUnknownIsEmpty"], never>>;
type _16d = Expect<Equal<UnknownSourceProfile["removingFromUnknownChangesNothing"], unknown>>;

// 17. Build the list of members a match actually licenses you to read.
export type ReadableAfterMatch<Ctor> = TODO; // TODO(koan)

type _17a = Expect<Equal<ReadableAfterMatch<typeof Point>, "x" | "y">>;
type _17b = Expect<Equal<ReadableAfterMatch<typeof UndefinedMatcher>, never>>;
type _17c = Expect<Equal<ReadableAfterMatch<typeof PlainMatcher>, never>>;
type _17d = Expect<Equal<Exclude<keyof Point, ReadableAfterMatch<typeof Point>>, "distanceFromOrigin">>;

// 18. Report one `instanceof` at a glance: whether a matcher is in play, what it
//     proves, what each branch sees, and whether the answer can be something the
//     constructor never made.
export type HasInstanceReport<Source, Ctor> = TODO; // TODO(koan)

type _18a = Expect<Equal<HasInstanceReport<unknown, typeof Point>["custom"], true>>;
type _18b = Expect<Equal<HasInstanceReport<unknown, typeof Point>["proves"], PointLike>>;
type _18c = Expect<Equal<HasInstanceReport<Point | string, typeof Point>["thenBranch"], Point>>;
type _18d = Expect<Equal<HasInstanceReport<Point | string, typeof Point>["elseBranch"], string>>;
type _18e = Expect<Equal<HasInstanceReport<unknown, typeof Date>["mayMatchNonInstances"], false>>;
