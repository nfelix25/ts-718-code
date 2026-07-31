import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 152 - TYPE-SAFE EVENT EMITTERS
 * ====================================
 *
 * An event emitter is a relationship, not two unrelated unions. The event name
 * chooses a tuple of arguments, and that same tuple must appear at both the
 * subscription and emission boundaries. Modeling event values as tuples handles
 * zero, one, optional, and multiple arguments without inventing special cases.
 *
 * Read `EventCall<Events>` aloud as: "for each event key, build one tuple
 * beginning with that key and followed by exactly that event's arguments; then
 * index the mapped type to collect those tuples into a union." Keeping each call
 * whole preserves correlations that separate name and payload unions lose.
 */

export type EventSchema<Events> = {
  [Name in keyof Events]: readonly unknown[];
};

export type EventNames<Events> = keyof Events;

export type EventArgs<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = Events[Name];

export type EventListener<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = (...args: Events[Name]) => void;

export type EventCallFor<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = Name extends keyof Events
  ? [event: Name, ...args: Events[Name]]
  : never;

export type EventCall<Events extends EventSchema<Events>> = {
  [Name in keyof Events]: [event: Name, ...args: Events[Name]];
}[keyof Events];

export type EventRecord<Events extends EventSchema<Events>> = {
  [Name in keyof Events]: {
    name: Name;
    args: Events[Name];
  };
}[keyof Events];

export type FirstArgument<
  Events extends EventSchema<Events>,
  Name extends keyof Events,
> = Events[Name] extends readonly [infer First, ...readonly unknown[]]
  ? First
  : never;

export type EventsMatching<
  Events extends EventSchema<Events>,
  Args extends readonly unknown[],
> = {
  [Name in keyof Events]: Events[Name] extends Args ? Name : never;
}[keyof Events];

export const shutdownEvent: unique symbol = Symbol("shutdown");

export type AppEvents = {
  ready: [];
  message: [text: string, from: { readonly id: string }];
  progress: [percent: number];
  error: [error: Error, fatal?: boolean];
  404: [path: string];
  [shutdownEvent]: [code: number];
};

export class TypedEmitter<Events extends EventSchema<Events>> {
  readonly #listeners = new Map<keyof Events, Set<(...args: any[]) => void>>();

  on<Name extends keyof Events>(
    name: Name,
    listener: EventListener<Events, Name>,
  ): () => void {
    const listeners = this.#listeners.get(name) ?? new Set();
    listeners.add(listener as (...args: any[]) => void);
    this.#listeners.set(name, listeners);
    return () => this.off(name, listener);
  }

  once<Name extends keyof Events>(
    name: Name,
    listener: EventListener<Events, Name>,
  ): () => void {
    const wrapped = (...args: Events[Name]) => {
      this.off(name, wrapped);
      listener(...args);
    };
    return this.on(name, wrapped);
  }

  off<Name extends keyof Events>(
    name: Name,
    listener: EventListener<Events, Name>,
  ): void {
    const listeners = this.#listeners.get(name);
    listeners?.delete(listener as (...args: any[]) => void);
    if (listeners?.size === 0) this.#listeners.delete(name);
  }

  emit<Name extends keyof Events>(
    ...call: EventCallFor<Events, Name>
  ): boolean {
    const [name, ...args] = call as unknown as [keyof Events, ...unknown[]];
    const listeners = this.#listeners.get(name);
    if (listeners === undefined) return false;
    for (const listener of [...listeners]) listener(...args);
    return true;
  }
}

// Part 1: Keys are names; tuple values are argument lists.
type _01 = Expect<Equal<EventNames<AppEvents>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<EventArgs<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<EventArgs<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<EventArgs<AppEvents, "error">, TODO>>; // TODO(koan) @koan-error

// Part 2: Listener signatures are derived rather than duplicated.
type _05 = Expect<Equal<EventListener<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Parameters<EventListener<AppEvents, "message">>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<EventListener<AppEvents, "progress">>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<FirstArgument<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error

// Part 3: Whole call tuples retain name/arguments correlation.
type _09 = Expect<Equal<EventCallFor<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<EventCallFor<AppEvents, "message">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<EventCallFor<AppEvents, "ready" | "progress">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<EventCall<AppEvents>, ["error", ...unknown[]]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Mapped indexing also builds discriminated event records.
type _13 = Expect<Equal<EventRecord<AppEvents>["name"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<EventRecord<AppEvents>, { name: "message" }>["args"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<EventsMatching<AppEvents, []>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<EventsMatching<AppEvents, [number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: The emitter methods reuse the same relation.
type AppEmitter = TypedEmitter<AppEvents>;
type _17 = Expect<Equal<ReturnType<AppEmitter["on"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<AppEmitter["emit"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<EventListener<AppEvents, 404>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<EventListener<AppEvents, typeof shutdownEvent>>, TODO>>; // TODO(koan) @koan-error
