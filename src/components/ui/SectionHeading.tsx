import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  children: string;
  id?: string;
}

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <Reveal>
      <h2
        id={id}
        className="font-display text-4xl font-light tracking-tight text-gold sm:text-5xl"
      >
        {children}
      </h2>
    </Reveal>
  );
}
