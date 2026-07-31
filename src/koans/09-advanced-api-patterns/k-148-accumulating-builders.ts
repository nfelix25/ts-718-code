import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 148 - ACCUMULATING BUILDERS
 * ==================================
 *
 * A fluent builder can carry a type-level record of every completed step. The
 * runtime object stores values; the generic `State` stores evidence about their
 * keys and types. Each `set` call returns a new instantiation whose state is the
 * old mapping with one key overwritten.
 *
 * Read `Builder<SetField<State, K, V>>` aloud as: "return the same builder
 * abstraction, now remembering key K with value V." A readiness predicate can
 * compare required keys with `keyof State`, while `StateOf` lets later APIs
 * recover the accumulated result. The static state is useful only if runtime
 * updates follow the same immutable transition.
 */

export type SetField<State extends object, Key extends PropertyKey, Value> = {
  [Field in keyof State | Key]:
    Field extends Key ? Value :
    Field extends keyof State ? State[Field] :
    never;
};

export type StateOf<Value> = Value extends Builder<infer State> ? State : never;
export type HasKeys<State extends object, Keys extends PropertyKey> =
  [Keys] extends [keyof State] ? true : false;
export type CompleteBuilder<State extends object, Keys extends PropertyKey> =
  HasKeys<State, Keys> extends true ? Builder<State> : never;

export class Builder<State extends object = {}> {
  readonly #data: Record<PropertyKey, unknown>;

  constructor(data: Record<PropertyKey, unknown> = {}) {
    this.#data = data;
  }

  set<const Key extends PropertyKey, const Value>(
    key: Key,
    value: Value,
  ): Builder<SetField<State, Key, Value>> {
    return new Builder({ ...this.#data, [key]: value });
  }

  get<Key extends keyof State>(key: Key): State[Key] {
    return this.#data[key] as State[Key];
  }

  build(): Readonly<State> {
    return Object.freeze({ ...this.#data }) as Readonly<State>;
  }
}

// Part 1: The empty builder begins with no accumulated keys.
type _01 = Expect<Equal<StateOf<Builder>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof StateOf<Builder>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<StateOf<ReturnType<typeof createBuilder>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<HasKeys<StateOf<Builder>, never>, TODO>>; // TODO(koan) @koan-error

// Part 2: Each call accumulates one precise key/value pair.
const oneStep = new Builder().set("method", "GET");
const twoSteps = oneStep.set("retries", 3);
type _05 = Expect<Equal<StateOf<typeof oneStep>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<StateOf<typeof twoSteps>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<StateOf<typeof twoSteps>["method"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<StateOf<typeof twoSteps>["retries"], TODO>>; // TODO(koan) @koan-error

// Part 3: Reusing a key overwrites its remembered value type.
const overwritten = twoSteps.set("method", "POST");
type _09 = Expect<Equal<StateOf<typeof overwritten>["method"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof StateOf<typeof overwritten>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<SetField<{ x: 1; y: 2 }, "x", 3>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<SetField<{}, "enabled", true>, TODO>>; // TODO(koan) @koan-error

// Part 4: Required-key checks turn accumulated structure into readiness evidence.
type RequestKeys = "method" | "url";
const request = new Builder().set("method", "GET").set("url", "/koans");
type _13 = Expect<Equal<HasKeys<StateOf<typeof oneStep>, RequestKeys>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<HasKeys<StateOf<typeof request>, RequestKeys>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CompleteBuilder<StateOf<typeof oneStep>, RequestKeys>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CompleteBuilder<StateOf<typeof request>, RequestKeys>, TODO>>; // TODO(koan) @koan-error

// Part 5: Build exposes a readonly snapshot and get remains key-safe.
type _17 = Expect<Equal<ReturnType<typeof request.build>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof request.get<"method">>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof ReturnType<typeof request.build>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Readonly<StateOf<typeof request>>, TODO>>; // TODO(koan) @koan-error

export function createBuilder(): Builder {
  return new Builder();
}

export function executeRequest<State extends { method: string; url: string }>(
  builder: Builder<State>,
): Readonly<State> {
  return builder.build();
}
