import type { AccentTone, ResearchCategory } from "@/types/content";

interface ResearchCategoryMeta {
  label: string;
  tone: AccentTone;
}

/** Display name and accent color of every research category. */
export const researchCategories: Record<ResearchCategory, ResearchCategoryMeta> = {
  comunicaciones: { label: "Comunicaciones satelitales", tone: "orbit" },
  robotica: { label: "Robótica planetaria", tone: "ember" },
  biotecnologia: { label: "Biotecnología espacial", tone: "nebula" },
  vision: { label: "Visión computacional", tone: "ember" },
  validacion: { label: "Validación ambiental", tone: "lime" },
};
