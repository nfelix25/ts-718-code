import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-210: strict-adjacent hardening flags — constructions
 * =============================================================================
 *
 * `strict` is a baseline. The flags next to it each encode a stronger model that
 * is not right for every project — exact optional presence, indexed reads that
 * admit absence, brackets for index-signature keys, declared override intent,
 * and switch/import hygiene — which is exactly why they stayed independent. Each
 * one can turn a large existing codebase red on its own.
 *
 * Three of them change *types* rather than merely reporting, and those are the
 * ones worth building: `exactOptionalPropertyTypes` separates "absent" from
 * "present and undefined", `noUncheckedIndexedAccess` adds `undefined` to open
 * reads, and `noPropertyAccessFromIndexSignature` changes only the syntax you
 * are allowed to write. Build the policy table and those three effects.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The flags ────────────────────────────────────────────────────────

// 1. Build the hardening flags this koan collects.
export type HardeningFlag = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    HardeningFlag,
    | "exactOptionalPropertyTypes"
    | "noUncheckedIndexedAccess"
    | "noPropertyAccessFromIndexSignature"
    | "noImplicitOverride"
    | "noFallthroughCasesInSwitch"
    | "noUncheckedSideEffectImports"
  >
>;
type _01b = Expect<
  Equal<
    Extract<HardeningFlag, `noUnchecked${string}`>,
    "noUncheckedIndexedAccess" | "noUncheckedSideEffectImports"
  >
>;
type _01c = Expect<Equal<Extract<HardeningFlag, "strictNullChecks">, never>>;
type _01d = Expect<Equal<Extract<HardeningFlag, `exact${string}`>, "exactOptionalPropertyTypes">>;

// 2. Build what each flag is about.
export type HardeningOutcome = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    HardeningOutcome,
    "presence" | "indexed-undefined" | "index-syntax" | "override-intent" | "switch-flow" | "side-effect-resolution"
  >
>;
type _02b = Expect<Equal<Extract<HardeningOutcome, `index-${string}`>, "index-syntax">>;
type _02c = Expect<Equal<Extract<HardeningOutcome, "presence">, "presence">>;
type _02d = Expect<Equal<Extract<HardeningOutcome, "nullability">, never>>;

// 3. Build the mapping between them.
export type OutcomeFor<Flag extends HardeningFlag> = TODO; // TODO(koan)

type _03a = Expect<Equal<OutcomeFor<"exactOptionalPropertyTypes">, "presence">>;
type _03b = Expect<Equal<OutcomeFor<"noUncheckedIndexedAccess">, "indexed-undefined">>;
type _03c = Expect<Equal<OutcomeFor<"noImplicitOverride">, "override-intent">>;
type _03d = Expect<Equal<OutcomeFor<"noUncheckedSideEffectImports">, "side-effect-resolution">>;
type _03e = Expect<
  Equal<
    OutcomeFor<HardeningFlag>,
    "presence" | "indexed-undefined" | "index-syntax" | "override-intent" | "switch-flow" | "side-effect-resolution"
  >
>;

// 4. Build the distinction that decides whether a flag can change a *type* or
//    only report on code.
export type ChangesTypes<Flag extends HardeningFlag> = TODO; // TODO(koan)

type _04a = Expect<Equal<ChangesTypes<"exactOptionalPropertyTypes">, true>>;
type _04b = Expect<Equal<ChangesTypes<"noUncheckedIndexedAccess">, true>>;
type _04c = Expect<Equal<ChangesTypes<"noPropertyAccessFromIndexSignature">, false>>;
type _04d = Expect<Equal<ChangesTypes<"noFallthroughCasesInSwitch">, false>>;
type _04e = Expect<Equal<ChangesTypes<HardeningFlag>, boolean>>;

// ─── Exact optional properties ────────────────────────────────────────

// 5. Build the optional property under the old model, where an optional
//    declaration silently admits an explicit `undefined`.
export type LooseOptional<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<LooseOptional<string>["value"], string | undefined>>;
type _05b = Expect<
  Equal<
    {
      itAcceptsAnExplicitUndefined: GivenExtends<{ value: undefined }, LooseOptional<string>>;
      andRequiringItKeepsThatUndefined: Required<LooseOptional<string>>["value"];
    },
    { itAcceptsAnExplicitUndefined: true; andRequiringItKeepsThatUndefined: string | undefined }
  >
>;
type _05c = Expect<
  Equal<
    {
      itAcceptsAbsence: GivenExtends<{}, LooseOptional<string>>;
      andHasExactlyOneKey: keyof LooseOptional<string>;
    },
    { itAcceptsAbsence: true; andHasExactlyOneKey: "value" }
  >
>;
type _05d = Expect<Equal<Required<LooseOptional<string>>["value"], string | undefined>>;

// 6. Build the same property under the exact model: absent or a real value, and
//    those are different things.
export type ExactOptional<Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<ExactOptional<string>["value"], string | undefined>>;
type _06b = Expect<Equal<GivenExtends<{ value: undefined }, ExactOptional<string>>, false>>;
type _06c = Expect<
  Equal<
    {
      itStillAcceptsAbsence: GivenExtends<{}, ExactOptional<string>>;
      andHasExactlyOneKey: keyof ExactOptional<string>;
    },
    { itStillAcceptsAbsence: true; andHasExactlyOneKey: "value" }
  >
>;
type _06d = Expect<Equal<Required<ExactOptional<string>>["value"], string>>;

// 7. Report the difference the flag actually makes. Reading is the same either
//    way; writing is not.
export type PresenceProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<PresenceProfile["bothReadTheSame"], true>>;
type _07b = Expect<Equal<PresenceProfile["looseAcceptsExplicitUndefined"], true>>;
type _07c = Expect<Equal<PresenceProfile["exactDoesNot"], false>>;
type _07d = Expect<Equal<PresenceProfile["bothAcceptAbsence"], true>>;
type _07e = Expect<Equal<PresenceProfile["andRequiredDisagrees"], false>>;

// ─── Unchecked indexed access ─────────────────────────────────────────

// 8. Build an open collection — one whose keys are not a finite set. The
//    indexed-access *type* reads as the value type; the `undefined` the flag
//    adds is applied where the read is written, which construction 9 models.
export type OpenRecord<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<keyof OpenRecord<number>, string>>;
type _08b = Expect<
  Equal<
    {
      everyKeyReadsTheValueType: OpenRecord<number>["anything"];
      andTheKeyDomainIsOpen: keyof OpenRecord<number>;
    },
    { everyKeyReadsTheValueType: number; andTheKeyDomainIsOpen: string }
  >
>;
type _08c = Expect<
  Equal<
    {
      aRecordWithSomeKeysFits: GivenExtends<{ a: 1 }, OpenRecord<number>>;
      andTheValueTypeIsWhatItSays: OpenRecord<number>["a"];
    },
    { aRecordWithSomeKeysFits: true; andTheValueTypeIsWhatItSays: number }
  >
>;
type _08d = Expect<
  Equal<
    {
      soDoesOneWithNoKeysAtAll: GivenExtends<{}, OpenRecord<number>>;
      whichIsWhyTheKeyDomainIsWide: keyof OpenRecord<number>;
    },
    { soDoesOneWithNoKeysAtAll: true; whichIsWhyTheKeyDomainIsWide: string }
  >
>;

// 9. Build the read under each setting. The flag's whole content is one added
//    `undefined` on reads the compiler cannot prove are present.
export type IndexedRead<Value, Checked extends boolean> = TODO; // TODO(koan)

type _09a = Expect<Equal<IndexedRead<number, true>, number | undefined>>;
type _09b = Expect<Equal<IndexedRead<number, false>, number>>;
type _09c = Expect<Equal<NonNullable<IndexedRead<number, true>>, number>>;
type _09d = Expect<Equal<Equal<IndexedRead<number, true>, IndexedRead<number, false>>, false>>;

// 10. Build the reads it does *not* touch: a declared property and a tuple index
//     are both provably present.
export type ProvablyPresent<Owner, Key extends keyof Owner> = TODO; // TODO(koan)

type _10a = Expect<Equal<ProvablyPresent<{ a: number }, "a">, number>>;
type _10b = Expect<Equal<ProvablyPresent<[string, number], 0>, string>>;
type _10c = Expect<Equal<ProvablyPresent<readonly string[], number>, string>>;
type _10d = Expect<Equal<ProvablyPresent<{ a?: number }, "a">, number | undefined>>;

// ─── Index-signature access syntax ────────────────────────────────────

// 11. Build the two ways to reach a key, and which one the flag permits for an
//     index signature.
export type AccessSyntaxFor<
  Origin extends "declared" | "index-signature",
  Flag extends "on" | "off",
> = TODO; // TODO(koan)

type _11a = Expect<Equal<AccessSyntaxFor<"declared", "on">, "dot or bracket">>;
type _11b = Expect<Equal<AccessSyntaxFor<"index-signature", "on">, "bracket only">>;
type _11c = Expect<Equal<AccessSyntaxFor<"index-signature", "off">, "dot or bracket">>;
type _11d = Expect<Equal<AccessSyntaxFor<"declared", "off">, "dot or bracket">>;

// 12. Build the fact that makes the flag worth having: the *type* is identical
//     either way, so only the syntax was ever carrying the distinction.
export type SyntaxOnlyProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<SyntaxOnlyProfile["theDeclaredRead"], number>>;
type _12b = Expect<Equal<SyntaxOnlyProfile["theIndexedRead"], number | undefined>>;
type _12c = Expect<Equal<SyntaxOnlyProfile["theFlagChangesNoType"], false>>;
type _12d = Expect<Equal<SyntaxOnlyProfile["itOnlyChangesWhatYouMayWrite"], "bracket only">>;

// ─── Turning them on ──────────────────────────────────────────────────

// 13. Build a settings object over the flags, so a project's position can be
//     stated rather than assumed.
export type Hardening<Enabled extends readonly HardeningFlag[]> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<Hardening<["noUncheckedIndexedAccess"]>["noUncheckedIndexedAccess"], true>
>;
type _13b = Expect<Equal<Hardening<["noUncheckedIndexedAccess"]>["noImplicitOverride"], false>>;
type _13c = Expect<Equal<keyof Hardening<[]>, HardeningFlag>>;
type _13d = Expect<Equal<Hardening<[]>[HardeningFlag], false>>;

// 14. Build the read a given project actually gets from an open record.
export type ReadUnder<Value, Enabled extends readonly HardeningFlag[]> = TODO; // TODO(koan)

type _14a = Expect<Equal<ReadUnder<number, ["noUncheckedIndexedAccess"]>, number | undefined>>;
type _14b = Expect<Equal<ReadUnder<number, []>, number>>;
type _14c = Expect<Equal<ReadUnder<number, ["noImplicitOverride"]>, number>>;
type _14d = Expect<
  Equal<NonNullable<ReadUnder<number, ["noUncheckedIndexedAccess"]>>, number>
>;

// 15. Build the optional property a given project actually gets.
export type OptionalUnder<Value, Enabled extends readonly HardeningFlag[]> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    GivenExtends<{ value: undefined }, OptionalUnder<string, ["exactOptionalPropertyTypes"]>>,
    false
  >
>;
type _15b = Expect<
  Equal<
    {
      withoutTheFlagAnExplicitUndefinedFits: GivenExtends<
        { value: undefined },
        OptionalUnder<string, []>
      >;
      andRequiringItKeepsThatUndefined: Required<OptionalUnder<string, []>>["value"];
    },
    { withoutTheFlagAnExplicitUndefinedFits: true; andRequiringItKeepsThatUndefined: string | undefined }
  >
>;
type _15c = Expect<
  Equal<
    {
      absenceIsFineEitherWay: GivenExtends<{}, OptionalUnder<string, ["exactOptionalPropertyTypes"]>>;
      andTheKeyIsTheSame: keyof OptionalUnder<string, ["exactOptionalPropertyTypes"]>;
    },
    { absenceIsFineEitherWay: true; andTheKeyIsTheSame: "value" }
  >
>;
type _15d = Expect<
  Equal<Required<OptionalUnder<string, ["exactOptionalPropertyTypes"]>>["value"], string>
>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the table of flags and what each one is about.
export type FlagProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<FlagProfile["exactOptionalPropertyTypes"], "presence">>;
type _16b = Expect<Equal<FlagProfile["noUncheckedIndexedAccess"], "indexed-undefined">>;
type _16c = Expect<Equal<FlagProfile["noFallthroughCasesInSwitch"], "switch-flow">>;
type _16d = Expect<Equal<keyof FlagProfile, HardeningFlag>>;

// 17. Report which of them a reader will see in the types, and which only ever
//     show up as diagnostics.
export type EffectProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<EffectProfile["presenceIsVisibleInTypes"], true>>;
type _17b = Expect<Equal<EffectProfile["indexedUndefinedIsVisibleInTypes"], true>>;
type _17c = Expect<Equal<EffectProfile["accessSyntaxIsNot"], false>>;
type _17d = Expect<Equal<EffectProfile["switchFlowIsNot"], false>>;
type _17e = Expect<Equal<EffectProfile["andNoneOfThemComeWithStrict"], never>>;

// 18. Report one project at a glance: which flags it has, what an open read
//     gives it, and what an optional property means in it.
export type HardeningReport<Enabled extends readonly HardeningFlag[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<HardeningReport<["noUncheckedIndexedAccess"]>["openRead"], number | undefined>
>;
type _18b = Expect<Equal<HardeningReport<[]>["openRead"], number>>;
type _18c = Expect<
  Equal<HardeningReport<["exactOptionalPropertyTypes"]>["optionalAcceptsExplicitUndefined"], false>
>;
type _18d = Expect<
  Equal<HardeningReport<["noPropertyAccessFromIndexSignature"]>["indexSignatureAccess"], "bracket only">
>;
type _18e = Expect<Equal<HardeningReport<[]>["indexSignatureAccess"], "dot or bracket">>;
