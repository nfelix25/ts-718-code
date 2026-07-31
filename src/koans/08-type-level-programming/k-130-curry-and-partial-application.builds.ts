import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-130: curry and partial application — constructions
 * =============================================================================
 *
 * Currying peels one guaranteed parameter at a time; partial application removes
 * a whole supplied prefix at once. Both hinge on the same question — is the tuple
 * provably nonempty? — and both have to answer honestly when it is not. An
 * optional position or an open rest is not guaranteed to have a head, so the
 * recursion cannot keep peeling and instead falls back to a single function that
 * accepts the unresolved tail as a group. Prefix binding adds a direction that is
 * easy to get backwards: each supplied value must be assignable to the parameter
 * it binds, so a narrow argument can fill a broad slot but never the reverse.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenFormat = (name: string, count: number, active: boolean) => string;

interface GivenOverloaded {
  (value: string): 1;
  (value: number): 2;
}

// Declared with the packet's own signatures so constructions can be graded
// against real call sites.
declare function givenCurryN<Fn extends (...args: any[]) => any>(
  fn: Fn,
  arity?: number,
): CurryFunctionOf<Fn>;
declare function givenPartial<Fn extends (...args: any[]) => any, const Bound extends readonly unknown[]>(
  fn: Fn,
  ...bound: Bound
): PartiallyAppliedOf<Fn, Bound>;

// ─── Peeling one parameter at a time ──────────────────────────────────

// 1. Build the tuple-level currying: an empty tuple has already produced the
//    result, a provably nonempty tuple takes one argument and curries the rest,
//    and anything else is not guaranteed to have a head at all.
//    `CurryArgsOf<[string, number], boolean>` is `(arg: string) => (arg: number) => boolean`.
//    Hint: the third branch is the honest fallback — accept the whole unresolved
//    tail as a rest parameter.
export type CurryArgsOf<Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _01a = Expect<Equal<CurryArgsOf<[], number>, number>>;
type _01b = Expect<Equal<CurryArgsOf<[string], number>, (arg: string) => number>>;
type _01c = Expect<
  Equal<CurryArgsOf<[string, number], boolean>, (arg: string) => (arg: number) => boolean>
>;
type _01d = Expect<
  Equal<CurryArgsOf<[x?: string], number>, (x?: string | undefined) => number>
>;
type _01e = Expect<Equal<CurryArgsOf<string[], boolean>, (...args: string[]) => boolean>>;

// 2. Build the function-level currying by reflecting the signature first.
export type CurryFunctionOf<Fn extends (...args: any[]) => any> = TODO; // TODO(koan)

type _02a = Expect<Equal<CurryFunctionOf<() => number>, number>>;
type _02b = Expect<Equal<CurryFunctionOf<(value: string) => number>, (arg: string) => number>>;
type _02c = Expect<
  Equal<
    CurryFunctionOf<GivenFormat>,
    (arg: string) => (arg: number) => (arg: boolean) => string
  >
>;
type _02d = Expect<
  Equal<
    CurryFunctionOf<(name: string, count: number) => boolean>,
    (arg: string) => (arg: number) => boolean
  >
>;
type _02e = Expect<Equal<CurryFunctionOf<never>, never>>;

// ─── Removing a supplied prefix ───────────────────────────────────────

// 3. Build the prefix check: walk both tuples together, prove each supplied value
//    fits the parameter it binds, and return whatever parameters are left. An
//    exhausted prefix stops early; an unfittable value fails the whole binding.
export type RemainingArgsOf<
  All extends readonly unknown[],
  Bound extends readonly unknown[],
> = TODO; // TODO(koan)

type _03a = Expect<Equal<RemainingArgsOf<[string, number], ["Ada"]>, [number]>>;
type _03b = Expect<Equal<RemainingArgsOf<["Ada", number], [string]>, never>>;
type _03c = Expect<Equal<RemainingArgsOf<[string, number], []>, [string, number]>>;
type _03d = Expect<Equal<RemainingArgsOf<[string], [string]>, []>>;
type _03e = Expect<Equal<RemainingArgsOf<[], [string]>, never>>;

// 4. Build the partial application, which turns a surviving parameter tuple back
//    into a callable and reports failure as `never` rather than a broken one.
//    Hint: capture the remaining tuple once with `infer`, then test it for the
//    failure sentinel before using it.
export type PartiallyAppliedOf<
  Fn extends (...args: any[]) => any,
  Bound extends readonly unknown[],
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    PartiallyAppliedOf<GivenFormat, []>,
    (name: string, count: number, active: boolean) => string
  >
>;
type _04b = Expect<
  Equal<PartiallyAppliedOf<GivenFormat, [string]>, (count: number, active: boolean) => string>
>;
type _04c = Expect<
  Equal<PartiallyAppliedOf<GivenFormat, [string, number]>, (active: boolean) => string>
>;
type _04d = Expect<
  Equal<PartiallyAppliedOf<GivenFormat, [string, number, boolean]>, () => string>
>;
type _04e = Expect<Equal<PartiallyAppliedOf<GivenFormat, [number]>, never>>;

// ─── When the tuple is not provably nonempty ──────────────────────────

// 5. Report the fallback branch, where an optional position or an open rest ends
//    the peeling and the remaining parameters are accepted as one group.
export type UnresolvedTailProfile = TODO; // TODO(koan)

type _05a = Expect<
  Equal<UnresolvedTailProfile["soleOptional"], (value?: string | undefined) => number>
>;
type _05b = Expect<
  Equal<
    UnresolvedTailProfile["requiredThenOptional"],
    (arg: string) => (count?: number | undefined) => boolean
  >
>;
type _05c = Expect<Equal<UnresolvedTailProfile["restOnly"], (...values: number[]) => number>>;
type _05d = Expect<
  Equal<UnresolvedTailProfile["headThenRest"], (arg: string) => (...tail: number[]) => boolean>
>;
type _05e = Expect<
  Equal<
    UnresolvedTailProfile["optionalThenRest"],
    (head?: string | undefined, ...tail: number[]) => boolean
  >
>;

// 6. Report the same fallback reached through the broad element domains.
export type BroadTailProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<BroadTailProfile["unknownRest"], (...args: unknown[]) => number>>;
type _06b = Expect<Equal<BroadTailProfile["neverRest"], (...args: never[]) => any>>;
type _06c = Expect<Equal<BroadTailProfile["stringRest"], (...args: string[]) => boolean>>;
type _06d = Expect<Equal<BroadTailProfile["emptyTuple"], "done">>;
type _06e = Expect<Equal<BroadTailProfile["singleThenEmpty"], (arg: 1) => "done">>;

// ─── Binding is directional ───────────────────────────────────────────

// 7. Report the direction of the prefix check: a narrow value fills a broad slot,
//    but a broad value cannot fill a narrow one.
export type BindingDirectionProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<BindingDirectionProfile["narrowIntoBroad"], [number]>>;
type _07b = Expect<Equal<BindingDirectionProfile["broadIntoNarrow"], never>>;
type _07c = Expect<Equal<BindingDirectionProfile["literalIntoNumber"], []>>;
type _07d = Expect<Equal<BindingDirectionProfile["numberIntoLiteral"], never>>;
type _07e = Expect<Equal<BindingDirectionProfile["anythingIntoTop"], []>>;

// 8. Report the extreme domains in a binding position, where `never` distributing
//    makes even a self-binding fail.
export type BindingExtremeProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<BindingExtremeProfile["emptyIntoEmpty"], never>>;
type _08b = Expect<Equal<BindingExtremeProfile["anythingIntoAny"], []>>;
type _08c = Expect<Equal<BindingExtremeProfile["anyIntoAnything"], []>>;
type _08d = Expect<Equal<BindingExtremeProfile["tooManyBound"], never>>;
type _08e = Expect<Equal<BindingExtremeProfile["boundBeyondEmpty"], never>>;

// 9. Report partial application over the same unresolved tails, where an open
//    rest keeps accepting more after its head is bound.
export type PartialTailProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<PartialTailProfile["optionalUnbound"], (x?: string | undefined) => number>
>;
type _09b = Expect<
  Equal<PartialTailProfile["headOfRestBound"], (...tail: number[]) => boolean>
>;
type _09c = Expect<Equal<PartialTailProfile["restStillOpen"], number[]>>;
type _09d = Expect<Equal<PartialTailProfile["genericBound"], () => unknown>>;
type _09e = Expect<Equal<PartialTailProfile["overloadBound"], () => 2>>;

// ─── Inherited reflection limits ──────────────────────────────────────

// 10. Report both operations inheriting whatever the signature reflection could
//     recover — no more.
export type ReflectionLimitProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ReflectionLimitProfile["genericCurried"], (arg: unknown) => unknown>>;
type _10b = Expect<
  Equal<ReflectionLimitProfile["constrainedCurried"], (arg: string) => string>
>;
type _10c = Expect<Equal<ReflectionLimitProfile["overloadCurried"], (arg: number) => 2>>;
type _10d = Expect<Equal<ReflectionLimitProfile["receiverDropped"], (arg: string) => number>>;
type _10e = Expect<Equal<ReflectionLimitProfile["receiverDroppedPartial"], () => number>>;

// 11. Report the top and bottom inputs, where the reflection itself degrades
//     before either operation gets a chance to run.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExtremeInputProfile["anyCurried"], (...args: unknown[]) => any>>;
type _11b = Expect<Equal<ExtremeInputProfile["anyIsNotAny"], false>>;
type _11c = Expect<Equal<ExtremeInputProfile["neverCurried"], never>>;
type _11d = Expect<Equal<ExtremeInputProfile["neverPartial"], never>>;
type _11e = Expect<Equal<ExtremeInputProfile["neverRestReturn"], (...args: never[]) => any>>;

// ─── Surfaces built on the two operations ─────────────────────────────

// 12. Build the predicate that reports whether a tuple can actually be peeled one
//     position at a time, which is what decides between the two branches.
export type IsFullyCurryableOf<Args extends readonly unknown[]> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    { fixed: IsFullyCurryableOf<[string, number]>; empty: IsFullyCurryableOf<[]> },
    { fixed: true; empty: true }
  >
>;
type _12b = Expect<
  Equal<
    { optional: IsFullyCurryableOf<[x?: string]>; broad: IsFullyCurryableOf<string[]> },
    { optional: false; broad: false }
  >
>;
type _12c = Expect<
  Equal<
    {
      headThenRest: IsFullyCurryableOf<[head: string, ...tail: number[]]>;
      single: IsFullyCurryableOf<[1]>;
    },
    { headThenRest: false; single: true }
  >
>;
type _12d = Expect<
  Equal<
    {
      fromFormat: IsFullyCurryableOf<Parameters<GivenFormat>>;
      fromOptional: IsFullyCurryableOf<Parameters<(x: string, y?: number) => void>>;
    },
    { fromFormat: true; fromOptional: false }
  >
>;
type _12e = Expect<
  Equal<
    {
      readonlyTuple: IsFullyCurryableOf<readonly [1, 2]>;
      neverRest: IsFullyCurryableOf<never[]>;
    },
    { readonlyTuple: true; neverRest: false }
  >
>;

// 13. Build the arity reader for a curried chain: how many single-argument
//     functions deep it goes before producing a result.
export type CurryDepthOf<
  Args extends readonly unknown[],
  Counted extends readonly unknown[] = [],
> = TODO; // TODO(koan)

type _13a = Expect<Equal<CurryDepthOf<[string, number, boolean]>, 3>>;
type _13b = Expect<Equal<CurryDepthOf<[]>, 0>>;
type _13c = Expect<Equal<CurryDepthOf<[string]>, 1>>;
type _13d = Expect<Equal<CurryDepthOf<Parameters<GivenFormat>>, 3>>;
type _13e = Expect<Equal<CurryDepthOf<string[]>, 0>>;

// 14. Build the two signatures the packet exports. Note that the runtime curry
//     takes an arity it cannot type-check against the tuple, which is exactly the
//     gap the fallback branch leaves open.
export type CurryRuntimeApi = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    CurryRuntimeApi["curryN"],
    <Fn extends (...args: any[]) => any>(fn: Fn, arity?: number) => CurryFunctionOf<Fn>
  >
>;
type _14b = Expect<
  Equal<
    CurryRuntimeApi["partial"],
    <Fn extends (...args: any[]) => any, const Bound extends readonly unknown[]>(
      fn: Fn,
      ...bound: Bound
    ) => PartiallyAppliedOf<Fn, Bound>
  >
>;
type _14c = Expect<
  Equal<
    ReturnType<typeof givenCurryN<GivenFormat>>,
    (arg: string) => (arg: number) => (arg: boolean) => string
  >
>;
type _14d = Expect<
  Equal<
    ReturnType<typeof givenPartial<GivenFormat, [string]>>,
    (count: number, active: boolean) => string
  >
>;
type _14e = Expect<
  Equal<
    {
      arityIsUnchecked: Parameters<typeof givenCurryN<GivenFormat>>[1];
      realDepth: CurryDepthOf<Parameters<GivenFormat>>;
    },
    { arityIsUnchecked: number | undefined; realDepth: 3 }
  >
>;
