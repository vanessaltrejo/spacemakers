/**
 * Domain types for the Space Makers site content.
 * These mirror the shape a future CMS / API is expected to return.
 */

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Adds space above the entry, to separate groups in the sidebar. */
  gapBefore?: boolean;
  /** Accent color of the section (projects), shown as a marker in the sidebar. */
  tone?: AccentTone;
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
}

export interface HeroContent {
  eyebrow: string;
  /** Static lead of the headline, followed by the typewriter words. */
  title: string;
  rotatingWords: string[];
  primaryCta: NavItem;
  secondaryCta: NavItem;
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
  /** True while the entry is a placeholder, not a real organization. */
  dummy?: boolean;
}

/** A group of partners shown together on the Colaboraciones page. */
export interface CollaborationTier {
  id: string;
  title: string;
  partners: Partner[];
}

export interface CollaborationCase {
  id: string;
  partnerName: string;
  title: string;
  summary: string;
  image: ImageAsset;
}

export interface CollaborationMode {
  title: string;
  description: string;
}

export interface CollaborationsContent {
  intro: string;
  tiers: CollaborationTier[];
  cases: CollaborationCase[];
  howTo: {
    intro: string;
    modes: CollaborationMode[];
    ctaLabel: string;
  };
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
  category: string;
  title: string;
  image: ImageAsset;
  tone: AccentTone;
  /** True while the project is placeholder content. */
  dummy?: boolean;
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

export type ProjectStatus = "active" | "development" | "planned";

/** Everything a project page renders, keyed by pillar slug. One template serves every project. */
export interface PillarPageContent {
  slug: string;
  /** True while the page is placeholder content. */
  dummy?: boolean;
  status: ProjectStatus;
  tagline: string;
  /** Photo gallery (reused existing images until real photos exist). */
  gallery: ImageAsset[];
  /** Ids of the partners (see homeContent.partners) involved in the project. */
  partnerIds: string[];
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

export type NewsCategory = "competencias" | "eventos" | "comunidad" | "alianzas";

/** Quick facts shown next to a lead story; each kind gets its own icon. */
export interface NewsDetail {
  kind: "location" | "link" | "schedule";
  label: string;
  /** Destination. For "location" it defaults to a map search of the label. */
  href?: string;
}

export type NewsKind = "own" | "external";

export interface NewsItem {
  /** Unique id of the story. */
  id: string;
  /** "own" stories live on the site; "external" ones only link to the agency's press room. */
  kind: NewsKind;
  /** External stories: agency that published it (NASA, JAXA, ESA...). */
  source?: string;
  /** External stories: direct link to the original. Open in a new tab. */
  externalUrl?: string;
  /** True while the content is placeholder text, not a real story. */
  dummy?: boolean;
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
  /** Full story, one entry per paragraph. Optional for external stories. */
  body?: string[];
  sources: SourceLink[];
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

export interface HomeContent {
  hero: HeroContent;
  partners: Partner[];
  pillars: Pillar[];
  news: NewsItem[];
}

export interface TimelineEntry {
  when: string;
  image?: ImageAsset;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  /** Degree or role, shown under the name. */
  role: string;
  dummy?: boolean;
}

export interface TeamArea {
  id: string;
  title: string;
  members: TeamMember[];
}

export interface AboutPageContent {
  statement: string;
  image: ImageAsset;
  paragraphs: string[];
  stats: Stat[];
  recruitment: Recruitment;
  timeline: TimelineEntry[];
  mission: string;
  vision: string;
  areas: TeamArea[];
}

export type ResearchCategory =
  | "comunicaciones"
  | "robotica"
  | "biotecnologia"
  | "vision"
  | "validacion";

export interface ResearchItem {
  id: string;
  title: string;
  category: ResearchCategory;
  year: number;
  summary: string;
  /** Internal link to the related project page. */
  href: string;
  /** True while the entry is placeholder content. */
  dummy?: boolean;
}
