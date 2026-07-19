import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-107: recursion base cases and leaves
 * =============================================================================
 *
 * A recursive transform needs an explicit leaf policy. Primitives are obvious
 * leaves, but functions, Date, RegExp, Map, Set, promises, and class instances
 * are also objects. Recursing through all objects indiscriminately transforms
 * their method surfaces instead of the data model the utility intended.
 *
 * I read `LeafValues<T>` as a decision tree: "handle any; stop at an atomic
 * value; recurse into array elements; recurse into declared object properties;
 * otherwise stop." Ordering matters because arrays and functions are objects.
 * Empty containers contribute `never` because they expose no leaf values.
 * Unknown remains unknown, never distributes to no branch, and optional
 * properties contribute undefined through their read type.
 */

export type Primitive = string | number | boolean | bigint | symbol | null | undefined;
export type Callable = (...args: any[]) => unknown;
export type Atomic = Primitive | Date | RegExp | Callable | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;

export type IsAny<Value> = 0 extends (1 & Value) ? true : false;

export type LeafValues<Value> = IsAny<Value> extends true
  ? any
  : Value extends Atomic
    ? Value
    : Value extends readonly (infer Element)[]
      ? LeafValues<Element>
      : Value extends object
        ? { [Key in keyof Value]: LeafValues<Value[Key]> }[keyof Value]
        : Value;

export type DeepElement<Value> = Value extends readonly (infer Element)[]
  ? DeepElement<Element>
  : Value;

export type IsAtomic<Value> = [Value] extends [Atomic] ? true : false;

function isRuntimeAtomic(value: unknown): boolean {
  return value === null
    || (typeof value !== "object" && typeof value !== "function")
    || typeof value === "function"
    || value instanceof Date
    || value instanceof RegExp
    || value instanceof Map
    || value instanceof Set
    || value instanceof Promise;
}

export function collectLeaves(value: unknown, active = new Set<object>()): unknown[] {
  if (isRuntimeAtomic(value)) return [value];
  const object = value as object;
  if (active.has(object)) return [];
  active.add(object);
  const leaves = Array.isArray(value)
    ? value.flatMap((entry) => collectLeaves(entry, active))
    : Object.values(value as Record<string, unknown>).flatMap((entry) => collectLeaves(entry, active));
  active.delete(object);
  return leaves;
}

export function leafCount(value: unknown): number {
  return collectLeaves(value).length;
}

export type NestedArray<Value> = Value | readonly NestedArray<Value>[];

export function flattenNested<Value>(value: NestedArray<Value>): Value[] {
  return Array.isArray(value)
    ? value.flatMap((entry) => flattenNested(entry as NestedArray<Value>))
    : [value as Value];
}

// Part 1: atomic cases stop recursion immediately.
type _Main01 = Expect<Equal<LeafValues<string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<LeafValues<null>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<LeafValues<Date>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<LeafValues<(value: number) => string>, TODO>>; // TODO(koan) @koan-error

// Part 2: array recursion repeatedly unwraps element containers.
type _Main05 = Expect<Equal<DeepElement<number[][][]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<LeafValues<readonly [1, readonly ["x", true]]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<LeafValues<readonly []>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<LeafValues<string[]>, TODO>>; // TODO(koan) @koan-error

// Part 3: object recursion unions leaves from every declared property.
type MainModel = { user: { id: number; name: string }; flags: readonly boolean[] };
type _Main09 = Expect<Equal<LeafValues<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<LeafValues<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<LeafValues<{}>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<LeafValues<Record<string, number>>, TODO>>; // TODO(koan) @koan-error

// Part 4: special source types follow explicit boundary behavior.
type _Main13 = Expect<Equal<IsAny<LeafValues<any>>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<LeafValues<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<LeafValues<never>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<LeafValues<Map<string, number>>, TODO>>; // TODO(koan) @koan-error

// Part 5: leaf classification is a reusable policy surface.
type _Main17 = Expect<Equal<IsAtomic<string>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<IsAtomic<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof collectLeaves>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof flattenNested<string>>, TODO>>; // TODO(koan) @koan-error
