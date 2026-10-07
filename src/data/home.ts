import type { HomeContent } from "@/types/content";

// Dummy content. Stats are based on public notes about the ISSSP (Hong Kong) result;
// everything else is placeholder copy taken from the Canva mockup.
export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Del taller a la órbita",
    title: "SpaceMakers is",
    rotatingWords: ["community", "challenges", "innovation", "exploration"],
    primaryCta: { label: "Únete a la tripulación", href: "#unete" },
    secondaryCta: { label: "Explorar misiones", href: "#programas" },
  },
  about: {
    statement:
      "Democratizamos la investigación espacial y la robótica de superficie marciana desde México.",
    image: {
      src: "/images/crew.webp",
      alt: "Dos astronautas sonriendo dentro de una cápsula espacial",
    },
    paragraphs: [
      "Trabajamos con estudiantes y mentores de distintas instituciones, creando así una comunidad integral con una misión en común. Somos un laboratorio de innovación espacial del Tecnológico de Monterrey, donde convergen la ingeniería electrónica, la mecatrónica, la mecánica, las tecnologías computacionales y la robótica. Queremos convertirnos en un punto de referencia internacional que atraiga talento e inversión en tecnologías espaciales.",
    ],
  },
  partners: [
    {
      id: "tec",
      name: "Tec de Monterrey",
      logo: { src: "/logos/tec.svg", alt: "Tecnológico de Monterrey", width: 2085, height: 2085 },
      size: "large",
    },
    {
      id: "kyutech",
      name: "Kyutech",
      logo: { src: "/logos/kyutech.svg", alt: "Kyushu Institute of Technology", width: 512, height: 101 },
    },
    {
      id: "urc",
      name: "University Rover Challenge",
      logo: { src: "/logos/urc.png", alt: "University Rover Challenge", width: 730, height: 441 },
    },
    // No official ISSSP logo was found, so the name is shown as text.
    { id: "isssp", name: "ISSSP Hong Kong", size: "large" },
    {
      id: "fime",
      name: "FIME UANL",
      logo: { src: "/logos/uanl.png", alt: "Escudo de la UANL (FIME)", width: 294, height: 300 },
      size: "large",
    },
    {
      id: "aem",
      name: "Agencia Espacial Mexicana",
      logo: { src: "/logos/aem.svg", alt: "Agencia Espacial Mexicana", width: 512, height: 324 },
    },
  ],
  pillars: [
    {
      id: "pillar-rover",
      slug: "rover",
      index: "01",
      category: "Robótica planetaria",
      title: "Rover Ares a Marte",
      summary:
        "Vehículo todo-terreno para detección biológica in situ y navegación autónoma en el University Rover Challenge.",
      image: {
        src: "/images/rover-ares.webp",
        alt: "Render del rover Ares con ruedas iluminadas sobre terreno marciano",
      },
      meta: { label: "Destino", value: "Utah 2027" },
      specs: [
        { label: "Misión", value: "Detección biológica" },
        { label: "Competencia", value: "University Rover Challenge" },
      ],
      tone: "ember",
    },
    {
      id: "pillar-satellite",
      slug: "satelites",
      index: "02",
      category: "Órbita baja",
      title: "Nanosatélites Aurora",
      summary:
        "Plataforma satelital 3U multiespectral enfocada en la telemetría climática y monitoreo del estrés hídrico.",
      image: {
        src: "/images/satellite-aurora.webp",
        alt: "Render de un nanosatélite orbitando sobre la Tierra",
      },
      meta: { label: "Órbita", value: "LEO 410 km" },
      specs: [
        { label: "Formato", value: "CubeSat 3U" },
        { label: "Enfoque", value: "Clima y estrés hídrico" },
      ],
      tone: "orbit",
    },
    {
      id: "pillar-kyutech",
      slug: "kyutech",
      index: "03",
      category: "Validación espacial",
      title: "Alianza Kyutech Japón",
      summary:
        "Ensayos de termo-vacío (TVAC) y vibración orbital en colaboración directa con el Kyushu Institute of Technology.",
      image: {
        src: "/images/kyutech-team.webp",
        alt: "Equipo de estudiantes posando con robots frente a un edificio en Japón",
      },
      meta: { label: "Certificación", value: "TVAC" },
      specs: [
        { label: "Ensayos", value: "TVAC · Vibración" },
        { label: "Sede", value: "Kitakyushu, Japón" },
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
      value: 3,
      label: "Pilares de misión",
      description: "Robótica planetaria, órbita baja y validación espacial.",
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
    ctaHref: "mailto:spacemakers@tec.mx?subject=Postulaci%C3%B3n%20Tripulaci%C3%B3n%202026",
    image: { src: "/images/mars.webp", alt: "Planeta Marte" },
  },
  // Real, verifiable announcements (October 2026). Sources are linked on each story page.
  news: [
    {
      id: "spaceweek-fime-2026",
      title: "SpaceWeek at FIME with us",
      excerpt: "Martes 6 de octubre, de 09:00 a 15:00 h, en el Auditorio Dr. Raúl G. Quintero Flores.",
      category: "eventos",
      publishedAt: "2026-10-06",
      location: "FIME UANL, Nuevo León",
      image: {
        src: "/images/news-spaceweek.webp",
        alt: "Cartel de SpaceWeek Mx FIME 2026, martes 6 de octubre de 09:00 a 15:00",
      },
      details: [
        { kind: "location", label: "Auditorio Dr. Raúl G. Quintero Flores, FIME" },
        // TODO(confirm): demo link — replace with the real registration form.
        { kind: "link", label: "Registro al evento", href: "https://forms.google.com" },
        { kind: "schedule", label: "Mar 6 oct · 09:00 – 15:00 h" },
      ],
      body: [
        "SpaceWeek Mx FIME 2026 se celebra el martes 6 de octubre de 2026, de 09:00 a 15:00 h, en el Auditorio Dr. Raúl G. Quintero Flores de la FIME. Es una jornada abierta a la comunidad estudiantil para conocer de cerca el mundo del espacio.",
        "SpaceMakers se suma al evento. El grupo es un laboratorio de innovación espacial del Tecnológico de Monterrey, con proyectos activos de rover y de satélite.",
        "La fecha coincide con la Semana Mundial del Espacio, que cada año se celebra del 4 al 10 de octubre en todo el planeta y recuerda el inicio de la era espacial y la firma del Tratado del Espacio Exterior.",
        "La convocatoria de la tripulación 2026 de SpaceMakers sigue abierta para quienes quieran unirse al grupo.",
      ],
      sources: [],
    },
    {
      id: "urc-2027-registro",
      title: "Abre el registro del URC 2027",
      excerpt: "Los equipos pueden inscribirse del 1 al 30 de octubre; la competencia será en junio.",
      category: "competencias",
      publishedAt: "2026-10-01",
      location: "Hanksville, Utah",
      image: {
        src: "/images/news-urc.webp",
        alt: "Rover naranja con brazo robótico en el desierto del University Rover Challenge",
      },
      details: [
        { kind: "location", label: "Mars Desert Research Station, Hanksville, Utah" },
        { kind: "link", label: "Sitio oficial del URC", href: "https://urc.marssociety.org/home" },
        { kind: "schedule", label: "2 – 5 jun 2027 · registro 1 – 30 oct" },
      ],
      body: [
        "El University Rover Challenge 2027 se celebrará del 2 al 5 de junio de 2027 en la Mars Desert Research Station, cerca de Hanksville, Utah. La inscripción de equipos está abierta del 1 al 30 de octubre de 2026.",
        "Lo organiza The Mars Society y reúne a equipos universitarios de todo el mundo para competir con rovers marcianos. El sitio se eligió por su parecido geológico y de suelo con Marte; en la edición 2026 se inscribieron 116 equipos de 18 países.",
        "El reglamento clásico plantea cuatro misiones: ciencia, con análisis de detección de vida a bordo; recuperación y entrega extrema de objetos guiada por GPS; servicio de equipo, con tareas diestras como girar manivelas o reemplazar tarjetas; y navegación autónoma entre marcadores sin teleoperación.",
        "SpaceMakers ya apareció en el listado del URC 2023 como «Space Makers Rovers Division». Su participación en la edición 2027 todavía está por confirmarse.",
      ],
      sources: [{ label: "University Rover Challenge — The Mars Society", href: "https://urc.marssociety.org/home" }],
    },
    {
      id: "tecnolochicas-2026",
      title: "Capacitación TecnoLochicas",
      excerpt: "Jornada para universitarias de carreras STEM, con Fundación Televisa, en el CETEC.",
      category: "comunidad",
      publishedAt: "2026-08-28",
      location: "CETEC Torre Sur, Tec de Monterrey",
      image: {
        src: "/images/news-tecnolochicas.webp",
        alt: "Tres mujeres conversan en una mesa durante un desayuno de mentoría para mujeres en STEM",
      },
      imagePosition: "50% 40%",
      details: [
        { kind: "location", label: "CETEC Torre Sur, Tec de Monterrey" },
        { kind: "link", label: "@spacemakers.mty en Instagram", href: "https://www.instagram.com/spacemakers.mty/" },
        { kind: "schedule", label: "Vie 28 ago · 08:00 – 19:00 h" },
      ],
      body: [
        "SpaceMakers convocó a la capacitación TecnoLochicas, programada para el 28 de agosto de 2026, de 08:00 a 19:00 h, en el CETEC Torre Sur del Tec de Monterrey.",
        "El programa cuenta con el respaldo de Fundación Televisa y está dirigido a universitarias de entre 18 y 28 años, de preferencia de carreras STEM: ciencia, tecnología, ingeniería y matemáticas.",
        "IEEE AESS UANL aparece entre las organizaciones aliadas del programa.",
        "Para más información, la vinculación de SpaceMakers publicó el contacto +52 662 429 1105 y el perfil @spacemakers.mty en Instagram.",
      ],
      sources: [{ label: "SpaceMakers en Instagram (@spacemakers.mty)", href: "https://www.instagram.com/spacemakers.mty/" }],
    },
    {
      id: "eclipse-lunar-2026",
      title: "Observación del eclipse lunar",
      excerpt: "Noche de observación con entrada libre en la Explanada Jardín de las Carreras.",
      category: "eventos",
      publishedAt: "2026-08-27",
      location: "Jardín de las Carreras, Tec de Monterrey",
      image: {
        src: "/images/news-eclipse.webp",
        alt: "Luna de color rojizo durante un eclipse lunar total sobre un cielo oscuro",
      },
      details: [
        { kind: "location", label: "Explanada Jardín de las Carreras, Tec de Monterrey" },
        { kind: "link", label: "@spacemakers.mty en Instagram", href: "https://www.instagram.com/spacemakers.mty/" },
        { kind: "schedule", label: "Jue 27 ago · 20:00 – 24:00 h" },
      ],
      body: [
        "SpaceMakers invitó a observar el eclipse lunar el 27 de agosto de 2026, de 20:00 a 24:00 h, en la Explanada Jardín de las Carreras del Tec de Monterrey. La entrada fue libre para toda la comunidad.",
        "Un eclipse lunar ocurre cuando la Luna atraviesa la sombra de la Tierra. A diferencia de un eclipse solar, se puede mirar a simple vista, sin lentes especiales, por eso es una de las mejores formas de acercarse a la astronomía.",
        "La actividad forma parte de la divulgación que realiza SpaceMakers para acercar el espacio a la comunidad del Tec.",
        "SpaceMakers es un laboratorio de innovación espacial que además desarrolla proyectos de rover y de satélite.",
      ],
      sources: [{ label: "SpaceMakers en Instagram (@spacemakers.mty)", href: "https://www.instagram.com/spacemakers.mty/" }],
    },
    {
      id: "isssp-hong-kong-2024",
      title: "Tercer lugar mundial en Hong Kong",
      excerpt: "Un protocolo para enjambres de satélites, entre 200 equipos y único finalista de América.",
      category: "competencias",
      publishedAt: "2024-11-27",
      location: "Hong Kong, China",
      image: {
        src: "/images/satellite-aurora.webp",
        alt: "Render de un nanosatélite orbitando sobre la Tierra",
      },
      details: [
        { kind: "location", label: "Hong Kong, China" },
        {
          kind: "link",
          label: "Nota en Conecta Tec",
          href: "https://conecta.tec.mx/es/noticias/monterrey/educacion/triunfo-espacial-alumnos-tec-son-3er-lugar-en-concurso-en-hong-kong",
        },
        { kind: "schedule", label: "Noviembre de 2024" },
      ],
      body: [
        "SpaceMakers obtuvo el tercer lugar en el International Space Science and Scientific Payload Competition (ISSSP), celebrado en Hong Kong en noviembre de 2024. Compitieron 200 equipos, 30 llegaron a la final y el grupo fue el único equipo de América en ella.",
        "Su propuesta es un protocolo de comunicación para enjambres de satélites. Optimiza el mapeo de topología y determina las rutas más eficientes para transmitir datos entre satélites, y se inspira en cómo las hormigas encuentran el camino óptimo.",
        "El proyecto nació del trabajo académico de Rigel de Jesús con el profesor César Vargas, en la concentración de Tecnologías Aeroespaciales del Tec, y se desarrolló en tres meses con asesoría también de Paloma González.",
        "El equipo reunió a cinco estudiantes: Rigel de Jesús (Ingeniería Electrónica), Sofía Cavazos (Ingeniería Mecatrónica), Ángel de Jesús Pérez (Ingeniería Mecánica), André Rivera (Tecnologías Computacionales) y Ximena Trejo (Robótica y Sistemas Digitales).",
      ],
      sources: [
        {
          label: "Conecta Tec · Triunfo espacial: alumnos Tec son 3er lugar en Hong Kong",
          href: "https://conecta.tec.mx/es/noticias/monterrey/educacion/triunfo-espacial-alumnos-tec-son-3er-lugar-en-concurso-en-hong-kong",
        },
      ],
    },
    {
      id: "urc-2023-listado",
      title: "SpaceMakers en el URC 2023",
      excerpt: "La división de rovers del grupo figura en el listado oficial de equipos del certamen.",
      category: "competencias",
      publishedAt: "2023-06-01",
      location: "Hanksville, Utah",
      image: {
        src: "/images/rover-ares.webp",
        alt: "Render del rover de SpaceMakers sobre terreno marciano",
      },
      details: [
        { kind: "location", label: "Mars Desert Research Station, Hanksville, Utah" },
        {
          kind: "link",
          label: "Listado oficial de equipos",
          href: "https://urc.marssociety.org/home/about-urc/history/urc2023/urc2023-team-info",
        },
        { kind: "schedule", label: "1 – 3 jun 2023" },
      ],
      // TODO(confirm): the official list does not state SpaceMakers' result in 2023 — add it when the group confirms it.
      body: [
        "SpaceMakers aparece en el listado oficial de equipos del University Rover Challenge 2023 como «Space Makers Rovers Division», del Tecnológico de Monterrey, en México.",
        "Esa edición se celebró del 1 al 3 de junio de 2023 en la Mars Desert Research Station, cerca de Hanksville, Utah. Equipos universitarios de varios países compiten ahí con rovers pensados para la exploración marciana.",
        "El listado oficial no detalla el resultado del equipo en esa edición, así que aquí solo se confirma su participación en el certamen.",
        "Hoy el grupo mantiene su proyecto de rover en desarrollo y el registro para el URC 2027 está abierto hasta el 30 de octubre.",
      ],
      sources: [
        {
          label: "URC 2023 · listado de equipos",
          href: "https://urc.marssociety.org/home/about-urc/history/urc2023/urc2023-team-info",
        },
      ],
    },
  ],
};
