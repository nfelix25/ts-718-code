import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CatalogShape,
  type CommandCall,
  type CommandCatalog,
  type CommandHandler,
  type CommandInput,
  type CommandOutput,
  type HandlerMap,
  type IsComplete,
  type RegisteredOf,
  type Remaining,
  Registry,
  inspectCommand,
} from "./k-159-extensible-registry-capstone.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * Accumulated key evidence is erased. Assertions and dynamic loaders can forge
 * completeness or duplicate registrations, so runtime checks stay in the class.
 * A generic name inferred as a union can also decouple name and input; accepting
 * the mapped `CommandCall` tuple is stricter at such variable call sites.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type GenericCall<Name extends keyof CommandCatalog> = [
  name: Name,
  input: CommandInput<CommandCatalog, Name>,
];
type ExtendedCatalog = CommandCatalog & {
  subtract: {
    input: readonly [left: number, right: number];
    output: number;
  };
};
type BroadCatalog = {
  [name: string]: { input: number; output: string };
};

// Pre-solved demonstrations identify static and runtime trust boundaries.
type _DemoDuplicateBlocked = Expect<Equal<Parameters<Registry<CommandCatalog, "greet">["register"]>[0], Exclude<keyof CommandCatalog, "greet">>>;
type _DemoIncompleteBuild = Expect<Equal<ThisParameterType<Registry<CommandCatalog, "greet">["build"]>, never>>;
type _DemoGenericUnion = Expect<Equal<GenericCall<"greet" | "toggle">, ["greet" | "toggle", { readonly name: string } | boolean]>>;
type _DemoCorrelatedUnion = Expect<Equal<CommandCall<Pick<CommandCatalog, "greet" | "toggle">>, readonly ["greet", { readonly name: string }] | readonly ["toggle", boolean]>>;
// The runtime Map necessarily erases heterogeneous handler parameter types behind the catalog-derived public surface.

// 1. Generic union names and correlated call tuples (1-8)
type _01 = Expect<Equal<GenericCall<"greet">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<GenericCall<"greet" | "toggle">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CommandCall<Pick<CommandCatalog, "greet" | "toggle">>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<["greet", true], GenericCall<"greet" | "toggle">>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<readonly ["greet", true], CommandCall<Pick<CommandCatalog, "greet" | "toggle">>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<CommandInput<CommandCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<CommandOutput<CommandCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<CommandHandler<CommandCatalog, keyof CommandCatalog>>, TODO>>; // TODO(koan) @koan-error

// 2. Empty, complete, and broad registries have distinct completion behavior (9-16)
type _09 = Expect<Equal<IsComplete<{}, never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ThisParameterType<Registry<{}, never>["build"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Remaining<CommandCatalog, never>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Remaining<CommandCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<Registry<CommandCatalog, keyof CommandCatalog>["register"]>[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Remaining<BroadCatalog, "one">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsComplete<BroadCatalog, "one">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IsComplete<BroadCatalog, string>, TODO>>; // TODO(koan) @koan-error

// 3. Extension, symbols, schema validity, and handler variance (17-23)
type InvalidCatalog = { broken: { input: string } };
type _17 = Expect<Equal<keyof ExtendedCatalog, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CommandInput<ExtendedCatalog, "subtract">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Remaining<ExtendedCatalog, keyof CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<keyof CommandCatalog, typeof inspectCommand>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<InvalidCatalog, CatalogShape<InvalidCatalog>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<(input: unknown) => string, CommandHandler<CommandCatalog, "greet">>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<(input: { readonly name: "Ada" }) => string, CommandHandler<CommandCatalog, "greet">>, TODO>>; // TODO(koan) @koan-error

// 4. Erasure, any, never, and visible registry members (24-30)
type _24 = Expect<Equal<RegisteredOf<Registry<CommandCatalog, never>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<RegisteredOf<Registry<CommandCatalog, keyof CommandCatalog>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<RegisteredOf<never>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<RegisteredOf<any>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<keyof Registry<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<keyof HandlerMap<CommandCatalog>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Registry<CommandCatalog, "greet">["$registered"], TODO>>; // TODO(koan) @koan-error
