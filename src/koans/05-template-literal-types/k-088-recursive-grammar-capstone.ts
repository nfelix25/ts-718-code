import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-088: recursive grammar capstone
 * =============================================================================
 *
 * A small language combines the entire template-literal phase: trim source
 * text, match command prefixes, parse delimited fields and scalar literals,
 * recurse over statement separators, build an AST tuple, and derive execution
 * results from that AST.
 *
 * This lesson's grammar is exact:
 *
 * - `get key`
 * - `set key=value`
 * - `delete key`
 * - `increment key by number`
 * - commands are separated by `;`
 *
 * Outer ASCII whitespace is ignored. A trailing semicolon is accepted because
 * the final empty tail is the program base case. A leading or interior empty
 * command is invalid. If any nonempty command fails, the entire literal program
 * is `never`; silently filtering invalid commands would produce an AST for a
 * different program. Broad source text falls back to `CommandAst[]` because its
 * finite syntax is unknown.
 *
 * I read the program recursion aloud as: "Parse Head. If Head is invalid, fail.
 * Otherwise parse Tail. If Tail fails, fail. Otherwise prepend Head's AST node
 * to Tail's AST tuple." The same tuple recursion maps nodes to execution result
 * types, preserving statement order end to end.
 */

type GrammarWhitespace = " " | "\t" | "\n" | "\r";
type GrammarTrimLeft<Text extends string> = string extends Text
  ? Text
  : Text extends `${GrammarWhitespace}${infer Rest}` ? GrammarTrimLeft<Rest> : Text;
type GrammarTrimRight<Text extends string> = string extends Text
  ? Text
  : Text extends `${infer Rest}${GrammarWhitespace}` ? GrammarTrimRight<Rest> : Text;
type GrammarTrim<Text extends string> = GrammarTrimLeft<GrammarTrimRight<Text>>;
type GrammarNumber<Text extends string> = Text extends `${infer Value extends number}` ? Value : never;
type GrammarBigInt<Text extends string> = Text extends `${infer Digits}n`
  ? Digits extends `${infer Value extends bigint}` ? Value : never
  : never;
export type GrammarScalar<Text extends string> = Text extends "true" ? true
  : Text extends "false" ? false
  : Text extends "null" ? null
  : Text extends "undefined" ? undefined
  : GrammarBigInt<Text> extends never
    ? GrammarNumber<Text> extends never ? Text : GrammarNumber<Text>
    : GrammarBigInt<Text>;

export type GetCommand<Key extends string = string> = { op: "get"; key: Key };
export type SetCommand<Key extends string = string, Value = unknown> = { op: "set"; key: Key; value: Value };
export type DeleteCommand<Key extends string = string> = { op: "delete"; key: Key };
export type IncrementCommand<Key extends string = string, Amount extends number = number> = {
  op: "increment";
  key: Key;
  amount: Amount;
};
export type CommandAst = GetCommand | SetCommand | DeleteCommand | IncrementCommand;

type ParseTrimmedCommand<Text extends string> = Text extends `get ${infer Key}`
  ? Key extends "" ? never : GetCommand<Key>
  : Text extends `set ${infer Key}=${infer Value}`
    ? Key extends "" ? never : SetCommand<Key, GrammarScalar<Value>>
    : Text extends `delete ${infer Key}`
      ? Key extends "" ? never : DeleteCommand<Key>
      : Text extends `increment ${infer Key} by ${infer Amount}`
        ? Key extends ""
          ? never
          : [GrammarNumber<Amount>] extends [never]
            ? never
            : IncrementCommand<Key, GrammarNumber<Amount>>
        : never;
export type ParseCommand<Text extends string> = ParseTrimmedCommand<GrammarTrim<Text>>;
type ParseLiteralProgram<Text extends string> = GrammarTrim<Text> extends ""
  ? []
  : Text extends `${infer Head};${infer Tail}`
    ? ParseCommand<Head> extends infer Command
      ? [Command] extends [never]
        ? never
        : ParseLiteralProgram<Tail> extends infer Rest
          ? [Rest] extends [never]
            ? never
            : Rest extends readonly CommandAst[]
              ? Command extends CommandAst ? [Command, ...Rest] : never
              : never
          : never
      : never
    : ParseCommand<Text> extends infer Command
      ? [Command] extends [never] ? never : Command extends CommandAst ? [Command] : never
      : never;
export type ParseProgram<Text extends string> = Text extends unknown
  ? string extends Text ? CommandAst[] : ParseLiteralProgram<Text>
  : never;
export type CommandResult<Command extends CommandAst> = Command extends GetCommand
  ? unknown
  : Command extends SetCommand<string, infer Value>
    ? Value
    : Command extends DeleteCommand
      ? boolean
      : Command extends IncrementCommand
        ? number
        : never;
export type ProgramResults<Commands extends readonly CommandAst[]> =
  number extends Commands["length"]
    ? CommandResult<Commands[number]>[]
    : Commands extends readonly [infer Head extends CommandAst, ...infer Tail extends CommandAst[]]
      ? [CommandResult<Head>, ...ProgramResults<Tail>]
      : [];

function runtimeScalar(text: string): unknown {
  if (text === "true") return true;
  if (text === "false") return false;
  if (text === "null") return null;
  if (text === "undefined") return undefined;
  if (/^-?\d+n$/.test(text)) return BigInt(text.slice(0, -1));
  if (text.trim() !== "" && Number.isFinite(Number(text))) return Number(text);
  return text;
}

export function executeProgram<const Program extends string>(
  program: Program,
  initial: Record<string, unknown> = {},
): ProgramResults<ParseProgram<Program>> {
  const state = new Map(Object.entries(initial));
  const results: unknown[] = [];
  const commands = program.split(";");

  for (const raw of commands) {
    const command = raw.trim();
    if (command === "") continue;
    if (command.startsWith("get ")) {
      results.push(state.get(command.slice(4)));
      continue;
    }
    if (command.startsWith("set ")) {
      const field = command.slice(4);
      const index = field.indexOf("=");
      if (index === -1) throw new Error(`Invalid set command: ${command}`);
      const key = field.slice(0, index);
      const value = runtimeScalar(field.slice(index + 1));
      state.set(key, value);
      results.push(value);
      continue;
    }
    if (command.startsWith("delete ")) {
      results.push(state.delete(command.slice(7)));
      continue;
    }
    const increment = /^increment (.+) by (.+)$/.exec(command);
    if (increment) {
      const key = increment[1]!;
      const amount = Number(increment[2]);
      if (!Number.isFinite(amount)) throw new Error(`Invalid increment: ${command}`);
      const value = Number(state.get(key) ?? 0) + amount;
      state.set(key, value);
      results.push(value);
      continue;
    }
    throw new Error(`Invalid command: ${command}`);
  }
  return results as ProgramResults<ParseProgram<Program>>;
}

// Part 1: each command form parses into one precise AST node.
type _Main01 = Expect<Equal<ParseCommand<"get name">, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ParseCommand<"set count=42">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ParseCommand<"delete active">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ParseCommand<"increment count by 2">, TODO>>; // TODO(koan) @koan-error

// Part 2: outer whitespace is trimmed before command matching.
type _Main05 = Expect<Equal<ParseCommand<"  get name  ">, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ParseCommand<"\tset enabled=true\n">, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ParseCommand<"unknown name">, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ParseCommand<"increment count by many">, TODO>>; // TODO(koan) @koan-error

// Part 3: semicolon recursion preserves command order in an AST tuple.
type _Main09 = Expect<Equal<ParseProgram<"get name">, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ParseProgram<"set count=1;get count">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ParseProgram<"set count=1;increment count by 2;get count">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ParseProgram<"">, TODO>>; // TODO(koan) @koan-error

// Part 4: invalid commands reject the complete literal program.
type _Main13 = Expect<Equal<ParseProgram<"get name;unknown x">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ParseProgram<";get name">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<ParseProgram<"get name;;delete name">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ParseProgram<"get name;">, TODO>>; // TODO(koan) @koan-error

// Part 5: AST recursion derives the ordered runtime result tuple.
type MainProgram = ParseProgram<"set count=1;increment count by 2;get count;delete count">;
type _Main17 = Expect<Equal<ProgramResults<MainProgram>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<CommandResult<SetCommand<"x", true>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<CommandResult<GetCommand<"x">>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ParseProgram<string>, TODO>>; // TODO(koan) @koan-error
