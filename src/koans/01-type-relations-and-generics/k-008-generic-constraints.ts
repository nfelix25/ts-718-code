import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-008: Generic constraints
 * =============================================================================
 *
 * An unconstrained T promises the implementation nothing. `T extends C` sets a
 * minimum contract: every chosen T must be assignable to C, so the function body
 * may use C's guarantees. The constraint does not normally erase specificity.
 *
 * I read `<T extends { id: string }>` aloud as:
 *
 *   "Choose a type T for this call, but only from types that provide a string id."
 *
 * A rich source can satisfy the minimum and remain rich when T appears in the
 * return. If the declared return is merely the constraint, that narrower public
 * view is deliberate. Constraints are structural, can be unions or intersections,
 * and participate in literal inference. They reject candidates that do not meet
 * the bound; they do not convert those candidates.
 */

export function lengthOf<T extends { length: number }>(value: T): number {
  return value.length;
}

export function preserveIdentified<T extends { id: string }>(value: T): T {
  return value;
}

export function identifiedView<T extends { id: string }>(
  value: T,
): { id: string } {
  return value;
}

export function preserveKind<T extends "created" | "updated">(kind: T): T {
  return kind;
}

export function addTimestamp<T extends object>(
  value: T,
  createdAt: Date,
): T & { createdAt: Date } {
  return { ...value, createdAt };
}

export function namedAndActive<
  T extends { name: string } & { active: boolean },
>(value: T): string {
  return `${value.name}:${value.active ? "active" : "inactive"}`;
}

// Part 1: A constraint grants members inside the implementation.
const mainStringLength = lengthOf("koan");
const mainArrayLength = lengthOf([1, 2, 3]);
const mainTupleLength = lengthOf([1, 2] as const);
const mainObjectLength = lengthOf({ length: 4, unit: "items" });
type _Main01 = Expect<Equal<typeof mainStringLength, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainArrayLength, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainTupleLength, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainObjectLength, TODO>>; // TODO(koan) @koan-error

// Part 2: Returning T preserves properties beyond the minimum contract.
const mainAccount = preserveIdentified({ id: "a", active: true });
const mainLiteralAccount = preserveIdentified({ id: "a", active: true } as const);
const mainNestedAccount = preserveIdentified({ id: "a", profile: { name: "Ada" } });
const mainExplicitAccount = preserveIdentified<{ id: string; role: string }>({ id: "a", role: "admin" });
type _Main05 = Expect<Equal<typeof mainAccount, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainLiteralAccount, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainNestedAccount, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainExplicitAccount, TODO>>; // TODO(koan) @koan-error

// Part 3: Returning the constraint intentionally exposes only its view.
const mainNarrowView = identifiedView({ id: "a", active: true });
const mainPreservedView = preserveIdentified({ id: "a", active: true });
const mainNarrowId = mainNarrowView.id;
const mainPreservedActive = mainPreservedView.active;
type _Main09 = Expect<Equal<typeof mainNarrowView, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainPreservedView, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainNarrowId, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainPreservedActive, TODO>>; // TODO(koan) @koan-error

// Part 4: Union constraints define an allowed family while preserving a member.
const mainCreated = preserveKind("created");
const mainUpdated = preserveKind("updated");
const mainKindUnion = preserveKind("created" as "created" | "updated");
const mainExplicitKind = preserveKind<"created" | "updated">("created");
type _Main13 = Expect<Equal<typeof mainCreated, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainUpdated, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainKindUnion, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainExplicitKind, TODO>>; // TODO(koan) @koan-error

// Part 5: Object and intersection constraints compose guarantees.
const mainTimestamped = addTimestamp({ id: "a" }, new Date(0));
const mainTimestampedArray = addTimestamp([1, 2], new Date(0));
const mainNamed = namedAndActive({ name: "Ada", active: true, role: "admin" });
const mainNamedLiteral = namedAndActive({ name: "Ada", active: false } as const);
type _Main17 = Expect<Equal<typeof mainTimestamped, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainTimestampedArray, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainNamed, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainNamedLiteral, TODO>>; // TODO(koan) @koan-error
