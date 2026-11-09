import type { ResearchItem } from "@/types/content";

/**
 * DUMMY research entries with generic summaries (no specific results). Each links to the related
 * project page. The first one is based on the ISSSP 2024 proposal described in pillarPages.ts.
 */
export const research: ResearchItem[] = [
  {
    id: "swarm-protocol",
    title: "Protocolo de comunicación para enjambres de satélites",
    category: "comunicaciones",
    year: 2024,
    summary: "Un método inspirado en las hormigas para encontrar las rutas más eficientes de datos entre satélites.",
    href: "/satelites",
  },
  {
    id: "ground-station-tracking",
    title: "Seguimiento de satélites desde tierra",
    category: "comunicaciones",
    year: 2026,
    summary: "Cómo una estación terrena apunta su antena y mantiene el contacto con un satélite en órbita.",
    href: "/estacion-terrena",
    dummy: true,
  },
  {
    id: "rover-suspension",
    title: "Suspensión para terreno difícil",
    category: "robotica",
    year: 2026,
    summary: "Estudio de mecanismos que permiten a un rover avanzar sobre rocas y arena.",
    href: "/rover",
    dummy: true,
  },
  {
    id: "autonomous-navigation",
    title: "Navegación autónoma sin operador",
    category: "robotica",
    year: 2025,
    summary: "Cómo un rover decide su ruta entre marcadores sin recibir instrucciones en tiempo real.",
    href: "/rover",
    dummy: true,
  },
  {
    id: "life-detection",
    title: "Detección de vida in situ",
    category: "biotecnologia",
    year: 2025,
    summary: "Ideas para buscar señales biológicas en una muestra de suelo con instrumentos a bordo.",
    href: "/rover",
    dummy: true,
  },
  {
    id: "suit-protection",
    title: "Protección y movilidad en un traje espacial",
    category: "biotecnologia",
    year: 2026,
    summary: "Una revisión de cómo equilibrar la protección del cuerpo con la libertad de movimiento.",
    href: "/traje-espacial",
    dummy: true,
  },
  {
    id: "terrain-perception",
    title: "Percepción del terreno con cámaras",
    category: "vision",
    year: 2025,
    summary: "Cómo una cámara ayuda a reconocer obstáculos y zonas seguras para avanzar.",
    href: "/rover",
    dummy: true,
  },
  {
    id: "tvac-preparation",
    title: "Preparar un nanosatélite para el vacío térmico",
    category: "validacion",
    year: 2026,
    summary: "Qué se revisa antes de someter un satélite a ciclos extremos de temperatura y vacío.",
    href: "/kyutech",
    dummy: true,
  },
];
