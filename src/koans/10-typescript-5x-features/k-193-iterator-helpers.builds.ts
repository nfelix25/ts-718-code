import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-193: iterator helpers — constructions
 * =============================================================================
 *
 * The iteration protocols are deliberately tiny: an iterable hands you an
 * iterator, an iterator hands you one result at a time, and neither promises
 * anything resembling `map`. The Iterator Helpers proposal adds those methods to
 * the objects the *runtime* produces, and TypeScript 5.6 named that shape
 * `IteratorObject<T, TReturn, TNext>` — an iterator that is also iterable and
 * carries the helper surface.
 *
 * The distinction the helpers force you to keep is lazy versus terminal. `map`,
 * `filter`, `take`, `drop` and `flatMap` all return another `IteratorObject` and
 * pull nothing; `toArray`, `reduce`, `find`, `some`, `every` and `forEach` are
 * where the input is consumed and an ordinary value comes back. Build the
 * protocol, the helper signatures, and the classification that separates them.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The protocol underneath ──────────────────────────────────────────

// 1. Build one step of an iteration: a value, or the end and its return value.
export type StepOf<Value, Return> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<StepOf<string, undefined>, IteratorYieldResult<string> | IteratorReturnResult<undefined>>
>;
type _01b = Expect<Equal<Extract<StepOf<string, undefined>, { done: true }>["value"], undefined>>;
type _01c = Expect<Equal<Extract<StepOf<string, undefined>, { value: string }>["done"], false | undefined>>;
type _01d = Expect<Equal<StepOf<never, undefined>["done"], boolean | undefined>>;

// 2. Build the one method the protocol actually requires. The parameter list is
//    a tuple union because `next()` and `next(value)` are both legal calls.
export type NextSignature<Value, Return, Next> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<NextSignature<number, any, any>, (...args: [] | [any]) => IteratorResult<number, any>>
>;
type _02b = Expect<
  Equal<
    NextSignature<number, unknown, unknown>,
    (...args: [] | [unknown]) => IteratorResult<number, unknown>
  >
>;
type _02c = Expect<Equal<ReturnType<NextSignature<string, undefined, unknown>>["done"], boolean | undefined>>;
type _02d = Expect<Equal<Equal<NextSignature<number, any, any>, Iterator<number>["next"]>, true>>;

// 3. Build the bare iterator shape — everything the protocol promises and
//    nothing the runtime adds.
export type MinimalIterator<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<keyof MinimalIterator<number>, "next">>;
type _03b = Expect<Equal<ReturnType<MinimalIterator<number>["next"]>, IteratorResult<number, undefined>>>;
type _03c = Expect<
  Equal<
    {
      theHelperObjectIsOneOfThese: GivenExtends<IteratorObject<number, undefined, unknown>, MinimalIterator<number>>;
      butTheBareShapeHasNoHelpers: GivenExtends<MinimalIterator<number>, IteratorObject<number, undefined, unknown>>;
    },
    { theHelperObjectIsOneOfThese: true; butTheBareShapeHasNoHelpers: false }
  >
>;
type _03d = Expect<
  Equal<
    {
      theProtocolHasNoHelperNames: Extract<keyof MinimalIterator<number>, "map" | "toArray">;
      onlyTheOneMethodItRequires: keyof MinimalIterator<number>;
    },
    { theProtocolHasNoHelperNames: never; onlyTheOneMethodItRequires: "next" }
  >
>;

// 4. Build the type every lazy helper hands back. `TReturn` is `undefined`
//    because a helper-produced iterator ends with nothing to say.
export type LazyOf<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<LazyOf<string>, IteratorObject<string, undefined, unknown>>>;
type _04b = Expect<Equal<ReturnType<LazyOf<string>["toArray"]>, string[]>>;
type _04c = Expect<
  Equal<
    ReturnType<LazyOf<string>[typeof Symbol.iterator]>,
    IteratorObject<string, undefined, unknown>
  >
>;
type _04d = Expect<Equal<ReturnType<LazyOf<string>["next"]>, IteratorResult<string, undefined>>>;

// ─── The lazy helpers ─────────────────────────────────────────────────

// 5. Build `map`. The callback takes the value and its index, and the element
//    type of the result is whatever the callback returns.
export type MapHelper<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<ReturnType<MapHelper<number>>, IteratorObject<unknown, undefined, unknown>>>;
type _05b = Expect<Equal<Parameters<MapHelper<number>>["length"], 1>>;
type _05c = Expect<Equal<Equal<MapHelper<number>, IteratorObject<number>["map"]>, true>>;
type _05d = Expect<Equal<Parameters<Parameters<MapHelper<number>>[0]>, [number, number]>>;

// 6. Build `filter`. It keeps the element type it was given — narrowing that
//    type is what the predicate overload in the real library is for.
export type FilterHelper<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReturnType<FilterHelper<number>>, IteratorObject<number, undefined, unknown>>>;
type _06b = Expect<Equal<Parameters<Parameters<FilterHelper<number>>[0]>, [number, number]>>;
type _06c = Expect<Equal<ReturnType<Parameters<FilterHelper<number>>[0]>, unknown>>;
type _06d = Expect<Equal<Parameters<FilterHelper<number>>["length"], 1>>;

// 7. Build `take`, whose argument is a count rather than a callback.
export type TakeHelper<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<TakeHelper<string>>, [limit: number]>>;
type _07b = Expect<Equal<ReturnType<TakeHelper<string>>, IteratorObject<string, undefined, unknown>>>;
type _07c = Expect<Equal<Equal<TakeHelper<string>, IteratorObject<string>["take"]>, true>>;
type _07d = Expect<Equal<ReturnType<ReturnType<TakeHelper<string>>["toArray"]>, string[]>>;

// 8. Build `flatMap`, whose callback may return either protocol — an iterable or
//    an iterator — and whose result is flattened one level.
export type FlatMapHelper<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<Equal<FlatMapHelper<string>, IteratorObject<string>["flatMap"]>, true>>;
type _08b = Expect<Equal<Parameters<FlatMapHelper<string>>["length"], 1>>;
type _08c = Expect<Equal<Parameters<Parameters<FlatMapHelper<string>>[0]>, [string, number]>>;
type _08d = Expect<Equal<ReturnType<FlatMapHelper<string>>, IteratorObject<unknown, undefined, unknown>>>;

// ─── Lazy or terminal ─────────────────────────────────────────────────

// 9. Build the names that return another iterator.
export type LazyName = TODO; // TODO(koan)

type _09a = Expect<Equal<LazyName, "map" | "filter" | "take" | "drop" | "flatMap">>;
type _09b = Expect<Equal<Extract<LazyName, `flat${string}`>, "flatMap">>;
type _09c = Expect<Equal<Exclude<LazyName, "map" | "filter" | "flatMap">, "take" | "drop">>;
type _09d = Expect<Equal<Extract<LazyName, "toArray">, never>>;

// 10. Build the names that consume it.
export type TerminalName = TODO; // TODO(koan)

type _10a = Expect<Equal<TerminalName, "toArray" | "reduce" | "find" | "some" | "every" | "forEach">>;
type _10b = Expect<Equal<Extract<TerminalName, "some" | "every">, "some" | "every">>;
type _10c = Expect<Equal<Extract<TerminalName, LazyName>, never>>;
type _10d = Expect<Equal<Extract<TerminalName, "map">, never>>;

// 11. Build the classifier, which is the question worth asking about any chain
//     you are reading.
export type IsLazy<Name extends LazyName | TerminalName> = TODO; // TODO(koan)

type _11a = Expect<Equal<IsLazy<"map">, true>>;
type _11b = Expect<Equal<IsLazy<"toArray">, false>>;
type _11c = Expect<Equal<IsLazy<"take">, true>>;
type _11d = Expect<Equal<IsLazy<"reduce">, false>>;
type _11e = Expect<Equal<IsLazy<LazyName>, true>>;

// 12. Build what each terminal actually produces.
export type ResultOf<Name extends TerminalName, Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<ResultOf<"toArray", string>, string[]>>;
type _12b = Expect<Equal<ResultOf<"find", string>, string | undefined>>;
type _12c = Expect<Equal<ResultOf<"some", string>, boolean>>;
type _12d = Expect<Equal<ResultOf<"forEach", string>, void>>;
type _12e = Expect<Equal<ResultOf<"reduce", number>, number>>;

// 13. Build what a whole step of a chain leaves you holding.
export type ChainStage<Name extends LazyName | TerminalName, Value> = TODO; // TODO(koan)

type _13a = Expect<Equal<ChainStage<"map", string>, IteratorObject<string, undefined, unknown>>>;
type _13b = Expect<Equal<ChainStage<"toArray", string>, string[]>>;
type _13c = Expect<Equal<ChainStage<"take", number>, IteratorObject<number, undefined, unknown>>>;
type _13d = Expect<Equal<ChainStage<"find", number>, number | undefined>>;

// 14. Build the question a lazy chain answers with "not yet".
export type PullsInput<Name extends LazyName | TerminalName> = TODO; // TODO(koan)

type _14a = Expect<Equal<PullsInput<"map">, false>>;
type _14b = Expect<Equal<PullsInput<"filter">, false>>;
type _14c = Expect<Equal<PullsInput<"toArray">, true>>;
type _14d = Expect<Equal<PullsInput<"every">, true>>;

// ─── Where the helpers come from ──────────────────────────────────────

// 15. Build the iterator a built-in collection hands you. It is not a plain
//     `Iterator` — it inherits the helper surface too.
export type MapEntries<Key, Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<MapEntries<string, number>, ReturnType<Map<string, number>["entries"]>>>;
type _15b = Expect<Equal<ReturnType<MapEntries<string, number>["toArray"]>, [string, number][]>>;
type _15c = Expect<
  Equal<
    {
      aCollectionIteratorCarriesTheHelpers: GivenExtends<
        MapEntries<string, number>,
        IteratorObject<[string, number], undefined, unknown>
      >;
      butABareIteratorDoesNot: GivenExtends<
        MinimalIterator<[string, number]>,
        IteratorObject<[string, number], undefined, unknown>
      >;
    },
    { aCollectionIteratorCarriesTheHelpers: true; butABareIteratorDoesNot: false }
  >
>;
type _15d = Expect<Equal<ReturnType<MapEntries<string, number>["next"]>["value"], [string, number] | undefined>>;

// 16. Report the chain the koan builds: filter, map, take, then collect.
export type PipelineProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<PipelineProfile["afterFilter"], IteratorObject<number, undefined, unknown>>>;
type _16b = Expect<Equal<PipelineProfile["afterMap"], IteratorObject<string, undefined, unknown>>>;
type _16c = Expect<Equal<PipelineProfile["afterTake"], IteratorObject<string, undefined, unknown>>>;
type _16d = Expect<Equal<PipelineProfile["afterToArray"], string[]>>;
type _16e = Expect<Equal<PipelineProfile["nothingWasPulledUntilTheEnd"], false>>;

// 17. Report how the three shapes relate. Every helper object is an iterator;
//     not every iterator is a helper object, which is exactly why `Iterator.from`
//     exists.
export type ProtocolProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ProtocolProfile["aHelperObjectIsAnIterator"], true>>;
type _17b = Expect<Equal<ProtocolProfile["aHelperObjectIsAlsoIterable"], true>>;
type _17c = Expect<Equal<ProtocolProfile["aBareIteratorIsNotAHelperObject"], false>>;
type _17d = Expect<Equal<ProtocolProfile["andAnIterableIsNotEitherOne"], false>>;

// 18. Report one helper call at a glance: whether it consumes the input, what it
//     leaves behind, and what a further `toArray` would give.
export type HelperReport<Name extends LazyName | TerminalName, Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<HelperReport<"map", string>["lazy"], true>>;
type _18b = Expect<Equal<HelperReport<"map", string>["produces"], IteratorObject<string, undefined, unknown>>>;
type _18c = Expect<Equal<HelperReport<"toArray", string>["consumes"], true>>;
type _18d = Expect<Equal<HelperReport<"toArray", string>["produces"], string[]>>;
type _18e = Expect<Equal<HelperReport<"find", number>["produces"], number | undefined>>;
