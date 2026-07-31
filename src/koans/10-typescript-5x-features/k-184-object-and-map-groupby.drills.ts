import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type Owner,
  type Task,
  type TaskStatus,
  groupNumbersByParity,
  groupTasksByOwner,
  groupTasksByStatus,
} from "./k-184-object-and-map-groupby.js";

/** GUIDED DRILLS: repeat optional object buckets, map get semantics, callback element/index/key types, iterable inputs, key domains, bucket element preservation, and record/map reflection. */

type Extends<From, To> = [From] extends [To] ? true : false;
type ObjectGroups<Element, Key extends PropertyKey> =
  Partial<Record<Key, Element[]>>;
type MapGroups<Element, Key> = Map<Key, Element[]>;

// Object bucket shapes (1-12)
type _01 = Expect<Equal<ObjectGroups<number, "even" | "odd">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ObjectGroups<string, "short" | "long">["short"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof ObjectGroups<number, 0 | 1>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof ObjectGroups<number, symbol>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<NonNullable<ObjectGroups<number, "a">["a"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NonNullable<ObjectGroups<number, "a">["a"]>[number], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Partial<Record<TaskStatus, Task[]>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Required<ObjectGroups<number, "a" | "b">>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Readonly<ObjectGroups<number, "a">>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<{}, ObjectGroups<number, "a">>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<{ a: number[] }, ObjectGroups<number, "a">>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<ObjectGroups<number, "a">, { a: number[] }>, TODO>>; // TODO(koan) @koan-error

// Concrete object-group helpers (13-24)
type StatusGroups = ReturnType<typeof groupTasksByStatus>;
type ParityGroups = ReturnType<typeof groupNumbersByParity>;
type _13 = Expect<Equal<StatusGroups, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<keyof StatusGroups, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<StatusGroups["todo"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<StatusGroups["doing"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<StatusGroups["done"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<NonNullable<StatusGroups["done"]>[number], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ParityGroups, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof ParityGroups, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ParityGroups["even"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<NonNullable<ParityGroups["odd"]>[number], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Parameters<typeof groupTasksByStatus>[0], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof groupNumbersByParity>[0], TODO>>; // TODO(koan) @koan-error

// Map bucket shapes (25-36)
type _25 = Expect<Equal<MapGroups<number, "even" | "odd">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<MapGroups<number, "a">["get"]>[0], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<MapGroups<number, "a">["get"]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<NonNullable<ReturnType<MapGroups<number, "a">["get"]>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<MapGroups<number, object>["set"]>[0], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Parameters<MapGroups<number, object>["set"]>[1], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<ReturnType<MapGroups<number, object>["has"]>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<MapGroups<number, Date>["size"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<keyof MapGroups<number, Date>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<MapGroups<number, Owner>, Map<Owner, number[]>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<MapGroups<number, Owner>, object>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<MapGroups<number, Owner>["entries"]>, TODO>>; // TODO(koan) @koan-error

// Concrete owner grouping (37-48)
type OwnerGroups = ReturnType<typeof groupTasksByOwner>;
type OwnerEntries = NonNullable<ReturnType<OwnerGroups["get"]>>;
type _37 = Expect<Equal<OwnerGroups, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<OwnerGroups["get"]>[0], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<OwnerGroups["get"]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<OwnerEntries, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<OwnerEntries[number], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<OwnerEntries[number][0], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<OwnerEntries[number][1], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<OwnerGroups["size"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<OwnerGroups["keys"]>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<ReturnType<OwnerGroups["values"]>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Parameters<typeof groupTasksByOwner>[0], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<ReturnType<typeof groupTasksByOwner>, TODO>>; // TODO(koan) @koan-error

// Built-in callback signatures (49-60)
type ObjectCallback = Parameters<typeof Object.groupBy<TaskStatus, Task>>[1];
type MapCallback = Parameters<typeof Map.groupBy<Owner, Task>>[1];
type _49 = Expect<Equal<Parameters<ObjectCallback>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<ObjectCallback>[0], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<ObjectCallback>[1], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<ObjectCallback>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<MapCallback>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Parameters<MapCallback>[0], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Parameters<MapCallback>[1], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<ReturnType<MapCallback>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof Object.groupBy<TaskStatus, Task>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<typeof Map.groupBy<Owner, Task>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Parameters<typeof Object.groupBy<TaskStatus, Task>>[0], TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Parameters<typeof Map.groupBy<Owner, Task>>[0], TODO>>; // TODO(koan) @koan-error
