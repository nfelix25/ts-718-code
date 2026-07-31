import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 172 - UNRELATED GETTER AND SETTER TYPES
 * =============================================
 *
 * A property can be one protocol for reads and another for writes. TypeScript
 * 4.3 allowed distinct types only when the getter result fit into the setter
 * input, preserving `object.value = object.value`. TypeScript 5.1 removed that
 * relationship requirement when both accessors have explicit annotations.
 *
 * This models conversion boundaries: write CSS text and read a structured style;
 * write a date string and read `Date | null`; accept validated input but expose
 * `undefined` before initialization. Self-assignment is no longer guaranteed.
 *
 * Indexed access such as `T["value"]` observes the getter/read type. The setter
 * type still controls actual assignment, but ordinary mapped types copy the read
 * type into a new property and can therefore erase the original write protocol.
 *
 * Feature ownership: TypeScript 5.1 unrelated getter/setter checking, extending
 * the separate read/write accessor types introduced in TypeScript 4.3.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#unrelated-types-for-getters-and-setters
 */

export type ReadValue<Owner extends object, Key extends keyof Owner> =
  Owner[Key];

export type WriteOperation<Owner, Value> =
  (owner: Owner, value: Value) => void;

export type WriteValue<Operation extends (...args: any[]) => void> =
  Parameters<Operation>[1];

export type ReadWriteRelationship<Read, Write> = {
  readFitsWrite: [Read] extends [Write] ? true : false;
  writeFitsRead: [Write] extends [Read] ? true : false;
};

export interface ParsedNumberSlot {
  get value(): number | undefined;
  set value(input: string | number);
}

export class NumberSlot implements ParsedNumberSlot {
  #value: number | undefined;

  get value(): number | undefined {
    return this.#value;
  }

  set value(input: string | number) {
    const parsed = typeof input === "number" ? input : Number(input);
    if (!Number.isFinite(parsed)) {
      throw new TypeError("value must be numeric");
    }
    this.#value = parsed;
  }
}

export type StyleDeclaration = {
  readonly cssText: string;
  readonly declarations: Readonly<Record<string, string>>;
};

export interface StyleRule {
  get style(): StyleDeclaration;
  set style(cssText: string);
}

export class ParsedStyleRule implements StyleRule {
  #style: StyleDeclaration = { cssText: "", declarations: {} };

  get style(): StyleDeclaration {
    return this.#style;
  }

  set style(cssText: string) {
    const entries = cssText
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => part.split(":", 2).map((piece) => piece.trim()))
      .filter((entry): entry is [string, string] => entry.length === 2);

    this.#style = {
      cssText,
      declarations: Object.fromEntries(entries),
    };
  }
}

export interface DateSlot {
  get date(): Date | null;
  set date(isoText: string);
}

export class ParsedDateSlot implements DateSlot {
  #date: Date | null = null;

  get date(): Date | null {
    return this.#date;
  }

  set date(isoText: string) {
    const parsed = new Date(isoText);
    this.#date = Number.isNaN(parsed.valueOf()) ? null : parsed;
  }
}

export function writeNumberSlot(
  slot: ParsedNumberSlot,
  input: string | number,
): void {
  slot.value = input;
}

export function writeStyle(rule: StyleRule, cssText: string): void {
  rule.style = cssText;
}

export function writeDate(slot: DateSlot, isoText: string): void {
  slot.date = isoText;
}

// Part 1: Indexed access observes the getter side of each property.
type _01 = Expect<Equal<ParsedNumberSlot["value"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<StyleRule["style"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DateSlot["date"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReadValue<ParsedNumberSlot, "value">, TODO>>; // TODO(koan) @koan-error

// Part 2: Assignment helpers expose each independent setter input.
type _05 = Expect<Equal<WriteValue<typeof writeNumberSlot>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<WriteValue<typeof writeStyle>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<WriteValue<typeof writeDate>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<typeof writeStyle>, TODO>>; // TODO(koan) @koan-error

// Part 3: Read and write directions need not be assignable either way.
type StyleRelationship = ReadWriteRelationship<StyleRule["style"], string>;
type DateRelationship = ReadWriteRelationship<DateSlot["date"], string>;
type _09 = Expect<Equal<StyleRelationship["readFitsWrite"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<StyleRelationship["writeFitsRead"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DateRelationship["readFitsWrite"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<DateRelationship["writeFitsRead"], TODO>>; // TODO(koan) @koan-error

// Part 4: Concrete classes keep their getter types at read sites.
type _13 = Expect<Equal<NumberSlot["value"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ParsedStyleRule["style"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ParsedDateSlot["date"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof ParsedStyleRule, TODO>>; // TODO(koan) @koan-error

// Part 5: Mapped copies use the read type as an ordinary property type.
type NumberSnapshot = { [Key in keyof ParsedNumberSlot]: ParsedNumberSlot[Key] };
type StyleSnapshot = { [Key in keyof StyleRule]: StyleRule[Key] };
type _17 = Expect<Equal<NumberSnapshot["value"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<StyleSnapshot["style"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Readonly<ParsedNumberSlot>["value"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Partial<StyleRule>["style"], TODO>>; // TODO(koan) @koan-error
