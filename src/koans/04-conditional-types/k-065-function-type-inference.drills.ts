import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-065 guided drills: function-type inference
 * =============================================================================
 * Capture a signature as data. First recover its parameter tuple, then use
 * tuple patterns to select positions or pair that tuple with the result.
 */

type DArgs<F> = F extends (...args: infer P) => unknown ? P : never;
type DResult<F> = F extends (...args: any[]) => infer R ? R : never;
type DFirst<F> = DArgs<F> extends [infer H, ...unknown[]] ? H : never;
type DLast<F> = DArgs<F> extends [...unknown[], infer L] ? L : never;
type DSignature<F> = F extends (...args: infer P) => infer R ? [P, R] : never;
type DCtorArgs<C> = C extends abstract new (...args: infer P) => unknown ? P : never;

// Whole parameter tuples: arity, labels, optional elements, and rests.
type _D01 = Expect<Equal<DArgs<() => void>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DArgs<(x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DArgs<(x: string, y: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DArgs<(x?: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DArgs<(x: string, y?: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DArgs<(...xs: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DArgs<(head: string, ...tail: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DArgs<(this: Date, format: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DArgs<((x: string) => void) | ((x: number) => void)>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DArgs<(() => void) | ((x: number) => void)>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DArgs<string>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DArgs<unknown>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DArgs<never>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DArgs<{ (x: 1): 2; tag: "fn" }>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DArgs<new (x: number) => object>, TODO>>; // TODO(koan) @koan-error

// Positional selection builds on the captured tuple.
type _D16 = Expect<Equal<DFirst<(x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DFirst<(x: string, y: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DFirst<() => void>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DFirst<(x?: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DFirst<(...xs: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DLast<(x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DLast<(x: string, y: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DLast<() => void>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DLast<(x: string, y?: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DLast<(...xs: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DFirst<((x: 1) => void) | ((x: 2) => void)>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DLast<((x: 1, y: "a") => void) | ((x: 2, y: "b") => void)>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DFirst<string>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DLast<unknown>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DFirst<never>, TODO>>; // TODO(koan) @koan-error

// Capture inputs and outputs together to retain each union member's pairing.
type _D31 = Expect<Equal<DSignature<() => void>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DSignature<(x: string) => number>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DSignature<(x: 1, y: 2) => 3>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DSignature<(...xs: boolean[]) => string>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DSignature<(x?: Date) => Promise<Date>>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DSignature<((x: string) => number) | ((x: number) => string)>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DSignature<(() => 0) | ((x: 1) => 2)>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DSignature<((x: string) => number) | boolean>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DSignature<unknown>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DSignature<never>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DResult<() => undefined>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DResult<() => never>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DResult<(x: string) => Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DResult<(() => 1) | (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DResult<number>, TODO>>; // TODO(koan) @koan-error

// Constructor matching is parallel to, but distinct from, call matching.
class DWidget {
  constructor(readonly id: number, readonly name?: string) {}
}
abstract class DBase {
  constructor(readonly token: symbol) {}
}
type _D46 = Expect<Equal<DCtorArgs<typeof DWidget>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DCtorArgs<typeof DBase>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DCtorArgs<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DCtorArgs<new (source: string, flags?: string) => RegExp>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DCtorArgs<abstract new (...xs: number[]) => object>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DCtorArgs<(new (x: 1) => object) | (new (x: 2) => object)>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DCtorArgs<() => Date>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DCtorArgs<Date>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DCtorArgs<unknown>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DCtorArgs<never>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<ConstructorParameters<DateConstructor>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<ConstructorParameters<RegExpConstructor>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<InstanceType<typeof DWidget>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DArgs<typeof DWidget>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DCtorArgs<{ new (x: string): { x: string }; tag: "ctor" }>, TODO>>; // TODO(koan) @koan-error
