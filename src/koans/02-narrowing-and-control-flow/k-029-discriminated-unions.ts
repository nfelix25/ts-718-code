import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-029: discriminated unions
 * =============================================================================
 *
 * A discriminated union gives every member a common property whose value is a
 * distinct literal. Checking that property selects the whole matching object,
 * including fields that would be unsafe on the other members. The discriminator
 * encodes the relationship between a state and the data valid in that state.
 *
 * I read `if (shape.kind === "circle")` aloud as:
 *
 *   "Keep union members whose kind can equal circle; their correlated fields
 *    are now available."
 *
 * Strings named `kind` are only a convention. Numbers, booleans, unique symbols,
 * and tuple positions can discriminate too. The important ingredients are a
 * common location and sufficiently narrow literal values. If several members
 * share a tag, all remain. If a member uses broad `string` or an optional tag,
 * it may overlap more paths than expected. Model states so impossible field
 * combinations cannot be constructed in the first place.
 */

export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

export function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
  }
}

export type RequestState =
  | { status: "idle" }
  | { status: "loading"; startedAt: number }
  | { status: "success"; data: string }
  | { status: "failure"; error: Error };

export function describeState(state: RequestState): string {
  if (state.status === "idle") return "idle";
  if (state.status === "loading") return `loading:${state.startedAt}`;
  if (state.status === "success") return state.data;
  return state.error.message;
}

export type ApiResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

export function resultMessage(result: ApiResult): string {
  return result.ok ? result.value : result.error;
}

export type Command = ["write", string] | ["read", number] | ["close"];

export function commandOutput(command: Command): string {
  if (command[0] === "write") return `write:${command[1]}`;
  if (command[0] === "read") return `read:${command[1]}`;
  return "closed";
}

export function isTerminal(state: RequestState): boolean {
  return state.status === "success" || state.status === "failure";
}

// Part 1: A unique literal tag selects one complete object member.
function mainShape(shape: Shape) {
  if (shape.kind === "circle") {
    type _Main01 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main02 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  }
  if (shape.kind === "square") {
    type _Main03 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main04 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
  }
}
void mainShape;

// Part 2: Switch cases repeatedly consume discriminator possibilities.
function mainSwitch(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      type _Main05 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      break;
    case "square":
      type _Main06 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      break;
    case "rectangle":
      type _Main07 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
      break;
  }
  type _Main08 = Expect<Equal<typeof shape, TODO>>; // TODO(koan) @koan-error
}
void mainSwitch;

// Part 3: Shared discriminants select a subgroup, then another field refines it.
type MainEvent =
  | { source: "mouse"; action: "click"; x: number }
  | { source: "mouse"; action: "move"; delta: number }
  | { source: "keyboard"; action: "press"; key: string };
function mainShared(event: MainEvent) {
  if (event.source === "mouse") {
    type _Main09 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
    if (event.action === "click") {
      type _Main10 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
    } else {
      type _Main11 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
    }
  }
  type _Main12 = Expect<Equal<typeof event, TODO>>; // TODO(koan) @koan-error
}
void mainShared;

// Part 4: Boolean and numeric literal properties discriminate just as well.
function mainAlternatives(result: ApiResult) {
  if (result.ok) {
    type _Main13 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
    type _Main14 = Expect<Equal<typeof result.value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main15 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
    type _Main16 = Expect<Equal<typeof result.error, TODO>>; // TODO(koan) @koan-error
  }
}
type MainPacket = { code: 200; body: string } | { code: 404; missing: true };
function mainNumeric(packet: MainPacket) {
  if (packet.code === 200) {
    type _Main17 = Expect<Equal<typeof packet, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main18 = Expect<Equal<typeof packet, TODO>>; // TODO(koan) @koan-error
  }
}
void mainAlternatives;
void mainNumeric;

// Part 5: A tuple's fixed head can correlate with the remaining positions.
function mainTuple(command: Command) {
  if (command[0] === "write") {
    type _Main19 = Expect<Equal<typeof command, TODO>>; // TODO(koan) @koan-error
    type _Main20 = Expect<Equal<typeof command[1], TODO>>; // TODO(koan) @koan-error
  }
}
void mainTuple;
