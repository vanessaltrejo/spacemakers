import Image from "next/image";
import { toneStyles } from "@/components/pillars/toneStyles";
import { newsCategories } from "@/lib/newsCategories";
import type { NewsItem } from "@/types/content";

interface NewsCoverProps {
  item: NewsItem;
  sizes: string;
  priority?: boolean;
  /** Smaller generated-cover lettering, for thumbnails. */
  compact?: boolean;
}

/**
 * Fills its (relative, sized) parent with the story photo, or — when there is none —
 * a generated cover in the category color so every story still looks designed.
 */
export function NewsCover({ item, sizes, priority = false, compact = false }: NewsCoverProps) {
  if (item.image) {
    return (
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectPosition: item.imagePosition }}
        className="object-cover"
      />
    );
  }

  const { label, tone } = newsCategories[item.category];
  const toneStyle = toneStyles[tone];

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden bg-void ${toneStyle.text}`}>
      {/* Soft glow behind the planet */}
      <span className="absolute top-1/2 -right-[8%] aspect-square h-[120%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,currentColor_0%,transparent_62%)] opacity-25" />
      <span className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_right,transparent,black_70%)]" />

      {/* Planet with two orbit rings, drawn in the category color */}
      <div className="absolute top-1/2 right-[10%] aspect-square h-[76%] -translate-y-1/2">
        <span className="absolute inset-0 rounded-full border border-current/25" />
        <span className="absolute inset-x-[-48%] inset-y-[20%] -rotate-[14deg] rounded-[50%] border border-dashed border-current/40" />
        <span className="absolute inset-[22%] rounded-full border border-current bg-void shadow-[0_0_46px_-6px_currentColor,inset_0_0_26px_-8px_currentColor]" />
        <span className="absolute top-[7%] left-[22%] size-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
        <span className="absolute right-[2%] bottom-[30%] size-1 rounded-full bg-current/70" />
      </div>

      <span className={`absolute top-0 left-0 h-0.5 w-16 ${toneStyle.background}`} />
      <span
        className={`absolute bottom-0 left-0 font-extralight tracking-[-0.04em] text-white/25 uppercase ${
          compact ? "p-2 text-[10px] tracking-widest" : "p-5 text-3xl sm:text-5xl"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
