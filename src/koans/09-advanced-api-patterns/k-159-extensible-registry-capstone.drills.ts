import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CatalogShape,
  type CommandCall,
  type CommandCase,
  type CommandCatalog,
  type CommandHandler,
  type CommandInput,
  type CommandName,
  type CommandOutput,
  type HandlerMap,
  type IsComplete,
  type RegisteredOf,
  type RegistryView,
  type Remaining,
  Registry,
  createRegistry,
  inspectCommand,
} from "./k-159-extensible-registry-capstone.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Derive every registry surface from the catalog, then follow the registered-key
 * union as commands accumulate and the remaining-key union shrinks. Repeat the
 * same algebra with a smaller custom catalog and a unique-symbol command.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type Empty = Registry<CommandCatalog>;
type GreetOnly = Registry<CommandCatalog, "greet">;
type TwoCommands = Registry<CommandCatalog, "greet" | "add">;
type Complete = Registry<CommandCatalog, keyof CommandCatalog>;
type MathCatalog = {
  square: { input: number; output: number };
  label: { input: number; output: string };
};

// Catalog projections and per-command handlers (1-15)
type _01 = Expect<Equal<CommandName<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof CommandCatalog, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CommandInput<CommandCatalog, "greet">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CommandOutput<CommandCatalog, "greet">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<CommandInput<CommandCatalog, "add">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<CommandOutput<CommandCatalog, "add">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<CommandInput<CommandCatalog, "toggle">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<CommandOutput<CommandCatalog, "toggle">, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<CommandInput<CommandCatalog, typeof inspectCommand>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<CommandOutput<CommandCatalog, typeof inspectCommand>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<CommandHandler<CommandCatalog, "greet">>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<CommandHandler<CommandCatalog, "add">>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<CommandHandler<CommandCatalog, "toggle">>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<keyof HandlerMap<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<HandlerMap<CommandCatalog>[typeof inspectCommand]>, TODO>>; // TODO(koan) @koan-error

// Correlated object cases and call tuples (16-30)
type _16 = Expect<Equal<CommandCase<CommandCatalog>["name"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<CommandCase<CommandCatalog>["input"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CommandCase<CommandCatalog>["output"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<CommandCase<CommandCatalog>, { name: "greet" }>["input"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<CommandCase<CommandCatalog>, { name: "add" }>["output"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<CommandCase<CommandCatalog>, { name: typeof inspectCommand }>["input"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<CommandCall<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CommandCall<CommandCatalog>[0], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<CommandCall<CommandCatalog>[1], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<CommandCall<CommandCatalog>, readonly ["greet", unknown]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<CommandCall<CommandCatalog>, readonly ["add", unknown]>[1], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extract<CommandCall<CommandCatalog>, readonly [typeof inspectCommand, unknown]>[1], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<CommandCase<MathCatalog>["name"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extract<CommandCase<MathCatalog>, { name: "label" }>["output"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extract<CommandCall<MathCatalog>, readonly ["square", unknown]>[1], TODO>>; // TODO(koan) @koan-error

// Accumulated evidence, remaining names, and completeness (31-45)
type _31 = Expect<Equal<RegisteredOf<Empty>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<RegisteredOf<GreetOnly>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<RegisteredOf<TwoCommands>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<RegisteredOf<Complete>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Remaining<CommandCatalog, never>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Remaining<CommandCatalog, "greet">, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Remaining<CommandCatalog, "greet" | "add">, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Remaining<CommandCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<IsComplete<CommandCatalog, never>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<IsComplete<CommandCatalog, "greet" | "add">, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<IsComplete<CommandCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Parameters<GreetOnly["register"]>[0], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<Complete["register"]>[0], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ThisParameterType<TwoCommands["build"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ThisParameterType<Complete["build"]>, TODO>>; // TODO(koan) @koan-error

// Views, runtime methods, and custom registry states (46-60)
type _46 = Expect<Equal<GreetOnly["names"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Parameters<GreetOnly["run"]>[0], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<GreetOnly["run"]>[1], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<GreetOnly["run"]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<keyof RegistryView<CommandCatalog, "greet">, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<RegistryView<CommandCatalog, "greet">["names"], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<Complete["build"]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ReturnType<Complete["build"]>["names"], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof createRegistry<CommandCatalog>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof createRegistry<MathCatalog>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Remaining<MathCatalog, "square">, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<IsComplete<MathCatalog, "square" | "label">, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ThisParameterType<Registry<MathCatalog, keyof MathCatalog>["build"]>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<CommandCatalog, CatalogShape<CommandCatalog>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<MathCatalog, CatalogShape<MathCatalog>>, TODO>>; // TODO(koan) @koan-error
