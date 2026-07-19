import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  first,
  fromFactory,
  identity,
  makeBox,
  makePair,
  mapValue,
} from "./k-005-generic-function-inference.js";

/**
 * K-005 edge cases: inference cannot recover information an argument lost
 * =============================================================================
 *
 * Generic inference preserves relationships; it does not inspect runtime values,
 * reverse widening, or invent evidence for a type parameter with no candidate.
 * Empty collections, `any`, control-flow-narrowed variables, explicit type
 * arguments, and generic functions used as values expose those boundaries.
 */

type SpecialKind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never]
        ? "unknown"
        : "ordinary"
      : "ordinary";

// Group 1: Literal preservation depends on the candidate's static shape.

const edgeDirectText = identity("exact");
let edgeWideText = "exact";
const edgeVariableText = identity(edgeWideText);
const edgeMutableObject = identity({ kind: "event" });
const edgeConstObject = identity({ kind: "event" } as const);
const edgeMutableArray = identity([1, 2]);
const edgeConstTuple = identity([1, 2] as const);
const edgeWideFactory = fromFactory(() => "made");
const edgeConstFactory = fromFactory(() => "made" as const);

type _E001 = Expect<Equal<typeof edgeDirectText, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof edgeVariableText, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof edgeMutableObject, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof edgeConstObject, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof edgeMutableArray, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof edgeConstTuple, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof edgeWideFactory, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof edgeConstFactory, TODO>>; // TODO(koan) @koan-error

// Demonstration A: a direct primitive argument retains its literal candidate.
type _SolvedDirectLiteral = Expect<Equal<typeof edgeDirectText, "exact">>;
// Demonstration B: inference receives the variable's already widened type.
type _SolvedWidenedVariable = Expect<Equal<typeof edgeVariableText, string>>;
// Demonstration C: mutable object properties widen, but const-asserted structure
// is supplied to T exactly as readonly literal data.
type _SolvedMutableObject = Expect<
  Equal<typeof edgeMutableObject, { kind: string }>
>;
type _SolvedConstObject = Expect<
  Equal<typeof edgeConstObject, { readonly kind: "event" }>
>;
// Demonstration D: a function return is a widening site unless preserved.
type _SolvedWideFactory = Expect<Equal<typeof edgeWideFactory, string>>;
type _SolvedConstFactory = Expect<Equal<typeof edgeConstFactory, "made">>;

// Group 2: Missing, empty, top, bottom, and escape-hatch candidates.

function makeUninferred<T>(): T {
  return undefined as T;
}

const edgeUninferred = makeUninferred();
const edgeAnyValue: any = "unchecked";
const edgeAnyIdentity = identity(edgeAnyValue);
const edgeUnknownValue: unknown = "hidden";
const edgeUnknownIdentity = identity(edgeUnknownValue);
const edgeEmptyFirst = first([]);
const edgeExplicitEmptyFirst = first<string>([]);
const edgeReadonlyEmptyFirst = first([] as const);
const edgeNeverFactory = fromFactory<never>;
const edgeAnyBox = makeBox(edgeAnyValue);

type _E009 = Expect<Equal<SpecialKind<typeof edgeUninferred>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<SpecialKind<typeof edgeAnyIdentity>, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<SpecialKind<typeof edgeUnknownIdentity>, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof edgeEmptyFirst, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof edgeExplicitEmptyFirst, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof edgeReadonlyEmptyFirst, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<ReturnType<typeof edgeNeverFactory>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<SpecialKind<typeof edgeAnyBox.value>, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<Parameters<typeof edgeNeverFactory>[0], TODO>>; // TODO(koan) @koan-error

// Demonstration E: no candidate means the safe top type, not any.
type _SolvedUninferred = Expect<Equal<typeof edgeUninferred, unknown>>;
// Demonstration F: any remains an unchecked candidate and poisons substitution.
type _SolvedAnyCandidate = Expect<Equal<SpecialKind<typeof edgeAnyIdentity>, "any">>;
// Demonstration G: an empty array contributes never as its element candidate, so
// `never | undefined` simplifies to undefined.
type _SolvedEmptyFirst = Expect<Equal<typeof edgeEmptyFirst, undefined>>;

// Group 3: Inference observes annotations and current control-flow types.

const edgeCondition = true as boolean;
let edgeUnionValue: "a" | "b" = edgeCondition ? "a" : "b";
const edgeUnionIdentity = identity(edgeUnionValue);
let edgeCurrentValue: string | number = "text";
const edgeCurrentIdentity = identity(edgeCurrentValue);
const edgeAnnotatedObject: { kind: "a" | "b" } = { kind: "a" };
const edgeAnnotatedIdentity = identity(edgeAnnotatedObject);
const edgeAnnotatedProperty = identity(edgeAnnotatedObject.kind);
const edgeExplicitUnknown = identity<unknown>("text");
const edgeExplicitUnion = identity<string | number>("text");
const edgeStringInstantiation = identity<string>;
const edgeAssertedStatic = identity("text" as string | number);
const edgeExplicitBox = makeBox<{ id: string }>({ id: "a" });

type _E018 = Expect<Equal<typeof edgeUnionIdentity, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof edgeCurrentIdentity, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof edgeAnnotatedIdentity, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<typeof edgeAnnotatedProperty, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof edgeExplicitUnknown, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof edgeExplicitUnion, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof edgeStringInstantiation, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof edgeAssertedStatic, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof edgeExplicitBox, TODO>>; // TODO(koan) @koan-error

// Demonstration H: the current narrowed type of a variable is the call-site
// candidate, even if its declared type is a union.
type _SolvedCurrentCandidate = Expect<Equal<typeof edgeCurrentIdentity, string>>;
// Demonstration I: an object annotation remains the complete inferred candidate;
// reading its property separately contributes only the property's union type.
type _SolvedAnnotatedObject = Expect<
  Equal<typeof edgeAnnotatedIdentity, { kind: "a" | "b" }>
>;

// @ts-expect-error Explicit string asks the argument to be assignable to string.
identity<string>(42);
// @ts-expect-error An instantiated generic is now a non-generic string function.
edgeStringInstantiation(true);

// Group 4: Element inference respects readonly inputs and unionized elements.

const edgeTupleFirst = first(["a", "b"] as const);
const edgeNumberTupleFirst = first([1, 2, 3] as const);
const edgeMixedTupleFirst = first([1, "a", true] as const);
const edgeReadonlyStrings: readonly string[] = ["a", "b"];
const edgeReadonlyStringFirst = first(edgeReadonlyStrings);
const edgeObjectFirst = first([{ id: "a" }, { id: "b" }]);
const edgeConstObjectFirst = first([{ id: "a" }, { id: "b" }] as const);
const edgeExplicitWideFirst = first<string | number>(["a", 1]);
const edgeNestedFirst = first([[1], [2, 3]]);

type _E027 = Expect<Equal<typeof edgeTupleFirst, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof edgeNumberTupleFirst, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof edgeMixedTupleFirst, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof edgeReadonlyStringFirst, TODO>>; // TODO(koan) @koan-error
type _E031 = Expect<Equal<typeof edgeObjectFirst, TODO>>; // TODO(koan) @koan-error
type _E032 = Expect<Equal<typeof edgeConstObjectFirst, TODO>>; // TODO(koan) @koan-error
type _E033 = Expect<Equal<typeof edgeExplicitWideFirst, TODO>>; // TODO(koan) @koan-error
type _E034 = Expect<Equal<typeof edgeNestedFirst, TODO>>; // TODO(koan) @koan-error
type _E035 = Expect<Equal<Exclude<typeof edgeTupleFirst, undefined>, TODO>>; // TODO(koan) @koan-error

// Demonstration J: a readonly tuple contributes a union of its exact elements.
type _SolvedTupleElement = Expect<
  Equal<typeof edgeTupleFirst, "a" | "b" | undefined>
>;
// Demonstration K: a broad readonly array contributes its broad element type.
type _SolvedReadonlyArrayElement = Expect<
  Equal<typeof edgeReadonlyStringFirst, string | undefined>
>;

// Group 5: Generic call signatures are first-class types.

type GenericIdentity = <T>(value: T) => T;
type GenericBox = <T>(value: T) => { value: T };

const edgeGenericIdentity: GenericIdentity = identity;
const edgeGenericBox: GenericBox = makeBox;
const edgeUnknownFunction: (value: unknown) => unknown = identity;
const edgeConcreteIdentity = identity<Date>;
const edgeFactoryOfGeneric = fromFactory(() => identity);
const edgePairOfGenerics = makePair(identity, makeBox);
const edgeNestedBox = makeBox(identity("nested"));
const edgeMappedTuple = mapValue("x" as const, (value) => [value] as const);
const edgeMappedObject = mapValue(1, (value) => ({ value }));

type _E036 = Expect<Equal<typeof edgeGenericIdentity, TODO>>; // TODO(koan) @koan-error
type _E037 = Expect<Equal<typeof edgeGenericBox, TODO>>; // TODO(koan) @koan-error
type _E038 = Expect<Equal<typeof edgeUnknownFunction, TODO>>; // TODO(koan) @koan-error
type _E039 = Expect<Equal<typeof edgeConcreteIdentity, TODO>>; // TODO(koan) @koan-error
type _E040 = Expect<Equal<typeof edgeFactoryOfGeneric, TODO>>; // TODO(koan) @koan-error
type _E041 = Expect<Equal<typeof edgePairOfGenerics, TODO>>; // TODO(koan) @koan-error
type _E042 = Expect<Equal<typeof edgeNestedBox, TODO>>; // TODO(koan) @koan-error
type _E043 = Expect<Equal<typeof edgeMappedTuple, TODO>>; // TODO(koan) @koan-error
type _E044 = Expect<Equal<typeof edgeMappedObject, TODO>>; // TODO(koan) @koan-error

// Demonstration L: referencing a generic function preserves its call signature.
type _SolvedGenericReference = Expect<
  Equal<typeof edgeGenericIdentity, GenericIdentity>
>;
// Demonstration M: an instantiation expression substitutes a concrete type and
// removes genericity from the resulting function value.
type _SolvedConcreteInstantiation = Expect<
  Equal<typeof edgeConcreteIdentity, (value: Date) => Date>
>;
// Demonstration N: a factory can return a still-generic function value.
type _SolvedFactoryGeneric = Expect<
  Equal<typeof edgeFactoryOfGeneric, typeof identity>
>;
// Demonstration O: callback output inference can retain a readonly literal tuple.
type _SolvedMappedTuple = Expect<Equal<typeof edgeMappedTuple, readonly ["x"]>>;

void edgeCondition;
