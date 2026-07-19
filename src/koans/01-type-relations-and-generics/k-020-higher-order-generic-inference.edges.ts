import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  bindFirst,
  compose,
  lift,
  makeIdentity,
  preserveGeneric,
  toArray,
  toBox,
} from "./k-020-higher-order-generic-inference.js";

/** K-020 edges: runtime equality does not imply that a broad function view preserved polymorphism. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Generic signatures can be preserved, instantiated, or erased by views.
const genericIdentity = makeIdentity();
const e001 = genericIdentity;
const e002: <T>(value: T) => T = genericIdentity;
const e003: (value: unknown) => unknown = genericIdentity;
const e004 = genericIdentity<string>;
const e005 = preserveGeneric(genericIdentity);
const e006 = e002(1);
const e007 = e002("a");
const e008 = e003(1);
const e009 = e004("a");
const e010 = e005([1, 2] as const);
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<Kind<typeof e008>, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: a generic signature can be reused at unrelated calls.
type _SolvedGenericNumber = Expect<Equal<typeof e006, 1>>;
type _SolvedGenericString = Expect<Equal<typeof e007, "a">>;
// Demonstration B: assigning the same runtime function to a monomorphic unknown
// view erases the input/output relationship.
type _SolvedErasedView = Expect<Equal<Kind<typeof e008>, "unknown">>;
// Demonstration C: an instantiation expression fixes the generic signature without
// calling it, producing an ordinary monomorphic function.
type _SolvedInstantiation = Expect<Equal<typeof e004, (value: string) => string>>;

// @ts-expect-error A monomorphic string instantiation rejects numbers.
e004(1);
// @ts-expect-error A function returning only unknown cannot satisfy generic identity.
preserveGeneric((value: unknown) => value);

// Group 2: Composition propagation responds to constraints and explicit erasure.
function constrainedArray<T extends { id: string }>(value: T): T[] { return [value]; }
function firstId<T extends { id: string }>(values: readonly T[]): T["id"] { return values[0]!.id; }
const e011 = compose(toArray, toBox);
const e012 = compose(constrainedArray, toBox);
const e013 = compose(constrainedArray, firstId);
const e014 = e012({ id: "a", active: true });
const e015 = e013({ id: "a", active: true });
const erasedArray: (value: unknown) => unknown[] = toArray;
const e016 = compose(erasedArray, toBox);
const e017 = e016(1);
const e018 = compose(toArray<string>, toBox);
const e019 = e018("a");
const e020 = compose((value: never) => value, toArray);
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

// Demonstration D: constraints propagate into the returned call signature rather
// than being replaced by their minimum object view.
type _SolvedConstrainedResult = Expect<
  Equal<typeof e014, { value: Array<{ id: string; active: boolean }> }>
>;
// Demonstration E: an erased first stage forces the composition to expose unknown.
type _SolvedErasedComposition = Expect<Equal<typeof e017, { value: unknown[] }>>;
// Demonstration F: explicitly instantiating one stage makes the composition
// monomorphic even though the other stage remains generic.
type _SolvedFixedComposition = Expect<Equal<typeof e018, (value: string) => { value: string[] }>>;

// Group 3: Binding, lifting, and special types show which relationships survive.
function genericPair<T>(left: T, right: T): [T, T] { return [left, right]; }
const e021 = bindFirst(genericPair, 1);
const e022 = e021(2);
const e023 = bindFirst(genericPair<number>, 1);
const e024 = e023(2);
const e025 = lift((value: unknown) => value);
const e026 = e025([1, "a"]);
const e027 = lift((value: any) => value);
const e028 = e027([1, "a"]);
const e029 = lift((value: never) => value);
const e030 = e029([]);
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<Kind<typeof e028[number]>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration G: this ordinary bindFirst signature cannot express partial
// specialization of genericPair. Matching the generic callback instantiates its
// linked positions through unknown; explicitly instantiating first retains number.
type _SolvedBoundGeneric = Expect<
  Equal<typeof e021, (right: unknown) => [unknown, unknown]>
>;
type _SolvedExplicitBoundGeneric = Expect<
  Equal<typeof e023, (right: number) => [number, number]>
>;
// Demonstration H: a lifted unknown identity safely returns unknown elements.
type _SolvedLiftedUnknown = Expect<Equal<typeof e026, unknown[]>>;
// Demonstration I: any in both scalar positions contaminates the lifted result.
type _SolvedLiftedAny = Expect<Equal<Kind<typeof e028[number]>, "any">>;
// Demonstration J: a never-input lifted function can only accept an empty or
// asserted never collection, and its result remains never[].
type _SolvedLiftedNever = Expect<Equal<typeof e030, never[]>>;

// @ts-expect-error The explicitly instantiated version fixes its remaining argument.
e023("a");
