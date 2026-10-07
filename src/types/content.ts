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
  primaryCta: NavItem;
  secondaryCta: NavItem;
}

export interface AboutContent {
  statement: string;
  image: ImageAsset;
  paragraphs: string[];
}

/** Raster or vector logo with its intrinsic size (needed by next/image). */
export interface LogoAsset extends ImageAsset {
  width: number;
  height: number;
}

export interface Partner {
  id: string;
  name: string;
  /** Official logo, shown in its original colors. Falls back to the name when missing. */
  logo?: LogoAsset;
  /** Marks entries that look small at the default size (compact crests, short names). */
  size?: "default" | "large";
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
  image: ImageAsset;
  meta: PillarSpec;
  /** Extra readouts shown on the home card (only the first one is used there). */
  specs: PillarSpec[];
  tone: AccentTone;
}

/** One titled entry inside an info grid (a mission, a subsystem, a person...). */
export interface InfoItem {
  title: string;
  body: string;
}

export interface InfoSectionContent {
  kind: "info";
  heading: string;
  intro?: string;
  items: InfoItem[];
  /** Prefix each item with a 01, 02... counter. */
  showIndex: boolean;
}

export interface StoryFigure {
  value: string;
  label: string;
}

/** Narrative block with a few headline numbers (e.g. a competition result). */
export interface StorySectionContent {
  kind: "story";
  heading: string;
  paragraphs: string[];
  figures: StoryFigure[];
}

export type PageBlock = InfoSectionContent | StorySectionContent;

export type RoadmapStatus = "done" | "active" | "upcoming" | "tbc";

export interface RoadmapStep {
  when: string;
  title: string;
  description: string;
  status: RoadmapStatus;
}

export interface SourceLink {
  label: string;
  href: string;
}

/** Everything the /rover, /satelites and /kyutech pages render, keyed by pillar slug. */
export interface PillarPageContent {
  slug: string;
  tagline: string;
  overview: string[];
  /** Four key readouts shown under the page hero. */
  facts: PillarSpec[];
  blocks: PageBlock[];
  roadmapHeading: string;
  roadmap: RoadmapStep[];
  sources: SourceLink[];
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

export type NewsCategory = "competencias" | "eventos" | "comunidad" | "alianzas";

/** Quick facts shown next to a lead story; each kind gets its own icon. */
export interface NewsDetail {
  kind: "location" | "link" | "schedule";
  label: string;
  /** Destination. For "location" it defaults to a map search of the label. */
  href?: string;
}

export interface NewsItem {
  /** Unique id of the story. */
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  /** ISO 8601 date string. */
  publishedAt: string;
  /** Where the news took place, shown next to the date. */
  location: string;
  /** Cover photo. When missing, a generated cover in the category color is shown. */
  image?: ImageAsset;
  /** CSS object-position used to crop the cover (e.g. "50% 30%"). */
  imagePosition?: string;
  /** Optional quick facts (place, registration link, schedule). */
  details?: NewsDetail[];
  /** Full story, one entry per paragraph. */
  body: string[];
  sources: SourceLink[];
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
