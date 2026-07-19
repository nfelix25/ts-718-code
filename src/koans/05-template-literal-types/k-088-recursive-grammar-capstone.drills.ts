import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-088 guided drills: recursive grammar capstone
 * =============================================================================
 * Parse and validate one statement before recursing. A failed node or failed
 * tail invalidates the entire literal program; successful nodes retain order.
 */

type DWS = " " | "\t" | "\n" | "\r";
type DL<S extends string> = string extends S ? S : S extends `${DWS}${infer R}` ? DL<R> : S;
type DR<S extends string> = string extends S ? S : S extends `${infer R}${DWS}` ? DR<R> : S;
type DT<S extends string> = DL<DR<S>>;
type DN<S extends string> = S extends `${infer N extends number}` ? N : never;
type DS<S extends string> = S extends "true" ? true : S extends "false" ? false : DN<S> extends never ? S : DN<S>;
type DCmd = { op: "get"; key: string } | { op: "set"; key: string; value: unknown } | { op: "delete"; key: string } | { op: "increment"; key: string; amount: number };
type DCommand<S extends string> = DT<S> extends `get ${infer K}` ? K extends "" ? never : { op: "get"; key: K }
  : DT<S> extends `set ${infer K}=${infer V}` ? K extends "" ? never : { op: "set"; key: K; value: DS<V> }
  : DT<S> extends `delete ${infer K}` ? K extends "" ? never : { op: "delete"; key: K }
  : DT<S> extends `increment ${infer K} by ${infer A}` ? K extends "" ? never : [DN<A>] extends [never] ? never : { op: "increment"; key: K; amount: DN<A> }
  : never;
type DLiteral<S extends string> = DT<S> extends "" ? []
  : S extends `${infer H};${infer R}` ? DCommand<H> extends infer C
    ? [C] extends [never] ? never : DLiteral<R> extends infer T
      ? [T] extends [never] ? never : T extends DCmd[] ? C extends DCmd ? [C, ...T] : never : never
      : never
    : never
  : DCommand<S> extends infer C ? [C] extends [never] ? never : C extends DCmd ? [C] : never : never;
type DProgram<S extends string> = S extends unknown ? string extends S ? DCmd[] : DLiteral<S> : never;
type DResult<C extends DCmd> = C extends { op: "get" } ? unknown : C extends { op: "set"; value: infer V } ? V : C extends { op: "delete" } ? boolean : number;
type DResults<C extends readonly DCmd[]> = number extends C["length"] ? DResult<C[number]>[] : C extends readonly [infer H extends DCmd, ...infer R extends DCmd[]] ? [DResult<H>, ...DResults<R>] : [];

// Individual command parsing covers valid forms, scalar values, and failures.
type _D01 = Expect<Equal<DCommand<"get name">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DCommand<"get first name">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DCommand<"get ">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DCommand<" get name ">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DCommand<"set count=42">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DCommand<"set enabled=true">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DCommand<"set name=Ada">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DCommand<"set name=a=b">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DCommand<"set =42">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DCommand<"set name=">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DCommand<"delete name">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DCommand<"delete ">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DCommand<"increment count by 2">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DCommand<"increment count by -3.5">, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DCommand<"increment count by many">, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<DCommand<"increment  by 2">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DCommand<"unknown name">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DCommand<"">, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DCommand<"   ">, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DCommand<"get name" | "delete name">, TODO>>; // TODO(koan) @koan-error

// Program recursion builds ordered tuples and accepts only a final empty tail.
type _D21 = Expect<Equal<DProgram<"">, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DProgram<"   ">, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DProgram<"get name">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DProgram<"get name;">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DProgram<"set name=Ada;get name">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DProgram<"set count=1;increment count by 2;get count">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DProgram<"get a;get b;get c">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DProgram<";get name">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DProgram<"get name;;delete name">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DProgram<"get name;unknown x">, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DProgram<"unknown x;get name">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DProgram<"set =1;get name">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DProgram<"increment x by no;get x">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DProgram<" get a ; delete b ; ">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DProgram<"get a" | "get b">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DProgram<"get a" | "unknown b">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DProgram<string>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DProgram<never>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DProgram<"set a=1;set b=2;set c=3;set d=4">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DProgram<"get a;get b;get c;get d;get e">["length"], TODO>>; // TODO(koan) @koan-error

// Result derivation maps each AST node while preserving tuple order.
type _D41 = Expect<Equal<DResult<{ op: "get"; key: "x" }>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DResult<{ op: "set"; key: "x"; value: 42 }>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DResult<{ op: "set"; key: "x"; value: true }>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DResult<{ op: "delete"; key: "x" }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DResult<{ op: "increment"; key: "x"; amount: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DResults<[]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DResults<[{ op: "get"; key: "x" }]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DResults<[{ op: "set"; key: "x"; value: 1 }]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DResults<[{ op: "delete"; key: "x" }]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DResults<[{ op: "increment"; key: "x"; amount: 2 }]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DResults<DProgram<"set x=1;get x">>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DResults<DProgram<"set x=true;delete x">>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DResults<DProgram<"increment x by 2;get x">>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DResults<DProgram<"get a;get b">>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DResults<DCmd[]>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DResults<DProgram<string>>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DResults<DProgram<"">>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DResults<DProgram<"set a=1;set b=2;set c=3">>[number], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DResults<DProgram<"set a=1;set b=true;set c=text">>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DResults<DProgram<"set x=1;increment x by 2;get x;delete x">>, TODO>>; // TODO(koan) @koan-error
