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
  description: string;
  /** IANA time zone used by the live mission clock. */
  timeZone: string;
  phone: string;
  email: string;
  /** Postal address, one entry per displayed line. */
  addressLines: string[];
  navigation: NavItem[];
  socials: SocialLink[];
  joinCta: NavItem;
}

export interface HeroContent {
  eyebrow: string;
  /** Static lead of the headline, followed by the typewriter words. */
  title: string;
  rotatingWords: string[];
  subtitle: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
}

export interface AboutContent {
  statement: string;
  image: ImageAsset;
  paragraphs: string[];
}

export interface Partner {
  id: string;
  name: string;
}

/** Visual accent applied to a pillar card. Mapped to design tokens in the UI layer. */
export type AccentTone = "ember" | "orbit" | "lime" | "nebula";

export interface PillarSpec {
  label: string;
  value: string;
}

export interface Pillar {
  id: string;
  /** URL segment of the pillar page (e.g. "rover" → /rover). */
  slug: string;
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
  tone: AccentTone;
}

export interface Recruitment {
  eyebrow: string;
  titleLead: string;
  titleEmphasis: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: ImageAsset;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  /** ISO 8601 date string. */
  publishedAt: string;
  /** Where the news took place, shown next to the date. */
  location: string;
  image: ImageAsset;
}

export interface HomeContent {
  hero: HeroContent;
  about: AboutContent;
  partners: Partner[];
  pillars: Pillar[];
  stats: Stat[];
  recruitment: Recruitment;
  news: NewsItem[];
}
