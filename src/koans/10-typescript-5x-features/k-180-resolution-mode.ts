import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Equal as ImportResolvedEqual } from "../../utils/type-utils.js" with {
  "resolution-mode": "import"
};
import type { Equal as RequireResolvedEqual } from "../../utils/type-utils.js" with {
  "resolution-mode": "require"
};

/**
 * KOAN 180 - RESOLUTION MODE
 * ==========================
 *
 * A package may expose different declarations through its `"import"` and
 * `"require"` export conditions. Type-only imports produce no runtime syntax,
 * so the surrounding file format is not always enough to tell TypeScript which
 * branch the author intends.
 *
 * TypeScript 5.3 stabilized `"resolution-mode"` on type-only imports and
 * import types. Read `with { "resolution-mode": "require" }` aloud as "resolve
 * this type request as though it came from CommonJS." The attribute guides
 * lookup; it does not turn a type-only import into a runtime require.
 *
 * The two real imports above resolve the same local structural utility, so they
 * compare equal. A conditional-exports package can intentionally make their
 * declarations differ.
 *
 * Feature ownership: TypeScript 5.3.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#stable-support-resolution-mode-in-import-types
 */

export type ResolutionMode = "import" | "require";
export type ResolutionAttributes<Mode extends ResolutionMode> = {
  readonly "resolution-mode": Mode;
};

export type ImportBranch = ResolutionAttributes<"import">;
export type RequireBranch = ResolutionAttributes<"require">;

export function makeResolutionAttributes<const Mode extends ResolutionMode>(
  mode: Mode,
): ResolutionAttributes<Mode> {
  return { "resolution-mode": mode };
}

export function activeCondition(mode: ResolutionMode): ResolutionMode {
  return mode;
}

export type SameResolvedUtility =
  ImportResolvedEqual<string, string> extends
    RequireResolvedEqual<string, string> ? true : false;

// Part 1: modes name the two package-condition lookup strategies.
type _01 = Expect<Equal<ResolutionMode, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ImportBranch, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<RequireBranch, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<keyof ImportBranch, TODO>>; // TODO(koan) @koan-error

// Part 2: const inference preserves the selected mode.
type _05 = Expect<Equal<ReturnType<typeof makeResolutionAttributes<"import">>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof makeResolutionAttributes<"require">>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<typeof activeCondition>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof activeCondition>, TODO>>; // TODO(koan) @koan-error

// Part 3: the attribute guides lookup without producing a value import.
type _09 = Expect<Equal<ImportResolvedEqual<1, 1>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<RequireResolvedEqual<1, 2>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<SameResolvedUtility, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Equal<ImportResolvedEqual<1, 1>, RequireResolvedEqual<1, 1>>, TODO>>; // TODO(koan) @koan-error

// Part 4: branch objects are structurally distinct literal records.
type _13 = Expect<Equal<ImportBranch["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<RequireBranch["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ImportBranch extends RequireBranch ? true : false, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<RequireBranch extends ImportBranch ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: resolution mode is narrower than arbitrary import attributes.
type _17 = Expect<Equal<ImportBranch extends ImportAttributes ? true : false, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<RequireBranch extends ImportAttributes ? true : false, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ResolutionAttributes<ResolutionMode>["resolution-mode"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof makeResolutionAttributes<ResolutionMode>>, TODO>>; // TODO(koan) @koan-error
