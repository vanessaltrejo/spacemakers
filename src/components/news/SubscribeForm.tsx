"use client";

import { useId, useState, type FormEvent } from "react";

interface SubscribeFormProps {
  /** Smaller layout for the footer: email only. */
  compact?: boolean;
}

type Status = "idle" | "error" | "sent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Open newsletter subscription: email required, name optional, no account.
 * TODO: connect an email provider (double opt-in confirmation). For now it validates and simulates the send.
 */
export function SubscribeForm({ compact = false }: SubscribeFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setStatus(EMAIL_PATTERN.test(email) ? "sent" : "error");
  };

  if (status === "sent") {
    return (
      <p role="status" className="text-body text-starlight">
        Gracias. Te enviamos un correo para confirmar tu suscripción.
      </p>
    );
  }

  const field =
    "h-10 w-full border border-line-strong bg-hull-soft px-3 text-caption text-starlight placeholder:text-mist focus:border-gold focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "w-full" : "max-w-xl"}>
      <div className={compact ? "flex gap-2" : "grid gap-3 sm:grid-cols-2"}>
        {!compact && (
          <div>
            <label htmlFor={`${id}-name`} className="label-mono text-mist">
              Nombre (opcional)
            </label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" className={`${field} mt-2`} />
          </div>
        )}
        <div className={compact ? "min-w-0 flex-1" : undefined}>
          <label htmlFor={`${id}-email`} className={compact ? "sr-only" : "label-mono text-mist"}>
            Correo electrónico
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? `${id}-error` : undefined}
            placeholder={compact ? "Correo electrónico" : undefined}
            className={`${field} ${compact ? "" : "mt-2"}`}
          />
        </div>
        {compact && (
          <button type="submit" className="h-10 shrink-0 bg-cobalt px-4 text-caption font-medium text-white transition-colors hover:bg-[#1426c8]">
            Suscribirme
          </button>
        )}
      </div>
      {status === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-3 text-caption text-gold">
          Escribe un correo válido.
        </p>
      )}
      {!compact && (
      <button
        type="submit"
        className="mt-4 inline-flex h-10 items-center justify-center bg-cobalt px-5 text-caption font-medium text-white transition-colors hover:bg-[#1426c8]"
      >
        Suscribirme
      </button>
      )}
      <p className="mt-3 text-caption text-mist">
        {compact
          ? "Solo el newsletter. Cancela cuando quieras."
          : "Usaremos tu correo solo para enviarte el newsletter. Te pediremos confirmarlo y puedes darte de baja cuando quieras."}
      </p>
    </form>
  );
}
