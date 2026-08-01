import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-194: strict built-in iterator returns — constructions
 * =============================================================================
 *
 * `next()` does not hand back a value; it hands back a discriminated union of
 * two shapes — a yielded `{ done?: false; value: TYield }` and a completed
 * `{ done: true; value: TReturn }`. Reading `.value` without narrowing therefore
 * gives you `TYield | TReturn`, and for years the built-in iterators declared
 * `TReturn` as `any`, so that union quietly collapsed to `any` and took every
 * typo with it.
 *
 * TypeScript 5.6 introduced `BuiltinIteratorReturn` and
 * `strictBuiltinIteratorReturn`: under `strict` the built-ins complete with
 * `undefined`, so an unchecked read is honestly `TYield | undefined`. A
 * generator is the interesting contrast — it may complete with a meaningful
 * value, which is precisely why `done` must be checked first either way.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// ─── The two shapes ───────────────────────────────────────────────────

// 1. Build the shape of a step that produced a value. `done` is optional here,
//    which is why an unchecked read cannot tell the two apart.
export type YieldStep<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<YieldStep<string>, IteratorYieldResult<string>>>;
type _01b = Expect<Equal<YieldStep<string>["done"], false | undefined>>;
type _01c = Expect<Equal<YieldStep<string>["value"], string>>;
type _01d = Expect<Equal<keyof YieldStep<string>, "done" | "value">>;

// 2. Build the shape of a step that ended. Here `done` is required and its
//    literal type is what makes the union discriminable.
export type ReturnStep<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<ReturnStep<number>, IteratorReturnResult<number>>>;
type _02b = Expect<Equal<ReturnStep<number>["done"], true>>;
type _02c = Expect<Equal<ReturnStep<number>["value"], number>>;
type _02d = Expect<Equal<Extract<ReturnStep<number>["done"], false>, never>>;

// 3. Build the union `next()` actually returns.
export type StepUnion<Yield, Return> = TODO; // TODO(koan)

type _03a = Expect<Equal<StepUnion<string, number>, IteratorResult<string, number>>>;
type _03b = Expect<Equal<StepUnion<string, number>["done"], boolean | undefined>>;
type _03c = Expect<Equal<StepUnion<string, undefined>, IteratorResult<string, undefined>>>;
type _03d = Expect<Equal<keyof StepUnion<string, number>, "done" | "value">>;

// 4. Build the unchecked read — the one that hides mistakes. It is a union of
//    both channels, because nothing has been narrowed yet.
export type UncheckedValue<Yield, Return> = TODO; // TODO(koan)

type _04a = Expect<Equal<UncheckedValue<string, number>, string | number>>;
type _04b = Expect<Equal<UncheckedValue<string, undefined>, string | undefined>>;
type _04c = Expect<
  Equal<
    {
      anAnyChannelSwallowsTheWholeRead: IsAny<UncheckedValue<string, any>>;
      butANumberChannelLeavesAUnion: UncheckedValue<string, number>;
    },
    { anAnyChannelSwallowsTheWholeRead: true; butANumberChannelLeavesAUnion: string | number }
  >
>;
type _04d = Expect<Equal<IsAny<UncheckedValue<string, undefined>>, false>>;

// ─── Narrowing on done ────────────────────────────────────────────────

// 5. Build the checked read for a completed step.
export type WhenDone<Step> = TODO; // TODO(koan)

type _05a = Expect<Equal<WhenDone<StepUnion<string, number>>, number>>;
type _05b = Expect<Equal<WhenDone<StepUnion<string, undefined>>, undefined>>;
type _05c = Expect<Equal<WhenDone<IteratorResult<string, number>>, number>>;
type _05d = Expect<Equal<WhenDone<ReturnStep<"end">>, "end">>;

// 6. Build the checked read for a yielded step.
export type WhenYielded<Step> = TODO; // TODO(koan)

type _06a = Expect<Equal<WhenYielded<StepUnion<string, number>>, string>>;
type _06b = Expect<Equal<WhenYielded<StepUnion<string, undefined>>, string>>;
type _06c = Expect<Equal<WhenYielded<IteratorResult<number, undefined>>, number>>;
type _06d = Expect<Equal<WhenYielded<YieldStep<"item">>, "item">>;

// 7. Report what narrowing buys: two disjoint answers instead of one union.
export type NarrowingProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<NarrowingProfile["unchecked"], string | number>>;
type _07b = Expect<Equal<NarrowingProfile["whenYielded"], string>>;
type _07c = Expect<Equal<NarrowingProfile["whenDone"], number>>;
type _07d = Expect<Equal<NarrowingProfile["theCheckedReadsAreDisjoint"], true>>;

// ─── The return channel ───────────────────────────────────────────────

// 8. Build the kinds of iterator whose completion values differ.
export type IteratorKind = TODO; // TODO(koan)

type _08a = Expect<Equal<IteratorKind, "strictBuiltin" | "looseBuiltin" | "generator">>;
type _08b = Expect<Equal<Extract<IteratorKind, `${string}Builtin`>, "strictBuiltin" | "looseBuiltin">>;
type _08c = Expect<Equal<Exclude<IteratorKind, "generator">, "strictBuiltin" | "looseBuiltin">>;
type _08d = Expect<Equal<Extract<IteratorKind, "async">, never>>;

// 9. Build the completion channel each kind uses. The loose built-in is the one
//    the option exists to fix.
export type ReturnChannel<Kind extends IteratorKind, Declared> = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnChannel<"strictBuiltin", number>, undefined>>;
type _09b = Expect<
  Equal<
    {
      theLooseBuiltinCompletesWithAny: IsAny<ReturnChannel<"looseBuiltin", number>>;
      andTheStrictOneWithUndefined: ReturnChannel<"strictBuiltin", number>;
    },
    { theLooseBuiltinCompletesWithAny: true; andTheStrictOneWithUndefined: undefined }
  >
>;
type _09c = Expect<Equal<ReturnChannel<"generator", number>, number>>;
type _09d = Expect<Equal<IsAny<ReturnChannel<"strictBuiltin", number>>, false>>;

// 10. Build the intrinsic the library uses for exactly that decision.
export type BuiltinReturn = TODO; // TODO(koan)

type _10a = Expect<Equal<BuiltinReturn, undefined>>;
type _10b = Expect<Equal<IsAny<BuiltinReturn>, false>>;
type _10c = Expect<
  Equal<
    {
      theIntrinsicIsTheStrictChannel: Equal<BuiltinReturn, ReturnChannel<"strictBuiltin", number>>;
      andThatChannelIsUndefined: ReturnChannel<"strictBuiltin", number>;
    },
    { theIntrinsicIsTheStrictChannel: true; andThatChannelIsUndefined: undefined }
  >
>;
type _10d = Expect<Equal<UncheckedValue<string, BuiltinReturn>, string | undefined>>;

// 11. Build the step a strict built-in iterator produces.
export type BuiltinStep<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<BuiltinStep<string>, IteratorResult<string, undefined>>>;
type _11b = Expect<Equal<BuiltinStep<string>["value"], string | undefined>>;
type _11c = Expect<Equal<WhenDone<BuiltinStep<string>>, undefined>>;
type _11d = Expect<Equal<WhenYielded<BuiltinStep<string>>, string>>;

// 12. Build the step the same code produced before the option existed, where the
//     completion channel swallowed the whole read.
export type LooseStep<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    {
      theUncheckedReadIsAny: IsAny<LooseStep<string>["value"]>;
      whereasTheStrictReadIsNot: BuiltinStep<string>["value"];
    },
    { theUncheckedReadIsAny: true; whereasTheStrictReadIsNot: string | undefined }
  >
>;
type _12b = Expect<
  Equal<
    {
      theCheckedCompletionReadIsAnyToo: IsAny<WhenDone<LooseStep<string>>>;
      butTheStrictOneIsUndefined: WhenDone<BuiltinStep<string>>;
    },
    { theCheckedCompletionReadIsAnyToo: true; butTheStrictOneIsUndefined: undefined }
  >
>;
type _12c = Expect<Equal<WhenYielded<LooseStep<string>>, string>>;
type _12d = Expect<
  Equal<
    {
      strictKeepsTheYieldTypeReadable: IsAny<BuiltinStep<string>["value"]>;
      looseDoesNot: IsAny<LooseStep<string>["value"]>;
    },
    { strictKeepsTheYieldTypeReadable: false; looseDoesNot: true }
  >
>;

// ─── Generators choose their own ──────────────────────────────────────

// 13. Build the generator the koan writes: two strings, then a count.
export type WordGenerator = TODO; // TODO(koan)

type _13a = Expect<Equal<ReturnType<WordGenerator["next"]>, IteratorResult<string, number>>>;
type _13b = Expect<Equal<WhenDone<ReturnType<WordGenerator["next"]>>, number>>;
type _13c = Expect<Equal<WhenYielded<ReturnType<WordGenerator["next"]>>, string>>;
type _13d = Expect<Equal<Parameters<WordGenerator["next"]>, [] | [void]>>;

// 14. Build the reader for any iterator's step type, so the two kinds can be
//     compared without repeating `ReturnType` everywhere.
export type StepOf<
  TheIterator extends { next: (...args: never) => unknown },
> = TODO; // TODO(koan)

type _14a = Expect<Equal<StepOf<WordGenerator>, IteratorResult<string, number>>>;
type _14b = Expect<Equal<StepOf<SetIterator<string>>, IteratorResult<string, undefined>>>;
type _14c = Expect<Equal<WhenDone<StepOf<SetIterator<string>>>, undefined>>;
type _14d = Expect<Equal<WhenDone<StepOf<WordGenerator>>, number>>;

// 15. Build the consumer that states its completion policy in its own signature:
//     it will only drain iterators that complete with nothing.
export type DrainSignature<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<Parameters<DrainSignature<string>>, [Iterator<string, undefined>]>>;
type _15b = Expect<Equal<ReturnType<DrainSignature<string>>, string[]>>;
type _15c = Expect<Equal<WhenDone<StepOf<Parameters<DrainSignature<string>>[0]>>, undefined>>;
type _15d = Expect<Equal<Parameters<DrainSignature<string>>["length"], 1>>;

// 16. Build the consumer that handles both channels explicitly.
export type DescribeSignature<Yield, Return> = TODO; // TODO(koan)

type _16a = Expect<Equal<Parameters<DescribeSignature<string, number>>[0], IteratorResult<string, number>>>;
type _16b = Expect<Equal<ReturnType<DescribeSignature<string, number>>, string>>;
type _16c = Expect<Equal<WhenYielded<Parameters<DescribeSignature<string, number>>[0]>, string>>;
type _16d = Expect<Equal<WhenDone<Parameters<DescribeSignature<string, number>>[0]>, number>>;

// ─── What the option changes ──────────────────────────────────────────

// 17. Report the same set iteration under both settings. Only the completion
//     channel moved, but that is what decides whether an unchecked read is
//     readable at all.
export type OptionProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<OptionProfile["strictCompletesWith"], undefined>>;
type _17b = Expect<Equal<OptionProfile["looseCompletedWithAny"], true>>;
type _17c = Expect<Equal<OptionProfile["strictUncheckedRead"], string | undefined>>;
type _17d = Expect<Equal<OptionProfile["looseUncheckedRead"], true>>;
type _17e = Expect<Equal<OptionProfile["andNarrowingWasAlwaysTheAnswer"], string>>;

// 18. Report one iterator at a glance: how it completes, what an unchecked read
//     gives, and what each branch gives after the check.
export type IteratorReturnReport<Kind extends IteratorKind, Yield, Declared> = TODO; // TODO(koan)

type _18a = Expect<Equal<IteratorReturnReport<"strictBuiltin", string, never>["completesWith"], undefined>>;
type _18b = Expect<
  Equal<IteratorReturnReport<"strictBuiltin", string, never>["uncheckedRead"], string | undefined>
>;
type _18c = Expect<Equal<IteratorReturnReport<"looseBuiltin", string, never>["uncheckedReadIsUseless"], true>>;
type _18d = Expect<Equal<IteratorReturnReport<"generator", string, number>["whenDone"], number>>;
type _18e = Expect<Equal<IteratorReturnReport<"generator", string, number>["whenYielded"], string>>;
