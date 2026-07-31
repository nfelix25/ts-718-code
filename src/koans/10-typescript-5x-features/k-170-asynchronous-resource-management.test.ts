import { describe, expect, it } from "vitest";

import {
  AsynchronousResource,
  runAsyncEarlyReturn,
  runAsyncScope,
  runAsyncThrow,
  runMixedAsyncScope,
  runNullableAsyncScope,
} from "./k-170-asynchronous-resource-management.js";

describe("k-170 asynchronous resource management", () => {
  it("awaits async disposers sequentially in reverse order", async () => {
    const log: string[] = [];
    await runAsyncScope(log);
    expect(log).toEqual([
      "acquire:first",
      "acquire:second",
      "use:first",
      "use:second",
      "body",
      "dispose-start:second",
      "dispose-end:second",
      "dispose-start:first",
      "dispose-end:first",
    ]);
  });

  it("does not resolve the scope before asynchronous cleanup settles", async () => {
    const log: string[] = [];
    const completion = runAsyncScope(log);
    expect(log).toContain("dispose-start:second");
    expect(log).not.toContain("dispose-end:first");
    await completion;
    expect(log.at(-1)).toBe("dispose-end:first");
  });

  it("awaits cleanup before fulfilling an early return", async () => {
    const log: string[] = [];
    await expect(runAsyncEarlyReturn(log)).resolves.toBe("return");
    expect(log.at(-1)).toBe("dispose-end:return");
  });

  it("awaits cleanup before rejecting with a body error", async () => {
    const log: string[] = [];
    await expect(runAsyncThrow(log)).rejects.toThrow("async body failed");
    expect(log.at(-1)).toBe("dispose-end:throw");
  });

  it("supports synchronous fallback and nullish resources", async () => {
    const mixedLog: string[] = [];
    await runMixedAsyncScope(mixedLog);
    expect(mixedLog.slice(-3)).toEqual([
      "dispose-start:async",
      "dispose-end:async",
      "dispose-sync:sync",
    ]);

    const nullLog: string[] = [];
    await runNullableAsyncScope(nullLog, null);
    expect(nullLog).toEqual(["selected:none"]);

    const resourceLog: string[] = [];
    const resource = new AsynchronousResource("selected", resourceLog);
    await runNullableAsyncScope(resourceLog, resource);
    expect(resource.disposed).toBe(true);
  });
});
