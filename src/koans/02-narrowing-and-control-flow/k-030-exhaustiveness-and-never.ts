import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-030: exhaustiveness and never
 * =============================================================================
 *
 * `never` is the type of a value that cannot exist on a reachable path. When a
 * closed union has been completely handled, the remaining variable narrows to
 * `never`. Passing that variable to `assertNever` converts the compiler's proof
 * into an API-maintenance alarm: adding a new union member makes the supposedly
 * unreachable call fail to type-check until the new case is implemented.
 *
 * I read `default: return assertNever(value)` aloud as:
 *
 *   "Every declared member should already be gone; reject this program if any
 *    member can still reach the default."
 *
 * A function that always throws or loops also returns `never`, so control-flow
 * analysis removes the path after calling it. In type algebra, never is the
 * empty union: `T | never` is T and `T & never` is never. Exhaustiveness depends
 * on a truly closed, literal-discriminated domain. Broad tags, `any`, casts, and
 * catch-all defaults can hide missing cases rather than prove them impossible.
 */

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

export function renderShape(shape: Shape): string {
  switch (shape.kind) {
    case "circle": return `circle:${shape.radius}`;
    case "square": return `square:${shape.side}`;
    case "rectangle": return `rectangle:${shape.width}x${shape.height}`;
    default: return assertNever(shape);
  }
}

export type State =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ready"; value: string }
  | { state: "failed"; error: Error };

export function formatState(value: State): string {
  if (value.state === "idle") return "idle";
  if (value.state === "loading") return "loading";
  if (value.state === "ready") return value.value;
  return value.error.message;
}

export type Command = ["push", string] | ["pop"] | ["size"];

export function commandName(command: Command): string {
  switch (command[0]) {
    case "push": return `push:${command[1]}`;
    case "pop": return "pop";
    case "size": return "size";
    default: return assertNever(command);
  }
}

export function fail(message: string): never {
  throw new Error(message);
}

// Part 1: An exhaustive switch leaves never in its default branch.
function mainSwitch(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      type _Main01 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      return shape.radius;
    case "square":
      type _Main02 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      return shape.side;
    case "rectangle":
      type _Main03 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      return shape.width;
    default:
      type _Main04 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      return assertNever(shape);
  }
}
void mainSwitch;

// Part 2: Early exits progressively shrink the reachable remainder.
function mainReturns(value: State) {
  if (value.state === "idle") return "idle";
  type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "loading") return "loading";
  type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (value.state === "ready") return value.value;
  type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _Main08 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining.error.message;
}
void mainReturns;

// Part 3: A never-returning call ends a path and disappears from unions.
function mainFailure(value: string | null, flag: boolean) {
  if (value === null) fail("missing");
  type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const selected = flag ? "ok" as const : fail("stopped");
  type _Main10 = Expect<Equal<typeof selected, TODO>>; // TODO(koan) @koan-error
  return selected;
}
type _Main11 = Expect<Equal<ReturnType<typeof fail>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<never extends string ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: Never is the identity of unions and the absorber of intersections.
type _Main13 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<string & never, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Parameters<typeof assertNever>, TODO>>; // TODO(koan) @koan-error

// Part 5: Boolean and numeric literal domains can also be exhausted.
function mainBoolean(value: true | false) {
  if (value === true) {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main18 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function mainNumeric(value: 0 | 1) {
  switch (value) {
    case 0: return "zero" as const;
    case 1: return "one" as const;
    default:
      type _Main19 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return assertNever(value);
  }
}
type _Main20 = Expect<Equal<ReturnType<typeof mainNumeric>, TODO>>; // TODO(koan) @koan-error
void mainBoolean;
