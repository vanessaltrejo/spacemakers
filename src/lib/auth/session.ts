import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  type SessionPayload,
  signSessionToken,
  verifySessionToken,
} from "@/lib/auth/sessionToken";

export async function createSession(username: string): Promise<void> {
  const token = await signSessionToken({ username });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/** Reads and verifies the current session. Memoized per request. */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
});
