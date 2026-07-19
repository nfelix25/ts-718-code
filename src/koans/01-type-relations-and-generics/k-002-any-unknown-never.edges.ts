import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  ClassifySpecial,
  IsAny,
  IsUnknown,
} from "./k-002-any-unknown-never.js";

/**
 * K-002 edge cases: top, bottom, and escape-hatch surprises
 * =============================================================================
 *
 * The basic lattice model is reliable, but special types interact sharply with
 * property access, conditional distribution, utility types, equality tests,
 * containers, and untrusted APIs. Some examples below preview machinery taught
 * in later phases. The point here is to remember the observed behavior and the
 * boundary-design consequence, not yet to reimplement every utility.
 */

// Group 1: Operations depend on guarantees, not on what might exist at runtime.
// `unknown` guarantees no keys. `any` permits arbitrary keys and leaks any from
// the access. `never` has no values, yet `keyof never` has its own algebraic rule.

type UnknownBag = { [key: string]: unknown };

type _E001 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<keyof any, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<ClassifySpecial<any["missing"]>, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<ClassifySpecial<any[123]>, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<ClassifySpecial<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<ClassifySpecial<unknown[][number]>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<keyof UnknownBag, TODO>>; // TODO(koan) @koan-error

function demonstrateOperations(value: unknown, escape: any): any {
  // Demonstration A: even Object-style methods require evidence on unknown.
  // @ts-expect-error An unknown value has no guaranteed `toString` property.
  value.toString();

  // Demonstration B: each unchecked access remains any, so an arbitrarily deep
  // and possibly invalid operation passes the checker.
  return escape.missing.deeply.callable();
}

type _SolvedUnknownKeys = Expect<Equal<keyof unknown, never>>;
type _SolvedAnyKeys = Expect<
  Equal<keyof any, string | number | symbol>
>;
type _SolvedUnknownElement = Expect<Equal<unknown[][number], unknown>>;

declare const unknownItems: unknown[];
// Demonstration C: the array shape is known, but its elements are not strings.
// @ts-expect-error unknown[] cannot promise that every element is a string.
const stringItems: string[] = unknownItems;

// Group 2: Naked conditional type parameters distribute over union members.
// -----------------------------------------------------------------------------
// Read `DistributeKind<T>` aloud as "for each member of T, classify whether that
// member is a string." Tuple wrapping asks one question about the union as a
// whole. This distinction makes never especially surprising: distributing over
// an empty union performs zero branch evaluations and returns never.

type DistributeKind<T> = T extends string ? "string" : "other";
type WholeKind<T> = [T] extends [string] ? "string" : "other";

type _E009 = Expect<Equal<DistributeKind<string>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<DistributeKind<number>, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<DistributeKind<string | number>, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<ClassifySpecial<DistributeKind<never>>, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<DistributeKind<unknown>, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<DistributeKind<any>, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<WholeKind<string | number>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<WholeKind<never>, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<WholeKind<unknown>, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<WholeKind<string>, TODO>>; // TODO(koan) @koan-error

// Demonstration D: distribution maps both members and unions the branch results.
type _SolvedDistributedUnion = Expect<
  Equal<DistributeKind<string | number>, "string" | "other">
>;

// Demonstration E: never is the empty union, so no distributed result remains.
type _SolvedDistributedNever = Expect<Equal<DistributeKind<never>, never>>;

// Demonstration F: wrapping never suppresses distribution. The whole impossible
// type is assignable to string, so the true branch is selected.
type _SolvedWholeNever = Expect<Equal<WholeKind<never>, "string">>;

// Demonstration G: a naked any causes both plausible branches to be considered.
type _SolvedConditionalAny = Expect<
  Equal<DistributeKind<any>, "string" | "other">
>;

// Group 3: Standard utilities preserve the special-type algebra they use.
// -----------------------------------------------------------------------------
// Exclude and Extract distribute. NonNullable removes nullish members. Awaited
// recursively unwraps promises. Track what happens when there are zero members,
// no usable guarantees, or an unchecked escape hatch.

type _E019 = Expect<Equal<ClassifySpecial<Exclude<any, string>>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<ClassifySpecial<Exclude<unknown, string>>, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<ClassifySpecial<Exclude<never, string>>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<ClassifySpecial<Extract<any, string>>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<ClassifySpecial<Extract<unknown, string>>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<ClassifySpecial<Extract<never, string>>, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<ClassifySpecial<NonNullable<any>>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<NonNullable<unknown>, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<ClassifySpecial<NonNullable<never>>, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<ClassifySpecial<Awaited<any>>, TODO>>; // TODO(koan) @koan-error

// Demonstration H: distributing Exclude over never still performs zero checks.
type _SolvedExcludeNever = Expect<Equal<Exclude<never, string>, never>>;

// Demonstration I: current NonNullable is intersection-based; removing null and
// undefined from unknown leaves the broad non-nullish type `{}`.
type _SolvedNonNullableUnknown = Expect<Equal<NonNullable<unknown>, {}>>;

// Demonstration J: Awaited keeps an unknown result safe and an any result unsafe.
type _SolvedAwaitedUnknown = Expect<Equal<Awaited<Promise<unknown>>, unknown>>;
type _SolvedAwaitedAny = Expect<Equal<Awaited<Promise<any>>, any>>;

// Group 4: Strict equality and detector implementations need explicit policies.
// -----------------------------------------------------------------------------
// The repository's Equal helper distinguishes any from ordinary types. A naive
// `T extends any` detector cannot do that because almost every type passes, while
// never distributes away before producing even `true`.

type _E029 = Expect<Equal<Equal<any, any>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Equal<any, string>, TODO>>; // TODO(koan) @koan-error
type _E031 = Expect<Equal<Equal<any, unknown>, TODO>>; // TODO(koan) @koan-error
type _E032 = Expect<Equal<Equal<unknown, unknown>, TODO>>; // TODO(koan) @koan-error
type _E033 = Expect<Equal<Equal<never, never>, TODO>>; // TODO(koan) @koan-error
type _E034 = Expect<Equal<Equal<never, unknown>, TODO>>; // TODO(koan) @koan-error
type _E035 = Expect<Equal<IsAny<0 & any>, TODO>>; // TODO(koan) @koan-error
type _E036 = Expect<Equal<IsUnknown<unknown & {}>, TODO>>; // TODO(koan) @koan-error

type NaiveIsAny<T> = T extends any ? true : false;

// Demonstration K: unknown also extends any, so this is not an any detector.
type _SolvedNaiveUnknown = Expect<Equal<NaiveIsAny<unknown>, true>>;
// Demonstration L: the naked never parameter distributes over zero members.
type _SolvedNaiveNever = Expect<Equal<NaiveIsAny<never>, never>>;
// Demonstration M: intersecting with any is the useful differentiator because
// `1 & ordinary` is never-like, while `1 & any` remains any.
type _SolvedRealAnyDetector = Expect<Equal<IsAny<any>, true>>;

// Group 5: Special inner types retain their meaning inside other structures.
// -----------------------------------------------------------------------------

type _E037 = Expect<Equal<ClassifySpecial<ReturnType<() => never>>, TODO>>; // TODO(koan) @koan-error
type _E038 = Expect<Equal<ClassifySpecial<ReturnType<() => unknown>>, TODO>>; // TODO(koan) @koan-error
type _E039 = Expect<Equal<ClassifySpecial<ReturnType<() => any>>, TODO>>; // TODO(koan) @koan-error
type _E040 = Expect<Equal<ClassifySpecial<Parameters<(...values: any[]) => void>[number]>, TODO>>; // TODO(koan) @koan-error
type _E041 = Expect<Equal<ClassifySpecial<Parameters<(...values: unknown[]) => void>[number]>, TODO>>; // TODO(koan) @koan-error
type _E042 = Expect<Equal<ClassifySpecial<Parameters<(...values: never[]) => void>[number]>, TODO>>; // TODO(koan) @koan-error
type _E043 = Expect<Equal<ClassifySpecial<Record<string, never>[string]>, TODO>>; // TODO(koan) @koan-error
type _E044 = Expect<Equal<unknown & { id: string }, TODO>>; // TODO(koan) @koan-error

// Demonstration N: a never-returning function can satisfy a value-returning
// function type because callers never receive an incompatible result.
const stop: () => never = () => {
  throw new Error("stopped");
};
const produceString: () => string = stop;
type _SolvedNeverReturn = Expect<Equal<typeof produceString, () => string>>;

// Demonstration O: Record<string, never> permits no keyed values; it does not
// mean "an object whose values are never observed."
const emptyRecord: Record<string, never> = {};
// @ts-expect-error No value can satisfy a never-valued property.
emptyRecord.present = "value";
type _SolvedNeverRecordRead = Expect<
  Equal<Record<string, never>[string], never>
>;

function messageFromFailure(run: () => void): string {
  try {
    run();
    return "ok";
  } catch (error) {
    // Demonstration P: useUnknownInCatchVariables makes caught values unknown.
    // @ts-expect-error A thrown value is not guaranteed to have `message`.
    const uncheckedMessage = error.message;
    return error instanceof Error ? error.message : String(error);
  }
}

function demonstrateJsonBoundary(text: string): void {
  // Demonstration Q: JSON.parse is declared as any, so an annotation is what
  // contains the escape hatch at the boundary.
  const unchecked = JSON.parse(text);
  const leakedString: string = unchecked.notReallyAString;
  const contained: unknown = JSON.parse(text);
  // @ts-expect-error unknown cannot flow into string without validation.
  const rejectedString: string = contained;

  void leakedString;
  void rejectedString;
}
