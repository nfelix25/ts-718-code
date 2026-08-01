import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-154: fluent mini-DSLs — constructions
 * =============================================================================
 *
 * A fluent DSL is a grammar wearing method syntax. The generic parameters are a
 * parse stack: selected keys accumulate as a union, clause flags record what has
 * already happened, and the value type of each field decides which operators are
 * even spellable there. None of it is data — it is evidence about the chain so
 * far, and the runtime object stays an ordinary immutable description.
 *
 * Two things make it work. The where-clause union is built *per field*, so the
 * key, its operator grammar, and its value type stay correlated; assemble those
 * three from separate unions and the type cheerfully accepts a numeric column
 * compared against a string. And the terminal step states its precondition on
 * the receiver, so `build` on a query that has selected nothing has receiver
 * type `never` and cannot be called at all. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The query object, given because `this` parameters live only in class bodies.
declare class Query<
  Row extends Record<PropertyKey, Scalar>,
  Selected extends keyof Row = never,
  HasWhere extends boolean = false,
  HasOrder extends boolean = false,
  HasLimit extends boolean = false,
> {
  readonly $state: QueryState<Row, Selected, HasWhere, HasOrder, HasLimit>;
  readonly table: string;
  select<const Keys extends readonly (keyof Row)[]>(
    ...keys: Keys
  ): Query<Row, Selected | Keys[number], HasWhere, HasOrder, HasLimit>;
  where<Key extends keyof Row>(
    key: Key,
    operator: OperatorFor<Row[Key]>,
    value: Row[Key],
  ): Query<Row, Selected, true, HasOrder, HasLimit>;
  orderBy<Key extends keyof Row>(
    key: Key,
    direction?: "asc" | "desc",
  ): Query<Row, Selected, HasWhere, true, HasLimit>;
  limit(count: number): Query<Row, Selected, HasWhere, HasOrder, true>;
  build(
    this: [Selected] extends [never] ? never : Query<Row, Selected, HasWhere, HasOrder, HasLimit>,
  ): BuiltQuery<SelectedRow<Row, Selected>>;
}

// ─── The grammar ──────────────────────────────────────────────────────

// 1. Build the set of values a column may hold.
export type Scalar = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    { numberIsAScalar: GivenExtends<number, Scalar>; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { numberIsAScalar: true; nonScalarRejected: false }
  >
>;
type _01b = Expect<
  Equal<
    { dateIsAScalar: GivenExtends<Date, Scalar>; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { dateIsAScalar: true; nonScalarRejected: false }
  >
>;
type _01c = Expect<Equal<GivenExtends<undefined, Scalar>, false>>;
type _01d = Expect<Equal<GivenExtends<{ nested: 1 }, Scalar>, false>>;

// 2. Build the operator grammar of a column. Ordered domains get comparisons,
//    text gets the string predicates, and everything else gets equality only.
//    Strip nullability first, so a nullable column keeps its own grammar —
//    and note that a union spanning two domains is examined as a whole, so it
//    falls back to what both sides agree on.
export type OperatorFor<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<OperatorFor<number>, "=" | "!=" | "<" | "<=" | ">" | ">=">>;
type _02b = Expect<Equal<OperatorFor<string>, "=" | "!=" | "contains" | "startsWith">>;
type _02c = Expect<Equal<OperatorFor<boolean>, "=" | "!=">>;
type _02d = Expect<Equal<OperatorFor<string | null>, "=" | "!=" | "contains" | "startsWith">>;
type _02e = Expect<Equal<OperatorFor<string | number>, "=" | "!=">>;

// 3. Build the row this file queries against. One column of each domain, plus a
//    nullable one, so every branch of the grammar is exercised.
export type UserRow = TODO; // TODO(koan)

type _03a = Expect<Equal<keyof UserRow, "id" | "name" | "active" | "joinedAt" | "nickname">>;
type _03b = Expect<Equal<UserRow["id"], number>>;
type _03c = Expect<Equal<UserRow["nickname"], string | null>>;
type _03d = Expect<Equal<UserRow["joinedAt"], Date>>;
type _03e = Expect<
  Equal<
    { rowIsAllScalars: GivenExtends<UserRow, Record<PropertyKey, Scalar>>; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { rowIsAllScalars: true; nonScalarRejected: false }
  >
>;

// 4. Build the correlated clause: one member per column, each carrying that
//    column's name, its own operator grammar, and its own value type together.
export type WhereClause<Row extends Record<PropertyKey, Scalar>> = TODO; // TODO(koan)

type _04a = Expect<Equal<WhereClause<UserRow>["key"], keyof UserRow>>;
type _04b = Expect<
  Equal<Extract<WhereClause<UserRow>, { key: "id" }>["operator"], "=" | "!=" | "<" | "<=" | ">" | ">=">
>;
type _04c = Expect<Equal<Extract<WhereClause<UserRow>, { key: "name" }>["value"], string>>;
type _04d = Expect<
  Equal<
    Extract<WhereClause<UserRow>, { key: "active" }>,
    { readonly key: "active"; readonly operator: "=" | "!="; readonly value: boolean }
  >
>;
type _04e = Expect<
  Equal<Extract<WhereClause<UserRow>, { key: "nickname" }>["operator"], "=" | "!=" | "contains" | "startsWith">
>;

// 5. Build the shape a careless implementation would write instead: three
//    independent unions with nothing tying a column to its own value.
export type UncorrelatedWhere = TODO; // TODO(koan)

type _05a = Expect<Equal<UncorrelatedWhere["key"], keyof UserRow>>;
type _05b = Expect<Equal<UncorrelatedWhere["operator"], "=" | "!=">>;
type _05c = Expect<
  Equal<
    { anyColumnsValue: UncorrelatedWhere["value"]; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { anyColumnsValue: Scalar; nonScalarRejected: false }
  >
>;
type _05d = Expect<
  Equal<
    {
      looseAcceptsAStringForANumericColumn: GivenExtends<
        { key: "id"; operator: "="; value: "a-string" },
        UncorrelatedWhere
      >;
      correlatedRefusesIt: GivenExtends<{ key: "id"; operator: "="; value: "a-string" }, WhereClause<UserRow>>;
    },
    { looseAcceptsAStringForANumericColumn: true; correlatedRefusesIt: false }
  >
>;

// ─── The parse stack ──────────────────────────────────────────────────

// 6. Build the projection: the row narrowed to whatever has been selected.
export type SelectedRow<Row, Selected extends keyof Row> = TODO; // TODO(koan)

type _06a = Expect<Equal<SelectedRow<UserRow, "id">, { id: number }>>;
type _06b = Expect<Equal<SelectedRow<UserRow, "id" | "name">, { id: number; name: string }>>;
type _06c = Expect<Equal<SelectedRow<UserRow, never>, Record<never, never>>>;
type _06d = Expect<
  Equal<
    { everythingSelected: keyof SelectedRow<UserRow, keyof UserRow>; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { everythingSelected: keyof UserRow; nonScalarRejected: false }
  >
>;

// 7. Build the state record — everything the chain has learned so far, in one
//    readable shape rather than five positional parameters.
export type QueryState<
  Row,
  Selected extends keyof Row,
  HasWhere extends boolean,
  HasOrder extends boolean,
  HasLimit extends boolean,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<keyof QueryState<UserRow, "id", true, false, false>, "row" | "selected" | "hasWhere" | "hasOrder" | "hasLimit">
>;
type _07b = Expect<Equal<QueryState<UserRow, "id", true, false, false>["selected"], "id">>;
type _07c = Expect<Equal<QueryState<UserRow, "id", true, false, false>["hasWhere"], true>>;
type _07d = Expect<
  Equal<
    QueryState<UserRow, "id", true, false, false>,
    {
      readonly row: UserRow;
      readonly selected: "id";
      readonly hasWhere: true;
      readonly hasOrder: false;
      readonly hasLimit: false;
    }
  >
>;

// 8. Build the reader that recovers the whole stack from a query.
export type StateOf<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<StateOf<Query<UserRow>>["selected"], never>>;
type _08b = Expect<Equal<StateOf<Query<UserRow, "id" | "name", true, false, false>>["selected"], "id" | "name">>;
type _08c = Expect<Equal<StateOf<Query<UserRow, "id", true, false, false>>["hasWhere"], true>>;
type _08d = Expect<
  Equal<
    { row: StateOf<Query<UserRow, "id", true, false, false>>["row"]; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { row: UserRow; nonScalarRejected: false }
  >
>;
type _08e = Expect<Equal<StateOf<string>, never>>;

// 9. Build the reader that goes one step further and reports the row the chain
//    will actually produce.
export type ResultOf<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<ResultOf<Query<UserRow, "id" | "name", true, false, false>>, { id: number; name: string }>>;
type _09b = Expect<Equal<ResultOf<Query<UserRow, "id">>, { id: number }>>;
type _09c = Expect<Equal<ResultOf<Query<UserRow>>, Record<never, never>>>;
type _09d = Expect<Equal<ResultOf<string>, Record<never, never>>>;

// 10. Build the terminal value: the compiled statement plus a runner that
//     produces exactly the projected rows.
export type BuiltQuery<Result> = TODO; // TODO(koan)

type _10a = Expect<Equal<BuiltQuery<{ id: number }>["sql"], string>>;
type _10b = Expect<Equal<ReturnType<BuiltQuery<{ id: number }>["run"]>, { id: number }[]>>;
type _10c = Expect<Equal<Parameters<BuiltQuery<{ id: number }>["run"]>, [rows: readonly unknown[]]>>;
type _10d = Expect<Equal<keyof BuiltQuery<{ id: number }>, "sql" | "run">>;

// ─── What each step of the chain records ──────────────────────────────

// 11. Report the operator domains. The conditional examines the normalized value
//     as a whole, so a column spanning two domains keeps only the grammar they
//     share — and a column that is *only* null hits the first branch, because
//     `never` is assignable to everything.
export type OperatorDomainProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<OperatorDomainProfile["ordered"], "=" | "!=" | "<" | "<=" | ">" | ">=">>;
type _11b = Expect<Equal<OperatorDomainProfile["temporal"], "=" | "!=" | "<" | "<=" | ">" | ">=">>;
type _11c = Expect<Equal<OperatorDomainProfile["text"], "=" | "!=" | "contains" | "startsWith">>;
type _11d = Expect<Equal<OperatorDomainProfile["mixed"], "=" | "!=">>;
type _11e = Expect<Equal<OperatorDomainProfile["onlyNull"], "=" | "!=" | "<" | "<=" | ">" | ">=">>;

// 12. Report the correlation the per-field clause buys, and what the loose shape
//     lets through instead.
export type CorrelationProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<CorrelationProfile["numericColumnOperators"], "=" | "!=" | "<" | "<=" | ">" | ">=">>;
type _12b = Expect<Equal<CorrelationProfile["numericColumnValue"], number>>;
type _12c = Expect<Equal<CorrelationProfile["textColumnOperators"], "=" | "!=" | "contains" | "startsWith">>;
type _12d = Expect<Equal<CorrelationProfile["mismatchRefused"], false>>;
type _12e = Expect<Equal<CorrelationProfile["mismatchAcceptedLoosely"], true>>;

// 13. Report the selection accumulating. Each call unions its keys into the
//     stack, and the projection follows one step behind.
export type SelectionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<SelectionProfile["atTheStart"], never>>;
type _13b = Expect<Equal<SelectionProfile["afterOne"], "id">>;
type _13c = Expect<Equal<SelectionProfile["afterTwo"], "id" | "name">>;
type _13d = Expect<Equal<SelectionProfile["projectionAtTheStart"], Record<never, never>>>;
type _13e = Expect<Equal<SelectionProfile["projectionAfterTwo"], { id: number; name: string }>>;

// 14. Report the clause flags. They move independently, and a step only ever
//     sets its own — which is what lets the grammar be checked one clause at a
//     time.
export type FlagProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<FlagProfile["whereAfterWhere"], true>>;
type _14b = Expect<Equal<FlagProfile["orderAfterWhere"], false>>;
type _14c = Expect<Equal<FlagProfile["orderAfterOrderBy"], true>>;
type _14d = Expect<Equal<FlagProfile["limitAfterLimit"], true>>;
type _14e = Expect<Equal<FlagProfile["selectionSurvivesAClause"], "id">>;

// 15. Report the terminal boundary. With nothing selected the receiver is
//     `never`, so the step is unreachable; once something is selected the
//     receiver is the query itself.
export type BuildBoundaryProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<BuildBoundaryProfile["receiverWhenEmpty"], never>>;
type _15b = Expect<
  Equal<BuildBoundaryProfile["receiverWhenSelected"], Query<UserRow, "id" | "name", true, false, false>>
>;
type _15c = Expect<
  Equal<
    { built: BuildBoundaryProfile["builtWhenSelected"]; nonScalarRejected: GivenExtends<{ nested: 1 }, Scalar> },
    { built: BuiltQuery<{ id: number; name: string }>; nonScalarRejected: false }
  >
>;
type _15d = Expect<Equal<BuildBoundaryProfile["statement"], string>>;
type _15e = Expect<
  Equal<BuildBoundaryProfile["runner"], (rows: readonly unknown[]) => { id: number; name: string }[]>
>;

// 16. Report the shapes of the chain's own steps — what each one demands, which
//     is where the grammar is enforced at the call site.
export type StepShapeProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<StepShapeProfile["whereArity"], 3>>;
type _16b = Expect<Equal<StepShapeProfile["limitArguments"], [count: number]>>;
type _16c = Expect<Equal<StepShapeProfile["orderDirection"], "asc" | "desc" | undefined>>;
type _16d = Expect<Equal<StepShapeProfile["selectAccumulates"], keyof UserRow>>;

// ─── The chain as a whole ─────────────────────────────────────────────

// 17. Build the fold that runs a list of selected keys through the stack, so a
//     whole chain can be described by what it selects.
export type SelectAll<
  Row extends Record<PropertyKey, Scalar>,
  Keys extends readonly (keyof Row)[],
  Selected extends keyof Row = never,
> = TODO; // TODO(koan)

type _17a = Expect<Equal<SelectAll<UserRow, ["id"]>, { id: number }>>;
type _17b = Expect<Equal<SelectAll<UserRow, ["id", "name"]>, { id: number; name: string }>>;
type _17c = Expect<Equal<SelectAll<UserRow, []>, Record<never, never>>>;
type _17d = Expect<Equal<SelectAll<UserRow, ["id", "id"]>, { id: number }>>;
type _17e = Expect<Equal<keyof SelectAll<UserRow, ["id", "name", "active"]>, "id" | "name" | "active">>;

// 18. Report a whole chain at once: what it projects, whether each clause has
//     happened, and whether the terminal step is reachable yet.
export type QueryReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<QueryReport<Query<UserRow>>["buildable"], false>>;
type _18b = Expect<Equal<QueryReport<Query<UserRow, "id">>["buildable"], true>>;
type _18c = Expect<Equal<QueryReport<Query<UserRow, "id" | "name", true, false, false>>["result"], { id: number; name: string }>>;
type _18d = Expect<Equal<QueryReport<Query<UserRow, "id" | "name", true, false, false>>["filtered"], true>>;
type _18e = Expect<Equal<QueryReport<Query<UserRow, "id">>["selected"], "id">>;
