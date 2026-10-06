import { homeContent } from "@/data/home";
import { siteInfo } from "@/data/site";
import type { HomeContent, SiteInfo } from "@/types/content";

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
