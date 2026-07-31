import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AppendLabeled,
  type MixedOptional,
  type MixedRest,
  type PrependLabeled,
  type SpreadTogether,
} from "./k-175-tuple-label-relaxation.js";

/** EDGE CASES: labels are not keys or identity, destructuring names are unrelated, optional/rest syntax has distinct placement, mapped/readonly transforms preserve structure, and unions/top/bottom types can obscure tuple precision. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Labeled = [first: string, second: number];
type Unlabeled = [string, number];
type Renamed = [left: string, right: number];

// Pre-solved demonstrations establish that labels are tooling metadata.
type _DemoEqualUnlabeled = Expect<Equal<Labeled, Unlabeled>>;
type _DemoEqualRenamed = Expect<Equal<Labeled, Renamed>>;
type _DemoNoLabelKey = Expect<Equal<"first" extends keyof Labeled ? true : false, false>>;
type _DemoMixedLegal = Expect<Equal<[first: string, number], [string, number]>>;

// 1. Equality and assignability erase label spelling (1-8)
type _01 = Expect<Equal<Equal<Labeled, Unlabeled>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Equal<Labeled, Renamed>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Labeled, Unlabeled>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Unlabeled, Labeled>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Equal<[first: string, number], [string, second: number]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<"first" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<"second" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Labeled[0], TODO>>; // TODO(koan) @koan-error

// 2. Optional/rest positions affect structure even though labels do not (9-16)
type _09 = Expect<Equal<MixedOptional[1], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MixedOptional["length"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Required<MixedOptional>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<MixedRest<string>["length"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<MixedRest<string>[number], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<[string, string], MixedRest<string>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<[string], MixedRest<string>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<string[], MixedRest<string>>, TODO>>; // TODO(koan) @koan-error

// 3. Transforms preserve structural positions across empty/readonly sources (17-23)
type _17 = Expect<Equal<SpreadTogether<[], Labeled>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<SpreadTogether<readonly [true], Labeled>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<PrependLabeled<never, Labeled>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<AppendLabeled<Labeled, unknown>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<{ [Key in keyof Labeled]: Labeled[Key] }, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Readonly<Labeled>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Partial<Labeled>, TODO>>; // TODO(koan) @koan-error

// 4. Unions, arrays, any, never, and unknown expose precision limits (24-30)
type _24 = Expect<Equal<(Labeled | [boolean])[number], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<keyof (Labeled | [boolean]), TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<SpreadTogether<never, Labeled>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<IsAny<SpreadTogether<any, Labeled>[number]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<PrependLabeled<unknown, []>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Labeled, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<readonly Labeled[number][], Labeled>, TODO>>; // TODO(koan) @koan-error
