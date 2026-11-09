import { homeContent } from "@/data/home";
import type { CollaborationsContent, Partner } from "@/types/content";

const partner = (id: string): Partner => {
  const found = homeContent.partners.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown partner: ${id}`);
  return found;
};

/** DUMMY: placeholder companies until the real list of industry partners exists. */
const industryPlaceholders: Partner[] = [1, 2, 3].map((number) => ({
  id: `industry-${number}`,
  name: "Empresa aliada",
  size: "large",
  dummy: true,
}));

export const collaborationsContent: CollaborationsContent = {
  intro:
    "Space Makers avanza gracias a universidades, agencias y empresas que comparten la idea de acercar la ingeniería espacial a más personas.",
  tiers: [
    {
      id: "strategic",
      title: "Aliados estratégicos",
      partners: [partner("tec"), partner("kyutech"), partner("aem")],
    },
    {
      id: "institutions",
      title: "Instituciones y competencias",
      partners: [partner("fime"), partner("urc"), partner("isssp")],
    },
    {
      id: "industry",
      title: "Industria",
      partners: industryPlaceholders,
    },
  ],
  cases: [
    {
      id: "kyutech",
      partnerName: "Kyutech",
      title: "Validar hardware antes de volar",
      summary:
        "Con el Kyushu Institute of Technology, en Japón, el grupo prepara ensayos de termo-vacío y vibración para probar su nanosatélite bajo condiciones de lanzamiento y de vacío térmico.",
      image: {
        src: "/images/kyutech-team.webp",
        alt: "Equipo de estudiantes posando con robots frente a un edificio en Japón",
      },
    },
    {
      id: "urc",
      partnerName: "University Rover Challenge",
      title: "Un rover para competir en Marte",
      summary:
        "El rover Ares se desarrolla pensando en el University Rover Challenge, la mayor competencia universitaria de rovers marcianos, que organiza The Mars Society en Utah.",
      image: {
        src: "/images/news-urc.webp",
        alt: "Rover naranja con brazo robótico en el desierto del University Rover Challenge",
      },
    },
    {
      id: "isssp",
      partnerName: "ISSSP",
      title: "Tercer lugar mundial en Hong Kong",
      summary:
        "En el International Space Science and Scientific Payload Competition, Space Makers fue el único equipo de América en la final y quedó en tercer lugar entre 200 equipos.",
      image: {
        src: "/images/satellite-aurora.webp",
        alt: "Render de un nanosatélite orbitando sobre la Tierra",
      },
    },
  ],
  howTo: {
    intro: "Hay tres maneras de sumarse. Cuéntanos cuál te interesa y platicamos.",
    modes: [
      {
        title: "Patrocinio",
        description: "Apoyo económico para construir, probar y viajar a las competencias. Tu marca aparece en los proyectos que impulsas.",
      },
      {
        title: "Proveeduría o en especie",
        description: "Componentes, herramientas, software o servicios de prueba que el grupo necesita para sus proyectos.",
      },
      {
        title: "Proyectos conjuntos",
        description: "Investigación y desarrollo con universidades, agencias y empresas, desde un experimento hasta una misión completa.",
      },
    ],
    ctaLabel: "Escríbenos",
  },
};
