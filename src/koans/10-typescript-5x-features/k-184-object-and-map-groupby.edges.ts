import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Owner,
  type Task,
  type TaskStatus,
  groupNumbersByParity,
  groupTasksByOwner,
  groupTasksByStatus,
} from "./k-184-object-and-map-groupby.js";

/** EDGE CASES: object buckets are optional and null-prototype, numeric keys become property names at runtime, map object keys use identity, grouping does not correlate keys with refined element subtypes, empty inputs produce no groups, and broad/top/bottom key types affect precision. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// Pre-solved demonstrations establish missing-bucket and correlation limits.
type StatusGroups = ReturnType<typeof groupTasksByStatus>;
type _DemoOptional = Expect<Equal<StatusGroups["done"], Task[] | undefined>>;
type _DemoElementUnrefined = Expect<Equal<NonNullable<StatusGroups["done"]>[number], Task>>;
type _DemoMapMissing = Expect<Equal<ReturnType<ReturnType<typeof groupTasksByOwner>["get"]>, Array<readonly [Owner, Task]> | undefined>>;
type _DemoObjectKeys = Expect<Equal<keyof ReturnType<typeof groupNumbersByParity>, "even" | "odd">>;

// 1. Optional buckets force explicit absence handling (1-8)
type _01 = Expect<Equal<StatusGroups["todo"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<NonNullable<StatusGroups["todo"]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Required<StatusGroups>["todo"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<{}, StatusGroups>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<StatusGroups, Record<TaskStatus, Task[]>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Record<TaskStatus, Task[]>, StatusGroups>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<ReturnType<typeof groupTasksByOwner>["get"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<NonNullable<ReturnType<ReturnType<typeof groupTasksByOwner>["get"]>>, TODO>>; // TODO(koan) @koan-error

// 2. PropertyKey and Map key domains differ (9-15)
type _09 = Expect<Equal<PropertyKey, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<"x" extends PropertyKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<1 extends PropertyKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<symbol extends PropertyKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<object extends PropertyKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<ReturnType<typeof groupTasksByOwner>["get"]>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Owner, PropertyKey>, TODO>>; // TODO(koan) @koan-error

// 3. Key selection does not refine bucket elements (16-22)
type DoneTask = Task & { status: "done" };
type _16 = Expect<Equal<NonNullable<StatusGroups["done"]>[number], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<NonNullable<StatusGroups["done"]>[number], DoneTask>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<DoneTask, NonNullable<StatusGroups["done"]>[number]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Task["status"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<Task, { status: "done" }>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<NonNullable<ReturnType<typeof groupNumbersByParity>["even"]>[number], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof StatusGroups, TODO>>; // TODO(koan) @koan-error

// 4. Broad and bottom types expose precision limits (23-30)
type _23 = Expect<Equal<ReturnType<typeof Object.groupBy<"x", never>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<typeof Map.groupBy<object, never>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof Object.groupBy<string, unknown>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof Map.groupBy<unknown, unknown>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<NonNullable<ReturnType<typeof Object.groupBy<string, any>>[string]>[number]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<keyof ReturnType<typeof Object.groupBy<string, number>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<typeof Map.groupBy<unknown, number>>["size"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<ReturnType<typeof Map.groupBy<Owner, number>>, object>, TODO>>; // TODO(koan) @koan-error
