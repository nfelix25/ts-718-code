import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-159: extensible registry capstone — constructions
 * =============================================================================
 *
 * This is most of Phase 9 in one object. A catalog relates each command name to
 * its own input and output; mapped indexing derives correlated commands and a
 * handler map from it; a phantom parameter accumulates the names that have been
 * registered; `Exclude` makes registering the same name twice unspellable; and
 * an explicit receiver makes `build` callable only once nothing is left.
 *
 * Two things carry the design. Everything is derived from the catalog, so
 * extending the vocabulary — in the packet, by merging into an interface —
 * changes every dependent type at once, including what still has to be
 * registered. And the evidence is only static: a registry whose type says it is
 * complete is complete because of what was *called*, not because of anything
 * that was checked, which is why the runtime lookup still guards every dispatch.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The symbol command key, and the registry itself — given because its
// preconditions live on `this`.
declare const inspectCommand: unique symbol;

declare class Registry<Catalog extends CatalogShape<Catalog>, Registered extends keyof Catalog = never> {
  readonly $registered: Registered;
  readonly names: readonly Registered[];
  has<Name extends keyof Catalog>(name: Name): name is Name & Registered;
  register<Name extends Exclude<keyof Catalog, Registered>>(
    name: Name,
    handler: CommandHandler<Catalog, Name>,
  ): Registry<Catalog, Registered | Name>;
  run<Name extends Registered>(name: Name, input: CommandInput<Catalog, Name>): CommandOutput<Catalog, Name>;
  build(
    this: IsComplete<Catalog, Registered> extends true ? Registry<Catalog, Registered> : never,
  ): RegistryView<Catalog, keyof Catalog>;
}

// ─── The catalog everything is derived from ───────────────────────────

// 1. Build the constraint a catalog must satisfy: every entry names an input
//    and an output, and nothing else counts.
export type CatalogShape<Catalog> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    {
      wellFormedEntryAccepted: GivenExtends<
        { ping: { input: void; output: void } },
        CatalogShape<{ ping: { input: void; output: void } }>
      >;
      stringEntryRejected: GivenExtends<{ broken: string }, CatalogShape<{ broken: string }>>;
    },
    { wellFormedEntryAccepted: true; stringEntryRejected: false }
  >
>;
type _01b = Expect<Equal<GivenExtends<{ broken: string }, CatalogShape<{ broken: string }>>, false>>;
type _01c = Expect<Equal<keyof CatalogShape<{ a: { input: 1; output: 2 } }>, "a">>;

// 2. Build the catalog: three ordinary commands with different input shapes, and
//    one keyed by a symbol so the derivations have to handle every kind of
//    property key.
export type CommandCatalog = TODO; // TODO(koan)

type _02a = Expect<Equal<keyof CommandCatalog, "greet" | "add" | "toggle" | typeof inspectCommand>>;
type _02b = Expect<Equal<CommandCatalog["greet"]["input"], { readonly name: string }>>;
type _02c = Expect<Equal<CommandCatalog["add"]["input"], readonly [left: number, right: number]>>;
type _02d = Expect<Equal<CommandCatalog["toggle"]["output"], boolean>>;
type _02e = Expect<Equal<CommandCatalog[typeof inspectCommand]["output"], string>>;

// ─── The derivations ──────────────────────────────────────────────────

// 3. Build the name alias.
export type CommandName<Catalog> = TODO; // TODO(koan)

type _03a = Expect<Equal<CommandName<CommandCatalog>, "greet" | "add" | "toggle" | typeof inspectCommand>>;
type _03b = Expect<Equal<Extract<CommandName<CommandCatalog>, typeof inspectCommand>, typeof inspectCommand>>;
type _03c = Expect<Equal<GivenExtends<"missing", CommandName<CommandCatalog>>, false>>;

// 4. Build the input lookup.
export type CommandInput<
  Catalog extends CatalogShape<Catalog>,
  Name extends keyof Catalog,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<CommandInput<CommandCatalog, "greet">, { readonly name: string }>>;
type _04b = Expect<Equal<CommandInput<CommandCatalog, "add">, readonly [left: number, right: number]>>;
type _04c = Expect<Equal<CommandInput<CommandCatalog, "toggle">, boolean>>;
type _04d = Expect<Equal<CommandInput<CommandCatalog, typeof inspectCommand>, unknown>>;

// 5. Build the output lookup.
export type CommandOutput<
  Catalog extends CatalogShape<Catalog>,
  Name extends keyof Catalog,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<CommandOutput<CommandCatalog, "greet">, string>>;
type _05b = Expect<Equal<CommandOutput<CommandCatalog, "add">, number>>;
type _05c = Expect<Equal<CommandOutput<CommandCatalog, "toggle">, boolean>>;
type _05d = Expect<Equal<CommandOutput<CommandCatalog, "greet" | "add">, string | number>>;

// 6. Build the handler signature — the pairing the whole registry exists to
//    enforce.
export type CommandHandler<
  Catalog extends CatalogShape<Catalog>,
  Name extends keyof Catalog,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<CommandHandler<CommandCatalog, "toggle">>, [input: boolean]>>;
type _06b = Expect<Equal<ReturnType<CommandHandler<CommandCatalog, "toggle">>, boolean>>;
type _06c = Expect<Equal<CommandHandler<CommandCatalog, "greet">, (input: { readonly name: string }) => string>>;
type _06d = Expect<Equal<ReturnType<CommandHandler<CommandCatalog, "add">>, number>>;

// 7. Build the correlated command case: one member per entry, each carrying its
//    own name, input, and output together.
export type CommandCase<Catalog extends CatalogShape<Catalog>> = TODO; // TODO(koan)

type _07a = Expect<Equal<CommandCase<CommandCatalog>["name"], keyof CommandCatalog>>;
type _07b = Expect<
  Equal<Extract<CommandCase<CommandCatalog>, { name: "add" }>["input"], readonly [left: number, right: number]>
>;
type _07c = Expect<Equal<Extract<CommandCase<CommandCatalog>, { name: "greet" }>["output"], string>>;
type _07d = Expect<
  Equal<Extract<CommandCase<CommandCatalog>, { name: typeof inspectCommand }>["output"], string>
>;
type _07e = Expect<Equal<keyof Extract<CommandCase<CommandCatalog>, { name: "toggle" }>, "name" | "input" | "output">>;

// 8. Build the call tuple — the same relation reduced to what a dispatcher is
//    actually handed.
export type CommandCall<Catalog extends CatalogShape<Catalog>> = TODO; // TODO(koan)

type _08a = Expect<Equal<CommandCall<CommandCatalog>[0], keyof CommandCatalog>>;
type _08b = Expect<
  Equal<Extract<CommandCall<CommandCatalog>, readonly ["greet", unknown]>[1], { readonly name: string }>
>;
type _08c = Expect<
  Equal<
    {
      matchedCallAccepted: GivenExtends<readonly ["toggle", boolean], CommandCall<CommandCatalog>>;
      mismatchedCallRefused: GivenExtends<readonly ["greet", boolean], CommandCall<CommandCatalog>>;
    },
    { matchedCallAccepted: true; mismatchedCallRefused: false }
  >
>;
type _08d = Expect<Equal<Extract<CommandCall<CommandCatalog>, readonly ["add", unknown]>[1], readonly [left: number, right: number]>>;

// 9. Build the complete handler record — what a registry holds once nothing is
//    left to register.
export type HandlerMap<Catalog extends CatalogShape<Catalog>> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    { keys: keyof HandlerMap<CommandCatalog>; missingNameRefused: GivenExtends<"missing", CommandName<CommandCatalog>> },
    { keys: keyof CommandCatalog; missingNameRefused: false }
  >
>;
type _09b = Expect<Equal<HandlerMap<CommandCatalog>["toggle"], (input: boolean) => boolean>>;
type _09c = Expect<Equal<Parameters<HandlerMap<CommandCatalog>["greet"]>, [input: { readonly name: string }]>>;
type _09d = Expect<Equal<ReturnType<HandlerMap<CommandCatalog>[typeof inspectCommand]>, string>>;

// ─── The registration ledger ──────────────────────────────────────────

// 10. Build the outstanding-work operator: the names the catalog has that the
//     registry has not been given yet.
export type Remaining<Catalog, Registered extends keyof Catalog> = TODO; // TODO(koan)

type _10a = Expect<Equal<Remaining<CommandCatalog, "greet" | "add">, "toggle" | typeof inspectCommand>>;
type _10b = Expect<Equal<Remaining<CommandCatalog, keyof CommandCatalog>, never>>;
type _10c = Expect<Equal<Remaining<CommandCatalog, never>, keyof CommandCatalog>>;
type _10d = Expect<Equal<Remaining<CommandCatalog, "greet">, "add" | "toggle" | typeof inspectCommand>>;

// 11. Build the completeness predicate. The brackets matter: an empty remainder
//     has to be tested as a whole, not distributed over.
export type IsComplete<Catalog, Registered extends keyof Catalog> = TODO; // TODO(koan)

type _11a = Expect<Equal<IsComplete<CommandCatalog, keyof CommandCatalog>, true>>;
type _11b = Expect<Equal<IsComplete<CommandCatalog, "greet">, false>>;
type _11c = Expect<Equal<IsComplete<CommandCatalog, never>, false>>;
type _11d = Expect<Equal<IsComplete<CommandCatalog, "greet" | "add" | "toggle">, false>>;

// 12. Build the reader that recovers the ledger from a registry, intersecting
//     with the catalog's keys so the answer is always a real command name.
export type RegisteredOf<Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<RegisteredOf<Registry<CommandCatalog>>, never>>;
type _12b = Expect<Equal<RegisteredOf<Registry<CommandCatalog, "greet" | "add">>, "greet" | "add">>;
type _12c = Expect<Equal<RegisteredOf<Registry<CommandCatalog, keyof CommandCatalog>>, keyof CommandCatalog>>;
type _12d = Expect<Equal<RegisteredOf<string>, never>>;

// 13. Build the read-only surface a finished registry hands out: it can name
//     what it has, narrow a candidate name to a registered one, and dispatch —
//     but it can no longer be extended.
export type RegistryView<
  Catalog extends CatalogShape<Catalog>,
  Registered extends keyof Catalog,
> = TODO; // TODO(koan)

type _13a = Expect<Equal<keyof RegistryView<CommandCatalog, "greet">, "names" | "has" | "run">>;
type _13b = Expect<Equal<RegistryView<CommandCatalog, "greet">["names"], readonly "greet"[]>>;
type _13c = Expect<Equal<Parameters<RegistryView<CommandCatalog, "greet">["run"]>[0], "greet">>;
type _13d = Expect<Equal<ReturnType<RegistryView<CommandCatalog, "greet">["run"]>, string>>;
type _13e = Expect<Equal<Parameters<RegistryView<CommandCatalog, "greet">["has"]>[0], keyof CommandCatalog>>;

// ─── What the assembled machine promises ──────────────────────────────

// 14. Report registration. Each call adds one name to the ledger, and the next
//     call's first argument is exactly what is still outstanding — so
//     registering the same command twice has no spellable argument.
export type RegistrationProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<RegistrationProfile["atTheStart"], never>>;
type _14b = Expect<Equal<RegistrationProfile["offeredAtTheStart"], keyof CommandCatalog>>;
type _14c = Expect<Equal<RegistrationProfile["offeredAfterTwo"], "toggle" | typeof inspectCommand>>;
type _14d = Expect<Equal<RegistrationProfile["afterRegisteringOneMore"], keyof CommandCatalog>>;
type _14e = Expect<Equal<RegistrationProfile["outstandingAfterTwo"], "toggle" | typeof inspectCommand>>;

// 15. Report the completion boundary. Until the ledger covers the catalog the
//     terminal step has receiver `never` and cannot be called at all; once it
//     does, the receiver is the registry and the result is the read-only view.
export type CompletionProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<CompletionProfile["receiverWhenIncomplete"], never>>;
type _15b = Expect<
  Equal<CompletionProfile["receiverWhenComplete"], Registry<CommandCatalog, keyof CommandCatalog>>
>;
type _15c = Expect<
  Equal<
    { built: CompletionProfile["builtView"]; missingNameRefused: GivenExtends<"missing", CommandName<CommandCatalog>> },
    { built: RegistryView<CommandCatalog, keyof CommandCatalog>; missingNameRefused: false }
  >
>;
type _15d = Expect<Equal<CompletionProfile["completeAtTheStart"], false>>;
type _15e = Expect<Equal<CompletionProfile["completeAtTheEnd"], true>>;

// 16. Report dispatch. A partly-built registry accepts only the names it has,
//     and each one answers with its own output — the union only appears when
//     the name is left as a union.
export type DispatchProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<DispatchProfile["acceptedNames"], "greet" | "add">>;
type _16b = Expect<Equal<DispatchProfile["unionResult"], string | number>>;
type _16c = Expect<Equal<DispatchProfile["namesHeld"], readonly ("greet" | "add")[]>>;
type _16d = Expect<Equal<DispatchProfile["candidateNames"], keyof CommandCatalog>>;
type _16e = Expect<Equal<DispatchProfile["unregisteredNameRefused"], false>>;

// 17. Report the correlation the catalog keeps. Every derived form filters on
//     the name and narrows the payload with it; a call built from a name union
//     beside an input union would not.
export type CorrelationProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<CorrelationProfile["caseInput"], boolean>>;
type _17b = Expect<Equal<CorrelationProfile["caseOutput"], boolean>>;
type _17c = Expect<Equal<CorrelationProfile["callInput"], readonly [left: number, right: number]>>;
type _17d = Expect<Equal<CorrelationProfile["handlerInput"], [input: readonly [left: number, right: number]]>>;
type _17e = Expect<Equal<CorrelationProfile["mismatchedCallRefused"], false>>;

// 18. Report a registry at a glance: what it holds, what it still owes, whether
//     it may be finished, and what it would be allowed to accept next.
export type RegistryReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<RegistryReport<Registry<CommandCatalog>>["registered"], never>>;
type _18b = Expect<Equal<RegistryReport<Registry<CommandCatalog>>["outstanding"], keyof CommandCatalog>>;
type _18c = Expect<Equal<RegistryReport<Registry<CommandCatalog, "greet" | "add">>["complete"], false>>;
type _18d = Expect<
  Equal<RegistryReport<Registry<CommandCatalog, "greet" | "add">>["acceptsNext"], "toggle" | typeof inspectCommand>
>;
type _18e = Expect<Equal<RegistryReport<Registry<CommandCatalog, keyof CommandCatalog>>["complete"], true>>;
