import { ButtonLink } from "@/components/ui/ButtonLink";

/** Branded "page not found" message, shared by the in-site and the global 404 pages. */
export function NotFoundContent() {
  return (
    <section className="container-page flex min-h-svh flex-col items-center justify-center py-24 text-center">
      <p className="label-mono text-gold">Error 404</p>
      <h1 className="font-headline mt-4 text-h1 text-gold">Página no encontrada</h1>
      <p className="mt-4 max-w-md text-body text-mist">
        La dirección que buscas no existe o ya no está disponible. Revisa el enlace o vuelve al inicio.
      </p>
      <ButtonLink href="/" variant="cobalt" className="mt-8" withArrow>
        Volver al inicio
      </ButtonLink>
    </section>
  );
}
