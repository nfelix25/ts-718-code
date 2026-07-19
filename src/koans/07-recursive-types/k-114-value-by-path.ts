import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 114 - VALUE BY PATH
 * ========================================
 *
 * A path union answers "which strings are valid?" A path-value parser answers
 * "what will I find there?" It consumes one segment at a time: split P into a
 * head and rest, prove the head indexes T, then recurse into T[head] with rest.
 *
 * There are two honest answers for unions. `PathValue` is a type-level query:
 * branches without the segment become never and disappear. `SafePathValue`
 * models an actual lookup: a missing, nullish, or optional branch contributes
 * undefined. Read `SafePathValue<T, "a.b">` aloud as "read a from every possible
 * T, then read b from every result, retaining absence at either step."
 */

type IsAny<T> = 0 extends 1 & T ? true : false;

type ApprovedLeaf =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined
  | Function
  | Date
  | RegExp
  | Promise<unknown>
  | ReadonlyMap<unknown, unknown>
  | ReadonlySet<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>
  | readonly unknown[];

type ApprovedChild<K extends string, V> = ApprovedPaths<V> extends infer Rest extends string
  ? `${K}.${Rest}`
  : never;

type ApprovedPathBranch<T> = T extends ApprovedLeaf
  ? never
  : T extends object
    ? { [K in keyof T & string]-?: K | ApprovedChild<K, T[K]> }[keyof T & string]
    : never;

/** A solved local copy of k-113's vocabulary policy keeps focused checks isolated. */
export type ApprovedPaths<T> = IsAny<T> extends true
  ? string
  : T extends unknown
    ? ApprovedPathBranch<T>
    : never;

export type PathValue<T, P extends string> = IsAny<T> extends true
  ? any
  : T extends unknown
    ? P extends `${infer Head}.${infer Rest}`
      ? Head extends keyof T
        ? PathValue<T[Head], Rest>
        : never
      : P extends keyof T
        ? T[P]
        : never
    : never;

export type SafePathValue<T, P extends string> = IsAny<T> extends true
  ? any
  : T extends unknown
    ? T extends null | undefined
      ? undefined
      : P extends `${infer Head}.${infer Rest}`
        ? Head extends keyof T
          ? SafePathValue<T[Head], Rest>
          : undefined
        : P extends keyof T
          ? T[P]
          : undefined
    : never;

type Model = {
  id: string;
  profile: {
    name: string;
    contact?: { email: string; phone: string | null };
  };
  settings?: { theme: "light" | "dark" };
};

// Part 1: A one-segment path is indexed access with a string proof.
type _01 = Expect<Equal<PathValue<Model, "id">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<PathValue<Model, "profile">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<PathValue<Model["profile"], "name">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<PathValue<Model, "missing">, TODO>>; // TODO(koan) @koan-error

// Part 2: Each dot consumes exactly one object layer.
type _05 = Expect<Equal<PathValue<Model, "profile.name">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<PathValue<Model, "profile.contact">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PathValue<Model, "profile.contact.email">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<PathValue<Model, "profile.contact.phone">, TODO>>; // TODO(koan) @koan-error

// Part 3: Strict lookup filters absent branches; safe lookup retains absence.
type _09 = Expect<Equal<PathValue<Model, "settings.theme">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<SafePathValue<Model, "settings.theme">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<PathValue<{ a: { x: 1 } } | { b: { y: 2 } }, "a.x">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<SafePathValue<{ a: { x: 1 } } | { b: { y: 2 } }, "a.x">, TODO>>; // TODO(koan) @koan-error

// Part 4: The parser and the approved path vocabulary are separate tools.
type _13 = Expect<Equal<PathValue<{ tuple: [{ x: 1 }] }, "tuple.0.x">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<"tuple.0.x", ApprovedPaths<{ tuple: [{ x: 1 }] }>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<PathValue<{ map: Map<string, number> }, "map.size">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<"map.size", ApprovedPaths<{ map: Map<string, number> }>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Special top and bottom types retain their established algebra.
type _17 = Expect<Equal<PathValue<unknown, "x">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<PathValue<never, "x">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<PathValue<any, "x.y">>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<SafePathValue<null | { x: number }, "x">, TODO>>; // TODO(koan) @koan-error

export function getAtPath<T, const P extends ApprovedPaths<T> & string>(
  value: T,
  path: P,
): SafePathValue<T, P> {
  let current: unknown = value;
  for (const segment of path.split(".")) {
    if ((typeof current !== "object" && typeof current !== "function") || current === null) {
      return undefined as SafePathValue<T, P>;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current as SafePathValue<T, P>;
}

export function getAtPathOr<T, const P extends ApprovedPaths<T> & string, F>(
  value: T,
  path: P,
  fallback: F,
): Exclude<SafePathValue<T, P>, undefined> | F {
  const found = getAtPath(value, path);
  return (found === undefined ? fallback : found) as Exclude<SafePathValue<T, P>, undefined> | F;
}
