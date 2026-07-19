import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { IsUniqueSymbol, Registry } from "./k-141-unique-symbol-identity.js";
import { ORDER, USER, broadSymbol } from "./k-141-unique-symbol-identity.js";

/** EDGE CASES: declaration restrictions, widening, aliases, unions, index signatures, and runtime enumeration. */

type Extends<From, To> = [From] extends [To] ? true : false;

const preservedAlias = USER;
const explicitlyPreservedAlias: typeof USER = USER;
const widenedAlias: symbol = USER;
// @ts-expect-error A mutable binding cannot be declared with a unique-symbol type.
let invalidMutable: unique symbol = Symbol("mutable");
void invalidMutable;

// Pre-solved demonstrations contrast singleton and broad identities.
type _DemoUnique = Expect<Equal<IsUniqueSymbol<typeof USER>, true>>;
type _DemoBroad = Expect<Equal<IsUniqueSymbol<typeof broadSymbol>, false>>;
type _DemoDistinct = Expect<Equal<typeof USER & typeof ORDER, never>>;
type _DemoImplicitAlias = Expect<Equal<typeof preservedAlias, symbol>>;
type _DemoExplicitAlias = Expect<Equal<typeof explicitlyPreservedAlias, typeof USER>>;
type _DemoWidened = Expect<Equal<typeof widenedAlias, symbol>>;

// 1. Declaration and alias choices determine whether identity survives (1-8)
type _01 = Expect<Equal<typeof preservedAlias, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof widenedAlias, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsUniqueSymbol<typeof preservedAlias>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsUniqueSymbol<typeof widenedAlias>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<typeof USER, symbol>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<symbol, typeof USER>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Equal<typeof USER, typeof ORDER>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof USER & typeof ORDER, TODO>>; // TODO(koan) @koan-error

// 2. Broad symbol unions absorb singleton members for many operations (9-16)
type _09 = Expect<Equal<typeof USER | symbol, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<typeof USER | typeof ORDER, symbol>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<symbol, typeof USER | typeof ORDER>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<typeof USER | typeof ORDER, typeof USER>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Exclude<typeof USER | typeof ORDER, typeof USER>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsUniqueSymbol<typeof USER | typeof ORDER>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsUniqueSymbol<symbol | string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IsUniqueSymbol<never>, TODO>>; // TODO(koan) @koan-error

// 3. Singleton keys remain precise under mapped types but broad indexes do not distinguish them (17-23)
type _17 = Expect<Equal<keyof Registry, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<keyof Registry, symbol>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof Record<symbol, number>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Record<symbol, number>[typeof USER], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<typeof broadSymbol extends keyof Registry ? true : false, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<typeof USER extends keyof Record<symbol, number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Pick<Registry, typeof USER>[typeof USER], TODO>>; // TODO(koan) @koan-error

// 4. Type-level key visibility differs from common runtime enumeration APIs (24-30)
type _24 = Expect<Equal<symbol extends PropertyKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<typeof USER extends PropertyKey ? true : false, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<keyof Registry, string>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extract<keyof Registry, symbol>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Registry[keyof Registry], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<keyof { [USER]: 1; ordinary: 2 }, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<{ [USER]: 1; ordinary: 2 }[typeof USER], TODO>>; // TODO(koan) @koan-error
