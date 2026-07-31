import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CountEntry,
  type Entry,
  type TextEntry,
  isTextEntry,
  looksLikeText,
} from "./k-182-boolean-comparison-narrowing.js";

/** EDGE CASES: only declared predicates relate a result to its argument, Boolean objects differ from boolean primitives, optional booleans have a third state, complements depend on the original union, and mutation/callback boundaries can invalidate prior facts. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Target<Guard> =
  Guard extends (entry: Entry) => entry is TextEntry
    ? TextEntry
    : never;

// Pre-solved demonstrations establish predicate versus plain boolean.
type _DemoPredicateTarget = Expect<Equal<Target<typeof isTextEntry>, TextEntry>>;
type _DemoPlainBooleanTarget = Expect<Equal<Target<typeof looksLikeText>, never>>;
type _DemoPositive = Expect<Equal<Extract<Entry, Target<typeof isTextEntry>>, TextEntry>>;
type _DemoNegative = Expect<Equal<Exclude<Entry, Target<typeof isTextEntry>>, CountEntry>>;

// 1. Boolean result shape alone does not create a predicate (1-8)
type _01 = Expect<Equal<ReturnType<typeof isTextEntry>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<typeof looksLikeText>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Target<typeof isTextEntry>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Target<typeof looksLikeText>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<typeof isTextEntry, typeof looksLikeText>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<typeof looksLikeText, typeof isTextEntry>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<Entry, Target<typeof looksLikeText>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Exclude<Entry, Target<typeof looksLikeText>>, TODO>>; // TODO(koan) @koan-error

// 2. Primitive boolean and boxed Boolean are different (9-15)
type _09 = Expect<Equal<Extends<boolean, Boolean>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Boolean, boolean>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof boolean, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<Boolean["valueOf"]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<true extends Boolean ? true : false, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<false extends Boolean ? true : false, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Boolean extends object ? true : false, TODO>>; // TODO(koan) @koan-error

// 3. Optional boolean states require explicit undefined handling (16-22)
type Flag = true | false | undefined;
type _16 = Expect<Equal<Extract<Flag, true>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<Flag, false>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<Flag, true>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Exclude<Flag, false>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<NonNullable<Flag>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<Flag, undefined>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<Flag, boolean>, TODO>>; // TODO(koan) @koan-error

// 4. Complement precision depends on the original tested union (23-30)
type Wider = Entry | { kind: "empty" };
type _23 = Expect<Equal<Extract<Wider, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Exclude<Wider, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<Entry, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Exclude<Entry, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Exclude<never, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extract<unknown, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<never, TextEntry>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<unknown, Entry>, TODO>>; // TODO(koan) @koan-error
