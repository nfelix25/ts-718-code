import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-117: depth limits and path-lens capstone — constructions
 * =============================================================================
 *
 * A visited-shape guard stops a cycle by recognising a type. A depth budget stops
 * every branch after a predictable amount of work, whether or not any shape ever
 * repeats. These constructions build that budget as fuel — a tuple whose head is
 * consumed before each descent and whose emptiness ends the recursion — and then
 * spend the finite vocabulary it produces on a lens whose path, getter result,
 * and setter input all stay correlated. The budget is an approximation on
 * purpose: a cyclic shape becomes finite, and paths past the budget are simply
 * absent from the vocabulary even though the parser could still resolve them.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenModel = {
  id: string;
  profile: { name: string; contact: { email: string } };
  settings?: { theme: "light" | "dark" };
  rows: readonly { id: number }[];
};
type GivenNode = { id: number; next?: GivenNode };
type GivenShape = { a: { b: { c: 1 } }; x: 2 };
type GivenArrayModel = { config?: { retries: 0 | 1 | 2 }; rows: { id: number }[] };

// ─── Fuel ─────────────────────────────────────────────────────────────

// 1. Build the leaf policy. Arrays and tuples are leaves for this vocabulary,
//    which is why an index never appears in a path.
export type LensPathLeaf = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<LensPathLeaf, Date | RegExp>, Date | RegExp>>;
type _01b = Expect<Equal<Extract<LensPathLeaf, bigint | symbol>, bigint | symbol>>;
type _01c = Expect<
  Equal<
    {
      extracted: Extract<LensPathLeaf, Promise<unknown>>;
      accepts: readonly { id: 1 }[] extends LensPathLeaf ? true : false;
    },
    { extracted: Promise<unknown>; accepts: true }
  >
>;
type _01d = Expect<
  Equal<
    {
      extracted: Extract<LensPathLeaf, ReadonlySet<unknown>>;
      accepts: readonly [{ id: 1 }] extends LensPathLeaf ? true : false;
    },
    { extracted: ReadonlySet<unknown>; accepts: true }
  >
>;
type _01e = Expect<
  Equal<
    {
      extracted: Extract<LensPathLeaf, null | undefined>;
      accepts: { nested: { x: 1 } } extends LensPathLeaf ? true : false;
    },
    { extracted: null | undefined; accepts: false }
  >
>;

// 2. Build the fuel tank: a tuple whose length is the requested count.
//    Hint: grow an accumulator one element at a time and stop when its `length`
//    matches the target.
export type BuildDepthOf<
  Count extends number,
  Accumulated extends unknown[] = [],
> = TODO; // TODO(koan)

type _02a = Expect<Equal<BuildDepthOf<0>, []>>;
type _02b = Expect<Equal<BuildDepthOf<1>, [unknown]>>;
type _02c = Expect<Equal<BuildDepthOf<3>["length"], 3>>;
type _02d = Expect<Equal<BuildDepthOf<3>, [unknown, unknown, unknown]>>;
type _02e = Expect<Equal<BuildDepthOf<7>["length"], 7>>;

// 3. Build the depth-to-fuel policy. A broad `number` carries no budget of its
//    own, so it receives a practical default of five; a union of literals
//    distributes into one tank per member.
export type DepthFuelOf<Depth extends number> = TODO; // TODO(koan)

type _03a = Expect<Equal<DepthFuelOf<0>["length"], 0>>;
type _03b = Expect<Equal<DepthFuelOf<3>["length"], 3>>;
type _03c = Expect<Equal<DepthFuelOf<number>["length"], 5>>;
type _03d = Expect<Equal<DepthFuelOf<1 | 3>["length"], 1 | 3>>;
type _03e = Expect<Equal<DepthFuelOf<12>["length"], 12>>;

// 4. Build the spend step: one unit of fuel is consumed, and an empty tank
//    stays empty rather than becoming an error.
export type TailFuelOf<Fuel extends readonly unknown[]> = TODO; // TODO(koan)

type _04a = Expect<Equal<TailFuelOf<[unknown, unknown]>["length"], 1>>;
type _04b = Expect<Equal<TailFuelOf<[unknown]>, []>>;
type _04c = Expect<Equal<TailFuelOf<[]>, []>>;
type _04d = Expect<Equal<TailFuelOf<readonly [unknown, unknown, unknown]>["length"], 2>>;
type _04e = Expect<Equal<TailFuelOf<BuildDepthOf<4>>["length"], 3>>;

// ─── The bounded vocabulary ───────────────────────────────────────────

// 5. Build the depth-bounded path vocabulary. An empty tank contributes nothing,
//    `any` still addresses everything, leaves stop, and every other object spends
//    one unit to walk its string keys and recurse.
//    `PathsToDepthOf<{ a: { b: 1 } }, 2>` is `"a" | "a.b"`.
//    Hint: check the fuel before anything else, so depth zero cannot even reach
//    the root keys.
export type PathsToDepthOf<Value, Depth extends number = 5> = TODO; // TODO(koan)

type _05a = Expect<Equal<PathsToDepthOf<GivenShape, 0>, never>>;
type _05b = Expect<Equal<PathsToDepthOf<GivenShape, 1>, "a" | "x">>;
type _05c = Expect<Equal<PathsToDepthOf<GivenShape, 2>, "a" | "a.b" | "x">>;
type _05d = Expect<Equal<PathsToDepthOf<GivenShape, 3>, "a" | "a.b" | "a.b.c" | "x">>;
type _05e = Expect<Equal<PathsToDepthOf<any, 2>, string>>;

// 6. Build the fuel-carrying recursion that construction 5 delegates to.
export type BoundedPathsOf<Value, Fuel extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<BoundedPathsOf<{ a: { b: 1 } }, []>, never>>;
type _06b = Expect<Equal<BoundedPathsOf<{ a: { b: 1 } }, [unknown]>, "a">>;
type _06c = Expect<Equal<BoundedPathsOf<{ a: { b: 1 } }, [unknown, unknown]>, "a" | "a.b">>;
type _06d = Expect<Equal<BoundedPathsOf<{ a: 1 }, BuildDepthOf<3>>, "a">>;
type _06e = Expect<Equal<BoundedPathsOf<string, BuildDepthOf<3>>, never>>;

// ─── Spending the budget ──────────────────────────────────────────────

// 7. Report each unit of fuel admitting exactly one more path segment.
export type DepthLadderProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<DepthLadderProfile["zero"], never>>;
type _07b = Expect<Equal<DepthLadderProfile["one"], "id" | "profile" | "settings" | "rows">>;
type _07c = Expect<
  Equal<
    DepthLadderProfile["two"],
    "id" | "profile" | "profile.name" | "profile.contact" | "settings" | "settings.theme" | "rows"
  >
>;
type _07d = Expect<
  Equal<
    DepthLadderProfile["three"],
    | "id"
    | "profile"
    | "profile.name"
    | "profile.contact"
    | "profile.contact.email"
    | "settings"
    | "settings.theme"
    | "rows"
  >
>;
type _07e = Expect<Equal<DepthLadderProfile["arrayStaysLeaf"], never>>;

// 8. Report the off-by-one boundary directly: a budget of one buys root keys and
//    nothing beneath them.
export type OffByOneProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<OffByOneProfile["rootAtOne"], true>>;
type _08b = Expect<Equal<OffByOneProfile["childAtOne"], false>>;
type _08c = Expect<Equal<OffByOneProfile["childAtTwo"], true>>;
type _08d = Expect<Equal<OffByOneProfile["grandchildAtTwo"], false>>;
type _08e = Expect<Equal<OffByOneProfile["grandchildAtThree"], true>>;

// 9. Report a cyclic alias becoming finite, because the budget shrinks on every
//    descent whether or not the shape repeats.
export type CyclicFiniteProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<CyclicFiniteProfile["one"], "id" | "next">>;
type _09b = Expect<
  Equal<CyclicFiniteProfile["two"], "id" | "next" | "next.id" | "next.next">
>;
type _09c = Expect<
  Equal<
    CyclicFiniteProfile["three"],
    "id" | "next" | "next.id" | "next.next" | "next.next.id" | "next.next.next"
  >
>;
type _09d = Expect<
  Equal<
    CyclicFiniteProfile["deepSubtree"],
    "next.next.id" | "next.next.next" | "next.next.next.id" | "next.next.next.next"
  >
>;
type _09e = Expect<Equal<CyclicFiniteProfile["roots"], "id" | "next">>;

// 10. Report the budget's last segment, where the vocabulary keeps the branch
//     that reaches the frontier but not the one that would cross it.
export type BudgetFrontierProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<BudgetFrontierProfile["atFrontier"], true>>;
type _10b = Expect<Equal<BudgetFrontierProfile["pastFrontier"], false>>;
type _10c = Expect<Equal<BudgetFrontierProfile["leafAtFrontier"], true>>;
type _10d = Expect<Equal<BudgetFrontierProfile["rootAlways"], true>>;
type _10e = Expect<Equal<BudgetFrontierProfile["nothingAtZero"], false>>;

// 11. Report the broad and union depth parameters, where the fuel policy decides
//     what a non-literal budget means.
export type DepthParameterProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<DepthParameterProfile["broadFuel"], 5>>;
type _11b = Expect<
  Equal<DepthParameterProfile["broadVocabulary"], "a" | "a.b" | "a.b.c" | "x">
>;
type _11c = Expect<Equal<DepthParameterProfile["unionFuel"], 0 | 2>>;
type _11d = Expect<Equal<DepthParameterProfile["unionVocabulary"], "a" | "a.b" | "x">>;
type _11e = Expect<
  Equal<DepthParameterProfile["largeBudget"], "a" | "a.b" | "a.b.c" | "x">
>;

// ─── The lens ─────────────────────────────────────────────────────────

// 12. Build the lens value reader, which models a real lookup: a nullish branch
//     or a missing segment contributes `undefined`.
export type LensPathValueOf<Value, Path extends string> = TODO; // TODO(koan)

type _12a = Expect<Equal<LensPathValueOf<GivenModel, "id">, string>>;
type _12b = Expect<Equal<LensPathValueOf<GivenModel, "profile.contact.email">, string>>;
type _12c = Expect<
  Equal<LensPathValueOf<GivenModel, "settings.theme">, "light" | "dark" | undefined>
>;
type _12d = Expect<Equal<LensPathValueOf<GivenModel, "missing">, undefined>>;
type _12e = Expect<
  Equal<
    {
      anyStaysAny: GivenIsAny<LensPathValueOf<any, "x.y">>;
      nullableSubject: LensPathValueOf<null | { x: number }, "x">;
    },
    { anyStaysAny: true; nullableSubject: number | undefined }
  >
>;

// 13. Build the lens itself, tying the path literal to a getter result and a
//     setter input that cannot drift apart.
export type PathLensOf<Value, Path extends string> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<PathLensOf<GivenModel, "profile.contact.email">["path"], "profile.contact.email">
>;
type _13b = Expect<
  Equal<ReturnType<PathLensOf<GivenModel, "profile.contact.email">["get"]>, string>
>;
type _13c = Expect<
  Equal<
    Parameters<PathLensOf<GivenModel, "settings.theme">["set"]>[1],
    "light" | "dark" | undefined
  >
>;
type _13d = Expect<Equal<ReturnType<PathLensOf<GivenModel, "settings.theme">["set"]>, GivenModel>>;
type _13e = Expect<Equal<keyof PathLensOf<GivenModel, "id">, "path" | "get" | "set">>;

// 14. Report the getter and setter staying correlated across several paths.
export type LensCorrelationProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<LensCorrelationProfile["requiredGet"], string>>;
type _14b = Expect<Equal<LensCorrelationProfile["optionalGet"], 0 | 1 | 2 | undefined>>;
type _14c = Expect<Equal<LensCorrelationProfile["optionalSet"], 0 | 1 | 2 | undefined>>;
type _14d = Expect<Equal<LensCorrelationProfile["setterSubject"], GivenModel>>;
type _14e = Expect<Equal<LensCorrelationProfile["setterResult"], GivenModel>>;

// 15. Report the array boundary, where the vocabulary and the reader disagree in
//     both directions: an index is never in the vocabulary, and the reader can
//     only resolve one when the container is a tuple with that position.
export type ArrayIndexProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ArrayIndexProfile["vocabularyHasIndex"], never>>;
type _15b = Expect<Equal<ArrayIndexProfile["readerOnArray"], undefined>>;
type _15c = Expect<Equal<ArrayIndexProfile["readerOnTuple"], number>>;
type _15d = Expect<Equal<ArrayIndexProfile["arrayLength"], number>>;
type _15e = Expect<Equal<ArrayIndexProfile["vocabularyRoots"], "config" | "rows">>;

// 16. Report the top and bottom sources under both the budget and the reader.
export type ExtremeCapstoneProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ExtremeCapstoneProfile["unknownVocabulary"], never>>;
type _16b = Expect<Equal<ExtremeCapstoneProfile["neverVocabulary"], never>>;
type _16c = Expect<Equal<ExtremeCapstoneProfile["anyVocabulary"], string>>;
type _16d = Expect<Equal<ExtremeCapstoneProfile["unknownReader"], undefined>>;
type _16e = Expect<Equal<ExtremeCapstoneProfile["anyReader"], true>>;

// ─── Reusable surfaces ────────────────────────────────────────────────

// 17. Build the reader that reports how much budget a path actually costs, which
//     is one unit per segment.
export type PathCostOf<Path extends string, Spent extends unknown[] = []> = TODO; // TODO(koan)

type _17a = Expect<Equal<PathCostOf<"id">, 1>>;
type _17b = Expect<Equal<PathCostOf<"profile.contact.email">, 3>>;
type _17c = Expect<Equal<PathCostOf<"a.b">, 2>>;
type _17d = Expect<Equal<PathCostOf<"a.b.c.d">, 4>>;
type _17e = Expect<Equal<PathCostOf<"a" | "a.b.c">, 1 | 3>>;

// 18. Build the lens factory signatures the packet exports. The factory is
//     curried so the subject and budget are fixed first, which is what lets the
//     path argument be checked against a vocabulary that already knows both; the
//     second field is that factory already applied to one subject.
export type LensRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    LensRuntimeApi["lensFor"],
    <Value, Depth extends number = 5>() => <
      const Path extends PathsToDepthOf<Value, Depth> & string,
    >(
      path: Path,
    ) => PathLensOf<Value, Path>
  >
>;
type _18b = Expect<
  Equal<
    LensRuntimeApi["modelLens"],
    <const Path extends PathsToDepthOf<GivenModel, 3> & string>(
      path: Path,
    ) => PathLensOf<GivenModel, Path>
  >
>;
type _18c = Expect<
  Equal<
    Parameters<LensRuntimeApi["modelLens"]>[0],
    | "id"
    | "profile"
    | "profile.name"
    | "profile.contact"
    | "profile.contact.email"
    | "settings"
    | "settings.theme"
    | "rows"
  >
>;
type _18d = Expect<
  Equal<
    {
      vocabulary: PathsToDepthOf<GivenShape, 2>;
      lensValue: ReturnType<PathLensOf<GivenShape, "a.b">["get"]>;
    },
    { vocabulary: "a" | "a.b" | "x"; lensValue: { c: 1 } }
  >
>;
type _18e = Expect<
  Equal<
    {
      cost: PathCostOf<"profile.contact.email">;
      reachable: "profile.contact.email" extends Parameters<LensRuntimeApi["modelLens"]>[0]
        ? true
        : false;
    },
    { cost: 3; reachable: true }
  >
>;
