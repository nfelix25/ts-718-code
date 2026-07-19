import { relative } from "node:path";

import {
  fail,
  lessonSelector,
  repositoryRoot,
  resolvePacket,
  runCommand,
  typecheckPacket,
} from "./lib/koans.js";

try {
  const packet = await resolvePacket(lessonSelector());
  console.log(`Running runtime behavior for ${packet.id}...`);
  const runtime = await runCommand("vitest", ["run", relative(repositoryRoot, packet.files.test)]);
  if (runtime.code !== 0) {
    process.exit(runtime.code);
  }

  console.log(`Typechecking ${packet.id} with native TypeScript...`);
  const typecheck = await typecheckPacket(packet);
  process.exit(typecheck.code);
} catch (error) {
  fail(error);
}
