import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ApiResult,
  compactValues,
  firstFailure,
  isFailure,
  isPresent,
  isStringValue,
  isSuccess,
  successfulValues,
} from "./k-187-inferred-predicate-release-lab.js";

/** GUIDED DRILLS: repeat inferred predicate call signatures, discriminant slices, filter/find results, generic nullish removal, primitive guards, negative complements, and consumer reflection. */

type Extends<From, To> = [From] extends [To] ? true : false;
type Success = Extract<ApiResult, { status: "success" }>;
type Failure = Extract<ApiResult, { status: "failure" }>;
type Pending = Extract<ApiResult, { status: "pending" }>;

// Domain slices (1-12)
type _01 = Expect<Equal<ApiResult["status"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Success, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Success["value"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Failure, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Failure["error"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Pending, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Pending["startedAt"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Exclude<ApiResult, Success>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Exclude<ApiResult, Failure>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Exclude<ApiResult, Pending>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<ApiResult, { status: "missing" }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof ApiResult, TODO>>; // TODO(koan) @koan-error

// Predicate function surfaces (13-24)
type _13 = Expect<Equal<typeof isSuccess, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof isSuccess>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof isSuccess>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<typeof isFailure, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<typeof isFailure>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof isFailure>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<typeof isStringValue, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof isStringValue>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<typeof isStringValue>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<typeof isSuccess, (value: ApiResult) => boolean>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<typeof isFailure, (value: ApiResult) => boolean>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<typeof isStringValue, (value: unknown) => boolean>, TODO>>; // TODO(koan) @koan-error

// Collection overload results (25-36)
type Results = ApiResult[];
type SuccessFilter = ReturnType<Results["filter"]>;
type _25 = Expect<Equal<ReturnType<typeof successfulValues>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<ReturnType<typeof successfulValues>[number], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Parameters<typeof successfulValues>[0], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ReturnType<typeof firstFailure>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Exclude<ReturnType<typeof firstFailure>, undefined>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extract<ReturnType<typeof firstFailure>, undefined>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Parameters<typeof firstFailure>[0], TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<SuccessFilter, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<ReturnType<Results["find"]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<Results["some"]>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<ReturnType<Results["every"]>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ReturnType<Results["filter"]>[number], TODO>>; // TODO(koan) @koan-error

// Generic presence predicates (37-48)
type _37 = Expect<Equal<typeof isPresent, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Parameters<typeof isPresent<string>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<ReturnType<typeof isPresent<string>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Parameters<typeof isPresent<number | null>>[0], TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<ReturnType<typeof compactValues<string>>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<typeof compactValues<number>>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ReturnType<typeof compactValues<{ id: string }>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Parameters<typeof compactValues<string>>[0], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<NonNullable<string | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Exclude<number | null | undefined, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extract<string | null | undefined, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<ReturnType<typeof compactValues<never>>, TODO>>; // TODO(koan) @koan-error

// Positive/complement and top/bottom repetition (49-60)
type _49 = Expect<Equal<Extract<ApiResult, Success>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Exclude<ApiResult, Success>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extract<ApiResult, Failure>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Exclude<ApiResult, Failure>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extract<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Exclude<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Extract<never, string>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Exclude<never, string>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extends<Success, ApiResult>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extends<ApiResult, Success>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extends<string, unknown>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<unknown, string>, TODO>>; // TODO(koan) @koan-error
