import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-088: recursive grammar capstone — constructions
 * =============================================================================
 *
 * These constructions assemble the packet's complete command language: trim
 * source text, parse scalar values and four command forms, recurse over
 * semicolon-separated programs with all-or-nothing failure, and map the ordered
 * AST to execution-result types. They also pin empty-statement policy,
 * delimiter and spacing behavior, numeric widening, literal unions, broad and
 * special inputs, and moderate recursion depth. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenWhitespace = " " | "\t" | "\n" | "\r";

type GivenTrimLeft<Text extends string> =
  string extends Text
    ? Text
    : Text extends `${GivenWhitespace}${infer Rest}`
      ? GivenTrimLeft<Rest>
      : Text;

type GivenTrimRight<Text extends string> =
  string extends Text
    ? Text
    : Text extends `${infer Rest}${GivenWhitespace}`
      ? GivenTrimRight<Rest>
      : Text;

type GivenTrim<Text extends string> =
  GivenTrimLeft<GivenTrimRight<Text>>;

type GivenNumber<Text extends string> =
  Text extends `${infer Value extends number}` ? Value : never;

type GivenBigInt<Text extends string> =
  Text extends `${infer Digits}n`
    ? Digits extends `${infer Value extends bigint}`
      ? Value
      : never
    : never;

type GivenScalar<Text extends string> =
  Text extends "true"
    ? true
    : Text extends "false"
      ? false
      : Text extends "null"
        ? null
        : Text extends "undefined"
          ? undefined
          : GivenBigInt<Text> extends never
            ? GivenNumber<Text> extends never
              ? Text
              : GivenNumber<Text>
            : GivenBigInt<Text>;

type GivenGet<Key extends string = string> = {
  op: "get";
  key: Key;
};

type GivenSet<Key extends string = string, Value = unknown> = {
  op: "set";
  key: Key;
  value: Value;
};

type GivenDelete<Key extends string = string> = {
  op: "delete";
  key: Key;
};

type GivenIncrement<
  Key extends string = string,
  Amount extends number = number,
> = {
  op: "increment";
  key: Key;
  amount: Amount;
};

type GivenCommandAst =
  | GivenGet
  | GivenSet
  | GivenDelete
  | GivenIncrement;

type GivenParseTrimmedCommand<Text extends string> =
  Text extends `get ${infer Key}`
    ? Key extends ""
      ? never
      : GivenGet<Key>
    : Text extends `set ${infer Key}=${infer Value}`
      ? Key extends ""
        ? never
        : GivenSet<Key, GivenScalar<Value>>
      : Text extends `delete ${infer Key}`
        ? Key extends ""
          ? never
          : GivenDelete<Key>
        : Text extends `increment ${infer Key} by ${infer Amount}`
          ? Key extends ""
            ? never
            : [GivenNumber<Amount>] extends [never]
              ? never
              : GivenIncrement<Key, GivenNumber<Amount>>
          : never;

type GivenParseCommand<Text extends string> =
  GivenParseTrimmedCommand<GivenTrim<Text>>;

type GivenParseLiteralProgram<Text extends string> =
  GivenTrim<Text> extends ""
    ? []
    : Text extends `${infer Head};${infer Tail}`
      ? GivenParseCommand<Head> extends infer Command
        ? [Command] extends [never]
          ? never
          : GivenParseLiteralProgram<Tail> extends infer Rest
            ? [Rest] extends [never]
              ? never
              : Rest extends readonly GivenCommandAst[]
                ? Command extends GivenCommandAst
                  ? [Command, ...Rest]
                  : never
                : never
            : never
        : never
      : GivenParseCommand<Text> extends infer Command
        ? [Command] extends [never]
          ? never
          : Command extends GivenCommandAst
            ? [Command]
            : never
        : never;

type GivenParseProgram<Text extends string> =
  Text extends unknown
    ? string extends Text
      ? GivenCommandAst[]
      : GivenParseLiteralProgram<Text>
    : never;

type GivenCommandResult<Command extends GivenCommandAst> =
  Command extends GivenGet
    ? unknown
    : Command extends GivenSet<string, infer Value>
      ? Value
      : Command extends GivenDelete
        ? boolean
        : Command extends GivenIncrement
          ? number
          : never;

type GivenProgramResults<Commands extends readonly GivenCommandAst[]> =
  number extends Commands["length"]
    ? GivenCommandResult<Commands[number]>[]
    : Commands extends readonly [
          infer Head extends GivenCommandAst,
          ...infer Tail extends GivenCommandAst[],
        ]
      ? [GivenCommandResult<Head>, ...GivenProgramResults<Tail>]
      : [];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenIsNever<Value> =
  [Value] extends [never] ? true : false;

// ─── Lexical and AST building blocks ───────────────────────────────────

// 1. Remove outer ASCII space, tab, newline, and carriage-return characters.
export type TrimGrammarText<Text extends string> = TODO; // TODO(koan)

type _01a = Expect<Equal<TrimGrammarText<"  get name  ">, "get name">>;
type _01b = Expect<
  Equal<TrimGrammarText<"\t\nset x=1\r">, "set x=1">
>;
type _01c = Expect<Equal<TrimGrammarText<"get  name">, "get  name">>;
type _01d = Expect<Equal<TrimGrammarText<" \t\n\r ">, "">>;
type _01e = Expect<
  Equal<TrimGrammarText<" get a " | "\tdelete b\n">, "get a" | "delete b">
>;

// 2. Parse the grammar's reserved, bigint, numeric, and fallback scalar values.
export type ParseGrammarScalar<Text extends string> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    ParseGrammarScalar<"true" | "false" | "null" | "undefined">,
    boolean | null | undefined
  >
>;
type _02b = Expect<
  Equal<ParseGrammarScalar<"42n" | "-42n">, 42n | -42n>
>;
type _02c = Expect<
  Equal<ParseGrammarScalar<"42" | "-3.5" | "01">, 42 | -3.5 | number>
>;
type _02d = Expect<
  Equal<ParseGrammarScalar<"Ada" | "NaN" | "">, "Ada" | "NaN" | "">
>;
type _02e = Expect<
  Equal<
    ParseGrammarScalar<"true" | "42n" | "42" | "raw">,
    true | 42n | 42 | "raw"
  >
>;

// 3. Build a get AST node for the supplied key.
export type BuildGetCommand<Key extends string = string> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<BuildGetCommand<"name">, { op: "get"; key: "name" }>
>;
type _03b = Expect<
  Equal<BuildGetCommand<"first name">, { op: "get"; key: "first name" }>
>;
type _03c = Expect<
  Equal<BuildGetCommand<"">, { op: "get"; key: "" }>
>;
type _03d = Expect<
  Equal<
    BuildGetCommand<"a" | "b">,
    { op: "get"; key: "a" | "b" }
  >
>;
type _03e = Expect<Equal<BuildGetCommand, GivenGet>>;

// 4. Build a set AST node while preserving the exact value type.
export type BuildSetCommand<
  Key extends string = string,
  Value = unknown,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    BuildSetCommand<"count", 42>,
    { op: "set"; key: "count"; value: 42 }
  >
>;
type _04b = Expect<
  Equal<
    BuildSetCommand<"enabled", true>,
    { op: "set"; key: "enabled"; value: true }
  >
>;
type _04c = Expect<
  Equal<
    BuildSetCommand<"name", "Ada">,
    { op: "set"; key: "name"; value: "Ada" }
  >
>;
type _04d = Expect<
  Equal<
    BuildSetCommand<"x" | "y", 1 | 2>,
    { op: "set"; key: "x" | "y"; value: 1 | 2 }
  >
>;
type _04e = Expect<Equal<BuildSetCommand, GivenSet>>;

// 5. Build a delete AST node for the supplied key.
export type BuildDeleteCommand<Key extends string = string> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<BuildDeleteCommand<"name">, { op: "delete"; key: "name" }>
>;
type _05b = Expect<
  Equal<BuildDeleteCommand<"first name">, { op: "delete"; key: "first name" }>
>;
type _05c = Expect<
  Equal<BuildDeleteCommand<"">, { op: "delete"; key: "" }>
>;
type _05d = Expect<
  Equal<
    BuildDeleteCommand<"a" | "b">,
    { op: "delete"; key: "a" | "b" }
  >
>;
type _05e = Expect<Equal<BuildDeleteCommand, GivenDelete>>;

// 6. Build an increment AST node with an exact numeric amount.
export type BuildIncrementCommand<
  Key extends string = string,
  Amount extends number = number,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    BuildIncrementCommand<"count", 2>,
    { op: "increment"; key: "count"; amount: 2 }
  >
>;
type _06b = Expect<
  Equal<
    BuildIncrementCommand<"count", -3.5>,
    { op: "increment"; key: "count"; amount: -3.5 }
  >
>;
type _06c = Expect<
  Equal<
    BuildIncrementCommand<"count", number>,
    { op: "increment"; key: "count"; amount: number }
  >
>;
type _06d = Expect<
  Equal<
    BuildIncrementCommand<"x" | "y", 1 | 2>,
    { op: "increment"; key: "x" | "y"; amount: 1 | 2 }
  >
>;
type _06e = Expect<Equal<BuildIncrementCommand, GivenIncrement>>;

// 7. Build the union accepted as one command AST node.
export type BuildCommandAst = TODO; // TODO(koan)

type _07a = Expect<Equal<BuildCommandAst, GivenCommandAst>>;
type _07b = Expect<
  Equal<Extract<BuildCommandAst, { op: "get" }>, GivenGet>
>;
type _07c = Expect<
  Equal<Extract<BuildCommandAst, { op: "set" }>, GivenSet>
>;
type _07d = Expect<
  Equal<
    Extract<BuildCommandAst, { op: "delete" | "increment" }>,
    GivenDelete | GivenIncrement
  >
>;
type _07e = Expect<
  Equal<BuildCommandAst["op"], "get" | "set" | "delete" | "increment">
>;

// ─── Individual command parsing ────────────────────────────────────────

// 8. Trim and parse only the get command form, rejecting an empty key.
export type ParseGetCommand<Text extends string> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ParseGetCommand<"get name">, GivenGet<"name">>
>;
type _08b = Expect<
  Equal<ParseGetCommand<"  get first name \n">, GivenGet<"first name">>
>;
type _08c = Expect<Equal<ParseGetCommand<"get ">, never>>;
type _08d = Expect<Equal<ParseGetCommand<"GET name" | "delete name">, never>>;
type _08e = Expect<
  Equal<
    ParseGetCommand<"get a" | "get b">,
    GivenGet<"a"> | GivenGet<"b">
  >
>;

// 9. Trim and parse only set, splitting its field at the first equals sign.
export type ParseSetCommand<Text extends string> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ParseSetCommand<"set count=42">, GivenSet<"count", 42>>
>;
type _09b = Expect<
  Equal<
    ParseSetCommand<"\tset enabled=true\n">,
    GivenSet<"enabled", true>
  >
>;
type _09c = Expect<
  Equal<ParseSetCommand<"set name=a=b">, GivenSet<"name", "a=b">>
>;
type _09d = Expect<Equal<ParseSetCommand<"set =42">, never>>;
type _09e = Expect<
  Equal<
    ParseSetCommand<"set name=" | "set limit=42n">,
    GivenSet<"name", ""> | GivenSet<"limit", 42n>
  >
>;

// 10. Trim and parse only the delete command form, rejecting an empty key.
export type ParseDeleteCommand<Text extends string> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<ParseDeleteCommand<"delete name">, GivenDelete<"name">>
>;
type _10b = Expect<
  Equal<
    ParseDeleteCommand<" \tdelete first name\r">,
    GivenDelete<"first name">
  >
>;
type _10c = Expect<Equal<ParseDeleteCommand<"delete ">, never>>;
type _10d = Expect<Equal<ParseDeleteCommand<"DELETE name" | "get name">, never>>;
type _10e = Expect<
  Equal<
    ParseDeleteCommand<"delete a" | "delete b">,
    GivenDelete<"a"> | GivenDelete<"b">
  >
>;

// 11. Trim and parse only increment, requiring a nonempty key and numeric amount.
export type ParseIncrementCommand<Text extends string> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    ParseIncrementCommand<"increment count by 2">,
    GivenIncrement<"count", 2>
  >
>;
type _11b = Expect<
  Equal<
    ParseIncrementCommand<" increment count by -3.5 ">,
    GivenIncrement<"count", -3.5>
  >
>;
type _11c = Expect<
  Equal<
    ParseIncrementCommand<"increment count by 01">,
    GivenIncrement<"count", number>
  >
>;
type _11d = Expect<
  Equal<
    ParseIncrementCommand<
      "increment count by many" | "increment  by 2"
    >,
    never
  >
>;
type _11e = Expect<
  Equal<
    ParseIncrementCommand<
      "increment x by 1" | "increment y by 2"
    >,
    GivenIncrement<"x", 1> | GivenIncrement<"y", 2>
  >
>;

// 12. Parse the first matching command prefix into one exact AST node.
export type ParseCommand<Text extends string> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ParseCommand<"get x" | "set y=false">,
    GivenGet<"x"> | GivenSet<"y", false>
  >
>;
type _12b = Expect<
  Equal<
    ParseCommand<"delete x" | "increment y by 2">,
    GivenDelete<"x"> | GivenIncrement<"y", 2>
  >
>;
type _12c = Expect<
  Equal<ParseCommand<"get get x">, GivenGet<"get x">>
>;
type _12d = Expect<
  Equal<ParseCommand<"get  x">, GivenGet<" x">>
>;
type _12e = Expect<
  Equal<ParseCommand<"unknown x" | "increment x by many" | "">, never>
>;

// ─── Program and result recursion ──────────────────────────────────────

// 13. Parse a literal or broad program with ordered, all-or-nothing recursion.
export type ParseProgram<Text extends string> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ParseProgram<"">, []>
>;
type _13b = Expect<
  Equal<
    ParseProgram<"set count=1;get count">,
    [GivenSet<"count", 1>, GivenGet<"count">]
  >
>;
type _13c = Expect<
  Equal<
    ParseProgram<"set count=1;increment count by 2;get count">,
    [
      GivenSet<"count", 1>,
      GivenIncrement<"count", 2>,
      GivenGet<"count">,
    ]
  >
>;
type _13d = Expect<
  Equal<
    ParseProgram<"get name;unknown x" | ";get name">,
    never
  >
>;
type _13e = Expect<
  Equal<ParseProgram<string>, GivenCommandAst[]>
>;

// 14. Map one command AST node to the value produced by its execution.
export type CommandResult<Command extends GivenCommandAst> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<CommandResult<GivenGet<"x">>, unknown>
>;
type _14b = Expect<
  Equal<CommandResult<GivenSet<"x", 42>>, 42>
>;
type _14c = Expect<
  Equal<CommandResult<GivenSet<"x", true | null>>, true | null>
>;
type _14d = Expect<
  Equal<CommandResult<GivenDelete<"x">>, boolean>
>;
type _14e = Expect<
  Equal<CommandResult<GivenIncrement<"x", 2>>, number>
>;

// 15. Recursively map an AST tuple to ordered results, with arrays staying arrays.
export type ProgramResults<
  Commands extends readonly GivenCommandAst[],
> = TODO; // TODO(koan)

type _15a = Expect<Equal<ProgramResults<[]>, []>>;
type _15b = Expect<
  Equal<
    ProgramResults<[GivenSet<"x", 1>, GivenGet<"x">]>,
    [1, unknown]
  >
>;
type _15c = Expect<
  Equal<
    ProgramResults<
      readonly [GivenSet<"x", true>, GivenDelete<"x">]
    >,
    [true, boolean]
  >
>;
type _15d = Expect<
  Equal<
    ProgramResults<
      [GivenIncrement<"x", 2>, GivenGet<"x">, GivenDelete<"x">]
    >,
    [number, unknown, boolean]
  >
>;
type _15e = Expect<
  Equal<ProgramResults<GivenCommandAst[]>, unknown[]>
>;

// ─── Grammar policies and edge profiles ────────────────────────────────

// 16. Describe outer trimming, retained inner spacing, and exact keyword case.
export type CommandWhitespaceProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<CommandWhitespaceProfile["outer"], GivenGet<"name">>
>;
type _16b = Expect<
  Equal<CommandWhitespaceProfile["keySpace"], GivenGet<" name">>
>;
type _16c = Expect<
  Equal<
    CommandWhitespaceProfile["phraseKey"],
    GivenDelete<"first name">
  >
>;
type _16d = Expect<Equal<CommandWhitespaceProfile["upper"], never>>;
type _16e = Expect<Equal<CommandWhitespaceProfile["blank"], never>>;

// 17. Describe which empty statements are valid around semicolon recursion.
export type ProgramSeparatorProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ProgramSeparatorProfile["empty"], []>>;
type _17b = Expect<Equal<ProgramSeparatorProfile["whitespace"], []>>;
type _17c = Expect<
  Equal<ProgramSeparatorProfile["trailing"], [GivenGet<"x">]>
>;
type _17d = Expect<Equal<ProgramSeparatorProfile["leading"], never>>;
type _17e = Expect<Equal<ProgramSeparatorProfile["interior"], never>>;

// 18. Describe set's first-equals capture and semicolon's statement role.
export type SetDelimiterProfile = TODO; // TODO(koan)

type _18a = Expect<
  Equal<SetDelimiterProfile["severalEquals"], GivenSet<"x", "a=b">>
>;
type _18b = Expect<
  Equal<SetDelimiterProfile["emptyValue"], GivenSet<"key", "">>
>;
type _18c = Expect<Equal<SetDelimiterProfile["emptyKey"], never>>;
type _18d = Expect<
  Equal<
    SetDelimiterProfile["followed"],
    [GivenSet<"x", "a=b">, GivenGet<"x">]
  >
>;
type _18e = Expect<Equal<SetDelimiterProfile["semicolonValue"], never>>;

// 19. Describe exact, widened, negative, and invalid increment amounts.
export type IncrementNumberProfile = TODO; // TODO(koan)

type _19a = Expect<
  Equal<IncrementNumberProfile["exact"], GivenIncrement<"x", 2>>
>;
type _19b = Expect<
  Equal<
    IncrementNumberProfile["negative"],
    GivenIncrement<"x", -3.5>
  >
>;
type _19c = Expect<
  Equal<
    IncrementNumberProfile["leadingZero"],
    GivenIncrement<"x", number>
  >
>;
type _19d = Expect<
  Equal<
    IncrementNumberProfile["exponent"],
    GivenIncrement<"x", number>
  >
>;
type _19e = Expect<Equal<IncrementNumberProfile["invalid"], never>>;

// 20. Preserve valid union alternatives and reject any invalid literal program wholly.
export type ProgramFailureProfile = TODO; // TODO(koan)

type _20a = Expect<Equal<ProgramFailureProfile["invalidTail"], never>>;
type _20b = Expect<Equal<ProgramFailureProfile["invalidHead"], never>>;
type _20c = Expect<Equal<ProgramFailureProfile["invalidMiddle"], never>>;
type _20d = Expect<
  Equal<
    ProgramFailureProfile["validUnion"],
    [GivenGet<"a">] | [GivenGet<"b">]
  >
>;
type _20e = Expect<
  Equal<ProgramFailureProfile["mixedUnion"], [GivenGet<"a">]>
>;

// 21. Describe broad, any, never, and finite framed source boundaries safely.
export type ProgramBoundaryProfile = TODO; // TODO(koan)

type _21a = Expect<
  Equal<ProgramBoundaryProfile["broad"], GivenCommandAst[]>
>;
type _21b = Expect<
  Equal<ProgramBoundaryProfile["any"], GivenCommandAst[]>
>;
type _21c = Expect<Equal<ProgramBoundaryProfile["never"], never>>;
type _21d = Expect<Equal<ProgramBoundaryProfile["anyIsAny"], false>>;
type _21e = Expect<
  Equal<
    ProgramBoundaryProfile["framedGet"],
    [GivenGet<string>]
  >
>;

// 22. Build an AST/result overview that retains order and exposes invalidity.
export type GrammarProgramSummary<Text extends string> = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    GrammarProgramSummary<"set x=1;increment x by 2;get x;delete x">[
      "results"
    ],
    [1, number, unknown, boolean]
  >
>;
type _22b = Expect<
  Equal<
    GrammarProgramSummary<"get a;get b;get c;get d;get e;get f">[
      "length"
    ],
    6
  >
>;
type _22c = Expect<
  Equal<
    GrammarProgramSummary<"set a=1;set b=true;delete a">["operations"],
    "set" | "delete"
  >
>;
type _22d = Expect<
  Equal<
    GrammarProgramSummary<"get x;unknown y">["invalid" | "ast"],
    true | never
  >
>;
type _22e = Expect<
  Equal<
    GrammarProgramSummary<string>["ast" | "results"],
    GivenCommandAst[] | unknown[]
  >
>;
