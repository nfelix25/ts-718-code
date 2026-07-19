import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-005: Generic function inference
 * =============================================================================
 *
 * A generic function signature describes a relationship that survives a call.
 * The type parameter is not a permanently vague type and it is not a runtime
 * value. At each call, TypeScript gathers candidates from arguments, chooses a
 * type argument, and substitutes that choice everywhere the parameter appears.
 *
 * I read `function box<T>(value: T): { value: T }` aloud as:
 *
 *   "For this call, infer one type T from value, then return a box containing
 *    exactly that chosen T."
 *
 * The useful part is the repeated name. A non-generic `unknown -> unknown`
 * signature forgets the input. `T -> T` preserves its static type. Two parameters
 * such as `<Left, Right>` preserve two independent relationships. Explicit type
 * arguments skip inference for those slots and ask the arguments to satisfy the
 * supplied choice.
 *
 * Inference sees static types, not runtime contents. A literal passed directly
 * can remain literal; a value already widened to `string` contributes `string`.
 * Mutable object properties normally widen before or during inference, while a
 * const-asserted argument supplies its readonly literal structure.
 */

export function identity<T>(value: T): T {
  return value;
}

export function makeBox<T>(value: T): { value: T } {
  return { value };
}

export function makePair<Left, Right>(
  left: Left,
  right: Right,
): [Left, Right] {
  return [left, right];
}

export function duplicate<T>(value: T): [T, T] {
  return [value, value];
}

export function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

export function mapValue<Input, Output>(
  value: Input,
  transform: (value: Input) => Output,
): Output {
  return transform(value);
}

export function fromFactory<T>(factory: () => T): T {
  return factory();
}

// Part 1: A direct argument supplies the candidate for T.
// -----------------------------------------------------------------------------

const inferredText = identity("ready");
const inferredCount = identity(42);
let widenedText = "ready";
const inferredFromVariable = identity(widenedText);
const explicitlyBroad = identity<string>("ready");

type _Main01 = Expect<Equal<typeof inferredText, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof inferredCount, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof inferredFromVariable, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof explicitlyBroad, TODO>>; // TODO(koan) @koan-error

// Part 2: Substitution carries the choice through a larger return shape.
// -----------------------------------------------------------------------------

const boxedText = makeBox("inside");
const duplicatedCount = duplicate(3);
const mutableObject = identity({ kind: "task", priority: 1 });
const preservedObject = identity({ kind: "task", priority: 1 } as const);

type _Main05 = Expect<Equal<typeof boxedText.value, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof duplicatedCount, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mutableObject, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof preservedObject, TODO>>; // TODO(koan) @koan-error

// Part 3: Separate type parameters preserve separate input choices.
// -----------------------------------------------------------------------------

const mixedPair = makePair("left", 1);
const literalPair = makePair("left" as const, 1 as const);
const objectPair = makePair({ id: "a" }, { active: true });
const explicitPair = makePair<string, number>("left", 1);

type _Main09 = Expect<Equal<typeof mixedPair, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof literalPair, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof objectPair, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof explicitPair, TODO>>; // TODO(koan) @koan-error

// Part 4: A nested occurrence can infer an element type.
// -----------------------------------------------------------------------------

const firstMutable = first(["a", "b"]);
const firstReadonly = first(["a", "b"] as const);
const firstEmpty = first([]);
const firstNumbers = first<1 | 2>([1, 2]);

type _Main13 = Expect<Equal<typeof firstMutable, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof firstReadonly, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof firstEmpty, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof firstNumbers, TODO>>; // TODO(koan) @koan-error

// Part 5: Callbacks contribute input and output relationships.
// -----------------------------------------------------------------------------

const mappedLength = mapValue("koan", (value) => value.length);
const mappedObject = mapValue(3, (value) => ({ doubled: value * 2 }));
const inferredFactoryLiteral = fromFactory(() => "created" as const);
const inferredFactoryWide = fromFactory(() => "created");

type _Main17 = Expect<Equal<typeof mappedLength, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mappedObject, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof inferredFactoryLiteral, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof inferredFactoryWide, TODO>>; // TODO(koan) @koan-error

// Part 6: Generic functions themselves have reusable and instantiable types.
// -----------------------------------------------------------------------------

const identityReference = identity;
const stringIdentity = identity<string>;
const boxedExplicit = makeBox<number>(1);
const pairReference = makePair;
const factoryReference = fromFactory;

type _Main21 = Expect<Equal<typeof identityReference, TODO>>; // TODO(koan) @koan-error
type _Main22 = Expect<Equal<typeof stringIdentity, TODO>>; // TODO(koan) @koan-error
type _Main23 = Expect<Equal<typeof boxedExplicit, TODO>>; // TODO(koan) @koan-error
type _Main24 = Expect<Equal<typeof pairReference, TODO>>; // TODO(koan) @koan-error
type _Main25 = Expect<Equal<typeof factoryReference, TODO>>; // TODO(koan) @koan-error
