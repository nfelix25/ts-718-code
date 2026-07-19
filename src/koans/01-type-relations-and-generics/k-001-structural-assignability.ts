import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-001: Structural assignability
 * =============================================================================
 *
 * I start here because almost every advanced TypeScript feature eventually asks
 * the same question: "Can a value of type Source be used where Target is
 * required?" TypeScript usually answers by comparing members, not declarations
 * or names. If Source has every required member of Target with compatible
 * types, Source is assignable to Target.
 *
 * Read `Source is assignable to Target` aloud as:
 *
 *   "Every guarantee Target asks for is already supplied by Source."
 *
 * This direction matters. A richer value can stand in for a smaller contract,
 * but a smaller value cannot stand in for a richer contract. Extra information
 * is fine; missing guarantees are not.
 *
 * Structural typing is why plain objects, class instances, and independently
 * declared interfaces can interoperate. It is also why an annotation can hide
 * properties that still exist at runtime: the annotation describes what I may
 * rely on through that reference, not everything the object contains.
 *
 * Solve each Part by replacing `TODO` in the assertions. Runtime code is already
 * complete and is tested separately.
 */

export interface Labeled {
  label: string;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface AccountSummaryInput {
  id: string;
  active: boolean;
}

export interface Formatter {
  format(value: string): string;
}

export interface OptionalDescription {
  description?: string;
}

export function labelOf(value: Labeled): string {
  return value.label;
}

export function translate(point: Point2D, dx: number, dy: number): Point2D {
  return { x: point.x + dx, y: point.y + dy };
}

export function summarizeAccount(
  account: AccountSummaryInput,
): { id: string; status: "active" | "inactive" } {
  return {
    id: account.id,
    status: account.active ? "active" : "inactive",
  };
}

export function applyFormatter(formatter: Formatter, value: string): string {
  return formatter.format(value);
}

export function magnitudeSquared(point: Point2D): number {
  return point.x ** 2 + point.y ** 2;
}

export class Coordinate {
  x: number;
  y: number;
  name: string;

  constructor(x: number, y: number, name: string) {
    this.x = x;
    this.y = y;
    this.name = name;
  }
}

// Part 1: A target type is a minimum contract.
// -----------------------------------------------------------------------------

const fullProfile = {
  label: "Ada",
  role: "admin" as const,
  permissions: ["read", "write"],
};

const profileLabel = labelOf(fullProfile);
const labeledView: Labeled = fullProfile;
const retainedProfile = fullProfile;

type _Main01 = Expect<Equal<typeof profileLabel, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof labeledView, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof retainedProfile, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Parameters<typeof labelOf>[0], TODO>>; // TODO(koan) @koan-error

// Part 2: Assignment direction changes the visible guarantees.
// -----------------------------------------------------------------------------
// `labeledView` still refers to the rich object, but its static type exposes only
// `label`. The unannotated `retainedProfile` keeps the complete inferred shape.

const extractedLabel = labeledView.label;
const retainedRole = retainedProfile.role;

type _Main05 = Expect<Equal<typeof extractedLabel, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof retainedRole, TODO>>; // TODO(koan) @koan-error

// Part 3: Function parameters state what the implementation actually needs.
// -----------------------------------------------------------------------------

const coloredPoint = { x: 2, y: 3, color: "red" };
const movedPoint = translate(coloredPoint, 5, -1);
const account = {
  id: "acct-1",
  active: true,
  ownerEmail: "ada@example.test",
};
const summary = summarizeAccount(account);

type _Main07 = Expect<Equal<typeof movedPoint, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Parameters<typeof translate>[0], TODO>>; // TODO(koan) @koan-error
type _Main09 = Expect<Equal<typeof summary, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Parameters<typeof summarizeAccount>[0], TODO>>; // TODO(koan) @koan-error

// Part 4: Classes participate structurally unless private identity intervenes.
// -----------------------------------------------------------------------------
// Coordinate never declares `implements Point2D`. It is still compatible because
// its instance supplies numeric x and y members.

const coordinate = new Coordinate(3, 4, "origin-offset");
const pointView: Point2D = coordinate;
const coordinateMagnitude = magnitudeSquared(coordinate);

type _Main11 = Expect<Equal<typeof coordinate, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof pointView, TODO>>; // TODO(koan) @koan-error
type _Main13 = Expect<Equal<typeof coordinateMagnitude, TODO>>; // TODO(koan) @koan-error

// Part 5: Method-bearing objects are structural too.
// -----------------------------------------------------------------------------

const upperCaseFormatter = {
  format(value: string) {
    return value.toUpperCase();
  },
  locale: "en-US",
};
const formatted = applyFormatter(upperCaseFormatter, "structural");
const formatterView: Formatter = upperCaseFormatter;

type _Main14 = Expect<Equal<typeof formatted, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof formatterView, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ReturnType<Formatter["format"]>, TODO>>; // TODO(koan) @koan-error

// Part 6: Optional and readonly members change which guarantees are required.
// -----------------------------------------------------------------------------

const describedValue = { description: "kept", internalId: 7 };
const optionalView: OptionalDescription = describedValue;
const noDescription: OptionalDescription = {};
const readonlyPoint = { x: 6, y: 8 } as const;
const readonlyMagnitude = magnitudeSquared(readonlyPoint);

type _Main17 = Expect<Equal<typeof optionalView, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof noDescription, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof readonlyPoint, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof readonlyMagnitude, TODO>>; // TODO(koan) @koan-error
