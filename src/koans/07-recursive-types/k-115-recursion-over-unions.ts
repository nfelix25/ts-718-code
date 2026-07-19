import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 115 - RECURSION OVER UNIONS
 * ========================================
 *
 * Recursive conditionals do not distribute just once. Every recursive call
 * receives a fresh type argument, so a union discovered inside an array or
 * property distributes again when that call begins with a naked T.
 *
 * Read `DeepLeaves<T>` aloud as: "for each possible T: stop at an atomic leaf;
 * unwrap arrays; for objects, recurse into every property and union the results."
 * `WholeDeepLeaves<T>` wraps each test in a tuple, asking whether the complete
 * union fits one branch. The difference is control over branch-by-branch versus
 * all-at-once reasoning.
 */

type Primitive = string | number | bigint | boolean | symbol | null | undefined;
type Atomic = Primitive | Function | Date | RegExp;
type IsAny<T> = 0 extends 1 & T ? true : false;

export type DeepLeaves<T> = IsAny<T> extends true
  ? any
  : T extends Atomic
    ? T
    : T extends readonly (infer Element)[]
      ? DeepLeaves<Element>
      : T extends object
        ? { [K in keyof T]-?: DeepLeaves<T[K]> }[keyof T]
        : T;

export type WholeDeepLeaves<T> = IsAny<T> extends true
  ? any
  : [T] extends [Atomic]
    ? T
    : [T] extends [readonly (infer Element)[]]
      ? WholeDeepLeaves<Element>
      : [T] extends [object]
        ? { [K in keyof T]-?: WholeDeepLeaves<T[K]> }[keyof T]
        : T;

export type DeepBox<T> = IsAny<T> extends true
  ? any
  : T extends Atomic
    ? { value: T }
    : T extends readonly unknown[]
      ? { [K in keyof T]: DeepBox<T[K]> }
      : T extends object
        ? { [K in keyof T]: DeepBox<T[K]> }
        : { value: T };

type Variant =
  | { kind: "text"; payload: { value: string } }
  | { kind: "count"; payload: { value: number; unit?: "ms" | "s" } };

// Part 1: A naked type parameter visits each union constituent.
type _01 = Expect<Equal<DeepLeaves<string | number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<DeepLeaves<{ value: string | number }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DeepLeaves<Array<string | { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<DeepLeaves<readonly [1, "x", { ok: true }]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Object unions distribute before keyof observes each branch.
type _05 = Expect<Equal<DeepLeaves<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<DeepLeaves<{ a: { x: 1 } } | { b: { y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<DeepLeaves<Variant>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<DeepLeaves<{ nested: Variant }>, TODO>>; // TODO(koan) @koan-error

// Part 3: Tuple wrapping makes each branch test non-distributive.
type _09 = Expect<Equal<WholeDeepLeaves<string | number>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<WholeDeepLeaves<string | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<WholeDeepLeaves<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<WholeDeepLeaves<{ common: 0; a: 1 } | { common: 0; b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Part 4: A shape-preserving recursion distributes nested union properties too.
type _13 = Expect<Equal<DeepBox<1 | "x">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<DeepBox<{ value: 1 | "x" }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DeepBox<{ a: 1 } | { b: "x" }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DeepBox<readonly [1 | 2, { ok: true | false }]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Top and bottom types still require explicit interpretation.
type _17 = Expect<Equal<DeepLeaves<unknown>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<DeepLeaves<never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<DeepLeaves<any>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DeepLeaves<{ value?: never }>, TODO>>; // TODO(koan) @koan-error

function isAtomic(value: unknown): boolean {
  return (
    value === null ||
    typeof value !== "object" ||
    value instanceof Date ||
    value instanceof RegExp
  );
}

/** Runtime mirror: collect terminal values while stopping active cycles. */
export function collectDeepLeaves(value: unknown): unknown[] {
  const active = new WeakSet<object>();

  const visit = (current: unknown): unknown[] => {
    if (isAtomic(current)) return [current];
    const object = current as object;
    if (active.has(object)) return [];
    active.add(object);
    const leaves = Array.isArray(current)
      ? current.flatMap(visit)
      : Object.values(current as Record<string, unknown>).flatMap(visit);
    active.delete(object);
    return leaves;
  };

  return visit(value);
}
