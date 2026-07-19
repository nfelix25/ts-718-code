import { fail, lessonSelector, resolvePacket, typecheckPacket } from "./lib/koans.js";

try {
  const packet = await resolvePacket(lessonSelector());
  console.log(`Typechecking ${packet.id} with native TypeScript...`);
  const result = await typecheckPacket(packet);
  process.exit(result.code);
} catch (error) {
  fail(error);
}
