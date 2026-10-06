import Image from "next/image";
import { toneStyles } from "@/components/pillars/toneStyles";
import type { AccentTone, NewsItem } from "@/types/content";

interface NewsCardProps {
  item: NewsItem;
  /** Accent color of the hover frame around the image. */
  tone: AccentTone;
}

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function NewsCard({ item, tone }: NewsCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[900/388] overflow-hidden border border-line">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* 2px colored frame (same weight as the navbar line), drawn inside so nothing shifts */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-500 ${toneStyles[tone].groupHoverBorder}`}
        />
      </div>
      <div className="label-mono mt-6 flex items-center gap-3 text-mist">
        <time dateTime={item.publishedAt} className="text-nebula">
          {dateFormatter.format(new Date(item.publishedAt))}
        </time>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <span>{item.location}</span>
      </div>
      <h3 className="mt-4 text-2xl font-normal tracking-tight text-starlight sm:text-3xl">{item.title}</h3>
      <p className="mt-3 leading-relaxed text-mist">{item.excerpt}</p>
    </article>
  );
}
