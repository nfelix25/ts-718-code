import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 159 - EXTENSIBLE REGISTRY CAPSTONE
 * ========================================
 *
 * A typed registry combines most Phase 9 patterns. One catalog relates property
 * keys to input/output pairs. Mapped indexing derives correlated commands and
 * handlers. A phantom registered-key union accumulates through an immutable
 * builder, `Exclude` prevents duplicate registration, and an explicit receiver
 * allows `build` only when no catalog keys remain.
 *
 * Read `Registry<C, "greet" | "add">` aloud as: "a runtime registry for catalog
 * C carrying compile-time evidence that greet and add are installed." The
 * catalog is an interface so an application can extend its vocabulary through
 * declaration merging. Runtime checks remain essential because assertions,
 * dynamic plugin loading, and JavaScript callers can bypass the static proof.
 */

export const inspectCommand: unique symbol = Symbol("inspect-command");

export interface CommandCatalog {
  greet: {
    input: { readonly name: string };
    output: string;
  };
  add: {
    input: readonly [left: number, right: number];
    output: number;
  };
  toggle: {
    input: boolean;
    output: boolean;
  };
  [inspectCommand]: {
    input: unknown;
    output: string;
  };
}

export type CatalogShape<Catalog> = {
  [Name in keyof Catalog]: {
    input: unknown;
    output: unknown;
  };
};

export type CommandName<Catalog> = keyof Catalog;

export type CommandInput<
  Catalog extends CatalogShape<Catalog>,
  Name extends keyof Catalog,
> = Catalog[Name]["input"];

export type CommandOutput<
  Catalog extends CatalogShape<Catalog>,
  Name extends keyof Catalog,
> = Catalog[Name]["output"];

export type CommandHandler<
  Catalog extends CatalogShape<Catalog>,
  Name extends keyof Catalog,
> = (input: CommandInput<Catalog, Name>) => CommandOutput<Catalog, Name>;

export type CommandCase<Catalog extends CatalogShape<Catalog>> = {
  [Name in keyof Catalog]: {
    readonly name: Name;
    readonly input: CommandInput<Catalog, Name>;
    readonly output: CommandOutput<Catalog, Name>;
  };
}[keyof Catalog];

export type CommandCall<Catalog extends CatalogShape<Catalog>> = {
  [Name in keyof Catalog]: readonly [
    name: Name,
    input: CommandInput<Catalog, Name>,
  ];
}[keyof Catalog];

export type HandlerMap<Catalog extends CatalogShape<Catalog>> = {
  [Name in keyof Catalog]: CommandHandler<Catalog, Name>;
};

export type Remaining<
  Catalog,
  Registered extends keyof Catalog,
> = Exclude<keyof Catalog, Registered>;

export type IsComplete<
  Catalog,
  Registered extends keyof Catalog,
> = [Remaining<Catalog, Registered>] extends [never] ? true : false;

export type RegisteredOf<Value> =
  Value extends Registry<infer Catalog, infer Registered>
    ? Registered & keyof Catalog
    : never;

export interface RegistryView<
  Catalog extends CatalogShape<Catalog>,
  Registered extends keyof Catalog,
> {
  readonly names: readonly Registered[];
  has<Name extends keyof Catalog>(name: Name): name is Name & Registered;
  run<Name extends Registered>(
    name: Name,
    input: CommandInput<Catalog, Name>,
  ): CommandOutput<Catalog, Name>;
}

type ErasedHandler = (input: unknown) => unknown;

export class Registry<
  Catalog extends CatalogShape<Catalog>,
  Registered extends keyof Catalog = never,
> implements RegistryView<Catalog, Registered> {
  declare readonly $registered: Registered;
  readonly #handlers: ReadonlyMap<keyof Catalog, ErasedHandler>;

  constructor(handlers: ReadonlyMap<keyof Catalog, ErasedHandler> = new Map()) {
    this.#handlers = handlers;
  }

  get names(): readonly Registered[] {
    return [...this.#handlers.keys()] as Registered[];
  }

  has<Name extends keyof Catalog>(name: Name): name is Name & Registered {
    return this.#handlers.has(name);
  }

  register<Name extends Exclude<keyof Catalog, Registered>>(
    name: Name,
    handler: CommandHandler<Catalog, Name>,
  ): Registry<Catalog, Registered | Name> {
    if (this.#handlers.has(name)) {
      throw new Error(`command already registered: ${String(name)}`);
    }
    const next = new Map(this.#handlers);
    next.set(name, handler as ErasedHandler);
    return new Registry<Catalog, Registered | Name>(next);
  }

  run<Name extends Registered>(
    name: Name,
    input: CommandInput<Catalog, Name>,
  ): CommandOutput<Catalog, Name> {
    const handler = this.#handlers.get(name);
    if (handler === undefined) {
      throw new Error(`command is not registered: ${String(name)}`);
    }
    return handler(input) as CommandOutput<Catalog, Name>;
  }

  build(
    this: IsComplete<Catalog, Registered> extends true
      ? Registry<Catalog, Registered>
      : never,
  ): RegistryView<Catalog, keyof Catalog> {
    return this as unknown as RegistryView<Catalog, keyof Catalog>;
  }
}

export function createRegistry<
  Catalog extends CatalogShape<Catalog>,
>(): Registry<Catalog> {
  return new Registry<Catalog>();
}

// Part 1: The catalog is one source for names, inputs, and outputs.
type _01 = Expect<Equal<CommandName<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<CommandInput<CommandCatalog, "greet">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CommandOutput<CommandCatalog, "add">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<CommandHandler<CommandCatalog, "toggle">>, TODO>>; // TODO(koan) @koan-error

// Part 2: Mapped indexing derives correlated command representations.
type _05 = Expect<Equal<CommandCase<CommandCatalog>["name"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<CommandCase<CommandCatalog>, { name: "add" }>["input"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<CommandCase<CommandCatalog>, { name: typeof inspectCommand }>["output"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<CommandCall<CommandCatalog>, readonly ["greet", unknown]>[1], TODO>>; // TODO(koan) @koan-error

// Part 3: Registered names accumulate while remaining names shrink.
type Empty = Registry<CommandCatalog>;
type PartialRegistry = Registry<CommandCatalog, "greet" | "add">;
type _09 = Expect<Equal<RegisteredOf<Empty>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<RegisteredOf<PartialRegistry>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Remaining<CommandCatalog, "greet" | "add">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsComplete<CommandCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error

// Part 4: The view exposes only registered commands until completion.
type _13 = Expect<Equal<PartialRegistry["names"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<PartialRegistry["run"]>[0], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<PartialRegistry["run"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ThisParameterType<PartialRegistry["build"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Completion produces a stable read-only dispatch surface.
type Complete = Registry<CommandCatalog, keyof CommandCatalog>;
type _17 = Expect<Equal<ThisParameterType<Complete["build"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Complete["build"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof HandlerMap<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof createRegistry<CommandCatalog>>, TODO>>; // TODO(koan) @koan-error
