import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AppendLabeled,
  type LabeledCoordinates,
  type LabeledRest,
  type MergedCoordinates,
  type MixedOptional,
  type MixedPair,
  type MixedRest,
  type PrependLabeled,
  type SpreadTogether,
  type UnlabeledFlag,
  appendRuntime,
  collectValues,
  describePoint,
  prependRuntime,
} from "./k-175-tuple-label-relaxation.js";

/** GUIDED DRILLS: repeat mixed fixed/optional/rest tuples, labeled-unlabeled spreads, prepend/append transformations, parameter reflection, and label-insensitive equality. */

type Extends<From, To> = [From] extends [To] ? true : false;
type LabeledText = [name: string, count: number];
type UnlabeledNumbers = [1, 2];
type Mixed = [enabled: boolean, string, count?: number];

// Fixed and optional mixed tuple structure (1-15)
type _01 = Expect<Equal<MixedPair<number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<MixedPair<number>[0], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<MixedPair<number>[1], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<MixedPair<number>[number], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<MixedPair<number>["length"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<MixedOptional, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MixedOptional[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MixedOptional[1], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<MixedOptional[number], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MixedOptional["length"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Mixed, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Mixed[0], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Mixed[1], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Mixed[2], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Mixed["length"], TODO>>; // TODO(koan) @koan-error

// Mixed and fully labeled rest tuples (16-30)
type _16 = Expect<Equal<MixedRest<string>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<MixedRest<string>[0], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<MixedRest<string>[1], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MixedRest<string>[2], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MixedRest<string>[number], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<MixedRest<string>["length"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<LabeledRest<boolean>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<LabeledRest<boolean>[0], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<LabeledRest<boolean>[number], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<LabeledRest<boolean>["length"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<MixedRest<string>, readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<[string, string], MixedRest<string>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<[string], MixedRest<string>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<[string, string, string], MixedRest<string>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<readonly [...MixedRest<number>], TODO>>; // TODO(koan) @koan-error

// Spreads, prepend, and append (31-45)
type _31 = Expect<Equal<SpreadTogether<UnlabeledNumbers, LabeledText>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<SpreadTogether<LabeledText, UnlabeledNumbers>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<SpreadTogether<[], LabeledText>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<SpreadTogether<LabeledText, []>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<MergedCoordinates, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<MergedCoordinates["length"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<PrependLabeled<0, LabeledText>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<PrependLabeled<0, []>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<PrependLabeled<0, UnlabeledNumbers>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<AppendLabeled<LabeledText, boolean>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<AppendLabeled<[], boolean>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<AppendLabeled<UnlabeledFlag, "end">, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof prependRuntime<0, LabeledText>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<typeof appendRuntime<LabeledText, true>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<SpreadTogether<readonly [1], readonly [name: string]>, TODO>>; // TODO(koan) @koan-error

// Function reflection and label-insensitive equality (46-60)
type _46 = Expect<Equal<Parameters<typeof describePoint>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Parameters<typeof describePoint>[0], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<typeof describePoint>[1], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Parameters<typeof describePoint>[2], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ReturnType<typeof describePoint>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof collectValues<number>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof collectValues<number>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Equal<[x: number], [number]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Equal<[x: number, number], [number, y: number]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<[x: number], [number]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<[number], [x: number]>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<keyof [x: number, string], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<"x" extends keyof [x: number, string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<LabeledCoordinates[0], TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<LabeledCoordinates[1], TODO>>; // TODO(koan) @koan-error
