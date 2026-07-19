import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  ComposeResult,
  IsPipeable,
  PipeResult,
  PipeStages,
} from "./k-129-compose-and-pipe-types.js";

/** GUIDED DRILLS: vary length, direction, assignability, unions, async wrappers, and special types. */

type PR<I, F extends readonly unknown[]> = PipeResult<I, F>;
type PS<I, F extends readonly unknown[]> = PipeStages<I, F>;
type OK<I, F extends readonly unknown[]> = IsPipeable<I, F>;
type CR<I, F extends readonly unknown[]> = ComposeResult<I, F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Zero-to-four-stage pipes (1-12)
type _01 = Expect<Equal<PR<string, []>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<PR<string, [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<PR<string, [(x: string) => number, (x: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<PR<string, [(x: string) => number, (x: number) => boolean, (x: boolean) => Date]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<PR<1, [(x: number) => 2, (x: 2) => 3, (x: 3) => 4, (x: 4) => 5]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<PS<string, []>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<PS<string, [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<PS<string, [(x: string) => number, (x: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<OK<string, []>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<OK<string, [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<OK<string, [(x: number) => string]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<PS<string, [(x: number) => string]>, TODO>>; // TODO(koan) @koan-error

// Compose direction (13-24)
type _13 = Expect<Equal<CR<string, [(x: number) => boolean, (x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CR<string, [(x: boolean) => Date, (x: number) => boolean, (x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CR<number, [(x: string) => Date, (x: number) => string]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CR<string, [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<CR<string, []>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CR<string, [(x: number) => boolean, (x: boolean) => Date]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<PR<string, [(x: string) => number, (x: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<CR<string, [(x: number) => boolean, (x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<PR<number, [(x: number) => string, (x: string) => Date]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<CR<number, [(x: string) => Date, (x: number) => string]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CR<string, [(x: unknown) => number]>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<CR<string, [(x: "x") => number]>, TODO>>; // TODO(koan) @koan-error

// Assignability and variance (25-36)
type _25 = Expect<Equal<OK<"x", [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<OK<string, [(x: "x") => number]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<OK<string, [(x: unknown) => number]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<OK<string, [(x: any) => number]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<PR<"x", [(x: string) => 1]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<PR<string, [(x: unknown) => 1]>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<PR<string, [(x: any) => 1]>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<OK<{ id: 1; name: string }, [(x: { id: number }) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<OK<{ id: number }, [(x: { id: 1 }) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<PR<{ id: 1 }, [(x: object) => keyof any]>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<OK<readonly [1, 2], [(x: readonly number[]) => number]>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<OK<readonly number[], [(x: number[]) => number]>, TODO>>; // TODO(koan) @koan-error

// Unions, promises, and nested functions (37-48)
type _37 = Expect<Equal<PR<string, [(x: string) => number | boolean]>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<PR<string, [(x: string) => number | boolean, (x: number | boolean) => Date]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<OK<string, [(x: string) => number | boolean, (x: number) => Date]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<PR<string, [((x: string) => 1) | ((x: string) => 2)]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<PR<string, [(x: string) => Promise<number>, (x: Promise<number>) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<PR<string, [(x: string) => Promise<number>, (x: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<PR<string, [(x: string) => () => number, (x: () => number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<PR<string, [(x: string) => { value: number }, (x: { value: number }) => number]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<PS<string, [(x: string) => Promise<number>, (x: Promise<number>) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<CR<string, [(x: Promise<number>) => boolean, (x: string) => Promise<number>]>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<OK<string, [(x: string) => 1 | 2, (x: 1 | 2) => "done"]>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<OK<string, [(x: string) => 1 | 2, (x: 1) => "done"]>, TODO>>; // TODO(koan) @koan-error

// never, unknown, any, and broad arrays (49-60)
type _49 = Expect<Equal<PR<never, []>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<PR<string, [(x: string) => never]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<OK<string, [(x: string) => never]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<PR<unknown, [(x: unknown) => string]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<OK<unknown, [(x: string) => number]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<IsAny<PR<any, []>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<IsAny<PR<string, [(x: string) => any]>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<OK<string, [(x: string) => any, (x: number) => boolean]>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<PR<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<PS<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<OK<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<CR<string, unknown[]>, TODO>>; // TODO(koan) @koan-error
