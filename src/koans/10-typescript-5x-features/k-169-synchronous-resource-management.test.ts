import { describe, expect, it } from "vitest";

import {
  SynchronousResource,
  runBlockScope,
  runEarlyReturn,
  runNestedScope,
  runNullableScope,
  runThrowingScope,
} from "./k-169-synchronous-resource-management.js";

describe("k-169 synchronous resource management", () => {
  it("disposes multiple resources in reverse acquisition order", () => {
    const log: string[] = [];
    runNestedScope(log);
    expect(log).toEqual([
      "acquire:first",
      "acquire:second",
      "use:first",
      "use:second",
      "body",
      "dispose:second",
      "dispose:first",
    ]);
  });

  it("disposes before an early return completes", () => {
    const log: string[] = [];
    expect(runEarlyReturn(log)).toBe("return");
    expect(log.at(-1)).toBe("dispose:return");
  });

  it("disposes while unwinding a thrown body error", () => {
    const log: string[] = [];
    expect(() => runThrowingScope(log)).toThrow("body failed");
    expect(log.at(-1)).toBe("dispose:throw");
  });

  it("uses lexical block boundaries rather than function-only cleanup", () => {
    const log: string[] = [];
    runBlockScope(log);
    expect(log).toEqual([
      "before",
      "acquire:block",
      "use:block",
      "dispose:block",
      "after",
    ]);
  });

  it("ignores nullish resources and disposes non-null selections", () => {
    const emptyLog: string[] = [];
    runNullableScope(emptyLog, null);
    expect(emptyLog).toEqual(["selected:none"]);

    const resourceLog: string[] = [];
    const resource = new SynchronousResource("selected", resourceLog);
    runNullableScope(resourceLog, resource);
    expect(resource.disposed).toBe(true);
    expect(resourceLog.at(-1)).toBe("dispose:selected");
  });
});
