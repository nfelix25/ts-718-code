import { defineConfig } from "vitest/config";
import * as ts from "@typescript/typescript6";

export default defineConfig({
  plugins: [{
    name: "typescript-standard-decorator-transform",
    enforce: "pre",
    transform(code, id) {
      const path = id.split("?", 1)[0] ?? id;
      if (!/\/src\/koans\/10-typescript-5x-features\/k-1(?:6[0-9]|7[01])-.*\.ts$/.test(path)) {
        return;
      }
      return {
        code: ts.transpileModule(code, {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ES2022,
            useDefineForClassFields: true,
          },
          fileName: path,
        }).outputText,
        map: null,
      };
    },
  }],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
