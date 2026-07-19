import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 116 - CYCLIC TYPES AND VISITED GUARDS
 * ========================================
 *
 * Productive runtime graphs may revisit an object, and recursive type aliases
 * may revisit a shape. An unguarded transform cannot know when to stop. A Seen
 * accumulator records shapes already crossed and applies a deliberate frontier
 * policy when one appears again.
 *
 * Read `GuardedPaths<T, Seen>` aloud as: "for each possible T, stop at leaves;
 * if T is assignable to something already Seen, expose only the chosen cycle
 * frontier; otherwise recurse with Seen | T." This is an approximation: types
 * describe sets of values, so structural assignability can report a revisit
 * earlier than strict type equality would. Runtime identity needs a WeakMap.
 */

type Primitive = string | number | bigint | boolean | symbol | null | undefined;
type Atomic =
  | Primitive
  | Function
  | Date
  | RegExp
  | Promise<unknown>
  | ReadonlyMap<unknown, unknown>
  | ReadonlySet<unknown>;
type IsAny<T> = 0 extends 1 & T ? true : false;
type RevisitMode = "stop" | "shallow";

type AtRevisit<T, Mode extends RevisitMode> = Mode extends "stop"
  ? never
  : T extends object
    ? keyof T & string
    : never;

type GuardedPathBranch<T, Seen, Mode extends RevisitMode> = T extends Atomic | readonly unknown[]
  ? never
  : T extends Seen
    ? AtRevisit<T, Mode>
    : T extends object
      ? {
          [K in keyof T & string]-?:
            | K
            | (GuardedPaths<T[K], Seen | T, Mode> extends infer Rest extends string
                ? `${K}.${Rest}`
                : never);
        }[keyof T & string]
      : never;

export type GuardedPaths<
  T,
  Seen = never,
  Mode extends RevisitMode = "shallow",
> = IsAny<T> extends true ? string : T extends unknown ? GuardedPathBranch<T, Seen, Mode> : never;

type SeenExactly<T, Seen> = true extends (
  Seen extends unknown ? Equal<T, Seen> : never
)
  ? true
  : false;

type ExactPathBranch<T, Seen> = T extends Atomic | readonly unknown[]
  ? never
  : SeenExactly<T, Seen> extends true
    ? T extends object
      ? keyof T & string
      : never
    : T extends object
      ? {
          [K in keyof T & string]-?:
            | K
            | (ExactGuardedPaths<T[K], Seen | T> extends infer Rest extends string
                ? `${K}.${Rest}`
                : never);
        }[keyof T & string]
      : never;

export type ExactGuardedPaths<T, Seen = never> = IsAny<T> extends true
  ? string
  : T extends unknown
    ? ExactPathBranch<T, Seen>
    : never;

export type GuardedDeepReadonly<T, Seen = never> = IsAny<T> extends true
  ? any
  : T extends Atomic
    ? T
    : T extends Seen
      ? T
      : T extends readonly unknown[]
        ? Readonly<{ [K in keyof T]: GuardedDeepReadonly<T[K], Seen | T> }>
        : T extends object
          ? { readonly [K in keyof T]: GuardedDeepReadonly<T[K], Seen | T> }
          : T;

type Node = { id: string; next?: Node };
type Department = { name: string; parent?: Department; members: readonly { id: number }[] };
type A = { a: string; b?: B };
type B = { b: number; a?: A };

// Part 1: A shallow frontier exposes one repeated shape without recursing again.
type _01 = Expect<Equal<GuardedPaths<Node>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<GuardedPaths<Node, never, "stop">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<GuardedPaths<Node>, `next.${string}`>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<GuardedPaths<Node, never, "stop">, `next.${string}`>, TODO>>; // TODO(koan) @koan-error

// Part 2: Mutual recursion stops when it reaches the first shape again.
type _05 = Expect<Equal<GuardedPaths<A>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<GuardedPaths<B>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<GuardedPaths<A>, `b.a.${string}`>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<GuardedPaths<Department, never, "stop">, TODO>>; // TODO(koan) @koan-error

// Part 3: Seen-by-assignability and Seen-by-equality answer different questions.
type Small = { id: string };
type Large = { id: string; meta: { active: boolean } };
type _09 = Expect<Equal<GuardedPaths<Large, Small>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ExactGuardedPaths<Large, Small>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<GuardedPaths<Small, Large>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ExactGuardedPaths<Node>, TODO>>; // TODO(koan) @koan-error

// Part 4: A guarded deep transform retains the original type at the frontier.
type ReadNode = GuardedDeepReadonly<Node>;
type ReadDepartment = GuardedDeepReadonly<Department>;
type _13 = Expect<Equal<keyof ReadNode, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReadNode["id"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReadNode["next"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReadDepartment["members"], TODO>>; // TODO(koan) @koan-error

// Part 5: Special types are intercepted before membership checks recurse.
type _17 = Expect<Equal<GuardedPaths<unknown>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<GuardedPaths<never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<GuardedPaths<any>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsAny<GuardedDeepReadonly<any>>, TODO>>; // TODO(koan) @koan-error

function isOpaque(value: object): boolean {
  return (
    value instanceof Date ||
    value instanceof RegExp ||
    value instanceof Map ||
    value instanceof Set ||
    value instanceof WeakMap ||
    value instanceof WeakSet ||
    value instanceof Promise
  );
}

/** Clones graph containers while preserving cycles and shared identity with a WeakMap. */
export function cloneObjectGraph<T>(value: T): T {
  const seen = new WeakMap<object, object>();

  const clone = (current: unknown): unknown => {
    if ((typeof current !== "object" && typeof current !== "function") || current === null) return current;
    if (typeof current === "function" || isOpaque(current)) return current;
    const prior = seen.get(current);
    if (prior !== undefined) return prior;

    if (Array.isArray(current)) {
      const result: unknown[] = [];
      seen.set(current, result);
      for (const item of current) result.push(clone(item));
      return result;
    }

    const result: Record<PropertyKey, unknown> = {};
    seen.set(current, result);
    for (const key of Reflect.ownKeys(current)) {
      result[key] = clone(Reflect.get(current, key));
    }
    return result;
  };

  return clone(value) as T;
}
