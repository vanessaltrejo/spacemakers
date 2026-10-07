import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AboutContent } from "@/types/content";

interface AboutProps {
  content: AboutContent;
}

export function About({ content }: AboutProps) {
  return (
    <section
      id="nosotros"
      aria-labelledby="about-title"
      className="container-page pt-20 pb-6 lg:pt-24 lg:pb-6"
    >
      <SectionHeader title="Quiénes somos" titleId="about-title" withRule={false} />

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        <div className="flex flex-col justify-center lg:col-span-7">
          <Reveal>
            <p className="text-2xl leading-[1.15] font-light tracking-[-0.03em] text-starlight sm:text-3xl xl:text-4xl">
              {content.statement}
            </p>
          </Reveal>
          <div className="mt-6 space-y-3 border-l border-nebula/70 pl-6">
            {content.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.1 * (index + 1)}>
                <p className="leading-relaxed text-mist">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The photo stretches to the height of the text column, so there is no dead space around it. */}
        <Reveal offset={32} delay={0.15} className="lg:col-span-5">
          <div className="group h-full">
            <div className="relative aspect-[1030/426] h-full w-full overflow-hidden lg:aspect-auto">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              {/* Faint brand-color wash over the photo */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-nebula/25 via-transparent to-cobalt/30"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
