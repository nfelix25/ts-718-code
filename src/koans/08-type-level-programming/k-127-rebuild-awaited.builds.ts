import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-127: rebuild Awaited — constructions
 * =============================================================================
 *
 * This one models what `await` actually does rather than peeling a `Promise`
 * wrapper. Three commitments follow from that. Nullish values are returned
 * untouched, because awaiting them is legal and produces them back. Thenability
 * is judged structurally — anything with a suitable `then` method qualifies, and
 * anything without one, including an object whose `then` is merely a string or an
 * optional method, does not. And the fulfilled type is read out of the first
 * parameter of the fulfillment callback, then assimilated again until the result
 * stops being thenable. A `then` that exists but cannot accept a callback is a
 * malformed thenable, and the honest answer there is `never`. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenThenable<Value> = { then(onfulfilled: (value: Value) => unknown): unknown };

// Declared with the packet's own resolution signature so a construction can be
// graded against a real call site.
declare function givenResolveAwaited<Value>(value: Value): Promise<RebuiltAwaited<Value>>;

// ─── Modelling await ──────────────────────────────────────────────────

// 1. Build the resolution model: pass nullish inputs through, recognise a
//    thenable structurally, read the fulfilled type from its callback's first
//    parameter, and assimilate recursively.
//    `RebuiltAwaited<Promise<Promise<1>>>` is `1`.
//    Hint: two nested `infer`s are needed — one for the `then` method's own
//    parameter, and one for that callback's first parameter.
export type RebuiltAwaited<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltAwaited<Promise<string>>, string>>;
type _01b = Expect<Equal<RebuiltAwaited<Promise<Promise<number>>>, number>>;
type _01c = Expect<Equal<RebuiltAwaited<{ id: number }>, { id: number }>>;
type _01d = Expect<Equal<RebuiltAwaited<null>, null>>;
type _01e = Expect<Equal<RebuiltAwaited<{ then(onfulfilled: string): void }>, never>>;

// ─── Values that are already settled ──────────────────────────────────

// 2. Report non-thenable values passing straight through, nullish included.
export type PassThroughProfile = TODO; // TODO(koan)

type _02a = Expect<Equal<PassThroughProfile["primitive"], string>>;
type _02b = Expect<Equal<PassThroughProfile["object"], { id: number }>>;
type _02c = Expect<Equal<PassThroughProfile["nullValue"], null>>;
type _02d = Expect<Equal<PassThroughProfile["undefinedValue"], undefined>>;
type _02e = Expect<Equal<PassThroughProfile["bothNullish"], null | undefined>>;

// 3. Report the recursion continuing until nothing thenable is left.
export type AssimilationProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<AssimilationProfile["onePromise"], string>>;
type _03b = Expect<Equal<AssimilationProfile["twoPromises"], number>>;
type _03c = Expect<Equal<AssimilationProfile["threePromises"], boolean>>;
type _03d = Expect<Equal<AssimilationProfile["mixedWrappers"], 2>>;
type _03e = Expect<Equal<AssimilationProfile["promiseLike"], "done">>;

// ─── Thenability is structural ────────────────────────────────────────

// 4. Report a hand-written thenable being resolved exactly like a promise, and
//    an intersection that merely carries one being resolved too.
export type StructuralThenableProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<StructuralThenableProfile["simple"], "ready">>;
type _04b = Expect<Equal<StructuralThenableProfile["nested"], number>>;
type _04c = Expect<Equal<StructuralThenableProfile["deeplyNested"], 1>>;
type _04d = Expect<Equal<StructuralThenableProfile["withExtraProperties"], 1>>;
type _04e = Expect<Equal<StructuralThenableProfile["methodSyntax"], 1>>;

// 5. Report the shapes that do not qualify as thenable and are therefore returned
//    untouched, including an optional `then` method.
export type NotThenableProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<NotThenableProfile["stringProperty"], { then: string }>>;
type _05b = Expect<
  Equal<
    NotThenableProfile["optionalMethod"],
    { then?: (resolve: (value: 1) => void) => void }
  >
>;
type _05c = Expect<Equal<NotThenableProfile["noThenAtAll"], { value: 1 }>>;
type _05d = Expect<Equal<NotThenableProfile["readonlyMethod"], 1>>;
type _05e = Expect<Equal<NotThenableProfile["emptyObject"], {}>>;

// 6. Report the malformed thenables: a `then` that exists but cannot take a
//    fulfillment callback has no fulfilled type to offer.
export type MalformedThenableProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<MalformedThenableProfile["stringParameter"], never>>;
type _06b = Expect<Equal<MalformedThenableProfile["neverParameter"], never>>;
type _06c = Expect<Equal<MalformedThenableProfile["nullaryCallback"], unknown>>;
type _06d = Expect<
  Equal<MalformedThenableProfile["optionalCallbackParameter"], 1 | undefined>
>;
type _06e = Expect<Equal<MalformedThenableProfile["extraCallbackParameters"], 1>>;

// ─── The fulfillment parameter's own domain ───────────────────────────

// 7. Report the extreme domains appearing in the callback's first parameter.
export type FulfillmentDomainProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<FulfillmentDomainProfile["unknownFulfillment"], unknown>>;
type _07b = Expect<Equal<FulfillmentDomainProfile["neverFulfillment"], never>>;
type _07c = Expect<Equal<FulfillmentDomainProfile["thenableOfUnknown"], unknown>>;
type _07d = Expect<Equal<FulfillmentDomainProfile["thenableOfNever"], never>>;
type _07e = Expect<Equal<FulfillmentDomainProfile["thenableOfAny"], true>>;

// ─── Distribution ─────────────────────────────────────────────────────

// 8. Report the naked parameter distributing, so each union member is awaited on
//    its own terms.
export type UnionDistributionProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<UnionDistributionProfile["promiseBesideValue"], string | number>>;
type _08b = Expect<Equal<UnionDistributionProfile["twoPromises"], 1 | 2>>;
type _08c = Expect<Equal<UnionDistributionProfile["nullishBesidePromise"], null | string>>;
type _08d = Expect<
  Equal<UnionDistributionProfile["thenableBesideObject"], 1 | { value: 2 }>
>;
type _08e = Expect<Equal<UnionDistributionProfile["absorbed"], unknown>>;

// 9. Report the top and bottom inputs.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtremeInputProfile["top"], unknown>>;
type _09b = Expect<Equal<ExtremeInputProfile["bottom"], never>>;
type _09c = Expect<Equal<ExtremeInputProfile["anyInput"], true>>;
type _09d = Expect<Equal<ExtremeInputProfile["promiseOfNever"], never>>;
type _09e = Expect<Equal<ExtremeInputProfile["promiseOfUnknown"], unknown>>;

// ─── Surfaces built on the model ──────────────────────────────────────

// 10. Build the predicate that reports whether a value would actually be
//     assimilated by an await.
export type IsThenableOf<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    { promise: IsThenableOf<Promise<1>>; plain: IsThenableOf<1> },
    { promise: true; plain: false }
  >
>;
type _10b = Expect<
  Equal<
    { thenable: IsThenableOf<GivenThenable<1>>; stringThen: IsThenableOf<{ then: string }> },
    { thenable: true; stringThen: false }
  >
>;
type _10c = Expect<
  Equal<
    { nullish: IsThenableOf<null>; object: IsThenableOf<{ id: 1 }> },
    { nullish: false; object: false }
  >
>;
type _10d = Expect<
  Equal<
    {
      alreadySettled: IsThenableOf<string>;
      optionalThen: IsThenableOf<{ then?: (resolve: (value: 1) => void) => void }>;
    },
    { alreadySettled: false; optionalThen: false }
  >
>;
type _10e = Expect<
  Equal<
    {
      malformed: IsThenableOf<{ then(resolve: string): void }>;
      nested: IsThenableOf<Promise<Promise<1>>>;
    },
    { malformed: true; nested: true }
  >
>;

// 11. Build the reader that settles every element of a tuple of awaitables, which
//     is the shape a concurrent-wait helper needs.
export type AwaitedTupleOf<Values extends readonly unknown[]> = TODO; // TODO(koan)

type _11a = Expect<Equal<AwaitedTupleOf<[Promise<1>, Promise<"a">]>, [1, "a"]>>;
type _11b = Expect<Equal<AwaitedTupleOf<[]>, []>>;
type _11c = Expect<Equal<AwaitedTupleOf<[1, Promise<2>]>, [1, 2]>>;
type _11d = Expect<
  Equal<AwaitedTupleOf<readonly [Promise<Promise<1>>, null]>, readonly [1, null]>
>;
type _11e = Expect<Equal<AwaitedTupleOf<[Promise<1>, Promise<2>]>["length"], 2>>;

// 12. Build the settled shape of an object whose properties are awaitables.
export type AwaitedPropertiesOf<Source> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<AwaitedPropertiesOf<{ a: Promise<1>; b: 2 }>, { a: 1; b: 2 }>
>;
type _12b = Expect<Equal<AwaitedPropertiesOf<{}>, {}>>;
type _12c = Expect<
  Equal<AwaitedPropertiesOf<{ readonly a?: Promise<1> }>, { readonly a?: 1 }>
>;
type _12d = Expect<
  Equal<AwaitedPropertiesOf<{ nested: Promise<{ inner: Promise<1> }> }>, { nested: { inner: Promise<1> } }>
>;
type _12e = Expect<
  Equal<AwaitedPropertiesOf<{ a: null; b: GivenThenable<3> }>, { a: null; b: 3 }>
>;

// 13. Build the resolution signature the packet exports, which always hands back
//     a promise of the fully settled type.
export type AwaitRuntimeApi = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    AwaitRuntimeApi["resolveAwaited"],
    <Value>(value: Value) => Promise<RebuiltAwaited<Value>>
  >
>;
type _13b = Expect<
  Equal<ReturnType<typeof givenResolveAwaited<Promise<Promise<1>>>>, Promise<1>>
>;
type _13c = Expect<Equal<ReturnType<typeof givenResolveAwaited<null>>, Promise<null>>>;
type _13d = Expect<
  Equal<Awaited<ReturnType<typeof givenResolveAwaited<Promise<"deep">>>>, "deep">
>;
type _13e = Expect<
  Equal<
    {
      settled: ReturnType<typeof givenResolveAwaited<GivenThenable<1>>>;
      direct: Promise<RebuiltAwaited<GivenThenable<1>>>;
    },
    { settled: Promise<1>; direct: Promise<1> }
  >
>;
