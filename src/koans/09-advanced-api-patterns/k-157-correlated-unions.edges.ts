import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CorrelatedCase,
  type DispatchArgs,
  type FieldCase,
  type FieldMap,
  type HandlerMap,
  type UncorrelatedCase,
} from "./k-157-correlated-unions.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * `Parameters` distributes over a union of functions and reports a union of
 * inputs. Calling that union is stricter: one argument must satisfy every
 * possible function, often producing `never`. A generic key inferred as a union
 * can similarly admit independent key/value unions unless the API accepts one
 * correlated rest-tuple union.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type SafeArgument<FunctionUnion> =
  [FunctionUnion] extends [(value: infer Input) => unknown] ? Input : never;
type GenericPair<Key extends keyof FieldMap> = [key: Key, value: FieldMap[Key]];
type Loose = UncorrelatedCase<FieldMap>;
type OptionalMap = { optional?: string; required: number };
type BroadMap = { [key: string]: number };

// Pre-solved demonstrations contrast reflection with actual callability.
type _DemoReflectedInputs = Expect<Equal<Parameters<FieldCase["format"]>[0], string | number | boolean>>;
type _DemoSafeInput = Expect<Equal<SafeArgument<FieldCase["format"]>, never>>;
type _DemoGenericUnion = Expect<Equal<GenericPair<"text" | "count">, ["text" | "count", string | number]>>;
type _DemoCorrelatedUnion = Expect<Equal<DispatchArgs<FieldMap, "text" | "count">, ["text", string] | ["count", number]>>;
// A switch or discriminated tuple narrowing restores one member before the callback is invoked.

// 1. Projected function unions reflect broadly but call narrowly (1-8)
type _01 = Expect<Equal<FieldCase["format"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<FieldCase["format"]>[0], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<SafeArgument<FieldCase["format"]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<FieldCase["format"]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<SafeArgument<((value: string) => void) | ((value: string | number) => void)>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<SafeArgument<(value: unknown) => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Equal<SafeArgument<(value: any) => void>, any>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsAny<SafeArgument<(value: any) => void>>, TODO>>; // TODO(koan) @koan-error

// 2. Generic union keys recreate independent unions unless tuples distribute (9-16)
type _09 = Expect<Equal<GenericPair<"text">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<GenericPair<"text" | "count">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DispatchArgs<FieldMap, "text" | "count">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<["text", number], GenericPair<"text" | "count">>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<["text", number], DispatchArgs<FieldMap, "text" | "count">>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<GenericPair<keyof FieldMap>[1], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DispatchArgs<FieldMap>[1], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DispatchArgs<FieldMap, never>, TODO>>; // TODO(koan) @koan-error

// 3. Loose projections accept mismatches that complete members reject (17-23)
type _17 = Expect<Equal<Loose["kind"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Loose["value"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<{ kind: "text"; value: 42; format: Loose["format"] }, Loose>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<{ kind: "text"; value: 42; format: (value: number) => string }, FieldCase>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<keyof FieldCase, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<CorrelatedCase<FieldMap, never>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CorrelatedCase<{}, never>, TODO>>; // TODO(koan) @koan-error

// 4. Optional values and broad key domains change the relation's precision (24-30)
type _24 = Expect<Equal<Extract<CorrelatedCase<OptionalMap>, { kind: "optional" }>["value"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<Extract<CorrelatedCase<OptionalMap>, { kind: "optional" }>["format"]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<CorrelatedCase<OptionalMap>["kind"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<keyof BroadMap, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<CorrelatedCase<BroadMap>["kind"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<CorrelatedCase<BroadMap>["value"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Parameters<HandlerMap<BroadMap>[string]>, TODO>>; // TODO(koan) @koan-error
