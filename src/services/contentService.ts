import { aboutContent } from "@/data/about";
import { collaborationsContent } from "@/data/collaborations";
import { externalNews } from "@/data/externalNews";
import { homeContent } from "@/data/home";
import { pillarPages } from "@/data/pillarPages";
import { extraPillarPages, extraPillars } from "@/data/projects";
import { research } from "@/data/science";
import { siteInfo } from "@/data/site";
import type {
  AboutPageContent,
  CollaborationsContent,
  HomeContent,
  NewsItem,
  Partner,
  Pillar,
  PillarPageContent,
  ResearchItem,
  SiteInfo,
} from "@/types/content";

/**
 * Content service layer.
 * Components never import from `@/data` directly — they go through these functions,
 * so swapping dummy data for a real API/DB only touches this file.
 */

export async function getSiteInfo(): Promise<SiteInfo> {
  return siteInfo;
}

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getAboutContent(): Promise<AboutPageContent> {
  return aboutContent;
}

/** Research entries, newest year first. */
export async function getResearch(): Promise<ResearchItem[]> {
  return [...research].sort((a, b) => b.year - a.year);
}

export async function getCollaborations(): Promise<CollaborationsContent> {
  return collaborationsContent;
}

/** Every project, in display order (the first three are the featured ones shown on the home page). */
export async function getPillars(): Promise<Pillar[]> {
  return [...homeContent.pillars, ...extraPillars];
}

export async function getPillarBySlug(slug: string): Promise<Pillar | null> {
  return (await getPillars()).find((pillar) => pillar.slug === slug) ?? null;
}

export async function getPillarPage(slug: string): Promise<PillarPageContent | null> {
  return [...pillarPages, ...extraPillarPages].find((page) => page.slug === slug) ?? null;
}

export async function getPartnersByIds(ids: string[]): Promise<Partner[]> {
  return ids.flatMap((id) => homeContent.partners.find((partner) => partner.id === id) ?? []);
}

const byNewest = (a: NewsItem, b: NewsItem) => b.publishedAt.localeCompare(a.publishedAt);

/** The group's own stories, newest first. */
export async function getNews(): Promise<NewsItem[]> {
  return homeContent.news.filter((item) => item.kind === "own").sort(byNewest);
}

/** External stories (agency press rooms) that only link out, newest first. */
export async function getExternalNews(): Promise<NewsItem[]> {
  return [...externalNews].sort(byNewest);
}

/** "Nota del día": the most recent external story. */
export async function getNewsOfTheDay(): Promise<NewsItem | null> {
  return (await getExternalNews())[0] ?? null;
}
