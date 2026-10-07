import { homeContent } from "@/data/home";
import { pillarPages } from "@/data/pillarPages";
import { siteInfo } from "@/data/site";
import type { HomeContent, NewsItem, Pillar, PillarPageContent, SiteInfo } from "@/types/content";

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

export async function getPillars(): Promise<Pillar[]> {
  return homeContent.pillars;
}

export async function getPillarBySlug(slug: string): Promise<Pillar | null> {
  return homeContent.pillars.find((pillar) => pillar.slug === slug) ?? null;
}

export async function getPillarPage(slug: string): Promise<PillarPageContent | null> {
  return pillarPages.find((page) => page.slug === slug) ?? null;
}

/** All stories, newest first. */
export async function getNews(): Promise<NewsItem[]> {
  return [...homeContent.news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
