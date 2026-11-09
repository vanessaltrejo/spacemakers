import type { AboutPageContent } from "@/types/content";

/**
 * Content of the Nosotros page.
 * Verified: URC 2023 listing, ISSSP 2024 result (the stats), team names and degrees (see pillarPages.ts).
 * DUMMY: the founding entry, the people marked `dummy`, and which area each real person belongs to
 * (TODO(confirm) with the group).
 */
export const aboutContent: AboutPageContent = {
  statement:
    "Democratizamos la investigación espacial y la robótica de superficie marciana desde México.",
  image: {
    src: "/images/crew.webp",
    alt: "Dos astronautas sonriendo dentro de una cápsula espacial",
  },
  paragraphs: [
    "Trabajamos con estudiantes y mentores de distintas instituciones, creando así una comunidad integral con una misión en común. Somos un laboratorio de innovación espacial del Tecnológico de Monterrey, donde convergen la ingeniería electrónica, la mecatrónica, la mecánica, las tecnologías computacionales y la robótica. Queremos convertirnos en un punto de referencia internacional que atraiga talento e inversión en tecnologías espaciales.",
  ],
  stats: [
    {
      id: "isssp-place",
      value: 3,
      suffix: "er",
      label: "Lugar ISSSP",
      description: "International Space Science and Scientific Payload Competition, Hong Kong.",
      tone: "ember",
    },
    {
      id: "isssp-teams",
      value: 200,
      prefix: "+",
      label: "Equipos superados",
      description: "Seleccionados entre los 30 finalistas a nivel mundial.",
      tone: "orbit",
    },
    {
      id: "americas",
      value: 1,
      label: "Equipo de América",
      description: "Únicos representantes del continente en la gran final.",
      tone: "lime",
    },
    {
      id: "pillars",
      value: 6,
      label: "Proyectos",
      description: "Rover, satélites, Kyutech, estación terrena, traje espacial y radioaficionados.",
      tone: "nebula",
    },
  ],
  recruitment: {
    eyebrow: "Tripulación 2026 - Convocatoria abierta",
    titleLead: "Únete a la próxima generación",
    titleEmphasis: "de exploradores aeroespaciales.",
    description:
      "Buscamos talento apasionado en aviónica, visión computacional, diseño mecánico y biotecnología espacial para impulsar las misiones del Tecnológico de Monterrey.",
    ctaLabel: "Únete a la tripulación",
    ctaHref: "mailto:spacemakers.mty@servicios.tec.mx?subject=Postulaci%C3%B3n%20Tripulaci%C3%B3n%202026",
    image: { src: "/images/mars.webp", alt: "Planeta Marte" },
  },
  timeline: [
    {
      // DUMMY: founding story and date to be confirmed by the group.
      when: "Los inicios",
      title: "Un grupo de estudiantes con una misma curiosidad",
      description:
        "Space Makers nace en el Tecnológico de Monterrey cuando estudiantes de electrónica, mecatrónica, mecánica y computación deciden construir tecnología espacial en lugar de solo estudiarla.",
      image: { src: "/images/news-tecnolochicas.webp", alt: "Estudiantes reunidas en una jornada del Tec de Monterrey" },
    },
    {
      when: "2023",
      title: "Primera aparición en el University Rover Challenge",
      description:
        "El grupo figura en el listado oficial de la competencia de rovers marcianos como «Space Makers Rovers Division», representando al Tecnológico de Monterrey.",
      image: { src: "/images/news-urc.webp", alt: "Rover con brazo robótico en el desierto del University Rover Challenge" },
    },
    {
      when: "2024",
      title: "Tercer lugar mundial en Hong Kong",
      description:
        "Con un protocolo de comunicación para enjambres de satélites, inspirado en cómo las hormigas encuentran su camino, Space Makers fue el único equipo de América en la final del ISSSP y terminó tercero entre 200 equipos.",
      image: { src: "/images/satellite-aurora.webp", alt: "Render de un nanosatélite orbitando sobre la Tierra" },
    },
    {
      when: "2026",
      title: "El espacio abierto a toda la comunidad",
      description:
        "El grupo organizó la observación del eclipse lunar en el Tec, con entrada libre, y se sumó a la SpaceWeek en la FIME y a la capacitación TecnoLochicas.",
      image: { src: "/images/news-eclipse.webp", alt: "Eclipse lunar total con la Luna en tono rojizo" },
    },
    {
      when: "2027",
      title: "Camino a Utah",
      description:
        "La próxima meta del rover Ares es el University Rover Challenge, del 2 al 5 de junio de 2027 en la Mars Desert Research Station. La participación está por confirmarse.",
      image: { src: "/images/mars.webp", alt: "Superficie del planeta Marte" },
    },
  ],
  mission: "Hacer accesibles la investigación espacial y la robótica de superficie marciana.",
  vision:
    "Ser un punto de referencia internacional que atraiga talento e inversión en tecnologías espaciales.",
  areas: [
    {
      id: "avionica",
      title: "Aviónica",
      members: [
        { name: "Rigel de Jesús", role: "Ingeniería Electrónica" },
        { name: "Integrante por confirmar", role: "Aviónica", dummy: true },
      ],
    },
    {
      id: "mecanica",
      title: "Mecánica",
      members: [
        { name: "Ángel de Jesús Pérez", role: "Ingeniería Mecánica" },
        { name: "Sofía Cavazos", role: "Ingeniería Mecatrónica" },
      ],
    },
    {
      id: "vision",
      title: "Visión computacional",
      members: [
        { name: "André Rivera", role: "Tecnologías Computacionales" },
        { name: "Integrante por confirmar", role: "Visión computacional", dummy: true },
      ],
    },
    {
      id: "biotecnologia",
      title: "Biotecnología",
      members: [
        { name: "Integrante por confirmar", role: "Biotecnología", dummy: true },
        { name: "Integrante por confirmar", role: "Biotecnología", dummy: true },
      ],
    },
    {
      id: "comunicaciones",
      title: "Comunicaciones",
      members: [
        { name: "Ximena Trejo", role: "Robótica y Sistemas Digitales" },
        { name: "Integrante por confirmar", role: "Comunicaciones", dummy: true },
      ],
    },
  ],
};
