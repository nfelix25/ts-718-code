import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 117 - DEPTH LIMITS AND PATH-LENS CAPSTONE
 * ========================================
 *
 * A visited-shape guard stops cycles by recognizing types. A depth budget stops
 * every branch after a predictable amount of work, even when shapes are merely
 * similar or infinitely recursive. Fuel is a tuple: consume its head before
 * descending, and stop when the tuple is empty.
 *
 * Read `PathsToDepth<T, 3>` aloud as: "enumerate paths from T with three path
 * segments of fuel." Root keys consume the first segment; grandchildren consume
 * the third. The resulting finite vocabulary can safely parameterize a lens: a
 * path value, a typed getter, and an immutable setter tied together.
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
  | readonly unknown[];
type IsAny<T> = 0 extends 1 & T ? true : false;

type BuildDepth<N extends number, Acc extends unknown[] = []> = Acc["length"] extends N
  ? Acc
  : BuildDepth<N, [...Acc, unknown]>;

/** Broad `number` receives a practical default; literal unions distribute. */
export type DepthFuel<N extends number> = number extends N
  ? BuildDepth<5>
  : N extends unknown
    ? BuildDepth<N>
    : never;

type TailFuel<Fuel extends readonly unknown[]> = Fuel extends readonly [unknown, ...infer Rest]
  ? Rest
  : [];

type BoundedPathBranch<T, Fuel extends readonly unknown[]> = T extends PathLeaf
  ? never
  : T extends object
    ? {
        [K in keyof T & string]-?:
          | K
          | (BoundedPaths<T[K], TailFuel<Fuel>> extends infer Rest extends string
              ? `${K}.${Rest}`
              : never);
      }[keyof T & string]
    : never;

type BoundedPaths<T, Fuel extends readonly unknown[]> = Fuel extends readonly []
  ? never
  : IsAny<T> extends true
    ? string
    : T extends unknown
      ? BoundedPathBranch<T, Fuel>
      : never;

export type PathsToDepth<T, Depth extends number = 5> = BoundedPaths<T, DepthFuel<Depth>>;

export type LensPathValue<T, P extends string> = IsAny<T> extends true
  ? any
  : T extends unknown
    ? T extends null | undefined
      ? undefined
      : P extends `${infer Head}.${infer Rest}`
        ? Head extends keyof T
          ? LensPathValue<T[Head], Rest>
          : undefined
        : P extends keyof T
          ? T[P]
          : undefined
    : never;

export type PathLens<T, P extends string> = Readonly<{
  path: P;
  get(value: T): LensPathValue<T, P>;
  set(value: T, next: LensPathValue<T, P>): T;
}>;

type Model = {
  id: string;
  profile: { name: string; contact: { email: string } };
  settings?: { theme: "light" | "dark" };
  rows: readonly { id: number }[];
};
type Node = { id: number; next?: Node };

// Part 1: Fuel length is the recursion budget.
type _01 = Expect<Equal<DepthFuel<0>["length"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<DepthFuel<1>["length"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DepthFuel<3>["length"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<DepthFuel<number>["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: Each unit admits one more path segment.
type _05 = Expect<Equal<PathsToDepth<Model, 0>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<PathsToDepth<Model, 1>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PathsToDepth<Model, 2>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<PathsToDepth<Model, 3>, TODO>>; // TODO(koan) @koan-error

// Part 3: Cyclic aliases are finite because the budget always shrinks.
type _09 = Expect<Equal<PathsToDepth<Node, 1>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<PathsToDepth<Node, 2>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<PathsToDepth<Node, 3>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<PathsToDepth<Node, 4>, `next.next.${string}`>, TODO>>; // TODO(koan) @koan-error

// Part 4: The lens value includes runtime absence from optional branches.
type _13 = Expect<Equal<LensPathValue<Model, "id">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<LensPathValue<Model, "profile.contact.email">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<LensPathValue<Model, "settings.theme">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<LensPathValue<Model, "missing">, TODO>>; // TODO(koan) @koan-error

// Part 5: Path, getter result, and setter input stay correlated.
type EmailLens = PathLens<Model, "profile.contact.email">;
type ThemeLens = PathLens<Model, "settings.theme">;
type _17 = Expect<Equal<EmailLens["path"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<EmailLens["get"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<ThemeLens["set"]>[1], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<ThemeLens["set"]>, TODO>>; // TODO(koan) @koan-error

function readPath(value: unknown, path: string): unknown {
  let current = value;
  for (const segment of path.split(".")) {
    if ((typeof current !== "object" && typeof current !== "function") || current === null) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function writePath(value: unknown, segments: readonly string[], next: unknown): unknown {
  const [head, ...tail] = segments;
  if (head === undefined) return next;
  const source = typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
  return { ...source, [head]: writePath(source[head], tail, next) };
}

export function lensFor<T, Depth extends number = 5>() {
  return <const P extends PathsToDepth<T, Depth> & string>(path: P): PathLens<T, P> => ({
    path,
    get: (value) => readPath(value, path) as LensPathValue<T, P>,
    set: (value, next) => writePath(value, path.split("."), next) as T,
  });
}
