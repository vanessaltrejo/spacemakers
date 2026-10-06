import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, Space_Mono } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${outfit.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-svh bg-void font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
