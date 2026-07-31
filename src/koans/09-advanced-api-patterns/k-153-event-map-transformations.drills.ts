import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AppendEventArg,
  type ContextualAppEvents,
  type EventEnvelope,
  type EventRecord,
  type EventSchema,
  type MergeEventMaps,
  type NamespaceEvents,
  type Normalize,
  type PrefixEvents,
  type RenameEvents,
  type SelectEvents,
  type SourceEvents,
  type StringEventNames,
  type UiEvents,
  sourceShutdownEvent,
} from "./k-153-event-map-transformations.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Practice vocabulary transformations separately from tuple transformations,
 * then compose them. Watch which operations preserve non-string keys, which
 * filter them, and which define an explicit answer for collisions.
 */

type Extends<From, To> = [From] extends [To] ? true : false;

// String-name extraction, prefixing, and namespacing (1-15)
type _01 = Expect<Equal<StringEventNames<SourceEvents>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof UiEvents, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<UiEvents["ui:ready"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<UiEvents["ui:message"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<keyof UiEvents, string>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<keyof UiEvents, number | symbol>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof NamespaceEvents<SourceEvents, "app">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<NamespaceEvents<SourceEvents, "app">["app:ready"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<NamespaceEvents<SourceEvents, "app">[404], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<NamespaceEvents<SourceEvents, "app">[typeof sourceShutdownEvent], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<PrefixEvents<{}, "empty">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<PrefixEvents<{ ping: [] }, "net">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<keyof PrefixEvents<{ [name: string]: [number] }, "metric">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<keyof PrefixEvents<PrefixEvents<{ ping: [] }, "inner">, "outer">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<StringEventNames<NamespaceEvents<SourceEvents, "app">>, TODO>>; // TODO(koan) @koan-error

// Renaming, collision unions, and tuple-shape selection (16-30)
type Renamed = RenameEvents<SourceEvents, { ready: "boot"; message: "chat"; 404: "missing" }>;
type Collision = RenameEvents<{ start: []; stop: [code: number] }, { start: "change"; stop: "change" }>;
type _16 = Expect<Equal<keyof Renamed, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Renamed["boot"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Renamed["chat"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Renamed["missing"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Renamed[typeof sourceShutdownEvent], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<RenameEvents<SourceEvents, {}>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof Collision, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Collision["change"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<keyof SelectEvents<SourceEvents, []>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<keyof SelectEvents<SourceEvents, [number]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof SelectEvents<SourceEvents, [string]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<keyof SelectEvents<SourceEvents, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<SelectEvents<SourceEvents, [number]>["progress"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<SelectEvents<SourceEvents, [number]>[typeof sourceShutdownEvent], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<SelectEvents<SourceEvents, never[]>, TODO>>; // TODO(koan) @koan-error

// Tuple augmentation and right-biased schema merging (31-45)
type Left = { ready: []; legacy: [id: string] };
type Right = { ready: [at: Date]; modern: [enabled: boolean] };
type Merged = MergeEventMaps<Left, Right>;
type _31 = Expect<Equal<ContextualAppEvents["ready"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ContextualAppEvents["message"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<ContextualAppEvents["error"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ContextualAppEvents[404], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<ContextualAppEvents[typeof sourceShutdownEvent], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<AppendEventArg<SourceEvents, Date>["ready"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<AppendEventArg<SourceEvents, Date>["message"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<AppendEventArg<SourceEvents, Date>["error"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<keyof Merged, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Merged["ready"], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Merged["legacy"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Merged["modern"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<MergeEventMaps<{}, Right>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<MergeEventMaps<Left, {}>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<MergeEventMaps<{ value: [string] }, { value: [number] }>["value"], TODO>>; // TODO(koan) @koan-error

// Correlated envelopes, normalization, and composition (46-60)
type _46 = Expect<Equal<EventEnvelope<SourceEvents>["type"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<EventEnvelope<SourceEvents>["args"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extract<EventEnvelope<SourceEvents>, { type: "ready" }>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extract<EventEnvelope<SourceEvents>, { type: "message" }>["args"], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extract<EventEnvelope<SourceEvents>, { type: 404 }>["args"], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extract<EventEnvelope<SourceEvents>, { type: typeof sourceShutdownEvent }>["args"], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<EventEnvelope<UiEvents>["type"], TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<EventRecord<UiEvents>["name"], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<keyof PrefixEvents<SelectEvents<SourceEvents, [number]>, "numeric">, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<keyof SelectEvents<PrefixEvents<SourceEvents, "ui">, [number]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Normalize<{ readonly a?: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<UiEvents, EventSchema<UiEvents>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<ContextualAppEvents, EventSchema<ContextualAppEvents>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<EventEnvelope<{}>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<MergeEventMaps<{}, {}>, TODO>>; // TODO(koan) @koan-error
