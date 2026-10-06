/**
 * Domain types for the SpaceMakers site content.
 * These mirror the shape a future CMS / API is expected to return.
 */

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type SocialNetwork = "instagram" | "facebook" | "youtube";

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  href: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  navigation: NavItem[];
  socials: SocialLink[];
  joinCta: NavItem;
}

export interface AboutContent {
  image: ImageAsset;
  paragraphs: string[];
}

export interface Partner {
  id: string;
  name: string;
}

/** Visual accent applied to a pillar card. Mapped to design tokens in the UI layer. */
export type AccentTone = "ember" | "orbit" | "lime";

export interface PillarSpec {
  label: string;
  value: string;
}

export interface Pillar {
  id: string;
  /** Anchor id used by the navigation (e.g. "rover"). */
  anchor: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  image: ImageAsset;
  meta: PillarSpec;
  specs: PillarSpec[];
  tone: AccentTone;
}

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface Recruitment {
  eyebrow: string;
  titleLead: string;
  titleEmphasis: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  deadlineLabel: string;
  image: ImageAsset;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  /** ISO 8601 date string. */
  publishedAt: string;
  image: ImageAsset;
}

export interface HomeContent {
  about: AboutContent;
  partners: Partner[];
  pillars: Pillar[];
  stats: Stat[];
  recruitment: Recruitment;
  news: NewsItem[];
}
