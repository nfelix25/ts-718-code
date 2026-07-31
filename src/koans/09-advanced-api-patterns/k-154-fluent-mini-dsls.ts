import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 154 - FLUENT MINI-DSLS
 * ============================
 *
 * A fluent DSL turns a small grammar into method calls. Its generic state is a
 * parse stack: selected keys accumulate, clause flags record what has happened,
 * and each field chooses its own legal operators and value type. The runtime
 * object remains an ordinary immutable query description.
 *
 * Read `Query<User, "id" | "name", true, false, false>` aloud as: "a user query
 * selecting id and name, with a where clause, but no order or limit yet." The
 * generic arguments are evidence about the chain, not data stored for their own
 * sake. The `build` receiver becomes `never` while the selection is empty.
 */

export type Scalar = string | number | boolean | Date | null;

export type OperatorFor<Value> =
  NonNullable<Value> extends number | Date
    ? "=" | "!=" | "<" | "<=" | ">" | ">="
    : NonNullable<Value> extends string
      ? "=" | "!=" | "contains" | "startsWith"
      : "=" | "!=";

export type WhereClause<Row extends Record<PropertyKey, Scalar>> = {
  [Key in keyof Row]: {
    readonly key: Key;
    readonly operator: OperatorFor<Row[Key]>;
    readonly value: Row[Key];
  };
}[keyof Row];

export type SelectedRow<
  Row,
  Selected extends keyof Row,
> = Pick<Row, Selected>;

export type QueryState<
  Row,
  Selected extends keyof Row,
  HasWhere extends boolean,
  HasOrder extends boolean,
  HasLimit extends boolean,
> = Readonly<{
  row: Row;
  selected: Selected;
  hasWhere: HasWhere;
  hasOrder: HasOrder;
  hasLimit: HasLimit;
}>;

export type StateOf<Value> =
  Value extends Query<
    infer Row,
    infer Selected,
    infer HasWhere,
    infer HasOrder,
    infer HasLimit
  >
    ? QueryState<Row, Selected, HasWhere, HasOrder, HasLimit>
    : never;

export type ResultOf<Value> =
  StateOf<Value> extends {
    row: infer Row;
    selected: infer Selected;
  }
    ? SelectedRow<Row, Extract<Selected, keyof Row>>
    : never;

export type BuiltQuery<Result> = Readonly<{
  sql: string;
  run(rows: readonly unknown[]): Result[];
}>;

type RuntimeWhere = {
  readonly key: PropertyKey;
  readonly operator: string;
  readonly value: Scalar;
};

type RuntimeOrder = {
  readonly key: PropertyKey;
  readonly direction: "asc" | "desc";
};

export class Query<
  Row extends Record<PropertyKey, Scalar>,
  Selected extends keyof Row = never,
  HasWhere extends boolean = false,
  HasOrder extends boolean = false,
  HasLimit extends boolean = false,
> {
  declare readonly $state: QueryState<Row, Selected, HasWhere, HasOrder, HasLimit>;

  constructor(
    readonly table: string,
    private readonly selected: readonly (keyof Row)[] = [],
    private readonly filters: readonly RuntimeWhere[] = [],
    private readonly ordering?: RuntimeOrder,
    private readonly maximum?: number,
  ) {}

  select<const Keys extends readonly (keyof Row)[]>(
    ...keys: Keys
  ): Query<Row, Selected | Keys[number], HasWhere, HasOrder, HasLimit> {
    return new Query(
      this.table,
      [...new Set([...this.selected, ...keys])],
      this.filters,
      this.ordering,
      this.maximum,
    );
  }

  where<Key extends keyof Row>(
    key: Key,
    operator: OperatorFor<Row[Key]>,
    value: Row[Key],
  ): Query<Row, Selected, true, HasOrder, HasLimit> {
    return new Query(
      this.table,
      this.selected,
      [...this.filters, { key, operator, value }],
      this.ordering,
      this.maximum,
    );
  }

  orderBy<Key extends keyof Row>(
    key: Key,
    direction: "asc" | "desc" = "asc",
  ): Query<Row, Selected, HasWhere, true, HasLimit> {
    return new Query(
      this.table,
      this.selected,
      this.filters,
      { key, direction },
      this.maximum,
    );
  }

  limit(
    count: number,
  ): Query<Row, Selected, HasWhere, HasOrder, true> {
    if (!Number.isInteger(count) || count < 0) {
      throw new RangeError("limit must be a non-negative integer");
    }
    return new Query(
      this.table,
      this.selected,
      this.filters,
      this.ordering,
      count,
    );
  }

  build(
    this: [Selected] extends [never]
      ? never
      : Query<Row, Selected, HasWhere, HasOrder, HasLimit>,
  ): BuiltQuery<SelectedRow<Row, Selected>> {
    const whereSql = this.filters
      .map((clause) => `${String(clause.key)} ${clause.operator} ?`)
      .join(" AND ");
    const sql = [
      `SELECT ${this.selected.map(String).join(", ")} FROM ${this.table}`,
      whereSql === "" ? "" : `WHERE ${whereSql}`,
      this.ordering === undefined
        ? ""
        : `ORDER BY ${String(this.ordering.key)} ${this.ordering.direction.toUpperCase()}`,
      this.maximum === undefined ? "" : `LIMIT ${this.maximum}`,
    ].filter(Boolean).join(" ");

    return {
      sql,
      run: (rows) => runQuery<Row, Selected>(
        rows as readonly Row[],
        this.selected,
        this.filters,
        this.ordering,
        this.maximum,
      ),
    };
  }
}

export function query<Row extends Record<PropertyKey, Scalar>>(
  table: string,
): Query<Row> {
  return new Query<Row>(table);
}

function compare(left: Scalar, operator: string, right: Scalar): boolean {
  const leftValue = left instanceof Date ? left.valueOf() : left;
  const rightValue = right instanceof Date ? right.valueOf() : right;
  switch (operator) {
    case "=": return leftValue === rightValue;
    case "!=": return leftValue !== rightValue;
    case "<": return leftValue !== null && rightValue !== null && leftValue < rightValue;
    case "<=": return leftValue !== null && rightValue !== null && leftValue <= rightValue;
    case ">": return leftValue !== null && rightValue !== null && leftValue > rightValue;
    case ">=": return leftValue !== null && rightValue !== null && leftValue >= rightValue;
    case "contains": return String(leftValue).includes(String(rightValue));
    case "startsWith": return String(leftValue).startsWith(String(rightValue));
    default: return false;
  }
}

function comparable(value: Scalar): string | number {
  if (value instanceof Date) return value.valueOf();
  if (value === null) return "";
  if (typeof value === "boolean") return Number(value);
  return value;
}

function runQuery<
  Row extends Record<PropertyKey, Scalar>,
  Selected extends keyof Row,
>(
  rows: readonly Row[],
  selected: readonly (keyof Row)[],
  filters: readonly RuntimeWhere[],
  ordering: RuntimeOrder | undefined,
  maximum: number | undefined,
): SelectedRow<Row, Selected>[] {
  const accepted = rows.filter((row) =>
    filters.every((clause) =>
      compare(row[clause.key] as Scalar, clause.operator, clause.value)
    )
  );
  const ordered = ordering === undefined
    ? accepted
    : [...accepted].sort((left, right) => {
        const a = comparable(left[ordering.key] as Scalar);
        const b = comparable(right[ordering.key] as Scalar);
        const result = a === b ? 0 : a < b ? -1 : 1;
        return ordering.direction === "asc" ? result : -result;
      });
  const limited = maximum === undefined ? ordered : ordered.slice(0, maximum);
  return limited.map((row) => Object.fromEntries(
    selected.map((key) => [key, row[key]]),
  ) as SelectedRow<Row, Selected>);
}

export type UserRow = {
  id: number;
  name: string;
  active: boolean;
  joinedAt: Date;
  nickname: string | null;
};

type EmptyUserQuery = Query<UserRow>;
type UserNameQuery = Query<UserRow, "id" | "name", true, false, false>;

// Part 1: Value domains select their legal operator grammar.
type _01 = Expect<Equal<OperatorFor<number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<OperatorFor<string>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<OperatorFor<boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OperatorFor<string | null>, TODO>>; // TODO(koan) @koan-error

// Part 2: Where clauses remain correlated by field.
type _05 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "id" }>["operator"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "name" }>["value"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<WhereClause<UserRow>["key"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<WhereClause<UserRow>, { key: "active" }>, TODO>>; // TODO(koan) @koan-error

// Part 3: Selection accumulates a projected result type.
type _09 = Expect<Equal<SelectedRow<UserRow, "id">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<SelectedRow<UserRow, "id" | "name">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<StateOf<EmptyUserQuery>["selected"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ResultOf<UserNameQuery>, TODO>>; // TODO(koan) @koan-error

// Part 4: Clause methods advance independent state flags.
type _13 = Expect<Equal<StateOf<UserNameQuery>["hasWhere"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<StateOf<UserNameQuery>["hasOrder"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<StateOf<ReturnType<UserNameQuery["orderBy"]>>["hasOrder"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<StateOf<ReturnType<UserNameQuery["limit"]>>["hasLimit"], TODO>>; // TODO(koan) @koan-error

// Part 5: The build boundary exposes the projected row.
type _17 = Expect<Equal<ReturnType<UserNameQuery["build"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<UserNameQuery["build"]>["sql"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<UserNameQuery["build"]>["run"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ThisParameterType<EmptyUserQuery["build"]>, TODO>>; // TODO(koan) @koan-error
