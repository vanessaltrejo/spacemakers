import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SiteInfo } from "@/types/content";

interface FooterProps {
  site: SiteInfo;
}

export function Footer({ site }: FooterProps) {
  const phoneHref = `tel:+52${site.phone.replace(/\s/g, "")}`;

  return (
    <footer className="bg-panel">
      <div className="container-page grid gap-10 py-12 text-center md:grid-cols-[1fr_1.4fr_0.8fr_auto] md:items-center md:text-left">
        <a href="#inicio" className="mx-auto text-white md:mx-0" aria-label="SpaceMakers, volver al inicio">
          <Logo className="h-16 w-auto" />
        </a>

        <address className="space-y-1 font-display text-sm not-italic text-starlight/80 md:text-center">
          <a href={phoneHref} className="block transition-colors hover:text-gold">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="block transition-colors hover:text-gold">
            {site.email}
          </a>
          <p className="mx-auto max-w-sm pt-3">{site.address}</p>
        </address>

        <nav aria-label="Pie de página">
          <ul className="space-y-2 font-display text-sm text-starlight/80 md:text-center">
            {site.navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex justify-center gap-5 md:flex-col md:gap-4">
          {site.socials.map((social) => (
            <li key={social.network}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="block text-white transition-all hover:scale-110 hover:text-gold"
              >
                <SocialIcon network={social.network} className="size-7" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-white/5 py-4 text-center font-mono text-[11px] tracking-widest text-mist uppercase">
        © {new Date().getFullYear()} {site.name} · Tecnológico de Monterrey
      </p>
    </footer>
  );
}
