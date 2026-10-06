import type { AccentTone } from "@/types/content";

interface ToneStyle {
  /** Eyebrow / accent text color. */
  text: string;
  /** Solid call-to-action button (colors chosen for WCAG AA contrast). */
  button: string;
  /** Border color on hover / focus. */
  border: string;
  /** RGB triplet used for glows and the cursor spotlight. */
  glowRgb: string;
}

export const toneStyles: Record<AccentTone, ToneStyle> = {
  ember: {
    text: "text-ember",
    button: "bg-ember text-void hover:bg-[#ffa165]",
    border: "group-hover:border-ember/70",
    glowRgb: "255, 138, 61",
  },
  orbit: {
    text: "text-orbit-bright",
    button: "bg-orbit text-white hover:bg-[#2b8fb5]",
    border: "group-hover:border-orbit-bright/70",
    glowRgb: "76, 195, 230",
  },
  lime: {
    text: "text-starlight/80",
    button: "bg-lime text-void hover:bg-[#d4ff74]",
    border: "group-hover:border-lime/70",
    glowRgb: "196, 242, 90",
  },
};
