import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  arrayAndFallback,
  chooseLiteral,
  fromFactories,
  mergeIdentified,
  samePair,
} from "./k-017-multiple-inference-candidates.js";

/** K-017 edges: candidate collection is directional and special types can dominate or disappear. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: never, any, unknown, undefined, and explicit arguments.
declare const edgeNever: never;
declare const edgeAny: any;
declare const edgeUnknown: unknown;
const e001 = chooseLiteral(edgeNever, "a");
const e002 = samePair(edgeNever, "a");
const e003 = samePair(edgeAny, 1);
const e004 = samePair(edgeUnknown, 1);
const e005 = samePair(undefined, undefined);
const e006 = samePair(null, null);
const e007 = samePair<string | undefined>("a", undefined);
const e008 = chooseLiteral<string>("a", "b");
const e009 = fromFactories<unknown>(() => 1, () => "a");
const e010 = arrayAndFallback<unknown>([1], "a");
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<Kind<typeof e003>, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<Kind<typeof e004>, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: never contributes no value alternative, so the inhabited
// literal candidate determines the constrained result.
type _SolvedNeverCandidate = Expect<Equal<typeof e001, "a">>;
// Demonstration B: an ordinary candidate can outrank any in a repeated direct
// parameter, preventing this particular call from being contaminated.
type _SolvedAnyCandidatePriority = Expect<Equal<Kind<typeof e003>, "ordinary">>;
// Demonstration C: the ordinary candidate similarly supplies the usable common
// substitution when paired with unknown in this repeated direct parameter shape.
type _SolvedUnknownCandidatePriority = Expect<Equal<Kind<typeof e004>, "ordinary">>;
// Demonstration D: explicit arguments bypass inference and describe every site.
type _SolvedExplicitUnknownFactories = Expect<Equal<typeof e009, unknown[]>>;

// Group 2: Candidate sites may be broad already or fail to share one substitution.
const broad: string = "a";
const finite: "a" | "b" = Math.random() ? "a" : "b";
const e011 = chooseLiteral(broad, "b");
const e012 = chooseLiteral(finite, "c");
const e013 = samePair(broad, "b");
const e014 = samePair(finite, "c");
const e015 = fromFactories((): string => "a", () => "b" as const);
const e016 = fromFactories((): "a" | "b" => "a", () => "c" as const);
const e017 = arrayAndFallback(["a" as string], "b" as const);
const e018 = arrayAndFallback(["a", "b"] as const, finite);
const e019 = samePair<{ id: number }>({ id: 1 }, { id: 2 });
const storedExtra = { id: 1, extra: true };
const e020 = samePair<{ id: number }>(storedExtra, { id: 2 });
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration E: one already-widened candidate absorbs narrower literals.
type _SolvedBroadConstraint = Expect<Equal<typeof e011, string>>;
type _SolvedBroadFactory = Expect<Equal<typeof e015, string[]>>;
// Demonstration F: explicit object T re-enables fresh excess-property checking.
// @ts-expect-error The first explicit argument is a fresh object with an extra key.
samePair<{ id: number }>({ id: 1, extra: true }, { id: 2 });
// Demonstration G: storing the same rich object first makes ordinary structural
// assignment apply, but the explicit result still exposes only the chosen view.
type _SolvedStoredExplicitLeft = Expect<Equal<typeof e020[0], { id: number }>>;
type _SolvedStoredExplicitRight = Expect<Equal<typeof e020[1], { id: number }>>;

// Group 3: Context checks the selected result; it does not manufacture candidates.
const e021: string | number = chooseLiteral(1, 2);
const e022: readonly [number, number] = samePair(1, 2);
const e023: Array<1 | 2> = fromFactories(() => 1 as const, () => 2 as const);
const e024: string = arrayAndFallback(["a", "b"] as const, "c");
const e025 = mergeIdentified({ id: "a", active: true }, { id: "b", active: false });
const e026: Array<{ id: string }> = e025;
const storedActive = { id: "a", active: true };
const e027 = mergeIdentified<{ id: string }>(storedActive, { id: "b" });
const e028 = fromFactories(() => edgeNever, () => "a" as const);
const e029 = fromFactories(() => edgeAny, () => 1);
const e030 = fromFactories<unknown>(() => edgeAny, () => 1);
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<Kind<typeof e029[number]>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Kind<typeof e030[number]>, TODO>>; // TODO(koan) @koan-error

// Demonstration H: a broad annotation can accept the selected result, but the
// binding owns its annotated view.
type _SolvedContextView = Expect<Equal<typeof e021, number>>;
// Demonstration I: never-returning factories do not add an inhabited alternative.
type _SolvedNeverFactory = Expect<Equal<typeof e028, "a"[]>>;
// Demonstration J: inferred any contaminates factory elements; explicitly choosing
// unknown contains the same any-producing callback behind a safe result.
type _SolvedAnyFactory = Expect<Equal<Kind<typeof e029[number]>, "any">>;
type _SolvedContainedFactory = Expect<Equal<Kind<typeof e030[number]>, "unknown">>;

// @ts-expect-error No inferred T lets unrelated primitive categories satisfy samePair.
samePair(1, "a");
// @ts-expect-error Explicit number still checks the string argument.
samePair<number>(1, "a");
