import { jwtVerify, SignJWT } from "jose";

/**
 * Signed session token (HS256 JWT). Kept free of `next/headers` so it can run in `proxy.ts`
 * as well as in Server Components, Server Actions and Route Handlers.
 */

export const SESSION_COOKIE_NAME = "sm_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export interface SessionPayload {
  username: string;
}

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to a random string of at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ username: payload.username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  const secretKey = getSecretKey();

  try {
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
    return typeof payload.username === "string" ? { username: payload.username } : null;
  } catch {
    // Expired, tampered or malformed token: treat as signed out.
    return null;
  }
}
