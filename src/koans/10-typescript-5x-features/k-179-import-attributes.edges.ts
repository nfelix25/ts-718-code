import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type JsonImportAttributes,
  importWithAttributes,
  makeImportOptions,
  readImportAttribute,
} from "./k-179-import-attributes.js";

/** EDGE CASES: TypeScript preserves rather than validates host meanings, option nesting is optional, index-signature reads include undefined under this repository's strict flags, literals widen easily, and the loaded namespace is unknown at a generic boundary. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;

// Pre-solved demonstrations establish the host/compiler split.
type _DemoDeclaredValue = Expect<Equal<ImportAttributes[string], string>>;
type _DemoCheckedRead = Expect<Equal<ReturnType<typeof readImportAttribute>, string | undefined>>;
type _DemoCustomAllowed = Expect<Equal<{ flavor: "custom" } extends ImportAttributes ? true : false, true>>;
type _DemoOptionsOptional = Expect<Equal<{} extends ImportCallOptions ? true : false, true>>;
type _DemoUnknownNamespace = Expect<Equal<Awaited<ReturnType<typeof importWithAttributes>>, unknown>>;

// 1. Host meanings are not a closed compiler-known vocabulary (1-8)
type _01 = Expect<Equal<Extends<{ type: "json" }, ImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<{ type: "unsupported" }, ImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<{ integrity: "not-validated" }, ImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<{ type: 123 }, ImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ImportAttributes[string], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof readImportAttribute>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsNever<Extract<ImportAttributes[string], number>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<string, NonNullable<ImportAttributes[string]>>, TODO>>; // TODO(koan) @koan-error

// 2. Dynamic-import options may omit `with` entirely (9-15)
type _09 = Expect<Equal<keyof ImportCallOptions, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ImportCallOptions["with"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<{}, ImportCallOptions>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<{ with: {} }, ImportCallOptions>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<{ with: JsonImportAttributes }, ImportCallOptions>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof makeImportOptions>["with"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<NonNullable<ReturnType<typeof makeImportOptions>["with"]>, TODO>>; // TODO(koan) @koan-error

// 3. Literal precision depends on how the record is declared (16-22)
type MutableJson = { type: string };
type _16 = Expect<Equal<MutableJson["type"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<JsonImportAttributes["type"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<JsonImportAttributes, MutableJson>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<MutableJson, JsonImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Readonly<MutableJson>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Partial<JsonImportAttributes>["type"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Required<Partial<JsonImportAttributes>>, TODO>>; // TODO(koan) @koan-error

// 4. Generic module loading deliberately returns an unknown boundary (23-30)
type Loaded = Awaited<ReturnType<typeof importWithAttributes>>;
type _23 = Expect<Equal<Loaded, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<Loaded, unknown>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<unknown, Loaded>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof Loaded, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<Loaded>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsNever<Loaded>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<typeof importWithAttributes>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<typeof importWithAttributes>, TODO>>; // TODO(koan) @koan-error
