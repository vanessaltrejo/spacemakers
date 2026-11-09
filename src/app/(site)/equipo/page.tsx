import type { Metadata } from "next";
import { toneCycle, toneStyles } from "@/components/pillars/toneStyles";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAboutContent } from "@/services/contentService";

export const metadata: Metadata = {
  title: "Equipo | Space Makers",
  description: "Las áreas y las personas que forman Space Makers.",
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter((word) => /^[A-ZÁÉÍÓÚÑ]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

export default async function TeamPage() {
  const about = await getAboutContent();

  return (
    <>
      <PageHeader title="Equipo" lead="Cinco áreas que trabajan juntas para construir tecnología espacial." tone="lime" />
      <section aria-label="Áreas del equipo" className="container-page pt-10 pb-14 lg:pt-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {about.areas.map((area, areaIndex) => {
            const tone = toneStyles[toneCycle[areaIndex % toneCycle.length]];
            return (
              <div key={area.id} className="border border-line p-5">
                <h2 className={`font-headline flex items-center gap-3 text-h2 ${tone.text}`}>
                  <span aria-hidden="true" className={`size-2 shrink-0 ${tone.background}`} />
                  {area.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {area.members.map((member, index) => (
                    <li key={`${member.name}-${index}`} className="flex items-center gap-3">
                      <span aria-hidden="true" className={`font-headline flex size-11 shrink-0 items-center justify-center bg-cobalt text-caption ${tone.text}`}>
                        {member.dummy ? "·" : initials(member.name)}
                      </span>
                      <span>
                        <span className={`block text-body ${member.dummy ? "text-mist" : "text-starlight"}`}>{member.name}</span>
                        <span className="label-mono block text-mist">{member.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
