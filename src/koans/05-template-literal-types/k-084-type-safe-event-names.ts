import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-084: type-safe event names
 * =============================================================================
 *
 * A model's string keys can generate an event vocabulary. Template construction
 * emits `${Key}Changed`; template inference reverses that name to recover Key;
 * indexed access then selects the listener payload for exactly that event.
 *
 * I read
 *
 *   `E extends `${infer K}Changed` ? K extends keyof T ? T[K] : never : never`
 *
 * aloud as:
 *
 *   "If E ends in Changed, capture its prefix as K. If K is really a model key,
 *    return that key's value type; otherwise reject the event."
 *
 * Correlation depends on retaining the source key until the final indexed
 * access. Unioning all event names and all model values independently would
 * allow a name listener to receive an age. Number and symbol keys are excluded
 * because this API chooses textual event names. Optional properties include
 * `undefined` in their listener payload. A broad string index signature creates
 * a broad `${string}Changed` family. Runtime emission still needs a registry,
 * but its generic method surface enforces the same name-payload relationship.
 */

export type StringKeyOf<Model> = Extract<keyof Model, string>;
export type EventName<Model> = `${StringKeyOf<Model>}Changed`;
export type KeyFromEvent<Model, Event extends string> =
  Event extends `${infer Key}Changed`
    ? Key extends StringKeyOf<Model>
      ? Key
      : never
    : never;
export type ValueForEvent<Model, Event extends string> =
  KeyFromEvent<Model, Event> extends infer Key extends keyof Model ? Model[Key] : never;
export type ListenerMap<Model> = {
  [Key in StringKeyOf<Model> as `${Key}Changed`]: (value: Model[Key]) => void;
};
export type EmitArgs<Model, Event extends EventName<Model>> =
  [event: Event, value: ValueForEvent<Model, Event>];

export function createModelEmitter<Model>() {
  const listeners = new Map<string, Set<(value: unknown) => void>>();

  return {
    on<Event extends EventName<Model>>(
      event: Event,
      listener: (value: ValueForEvent<Model, Event>) => void,
    ): () => void {
      const set = listeners.get(event) ?? new Set<(value: unknown) => void>();
      set.add(listener as (value: unknown) => void);
      listeners.set(event, set);
      return () => set.delete(listener as (value: unknown) => void);
    },
    emit<Event extends EventName<Model>>(
      ...[event, value]: EmitArgs<Model, Event>
    ): void {
      for (const listener of listeners.get(event) ?? []) listener(value);
    },
  };
}

// Part 1: model keys generate a finite event-name union.
type MainModel = { name: string; age: number; active: boolean };
type _Main01 = Expect<Equal<StringKeyOf<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<EventName<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<EventName<{ count: number }>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<EventName<{}>, TODO>>; // TODO(koan) @koan-error

// Part 2: reverse parsing recovers only real source keys.
type _Main05 = Expect<Equal<KeyFromEvent<MainModel, "nameChanged">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<KeyFromEvent<MainModel, "ageChanged">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<KeyFromEvent<MainModel, "missingChanged">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<KeyFromEvent<MainModel, "name">, TODO>>; // TODO(koan) @koan-error

// Part 3: recovered keys select correlated payload types.
type _Main09 = Expect<Equal<ValueForEvent<MainModel, "nameChanged">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ValueForEvent<MainModel, "ageChanged">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ValueForEvent<MainModel, "activeChanged">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ValueForEvent<MainModel, "missingChanged">, TODO>>; // TODO(koan) @koan-error

// Part 4: mapped listeners preserve every event-value relation.
type _Main13 = Expect<Equal<keyof ListenerMap<MainModel>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Parameters<ListenerMap<MainModel>["nameChanged"]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Parameters<ListenerMap<MainModel>["ageChanged"]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ReturnType<ListenerMap<MainModel>["activeChanged"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: emit tuples correlate a selected name and value.
type _Main17 = Expect<Equal<EmitArgs<MainModel, "nameChanged">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<EmitArgs<MainModel, "ageChanged">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<EmitArgs<MainModel, EventName<MainModel>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ValueForEvent<MainModel, EventName<MainModel>>, TODO>>; // TODO(koan) @koan-error
