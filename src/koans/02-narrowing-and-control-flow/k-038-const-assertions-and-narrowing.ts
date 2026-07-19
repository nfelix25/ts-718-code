import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-038: const assertions and narrowing
 * =============================================================================
 *
 * A const assertion preserves the literal evidence that control-flow analysis
 * needs. Ordinary object properties widen because they may be reassigned; a
 * returned `{ type: "add" }` therefore often has `type: string` and cannot join
 * a discriminated union cleanly. `{ type: "add" } as const` keeps the singleton
 * tag and makes the literal structure readonly.
 *
 * I read `expression as const` in a narrowing design aloud as:
 *
 *   "Keep every literal discriminator in this expression exact so later guards
 *    can select correlated members."
 *
 * Arrays become readonly tuples, enabling fixed-position discrimination and
 * `typeof tuple[number]` unions. Registries can similarly derive closed unions
 * from their values. The effect is inference-time and shallow with respect to
 * referenced values: nested literal syntax is preserved recursively, but an
 * object stored in a variable and then referenced remains mutable. `as const`
 * emits no runtime freeze, performs no validation, and cannot rescue already
 * widened evidence. Pair it with `satisfies` when shape checking also matters.
 */

export const actions = [
  { type: "add", amount: 1 },
  { type: "remove", id: "first" },
  { type: "reset" },
] as const;

export type Action = (typeof actions)[number];

export function describeAction(action: Action): string {
  switch (action.type) {
    case "add": return `add:${action.amount}`;
    case "remove": return `remove:${action.id}`;
    case "reset": return "reset";
  }
}

export function makeMessage(text: string) {
  return { kind: "message", text } as const;
}

export const routes = {
  home: { path: "/", secure: false },
  admin: { path: "/admin", secure: true },
} as const;

export function routeSecurity(name: keyof typeof routes): boolean {
  return routes[name].secure;
}

export type Command = readonly ["write", string] | readonly ["read", number];

export function runCommand(command: Command): string {
  return command[0] === "write" ? command[1].toUpperCase() : String(command[1]);
}

export function referencedMutation(): number {
  const shared = { count: 1 };
  const wrapper = { shared } as const;
  shared.count += 1;
  return wrapper.shared.count;
}

// Part 1: Const assertions preserve object discriminants and readonly payloads.
const mainWidened = { kind: "text", payload: "hello" };
const mainPreserved = { kind: "text", payload: "hello" } as const;
type _Main01 = Expect<Equal<typeof mainWidened.kind, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainPreserved.kind, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainPreserved.payload, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainPreserved, TODO>>; // TODO(koan) @koan-error

// Part 2: Const arrays become tuples whose positions and element union stay exact.
const mainTuple = ["write", "file"] as const;
const mainArray = ["write", "file"];
type _Main05 = Expect<Equal<typeof mainTuple, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainTuple[0], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainTuple[number], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainArray, TODO>>; // TODO(koan) @koan-error

// Part 3: A const collection can be the source of a closed discriminated union.
function mainDerived(action: Action) {
  if (action.type === "add") {
    type _Main09 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
    type _Main10 = Expect<Equal<typeof action.amount, TODO>>; // TODO(koan) @koan-error
  } else if (action.type === "remove") {
    type _Main11 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main12 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
  }
}
void mainDerived;

// Part 4: Literal syntax is preserved, but referenced objects keep their own type.
const mainShared = { count: 1 };
const mainWrapper = { shared: mainShared, nested: { enabled: true } } as const;
const mainSpread = { ...mainPreserved, extra: 1 } as const;
type _Main13 = Expect<Equal<typeof mainWrapper.shared, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainWrapper.shared.count, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainWrapper.nested, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainSpread.kind, TODO>>; // TODO(koan) @koan-error

// Part 5: Const assertions, satisfies, and factories preserve different evidence.
type MainDefinition = { kind: "text" | "count"; payload: string | number };
const mainChecked = { kind: "text", payload: "hello" } as const satisfies MainDefinition;
const mainFactory = (payload: number) => ({ kind: "count", payload } as const);
const mainCreated = mainFactory(3);
type _Main17 = Expect<Equal<typeof mainChecked, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainCreated.kind, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainCreated.payload, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof mainFactory>, TODO>>; // TODO(koan) @koan-error
