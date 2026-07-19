import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-063 guided drills: unknown in conditional types
 * =============================================================================
 * Track assignability direction first, then normalize unions/intersections, and
 * only then evaluate the conditional. Always exclude any before calling a type
 * unknown based solely on top-like assignability.
 */

type DIsAny<T> = 0 extends (1 & T) ? true : false;
type DIsUnknown<T> = DIsAny<T> extends true ? false : unknown extends T ? true : false;
type DFitsTop<T> = T extends unknown ? true : false;
type DAcceptsTop<T> = unknown extends T ? true : false;
type DSafe<T> = DIsAny<T> extends true ? "any" : DIsUnknown<T> extends true ? "unknown" : T extends string ? "string" : T extends number ? "number" : "other";

// Assignability directions for primitives, structures, top, bottom, and poison.
type _D01 = Expect<Equal<string extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<number extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<null extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<undefined extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<{} extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<never extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<any extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<unknown extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<unknown extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<unknown extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<unknown extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<unknown extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<unknown extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DFitsTop<string | number>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DAcceptsTop<string | unknown>, TODO>>; // TODO(koan) @koan-error

// Unknown absorbs unions and acts as identity in intersections.
type _D16 = Expect<Equal<unknown | string, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<unknown | never, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DIsAny<unknown | any>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<unknown & string, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<unknown & number, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<unknown & {}, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<unknown & never, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DIsAny<unknown & any>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DFitsTop<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DFitsTop<unknown & string>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DAcceptsTop<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DAcceptsTop<unknown & string>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<(unknown | { id: string }) extends { id: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<(unknown & { id: string }) extends { id: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<keyof (unknown & { id: string }), TODO>>; // TODO(koan) @koan-error

// Unknown detection must distinguish any, never, and ordinary broad types.
type _D31 = Expect<Equal<DIsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DIsUnknown<any>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DIsUnknown<never>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DIsUnknown<string>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DIsUnknown<object>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DIsUnknown<{}>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DIsUnknown<void>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DIsUnknown<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DIsUnknown<unknown & string>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DIsUnknown<unknown | any>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DIsUnknown<unknown & any>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DIsUnknown<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DIsUnknown<Promise<unknown>>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DIsUnknown<{ value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DIsUnknown<Record<string, unknown>[string]>, TODO>>; // TODO(koan) @koan-error

// Safe classifiers, keys, containers, and standard utilities.
type _D46 = Expect<Equal<DSafe<unknown>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DSafe<any>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DSafe<never>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DSafe<string>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DSafe<number>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DSafe<string | number>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<{ [K in keyof unknown]: K }, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<unknown[][number], TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<Awaited<Promise<unknown>>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<ReturnType<() => unknown>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<Parameters<(value: unknown) => void>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<Partial<Record<string, unknown>>[string], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Extract<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Exclude<unknown, string>, TODO>>; // TODO(koan) @koan-error
