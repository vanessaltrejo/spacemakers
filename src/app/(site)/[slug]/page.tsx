import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getPillarBySlug, getPillars } from "@/services/contentService";

export async function generateStaticParams() {
  const pillars = await getPillars();
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pillar = await getPillarBySlug(slug);
  return pillar ? { title: `${pillar.title} | SpaceMakers` } : {};
}

/**
 * Placeholder for /rover, /satelites and /kyutech. These are the same pages the
 * navbar and the home cards point to; each one will get its own dedicated route
 * (e.g. app/(site)/rover/page.tsx), which takes precedence over this template.
 */
export default async function PillarPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const pillar = await getPillarBySlug(slug);
  if (!pillar) notFound();

  return (
    <section className="container-page flex min-h-[70svh] flex-col justify-center pt-32 pb-24">
      <h1 className="text-5xl font-light tracking-[-0.04em] text-gold sm:text-6xl lg:text-7xl">{pillar.title}</h1>
      <p className="label-mono mt-6 text-mist">Página en construcción</p>
      <div className="mt-8">
        <ButtonLink href="/" variant="ghost">
          ← Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
