import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AssignmentEvidence,
  type InitializationCase,
  type InitializationCheck,
  type ReadLocation,
  classifyInitialization,
  createOptionalPrinter,
  initializationCases,
} from "./k-199-never-initialized-variables.js";

/** EDGE CASES: 5.7 detects no assignment anywhere but does not prove closure call order, conditional assignment stays optimistic in a nested function, same-scope control flow remains stricter, explicit undefined is an initialized value only when the type permits it, class-field initialization is a separate analysis, and modeled cases are not compiler execution. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of the precise 5.7 boundary.
type _DemoNeverCaptured = Expect<Equal<typeof initializationCases[0], { readonly evidence: "none"; readonly location: "nested-function" }>>;
type _DemoMaybeCaptured = Expect<Equal<typeof initializationCases[1]["evidence"], "conditional">>;
type _DemoOptionalInput = Expect<Equal<Parameters<typeof createOptionalPrinter>[0], number | undefined>>;
type _DemoClassifier = Expect<Equal<ReturnType<typeof classifyInitialization>, InitializationCheck>>;

// 1. "Never" means no assignment evidence, not the never type (1-7)
type _01 = Expect<Equal<Extract<AssignmentEvidence, "none">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsNever<Extract<AssignmentEvidence, "none">>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<AssignmentEvidence, "missing">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsNever<Extract<AssignmentEvidence, "missing">>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Exclude<AssignmentEvidence, AssignmentEvidence>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsNever<Exclude<AssignmentEvidence, AssignmentEvidence>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsBroadString<AssignmentEvidence>, TODO>>; // TODO(koan) @koan-error

// 2. Same evidence can differ by read location (8-14)
type ConditionalCase = InitializationCase<"conditional", ReadLocation>;
type _08 = Expect<Equal<ConditionalCase["evidence"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ConditionalCase["location"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<ReadLocation, "same-scope">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<ReadLocation, "nested-function">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Exclude<ReadLocation, "same-scope">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<"same-scope", "nested-function">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<ReadLocation, string>, TODO>>; // TODO(koan) @koan-error

// 3. Optional representation differs from uninitialized storage (15-21)
type OptionalInput = Parameters<typeof createOptionalPrinter>[0];
type _15 = Expect<Equal<OptionalInput, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<OptionalInput, undefined>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Exclude<OptionalInput, undefined>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<NonNullable<OptionalInput>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof createOptionalPrinter>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<ReturnType<typeof createOptionalPrinter>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<undefined, OptionalInput>, TODO>>; // TODO(koan) @koan-error

// 4. Closed diagnostic policy and model boundaries (22-26)
type _22 = Expect<Equal<IsBroadString<InitializationCheck>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extract<InitializationCheck, `${string}optimistic`>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extract<InitializationCheck, `${string}assigned`>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Parameters<typeof classifyInitialization>[0], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<keyof InitializationCase, TODO>>; // TODO(koan) @koan-error

// 5. Top and bottom relationships (27-30)
type _27 = Expect<Equal<Extends<never, InitializationCase>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, InitializationCase>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<InitializationCase, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IsNever<Extract<InitializationCheck, never>>, TODO>>; // TODO(koan) @koan-error
