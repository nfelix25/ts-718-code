import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-153: event map transformations — constructions
 * =============================================================================
 *
 * Once a schema is just an object of argument tuples, the mapped-type toolbox
 * becomes an algebra over APIs. Key remapping decides the vocabulary — namespace
 * it, rename part of it, filter it by shape — and the property value decides the
 * payload, so context can be threaded into every event without touching a single
 * listener.
 *
 * Three details decide whether these transforms are safe. Remapping a key to
 * `never` *removes* it, which is how a template-literal prefix silently drops
 * numeric and symbol keys. Two keys remapped onto the same name do not overwrite
 * each other — their values union, so a collision quietly widens the payload.
 * And an optional rename map yields `Key | undefined`, which is not a property
 * key, so the fallback branch runs and nothing is renamed at all. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// A symbol event key, plus two schemas that exist to be transformed.
declare const sourceShutdownEvent: unique symbol;
type GivenBroadEvents = { [name: string]: [value: number] };
type GivenOptionalTupleEvents = { optional: [value?: number] };

// ─── The material ─────────────────────────────────────────────────────

// 1. Build the flattener that turns an intersection back into one object type,
//    so a merged schema reads as a schema rather than as an expression.
export type Normalize<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Normalize<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>;
type _01b = Expect<Equal<Normalize<{ a: 1 }>, { a: 1 }>>;
type _01c = Expect<Equal<Normalize<never>, never>>;
type _01d = Expect<Equal<GivenIsAny<Normalize<any>>, false>>;

// 2. Build the schema constraint.
export type EventSchema<Events> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    {
      tupleValueAccepted: GivenExtends<{ ready: [] }, EventSchema<{ ready: [] }>>;
      stringValueRejected: GivenExtends<{ broken: string }, EventSchema<{ broken: string }>>;
    },
    { tupleValueAccepted: true; stringValueRejected: false }
  >
>;
type _02b = Expect<Equal<GivenExtends<{ broken: string }, EventSchema<{ broken: string }>>, false>>;
type _02c = Expect<Equal<keyof EventSchema<{ a: []; b: [] }>, "a" | "b">>;

// 3. Build the schema every transform below is pointed at. It mixes string,
//    numeric, and symbol keys on purpose, because that is what makes key
//    remapping interesting.
export type SourceEvents = TODO; // TODO(koan)

type _03a = Expect<
  Equal<keyof SourceEvents, "ready" | "message" | "progress" | "error" | 404 | typeof sourceShutdownEvent>
>;
type _03b = Expect<Equal<SourceEvents["ready"], []>>;
type _03c = Expect<Equal<SourceEvents["error"], [error: Error, fatal?: boolean]>>;
type _03d = Expect<Equal<SourceEvents[404], [path: string]>>;
type _03e = Expect<Equal<SourceEvents[typeof sourceShutdownEvent], [code: number]>>;

// 4. Build the string-key selector — the half of a schema that a template
//    literal can actually rename.
export type StringEventNames<Events> = TODO; // TODO(koan)

type _04a = Expect<Equal<StringEventNames<SourceEvents>, "ready" | "message" | "progress" | "error">>;
type _04b = Expect<Equal<StringEventNames<{ 0: []; a: [] }>, "a">>;
type _04c = Expect<Equal<StringEventNames<GivenBroadEvents>, string>>;
type _04d = Expect<Equal<StringEventNames<Record<never, never>>, never>>;

// ─── Renaming the vocabulary ──────────────────────────────────────────

// 5. Build the namespacing transform that keeps *only* what it can rename.
//    Remapping a key to `never` drops it, so every non-string key disappears —
//    which is either the filter you wanted or a silent loss.
export type PrefixEvents<Events extends EventSchema<Events>, Prefix extends string> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<keyof PrefixEvents<SourceEvents, "ui">, "ui:ready" | "ui:message" | "ui:progress" | "ui:error">
>;
type _05b = Expect<Equal<PrefixEvents<SourceEvents, "ui">["ui:ready"], []>>;
type _05c = Expect<
  Equal<PrefixEvents<SourceEvents, "ui">["ui:message"], [text: string, from: { readonly id: string }]>
>;
type _05d = Expect<Equal<Extract<keyof PrefixEvents<SourceEvents, "ui">, number | symbol>, never>>;
type _05e = Expect<Equal<keyof PrefixEvents<GivenBroadEvents, "metric">, `metric:${string}`>>;

// 6. Build the namespacing transform that keeps everything: rename what can be
//    renamed, and pass the rest through untouched.
export type NamespaceEvents<Events extends EventSchema<Events>, Prefix extends string> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    keyof NamespaceEvents<SourceEvents, "app">,
    "app:ready" | "app:message" | "app:progress" | "app:error" | 404 | typeof sourceShutdownEvent
  >
>;
type _06b = Expect<Equal<NamespaceEvents<SourceEvents, "ui">[404], [path: string]>>;
type _06c = Expect<Equal<NamespaceEvents<SourceEvents, "ui">[typeof sourceShutdownEvent], [code: number]>>;
type _06d = Expect<Equal<NamespaceEvents<SourceEvents, "ui">["ui:progress"], [percent: number]>>;
type _06e = Expect<
  Equal<
    {
      prefixDropsTheNumericKey: Extract<keyof PrefixEvents<SourceEvents, "ui">, number>;
      namespaceKeepsIt: Extract<keyof NamespaceEvents<SourceEvents, "ui">, number>;
    },
    { prefixDropsTheNumericKey: never; namespaceKeepsIt: 404 }
  >
>;

// 7. Build the selective rename. The fallback branch matters twice: for keys
//    the map does not mention, and for keys whose entry is optional and
//    therefore not a property key at all.
export type RenameEvents<
  Events extends EventSchema<Events>,
  Renames extends Partial<Record<keyof Events, PropertyKey>>,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    keyof RenameEvents<SourceEvents, { ready: "boot"; message: "chat"; 404: "missing" }>,
    "boot" | "chat" | "progress" | "error" | "missing" | typeof sourceShutdownEvent
  >
>;
type _07b = Expect<Equal<RenameEvents<SourceEvents, { ready: "boot" }>["boot"], []>>;
type _07c = Expect<Equal<RenameEvents<SourceEvents, { 404: "missing" }>["missing"], [path: string]>>;
type _07d = Expect<Equal<RenameEvents<{ start: [] }, { start: "start" }>, { start: [] }>>;
type _07e = Expect<Equal<RenameEvents<SourceEvents, { ready: 0 }>[0], []>>;

// 8. Build the shape filter. It keeps a key when its tuple is *assignable* to
//    the pattern, which is a looser question than being the same tuple.
export type SelectEvents<Events extends EventSchema<Events>, Args extends readonly unknown[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<keyof SelectEvents<SourceEvents, []>, "ready">>;
type _08b = Expect<Equal<keyof SelectEvents<SourceEvents, [number]>, "progress" | typeof sourceShutdownEvent>>;
type _08c = Expect<Equal<keyof SelectEvents<SourceEvents, [unknown]>, "progress" | 404 | typeof sourceShutdownEvent>>;
type _08d = Expect<
  Equal<
    {
      everythingMatchesTheWidestShape: keyof SelectEvents<SourceEvents, readonly unknown[]>;
      numericKeyDropped: Extract<keyof PrefixEvents<SourceEvents, "ui">, number>;
    },
    { everythingMatchesTheWidestShape: keyof SourceEvents; numericKeyDropped: never }
  >
>;
type _08e = Expect<Equal<SelectEvents<SourceEvents, [string]>[404], [path: string]>>;

// ─── Rewriting the payloads ───────────────────────────────────────────

// 9. Build the transform that threads one context value into every event, at
//    the front of its argument list.
export type PrependEventArg<Events extends EventSchema<Events>, Context> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<PrependEventArg<SourceEvents, { readonly requestId: string }>["ready"], [context: { readonly requestId: string }]>
>;
type _09b = Expect<
  Equal<
    PrependEventArg<SourceEvents, { readonly requestId: string }>["message"],
    [context: { readonly requestId: string }, text: string, from: { readonly id: string }]
  >
>;
type _09c = Expect<
  Equal<
    {
      keysUnchanged: keyof PrependEventArg<SourceEvents, number>;
      numericKeyDropped: Extract<keyof PrefixEvents<SourceEvents, "ui">, number>;
    },
    { keysUnchanged: keyof SourceEvents; numericKeyDropped: never }
  >
>;
type _09d = Expect<Equal<PrependEventArg<SourceEvents, number>["progress"], [context: number, percent: number]>>;
type _09e = Expect<Equal<PrependEventArg<SourceEvents, number>["ready"]["length"], 1>>;

// 10. Build the transform that appends metadata instead. Appending after an
//     optional element forces it to become required, because a tuple cannot
//     have an optional slot before a required one.
export type AppendEventArg<Events extends EventSchema<Events>, Metadata> = TODO; // TODO(koan)

type _10a = Expect<Equal<AppendEventArg<SourceEvents, Date>["progress"], [percent: number, metadata: Date]>>;
type _10b = Expect<Equal<AppendEventArg<SourceEvents, Date>["ready"], [metadata: Date]>>;
type _10c = Expect<
  Equal<AppendEventArg<SourceEvents, Date>["error"], [error: Error, fatal: boolean | undefined, metadata: Date]>
>;
type _10d = Expect<Equal<AppendEventArg<SourceEvents, Date>["error"]["length"], 3>>;
type _10e = Expect<
  Equal<
    {
      optionalBecameRequired: Equal<SourceEvents["error"]["length"], AppendEventArg<SourceEvents, Date>["error"]["length"]>;
      numericKeyDropped: Extract<keyof PrefixEvents<SourceEvents, "ui">, number>;
    },
    { optionalBecameRequired: false; numericKeyDropped: never }
  >
>;

// ─── Combining and packaging ──────────────────────────────────────────

// 11. Build the merge with an explicit collision policy: the right side wins,
//     and the result is flattened back into a single object type.
export type MergeEventMaps<
  Left extends EventSchema<Left>,
  Right extends EventSchema<Right>,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    MergeEventMaps<{ ready: []; legacy: [id: string] }, { ready: [at: Date]; modern: [enabled: boolean] }>,
    { legacy: [id: string]; ready: [at: Date]; modern: [enabled: boolean] }
  >
>;
type _11b = Expect<Equal<MergeEventMaps<{ value: [string] }, { value: [number] }>["value"], [number]>>;
type _11c = Expect<
  Equal<
    MergeEventMaps<{ a: []; shared: [string] }, { b: []; shared: [number] }>,
    { a: []; b: []; shared: [number] }
  >
>;
type _11d = Expect<Equal<MergeEventMaps<Record<never, never>, Record<never, never>>, Record<never, never>>>;
type _11e = Expect<Equal<keyof MergeEventMaps<{ a: [] }, { b: [] }>, "a" | "b">>;

// 12. Build the envelope: one member per event, each carrying its own name and
//     arguments plus the fields every delivery shares.
export type EventEnvelope<Events extends EventSchema<Events>> = TODO; // TODO(koan)

type _12a = Expect<Equal<EventEnvelope<SourceEvents>["type"], keyof SourceEvents>>;
type _12b = Expect<
  Equal<
    Extract<EventEnvelope<SourceEvents>, { type: "message" }>["args"],
    [text: string, from: { readonly id: string }]
  >
>;
type _12c = Expect<Equal<EventEnvelope<SourceEvents>["timestamp"], number>>;
type _12d = Expect<Equal<EventEnvelope<Record<never, never>>, never>>;
type _12e = Expect<
  Equal<
    Extract<EventEnvelope<SourceEvents>, { type: "ready" }>,
    { readonly type: "ready"; readonly args: []; readonly timestamp: number }
  >
>;

// 13. Build the bare record form, which is what a transform pipeline passes
//     around before an envelope is stamped on it.
export type EventRecord<Events extends EventSchema<Events>> = TODO; // TODO(koan)

type _13a = Expect<Equal<EventRecord<SourceEvents>["name"], keyof SourceEvents>>;
type _13b = Expect<
  Equal<Extract<EventRecord<SourceEvents>, { name: "progress" }>["args"], [percent: number]>
>;
type _13c = Expect<Equal<EventRecord<Record<never, never>>, never>>;
type _13d = Expect<Equal<keyof Extract<EventRecord<SourceEvents>, { name: "ready" }>, "name" | "args">>;

// ─── What key remapping quietly does ──────────────────────────────────

// 14. Report the filtering. A prefix that can only be applied to strings turns
//     every other key into `never`, and a key remapped to `never` is removed.
export type FilteringProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<FilteringProfile["prefixedKeys"], "ui:ready" | "ui:message" | "ui:progress" | "ui:error">
>;
type _14b = Expect<Equal<FilteringProfile["numericSurvivors"], never>>;
type _14c = Expect<Equal<FilteringProfile["symbolSurvivors"], never>>;
type _14d = Expect<Equal<FilteringProfile["namespacedKeeps"], 404 | typeof sourceShutdownEvent>>;
type _14e = Expect<Equal<FilteringProfile["broadIndexBecomesATemplate"], `metric:${string}`>>;

// 15. Report the collision policy. Two keys remapped onto one name do not
//     overwrite — the mapped type unions their values, so the payload widens
//     instead of one of them winning.
export type CollisionProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<CollisionProfile["collidedKeys"], "change">>;
type _15b = Expect<Equal<CollisionProfile["collidedValue"], [] | [code: number]>>;
type _15c = Expect<Equal<CollisionProfile["renamingOntoAnExistingKey"], [] | [code: number]>>;
type _15d = Expect<Equal<CollisionProfile["mergeOverwritesInstead"], [number]>>;

// 16. Report the optional-rename trap. `Partial` makes every entry
//     `Key | undefined`, which is not a property key, so the fallback branch
//     runs and the rename silently does nothing.
export type OptionalRenameProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<OptionalRenameProfile["keysAfterOptionalMap"], keyof SourceEvents>>;
type _16b = Expect<Equal<OptionalRenameProfile["valueStillThere"], []>>;
type _16c = Expect<Equal<OptionalRenameProfile["concreteMapDoesRename"], "begin">>;
type _16d = Expect<Equal<OptionalRenameProfile["optionalEntryIsNotAPropertyKey"], false>>;

// 17. Report the degenerate inputs, where every transform has to answer with an
//     empty schema rather than with something broken.
export type EmptyMapProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<EmptyMapProfile["prefixed"], Record<never, never>>>;
type _17b = Expect<Equal<EmptyMapProfile["renamed"], never>>;
type _17c = Expect<Equal<EmptyMapProfile["merged"], Record<never, never>>>;
type _17d = Expect<Equal<EmptyMapProfile["enveloped"], never>>;
type _17e = Expect<Equal<EmptyMapProfile["selectedByAnImpossibleShape"], never>>;

// 18. Build the value-level signatures of the same transforms. Each one moves a
//     single record rather than a whole schema, and `const` parameters are what
//     keep the new name a literal instead of widening to `string`.
export type TransformApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { renamed: ReturnType<typeof prefixReady>; numericKeyDropped: Extract<keyof PrefixEvents<SourceEvents, "ui">, number> },
    { renamed: { readonly name: "ui:ready"; readonly args: [] }; numericKeyDropped: never }
  >
>;
type _18b = Expect<Equal<Parameters<TransformApi["renameEvent"]>["length"], 2>>;
type _18c = Expect<Equal<Parameters<TransformApi["toEnvelope"]>[1], number>>;
type _18d = Expect<
  Equal<
    { moved: ReturnType<typeof renameReady>; numericKeyDropped: Extract<keyof PrefixEvents<SourceEvents, "ui">, number> },
    { moved: { readonly name: "boot"; readonly args: [] }; numericKeyDropped: never }
  >
>;
type _18e = Expect<Equal<Parameters<TransformApi["prefixEvent"]>["length"], 2>>;

declare const prefixReady: (
  prefix: "ui",
  record: { readonly name: "ready"; readonly args: SourceEvents["ready"] },
) => { readonly name: "ui:ready"; readonly args: SourceEvents["ready"] };
declare const renameReady: (record: {
  readonly name: "ready";
  readonly args: SourceEvents["ready"];
}) => { readonly name: "boot"; readonly args: SourceEvents["ready"] };
