import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-006: Parameter-site inference
 * =============================================================================
 *
 * TypeScript infers a type parameter by matching an argument's static type
 * against the parameter type that contains it. The occurrence can be direct
 * (`value: T`) or nested (`box: { value: T }`, `items: readonly T[]`, or
 * `consumer: (value: T) => void`). I read the match as pattern extraction:
 *
 *   "The argument must fit this parameter pattern. Which type must T be for the
 *    corresponding pieces to line up?"
 *
 * Direct and nested sites contribute candidates. A type parameter appearing only
 * in a return type has no argument evidence. An optional parameter contributes no
 * candidate when omitted. A callback with an explicit parameter annotation can
 * contribute its annotation; an unannotated callback instead receives contextual
 * typing from candidates found elsewhere, or `unknown` when no evidence exists.
 *
 * This lesson focuses on where evidence originates. Later lessons separate
 * competing candidates, inference order, contextual return inference, and
 * constraint fallback.
 */

export function direct<T>(value: T): T {
  return value;
}

export function unwrapBox<T>(box: { value: T }): T {
  return box.value;
}

export function unwrapPayload<T>(event: { payload: T; source: string }): T {
  return event.payload;
}

export function firstValue<T>(items: readonly T[]): T | undefined {
  return items[0];
}

export function tapValue<T>(
  value: T,
  effect: (value: T) => void,
): T {
  effect(value);
  return value;
}

export function inferFromConsumer<T>(
  consumer: (value: T) => void,
): (value: T) => void {
  return consumer;
}

export function optionalValue<T>(value?: T): T | undefined {
  return value;
}

export function gather<T>(...values: T[]): T[] {
  return values;
}

// Part 1: Match direct and nested parameter patterns.

const mainDirect = direct("direct");
const mainBox = unwrapBox({ value: 42 });
const mainPayload = unwrapPayload({ payload: { id: "a" }, source: "api" });
const mainPreservedPayload = unwrapPayload({
  payload: { kind: "ready" },
  source: "api",
} as const);

type _Main01 = Expect<Equal<typeof mainDirect, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainBox, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainPayload, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainPreservedPayload, TODO>>; // TODO(koan) @koan-error

// Part 2: Array parameters extract their element candidates.

const mainMutableFirst = firstValue([1, 2, 3]);
const mainReadonlyFirst = firstValue([1, 2, 3] as const);
const mainObjectFirst = firstValue([{ id: "a" }, { id: "b" }]);
const mainExplicitFirst = firstValue<string | number>([1, "a"]);

type _Main05 = Expect<Equal<typeof mainMutableFirst, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainReadonlyFirst, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainObjectFirst, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainExplicitFirst, TODO>>; // TODO(koan) @koan-error

// Part 3: An earlier value candidate contextually types a callback parameter.

const mainTappedText = tapValue("text", (value) => value.toUpperCase());
const mainTappedObject = tapValue({ id: "a" }, (value) => value.id);
const mainTappedTuple = tapValue([1, 2] as const, (value) => value[0]);
const mainTappedExplicit = tapValue<number>(1, (value) => value.toFixed());

type _Main09 = Expect<Equal<typeof mainTappedText, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainTappedObject, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainTappedTuple, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainTappedExplicit, TODO>>; // TODO(koan) @koan-error

// Part 4: An explicitly annotated consumer can itself supply T.

const mainStringConsumer = inferFromConsumer((value: string) => value.length);
const mainUnionConsumer = inferFromConsumer((value: string | number) => String(value));
const mainObjectConsumer = inferFromConsumer((value: { id: string }) => value.id);
const mainUnknownConsumer = inferFromConsumer((value) => void value);

type _Main13 = Expect<Equal<typeof mainStringConsumer, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainUnionConsumer, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainObjectConsumer, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Parameters<typeof mainUnknownConsumer>[0], TODO>>; // TODO(koan) @koan-error

// Part 5: Omitted optional parameters and rest elements change the evidence set.

const mainOptionalMissing = optionalValue();
const mainOptionalPresent = optionalValue("present");
const mainGathered = gather(1, 2, 3);
const mainGatheredLiteral = gather(1 as const, 2 as const, 3 as const);

type _Main17 = Expect<Equal<typeof mainOptionalMissing, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainOptionalPresent, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainGathered, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainGatheredLiteral, TODO>>; // TODO(koan) @koan-error
