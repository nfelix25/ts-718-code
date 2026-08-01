import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-064: infer basics — constructions
 * =============================================================================
 *
 * These constructions capture types from readonly and mutable arrays, tuple
 * positions, function signatures, required properties, promise-like values,
 * and construct signatures. Together they rebuild the packet's core idea:
 * `infer` names evidence supplied by a successful structural match, union
 * members match independently, and the captured name belongs to the true
 * branch. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

declare const givenToken: unique symbol;

interface GivenOverloaded {
  (value: string): number;
  (value: number): string;
}

class GivenUser {
  constructor(readonly name: string) {}
}

abstract class GivenEntity {
  abstract id: PropertyKey;
}

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenReadonlyElement<Value> =
  Value extends readonly (infer Element)[] ? Element : never;
type GivenReturn<Value> =
  Value extends (...args: any[]) => infer Result ? Result : never;
type GivenPromiseValue<Value> =
  Value extends PromiseLike<infer Fulfilled> ? Fulfilled : never;
type GivenInstance<Value> =
  Value extends abstract new (...args: any[]) => infer Instance
    ? Instance
    : never;
type GivenThenable<Value> = {
  then<TResult1 = Value, TResult2 = never>(
    onfulfilled?:
      | ((value: Value) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null,
  ): PromiseLike<TResult1 | TResult2>;
};

// ─── Arrays, tuples, and captured scope ───────────────────────────────────

// 1. Capture the element type of any mutable or readonly array shape.
//    readonly ["a", 1] → "a" | 1
export type ReadonlyElement<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<ReadonlyElement<string[]>, string>>;
type _01b = Expect<Equal<ReadonlyElement<readonly number[]>, number>>;
type _01c = Expect<
  Equal<ReadonlyElement<readonly ["a", 1, true]>, "a" | 1 | true>
>;
type _01d = Expect<Equal<ReadonlyElement<readonly []>, never>>;
type _01e = Expect<
  Equal<ReadonlyElement<string | readonly Date[]>, Date>
>;

// 2. Capture an element only when the container itself is mutable.
//    readonly string[] → never
export type MutableElement<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<MutableElement<string[]>, string>>;
type _02b = Expect<Equal<MutableElement<readonly string[]>, never>>;
type _02c = Expect<Equal<MutableElement<[1, 2]>, 1 | 2>>;
type _02d = Expect<Equal<MutableElement<readonly [1, 2]>, never>>;
type _02e = Expect<
  Equal<MutableElement<number[] | Uint8Array | Set<number>>, number>
>;

// 3. Capture the required first position of a readonly tuple.
//    readonly [Head, ...Rest] → Head
export type TupleHead<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<TupleHead<[string, number]>, string>>;
type _03b = Expect<Equal<TupleHead<readonly ["first"]>, "first">>;
type _03c = Expect<Equal<TupleHead<readonly []>, never>>;
type _03d = Expect<Equal<TupleHead<string[]>, never>>;
type _03e = Expect<
  Equal<TupleHead<readonly [1, 2] | readonly ["x", "y"]>, 1 | "x">
>;

// 4. Reuse one captured element name twice inside its true branch.
export type CapturedElementPair<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<CapturedElementPair<string[]>, [string, string]>
>;
type _04b = Expect<
  Equal<CapturedElementPair<readonly [1, "x"]>, [1 | "x", 1 | "x"]>
>;
type _04c = Expect<
  Equal<CapturedElementPair<readonly []>, [never, never]>
>;
type _04d = Expect<Equal<CapturedElementPair<unknown>, never>>;

// 5. Capture an array element, or preserve an explicit fallback on failure.
export type ElementOr<Value, Fallback> = TODO; // TODO(koan)

type _05a = Expect<Equal<ElementOr<string[], "missing">, string>>;
type _05b = Expect<Equal<ElementOr<number, "missing">, "missing">>;
type _05c = Expect<
  Equal<ElementOr<string[] | number, "missing">, string | "missing">
>;
type _05d = Expect<Equal<ElementOr<readonly [], "missing">, never>>;
type _05e = Expect<Equal<ElementOr<never, "missing">, never>>;

// 6. Build the return type of the packet's `first` runtime helper.
export type FirstValue<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<FirstValue<readonly ["a", 1]>, "a" | 1 | undefined>>;
type _06b = Expect<Equal<FirstValue<readonly []>, undefined>>;
type _06c = Expect<Equal<FirstValue<string[]>, string | undefined>>;
type _06d = Expect<
  Equal<
    FirstValue<readonly [string?, ...number[]]>,
    string | number | undefined
  >
>;

// 7. Classify special inputs without exposing a raw `any` answer.
export type ElementSpecialProfile<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<ElementSpecialProfile<any>, [false, unknown]>
>;
type _07b = Expect<
  Equal<ElementSpecialProfile<never>, [false, never]>
>;
type _07c = Expect<
  Equal<ElementSpecialProfile<unknown>, [false, never]>
>;
type _07d = Expect<
  Equal<
    ElementSpecialProfile<readonly [string?, ...number[]]>,
    [false, string | number | undefined]
  >
>;

// ─── Function returns and invocation contracts ───────────────────────────

// 8. Capture the return type of each callable union member.
export type ReturnOf<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnOf<(id: number) => { id: number }>, { id: number }>>;
type _08b = Expect<Equal<ReturnOf<() => Promise<boolean>>, Promise<boolean>>>;
type _08c = Expect<
  Equal<ReturnOf<(() => "a") | (() => 2) | number>, "a" | 2>
>;
type _08d = Expect<Equal<ReturnOf<GivenOverloaded>, string>>;
type _08e = Expect<Equal<ReturnOf<(() => 1) & (() => 2)>, 2>>;

// 9. Capture a callable result, or contribute a chosen failure type.
export type ReturnOr<Value, Fallback> = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnOr<() => string, null>, string>>;
type _09b = Expect<Equal<ReturnOr<number, null>, null>>;
type _09c = Expect<
  Equal<ReturnOr<(() => 1) | boolean, "not-callable">, 1 | "not-callable">
>;
type _09d = Expect<Equal<ReturnOr<() => never, "fallback">, never>>;
type _09e = Expect<Equal<ReturnOr<never, "fallback">, never>>;

// 10. Capture both sides of a call signature as one invocation contract.
export type CallContract<Fn> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<CallContract<() => string>, { args: []; result: string }>
>;
type _10b = Expect<
  Equal<
    CallContract<(id: number, label?: string) => boolean>,
    { args: [id: number, label?: string | undefined]; result: boolean }
  >
>;
type _10c = Expect<
  Equal<
    CallContract<(...parts: string[]) => number>,
    { args: string[]; result: number }
  >
>;
type _10d = Expect<
  Equal<
    CallContract<((value: string) => 1) | ((value: number) => 2)>,
    | { args: [value: string]; result: 1 }
    | { args: [value: number]; result: 2 }
  >
>;
type _10e = Expect<Equal<CallContract<unknown>, never>>;

// 11. Describe special and non-callable return inference safely.
export type ReturnSpecialProfile<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<ReturnSpecialProfile<any>, [false, unknown]>>;
type _11b = Expect<Equal<ReturnSpecialProfile<never>, [false, never]>>;
type _11c = Expect<Equal<ReturnSpecialProfile<unknown>, [false, never]>>;
type _11d = Expect<
  Equal<ReturnSpecialProfile<{ (): string; label: "callable" }>, [false, string]>
>;
type _11e = Expect<
  Equal<ReturnSpecialProfile<new () => Date>, [false, never]>
>;

// ─── Required property inference ─────────────────────────────────────────

// 12. Capture the value of a required string, number, or symbol property.
export type PropertyOf<Value, Key extends PropertyKey> = TODO; // TODO(koan)

type _12a = Expect<Equal<PropertyOf<{ id: number }, "id">, number>>;
type _12b = Expect<
  Equal<PropertyOf<{ readonly id: "fixed" }, "id">, "fixed">
>;
type _12c = Expect<Equal<PropertyOf<{ id?: string }, "id">, never>>;
type _12d = Expect<
  Equal<
    PropertyOf<{ id: 1 } | { name: string } | { id: 2 }, "id">,
    1 | 2
  >
>;
type _12e = Expect<
  Equal<
    PropertyOf<{ 0: string; [givenToken]: Date }, 0 | typeof givenToken>,
    string | Date
  >
>;

// 13. Report whether a key is required and include its captured value.
export type PropertyRequirement<Value, Key extends PropertyKey> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    PropertyRequirement<{ id: string | undefined }, "id">,
    { required: true; value: string | undefined }
  >
>;
type _13b = Expect<
  Equal<
    PropertyRequirement<{ id?: string }, "id">,
    { required: false }
  >
>;
type _13c = Expect<
  Equal<
    PropertyRequirement<{ readonly id: 1 }, "id">,
    { required: true; value: 1 }
  >
>;
type _13d = Expect<
  Equal<
    PropertyRequirement<{ id: 1 } | { name: "x" }, "id">,
    { required: true; value: 1 } | { required: false }
  >
>;
type _13e = Expect<
  Equal<PropertyRequirement<never, "id">, never>
>;

// ─── Promise-like inference ──────────────────────────────────────────────

// 14. Capture exactly one declared fulfillment layer from a promise-like.
export type PromiseValue<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    [oneLayer: PromiseValue<Promise<string>>, twoLayers: PromiseValue<Promise<Promise<number>>>],
    [oneLayer: string, twoLayers: Promise<number>]
  >
>;
type _14b = Expect<
  Equal<PromiseValue<GivenThenable<1>>, 1>
>;
type _14c = Expect<
  Equal<
    PromiseValue<{
      then(onfulfilled: (value: 1) => unknown): unknown;
    }>,
    never
  >
>;
type _14d = Expect<
  Equal<PromiseValue<Promise<string> | Promise<number> | boolean>, string | number>
>;
type _14e = Expect<Equal<PromiseValue<Promise<never>>, never>>;

// 15. Compare one-layer inference with recursive `Awaited` unwrapping.
export type PromiseComparison<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    PromiseComparison<Promise<Promise<string>>>,
    [Promise<string>, string]
  >
>;
type _15b = Expect<
  Equal<PromiseComparison<Promise<void>>, [void, void]>
>;
type _15c = Expect<
  Equal<PromiseComparison<number>, [never, number]>
>;
type _15d = Expect<
  Equal<
    PromiseComparison<Promise<"done"> | false>,
    ["done", "done" | false]
  >
>;

// 16. Unwrap one promise-like layer and preserve non-promise members.
export type PromiseOrSelf<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<PromiseOrSelf<Promise<string>>, string>>;
type _16b = Expect<Equal<PromiseOrSelf<number>, number>>;
type _16c = Expect<
  Equal<PromiseOrSelf<Promise<1> | "plain">, 1 | "plain">
>;
type _16d = Expect<
  Equal<PromiseOrSelf<GivenThenable<Date>>, Date>
>;
type _16e = Expect<Equal<PromiseOrSelf<never>, never>>;

// ─── Constructor inference and shape distinctions ───────────────────────

// 17. Capture the instance produced by concrete or abstract construction.
export type InstanceOf<Value> = TODO; // TODO(koan)

type _17a = Expect<Equal<InstanceOf<typeof GivenUser>, GivenUser>>;
type _17b = Expect<Equal<InstanceOf<typeof GivenEntity>, GivenEntity>>;
type _17c = Expect<
  Equal<InstanceOf<new (id: number) => { id: number }>, { id: number }>
>;
type _17d = Expect<
  Equal<
    InstanceOf<(new () => Date) | (abstract new () => RegExp)>,
    Date | RegExp
  >
>;
type _17e = Expect<Equal<InstanceOf<() => Date>, never>>;

// 18. Describe special and non-constructable instance inference safely.
export type ConstructSpecialProfile<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ConstructSpecialProfile<any>, [false, unknown]>
>;
type _18b = Expect<
  Equal<ConstructSpecialProfile<never>, [false, never]>
>;
type _18c = Expect<
  Equal<ConstructSpecialProfile<unknown>, [false, never]>
>;
type _18d = Expect<
  Equal<ConstructSpecialProfile<Date>, [false, never]>
>;
type _18e = Expect<
  Equal<
    ConstructSpecialProfile<abstract new () => object>,
    [false, object]
  >
>;

// 19. Prefer call inference, then fall back to construction inference.
export type CallOrConstruct<Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<CallOrConstruct<() => string>, { kind: "call"; value: string }>
>;
type _19b = Expect<
  Equal<
    CallOrConstruct<new () => Date>,
    { kind: "construct"; value: Date }
  >
>;
type _19c = Expect<
  Equal<
    CallOrConstruct<(() => 1) | (new () => RegExp)>,
    | { kind: "call"; value: 1 }
    | { kind: "construct"; value: RegExp }
  >
>;
type _19d = Expect<Equal<CallOrConstruct<Function>, never>>;
type _19e = Expect<Equal<CallOrConstruct<unknown>, never>>;

// ─── Structural matching and synthesis ──────────────────────────────────

// 20. Capture the structural `length` property, including primitive wrappers.
export type LengthOf<Value> = TODO; // TODO(koan)

type _20a = Expect<Equal<LengthOf<string>, number>>;
type _20b = Expect<Equal<LengthOf<readonly ["a", "b", "c"]>, 3>>;
type _20c = Expect<Equal<LengthOf<string[]>, number>>;
type _20d = Expect<Equal<LengthOf<{ length: "long" }>, "long">>;
type _20e = Expect<Equal<LengthOf<number | { length: 0 }>, 0>>;

// 21. Classify common outer shapes and capture the evidence each one supplies.
export type InferenceKind<Value> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    InferenceKind<readonly [1, "x"]>,
    { kind: "array"; value: 1 | "x" }
  >
>;
type _21b = Expect<
  Equal<
    InferenceKind<(flag: boolean) => Promise<number>>,
    { kind: "function"; value: Promise<number> }
  >
>;
type _21c = Expect<
  Equal<
    InferenceKind<
      | Promise<"ready">
      | { readonly id: 7 }
      | (abstract new () => GivenEntity)
    >,
    | { kind: "promise"; value: "ready" }
    | { kind: "id"; value: 7 }
    | { kind: "constructor"; value: GivenEntity }
  >
>;
type _21d = Expect<Equal<InferenceKind<unknown>, never>>;
type _21e = Expect<Equal<InferenceKind<never>, never>>;
