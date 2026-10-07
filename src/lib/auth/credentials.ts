import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Single-account check against DASHBOARD_USERNAME / DASHBOARD_PASSWORD (.env.local).
 * Replace with a user store when real accounts exist.
 */

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/** Constant-time comparison: hashing first makes both buffers the same length. */
function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(digest(a), digest(b));
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.DASHBOARD_USERNAME;
  const expectedPassword = process.env.DASHBOARD_PASSWORD;
  if (!expectedUsername || !expectedPassword) {
    throw new Error("DASHBOARD_USERNAME and DASHBOARD_PASSWORD must be set.");
  }

  // Evaluate both so a wrong username takes as long as a wrong password.
  const isUsernameValid = safeEqual(username, expectedUsername);
  const isPasswordValid = safeEqual(password, expectedPassword);
  return isUsernameValid && isPasswordValid;
}
