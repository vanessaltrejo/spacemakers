import type { AccentTone } from "@/types/content";

interface ToneStyle {
  /** Accent text color (labels, titles, links). */
  text: string;
  /** Solid accent background (dots, bars). */
  background: string;
  /** Faint gradient start color, for soft tinted card backgrounds. */
  tint: string;
  /** Border color applied while the parent `group` is hovered. */
  groupHoverBorder: string;
}

export const toneStyles: Record<AccentTone, ToneStyle> = {
  ember: { text: "text-ember", background: "bg-ember", tint: "from-ember/12", groupHoverBorder: "group-hover:border-ember" },
  orbit: { text: "text-orbit-bright", background: "bg-orbit-bright", tint: "from-orbit-bright/12", groupHoverBorder: "group-hover:border-orbit-bright" },
  lime: { text: "text-lime", background: "bg-lime", tint: "from-lime/10", groupHoverBorder: "group-hover:border-lime" },
  nebula: { text: "text-nebula", background: "bg-nebula", tint: "from-nebula/14", groupHoverBorder: "group-hover:border-nebula" },
};
