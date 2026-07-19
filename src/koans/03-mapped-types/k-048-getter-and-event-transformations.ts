import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-048: getter and event transformations
 * =============================================================================
 *
 * Key remapping becomes practical when the destination name and value type are
 * transformed together. A data property `count: number` can generate
 * `getCount(): number`, `setCount(value: number): void`, and a
 * `countChanged(next: number, previous: number): void` callback.
 *
 * I read a generated getter aloud as:
 *
 *   "For each string field K, emit get-Capitalize-K, whose value is a function
 *    returning the original field type T[K]."
 *
 * The source key still supplies the value relationship after its name changes.
 * Intersections combine independently generated surfaces. Modifier operators
 * should express runtime reality: an accessor factory creates every method, so
 * these mappings use `-?` and `-readonly`; an optional source field therefore
 * creates a required method whose value type can still include `undefined`.
 * Number and symbol source keys need their own naming policy and are filtered
 * here because JavaScript method names are being generated from text.
 */

export type Getters<T> = {
  -readonly [K in keyof T as K extends string ? `get${Capitalize<K>}` : never]-?: () => T[K]
};

export type Setters<T> = {
  -readonly [K in keyof T as K extends string ? `set${Capitalize<K>}` : never]-?: (value: T[K]) => void
};

export type ChangeHandlers<T> = {
  -readonly [K in keyof T as K extends string ? `${K}Changed` : never]-?:
    (next: T[K], previous: T[K]) => void
};

export type Accessors<T> = Getters<T> & Setters<T>;

function capitalize(value: string): string {
  return `${value[0]?.toUpperCase() ?? ""}${value.slice(1)}`;
}

export function makeAccessors<T extends Record<string, unknown>>(initial: T): Accessors<T> {
  const state: Record<string, unknown> = { ...initial };
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(initial)) {
    const name = capitalize(key);
    result[`get${name}`] = () => state[key];
    result[`set${name}`] = (value: unknown) => { state[key] = value; };
  }
  return result as Accessors<T>;
}

export function changeEventName<K extends string>(key: K): `${K}Changed` {
  return `${key}Changed`;
}

export function emitChange<T, K extends keyof T & string>(
  handlers: Partial<ChangeHandlers<T>>,
  key: K,
  next: T[K],
  previous: T[K],
): void {
  const handler = Reflect.get(handlers, changeEventName(key)) as ((next: T[K], previous: T[K]) => void) | undefined;
  handler?.(next, previous);
}

interface MainModel { name: string; count: number; active: boolean }

// Part 1: Getter names and return types stay related through the source key.
type MainGetters = Getters<MainModel>;
type _Main01 = Expect<Equal<MainGetters, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof MainGetters, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ReturnType<MainGetters["getName"]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ReturnType<MainGetters["getCount"]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Setter parameter types are read from the same original fields.
type MainSetters = Setters<MainModel>;
type _Main05 = Expect<Equal<MainSetters, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainSetters, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Parameters<MainSetters["setActive"]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReturnType<MainSetters["setCount"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Change handlers carry current and previous values of one field.
type MainChanges = ChangeHandlers<MainModel>;
type _Main09 = Expect<Equal<MainChanges, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<keyof MainChanges, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Parameters<MainChanges["nameChanged"]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Parameters<MainChanges["activeChanged"]>[0], TODO>>; // TODO(koan) @koan-error

// Part 4: Intersections assemble independently generated API surfaces.
type MainAccessors = Accessors<MainModel>;
type _Main13 = Expect<Equal<keyof MainAccessors, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ReturnType<MainAccessors["getActive"]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Parameters<MainAccessors["setName"]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Accessors<{}>, TODO>>; // TODO(koan) @koan-error

// Part 5: Optional values and non-string keys clarify the generation policy.
declare const mainSymbol: unique symbol;
interface MainSpecial { readonly label?: string; 0: number; [mainSymbol]: boolean }
type MainSpecialApi = Getters<MainSpecial> & ChangeHandlers<MainSpecial>;
type _Main17 = Expect<Equal<keyof MainSpecialApi, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<MainSpecialApi["getLabel"]>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Parameters<MainSpecialApi["labelChanged"]>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Setters<MainSpecial>, TODO>>; // TODO(koan) @koan-error
