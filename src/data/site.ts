import type { SiteInfo } from "@/types/content";

// TODO: replace dummy contact data and social URLs with the official ones.
export const siteInfo: SiteInfo = {
  name: "SpaceMakers",
  description:
    "Grupo estudiantil de innovación espacial del Tecnológico de Monterrey. Robótica planetaria, nanosatélites y validación espacial hechos en México.",
  timeZone: "America/Monterrey",
  phone: "81 9988 7766",
  email: "spacemakers@tec.mx",
  addressLines: [
    "Av. Eugenio Garza Sada 2501 Sur, Colonia Tecnológico,",
    "C.P. 64700, en Monterrey, Nuevo León",
  ],
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Rover", href: "/rover" },
    { label: "Satelites", href: "/satelites" },
    { label: "Kyutech", href: "/kyutech" },
  ],
  joinCta: { label: "Únete a la Tripulación", href: "/#unete" },
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
