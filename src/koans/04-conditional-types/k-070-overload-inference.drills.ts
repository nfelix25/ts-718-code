import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-070 guided drills: overload inference
 * =============================================================================
 * For calls, resolve using the supplied argument. For conditional utilities,
 * ignore earlier overloads and inspect the last visible signature exactly.
 */

type DArgs<F> = F extends (...args: infer P) => unknown ? P : never;
type DReturn<F> = F extends (...args: any[]) => infer R ? R : never;
type DSig<F> = F extends (...args: infer P) => infer R ? [P, R] : never;
type DCtorArgs<C> = C extends abstract new (...args: infer P) => unknown ? P : never;
type DCtorInstance<C> = C extends abstract new (...args: any[]) => infer I ? I : never;

interface DParse {
  (value: string): number;
  (value: number): string;
}
interface DSummary {
  (value: string): number;
  (value: number): string;
  (value: string | number): string | number;
}
interface DLiteral {
  (value: "a"): 1;
  (value: "b"): 2;
  (value: string): 3;
}
interface DOptional {
  (): 0;
  (value: string, radix?: number): 1;
}
interface DRest {
  (value: string): 1;
  (...values: number[]): 2;
}

// Parameter inference always observes the last visible call signature.
type _D01 = Expect<Equal<DArgs<DParse>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<Parameters<DParse>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DArgs<DSummary>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<Parameters<DSummary>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DArgs<DLiteral>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<Parameters<DLiteral>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DArgs<DOptional>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<Parameters<DOptional>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DArgs<DRest>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<Parameters<DRest>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DArgs<DParse & { tag: "parse" }>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DArgs<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DArgs<((x: number) => 2) & ((x: string) => 1)>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DArgs<((x: 1) => 1) & ((x: 2, y?: 3) => 2)>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DArgs<unknown>, TODO>>; // TODO(koan) @koan-error

// Return inference follows the same last-signature rule.
type _D16 = Expect<Equal<DReturn<DParse>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<ReturnType<DParse>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DReturn<DSummary>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<ReturnType<DSummary>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DReturn<DLiteral>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<ReturnType<DLiteral>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DReturn<DOptional>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DReturn<DRest>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DReturn<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DReturn<((x: number) => 2) & ((x: string) => 1)>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DSig<DParse>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DSig<DSummary>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DSig<DLiteral>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DSig<DOptional>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DSig<DRest>, TODO>>; // TODO(koan) @koan-error

// Callable unions distribute, retaining all members rather than choosing one last member.
type DUnion = ((x: string) => 1) | ((x: number) => 2);
type DThreeUnion = (() => 0) | ((x: 1) => 1) | ((x: 2, y: 3) => 2);
type _D31 = Expect<Equal<DArgs<DUnion>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DReturn<DUnion>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DSig<DUnion>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<Parameters<DUnion>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<ReturnType<DUnion>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DArgs<DThreeUnion>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DReturn<DThreeUnion>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DSig<DThreeUnion>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DArgs<DParse | (() => boolean)>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DReturn<DParse | (() => boolean)>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DSig<DParse | ((x: boolean) => Date)>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DArgs<never>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DReturn<never>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DSig<unknown>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DSig<never>, TODO>>; // TODO(koan) @koan-error

// Construct signature overloads use the final constructor declaration too.
interface DConstructor {
  new (value: string): { kind: "string"; value: string };
  new (value: number, radix?: number): { kind: "number"; value: number };
}
interface DConstructorSummary {
  new (value: string): { kind: "string" };
  new (value: number): { kind: "number" };
  new (value: string | number): { kind: "string" | "number" };
}
type _D46 = Expect<Equal<DCtorArgs<DConstructor>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<ConstructorParameters<DConstructor>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DCtorInstance<DConstructor>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<InstanceType<DConstructor>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DCtorArgs<DConstructorSummary>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DCtorInstance<DConstructorSummary>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DCtorArgs<(new (x: 1) => { x: 1 }) & (new (x: 2) => { x: 2 })>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DCtorInstance<(new (x: 1) => { x: 1 }) & (new (x: 2) => { x: 2 })>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DCtorArgs<(new (x: 1) => { x: 1 }) | (new (x: 2) => { x: 2 })>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DCtorInstance<(new (x: 1) => { x: 1 }) | (new (x: 2) => { x: 2 })>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DCtorArgs<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DCtorInstance<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DCtorArgs<() => Date>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DCtorInstance<unknown>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DCtorInstance<never>, TODO>>; // TODO(koan) @koan-error
