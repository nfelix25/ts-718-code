import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 188 - CONSTANT INDEXED CONTROL-FLOW ANALYSIS
 * =================================================
 *
 * TypeScript 5.5 can attach a narrowing fact to `object[key]` when both the
 * object reference and key are effectively constant. This makes dynamic record
 * access behave more like a local variable after a guard.
 *
 * Read `typeof record[key] === "string"` aloud as: "for this unchanged record
 * reference and this unchanged key, the selected value is string on this path."
 * A later use of the same indexed expression can call string methods directly.
 *
 * The fact belongs to that exact access path. Reassigning the object or key,
 * writing through the property, or using a different alias can invalidate or
 * fail to share it. The declared indexed type remains unchanged outside the
 * narrowed control-flow region.
 *
 * Feature ownership: TypeScript 5.5.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#control-flow-narrowing-for-constant-indexed-accesses
 */

export type UnknownRecord = Record<string, unknown>;

export function describeIndexed(
  record: UnknownRecord,
  key: string,
): string {
  if (typeof record[key] === "string") {
    const selected = record[key];
    type _01 = Expect<Equal<typeof selected, TODO>>; // TODO(koan) @koan-error
    type _02 = Expect<Equal<ReturnType<typeof selected.toUpperCase>, TODO>>; // TODO(koan) @koan-error
    type _03 = Expect<Equal<typeof key, TODO>>; // TODO(koan) @koan-error
    type _04 = Expect<Equal<UnknownRecord[string], TODO>>; // TODO(koan) @koan-error
    return `text:${record[key].toUpperCase()}`;
  }

  if (typeof record[key] === "number") {
    const selected = record[key];
    type _05 = Expect<Equal<typeof selected, TODO>>; // TODO(koan) @koan-error
    type _06 = Expect<Equal<ReturnType<typeof selected.toFixed>, TODO>>; // TODO(koan) @koan-error
    type _07 = Expect<Equal<typeof key, TODO>>; // TODO(koan) @koan-error
    type _08 = Expect<Equal<Extract<UnknownRecord[string], number>, TODO>>; // TODO(koan) @koan-error
    return `number:${record[key].toFixed(1)}`;
  }

  return "other";
}

export function arrayValueKind(
  values: readonly unknown[],
  index: number,
): string {
  if (Array.isArray(values[index])) {
    const selected = values[index];
    type _09 = Expect<Equal<typeof selected, TODO>>; // TODO(koan) @koan-error
    type _10 = Expect<Equal<typeof selected.length, TODO>>; // TODO(koan) @koan-error
    type _11 = Expect<Equal<typeof index, TODO>>; // TODO(koan) @koan-error
    type _12 = Expect<Equal<(readonly unknown[])[number], TODO>>; // TODO(koan) @koan-error
    return `array:${values[index].length}`;
  }

  if (
    typeof values[index] === "object" &&
    values[index] !== null
  ) {
    const selected = values[index];
    type _13 = Expect<Equal<typeof selected, TODO>>; // TODO(koan) @koan-error
    type _14 = Expect<Equal<keyof typeof selected, TODO>>; // TODO(koan) @koan-error
    type _15 = Expect<Equal<typeof index, TODO>>; // TODO(koan) @koan-error
    type _16 = Expect<Equal<Extract<unknown, object>, TODO>>; // TODO(koan) @koan-error
    return "object";
  }

  return typeof values[index];
}

// Part 5: public signatures retain broad indexed input contracts.
type _17 = Expect<Equal<Parameters<typeof describeIndexed>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof describeIndexed>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof arrayValueKind>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof arrayValueKind>, TODO>>; // TODO(koan) @koan-error
