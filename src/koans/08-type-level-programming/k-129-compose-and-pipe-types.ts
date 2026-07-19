import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 129 - COMPOSE AND PIPE TYPES
 * ========================================
 *
 * A unary pipeline is recursive tuple evaluation. Start with input I, prove the
 * first function accepts I, capture its output O, and recurse through the tail
 * using O as the next input. Composition performs the same evaluation after
 * reversing the function tuple.
 *
 * Read `PipeResult<I, [F, ...Rest]>` aloud as: "apply F to I; if that call is
 * valid, pipe F's result through Rest; otherwise return never." A separate
 * `IsPipeable` flag distinguishes an invalid link from a valid pipeline whose
 * real output is never. `PipeStages` retains every intermediate type for study.
 */

type Reverse<T extends readonly unknown[], Acc extends unknown[] = []> =
  T extends readonly [infer Head, ...infer Tail] ? Reverse<Tail, [Head, ...Acc]> : Acc;

export type PipeResult<Input, Fns extends readonly unknown[]> =
  Fns extends readonly [infer First, ...infer Rest]
    ? First extends (input: Input) => infer Output
      ? PipeResult<Output, Rest>
      : never
    : Input;

export type PipeStages<
  Input,
  Fns extends readonly unknown[],
  Acc extends readonly unknown[] = [Input],
> = Fns extends readonly [infer First, ...infer Rest]
  ? First extends (input: Input) => infer Output
    ? PipeStages<Output, Rest, [...Acc, Output]>
    : never
  : Acc;

export type IsPipeable<Input, Fns extends readonly unknown[]> =
  Fns extends readonly [infer First, ...infer Rest]
    ? First extends (input: Input) => infer Output
      ? IsPipeable<Output, Rest>
      : false
    : true;

export type ComposeResult<Input, Fns extends readonly unknown[]> = PipeResult<Input, Reverse<Fns>>;

type Parse = (text: string) => number;
type Positive = (value: number) => boolean;
type Label = (value: boolean) => "yes" | "no";

// Part 1: Pipe walks left to right.
type _01 = Expect<Equal<PipeResult<string, []>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<PipeResult<string, [Parse]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<PipeResult<string, [Parse, Positive]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<PipeResult<string, [Parse, Positive, Label]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Every captured output becomes the next input proof.
type _05 = Expect<Equal<PipeStages<string, [Parse, Positive, Label]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsPipeable<string, [Parse, Positive, Label]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PipeResult<string, [Positive, Label]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsPipeable<string, [Positive, Label]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Compose reverses function order before the same evaluation.
type _09 = Expect<Equal<ComposeResult<string, [Label, Positive, Parse]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ComposeResult<number, [Label, Positive]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ComposeResult<string, [Parse]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ComposeResult<string, []>, TODO>>; // TODO(koan) @koan-error

// Part 4: Assignability permits a broader consumer, but rejects a narrower one.
type _13 = Expect<Equal<PipeResult<"x", [(value: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<PipeResult<string, [(value: unknown) => number]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsPipeable<string, [(value: "x") => number]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<PipeResult<string, [(value: "x") => number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: never output and invalid output both need the validity flag.
type _17 = Expect<Equal<PipeResult<string, [(value: string) => never]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IsPipeable<string, [(value: string) => never]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<PipeResult<string, [(value: string) => number, (value: boolean) => Date]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsPipeable<string, [(value: string) => number, (value: boolean) => Date]>, TODO>>; // TODO(koan) @koan-error

type Unary = (input: any) => any;

export function pipeFrom<Input>() {
  return <const Fns extends readonly Unary[]>(...fns: Fns) =>
    (input: Input): PipeResult<Input, Fns> =>
      fns.reduce<unknown>((value, fn) => fn(value), input) as PipeResult<Input, Fns>;
}

export function composeFrom<Input>() {
  return <const Fns extends readonly Unary[]>(...fns: Fns) =>
    (input: Input): ComposeResult<Input, Fns> =>
      [...fns].reverse().reduce<unknown>((value, fn) => fn(value), input) as ComposeResult<Input, Fns>;
}
