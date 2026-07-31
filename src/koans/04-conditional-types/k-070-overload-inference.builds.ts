import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-070: overload inference — constructions
 * =============================================================================
 *
 * These constructions inspect and assemble visible call and construct
 * overloads. They distinguish final-signature inference from call-site
 * resolution, preserve whole overload lists with fixed extractors, contrast
 * intersections with distributive function unions, and cover summary,
 * generic, explicit-this, implementation, special-type, and constructor
 * behavior. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

interface GivenParse {
  (value: string): number;
  (value: number): string;
}

interface GivenSummary {
  (value: string): number;
  (value: number): string;
  (value: string | number): string | number;
}

interface GivenLiteral {
  (value: "a"): 1;
  (value: "b"): 2;
  (value: string): 3;
}

interface GivenOptional {
  (): 0;
  (value: string, radix?: number): 1;
}

interface GivenRest {
  (value: string): 1;
  (...values: number[]): 2;
}

interface GivenConstructor {
  new (value: string): { kind: "string"; value: string };
  new (
    value: number,
    radix?: number
  ): { kind: "number"; value: number };
}

interface GivenConstructorSummary {
  new (value: string): { kind: "string" };
  new (value: number): { kind: "number" };
  new (
    value: string | number
  ): { kind: "string" | "number" };
}

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenArgs<Fn> =
  Fn extends (...args: infer Params) => unknown ? Params : never;
type GivenReturn<Fn> =
  Fn extends (...args: any[]) => infer Result ? Result : never;
type GivenSignature<Fn> =
  Fn extends (...args: infer Params) => infer Result
    ? [Params, Result]
    : never;
type GivenConstructorArgs<Constructor> =
  Constructor extends abstract new (...args: infer Params) => unknown
    ? Params
    : never;
type GivenConstructorInstance<Constructor> =
  Constructor extends abstract new (...args: any[]) => infer Instance
    ? Instance
    : never;
type GivenTwoCalls<Fn> =
  Fn extends {
    (...args: infer FirstParams): infer FirstResult;
    (...args: infer LastParams): infer LastResult;
  }
    ? [
        [FirstParams, FirstResult],
        [LastParams, LastResult],
      ]
    : never;
type GivenThreeCalls<Fn> =
  Fn extends {
    (...args: infer FirstParams): infer FirstResult;
    (...args: infer SecondParams): infer SecondResult;
    (...args: infer LastParams): infer LastResult;
  }
    ? [
        [FirstParams, FirstResult],
        [SecondParams, SecondResult],
        [LastParams, LastResult],
      ]
    : never;
type GivenTwoConstructors<Constructor> =
  Constructor extends {
    new (...args: infer FirstParams): infer FirstInstance;
    new (...args: infer LastParams): infer LastInstance;
  }
    ? [
        [FirstParams, FirstInstance],
        [LastParams, LastInstance],
      ]
    : never;
type GivenThreeConstructors<Constructor> =
  Constructor extends {
    new (...args: infer FirstParams): infer FirstInstance;
    new (...args: infer SecondParams): infer SecondInstance;
    new (...args: infer LastParams): infer LastInstance;
  }
    ? [
        [FirstParams, FirstInstance],
        [SecondParams, SecondInstance],
        [LastParams, LastInstance],
      ]
    : never;
type GivenBuiltInReturn<Fn> =
  Fn extends (...args: any[]) => any ? ReturnType<Fn> : never;

// ─── Final visible call-signature inference ──────────────────────────────

// 1. Capture the parameters of the final visible call signature.
export type LastParameters<Fn> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<LastParameters<GivenParse>, [value: number]>
>;
type _01b = Expect<
  Equal<
    LastParameters<GivenSummary>,
    [value: string | number]
  >
>;
type _01c = Expect<
  Equal<
    LastParameters<GivenOptional>,
    [value: string, radix?: number | undefined]
  >
>;
type _01d = Expect<
  Equal<LastParameters<GivenRest>, number[]>
>;
type _01e = Expect<Equal<LastParameters<unknown>, never>>;

// 2. Capture the result of the final visible call signature.
export type LastResult<Fn> = TODO; // TODO(koan)

type _02a = Expect<Equal<LastResult<GivenParse>, string>>;
type _02b = Expect<
  Equal<LastResult<GivenSummary>, string | number>
>;
type _02c = Expect<Equal<LastResult<GivenLiteral>, 3>>;
type _02d = Expect<Equal<LastResult<GivenOptional>, 1>>;
type _02e = Expect<Equal<LastResult<never>, never>>;

// 3. Capture the final visible parameters and result as one correlated pair.
export type LastSignature<Fn> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<LastSignature<GivenParse>, [[value: number], string]>
>;
type _03b = Expect<
  Equal<
    LastSignature<GivenSummary>,
    [[value: string | number], string | number]
  >
>;
type _03c = Expect<
  Equal<LastSignature<GivenLiteral>, [[value: string], 3]>
>;
type _03d = Expect<
  Equal<
    LastSignature<GivenRest>,
    [number[], 2]
  >
>;
type _03e = Expect<Equal<LastSignature<unknown>, never>>;

// 4. Assemble two visible call signatures in the supplied order.
export type TwoCallOverloads<
  First extends (...args: any[]) => any,
  Last extends (...args: any[]) => any,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    GivenTwoCalls<
      TwoCallOverloads<
        (value: string) => number,
        (value: number) => string
      >
    >,
    [
      [[value: string], number],
      [[value: number], string],
    ]
  >
>;
type _04b = Expect<
  Equal<
    LastSignature<
      TwoCallOverloads<
        (value: string) => 1,
        (value: number) => 2
      >
    >,
    [[value: number], 2]
  >
>;
type _04c = Expect<
  Equal<
    LastSignature<
      TwoCallOverloads<
        (value: number) => 2,
        (value: string) => 1
      >
    >,
    [[value: string], 1]
  >
>;
type _04d = Expect<
  Equal<
    GivenTwoCalls<
      TwoCallOverloads<
        (value: "exact") => 1,
        (value: string) => 2
      >
    >,
    [
      [[value: "exact"], 1],
      [[value: string], 2],
    ]
  >
>;

// 5. Assemble three visible signatures, including a final summary when desired.
export type ThreeCallOverloads<
  First extends (...args: any[]) => any,
  Second extends (...args: any[]) => any,
  Last extends (...args: any[]) => any,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    GivenThreeCalls<
      ThreeCallOverloads<
        (value: string) => number,
        (value: number) => string,
        (value: string | number) => string | number
      >
    >,
    [
      [[value: string], number],
      [[value: number], string],
      [[value: string | number], string | number],
    ]
  >
>;
type _05b = Expect<
  Equal<
    LastSignature<
      ThreeCallOverloads<
        (value: "a") => 1,
        (value: "b") => 2,
        (value: string) => 3
      >
    >,
    [[value: string], 3]
  >
>;
type _05c = Expect<
  Equal<
    LastParameters<
      ThreeCallOverloads<
        () => 0,
        (value: string) => 1,
        (...values: number[]) => 2
      >
    >,
    number[]
  >
>;
type _05d = Expect<
  Equal<
    LastResult<
      ThreeCallOverloads<
        () => 0,
        (value: string) => 1,
        (...values: number[]) => 2
      >
    >,
    2
  >
>;

// 6. Assemble a callable union so inference distributes over every member.
export type FunctionUnion<
  Left extends (...args: any[]) => any,
  Right extends (...args: any[]) => any,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    LastParameters<
      FunctionUnion<
        (value: string) => 1,
        (value: number) => 2
      >
    >,
    [value: string] | [value: number]
  >
>;
type _06b = Expect<
  Equal<
    LastResult<
      FunctionUnion<
        (value: string) => 1,
        (value: number) => 2
      >
    >,
    1 | 2
  >
>;
type _06c = Expect<
  Equal<
    LastSignature<
      FunctionUnion<
        (value: string) => 1,
        (value: number) => 2
      >
    >,
    [[value: string], 1] | [[value: number], 2]
  >
>;
type _06d = Expect<
  Equal<
    LastSignature<
      FunctionUnion<
        () => 0,
        (value: 1, flag: true) => 2
      >
    >,
    [[], 0] | [[value: 1, flag: true], 2]
  >
>;
type _06e = Expect<
  Equal<
    FunctionUnion<never, (value: Date) => boolean>,
    (value: Date) => boolean
  >
>;

// 7. Expose the final signature together with its explicit-this metadata.
export type OverloadProfile<Fn> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    OverloadProfile<GivenParse>,
    {
      this: unknown;
      params: [value: number];
      result: string;
    }
  >
>;
type _07b = Expect<
  Equal<
    OverloadProfile<GivenSummary>,
    {
      this: unknown;
      params: [value: string | number];
      result: string | number;
    }
  >
>;
type _07c = Expect<
  Equal<
    OverloadProfile<GivenOptional>,
    {
      this: unknown;
      params: [value: string, radix?: number | undefined];
      result: 1;
    }
  >
>;
type _07d = Expect<
  Equal<
    OverloadProfile<unknown>,
    { this: unknown; params: never; result: never }
  >
>;

// ─── Generic, this, implementation, and special boundaries ──────────────

// 8. Construct an unconstrained generic final overload after a concrete one.
export type GenericLastOverloads = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    GivenTwoCalls<GenericLastOverloads>,
    [
      [[value: string], number],
      [[value: unknown], unknown],
    ]
  >
>;
type _08b = Expect<
  Equal<LastParameters<GenericLastOverloads>, [value: unknown]>
>;
type _08c = Expect<
  Equal<LastResult<GenericLastOverloads>, unknown>
>;
type _08d = Expect<
  Equal<
    LastSignature<GenericLastOverloads>,
    [[value: unknown], unknown]
  >
>;

// 9. Construct a constrained generic final overload after a concrete one.
export type ConstrainedGenericLastOverloads = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    GivenTwoCalls<ConstrainedGenericLastOverloads>,
    [
      [[value: number], number],
      [[value: string], string],
    ]
  >
>;
type _09b = Expect<
  Equal<
    LastParameters<ConstrainedGenericLastOverloads>,
    [value: string]
  >
>;
type _09c = Expect<
  Equal<LastResult<ConstrainedGenericLastOverloads>, string>
>;
type _09d = Expect<
  Equal<
    LastSignature<ConstrainedGenericLastOverloads>,
    [[value: string], string]
  >
>;

// 10. Construct two explicit-this overloads and expose only the final receiver.
export type ThisOverloads = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    ThisParameterType<ThisOverloads>,
    Map<string, number>
  >
>;
type _10b = Expect<
  Equal<LastParameters<ThisOverloads>, [value: string]>
>;
type _10c = Expect<Equal<LastResult<ThisOverloads>, number>>;
type _10d = Expect<
  Equal<
    OmitThisParameter<ThisOverloads>,
    (value: string) => number
  >
>;
type _10e = Expect<
  Equal<
    GivenTwoCalls<ThisOverloads>,
    [
      [[value: number], string],
      [[value: string], number],
    ]
  >
>;

// 11. Compare visible overload inference with a separately supplied body type.
export type ImplementationComparison<
  Visible,
  Implementation,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ImplementationComparison<
      GivenParse,
      (value: string | number) => string | number
    >,
    {
      visible: [[value: number], string];
      implementation: [
        [value: string | number],
        string | number,
      ];
    }
  >
>;
type _11b = Expect<
  Equal<
    ImplementationComparison<
      TwoCallOverloads<
        (value: string) => 1,
        (value: number) => 2
      >,
      (value: string | number) => 1 | 2
    >,
    {
      visible: [[value: number], 2];
      implementation: [[value: string | number], 1 | 2];
    }
  >
>;
type _11c = Expect<
  Equal<
    ImplementationComparison<
      GivenSummary,
      (value: string | number) => string | number
    >,
    {
      visible: [[value: string | number], string | number];
      implementation: [
        [value: string | number],
        string | number,
      ];
    }
  >
>;
type _11d = Expect<
  Equal<
    ImplementationComparison<unknown, unknown>,
    { visible: never; implementation: never }
  >
>;

// 12. Classify custom and built-in inference at special inputs.
export type OverloadSpecialProfile<Fn> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    OverloadSpecialProfile<any>,
    [false, unknown[], unknown, true]
  >
>;
type _12b = Expect<
  Equal<
    OverloadSpecialProfile<never>,
    [false, never, never, false]
  >
>;
type _12c = Expect<
  Equal<
    OverloadSpecialProfile<unknown>,
    [false, never, never, false]
  >
>;
type _12d = Expect<
  Equal<
    OverloadSpecialProfile<() => string>,
    [false, [], string, false]
  >
>;
type _12e = Expect<
  Equal<
    OverloadSpecialProfile<Function>,
    [false, never, never, false]
  >
>;

// ─── Final visible construct-signature inference ────────────────────────

// 13. Capture the parameters of the final visible construct signature.
export type LastConstructorParameters<Constructor> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    LastConstructorParameters<GivenConstructor>,
    [value: number, radix?: number | undefined]
  >
>;
type _13b = Expect<
  Equal<
    LastConstructorParameters<GivenConstructorSummary>,
    [value: string | number]
  >
>;
type _13c = Expect<
  Equal<LastConstructorParameters<new () => Date>, []>
>;
type _13d = Expect<
  Equal<
    LastConstructorParameters<
      (new (value: 1) => { value: 1 })
      | (new (value: 2) => { value: 2 })
    >,
    [value: 1] | [value: 2]
  >
>;
type _13e = Expect<
  Equal<LastConstructorParameters<() => Date>, never>
>;

// 14. Capture the instance of the final visible construct signature.
export type LastConstructorInstance<Constructor> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    LastConstructorInstance<GivenConstructor>,
    { kind: "number"; value: number }
  >
>;
type _14b = Expect<
  Equal<
    LastConstructorInstance<GivenConstructorSummary>,
    { kind: "string" | "number" }
  >
>;
type _14c = Expect<
  Equal<LastConstructorInstance<new () => Date>, Date>
>;
type _14d = Expect<
  Equal<
    LastConstructorInstance<
      (new (value: 1) => { value: 1 })
      | (new (value: 2) => { value: 2 })
    >,
    { value: 1 } | { value: 2 }
  >
>;
type _14e = Expect<
  Equal<LastConstructorInstance<never>, never>
>;

// 15. Capture final constructor parameters and instance together.
export type LastConstructorSignature<Constructor> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    LastConstructorSignature<GivenConstructor>,
    [
      [value: number, radix?: number | undefined],
      { kind: "number"; value: number },
    ]
  >
>;
type _15b = Expect<
  Equal<
    LastConstructorSignature<GivenConstructorSummary>,
    [
      [value: string | number],
      { kind: "string" | "number" },
    ]
  >
>;
type _15c = Expect<
  Equal<
    LastConstructorSignature<abstract new (id: number) => { id: number }>,
    [[id: number], { id: number }]
  >
>;
type _15d = Expect<
  Equal<LastConstructorSignature<unknown>, never>
>;

// 16. Assemble two visible constructor signatures in supplied order.
export type TwoConstructorOverloads<
  First extends abstract new (...args: any[]) => any,
  Last extends abstract new (...args: any[]) => any,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    GivenTwoConstructors<
      TwoConstructorOverloads<
        new (value: string) => { kind: "string" },
        new (value: number) => { kind: "number" }
      >
    >,
    [
      [[value: string], { kind: "string" }],
      [[value: number], { kind: "number" }],
    ]
  >
>;
type _16b = Expect<
  Equal<
    LastConstructorSignature<
      TwoConstructorOverloads<
        new (value: 1) => { value: 1 },
        new (value: 2) => { value: 2 }
      >
    >,
    [[value: 2], { value: 2 }]
  >
>;
type _16c = Expect<
  Equal<
    LastConstructorSignature<
      TwoConstructorOverloads<
        new (value: 2) => { value: 2 },
        new (value: 1) => { value: 1 }
      >
    >,
    [[value: 1], { value: 1 }]
  >
>;
type _16d = Expect<
  Equal<
    LastConstructorParameters<
      TwoConstructorOverloads<
        new () => Date,
        new (source: string, flags?: string) => RegExp
      >
    >,
    [source: string, flags?: string | undefined]
  >
>;

// 17. Assemble three constructors with a final broad summary.
export type ThreeConstructorOverloads<
  First extends abstract new (...args: any[]) => any,
  Second extends abstract new (...args: any[]) => any,
  Last extends abstract new (...args: any[]) => any,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    GivenThreeConstructors<
      ThreeConstructorOverloads<
        new (value: string) => { kind: "string" },
        new (value: number) => { kind: "number" },
        new (
          value: string | number
        ) => { kind: "string" | "number" }
      >
    >,
    [
      [[value: string], { kind: "string" }],
      [[value: number], { kind: "number" }],
      [
        [value: string | number],
        { kind: "string" | "number" },
      ],
    ]
  >
>;
type _17b = Expect<
  Equal<
    LastConstructorParameters<
      ThreeConstructorOverloads<
        new () => { arity: 0 },
        new (value: string) => { arity: 1 },
        new (...values: number[]) => { arity: "rest" }
      >
    >,
    number[]
  >
>;
type _17c = Expect<
  Equal<
    LastConstructorInstance<
      ThreeConstructorOverloads<
        new () => { arity: 0 },
        new (value: string) => { arity: 1 },
        new (...values: number[]) => { arity: "rest" }
      >
    >,
    { arity: "rest" }
  >
>;
type _17d = Expect<
  Equal<
    LastConstructorSignature<
      ThreeConstructorOverloads<
        new (value: "a") => { value: "a" },
        new (value: "b") => { value: "b" },
        new (value: string) => { value: string }
      >
    >,
    [[value: string], { value: string }]
  >
>;

// 18. Expose callable and constructable final signatures independently.
export type CallConstructProfile<Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    CallConstructProfile<GivenParse>,
    [[[value: number], string], never]
  >
>;
type _18b = Expect<
  Equal<
    CallConstructProfile<GivenConstructor>,
    [
      never,
      [
        [value: number, radix?: number | undefined],
        { kind: "number"; value: number },
      ],
    ]
  >
>;
type _18c = Expect<
  Equal<
    CallConstructProfile<{
      (value: string): number;
      (value: number): string;
      new (value: string): { kind: "string" };
      new (value: number): { kind: "number" };
    }>,
    [
      [[value: number], string],
      [[value: number], { kind: "number" }],
    ]
  >
>;
type _18d = Expect<
  Equal<CallConstructProfile<unknown>, [never, never]>
>;
