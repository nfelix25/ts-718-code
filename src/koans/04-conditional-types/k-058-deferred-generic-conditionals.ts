import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-058: deferred generic conditionals
 * =============================================================================
 *
 * A conditional involving an unresolved type parameter is a pending type-level
 * computation. The declaration cannot select a branch for every future T, so
 * the conditional remains deferred until a call or alias instantiation supplies
 * concrete evidence.
 *
 * I read `Result<T>` inside a generic declaration aloud as:
 *
 *   "When T is eventually known, test it and select the corresponding result."
 *
 * A constraint such as `T extends string | number` limits possible T values but
 * does not mean T is currently string or currently number. Value-level control
 * flow can narrow the parameter variable while leaving the type parameter and
 * its conditional return unresolved. That is why implementations commonly use
 * a narrow boundary assertion, delegate to overload signatures, or return from
 * a non-generic implementation beneath a precise public contract. Callers still
 * receive specialized results for literals, broad primitives, and unions. The
 * following distribution lesson explains how union instantiations are evaluated.
 */

export type ConditionalBox<T> = T extends string ? { text: T } : { value: T };
export type FormatResult<T extends string | number> =
  T extends string ? `text:${T}` : string;
type MainIsAny<T> = 0 extends (1 & T) ? true : false;

export function conditionalBox<T>(value: T): ConditionalBox<T> {
  return (typeof value === "string" ? { text: value } : { value }) as ConditionalBox<T>;
}

export function formatValue<T extends string | number>(value: T): FormatResult<T> {
  return (typeof value === "string" ? `text:${value}` : value.toFixed(2)) as FormatResult<T>;
}

export function firstOrSelf<T extends string | readonly unknown[]>(
  value: T,
): T extends readonly (infer Element)[] ? Element | undefined : T {
  return (Array.isArray(value) ? value[0] : value) as T extends readonly (infer Element)[] ? Element | undefined : T;
}

export function overloaded(value: string): { text: string };
export function overloaded(value: number): { value: number };
export function overloaded(value: string | number): { text: string } | { value: number } {
  return typeof value === "string" ? { text: value } : { value };
}

const mainStringBox = conditionalBox("hello" as const);
const mainNumberBox = conditionalBox(42 as const);
const mainBroadString = "" as string;
const mainUnion = "" as string | number;

// Part 1: Concrete instantiations reduce the pending conditional.
type _Main01 = Expect<Equal<ConditionalBox<"x">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ConditionalBox<1>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainStringBox, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainNumberBox, TODO>>; // TODO(koan) @koan-error

// Part 2: Broad call-site types specialize without preserving one literal.
const mainBroadBox = conditionalBox(mainBroadString);
const mainUnionBox = conditionalBox(mainUnion);
type _Main05 = Expect<Equal<typeof mainBroadBox, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainUnionBox, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainIsAny<ReturnType<typeof conditionalBox>>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Parameters<typeof conditionalBox>, TODO>>; // TODO(koan) @koan-error

// Part 3: Constraints narrow possibilities without selecting one branch.
const mainText = formatValue("hi" as const);
const mainNumber = formatValue(3);
const mainConstrainedUnion = 0 as string | number;
const mainFormattedUnion = formatValue(mainConstrainedUnion);
type _Main09 = Expect<Equal<typeof mainText, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainNumber, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainFormattedUnion, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<FormatResult<string>, TODO>>; // TODO(koan) @koan-error

// Part 4: Related container results specialize at each invocation.
const mainTupleFirst = firstOrSelf(["a", 1] as const);
const mainSelf = firstOrSelf("whole" as const);
type _Main13 = Expect<Equal<typeof mainTupleFirst, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainSelf, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ReturnType<typeof firstOrSelf>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Parameters<typeof firstOrSelf>, TODO>>; // TODO(koan) @koan-error

// Part 5: Overloads expose another specialized public boundary.
const mainOverloadedText = overloaded("x");
const mainOverloadedNumber = overloaded(1);
type _Main17 = Expect<Equal<typeof mainOverloadedText, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainOverloadedNumber, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof overloaded>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Parameters<typeof overloaded>, TODO>>; // TODO(koan) @koan-error
