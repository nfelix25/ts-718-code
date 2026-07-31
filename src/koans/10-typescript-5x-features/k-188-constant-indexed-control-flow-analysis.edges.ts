import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type UnknownRecord,
  arrayValueKind,
  describeIndexed,
} from "./k-188-constant-indexed-control-flow-analysis.js";

/** EDGE CASES: facts require the same effectively-constant object and key, reassignment or writes invalidate them, aliases are distinct access paths, unchecked declarations remain broad outside the branch, optional/array reads include absence, and any defeats useful proof. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// Pre-solved demonstration observes a real narrowed indexed expression.
function demo(record: UnknownRecord, key: string): string | null {
  if (typeof record[key] === "string") {
    const selected = record[key];
    type _DemoNarrowed = Expect<Equal<typeof selected, string>>;
    return record[key].toUpperCase();
  }
  return null;
}
void demo;

// 1. Declared type remains broad outside control flow (1-8)
type _01 = Expect<Equal<UnknownRecord[string], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<UnknownRecord["fixed"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof UnknownRecord, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<typeof describeIndexed>[0], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<typeof describeIndexed>[1], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof describeIndexed>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<UnknownRecord[string], string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Exclude<UnknownRecord[string], string>, TODO>>; // TODO(koan) @koan-error

// 2. Optional and unchecked reads preserve absence (9-15)
type Optional = { value?: string };
type _09 = Expect<Equal<Optional["value"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<NonNullable<Optional["value"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Required<Optional>["value"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<(readonly string[])[number], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<typeof arrayValueKind>[0], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof arrayValueKind>[1], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof arrayValueKind>, TODO>>; // TODO(koan) @koan-error

// 3. Aliases share declared shapes, not necessarily flow nodes (16-22)
type Alias = UnknownRecord;
type _16 = Expect<Equal<Alias[string], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<Alias, UnknownRecord>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<UnknownRecord, Alias>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Readonly<Alias>[string], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Partial<Record<"a", string>>["a"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Record<"a", string>["a"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof Alias, TODO>>; // TODO(koan) @koan-error

// 4. Top and bottom indexed values (23-30)
type AnyRecord = Record<string, any>;
type NeverRecord = Record<string, never>;
type _23 = Expect<Equal<IsAny<AnyRecord[string]>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<NeverRecord[string] extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Record<string, unknown>[string], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<unknown, object>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Exclude<unknown, object>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<never, unknown>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<unknown, never>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<keyof never, TODO>>; // TODO(koan) @koan-error
