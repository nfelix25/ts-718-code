import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Article, Cat, Dog, MutableBox } from "./k-147-deliberate-soundness-holes.js";
import { assumeString, eraseAuthor, firstDeclared, parseTrusted, readAt, readScore, unsafeUppercaseAuthor } from "./k-147-deliberate-soundness-holes.js";

/** GUIDED DRILLS: identify each accepted compromise and the stricter tool that contains it. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type ReadonlyBox<Value> = { readonly value: Value };
type IdOnly = { id: string };
type Extra = { id: string; debug: true };
declare const strings: string[];
declare const scores: Record<string, number>;
declare const tuple: readonly ["a", "b"];
declare const tupleIndex: number;
const maybeString = strings[0];
const maybeScore = scores["missing"];
const tupleFirst = tuple[0];
const tupleMaybe = tuple[tupleIndex];

// Mutable covariance and readonly alternatives (1-15)
type _01 = Expect<Equal<Extends<Dog[], Animal[]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal[], Dog[]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<readonly Dog[], readonly Animal[]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<readonly Animal[], readonly Dog[]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<MutableBox<Dog>, MutableBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<MutableBox<Animal>, MutableBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<[Dog], [Animal]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<[Animal], [Dog]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Map<string, Dog>, Map<string, Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Set<Dog>, Set<Animal>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<Dog[], readonly Animal[]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<readonly Dog[], Animal[]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<MutableBox<Dog | Cat>, MutableBox<Animal>>, TODO>>; // TODO(koan) @koan-error

// Freshness is not exact structural typing (16-30)
type _16 = Expect<Equal<Extends<Extra, IdOnly>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<IdOnly, Extra>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<keyof Extra, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof IdOnly, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Pick<Extra, "id">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Omit<Extra, "debug">, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Pick<Extra, "id">, IdOnly>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Extra, Pick<Extra, "id">>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<{ id: "fixed"; debug: true }, { id: string }>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<{ id: string; debug?: true }, IdOnly>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<IdOnly, { id: string; debug?: true }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extract<keyof Extra, "id">, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Exclude<keyof Extra, "id">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extra["debug"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IdOnly & { debug: true }, TODO>>; // TODO(koan) @koan-error

// Type-level elements versus expression-level indexed reads (31-45)
type _31 = Expect<Equal<string[][number], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<(readonly string[])[number], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<["a", "b"][number], TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Record<string, number>[string], TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<ReturnType<typeof readAt<string>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<typeof readScore>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<typeof maybeString, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<typeof maybeScore, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<typeof tupleFirst, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<typeof tupleMaybe, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<NonNullable<typeof maybeString>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Exclude<typeof maybeScore, undefined>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof readAt<Dog>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Awaited<Promise<ReturnType<typeof readAt<number>>>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Equal<string[][number], typeof maybeString>, TODO>>; // TODO(koan) @koan-error

// Refinement and assertion trust boundaries (46-60)
type _46 = Expect<Equal<Parameters<typeof eraseAuthor>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<typeof eraseAuthor>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<ReturnType<typeof unsafeUppercaseAuthor>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<NonNullable<Article["author"]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<ReturnType<typeof assumeString>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof assumeString>[0], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<typeof firstDeclared<number>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof firstDeclared<number>>[0], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<IsAny<ReturnType<typeof JSON.parse>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof parseTrusted<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof parseTrusted>[0], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof parseTrusted<unknown>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<typeof parseTrusted<string>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<ReturnType<typeof assumeString>, string>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Equal<ReturnType<typeof firstDeclared<string>>, string>, TODO>>; // TODO(koan) @koan-error
