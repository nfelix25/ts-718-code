import { describe, expect, it } from "vitest";
import {
  createDeferredNamespace,
  deferredImportCases,
  renderImportDefer,
  validateDeferredImport,
} from "./k-207-import-defer.js";

describe("k-207: import defer", () => {
  it("accepts namespace imports in ESNext and preserve modes", () => {
    expect(deferredImportCases.slice(0, 2).map(validateDeferredImport)).toEqual([
      "supported",
      "supported",
    ]);
  });

  it("rejects named forms and unsupported module modes", () => {
    expect(validateDeferredImport(deferredImportCases[2])).toBe(
      "namespace-only-error",
    );
    expect(validateDeferredImport(deferredImportCases[3])).toBe(
      "module-mode-error",
    );
  });

  it("renders namespace-only deferred syntax", () => {
    expect(renderImportDefer("feature", "./feature.js")).toBe(
      'import defer * as feature from "./feature.js";',
    );
  });

  it("does not evaluate before an exported property is accessed", () => {
    const events: string[] = [];
    const deferred = createDeferredNamespace(() => {
      events.push("evaluated");
      return { answer: 42 };
    });
    expect(deferred.evaluated()).toBe(false);
    expect(events).toEqual([]);
    expect(deferred.namespace.answer).toBe(42);
    expect(deferred.evaluated()).toBe(true);
  });

  it("evaluates the module factory only once", () => {
    let calls = 0;
    const deferred = createDeferredNamespace(() => {
      calls += 1;
      return { left: 1, right: 2 };
    });
    expect(deferred.namespace.left + deferred.namespace.right).toBe(3);
    expect(calls).toBe(1);
  });
});
