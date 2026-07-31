import { describe, expect, it } from "vitest";

import { Session } from "./k-150-typestate.js";

describe("k-150 typestate", () => {
  it("follows the legal connection and authentication path", () => {
    const authenticated = Session.create("s1").connect().authenticate({ id: "u1" });
    expect(authenticated.status).toBe("authenticated");
    expect(authenticated.user).toEqual({ id: "u1" });
  });

  it("queries only after authentication in the legal chain", () => {
    const authenticated = Session.create("s1").connect().authenticate("Ada");
    expect(authenticated.query("select 1")).toBe("s1:select 1");
  });

  it("closes from a nonterminal state", () => {
    expect(Session.create("s1").connect().close().status).toBe("closed");
  });

  it("keeps transitions immutable", () => {
    const disconnected = Session.create("s1");
    const connected = disconnected.connect();
    expect(disconnected.status).toBe("disconnected");
    expect(connected.status).toBe("connected");
  });

  it("rejects assertion-forged illegal runtime transitions", () => {
    const closed = Session.create("s1").close();
    const forged = closed as unknown as import("./k-150-typestate.js").Session<
      import("./k-150-typestate.js").Disconnected
    >;
    expect(() => forged.connect()).toThrow("expected disconnected");
  });
});
