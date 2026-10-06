import type { HomeContent } from "@/types/content";

// Dummy content. Stats are based on public notes about the ISSSP (Hong Kong) result;
// everything else is placeholder copy taken from the Canva mockup.
export const homeContent: HomeContent = {
  about: {
    image: {
      src: "/images/crew.webp",
      alt: "Dos astronautas sonriendo dentro de una cápsula espacial",
    },
    paragraphs: [
      "Democratizamos la investigación espacial y la robótica de superficie marciana desde México. Diseñamos tecnología autónoma con validación orbital directa y ensayos análogos de alta resistencia.",
      "Trabajamos con estudiantes y mentores de distintas instituciones, creando así una comunidad integral con una misión en común.",
    ],
  },
  partners: [
    { id: "tec", name: "Tec de Monterrey" },
    { id: "kyutech", name: "Kyutech" },
    { id: "urc", name: "University Rover Challenge" },
    { id: "isssp", name: "ISSSP Hong Kong" },
    { id: "fime", name: "FIME UANL" },
    { id: "aem", name: "Agencia Espacial Mexicana" },
  ],
  pillars: [
    {
      id: "pillar-rover",
      anchor: "rover",
      index: "01",
      category: "Robótica planetaria",
      title: "Rover Ares a Marte",
      summary:
        "Vehículo todo-terreno para detección biológica in situ y navegación autónoma en el University Rover Challenge.",
      description:
        "Ares es nuestro rover análogo marciano: suspensión rocker-bogie de seis ruedas, brazo robótico de 6 GDL y un laboratorio a bordo para buscar biofirmas en muestras de suelo.",
      image: {
        src: "/images/rover-ares.webp",
        alt: "Render del rover Ares con ruedas iluminadas sobre terreno marciano",
      },
      meta: { label: "Destino", value: "Utah 2027" },
      specs: [
        { label: "Tracción", value: "6×6 rocker-bogie" },
        { label: "Brazo", value: "6 GDL" },
        { label: "Autonomía", value: "SLAM + visión estéreo" },
      ],
      tone: "ember",
    },
    {
      id: "pillar-satellite",
      anchor: "satelites",
      index: "02",
      category: "Órbita baja",
      title: "Nanosatélites Aurora",
      summary:
        "Plataforma satelital 3U multiespectral enfocada en la telemetría climática y monitoreo del estrés hídrico.",
      description:
        "Aurora es un CubeSat 3U con cámara multiespectral y computadora de vuelo propia, diseñado para monitorear sequías y cultivos en el norte de México.",
      image: {
        src: "/images/satellite-aurora.webp",
        alt: "Render de un nanosatélite orbitando sobre la Tierra",
      },
      meta: { label: "Órbita", value: "LEO 410 km" },
      specs: [
        { label: "Formato", value: "CubeSat 3U" },
        { label: "Carga útil", value: "Cámara multiespectral" },
        { label: "Enlace", value: "UHF / Banda S" },
      ],
      tone: "orbit",
    },
    {
      id: "pillar-kyutech",
      anchor: "kyutech",
      index: "03",
      category: "Validación espacial",
      title: "Alianza Kyutech Japón",
      summary:
        "Ensayos de termo-vacío (TVAC) y vibración orbital en colaboración directa con el Kyushu Institute of Technology.",
      description:
        "Junto con el Kyushu Institute of Technology validamos nuestro hardware bajo condiciones de lanzamiento y de vacío térmico antes de volar.",
      image: {
        src: "/images/kyutech-team.webp",
        alt: "Equipo de estudiantes posando con robots frente a un edificio en Japón",
      },
      meta: { label: "Certificación", value: "TVAC" },
      specs: [
        { label: "Ensayos", value: "TVAC · Vibración" },
        { label: "Sede", value: "Kitakyushu, Japón" },
        { label: "Formato", value: "Intercambio estudiantil" },
      ],
      tone: "lime",
    },
  ],
  stats: [
    {
      id: "isssp-place",
      value: 3,
      suffix: "er",
      label: "Lugar ISSSP",
      description: "International Space Science and Scientific Payload Competition, Hong Kong.",
    },
    {
      id: "isssp-teams",
      value: 200,
      prefix: "+",
      label: "Equipos superados",
      description: "Seleccionados entre los 30 finalistas a nivel mundial.",
    },
    {
      id: "americas",
      value: 1,
      label: "Equipo de América",
      description: "Únicos representantes del continente en la gran final.",
    },
    {
      id: "pillars",
      value: 3,
      label: "Pilares de misión",
      description: "Robótica planetaria, órbita baja y validación espacial.",
    },
  ],
  recruitment: {
    eyebrow: "Tripulación 2026 // Convocatoria abierta",
    titleLead: "Únete a la próxima generación",
    titleEmphasis: "de exploradores aeroespaciales.",
    description:
      "Buscamos talento apasionado en aviónica, visión computacional, diseño mecánico y biotecnología espacial para impulsar las misiones del Tecnológico de Monterrey.",
    ctaLabel: "Postular candidatura",
    ctaHref: "mailto:spacemakers@tec.mx?subject=Postulaci%C3%B3n%20Tripulaci%C3%B3n%202026",
    deadlineLabel: "Recepción hasta marzo 2026",
    image: { src: "/images/mars.webp", alt: "Planeta Marte" },
  },
  news: [
    {
      id: "spaceweek-fime-2026",
      title: "SpaceWeek at FIME with us",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel orci consectetur, dapibus orci vel, semper mauris. Duis viverra pellentesque massa, quis egestas mi tincidunt vitae.",
      publishedAt: "2026-10-06",
      image: {
        src: "/images/news-spaceweek.webp",
        alt: "Cartel de SpaceWeek Mx FIME 2026, martes 6 de octubre de 09:00 a 15:00",
      },
    },
    {
      id: "urc-new-season",
      title: "Nueva temporada de URC",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel orci consectetur, dapibus orci vel, semper mauris. Duis viverra pellentesque massa, quis egestas mi tincidunt vitae.",
      publishedAt: "2026-09-20",
      image: {
        src: "/images/news-urc.webp",
        alt: "Rover naranja con brazo robótico en el desierto del University Rover Challenge",
      },
    },
  ],
};
