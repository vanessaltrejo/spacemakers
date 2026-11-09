import Image from "next/image";
import { toneStyles } from "@/components/pillars/toneStyles";
import { Section } from "@/components/ui/Section";
import type { AccentTone, ImageAsset } from "@/types/content";

interface GalleryProps {
  images: ImageAsset[];
  tone: AccentTone;
}

/** Photo gallery: the first image is larger, the rest fill the grid. */
export function Gallery({ images, tone }: GalleryProps) {
  if (images.length < 2) return null;
  const toneStyle = toneStyles[tone];

  return (
    <Section id="gallery-title" title="Galería" tone={tone}>
      <ul className="grid gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <li key={`${image.src}-${index}`} className={`relative aspect-[4/3] overflow-hidden bg-cobalt ${index === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-72" : ""}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
            <span aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t ${toneStyle.wash} via-transparent to-transparent opacity-60`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
