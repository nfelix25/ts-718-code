import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BuiltQuery,
  type OperatorFor,
  Query,
  type QueryState,
  type ResultOf,
  type SelectedRow,
  type StateOf,
  type UserRow,
  type WhereClause,
} from "./k-154-fluent-mini-dsls.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Treat each method as one grammar production. Operators depend on the chosen
 * field, selections accumulate by key union, and where/order/limit advance
 * independent state flags while preserving the projected result.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type Q0 = Query<UserRow>;
type QId = Query<UserRow, "id">;
type QIdName = Query<UserRow, "id" | "name">;
type QWhere = Query<UserRow, "id" | "name", true>;
type QComplete = Query<UserRow, "id" | "name", true, true, true>;

// Operator grammars and correlated clauses (1-15)
type _01 = Expect<Equal<OperatorFor<number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<OperatorFor<Date>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<OperatorFor<string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OperatorFor<boolean>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<OperatorFor<null>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<OperatorFor<string | null>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<OperatorFor<number | null>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<WhereClause<UserRow>["key"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "id" }>["operator"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "id" }>["value"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "name" }>["operator"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "active" }>["operator"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "joinedAt" }>["value"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "nickname" }>["value"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<WhereClause<{ score: number; label: string }>["value"], TODO>>; // TODO(koan) @koan-error

// Selected projections and state extraction (16-30)
type _16 = Expect<Equal<SelectedRow<UserRow, never>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<SelectedRow<UserRow, "id">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<SelectedRow<UserRow, "id" | "name">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<SelectedRow<UserRow, keyof UserRow>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<StateOf<Q0>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<StateOf<QId>["selected"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<StateOf<QIdName>["selected"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<StateOf<QWhere>["hasWhere"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<StateOf<QWhere>["hasOrder"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<StateOf<QComplete>["hasLimit"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ResultOf<Q0>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ResultOf<QId>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ResultOf<QIdName>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ResultOf<QComplete>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<StateOf<unknown>, TODO>>; // TODO(koan) @koan-error

// Fluent method transitions and receiver requirements (31-45)
type _31 = Expect<Equal<StateOf<ReturnType<QId["where"]>>["hasWhere"], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<StateOf<ReturnType<QId["where"]>>["selected"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<StateOf<ReturnType<QId["orderBy"]>>["hasOrder"], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<StateOf<ReturnType<QId["orderBy"]>>["hasWhere"], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<StateOf<ReturnType<QId["limit"]>>["hasLimit"], TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<StateOf<ReturnType<QWhere["limit"]>>["hasWhere"], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<StateOf<ReturnType<QWhere["limit"]>>["hasLimit"], TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ThisParameterType<Q0["build"]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ThisParameterType<QId["build"]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<QId["build"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<QIdName["build"]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<QComplete["build"]>["sql"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<QComplete["build"]>["run"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<ReturnType<QComplete["build"]>["run"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Parameters<QId["limit"]>, TODO>>; // TODO(koan) @koan-error

// Public surface, direct states, and type relationships (46-60)
type _46 = Expect<Equal<keyof Q0, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Q0["$state"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<QComplete["$state"], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<QueryState<UserRow, "name", false, true, false>["selected"], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<QueryState<UserRow, "name", false, true, false>["hasOrder"], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<BuiltQuery<{ id: number }>["sql"], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<BuiltQuery<{ id: number }>["run"]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<BuiltQuery<{ id: number }>["run"]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extends<QId, Query<UserRow, keyof UserRow>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extends<Query<UserRow, keyof UserRow>, QId>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<QComplete, Query<UserRow, "id" | "name", boolean, boolean, boolean>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<OperatorFor<UserRow["joinedAt"]>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<OperatorFor<UserRow["nickname"]>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ResultOf<Query<UserRow, "active" | "joinedAt">>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<StateOf<Query<UserRow, never, true, true, true>>["selected"], TODO>>; // TODO(koan) @koan-error
