import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/pillar-page/Gallery";
import { InfoGrid } from "@/components/pillar-page/InfoGrid";
import { Overview } from "@/components/pillar-page/Overview";
import { PillarHero } from "@/components/pillar-page/PillarHero";
import { ProjectPartners } from "@/components/pillar-page/ProjectPartners";
import { Roadmap } from "@/components/pillar-page/Roadmap";
import { SourcesList } from "@/components/pillar-page/SourcesList";
import { StoryBlock } from "@/components/pillar-page/StoryBlock";
import { getPartnersByIds, getPillarBySlug, getPillarPage, getPillars } from "@/services/contentService";

export async function generateStaticParams() {
  const pillars = await getPillars();
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [pillar, page] = await Promise.all([getPillarBySlug(slug), getPillarPage(slug)]);
  return pillar && page ? { title: `${pillar.title} | Space Makers`, description: page.tagline } : {};
}

/**
 * Single template for every project page (/rover, /satelites, /kyutech, ...). Content comes from the content service;
 * a dedicated route (e.g. app/(site)/rover/page.tsx) would take precedence over this one.
 */
export default async function PillarPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const [pillar, page] = await Promise.all([getPillarBySlug(slug), getPillarPage(slug)]);
  if (!pillar || !page) notFound();
  const partners = await getPartnersByIds(page.partnerIds);

  return (
    <>
      <PillarHero pillar={pillar} tagline={page.tagline} status={page.status} facts={page.facts} />
      <Overview paragraphs={page.overview} tone={pillar.tone} />

      {page.blocks.map((block, index) => {
        const id = `block-${index}`;
        return block.kind === "story" ? (
          <StoryBlock key={id} id={id} content={block} tone={pillar.tone} />
        ) : (
          <InfoGrid key={id} id={id} content={block} tone={pillar.tone} />
        );
      })}

      <Gallery images={page.gallery} tone={pillar.tone} />
      <Roadmap heading={page.roadmapHeading} steps={page.roadmap} tone={pillar.tone} />
      <ProjectPartners partners={partners} tone={pillar.tone} />
      <SourcesList sources={page.sources} tone={pillar.tone} />
      <div className="pb-14" />
    </>
  );
}
