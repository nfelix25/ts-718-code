import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type DateSlot,
  type ParsedNumberSlot,
  type ReadWriteRelationship,
  type StyleDeclaration,
  type StyleRule,
  type WriteValue,
  writeDate,
  writeNumberSlot,
  writeStyle,
} from "./k-172-unrelated-getter-setter-types.js";

/** EDGE CASES: self-assignment can fail, indexed/mapped types expose reads rather than writes, explicit annotations unlock unrelated pairs, optionality changes snapshots, and any/unknown/never can obscure directionality. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type NumberRead = ParsedNumberSlot["value"];
type NumberWrite = WriteValue<typeof writeNumberSlot>;
type StyleRead = StyleRule["style"];
type StyleWrite = WriteValue<typeof writeStyle>;
type DateRead = DateSlot["date"];
type DateWrite = WriteValue<typeof writeDate>;

// Pre-solved demonstrations make the lost self-assignment guarantee visible.
type _DemoNumberSelfAssignment = Expect<Equal<Extends<NumberRead, NumberWrite>, false>>;
type _DemoStyleUnrelated = Expect<Equal<ReadWriteRelationship<StyleRead, StyleWrite>, { readFitsWrite: false; writeFitsRead: false }>>;
type _DemoIndexedRead = Expect<Equal<StyleRule["style"], StyleDeclaration>>;
type _DemoMappedRead = Expect<Equal<{ [K in keyof StyleRule]: StyleRule[K] }["style"], StyleDeclaration>>;

// 1. Read-to-write and write-to-read are independent questions (1-8)
type _01 = Expect<Equal<Extends<NumberRead, NumberWrite>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<NumberWrite, NumberRead>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<StyleRead, StyleWrite>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<StyleWrite, StyleRead>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<DateRead, DateWrite>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<DateWrite, DateRead>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReadWriteRelationship<never, string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReadWriteRelationship<string, unknown>, TODO>>; // TODO(koan) @koan-error

// 2. Mapped utilities reconstruct ordinary properties from read types (9-16)
type NumberMapped = { [Key in keyof ParsedNumberSlot]: ParsedNumberSlot[Key] };
type StyleMapped = { [Key in keyof StyleRule]: StyleRule[Key] };
type _09 = Expect<Equal<NumberMapped["value"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<StyleMapped["style"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Readonly<ParsedNumberSlot>["value"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Partial<ParsedNumberSlot>["value"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Required<Partial<ParsedNumberSlot>>["value"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Pick<StyleRule, "style">["style"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof Omit<StyleRule, "style">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Record<"value", NumberRead>["value"], TODO>>; // TODO(koan) @koan-error

// 3. Unions and intersections combine visible read properties structurally (17-23)
type ReadUnion = ParsedNumberSlot | { readonly value: boolean };
type ReadIntersection = ParsedNumberSlot & { readonly extra: true };
type _17 = Expect<Equal<ReadUnion["value"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReadIntersection["value"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<keyof ReadUnion, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof ReadIntersection, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<NumberRead, undefined>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<NumberRead, undefined>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<NonNullable<DateRead>, TODO>>; // TODO(koan) @koan-error

// 4. Top/bottom/any and helper reflection can hide protocol mistakes (24-30)
type AnyRelation = ReadWriteRelationship<any, string>;
type _24 = Expect<Equal<IsAny<NumberRead>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<IsAny<WriteValue<(owner: object, value: any) => void>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<AnyRelation["readFitsWrite"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReadWriteRelationship<unknown, string>["readFitsWrite"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ReadWriteRelationship<never, string>["readFitsWrite"], TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<WriteValue<typeof writeStyle>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<StyleRule["style"], TODO>>; // TODO(koan) @koan-error
