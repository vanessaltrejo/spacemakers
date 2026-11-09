import type { SiteInfo } from "@/types/content";

// TODO: replace dummy contact data and social URLs with the official ones.
export const siteInfo: SiteInfo = {
  name: "Space Makers",
  description:
    "Grupo estudiantil de innovación espacial del Tecnológico de Monterrey. Robótica planetaria, nanosatélites y validación espacial hechos en México.",
  timeZone: "America/Monterrey",
  phone: "+52 81 8020 3492",
  email: "spacemakers.mty@servicios.tec.mx",
  addressLines: [
    "Av. Eugenio Garza Sada 2501 Sur, Colonia Tecnológico,",
    "C.P. 64700, en Monterrey, Nuevo León",
  ],
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Equipo", href: "/equipo" },
    { label: "Rover", href: "/rover", gapBefore: true, tone: "ember" },
    { label: "Satélites", href: "/satelites", tone: "orbit" },
    { label: "Kyutech", href: "/kyutech", tone: "lime" },
    { label: "Estación terrena", href: "/estacion-terrena", tone: "orbit" },
    { label: "Traje espacial", href: "/traje-espacial", tone: "nebula" },
    { label: "Radioaficionados", href: "/radioaficionados", tone: "orbit" },
    { label: "Ciencia y Colabs", href: "/ciencia", gapBefore: true },
    { label: "Newsletter", href: "/newsletter" },
  ],
  socials: [
    {
      network: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/spacemakers.mty/",
    },
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
    { network: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
  ],
};
