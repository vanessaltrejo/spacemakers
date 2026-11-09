import type { AccentTone } from "@/types/content";

interface ToneStyle {
  /** Accent text color (labels, links). */
  text: string;
  /** Solid accent background (bars, dots). */
  background: string;
  /** Accent border color. */
  border: string;
  /** Faint gradient start color, for soft tinted backgrounds. */
  tint: string;
  /** Stronger gradient start color, for washes over photos. */
  wash: string;
}

export const toneStyles: Record<AccentTone, ToneStyle> = {
  ember: { text: "text-ember", background: "bg-ember", border: "border-ember", tint: "from-ember/12", wash: "from-ember/40" },
  orbit: { text: "text-orbit-bright", background: "bg-orbit-bright", border: "border-orbit-bright", tint: "from-orbit-bright/12", wash: "from-orbit-bright/40" },
  lime: { text: "text-lime", background: "bg-lime", border: "border-lime", tint: "from-lime/10", wash: "from-lime/35" },
  nebula: { text: "text-nebula", background: "bg-nebula", border: "border-nebula", tint: "from-nebula/14", wash: "from-nebula/40" },
};

/** Rotating order for lists whose items have no tone of their own (timelines, areas...). */
export const toneCycle: AccentTone[] = ["ember", "orbit", "lime", "nebula"];
