import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 186 - NOINFER RELEASE LAB
 * ==============================
 *
 * The foundational koan established the rule: `NoInfer<T>` removes one
 * occurrence from candidate collection, then checks it after other sites choose
 * T. This release lab applies that rule to realistic API ownership decisions.
 *
 * Read every wrapped position as "consumer, not author, of T." A state list
 * authors a transition domain; an output callback authors its result; a schema
 * authors the value shape; an event list authors callback inputs.
 *
 * `NoInfer` is not validation by itself and is transparent after selection. It
 * cannot repair `any` from an authoritative site, prevent explicit widening, or
 * infer a type when every occurrence is blocked. Its value is deciding which
 * positions get a vote.
 *
 * Feature ownership: TypeScript 5.4 intrinsic utility.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html#the-noinfer-utility-type
 */

export function defineTransition<const State extends string>(
  states: readonly State[],
  from: NoInfer<State>,
  to: NoInfer<State>,
): readonly [from: State, to: State] {
  return [from, to];
}

export function acceptSchema<Schema>(
  schema: Schema,
  value: NoInfer<Schema>,
): Schema {
  void schema;
  return value;
}

export function transformOr<Input, Output>(
  input: Input,
  transform: (input: Input) => Output,
  fallback: NoInfer<Output>,
): Output {
  try {
    return transform(input);
  } catch {
    return fallback;
  }
}

export function defineEvents<const Event extends string>(
  events: readonly Event[],
  handler: (event: NoInfer<Event>) => void,
): (event: Event) => void {
  void events;
  return handler;
}

export function authoritativePair<const Value>(
  left: Value,
  right: Value,
  fallback: NoInfer<Value>,
): Value {
  return left ?? right ?? fallback;
}

const traffic = defineTransition(
  ["red", "yellow", "green"] as const,
  "red",
  "green",
);
const schemaValue = acceptSchema({ id: 0, active: false }, { id: 1, active: true });
const transformed = transformOr("42", Number, 0);
const eventHandler = defineEvents(["open", "close"] as const, () => undefined);

// Part 1: state collections own transition domains.
type _01 = Expect<Equal<typeof traffic, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof traffic[0], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof traffic[1], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof defineTransition<"a" | "b">>, TODO>>; // TODO(koan) @koan-error

// Part 2: schemas own the checked value shape.
type _05 = Expect<Equal<typeof schemaValue, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof schemaValue["id"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof acceptSchema<{ id: number }>>[1], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<NoInfer<{ id: number }>, TODO>>; // TODO(koan) @koan-error

// Part 3: callback output owns the fallback type.
type _09 = Expect<Equal<typeof transformed, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<typeof transformOr<string, number>>[2], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof transformOr<string, number>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<typeof transformOr<string, number>>[1], TODO>>; // TODO(koan) @koan-error

// Part 4: event lists own callback input domains.
type _13 = Expect<Equal<typeof eventHandler, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof eventHandler>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof eventHandler>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<typeof defineEvents<"up" | "down">>[1], TODO>>; // TODO(koan) @koan-error

// Part 5: multiple unblocked sites may still contribute a union.
const literals = authoritativePair("left", "right", "left");
const numbers = authoritativePair(1, 2, 1);
type _17 = Expect<Equal<typeof literals, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<typeof numbers, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<NoInfer<typeof literals>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof authoritativePair<string>>, TODO>>; // TODO(koan) @koan-error
