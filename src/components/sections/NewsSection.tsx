import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { NewsItem } from "@/types/content";

interface NewsSectionProps {
  news: NewsItem[];
}

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <section aria-labelledby="news-heading" className="container-page py-16 lg:py-24">
      <SectionHeading id="news-heading">Breaking News</SectionHeading>

      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-14">
        {news.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.15}>
            <article className="group">
              <div className="relative aspect-[900/388] overflow-hidden border-2 border-nebula/70 transition-[border-color,box-shadow] duration-500 group-hover:border-nebula group-hover:shadow-[0_0_40px_-8px_rgba(201,53,111,0.7)]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <time
                dateTime={item.publishedAt}
                className="mt-6 block font-mono text-[11px] tracking-[0.2em] text-nebula uppercase"
              >
                {dateFormatter.format(new Date(item.publishedAt))}
              </time>
              <h3 className="mt-2 font-mono text-2xl tracking-wide text-white sm:text-3xl">{item.title}</h3>
              <p className="mt-3 text-justify leading-relaxed text-starlight/85">{item.excerpt}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
