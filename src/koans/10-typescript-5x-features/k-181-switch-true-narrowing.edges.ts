import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type InputValue,
  classifyValue,
  scoreBand,
} from "./k-181-switch-true-narrowing.js";

/** EDGE CASES: case order changes reachability, fallthrough merges rather than terminates facts, mutation invalidates refinements, truthiness leaves falsy literals, numeric range guards do not create numeric interval types, and exhaustive defaults can reach never. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Falsy = false | 0 | 0n | "" | null | undefined;
type Variant = { kind: "a"; a: string } | { kind: "b"; b: number };

// Pre-solved demonstrations capture narrowing inside real case bodies.
function demonstrate(value: Variant): string {
  switch (true) {
    case value.kind === "a": {
      type _DemoA = Expect<Equal<typeof value, { kind: "a"; a: string }>>;
      return value.a;
    }
    default: {
      type _DemoB = Expect<Equal<typeof value, { kind: "b"; b: number }>>;
      return String(value.b);
    }
  }
}
void demonstrate;

// 1. Ordered exclusion and exhaustive remainder (1-8)
type _01 = Expect<Equal<Extract<Variant, { kind: "a" }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Exclude<Variant, { kind: "a" }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Exclude<Variant, { kind: "a" } | { kind: "b" }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<InputValue, string>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<InputValue, string>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Exclude<InputValue, string | number>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Exclude<InputValue, string | number | readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<never, InputValue>, TODO>>; // TODO(koan) @koan-error

// 2. Truthiness cannot exclude every member with a falsy inhabitant (9-15)
type Mixed = "" | "ok" | 0 | 1 | false | true | null;
type _09 = Expect<Equal<Extract<Mixed, Falsy>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Exclude<Mixed, Falsy>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<string, Falsy>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<number, Falsy>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extract<boolean, Falsy>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<NonNullable<Mixed>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Exclude<Mixed, null>, TODO>>; // TODO(koan) @koan-error

// 3. Numeric predicates narrow nullability, not arbitrary intervals (16-22)
type _16 = Expect<Equal<Parameters<typeof scoreBand>[0], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<NonNullable<Parameters<typeof scoreBand>[0]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<Parameters<typeof scoreBand>[0], number>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<Parameters<typeof scoreBand>[0], null>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof scoreBand>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<number, 0 | 1>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<number, 0 | 1>, TODO>>; // TODO(koan) @koan-error

// 4. Public signatures do not retain internal control-flow facts (23-30)
type _23 = Expect<Equal<Parameters<typeof classifyValue>[0], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<typeof classifyValue>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<keyof InputValue, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<InputValue, object>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Exclude<InputValue, object>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<InputValue, unknown>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<unknown, InputValue>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Exclude<InputValue, InputValue>, TODO>>; // TODO(koan) @koan-error
