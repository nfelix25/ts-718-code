import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-095: last and init — constructions
 * =============================================================================
 *
 * These constructions decompose tuple shapes from the right only when a fixed
 * final position is guaranteed. They extract the last value and the ordered
 * mutable init, deliberately reapply readonly, distribute over tuple unions,
 * and reject empty tuples, arrays, trailing rests, and optional suffixes. They
 * also cover fixed suffixes after leading or middle rests, never filtering,
 * special inputs, helper signatures, and repeated right decomposition. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenLast<Value extends readonly unknown[]> =
  Value extends readonly [...unknown[], infer Final]
    ? Final
    : never;

type GivenInit<Value extends readonly unknown[]> =
  Value extends readonly [...infer Beginning, unknown]
    ? Beginning
    : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenParameters = Parameters<
  (path: string, retries: number, force?: boolean) => void
>;

// ─── Core right decomposition ──────────────────────────────────────────

// 1. Extract the final position when the input guarantees one.
export type Last<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<Last<[1]>, 1>>;
type _01b = Expect<Equal<Last<[1, 2, 3]>, 3>>;
type _01c = Expect<Equal<Last<readonly ["x", true]>, true>>;
type _01d = Expect<Equal<Last<[]>, never>>;
type _01e = Expect<
  Equal<Last<[] | [1] | [2, 3]>, 1 | 3>
>;

// 2. Remove the guaranteed final position and preserve all earlier positions.
export type Init<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _02a = Expect<Equal<Init<[1]>, []>>;
type _02b = Expect<Equal<Init<[1, 2, 3]>, [1, 2]>>;
type _02c = Expect<
  Equal<Init<readonly ["x", true, 3]>, ["x", true]>
>;
type _02d = Expect<
  Equal<Init<[...names: string[], count: number]>, string[]>
>;
type _02e = Expect<
  Equal<Init<[] | [1] | [2, 3]>, [] | [2]>
>;

// 3. Reapply readonly to the mutable init inferred from a readonly input.
export type ReadonlyInit<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<ReadonlyInit<readonly [1, 2, 3]>, readonly [1, 2]>
>;
type _03b = Expect<
  Equal<ReadonlyInit<[1]>, readonly []>
>;
type _03c = Expect<
  Equal<
    ReadonlyInit<[...names: string[], count: number]>,
    readonly string[]
  >
>;
type _03d = Expect<
  Equal<
    ReadonlyInit<[start: boolean, ...middle: string[], end: number]>,
    readonly [start: boolean, ...middle: string[]]
  >
>;
type _03e = Expect<Equal<ReadonlyInit<[]>, never>>;

// 4. Capture init and last together in one labeled result tuple.
export type SplitInitLast<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<SplitInitLast<[1]>, [init: [], last: 1]>
>;
type _04b = Expect<
  Equal<
    SplitInitLast<readonly ["x", true, 3]>,
    [init: ["x", true], last: 3]
  >
>;
type _04c = Expect<
  Equal<
    SplitInitLast<[...names: string[], count: number]>,
    [init: string[], last: number]
  >
>;
type _04d = Expect<Equal<SplitInitLast<[]>, never>>;
type _04e = Expect<
  Equal<
    SplitInitLast<[1] | [2, 3]>,
    [init: [], last: 1] | [init: [2], last: 3]
  >
>;

// 5. Reconstruct any tuple with a guaranteed fixed suffix from its pieces.
export type RebuildFromLast<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<RebuildFromLast<[1]>, [1]>>;
type _05b = Expect<
  Equal<RebuildFromLast<readonly [1, 2, 3]>, [1, 2, 3]>
>;
type _05c = Expect<
  Equal<
    RebuildFromLast<[...names: string[], count: number]>,
    [...string[], number]
  >
>;
type _05d = Expect<
  Equal<
    RebuildFromLast<[start: boolean, ...string[], end: number]>,
    [boolean, ...string[], number]
  >
>;
type _05e = Expect<Equal<RebuildFromLast<string[]>, never>>;

// 6. Extract the penultimate required position by taking Last of Init.
export type Penultimate<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<Penultimate<[1, 2]>, 1>>;
type _06b = Expect<Equal<Penultimate<[1, 2, 3]>, 2>>;
type _06c = Expect<
  Equal<Penultimate<readonly ["x", true]>, "x">
>;
type _06d = Expect<Equal<Penultimate<[1]>, never>>;
type _06e = Expect<
  Equal<Penultimate<[1, 2] | [3, 4, 5]>, 1 | 4>
>;

// 7. Remove two guaranteed final positions by applying Init twice.
export type DropLastTwo<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<Equal<DropLastTwo<[1, 2]>, []>>;
type _07b = Expect<
  Equal<DropLastTwo<[1, 2, 3, 4]>, [1, 2]>
>;
type _07c = Expect<
  Equal<DropLastTwo<readonly ["x", true, 3]>, ["x"]>
>;
type _07d = Expect<Equal<DropLastTwo<[1]>, never>>;
type _07e = Expect<
  Equal<
    DropLastTwo<[1, 2] | [3, 4, 5]>,
    [] | [3]
  >
>;

// ─── Function and helper tuple surfaces ────────────────────────────────

// 8. Extract the final required parameter type from a call signature.
export type LastParameter<
  FunctionType extends (...arguments_: never[]) => unknown,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<LastParameter<(path: string) => void>, string>>;
type _08b = Expect<
  Equal<
    LastParameter<(path: string, retries: number) => void>,
    number
  >
>;
type _08c = Expect<
  Equal<LastParameter<(value: 42) => 42>, 42>
>;
type _08d = Expect<Equal<LastParameter<() => void>, never>>;
type _08e = Expect<
  Equal<
    LastParameter<
      ((value: "a") => void) | ((value: "b", flag: true) => void)
    >,
    "a" | true
  >
>;

// 9. Remove the last required parameter and preserve the earlier parameter tuple.
export type LeadingParameters<
  FunctionType extends (...arguments_: never[]) => unknown,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<LeadingParameters<(path: string) => void>, []>
>;
type _09b = Expect<
  Equal<
    LeadingParameters<(path: string, retries: number) => void>,
    [path: string]
  >
>;
type _09c = Expect<
  Equal<
    LeadingParameters<(a: string, b: number, c: boolean) => void>,
    [a: string, b: number]
  >
>;
type _09d = Expect<Equal<LeadingParameters<() => void>, never>>;
type _09e = Expect<
  Equal<
    LeadingParameters<
      ((value: "a") => void) | ((value: "b", flag: true) => void)
    >,
    [] | [value: "b"]
  >
>;

// 10. Build the runtime helper return shapes from one fixed-ending tuple.
export type LastInitHelperProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<LastInitHelperProfile["last"], true>>;
type _10b = Expect<
  Equal<LastInitHelperProfile["dropped"], ["a", 1]>
>;
type _10c = Expect<
  Equal<
    LastInitHelperProfile["popped"],
    [init: ["a", 1], last: true]
  >
>;
type _10d = Expect<Equal<LastInitHelperProfile["singletonInit"], []>>;
type _10e = Expect<
  Equal<LastInitHelperProfile["arrayFallback"], string | undefined>
>;

// ─── Fixed endings and distributed failure ─────────────────────────────

// 11. Describe inputs that do not prove a fixed final position.
export type FixedEndingProofProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<FixedEndingProofProfile["emptyLast"], never>>;
type _11b = Expect<Equal<FixedEndingProofProfile["arrayLast"], never>>;
type _11c = Expect<
  Equal<FixedEndingProofProfile["trailingRestLast"], never>
>;
type _11d = Expect<Equal<FixedEndingProofProfile["optionalLast"], never>>;
type _11e = Expect<
  Equal<FixedEndingProofProfile["requiredOptionalInit"], never>
>;

// 12. Decompose fixed suffixes after leading and middle rest regions.
export type FixedSuffixProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<FixedSuffixProfile["leadingLast"], number>>;
type _12b = Expect<Equal<FixedSuffixProfile["leadingInit"], string[]>>;
type _12c = Expect<Equal<FixedSuffixProfile["middleLast"], number>>;
type _12d = Expect<
  Equal<
    FixedSuffixProfile["middleInit"],
    [start: boolean, ...middle: string[]]
  >
>;
type _12e = Expect<Equal<FixedSuffixProfile["neverInit"], never[]>>;

// 13. Preserve results from fixed-ending union members and drop open branches.
export type DistributedRightProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<DistributedRightProfile["lasts"], 1 | 3>
>;
type _13b = Expect<
  Equal<DistributedRightProfile["inits"], [] | [2]>
>;
type _13c = Expect<
  Equal<DistributedRightProfile["arrayFilteredLast"], 1>
>;
type _13d = Expect<
  Equal<DistributedRightProfile["arrayFilteredInit"], [1]>
>;
type _13e = Expect<
  Equal<DistributedRightProfile["openFilteredLast"], 1 | 3>
>;

// 14. Show where never results erase the difference between failure and presence.
export type NeverLastProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NeverLastProfile["emptyLast"], never>>;
type _14b = Expect<Equal<NeverLastProfile["presentNeverLast"], never>>;
type _14c = Expect<Equal<NeverLastProfile["emptyInit"], never>>;
type _14d = Expect<Equal<NeverLastProfile["presentNeverInit"], []>>;
type _14e = Expect<Equal<NeverLastProfile["filteredUnionLast"], 1>>;

// 15. Describe readonly loss during Init inference and deliberate reapplication.
export type ReadonlyInitProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<ReadonlyInitProfile["inferredInit"], [1]>
>;
type _15b = Expect<
  Equal<ReadonlyInitProfile["readonlyInit"], readonly [1]>
>;
type _15c = Expect<
  Equal<ReadonlyInitProfile["inferredHasPush"], true>
>;
type _15d = Expect<
  Equal<ReadonlyInitProfile["readonlyFitsInferred"], false>
>;
type _15e = Expect<
  Equal<ReadonlyInitProfile["inferredFitsReadonly"], true>
>;

// 16. Classify any, never, and unknown at the right-decomposition boundary.
export type SpecialRightProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SpecialRightProfile["anyLastIsAny"], false>>;
type _16b = Expect<Equal<SpecialRightProfile["anyInitIsAny"], false>>;
type _16c = Expect<Equal<SpecialRightProfile["neverLast"], never>>;
type _16d = Expect<Equal<SpecialRightProfile["neverInit"], never>>;
type _16e = Expect<Equal<SpecialRightProfile["unknownLast"], unknown>>;

// 17. Contrast an optional parameter suffix with its required counterpart.
export type OptionalParameterEndingProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    OptionalParameterEndingProfile["parameters"],
    [path: string, retries: number, force?: boolean | undefined]
  >
>;
type _17b = Expect<
  Equal<OptionalParameterEndingProfile["optionalLast"], never>
>;
type _17c = Expect<
  Equal<OptionalParameterEndingProfile["optionalInit"], never>
>;
type _17d = Expect<
  Equal<OptionalParameterEndingProfile["requiredLast"], boolean>
>;
type _17e = Expect<
  Equal<
    OptionalParameterEndingProfile["requiredInit"],
    [path: string, retries: number]
  >
>;

// 18. Build one complete right-decomposition view for a tuple or array.
export type LastInitSummary<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    LastInitSummary<readonly [name: string, score: number]>,
    {
      value: readonly [name: string, score: number];
      last: number;
      init: [name: string];
      readonlyInit: readonly [name: string];
      decomposable: true;
    }
  >
>;
type _18b = Expect<
  Equal<
    LastInitSummary<[]>["last" | "init" | "decomposable"],
    false
  >
>;
type _18c = Expect<
  Equal<
    LastInitSummary<string[]>["last" | "init" | "decomposable"],
    false
  >
>;
type _18d = Expect<
  Equal<
    LastInitSummary<[...names: string[], count: number]>["last" | "init"],
    number | string[]
  >
>;
type _18e = Expect<
  Equal<
    LastInitSummary<[1] | [2, 3]>["last" | "init"],
    1 | 3 | [] | [2]
  >
>;
