import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-155: XOR and exactly-one types — constructions
 * =============================================================================
 *
 * Object unions are inclusive. `{ email: string } | { phone: string }` accepts a
 * value carrying both, because a value that satisfies one member does not stop
 * satisfying it by having more. Making a choice exclusive therefore means
 * encoding *absence* as well as presence: each member has to say that the other
 * side's keys may be omitted but may not be supplied.
 *
 * The tool for that is an optional property typed `never`. Under
 * `exactOptionalPropertyTypes` there is no value that satisfies it — not even
 * `undefined` — so the key can only be missing, while reading it still answers
 * `undefined` the way any absent optional does. Keys the two sides *share* are
 * never forbidden, because forbidding them would make the choice unsatisfiable.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The inclusive union these constructions exist to replace.
type GivenInclusive = { email: string } | { phone: string };

// ─── The absence machinery ────────────────────────────────────────────

// 1. Build the flattener that turns an intersection back into one object type,
//    so an exclusive member reads as a shape rather than as an expression.
export type Normalize<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Normalize<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>;
type _01b = Expect<Equal<Normalize<{ a: 1 }>, { a: 1 }>>;
type _01c = Expect<Equal<keyof Normalize<{ a: 1 } & { b: 2 }>, "a" | "b">>;

// 2. Build the key collector that works across a *union*. Plain `keyof` on a
//    union answers with the keys every member shares; distributing first
//    collects the keys any member has.
export type KeysOfUnion<Union> = TODO; // TODO(koan)

type _02a = Expect<Equal<KeysOfUnion<{ a: 1 } | { b: 2 }>, "a" | "b">>;
type _02b = Expect<
  Equal<
    { collected: KeysOfUnion<GivenInclusive>; shared: keyof GivenInclusive },
    { collected: "email" | "phone"; shared: never }
  >
>;
type _02c = Expect<Equal<KeysOfUnion<never>, never>>;
type _02d = Expect<Equal<KeysOfUnion<{ a: 1 }>, "a">>;

// 3. Build the forbidding transform: every key of a shape except the allowed
//    ones, each made optional and given a type nothing can satisfy.
export type Without<Shape, Allowed extends PropertyKey> = TODO; // TODO(koan)

type _03a = Expect<Equal<Without<{ username: string; password: string }, "username">, { password?: never }>>;
type _03b = Expect<Equal<Without<{ email: string; phone: string }, "email">, { phone?: never }>>;
type _03c = Expect<Equal<Without<{ a: 1 }, "a">, Record<never, never>>>;
type _03d = Expect<Equal<Required<Without<{ phone: string }, never>>["phone"], never>>;

// ─── The exclusive combinators ────────────────────────────────────────

// 4. Build the two-way exclusive choice: each side keeps its own keys and
//    forbids the keys unique to the other. Shared keys are excluded from the
//    forbidding, or no value could satisfy either side.
export type Xor<Left, Right> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    Extract<Xor<{ token: string }, { username: string; password: string }>, { token: string }>,
    { token: string; username?: never; password?: never }
  >
>;
type _04b = Expect<
  Equal<
    {
      inclusiveAcceptsBoth: GivenExtends<{ email: string; phone: string }, GivenInclusive>;
      exclusiveRefusesBoth: GivenExtends<{ email: string; phone: string }, Xor<{ email: string }, { phone: string }>>;
    },
    { inclusiveAcceptsBoth: true; exclusiveRefusesBoth: false }
  >
>;
type _04c = Expect<Equal<Extract<Xor<{ email: string }, { phone: string }>, { email: string }>["phone"], undefined>>;
type _04d = Expect<Equal<Xor<{ value: string }, { value: number }>, { value: string } | { value: number }>>;
type _04e = Expect<Equal<Xor<never, { b: 2 }>, never>>;

// 5. Build the n-way exclusive choice over the keys of one shape: pick each key
//    in turn, require it, forbid the others, and keep whatever is outside the
//    choice untouched.
export type ExactlyOne<Shape, Keys extends keyof Shape = keyof Shape> = TODO; // TODO(koan)

type _05a = Expect<Equal<KeysOfUnion<ExactlyOne<{ email: string; phone: string; slack: string }>>, "email" | "phone" | "slack">>;
type _05b = Expect<
  Equal<Extract<ExactlyOne<{ email: string; phone: string; slack: string }>, { email: string }>["phone"], undefined>
>;
type _05c = Expect<Equal<ExactlyOne<{ email: string; phone: string; slack: string }>["email"], string | undefined>>;
type _05d = Expect<
  Equal<Extract<ExactlyOne<{ id: string; email?: string; phone?: string }, "email" | "phone">, { email: string }>["id"], string>
>;
type _05e = Expect<Equal<ExactlyOne<{ a: 1; b: 2 }, never>, never>>;

// 6. Build the relaxed variant: the exclusive choice, or none of them at all.
export type AtMostOne<Shape, Keys extends keyof Shape = keyof Shape> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    Extract<AtMostOne<{ email: string; phone: string }>, { email?: never; phone?: never }>,
    { email?: never; phone?: never }
  >
>;
type _06b = Expect<
  Equal<
    {
      noneIsAllowed: GivenExtends<Record<never, never>, AtMostOne<{ email: string; phone: string }>>;
      bothIsNot: GivenExtends<{ email: string; phone: string }, AtMostOne<{ email: string; phone: string }>>;
    },
    { noneIsAllowed: true; bothIsNot: false }
  >
>;
type _06c = Expect<Equal<AtMostOne<{ a: 1; b: 2 }, never>, { a: 1; b: 2 }>>;
type _06d = Expect<Equal<KeysOfUnion<AtMostOne<{ email: string; phone: string }>>, "email" | "phone">>;

// 7. Build the transform that makes an existing union exclusive, by forbidding
//    on each member every key the union has but that member does not.
export type ExclusiveUnion<Union, All = Union> = TODO; // TODO(koan)

type _07a = Expect<Equal<KeysOfUnion<ExclusiveUnion<{ a: 1 } | { b: 2 } | { c: 3 }>>, "a" | "b" | "c">>;
type _07b = Expect<
  Equal<
    {
      exclusiveRefusesTwoBranches: GivenExtends<{ a: 1; c: 3 }, ExclusiveUnion<{ a: 1 } | { b: 2 } | { c: 3 }>>;
      inclusiveWouldAcceptThem: GivenExtends<{ a: 1; c: 3 }, { a: 1 } | { b: 2 } | { c: 3 }>;
    },
    { exclusiveRefusesTwoBranches: false; inclusiveWouldAcceptThem: true }
  >
>;
type _07c = Expect<Equal<ExclusiveUnion<{ common: 0; a: 1 } | { common: 0; b: 2 }>["common"], 0>>;
type _07d = Expect<Equal<keyof ExclusiveUnion<{ a: 1 } | { b: 2 } | { c: 3 }>, "a" | "b" | "c">>;

// ─── The APIs they describe ───────────────────────────────────────────

// 8. Build the credential choice: a token, or a username and password, never a
//    mixture.
export type Credentials = TODO; // TODO(koan)

type _08a = Expect<Equal<KeysOfUnion<Credentials>, "token" | "username" | "password">>;
type _08b = Expect<Equal<Extract<Credentials, { token: string }>, { token: string; username?: never; password?: never }>>;
type _08c = Expect<Equal<Extract<Credentials, { username: string }>["password"], string>>;
type _08d = Expect<Equal<Extract<Credentials, { username: string }>["token"], undefined>>;
type _08e = Expect<
  Equal<
    {
      halfOfTheSecondSideRefused: GivenExtends<{ username: string }, Credentials>;
      bothSidesRefused: GivenExtends<{ token: string; username: string; password: string }, Credentials>;
    },
    { halfOfTheSecondSideRefused: false; bothSidesRefused: false }
  >
>;

// 9. Build the contact: a shared field beside an exclusive channel.
export type Contact = TODO; // TODO(koan)

type _09a = Expect<Equal<Extract<Contact, { phone: string }>["label"], string>>;
type _09b = Expect<Equal<Extract<Contact, { phone: string }>["email"], undefined>>;
type _09c = Expect<Equal<KeysOfUnion<Contact>, "label" | "email" | "phone" | "slack">>;
type _09d = Expect<
  Equal<
    {
      oneChannelAccepted: GivenExtends<{ label: string; email: string }, Contact>;
      twoChannelsRefused: GivenExtends<{ label: string; email: string; phone: string }, Contact>;
    },
    { oneChannelAccepted: true; twoChannelsRefused: false }
  >
>;

// 10. Build the destination: three variants, each with its own optional extras,
//     made exclusive after the fact.
export type Destination = TODO; // TODO(koan)

type _10a = Expect<Equal<KeysOfUnion<Destination>, "file" | "encoding" | "url" | "headers" | "stream">>;
type _10b = Expect<Equal<Extract<Destination, { file: string }>["url"], undefined>>;
type _10c = Expect<Equal<Extract<Destination, { url: URL }>["headers"], Readonly<Record<string, string>> | undefined>>;
type _10d = Expect<Equal<Extract<Destination, { stream: object }>["file"], undefined>>;
type _10e = Expect<
  Equal<
    {
      oneVariantAccepted: GivenExtends<{ file: string }, Destination>;
      twoVariantsRefused: GivenExtends<{ file: string; stream: { write(chunk: string): void } }, Destination>;
    },
    { oneVariantAccepted: true; twoVariantsRefused: false }
  >
>;

// ─── What the encoding actually promises ──────────────────────────────

// 11. Report the difference the absence constraint makes. Both unions accept a
//     single choice; only the exclusive one refuses the combination.
export type ExclusivityProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExclusivityProfile["inclusiveAcceptsOne"], true>>;
type _11b = Expect<Equal<ExclusivityProfile["inclusiveAcceptsBoth"], true>>;
type _11c = Expect<Equal<ExclusivityProfile["exclusiveAcceptsOne"], true>>;
type _11d = Expect<Equal<ExclusivityProfile["exclusiveRefusesBoth"], false>>;
type _11e = Expect<Equal<ExclusivityProfile["exclusiveRefusesNeither"], false>>;

// 12. Report how the forbidden key behaves. It cannot be supplied — not even as
//     `undefined` — yet reading it answers `undefined` like any absent optional,
//     and making it required leaves nothing behind.
export type AbsenceProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<AbsenceProfile["readsAsAbsent"], undefined>>;
type _12b = Expect<Equal<AbsenceProfile["requiredIsEmpty"], never>>;
type _12c = Expect<Equal<AbsenceProfile["explicitUndefinedRefused"], false>>;
type _12d = Expect<Equal<AbsenceProfile["omissionAccepted"], true>>;
type _12e = Expect<Equal<AbsenceProfile["keySetIsTheSameOnBothSides"], "email" | "phone">>;

// 13. Report the shared-key rule. Keys both sides declare are left alone, so a
//     discriminant and a common payload survive the transform; only the keys
//     unique to one side are forbidden on the other.
export type SharedKeyProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<SharedKeyProfile["allKeys"], "kind" | "value" | "left" | "right">>;
type _13b = Expect<Equal<SharedKeyProfile["sharedDiscriminant"], "left" | "right">>;
type _13c = Expect<Equal<SharedKeyProfile["sharedPayload"], string | number>>;
type _13d = Expect<Equal<SharedKeyProfile["uniqueKeyForbidden"], undefined>>;
type _13e = Expect<Equal<SharedKeyProfile["bothUniqueKeysRefused"], false>>;

// 14. Report the n-way case, where every member has to forbid every other
//     member's keys rather than just one opposite side's.
export type NWayProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NWayProfile["keys"], "a" | "b" | "c">>;
type _14b = Expect<Equal<NWayProfile["sharedKeys"], "a" | "b" | "c">>;
type _14c = Expect<Equal<NWayProfile["firstAndThirdRefused"], false>>;
type _14d = Expect<Equal<NWayProfile["oneBranchAccepted"], true>>;
type _14e = Expect<Equal<NWayProfile["commonFieldSurvives"], 0>>;

// 15. Report the degenerate inputs. An empty choice set has no member to pick,
//     the bottom type propagates through the distributive step, and a broad
//     index signature cannot enumerate a single chosen key.
export type DegenerateProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<DegenerateProfile["noChoices"], never>>;
type _15b = Expect<Equal<DegenerateProfile["noChoicesRelaxed"], { a: 1; b: 2 }>>;
type _15c = Expect<Equal<DegenerateProfile["fromBottom"], never>>;
type _15d = Expect<Equal<DegenerateProfile["keysOfBottom"], never>>;
type _15e = Expect<Equal<DegenerateProfile["broadIndexKeys"], string>>;

// 16. Report the case where the chosen property's own type already includes
//     `undefined`. Choosing it is still choosing it, and the unchosen keys read
//     back the same way — which is exactly why presence, not value, is what a
//     runtime guard has to check.
export type UndefinedChoiceProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<UndefinedChoiceProfile["chosenValue"], string | undefined>>;
type _16b = Expect<Equal<UndefinedChoiceProfile["unchosenValue"], undefined>>;
type _16c = Expect<Equal<UndefinedChoiceProfile["keys"], "a" | "b">>;
type _16d = Expect<Equal<UndefinedChoiceProfile["bothRefused"], false>>;

// ─── The runtime boundary ─────────────────────────────────────────────

// 17. Build the guard signatures. None of this describes unknown data, so a
//     value arriving from outside has to be checked by counting present keys —
//     the runtime spelling of the same rule.
export type GuardApi = TODO; // TODO(koan)

type _17a = Expect<Equal<Parameters<GuardApi["exactlyOnePresent"]>[1], readonly PropertyKey[]>>;
type _17b = Expect<Equal<ReturnType<GuardApi["exactlyOnePresent"]>, boolean>>;
type _17c = Expect<
  Equal<
    { parsed: ReturnType<GuardApi["parseContact"]>; bothChannelsRefused: GivenExtends<{ label: string; email: string; phone: string }, Contact> },
    { parsed: Contact; bothChannelsRefused: false }
  >
>;
type _17d = Expect<
  Equal<
    { demanded: Parameters<GuardApi["describeCredentials"]>[0]; bothSidesRefused: GivenExtends<{ token: string; username: string; password: string }, Credentials> },
    { demanded: Credentials; bothSidesRefused: false }
  >
>;

// 18. Report a choice at a glance: what may be picked, what a picked member
//     forbids, and whether picking nothing is allowed.
export type ChoiceReport<Shape> = TODO; // TODO(koan)

type _18a = Expect<Equal<ChoiceReport<{ email: string; phone: string }>["choices"], "email" | "phone">>;
type _18b = Expect<Equal<ChoiceReport<{ email: string; phone: string }>["requiresOne"], false>>;
type _18c = Expect<Equal<ChoiceReport<{ email: string; phone: string }>["relaxedAllowsNone"], true>>;
type _18d = Expect<Equal<ChoiceReport<{ email: string; phone: string }>["isEmpty"], false>>;
type _18e = Expect<Equal<ChoiceReport<Record<never, never>>["isEmpty"], true>>;
