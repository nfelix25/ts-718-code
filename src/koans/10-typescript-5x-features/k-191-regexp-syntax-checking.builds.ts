import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-191: regular expression syntax checking — constructions
 * =============================================================================
 *
 * TypeScript 5.5 started reading regex *literals* properly: unbalanced
 * parentheses, unknown flags, a `\1` with no first group, a `\k<name>` naming a
 * group that was never opened, and syntax newer than the configured target are
 * all reported where they are written. Nothing about the runtime changed — no
 * downlevelling, no new checks on `new RegExp(source)`, because that argument is
 * a string the compiler has no reason to parse.
 *
 * The parsing work is the point of this file. Every rule above can be written as
 * a type over the literal's characters: validate a flag string one character at
 * a time, track nesting depth with a tuple, collect `(?<name>` declarations and
 * `\k<name>` references and compare them. Build the checker, then the ordinary
 * `RegExp` surface a matched result still has to be read through.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The vocabulary ───────────────────────────────────────────────────

// 1. Build the categories a literal can be reported under, plus the one that
//    means "nothing to say".
export type RegexDiagnosticKind = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    RegexDiagnosticKind,
    "unexpected-token" | "missing-group" | "invalid-flag" | "target-too-old" | "valid"
  >
>;
type _01b = Expect<
  Equal<
    Exclude<RegexDiagnosticKind, "valid">,
    "unexpected-token" | "missing-group" | "invalid-flag" | "target-too-old"
  >
>;
type _01c = Expect<Equal<Extract<RegexDiagnosticKind, `${string}-group`>, "missing-group">>;
type _01d = Expect<Equal<Extract<RegexDiagnosticKind, "runtime-error">, never>>;

// 2. Build one row of the matrix: what was written, and what should come of it.
export type RegexCase = TODO; // TODO(koan)

type _02a = Expect<Equal<RegexCase["source"], string>>;
type _02b = Expect<Equal<keyof RegexCase, "source" | "flags" | "expected">>;
type _02c = Expect<
  Equal<
    RegexCase["expected"],
    "unexpected-token" | "missing-group" | "invalid-flag" | "target-too-old" | "valid"
  >
>;
type _02d = Expect<Equal<Extract<RegexCase["expected"], "valid">, "valid">>;

// ─── Checking the flags ───────────────────────────────────────────────

// 3. Build the set of flags a literal may carry.
export type KnownFlag = TODO; // TODO(koan)

type _03a = Expect<Equal<KnownFlag, "d" | "g" | "i" | "m" | "s" | "u" | "v" | "y">>;
type _03b = Expect<Equal<Extract<KnownFlag, "u" | "v">, "u" | "v">>;
type _03c = Expect<Equal<Extract<KnownFlag, "z">, never>>;
type _03d = Expect<Equal<Exclude<KnownFlag, "d" | "g" | "i" | "m" | "s">, "u" | "v" | "y">>;

// 4. Build the flag-string checker. A flag string is several flags run together,
//    so this has to walk it a character at a time.
export type FlagsAreValid<Flags extends string> = TODO; // TODO(koan)

type _04a = Expect<Equal<FlagsAreValid<"u">, true>>;
type _04b = Expect<Equal<FlagsAreValid<"giu">, true>>;
type _04c = Expect<Equal<FlagsAreValid<"">, true>>;
type _04d = Expect<Equal<FlagsAreValid<"z">, false>>;
type _04e = Expect<Equal<FlagsAreValid<"gz">, false>>;

// ─── Checking the delimiters ──────────────────────────────────────────

// 5. Build the balance check. Carry the open groups in a tuple: a close with an
//    empty tuple is the error, and a non-empty tuple at the end is the other one.
export type Balanced<
  Source extends string,
  Depth extends readonly unknown[] = [],
> = TODO; // TODO(koan)

type _05a = Expect<Equal<Balanced<"(a)">, true>>;
type _05b = Expect<Equal<Balanced<"((a)(b))">, true>>;
type _05c = Expect<Equal<Balanced<"">, true>>;
type _05d = Expect<Equal<Balanced<"(unclosed">, false>>;
type _05e = Expect<Equal<Balanced<"a)b">, false>>;

// ─── Checking the group references ────────────────────────────────────

// 6. Build the collector for the names a literal declares.
export type NamedGroupsOf<Source extends string> = TODO; // TODO(koan)

type _06a = Expect<Equal<NamedGroupsOf<"(?<name>a)">, "name">>;
type _06b = Expect<Equal<NamedGroupsOf<"^(?<key>x)=(?<value>y)$">, "key" | "value">>;
type _06c = Expect<Equal<NamedGroupsOf<"(a)">, never>>;
type _06d = Expect<Equal<NamedGroupsOf<"">, never>>;

// 7. Build the collector for the names it refers back to.
export type ReferencedNamesOf<Source extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<ReferencedNamesOf<"(?<name>a)\\k<name>">, "name">>;
type _07b = Expect<Equal<ReferencedNamesOf<"(?<name>a)\\k<missing>">, "missing">>;
type _07c = Expect<Equal<ReferencedNamesOf<"(a)">, never>>;
type _07d = Expect<Equal<ReferencedNamesOf<"\\k<a>\\k<b>">, "a" | "b">>;

// 8. Build the comparison the diagnostic is made of.
export type MissingReferences<Source extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<MissingReferences<"(?<name>a)\\k<missing>">, "missing">>;
type _08b = Expect<Equal<MissingReferences<"(?<name>a)\\k<name>">, never>>;
type _08c = Expect<Equal<MissingReferences<"(a)">, never>>;
type _08d = Expect<Equal<MissingReferences<"(?<a>x)\\k<b>\\k<c>">, "b" | "c">>;

// ─── The diagnostic ───────────────────────────────────────────────────

// 9. Build the source-only verdict: delimiters first, then references.
export type DiagnoseSource<Source extends string> = TODO; // TODO(koan)

type _09a = Expect<Equal<DiagnoseSource<"(?<name>a)">, "valid">>;
type _09b = Expect<Equal<DiagnoseSource<"(unclosed">, "unexpected-token">>;
type _09c = Expect<Equal<DiagnoseSource<"(?<name>a)\\k<missing>">, "missing-group">>;
type _09d = Expect<Equal<DiagnoseSource<"">, "valid">>;

// 10. Build the whole verdict for one literal, flags included.
export type Diagnose<Source extends string, Flags extends string> = TODO; // TODO(koan)

type _10a = Expect<Equal<Diagnose<"(?<name>a)", "u">, "valid">>;
type _10b = Expect<Equal<Diagnose<"a", "z">, "invalid-flag">>;
type _10c = Expect<Equal<Diagnose<"(unclosed", "u">, "unexpected-token">>;
type _10d = Expect<Equal<Diagnose<"(unclosed", "z">, "invalid-flag">>;
type _10e = Expect<Equal<Diagnose<"(?<name>a)\\k<missing>", "u">, "missing-group">>;

// ─── Reading a match back ─────────────────────────────────────────────

// 11. Build the typed groups object a literal with named groups would justify.
//     The declaration does not produce this for you; `groups` is a string map.
export type GroupsOf<Names extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<GroupsOf<"key" | "value">, { key: string; value: string }>>;
type _11b = Expect<Equal<GroupsOf<never>, {}>>;
type _11c = Expect<Equal<keyof GroupsOf<NamedGroupsOf<"(?<key>x)=(?<value>y)">>, "key" | "value">>;
type _11d = Expect<Equal<GroupsOf<"key">["key"], string>>;

// 12. Build what `exec` actually hands back — including the absence a successful
//     literal cannot rule out.
export type MatchResult = TODO; // TODO(koan)

type _12a = Expect<Equal<MatchResult, RegExpExecArray | null>>;
type _12b = Expect<Equal<Extract<MatchResult, null>, null>>;
type _12c = Expect<Equal<NonNullable<MatchResult>[number], string>>;
type _12d = Expect<Equal<NonNullable<MatchResult>["index"], number>>;
type _12e = Expect<
  Equal<NonNullable<MatchResult>["groups"], { [key: string]: string } | undefined>
>;

// 13. Build the shape a parser built on that result should publish: named fields
//     when it matched, nothing when it did not.
export type ParseResult<Names extends string> = TODO; // TODO(koan)

type _13a = Expect<Equal<ParseResult<"key" | "value">, { key: string; value: string } | null>>;
type _13b = Expect<Equal<NonNullable<ParseResult<"key">>, { key: string }>>;
type _13c = Expect<Equal<Extract<ParseResult<"key">, null>, null>>;
type _13d = Expect<Equal<ParseResult<never>, {} | null>>;

// 14. Build the two signatures every literal carries, whatever its syntax.
export type ExecSignature = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<ExecSignature>, [string]>>;
type _14b = Expect<Equal<ReturnType<ExecSignature>, RegExpExecArray | null>>;
type _14c = Expect<Equal<Parameters<ExecSignature>["length"], 1>>;
type _14d = Expect<
  Equal<
    {
      itMatchesTheBuiltinExec: GivenExtends<RegExp["exec"], ExecSignature>;
      butATestIsADifferentShape: GivenExtends<RegExp["test"], ExecSignature>;
    },
    { itMatchesTheBuiltinExec: true; butATestIsADifferentShape: false }
  >
>;

// ─── Where the checking happens ───────────────────────────────────────

// 15. Build the answer to "when is this checked?". A literal is source the
//     compiler reads; a constructor argument is a string it does not.
export type CheckedAt<Form extends "literal" | "constructor"> = TODO; // TODO(koan)

type _15a = Expect<Equal<CheckedAt<"literal">, "compile time">>;
type _15b = Expect<Equal<CheckedAt<"constructor">, "run time">>;
type _15c = Expect<Equal<CheckedAt<"literal" | "constructor">, "compile time" | "run time">>;
type _15d = Expect<Equal<CheckedAt<never>, never>>;

// 16. Build the syntax features whose availability depends on the target.
export type RegexFeature = TODO; // TODO(koan)

type _16a = Expect<
  Equal<RegexFeature, "namedGroups" | "hasIndices" | "unicodeSets" | "backreference">
>;
type _16b = Expect<Equal<Extract<RegexFeature, `${string}Groups`>, "namedGroups">>;
type _16c = Expect<Equal<Exclude<RegexFeature, "backreference">, "namedGroups" | "hasIndices" | "unicodeSets">>;
type _16d = Expect<Equal<Extract<RegexFeature, "lookbehind">, never>>;

// 17. Build the target each one needs, and the verdict when the configured
//     target is older than that.
export type MinimumTarget<Feature extends RegexFeature> = TODO; // TODO(koan)

type _17a = Expect<Equal<MinimumTarget<"namedGroups">, "es2018">>;
type _17b = Expect<Equal<MinimumTarget<"hasIndices">, "es2022">>;
type _17c = Expect<Equal<MinimumTarget<"unicodeSets">, "es2024">>;
type _17d = Expect<Equal<MinimumTarget<"backreference">, "es5">>;
type _17e = Expect<Equal<MinimumTarget<RegexFeature>, "es2018" | "es2022" | "es2024" | "es5">>;

// 18. Report one literal at a glance: what it declares, what it refers to, what
//     the compiler would say, and whether it is clean.
export type LiteralReport<Source extends string, Flags extends string> = TODO; // TODO(koan)

type _18a = Expect<Equal<LiteralReport<"(?<key>x)=(?<value>y)", "u">["declares"], "key" | "value">>;
type _18b = Expect<Equal<LiteralReport<"(?<key>x)=(?<value>y)", "u">["diagnostic"], "valid">>;
type _18c = Expect<
  Equal<LiteralReport<"(?<key>x)=(?<value>y)", "u">["groups"], { key: string; value: string }>
>;
type _18d = Expect<Equal<LiteralReport<"(?<name>a)\\k<missing>", "u">["clean"], false>>;
type _18e = Expect<Equal<LiteralReport<"(a)", "z">["diagnostic"], "invalid-flag">>;
