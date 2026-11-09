import type { NewsItem } from "@/types/content";

/**
 * DUMMY — external stories for the "Nota del día". They are not hosted on the site: each one links
 * straight to the agency's press room. Headlines are generic on purpose (no specific facts).
 * TODO: verify every link and replace with real stories before publishing.
 */
const base = {
  kind: "external" as const,
  dummy: true,
  category: "alianzas" as const,
  location: "",
  sources: [],
};

export const externalNews: NewsItem[] = [
  // DUMMY
  {
    ...base,
    id: "ext-nasa",
    source: "NASA",
    externalUrl: "https://www.nasa.gov/news/",
    title: "Nuevas imágenes de la superficie marciana tomadas por sus rovers",
    excerpt: "La agencia comparte una selección de imágenes recientes del terreno de Marte.",
    publishedAt: "2026-11-08",
  },
  // DUMMY
  {
    ...base,
    id: "ext-jaxa",
    source: "JAXA",
    externalUrl: "https://global.jaxa.jp/press/",
    title: "Avances de su programa de exploración lunar",
    excerpt: "La agencia japonesa resume el estado de sus misiones hacia la Luna.",
    publishedAt: "2026-11-06",
  },
  // DUMMY
  {
    ...base,
    id: "ext-esa",
    source: "ESA",
    externalUrl: "https://www.esa.int/Newsroom",
    title: "Resultados de observación de la Tierra con satélites Copernicus",
    excerpt: "Nuevos datos del programa europeo de observación de la Tierra.",
    publishedAt: "2026-11-03",
  },
  // DUMMY
  {
    ...base,
    id: "ext-conae",
    source: "CONAE",
    externalUrl: "https://www.argentina.gob.ar/ciencia/conae",
    title: "Monitoreo satelital de la humedad del suelo",
    excerpt: "La agencia argentina explica cómo sus satélites miden la humedad del suelo.",
    publishedAt: "2026-11-01",
  },
  // DUMMY
  {
    ...base,
    id: "ext-iaf",
    source: "IAF",
    externalUrl: "https://www.iafastro.org/news",
    title: "Abre el registro para el Congreso Astronáutico Internacional",
    excerpt: "La federación astronáutica invita a registrarse a su congreso anual.",
    publishedAt: "2026-10-29",
  },
  // DUMMY
  {
    ...base,
    id: "ext-aem",
    source: "AEM",
    externalUrl: "https://www.gob.mx/aem",
    title: "Actividades de divulgación espacial en México",
    excerpt: "La Agencia Espacial Mexicana reúne actividades para acercar el espacio al público.",
    publishedAt: "2026-10-26",
  },
];
