import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-003: Union and intersection algebra
 * =============================================================================
 *
 * I read a union `A | B` as "a value from set A OR set B." Adding a union member
 * admits more possible values, so I can rely only on guarantees shared by every
 * member. A union is broad in values and narrow in immediately usable members.
 *
 * I read an intersection `A & B` as "a value satisfying contract A AND contract
 * B at the same time." Adding an intersection member rejects more values, while
 * making more guarantees available. An intersection is narrow in values and
 * rich in required members.
 *
 * This reverses an easy first impression:
 *
 *   `HasId | HasName`  accepts either shape; only shared members are guaranteed.
 *   `HasId & HasName`  requires both shapes; both sets of members are available.
 *
 * For literal types, I can reason with ordinary set algebra: duplicates vanish,
 * order and grouping do not matter, a union combines members, and an
 * intersection keeps only overlap. Object and function types follow the same
 * assignability model, but their displayed representation has sharp edges that
 * the companion file makes explicit.
 *
 * Solve each assertion by replacing `TODO`. Runtime implementations are already
 * complete and anchor the corresponding value-level behavior.
 */

export type AlgebraKind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never]
        ? "unknown"
        : "ordinary"
      : "ordinary";

export interface Identity {
  id: string;
}

export interface AuditStamp {
  updatedAt: Date;
}

export type AuditedIdentity = Identity & AuditStamp;

export interface FileResource {
  id: string;
  source: "file";
  path: string;
}

export interface UrlResource {
  id: string;
  source: "url";
  url: string;
}

export type Resource = FileResource | UrlResource;

export function attachAudit(
  identity: Identity,
  audit: AuditStamp,
): AuditedIdentity {
  return { ...identity, ...audit };
}

export function resourceId(resource: Resource): string {
  return resource.id;
}

export function resourceLocation(resource: Resource): string {
  return "path" in resource ? resource.path : resource.url;
}

export function normalizeId(value: string | number): string {
  return String(value);
}

export function commonValues(
  left: readonly string[],
  right: readonly string[],
): string[] {
  return [...new Set(left.filter((value) => right.includes(value)))];
}

export function describeAccess(
  access: "read" | "write" | "admin",
): string {
  return access === "admin" ? "all access" : `${access} access`;
}

// Part 1: A union combines possible values and normalizes redundant members.
// -----------------------------------------------------------------------------

type PublicationStatus = "draft" | "published";
type Primitive = string | number | boolean;

type _Main01 = Expect<Equal<PublicationStatus, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<PublicationStatus | "draft", TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<"ready" | string, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<(string | number) | boolean, TODO>>; // TODO(koan) @koan-error

// Part 2: An object intersection combines simultaneous requirements.
// -----------------------------------------------------------------------------

type _Main05 = Expect<Equal<AuditedIdentity["id"], TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<AuditedIdentity["updatedAt"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<keyof AuditedIdentity, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReturnType<typeof attachAudit>, TODO>>; // TODO(koan) @koan-error

// Part 3: An object union exposes only guarantees shared by every member.
// -----------------------------------------------------------------------------
// Both resources have `id` and `source`, so those members can be read before any
// narrowing. `path` and `url` are branch-specific and need runtime evidence.

type _Main09 = Expect<Equal<Resource["id"], TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Resource["source"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ReturnType<typeof resourceLocation>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<keyof Resource, TODO>>; // TODO(koan) @koan-error

// Part 4: Union and intersection are idempotent, commutative, and associative.
// -----------------------------------------------------------------------------
// These assertions ask whether both expressions denote the same set of values.

type SetA = "a" | "b";
type SetB = "b" | "c";

type _Main13 = Expect<Equal<Equal<SetA | SetA, SetA>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Equal<SetA & SetA, SetA>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Equal<SetA | SetB, SetB | SetA>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Equal<SetA & SetB, SetB & SetA>, TODO>>; // TODO(koan) @koan-error
type _Main17 = Expect<Equal<Equal<(SetA | SetB) | "d", SetA | (SetB | "d")>, TODO>>; // TODO(koan) @koan-error

// Part 5: Literal intersections calculate overlap; literal unions calculate span.
// -----------------------------------------------------------------------------

type _Main18 = Expect<Equal<SetA & SetB, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<SetA | SetB, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<SetA & string, TODO>>; // TODO(koan) @koan-error
type _Main21 = Expect<Equal<SetA | string, TODO>>; // TODO(koan) @koan-error

// Part 6: Reuse the top, bottom, and escape-hatch laws from k-002.
// -----------------------------------------------------------------------------

type _Main22 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _Main23 = Expect<Equal<AlgebraKind<string | unknown>, TODO>>; // TODO(koan) @koan-error
type _Main24 = Expect<Equal<string & unknown, TODO>>; // TODO(koan) @koan-error
type _Main25 = Expect<Equal<AlgebraKind<string & never>, TODO>>; // TODO(koan) @koan-error

type _PrimitiveIsFlat = Expect<
  Equal<Primitive, string | number | boolean>
>;
