import { describe, expect, it } from "vitest";

import {
  type Task,
  groupNumbersByParity,
  groupTasksByOwner,
  groupTasksByStatus,
} from "./k-184-object-and-map-groupby.js";

describe("k-184 Object.groupBy and Map.groupBy", () => {
  const tasks: Task[] = [
    { id: 1, status: "todo", title: "read" },
    { id: 2, status: "done", title: "drill" },
    { id: 3, status: "todo", title: "repeat" },
  ];

  it("groups object buckets while leaving absent keys missing", () => {
    const groups = groupTasksByStatus(tasks);
    expect(groups.todo?.map((task) => task.id)).toEqual([1, 3]);
    expect(groups.doing).toBeUndefined();
  });

  it("creates a null-prototype object", () => {
    expect(Object.getPrototypeOf(groupTasksByStatus(tasks))).toBeNull();
  });

  it("groups numbers by a literal key union", () => {
    expect(groupNumbersByParity([0, 1, 2, 3])).toEqual({
      even: [0, 2],
      odd: [1, 3],
    });
  });

  it("uses object identity for Map groups", () => {
    const ada = { name: "Ada" };
    const grace = { name: "Grace" };
    const groups = groupTasksByOwner([
      [ada, tasks[0]!],
      [grace, tasks[1]!],
      [ada, tasks[2]!],
    ]);
    expect(groups.get(ada)?.length).toBe(2);
    expect(groups.get({ name: "Ada" })).toBeUndefined();
  });

  it("returns no buckets for an empty iterable", () => {
    expect(Object.keys(groupNumbersByParity([]))).toEqual([]);
    expect(groupTasksByOwner([]).size).toBe(0);
  });
});
