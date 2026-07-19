import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 113 - DOT-NOTATION PATHS
 * ========================================
 *
 * I often need a vocabulary for addressing nested fields: configuration keys,
 * form names, selectors, and patch operations all use strings such as
 * `"profile.contact.email"`. A path type turns an object shape into that
 * vocabulary.
 *
 * Read the recursive branch aloud as: "for every string key K, keep K itself;
 * then, if the value under K has deeper paths R, also keep `K.R`." The base
 * case is a policy decision. In this lesson primitives, functions, built-ins,
 * arrays, and tuples are leaves. Later lessons add value lookup, cycle guards,
 * and explicit depth budgets.
 */

type Primitive = string | number | bigint | boolean | symbol | null | undefined;

type PathLeaf =
  | Primitive
  | Function
  | Date
  | RegExp
  | Promise<unknown>
  | ReadonlyMap<unknown, unknown>
  | ReadonlySet<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>
  | readonly unknown[];

type IsAny<T> = 0 extends 1 & T ? true : false;

type ChildPath<K extends string, V> = DotPaths<V> extends infer Rest extends string
  ? `${K}.${Rest}`
  : never;

type DotPathBranch<T> = T extends PathLeaf
  ? never
  : T extends object
    ? {
        [K in keyof T & string]-?: K | ChildPath<K, T[K]>;
      }[keyof T & string]
    : never;

export type DotPaths<T> = IsAny<T> extends true
  ? string
  : T extends unknown
    ? DotPathBranch<T>
    : never;

type Account = {
  id: string;
  profile: {
    displayName: string;
    contact: { email: string; phone?: string };
  };
  flags?: { admin: boolean };
  tags: readonly string[];
};

// Part 1: One key is already a valid path.
type _01 = Expect<Equal<DotPaths<{ id: string }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<DotPaths<{ id: string; active: boolean }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DotPaths<{ profile: { name: string } }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<DotPaths<{ a: { b: { c: number } } }>, TODO>>; // TODO(koan) @koan-error

// Part 2: Every prefix remains addressable, not just the deepest leaf.
type _05 = Expect<Equal<DotPaths<Account["profile"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<DotPaths<Account["profile"]["contact"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<DotPaths<Account>, `profile.${string}`>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<DotPaths<Account>, `flags.${string}`>, TODO>>; // TODO(koan) @koan-error

// Part 3: Optionality changes presence at runtime, not the static path vocabulary.
type _09 = Expect<Equal<DotPaths<{ maybe?: { value: number } }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<DotPaths<{ value: string | { length: number } }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DotPaths<{ left: null | { value: string } }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<DotPaths<{ data: undefined | { ready: boolean } }>, TODO>>; // TODO(koan) @koan-error

// Part 4: Arrays and opaque values are leaves under this lesson's policy.
type _13 = Expect<Equal<DotPaths<{ tags: string[] }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<DotPaths<{ pair: readonly [{ x: 1 }, { y: 2 }] }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DotPaths<{ createdAt: Date; matcher: RegExp }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DotPaths<{ cache: Map<string, { hit: boolean }> }>, TODO>>; // TODO(koan) @koan-error

// Part 5: The outer conditional distributes over object unions.
type _17 = Expect<Equal<DotPaths<{ kind: "a"; a: { x: 1 } } | { kind: "b"; b: { y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<DotPaths<unknown>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<DotPaths<never>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DotPaths<any>, TODO>>; // TODO(koan) @koan-error

function isBranch(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp) &&
    !(value instanceof Map) &&
    !(value instanceof Set) &&
    !(value instanceof WeakMap) &&
    !(value instanceof WeakSet) &&
    !(value instanceof Promise)
  );
}

/** Lists the paths that are present in one runtime value under the same leaf policy. */
export function listDotPaths<T>(value: T): DotPaths<T>[] {
  const walk = (current: unknown, active: WeakSet<object>, prefix = ""): string[] => {
    if (!isBranch(current) || active.has(current)) return [];
    active.add(current);
    const paths: string[] = [];
    for (const key of Object.keys(current)) {
      const path = prefix === "" ? key : `${prefix}.${key}`;
      paths.push(path, ...walk(current[key], active, path));
    }
    active.delete(current);
    return paths;
  };

  return walk(value, new WeakSet()).sort() as DotPaths<T>[];
}
