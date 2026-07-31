import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-125: rebuild Parameters — constructions
 * =============================================================================
 *
 * One `infer` in the rest position captures an entire argument list as a single
 * tuple, and that tuple is unusually faithful: labels survive, optional positions
 * survive, and a rest parameter stays a rest. That fidelity is what makes
 * forwarding and adapter types possible at all. The channel it does not capture
 * is `this`, which travels separately and has its own pair of utilities. As with
 * the return capture, a generic signature loses whatever a call would have
 * decided — and a parameter whose type depends on another parameter degrades all
 * the way to `never` once that other parameter has become its constraint.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
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

// Declared with the packet's own tuple-call signature so a construction can be
// graded against a real call site.
declare function givenCallWithTuple<Fn extends (...args: any[]) => any>(
  fn: Fn,
  args: RebuiltParameters<Fn>,
): ReturnType<Fn>;

// ─── The capture ──────────────────────────────────────────────────────

// 1. Build the argument-list capture: if the input is callable, take the whole
//    tuple its rest parameter accepts.
//    `RebuiltParameters<(x: string) => void>` is `[x: string]`.
export type RebuiltParameters<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltParameters<() => void>, []>>;
type _01b = Expect<Equal<RebuiltParameters<(value: string) => void>, [value: string]>>;
type _01c = Expect<
  Equal<RebuiltParameters<(name: string, age: number) => boolean>, [name: string, age: number]>
>;
type _01d = Expect<Equal<RebuiltParameters<(...values: number[]) => number>, number[]>>;
type _01e = Expect<Equal<RebuiltParameters<() => void>["length"], 0>>;

// ─── A faithful tuple ─────────────────────────────────────────────────

// 2. Report labels and rest structure surviving the capture intact, which is what
//    makes the result usable for forwarding.
export type TupleFidelityProfile = TODO; // TODO(koan)

type _02a = Expect<
  Equal<TupleFidelityProfile["labelled"], [name: string, age: number]>
>;
type _02b = Expect<
  Equal<TupleFidelityProfile["headAndRest"], [head: string, ...tail: number[]]>
>;
type _02c = Expect<Equal<TupleFidelityProfile["restOnly"], number[]>>;
type _02d = Expect<
  Equal<TupleFidelityProfile["writtenTuple"], [id: string, enabled?: boolean]>
>;
type _02e = Expect<Equal<TupleFidelityProfile["unionRest"], [x: string] | [x: number]>>;

// 3. Report the one place the tuple is not a verbatim copy: an optional parameter
//    declared on the signature carries `undefined` into its element type, while
//    the same optional element written directly in a rest tuple does not.
export type OptionalParameterProfile = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    OptionalParameterProfile["declaredOptional"],
    [name: string, age?: number | undefined]
  >
>;
type _03b = Expect<Equal<OptionalParameterProfile["soleOptional"], [x?: string | undefined]>>;
type _03c = Expect<
  Equal<OptionalParameterProfile["writtenOptional"], [id: string, enabled?: boolean]>
>;
type _03d = Expect<Equal<OptionalParameterProfile["optionalLength"], 0 | 1>>;
type _03e = Expect<
  Equal<OptionalParameterProfile["elementUnion"], string | number | undefined>
>;

// ─── A separate channel ───────────────────────────────────────────────

// 4. Report the `this` parameter never appearing in the tuple, and the pair of
//    utilities that do reach it.
export type ThisChannelProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<ThisChannelProfile["thisOnly"], []>>;
type _04b = Expect<Equal<ThisChannelProfile["thisBeside"], [value: number]>>;
type _04c = Expect<Equal<ThisChannelProfile["captured"], { id: string }>>;
type _04d = Expect<Equal<ThisChannelProfile["removed"], (value: number) => void>>;
type _04e = Expect<Equal<ThisChannelProfile["voidThis"], [value: number]>>;

// ─── What inference cannot recover ────────────────────────────────────

// 5. Report generic parameters degrading to what is knowable without a call.
export type GenericErasureProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<GenericErasureProfile["unconstrained"], [value: unknown]>>;
type _05b = Expect<Equal<GenericErasureProfile["constrained"], [value: string]>>;
type _05c = Expect<
  Equal<GenericErasureProfile["repeated"], [value: unknown, again: unknown]>
>;
type _05d = Expect<
  Equal<GenericErasureProfile["twoParameters"], [left: unknown, right: unknown]>
>;
type _05e = Expect<Equal<GenericErasureProfile["genericRest"], unknown[]>>;

// 6. Report a parameter whose type depends on another parameter, which collapses
//    once that other parameter has already become its constraint.
export type DependentParameterProfile = TODO; // TODO(koan)

type _06a = Expect<
  Equal<DependentParameterProfile["keyOfEarlier"], [value: object, key: never]>
>;
type _06b = Expect<
  Equal<
    DependentParameterProfile["callbackParameter"],
    [callback: (value: unknown) => void]
  >
>;
type _06c = Expect<
  Equal<DependentParameterProfile["keyOfConcrete"], [value: { a: 1; b: 2 }, key: "a" | "b"]>
>;
type _06d = Expect<
  Equal<DependentParameterProfile["arrayElement"], [values: readonly string[], one: string]>
>;
type _06e = Expect<Equal<DependentParameterProfile["erasedKey"], never>>;

// ─── Overloads and shape of the input ─────────────────────────────────

// 7. Report inference reading the final signature, so declaration order decides
//    which argument list is captured.
export type OverloadOrderProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<OverloadOrderProfile["parser"], [value: string | number]>>;
type _07b = Expect<Equal<OverloadOrderProfile["reversed"], [x: string]>>;
type _07c = Expect<Equal<OverloadOrderProfile["stringLast"], [x: string]>>;
type _07d = Expect<Equal<OverloadOrderProfile["numberLast"], [x: number]>>;
type _07e = Expect<Equal<OverloadOrderProfile["notAUnion"], false>>;

// 8. Report an intersection behaving as ordered overloads while a union of
//    functions produces a union of argument tuples.
export type IntersectionVersusUnionProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<IntersectionVersusUnionProfile["intersectionStringFirst"], [x: number]>>;
type _08b = Expect<Equal<IntersectionVersusUnionProfile["intersectionNumberFirst"], [x: string]>>;
type _08c = Expect<
  Equal<IntersectionVersusUnionProfile["unionOfFunctions"], [x: string] | [x: number]>
>;
type _08d = Expect<Equal<IntersectionVersusUnionProfile["withProperties"], [x: string]>>;
type _08e = Expect<Equal<IntersectionVersusUnionProfile["unionIsATupleUnion"], true>>;

// 9. Report the top and bottom inputs and the broad rest domains.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtremeInputProfile["anyInput"], unknown[]>>;
type _09b = Expect<Equal<ExtremeInputProfile["neverInput"], never>>;
type _09c = Expect<Equal<ExtremeInputProfile["anyRest"], true>>;
type _09d = Expect<Equal<ExtremeInputProfile["unknownRest"], unknown[]>>;
type _09e = Expect<Equal<ExtremeInputProfile["neverRest"], never[]>>;

// ─── Readers and adapters built on the capture ────────────────────────

// 10. Build the reader for a signature's first argument. Indexing the captured
//     tuple will not do, because a nullary signature has no position zero — and
//     note that a nullary signature still matches a one-parameter pattern, so the
//     inference simply finds no candidate and lands on `unknown`.
export type FirstParameterOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _10a = Expect<Equal<FirstParameterOf<(x: string) => void>, string>>;
type _10b = Expect<Equal<FirstParameterOf<() => void>, unknown>>;
type _10c = Expect<Equal<FirstParameterOf<(a: 1, b: 2) => void>, 1>>;
type _10d = Expect<Equal<FirstParameterOf<(...values: number[]) => void>, number>>;
type _10e = Expect<Equal<FirstParameterOf<(x?: string) => void>, string | undefined>>;

// 11. Build the adapter shape that a partially applied call would accept.
export type DropFirstParameterOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _11a = Expect<Equal<DropFirstParameterOf<(a: 1, b: 2) => void>, [b: 2]>>;
type _11b = Expect<Equal<DropFirstParameterOf<() => void>, []>>;
type _11c = Expect<Equal<DropFirstParameterOf<(a: 1) => void>, []>>;
type _11d = Expect<
  Equal<DropFirstParameterOf<(a: 1, ...rest: string[]) => void>, [...rest: string[]]>
>;
type _11e = Expect<Equal<DropFirstParameterOf<(a: 1, b: 2, c: 3) => void>, [b: 2, c: 3]>>;

// 12. Build the arity reader, which is the tuple's own length domain rather than
//     a count the signature stores anywhere.
export type ArityOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _12a = Expect<Equal<ArityOf<() => void>, 0>>;
type _12b = Expect<Equal<ArityOf<(a: 1, b: 2) => void>, 2>>;
type _12c = Expect<Equal<ArityOf<(x?: string) => void>, 0 | 1>>;
type _12d = Expect<Equal<ArityOf<(...values: number[]) => void>, number>>;
type _12e = Expect<Equal<ArityOf<(head: string, ...tail: number[]) => void>, number>>;

// 13. Build the forwarding signature that accepts the same arguments as another
//     function and produces the same result.
export type ForwardingSignatureOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ForwardingSignatureOf<(x: string) => number>, (x: string) => number>
>;
type _13b = Expect<Equal<ForwardingSignatureOf<() => void>, () => void>>;
type _13c = Expect<
  Equal<
    ForwardingSignatureOf<(head: string, ...tail: number[]) => boolean>,
    (head: string, ...tail: number[]) => boolean
  >
>;
type _13d = Expect<
  Equal<
    ForwardingSignatureOf<(this: { id: string }, value: number) => void>,
    (value: number) => void
  >
>;
type _13e = Expect<
  Equal<RebuiltParameters<ForwardingSignatureOf<(a: 1, b?: 2) => void>>, [a: 1, b?: 2 | undefined]>
>;

// 14. Build the tuple-call signature the packet exports, which takes the captured
//     argument list as one value.
export type CallRuntimeApi = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    CallRuntimeApi["callWithTuple"],
    <Fn extends (...args: any[]) => any>(
      fn: Fn,
      args: RebuiltParameters<Fn>,
    ) => ReturnType<Fn>
  >
>;
type _14b = Expect<
  Equal<Parameters<typeof givenCallWithTuple<(x: string) => number>>[1], [x: string]>
>;
type _14c = Expect<
  Equal<
    {
      result: ReturnType<typeof givenCallWithTuple<(x: string) => number>>;
      arguments: Parameters<typeof givenCallWithTuple<(x: string) => number>>[1];
    },
    { result: number; arguments: [x: string] }
  >
>;
type _14d = Expect<Equal<Parameters<typeof givenCallWithTuple<() => void>>[1], []>>;
type _14e = Expect<
  Equal<
    {
      forwarded: Parameters<typeof givenCallWithTuple<(this: { id: 1 }, v: number) => void>>[1];
      thisChannel: ThisParameterType<(this: { id: 1 }, v: number) => void>;
    },
    { forwarded: [v: number]; thisChannel: { id: 1 } }
  >
>;
