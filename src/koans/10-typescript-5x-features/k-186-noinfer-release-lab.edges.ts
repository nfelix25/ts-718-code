import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  acceptSchema,
  authoritativePair,
  defineEvents,
  defineTransition,
  transformOr,
} from "./k-186-noinfer-release-lab.js";

/** EDGE CASES: NoInfer blocks candidates rather than checking, all-blocked inference falls to unknown/default/context, explicit arguments may widen, any from an authoritative site poisons the result, variance affects callbacks, and nested wrappers remain transparent after selection. */

type Kind<Value> =
  0 extends 1 & Value ? "any" :
  [Value] extends [never] ? "never" :
  unknown extends Value ? "unknown" :
  "ordinary";
type Extends<From, To> = [From] extends [To] ? true : false;

function allBlocked<Value>(value: NoInfer<Value>): Value {
  return value;
}

function blockedDefault<Value = string>(
  value?: NoInfer<Value>,
): Value | undefined {
  return value;
}

const unknownChoice = allBlocked("value");
const defaultChoice = blockedDefault("value");

// Pre-solved demonstrations fix the inference-source mental model.
type _DemoAllBlocked = Expect<Equal<Kind<typeof unknownChoice>, "unknown">>;
type _DemoDefault = Expect<Equal<typeof defaultChoice, string | undefined>>;
type _DemoTransparent = Expect<Equal<NoInfer<{ id: number }>, { id: number }>>;
// @ts-expect-error blocked input is checked against the selected string default.
blockedDefault(1);

// 1. All-blocked, defaulted, and explicit selection (1-8)
type _01 = Expect<Equal<Kind<typeof unknownChoice>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof defaultChoice, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof allBlocked<string>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof allBlocked<number>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof blockedDefault>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof blockedDefault<number>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof allBlocked<unknown>>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof blockedDefault<string>>[0], TODO>>; // TODO(koan) @koan-error

// 2. Any/unknown/never authority (9-15)
type _09 = Expect<Equal<Kind<ReturnType<typeof authoritativePair<any>>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Kind<ReturnType<typeof authoritativePair<unknown>>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Kind<ReturnType<typeof authoritativePair<never>>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Kind<NoInfer<any>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Kind<NoInfer<unknown>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Kind<NoInfer<never>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<never, NoInfer<string>>, TODO>>; // TODO(koan) @koan-error

// 3. Explicit widening remains an API caller choice (16-22)
type _16 = Expect<Equal<ReturnType<typeof defineTransition<string>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<typeof defineTransition<"a" | "b">>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof acceptSchema<object>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof acceptSchema<unknown>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof transformOr<string, unknown>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<typeof defineEvents<string>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<ReturnType<typeof defineEvents<string>>>[0], TODO>>; // TODO(koan) @koan-error

// 4. Callback variance and nested wrappers (23-30)
type NarrowHandler = ReturnType<typeof defineEvents<"a" | "b">>;
type _23 = Expect<Equal<Extends<NarrowHandler, (event: string) => void>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<(event: string) => void, NarrowHandler>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<NarrowHandler>[0], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<NoInfer<Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Awaited<NoInfer<Promise<string>>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<NoInfer<readonly ["a", "b"]>[number], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Readonly<NoInfer<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Partial<NoInfer<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
