import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  title: string;
  titleId: string;
  description?: string;
  /** Hairline rule above the title. */
  withRule?: boolean;
}

/** Standard section opener: optional hairline rule followed by a large light-weight title and optional lead. */
export function SectionHeader({ title, titleId, description, withRule = true }: SectionHeaderProps) {
  return (
    <Reveal className={withRule ? "border-t border-line pt-6" : undefined}>
      <h2 id={titleId} className="text-4xl font-[350] tracking-[-0.035em] text-gold sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && <p className="mt-4 max-w-xl leading-relaxed text-mist">{description}</p>}
    </Reveal>
  );
}
