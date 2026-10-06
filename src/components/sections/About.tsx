import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutContent } from "@/types/content";

interface AboutProps {
  content: AboutContent;
}

export function About({ content }: AboutProps) {
  return (
    <section
      id="nosotros"
      aria-label="Quiénes somos"
      className="container-page grid items-center gap-10 py-16 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-24"
    >
      <Reveal offset={48}>
        <div className="group relative aspect-[1030/426] overflow-hidden">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-nebula/20 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </div>
      </Reveal>

      <div className="space-y-6">
        {content.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph} delay={0.15 * (index + 1)}>
            <p className="font-display text-lg leading-relaxed font-light text-starlight/90 lg:text-xl lg:leading-loose">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
