import { describe, expect, it } from "vitest";

import {
  query,
  type UserRow,
} from "./k-154-fluent-mini-dsls.js";

const users: readonly UserRow[] = [
  { id: 1, name: "Ada", active: true, joinedAt: new Date("2020-01-01"), nickname: null },
  { id: 2, name: "Grace", active: true, joinedAt: new Date("2021-01-01"), nickname: "Amazing" },
  { id: 3, name: "Linus", active: false, joinedAt: new Date("2019-01-01"), nickname: "Linux" },
];

describe("k-154 fluent mini DSLs", () => {
  it("renders a chain in grammar order", () => {
    const built = query<UserRow>("users")
      .select("id", "name")
      .where("active", "=", true)
      .orderBy("name", "desc")
      .limit(2)
      .build();
    expect(built.sql).toBe(
      "SELECT id, name FROM users WHERE active = ? ORDER BY name DESC LIMIT 2",
    );
  });

  it("filters and projects rows", () => {
    const built = query<UserRow>("users")
      .select("id", "name")
      .where("active", "=", true)
      .build();
    expect(built.run(users)).toEqual([
      { id: 1, name: "Ada" },
      { id: 2, name: "Grace" },
    ]);
  });

  it("runs string-specific operators", () => {
    const built = query<UserRow>("users")
      .select("name")
      .where("name", "startsWith", "G")
      .build();
    expect(built.run(users)).toEqual([{ name: "Grace" }]);
  });

  it("orders and limits results", () => {
    const built = query<UserRow>("users")
      .select("id")
      .orderBy("joinedAt", "asc")
      .limit(1)
      .build();
    expect(built.run(users)).toEqual([{ id: 3 }]);
  });

  it("keeps earlier fluent values immutable", () => {
    const base = query<UserRow>("users").select("id");
    const limited = base.limit(1);
    expect(base.build().run(users)).toHaveLength(3);
    expect(limited.build().run(users)).toHaveLength(1);
  });
});
