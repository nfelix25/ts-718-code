import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  collectNumberLabels,
  lazyNumberLabels,
  sumNumbers,
} from "./k-193-iterator-helpers.js";

/** EDGE CASES: helper chains are lazy and single-use, terminal operations consume them, protocol compatibility does not imply helper availability, filter predicates can refine output, infinite inputs require a limiter, reduction without an initial value can fail, and helper return channels differ from arbitrary generator returns. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type YieldOf<Value> =
  Value extends Iterator<infer Yield, unknown, unknown> ? Yield : never;
type ReturnOf<Value> =
  Value extends Iterator<unknown, infer Return, unknown> ? Return : never;

type ProtocolOnly = Iterator<number, void, unknown>;
type NativeNumbers = IteratorObject<number, undefined, unknown>;
type Mixed = IteratorObject<string | number | null, undefined, unknown>;

// Pre-solved contrasts: structural iteration is a smaller promise.
type _DemoNativeIsProtocol = Expect<Equal<Extends<NativeNumbers, Iterator<number, undefined, unknown>>, true>>;
type _DemoProtocolNotNative = Expect<Equal<Extends<ProtocolOnly, IteratorObject<number>>, false>>;
type _DemoArrayIterator = Expect<Equal<YieldOf<ReturnType<number[]["values"]>>, number>>;
type _DemoLazyResult = Expect<Equal<YieldOf<ReturnType<typeof lazyNumberLabels>>, string>>;

// 1. Protocol versus helper surface (1-7)
type _01 = Expect<Equal<keyof Pick<ProtocolOnly, "next" | "return" | "throw">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<NativeNumbers, ProtocolOnly>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<ProtocolOnly, NativeNumbers>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<YieldOf<ProtocolOnly>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnOf<ProtocolOnly>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<YieldOf<NativeNumbers>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnOf<NativeNumbers>, TODO>>; // TODO(koan) @koan-error

// 2. Predicate filters and never outputs (8-15)
type StringsOnly = ReturnType<Mixed["filter"]>;
type _08 = Expect<Equal<YieldOf<StringsOnly>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ReturnOf<StringsOnly>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<IteratorObject<never>["toArray"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<YieldOf<IteratorObject<never>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsNever<YieldOf<IteratorObject<never>>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReturnType<IteratorObject<never>["find"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<IteratorObject<never>["some"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<IteratorObject<never>["every"]>, TODO>>; // TODO(koan) @koan-error

// 3. Laziness is absent from the public result type (16-21)
type _16 = Expect<Equal<ReturnType<typeof lazyNumberLabels>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<typeof collectNumberLabels>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof sumNumbers>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<ReturnType<typeof lazyNumberLabels>, Iterable<string>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<ReturnType<typeof collectNumberLabels>, IteratorObject<string>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<ReturnType<typeof sumNumbers>, IteratorObject<number>>, TODO>>; // TODO(koan) @koan-error

// 4. Result objects require done-aware reading (22-26)
type NextResult = ReturnType<NativeNumbers["next"]>;
type _22 = Expect<Equal<NextResult, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<NextResult["value"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extract<NextResult, { done: true }>["value"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<NextResult, { done?: false }>["value"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<NextResult["done"], TODO>>; // TODO(koan) @koan-error

// 5. Top/bottom assignability and terminal values (27-30)
type _27 = Expect<Equal<Extends<IteratorObject<never>, IteratorObject<number>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<IteratorObject<unknown>, IteratorObject<number>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<IteratorObject<number>, Iterable<unknown>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<IteratorObject<unknown>["toArray"]>, TODO>>; // TODO(koan) @koan-error
