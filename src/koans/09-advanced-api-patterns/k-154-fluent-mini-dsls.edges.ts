import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type OperatorFor,
  Query,
  type ResultOf,
  type SelectedRow,
  type StateOf,
  type UserRow,
  type WhereClause,
} from "./k-154-fluent-mini-dsls.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * A field/value/operator relation is safe only while it stays correlated.
 * Separating each projection into a union accepts mismatched fields and values.
 * The operator conditional also examines a normalized union as a whole, so
 * mixed value domains fall back to their common equality grammar.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type UncorrelatedWhere = {
  key: keyof UserRow;
  operator: OperatorFor<UserRow[keyof UserRow]>;
  value: UserRow[keyof UserRow];
};
type Q0 = Query<UserRow>;
type QId = Query<UserRow, "id">;
type QUnionSelection = Query<UserRow, "id" | "name">;

// Pre-solved demonstrations name the grammar leaks directly.
type _DemoMixedOperator = Expect<Equal<OperatorFor<string | number>, "=" | "!=">>;
type _DemoNullableString = Expect<Equal<OperatorFor<string | null>, "=" | "!=" | "contains" | "startsWith">>;
type _DemoEmptyBuild = Expect<Equal<ThisParameterType<Q0["build"]>, never>>;
type _DemoCorrelatedValue = Expect<Equal<Extract<WhereClause<UserRow>, { key: "id" }>["value"], number>>;
// Assertions can forge a row or call an erased method; runtime validation remains necessary at external-data boundaries.

// 1. Union, never, unknown, and nullable operator domains (1-8)
type _01 = Expect<Equal<OperatorFor<string | number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<OperatorFor<number | Date>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<OperatorFor<boolean | string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OperatorFor<string | null>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<OperatorFor<number | null>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<OperatorFor<null>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<OperatorFor<never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<OperatorFor<unknown>, TODO>>; // TODO(koan) @koan-error

// 2. Correlated clause unions reject pairings that separate unions admit (9-16)
type _09 = Expect<Equal<WhereClause<UserRow>["key"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<WhereClause<UserRow>["value"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<UncorrelatedWhere["operator"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<{ key: "id"; operator: "="; value: "wrong" }, UncorrelatedWhere>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<{ key: "id"; operator: "="; value: "wrong" }, WhereClause<UserRow>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "name" }>["operator"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extract<WhereClause<UserRow>, { operator: "contains" }>["key"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<WhereClause<UserRow>, { operator: ">" }>["key"], TODO>>; // TODO(koan) @koan-error

// 3. Empty, duplicate, and union selections determine build readiness (17-23)
type _17 = Expect<Equal<SelectedRow<UserRow, never>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ResultOf<Q0>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ThisParameterType<Q0["build"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ThisParameterType<QId["build"]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ResultOf<QUnionSelection>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<SelectedRow<UserRow, "id" | "id">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<StateOf<Query<UserRow, never, true, true, true>>["selected"], TODO>>; // TODO(koan) @koan-error

// 4. State flags, structural relations, and runtime escape boundaries (24-30)
type _24 = Expect<Equal<StateOf<ReturnType<QId["where"]>>["hasWhere"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<StateOf<ReturnType<QId["where"]>>["hasOrder"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<StateOf<ReturnType<QId["limit"]>>["hasLimit"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<Query<UserRow, "id", true>, Query<UserRow, "id", boolean>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<Query<UserRow, "id", boolean>, Query<UserRow, "id", true>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<QId["build"]>["run"] extends (rows: readonly unknown[]) => { id: number }[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<StateOf<never>, TODO>>; // TODO(koan) @koan-error
