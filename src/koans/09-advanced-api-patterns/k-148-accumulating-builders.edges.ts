import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { CompleteBuilder, HasKeys, SetField, StateOf } from "./k-148-accumulating-builders.js";
import { Builder } from "./k-148-accumulating-builders.js";

/** EDGE CASES: union-key optimism, broad indexes, overwrite modifiers, special types, and shallow snapshots. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
declare const unionKey: "a" | "b";
declare const broadKey: string;
declare const TOKEN: unique symbol;
const empty = new Builder();
const unionWrite = empty.set(unionKey, 1);
const broadWrite = empty.set(broadKey, true);
const numericWrite = empty.set(0, "zero");
const symbolWrite = empty.set(TOKEN, 1);
const twice = empty.set("x", 1).set("x", 2);
const objectValue = empty.set("config", { retries: 3 });
const tupleValue = empty.set("path", ["a", "b"]);

// Pre-solved demonstrations expose the important approximation.
type _DemoUnionKeys = Expect<Equal<keyof StateOf<typeof unionWrite>, "a" | "b">>;
type _DemoUnionReady = Expect<Equal<HasKeys<StateOf<typeof unionWrite>, "a" | "b">, true>>;
type _DemoBroadIndex = Expect<Equal<keyof StateOf<typeof broadWrite>, string>>;
type _DemoOverwrite = Expect<Equal<StateOf<typeof twice>["x"], 2>>;
// At runtime unionWrite contains only the one key selected by unionKey, not both keys.

// 1. Union and broad keys over-approximate one runtime write (1-8)
type _01 = Expect<Equal<StateOf<typeof unionWrite>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof StateOf<typeof unionWrite>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<StateOf<typeof unionWrite>["a"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<StateOf<typeof unionWrite>["b"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<StateOf<typeof broadWrite>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<keyof StateOf<typeof broadWrite>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<StateOf<typeof numericWrite>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<StateOf<typeof symbolWrite>, TODO>>; // TODO(koan) @koan-error

// 2. Overwrites replace value types and mapped modifiers (9-16)
type _09 = Expect<Equal<SetField<{ readonly x: 1 }, "x", 2>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<SetField<{ x?: 1 }, "x", 2>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<SetField<{ x: 1 }, "x", undefined>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<SetField<{ x: 1 }, "x" | "y", 2>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<keyof SetField<{ x: 1 }, "x" | "y", 2>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<SetField<SetField<{}, "x", 1>, "x", 2>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<StateOf<typeof twice>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof twice.build>, TODO>>; // TODO(koan) @koan-error

// 3. never, any, unknown, and empty requirements (17-23)
type _17 = Expect<Equal<SetField<{}, never, 1>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<HasKeys<never, "x">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<StateOf<Builder<never>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsAny<StateOf<Builder<any>>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<StateOf<unknown>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<StateOf<never>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CompleteBuilder<{ x: 1 }, never>, TODO>>; // TODO(koan) @koan-error

// 4. Const inference and readonly snapshots are shallow boundaries (24-30)
type _24 = Expect<Equal<ReturnType<typeof objectValue.build>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<StateOf<typeof objectValue>["config"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof tupleValue.build>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<StateOf<typeof tupleValue>["path"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<ReturnType<typeof objectValue.build>, Readonly<StateOf<typeof objectValue>>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<typeof empty.build>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<HasKeys<StateOf<typeof unionWrite>, "a" | "b">, TODO>>; // TODO(koan) @koan-error

