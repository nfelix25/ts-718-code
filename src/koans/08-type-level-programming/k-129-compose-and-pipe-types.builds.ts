import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-129: compose and pipe types — constructions
 * =============================================================================
 *
 * A unary pipeline is recursive tuple evaluation: prove the head accepts the
 * current input, capture what it returns, and recurse through the tail with that
 * output as the next input. Composition is the same evaluation after reversing
 * the tuple. The design problem worth dwelling on is that the failure answer and
 * a perfectly valid answer collide — a broken link yields `never`, but so does a
 * function that genuinely returns `never`, so a separate validity flag is the
 * only way to tell them apart. Watch too for the inferred head being a naked type
 * variable: a union of functions distributes, which quietly turns one invalid
 * branch into a silently dropped `never` rather than an error. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenReverse<Values extends readonly unknown[], Acc extends unknown[] = []> =
  Values extends readonly [infer Head, ...infer Tail] ? GivenReverse<Tail, [Head, ...Acc]> : Acc;

type GivenParse = (text: string) => number;
type GivenPositive = (value: number) => boolean;
type GivenLabel = (value: boolean) => "yes" | "no";

// Declared with the packet's own factory signatures so constructions can be
// graded against real call sites.
declare function givenPipe<Input, const Fns extends readonly ((input: any) => any)[]>(
  ...fns: Fns
): (input: Input) => PipeResultOf<Input, Fns>;
declare function givenCompose<Input, const Fns extends readonly ((input: any) => any)[]>(
  ...fns: Fns
): (input: Input) => ComposeResultOf<Input, Fns>;

// ─── Evaluating a pipeline ────────────────────────────────────────────

// 1. Build the left-to-right evaluation: take the head, prove it accepts the
//    current input, and recurse through the tail with what it returned. An empty
//    tuple is the identity.
//    `PipeResultOf<string, [(t: string) => number]>` is `number`.
export type PipeResultOf<Input, Fns extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<PipeResultOf<string, []>, string>>;
type _01b = Expect<Equal<PipeResultOf<string, [GivenParse]>, number>>;
type _01c = Expect<Equal<PipeResultOf<string, [GivenParse, GivenPositive]>, boolean>>;
type _01d = Expect<
  Equal<PipeResultOf<string, [GivenParse, GivenPositive, GivenLabel]>, "yes" | "no">
>;
type _01e = Expect<Equal<PipeResultOf<string, [GivenPositive, GivenLabel]>, never>>;

// 2. Build the validity flag, which answers the question the result cannot: did
//    every link actually connect?
export type IsPipeableOf<Input, Fns extends readonly unknown[]> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<IsPipeableOf<string, [GivenParse, GivenPositive, GivenLabel]>, true>
>;
type _02b = Expect<Equal<IsPipeableOf<string, [GivenPositive, GivenLabel]>, false>>;
type _02c = Expect<Equal<IsPipeableOf<string, []>, true>>;
type _02d = Expect<Equal<IsPipeableOf<string, [(value: string) => never]>, true>>;
type _02e = Expect<Equal<IsPipeableOf<string, [(value: "x") => number]>, false>>;

// 3. Build the record of every intermediate type, starting from the input.
//    Hint: the accumulator is a supplied default, so the recursion only has to
//    append the output it just captured.
export type PipeStagesOf<
  Input,
  Fns extends readonly unknown[],
  Stages extends readonly unknown[] = [Input],
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    PipeStagesOf<string, [GivenParse, GivenPositive, GivenLabel]>,
    [string, number, boolean, "yes" | "no"]
  >
>;
type _03b = Expect<Equal<PipeStagesOf<string, []>, [string]>>;
type _03c = Expect<Equal<PipeStagesOf<string, [(x: string) => number]>, [string, number]>>;
type _03d = Expect<Equal<PipeStagesOf<string, [GivenPositive]>, never>>;
type _03e = Expect<
  Equal<PipeStagesOf<string, [GivenParse, GivenPositive, GivenLabel]>["length"], 4>
>;

// 4. Build the right-to-left evaluation, which is the same walk over a reversed
//    tuple.
export type ComposeResultOf<Input, Fns extends readonly unknown[]> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ComposeResultOf<string, [GivenLabel, GivenPositive, GivenParse]>, "yes" | "no">
>;
type _04b = Expect<Equal<ComposeResultOf<number, [GivenLabel, GivenPositive]>, "yes" | "no">>;
type _04c = Expect<Equal<ComposeResultOf<string, [GivenParse]>, number>>;
type _04d = Expect<Equal<ComposeResultOf<string, []>, string>>;
type _04e = Expect<
  Equal<ComposeResultOf<string, [GivenParse, GivenPositive]>, never>
>;

// ─── The collision at `never` ─────────────────────────────────────────

// 5. Report the ambiguity that makes the flag necessary: a broken link and a
//    genuinely empty return produce the same result.
export type NeverAmbiguityProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<NeverAmbiguityProfile["validEmptyResult"], never>>;
type _05b = Expect<Equal<NeverAmbiguityProfile["validEmptyFlag"], true>>;
type _05c = Expect<Equal<NeverAmbiguityProfile["brokenLinkResult"], never>>;
type _05d = Expect<Equal<NeverAmbiguityProfile["brokenLinkFlag"], false>>;
type _05e = Expect<Equal<NeverAmbiguityProfile["resultsAreIdentical"], true>>;

// 6. Report a pipeline continuing past an empty output, since `never` is a
//    perfectly acceptable input for the next link.
export type EmptyDomainProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<EmptyDomainProfile["continuesPastNever"], 1>>;
type _06b = Expect<Equal<EmptyDomainProfile["continuesFlag"], true>>;
type _06c = Expect<Equal<EmptyDomainProfile["emptyInput"], 1>>;
type _06d = Expect<Equal<EmptyDomainProfile["emptyInputFlag"], true>>;
type _06e = Expect<Equal<EmptyDomainProfile["emptyStages"], [string, never]>>;

// ─── Which links connect ──────────────────────────────────────────────

// 7. Report the link test being assignability, so a consumer that accepts more
//    than it is given still connects while a narrower one does not.
export type LinkAssignabilityProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<LinkAssignabilityProfile["narrowerInput"], number>>;
type _07b = Expect<Equal<LinkAssignabilityProfile["broaderConsumer"], number>>;
type _07c = Expect<Equal<LinkAssignabilityProfile["narrowerConsumerResult"], never>>;
type _07d = Expect<Equal<LinkAssignabilityProfile["narrowerConsumerFlag"], false>>;
type _07e = Expect<Equal<LinkAssignabilityProfile["topInputFlag"], false>>;

// 8. Report arity, where a link only has to be callable with one argument: extra
//    optional parameters are fine, an extra required one is not, and a nullary
//    function connects while ignoring what it was handed.
export type ArityProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<ArityProfile["extraOptional"], boolean>>;
type _08b = Expect<Equal<ArityProfile["extraRequiredFlag"], false>>;
type _08c = Expect<Equal<ArityProfile["extraRequiredResult"], never>>;
type _08d = Expect<Equal<ArityProfile["nullary"], number>>;
type _08e = Expect<Equal<ArityProfile["nullaryFlag"], true>>;

// ─── The head is a naked type variable ────────────────────────────────

// 9. Report a union of functions distributing, so a pipeline can quietly keep
//    only the branches that happened to connect — and the flag becomes `boolean`
//    rather than a definite answer.
export type UnionLinkProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<UnionLinkProfile["bothConnect"], 1 | 2>>;
type _09b = Expect<Equal<UnionLinkProfile["onlyOneConnects"], 1>>;
type _09c = Expect<Equal<UnionLinkProfile["mixedFlag"], boolean>>;
type _09d = Expect<Equal<UnionLinkProfile["intersection"], 2>>;
type _09e = Expect<Equal<UnionLinkProfile["narrowerBranch"], 1 | 2>>;

// 10. Report a generic link, where inference has no call site to learn from and
//     falls back on the type parameter's constraint.
export type GenericLinkProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<GenericLinkProfile["unconstrained"], unknown>>;
type _10b = Expect<Equal<GenericLinkProfile["constrained"], string>>;
type _10c = Expect<Equal<GenericLinkProfile["unconstrainedFlag"], true>>;
type _10d = Expect<Equal<GenericLinkProfile["followedByConcrete"], false>>;
type _10e = Expect<
  Equal<GenericLinkProfile["stages"], [string, unknown, boolean]>
>;

// 11. Report the top and bottom inputs, and a function tuple too broad to be
//     decomposed at all — which quietly makes the pipeline an identity.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExtremeInputProfile["anyInput"], true>>;
type _11b = Expect<Equal<ExtremeInputProfile["anyOutput"], true>>;
type _11c = Expect<Equal<ExtremeInputProfile["topInput"], string>>;
type _11d = Expect<Equal<ExtremeInputProfile["broadTuple"], string>>;
type _11e = Expect<Equal<ExtremeInputProfile["broadTupleStages"], [string]>>;

// ─── Surfaces built on the evaluation ─────────────────────────────────

// 12. Build the reader for the pipeline's own signature: from the original input
//     straight to the final output.
export type PipelineSignatureOf<Input, Fns extends readonly unknown[]> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    PipelineSignatureOf<string, [GivenParse, GivenPositive]>,
    (input: string) => boolean
  >
>;
type _12b = Expect<Equal<PipelineSignatureOf<string, []>, (input: string) => string>>;
type _12c = Expect<
  Equal<ReturnType<PipelineSignatureOf<string, [GivenParse]>>, number>
>;
type _12d = Expect<
  Equal<Parameters<PipelineSignatureOf<"x", [GivenParse]>>, [input: "x"]>
>;
type _12e = Expect<
  Equal<ReturnType<PipelineSignatureOf<string, [GivenPositive]>>, never>
>;

// 13. Build the reader that names the first input a pipeline would reject, which
//     is the diagnostic the bare result cannot give.
//     Hint: walk with the same proof, but return the offending input instead of
//     continuing.
export type FirstBrokenInputOf<Input, Fns extends readonly unknown[]> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<FirstBrokenInputOf<string, [GivenParse, GivenPositive, GivenLabel]>, never>
>;
type _13b = Expect<Equal<FirstBrokenInputOf<string, [GivenPositive]>, string>>;
type _13c = Expect<
  Equal<FirstBrokenInputOf<string, [GivenParse, GivenLabel]>, number>
>;
type _13d = Expect<Equal<FirstBrokenInputOf<string, []>, never>>;
type _13e = Expect<
  Equal<FirstBrokenInputOf<string, [GivenParse, GivenPositive, GivenParse]>, boolean>
>;

// 14. Build the two curried factory signatures the packet exports, where fixing
//     the input type first is what lets the function tuple be checked against it.
export type PipelineRuntimeApi = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    PipelineRuntimeApi["pipeFrom"],
    <Input>() => <const Fns extends readonly ((input: any) => any)[]>(
      ...fns: Fns
    ) => (input: Input) => PipeResultOf<Input, Fns>
  >
>;
type _14b = Expect<
  Equal<
    PipelineRuntimeApi["composeFrom"],
    <Input>() => <const Fns extends readonly ((input: any) => any)[]>(
      ...fns: Fns
    ) => (input: Input) => ComposeResultOf<Input, Fns>
  >
>;
type _14c = Expect<
  Equal<
    ReturnType<typeof givenPipe<string, [GivenParse, GivenPositive]>>,
    (input: string) => boolean
  >
>;
type _14d = Expect<
  Equal<
    ReturnType<typeof givenCompose<string, [GivenPositive, GivenParse]>>,
    (input: string) => boolean
  >
>;
type _14e = Expect<
  Equal<
    {
      piped: PipeResultOf<string, [GivenParse, GivenPositive]>;
      composed: ComposeResultOf<string, [GivenPositive, GivenParse]>;
    },
    { piped: boolean; composed: boolean }
  >
>;
