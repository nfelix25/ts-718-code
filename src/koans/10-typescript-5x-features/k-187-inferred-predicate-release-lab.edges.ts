import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ApiResult,
  isPresent,
  isStringValue,
  isSuccess,
} from "./k-187-inferred-predicate-release-lab.js";

/** EDGE CASES: inference needs one unannotated return and no parameter mutation, truthiness must describe an exact complement, extra semantic conditions lose iff precision, Boolean indirection blocks proof, ReturnType erases the predicate relation, and generic guards preserve caller substitutions. */

type Extends<From, To> = [From] extends [To] ? true : false;

const annotated = (value: unknown): boolean => typeof value === "string";
function multipleReturns(value: unknown) {
  if (typeof value === "string") return true;
  return false;
}
function mutates(value: string | number) {
  value = String(value);
  return typeof value === "string";
}
const viaBoolean = (value: unknown) => Boolean(value);
const nonEmptyString = (value: unknown) =>
  typeof value === "string" && value.length > 0;
const truthyObject = (value: object | null) => !!value;
const truthyNumber = (value: number | null) => !!value;

// Pre-solved demonstrations establish inferable and blocked signatures.
type _DemoInferred = Expect<Equal<typeof isStringValue, (value: unknown) => value is string>>;
type _DemoAnnotated = Expect<Equal<typeof annotated, (value: unknown) => boolean>>;
type _DemoObjectTruth = Expect<Equal<typeof truthyObject, (value: object | null) => value is object>>;
type _DemoNumberTruth = Expect<Equal<typeof truthyNumber, (value: number | null) => boolean>>;

// 1. Syntax/mutation blockers (1-8)
type _01 = Expect<Equal<typeof annotated, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof multipleReturns, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<typeof mutates, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<typeof viaBoolean, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<typeof annotated>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<typeof multipleReturns>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<typeof mutates>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<typeof viaBoolean>, TODO>>; // TODO(koan) @koan-error

// 2. Truthiness and extra-condition iff failures (9-15)
type _09 = Expect<Equal<typeof nonEmptyString, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof truthyObject, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof truthyNumber, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof nonEmptyString>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReturnType<typeof truthyObject>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof truthyNumber>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof truthyNumber>[0], TODO>>; // TODO(koan) @koan-error

// 3. Predicate relation versus ReturnType erasure (16-22)
type _16 = Expect<Equal<typeof isSuccess, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<typeof isSuccess>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<typeof isStringValue, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof isStringValue>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<typeof isStringValue, (value: unknown) => boolean>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<(value: unknown) => boolean, typeof isStringValue>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Parameters<typeof isSuccess>[0], TODO>>; // TODO(koan) @koan-error

// 4. Generic and domain boundaries (23-30)
type _23 = Expect<Equal<typeof isPresent, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Parameters<typeof isPresent<unknown>>[0], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof isPresent<unknown>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<typeof isPresent<never>>[0], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<typeof isPresent<never>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extract<ApiResult, { status: "success" }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Exclude<ApiResult, { status: "success" }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<never, ApiResult>, TODO>>; // TODO(koan) @koan-error
