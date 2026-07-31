import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 153 - EVENT MAP TRANSFORMATIONS
 * =====================================
 *
 * Once an event relation is represented as an object of argument tuples, the
 * mapped-type toolbox becomes an API algebra. We can namespace string events,
 * preserve or filter non-string keys, rename selected keys, add context to every
 * argument tuple, select events by tuple shape, and merge schemas with an
 * explicit collision policy.
 *
 * Read `PrefixEvents<E, "ui">` aloud as: "for every key in E, keep it only when
 * it is a string, rename it to ui colon key, and carry its original argument
 * tuple unchanged." Key remapping decides the vocabulary; the property value
 * decides the payload relation.
 */

export type Normalize<Value> = {
  [Key in keyof Value]: Value[Key];
};

export type EventSchema<Events> = {
  [Name in keyof Events]: readonly unknown[];
};

export type EventRecord<Events extends EventSchema<Events>> = {
  [Name in keyof Events]: { readonly name: Name; readonly args: Events[Name] };
}[keyof Events];

export const sourceShutdownEvent: unique symbol = Symbol("source-shutdown");

export type SourceEvents = {
  ready: [];
  message: [text: string, from: { readonly id: string }];
  progress: [percent: number];
  error: [error: Error, fatal?: boolean];
  404: [path: string];
  [sourceShutdownEvent]: [code: number];
};

export type StringEventNames<Events> = Extract<keyof Events, string>;

export type PrefixEvents<
  Events extends EventSchema<Events>,
  Prefix extends string,
> = {
  [Name in keyof Events as
    Name extends string ? `${Prefix}:${Name}` : never
  ]: Events[Name];
};

export type NamespaceEvents<
  Events extends EventSchema<Events>,
  Prefix extends string,
> = {
  [Name in keyof Events as
    Name extends string ? `${Prefix}:${Name}` : Name
  ]: Events[Name];
};

export type RenameEvents<
  Events extends EventSchema<Events>,
  Renames extends Partial<Record<keyof Events, PropertyKey>>,
> = {
  [Name in keyof Events as
    Name extends keyof Renames
      ? Renames[Name] extends PropertyKey ? Renames[Name] : Name
      : Name
  ]: Events[Name];
};

export type SelectEvents<
  Events extends EventSchema<Events>,
  Args extends readonly unknown[],
> = {
  [Name in keyof Events as Events[Name] extends Args ? Name : never]:
    Events[Name];
};

export type PrependEventArg<
  Events extends EventSchema<Events>,
  Context,
> = {
  [Name in keyof Events]: [context: Context, ...args: Events[Name]];
};

export type AppendEventArg<
  Events extends EventSchema<Events>,
  Metadata,
> = {
  [Name in keyof Events]: [...args: Events[Name], metadata: Metadata];
};

export type MergeEventMaps<
  Left extends EventSchema<Left>,
  Right extends EventSchema<Right>,
> = Normalize<Omit<Left, keyof Right> & Right>;

export type EventEnvelope<Events extends EventSchema<Events>> = {
  [Name in keyof Events]: {
    readonly type: Name;
    readonly args: Events[Name];
    readonly timestamp: number;
  };
}[keyof Events];

export type UiEvents = PrefixEvents<SourceEvents, "ui">;
export type ContextualAppEvents = PrependEventArg<
  SourceEvents,
  { readonly requestId: string }
>;

// Part 1: Template remapping creates a new string vocabulary.
type _01 = Expect<Equal<keyof UiEvents, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<UiEvents["ui:ready"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<UiEvents["ui:message"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof NamespaceEvents<SourceEvents, "app">, TODO>>; // TODO(koan) @koan-error

// Part 2: Selected keys can be renamed without changing their tuples.
type Renamed = RenameEvents<SourceEvents, {
  ready: "boot";
  message: "chat";
  404: "missing";
}>;
type _05 = Expect<Equal<keyof Renamed, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Renamed["boot"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Renamed["chat"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Renamed["missing"], TODO>>; // TODO(koan) @koan-error

// Part 3: Tuple shapes can filter a schema.
type _09 = Expect<Equal<keyof SelectEvents<SourceEvents, []>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof SelectEvents<SourceEvents, [number]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof SelectEvents<SourceEvents, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<SelectEvents<SourceEvents, [string]>[404], TODO>>; // TODO(koan) @koan-error

// Part 4: Tuple spreads apply cross-cutting context or metadata.
type _13 = Expect<Equal<ContextualAppEvents["ready"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ContextualAppEvents["message"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<AppendEventArg<SourceEvents, Date>["progress"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<AppendEventArg<SourceEvents, Date>["error"], TODO>>; // TODO(koan) @koan-error

// Part 5: Merging and enveloping retain a deliberate collision policy.
type Merged = MergeEventMaps<
  { ready: []; legacy: [id: string] },
  { ready: [at: Date]; modern: [enabled: boolean] }
>;
type _17 = Expect<Equal<Merged, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Merged["ready"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<EventEnvelope<SourceEvents>["type"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<EventEnvelope<SourceEvents>, { type: "message" }>["args"], TODO>>; // TODO(koan) @koan-error

export function prefixEvent<
  const Prefix extends string,
  const Name extends string,
  Args extends readonly unknown[],
>(
  prefix: Prefix,
  record: { readonly name: Name; readonly args: Args },
): { readonly name: `${Prefix}:${Name}`; readonly args: Args } {
  return {
    name: `${prefix}:${record.name}` as `${Prefix}:${Name}`,
    args: record.args,
  };
}

export function renameEvent<
  Name extends PropertyKey,
  Args extends readonly unknown[],
  const NewName extends PropertyKey,
>(
  record: { readonly name: Name; readonly args: Args },
  newName: NewName,
): { readonly name: NewName; readonly args: Args } {
  return { name: newName, args: record.args };
}

export function prependEventContext<
  Name extends PropertyKey,
  Args extends readonly unknown[],
  const Context,
>(
  context: Context,
  record: { readonly name: Name; readonly args: Args },
): { readonly name: Name; readonly args: readonly [Context, ...Args] } {
  return { name: record.name, args: [context, ...record.args] };
}

export function toEnvelope<
  Events extends EventSchema<Events>,
>(
  record: EventRecord<Events>,
  timestamp: number,
): EventEnvelope<Events> {
  return { type: record.name, args: record.args, timestamp } as EventEnvelope<Events>;
}
