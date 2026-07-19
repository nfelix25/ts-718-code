import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-070: overload inference
 * =============================================================================
 *
 * An overloaded function has several call signatures collected as an
 * intersection. At a call site, TypeScript walks the visible overloads and
 * selects an applicable signature. Conditional inference does something
 * different: it cannot perform overload resolution without actual arguments,
 * so it infers from the final visible signature.
 *
 * I read `F extends (...args: infer P) => infer R ? [P, R] : never` for an
 * overload set as:
 *
 *   "Inspect the overload list's last signature and capture that signature's
 *    parameters and result."
 *
 * The implementation signature supplies the runtime body but is hidden from
 * callers and from `typeof` when overload declarations exist. If a utility
 * should expose a broad summary, authors conventionally add a final visible
 * overload such as `(x: string | number) => string | number`. That summary
 * improves `ReturnType` but loses the correlation between a particular input
 * and result. A union of function types is not an overload set: distributive
 * conditionals inspect each union member independently.
 */

export function convert(value: string): number;
export function convert(value: number): string;
export function convert(value: string | number): string | number {
  return typeof value === "string" ? value.length : String(value);
}

export function classify(value: string): "string";
export function classify(value: number): "number";
export function classify(value: string | number): "string" | "number";
export function classify(value: string | number): "string" | "number" {
  return typeof value === "string" ? "string" : "number";
}

export function choose(value: "exact"): 1;
export function choose(value: string): 2;
export function choose(value: string): 1 | 2 {
  return value === "exact" ? 1 : 2;
}

export class OverloadedBox {
  readonly value: string | number;

  constructor(value: string);
  constructor(value: number, radix: number);
  constructor(value: string | number, _radix?: number) {
    this.value = value;
  }
}

export type OverloadParameters<F> = F extends (...args: infer Params) => unknown ? Params : never;
export type OverloadResult<F> = F extends (...args: any[]) => infer Result ? Result : never;
export type OverloadSignature<F> = F extends (...args: infer Params) => infer Result
  ? [Params, Result]
  : never;

// Part 1: calls resolve against visible overloads.
const mainStringResult = convert("typescript");
const mainNumberResult = convert(42);
const mainExactChoice = choose("exact");
const mainBroadChoice = choose("other");
type _Main01 = Expect<Equal<typeof mainStringResult, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainNumberResult, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainExactChoice, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainBroadChoice, TODO>>; // TODO(koan) @koan-error

// Part 2: inference utilities inspect the last overload signature.
type _Main05 = Expect<Equal<OverloadParameters<typeof convert>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<OverloadResult<typeof convert>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Parameters<typeof convert>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReturnType<typeof convert>, TODO>>; // TODO(koan) @koan-error

// Part 3: a final summary overload changes type-level inspection.
type _Main09 = Expect<Equal<OverloadParameters<typeof classify>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<OverloadResult<typeof classify>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<OverloadSignature<typeof classify>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ReturnType<typeof choose>, TODO>>; // TODO(koan) @koan-error

// Part 4: callable unions distribute instead of selecting a final overload.
type FunctionUnion = ((value: string) => number) | ((value: number) => string);
type _Main13 = Expect<Equal<OverloadParameters<FunctionUnion>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<OverloadResult<FunctionUnion>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<OverloadSignature<FunctionUnion>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Parameters<FunctionUnion>, TODO>>; // TODO(koan) @koan-error

// Part 5: constructor overload utilities also observe the last declaration.
type _Main17 = Expect<Equal<ConstructorParameters<typeof OverloadedBox>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<InstanceType<typeof OverloadedBox>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<OverloadParameters<typeof OverloadedBox>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<OverloadResult<new (value: string) => OverloadedBox>, TODO>>; // TODO(koan) @koan-error
