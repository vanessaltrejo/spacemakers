"use client";

import { motion } from "motion/react";
import { useActionState, useId } from "react";
import { login, type LoginFormState } from "@/actions/auth";
import { BorderBeam } from "@/components/ui/BorderBeam";

const inputClasses =
  "h-10 w-full rounded-md border border-line-strong bg-hull-soft px-3 text-sm text-starlight placeholder:text-mist transition-colors focus:border-gold focus:outline-none";

const initialState: LoginFormState = {};

/** Login form card, centered on the /login page. Submits to the `login` Server Action. */
export function LoginCard() {
  const titleId = useId();
  const usernameId = useId();
  const passwordId = useId();
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <motion.section
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[350px] overflow-hidden rounded-xl border border-line bg-hull/90 shadow-2xl shadow-black backdrop-blur-sm"
    >
      <div className="flex flex-col gap-1.5 p-6 pb-4">
        <p className="label-mono text-gold">Acceso a la tripulación</p>
        <h1 id={titleId} className="text-2xl font-light tracking-tight text-cream">
          Iniciar sesión
        </h1>
        <p className="text-sm text-mist">Ingresa tus credenciales para acceder a tu cuenta.</p>
      </div>

      <form action={formAction}>
        <div className="grid gap-4 px-6 pb-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={usernameId} className="text-sm text-starlight">
              Usuario
            </label>
            <input
              id={usernameId}
              name="username"
              type="text"
              required
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              defaultValue={state.username}
              placeholder="Ingresa tu usuario"
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={passwordId} className="text-sm text-starlight">
              Contraseña
            </label>
            <input
              id={passwordId}
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              className={inputClasses}
            />
          </div>
        </div>

        {state.error && (
          <p role="alert" className="mx-6 mb-4 rounded-md border border-nebula/40 bg-nebula/10 px-3 py-2 text-sm text-cream">
            {state.error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 px-6 pb-6">
          {/* Inert on purpose: the sign-up flow (/signup) doesn't exist yet. */}
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-full border border-line-strong px-5 text-sm font-medium tracking-tight text-starlight transition-colors hover:border-gold hover:text-gold"
          >
            Registrarme
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center rounded-full bg-gold px-5 text-sm font-medium tracking-tight text-void transition-colors hover:bg-cream disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? "Entrando…" : "Entrar"}
          </button>
        </div>
      </form>

      <BorderBeam duration={8} size={100} />
    </motion.section>
  );
}
