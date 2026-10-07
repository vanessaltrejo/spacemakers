"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth/credentials";
import { createSession, deleteSession } from "@/lib/auth/session";

export interface LoginFormState {
  error?: string;
  username?: string;
}

export async function login(_previousState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string" || !username.trim() || !password) {
    return { error: "Ingresa tu usuario y tu contraseña." };
  }

  const trimmedUsername = username.trim();
  if (!verifyCredentials(trimmedUsername, password)) {
    return { error: "Usuario o contraseña incorrectos.", username: trimmedUsername };
  }

  await createSession(trimmedUsername);
  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
