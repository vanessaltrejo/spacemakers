import type { SiteInfo } from "@/types/content";

// TODO: replace dummy contact data and social URLs with the official ones.
export const siteInfo: SiteInfo = {
  name: "SpaceMakers",
  tagline: "SpaceMakers is community",
  phone: "81 9988 7766",
  email: "spacemakers@tec.mx",
  address:
    "Av. Eugenio Garza Sada 2501 Sur, Colonia Tecnológico, C.P. 64700, en Monterrey, Nuevo León",
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Rover", href: "#rover" },
    { label: "Satelites", href: "#satelites" },
    { label: "Kyutech", href: "#kyutech" },
  ],
  joinCta: { label: "Únete a la Tripulación", href: "#unete" },
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
