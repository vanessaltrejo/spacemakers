import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SiteInfo } from "@/types/content";

interface FooterProps {
  site: SiteInfo;
}

export function Footer({ site }: FooterProps) {
  const phoneHref = `tel:+52${site.phone.replace(/\s/g, "")}`;

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-page">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#" className="inline-block text-white" aria-label="SpaceMakers, volver arriba">
              <Logo className="h-10 w-auto" />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{site.description}</p>
          </div>

          <nav aria-labelledby="footer-nav-title" className="lg:col-span-2">
            <h2 id="footer-nav-title" className="label-mono text-mist">
              Navegación
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-starlight/80 transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="label-mono text-mist">Contacto</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-starlight/80">
              <a href={phoneHref} className="block transition-colors hover:text-gold">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block transition-colors hover:text-gold">
                {site.email}
              </a>
              <p className="pt-2 text-mist">
                {site.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-mono text-mist">Redes</h2>
            <ul className="mt-5 flex gap-3">
              {site.socials.map((social) => (
                <li key={social.network}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-line-strong text-starlight transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon network={social.network} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
