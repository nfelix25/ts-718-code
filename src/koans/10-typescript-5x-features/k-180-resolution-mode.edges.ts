import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ImportBranch,
  type RequireBranch,
  type ResolutionAttributes,
  type ResolutionMode,
  type SameResolvedUtility,
  makeResolutionAttributes,
} from "./k-180-resolution-mode.js";

/** EDGE CASES: the attribute is legal only on type requests, selects lookup rather than runtime format conversion, remains an open ImportAttributes value structurally, and can expose genuinely different package declarations. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type ResolveModel<Mode extends ResolutionMode> =
  Mode extends "import" ? { format: "esm"; value: string } :
  { format: "cjs"; value: number };

// Pre-solved demonstrations establish selection versus structural outcome.
type _DemoDistinctModes = Expect<Equal<ImportBranch extends RequireBranch ? true : false, false>>;
type _DemoLocalSameType = Expect<Equal<SameResolvedUtility, true>>;
type _DemoImportModel = Expect<Equal<ResolveModel<"import">["value"], string>>;
type _DemoRequireModel = Expect<Equal<ResolveModel<"require">["value"], number>>;

// 1. One specifier can model different conditional declarations (1-8)
type _01 = Expect<Equal<ResolveModel<"import">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ResolveModel<"require">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ResolveModel<ResolutionMode>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ResolveModel<ResolutionMode>["format"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ResolveModel<ResolutionMode>["value"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<ResolveModel<ResolutionMode>, { format: "esm" }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<ResolveModel<ResolutionMode>, { format: "cjs" }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ResolveModel<never>, TODO>>; // TODO(koan) @koan-error

// 2. Open import-attribute shape is broader than valid resolution modes (9-15)
type _09 = Expect<Equal<ImportAttributes["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<{ "resolution-mode": "browser" }, ImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<{ "resolution-mode": "browser" }, ResolutionAttributes<ResolutionMode>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<ImportBranch, ImportAttributes>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<ImportAttributes, ImportBranch>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<NonNullable<ImportAttributes["resolution-mode"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ResolutionAttributes<ResolutionMode>["resolution-mode"], TODO>>; // TODO(koan) @koan-error

// 3. Literal widening can erase the valid-mode guarantee (16-22)
type Wide = { "resolution-mode": string };
type _16 = Expect<Equal<Wide["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ImportBranch["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<ImportBranch, Wide>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Wide, ImportBranch>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof makeResolutionAttributes<ResolutionMode>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Partial<ImportBranch>["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Required<Partial<RequireBranch>>, TODO>>; // TODO(koan) @koan-error

// 4. Bottom and union behavior follow ordinary conditional rules (23-30)
type _23 = Expect<Equal<IsNever<ResolveModel<never>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Exclude<ResolutionMode, "import">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Exclude<ResolutionMode, "require">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<ResolutionMode, string>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<never, ResolutionMode>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, ResolutionMode>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<SameResolvedUtility, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<keyof ResolveModel<ResolutionMode>, TODO>>; // TODO(koan) @koan-error
