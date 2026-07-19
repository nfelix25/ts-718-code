import { describe, expect, it } from "vitest";

import { completeOptions, fillDefaults, type DeepRequired, type DraftOptions } from "./k-110-deep-required.js";

const defaults: DeepRequired<DraftOptions> = {
  server: { host: "localhost", port: 443, tls: { enabled: true, certificate: undefined } },
  logging: { level: "info", outputs: ["stdout"] },
};

describe("k-110 DeepRequired", () => {
  it("fills every missing top-level branch", () => {
    expect(completeOptions({}, defaults)).toEqual(defaults);
  });

  it("preserves supplied values and fills nested siblings", () => {
    const complete = completeOptions({ server: { host: "example.com" } }, defaults);
    expect(complete.server).toEqual({ host: "example.com", port: 443, tls: defaults.server.tls });
  });

  it("retains explicit undefined when it is in the value domain", () => {
    expect(completeOptions({ server: { tls: { certificate: undefined } } }, defaults).server.tls.certificate).toBeUndefined();
  });

  it("treats arrays as replacement values", () => {
    expect(completeOptions({ logging: { outputs: ["file"] } }, defaults).logging.outputs).toEqual(["file"]);
  });

  it("fills a smaller generic object graph", () => {
    const result = fillDefaults<{ nested?: { count?: number } }>({}, { nested: { count: 2 } });
    expect(result).toEqual({ nested: { count: 2 } });
  });
});
