import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { AlgebraKind } from "./k-003-union-intersection-algebra.js";

/**
 * K-003 edge cases: when clean set algebra meets compiler representation
 * =============================================================================
 *
 * Assignability is semantic, but `Equal` observes a stricter representation.
 * Two object types can accept exactly the same values without being represented
 * identically. Intersections can also leave an impossible property inside an
 * otherwise non-never object, while a conflicting discriminant can collapse the
 * entire object. Function unions and intersections reverse another intuition:
 * a union of callables needs an argument safe for every possible function, while
 * an intersection of callables behaves like a set of overloads.
 */

type IsAssignable<Source, Target> = [Source] extends [Target] ? true : false;
type MutuallyAssignable<Left, Right> =
  IsAssignable<Left, Right> extends true
    ? IsAssignable<Right, Left>
    : false;
type Prettify<T> = { [K in keyof T]: T[K] } & {};

// Group 1: Semantic equivalence is broader than strict representational equality.
// Variation: flattened objects, redundant object unions, and distribution.

type ObjectA = { a: string };
type ObjectB = { b: number };
type ObjectAB = { a: string; b: number };
type BaseObject = { id: string };
type ExtendedObject = { id: string; detail: number };
type SharedObject = { shared: boolean };
type ObjectDistributionLeft = (ObjectA | ObjectB) & SharedObject;
type ObjectDistributionRight =
  | (ObjectA & SharedObject)
  | (ObjectB & SharedObject);

type _E001 = Expect<Equal<Equal<ObjectA & ObjectB, ObjectAB>, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<MutuallyAssignable<ObjectA & ObjectB, ObjectAB>, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<Equal<Prettify<ObjectA & ObjectB>, ObjectAB>, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<Equal<BaseObject | ExtendedObject, BaseObject>, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<MutuallyAssignable<BaseObject | ExtendedObject, BaseObject>, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<MutuallyAssignable<ObjectDistributionLeft, ObjectDistributionRight>, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<Equal<(1 | 2) & (2 | 3), 2>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<Equal<(1 | 2) | (2 | 3), 1 | 2 | 3>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: the strict helper does not automatically flatten an object
// intersection into one object-literal representation.
type _SolvedStrictRepresentation = Expect<
  Equal<Equal<ObjectA & ObjectB, ObjectAB>, false>
>;

// Demonstration B: assignability in both directions proves the contracts accept
// the same values even though strict equality above is false.
type _SolvedSemanticEquivalence = Expect<
  Equal<MutuallyAssignable<ObjectA & ObjectB, ObjectAB>, true>
>;

// Demonstration C: a mapped reconstruction materializes the combined properties.
// Mapped types are taught later; here Prettify is only an observation instrument.
type _SolvedPrettifiedIntersection = Expect<
  Equal<Prettify<ObjectA & ObjectB>, ObjectAB>
>;

// Demonstration D: object distribution is semantically valid even when aliases
// preserve different surface forms.
type _SolvedObjectDistribution = Expect<
  Equal<MutuallyAssignable<ObjectDistributionLeft, ObjectDistributionRight>, true>
>;

// Group 2: A never property and a never object are different outcomes.
// Variation: ordinary conflicts, discriminants, optionality, refinements, nesting.

type TextAndNumber = { value: string } & { value: number };
type ClashingTag =
  & { kind: "left"; left: string }
  & { kind: "right"; right: number };
type ClashingBooleanTag = { active: true } & { active: false };
type OptionalRequired = { value?: string } & { value: string };
type OptionalConflict = { value?: string } & { value: number };
type OverlappingProperty =
  & { value: string | number }
  & { value: number | boolean };
type NestedIntersection =
  & { config: { host: string } }
  & { config: { port: number } };

type _E009 = Expect<Equal<AlgebraKind<TextAndNumber["value"]>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<AlgebraKind<TextAndNumber>, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<AlgebraKind<ClashingTag>, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<AlgebraKind<ClashingBooleanTag>, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<OptionalRequired["value"], TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<AlgebraKind<OptionalConflict["value"]>, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<OverlappingProperty["value"], TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<keyof NestedIntersection["config"], TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<keyof TextAndNumber, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<keyof ClashingTag, TODO>>; // TODO(koan) @koan-error

// Demonstration E: incompatible ordinary properties leave an uninhabitable field
// but do not necessarily reduce the entire object alias to never.
type _SolvedImpossibleProperty = Expect<
  Equal<TextAndNumber["value"], never>
>;
type _SolvedConflictObjectRemains = Expect<
  Equal<AlgebraKind<TextAndNumber>, "ordinary">
>;

// Demonstration F: a conflicting literal property is recognized as a
// discriminant, so TypeScript reduces the entire intersection to never.
type _SolvedDiscriminantCollapse = Expect<
  Equal<AlgebraKind<ClashingTag>, "never">
>;

// Demonstration G: compatible requirements refine a property to their overlap.
type _SolvedPropertyOverlap = Expect<
  Equal<OverlappingProperty["value"], number>
>;

// Group 3: keyof reverses the member-availability story.
// -----------------------------------------------------------------------------
// `keyof (A | B)` contains keys safe on every branch. `keyof (A & B)` contains
// keys supplied by the combined requirements. Index signatures and special
// types make the resulting key sets less visually obvious.

type KeyLeft = { common: string; onlyLeft: number };
type KeyRight = { common: number; onlyRight: boolean };
type StringIndex = { [key: string]: string };
type FixedKey = { fixed: string };

type _E019 = Expect<Equal<keyof (KeyLeft | KeyRight), TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<(KeyLeft | KeyRight)["common"], TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<keyof (KeyLeft & KeyRight), TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<AlgebraKind<(KeyLeft & KeyRight)["common"]>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<keyof (KeyLeft | never), TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<keyof (KeyLeft | unknown), TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<keyof (KeyLeft & unknown), TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<keyof (KeyLeft & never), TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<keyof (StringIndex | FixedKey), TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<keyof (StringIndex & FixedKey), TODO>>; // TODO(koan) @koan-error

// Demonstration H: union keys are the intersection of available member names.
type _SolvedUnionKeys = Expect<
  Equal<keyof (KeyLeft | KeyRight), "common">
>;

// Demonstration I: intersection keys combine names, even though the shared
// `common` property's value type becomes impossible.
type _SolvedIntersectionKeys = Expect<
  Equal<keyof (KeyLeft & KeyRight), "common" | "onlyLeft" | "onlyRight">
>;

// Demonstration J: unknown in a union removes every guaranteed key.
type _SolvedUnknownUnionKeys = Expect<Equal<keyof (KeyLeft | unknown), never>>;

// Group 4: Callable unions require common inputs; intersections provide overloads.
// Variation: Parameters/ReturnType distribution, order, and callable invocation.

type StringHandler = (value: string) => "string";
type NumberHandler = (value: number) => "number";
type HandlerUnion = StringHandler | NumberHandler;
type HandlerIntersection = StringHandler & NumberHandler;
type ReversedHandlerIntersection = NumberHandler & StringHandler;

type _E029 = Expect<Equal<Parameters<HandlerUnion>[0], TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<ReturnType<HandlerUnion>, TODO>>; // TODO(koan) @koan-error
type _E031 = Expect<Equal<Parameters<HandlerIntersection>[0], TODO>>; // TODO(koan) @koan-error
type _E032 = Expect<Equal<ReturnType<HandlerIntersection>, TODO>>; // TODO(koan) @koan-error
type _E033 = Expect<Equal<Equal<HandlerUnion, HandlerIntersection>, TODO>>; // TODO(koan) @koan-error
type _E034 = Expect<Equal<AlgebraKind<string & number>, TODO>>; // TODO(koan) @koan-error
type _E035 = Expect<Equal<AlgebraKind<Parameters<((value: unknown) => void) | ((value: string) => void)>[0]>, TODO>>; // TODO(koan) @koan-error
type _E036 = Expect<Equal<ReturnType<ReversedHandlerIntersection>, TODO>>; // TODO(koan) @koan-error

function demonstrateCallableAlgebra(
  unionHandler: HandlerUnion,
  intersectionHandler: HandlerIntersection,
): void {
  // Demonstration K: the runtime function might be the number branch, so a
  // string is not a safe argument to a union of functions.
  // @ts-expect-error No value can satisfy both string and number parameters.
  unionHandler("text");

  // Demonstration L: an intersection carries both call signatures as overloads.
  const fromString = intersectionHandler("text");
  const fromNumber = intersectionHandler(42);
  type _SolvedStringOverload = Expect<Equal<typeof fromString, "string">>;
  type _SolvedNumberOverload = Expect<Equal<typeof fromNumber, "number">>;
}

// Demonstration M: ReturnType sees only the last signature of an intersection,
// matching the standard overloaded-function inference rule.
type _SolvedLastIntersectionReturn = Expect<
  Equal<ReturnType<HandlerIntersection>, "number">
>;

// Group 5: A union of correlated records is not a record of independent unions.
// Variation: tuples and objects, one-way assignment, and invalid combinations.

type CorrelatedTuple = ["ok", string] | ["error", Error];
type LooseTuple = ["ok" | "error", string | Error];
type CorrelatedObject =
  | { kind: "text"; value: string }
  | { kind: "count"; value: number };
type LooseObject = {
  kind: "text" | "count";
  value: string | number;
};

type _E037 = Expect<Equal<CorrelatedTuple[0], TODO>>; // TODO(koan) @koan-error
type _E038 = Expect<Equal<CorrelatedTuple[1], TODO>>; // TODO(koan) @koan-error
type _E039 = Expect<Equal<Equal<CorrelatedTuple, LooseTuple>, TODO>>; // TODO(koan) @koan-error
type _E040 = Expect<Equal<IsAssignable<CorrelatedTuple, LooseTuple>, TODO>>; // TODO(koan) @koan-error
type _E041 = Expect<Equal<IsAssignable<LooseTuple, CorrelatedTuple>, TODO>>; // TODO(koan) @koan-error
type _E042 = Expect<Equal<IsAssignable<CorrelatedObject, LooseObject>, TODO>>; // TODO(koan) @koan-error
type _E043 = Expect<Equal<IsAssignable<LooseObject, CorrelatedObject>, TODO>>; // TODO(koan) @koan-error
type _E044 = Expect<Equal<keyof CorrelatedObject, TODO>>; // TODO(koan) @koan-error

// Demonstration N: the loose tuple admits a cross-pairing that the correlated
// union intentionally rejects.
const looseMismatch: LooseTuple = ["ok", new Error("not a success payload")];
// @ts-expect-error The ok branch requires a string payload.
const correlatedMismatch: CorrelatedTuple = ["ok", new Error("wrong")];

// Demonstration O: object properties behave the same way; independent unions
// lose the relationship between a tag and its payload.
const looseObjectMismatch: LooseObject = { kind: "text", value: 42 };
// @ts-expect-error The text branch requires a string value.
const correlatedObjectMismatch: CorrelatedObject = { kind: "text", value: 42 };

// Demonstration P: correlation-preserving unions flow into loose containers, but
// the reverse direction is rejected because it may contain mismatched pairs.
type _SolvedCorrelatedToLoose = Expect<
  Equal<IsAssignable<CorrelatedTuple, LooseTuple>, true>
>;
type _SolvedLooseToCorrelated = Expect<
  Equal<IsAssignable<LooseTuple, CorrelatedTuple>, false>
>;

// Demonstration Q: the special-type laws still dominate surrounding algebra.
type _SolvedAnyAbsorbsUnion = Expect<Equal<AlgebraKind<any | ObjectA>, "any">>;
type _SolvedUnknownIdentityIntersection = Expect<
  Equal<unknown & ObjectA, ObjectA>
>;

void looseMismatch;
void correlatedMismatch;
void looseObjectMismatch;
void correlatedObjectMismatch;
