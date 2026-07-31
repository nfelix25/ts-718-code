import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-124: rebuild ReturnType — constructions
 * =============================================================================
 *
 * The whole utility is one conditional with an `infer` in the return position,
 * plus a constraint that rejects anything non-callable before the conditional
 * runs at all. What makes it worth studying is everything inference cannot
 * recover. A generic return that still depends on an unresolved type parameter
 * collapses to that parameter's constraint — or to `unknown` when there is none —
 * because no call has happened. Overloads are not a union: inference reads only
 * the last signature, which means the order they were written in decides the
 * answer. And a construct signature is a different thing entirely; a value can
 * carry both and they are captured by different utilities. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

interface GivenParser {
  (value: string): number;
  (value: number): string;
  (value: string | number): string | number;
}

interface GivenReverseOverload {
  (x: number): 2;
  (x: string): 1;
}

type GivenConstructor = new () => { id: string };
type GivenCallableAndConstructable = GivenConstructor & (() => "called");

// Declared with the packet's own invocation signature so a construction can be
// graded against a real call site.
declare function givenInvoke<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): RebuiltReturnType<Fn>;

// ─── The inference ────────────────────────────────────────────────────

// 1. Build the capture: if the input can be called, take the type in its return
//    position; otherwise fall through to the branch the constraint makes
//    unreachable.
//    `RebuiltReturnType<() => string>` is `string`.
//    Hint: the parameter list in the pattern only has to be permissive enough to
//    match any call signature — it is the return position that is inferred.
export type RebuiltReturnType<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltReturnType<() => string>, string>>;
type _01b = Expect<Equal<RebuiltReturnType<(x: number) => boolean>, boolean>>;
type _01c = Expect<Equal<RebuiltReturnType<(...values: number[]) => number>, number>>;
type _01d = Expect<Equal<RebuiltReturnType<() => { id: string }>, { id: string }>>;
type _01e = Expect<Equal<RebuiltReturnType<() => string | number>, string | number>>;

// ─── What comes back unchanged ────────────────────────────────────────

// 2. Report the return positions that are captured exactly as written, including
//    the ones a careless utility might normalise away.
export type LiteralReturnProfile = TODO; // TODO(koan)

type _02a = Expect<Equal<LiteralReturnProfile["voidReturn"], void>>;
type _02b = Expect<Equal<LiteralReturnProfile["neverReturn"], never>>;
type _02c = Expect<Equal<LiteralReturnProfile["promiseReturn"], Promise<number>>>;
type _02d = Expect<Equal<LiteralReturnProfile["unknownReturn"], unknown>>;
type _02e = Expect<Equal<LiteralReturnProfile["unionReturn"], string | number>>;

// 3. Report a promise being captured as the promise, not as what it settles to.
export type AsyncReturnProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<AsyncReturnProfile["captured"], Promise<"ready">>>;
type _03b = Expect<Equal<AsyncReturnProfile["settled"], "ready">>;
type _03c = Expect<Equal<AsyncReturnProfile["nested"], Promise<Promise<1>>>>;
type _03d = Expect<Equal<AsyncReturnProfile["nestedSettled"], 1>>;
type _03e = Expect<Equal<AsyncReturnProfile["emptyFulfillment"], Promise<never>>>;

// ─── What inference cannot recover ────────────────────────────────────

// 4. Report a generic return collapsing to what is knowable without a call: the
//    type parameter's constraint, or `unknown` when it has none.
export type GenericErasureProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<GenericErasureProfile["unconstrained"], unknown>>;
type _04b = Expect<Equal<GenericErasureProfile["constrainedToString"], string>>;
type _04c = Expect<Equal<GenericErasureProfile["constrainedToObject"], { id: string }>>;
type _04d = Expect<Equal<GenericErasureProfile["wrappedInArray"], unknown[]>>;
type _04e = Expect<Equal<GenericErasureProfile["withDefault"], unknown>>;

// 5. Report the erasure reaching inside composite return positions too.
export type CompositeErasureProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<CompositeErasureProfile["tupleOfParameters"], [unknown, unknown]>>;
type _05b = Expect<Equal<CompositeErasureProfile["indexedAccess"], unknown>>;
type _05c = Expect<
  Equal<CompositeErasureProfile["templateLiteral"], `${string | number}`>
>;
type _05d = Expect<Equal<CompositeErasureProfile["constrainedTuple"], string>>;
type _05e = Expect<Equal<CompositeErasureProfile["nestedGeneric"], Promise<unknown>>>;

// ─── Overloads are ordered, not unioned ───────────────────────────────

// 6. Report inference reading the final signature of an overloaded interface, so
//    the declaration order changes the answer.
export type OverloadOrderProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<OverloadOrderProfile["parser"], string | number>>;
type _06b = Expect<Equal<OverloadOrderProfile["reversed"], 1>>;
type _06c = Expect<Equal<OverloadOrderProfile["nullaryLast"], 1>>;
type _06d = Expect<Equal<OverloadOrderProfile["nullaryFirst"], 2>>;
type _06e = Expect<Equal<OverloadOrderProfile["notAUnion"], false>>;

// 7. Report an intersection of call signatures behaving as overloads in the same
//    written order, while a union of functions really does union its returns.
export type IntersectionVersusUnionProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<IntersectionVersusUnionProfile["intersectionStringFirst"], 2>>;
type _07b = Expect<Equal<IntersectionVersusUnionProfile["intersectionNumberFirst"], 1>>;
type _07c = Expect<Equal<IntersectionVersusUnionProfile["unionOfFunctions"], 1 | 2>>;
type _07d = Expect<Equal<IntersectionVersusUnionProfile["unionWithNever"], 2>>;
type _07e = Expect<Equal<IntersectionVersusUnionProfile["unionDistributes"], true>>;

// ─── Callable is only one of the things a value can be ────────────────

// 8. Report call signatures and construct signatures being captured by different
//    utilities, even when one value carries both.
export type CallVersusConstructProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<CallVersusConstructProfile["called"], "called">>;
type _08b = Expect<Equal<CallVersusConstructProfile["constructed"], { id: string }>>;
type _08c = Expect<Equal<CallVersusConstructProfile["literalBoth"], 1>>;
type _08d = Expect<Equal<CallVersusConstructProfile["literalConstructed"], { id: 2 }>>;
type _08e = Expect<Equal<CallVersusConstructProfile["plainConstructor"], { id: string }>>;

// 9. Report extra properties and a `this` parameter being ignored by the return
//    capture, each having its own reader instead.
export type SignatureExtrasProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<SignatureExtrasProfile["withProperties"], "call">>;
type _09b = Expect<Equal<SignatureExtrasProfile["withReadonlyProperty"], 1>>;
type _09c = Expect<Equal<SignatureExtrasProfile["withThisParameter"], number>>;
type _09d = Expect<Equal<SignatureExtrasProfile["thisParameter"], { id: string }>>;
type _09e = Expect<Equal<SignatureExtrasProfile["omittedThis"], number>>;

// 10. Report the top and bottom inputs keeping their conditional-type behaviour.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ExtremeInputProfile["anyInput"], true>>;
type _10b = Expect<Equal<ExtremeInputProfile["neverInput"], never>>;
type _10c = Expect<Equal<ExtremeInputProfile["anyReturn"], true>>;
type _10d = Expect<Equal<ExtremeInputProfile["unknownReturn"], unknown>>;
type _10e = Expect<Equal<ExtremeInputProfile["neverReturn"], never>>;

// ─── Readers built on the capture ─────────────────────────────────────

// 11. Build the reader that goes one step further and settles a promised return.
export type AwaitedReturnOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _11a = Expect<Equal<AwaitedReturnOf<() => Promise<"ready">>, "ready">>;
type _11b = Expect<Equal<AwaitedReturnOf<() => "sync">, "sync">>;
type _11c = Expect<Equal<AwaitedReturnOf<() => Promise<Promise<1>>>, 1>>;
type _11d = Expect<Equal<AwaitedReturnOf<() => Promise<never>>, never>>;
type _11e = Expect<Equal<AwaitedReturnOf<() => void>, void>>;

// 12. Build the reader that maps a whole tuple of functions to their returns.
export type ReturnTypesOf<
  Functions extends readonly ((...args: any[]) => any)[],
> = TODO; // TODO(koan)

type _12a = Expect<Equal<ReturnTypesOf<[() => 1, () => "two"]>, [1, "two"]>>;
type _12b = Expect<Equal<ReturnTypesOf<[]>, []>>;
type _12c = Expect<Equal<ReturnTypesOf<[() => void]>, [void]>>;
type _12d = Expect<
  Equal<ReturnTypesOf<readonly [() => 1, () => 2, () => 3]>, readonly [1, 2, 3]>
>;
type _12e = Expect<Equal<ReturnTypesOf<[() => 1, () => 2]>["length"], 2>>;

// 13. Build the predicate that reports whether a function is used only for its
//     effect, which is the one return position a caller cannot consume.
export type ReturnsNothingOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    { effect: ReturnsNothingOf<() => void>; value: ReturnsNothingOf<() => string> },
    { effect: true; value: false }
  >
>;
type _13b = Expect<
  Equal<
    { bottom: ReturnsNothingOf<() => never>; undefinedReturn: ReturnsNothingOf<() => undefined> },
    { bottom: true; undefinedReturn: true }
  >
>;
type _13c = Expect<
  Equal<
    { promise: ReturnsNothingOf<() => Promise<void>>; top: ReturnsNothingOf<() => unknown> },
    { promise: false; top: false }
  >
>;
type _13d = Expect<
  Equal<
    {
      overloaded: ReturnsNothingOf<{ (x: string): 1; (): void }>;
      otherOrder: ReturnsNothingOf<{ (): void; (x: string): 1 }>;
    },
    { overloaded: true; otherOrder: false }
  >
>;
type _13e = Expect<
  Equal<
    {
      unionWithVoid: ReturnsNothingOf<() => void | string>;
      genericVoid: ReturnsNothingOf<<Value extends void>() => Value>;
    },
    { unionWithVoid: false; genericVoid: true }
  >
>;

// 14. Build the invocation signature the packet exports, which pairs the captured
//     return with the argument list the same function declares.
export type InvokeRuntimeApi = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    InvokeRuntimeApi["invoke"],
    <Fn extends (...args: any[]) => any>(
      fn: Fn,
      ...args: Parameters<Fn>
    ) => RebuiltReturnType<Fn>
  >
>;
type _14b = Expect<Equal<ReturnType<typeof givenInvoke<() => "value">>, "value">>;
type _14c = Expect<
  Equal<
    {
      arguments: Parameters<typeof givenInvoke<(x: number) => boolean>>;
      result: ReturnType<typeof givenInvoke<(x: number) => boolean>>;
    },
    { arguments: [fn: (x: number) => boolean, x: number]; result: boolean }
  >
>;
type _14d = Expect<Equal<ReturnType<typeof givenInvoke<() => void>>, void>>;
type _14e = Expect<
  Equal<
    {
      captured: ReturnType<typeof givenInvoke<GivenReverseOverload>>;
      direct: RebuiltReturnType<GivenReverseOverload>;
    },
    { captured: 1; direct: 1 }
  >
>;
