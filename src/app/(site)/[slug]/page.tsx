import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoGrid } from "@/components/pillar-page/InfoGrid";
import { OtherPillars } from "@/components/pillar-page/OtherPillars";
import { Overview } from "@/components/pillar-page/Overview";
import { PillarHero } from "@/components/pillar-page/PillarHero";
import { Roadmap } from "@/components/pillar-page/Roadmap";
import { SourcesList } from "@/components/pillar-page/SourcesList";
import { StoryBlock } from "@/components/pillar-page/StoryBlock";
import { getPillarBySlug, getPillarPage, getPillars } from "@/services/contentService";

export async function generateStaticParams() {
  const pillars = await getPillars();
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [pillar, page] = await Promise.all([getPillarBySlug(slug), getPillarPage(slug)]);
  return pillar && page ? { title: `${pillar.title} | SpaceMakers`, description: page.tagline } : {};
}

/**
 * Shared template for /rover, /satelites and /kyutech. Content comes from the content service;
 * a dedicated route (e.g. app/(site)/rover/page.tsx) would take precedence over this one.
 */
export default async function PillarPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const [pillar, page, pillars] = await Promise.all([getPillarBySlug(slug), getPillarPage(slug), getPillars()]);
  if (!pillar || !page) notFound();

  return (
    <>
      <PillarHero pillar={pillar} tagline={page.tagline} facts={page.facts} />
      <Overview paragraphs={page.overview} />

      {page.blocks.map((block, index) => {
        const id = `block-${index}`;
        return block.kind === "story" ? (
          <StoryBlock key={id} id={id} content={block} tone={pillar.tone} />
        ) : (
          <InfoGrid key={id} id={id} content={block} tone={pillar.tone} />
        );
      })}

      <Roadmap heading={page.roadmapHeading} steps={page.roadmap} tone={pillar.tone} />
      <SourcesList sources={page.sources} />
      <OtherPillars pillars={pillars.filter((other) => other.slug !== pillar.slug)} />
    </>
  );
}
