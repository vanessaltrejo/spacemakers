import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpaceMakers | Innovación espacial estudiantil",
  description:
    "Grupo estudiantil del Tecnológico de Monterrey que democratiza la investigación espacial: rovers marcianos, nanosatélites y validación espacial con Kyutech.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      // Next 16 no longer disables CSS smooth scrolling on route changes unless this is set,
      // which left pages stranded mid-scroll after navigating. Anchors still scroll smoothly.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before
          React hydrates; suppressHydrationWarning only silences attribute mismatches on this element. */}
      <body suppressHydrationWarning className="min-h-svh bg-void font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
