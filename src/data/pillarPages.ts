import type { PillarPageContent } from "@/types/content";

/**
 * Content for the pillar pages.
 *
 * Provenance of the information (researched October 2026):
 *  - VERIFIED: ISSSP 2024 result, team members and advisors (Conecta Tec / MVS Noticias),
 *    URC format, dates and Mexican entries (Mars Society), Kyutech test facilities
 *    (UNOOSA / Kyutech), SpaceMakers roles and bio (@spacemakers.mty).
 *  - FROM THE GROUP'S OWN MOCKUP (not independently verifiable online): the "Ares" rover name,
 *    the "Aurora" 3U / LEO 410 km concept and the Kyutech TVAC / vibration collaboration.
 *    Items marked `TODO(confirm)` must be confirmed by the team before going public.
 */
export const pillarPages: PillarPageContent[] = [
  {
    slug: "rover",
    tagline: "Detección biológica in situ y navegación autónoma en terreno análogo a Marte.",
    overview: [
      "La división de rovers de SpaceMakers —inscrita como «Space Makers Rovers Division» en el University Rover Challenge 2023— desarrolla un vehículo todo-terreno para competir en la mayor competencia universitaria de rovers marcianos.",
      "El URC lo organiza la Mars Society cada verano en la Mars Desert Research Station, en el desierto de Utah, un sitio elegido por su parecido geológico y de suelo con Marte.",
    ],
    facts: [
      { label: "Destino", value: "Utah · URC 2027" },
      { label: "Fechas", value: "2 – 5 jun 2027" },
      { label: "Sede", value: "Mars Desert Research Station" },
      { label: "Organiza", value: "The Mars Society" },
    ],
    blocks: [
      {
        kind: "info",
        heading: "Lo que un rover debe lograr en Utah",
        intro: "Las cuatro misiones clásicas del University Rover Challenge. Cada una exige una disciplina distinta del equipo.",
        showIndex: true,
        items: [
          {
            title: "Misión científica",
            body: "Análisis de detección de vida a bordo en sitios biológicos: determinar si hay o no vida en 20–30 minutos y presentar los hallazgos al jurado.",
          },
          {
            title: "Recuperación y entrega extrema",
            body: "Recoger y entregar objetos a través de arena y campos de rocas, navegando con coordenadas GPS.",
          },
          {
            title: "Servicio de equipo",
            body: "Operaciones diestras sobre equipo simulado: palancas, tornillos, reemplazo de tarjetas electrónicas y manivelas.",
          },
          {
            title: "Navegación autónoma",
            body: "Recorrer el terreno entre marcadores sin teleoperación, decidiendo y evitando obstáculos con el cómputo a bordo.",
          },
        ],
      },
      {
        kind: "info",
        heading: "Perfiles que necesita esta misión",
        intro: "Un rover es un trabajo de varias disciplinas a la vez. Estos son los perfiles que buscamos para la tripulación.",
        showIndex: false,
        items: [
          { title: "Aviónica y electrónica", body: "Potencia, sensores y control de motores del vehículo." },
          { title: "Visión computacional", body: "Percepción del entorno para la navegación autónoma." },
          { title: "Diseño mecánico", body: "Chasis, suspensión y mecanismos para terreno difícil." },
          { title: "Biotecnología espacial", body: "Instrumentación y protocolos para la detección de vida." },
        ],
      },
    ],
    roadmapHeading: "Camino a Utah",
    roadmap: [
      {
        when: "1 – 30 oct 2026",
        title: "Registro para el URC 2027",
        description: "Ventana oficial de inscripción de equipos en el sitio del URC.",
        status: "active",
      },
      {
        // TODO(confirm): the team must confirm it is registering for URC 2027.
        when: "Fecha por definir",
        title: "Inscripción de SpaceMakers",
        description: "El equipo confirmará su participación y el estado del rover Ares.",
        status: "tbc",
      },
      {
        when: "2 – 5 jun 2027",
        title: "University Rover Challenge 2027",
        description: "Competencia final en la Mars Desert Research Station, Hanksville, Utah.",
        status: "upcoming",
      },
    ],
    sources: [
      { label: "University Rover Challenge — The Mars Society", href: "https://urc.marssociety.org/home" },
      { label: "URC2023 · listado de equipos", href: "https://urc.marssociety.org/home/about-urc/history/urc2023/urc2023-team-info" },
      { label: "University Rover Challenge — Wikipedia", href: "https://en.wikipedia.org/wiki/University_Rover_Challenge" },
    ],
  },
  {
    slug: "satelites",
    tagline: "Nanosatélites 3U para telemetría climática y protocolos de comunicación entre satélites.",
    overview: [
      "La división de satélites de SpaceMakers trabaja en una plataforma CubeSat 3U —un nanosatélite de aproximadamente 10 × 10 × 34 cm— pensada para medir variables climáticas y el estrés hídrico desde órbita baja.",
      "En software y comunicaciones, el grupo ya tiene un reconocimiento internacional: un protocolo para enjambres de satélites que quedó en tercer lugar mundial en Hong Kong.",
    ],
    facts: [
      // TODO(confirm): Aurora concept values come from the group's mockup.
      { label: "Formato", value: "CubeSat 3U" },
      { label: "Órbita objetivo", value: "LEO · 410 km" },
      { label: "Enfoque", value: "Clima y estrés hídrico" },
      { label: "Reconocimiento", value: "3er lugar ISSSP 2024" },
    ],
    blocks: [
      {
        kind: "info",
        heading: "Anatomía de un nanosatélite",
        intro: "Los subsistemas típicos de un CubeSat 3U. SpaceMakers cuenta con liderazgo dedicado de proyecto y de ADCS.",
        showIndex: true,
        items: [
          { title: "Estructura", body: "El chasis que aloja todo dentro de un volumen muy reducido y resiste el lanzamiento." },
          { title: "Energía", body: "Paneles solares y baterías que mantienen vivo al satélite en cada órbita." },
          { title: "Computadora de a bordo", body: "El software de vuelo que coordina sensores, actuadores y comunicaciones." },
          { title: "Comunicaciones", body: "El enlace de radio que baja la telemetría y sube los comandos a tierra." },
          {
            title: "ADCS",
            body: "Determinación y control de actitud: giroscopios, magnetómetros y sensores solares miden la orientación; magnetorquers y ruedas de reacción la corrigen.",
          },
          { title: "Carga útil", body: "El instrumento de la misión: en Aurora, la observación del clima y del estrés hídrico." },
        ],
      },
      {
        kind: "story",
        heading: "Un protocolo inspirado en hormigas",
        paragraphs: [
          "SpaceMakers obtuvo el tercer lugar en el International Space Science and Scientific Payload Competition (ISSSP), celebrado en Hong Kong en noviembre de 2024. Compitieron 200 equipos, 30 llegaron a la final y el grupo fue el único equipo de América en ella.",
          "Su propuesta es un protocolo de comunicación para enjambres de satélites: optimiza el mapeo de topología y determina las rutas más eficientes para transmitir datos entre satélites. Se inspira en cómo las hormigas encuentran el camino óptimo, y nació del trabajo académico de Rigel de Jesús con el profesor César Vargas en la concentración de Tecnologías Aeroespaciales del Tec.",
        ],
        figures: [
          { value: "3er", label: "Lugar mundial" },
          { value: "200", label: "Equipos inscritos" },
          { value: "30", label: "Finalistas" },
          { value: "1", label: "Único equipo de América" },
        ],
      },
      {
        kind: "info",
        heading: "El equipo detrás del protocolo",
        intro: "Cinco estudiantes de disciplinas distintas, con asesoría de César Vargas y Paloma González.",
        showIndex: false,
        items: [
          { title: "Rigel de Jesús", body: "Ingeniería Electrónica" },
          { title: "Sofía Cavazos", body: "Ingeniería Mecatrónica" },
          { title: "Ángel de Jesús Pérez", body: "Ingeniería Mecánica" },
          { title: "André Rivera", body: "Tecnologías Computacionales" },
          { title: "Ximena Trejo", body: "Robótica y Sistemas Digitales" },
        ],
      },
    ],
    roadmapHeading: "Ruta de la misión",
    roadmap: [
      {
        when: "Nov 2024",
        title: "3er lugar en el ISSSP",
        description: "Hong Kong, China. Único equipo de América en la final de 30 equipos.",
        status: "done",
      },
      {
        when: "Ahora",
        title: "Desarrollo de la plataforma 3U",
        description: "Proyecto activo con líder de proyecto de satélite y líder de ADCS.",
        status: "active",
      },
      {
        // TODO(confirm): validation plan with Kyutech depends on the group's confirmed agreement.
        when: "Fecha por definir",
        title: "Validación ambiental",
        description: "Pruebas de termo-vacío y vibración antes del vuelo, ver la alianza con Kyutech.",
        status: "tbc",
      },
    ],
    sources: [
      {
        label: "Conecta Tec · Triunfo espacial: alumnos Tec son 3er lugar en Hong Kong",
        href: "https://conecta.tec.mx/es/noticias/monterrey/educacion/triunfo-espacial-alumnos-tec-son-3er-lugar-en-concurso-en-hong-kong",
      },
      {
        label: "MVS Noticias · Estudiantes del Tec logran tercer lugar en concurso de ciencia espacial",
        href: "https://mvsnoticias.com/nuevo-leon/2024/11/27/estudiantes-del-tec-de-monterrey-logran-tercer-lugar-en-concurso-de-ciencia-espacial-en-china-661401.html",
      },
      { label: "SpaceMakers en Instagram (@spacemakers.mty)", href: "https://www.instagram.com/spacemakers.mty/" },
    ],
  },
  {
    slug: "kyutech",
    tagline: "Ensayos de termo-vacío y vibración con el Kyushu Institute of Technology, en Japón.",
    overview: [
      "El Kyushu Institute of Technology (Kyutech), en Kitakyushu, es una referencia mundial en nanosatélites: su Center of Nanosatellite Testing (CeNT), activo desde 2010, ofrece pruebas de vibración, choque, termo-vacío, ciclado térmico y compatibilidad electromagnética para satélites de hasta 50 cm.",
      // TODO(confirm): the collaboration below comes from the group's mockup; no public record was found.
      "Para SpaceMakers, esta alianza es la ruta para validar hardware bajo condiciones de lanzamiento y de vacío térmico antes de volar.",
    ],
    facts: [
      { label: "Sede", value: "Kitakyushu, Japón" },
      { label: "Ensayos", value: "TVAC · Vibración" },
      { label: "Vibración", value: "≈ 33 kN" },
      { label: "Cámaras TVAC", value: "0.3 m y 1.7 m" },
    ],
    blocks: [
      {
        kind: "info",
        heading: "Qué se prueba antes de volar",
        intro: "Un satélite no se lanza sin pasar por estos ensayos. Son los que ofrece el centro de pruebas de Kyutech.",
        showIndex: true,
        items: [
          { title: "Termo-vacío (TVAC)", body: "Reproduce el vacío y los ciclos extremos de temperatura del espacio sobre el hardware completo." },
          { title: "Vibración", body: "Somete al satélite a las cargas mecánicas del lanzamiento para comprobar que sobrevive al cohete." },
          { title: "Choque", body: "Simula los impulsos bruscos de la separación y los eventos pirotécnicos." },
          { title: "Ciclado térmico", body: "Alterna calor y frío de forma repetida para detectar fallas por fatiga de materiales." },
          { title: "Compatibilidad electromagnética", body: "Verifica que los sistemas y las antenas no se interfieran entre sí." },
          { title: "Desgasificación", body: "Mide los gases que liberan los materiales en vacío para proteger los instrumentos." },
        ],
      },
      {
        kind: "info",
        heading: "Un camino que México ya recorrió",
        intro: "Kyutech forma ingenieros espaciales de todo el mundo y ya ha recibido proyectos universitarios mexicanos.",
        showIndex: false,
        items: [
          {
            title: "Programa BIRDS",
            body: "Desde 2015, estudiantes de distintos países construyen y operan su propio CubeSat en Kyutech durante unos dos años.",
          },
          {
            title: "Becas ONU–Japón",
            body: "Desde 2013, Kyutech y la oficina de asuntos del espacio de la ONU forman a ingenieros de países sin programa espacial en tecnología de nanosatélites.",
          },
          {
            title: "Nanosatélite K'oto",
            body: "El proyecto universitario de la UNAM y universidades de Querétaro contemplaba sus pruebas finales de certificación en Kyutech y un lanzamiento vía JAXA.",
          },
        ],
      },
    ],
    roadmapHeading: "Ruta de validación",
    roadmap: [
      {
        when: "Fecha por definir",
        title: "Diseño para pruebas ambientales",
        description: "Preparar el hardware para soportar vacío térmico y vibración.",
        status: "tbc",
      },
      {
        when: "Fecha por definir",
        title: "Campaña TVAC y vibración",
        description: "Ensayos en las instalaciones de Kyutech, en Japón.",
        status: "tbc",
      },
      {
        when: "Fecha por definir",
        title: "Certificación para vuelo",
        description: "Resultado de las pruebas y aprobación del hardware para el lanzamiento.",
        status: "tbc",
      },
    ],
    sources: [
      {
        label: "UNOOSA · International Space Cooperation at Kyushu Institute of Technology",
        href: "https://www.unoosa.org/documents/pdf/psa/activities/2023/AccSpace4All_Expert_Meeting/Presentations/11._Tetsuhito_Fuse_1.pdf",
      },
      {
        label: "UNOOSA · Programa de becas ONU/Japón (PNST)",
        href: "https://www.unoosa.org/documents/pdf/psa/bsti/fellowship/2022/PNST_Programme_Flyer_AUG_2021.pdf",
      },
      { label: "Ciencia UNAM · El nanosatélite K'oto", href: "https://ciencia.unam.mx/leer/1400/un-chapulin-en-el-espacio-el-nanosatelite-k-oto" },
    ],
  },
];
