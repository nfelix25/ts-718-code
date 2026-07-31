import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 207 - IMPORT DEFER
 * ========================
 *
 * A normal static import links, loads, and evaluates its module graph before the
 * importing module's body runs. `import defer` keeps static linking and loading,
 * but postpones evaluation until code first accesses an export on the namespace.
 *
 * TypeScript 5.9 supports the proposal's namespace-only syntax:
 * `import defer * as feature from "./feature.js"`.
 * Named and default forms are invalid because property access on the namespace
 * is the observable trigger for evaluation.
 *
 * TypeScript does not downlevel this syntax. Only `module: "esnext"` and
 * `"preserve"` accept it, and a runtime or bundler must implement the semantics.
 * It differs from dynamic `import()`: the module is already loaded, no Promise
 * is returned, and only evaluation is delayed.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html#support-for-import-defer
 */

export type DeferredImportForm = "namespace" | "named" | "default";
export type DeferredModuleMode = "esnext" | "preserve" | "commonjs" | "nodenext";
export type DeferredImportCheck =
  | "supported"
  | "namespace-only-error"
  | "module-mode-error";

export interface DeferredImportCase {
  form: DeferredImportForm;
  moduleMode: DeferredModuleMode;
}

export interface DeferredNamespace<Namespace extends object> {
  namespace: Namespace;
  evaluated(): boolean;
}

export function validateDeferredImport(
  entry: DeferredImportCase,
): DeferredImportCheck {
  if (entry.form !== "namespace") return "namespace-only-error";
  return entry.moduleMode === "esnext" || entry.moduleMode === "preserve"
    ? "supported"
    : "module-mode-error";
}

export function renderImportDefer(
  alias: string,
  specifier: string,
): string {
  return `import defer * as ${alias} from ${JSON.stringify(specifier)};`;
}

export function createDeferredNamespace<Namespace extends object>(
  evaluate: () => Namespace,
): DeferredNamespace<Namespace> {
  let value: Namespace | undefined;
  const getValue = (): Namespace => {
    value ??= evaluate();
    return value;
  };
  const namespace = new Proxy({} as Namespace, {
    get(_target, property, receiver) {
      return Reflect.get(getValue(), property, receiver);
    },
    has(_target, property) {
      return Reflect.has(getValue(), property);
    },
    ownKeys() {
      return Reflect.ownKeys(getValue());
    },
    getOwnPropertyDescriptor(_target, property) {
      return Reflect.getOwnPropertyDescriptor(getValue(), property);
    },
  });
  return {
    namespace,
    evaluated: () => value !== undefined,
  };
}

export const deferredImportCases = [
  { form: "namespace", moduleMode: "esnext" },
  { form: "namespace", moduleMode: "preserve" },
  { form: "named", moduleMode: "esnext" },
  { form: "namespace", moduleMode: "commonjs" },
] as const satisfies readonly DeferredImportCase[];

// Part 1: classify syntax and compiler modes.
type _01 = Expect<Equal<DeferredImportForm, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<DeferredModuleMode, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DeferredImportCheck, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<DeferredImportCheck, `${string}error`>, TODO>>; // TODO(koan) @koan-error

// Part 2: case facts remain independent.
type _05 = Expect<Equal<DeferredImportCase["form"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<DeferredImportCase["moduleMode"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof DeferredImportCase, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof deferredImportCases[number]["form"], TODO>>; // TODO(koan) @koan-error

// Part 3: only namespace + preserve/esnext succeeds.
type _09 = Expect<Equal<typeof deferredImportCases["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof deferredImportCases[0]["moduleMode"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof deferredImportCases[2]["form"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof deferredImportCases[3]["moduleMode"], TODO>>; // TODO(koan) @koan-error

// Part 4: rendering and validation are ordinary helper APIs.
type _13 = Expect<Equal<Parameters<typeof validateDeferredImport>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof validateDeferredImport>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof renderImportDefer>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof renderImportDefer>, TODO>>; // TODO(koan) @koan-error

// Part 5: the runtime model preserves the namespace shape.
type Example = DeferredNamespace<{ answer: number; run(): string }>;
type _17 = Expect<Equal<Example["namespace"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Example["evaluated"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof createDeferredNamespace>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof createDeferredNamespace>, TODO>>; // TODO(koan) @koan-error
