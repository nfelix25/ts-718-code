import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 147 - DELIBERATE SOUNDNESS HOLES
 * =======================================
 *
 * TypeScript optimizes for useful JavaScript compatibility, not a proof that no
 * typed program can fail. Several assignments are deliberately permissive:
 * mutable containers follow covariant element relationships, object freshness
 * checks are not exactness, calls do not invalidate every refinement, and type
 * assertions trust the author. Strict flags close important gaps without changing
 * that design goal.
 *
 * Read `Dog[] extends Animal[]` aloud as: "the checker permits this widening even
 * though the wider reference can write a Cat." Read `values[index]` under
 * `noUncheckedIndexedAccess` as: "the declared element type plus undefined because
 * bounds are not proven." Durable code locates trust boundaries and validates
 * there instead of assuming every accepted program is safe.
 */

export interface Animal { readonly kind: "animal" | "dog" | "cat"; readonly name: string }
export interface Dog extends Animal { readonly kind: "dog"; bark(): string }
export interface Cat extends Animal { readonly kind: "cat"; meow(): string }
export type MutableBox<Value> = { value: Value };
export type Article = { title: string; author?: string };

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// Part 1: Mutable covariance admits writes that violate the original reference.
type _01 = Expect<Equal<Extends<Dog[], Animal[]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal[], Dog[]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<MutableBox<Dog>, MutableBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<MutableBox<Animal>, MutableBox<Dog>>, TODO>>; // TODO(koan) @koan-error

// Part 2: Structural compatibility and fresh-literal checks are not exact types.
type Extra = { id: string; debug: true };
type _05 = Expect<Equal<Extends<Extra, { id: string }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<{ id: string }, Extra>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof Extra, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Pick<Extra, "id">, TODO>>; // TODO(koan) @koan-error

// Part 3: Indexed access syntax and indexed runtime expressions answer different questions.
type _09 = Expect<Equal<string[][number], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof readAt<string>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Record<string, number>[string], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof readScore>, TODO>>; // TODO(koan) @koan-error

// Part 4: Function calls do not globally invalidate narrowed mutable properties.
type _13 = Expect<Equal<Parameters<typeof eraseAuthor>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof eraseAuthor>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof unsafeUppercaseAuthor>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<NonNullable<Article["author"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Assertions, non-null assertions, and ambient declarations are explicit trust.
type _17 = Expect<Equal<ReturnType<typeof assumeString>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof firstDeclared<number>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<ReturnType<typeof JSON.parse>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof parseTrusted<{ id: number }>>, TODO>>; // TODO(koan) @koan-error

export function makeDog(name: string): Dog {
  return { kind: "dog", name, bark: () => `${name}: woof` };
}

export function makeCat(name: string): Cat {
  return { kind: "cat", name, meow: () => `${name}: meow` };
}

export function addAnimal(values: Animal[], value: Animal): void {
  values.push(value);
}

export function replaceAnimal(box: MutableBox<Animal>, value: Animal): void {
  box.value = value;
}

export function readAt<Value>(values: readonly Value[], index: number): Value | undefined {
  return values[index];
}

export function readScore(scores: Record<string, number>, key: string): number | undefined {
  return scores[key];
}

export function eraseAuthor(article: Article): void {
  delete article.author;
}

export function unsafeUppercaseAuthor(article: Article): string | undefined {
  if (article.author !== undefined) {
    eraseAuthor(article);
    return article.author.toUpperCase();
  }
  return undefined;
}

export function assumeString(value: unknown): string {
  return value as string;
}

export function firstDeclared<Value>(values: readonly Value[]): Value {
  return values[0]!;
}

export function parseTrusted<Value>(source: string): Value {
  return JSON.parse(source) as Value;
}
