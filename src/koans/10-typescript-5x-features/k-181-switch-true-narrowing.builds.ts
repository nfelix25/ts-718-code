import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-181: switch (true) narrowing — constructions
 * =============================================================================
 *
 * `switch (true)` is a list of guards read in order. The first case whose
 * expression is true wins, and TypeScript 5.3 taught control flow to narrow
 * accordingly: inside a case body the value is what that guard admits, minus
 * whatever the earlier terminating cases already carried away.
 *
 * That "minus whatever came before" is the part worth modelling. A guard splits
 * a union into the part it matches and the part it misses; a *switch* threads
 * the missed part into the next guard, so each case sees a smaller union than
 * the one before it, and `default` sees what nothing claimed. Order therefore
 * changes meaning: a broad case placed early leaves a later specific case with
 * `never`, which is exactly the dead branch the compiler will not warn about.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type Mixed = "" | "ok" | 0 | 1 | false | true | null;
type Variant = { kind: "a"; a: string } | { kind: "b"; b: number } | { kind: "c" };

// ─── One guard at a time ──────────────────────────────────────────────

// 1. Build the union the switch will be run against — a value that can arrive as
//    text, a number, a list, or nothing at all.
export type GuardedValue = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<GuardedValue, string>, string>>;
type _01b = Expect<Equal<Extract<GuardedValue, null>, null>>;
type _01c = Expect<Equal<Exclude<GuardedValue, string | number | readonly unknown[]>, null>>;
type _01d = Expect<Equal<Extract<GuardedValue, object>, readonly unknown[]>>;
type _01e = Expect<Equal<keyof GuardedValue, never>>;

// 2. Build the positive half of a guard: the members that enter its case body.
//    Distribution over the union is the whole mechanism here.
export type MatchedBy<Union, Guard> = TODO; // TODO(koan)

type _02a = Expect<Equal<MatchedBy<GuardedValue, string>, string>>;
type _02b = Expect<Equal<MatchedBy<GuardedValue, string | null>, string | null>>;
type _02c = Expect<Equal<MatchedBy<GuardedValue, boolean>, never>>;
type _02d = Expect<Equal<MatchedBy<never, string>, never>>;
type _02e = Expect<Equal<MatchedBy<GuardedValue, object>, readonly unknown[]>>;

// 3. Build the negative half: what a failed case hands to the next one.
export type MissedBy<Union, Guard> = TODO; // TODO(koan)

type _03a = Expect<Equal<MissedBy<GuardedValue, string>, number | readonly unknown[] | null>>;
type _03b = Expect<
  Equal<MissedBy<GuardedValue, boolean>, string | number | readonly unknown[] | null>
>;
type _03c = Expect<Equal<MissedBy<GuardedValue, unknown>, never>>;
type _03d = Expect<Equal<MissedBy<never, string>, never>>;

// 4. Build the split that reports both halves at once — one case body plus the
//    union that survives it.
export type GuardSplit<Union, Guard> = TODO; // TODO(koan)

type _04a = Expect<Equal<GuardSplit<GuardedValue, string>["matched"], string>>;
type _04b = Expect<
  Equal<GuardSplit<GuardedValue, string>["rest"], number | readonly unknown[] | null>
>;
type _04c = Expect<Equal<keyof GuardSplit<GuardedValue, string>, "matched" | "rest">>;
type _04d = Expect<Equal<GuardSplit<never, string>["matched"], never>>;

// ─── Threading the guards in order ────────────────────────────────────

// 5. Build the case list of a concrete switch: text first, then numbers, then
//    lists. A tuple, because order is the point.
export type GuardOrder = TODO; // TODO(koan)

type _05a = Expect<Equal<GuardOrder["length"], 3>>;
type _05b = Expect<Equal<GuardOrder[0], string>>;
type _05c = Expect<Equal<GuardOrder[2], readonly unknown[]>>;
type _05d = Expect<Equal<GuardOrder[number], string | number | readonly unknown[]>>;

// 6. Build the fold that runs every guard in order and reports what is left —
//    the union `default` receives.
export type AfterAll<Union, Guards extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<AfterAll<GuardedValue, []>, string | number | readonly unknown[] | null>>;
type _06b = Expect<Equal<AfterAll<GuardedValue, [string]>, number | readonly unknown[] | null>>;
type _06c = Expect<Equal<AfterAll<GuardedValue, [string, number, readonly unknown[]]>, null>>;
type _06d = Expect<
  Equal<AfterAll<GuardedValue, [string, number, readonly unknown[], null]>, never>
>;

// 7. Build the exhaustiveness question: does anything at all reach `default`?
export type IsExhaustive<
  Union,
  Guards extends readonly unknown[],
> = TODO; // TODO(koan)

type _07a = Expect<Equal<IsExhaustive<GuardedValue, [string, number, readonly unknown[], null]>, true>>;
type _07b = Expect<Equal<IsExhaustive<GuardedValue, [string, number]>, false>>;
type _07c = Expect<Equal<IsExhaustive<GuardedValue, []>, false>>;
type _07d = Expect<Equal<IsExhaustive<never, []>, true>>;

// 8. Build the table of what each case body actually sees. Note the second
//    argument each guard receives: the union minus everything already claimed.
export type SliceReaching<
  Union,
  Guards extends readonly unknown[],
> = TODO; // TODO(koan)

type _08a = Expect<Equal<SliceReaching<GuardedValue, [string, number]>, [string, number]>>;
type _08b = Expect<Equal<SliceReaching<GuardedValue, [string, string]>, [string, never]>>;
type _08c = Expect<Equal<SliceReaching<GuardedValue, []>, []>>;
type _08d = Expect<
  Equal<
    SliceReaching<GuardedValue, [{}, readonly unknown[]]>,
    [string | number | readonly unknown[], never]
  >
>;

// 9. Build the lookup that says which case a single member lands in — its index,
//    or `"default"` when no guard claims it.
export type EnteredCase<
  Member,
  Guards extends readonly unknown[],
  Index extends readonly unknown[] = [],
> = TODO; // TODO(koan)

type _09a = Expect<Equal<EnteredCase<string, [string, number]>, 0>>;
type _09b = Expect<Equal<EnteredCase<number, [string, number]>, 1>>;
type _09c = Expect<Equal<EnteredCase<null, [string, number]>, "default">>;
type _09d = Expect<Equal<EnteredCase<string, [{}, string]>, 0>>;
type _09e = Expect<Equal<EnteredCase<never, [string, number]>, 0>>;

// 10. Build the dead-case detector: a case whose slice is `never` can never run,
//     because an earlier guard already took everything it wanted.
export type HasDeadCase<
  Union,
  Guards extends readonly unknown[],
> = TODO; // TODO(koan)

type _10a = Expect<Equal<HasDeadCase<GuardedValue, [string, number]>, false>>;
type _10b = Expect<Equal<HasDeadCase<GuardedValue, [string, string]>, true>>;
type _10c = Expect<Equal<HasDeadCase<GuardedValue, [{}, readonly unknown[]]>, true>>;
type _10d = Expect<Equal<HasDeadCase<GuardedValue, []>, false>>;

// ─── Guards that are not type tests ───────────────────────────────────

// 11. Build the set of values a bare `case value:` guard would reject — every
//     literal JavaScript considers falsy.
export type Falsy = TODO; // TODO(koan)

type _11a = Expect<Equal<Extract<Falsy, boolean>, false>>;
type _11b = Expect<Equal<Extract<Falsy, null | undefined>, null | undefined>>;
type _11c = Expect<Equal<Extract<Falsy, bigint>, 0n>>;
type _11d = Expect<Equal<Extract<string, Falsy>, never>>;

// 12. Build the truthy branch of such a guard.
export type TruthyPart<Union> = TODO; // TODO(koan)

type _12a = Expect<Equal<TruthyPart<Mixed>, "ok" | 1 | true>>;
type _12b = Expect<Equal<TruthyPart<boolean>, true>>;
type _12c = Expect<Equal<TruthyPart<string>, string>>;
type _12d = Expect<Equal<TruthyPart<number>, number>>;

// 13. Build its falsy branch.
export type FalsyPart<Union> = TODO; // TODO(koan)

type _13a = Expect<Equal<FalsyPart<Mixed>, "" | 0 | false | null>>;
type _13b = Expect<Equal<FalsyPart<boolean>, false>>;
type _13c = Expect<Equal<FalsyPart<string>, never>>;
type _13d = Expect<Equal<FalsyPart<GuardedValue>, null>>;

// 14. Report what a truthiness guard does and does not achieve. It partitions a
//     union of literals cleanly, but a wide `string` has no falsy member to
//     remove — so `""` walks straight into the truthy branch.
export type TruthinessProfile<Union> = TODO; // TODO(koan)

type _14a = Expect<Equal<TruthinessProfile<Mixed>["truthy"], "ok" | 1 | true>>;
type _14b = Expect<Equal<TruthinessProfile<Mixed>["falsy"], "" | 0 | false | null>>;
type _14c = Expect<Equal<TruthinessProfile<Mixed>["partitionsTheUnion"], true>>;
type _14d = Expect<Equal<TruthinessProfile<Mixed>["emptyStringSurvivesTheTruthyBranch"], false>>;
type _14e = Expect<Equal<TruthinessProfile<string>["emptyStringSurvivesTheTruthyBranch"], true>>;

// ─── Discriminants and ranges ─────────────────────────────────────────

// 15. Build the discriminant guard — the case `value.kind === k` written as a
//     type. This is the shape `switch (true)` replaces when the branches stop
//     sharing one tag.
export type VariantOf<Union, Kind> = TODO; // TODO(koan)

type _15a = Expect<Equal<VariantOf<Variant, "a">, { kind: "a"; a: string }>>;
type _15b = Expect<Equal<VariantOf<Variant, "c">, { kind: "c" }>>;
type _15c = Expect<
  Equal<VariantOf<Variant, "a" | "b">, { kind: "a"; a: string } | { kind: "b"; b: number }>
>;
type _15d = Expect<Equal<VariantOf<Variant, "missing">, never>>;

// 16. Build the guard a `case score === null:` branch leaves behind for
//     everything after it.
export type AfterNullCheck<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<AfterNullCheck<number | null>, number>>;
type _16b = Expect<Equal<AfterNullCheck<GuardedValue>, string | number | readonly unknown[]>>;
type _16c = Expect<Equal<AfterNullCheck<null>, never>>;
type _16d = Expect<Equal<AfterNullCheck<number>, number>>;

// 17. Report what the *range* cases of such a switch contribute. `score < 40`
//     is a genuine control-flow guard at runtime, but the type system has no
//     interval to narrow to: every numeric case body still sees `number`.
export type RangeGuardProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<RangeGuardProfile["beforeAnyCase"], number | null>>;
type _17b = Expect<Equal<RangeGuardProfile["afterTheNullCase"], number>>;
type _17c = Expect<Equal<RangeGuardProfile["afterTheLowCase"], number>>;
type _17d = Expect<Equal<RangeGuardProfile["comparisonsAddNoType"], true>>;
type _17e = Expect<Equal<RangeGuardProfile["numberHasNoSubrange"], never>>;

// 18. Report a whole switch at a glance: what each case sees, what falls through
//     to `default`, whether anything does, and whether any case is unreachable.
export type SwitchReport<Union, Guards extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<SwitchReport<GuardedValue, [string, number]>["cases"], [string, number]>>;
type _18b = Expect<
  Equal<
    SwitchReport<GuardedValue, [string, number]>["fallsThroughToDefault"],
    readonly unknown[] | null
  >
>;
type _18c = Expect<
  Equal<SwitchReport<GuardedValue, [string, number, readonly unknown[], null]>["exhaustive"], true>
>;
type _18d = Expect<Equal<SwitchReport<GuardedValue, [string, string]>["hasDeadCase"], true>>;
type _18e = Expect<Equal<SwitchReport<GuardedValue, []>["cases"], []>>;
