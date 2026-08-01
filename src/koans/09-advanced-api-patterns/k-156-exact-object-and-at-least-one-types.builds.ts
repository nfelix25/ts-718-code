import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-156: exact objects and at-least-one types — constructions
 * =============================================================================
 *
 * Structural assignability is open on purpose: a value may carry more keys than
 * the target mentions. The excess-property check that seems to prevent that is a
 * freshness courtesy at a literal, not an exact-object type — pass the same
 * value through a variable and the extra keys sail through. Exactness has to be
 * *computed*: compare the candidate's keys with the shape's and refuse when
 * anything is left over.
 *
 * `AtLeastOne` answers a different question — not "no extras" but "not empty".
 * It picks each key in turn, requires that one, and leaves the rest optional, so
 * every member of the union has at least one thing in it. Watch the modifiers:
 * `Required` and `Partial` rewrite optionality but carry `readonly` through, and
 * under `exactOptionalPropertyTypes` an explicit `undefined` does not count as
 * having supplied the key. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// A symbol key and a union shape, for the cases where "the keys" is not a
// simple finite list.
declare const symbolKey: unique symbol;
type GivenUnionShape = { a: 1 } | { b: 2 };

// ─── The machinery ────────────────────────────────────────────────────

// 1. Build the flattener, so a computed member reads as one object type.
export type Normalize<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Normalize<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>;
type _01b = Expect<Equal<Normalize<{ a?: 1 } & { b: 2 }>, { a?: 1; b: 2 }>>;
type _01c = Expect<Equal<keyof Normalize<{ a: 1 } & { b: 2 }>, "a" | "b">>;

// 2. Build the "not empty" combinator: choose each key in turn, require it,
//    leave the rest of the controlled subset optional, and keep everything
//    outside the subset exactly as it was.
export type AtLeastOne<Shape, Keys extends keyof Shape = keyof Shape> = TODO; // TODO(koan)

type _02a = Expect<Equal<keyof AtLeastOne<{ name?: string; email?: string }>, "name" | "email">>;
type _02b = Expect<Equal<Extract<AtLeastOne<{ name?: string; email?: string }>, { name: string }>["email"], string | undefined>>;
type _02c = Expect<Equal<Extract<AtLeastOne<{ name?: string; email?: string }>, { email: string }>["email"], string>>;
type _02d = Expect<Equal<AtLeastOne<{ only?: number }>, { only: number }>>;
type _02e = Expect<Equal<AtLeastOne<{ a?: 1; b?: 2 }, never>, never>>;

// 3. Build the grouped-presence combinator: either every controlled key is
//    there, or none of them is — which is a different rule from counting.
export type AllOrNone<Shape, Keys extends keyof Shape = keyof Shape> = TODO; // TODO(koan)

type _03a = Expect<Equal<AllOrNone<{ token?: string }>, { token: string } | { token?: never }>>;
type _03b = Expect<
  Equal<
    {
      allAccepted: GivenExtends<{ a: string; b: number }, AllOrNone<{ a?: string; b?: number }>>;
      halfRefused: GivenExtends<{ a: string }, AllOrNone<{ a?: string; b?: number }>>;
    },
    { allAccepted: true; halfRefused: false }
  >
>;
type _03c = Expect<
  Equal<
    {
      noneAccepted: GivenExtends<Record<never, never>, AllOrNone<{ a?: string; b?: number }>>;
      halfRefused: GivenExtends<{ a: string }, AllOrNone<{ a?: string; b?: number }>>;
    },
    { noneAccepted: true; halfRefused: false }
  >
>;
type _03d = Expect<Equal<AllOrNone<{ a?: string; b?: number }>["a"], string | undefined>>;
type _03e = Expect<Equal<keyof AllOrNone<Record<never, never>>, never>>;

// 4. Build the leftover-key operator — the evidence an exactness check needs.
export type ExtraKeys<Candidate, Shape> = TODO; // TODO(koan)

type _04a = Expect<Equal<ExtraKeys<{ host: string; port: number }, { host: string; port: number; secure?: boolean }>, never>>;
type _04b = Expect<Equal<ExtraKeys<{ host: string; debug: boolean }, { host: string }>, "debug">>;
type _04c = Expect<Equal<ExtraKeys<{ name: string; [symbolKey]: true }, { name: string }>, typeof symbolKey>>;
type _04d = Expect<Equal<ExtraKeys<{ 0: string }, Record<never, never>>, 0>>;
type _04e = Expect<Equal<ExtraKeys<{ name: string; extra: true }, Record<string, unknown>>, never>>;

// 5. Build the exactness predicate: assignable, and with nothing left over.
export type IsExactShape<Candidate, Shape> = TODO; // TODO(koan)

type _05a = Expect<Equal<IsExactShape<{ host: string; port: number }, ConnectionConfig>, true>>;
type _05b = Expect<Equal<IsExactShape<{ host: string; port: number; debug: true }, ConnectionConfig>, false>>;
type _05c = Expect<Equal<IsExactShape<{ host: string }, ConnectionConfig>, false>>;
type _05d = Expect<Equal<IsExactShape<{ name: string; [symbolKey]: true }, { name: string }>, false>>;
type _05e = Expect<Equal<IsExactShape<{ a: 1 }, GivenUnionShape>, false>>;

// 6. Build the boundary type a generic function would take: the candidate
//    itself, intersected with a mapping that types every leftover key as
//    something no value can supply.
export type Exact<Shape, Candidate extends Shape> = TODO; // TODO(koan)

type _06a = Expect<Equal<Exact<ConnectionConfig, { host: string; port: number; debug: true }>["debug"], never>>;
type _06b = Expect<Equal<Exact<ConnectionConfig, { host: string; port: number }>["host"], string>>;
type _06c = Expect<
  Equal<
    {
      exactCandidateStillFits: GivenExtends<{ host: string; port: number }, Exact<ConnectionConfig, { host: string; port: number }>>;
      extraKeyPoisoned: Equal<Exact<ConnectionConfig, { host: string; port: number; debug: true }>["debug"], never>;
    },
    { exactCandidateStillFits: true; extraKeyPoisoned: true }
  >
>;
type _06d = Expect<Equal<Exact<ConnectionConfig, { host: string; port: number; debug: true }>["port"], number>>;

// ─── The shapes they describe ─────────────────────────────────────────

// 7. Build the connection shape the exactness check is applied to.
export type ConnectionConfig = TODO; // TODO(koan)

type _07a = Expect<Equal<keyof ConnectionConfig, "host" | "port" | "secure">>;
type _07b = Expect<Equal<ConnectionConfig["secure"], boolean | undefined>>;
type _07c = Expect<
  Equal<
    {
      structurallyOpen: GivenExtends<{ host: string; port: number; debug: true }, ConnectionConfig>;
      butNotExact: IsExactShape<{ host: string; port: number; debug: true }, ConnectionConfig>;
    },
    { structurallyOpen: true; butNotExact: false }
  >
>;
type _07d = Expect<Equal<GivenExtends<{ host: string }, ConnectionConfig>, false>>;

// 8. Build the patch: a partial update that must change *something*.
export type UserPatch = TODO; // TODO(koan)

type _08a = Expect<Equal<keyof UserPatch, "name" | "email" | "active">>;
type _08b = Expect<Equal<Extract<UserPatch, { name: string }>["email"], string | undefined>>;
type _08c = Expect<Equal<Extract<UserPatch, { email: string }>["email"], string>>;
type _08d = Expect<
  Equal<
    {
      oneFieldAccepted: GivenExtends<{ name: string }, UserPatch>;
      emptyRefused: GivenExtends<Record<never, never>, UserPatch>;
    },
    { oneFieldAccepted: true; emptyRefused: false }
  >
>;
type _08e = Expect<
  Equal<
    {
      twoFieldsAccepted: GivenExtends<{ name: string; email: string }, UserPatch>;
      noFieldsRefused: GivenExtends<Record<never, never>, UserPatch>;
    },
    { twoFieldsAccepted: true; noFieldsRefused: false }
  >
>;

// 9. Build the request: an always-required identifier beside the non-empty
//    patch.
export type UpdateRequest = TODO; // TODO(koan)

type _09a = Expect<Equal<Extract<UpdateRequest, { active: boolean }>["id"], string>>;
type _09b = Expect<
  Equal<
    {
      idAndOneFieldAccepted: GivenExtends<{ id: string; name: string }, UpdateRequest>;
      idAloneRefused: GivenExtends<{ id: string }, UpdateRequest>;
    },
    { idAndOneFieldAccepted: true; idAloneRefused: false }
  >
>;
type _09c = Expect<Equal<GivenExtends<{ name: string }, UpdateRequest>, false>>;
type _09d = Expect<Equal<Extract<UpdateRequest, { name: string }>["email"], string | undefined>>;

// 10. Build the subset case: only two of the fields participate in the choice,
//     and the rest of the shape keeps its own requirements.
export type ContactRequest = TODO; // TODO(koan)

type _10a = Expect<Equal<Extract<ContactRequest, { email: string }>["id"], string>>;
type _10b = Expect<Equal<Extract<ContactRequest, { phone: string }>["email"], string | undefined>>;
type _10c = Expect<
  Equal<
    {
      idAndOneChannelAccepted: GivenExtends<{ id: string; email: string }, ContactRequest>;
      idAloneRefused: GivenExtends<{ id: string }, ContactRequest>;
    },
    { idAndOneChannelAccepted: true; idAloneRefused: false }
  >
>;
type _10d = Expect<Equal<GivenExtends<{ email: string }, ContactRequest>, false>>;

// 11. Build the grouped case: a credential pair that must arrive together or not
//     at all, beside a field that is always there.
export type AuthHeaders = TODO; // TODO(koan)

type _11a = Expect<Equal<Extract<AuthHeaders, { username: string }>["password"], string>>;
type _11b = Expect<Equal<Extract<AuthHeaders, { username?: never }>["requestId"], string>>;
type _11c = Expect<Equal<keyof AuthHeaders, "requestId" | "username" | "password">>;
type _11d = Expect<
  Equal<
    {
      bothAccepted: GivenExtends<{ requestId: string; username: string; password: string }, AuthHeaders>;
      neitherAccepted: GivenExtends<{ requestId: string }, AuthHeaders>;
      halfRefused: GivenExtends<{ requestId: string; username: string }, AuthHeaders>;
    },
    { bothAccepted: true; neitherAccepted: true; halfRefused: false }
  >
>;

// ─── What each rule actually enforces ─────────────────────────────────

// 12. Report the gap between assignability and exactness. The same candidate is
//     accepted structurally and rejected by the computed check, which is why
//     exactness has to be asked for explicitly.
export type ExactnessProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ExactnessProfile["assignable"], true>>;
type _12b = Expect<Equal<ExactnessProfile["exact"], false>>;
type _12c = Expect<Equal<ExactnessProfile["leftoverKeys"], "debug">>;
type _12d = Expect<Equal<ExactnessProfile["omittingAnOptionalIsStillExact"], true>>;
type _12e = Expect<Equal<ExactnessProfile["missingARequiredKeyIsNot"], false>>;

// 13. Report where the exactness check stops working. A broad index signature
//     already claims every string key, so nothing is ever left over; a union
//     shape has no shared key set to compare against; and the bottom type is
//     assignable everywhere but its key set is the widest there is.
export type ExactnessLimitProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ExactnessLimitProfile["againstABroadIndex"], true>>;
type _13b = Expect<Equal<ExactnessLimitProfile["leftoverAgainstABroadIndex"], never>>;
type _13c = Expect<Equal<ExactnessLimitProfile["sharedKeysOfAUnion"], never>>;
type _13d = Expect<Equal<ExactnessLimitProfile["againstAUnion"], false>>;
type _13e = Expect<Equal<ExactnessLimitProfile["againstTheBottomType"], false>>;

// 14. Report the non-empty rule. Every member requires exactly one field and
//     offers the rest, so supplying more is fine and supplying none is not.
export type NonEmptyProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NonEmptyProfile["oneAccepted"], true>>;
type _14b = Expect<Equal<NonEmptyProfile["manyAccepted"], true>>;
type _14c = Expect<Equal<NonEmptyProfile["noneRefused"], false>>;
type _14d = Expect<Equal<NonEmptyProfile["chosenFieldIsRequired"], string>>;
type _14e = Expect<Equal<NonEmptyProfile["unchosenFieldStaysOptional"], string | undefined>>;

// 15. Report the `undefined` rule. Supplying a key with an explicit `undefined`
//     is not the same as supplying it, so a patch cannot be satisfied that way —
//     unless the field's own type admits `undefined`, in which case it can.
export type UndefinedProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<UndefinedProfile["explicitUndefinedRefused"], false>>;
type _15b = Expect<Equal<UndefinedProfile["explicitUndefinedBesideARealFieldRefused"], false>>;
type _15c = Expect<Equal<UndefinedProfile["fieldThatAdmitsUndefined"], string | undefined>>;
type _15d = Expect<Equal<UndefinedProfile["omissionIsFine"], true>>;

// 16. Report what the modifier rewriting does and does not touch. `Required` and
//     `Partial` change optionality only — `readonly` rides through both — and an
//     empty choice set leaves no member at all.
export type ModifierProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<ModifierProfile["readonlyIsCarried"], { readonly a: 1; readonly b?: 2 } | { readonly b: 2; readonly a?: 1 }>
>;
type _16b = Expect<Equal<ModifierProfile["optionalityIsRewritten"], 1 | undefined>>;
type _16c = Expect<Equal<ModifierProfile["emptyChoiceSet"], never>>;
type _16d = Expect<Equal<ModifierProfile["broadIndexKeys"], string>>;

// ─── The two boundaries ───────────────────────────────────────────────

// 17. Build the API. The static constructor is generic in the candidate, which
//     is what lets the exactness check see the caller's own keys; the parser
//     takes `unknown`, because none of this describes runtime data.
export type ShapeApi = TODO; // TODO(koan)

type _17a = Expect<Equal<Parameters<ShapeApi["parseUserPatch"]>, [value: unknown]>>;
type _17b = Expect<
  Equal<
    { parsed: ReturnType<ShapeApi["parseUserPatch"]>; emptyPatchRefused: GivenExtends<Record<never, never>, UserPatch> },
    { parsed: UserPatch; emptyPatchRefused: false }
  >
>;
type _17c = Expect<Equal<Parameters<ShapeApi["defineConnection"]>["length"], 1>>;
type _17d = Expect<
  Equal<
    { pinned: ReturnType<typeof defineExactConnection>; emptyPatchRefused: GivenExtends<Record<never, never>, UserPatch> },
    { pinned: { host: string; port: number }; emptyPatchRefused: false }
  >
>;

declare const defineExactConnection: (
  config: Exact<ConnectionConfig, { host: string; port: number }>,
) => { host: string; port: number };

// 18. Report a candidate at a glance: whether it fits, whether it fits exactly,
//     what it brought along that was not asked for, and whether it said
//     anything at all.
export type CandidateReport<Candidate, Shape> = TODO; // TODO(koan)

type _18a = Expect<Equal<CandidateReport<{ host: string; port: number }, ConnectionConfig>["exact"], true>>;
type _18b = Expect<Equal<CandidateReport<{ host: string; port: number; debug: true }, ConnectionConfig>["exact"], false>>;
type _18c = Expect<Equal<CandidateReport<{ host: string; port: number; debug: true }, ConnectionConfig>["leftover"], "debug">>;
type _18d = Expect<Equal<CandidateReport<{ host: string; port: number; debug: true }, ConnectionConfig>["assignable"], true>>;
type _18e = Expect<Equal<CandidateReport<Record<never, never>, ConnectionConfig>["empty"], true>>;
