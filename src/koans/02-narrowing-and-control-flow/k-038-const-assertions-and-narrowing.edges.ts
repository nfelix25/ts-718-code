import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-038 edges: const assertions are shallow across references, static-only, syntax-limited, and non-validating. */

// Group 1: Const assertion preserves literal syntax but not the contents of referenced storage.
const eShared = { count: 1, labels: ["a"] };
const eWrapper = { shared: eShared, literal: { count: 1, labels: ["a"] } } as const;
type _E001 = Expect<Equal<typeof eWrapper.shared, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof eWrapper.shared.count, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof eWrapper.shared.labels, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof eWrapper.literal, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof eWrapper.literal.count, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof eWrapper.literal.labels, TODO>>; // TODO(koan) @koan-error
eShared.count = 2;
eShared.labels.push("b");
type _E007 = Expect<Equal<typeof eShared.count, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof eShared.labels, TODO>>; // TODO(koan) @koan-error

// Demonstration A: readonly follows literal syntax, not arbitrary referenced
// graphs. The wrapper cannot replace `shared`, but the shared object remains mutable.

// Group 2: Readonly is a compile-time view, not a runtime freeze.
const eRuntime = { nested: { count: 1 } } as const;
const eFrozen = Object.freeze({ nested: { count: 1 } });
type _E009 = Expect<Equal<typeof eRuntime, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof eFrozen, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<typeof eRuntime.nested, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof eFrozen.nested, TODO>>; // TODO(koan) @koan-error
const eAlias = eRuntime as { readonly nested: { readonly count: number } };
type _E013 = Expect<Equal<typeof eAlias.nested.count, TODO>>; // TODO(koan) @koan-error
const eJSON = JSON.parse('{"kind":"text"}') as { readonly kind: "text" };
type _E014 = Expect<Equal<typeof eJSON, TODO>>; // TODO(koan) @koan-error

// Demonstration B: assertions do not validate or freeze. A cast can lie about
// runtime data; use a decoder for unknown input and Object.freeze for runtime policy.

// Group 3: Already-widened evidence stays widened when referenced by a const expression.
let eKind = "text";
const eFromLet = { kind: eKind } as const;
const eConstKind = "text";
const eFromConst = { kind: eConstKind } as const;
const eNumber: number = 1;
const eFromNumber = [eNumber] as const;
type _E015 = Expect<Equal<typeof eKind, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof eFromLet.kind, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof eConstKind, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof eFromConst.kind, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof eFromNumber[0], TODO>>; // TODO(koan) @koan-error
const eUnion = Math.random() > 0.5 ? "a" : "b";
const eFromUnion = { kind: eUnion } as const;
type _E020 = Expect<Equal<typeof eFromUnion.kind, TODO>>; // TODO(koan) @koan-error

// Demonstration C: const mode preserves the type currently available. It cannot
// reconstruct a singleton literal after a let binding or annotation widened it.

// Group 4: Spreads, computed keys, unique symbols, and special values retain their available evidence.
const eBase = { kind: "base", count: 1 } as const;
const eSpread = { ...eBase, count: 2 } as const;
type _E021 = Expect<Equal<typeof eSpread.kind, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof eSpread.count, TODO>>; // TODO(koan) @koan-error
const eKey = "field" as const;
const eComputed = { [eKey]: "value" } as const;
type _E023 = Expect<Equal<keyof typeof eComputed, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof eComputed.field, TODO>>; // TODO(koan) @koan-error
const eSymbol = Symbol("tag");
const eSymbolObject = { tag: eSymbol } as const;
type _E025 = Expect<Equal<typeof eSymbol, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof eSymbolObject.tag, TODO>>; // TODO(koan) @koan-error
const eNullish = [null, undefined, NaN] as const;
type _E027 = Expect<Equal<typeof eNullish, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof eNullish[2], TODO>>; // TODO(koan) @koan-error
const eNever = [] as const;
type _E029 = Expect<Equal<typeof eNever[number], TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof eNever, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error Const assertions apply to supported literal-like expressions, not arbitrary calls.
const invalidCall = Math.random() as const;
