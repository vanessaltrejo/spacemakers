import type { Pillar, PillarPageContent } from "@/types/content";

/**
 * DUMMY projects. Copy is generic on purpose (no specific facts) and images are reused from the
 * existing set. Replace with real content once the groups provide it.
 */
export const extraPillars: Pillar[] = [
  {
    id: "pillar-ground-station",
    slug: "estacion-terrena",
    category: "Comunicaciones",
    title: "Estación terrena",
    image: { src: "/images/hero-earth.webp", alt: "La Tierra vista desde la órbita baja" },
    tone: "orbit",
    dummy: true,
  },
  {
    id: "pillar-spacesuit",
    slug: "traje-espacial",
    category: "Biotecnología",
    title: "Traje espacial",
    image: { src: "/images/crew.webp", alt: "Dos astronautas sonriendo dentro de una cápsula espacial" },
    tone: "nebula",
    dummy: true,
  },
  {
    id: "pillar-amateur-radio",
    slug: "radioaficionados",
    category: "Comunicaciones",
    title: "Radioaficionados",
    image: { src: "/images/hero-planet.webp", alt: "Planeta visto desde el espacio" },
    tone: "orbit",
    dummy: true,
  },
];

export const extraPillarPages: PillarPageContent[] = [
  {
    slug: "estacion-terrena",
    dummy: true,
    status: "planned",
    tagline: "El punto en tierra que escucha y habla con los satélites.",
    overview: [
      "Una estación terrena es el equipo en tierra que se comunica con un satélite: recibe sus datos y le envía instrucciones.",
      "Este proyecto reúne el diseño de la antena, el equipo de radio y el software de seguimiento para los satélites del grupo.",
    ],
    facts: [
      { label: "Área", value: "Comunicaciones" },
      { label: "Enfoque", value: "Satélites del grupo" },
      { label: "Sede", value: "Campus Monterrey" },
      { label: "Inicio", value: "Por definir" },
    ],
    gallery: [
      { src: "/images/hero-earth.webp", alt: "La Tierra vista desde la órbita baja" },
      { src: "/images/satellite-aurora.webp", alt: "Render de un nanosatélite orbitando sobre la Tierra" },
      { src: "/images/hero-planet.webp", alt: "Planeta visto desde el espacio" },
    ],
    partnerIds: ["tec"],
    blocks: [
      {
        kind: "info",
        heading: "Qué hace una estación terrena",
        intro: "Es el puente entre quienes operan una misión y el satélite que está en órbita.",
        items: [
          { title: "Recibir datos", body: "Capta la señal del satélite y la convierte en información útil, como telemetría o imágenes." },
          { title: "Enviar instrucciones", body: "Transmite comandos al satélite para cambiar su orientación o activar un instrumento." },
          { title: "Seguir al satélite", body: "Mueve la antena para apuntar al satélite mientras cruza el cielo." },
          { title: "Guardar y compartir", body: "Almacena lo recibido para que el equipo y el público puedan consultarlo." },
        ],
      },
    ],
    roadmapHeading: "Siguientes pasos",
    roadmap: [
      { when: "Fecha por definir", title: "Diseño de la antena", description: "Definir el tipo de antena y su ubicación.", status: "tbc" },
      { when: "Fecha por definir", title: "Primer contacto", description: "Escuchar a un satélite en órbita.", status: "tbc" },
    ],
    sources: [],
  },
  {
    slug: "traje-espacial",
    dummy: true,
    status: "planned",
    tagline: "Un traje para entender cómo se protege y se mueve quien explora.",
    overview: [
      "Un traje espacial protege a una persona de condiciones extremas y le permite trabajar. Diseñarlo mezcla materiales, mecánica y biología.",
      "Este proyecto explora un prototipo para estudiar esas ideas y explicarlas al público.",
    ],
    facts: [
      { label: "Área", value: "Biotecnología" },
      { label: "Enfoque", value: "Protección y movilidad" },
      { label: "Sede", value: "Campus Monterrey" },
      { label: "Inicio", value: "Por definir" },
    ],
    gallery: [
      { src: "/images/crew.webp", alt: "Dos astronautas sonriendo dentro de una cápsula espacial" },
      { src: "/images/mars.webp", alt: "Superficie del planeta Marte" },
      { src: "/images/hero-earth.webp", alt: "La Tierra vista desde la órbita baja" },
    ],
    partnerIds: ["tec"],
    blocks: [
      {
        kind: "info",
        heading: "Lo que un traje debe resolver",
        intro: "Explorar fuera de una nave exige cuidar el cuerpo y, al mismo tiempo, poder trabajar con libertad.",
        items: [
          { title: "Presión", body: "Mantener una presión segura alrededor del cuerpo cuando el entorno no la ofrece." },
          { title: "Temperatura", body: "Proteger del calor y del frío extremos que hay lejos de la Tierra." },
          { title: "Movilidad", body: "Permitir agacharse, girar y usar herramientas sin cansarse de más." },
          { title: "Aire y monitoreo", body: "Suministrar aire y vigilar señales vitales de quien lo lleva." },
        ],
      },
    ],
    roadmapHeading: "Siguientes pasos",
    roadmap: [
      { when: "Fecha por definir", title: "Investigación de materiales", description: "Revisar opciones para un primer prototipo.", status: "tbc" },
      { when: "Fecha por definir", title: "Prototipo", description: "Construir y mostrar una primera versión.", status: "tbc" },
    ],
    sources: [],
  },
  {
    slug: "radioaficionados",
    dummy: true,
    status: "planned",
    tagline: "La radio como puerta de entrada a la comunicación con el espacio.",
    overview: [
      "La radioafición es una comunidad que usa la radio para comunicarse a distancia, y hay quienes logran hablar con estaciones en órbita.",
      "Este proyecto busca acercar esa práctica al público con talleres y actividades de divulgación.",
    ],
    facts: [
      { label: "Área", value: "Comunicaciones" },
      { label: "Enfoque", value: "Divulgación" },
      { label: "Sede", value: "Campus Monterrey" },
      { label: "Inicio", value: "Por definir" },
    ],
    gallery: [
      { src: "/images/hero-planet.webp", alt: "Planeta visto desde el espacio" },
      { src: "/images/hero-earth.webp", alt: "La Tierra vista desde la órbita baja" },
      { src: "/images/satellite-aurora.webp", alt: "Render de un nanosatélite orbitando sobre la Tierra" },
    ],
    partnerIds: ["tec"],
    blocks: [
      {
        kind: "info",
        heading: "Cómo funciona la radioafición",
        intro: "Con una antena, un radio y curiosidad se puede escuchar mucho más allá de la ciudad.",
        items: [
          { title: "Escuchar", body: "Sintonizar señales de otras personas y, con suerte, de estaciones en órbita." },
          { title: "Transmitir", body: "Comunicarse en directo con otras personas aficionadas, cerca o lejos." },
          { title: "Aprender", body: "Entender cómo viaja una señal por el aire, la atmósfera y el espacio." },
          { title: "Compartir", body: "Organizar talleres para que más gente pruebe y pregunte." },
        ],
      },
    ],
    roadmapHeading: "Siguientes pasos",
    roadmap: [
      { when: "Fecha por definir", title: "Primer taller", description: "Presentar la radioafición a la comunidad.", status: "tbc" },
      { when: "Fecha por definir", title: "Contacto con el espacio", description: "Intentar una comunicación con una estación en órbita.", status: "tbc" },
    ],
    sources: [],
  },
];
