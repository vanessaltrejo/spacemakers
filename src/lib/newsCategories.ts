import type { AccentTone, NewsCategory } from "@/types/content";

interface NewsCategoryMeta {
  label: string;
  tone: AccentTone;
}

/** Display name and accent color of every newsletter category. */
export const newsCategories: Record<NewsCategory, NewsCategoryMeta> = {
  competencias: { label: "Competencias", tone: "ember" },
  eventos: { label: "Eventos", tone: "orbit" },
  comunidad: { label: "Comunidad", tone: "lime" },
  alianzas: { label: "Alianzas", tone: "nebula" },
};
