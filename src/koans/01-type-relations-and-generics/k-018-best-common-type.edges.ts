import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { collect, copyList, first, last } from "./k-018-best-common-type.js";

/** K-018 edges: empty and special candidates expose where commonality comes from. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Empty, never, any, unknown, and nullish elements.
const e001 = [] as const;
const e002: never[] = [];
const e003 = copyList(e001);
const neverValue = undefined as never;
const e004 = [neverValue, 1];
declare const anyValue: any;
const e005 = [anyValue, 1];
declare const unknownValue: unknown;
const e006 = [unknownValue, 1];
const e007 = [undefined, 1];
const e008 = [null, "a"];
const e009 = collect<never>();
const e010 = first<never>([]);
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<Kind<typeof e005[number]>, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<Kind<typeof e006[number]>, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: a preserved empty tuple has no element union; copying it
// therefore produces a mutable never array.
type _SolvedEmptyTuple = Expect<Equal<typeof e001, readonly []>>;
type _SolvedCopiedEmpty = Expect<Equal<typeof e003, never[]>>;
// Demonstration B: never contributes no inhabited alternative.
type _SolvedNeverElement = Expect<Equal<typeof e004, number[]>>;
// Demonstration C: any contaminates the common element, while unknown safely
// absorbs ordinary candidates.
type _SolvedAnyElement = Expect<Equal<Kind<typeof e005[number]>, "any">>;
type _SolvedUnknownElement = Expect<Equal<Kind<typeof e006[number]>, "unknown">>;
// Demonstration D: `never | undefined` normalizes to undefined for a possibly
// absent read from an explicitly empty generic collection.
type _SolvedNeverFirst = Expect<Equal<typeof e010, undefined>>;

// Group 2: Inheritance context versus inferred sibling unions.
class Animal { animal = true; }
class Dog extends Animal { dog = true; }
class Cat extends Animal { cat = true; }
class Poodle extends Dog { poodle = true; }
const e011 = [new Dog(), new Cat()];
const e012: Animal[] = [new Dog(), new Cat()];
const e013 = [new Dog(), new Poodle()];
const e014 = [new Poodle(), new Dog()];
const e015: Dog[] = [new Dog(), new Poodle()];
const e016 = first(e011);
const e017 = first(e012);
const e018 = copyList(e013);
const conditional = true as boolean;
const e019 = conditional ? new Dog() : new Cat();
const e020: Animal = conditional ? new Dog() : new Cat();
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

// Demonstration E: Animal is not an inferred candidate, so unrelated sibling
// instances remain a union unless context explicitly supplies Animal.
type _SolvedSiblingUnion = Expect<Equal<typeof e011, (Dog | Cat)[]>>;
type _SolvedAnimalContext = Expect<Equal<typeof e012, Animal[]>>;
// Demonstration F: when one candidate is assignable to another candidate, the
// broader candidate itself is a viable best common type.
type _SolvedSubtypeCandidate = Expect<Equal<typeof e013, Dog[]>>;
// Demonstration G: a contextual binding owns the ancestor view.
type _SolvedConditionalContext = Expect<Equal<typeof e020, Animal>>;

// Group 3: Object-shape unions preserve absence and lose cross-element correlation.
const e021 = [{ a: 1 }, { b: "b" }];
const e022 = [{ kind: "a" as const, a: 1 }, { kind: "b" as const, b: "b" }];
const e023 = [{ value: 1 }, { value: "a" }];
const e024 = [{ id: 1 }, { id: 2, extra: true }];
const e025: Array<{ id: number; extra?: boolean }> = [{ id: 1 }, { id: 2, extra: true }];
const e026 = e021[0];
const e027 = e022[0];
const e028 = e023[0];
const e029 = [() => 1, () => "a"];
const e030: Array<() => string | number> = [() => 1, () => "a"];
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration H: disjoint object elements form a union; missing properties are
// represented as absent alternatives rather than synthesizing one exact shape.
type E021Element = typeof e021[number];
type _SolvedDisjointA = Expect<Equal<E021Element["a"], number | undefined>>;
type _SolvedDisjointB = Expect<Equal<E021Element["b"], string | undefined>>;
// Demonstration I: array lookup under noUncheckedIndexedAccess adds undefined on
// top of the element union selected by best-common-type.
type _SolvedUncheckedElement = Expect<Equal<typeof e027, typeof e022[number] | undefined>>;
// Demonstration J: function candidates remain alternative call signatures unless
// context supplies one function returning the value union.
type _SolvedFunctionContext = Expect<Equal<typeof e030, Array<() => string | number>>>;

// @ts-expect-error Contextual element types still perform fresh excess checks.
const invalidContext: Array<{ id: number }> = [{ id: 1, extra: true }];
