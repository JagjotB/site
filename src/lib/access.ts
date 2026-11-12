import "server-only";
import { timingSafeEqual } from "node:crypto";

export function isValidPrivateAccessToken(candidate: string): boolean {
  const expected = process.env.PRIVATE_ACCESS_TOKEN;

  if (!expected || expected.length < 32 || candidate.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}
