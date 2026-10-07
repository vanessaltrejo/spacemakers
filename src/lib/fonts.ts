import { Geist, Geist_Mono } from "next/font/google";

/** Fonts shared by the public site and the dashboard. Variable names match styles/tokens.css. */

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
