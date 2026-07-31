import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AppendEventArg,
  type EventEnvelope,
  type MergeEventMaps,
  type NamespaceEvents,
  type Normalize,
  type PrefixEvents,
  type RenameEvents,
  type SelectEvents,
  type SourceEvents,
  type EventSchema,
  sourceShutdownEvent,
} from "./k-153-event-map-transformations.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * Key remapping can filter, preserve, broaden, or collide keys. Collisions do
 * not overwrite in a mapped type: their values union. Optional rename-map
 * properties also include `undefined`, so a broad optional map is not the same
 * thing as a concrete rename instruction.
 */

type IsAny<Value> = 0 extends 1 & Value ? true : false;
type SatisfiesSchema<Value> = Value extends EventSchema<Value> ? true : false;
type Collision = RenameEvents<
  { start: []; stop: [code: number] },
  { start: "change"; stop: "change" }
>;
type OptionalRenames = Partial<Record<keyof SourceEvents, "renamed">>;

// Pre-solved demonstrations make filtering and collision policy memorable.
type _DemoFiltered = Expect<Equal<Extract<keyof PrefixEvents<SourceEvents, "ui">, number | symbol>, never>>;
type _DemoPreserved = Expect<Equal<NamespaceEvents<SourceEvents, "ui">[typeof sourceShutdownEvent], [code: number]>>;
type _DemoCollision = Expect<Equal<Collision["change"], [] | [code: number]>>;
type _DemoRightBias = Expect<Equal<MergeEventMaps<{ value: [string] }, { value: [number] }>["value"], [number]>>;
// Runtime object spread and type-level MergeEventMaps use the same right-wins collision rule.

// 1. Prefix filtering, preservation, and broad string domains (1-8)
type _01 = Expect<Equal<keyof PrefixEvents<SourceEvents, "ui">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<keyof PrefixEvents<SourceEvents, "ui">, number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<keyof PrefixEvents<SourceEvents, "ui">, symbol>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof NamespaceEvents<SourceEvents, "ui">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<NamespaceEvents<SourceEvents, "ui">[404], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<NamespaceEvents<SourceEvents, "ui">[typeof sourceShutdownEvent], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof PrefixEvents<{ [name: string]: [number] }, "metric">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<PrefixEvents<{}, "empty">, TODO>>; // TODO(koan) @koan-error

// 2. Rename collisions and optional-map uncertainty (9-16)
type _09 = Expect<Equal<keyof Collision, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Collision["change"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RenameEvents<{ start: [] }, { start: "start" }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof RenameEvents<SourceEvents, OptionalRenames>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<RenameEvents<SourceEvents, OptionalRenames>["ready"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RenameEvents<SourceEvents, { ready: 0 }>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<RenameEvents<SourceEvents, { ready: typeof sourceShutdownEvent }>[typeof sourceShutdownEvent], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof RenameEvents<{}, {}>, TODO>>; // TODO(koan) @koan-error

// 3. Optional tuple spreads and selection use assignability, not equality (17-23)
type _17 = Expect<Equal<AppendEventArg<SourceEvents, Date>["error"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<AppendEventArg<SourceEvents, Date>["error"]["length"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof SelectEvents<SourceEvents, [unknown]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof SelectEvents<SourceEvents, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<keyof SelectEvents<SourceEvents, never[]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<SelectEvents<{ optional: [value?: number] }, []>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<SelectEvents<{ optional: [value?: number] }, [number]>, TODO>>; // TODO(koan) @koan-error

// 4. Merge normalization, empty maps, and top/bottom behavior (24-30)
type _24 = Expect<Equal<MergeEventMaps<{ a: []; shared: [string] }, { b: []; shared: [number] }>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<MergeEventMaps<{ value: [string] }, { value: [number] }>["value"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<MergeEventMaps<{}, {}>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<EventEnvelope<{}>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Normalize<never>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<Normalize<any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<SatisfiesSchema<{ broken: string }>, TODO>>; // TODO(koan) @koan-error
