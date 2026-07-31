import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CorrelatedCase,
  type CorrelatedTuple,
  type DispatchArgs,
  type FieldCase,
  type FieldHandlers,
  type FieldMap,
  type FieldTuple,
  type HandlerMap,
  type UncorrelatedCase,
  dispatchField,
  fieldHandlers,
  formatFieldCase,
  formatFieldTuple,
} from "./k-157-correlated-unions.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Recover the relation through object members, tuple positions, dispatch tuples,
 * and keyed handlers. Then compare every projection with the deliberately loose
 * object that stores name, value, and callback as unrelated unions.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type CustomMap = {
  bytes: Uint8Array;
  date: Date;
  names: readonly string[];
};

// Correlated object members and discriminant extraction (1-15)
type _01 = Expect<Equal<FieldCase["kind"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<FieldCase["value"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof FieldCase, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<FieldCase, { kind: "text" }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<FieldCase, { kind: "text" }>["value"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Parameters<Extract<FieldCase, { kind: "text" }>["format"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<FieldCase, { kind: "count" }>["value"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<Extract<FieldCase, { kind: "count" }>["format"]>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<FieldCase, { kind: "active" }>["value"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<Extract<FieldCase, { kind: "active" }>["format"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<CorrelatedCase<FieldMap, "text" | "count">["kind"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<CorrelatedCase<FieldMap, "text" | "count">["value"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Exclude<FieldCase, { kind: "active" }>["kind"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CorrelatedCase<FieldMap, never>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CorrelatedCase<{}, never>, TODO>>; // TODO(koan) @koan-error

// Tuple correlation and dispatch argument unions (16-30)
type _16 = Expect<Equal<FieldTuple[0], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<FieldTuple[1], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<FieldTuple[2], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<FieldTuple["length"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<FieldTuple, readonly ["text", ...unknown[]]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<FieldTuple, readonly ["count", ...unknown[]]>[1], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<Extract<FieldTuple, readonly ["active", ...unknown[]]>[2]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CorrelatedTuple<FieldMap, "text" | "active">[0], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<DispatchArgs<FieldMap>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<DispatchArgs<FieldMap, "text">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<DispatchArgs<FieldMap, "count" | "active">, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<DispatchArgs<FieldMap>[0], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<DispatchArgs<FieldMap>[1], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extract<DispatchArgs<FieldMap>, ["count", unknown]>[1], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<DispatchArgs<FieldMap, never>, TODO>>; // TODO(koan) @koan-error

// Handler maps, loose projections, and assignment contrasts (31-45)
type Loose = UncorrelatedCase<FieldMap>;
type _31 = Expect<Equal<keyof FieldHandlers, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<FieldHandlers["text"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<FieldHandlers["count"]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<FieldHandlers["active"]>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<HandlerMap<CustomMap>["bytes"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Parameters<HandlerMap<CustomMap>["date"]>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<Loose["kind"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Loose["value"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Loose["format"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parameters<Loose["format"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Extends<{ kind: "text"; value: number; format: Loose["format"] }, Loose>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Extends<{ kind: "text"; value: number; format: (value: number) => string }, FieldCase>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<FieldCase["format"]>[0], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<FieldCase["format"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Extends<FieldCase, Loose>, TODO>>; // TODO(koan) @koan-error

// Custom maps and runtime API reflection (46-60)
type CustomCase = CorrelatedCase<CustomMap>;
type _46 = Expect<Equal<CustomCase["kind"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extract<CustomCase, { kind: "bytes" }>["value"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<Extract<CustomCase, { kind: "names" }>["format"]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<CorrelatedTuple<CustomMap>[1], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<DispatchArgs<CustomMap>[0], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof formatFieldCase>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof formatFieldCase>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof formatFieldTuple>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof formatFieldTuple>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Parameters<typeof dispatchField>[0], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof dispatchField>[1], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Parameters<typeof dispatchField>[2], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<typeof dispatchField>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<typeof fieldHandlers, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<keyof typeof fieldHandlers, TODO>>; // TODO(koan) @koan-error
