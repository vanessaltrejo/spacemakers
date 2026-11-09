import { Geist, Geist_Mono, Michroma, Space_Grotesk, Space_Mono } from "next/font/google";

/** Public site fonts. Variable names match styles/tokens.css. */

export const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

export const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});

export const siteFontVariables = `${michroma.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`;

/** The rover dashboard keeps Geist; it is not part of the public redesign. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dashboardFontVariables = `${geistSans.variable} ${geistMono.variable}`;
