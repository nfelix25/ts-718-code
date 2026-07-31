import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Animal, Article, Cat, Dog, MutableBox } from "./k-147-deliberate-soundness-holes.js";
import { assumeString, eraseAuthor, firstDeclared, parseTrusted, unsafeUppercaseAuthor } from "./k-147-deliberate-soundness-holes.js";

/** EDGE CASES: local safeguards, aliasing, mutation, assertions, ambient trust, and runtime counterexamples. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type ReadonlyBox<Value> = { readonly value: Value };
type MethodHandler<Value> = { handle(value: Value): void };
type PropertyHandler<Value> = { handle: (value: Value) => void };
type IdOnly = { id: string };

// Pre-solved demonstrations define the boundary of each compromise.
type _DemoArrayCovariance = Expect<Equal<Extends<Dog[], Animal[]>, true>>;
type _DemoReadonlyCovariance = Expect<Equal<Extends<readonly Dog[], readonly Animal[]>, true>>;
type _DemoIndexedType = Expect<Equal<string[][number], string>>;
declare const array: string[];
const maybeElement = array[0];
type _DemoIndexedExpression = Expect<Equal<typeof maybeElement, string | undefined>>;
// @ts-expect-error Fresh object literals receive an excess-property check.
const rejectedFresh: IdOnly = { id: "x", debug: true };
const stale = { id: "x", debug: true };
const accepted: IdOnly = stale;
declare const record: Record<string, number>;
const maybeRecordValue = record["missing"];
// A mutating call does not force the checker to discard every property refinement.

// 1. Mutation and callback compatibility can invalidate narrower views (1-8)
type _01 = Expect<Equal<Extends<Dog[], Animal[]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<MutableBox<Dog>, MutableBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<readonly Dog[], readonly Animal[]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Dog & Cat, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Dog & Cat, never>, TODO>>; // TODO(koan) @koan-error

// 2. Freshness and indexed-read protections are deliberately local (9-16)
type _09 = Expect<Equal<Extends<typeof stale, IdOnly>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof typeof stale, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof accepted, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<string[][number], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<typeof maybeElement, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Record<string, number>[string], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<typeof maybeRecordValue, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<NonNullable<typeof maybeRecordValue>, TODO>>; // TODO(koan) @koan-error

// 3. Refinements survive calls that may mutate aliases (17-23)
type _17 = Expect<Equal<ReturnType<typeof eraseAuthor>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof unsafeUppercaseAuthor>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Article["author"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<NonNullable<Article["author"]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Parameters<typeof eraseAuthor>[0], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Article, { title: string }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<{ title: string; author: string }, Article>, TODO>>; // TODO(koan) @koan-error

// 4. Assertions and ambient types move proof obligations to the author (24-30)
type _24 = Expect<Equal<ReturnType<typeof assumeString>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<typeof assumeString>[0], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof firstDeclared<never>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<typeof parseTrusted<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsAny<ReturnType<typeof JSON.parse>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<typeof parseTrusted<unknown>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<ReturnType<typeof assumeString>, string>, TODO>>; // TODO(koan) @koan-error
