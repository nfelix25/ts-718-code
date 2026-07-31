import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 184 - OBJECT.GROUPBY AND MAP.GROUPBY
 * ==========================================
 *
 * Both ES2024 grouping functions walk an iterable and place each original
 * element into a bucket chosen by a callback. TypeScript 5.4 added their
 * standard-library declarations.
 *
 * `Object.groupBy` requires a PropertyKey and returns a null-prototype object
 * with optional array properties. Read the optionality as "the callback can
 * produce this key, but this particular input might not." `Map.groupBy` accepts
 * any key type, keeps identity semantics, and represents absent buckets through
 * `Map.get(...): T[] | undefined`.
 *
 * Grouping never narrows the element type within a bucket merely because a key
 * was selected. The declaration preserves elements and keys, not a correlation
 * between each key and a refined subtype.
 *
 * Feature ownership: TypeScript 5.4 standard-library declarations.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-4.html#objectgroupby-and-mapgroupby
 */

export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: number;
  status: TaskStatus;
  title: string;
}

export interface Owner {
  name: string;
}

export function groupTasksByStatus(
  tasks: Iterable<Task>,
): Partial<Record<TaskStatus, Task[]>> {
  return Object.groupBy(tasks, (task) => task.status);
}

export function groupNumbersByParity(
  numbers: Iterable<number>,
): Partial<Record<"even" | "odd", number[]>> {
  return Object.groupBy(numbers, (number) =>
    number % 2 === 0 ? "even" : "odd"
  );
}

export function groupTasksByOwner(
  entries: Iterable<readonly [Owner, Task]>,
): Map<Owner, Array<readonly [Owner, Task]>> {
  return Map.groupBy(entries, ([owner]) => owner);
}

// Part 1: object grouping yields optional buckets.
type _01 = Expect<Equal<ReturnType<typeof groupTasksByStatus>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof groupTasksByStatus>["todo"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof groupTasksByStatus>["doing"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof ReturnType<typeof groupTasksByStatus>, TODO>>; // TODO(koan) @koan-error

// Part 2: callback key unions become object property unions.
type _05 = Expect<Equal<ReturnType<typeof groupNumbersByParity>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof groupNumbersByParity>["even"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<NonNullable<ReturnType<typeof groupNumbersByParity>["odd"]>[number], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof ReturnType<typeof groupNumbersByParity>, TODO>>; // TODO(koan) @koan-error

// Part 3: map grouping supports object identity keys.
type _09 = Expect<Equal<ReturnType<typeof groupTasksByOwner>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<ReturnType<typeof groupTasksByOwner>["get"]>[0], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<ReturnType<typeof groupTasksByOwner>["get"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<NonNullable<ReturnType<ReturnType<typeof groupTasksByOwner>["get"]>>[number], TODO>>; // TODO(koan) @koan-error

// Part 4: grouping callbacks receive the element and numeric index.
type ObjectCallback = Parameters<typeof Object.groupBy<TaskStatus, Task>>[1];
type MapCallback = Parameters<typeof Map.groupBy<Owner, Task>>[1];
type _13 = Expect<Equal<Parameters<ObjectCallback>[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<ObjectCallback>[1], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<ObjectCallback>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<MapCallback>, TODO>>; // TODO(koan) @koan-error

// Part 5: source elements are preserved rather than narrowed by their key.
type _17 = Expect<Equal<NonNullable<ReturnType<typeof groupTasksByStatus>["done"]>[number], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<typeof groupTasksByStatus>[0], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof groupNumbersByParity>[0], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof groupTasksByOwner>[0], TODO>>; // TODO(koan) @koan-error
