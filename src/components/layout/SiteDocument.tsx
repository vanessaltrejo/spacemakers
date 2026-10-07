import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { fontVariables } from "@/lib/fonts";
import "@/app/globals.css";

/**
 * <html>/<body> shell shared by the public root layouts, (site) and (auth).
 * The dashboard has its own root layout so its global CSS stays isolated from the site.
 */

export const siteMetadata: Metadata = {
  title: "SpaceMakers | Innovación espacial estudiantil",
  description:
    "Grupo estudiantil del Tecnológico de Monterrey que democratiza la investigación espacial: rovers marcianos, nanosatélites y validación espacial con Kyutech.",
};

export const siteViewport: Viewport = {
  themeColor: "#000000",
};

interface SiteDocumentProps {
  children: ReactNode;
}

export function SiteDocument({ children }: SiteDocumentProps) {
  return (
    <html
      lang="es"
      // Next 16 no longer disables CSS smooth scrolling on route changes unless this is set,
      // which left pages stranded mid-scroll after navigating. Anchors still scroll smoothly.
      data-scroll-behavior="smooth"
      className={`${fontVariables} antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before
          React hydrates; suppressHydrationWarning only silences attribute mismatches on this element. */}
      <body suppressHydrationWarning className="min-h-svh bg-void font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
